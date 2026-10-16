import puppeteer from 'puppeteer';

async function capture() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.click('[data-testid="floating-chatbot-toggle"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/chatbot_mobile_responsive.png' });
  await browser.close();
  console.log('Mobile screenshot saved!');
}

capture().catch(console.error);
