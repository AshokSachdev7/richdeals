// TELEGRAM-DEAL-MONITOR tick 2026-10-04q
//
// Sidebar read over 13 groups: 4 new source posts. SB Loots "outfit" post = 3 separate single-product Myntra links
// (myntr.it -> linkredirect -> myntra.com/<id>); each PDP fetched via curl: ld+json offers.price == post price, InStock,
// pdpData price.discounted the same in every size. Pushed all 3 via InRDeals (Myntra rule). Rejected: Maybelline lip balm @100
// (low-ticket FMCG/cosmetic), CoolzTricks HRX "upto 84%" category, Dealzone CASIO "upto 50%" category. Copy is original,
// facts from Myntra articleAttributes only (the T-shirt's neck attribute contradicts its name, so the copy names neither).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const AFF = { Myntra: (d) => MY(`https://www.myntra.com/${d.productId}`) };
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to bag and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const M = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Myntra', productId, name, price, mrp, exp: price, av: 'InStock', image: `https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/${img}.jpg`, description, variant });
const DEALS = [
  M('41032446', 'HIGHLANDER Men Relaxed Fit Blue Drop Shoulder Self-Design Cotton T-shirt', 493, 1899, '2026/APRIL/6/aOaV9N8H_0ac67d3ba62846bb9cec83c523632ff5', [
    'HIGHLANDER\'s relaxed-fit blue T-shirt for men is ₹493 on Myntra, about a quarter of its M.R.P. The same price applies in every listed size.',
    'It is a cotton half-sleeve tee with a drop-shoulder cut and an all-over self-design texture, so it looks less plain than a basic solid tee. The relaxed fit sits loose through the chest and body. With 4.3 stars across more than 8,800 ratings, it is one of Myntra\'s most-reviewed budget tees.',
    'Drop-shoulder tees are cut roomy by design. If you prefer a closer fit, stay with your usual size rather than sizing up.',
  ], 'Pick your size (S to XL) on the product page. All four sizes were in stock at this price when we checked.'),
  M('40301734', 'HERE&NOW Men Mid-Rise Stretchable Jeans', 577, 1299, '2026/FEBRUARY/25/vxaSfIb2_71c9d04caf1241a69a9ed4cccbf16b70', [
    'HERE&NOW mid-rise jeans for men are ₹577 on Myntra, more than half off the M.R.P.',
    'They are a classic-fit, medium-shade pair with a clean look and no distressing. The fabric has stretch, and the jeans have a button-and-zip closure, belt loops and five pockets. They are machine washable. Buyers rate them 3.8 stars across 97 ratings.',
    'Stretch denim loosens slightly with wear. If you are between two waist sizes, the smaller one usually settles in after a few days.',
  ], 'Pick your waist size on the product page. Sizes 28, 30 and 32 were in stock when we checked; size 34 was sold out.'),
  M('39380474', 'HRX by Hrithik Roshan Men Textured Slip-On Sneakers', 659, 3299, '2026/JULY/17/9oc1cKCT_3b744f5150bf45688a940156df59560e', [
    'HRX by Hrithik Roshan textured sneakers for men are ₹659 on Myntra, a steep cut from the M.R.P.',
    'They are round-toe slip-ons with a synthetic textured upper, a padded insole and a TPR sole, meant for everyday casual wear. There are no laces to tie. The listing carries a BIS certificate, and the pack has one pair. Buyers rate them 4.1 stars across 84 ratings.',
    'Slip-ons need a snug fit to stay on your heel. If you are between sizes, choose the smaller one.',
  ], 'Pick your UK size on the product page. Sizes 6, 8, 9 and 10 were in stock when we checked; size 7 was sold out.'),
];
const IMG = /^https:\/\/assets\.myntassets\.com\/h_1440,q_100,w_1080\/v1\/assets\/images\/[\w/]+\.jpg$/;
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
  if (!row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-1004q-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
