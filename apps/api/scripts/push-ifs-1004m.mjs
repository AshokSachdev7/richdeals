// DEAL-INGEST indiafreestuff tick 2026-10-04m
//
// 4 listings (/deals p1-3 + /deals/superdeals), 1076 seen. 16 new slugs; 3 pre-skipped (Laviland wire 3.4, Skybags +
// KODAK TV bank-card-only price), 13 resolved via base64 ?rto= Buy Now (12 Amazon, 1 Flipkart), 0 already in DB.
// Amazon verify (#availability + add-to-cart + #centerCol price): Wildcraft Evo 790 == card; Alan Jones hoodie base
// 474 (card 459 is after the optional 3% clip coupon, so we publish the base price). Flipkart ld+json in the logged-in
// tab: Magnum Evolix 55 1499 InStock, real /p/itm path matched by sku. Rejected: coupon-only card prices (3x ATTRO
// 43-45%, foot scrubber 50% + 0 ratings), ratings (Noble Monk 0, Cerrito 1, TEEN TEEN 3 + paise 144.80, Audio Array
// 3.0 x2 + drift 2349 vs 2302), Babbler racquet Only 1 left, Godox trigger no add-to-cart.
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
  A('B0CYTD54RJ', 'Wildcraft Evo Backpack 35 L, Mosaic Red', 790, 1799, '51Vq3C0JiCL._SL1200_', [
    "Wildcraft's Evo 35-litre backpack in Mosaic Red is ₹790 on Amazon, rated 4.0 stars across 220 reviews.",
    'At 35 litres it sits between a college bag and a weekend travel pack. It holds a few days of clothes, books or a laptop sleeve plus a water bottle, which makes it a practical pick for daily commutes, short trips and treks.',
    'Wildcraft sells the Evo in several prints with different prices. Check the colour name on the page before you pay.',
  ], SIZE('print', 'Mosaic Red')),
  { ...A('B0B93FFC1F', "Alan Jones Clothing Men's Solid Hooded Sweatshirt, Light Purple", 474, 1599, '71tBAw7xRYL._SL1500_', [
    "Alan Jones Clothing's solid hooded sweatshirt for men in Light Purple is ₹474 on Amazon. It is one of the most-reviewed hoodies in its range, rated 4.0 stars across 10,917 reviews.",
    'It has a drawstring hood, a kangaroo front pocket and ribbed cuffs and hem. It is a plain everyday hoodie: layer it over a tee on a cool morning, for travel or for winter evenings.',
    'Amazon also showed an optional 3% clip coupon on the page when we checked. Tick it before checkout and the price drops a little further.',
  ], SIZE('size', 'Light Purple')), coupon: 'Tick the 3% coupon box on the Amazon product page before adding to cart. The coupon is optional; the price shown here is before it.' },
  F('STCHEZK5TXZCBGFY', '/safari-magnum-evolix-55-cabin-suitcase-8-wheels-22-inch/p/itm68af447081d84', 'Magnum by Safari Evolix 55 Cabin Suitcase, 8 Wheels, 22 Inch, Dark Grey', 1499, 7596,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/suitcase/6/a/u/-watermarked-original-imahm57qppnex2gb.jpeg?q=70', [
    "Magnum by Safari's Evolix 55 cabin suitcase in Dark Grey is ₹1,499 on Flipkart, rated 4.3 stars by 53,703 buyers.",
    'It is a 55 cm, 22-inch cabin-size hard case on eight spinner wheels, so it rolls upright through an airport or a railway platform without tipping. The 55 cm height is the size most Indian domestic airlines accept as cabin baggage. Delivery is free.',
    'Airlines check weight as well as size. Weigh the bag at home once it is packed.',
  ], SIZE('colour', 'Dark Grey')),
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

const file = process.argv[2] ?? 'ifs-1004m-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
