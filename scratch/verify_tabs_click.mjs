import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1100 }
  });
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:3001/pricing...');
  await page.goto('http://localhost:3001/pricing', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Trigger reveal animations
  await page.evaluate(async () => {
    window.scrollTo(0, 500);
    await new Promise(r => setTimeout(r, 300));
    window.scrollTo(0, 300);
  });
  await new Promise(r => setTimeout(r, 500));

  // 1. Capture Tab 1: Starter
  console.log('Capturing Starter tab view...');
  await page.screenshot({ path: 'scratch/tab_1_starter.png' });
  console.log('Saved scratch/tab_1_starter.png');

  // 2. Click Tab 2: growth
  console.log('Clicking growth tab...');
  await page.click('button[data-testid="pricing-tab-growth"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/tab_2_growth.png' });
  console.log('Saved scratch/tab_2_growth.png');

  // 3. Click Tab 3: premium
  console.log('Clicking premium tab...');
  await page.click('button[data-testid="pricing-tab-premium"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/tab_3_premium.png' });
  console.log('Saved scratch/tab_3_premium.png');

  // 4. Test dark mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/tab_3_premium_dark.png' });
  console.log('Saved scratch/tab_3_premium_dark.png');

  await browser.close();
  console.log('All tab verification captures completed successfully!');
}

main().catch(console.error);
