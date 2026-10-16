import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle0' });
  const info = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="cta-band"]');
    const comp = window.getComputedStyle(el);
    return {
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className,
      bgColor: comp.backgroundColor,
      bgImage: comp.backgroundImage,
      color: comp.color,
      classList: Array.from(el.classList),
      themeInStorage: localStorage.getItem('gk-theme')
    };
  });
  console.log('CTA Info:', JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);
