import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/home', { waitUntil: 'networkidle0' });
  const found = await page.evaluate(() => !!document.querySelector('#pricing-plans'));
  console.log('Home page has #pricing-plans:', found);
  await browser.close();
}

main().catch(console.error);
