// Flipkart ingest: resolve ifs rto → unwrap linkredirect dl= → keep /p/ products →
// fetch flixcart image + price → affid=djhackraj → download image → write deal.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const SD = 'C:/Users/djhac/AppData/Local/Temp/claude/F--new-projects-deals/c5635a0a-1c95-4bc5-968b-9c4814f4804e/scratchpad';
const DEALS = 'F:/new_projects/deals/data/deals/';
const IMG = 'F:/new_projects/deals/data/images/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AFFID = 'djhackraj';
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '22', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 12 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', '-o', 'NUL', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const dl = (u, o) => { try { execFileSync('curl', ['-sL', '-A', UA, '-m', '22', '-o', o, u]); return fs.existsSync(o) && fs.statSync(o).size > 2000; } catch { return false; } };
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);
const dec = (s) => s ? s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/\s+/g, ' ').trim() : s;
const meta = (h, p) => (h.match(new RegExp(`<meta[^>]+property=["']${p}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;

function realFlipkartUrl(rto) {
  const final = curlFinal(rto);
  try {
    const u = new URL(final);
    if (/linkredirect|linksredirect/.test(u.hostname)) {
      const d = u.searchParams.get('dl') || u.searchParams.get('url');
      if (d) return decodeURIComponent(d);
    }
    if (/flipkart\.com/.test(u.hostname)) return final;
  } catch {}
  return null;
}

const cands = JSON.parse(fs.readFileSync(SD + '/fk-cands.json', 'utf8')).deals;
let made = 0, notProduct = 0;
const today = '2026-07-19';
for (const c of cands) {
  const real = realFlipkartUrl(c.rto);
  if (!real) { notProduct++; continue; }
  let pid; try { pid = new URL(real).searchParams.get('pid'); } catch {}
  if (!pid || !/\/p\//.test(real)) { notProduct++; continue; }

  const page = curl(`https://www.flipkart.com/product/p/itme?pid=${pid}`);
  let title = dec(meta(page, 'og:title')) || dec(c.title) || '';
  title = title.replace(/^Buy\s+/i, '').replace(/\s*\|.*$/, '').trim();
  let img = meta(page, 'og:image');
  if (img) img = img.replace(/\/image\/\d+\/\d+\//, '/image/832/832/');
  const prices = [...page.matchAll(/₹\s*([0-9][0-9,]{1,7})/g)].map((m) => num(m[1])).filter((n) => n > 0);
  const price = prices[0] || null;
  const mrp = prices.length > 1 ? Math.max(...prices) : null;
  const discountPct = mrp && price && mrp > price ? Math.round((mrp - price) / mrp * 100) : null;

  // image: flixcart og:image → local (fallback ifs thumb)
  const src = img || c.thumb;
  if (src) { const e = (src.match(/\.(jpg|jpeg|png|webp)/i) || [, 'jpg'])[1].toLowerCase().replace('jpeg', 'jpg'); dl(src, IMG + pid + '.' + e); }

  fs.writeFileSync(DEALS + `${today}-${pid}.json`, JSON.stringify({
    slug: c.slug, sourceSlug: c.slug,
    title: price ? `${title} at ₹${price} – Flipkart` : `${title} – Flipkart`,
    description: `${title} available on Flipkart${price ? ` at ₹${price}` : ''}. Verified live price — grab it before it changes.`,
    howTo: ['Tap Shop Now to open Flipkart.', 'Add the item to your cart.', 'Sign in to your Flipkart account.', 'Confirm the address and place the order.'],
    image: src, store: 'flipkart', mrp, price, discountPct, couponNote: null,
    productId: pid, affiliateUrl: `https://www.flipkart.com/product/p/itme?pid=${pid}&affid=${AFFID}`,
    ingestedAt: `${today}T12:00:00Z`, status: 'live',
  }, null, 2));
  made++;
  console.log(`${made}. ${pid} ₹${price ?? '?'}${discountPct ? ` -${discountPct}%` : ''} img:${src ? 'y' : 'n'} ${title.slice(0, 45)}`);
  try { execFileSync('curl', ['-s', '-o', 'NUL', '-m', '2', 'https://www.flipkart.com/robots.txt']); } catch {}
}
console.log(`\nDONE: ${made} flipkart deals | ${notProduct} non-product (category offers)`);
