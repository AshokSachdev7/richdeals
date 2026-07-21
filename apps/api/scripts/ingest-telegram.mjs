// Telegram deal-group ingest. Parses messages (title + Deal Price + MRP + Discount
// come straight from the text) → resolves shortlink → affiliate (Amazon tag /
// Flipkart affid / Cuelinks) → store CDN image → pushes to /admin/deals.
// Multi-link posts collapse to ONE best (first) deal. Store CDN images used
// directly (fast) — no Spaces round-trip.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import crypto from 'node:crypto';

const SD = 'C:/Users/djhac/AppData/Local/Temp/claude/F--new-projects-deals/c5635a0a-1c95-4bc5-968b-9c4814f4804e/scratchpad';
const API = process.env.API_URL || 'http://localhost:4000';
const KEY = process.env.ADMIN_KEY;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const SEEN = 'F:/new_projects/deals/data/tg-seen.json';
if (!KEY) { console.error('Missing ADMIN_KEY'); process.exit(1); }

const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', '-o', 'NUL', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const num = (s) => (s ? +String(s).replace(/[,\s₹]/g, '') : null);
const dec = (s) => s ? s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim() : s;
const meta = (h, p) => (h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;
const hiRes = (u) => u && u.replace(/(\/images\/I\/[A-Za-z0-9+%-]+?)(\._[^/]*?)?\.(jpg|jpeg|png)/i, '$1._SL1000_.$3');
const seen = fs.existsSync(SEEN) ? new Set(JSON.parse(fs.readFileSync(SEEN, 'utf8'))) : new Set();

function amazonImage(html) {
  let m = html.match(/data-old-hires=["'](https:\/\/m\.media-amazon\.com\/images\/I\/[^"']+)["']/i)
       || html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?)"/);
  if (m) return m[1];
  m = html.match(/property=["']og:image["'][^>]+content=["'](https:\/\/m\.media-amazon\.com[^"']+)/i);
  return m ? hiRes(m[1]) : null;
}

function parseMsg(text) {
  const t = dec(text);
  const price = num((t.match(/Deal Price\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || t.match(/₹\s*([0-9][0-9,]*)/) || [])[1]);
  const mrp = num((t.match(/M\.?R\.?P\.?\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || [])[1]);
  let disc = num((t.match(/Discount\s*[:\-]?\s*([0-9]{1,2})\s*%/i) || [])[1]);
  if (!disc && mrp && price && mrp > price) disc = Math.round((mrp - price) / mrp * 100);
  // title = first meaningful line
  let title = (text.split('\n').map((l) => l.trim()).find((l) => l.length > 8 && !/^https?:|Deal Price|MRP|Discount|₹/i.test(l)) || '').slice(0, 140);
  title = dec(title).replace(/[.]{2,}$/, '').trim();
  return { title, price, mrp, discountPct: disc || null };
}

function affiliate(finalUrl) {
  let u; try { u = new URL(finalUrl); } catch { return null; }
  // EarnKaro/linkredirect intermediary hides the real store URL in ?dl=
  if (/linkredirect|linksredirect|inr\.deals|wishlink/.test(u.hostname)) {
    const d = u.searchParams.get('dl') || u.searchParams.get('url');
    if (d) { try { u = new URL(decodeURIComponent(d)); } catch {} }
  }
  const h = u.hostname.replace(/^www\./, '');
  if (/amazon\.in|amzn/.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin) return null;
    return { store: 'amazon', productId: asin, page: `https://www.amazon.in/dp/${asin}`, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com/.test(h)) {
    const pid = u.searchParams.get('pid');
    const clean = `https://www.flipkart.com${u.pathname}${pid ? `?pid=${pid}` : ''}`;
    return { store: 'flipkart', productId: pid || crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), page: clean, affiliateUrl: `${clean}${pid ? '&' : '?'}affid=${FLIPKART_AFFID}` };
  }
  const store = h.split('.')[0];
  const clean = `${u.origin}${u.pathname}`;
  return { store, productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), page: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
}

// Ads / sponsored / promo / trading-channel spam — never ingest.
const AD_RE = /trading|\bnifty\b|bank ?nifty|stock market|market analysis|view channel|what'?s this|join (channel|now)|t\.me\/|learning content|chart analysis|refer (and|&) earn/i;

const data = JSON.parse(fs.readFileSync(SD + '/tg-deals.json', 'utf8')).deals;
const batch = [];
for (const m of data) {
  if (AD_RE.test(m.text)) continue; // skip ad/promo banners
  const link = m.links[0]; // multi-link → best/first
  if (!link || seen.has(link)) continue;
  const final = curlFinal(link);
  const aff = affiliate(final);
  if (!aff) continue; // curl-blocked/unresolvable → retry next run (NOT marked seen)
  seen.add(link); // resolved to a real store → mark seen (all stores, not just amazon)
  const { title, price, mrp, discountPct } = parseMsg(m.text);
  if (!title) continue;

  let image = null;
  const page = curl(aff.page);
  if (aff.store === 'amazon') { image = amazonImage(page); execFileSync('node', ['-e', 'setTimeout(()=>{},2500)']); }
  else image = meta(page, 'og:image');
  // ponytail: image optional — DealCard shows store logo when null. Non-amazon
  // category/loot links often lack og:image; still push them (user wants all stores).

  const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
  const slug = (title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)) + '-' + aff.productId.slice(0, 6);
  batch.push({
    slug, sourceSlug: slug,
    title: price ? `${title} at ₹${price} – ${cap}` : `${title} – ${cap}`,
    description: `${title} available on ${aff.store}${price ? ` at ₹${price}` : ''}${discountPct ? ` (${discountPct}% off)` : ''}. Verified live deal from RichDeals — grab it before the price changes.`,
    howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
    image, store: aff.store, mrp, price, discountPct, couponNote: null,
    productId: aff.productId, affiliateUrl: aff.affiliateUrl, status: 'live',
  });
  console.log(`+ ${aff.store} ₹${price ?? '?'}${discountPct ? ` -${discountPct}%` : ''} ${title.slice(0, 42)}`);
}
fs.writeFileSync(SEEN, JSON.stringify([...seen]));

// push in chunks of 15
let total = 0;
for (let i = 0; i < batch.length; i += 15) {
  const res = await fetch(`${API}/admin/deals/bulk`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify({ deals: batch.slice(i, i + 15) }) });
  const out = await res.json().catch(() => ({}));
  total += out.count || 0;
}
console.log(`\nDONE: pushed ${total} of ${batch.length} telegram deals`);
