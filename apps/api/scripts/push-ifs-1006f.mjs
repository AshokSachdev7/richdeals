// DEAL-INGEST indiafreestuff tick 2026-10-06f
//
// 36 new IFS slugs -> 14 junk-filtered -> 22 resolved -> 0 already in DB -> 4 pushed (Amazon).
// Dropped (PDP read, same-origin fetch in the logged-in Amazon tab):
//   - GIGABYTE H810M K B0FH4LPLGQ: ₹8,999 on PDP vs ₹6,663 card.
//   - Milton Felice 1000 B0F1KHQ2KJ: ₹1,054 vs ₹643.
//   - NMII bangles B0F6YHZTY1: ₹578 vs ₹120.
//   - 3M adhesive pads B07DLGZ828: ₹381 vs ₹391 (drift > ₹1).
//   - BNF ramen pot B0DSLFXKH1: no buy box.
//   - Reebok sports bra, STRIFF stylus, men's slipper, Noble Monk polo: rating ≤3.2.
//   - Woodland x2, Puma Unleash: only 1 left.
//   - ANT webcam (14 reviews), JUICE cable + UNBREAKcable tripod (2 reviews): too few reviews.
//   - Duke x2 (Myntra), ZEBRONICS County 6 (Flipkart): PDP not readable this tick, unverified.
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
    store: 'Amazon', productId: 'B0BVMG6M5J', name: 'Puma Men Flexrate Sneaker Black Light Lime White', price: 1260, mrp: 4499,
    image: 'https://m.media-amazon.com/images/I/51kLkBOZE9L._SL1200_.jpg', variant: SIZE,
    description: [
      "Puma's Flexrate sneaker for men is ₹1,260 on Amazon, 72% below M.R.P., rated 3.7 stars across 84 reviews.",
      'This is the Black / Light Lime / White colourway, a lace-up everyday sneaker from Puma.',
      'Puma sneakers at this level usually sell well above the price shown here, so the deal is worth a look if your size is in stock.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0GKY8MNZK', name: 'Kratos 51 Inch Aluminium Tripod Stand with Mobile Holder', price: 799, mrp: 2699,
    image: 'https://m.media-amazon.com/images/I/61hsV9biYIL._SL1500_.jpg', variant: ONE,
    description: [
      "Kratos's 51-inch (130 cm) aluminium tripod is ₹799 on Amazon, 70% below M.R.P., rated 4.0 stars across 179 reviews.",
      'It has three legs with flip locks and non-slip rubber feet, a built-in level tester, a three-way head for portrait or landscape shots, and a 360° rotatable mobile holder.',
      'A budget pick for video calls, reels and basic camera work at home.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0GZWD7LF9', name: 'boAt FlexiCharge 401 4-in-1 60W Cable Carbon Black', price: 349, mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/71tU3F3Kk8L._SL1500_.jpg', variant: ONE,
    description: [
      "boAt's FlexiCharge 401 cable is ₹349 on Amazon, 83% below M.R.P., rated 3.6 stars across 44 reviews.",
      'It is a 4-in-1 cable with swappable Type-C and Lightning heads plus USB-A, supports up to 60W Power Delivery, and transfers data at up to 480 Mbps.',
      'One tangle-free cable that covers an iPhone, an Android phone and a laptop.',
    ],
  },
  {
    store: 'Amazon', productId: 'B08CB7LXYR', name: 'Reebok Classics Men Clubonic Sneaker Navy Solar Yellow', price: 1097, mrp: 2999,
    image: 'https://m.media-amazon.com/images/I/71An4t5XGrL._SL1500_.jpg', variant: SIZE,
    description: [
      "Reebok's Clubonic sneaker for men is ₹1,097 on Amazon, 63% below M.R.P., rated 4.1 stars across 29 reviews.",
      'The listing we checked is the Navy / Semi Solar Yellow colourway (EW4374) in UK 9, and it ships in 1-2 days.',
      'A retro-style Reebok Classics court sneaker for casual wear.',
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

const file = process.argv[2] ?? 'ifs-1006f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
