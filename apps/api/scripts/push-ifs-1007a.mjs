// DEAL-INGEST indiafreestuff tick 2026-10-07a
//
// 64 new IFS slugs -> 33 junk-filtered -> 31 resolved -> 0 already in DB -> 7 pushed (Amazon).
// Dropped (PDP read, same-origin fetch in the logged-in Amazon tab; Myntra ld+json via curl):
//   - Solimo/AmazonBasics containers x3, racks x2, tasla, AB casserole, Espan cooler: price drift.
//   - Puma St Miler (16 reviews, 4 left), Turino II + Volant (1 left), St Runner V4 (3.3, 3 reviews).
//   - Solimo triply handi (no reviews), Lavie Terry wallet (7 reviews), Sattva bean bag (no buy box).
//   - Zebronics Companion 500: review count unreadable.
//   - Myntra Airstrait/Safari/Supersonic/Priority: PDP price far above card; Acepack: no reviews.
//   - Ajio x3: 403, PDP unreadable.
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
    store: 'Amazon', productId: 'B0D6VVLFPJ', name: 'Puma Men Dazzler Sneaker White Smokey Gray Silver', price: 1549, mrp: 3999,
    image: 'https://m.media-amazon.com/images/I/41qCleTminL._SL1200_.jpg', variant: SIZE,
    description: [
      "Puma's Dazzler sneaker for men is ₹1,549 on Amazon, 61% below M.R.P., rated 3.8 stars across 10,096 reviews.",
      'The listing we checked is the White / Smokey Gray / Silver colourway in UK 7, a clean lace-up everyday sneaker.',
      'With over ten thousand ratings, it is one of the most-reviewed Puma casual shoes on Amazon India.',
    ],
  },
  {
    store: 'Amazon', productId: 'B08CD8436H', name: 'Tobo 4K HDMI Video Capture Card USB 3.0', price: 759, mrp: 9999,
    image: 'https://m.media-amazon.com/images/I/51XW6G0LSdL._SL1000_.jpg', variant: ONE,
    description: [
      "Tobo's HDMI video capture card is ₹759 on Amazon, 92% below M.R.P., rated 4.0 stars across 23 reviews.",
      'It records at 1080p 60fps over USB 3.0 and passes a 4K 60Hz signal through to your monitor, so you can play and stream at the same time.',
      'A low-cost way to capture a console, camera or second PC into OBS for streaming or recording.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0CH35PPKC', name: 'Ninos Dreams Boys Space Explorer Co-ord Set Blue', price: 461, mrp: 1399,
    image: 'https://m.media-amazon.com/images/I/61bdqsfk6nL._SL1440_.jpg', variant: SIZE,
    description: [
      "Ninos Dreams' Space Explorer co-ord set for boys is ₹461 on Amazon, 67% below M.R.P., rated 4.1 stars across 314 reviews.",
      'The listing we checked is the Blue set in size 12-14 years, a printed top and bottom sold together.',
      'A space-themed matching outfit for everyday wear or play.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0H7Q3KM13', name: "JB'S LAND Floral Charm Keychain", price: 99, mrp: 499,
    image: 'https://m.media-amazon.com/images/I/71ZO4WiZW7L._SL1254_.jpg', variant: ONE,
    description: [
      "JB'S LAND's floral charm keychain is ₹99 on Amazon, 80% below M.R.P., rated 3.6 stars across 47 reviews.",
      'It is a decorative flower-charm key ring that also works as a bag charm.',
      'A small gift or add-on item that costs under a hundred rupees.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0DRVCWLKW', name: 'Lavie Mono Paige Women Handbag Taupe Large', price: 699, mrp: 3499,
    image: 'https://m.media-amazon.com/images/I/71Xvph0PyWL._SL1464_.jpg', variant: ONE,
    description: [
      "Lavie's Mono Paige handbag is ₹699 on Amazon, 80% below M.R.P., rated 4.0 stars across 161 reviews.",
      'The listing we checked is the Taupe colour in the large size.',
      'A structured everyday handbag from Lavie for work or casual use.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0H279XMG3', name: 'Lenovo 240W USB-C Retractable Cable 4ft White', price: 1999, mrp: 4090,
    image: 'https://m.media-amazon.com/images/I/51x6PrnsfdL._SL1500_.jpg', variant: ONE,
    description: [
      "Lenovo's 240W USB-C retractable cable is ₹1,999 on Amazon, 51% below M.R.P., rated 4.0 stars across 47 reviews.",
      'It is a 4-foot USB-C to USB-C cable rated for up to 240W, with a retractable reel that keeps it tidy in a laptop bag.',
      'Enough wattage to fast-charge a USB-C laptop, tablet or phone from one cable.',
    ],
  },
  {
    store: 'Amazon', productId: 'B0FK5VTC4G', name: 'Lenovo Yoga Bluetooth Silent Mouse Tidal Teal', price: 1799, mrp: 3690,
    image: 'https://m.media-amazon.com/images/I/51rVYDVBmIL._SL1500_.jpg', variant: ONE,
    description: [
      "Lenovo's Yoga Bluetooth silent mouse is ₹1,799 on Amazon, 51% below M.R.P., rated 4.5 stars across 114 reviews.",
      'It uses Bluetooth 5.3, pairs with up to 3 devices, has quiet clicks and is rated for up to 36 months of battery life.',
      'A quiet travel mouse that switches between a laptop, tablet and phone.',
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

const file = process.argv[2] ?? 'ifs-1007a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
