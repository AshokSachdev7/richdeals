// TELEGRAM-DEAL-MONITOR tick 2026-10-05g
//
// SB Loots post: The Marka waterproof backpack @ 260, bittli.in -> Shopsy itmf4427056ee875 (pid XSPH4Y5WKZTRQHYW).
// Shopsy serves no Product ld+json, so the price comes from the page state: ListingPriceValue finalPrice 260, mrp 999
// (73% off, matches the channel), rated 3.8 by 1,803 buyers, no Sold Out widget. A separate SPECIAL_PRICE of 234 also
// appears in the state; we publish the 260 listing price, not the lower figure. Shopsy != Flipkart, so it goes via
// Cuelinks. Rejected: Dealzone Nayasa "upto 75% off" (category post).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const CUELINKS = (url) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const d = {
  store: 'Shopsy', productId: 'XSPH4Y5WKZTRQHYW',
  url: 'https://www.shopsy.in/marka-casual-waterproof-backpack/p/itmf4427056ee875?pid=XSPH4Y5WKZTRQHYW',
  name: 'The Marka Casual Waterproof Backpack', price: 260, mrp: 999, exp: 260,
  image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/shopsy-bag/a/c/f/-enriched-0-original-imahgqzgzvqyawzh.jpeg',
  description: [
    "The Marka's casual waterproof backpack is ₹260 on Shopsy, rated 3.8 stars by 1,803 buyers.",
    'It is an everyday daypack with a water-resistant outer fabric, so a laptop sleeve, lunch box and a change of clothes stay dry through a monsoon commute. It suits college, tuition or a short office run rather than heavy travel.',
    'At this price, expect basic zips and thin shoulder padding. Do not overload it with heavy books every day, and close the zips fully in rain, since water can still get in through open seams.',
  ],
};

const discountPct = Math.round((1 - d.price / d.mrp) * 100);
for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
  if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price}`);
}
const row = {
  slug: `${kebab(d.name)}-${d.productId.toLowerCase()}`,
  title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
  description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
  howTo: [
    `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
    'There is one colour on this listing; check the colour shown in the photos before you order.',
    `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
    NO_COUPON,
  ],
  image: d.image, price: d.price, mrp: d.mrp, discountPct,
  isSuper: d.price <= 250, isHot: d.price <= 500,
  status: 'live', store: d.store, productId: d.productId, affiliateUrl: CUELINKS(d.url),
};
if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error('title/price mismatch');
if (row.price >= row.mrp || Math.abs(d.price - d.exp) > 1) throw new Error('bad price');
if (!/^https:\/\/rukminim\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g$/.test(row.image)) throw new Error('bad image');

const file = process.argv[2] ?? 'tg-1005g-payload.json';
writeFileSync(file, JSON.stringify({ deals: [row] }));
console.log(`pre-flight OK, 1 row -> ${file}\nSLUGS: ${row.slug}`);
