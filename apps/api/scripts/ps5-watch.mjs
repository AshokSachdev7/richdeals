// PS5 stock+price watcher. Polls Flipkart PS5 PDPs (curl-readable), detects
// sold-out -> in-stock flips, prints ALERT lines. State in ps5-watch-state.json.
// ponytail: curl + string-match heuristic — Flipkart PDP HTML carries price +
// CTA text ("ADD TO CART"/"Notify Me"). No headless browser needed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const STATE = path.join(__dir, 'ps5-watch-state.json');

// Watched PS5 consoles on Flipkart (pid -> label + target price). Cheapest first.
const WATCH = [
  { pid: 'GMCFYTWSM9Q9SN3C', label: 'PS5 Digital 825GB', url: 'https://www.flipkart.com/sony-playstation-5-digital-825-gb-astro-s-playroom/p/itm3c6e8c91e0941?pid=GMCFYTWSM9Q9SN3C', target: 42740 },
  { pid: 'GMCHN3VPFGG9NWCB', label: 'PS5 Digital CFI-2116B01Y', url: 'https://www.flipkart.com/sony-ps5-digital-cfi-2116b01y-825-gb/p/itm7124b7348127b?pid=GMCHN3VPFGG9NWCB', target: 49990 },
  { pid: 'GMCGHMTYZ8BUBMFB', label: 'PS5 Console 825GB (disc)', url: 'https://www.flipkart.com/sony-playstation-5-console-825-gb/p/itm62f0f8b3c0bfb?pid=GMCGHMTYZ8BUBMFB', target: 54990 },
  { pid: 'GMCGZCYPAFYBUNAR', label: 'PS5 Slim 1TB', url: 'https://www.flipkart.com/sony-playstation5-console-slim-cfi-2008a01x-cfi-2116a01y-1-tb/p/itm89489e2adcd2c?pid=GMCGZCYPAFYBUNAR', target: 54990 },
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

async function check(w) {
  let html = '';
  try {
    const r = await fetch(w.url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(12000) });
    html = await r.text();
  } catch (e) { return { ...w, ok: false, err: String(e).slice(0, 80) }; }
  // In-stock CTA = "ADD TO CART" button; sold-out = "Notify Me" and no cart button.
  const hasCart = /ADD TO CART/i.test(html);
  const notify = /Notify Me/i.test(html);
  const inStock = hasCart && !notify;
  // Lowest plausible console price (>= 30000) near the buy box.
  const prices = [...html.matchAll(/₹([0-9,]{5,})/g)].map(m => parseInt(m[1].replace(/,/g, ''))).filter(n => n >= 30000 && n <= 90000);
  const price = prices.length ? Math.min(...prices) : null;
  return { ...w, ok: true, inStock, price };
}

const prev = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const now = {};
const alerts = [];
const lines = [];

for (const w of WATCH) {
  const r = await check(w);
  now[w.pid] = { inStock: r.inStock, price: r.price };
  if (!r.ok) { lines.push(`${w.label}: ERR ${r.err}`); continue; }
  const was = prev[w.pid]?.inStock;
  const flip = r.inStock && was === false; // sold-out -> in-stock transition
  lines.push(`${w.label}: ${r.inStock ? 'IN STOCK' : 'sold out'} @ ₹${r.price ?? '?'} (target ₹${w.target})${flip ? '  <-- FLIP!' : ''}`);
  if (flip || (r.inStock && was === undefined)) {
    alerts.push(`PS5 IN STOCK: ${w.label} @ ₹${r.price ?? '?'} — ${w.url}`);
  }
  await new Promise(res => setTimeout(res, 800));
}

fs.writeFileSync(STATE, JSON.stringify(now, null, 2));
console.log(lines.join('\n'));
if (alerts.length) {
  console.log('\n=== ALERT ===');
  alerts.forEach(a => console.log(a));
  process.exitCode = 42; // signal: something in stock
} else {
  console.log('\nno in-stock flips');
}
