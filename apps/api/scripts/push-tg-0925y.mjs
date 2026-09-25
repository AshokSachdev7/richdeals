// TELEGRAM-DEAL-MONITOR tick 2026-09-25y
//
// Sidebar read of 13 tg groups -> 1 changed group (ONLINE SHOPPING DEALS) -> its last 2 deal posts,
// link.amazon shortlinks resolved to B07P5TXZ9V + B07XLSP6Y6. Neither in tg-multi-seen nor the DB.
// Verified in logged-in Amazon tab: #corePrice + #centerCol M.R.P., #availability In stock, no coupon.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B07P5TXZ9V', name: 'Solimo Stainless Steel Steamer with Glass Lid, 4L, Induction Base',
    price: 599, mrp: 1100, image: IMG('81ry+Z3KACL._SL1500_.jpg'),
    description: [
      "A stacked steamer cooks food over boiling water instead of in it: water goes in the bottom pot, the perforated tier sits above, and the glass lid traps the steam. It is the easy way to make modaks, momos, idlis, dhokla or plain steamed vegetables without an electric appliance, and steamed vegetables keep more of their colour and bite than boiled ones.",
      "This Amazon Brand Solimo steamer is stainless steel with a 4 litre capacity and measures about 17 x 22 x 22.4 cm. The base works on induction as well as gas, so it suits kitchens that have moved to an induction cooktop. The glass lid lets you check whether momos have turned translucent without lifting it and losing the steam.",
      "Keep the water level below the steaming tier so it does not bubble up into the food, and top up with hot water on long batches. Brush the tier lightly with oil or line it with a banana leaf or cabbage leaf so dumplings do not stick. Let the lid cool before washing — glass can crack if cold water hits it straight off the flame.",
    ],
    variant: 'Confirm the 4L Silver steamer is selected — other sizes on the same page can be priced differently.',
  },
  {
    store: 'Amazon', productId: 'B07XLSP6Y6', name: 'PrettyKrafts 3-Shelf Hanging Wardrobe Organiser with Engineered Wood Base, Grey',
    price: 85, mrp: 799, image: IMG('51Q7T8jF6ML._SL1100_.jpg'),
    description: [
      "A hanging wardrobe organiser hooks over the rail in an almirah and adds open shelves in the space that usually holds only a few hangers. Folded T-shirts, towels, handbags or children's clothes go on the shelves instead of into tall piles that topple every time something is pulled out from the bottom.",
      "This PrettyKrafts organiser has three shelves in non-woven fabric, with an engineered wood base panel that keeps each shelf flat instead of sagging in the middle. It folds flat when not in use, which makes it handy for hostel rooms and rented flats where storage moves with you. The grey colour hides dust better than white fabric.",
      "Measure the height of your wardrobe below the rail before hanging it, so the bottom shelf clears the floor of the almirah. Keep heavy items like jeans and bedsheets on the lowest shelf and lighter things on top so the rail is not strained. Wipe the fabric with a dry cloth, as soaking non-woven material weakens it.",
    ],
    variant: 'Confirm the Grey 3-shelf organiser is selected — other colours and sizes on the same page can be priced differently.',
  },
];
// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\// };
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, NO_COUPON), image: d.image,
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
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0925y-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
