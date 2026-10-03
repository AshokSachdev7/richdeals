// TELEGRAM-DEAL-MONITOR tick 2026-10-03j
//
// Sidebar 09:58 IST: 5 new single-product posts. Pushed 2: Aloe vera gel 400 g B0DJQS834N (Dealdost, logged-in Amazon tab:
// priceToPay ₹149, M.R.P. ₹399, In stock, add-to-cart, 4.3 stars from 647) and DIGISMART 2000 W induction cooktop
// ICTGYQYZGU3HNYXK (SB Loots, Flipkart tab ld+json ₹1,499 InStock, 4.1 from 6,637; M.R.P. ₹5,990 on the page; ₹1,424 needs
// offers). Re-priced existing LIVE row 9672 Lakme cushion foundation ₹384 -> ₹314 via prisma.update (repost, PDP ₹314).
// Rejected: Pigeon gas lighter (3.1 stars), Premium Anjeer (food).
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
  A('B0DJQS834N', 'Aloe Vera Gel 400 g with Vitamin E for Skin and Hair', 149, 399, '61vz7I8FT9L._SL1500_', [
    'A 400 g tub of aloe vera gel with vitamin E is ₹149 on Amazon, 63% below the M.R.P.',
    'It is a non-greasy multipurpose gel used as a light face moisturiser, an after-sun soother and a leave-in for dry hair ends. Buyers rate it 4.3 stars across 647 reviews.',
    'Patch-test on the inner arm first if you have sensitive skin; the large tub lasts a family several weeks of daily use.',
  ], 'Confirm the 400 g pack is selected; smaller and combo packs are priced differently.'),
  F('ICTGYQYZGU3HNYXK', 'digismart-2000-w-induction-cooktop-push-button/p/itm3dae05ea2a9f6',
    'DIGISMART 2000 W Induction Cooktop, Push Button', 1499, 5990,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/induction-cook-top/k/w/s/mark-1-induction-cooktop-indian-menu-option-automatic-power-original-imahkhnhm2jmyebd.jpeg?q=70', [
      'The DIGISMART 2000 W push-button induction cooktop is ₹1,499 on Flipkart, 75% below the M.R.P.',
      'At 2000 W it boils water and runs a pressure cooker as fast as a gas burner, with preset Indian menu modes and automatic power shut-off. It carries a 4.1-star average across more than 6,600 ratings.',
      'Induction needs flat-bottomed steel or cast-iron vessels; Flipkart lists it as replacement-only (7 days), so check your cookware before ordering.',
    ], 'Confirm the 2000 W variant is selected; ignore the lower bank-offer figure, the deal price needs no card.'),
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

const file = process.argv[2] ?? 'tg-1003j-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
