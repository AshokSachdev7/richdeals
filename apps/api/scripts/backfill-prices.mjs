// Backfill price/mrp/image on LIVE deals that were published without a price
// (thin pages: no Offer schema, generic FAQ copy). Input is the browser
// verifier's output — [{asin, live, mrp, img}] — matched to rows by productId.
//   node backfill-prices.mjs ../../../bf0.json ../../../bf1.json ...
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
const results = process.argv.slice(2).flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
const byAsin = new Map(results.filter((r) => r.live > 0).map((r) => [r.asin, r]));

// Same rule as push-verified.mjs: a "was" price that is below the live price or
// an absurd multiple is junk — drop it rather than publish a fake discount.
function saneMrp(mrp, price) {
  if (mrp == null || price == null) return null;
  if (mrp <= price || mrp > price * 100 || price / mrp < 0.2) return null;
  return mrp;
}

const rows = await p.deal.findMany({
  where: { status: 'LIVE', price: null, productId: { in: [...byAsin.keys()] } },
  select: { id: true, productId: true, image: true },
});

let done = 0;
try {
  for (const row of rows) {
    const v = byAsin.get(row.productId);
    const price = Math.round(v.live);
    const mrp = saneMrp(v.mrp, price);
    await p.deal.update({
      where: { id: row.id },
      data: {
        price,
        mrp,
        discountPct: mrp ? Math.round((1 - price / mrp) * 100) : null,
        ...(row.image ? {} : v.img ? { image: v.img } : {}),
      },
    });
    await p.priceHistory.create({ data: { dealId: row.id, price } });
    done++;
  }
} finally { await p.$disconnect(); }

console.log(`priced ${done}/${rows.length} matched rows (${byAsin.size}/${results.length} ASINs returned a price)`);
