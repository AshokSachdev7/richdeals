// INRDeals embed-feed ingest. Pulls the dynamic-ad grid
// (inrdeals.com/embed/deals?user=inr678975705) — each card already carries
// title, price, MRP, discount and image, so no per-page fetch needed.
//
// Affiliate rule (per owner): Amazon & Flipkart get OUR OWN tag/affid (direct,
// not the INRDeals wrapper). Every other store keeps the INRDeals tracking link
// (that's our INRDeals affiliate id — those commissions are ours).
// Amazon images are rebuilt from the marketplace CDN (m.media-amazon.com) using
// the image id embedded in the INRDeals CDN filename — never hotlink verbatim.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import crypto from 'node:crypto';

const API = process.env.API_URL || 'http://localhost:4000';
const KEY = process.env.ADMIN_KEY;
const FEED = process.env.INR_FEED || 'https://inrdeals.com/embed/deals?user=inr678975705';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj';
const SEEN = 'F:/new_projects/deals/data/inrfeed-seen.json';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
if (!KEY) { console.error('Missing ADMIN_KEY'); process.exit(1); }

const seen = fs.existsSync(SEEN) ? new Set(JSON.parse(fs.readFileSync(SEEN, 'utf8'))) : new Set();
const curl = (u) => execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
const dec = (s) => (s || '').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const num = (s) => (s ? +String(s).replace(/[^0-9]/g, '') : null);

// Real store URL + our affiliate link. Amazon/Flipkart → our own; else INRDeals link kept.
function affiliate(inrLink) {
  let store = 'store', productId = null, affiliateUrl = inrLink;
  let real = inrLink;
  try {
    const u = new URL(dec(inrLink));
    const raw = u.searchParams.get('url');
    if (raw) real = decodeURIComponent(raw);
  } catch { return null; }
  let ru; try { ru = new URL(real); } catch { return null; }
  const h = ru.hostname.replace(/^www\./, '');
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
  // Other stores: keep the INRDeals link (our commission), dedup on the real URL.
  store = h.split('.')[0];
  productId = crypto.createHash('md5').update(`${ru.origin}${ru.pathname}`).digest('hex').slice(0, 12);
  return { store, productId, affiliateUrl: dec(inrLink) };
}

// Amazon marketplace image from the id baked into the INRDeals CDN filename.
function image(cdnUrl, store) {
  if (store === 'amazon') {
    const id = (cdnUrl.match(/\/([A-Za-z0-9%2B-]{8,})\._[A-Z]{2}\d+_/) || [])[1];
    if (id) return `https://m.media-amazon.com/images/I/${id}._SX400_.jpg`;
  }
  return dec(cdnUrl) || null;
}

const html = curl(FEED);
const items = html.split('<li class="product-item').slice(1);
const batch = [];
for (const raw of items) {
  const block = raw.split('</li>')[0];
  const inrLink = (block.match(/<a\b[^>]*?\bhref="(https:\/\/inr\.deals\/track[^"]+)"/) || [])[1];
  const title0 = dec((block.match(/title="([^"]+)"/) || [])[1] || '');
  // product thumbnail = inrdeals CDN /production/<id>/<imgid>._SX###_.jpg (store logo is *-logo-*.png, skip)
  const img = (block.match(/<img\s+src="([^"]+\/production\/[^"]+\._S[XY]\d+_[^"]*)"/) || [])[1];
  const price = num((block.match(/original_price"[^>]*>(?:<[^>]+>)*\s*([0-9,]+)/) || [])[1]);
  const mrp = num((block.match(/original_price_cut"[^>]*>(?:<[^>]+>)*\s*([0-9,]+)/) || [])[1]);
  let disc = num((block.match(/original_price_p"[^>]*>\s*([0-9]{1,2})\s*%/) || [])[1]);
  if (!inrLink || !title0) continue;
  const aff = affiliate(inrLink);
  if (!aff) continue;
  if (seen.has(aff.productId)) continue;
  if (!disc && mrp && price && mrp > price) disc = Math.round((mrp - price) / mrp * 100);

  // Rewrite title: drop store suffix + trim, make it ours.
  const title = title0.replace(/\s*[-–|]\s*(Amazon|Flipkart|Amazon India)\s*$/i, '').replace(/[.]{2,}$/, '').trim().slice(0, 140);
  const img2 = image(img || '', aff.store);
  if (!img2) continue;
  const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) + '-' + aff.productId.slice(0, 6);
  seen.add(aff.productId);
  batch.push({
    slug, sourceSlug: slug,
    title: price ? `${title} at ₹${price} – ${cap}` : `${title} – ${cap}`,
    description: `${title} available on ${aff.store}${price ? ` at ₹${price}` : ''}${disc ? ` (${disc}% off)` : ''}. Hand-picked live deal on RichDeals — grab it before the price jumps back up.`,
    howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
    image: img2, store: aff.store, mrp, price, discountPct: disc || null, couponNote: null,
    productId: aff.productId, affiliateUrl: aff.affiliateUrl, status: 'live',
  });
  console.log(`+ ${aff.store} ₹${price ?? '?'}${disc ? ` -${disc}%` : ''} ${title.slice(0, 46)}`);
}

let total = 0, created = 0;
for (let i = 0; i < batch.length; i += 15) {
  const slice = batch.slice(i, i + 15);
  const res = await fetch(`${API}/admin/deals/bulk`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify({ deals: slice }) });
  const out = await res.json().catch(() => ({}));
  total += out.count || 0;
  created += (out.results || []).filter((r) => r.created).length;
}
fs.writeFileSync(SEEN, JSON.stringify([...seen]));
console.log(`\nDONE: ${batch.length} deals from INRDeals feed, pushed ${total} (${created} new).`);
