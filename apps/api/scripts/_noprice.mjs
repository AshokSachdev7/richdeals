// What are the price-less LIVE deals? Serial queries — managed PG caps ~22 conns.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
try {
  const rows = await p.deal.findMany({
    where: { status: 'LIVE', price: null },
    select: { id: true, slug: true, productId: true, image: true, store: { select: { name: true } } },
  });
  const by = {};
  for (const r of rows) {
    const k = r.store.name;
    by[k] = by[k] || { n: 0, asin: 0, noimg: 0 };
    by[k].n++;
    if (/^B0[A-Z0-9]{8}$/.test(r.productId || '')) by[k].asin++;
    if (!r.image) by[k].noimg++;
  }
  console.log(by);
} finally { await p.$disconnect(); }
