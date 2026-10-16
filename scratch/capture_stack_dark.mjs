import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1000 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  const stack = await page.$('#pages-stack-section');
  if (stack) {
    await stack.screenshot({ path: 'scratch/stack_section_dark.png' });
    console.log('Saved dark stack screenshot');
  }
  await browser.close();
}

main().catch(console.error);
