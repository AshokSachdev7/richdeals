// TELEGRAM-DEAL-MONITOR tick 2026-10-04o
//
// Sidebar read over 13 groups: 4 new source posts. Dealzone CADLEC B0FLWR2TT6 @999 is already LIVE at 999 (verified tick n), no change.
// Pushed 3: Shopsy chopper combo (Shopsy PDP fetched via curl, no ld+json: finalPrice 223, mrp 599, 4.0 / 1,377, no Sold Out widget),
// Puma Wish B0BN6WV1PN and VIP Bonus vest combo B0D59ZSBS3 (logged-in Amazon tab: priceToPay 1,289 / 269, #availability In stock,
// add-to-cart present, no low-stock line, 4.0 / 341 and 4.1 / 174). The vest post said "pack of 4", but Amazon's per-unit ₹53.80
// implies 5, so the copy states no count. Shopsy != Flipkart -> Cuelinks. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const CUE = (u) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(u)}`;
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Shopsy: (d) => CUE(d.url),
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
const DEALS = [
  { store: 'Shopsy', productId: 'XCOGFFB92YFNHZRZ', name: 'STARKK Quick Vegetable & Fruit Chopper, Combo of 2, Stainless Steel Blades', price: 223, mrp: 599, exp: 223, av: 'In stock',
    url: 'https://www.shopsy.in/starkk-stark-brand-new-950ml-green-purple-fast-cutting-machine-stainless-steel-blade-vegetable-fruit-chopper/p/itm9977ac22a874c?pid=XCOGFFB92YFNHZRZ',
    image: 'https://rukminim3.flixcart.com/image/1114/972/l2krs7k0/shopsy-chopper/n/k/c/no-pradivon-combo-of-2-quick-chopper-with-3-stainless-steel-original-imagdw76fz32gzwe.jpeg',
    description: [
      'Two pull-cord vegetable choppers for ₹223 on Shopsy, Flipkart\'s value marketplace. That is well under the listed M.R.P. for a two-piece set.',
      'Each chopper has stainless-steel blades turned by a pull cord. A few pulls dice onion, tomato, chilli or garlic for a tadka without a knife and board. Two units let you keep one for onions and one for everything else, so flavours do not mix. Buyers rate it 4.0 stars across 1,377 ratings.',
      'Pull-cord choppers suit small batches of soft vegetables. For hard roots like carrot or beetroot, cut them into small chunks first.',
    ],
    variant: 'Check the colour combination shown on the product page before you add it to the cart.' },
  A('B0BN6WV1PN', 'Puma Men Wish Running Shoe', 1289, 4299, '61MBLkVZnvL._SL1200_', [
    'Puma\'s Wish running shoe for men is ₹1,289 on Amazon, a deep cut from its M.R.P. on a branded everyday running shoe.',
    'The Wish is a lace-up running shoe from Puma\'s everyday range, meant for daily walks, gym sessions and easy runs rather than racing. Buyers rate it 4.0 stars across 341 reviews.',
    'Puma sizing runs close to standard UK sizes. If you are between sizes, the larger one is usually the safer pick for running.',
  ], 'Pick your UK size and colour on the product page. The price can differ between sizes, so confirm it after you select yours.'),
  A('B0D59ZSBS3', 'VIP Bonus Classic Cotton Round Neck Sleeveless Vest Combo for Men, Snow White', 269, 700, '61n8vMz4XIL._SL1440_', [
    'A combo pack of VIP Bonus Classic sleeveless vests is ₹269 on Amazon. Amazon\'s own per-unit figure works out to about ₹54 per vest.',
    'These are 100% cotton, round-neck, regular-fit innerwear vests in plain white, the everyday kind worn under a shirt. Cotton absorbs sweat, which matters in Indian summers. Buyers rate them 4.1 stars across 174 reviews.',
    'Check the piece count in the listing title on the product page before you order, since combo sizes vary by seller.',
  ], 'Pick your chest size on the product page. VIP vests use chest size in centimetres, so match your usual vest size.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukminim\d\.flixcart\.com\/image\/\d+\/\d+\/[\w/.-]+\.jpe?g)$/;
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
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-1004o-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
