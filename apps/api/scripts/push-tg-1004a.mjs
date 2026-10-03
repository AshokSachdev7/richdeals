// TELEGRAM-DEAL-MONITOR tick 2026-10-04a
//
// Sidebar sweep of 13 groups. Pushed 1: Ambrane 10000 mAh MagSafe power bank (Dealdost, fkrt.cc), read in the
// Flipkart tab — ld+json price 1299 == post price, InStock, 4.2 stars / 4,998 ratings. Rejected: HRX Helium luggage
// (3.5 stars from 2 ratings, bogus M.R.P.), Symbol shirt (paise price), SB Loots car seat cover (loot, amzn.lt
// unresolvable), rest category / promo / already seen. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = { Flipkart: (d) => `https://www.flipkart.com/product/p/itme?pid=${d.productId}&affid=djhackraj` };
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const DEALS = [
  { store: 'Flipkart', productId: 'PWBH34ZQT6CGNSES', name: 'Ambrane 10000 mAh 22.5W Wired and MagSafe Wireless Power Bank', price: 1299, mrp: 2999, exp: 1299, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/power-bank/s/w/x/-enriched-transparent-original-imahdzf2fxycwnyh.png?q=70',
    description: [
      "Ambrane's 10000 mAh power bank with MagSafe wireless charging is ₹1,299 on Flipkart, 57% below the M.R.P.",
      'It charges two devices at once: a USB-A port at up to 22.5W and a Type-C port at 22W for wired fast charging, plus a 15W magnetic wireless pad that snaps onto MagSafe iPhones. It is a lithium-polymer cell with PD 3.0 and QC 3.0 support, and a cable comes in the box. Buyers rate it 4.2 stars across 4,998 ratings.',
      '10000 mAh refills most phones roughly one and a half to two times, and it also tops up earbuds, a smartwatch or a trimmer. Carry it in cabin baggage when flying, never in a checked bag.',
    ],
    variant: 'This listing is the black colour. Flipkart may add a small Protect Promise fee at checkout.' },
];
const IMG = /^https:\/\/rukmini[m\d]?\d?\.flixcart\.com\/image\//;
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

const file = process.argv[2] ?? 'tg-1004a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
