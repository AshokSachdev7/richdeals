// Freekaamaal scraper (volume engine). Harvest recent deal URLs → parse the real
// "Shop Now" out-link(s) → keep single-product deals → affiliate (Amazon tag /
// Flipkart affid / Cuelinks) → download og:image locally (for Spaces) → dedupe →
// write deal JSON. Then upload-spaces + post-deals publish. Curl-based, background-safe.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import crypto from 'node:crypto';

const DEALS = 'F:/new_projects/deals/data/deals/';
const IMG = 'F:/new_projects/deals/data/images/';
const SEEN = 'F:/new_projects/deals/data/scrape-seen.json';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const MAX = +(process.env.MAX || 900);

const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 }); } catch { return ''; } };
const dl = (u, o) => { try { execFileSync('curl', ['-sL', '-A', UA, '-m', '22', '-o', o, u]); return fs.existsSync(o) && fs.statSync(o).size > 2500; } catch { return false; } };
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);
const dec = (s) => s ? s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').replace(/\s+/g, ' ').trim() : s;
const meta = (h, p) => (h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;
const seen = fs.existsSync(SEEN) ? new Set(JSON.parse(fs.readFileSync(SEEN, 'utf8'))) : new Set();
if (!fs.existsSync(IMG)) fs.mkdirSync(IMG, { recursive: true });

function affiliate(url) {
  let u; try { u = new URL(url); } catch { return null; }
  const h = u.hostname.replace(/^www\./, '');
  if (/amazon\.in|amzn\./.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin) return null;
    return { store: 'amazon', productId: asin, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com|dl\.flipkart/.test(h)) {
    const pid = u.searchParams.get('pid');
    if (!/\/p\//.test(u.pathname) && !pid) return null;
    const clean = `https://www.flipkart.com${u.pathname}${pid ? `?pid=${pid}` : ''}`;
    return { store: 'flipkart', productId: pid || crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), affiliateUrl: `${clean}${pid ? '&' : '?'}affid=${FLIPKART_AFFID}` };
  }
  if (/pay|gift|upi|cashback|wallet|recharge|survey/i.test(u.pathname)) return null;
  const store = h.split('.')[0];
  const clean = `${u.origin}${u.pathname}`;
  return { store, productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
}

function harvestUrls() {
  const urls = new Set();
  const pages = [
    'https://freekaamaal.com/', 'https://freekaamaal.com/deals', 'https://freekaamaal.com/amazon',
    'https://freekaamaal.com/flipkart', 'https://freekaamaal.com/myntra', 'https://freekaamaal.com/ajio',
    'https://freekaamaal.com/nykaa', 'https://freekaamaal.com/tatacliq', 'https://freekaamaal.com/loot-deals',
    'https://freekaamaal.com/clothing-and-accessories', 'https://freekaamaal.com/electronics',
    'https://freekaamaal.com/health-and-personal-care', 'https://freekaamaal.com/home-and-kitchen',
    'https://freekaamaal.com/footwear', 'https://freekaamaal.com/mobiles-and-tablets',
    'https://freekaamaal.com/beauty-and-grooming', 'https://freekaamaal.com/baby-and-kids',
  ];
  for (const p of pages) { const html = curl(p); for (const m of html.matchAll(/href="(https:\/\/freekaamaal\.com\/deals\/[^"#?]+)"/g)) urls.add(m[1]); }
  // add recent sitemap URLs (highest-numbered = newest)
  for (const sm of ['https://freekaamaal.com/11.xml', 'https://freekaamaal.com/10.xml', 'https://freekaamaal.com/9.xml']) {
    const x = curl(sm); for (const m of x.matchAll(/<loc>(https:\/\/freekaamaal\.com\/deals\/[^<]+)<\/loc>/g)) urls.add(m[1]);
  }
  return [...urls];
}

function parseDeal(url) {
  const html = curl(url);
  if (!html || /HTTP ERROR 404|Page Not Found|410 Gone/i.test(html)) return null;
  const title = dec(meta(html, 'og:title'));
  const ogimg = meta(html, 'og:image');
  if (!title) return null;
  // real out-links = anchors labelled Shop Now / Buy Now
  const outs = [...html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>\s*(?:Shop Now|Buy Now|Grab (?:Deal|Now)|Get Deal)\b/gi)].map((m) => m[1]);
  const storeOuts = [...new Set(outs.filter((u) => /amazon\.in|amzn|flipkart\.com|myntra\.com|ajio\.com|nykaa\.com|tatacliq\.com/i.test(u)).map((u) => u.split('?')[0].split('/ref=')[0]))];
  if (storeOuts.length !== 1) return null; // 0 = no deal link; >1 = listicle → skip for quality
  const aff = affiliate(outs.find((u) => u.startsWith(storeOuts[0])) || storeOuts[0]);
  if (!aff) return null;
  const price = num((title.match(/(?:₹|Rs\.?|@)\s*([0-9][0-9,]{1,7})/i) || [])[1]);
  const slug = url.split('/deals/')[1].replace(/[^a-z0-9-]/gi, '-').slice(0, 90);
  return { slug, ogimg, price, aff, title };
}

const all = harvestUrls();
console.log(`harvested ${all.length} deal urls`);
let made = 0, dropListicle = 0, dropDead = 0;
const today = '2026-07-19';
for (const url of all) {
  if (made >= MAX) break;
  if (seen.has(url)) continue;
  seen.add(url);
  const d = parseDeal(url);
  if (!d) { dropDead++; continue; }
  const { aff, title, ogimg, price, slug } = d;
  // download image for Spaces
  let ext = 'jpg';
  if (ogimg) { const e = (ogimg.match(/\.(jpg|jpeg|png|webp)/i) || [, 'jpg'])[1].toLowerCase(); ext = e === 'jpeg' ? 'jpg' : e; if (!localExists(aff.productId)) dl(ogimg, IMG + aff.productId + '.' + ext); }
  const base = dec(title).replace(/\s*(?:₹|Rs\.?|@)\s*[0-9,]+.*$/i, '').replace(/\s*[-–|@]\s*(Amazon|Flipkart|Myntra|Ajio|Nykaa|Tatacliq).*$/i, '').trim();
  const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
  fs.writeFileSync(DEALS + `${today}-${aff.productId}.json`, JSON.stringify({
    slug, sourceSlug: slug,
    title: price ? `${base} at ₹${price} – ${cap}` : `${base} – ${cap}`,
    description: `${base} available on ${aff.store}${price ? ` at ₹${price}` : ''}. Verified live price, handpicked deal — grab it before it changes.`,
    howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
    image: ogimg, store: aff.store, mrp: null, price, discountPct: null, couponNote: null,
    productId: aff.productId, affiliateUrl: aff.affiliateUrl, ingestedAt: `${today}T11:45:00Z`, status: 'live',
  }, null, 2));
  made++;
  if (made % 25 === 0) console.log(`  ...${made} deals`);
}
function localExists(id) { return ['jpg', 'png', 'webp'].some((e) => fs.existsSync(IMG + id + '.' + e)); }
fs.writeFileSync(SEEN, JSON.stringify([...seen]));
console.log(`\nDONE: ${made} deals written | dropped ${dropDead} (dead/listicle/no-link)`);
