// Push browser-verified candidates straight to the DB (same path as
// upsertFromIngest: store upsert, productId dedup, LIVE, price history).
// Input: a JSON array of rows already carrying a verified live price + image.
//   node push-verified.mjs ./verified.json
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
const rows = JSON.parse(readFileSync(process.argv[2] || './verified.json', 'utf8'));

// MRP sanity: marketplace "was" prices are often junk (equal to the live price,
// or an absurd multiple). Drop the MRP rather than publish a fake discount.
function saneMrp(mrp, price) {
  if (mrp == null || price == null) return null;
  if (mrp <= price || mrp > price * 100 || price / mrp < 0.2) return null;
  return mrp;
}

let created = 0, updated = 0;
try {
  for (const d of rows) {
    const slug = d.slug.slice(0, 190);
    const price = Math.round(d.price);
    const mrp = saneMrp(d.mrp, price);
    const discountPct = mrp ? Math.round((1 - price / mrp) * 100) : null;
    const storeSlug = d.store.toLowerCase();

    const store = await p.store.upsert({
      where: { slug: storeSlug }, update: {},
      create: { slug: storeSlug, name: d.store },
    });

    const data = {
      slug, title: d.title, description: d.description, howTo: [],
      image: d.image, mrp, price, discountPct,
      isSuper: false, isHot: discountPct != null && discountPct >= 60,
      status: 'LIVE', productId: d.productId, affiliateUrl: d.affiliateUrl,
      storeId: store.id,
    };

    const existing = await p.deal.findUnique({
      where: { store_product: { storeId: store.id, productId: d.productId } },
    }) ?? await p.deal.findUnique({ where: { slug } });

    if (existing) {
      await p.deal.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      const row = await p.deal.create({ data });
      await p.priceHistory.create({ data: { dealId: row.id, price } });
      created++;
    }
  }
} finally { await p.$disconnect(); }

console.log(`created ${created}, updated ${updated}, total ${rows.length}`);
