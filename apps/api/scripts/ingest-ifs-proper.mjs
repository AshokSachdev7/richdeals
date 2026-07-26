// indiafreestuff ingest, stage 1: discover + resolve.
// Reads the LISTING pages (cards carry title/price/mrp/slug/Shop-Now all in one
// block) instead of visiting each deal page — the old per-page scrape took the
// title from <h1> ("Daily Deals", page-level) and grabbed the first ?rto= anchor
// on the page rather than the card's own Shop Now button.
// Writes candidates JSON; price/image verification happens in the logged-in
// Amazon browser tab (curl is bot-blocked on PDPs), then push as status:live.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JUNK, GROCERY, affiliate, verifyFromHtml } from './lib/ingest-common.mjs';

const OUT = process.argv[2] || './ifs-candidates.json';
const LISTS = ['https://indiafreestuff.in/deals', 'https://indiafreestuff.in/deals/superdeals'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
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

const seen = new Set();
const found = [];
for (const list of LISTS) {
  const html = curl(list);
  for (const c of cards(html)) {
    if (seen.has(c.slug) || JUNK.test(c.title) || GROCERY.test(c.title)) continue;
    seen.add(c.slug); found.push(c);
  }
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

for (const d of out.filter((x) => x.store !== 'Amazon')) {
  verifyFromHtml(d, curl(d.page || d.final));
  sleep(GAP);
  console.log(`  verify ${d.store} ${d.productId}: ${d.verify}`);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`\nDONE: ${found.length} discovered, ${out.length} resolved to a product, wrote ${OUT}`);
