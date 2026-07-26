// Price backfill for the non-Amazon stores (Myntra, Ajio, Flipkart, ...).
// They serve Product ld+json to plain curl, so no browser needed. The real
// merchant URL is recoverable from the Cuelinks wrapper we store in
// affiliateUrl (?url=<encoded>); Flipkart/Amazon links are already direct.
// Rows that render but carry no offer price are treated as unavailable ->
// EXPIRED (page stays live with its banner), same call as expire-unpriced.
import { execFileSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { productLd } from './lib/ingest-common.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const GAP = 1500;
const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };

function merchantUrl(aff) {
  const m = /[?&]url=([^&]+)/.exec(aff || '');
  return m ? decodeURIComponent(m[1]) : aff;
}

const p = new PrismaClient();
const rows = await p.deal.findMany({
  where: { status: 'LIVE', price: null, store: { slug: { not: 'amazon' } } },
  select: { id: true, image: true, affiliateUrl: true, store: { select: { name: true } } },
});
console.log(`${rows.length} price-less non-Amazon rows`);

let priced = 0, expired = 0, skipped = 0;
try {
  for (const row of rows) {
    const url = merchantUrl(row.affiliateUrl);
    if (!/^https?:/.test(url)) { skipped++; continue; }
    const ld = productLd(curl(url));
    sleep(GAP);
    const offer = [].concat(ld?.offers || []).find((o) => o?.price || o?.lowPrice);
    const live = offer ? +(offer.price ?? offer.lowPrice) : null;
    const img = Array.isArray(ld?.image) ? ld.image[0] : ld?.image;

    if (!ld) { skipped++; continue; }
    if (!(live > 0)) {
      await p.deal.update({ where: { id: row.id }, data: { status: 'EXPIRED', ...(row.image || !img ? {} : { image: img }) } });
      expired++;
      continue;
    }
    const price = Math.round(live);
    await p.deal.update({ where: { id: row.id }, data: { price, ...(row.image || !img ? {} : { image: img }) } });
    await p.priceHistory.create({ data: { dealId: row.id, price } });
    priced++;
  }
} finally { await p.$disconnect(); }

console.log(`priced ${priced}, expired ${expired}, skipped ${skipped}`);
