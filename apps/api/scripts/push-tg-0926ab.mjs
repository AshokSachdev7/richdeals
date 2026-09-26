// TELEGRAM-DEAL-MONITOR tick 2026-09-26ab
//
// Sidebar sweep of 13 groups turned up 2 new links. CoolzTricks fkrt.cc/hLx9SVM resolved to a Flipkart /pr?sid= suitcase
// listing (ALFA by VIP, "starts @2184") — a category page, not a single product, so it was rejected.
// SB Loots bittli.in/zrQibE6k resolved to Shopsy XWNHAMRGCB4KDMAJ (JASIL plush baby sofa seat, 35 cm). Shopsy has no
// ld+json; the page state shows finalPrice ₹385 (same as the channel), mrp ₹799, availabilityStatus IN_STOCK.
// Shopsy is not Flipkart, so the link goes through Cuelinks. Copy uses only the page title + spec rows (35 cm, fibre filling,
// made in India) — no invented specs.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const CUE = (url) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];

const DEALS = [
  {
    store: 'Shopsy', productId: 'XWNHAMRGCB4KDMAJ',
    name: 'JASIL Soft Plush Baby Sofa Seat / Rocking Chair Cushion, 35 cm',
    description: [
      "A small plush seat for babies and toddlers, now at ₹385 on Shopsy, about half its listed M.R.P.",
      "This JASIL piece is a 35 cm stuffed-toy style sofa seat with fibre filling, made in India. It works as a soft floor seat or a cushioned rocking chair for a little one's play corner.",
      "It suits parents who want a cheap, light seat that can sit on a mat or bed while a baby practises sitting up with support. It is a soft toy seat, not a certified safety seat, so keep the child supervised and on the floor.",
    ],
    variant: 'Confirm the 35 cm JASIL baby sofa seat is selected — other colours or sizes on the same page may be priced differently.',
    price: 385, mrp: 799, exp: 385, av: 'IN_STOCK',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-stuffed-toy/4/u/0/stuffed-toys-soft-plush-cushion-baby-sofa-seat-or-rocking-chair-original-imahkftx6ghehqgr.jpeg?q=70',
    affiliateUrl: CUE('https://www.shopsy.in/jasil-stuffed-toys-soft-plush-cushion-baby-sofa-seat-rocking-chair-35-cm/p/itme5b6000b3cc17?pid=XWNHAMRGCB4KDMAJ'),
  },
];
// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl,
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs channel ${d.productId}`);
  if (!/in_?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  // hand-typed ₹ in copy must match the page price (title-rupee-vs-price rule)
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  if (!/^https:\/\/rukmini\d\.flixcart\.com\/image\/1500\/1500\//.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (!row.affiliateUrl.startsWith('https://linksredirect.com/?cid=527&source=linkkit&url=https%3A%2F%2Fwww.shopsy.in%2F')) throw new Error(`cue url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}

const file = process.argv[2] ?? 'tg-0926ab-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
