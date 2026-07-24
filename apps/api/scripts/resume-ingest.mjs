// Resume the killed deal-ingest sweep: parsed.json holds 27 deals already
// scraped (title/price/mrp/store/image). Here: resolve each ?rto= redirect →
// real store URL → swap affiliate → dedup vs index.json → push pending-review.
// ponytail: reuse the agent's parse work, only the rate-limited rto step remains.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const PARSED = 'C:/Users/djhac/AppData/Local/Temp/claude/F--new-projects-deals/c5635a0a-1c95-4bc5-968b-9c4814f4804e/scratchpad/parsed.json';
const INDEX = 'F:/new_projects/deals/data/deals/index.json';
const API = 'http://localhost:4000';
const KEY = 'dev-admin-key-change-me';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const deals = JSON.parse(fs.readFileSync(PARSED, 'utf8'));
const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
const seenPid = new Set(Object.values(index));
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// follow the rto redirect to the real merchant URL
function resolveRto(rto, referer) {
  try {
    return execFileSync('curl', ['-Ls', '-A', UA, '-H', `Referer: ${referer}`, '-m', '20',
      '-o', 'F:/new_projects/deals/data/_rto_body.tmp', '-w', '%{url_effective}', rto], { encoding: 'utf8' }).trim();
  } catch { return null; }
}

function affiliate(realUrl) {
  let ru; try { ru = new URL(realUrl); } catch { return null; }
  let h = ru.hostname.replace(/^www\./, '');
  // Flipkart via linkredirect.in wrapper — real flipkart URL hides in dl= param.
  if (/linkredirect\.in/.test(h)) {
    const dl = ru.searchParams.get('dl');
    if (!dl) return null;
    try { ru = new URL(decodeURIComponent(dl)); h = ru.hostname.replace(/^www\./, ''); } catch { return null; }
  }
  if (/amazon\.in|amzn/.test(h)) {
    const asin = (ru.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin) return null;
    return { store: 'amazon', productId: asin, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com/.test(h)) {
    const pid = ru.searchParams.get('pid');
    if (!pid) return null;
    return { store: 'flipkart', productId: pid, affiliateUrl: `https://www.flipkart.com${ru.pathname}?pid=${pid}&affid=${FLIPKART_AFFID}` };
  }
  return null; // non-amazon/flipkart → skip
}

const clean = (t) => String(t).replace(/^\s*(\[[^\]]*\]\s*)+/g, '').replace(/\s{2,}/g, ' ').trim();
const batch = [], newIndex = [];
let dupes = 0, skipped = 0;

for (const d of deals) {
  if (!d.rtoUrl) { skipped++; continue; }
  const real = resolveRto(d.rtoUrl, d.url);
  await sleep(2500); // rate limit their domain
  if (!real) { skipped++; console.log(`  ? resolve-fail ${d.title.slice(0, 40)}`); continue; }
  const aff = affiliate(real);
  if (!aff) { skipped++; console.log(`  - non-store ${real.slice(0, 50)}`); continue; }
  if (seenPid.has(aff.productId)) { dupes++; continue; }
  seenPid.add(aff.productId);

  const title = clean(d.title).slice(0, 140);
  const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
  const off = d.discountPct || (d.mrp && d.price && d.mrp > d.price ? Math.round((d.mrp - d.price) / d.mrp * 100) : null);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) + '-' + aff.productId.slice(0, 6);
  batch.push({
    slug, sourceSlug: d.sourceSlug || slug,
    title: d.price ? `${title} at ₹${d.price} – ${cap}` : `${title} – ${cap}`,
    description: `${title} — live on ${aff.store}${d.price ? ` at ₹${d.price}` : ''}${off ? ` (${off}% off)` : ''}. Hand-checked deal on RichDeals; grab it before the price moves.`,
    howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in and confirm your address.', 'Place the order at the deal price.'],
    image: d.image || null, store: aff.store, mrp: d.mrp || null, price: d.price || null,
    discountPct: off || null, productId: aff.productId, affiliateUrl: aff.affiliateUrl,
    status: 'pending-review',
  });
  newIndex.push([slug, aff.productId]);
  console.log(`  + ${aff.store} ₹${d.price ?? '?'}${off ? ` -${off}%` : ''} ${title.slice(0, 44)}`);
}

let pushed = 0;
for (let i = 0; i < batch.length; i += 15) {
  const res = await fetch(`${API}/admin/deals/bulk`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY },
    body: JSON.stringify({ deals: batch.slice(i, i + 15) }),
  });
  const out = await res.json().catch(() => ({}));
  pushed += out.count || 0;
}
// persist dedup index only after a successful push loop
for (const [slug, pid] of newIndex) index[slug] = pid;
fs.writeFileSync(INDEX, JSON.stringify(index, null, 0));
console.log(`\nDONE: ${batch.length} new, ${dupes} dupes, ${skipped} skipped. Pushed ${pushed}.`);
