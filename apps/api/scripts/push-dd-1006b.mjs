// DESIDIME-INGEST tick 2026-10-06b
//
// Stage 1: 35 cards -> 15 product-resolved -> 3 already in DB -> 12 fresh. Pushed 3 after the PDP check:
// ESR Geo pencil (Amazon), double-decker lunch box (Amazon) and Mivi Fort H160 soundbar (Flipkart, ld+json).
// Dropped:
//   - Beardo perfume, Moxie shampoo: cosmetics/consumables.
//   - Shopsy fan: price drift (stage 1).
//   - Amazon Basics iron: rating 3.5.
//   - BISSELL SpotClean: ₹8,810 on the PDP vs ₹7,692 on the card.
//   - Polycab Aerofame: ₹4,499 vs ₹3,600, a coupon price.
//   - SATTVA bean bag: no buy box.
//   - 20 L water can: 8 ratings, 300 px image only.
//   - Philips TAT1179: rating 3.3.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `${d.url}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const ONE = 'The link opens the exact listing we checked; pick another colour only if you want it, as variants can be priced differently.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0DM5ZLR2S', name: 'ESR Geo Digital Pencil for iPad with Find My', price: 2326, mrp: 4999,
    image: 'https://m.media-amazon.com/images/I/61uhttNrz+L._SL1500_.jpg', variant: ONE,
    description: [
      "ESR's Geo digital pencil for iPad is ₹2,326 on Amazon, 53% below M.R.P., rated 4.4 stars across 3,801 reviews.",
      'It works with iPads released in 2018 or later on iOS 12.2 and above. The listing names the iPad 6th to 11th gen (A16), iPad Air M2, M3 and M4, iPad Pro M4 and M5, and iPad mini 5, 6 and 7. It does not work with iPhones or Android devices.',
      "The headline feature is Apple's Find My support, so a misplaced pencil shows up on the map like your other Apple devices. It charges over USB Type-C.",
    ],
  },
  {
    store: 'Amazon', productId: 'B0DR76GBXT', name: 'Double Decker Plastic Lunch Box with 3 Detachable Containers and 2 Spoons', price: 135, mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/51hJmQnyn7L._SL1500_.jpg', variant: ONE,
    description: [
      'This BPA-free double-decker lunch box is ₹135 on Amazon, rated 3.8 stars across 269 reviews.',
      'It has three removable compartments, one large and two small, plus two spoons and a locking lid. That keeps rice, sandwiches, salad or snacks apart in a single box.',
      'The listing says it is airtight but meant for dry food, so pack gravies in a separate sealed container.',
    ],
  },
  {
    store: 'Flipkart', productId: 'ACCH3MUYBBS8HVYH', name: 'Mivi Fort H160 2.1 Channel 160W Bluetooth Soundbar', price: 3799, mrp: 25999,
    url: 'https://www.flipkart.com/mivi-fort-h160-soundbar-160-watts-2-1-channel-multi-input-eq-modes-bt-v5-1-w-bluetooth-soundbar/p/itm9b1caa4786850?pid=ACCH3MUYBBS8HVYH',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/speaker/s/k/j/-original-imahrfgfc9u4dhc5.jpeg',
    variant: 'There is one version on this listing, the 160 W 2.1-channel soundbar with its subwoofer.',
    description: [
      "Mivi's Fort H160 soundbar is ₹3,799 on Flipkart, rated 4.2 stars by 20,226 buyers.",
      'It is a 160 W, 2.1-channel setup with Bluetooth 5.1, multiple inputs and built-in EQ modes.',
      'Mivi lists a high M.R.P. on this model, so judge the deal by the live price rather than the discount figure.',
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
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=/.test(d.url)) throw new Error(`bad flipkart url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'dd-1006b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
