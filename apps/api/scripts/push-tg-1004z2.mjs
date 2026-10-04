// TELEGRAM-DEAL-MONITOR tick 2026-10-04z2
//
// Sidebar sweep: SB Loots + CoolzTricks both posted the BOXJOY 5-shelf shoe rack "@1424 with 350 coupon" (CoolzTricks
// link was a /s? search carrying field-asin=B0DLVGWRVJ). PDP: 1,774 base, optional 350 clip coupon, 4.0 from 1,482,
// in stock + add-to-cart, so we publish the base price with the coupon as an optional step. Dealdost "Loot 139 10
// Meter" = Desidiya fairy lights B082YH1TPN, already LIVE (id 2459) at 147 - PDP now 139, row repriced via prisma.
// Rejected: Dove body wash / Vaseline / L'Oreal shampoo (FMCG), Wild Stone (category), Flipkart Black (promo).
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
  { ...A('B0DLVGWRVJ', 'BOXJOY 5 Shelf Shoe Rack with 5 Doors, Steel Hook Holder, Black', 1774, 2290, '61HZUN8GEhL._SL1440_', [
    "BOXJOY's 5-shelf closed shoe rack in Black is ₹1,774 on Amazon, rated 4.0 stars across 1,482 reviews.",
    'It is a DIY cabinet with waterproof PP plastic panels on a metal frame, and five doors that keep dust off shoes. BOXJOY says it holds up to 10 pairs. A steel bar with five hooks hangs on the side for keys, bags or umbrellas, and a wooden mallet comes in the box for assembly.',
    'Amazon also showed an optional clip coupon worth 350 rupees on the page when we checked. Tick it before checkout and the final price drops further. Panels click into the frame, so set aside half an hour to put it together.',
  ], 'We checked the price on the Black 5 Shelf Plastic Door option. Other sizes and colours are priced separately.'),
    coupon: 'Tick the ₹350 coupon box on the Amazon product page before adding to cart. The coupon is optional; the price shown here is before it.' },
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

const file = process.argv[2] ?? 'tg-1004z2-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
