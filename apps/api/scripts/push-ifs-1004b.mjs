// DEAL-INGEST indiafreestuff tick 2026-10-04b
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 33 new slugs, 20 single-product candidates resolved
// (15 Amazon, 4 Flipkart, 1 Myntra). Pushed 5: 4 Amazon read in the logged-in Amazon tab (core price == IFS card price,
// #availability In stock, add-to-cart present) + 1 Flipkart read via ld+json (price 269 InStock, 4.0 from 633 ratings).
// Rejected: paise prices (Larah 1,158.67, Borosil 552.64, Philips batten 997.92), drift (Milton Elfin 568 vs 932, Pepe
// shirt 519 vs 899, Pepe polo 519 vs 909), no add-to-cart (Reebok Black Pearl, Nirlon kadhai), no/too few ratings
// (Sturlite, helmet cover, hair oil comb, TIMEX x2, KILLER shirt 3, GIORDANO on Myntra 0). Skipped pre-resolve: bank-card
// offers, [Apply N% Coupon] items, food/health, detergent. Copy is original.
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
const DEALS = [
  A('B0F5HS2RGL', 'Fastrack Jupiter Retro 1.83" Smart Watch with BT Calling and Metal Strap', 1200, 3999, '71BQmY1hM+L._SL1500_', [
    "Fastrack's Jupiter Retro smartwatch is ₹1,200 on Amazon, 70% below the M.R.P.",
    'It has a 1.83-inch display, Bluetooth calling from the wrist, a functional rotating crown for scrolling, a metal strap, 100+ sports modes and a health suite. Buyers rate it 3.9 stars across 185 reviews.',
    'The metal strap and retro styling make it look more like an analog watch than a fitness band, which suits office wear.',
  ], 'Price applies to the strap colour shown; other colours can be priced differently.'),
  A('B0CPY36FV6', 'Mizi Headphone Headband Cover for Bose, Sony, Sennheiser, AKG and More', 299, 899, '61GaHtHxWEL._SL1024_', [
    "Mizi's replacement headband cover for over-ear headphones is ₹299 on Amazon, 67% off the M.R.P.",
    'It zips over a worn or peeling headband and fits a wide range of models, including Audio-Technica, Beats, Bose, AKG, Sennheiser, Skullcandy and Sony. Buyers rate it 4.0 stars across 732 reviews.',
    'Flaking faux-leather headbands are the most common way good headphones start to look old; a cover fixes that without buying a new pair.',
  ], 'Check the listed compatible models and the colour before checkout.'),
  A('B0CGVF1KDJ', 'Lifelong Stainless Steel Idli Cooker, 6 Plates, 24 Idlis', 899, 1399, '71AFgPEKbcL._SL1500_', [
    "Lifelong's 6-plate stainless-steel idli cooker is ₹899 on Amazon, 36% under the M.R.P.",
    'Six stacked plates steam 24 idlis in one batch, and the stainless-steel body works on both gas stoves and induction cooktops. Buyers rate it 3.8 stars across 2,696 reviews.',
    'Twenty-four idlis per round is enough for a family breakfast in one go, and the plates also work for dhokla or steamed momos.',
  ], 'This listing is the 6-plate, 24-idli size.'),
  A('B0BGQ1M689', 'atomberg Renesa+ 600mm BLDC Ceiling Fan with Remote, BEE 5 Star', 4299, 7090, '61LdC3M81qL._SL1500_', [
    "atomberg's Renesa+ 600 mm BLDC ceiling fan with remote is ₹4,299 on Amazon, 39% off the M.R.P.",
    'A BLDC motor draws far less power than a regular induction fan, which is why it carries a BEE 5-star rating, and the remote handles speed, timer and sleep modes. Buyers rate it 4.2 stars across 204 reviews.',
    'The 600 mm (24-inch) sweep is sized for small rooms such as kitchens, bathrooms, balconies and study corners; pick a 1200 mm fan for a bedroom or hall.',
  ], 'This price is for the 600 mm size in the colour shown.'),
  F('PERHZZMQUMVZ9XAY', '/reebok-cool-your-body-floral-fruity-premium-edt-perfume-women-100ml-eau-de-toilette/p/itmb8e91cb62ff5f',
    'REEBOK Cool Your Body Floral Fruity EDT Perfume for Women, 100 ml', 269, 999,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/s/9/v/100-cool-your-body-floral-fruity-premium-edt-perfume-for-women-resized-original-imahzph29m5acx3p.jpeg?q=70', [
    "Reebok's Cool Your Body eau de toilette for women, a full 100 ml bottle, is ₹269 on Flipkart, 73% below the M.R.P.",
    'It is a floral-fruity everyday scent in an EDT strength, lighter than a parfum and suited to daytime, college and office wear. Buyers rate it 4.0 stars across 633 ratings.',
    'A 100 ml bottle at this price works as a daily-use spray or a low-cost gift.',
  ], 'This listing is the 100 ml bottle.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/[\w\/.-]+\.jpeg\?q=\d+)$/;
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

const file = process.argv[2] ?? 'ifs-1004b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
