// Exports dist/sony-<model>.glb for every model by building them in headless Chromium.
// Needs Playwright (`npm i -D playwright`) and runs Vite's dev server briefly.
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const port = 5197;

(async () => {
  const vite = spawn('npx', ['vite', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' });
  try {
    for (let i = 0; i < 40; i++) {
      try { if ((await fetch(`http://localhost:${port}/`)).ok) break; } catch {}
      await new Promise((r) => setTimeout(r, 250));
    }
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('pageerror', (e) => console.error(e.message));
    await page.goto(`http://localhost:${port}/tools/export.html`);
    await page.waitForFunction(() => window.__glb || window.__glbError, null, { timeout: 30000 });
    const err = await page.evaluate(() => window.__glbError);
    if (err) throw new Error(err);
    const all = await page.evaluate(() => window.__glb);
    await browser.close();
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
    for (const [id, b64] of Object.entries(all)) {
      const out = path.join(root, 'dist', `sony-${id}.glb`);
      fs.writeFileSync(out, Buffer.from(b64, 'base64'));
      console.log(`wrote ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
    }
  } finally {
    vite.kill();
  }
})().catch((e) => { console.error(e); process.exit(1); });
