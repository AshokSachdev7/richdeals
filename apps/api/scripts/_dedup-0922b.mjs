import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
const p = new PrismaClient();
const cands = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const fresh = [];
for (const c of cands) {
  const hit = await p.deal.findFirst({ where: { productId: c.productId }, select: { id: true, status: true, price: true } });
  if (hit) { console.log(`dup ${c.productId} -> #${hit.id} ${hit.status} ₹${hit.price}`); continue; }
  fresh.push(c);
}
console.log(`\nfresh ${fresh.length} of ${cands.length}`);
for (const c of fresh) console.log(`${c.productId}  ₹${c.price}/${c.mrp ?? '?'}  ${c.title}`);
fs.writeFileSync(process.argv[3], JSON.stringify(fresh, null, 2));
await p.$disconnect();
