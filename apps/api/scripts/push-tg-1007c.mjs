// TELEGRAM-DEAL-MONITOR tick 2026-10-07c
//
// Sidebar sweep of 13 groups + ONLINE SHOPPING DEALS history -> 12 resolved ASINs -> 4 already LIVE -> 2 pushed.
// Dropped (PDP read, same-origin fetch in the logged-in Amazon tab):
//   - ASUS CW200 combo B0HC7G7SHV (Rogerkart): 3.6 stars, 4 ratings.
//   - MILTON Euroline kettle B0CK5JZ1TG: no buy box.
//   - Negi beach set B00N7K37FA: ₹225 on PDP vs ₹105 post.
//   - Symbol formal shirt B0F7L2C1HZ: ₹437 vs ₹256.
//   - Sturlite extension board B0HF5DPP1K: no ratings.
//   - XTRIM wrist support B0CMCSQWBC: near-duplicate of live B0CMCSQNTD.
// Live rows re-verified: Halonix B083KJ4MQ7 ₹415 -> ₹399, Bergner B0FCRPJT9F ₹1,999 -> ₹2,799 (prisma update).
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
    store: 'Amazon', productId: 'B0H5L55GJY', name: 'Havells 1000W Hair Dryer 2 Temperature Settings', price: 699, mrp: 1295,
    image: 'https://m.media-amazon.com/images/I/7113mSeiT0L._SL1500_.jpg', variant: ONE,
    description: [
      "Havells' 1000W hair dryer is ₹699 on Amazon, 46% below M.R.P., rated 4.2 stars across 3,878 reviews.",
      'It has two temperature settings and a 360° radial air inlet, and its compact build is made for travel.',
      'A light everyday blow-dryer from an established Indian appliance brand, suited to both men and women.',
    ],
  },
  {
    store: 'Amazon', productId: 'B09KXD44D7', name: 'KOTTY Women Fleece Hooded Neck Sweatshirt', price: 200, mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/7159zqiyYgL._SL1440_.jpg', variant: SIZE,
    description: [
      "KOTTY's fleece hooded sweatshirt for women is ₹200 on Amazon, 90% below M.R.P., rated 3.9 stars across 12 reviews.",
      'It is a fleece pullover with a hooded neck, a warm layer for cooler mornings and evenings.',
      'At this price it costs less than most plain t-shirts, so it is worth checking whether your size is in stock.',
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

const file = process.argv[2] ?? 'tg-1007c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
