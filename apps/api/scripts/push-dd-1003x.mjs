// DESIDIME-INGEST tick 2026-10-03x
//
// Stage 1: 35 discovered, 18 resolved, 2 already in DB, 16 fresh. Pushed 2, both read in the logged-in Amazon tab
// (priceToPay == DesiDime card price, #availability In stock, add-to-cart present). Rejected: Digihaat ACV (food, no
// ld+json), Samsung G3 monitor on Flipkart (price drift), Careforce ear-wax cleaner (health), Dove shampoo (low-ticket
// FMCG), XPG S60 SSD (no buy box, 2 ratings), Beyond Auriga stove (3.1 stars), Maybelline blush + Aristocrat Harbour
// (unavailable), mini steam iron + travel bag (0 ratings), Gleva lipstick (3 ratings), IFB AC (card 28,740 vs PDP 33,990),
// GOVO soundbar (card 4,185 vs PDP 4,999), GadgetBite car charger (paise price 559.82). Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = { Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21` };
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
  A('B0G448YFQW', 'SPYDER CRAFT Engineered Wood Computer Desk for Home Office and Study', 2246, 9999, '61IpKvqO4XL._SL1024_', [
    "SPYDER CRAFT's engineered-wood computer desk is ₹2,246 on Amazon, 78% below the M.R.P.",
    'It is built from 15 mm pre-laminated engineered wood with a sealed, scratch- and fade-resistant finish that wipes clean with a damp cloth. Buyers rate it 3.6 stars across 304 reviews.',
    'It suits a work-from-home corner or a student study table; check the listed dimensions against your floor space before ordering.',
  ], 'Pick the finish you want; the price shown is for the default variant.'),
  A('B0DVG7XMJ9', 'Fastrack Stunners X Special Edition Black Dial Leather Analog Watch for Men', 1194, 2095, '712+BUzCvaL._SL1500_', [
    "Fastrack's Stunners X special-edition men's watch is ₹1,194 on Amazon, 43% off the M.R.P.",
    'It has a black round analog dial, quartz movement and a leather strap, styled for everyday and office wear. Buyers rate it 4.0 stars across 194 reviews.',
    'Fastrack is a Titan brand, so service and warranty support are easy to find across India.',
  ], 'This listing is the black-dial, leather-strap model.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
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

const file = process.argv[2] ?? 'dd-1003x-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
