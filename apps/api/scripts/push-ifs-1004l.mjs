// DEAL-INGEST indiafreestuff tick 2026-10-04l
//
// 4 listings (/deals p1-3 + /deals/superdeals), 1060 seen. 16 new slugs resolved via base64 ?rto= Buy Now (15 Amazon,
// 1 Flipkart), Huggies diapers skipped (FMCG), 0 already in DB. Amazon tab verify (#availability + add-to-cart +
// #centerCol price): 3 pass. Flipkart PDP ld+json read in the logged-in tab (curl 403s): Pepe Jeans shirt 849 InStock
// == card. Rejected: ratings (Puma Solescape 3, MIKRAM shorts 1 + min buy 2, comforter 0), paise price (Bata derby
// 1,080.37, Solimo containers 415.60), low stock (MSI B650I, Puma Tread Run, track pants - Only 1 left; Reebok pants
// Only 4 left + 0 ratings), drift (MAHARAJA table set PDP 5,268 vs card 4,742), no availability (Little Olive table).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com${d.path}?pid=${d.productId}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const F = (productId, path, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, path, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const SIZE = (thing, colour) => `Pick your ${thing} on the product page. We checked the price on the ${colour} option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B0FK2V4JPD', 'Puma Men Softride Slide Sandals, White-Navy-For All Time Red', 1049, 3499, '41B9xEp7ixL._SL1200_', [
    "Puma's Softride Slide for men in White-Navy-For All Time Red is ₹1,049 on Amazon, rated 3.9 stars across 213 reviews.",
    'It is a one-piece synthetic slide built for the pool, the beach and quick trips out of the house. Softride is the name of Puma\'s soft cushioned footbed, so it is meant to feel easier underfoot than a flat rubber slider. Synthetic dries fast and can be rinsed clean after sand or chlorine.',
    'Slides have no back strap. If you want something for long walks, pick a sandal with a heel strap instead.',
  ], SIZE('UK size', 'White-Navy-For All Time Red')),
  A('B0CXT2ZBHG', "POPWINGS Women's Strap Crop Top with Sweetheart Neck, Pink", 199, 1999, '617EB0q54ML._SL1280_', [
    "POPWINGS' strappy crop top with a sweetheart neck is ₹199 on Amazon in Pink, rated 3.6 stars across 21 reviews.",
    'It is a lightweight polyester top with thin straps and an open back. Wear it with jeans or a skirt for college or a night out, or put a blazer or shrug over it for something smarter.',
    'Polyester is light but traps heat more than cotton. On a humid afternoon, it is more comfortable worn in the evening.',
  ], SIZE('size', 'Pink')),
  A('B0FV8NP8P9', "Symbol Men's Cotton-Blend Terry Knit Pants, Regular Fit, Beige", 449, 1699, '61S-PWGzg9L._SL1500_', [
    "Symbol's cotton-blend terry knit pants for men in Beige are ₹449 on Amazon. Symbol is an Amazon brand, and these are rated 3.8 stars across 53 reviews.",
    'The fabric is a soft terry with some natural stretch. They have an elastic waist with a drawstring, slant side pockets, one back pocket, a pin tuck down the front and folded hems. The regular fit makes them easy to wear at home, on a flight or out for a coffee.',
    'Symbol puts its size and fit guide in the fifth image on the listing. Check it before you pick your size.',
  ], SIZE('waist size', 'Beige')),
  F('SHTGM2HGMHAUZYJP', '/pepe-jeans-men-printed-casual-blue-shirt/p/itmfdde09b26d6a4', 'Pepe Jeans Men Printed Casual Shirt, Blue', 849, 2999,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shirt/f/b/g/-original-imagmwau6jrffdgw.jpeg?q=70', [
    "Pepe Jeans' printed casual shirt for men in Blue is ₹849 on Flipkart, rated 3.9 stars by 8 buyers.",
    'It is a branded printed shirt made for casual wear: weekends, dinners and days out. Delivery is free, and Flipkart lists a 5-day return window on it.',
    'Pepe Jeans sells several printed blue shirts under almost the same name. Match the print in the photo before you pay.',
  ], SIZE('size', 'Blue')),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\.flixcart\.com\/image\/[\w/.-]+\.jpeg\?q=\d+)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Flipkart' && !/^\/[\w-]+\/p\/itm\w+$/.test(d.path)) throw new Error(`flipkart path not /p/itm ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1004l-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
