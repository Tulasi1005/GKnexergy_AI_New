import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1000 }
  });
  const page = await browser.newPage();
  
  // 1. Visit /pricing in Light mode
  console.log('Navigating to http://localhost:3001/pricing...');
  await page.goto('http://localhost:3001/pricing', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll down smoothly to trigger inView animations
  await page.evaluate(async () => {
    for (let i = 0; i <= document.body.scrollHeight; i += 400) {
      window.scrollTo(0, i);
      await new Promise(r => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 800));
  
  // Capture exact selector element
  const selector = await page.$('div[data-testid="pricing-exact-selector"]');
  if (selector) {
    await selector.screenshot({ path: 'scratch/pricing_selector_light.png' });
    console.log('Saved scratch/pricing_selector_light.png');
  }

  // Capture full pricing cards section
  const section = await page.$('section[data-testid="pricing-section"]');
  if (section) {
    await section.screenshot({ path: 'scratch/pricing_section_light.png' });
    console.log('Saved scratch/pricing_section_light.png');
  }

  await page.screenshot({ path: 'scratch/pricing_page_full_light.png', fullPage: true });
  console.log('Saved scratch/pricing_page_full_light.png');

  // 2. Switch to Dark mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  if (selector) {
    await selector.screenshot({ path: 'scratch/pricing_selector_dark.png' });
    console.log('Saved scratch/pricing_selector_dark.png');
  }

  if (section) {
    await section.screenshot({ path: 'scratch/pricing_section_dark.png' });
    console.log('Saved scratch/pricing_section_dark.png');
  }

  await page.screenshot({ path: 'scratch/pricing_page_full_dark.png', fullPage: true });
  console.log('Saved scratch/pricing_page_full_dark.png');

  // 3. Test interactive switching: click Starter tab
  console.log('Testing click on Starter tab...');
  await page.click('button[data-testid="pricing-tab-starter"]');
  await new Promise(r => setTimeout(r, 400));
  if (selector) {
    await selector.screenshot({ path: 'scratch/pricing_selector_starter_clicked.png' });
    console.log('Saved scratch/pricing_selector_starter_clicked.png');
  }

  // 4. Test interactive switching: click Premium tab
  console.log('Testing click on Premium tab...');
  await page.click('button[data-testid="pricing-tab-premium"]');
  await new Promise(r => setTimeout(r, 400));
  if (selector) {
    await selector.screenshot({ path: 'scratch/pricing_selector_premium_clicked.png' });
    console.log('Saved scratch/pricing_selector_premium_clicked.png');
  }

  await browser.close();
  console.log('All pricing verification captures completed successfully!');
}

main().catch(console.error);
