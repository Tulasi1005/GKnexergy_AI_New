import puppeteer from 'puppeteer-core';

async function testTabs() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 1000 }
  });
  const page = await browser.newPage();

  console.log('--- 1. Navigating to http://localhost:3000/pricing in dark mode ---');
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Check initial active states
  const initialTabsState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('.pricing-segment-tab');
    return Array.from(tabs).map(t => ({
      text: t.innerText.trim().replace(/\n/g, ' '),
      hasActiveClass: t.classList.contains('active')
    }));
  });
  console.log('Initial tabs state (should all be false):', initialTabsState);

  // Take screenshot of initial state (Dark mode, matching user's image)
  await page.evaluate(() => {
    const el = document.getElementById('pricing-plans');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/01_initial_no_tab_active_dark.png' });
  console.log('Saved scratch/01_initial_no_tab_active_dark.png');

  // Also in light mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/01_initial_no_tab_active_light.png' });
  console.log('Saved scratch/01_initial_no_tab_active_light.png');

  // Switch back to dark mode for rest of user verification
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  // 2. Click Starter
  console.log('--- 2. Clicking Starter tab ---');
  await page.click('button[data-testid="pricing-tab-starter"]');
  await new Promise(r => setTimeout(r, 600));

  const starterState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('.pricing-segment-tab');
    const card = document.querySelector('[data-testid="pricing-card-starter"]');
    return {
      tabs: Array.from(tabs).map(t => ({
        text: t.innerText.trim().replace(/\n/g, ' '),
        active: t.classList.contains('active')
      })),
      cardFound: !!card
    };
  });
  console.log('After clicking Starter:', starterState);
  await page.screenshot({ path: 'scratch/02_starter_clicked_dark.png' });
  console.log('Saved scratch/02_starter_clicked_dark.png');

  // 3. Click Growth
  console.log('--- 3. Clicking Growth tab ---');
  await page.click('button[data-testid="pricing-tab-growth"]');
  await new Promise(r => setTimeout(r, 600));

  const growthState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('.pricing-segment-tab');
    const card = document.querySelector('[data-testid="pricing-card-growth"]');
    return {
      tabs: Array.from(tabs).map(t => ({
        text: t.innerText.trim().replace(/\n/g, ' '),
        active: t.classList.contains('active')
      })),
      cardFound: !!card
    };
  });
  console.log('After clicking Growth:', growthState);
  await page.screenshot({ path: 'scratch/03_growth_clicked_dark.png' });
  console.log('Saved scratch/03_growth_clicked_dark.png');

  // 4. Click Premium
  console.log('--- 4. Clicking Premium tab ---');
  await page.click('button[data-testid="pricing-tab-premium"]');
  await new Promise(r => setTimeout(r, 600));

  const premiumState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('.pricing-segment-tab');
    const card = document.querySelector('[data-testid="pricing-card-premium"]');
    return {
      tabs: Array.from(tabs).map(t => ({
        text: t.innerText.trim().replace(/\n/g, ' '),
        active: t.classList.contains('active')
      })),
      cardFound: !!card
    };
  });
  console.log('After clicking Premium:', premiumState);
  await page.screenshot({ path: 'scratch/04_premium_clicked_dark.png' });
  console.log('Saved scratch/04_premium_clicked_dark.png');

  // 5. Click Premium again to toggle off
  console.log('--- 5. Clicking Premium tab again (toggle off) ---');
  await page.click('button[data-testid="pricing-tab-premium"]');
  await new Promise(r => setTimeout(r, 600));

  const toggledOffState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('.pricing-segment-tab');
    return Array.from(tabs).map(t => ({
      text: t.innerText.trim().replace(/\n/g, ' '),
      active: t.classList.contains('active')
    }));
  });
  console.log('After clicking Premium again (all should be false):', toggledOffState);
  await page.screenshot({ path: 'scratch/05_toggled_off_dark.png' });
  console.log('Saved scratch/05_toggled_off_dark.png');

  await browser.close();
  console.log('--- All tab tests completed successfully! ---');
}

testTabs().catch(console.error);
