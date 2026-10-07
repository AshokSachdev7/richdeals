// DEAL-INGEST indiafreestuff tick 2026-10-07e
//
// 51 IFS cards -> 46 resolved -> 2 already LIVE (re-priced) -> 9 FMCG/consumables skipped -> 35 PDP-read -> 4 pushed (Amazon).
// Dropped: price drift (STONIX boot, j5create, Rupa trunk, Intex mouse, EARTHMA remote, Babbler racquet),
//   no buy box (Tamron, soap box, Lapcare, Transcend, Corseca, OOGE, Promate), only 1 left (Robodo, MadGaze, Pebble),
//   thin/low ratings (H9, Toreto, DM09, TAG combo, iVOOMi, IndieStride, decal, trimpot, KESI, Pludo, Tukzer, HyperX 3.2, AB tripod 2.2, Asian Paints stencil, Themisto).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const SIZE = 'The link opens the exact size and colour we checked; other sizes can be priced differently, so check the selected size before paying.';
const ONE = 'The link opens the exact variant we checked; other colours can be priced differently, so check the selected option before paying.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0BS121CNP', name: 'Solimo 13-Pocket Expanding File Folder A4 Blue', price: 210, mrp: 799,
    image: 'https://m.media-amazon.com/images/I/61V5uP973SL._SL1500_.jpg', variant: ONE,
    description: [
      "Amazon Brand Solimo's 13-pocket expanding file folder is ₹210 on Amazon, 74% below M.R.P., rated 4.1 stars across 2,743 reviews.",
      'It holds up to 500 A4 sheets across 13 labelled pockets, closes with a buckle, has a carry handle and is made of water-resistant PP plastic.',
      'A cheap way to keep certificates, bills and school or office papers sorted and dry.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0DT9ZHYCY', name: 'Fire-Boltt Brillia Smart Watch 2.02 inch AMOLED Bluetooth Calling Pink', price: 1299, mrp: 18999,
    image: 'https://m.media-amazon.com/images/I/81Qp8pO9m5L._SL1500_.jpg', variant: ONE,
    description: [
      "Fire-Boltt's Brillia smartwatch is ₹1,299 on Amazon, 93% below M.R.P., rated 4.0 stars across 22,622 reviews.",
      'It has a 2.02-inch always-on AMOLED screen at 750 nits, Bluetooth calling with a voice assistant, SpO2 and heart-rate tracking, 120+ sports modes and up to 7 days of battery.',
      'With over twenty-two thousand ratings, it is one of the most-reviewed calling smartwatches in this price band.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0GHN7H2S5', name: 'Fire-Boltt Glitz Women Smart Watch 1.19 inch AMOLED Gold', price: 1699, mrp: 16999,
    image: 'https://m.media-amazon.com/images/I/71yOUH5KDiL._SL1500_.jpg', variant: ONE,
    description: [
      "Fire-Boltt's Glitz smartwatch for women is ₹1,699 on Amazon, 90% below M.R.P., rated 3.8 stars across 1,357 reviews.",
      'It has a round 1.19-inch 390x390 AMOLED display with always-on mode and 1000 nits peak brightness, a rotating crown, Bluetooth calling and IP68 water resistance.',
      'A jewellery-style gold calling smartwatch rather than a sporty band.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0B8SXZ4V8', name: 'Mustard Magma Smart Watch 1.8 inch AMOLED Bluetooth Calling Gold', price: 999, mrp: 12999,
    image: 'https://m.media-amazon.com/images/I/61IXXHfnM6L._SL1080_.jpg', variant: ONE,
    description: [
      "Mustard's Magma smartwatch is ₹999 on Amazon, 92% below M.R.P., rated 3.6 stars across 163 reviews.",
      'It has a 1.8-inch AMOLED display, Bluetooth calling through a built-in speaker and mic, IP68 water resistance, 100+ sports modes and SpO2 plus heart-rate tracking.',
      'An AMOLED calling smartwatch for under a thousand rupees.',
    ],
  },
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
  if (!d.description[0].includes(`${discountPct}% below`)) throw new Error(`copy pct ${d.productId}`);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
    howTo: [
      `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
      d.variant,
      `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
      NO_COUPON,
    ],
    image: d.image, price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error(`title/price ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1007e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
