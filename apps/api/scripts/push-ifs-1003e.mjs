// DEAL-INGEST indiafreestuff tick 2026-10-03e
//
// Sweep: /deals 1-3 + /deals/superdeals, 96 cards, 6 unseen. 3 rejected (HP Omnibook card-only price, Safari sale hub,
// HRX luggage 2 ratings). 3 verified on the PDP: ANT keyboard + Puma shoe in the logged-in Amazon tab (price, M.R.P.,
// #availability In stock, add-to-cart present), CabONE wire on Flipkart via ld+json (InStock, 4.1 from 8 ratings).
// None in the DB by productId or affiliateUrl. Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
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
  A('B0H1HDVL5B', 'ANT Master 25 Wireless Keyboard, Black & White', 479, 1099, '71J32i2iDvL._SL1500_', [
    'The ANT Master 25 wireless keyboard is ₹479 on Amazon, 56% below the M.R.P.',
    'It is a full-size 2.4 GHz wireless keyboard with a USB receiver, so it works plug-and-play on Windows laptops and desktops without pairing or drivers. Buyers rate it 3.9 stars across 37 reviews.',
    'Good fit for a spare desk setup, a smart-TV box or replacing a worn laptop keyboard; check the battery type on the listing before ordering.',
  ], 'Confirm the Black & White colour is selected; other colours can be priced differently.'),
  A('B0CTZQ1KBT', 'Puma Mens Scorch Whizz Street Running Shoe', 1349, 4499, '51Lf3S3RQiL._SL1200_', [
    'Puma\'s Scorch Whizz Street running shoe for men is ₹1,349 on Amazon, 70% below the M.R.P.',
    'It is a lightweight lace-up road runner with a cushioned midsole and a grippy rubber outsole, sold by Cocoblu. Buyers rate it 3.8 stars across 61 reviews.',
    'Puma sizes run close to standard UK sizing; if you are between sizes, go half a size up for running.',
  ], 'Pick your shoe size first — the deal price applies to the size you see it on, and other sizes may price differently.'),
  F('ELWHR46B5G4ZMTJS', 'cabone-23-76-pvc-flexible-twisted-copper-wire-2-core-electric-electrical-cable-90-mtr-0-5-sq-mm-red-yellow-91-m/p/itmaad72baeda635',
    'CabONE 23/76 PVC Flexible Twisted Copper Wire, 2 Core, 0.5 sq mm, 90 m, Red/Yellow', 451, 899,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/electrical-wire/n/4/v/cp-23-76-91-14-0-5-cabone-0-43-original-imahr46b8cn3hzmu.jpeg?q=70', [
      'A 90 m coil of CabONE 23/76 twin-core flexible copper wire is ₹451 on Flipkart, 50% below the M.R.P.',
      'It is 0.5 sq mm PVC-insulated twisted copper in red and yellow — the light-duty size used for lamp leads, decorative lighting, speaker runs and low-load extension work, not for mains wiring to AC or geyser points. Buyers rate it 4.1 stars from 8 ratings.',
      'Flipkart lists this item as replacement-only (7 days) with no returns, so check the gauge suits your job before ordering.',
    ], 'Confirm the 90 m, 0.5 sq mm Red/Yellow variant is selected; ignore the lower bank-offer figure, the deal price needs no card.'),
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

const file = process.argv[2] ?? 'ifs-1003e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
