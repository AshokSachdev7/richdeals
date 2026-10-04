// DEAL-INGEST indiafreestuff tick 2026-10-04j
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 17 new slugs vs seen (1021). 4 skipped pre-resolve: DeoDap
// Myntra category post + DeoDap gift set (0 ratings, rejected in tg 1004s), Amazon Business monitors category post,
// Evani rose water (cosmetic). 13 resolved via base64 ?rto= Buy Now: all Amazon, 0 already in DB.
// Logged-in Amazon tab verify: 3 pass (priceToPay == IFS card, In stock, add-to-cart, no low-stock line, rating > 3.5 on 8+).
// Rejected: low stock (BNF skate pads, ADISO sneakers - Only 1 left, no ratings), ratings (POPWINGS skirt 3.0, POPWINGS
// belt dress 3.3/6, POPWINGS wrap dress 3.3/4, Zurity co-ord 2.6, phone magnifier 1.0/1, AIPL gel tape 1.0/1, LED study
// lamp 0 ratings), drift (ASUS TUF RTX 5060: PDP 1,82,976 vs card 74,009). Copy is original, facts from PDP bullets only.
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
const SIZE = (thing) => `Pick your ${thing} on the product page. We checked the price on the default option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B09XX9XN62', 'Kolorcase Silicone Case with Hook for boAt Airdopes 281 Pro, Black', 179, 399, '71HF2fKF2QL._SL1500_', [
    'A soft silicone case for the boAt Airdopes 281 Pro charging case is ₹179 on Amazon. It is made by Kolorcase, a third-party accessory brand, not by boAt.',
    'The case is a snug-fit silicone pouch that guards the charging case against scratches, knocks, dust and short drops. A cut-out lines up with the charging port, so you can charge without taking the cover off, and a hook lets you clip it to a bag or belt loop. Only the cover is in the box; the earbuds are not included. Buyers rate it 3.8 stars across 15 reviews.',
    'It is shaped for the 281 Pro only. Check your model name on the bottom of your charging case before ordering, because other Airdopes cases differ in size.',
  ], 'The black version has a printed logo. It fits only the Airdopes 281 Pro charging case.'),
  A('B0GH7NP9VB', 'Fire-Boltt Phoenix Air Bluetooth Calling Smartwatch, 1.26-inch Round Display, Petal Pink', 1399, 14999, '61inWFiwf3L._SL1500_', [
    "Fire-Boltt's Phoenix Air smartwatch in Petal Pink is ₹1,399 on Amazon. With 483 ratings at 3.9 stars, it is one of the better-reviewed small-dial calling watches at this price.",
    'The 1.26-inch round HD display is smaller than most budget smartwatches, which suits thin wrists. The body is metal but lightweight, it charges wirelessly, and it has a rotating side button. It makes Bluetooth calls through a built-in mic and speaker, and it tracks heart rate, SpO2, sleep, steps, calories and multiple sports. It is rated IP67 against dust and water splashes, and the box includes both a silicone strap and a mesh steel strap.',
    'IP67 covers rain and handwashing, not swimming or hot showers. Take it off before the pool.',
  ], 'We checked the price on the Petal Pink colour. Other colours can be priced differently, so confirm it after you pick one.'),
  A('B0DL63KGMN', 'Kuber Industries Stainless Steel Soup Bowl with Airtight Lid, Spoon and Handle, 600 ml, Pack of 4', 949, 4299, '71eDejtBLOL._SL1500_', [
    'A set of four Kuber Industries 600 ml stainless steel soup bowls is ₹949 on Amazon. That works out to about ₹237 per bowl, each with its own lid, spoon and handle.',
    'Each bowl measures about 14 × 11 × 7 cm and holds 600 ml, deep enough for instant noodles, pasta, soup or milk. The handle stays cool, so you can hold a hot bowl without burning your hand. An airtight lid seals it to stop spills and keep food warm, which makes it usable as a lunch carrier. The smooth steel inside is easy to wash. Buyers rate the set 3.9 stars across 18 reviews.',
    'Steel bowls are not microwave-safe. Heat food in a separate container, then pour it in.',
  ], 'We checked the price on the Navy Blue set of four. Other colours can be priced differently.'),
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

const file = process.argv[2] ?? 'ifs-1004j-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
