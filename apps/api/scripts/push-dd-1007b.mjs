// DESIDIME-INGEST tick 2026-10-07b
//
// 36 discovered -> 8 product-resolved -> 2 already in DB -> 6 fresh (all Amazon) -> 1 pushed.
// Dropped (PDP read, same-origin fetch in the logged-in Amazon tab):
//   - DABUR Fem handwash B0D314FYDY: personal-care FMCG.
//   - PHILIPS PowerPro FC9352 B072J83V9W: ₹8,499 on PDP vs ₹7,650 card.
//   - STHIRA headrest cover B0G13VYHPV: ₹465 vs ₹451.
//   - Pillow speaker B0HJYYWPS5: ₹246 vs ₹234, no ratings.
//   - Hitachi 2 Ton 3 Star AC B0GP6PGNZM: ₹47,498 vs ₹41,748.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const SIZE = 'The link opens the exact size and colour we checked; other sizes can be priced differently, so check the selected size before paying.';
const ONE = 'The link opens the exact variant we checked; other colours can be priced differently, so check the selected option before paying.';
const DEALS = [
  {
    store: "Amazon", productId: "B0DV7FS4K6", name: "Nike Men Downshifter 13 Running Shoes", price: 2499, mrp: 4295,
    image: "https://m.media-amazon.com/images/I/71Vgdnu8UYL._SL1500_.jpg", variant: SIZE,
    description: [
      "Nike's Downshifter 13 running shoe for men is ₹2,499 on Amazon, 42% below M.R.P., rated 3.7 stars across 19 reviews.",
      "The listing we checked is UK 6. The Downshifter is Nike's entry-level road running shoe, built for daily runs, gym sessions and walking.",
      "Genuine Nike running shoes rarely drop this far below list price on Amazon India, so it is worth checking if your size is available.",
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
  if (!d.description[0].includes(`${discountPct}% below`)) throw new Error(`copy pct ${d.productId}`);
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

const file = process.argv[2] ?? 'dd-1007b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
