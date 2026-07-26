// DesiDime ingest, stage 1: discover + resolve + dedup.
// Reads the LISTING pages — each <article> card carries title, price, MRP,
// store, the Amazon image id and its own Buy Now link, so no per-deal page
// fetch is needed. Resolves visit.desidime.com/... -> real merchant URL,
// keeps single-product Amazon /dp/ASIN + Flipkart ?pid= only, drops anything
// already in the DB, writes candidates JSON.
// Price/image still get verified in the logged-in Amazon tab before push
// (curl is bot-blocked on PDPs) — DesiDime card prices go stale fast.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JUNK, GROCERY, affiliate, verifyFromHtml } from './lib/ingest-common.mjs';
import { PrismaClient } from '@prisma/client';

const OUT = process.argv[2] || './dd-candidates.json';
const LISTS = ['https://www.desidime.com/new', 'https://www.desidime.com/'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const GAP = 2600;


const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const dec = (s) => s ? s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').replace(/\s+/g, ' ').trim() : s;
const num = (s) => (s ? +String(s).replace(/[,\s]/g, '') : null);

function cards(html) {
  // DesiDime sometimes answers the listing with a Turbo-stream payload
  // (content-type text/javascript) that carries the same markup as a JS string
  // literal — quotes and slashes escaped. Every attribute regex below matches on
  // "..." so an escaped card yields nothing, and the sweep silently halved.
  if (html.includes('\\"')) html = html.replace(/\\"/g, '"').replace(/\\\//g, '/').replace(/\\n/g, '\n');

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

// Cards we already resolved to a non-product (sale hub, promo page, tracking
// landing) stay on the listing for days — remember them so we don't burn a
// redirect on the same junk every 30 minutes.
// Anchored to the script, not the CWD — '../../data' resolved to apps/data and
// blew up with ENOENT after a full sweep had already run.
const DEAD = new URL('../../../data/dd-dead.json', import.meta.url);
const dead = new Set(fs.existsSync(DEAD) ? JSON.parse(fs.readFileSync(DEAD, 'utf8')) : []);

const seen = new Set();
const found = [];
for (const list of LISTS) {
  const html = curl(list);
  const got = cards(html);
  // curl() swallows failures and returns '' — without this line a dead leg just
  // halves the sweep silently, which reads as "DesiDime posted less tonight".
  if (!got.length) console.log(`  WARN ${list} gave 0 cards (${html.length} bytes) — fetch likely failed`);
  for (const c of got) if (!seen.has(c.id) && !dead.has(c.id)) { seen.add(c.id); found.push(c); }
  sleep(GAP);
}
const junk = found.filter((c) => JUNK.test(c.title) || GROCERY.test(c.title));
const keep = found.filter((c) => !junk.includes(c));
console.log(`discovered ${found.length} cards, ${junk.length} junk/other-store dropped`);

const out = [];
const byProduct = new Set();
for (const c of keep) {
  const final = curlFinal(c.buy);
  const aff = affiliate(final);
  sleep(GAP);
  if (!aff) { dead.add(c.id); console.log(`  drop ${c.title.slice(0, 40)} -> ${final.slice(0, 60)}`); continue; }
  if (byProduct.has(aff.productId)) continue; // same product posted twice on the listing
  byProduct.add(aff.productId);
  out.push({ ...c, ...aff, final });
}

for (const d of out.filter((x) => x.store !== 'Amazon')) {
  verifyFromHtml(d, curl(d.page || d.final));
  sleep(GAP);
}

// dedup against what we already sell — same product, any slug
const p = new PrismaClient();
const have = new Set((await p.deal.findMany({ where: { productId: { in: out.map((d) => d.productId) } }, select: { productId: true } })).map((d) => d.productId));
await p.$disconnect();
const fresh = out.filter((d) => !have.has(d.productId));
fresh.forEach((d) => console.log(`  ${d.verify && d.verify !== 'ok' ? 'SKIP(' + d.verify + ')' : 'ok'} ${d.store} ${d.productId}  ₹${d.price ?? '?'}  ${d.title.slice(0, 45)}`));

fs.writeFileSync(DEAD, JSON.stringify([...dead]));
fs.writeFileSync(OUT, JSON.stringify(fresh, null, 2));
console.log(`\nDONE: ${found.length} discovered, ${out.length} product-resolved, ${out.length - fresh.length} already in DB, ${fresh.length} fresh -> ${OUT}`);
