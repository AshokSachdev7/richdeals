// Reprice 3 live Amazon deals whose DB price went stale (flagged 26au/26bg).
// New prices read 2026-09-26 23:15 IST off #centerCol in the logged-in tab:
// add-to-cart present, no clip coupon. Title/description ₹ + % patched to match
// so schema and visible copy agree.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const FIX = [
  { id: 7988,  price: 518,  mrp: 4300, old: [['₹761', '₹518'], ['82%', '88%']] },
  { id: 7714,  price: 252,  mrp: 699,  old: [['₹327', '₹252']] },
  { id: 10419, price: 1299, mrp: 9999, old: [['₹2199', '₹1299'], ['78%', '87%']] },
];
for (const f of FIX) {
  const d = await p.deal.findUnique({ where: { id: f.id } });
  const sub = (s) => f.old.reduce((t, [a, b]) => t.split(a).join(b), s);
  const discountPct = Math.round((1 - f.price / f.mrp) * 100);
  const title = sub(d.title), description = sub(d.description);
  const left = (title + description).match(/₹\s?[\d,]+/g);
  await p.deal.update({ where: { id: f.id }, data: { price: f.price, mrp: f.mrp, discountPct, title, description } });
  console.log(f.id, discountPct + '%', '|', title, '| ₹ left in copy:', left);
}
await p.$disconnect();
