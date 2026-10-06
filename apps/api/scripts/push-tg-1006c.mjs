// TELEGRAM-DEAL-MONITOR tick 2026-10-06c
//
// Sidebar sweep of all groups. Pushed 1: SOJANYA embellished cotton kurta (link.amazon/B0cyezFVX -> B0DSQ3SMLV,
// Amazon PDP 480 vs M.R.P. 3,330, 4.0 from 137, add-to-cart, Black hiRes keyed by landingAsinColor).
// Skipped: Puma "from 764" (coupon + supercoins, category), HERE&NOW Myntra and Woodland "upto X% off" (category),
// plus the posts already seen last tick.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0DSQ3SMLV', name: 'SOJANYA Premium Embellished Cotton Kurta with Sequin Detailing', price: 480, mrp: 3330,
    image: 'https://m.media-amazon.com/images/I/51UKCWuGNyL._SL1440_.jpg',
    variant: 'The link opens the Black colour we checked. Prices on kurta listings change by size, so confirm your size is at this price before checking out.',
    description: [
      "SOJANYA's premium embellished cotton kurta is ₹480 on Amazon, 86% below M.R.P., rated 4 stars across 137 reviews.",
      'It is a knee-length cotton kurta with a mandarin collar, full sleeves and sequin detailing, cut in a regular, comfortable fit.',
      'Pick your size from the chest measurement in the size chart on the listing. Amazon offers a size exchange within 10 days of delivery if it does not fit.',
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

const file = process.argv[2] ?? 'tg-1006c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
