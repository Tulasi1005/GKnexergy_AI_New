import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.getElementById('pricing-plans');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/home_pricing_no_label.png' });
  console.log('Saved scratch/home_pricing_no_label.png');
  await browser.close();
}

main().catch(console.error);
