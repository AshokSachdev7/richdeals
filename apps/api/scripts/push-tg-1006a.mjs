// TELEGRAM-DEAL-MONITOR tick 2026-10-06a
//
// Sidebar sweep of all groups. Pushed 1: Clazkit stainless steel coconut opener (Amazon PDP 73 vs M.R.P. 199,
// 4.2 from 3,351, In stock + add-to-cart). Skipped: Lloyd AC, ladies handbag, Syska power bank (already seen),
// DiSano peanut butter (food), Myntra / Caprese "upto X% off" posts (category), AI+ Nova (bank-offer price),
// Rogerkart gift-card loot, Swiggy Dineout, non-deal chatter.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0CG68ZK2G', name: 'Clazkit Stainless Steel Coconut Opener Tool', price: 73, mrp: 199,
    image: 'https://m.media-amazon.com/images/I/6159Kc-wHpL._SL1080_.jpg',
    variant: 'There is one version on this listing: a single stainless steel opener.',
    description: [
      "Clazkit's stainless steel coconut opener is ₹73 on Amazon, 63% below M.R.P., rated 4.2 stars across 3,351 reviews.",
      'It is a hand tool with a pointed steel tip: press and twist it into the soft top of a tender coconut to punch a clean hole, then pour out the water or put a straw in. No machete and no wasted water.',
      'It works on green tender coconuts. Mature brown coconuts with hard shells still need a heavier tool. Rinse and dry it after use so the steel stays clean.',
    ],
  },
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
    howTo: [
      `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
      d.variant,
      `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
      NO_COUPON,
    ],
    image: d.image, price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error(`title/price ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-1006a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
