import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
for (const id of ['PWBGGD4THDQZYAY6', 'B0G38DGNKM']) {
  const r = await p.deal.findFirst({ where: { productId: id }, select: { id: true, slug: true, status: true, price: true } });
  console.log(id, r ? `#${r.id} ${r.status} ₹${r.price} ${r.slug}` : 'FRESH');
}
console.log('syska slug-ish:', (await p.deal.findMany({ where: { slug: { contains: 'syska' } }, select: { slug: true, status: true, price: true }, take: 5 })).map(x => `${x.slug}/${x.status}/₹${x.price}`).join(' | ') || 'none');
await p.$disconnect();
