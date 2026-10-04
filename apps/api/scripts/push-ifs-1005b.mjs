// DEAL-INGEST indiafreestuff tick 2026-10-05b
//
// 4 listings swept vs 1120 seen slugs; 5 new. All resolved via base64 ?rto=, 0 already in DB. Myntra ld+json via curl:
// 4 pass, each Product.offers.price == card and InStock (Highlander overdyed 425, straight 415, tapered 356, Puma AMF1
// sweat pants 1749). Rejected: adidas Originals watch B0B3MBZZP6 (PDP 11,045 vs card 4,196, only 3 left, 2 ratings).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Myntra: (d) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const M = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Myntra', productId, url: `https://www.myntra.com/${productId}`, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const SIZE = (colour) => `Pick your waist size on the product page. We checked the price on the ${colour} option; it can differ between sizes, so confirm it after you select yours.`;
const IMGB = 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/';
const DEALS = [
  M('30776489', 'HIGHLANDER Men Overdyed Straight Fit Cargo Trouser, Black', 425, 3549, `${IMGB}2024/AUGUST/29/egmWkAJL_bb32d033b5e240d084f3d83ce62fbb26.jpg`, [
    "HIGHLANDER's overdyed straight-fit cargo trouser for men in Black is ₹425 on Myntra, rated 4.0 stars by 92 buyers.",
    'It is a woven cotton cargo with a mid-rise waist, a flat front, a button and zip closure and six pockets, including the two flap pockets on the thighs. The straight leg sits looser than a tapered cargo, so it works for casual days, travel and weekend wear.',
    'Overdyed cotton can bleed colour in the first few washes. Wash it inside out in cold water, separately at first, and dry it in the shade.',
  ], SIZE('Black')),
  M('31773196', 'HIGHLANDER Men Straight Fit Knitted Cargo Trousers, Olive', 415, 2599, `${IMGB}2024/NOVEMBER/28/nRNgyJsF_a0b209d2b70743ae9334ec29fe097304.jpg`, [
    "HIGHLANDER's straight-fit knitted cargo trousers for men in Olive are ₹415 on Myntra, rated 4.2 stars by 276 buyers.",
    'These are cotton-terry knit cargos with a drawstring waist and no fly, so they wear like joggers but keep the six-pocket cargo look. They suit lounging at home, travel days and casual errands more than an office.',
    'Knit cargos stretch a little with wear. If you are between sizes, the drawstring lets you take the smaller one.',
  ], SIZE('Olive')),
  M('25940226', 'HIGHLANDER Men Tapered Fit Pure Cotton Cargo Trouser, Blue', 356, 2099, `${IMGB}25940226/2024/12/14/75048a3d-6958-4f99-9ee7-0764eb682f011734169952472-HIGHLANDER-Men-Tapered-Fit-Pure-Cotton-Cargo-Trouser-4731734-1.jpg`, [
    "HIGHLANDER's tapered-fit pure cotton cargo trouser for men in Blue is ₹356 on Myntra, rated 3.8 stars by 3,073 buyers.",
    'It is a pure cotton cargo with a mid-rise waist, a button and zip closure and six pockets. The tapered leg narrows toward the ankle, which gives a neater line with sneakers than a straight cargo.',
    'With over 3,000 ratings, the reviews give a real picture of fit. Read the recent ones on sizing before you pick, because tapered legs feel tighter at the calf.',
  ], SIZE('Blue')),
  M('42238587', 'Puma Aston Martin F1 Essentials Men Side Pocket Sweat Pants, Green', 1749, 4999, `${IMGB}2026/MAY/17/OcJjHFEh_643bdeaca8fc44789e3544a65a1dd3ee.jpg`, [
    "Puma's Aston Martin F1 Essentials sweat pants for men in Green are ₹1,749 on Myntra, rated 4.2 stars by 46 buyers.",
    'They are full-length French terry joggers with an elastic waistband and drawcord, two side pockets and AMF1 plus Puma branding. Puma says they are made with at least 50% recycled material. The regular fit makes them easy wear for travel, the gym commute or race-day watching.',
    'French terry is warmer than a light track pant, so these suit cooler mornings and air-conditioned spaces better than a hot afternoon.',
  ], SIZE('Green')),
];
const IMG = /^https:\/\/assets\.myntassets\.com\/[\w,/.-]+\.jpg$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
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

const file = process.argv[2] ?? 'ifs-1005b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
