import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1200 }
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Navigating to http://localhost:3001/pricing...');
  await page.goto('http://localhost:3001/pricing', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'scratch/pricing_page_debug.png', fullPage: true });
  console.log('Saved scratch/pricing_page_debug.png');

  const html = await page.evaluate(() => document.querySelector('#pricing-plans') ? 'Found #pricing-plans' : 'Not found');
  console.log('Check result:', html);

  await browser.close();
}

main().catch(console.error);
