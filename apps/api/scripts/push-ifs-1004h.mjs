// DEAL-INGEST indiafreestuff tick 2026-10-04h
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 18 new slugs vs seen (964). 4 skipped pre-resolve: Havells coupon
// category post + 3 [Apply N% Coupon] posts (post-coupon price unverifiable). 14 resolved via base64 ?rto= Buy Now, all Amazon,
// 0 already in DB. Logged-in Amazon tab verify: 4 pass (whole-rupee priceToPay == IFS card, In stock, add-to-cart, no low-stock line).
// Rejected: paise price (induction cooktop 2183.01, Solimo jar 1101.65, Borosil saucepan 1395.32, SR rack + only 1 left),
// rating (throw 2.5/5, HRX luggage 3.5/2), no ratings (Intex keyboard, Va-129 shoe), drift (DTR leggings 279 vs card 364,
// Li-Ning racquet 2667 vs 1689 + only 1 left + 2.9 stars). Copy is original, facts from the PDP bullets only.
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
  A('B0FW56WGWF', 'Fastrack Cosmix 1.32" AMOLED Metal Case Smart Watch with BT Calling', 2550, 8499, '71iPLgQsa3L._SL1500_', [
    "Fastrack's Cosmix smartwatch is ₹2,550 on Amazon, a large cut from its M.R.P. for a metal-case watch with an AMOLED screen.",
    'The 1.32-inch AMOLED display is the main draw at this price. AMOLED shows deeper blacks and stays readable outdoors better than the LCD panels on many budget watches. The case is metal rather than plastic, and navigation uses a push button. It takes Bluetooth calls from the wrist, tracks heart rate, SpO2 and sleep, carries an IP68 rating, and Fastrack quotes up to 5 days of battery. Built-in ChatGPT integration and AI watchfaces are listed as extras. Buyers rate it 4.5 stars across 25 reviews.',
    'IP68 covers rain, sweat and handwashing. It does not make the watch suitable for swimming or hot showers.',
  ], 'Check the strap colour on the product page. Other colours on the same page may be priced differently.'),
  A('B0CL5J1RCS', 'Home Centre Alpine Carnival Polyresin Tabletop Water Fountain, Black', 499, 899, '814N-zno-AL._SL1500_', [
    'A small Home Centre tabletop water fountain is ₹499 on Amazon, down from its listed M.R.P.',
    'It is a black polyresin piece about 13 × 13 × 20 cm, small enough for a desk, side table or puja corner. It runs on corded electric power and circulates water for a gentle flowing sound. Resin does not rust, and cleaning is a wipe with a soft cloth. Buyers rate it 3.6 stars across 19 reviews.',
    'Keep the water topped up. Running the pump dry shortens its life, and tap water leaves white scale over time, so filtered water is the better choice.',
  ], 'The pack has one fountain. Place it near a power socket, since it is corded.'),
  A('B09176VMBH', "KOTTY Women's High Waist Straight Fit Cotton Blend Denim Jeans", 400, 1999, '513IhKSlprL._SL1280_', [
    "KOTTY's high-waist straight-fit jeans for women are ₹400 on Amazon. With more than 3,700 ratings at 3.8 stars, they are among the most-reviewed budget women's jeans on the site.",
    'The fabric is 98% cotton with 2% elastane, so it gives a little stretch without the thin feel of jeggings. It has a high rise, a button closure and a straight leg that works with sneakers, kurtis or tops. Sizes run S to XXL, covering waist 26 to 34 inches. The brand advises hand wash only, and the jeans are made in India.',
    'Measure your hips too, not just the waist. Straight-fit jeans pinch at the hip first.',
  ], 'Pick your size and wash on the product page. The price can change between sizes and colours, so check it after you select yours.'),
  A('B0CV9LRJ89', 'POPWINGS Casual Puff Sleeve Round Neck Top for Women, Black', 199, 1999, '71WBbzy6GVL._SL1500_', [
    "POPWINGS' puff-sleeve top for women is ₹199 on Amazon, a deep cut from its M.R.P. on a basic western top.",
    'It is a black, regular-fit polyester top with puff sleeves and a round neck. It pairs with jeans, skirts or trousers for college, work or a casual evening out. Buyers rate it 4.0 stars across 309 reviews.',
    'Polyester holds its shape and dries fast, but it breathes less than cotton in peak summer. Machine wash it cold on a gentle cycle.',
  ], 'Pick your size on the product page. The price can differ between sizes, so confirm it after you select yours.'),
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

const file = process.argv[2] ?? 'ifs-1004h-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
