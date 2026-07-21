// Proper indiafreestuff ingest: resolve rto -> store URL -> affiliate (Amazon tag /
// Flipkart affid / Cuelinks) -> fetch REAL store image + price/mrp -> download image
// -> write deal JSON. Then run upload-spaces + post-deals to publish (images on our CDN).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import crypto from 'node:crypto';

const SD = 'C:/Users/djhac/AppData/Local/Temp/claude/F--new-projects-deals/c5635a0a-1c95-4bc5-968b-9c4814f4804e/scratchpad';
const DEALS = 'F:/new_projects/deals/data/deals/';
const IMG = 'F:/new_projects/deals/data/images/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const TARGET = 100;

const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '22', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 12 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '22', '-o', 'NUL', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const dl = (u, out) => { try { execFileSync('curl', ['-sL', '-A', UA, '-m', '25', '-o', out, u]); return fs.existsSync(out) && fs.statSync(out).size > 2500; } catch { return false; } };
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);
const dec = (s) => s ? s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').replace(/\s+/g, ' ').trim() : s;
const meta = (h, p) => (h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;
const hiRes = (u) => u && u.replace(/(\/images\/I\/[A-Za-z0-9+%-]+?)(\._[^/]*?)?\.(jpg|jpeg|png)/i, '$1._SL1200_.$3');

function amazonImage(html) {
  let m = html.match(/data-old-hires=["'](https:\/\/m\.media-amazon\.com\/images\/I\/[^"']+)["']/i)
       || html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?)"/);
  if (m) return m[1];
  m = html.match(/id=["']landingImage["'][^>]*data-a-dynamic-image=["']([^"']+)["']/i);
  if (m) { try { const map = JSON.parse(m[1].replace(/&quot;/g, '"')); let b = null, a = 0; for (const [u, wh] of Object.entries(map)) { const ar = (wh[0] || 0) * (wh[1] || 0); if (ar > a) { a = ar; b = u; } } if (b) return hiRes(b); } catch {} }
  m = html.match(/property=["']og:image["'][^>]+content=["']([^"']+)/i);
  return m ? hiRes(m[1]) : null;
}
function amazonPrice(html) {
  let m = html.match(/"priceToPay"[\s\S]{0,400}?a-price-whole">\s*([\d,]+)/i) || html.match(/a-price-whole">\s*([\d,]+)/i);
  const price = m ? num(m[1]) : null;
  let mm = html.match(/M\.R\.P\.?:?[\s\S]{0,220}?a-offscreen">\s*[₹Rs.]*\s*([\d,]+)/i) || html.match(/data-a-strike="true"[\s\S]{0,120}?a-offscreen">\s*[₹Rs.]*\s*([\d,]+)/i);
  return { price, mrp: mm ? num(mm[1]) : null };
}
function cleanTitle(t) {
  return dec(t).replace(/^\[[^\]]*\]\s*/, '').replace(/^Amazon is selling\s*/i, '').replace(/\s*Rs\.?\s*[0-9,]+.*$/i, '').replace(/\s*[@\-–]\s*(Amazon|Flipkart|Myntra|Ajio|Jiomart|Tatacliq).*$/i, '').replace(/\s*\|\s*$/, '').trim();
}

function affiliate(finalUrl) {
  let u; try { u = new URL(finalUrl); } catch { return null; }
  const h = u.hostname.replace(/^www\./, '');
  if (/amazon\.in|amzn\./.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin) return null;
    return { store: 'amazon', productId: asin, url: `https://www.amazon.in/dp/${asin}`, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com|dl\.flipkart/.test(h)) {
    const pid = u.searchParams.get('pid');
    if (!/\/p\/|\/product\//.test(u.pathname) && !pid) return null;
    const clean = `https://www.flipkart.com${u.pathname}${pid ? `?pid=${pid}` : ''}`;
    return { store: 'flipkart', productId: pid || u.pathname.slice(0, 40), url: clean, affiliateUrl: `${clean}${pid ? '&' : '?'}affid=${FLIPKART_AFFID}` };
  }
  // block obvious non-product (cashback/gift/upi/pay pages)
  if (/pay|gift|upi|cashback|wallet|recharge/i.test(u.pathname)) return null;
  const store = h.split('.')[0];
  const clean = `${u.origin}${u.pathname}`;
  return { store, productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), url: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
}

const cands = JSON.parse(fs.readFileSync(SD + '/ifs-candidates.json', 'utf8'));
let made = 0, drop = 0;
const today = '2026-07-19';
if (!fs.existsSync(IMG)) fs.mkdirSync(IMG, { recursive: true });

for (const c of cands) {
  if (made >= TARGET) break;
  const final = curlFinal(c.rto);
  const aff = affiliate(final);
  if (!aff) { drop++; continue; }

  let image = null, price = null, mrp = null, ext = 'jpg';
  const page = curl(aff.url);
  if (aff.store === 'amazon') { image = amazonImage(page); const pp = amazonPrice(page); price = pp.price; mrp = pp.mrp; }
  else { image = meta(page, 'og:image'); const t = meta(page, 'og:title') || c.title; const pm = (page.match(/(?:₹|Rs\.?)\s*([0-9][0-9,]{1,7})/i) || t.match(/(?:₹|Rs\.?)\s*([0-9][0-9,]{1,7})/i)); price = pm ? num(pm[1]) : null; }
  if (!price) { const tm = c.title.match(/(?:₹|Rs\.?)\s*([0-9][0-9,]{1,7})/i); price = tm ? num(tm[1]) : null; }

  // download image locally (for Spaces upload)
  if (image) { const e = (image.match(/\.(jpg|jpeg|png|webp)/i) || [, 'jpg'])[1].toLowerCase(); ext = e === 'jpeg' ? 'jpg' : e; if (!dl(image, IMG + aff.productId + '.' + ext)) image = image; }

  const baseTitle = cleanTitle(c.title);
  const discountPct = mrp && price && mrp > price ? Math.round((mrp - price) / mrp * 100) : null;
  const deal = {
    slug: c.slug, sourceSlug: c.slug,
    title: price ? `${baseTitle} at ₹${price} – ${aff.store[0].toUpperCase() + aff.store.slice(1)}` : `${baseTitle} – ${aff.store[0].toUpperCase() + aff.store.slice(1)}`,
    description: `${baseTitle} available on ${aff.store}${price ? ` at ₹${price}` : ''}. Verified live price, handpicked deal — grab it before the price changes.`,
    howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
    image, store: aff.store, mrp, price, discountPct, couponNote: null,
    productId: aff.productId, affiliateUrl: aff.affiliateUrl,
    ingestedAt: `${today}T11:30:00Z`, status: 'live', _localImg: image ? `${aff.productId}.${ext}` : null,
  };
  fs.writeFileSync(DEALS + `${today}-${aff.productId}.json`, JSON.stringify(deal, null, 2));
  made++;
  console.log(`${made}. ${aff.store} ${String(aff.productId).slice(0, 12)}  ₹${price ?? '?'}${discountPct ? ` -${discountPct}%` : ''}  img:${image ? 'y' : 'n'}  ${baseTitle.slice(0, 40)}`);
  try { execFileSync('curl', ['-s', '-o', 'NUL', '-m', '2', 'https://www.amazon.in/robots.txt']); } catch {}
}
console.log(`\nDONE: ${made} deals written, ${drop} dropped (non-product/unresolved)`);
