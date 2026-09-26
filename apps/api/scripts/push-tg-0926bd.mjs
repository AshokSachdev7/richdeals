// TELEGRAM-DEAL-MONITOR tick 2026-09-26bd
//
// 3 new single-product rows from the group sidebar (CoolzTricks tote bag via amzn.to, Dealzone Preethi mixer and
// ONLINE SHOPPING DEALS Roff Cera Clean via link.amazon). Each re-read on the PDP in the logged-in tab: #centerCol
// price matches the post, add-to-cart present, no clip coupon. Skipped: SB amzn.lt (/s? multi-ASIN search), Dealdost
// fkrt.to (Flipkart search page), handbag + Syska (already seen), cashew (grocery), Supercoins (promo). Copy is
// original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
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
  A('B0GYYHHJ3J', 'THE SACK CO. Large Canvas Tote Bag for Women with Zipper & Inner Pocket', 249, 899, '61B9D7SNa5L._SL1000_', [
    'THE SACK CO.\'s large canvas tote with a zip top is down to ₹249 on Amazon, 72% below its M.R.P.',
    'It is a roomy everyday carry with a zipper closure and an inner pocket for keys and a phone, sized for college, office or a grocery run. It holds a 3.9-star rating on Amazon.',
    'Canvas softens with use; spot-clean stains rather than machine-washing to keep the shape.',
  ], 'Pick your colour on the product page before checkout.'),
  A('B08N6FVGW3', 'Preethi Eco Fresh MG-291 750 W Mixer Grinder with Storage Jar, Yellow', 5817, 15935, '51weUYgEpQL._SL1000_', [
    'The Preethi Eco Fresh MG-291 mixer grinder is listed at ₹5,817 on Amazon, 63% under its M.R.P.',
    'It runs a 750 W VEGA W5 motor and adds Preethi\'s Food Sense system: a freshness-lock pump pulls air out of the jars so ground masalas and chutneys can be stored in the same container.',
    'Worth it if you grind in batches and want to store the output; for daily single-use grinding a plain 750 W mixer does the same job.',
  ], 'Confirm the model reads MG-291 (Yellow) before checkout.'),
  A('B0CRNSVFX7', 'Pidilite Roff Cera Clean All Purpose Tile, Floor & Wall Cleaner, 1 L, Pack of 4', 279, 999, '61cMDjbC3YL._SL1000_', [
    'A pack of four 1-litre Roff Cera Clean tile and floor cleaners from Pidilite is down to ₹279 on Amazon, 72% off the M.R.P. and about ₹70 a litre.',
    'It is used undiluted on tiles, ceramic, bathroom and kitchen floors to lift grease, hard-water marks and tough stains. It carries a 4.0-star rating from more than 43,000 reviews.',
    'Wear gloves and rinse the surface after use; do not mix it with bleach or other cleaners.',
  ], 'Check the listing shows 1 L, Pack of 4 before checkout.'),
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

const file = process.argv[2] ?? 'tg-0926bd-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
