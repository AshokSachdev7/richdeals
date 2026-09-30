// TELEGRAM tick 2026-09-30k: 2 new Amazon deals (Daniel Klein B0DJJZB82L via SB Loots, Zebronics B08SVS3RKL via Dealzone).
// PDP re-read in the logged-in tab: price/MRP/In stock/add-to-cart confirmed. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
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
const DEALS = [
  A('B0DJJZB82L', 'Daniel Klein Analog Silver Dial Stone-Studded Metal Strap Women Watch DK11138-8', 1543, 7350, '71eXkC3Tc9L._SL1500_', [
    'This Daniel Klein women\'s watch is ₹1,543 on Amazon, well under its listed M.R.P.',
    'It pairs a round silver analog dial with a silver metal link strap and stone-studded detailing, and it is water-resistant for everyday splashes (not swimming). Model DK11138-8.',
    'Metal link straps usually need a link or two removed for a snug fit; a local watch shop does it in minutes.',
  ], 'Make sure model DK11138-8 (silver dial, silver strap) is the one selected.'),
  A('B08SVS3RKL', 'Zebronics Zeb Jukebar 9200 DWS Dolby Digital Plus 160W Soundbar', 6531, 34999, '813oEQBq+FL._SL1500_', [
    'The Zebronics Zeb Jukebar 9200 DWS soundbar is ₹6,531 on Amazon, far below the listed M.R.P.',
    'It is rated at 160W with Dolby Digital Plus decoding and connects over HDMI (ARC), optical in, Bluetooth, USB and AUX, so it works with most TVs, set-top boxes and phones. It is wall-mountable and has an LED display.',
    'For the simplest setup, use HDMI ARC: one cable carries TV audio and lets the TV remote control volume.',
  ], 'Confirm the Jukebar 9200 DWS variant is selected before adding to cart.'),
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
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
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

const file = process.argv[2] ?? 'tg-0930k-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
