// DEAL-INGEST indiafreestuff tick 2026-10-04n
//
// 4 listings (/deals p1-3 + /deals/superdeals), 1092 seen. 5 new slugs: FRENCH ESSENCE deo skipped (FMCG), 4 resolved
// via base64 ?rto= Buy Now (all Amazon), 0 already in DB. Amazon tab verify (#availability + add-to-cart + #centerCol
// price): 2 pass (Amazon Basics Cat-6 cable 154, Logitech M650 2,221 == card). Rejected: HP S5 Pro 524pm (no
// add-to-cart, #availability empty), Rapoo MT760L (Only 1 left, 0 ratings).
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
  A('B0CPLZT3LN', 'Amazon Basics RJ45 Cat-6 Ethernet Patch Cable, 5 Feet, White', 154, 499, '61m2xNbiz6L._SL1500_', [
    "Amazon Basics' 5-foot Cat-6 Ethernet patch cable in White is ₹154 on Amazon, rated 4.4 stars across 354 reviews.",
    'It is an unshielded twisted-pair (UTP) cable with RJ45 plugs on both ends and bare copper conductors inside a thick PVC jacket. Use it to wire a laptop, desktop, smart TV, gaming console or printer straight into your router or switch. A wired link usually gives steadier speed and lower lag than Wi-Fi for video calls and gaming.',
    'Five feet is about 1.5 metres. Measure the run from the router to your device first, since this length suits a desk, not a cable taken across a room.',
  ], 'We checked the price on the Cat-6, 5 Feet option. Other lengths are priced differently, so confirm the price after you pick yours.'),
  A('B09QWY7JYK', 'Logitech Signature M650 Wireless Mouse, Small to Medium Hands, Graphite', 2221, 3295, '6167BQLAieL._SL1500_', [
    "Logitech's Signature M650 wireless mouse in Graphite, sized for small to medium hands, is ₹2,221 on Amazon. It is rated 4.3 stars across 2,700 reviews.",
    'It connects over Bluetooth Low Energy or a Logi Bolt USB receiver, and its SmartWheel switches between line-by-line and fast free scrolling with a flick. The clicks are quiet, which Logitech rates at about 90 percent less noise than a standard mouse. The two side buttons can be remapped to shortcuts such as copy and paste in the free Logi Options+ app on Windows and macOS. Logitech rates the single AA battery that comes in the box at up to two years.',
    'This listing is the small-to-medium size. If you have large hands, look for the M650 L variant instead.',
  ], 'We checked the price on the Graphite, Small-Medium Hands option. Other colours and the large size can be priced differently.'),
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
    description, howTo: d.coupon ? [...HOWTO(d.name.split(',')[0], d.variant, d.store).slice(0, 3), d.coupon] : HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
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

const file = process.argv[2] ?? 'ifs-1004n-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
