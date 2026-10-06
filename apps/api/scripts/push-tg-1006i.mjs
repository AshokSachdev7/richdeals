// TELEGRAM-DEAL-MONITOR tick 2026-10-06i
//
// Pushed 1 (Amazon): Go Hooked hanging pot 5 pcs Yellow, B08BCLNV83 (ONLINE SHOPPING DEALS, link.amazon/B05S9rtJB).
// Dropped:
//   - USHA AquaBuddy Neo 25L geyser B0FJ2FNTCB (CoolzTricks + Dealzone, posted at ₹5,999): no buy box, only
//     "1 option from ₹10,999". The existing LIVE row for it was set to EXPIRED.
//   - Dealdost amzn.to/4yz2eKN: resolves to an /s? search page.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B08BCLNV83', name: 'Go Hooked Plastic Hanging Pot Yellow 4.8 Inch Set of 5', price: 198, mrp: 1299,
    image: 'https://m.media-amazon.com/images/I/715wjuQXg6L._SL1300_.jpg',
    variant: 'The link opens the 5-piece Yellow set we checked; other colours and pack sizes can be priced differently, so check the selected option before paying.',
    description: [
      "Go Hooked's set of 5 yellow hanging planters is ₹198 on Amazon, rated 4.0 stars by 2,346 buyers.",
      'Each pot has a rattan-style woven finish, measures about 7.1 inches across and 4.8 inches tall, and comes with a roughly 13-inch hanging chain. They are made of UV-stabilised, BPA-free polypropylene, so they hold up outdoors.',
      'They suit a balcony, patio, porch or indoor window for small plants and trailing greens.',
    ],
  },
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g)$/;
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

const file = process.argv[2] ?? 'tg-1006i-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
