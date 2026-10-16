import { chromium } from 'playwright';

async function testAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('--- 1. Testing Ecosystem Card Scroll on Home Page ---');
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to NavPagesStack
  await page.evaluate(() => {
    const el = document.getElementById('pages-stack-section');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);

  // Find the Ecosystem card or tab
  // In pagesData, card 2 is Ecosystem. Let's find fanned card for ecosystem or front card if ecosystem
  // Or click the ecosystem card
  const ecosystemTab = page.locator('text=Ecosystem').first();
  console.log('Clicking Ecosystem tab / card...');
  await ecosystemTab.click();
  await page.waitForTimeout(1500);

  // Check scroll position or whether #our-ecosystems is in view
  const ecoSectionInView = await page.evaluate(() => {
    const el = document.getElementById('our-ecosystems');
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    return {
      found: true,
      top: rect.top,
      bottom: rect.bottom,
      inViewport: rect.top >= -100 && rect.top <= window.innerHeight
    };
  });
  console.log('Our Ecosystems section status:', ecoSectionInView);

  await page.screenshot({ path: 'scratch/screenshot_ecosystem_scrolled.png' });

  console.log('\n--- 2. Testing Back Buttons on Multiple Pages (Icon Only, No Text) ---');
  const pagesToTest = [
    { url: 'http://localhost:3001/about', name: 'About' },
    { url: 'http://localhost:3001/projects', name: 'Projects' },
    { url: 'http://localhost:3001/contact', name: 'Contact' },
    { url: 'http://localhost:3001/careers', name: 'Careers' },
  ];

  for (const p of pagesToTest) {
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const backBtn = page.locator('[data-testid="back-to-stack-link"]').first();
    const isVisible = await backBtn.isVisible();
    const textContent = (await backBtn.innerText()).trim();
    const hasSvg = await backBtn.locator('svg').count();

    console.log(`Page: ${p.name}`);
    console.log(`  Visible: ${isVisible}`);
    console.log(`  Text Content: "${textContent}" (Should be empty!)`);
    console.log(`  Has SVG icon: ${hasSvg > 0}`);

    if (textContent.length > 0) {
      console.error(`  ERROR: Text "${textContent}" found in back button on ${p.name}!`);
    } else {
      console.log(`  PASS: Icon only, no text!`);
    }

    await page.screenshot({ path: `scratch/screenshot_back_btn_${p.name.toLowerCase()}.png` });
  }

  await browser.close();
  console.log('\nVerification completed!');
}

testAll().catch(console.error);
