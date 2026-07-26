// DesiDime ingest, stage 1: discover + resolve + dedup.
// Reads the LISTING pages — each <article> card carries title, price, MRP,
// store, the Amazon image id and its own Buy Now link, so no per-deal page
// fetch is needed. Resolves visit.desidime.com/... -> real merchant URL,
// keeps single-product Amazon /dp/ASIN + Flipkart ?pid= only, drops anything
// already in the DB, writes candidates JSON.
// Price/image still get verified in the logged-in Amazon tab before push
// (curl is bot-blocked on PDPs) — DesiDime card prices go stale fast.
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { PrismaClient } from '@prisma/client';

const OUT = process.argv[2] || './dd-candidates.json';
const LISTS = ['https://www.desidime.com/new', 'https://www.desidime.com/'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const GAP = 2600;

// DesiDime is mostly junk — kill the obvious classes by title before we spend a redirect on them.
const JUNK = /gift\s*card|cashback|quiz|answers|loot|free\s*fire|diamonds|recharge|refer|coupon|play\s*store|app\s*download|blinkit|bigbasket|zepto|instamart|swiggy|zomato|prime\s*membership|subscription|upto\s*\d+%|flat\s*\d+%\s*off\s*$/i;
// groceries and perishables: low ticket, location-locked, price swings daily
const GROCERY = /\b(oil|atta|maida|rice|dal|pulses|masala|saunf|fennel|jeera|haldi|rambutan|mango|apple|banana|fruits?|vegetable|dry\s*fruits|almond|cashew|kaju|badam|ghee|sugar|salt|tea|coffee|milk|paneer|honey|biscuit|chocolate|namkeen|snacks?|noodles|juice|soap|shampoo|detergent)\b/i;

const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const dec = (s) => s ? s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').replace(/\s+/g, ' ').trim() : s;
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);

function cards(html) {
  return html.split(/<article /).slice(1).map((b) => {
    const id = (b.match(/data-gtm-deal-id="(\d+)"/) || [])[1];
    const store = (b.match(/data-gtm-store="([^"]*)"/) || [])[1];
    const slug = (b.match(/data-permalink="\/?deals\/([a-z0-9-]+)"/) || [])[1];
    const title = dec((b.match(/class="custom-card-title[^"]*"[^>]*>\s*<a [^>]*>([\s\S]*?)<\/a>/) || [])[1]);
    // desidime mirrors the marketplace image and keeps its id in the filename
    const img = (b.match(/src="https:\/\/cdn\d\.desidime\.com\/topics\/photos\/\d+\/[a-z]+\/([A-Za-z0-9+-]+?)(?:\._[A-Z]{2}\d+_)?\.jpg/) || [])[1];
    const buy = (b.match(/href="(https:\/\/visit\.desidime\.com\/visit\/[^"]+)"/) || [])[1];
    const price = num((b.match(/font-bold text-primary mr-2">\s*₹\s*([\d,]+)/) || [])[1]);
    const mrp = num((b.match(/line-through[^>]*>₹\s*([\d,]+)/) || [])[1]);
    return { id, slug, title, store, img, buy, price, mrp };
  }).filter((c) => c.id && c.buy && c.title);
}

// Every store counts, not just Amazon/Flipkart (owner rule 2026-07-27). Amazon and
// Flipkart get our own tag/affid; everything else goes through Cuelinks.
const NOT_A_STORE = /play\.google|apps\.apple|youtube|t\.me|telegram|facebook|instagram/i;
const NOT_A_PRODUCT = /\/(s|search|b|events?|promotion|gp\/browse|offers?|store|deals|brand|shop|c)\/|\/s\?|[?&]k=|\/h\/rewards\//i;
const cue = (url) => `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(url)}`;

function affiliate(finalUrl) {
  let u; try { u = new URL(finalUrl); } catch { return null; }
  const h = u.hostname.replace(/^www\./, '');
  if (NOT_A_STORE.test(h)) return null;
  if (/^amazon\.in$|amzn\./.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin || /\/h\/rewards\//.test(u.pathname)) return null;
    return { store: 'Amazon', productId: asin, affiliateUrl: `https://www.amazon.in/dp/${asin}?th=1&psc=1&tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com/.test(h)) {
    const pid = u.searchParams.get('pid');
    // real product paths are /<slug>/p/itm<hash>; /desidime/p/desidime_deals is their tracking landing
    if (!pid || !/\/p\/itm/.test(u.pathname)) return null;
    return { store: 'Flipkart', productId: pid, affiliateUrl: `https://www.flipkart.com${u.pathname}?pid=${pid}&affid=${FLIPKART_AFFID}` };
  }
  // any other merchant — must still be a single product page, not a category/sale hub
  if (NOT_A_PRODUCT.test(u.pathname + u.search) || u.pathname === '/') return null;
  const clean = `${u.origin}${u.pathname}${u.search.replace(/[?&](utm_[^&]*|affid|affExtParam\d|ascsubtag|tag|ref|social_share)=[^&]*/g, '').replace(/^&/, '?')}`;
  const store = h.split('.')[0].replace(/^(m|www|shop)$/, h.split('.')[1] || h);
  return {
    store: store.charAt(0).toUpperCase() + store.slice(1),
    productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12),
    affiliateUrl: cue(clean),
    page: clean,
  };
}

const seen = new Set();
const found = [];
for (const list of LISTS) {
  const html = curl(list);
  for (const c of cards(html)) if (!seen.has(c.id)) { seen.add(c.id); found.push(c); }
  sleep(GAP);
}
const junk = found.filter((c) => JUNK.test(c.title) || GROCERY.test(c.title) || !/^(Amazon|Flipkart)/i.test(c.store || ''));
const keep = found.filter((c) => !junk.includes(c));
console.log(`discovered ${found.length} cards, ${junk.length} junk/other-store dropped`);

const out = [];
const byProduct = new Set();
for (const c of keep) {
  const final = curlFinal(c.buy);
  const aff = affiliate(final);
  sleep(GAP);
  if (!aff) { console.log(`  drop ${c.title.slice(0, 40)} -> ${final.slice(0, 60)}`); continue; }
  if (byProduct.has(aff.productId)) continue; // same product posted twice on the listing
  byProduct.add(aff.productId);
  out.push({ ...c, ...aff, final });
}

// Most merchants (Flipkart, Croma, Nykaa, Tata Cliq, Ajio...) serve Product ld+json
// to curl, so price/name/image get verified here. Amazon bot-blocks curl — those get
// verified in the logged-in browser tab before push.
function productLd(html) {
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let v; try { v = JSON.parse(m[1].trim()); } catch { continue; }
    const flat = [].concat(v, v?.['@graph'] || []).filter(Boolean);
    const p = flat.find((x) => x?.['@type'] === 'Product' && x.offers);
    if (p) return p;
  }
  return null;
}
for (const d of out.filter((x) => x.store !== 'Amazon')) {
  const html = curl(d.page || d.final);
  sleep(GAP);
  const ld = productLd(html);
  const offer = [].concat(ld?.offers || []).find((o) => o?.price || o?.lowPrice);
  if (!offer) { d.verify = 'no-ld-json'; continue; }
  const live = +(offer.price ?? offer.lowPrice);
  d.verify = Math.abs(live - (d.price ?? 0)) <= 1 ? 'ok' : `price-drift card ₹${d.price} live ₹${live}`;
  d.livePrice = live;
  d.liveTitle = ld.name;
  d.liveImage = Array.isArray(ld.image) ? ld.image[0] : ld.image;
  if (offer.availability && !/InStock/i.test(offer.availability)) d.verify = 'out-of-stock';
}

// dedup against what we already sell — same product, any slug
const p = new PrismaClient();
const have = new Set((await p.deal.findMany({ where: { productId: { in: out.map((d) => d.productId) } }, select: { productId: true } })).map((d) => d.productId));
await p.$disconnect();
const fresh = out.filter((d) => !have.has(d.productId));
fresh.forEach((d) => console.log(`  ${d.verify && d.verify !== 'ok' ? 'SKIP(' + d.verify + ')' : 'ok'} ${d.store} ${d.productId}  ₹${d.price ?? '?'}  ${d.title.slice(0, 45)}`));

fs.writeFileSync(OUT, JSON.stringify(fresh, null, 2));
console.log(`\nDONE: ${found.length} discovered, ${out.length} product-resolved, ${out.length - fresh.length} already in DB, ${fresh.length} fresh -> ${OUT}`);
