import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,1000'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle2', timeout: 30000 });

    // Scroll to stack section
    await page.evaluate(() => {
      const el = document.getElementById('pages-stack-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));

    // Get all tab labels in desktop
    const desktopTabs = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('.nav-stack-tab-label')).map(el => el.textContent.trim());
      return labels;
    });
    console.log('Desktop tabs:', desktopTabs);

    // Capture desktop cards stack
    const stackElem = await page.$('#pages-stack-section');
    if (stackElem) {
      await stackElem.screenshot({ path: 'scratch/cards_stack_desktop.png' });
      console.log('Saved scratch/cards_stack_desktop.png');
    }

    // Now test mobile viewport
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => {
      const el = document.getElementById('pages-stack-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileTabs = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.nav-stack-mobile-deck button span:first-of-type')).map(el => el.textContent.trim());
      return btns;
    });
    console.log('Mobile tabs:', mobileTabs);

    const mobileStack = await page.$('#pages-stack-section');
    if (mobileStack) {
      await mobileStack.screenshot({ path: 'scratch/cards_stack_mobile.png' });
      console.log('Saved scratch/cards_stack_mobile.png');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

run();
