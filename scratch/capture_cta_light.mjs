import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  const cta = await page.$('[data-testid="cta-band"]');
  if (cta) {
    await cta.screenshot({ path: 'scratch/cta_band_light.png' });
    console.log('Saved scratch/cta_band_light.png');
  }
  await page.screenshot({ path: 'scratch/about_page_light.png', fullPage: true });
  console.log('Saved full about page screenshot');
  await browser.close();
}

main().catch(console.error);
