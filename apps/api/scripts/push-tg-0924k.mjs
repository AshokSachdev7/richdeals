// TELEGRAM-DEAL-MONITOR tick 2026-09-24k
//
// Sidebar scrape of 13 groups -> shortlinks resolved -> dedup vs tg-multi-seen + DB -> 4 new.
// Amazon verified in logged-in tab (#centerCol); Flipkart via ld+json in a Playwright tab.
// Coupon deals are listed at the live pre-coupon price; the coupon is named in the how-to.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (id) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(`https://www.myntra.com/${id}`)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const COUPON = (n) => `Tick the ${n}% coupon box on the product page before adding to cart — it comes off at checkout, below the price shown here.`;

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0GTN4ZKXZ', name: 'Amazon Basics Triply Stainless Steel Cookware Set, 7 Pieces',
    price: 2888, mrp: 9990, image: IMG('71fVzR4tGNL._SL1500_.jpg'),
    description: [
      "Triply cookware sandwiches an aluminium core between two layers of stainless steel, so the base heats evenly instead of scorching in one hot spot the way thin single-layer steel does. That is the whole reason people move from non-stick to triply: no coating to peel, no worry about metal spatulas, and pans that last years rather than a couple of seasons.",
      "This Amazon Basics set covers most of an Indian kitchen in one box: a 20 cm deep kadai (3.4 L), a 16 cm saucepan (1.7 L), a 20 cm casserole (1.8 L) and a 20 cm frypan (1.2 L), plus three stainless steel lids. The handles are steel too, and the listing states the pieces are dishwasher safe and work on both induction and gas, so it suits a rental flat with an induction top as well as a home gas stove.",
      "Triply needs a slightly different habit: heat the pan on medium for a minute before adding oil, and food releases far better. Bought piece by piece, a triply kadai alone often costs close to this whole set. Amazon lists it with Pay on Delivery and a 10-day return window, and it ships Amazon Delivered.",
    ],
    variant: 'Confirm the style reads Cookware Set 7 Pcs — smaller sets on the same page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0H6BHJHCB', name: 'Himalaya Total Care Baby Pants Diaper, XXL, 88 Count (Pack of 2)',
    price: 1150, mrp: 2398, image: IMG('71kdl0fnGjL._SL1500_.jpg'),
    description: [
      "Himalaya's Total Care pants are pull-up style diapers, which is what most parents switch to once a toddler starts rolling and crawling: no tapes to fasten on a wriggling child, you slide them on like underwear. The range leans on Himalaya's herbal-care positioning for rash-prone skin, and it carries a 4.1-star rating across more than 85,000 reviews on Amazon.",
      "This listing is the XXL size for children of 15 to 25 kg, sold as two packs for 88 pants in total. At the live price that works out to about ₹13 a pant, which is a good bulk rate for a branded XXL pant — larger sizes usually cost more per piece than small ones, so a two-pack deal at this size is worth stocking up on.",
      "Check the size before buying: the same page offers New Born through XXL, and each size has its own price. Diapers are non-returnable on Amazon, so confirm the weight band fits your child. The pack on the page shows a use-by date of September 2027, so there is no rush to use up a bulk buy.",
    ],
    variant: 'Select Size: Extra Extra Large and Unit Count 88 — other sizes are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0HKRC8ZX2', name: 'XONCO Solar Firefly Garden Stake Light (Pack of 1)',
    price: 499, mrp: 1199, image: IMG('819HwH9F4wL._SL1500_.jpg'), coupon: 35,
    description: [
      "Firefly lights are the swaying kind: small warm LEDs sit on the tips of thin flexible wires, so when there is a breeze the points of light bob around like fireflies over a lawn. They need no wiring at all. A small solar panel on top charges through the day and the lamp switches itself on at dusk, which makes it an easy add for a balcony planter, pathway edge or garden bed.",
      "This XONCO unit is a single stake lamp in black plastic. Push the stake into soil or a large pot, face the panel where it gets direct sun, and leave it. Solar garden lights run brighter and longer after a clear day than a cloudy one, so a spot in direct sun from late morning onwards gives the best evening glow.",
      "The listing carries a 35% coupon on top of the live price — tick it on the product page and the checkout total comes down to about ₹325. Amazon ships it Amazon Delivered with a 10-day return window. Because it is a pack of one, buy two or three if you want to light a longer path.",
    ],
    variant: 'Confirm the listing is Pack of 1 — multi-packs on the same page carry their own price.',
  },
  {
    store: 'Flipkart', productId: 'FCKGT7FFFSRAYVM7', name: 'Lotus Botanicals Vitamin C Skin Brightening 5-Step Facial Kit',
    price: 153, mrp: 499,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/facial-kit/v/k/g/44-vitamin-c-skin-brightening-5-step-facial-kit-boosts-glow-1-resized-original-imagt7fzqmgarky4.jpeg?q=70',
    affiliateUrl: FK('lotus-botanicals-vitamin-c-skin-brightening-5-step-facial-kit-boosts-glow-brightens/p/itmecb207aa5a514', 'FCKGT7FFFSRAYVM7'),
    description: [
      "A home facial kit breaks a salon facial into small single-use sachets you use in order, usually cleanser, scrub, massage cream or gel, and a pack. The Lotus Botanicals kit follows that five-step routine built around vitamin C, which is the ingredient most people look for when they want dull or tanned skin to look brighter and more even.",
      "The main reason to buy it is the price. A salon vitamin C facial easily runs to several hundred rupees, and this kit costs a fraction of that at the live Flipkart price. Flipkart itself flags this as the lowest price of the year. It is rated 4.2 stars from over 9,500 ratings, so it is a well-tried product rather than an unknown brand.",
      "Patch-test any new facial product on your inner arm first, especially if your skin is sensitive, and follow the step order printed on the pack. Doing it in the evening, and skipping harsh exfoliation for a day or two afterwards, gives the best result. Flipkart shows it in stock with its standard replacement policy for beauty items.",
    ],
    variant: 'Confirm the kit named Vitamin C Skin Brightening 5 Step is selected — other Lotus kits appear as ads on the same page.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\//, Myntra: /^https:\/\/assets\.myntassets\.com\// };
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? COUPON(d.coupon) : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0924k-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
