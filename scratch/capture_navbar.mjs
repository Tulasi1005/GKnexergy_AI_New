import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  
  // Light mode navbar
  await page.goto('http://localhost:3001/home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  const nav = await page.$('header[data-testid="main-navbar"]');
  if (nav) {
    await nav.screenshot({ path: 'scratch/navbar_light.png' });
    console.log('Saved navbar_light.png');
  }

  // Dark mode navbar
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  if (nav) {
    await nav.screenshot({ path: 'scratch/navbar_dark.png' });
    console.log('Saved navbar_dark.png');
  }

  await browser.close();
}

main().catch(console.error);
