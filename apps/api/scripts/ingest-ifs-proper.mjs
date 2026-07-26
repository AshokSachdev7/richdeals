// indiafreestuff ingest, stage 1: discover + resolve.
// Reads the LISTING pages (cards carry title/price/mrp/slug/Shop-Now all in one
// block) instead of visiting each deal page — the old per-page scrape took the
// title from <h1> ("Daily Deals", page-level) and grabbed the first ?rto= anchor
// on the page rather than the card's own Shop Now button.
// Writes candidates JSON; price/image verification happens in the logged-in
// Amazon browser tab (curl is bot-blocked on PDPs), then push as status:live.
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';

const OUT = process.argv[2] || './ifs-candidates.json';
const LISTS = ['https://indiafreestuff.in/deals', 'https://indiafreestuff.in/deals/superdeals'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const GAP = 2600;

const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const dec = (s) => s ? s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').replace(/\s+/g, ' ').trim() : s;
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);

// Strip the source's trailing " Rs. 394 - Amazon" tail; we re-append our own.
const cleanTitle = (t) => dec(t)
  .replace(/^\[[^\]]*\]\s*/, '')
  .replace(/\s*(?:Rs\.?|₹)\s*[\d,]+\s*[-–]\s*\w+\s*$/i, '')
  .replace(/\s*[-–@]\s*(Amazon|Flipkart|Myntra|Ajio|Jiomart|Tatacliq)\s*$/i, '')
  .trim();

function cards(html) {
  // each chunk runs to the next card, so the only Shop Now anchor inside is its own
  return html.split(/<div class="product-item">/).slice(1).map((b) => {
    const title = (b.match(/class="item-title"[^>]*>([\s\S]*?)<\/a>/) || [])[1];
    // the card's OWN Shop Now anchor — not the first ?rto= on the page
    const rto = (b.match(/href="(https:\/\/www\.indiafreestuff\.in\/\?rto=[^"]+)"[^>]*class="btn btn-shopnow/) || [])[1];
    const slug = (b.match(/class="item-title" href="https:\/\/www\.indiafreestuff\.in\/([a-z0-9-]+)"/) || [])[1];
    const price = num((b.match(/class="new-price">[\s\S]*?<\/i>\s*([\d,]+)/) || [])[1]);
    const mrp = num((b.match(/class="old-price">[\s\S]*?<\/i>\s*([\d,]+)/) || [])[1]);
    return { slug, title: title && cleanTitle(title), rto, price, mrp };
  }).filter((c) => c.slug && c.rto && c.title);
}

// Every store counts, not just Amazon/Flipkart (owner rule 2026-07-27). Amazon and
// Flipkart get our own tag/affid; every other merchant goes through Cuelinks.
const NOT_A_STORE = /play\.google|apps\.apple|youtube|t\.me|telegram|facebook|instagram/i;
const NOT_A_PRODUCT = /\/(s|search|b|events?|promotion|gp\/browse|offers?|store|deals|brand|shop|c)\/|\/s\?|[?&]k=|\/h\/rewards\//i;

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
    // real product paths are /<slug>/p/itm<hash>; bare /p/ landings resolve to a generic store page
    if (!pid || !/\/p\/itm/.test(u.pathname)) return null;
    return { store: 'Flipkart', productId: pid, affiliateUrl: `https://www.flipkart.com${u.pathname}?pid=${pid}&affid=${FLIPKART_AFFID}` };
  }
  if (NOT_A_PRODUCT.test(u.pathname + u.search) || u.pathname === '/') return null;
  const clean = `${u.origin}${u.pathname}${u.search.replace(/[?&](utm_[^&]*|affid|affExtParam\d|ascsubtag|tag|ref|social_share)=[^&]*/g, '').replace(/^&/, '?')}`;
  const store = h.split('.')[0].replace(/^(m|www|shop)$/, h.split('.')[1] || h);
  return {
    store: store.charAt(0).toUpperCase() + store.slice(1),
    productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12),
    affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}`,
    page: clean,
  };
}

const seen = new Set();
const found = [];
for (const list of LISTS) {
  const html = curl(list);
  for (const c of cards(html)) if (!seen.has(c.slug)) { seen.add(c.slug); found.push(c); }
  sleep(GAP);
}
console.log(`discovered ${found.length} cards`);

const out = [];
for (const c of found) {
  const final = curlFinal(c.rto);
  const aff = affiliate(final);
  sleep(GAP);
  if (!aff) { console.log(`  drop ${c.slug.slice(0, 40)} -> ${final.slice(0, 60)}`); continue; }
  out.push({ ...c, ...aff, final });
  console.log(`  ok ${aff.store} ${aff.productId}  ₹${c.price ?? '?'}  ${c.title.slice(0, 45)}`);
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
  console.log(`  verify ${d.store} ${d.productId}: ${d.verify}`);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`\nDONE: ${found.length} discovered, ${out.length} resolved to a product, wrote ${OUT}`);
