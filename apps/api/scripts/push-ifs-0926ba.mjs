// DEAL-INGEST indiafreestuff tick 2026-09-26ba
//
// 6 new single-product rows from the IFS /deals/index + homepage sweep (26 new slugs, 21 resolved via the base64
// ?rto= Buy Now id). Amazon rows re-read on the PDP in the logged-in tab (#centerCol price + M.R.P., add-to-cart,
// no clip coupon, data-old-hires image); Flipkart rows read from ld+json (price, InStock, rating). Rejected: boAt
// K100+ and Meridian suitcase (IFS card price drifted from the PDP), TIGC jacket (3.0★), SNOW WAVE (3.5★), ACTIVA fan
// (bank-card price), bumper clips (no rating/image), five clip-coupon rows. Copy is original. Writes a
// {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/product/p/itme?pid=${id}&affid=djhackraj`,
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
const F = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const RK = (p) => `https://rukmini1.flixcart.com/image/1500/1500/xif0q/${p}?q=70`;

const DEALS = [
  A('B095SYF8RQ', 'Amazon Brand Symbol Men\'s Quilted Bomber Jacket', 679, 3399, '71WSgVSLeWL._SL1500_', [
    'Symbol\'s quilted bomber jacket for men is down to ₹679 on Amazon, 80% below its M.R.P.',
    'It is a 100% polyester zip-through jacket with a band neck, a varied quilting pattern and a ribbed hem that keeps the fit snug and holds warmth in. It is machine washable, made in India and rated 3.8 stars across more than 870 reviews.',
    'The brand is moving from House & Shields to Symbol, so the parcel may carry either label; the jacket itself is the same.',
  ], 'Pick your size on the product page; the price can differ between sizes.'),
  A('B0G718QQ7V', 'Faber 1.8L Rice Cooker with 2 Stainless Steel Pots, FRC Sydney 1.8 SS2', 3800, 7599, '51tkNQFFCeL._SL1024_', [
    'The Faber FRC Sydney 1.8-litre rice cooker costs ₹3,800 on Amazon today, half its M.R.P.',
    'It runs at 700 watts, ships with two stainless-steel cooking pots instead of the usual non-stick bowl, and switches itself from Cook to Warm with LED indicators showing which mode is on. A measuring cup, steaming plate and spatula come in the box, and Faber covers the product for 2 years and the heating element for 5.',
    'A 1.8-litre pot suits a family of three to five; the steel pots also handle biryani, soup, pongal and noodles, not just plain rice.',
  ], 'Check the listing shows the FRC Sydney 1.8 SS2 model before checkout.'),
  A('B0GJ4L7FP8', 'Mumma\'s LIFE 3L Triply Stainless Steel Kadai with Lid, 24 cm', 1311, 3599, '51YwzAIfQRL._SL1500_', [
    'Mumma\'s LIFE 3-litre triply stainless-steel kadai with lid is listed at ₹1,311 on Amazon, 64% off the M.R.P.',
    'The 24 cm pan uses a three-layer body with a 2.5 mm heavy base for even heat, an 18/8 food-grade steel cooking surface that does not rust, and works on both gas and induction. Buyers rate it 4.5 stars.',
    'Triply steel needs a minute of preheating before oil goes in; do that and deep frying or sautéing sticks far less.',
  ], 'Confirm the 3L, 24 cm size is selected on the product page.'),
  A('B0F4KBXB6P', 'Tokyo Talkies Women Sleeveless V-Neck Knee-Length Dress', 160, 1599, '61iDYsENrhL._SL1500_', [
    'A Tokyo Talkies sleeveless dress for women sells for ₹160 on Amazon right now, 90% under M.R.P.',
    'It is a knee-length casual dress in a cotton blend with a V-neck, made in India by Brandstudio Lifestyle (style TTJ6008851). The listing is new with only a handful of reviews so far.',
    'Deep clearance cuts like this often apply to one or two sizes only, so check yours is still at this price before ordering.',
  ], 'Select your size on the product page; not every size may be at this price.'),
  F('PLWGD6ADWDC58BNE', 'AMAK INC Microfibre Chair Pad, Pack of 2, Grey 40 x 40 cm', 146, 999, 'https://rukmini1.flixcart.com/image/1500/1500/l1nwnm80/pillow/n/o/u/microfiber-square-chair-cushion-seat-pad-for-office-home-or-car-original-imagd6aapuqspezz.jpeg?q=70', [
    'Two AMAK INC microfibre chair pads in grey cost ₹146 on Flipkart, 85% off the listed M.R.P.',
    'Each square pad measures 40 x 40 cm and is filled with soft microfibre, sized for dining chairs, office chairs or a car seat. The listing holds a 4-star rating from over 1,400 buyers.',
    'That is about ₹73 per cushion; the pack-of-3 and pack-of-4 options on the same page cost more per piece.',
  ], 'Choose the 40 x 40, Pack of 2 variant in grey on the product page.'),
  F('PERHHPYEKXVH7XUN', 'OSCAR Big Shot Jazz Club and Forever Oud Intense Perfume Combo, 200 ml', 299, 2298, 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/0/m/d/-resized-original-imahmkydywv5hvrh.jpeg?q=70', [
    'OSCAR\'s two-bottle eau de parfum combo, Big Shot Jazz Club and Forever Oud Intense, is ₹299 on Flipkart, 87% below M.R.P.',
    'The set totals 200 ml of EDP across the two scents, one a fresh club-style blend and one a heavier oud, so you get a daytime and an evening option in one order. It is rated 4.1 stars on Flipkart.',
    'That comes to about ₹1.5 per ml, which makes it an easy pick for trying a budget oud without committing to a single large bottle.',
  ], 'Check the combo shows both Jazz Club and Forever Oud Intense before checkout.'),
];
// ------------------------------------------------------------------- derive + gate
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/\S+)$/;
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
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
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

const file = process.argv[2] ?? 'ifs-0926ba-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
