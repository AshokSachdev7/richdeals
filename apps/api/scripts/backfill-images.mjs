// Image backfill for LIVE deals with no image — mostly store sale/category
// landing pages (Ajio, Flipkart, Myntra) that never carried a product photo.
// Takes og:image from the merchant page (ld+json image as fallback). Amazon
// PDPs are bot-blocked to curl, so those stay for the browser pass.
import { execFileSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { productLd } from './lib/ingest-common.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };
const merchantUrl = (aff) => { const m = /[?&]url=([^&]+)/.exec(aff || ''); return m ? decodeURIComponent(m[1]) : aff; };

function ogImage(html) {
  const m = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html)
    || /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html);
  if (m) return m[1];
  const ld = productLd(html);
  const img = Array.isArray(ld?.image) ? ld.image[0] : ld?.image;
  return img || null;
}

const p = new PrismaClient();
const rows = await p.deal.findMany({
  where: { status: 'LIVE', image: null, store: { slug: { not: 'amazon' } } },
  select: { id: true, affiliateUrl: true, store: { select: { slug: true } } },
});
console.log(`${rows.length} imageless non-Amazon rows`);

let fixed = 0, miss = 0;
try {
  for (const row of rows) {
    const url = merchantUrl(row.affiliateUrl);
    if (!/^https?:/.test(url)) { miss++; continue; }
    const img = ogImage(curl(url));
    sleep(1500);
    if (!img || !/^https?:/.test(img)) { miss++; continue; }
    await p.deal.update({ where: { id: row.id }, data: { image: img } });
    fixed++;
  }
} finally { await p.$disconnect(); }

console.log(`imaged ${fixed}, still missing ${miss}`);
