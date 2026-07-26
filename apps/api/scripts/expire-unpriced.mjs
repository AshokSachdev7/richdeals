// Amazon PDP renders (image parsed) but shows no buy price => currently
// unavailable. Flip those LIVE-but-price-less rows to EXPIRED so the page keeps
// its EXPIRED banner + Discontinued schema instead of sitting there as a thin
// page that claims a deal it can't price. Rows whose fetch returned nothing at
// all are left alone — that's a scrape failure, not a dead listing.
//   node expire-unpriced.mjs ../../../bf0.json ...
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
const results = process.argv.slice(2).flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
const dead = results.filter((r) => !(r.live > 0) && r.img);
const byAsin = new Map(dead.map((r) => [r.asin, r]));

const rows = await p.deal.findMany({
  where: { status: 'LIVE', price: null, productId: { in: [...byAsin.keys()] } },
  select: { id: true, productId: true, image: true },
});

let done = 0;
try {
  for (const row of rows) {
    await p.deal.update({
      where: { id: row.id },
      data: { status: 'EXPIRED', ...(row.image ? {} : { image: byAsin.get(row.productId).img }) },
    });
    done++;
  }
} finally { await p.$disconnect(); }

console.log(`expired ${done}/${rows.length} unavailable rows`);
