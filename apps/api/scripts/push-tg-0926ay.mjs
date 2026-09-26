// TELEGRAM-DEAL-MONITOR tick 2026-09-26ay
//
// 4 new single-product rows from the group sidebar (CoolzTricks Studds helmet, Dealzone WAICO puncture kit, ONLINE
// SHOPPING DEALS Solimo diapers, SB Loots Freecultr bandanas). Amazon rows re-read on the PDP in the logged-in tab
// (#centerCol price + M.R.P., add-to-cart, no clip coupon, data-old-hires image); Flipkart row read from ld+json
// (₹249 InStock, 4.1★). Caresmith trimmer rejected: ₹891 only after a 19% clip coupon. Copy is original. Writes a
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
  A('B0DBDFFY7D', 'Studds Drifter ISI and DOT Certified Full Face Helmet with Inner Sun Visor', 1502, 2695, '51NeQpUadIL._SL1200_', [
    'The Studds Drifter full-face helmet is listed at ₹1,502 on Amazon, 44% below its M.R.P.',
    'It carries both ISI and DOT certification, pairs a high-impact outer shell with a drop-down inner sun visor and rear spoiler, and uses a hypoallergenic liner that comes out for washing. Chin and top vents plus rear exhausts keep air moving on longer rides.',
    'Helmet fit decides protection, so measure your head circumference and match it to the Studds size chart before ordering.',
  ], 'Pick your size and colour on the product page; the price can differ between variants.'),
  A('B0GCSFQ47T', 'WAICO 13 in 1 Tubeless Tyre Puncture Repair Kit for Car and Bike', 189, 999, '719sB7zroGL._SL1254_', [
    'WAICO\'s 13-piece tubeless tyre puncture kit costs ₹189 on Amazon right now, 81% off the M.R.P.',
    'The pouch holds a reamer, insertion probe, ten rubber repair strips, adhesive solution, nose plier, folding knife, marking chalk, gloves and a spray bottle for finding the leak, so a nail puncture can be plugged without taking the wheel off. It works on car, bike and SUV tubeless tyres and is rated 3.9 stars.',
    'A string plug is a roadside fix; get the tyre inspected at a shop afterwards, especially if the hole is near the sidewall.',
  ], 'Make sure your tyres are tubeless — this kit does not repair tube-type tyres.'),
  A('B0C8THGZLV', 'Amazon Brand Solimo Adult Diapers Pant Style, Large, 10 Count', 199, 580, '61olouImwSL._SL1500_', [
    'A 10-count pack of Solimo pant-style adult diapers in Large is down to ₹199 on Amazon, 66% under M.R.P.',
    'The Large size fits waists from 30 to 55 inches, and the pants use a gel absorbent core, a breathable waistband, aloe vera lining against rashes, a wetness indicator and tear-away sides for quick changes. Buyers rate the pack 3.8 stars.',
    'That works out to about ₹20 per pant, a reasonable price to stock up if you already know Large is the right fit.',
  ], 'Check that the listing shows Large, 10 count before checkout.'),
  F('BDAG22BWF5S2QYFR', 'FREECULTR Men Printed Bandana, Pack of 2', 249, 999, RK('bandana/3/5/j/na-free-2-fc-buff-bnd-prnt-blk-char-02-fz-freecultr-na-resized-original-imahkjfcrzx43qe9.jpeg'), [
    'A pack of two FREECULTR printed bandanas sells for ₹249 on Flipkart, 75% off the listed M.R.P.',
    'These are free-size tube-style buffs that can be worn as a neck gaiter, face cover under a helmet, headband or wristband, which makes them handy for bike rides, gym sessions and dusty commutes. The listing holds a 4.1-star rating from over a hundred reviews.',
    'Print combinations vary by seller stock, so check the colour pair shown on the product page before you order.',
  ], 'Free size; confirm the colour combination on the product page.'),
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

const file = process.argv[2] ?? 'ifs-0926au-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
