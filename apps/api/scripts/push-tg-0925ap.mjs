// TELEGRAM-DEAL-MONITOR tick 2026-09-25ap
//
// Sidebar scan of 13 groups -> 3 new links. Puma B0D6VPTZ52 already LIVE at the same ₹1,650 (skipped);
// bittli.in -> Shopsy AOLTURI lunch box, price user-dependent (₹144 new-user / ₹172 / fsp ₹176 vs channel ₹163) -> rejected.
// Dealzone link.amazon -> B0GR6HXPB9 MacBook Neo Blush. Channel ₹67,990 is the post-SBI-card figure; PDP
// #corePriceDisplay reads ₹71,990 / M.R.P. ₹79,900, In stock, sold by Clicktech. Published at the verified price.
// Sibling colour B0GR6J183B is live separately as id 1514.
import { writeFileSync } from 'node:fs';

const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;

const d = { productId: 'B0GR6HXPB9', slug: 'apple-macbook-neo-13-a18-pro-8gb-256gb-blush-b0gr6hxpb9',
  name: 'Apple MacBook Neo 13″ (A18 Pro, 8GB, 256GB) Blush', price: 71990, mrp: 79900,
  img: 'https://m.media-amazon.com/images/I/61dLund7bhL._SL1500_.jpg' };

const discountPct = Math.round((1 - d.price / d.mrp) * 100);
const description = [
  "The MacBook Neo is Apple's entry point into macOS laptops: a 13-inch machine built around the A18 Pro, the same family of chip that runs iPhones, instead of an M-series processor. For students, writers and anyone whose day is browser tabs, documents, video calls and light photo editing, that trade keeps the price well under a MacBook Air while keeping the build quality and battery life Macs are known for.",
  "This listing is the Blush colour with 8GB of unified memory and a 256GB SSD. The 13-inch (33.02 cm) Liquid Retina display runs at 2408 x 1506 and up to 500 nits, which is bright enough for a classroom or a café window seat. There is a 1080p FaceTime HD camera for calls, Apple Intelligence support, and Apple quotes up to 16 hours of battery. The aluminium body comes in four colours — Silver, Blush, Citrus and Indigo — each with a colour-matched keyboard.",
  "Be realistic about 8GB and 256GB. That is comfortable for Office, Google Docs, Zoom, coding practice and casual Lightroom, but heavy video editing or dozens of large files will fill the SSD fast; plan on iCloud or an external drive. If you need more headroom for pro apps, a MacBook Air with an M-series chip is the better buy.",
  `Live Amazon price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock. Eligible SBI credit and debit cards get up to ₹1,750 more off at checkout, which is how the lower figures quoted in deal channels are reached.`,
].join('\n\n');

const row = {
  slug: d.slug,
  title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
  description,
  howTo: [
    'Tap Grab Deal to open the MacBook Neo on Amazon at the live price.',
    'Confirm the Blush, 8GB / 256GB option is selected — other colours and storage options on the same page are priced differently.',
    'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
    'Pay with an eligible SBI credit or debit card to get up to ₹1,750 more off. The bank discount is applied at checkout, so check the final amount before you pay. No Cost EMI is also offered on select cards.',
  ],
  image: d.img, price: d.price, mrp: d.mrp, discountPct,
  isSuper: false, isHot: false,
  status: 'live', store: 'Amazon', productId: d.productId, affiliateUrl: AZ(d.productId),
};
const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
if (t !== row.price) throw new Error('title/price mismatch');
if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error('bad price');
if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error('thumbnail');
if (description.length < 900) console.log(`description too thin: ${description.length}`);

const file = process.argv[2] ?? 'tg-0925ap-payload.json';
writeFileSync(file, JSON.stringify({ deals: [row] }));
console.log(`pre-flight OK, 1 row -> ${file}`);
console.log(`SLUGS: ${row.slug}`);
