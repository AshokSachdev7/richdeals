// DESIDIME-INGEST tick 2026-10-06a
//
// 34 cards -> 17 fresh. Pushed 3: Crocs Offroad Sport clog (Amazon PDP 2,497 vs 4,995, 4.2 from 4,220, add-to-cart),
// malwa printed kurta and HIGHFIELD Guci Flora EDP 50 ml (Shopsy finalPrice = card price, ratings 3.8/408, 4.0/806).
// Rejected: Zebronics EA 122 monitor (no add-to-cart), Lavie wallet (PDP 399 vs card 379), Cruise 1.5T AC (PDP 35,490
// vs 32,240), ASUS TUF A15 (PDP 1,04,990 vs 93,740, 3 ratings), Bajaj MX 45 (3.4 stars), NIVIA mini football (8% off),
// EQTIMA slides (no price data), Doobidoo + Kindfit diapers (hygiene), Nafed moong x2 + Khetika batter (food),
// Instamart food processor + keyboard (quick-commerce, location-locked price).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Shopsy: (d) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0819QZPDW', name: 'Crocs Unisex Offroad Sport Clog', price: 2497, mrp: 4995,
    image: 'https://m.media-amazon.com/images/I/611pDDEy3NL._SL1320_.jpg',
    variant: 'Colour and size are picked on the product page; the half-price figure is on the default listing, so recheck it after switching.',
    description: [
      "Crocs' Offroad Sport clog is ₹2,497 on Amazon, half its M.R.P., rated 4.2 stars across 4,220 reviews.",
      'The Offroad Sport is the chunkier, outdoor version of the classic Crocs clog: a deeper-lug sole for grip, a bungee-style cord across the top instead of a plain strap, and the same light Croslite foam that dries quickly after rain or a beach day.',
      'Crocs run roomy. If you are between sizes, most buyers size down rather than up, and the heel strap can be flipped forward when you want to wear them as slip-ons.',
    ],
  },
  {
    store: 'Shopsy', productId: 'KUUHM7HSTGNJWPXC', name: 'malwa Women Printed Straight Kurta', price: 195, mrp: 999,
    url: 'https://www.shopsy.in/malwa-women-printed-kurta/p/itm7f50e1c8082ef?pid=KUUHM7HSTGNJWPXC',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-kurta/m/7/s/m-shopsy-top-malwa-original-imahm7hsd7hc4ypy.jpeg',
    variant: 'Pick your size on the product page; the price can differ slightly between sizes, so check it after selecting.',
    description: [
      "malwa's printed women's kurta is ₹195 on Shopsy, rated 3.8 stars by 408 buyers.",
      'At this price it is an everyday kurta for college, office or errands, easy to pair with leggings, palazzos or jeans you already own.',
      'Budget kurtas vary in fit and fabric weight, so compare the size chart against a kurta that fits you well instead of trusting your usual size label, and wash it inside-out in cold water the first time.',
    ],
  },
  {
    store: 'Shopsy', productId: 'VSZHBEG95SZSKZQE', name: 'HIGHFIELD Guci Flora Eau de Parfum 50 ml', price: 142, mrp: 1399,
    url: 'https://www.shopsy.in/highfield-guci-flora-eau-de-parfum-50-ml/p/itma3c68fedf6a79?pid=VSZHBEG95SZSKZQE',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-perfume/w/s/n/-original-imahpcpfryu3evye.jpeg',
    variant: 'There is one size on this listing: a 50 ml bottle.',
    description: [
      "HIGHFIELD's Guci Flora eau de parfum, 50 ml, is ₹142 on Shopsy, rated 4.0 stars by 806 buyers.",
      'It is a budget eau de parfum from HIGHFIELD, a Shopsy-listed fragrance brand, and not a Gucci product. Treat it as an inexpensive daily scent or a spare bottle for your bag, not as a designer fragrance.',
      'Budget perfumes usually last a few hours rather than a full day, so spray on pulse points and on clothes for longer wear, and patch-test first if your skin reacts to fragrance.',
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
      `Tap Grab Deal to open the ${d.name.split(',')[0]} on ${d.store} at the live price.`,
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

const file = process.argv[2] ?? 'dd-1006a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
