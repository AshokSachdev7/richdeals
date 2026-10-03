// DEAL-INGEST indiafreestuff tick 2026-10-03h2 (late-resolved rows 44-69 of the 10-03h sweep)
//
// 26 late rows: 1 already in DB, 3 previously rejected/seen, 1 NOID, 19 new Amazon + 3 new Flipkart checked.
// Pushed 5, each read live (Amazon in the logged-in tab: priceToPay, #availability In stock, add-to-cart; Flipkart via ld+json
// InStock + price). Rejected: low stock (Babbler 1 left, Bembika 2 left, BNF 1 left, Tekcool lunch box 2 left), paise prices
// (Gadgetbite, Tekcool fan), per-unit/bogus M.R.P. (containers, Homesake, Kingdom ₹1, Lexar ₹75,000), weak ratings (Homeland
// 2.8 + OOS, Cortina 2.7, fleece 2.0), unrated no-name (Pot and Bloom, Tarang), Storbit drift (card 637 vs 657), Acer Nitro
// (no resolvable /p/itm path). Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.itm}?pid=${d.productId}&affid=djhackraj`,
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
const F = (productId, itm, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, itm, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B0FJ8R4KNR', 'Puma Mens Nomic 2.0 Sneaker', 1349, 4499, '51Tl1Tfk-IL._SL1200_', [
    "Puma's Nomic 2.0 sneaker for men is ₹1,349 on Amazon, 70% below the M.R.P.",
    'It is a low-top lace-up casual sneaker for daily wear, college and weekend outings, sold and shipped through Amazon by Cocoblu Retail. The listing is recent, with only a couple of ratings so far.',
    'Puma rarely sits this far under M.R.P. outside sale windows; check the size chart, since Puma fits close to standard UK sizing.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  A('B0FNR3656R', 'Ubon CH85 20W Dual USB Car Charger with Micro USB Cable', 146, 299, '714aJ6Jr8VL._SL1500_', [
    'The Ubon CH85 dual-USB car charger is ₹146 on Amazon, about half the M.R.P.',
    'It splits 20W across two USB-A ports so two phones charge at once, has overheat, overvoltage, overcurrent and short-circuit protection, and ships with a Micro USB cable in the box.',
    'Note the bundled cable is Micro USB, not Type-C; newer phones need your own USB-A to Type-C cable. The listing is new and has no reviews yet.',
  ], 'This is the CH85 20W model with a Micro USB cable.'),
  A('B0FQNDD9BJ', 'Inalsa Tasty Fry D5.5 Air Fryer, 5.5L, 1400W', 3793, 11995, '718kFQAjnqL._SL1500_', [
    'The Inalsa Tasty Fry D5.5 air fryer is ₹3,793 on Amazon, 68% off the M.R.P.',
    'It has a 5.5-litre basket sized for a family, a 1400W heater, digital touch controls with an LED display, and eight modes covering air fry, bake, grill, roast, toast, reheat and defrost. Buyers rate it 3.8 stars across 7 reviews.',
    'A 5.5-litre basket fits fries or tikka for three to four people in one batch, so it suits a family more than a 2-3 litre model.',
  ], 'This listing is the 5.5L D5.5 model.'),
  A('B0G1GZTHLK', 'GM G+ 33W Spyder GaN Charger, Type-C + USB-A, Foldable Pin', 749, 1699, '61C5DJr-ZCL._SL1500_', [
    'The GM G+ 33W Spyder GaN charger is ₹749 on Amazon, 56% below the M.R.P.',
    'GaN parts keep it pocket-sized and cooler than older bricks; it has one Type-C and one USB-A port, supports PD and QC 3.0, and has a BIS-certified foldable Indian pin. Buyers rate it 4.3 stars across 337 reviews.',
    '33W covers fast charging on most phones and a tablet; it is not enough for a laptop that needs 45W or more.',
  ], 'This listing is the charger only; no cable is mentioned in the title.'),
  F('ACCHMRG2Y5DVKJYC', 'triggr-roar-10-rgb-lights-fabric-exterior-tws-fm-mode-8h-playtime-w-bluetooth-speaker/p/itm52eec59cb8c3c',
    'TRIGGR Roar 10 Bluetooth Speaker, 10W, RGB Lights, TWS + FM', 679, 3999,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/speaker/v/a/x/-original-imahnjdwdert4fg3.jpeg?q=70', [
    'The TRIGGR Roar 10 Bluetooth speaker is ₹679 on Flipkart, 83% under the M.R.P.',
    'It puts out 10W through a fabric-covered body with RGB lights, pairs two units in TWS mode for stereo, has an FM radio mode and runs about 8 hours per charge. Buyers rate it 3.7 stars across 543 ratings.',
    'It suits a desk, a small room or a picnic; for a party-sized room look at 20W and above.',
  ], 'Pick the colour shown; other colours can be priced differently.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/h_1440,q_90,w_1080\/\S+|rukmini1\.flixcart\.com\/image\/\d+\/\d+\/\S+\.jpe?g\?q=\d+)$/;
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

const file = process.argv[2] ?? 'ifs-1003h2-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
