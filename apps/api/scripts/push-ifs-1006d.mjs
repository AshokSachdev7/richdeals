// DEAL-INGEST indiafreestuff tick 2026-10-06d
//
// 4 listing pages (home, /deals?page=2,3, /deals/superdeals): 16 new IFS slugs. The junk filter dropped 7
// (pain spray, shampoo, serum, scrubber, empty bottles, 20 L water can, coupon-gated kids tent). 9 resolved to Amazon
// ASINs, none in DB. PDP-verified (#centerCol price, add-to-cart, rating >= 3.5 on >= ~20 reviews): 4 pass.
// Dropped: Noble Monk trousers x2 (3.2 stars), Noble Monk shirt (no ratings), Q Devices scale (14 reviews),
// VOMI gas toaster (3.1 stars, 10 reviews).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const ONE = 'The link opens the exact listing we checked; pick another colour or size only if you want it, as variants can be priced differently.';
const az = (productId, name, price, mrp, img, stars, reviews, lead, p2, p3) => ({
  store: 'Amazon', productId, name, price, mrp,
  image: `https://m.media-amazon.com/images/I/${img}.jpg`,
  variant: ONE,
  description: [`${lead} is ₹${inr(price)} on Amazon, ${Math.round((1 - price / mrp) * 100)}% below M.R.P., rated ${stars} stars across ${inr(reviews)} reviews.`, p2, p3],
});
const DEALS = [
  az("B0G4MVD8G6", "Kratos 67 Inch Selfie Stick Tripod Stand with Light", 599, 1999, "71-PZArrRiL._SL1500_", 4.0, 741,
    "The Kratos 67-inch (1.7 m) selfie stick tripod with light",
    "It works as a handheld selfie stick or a free-standing tripod for phones, with a 360-degree rotating handle to steady shots. Amazon lists it as a Bluetooth tripod.",
    "At about 130 g it is light enough for travel, vlogging and live streams, and it has more than 700 reviews averaging 4 stars."),
  az("B0BR5M362V", "Woodland Mens Leather Sneaker", 1899, 3795, "71PYs3UIQdL._SL1500_", 3.9, 172,
    "Woodland's leather sneaker for men",
    "It is a casual leather sneaker from Woodland. The link opens the Camel colour we checked.",
    "Shoe prices change by size, so confirm your size is still at this price before checking out."),
  az("B0CB6J954C", "Faber 3-in-1 Sportz Blender 400W with Chopping, Smoothie and Grinding Jars", 2850, 5999, "51i43zbq0-L._SL1346_", 3.6, 74,
    "The Faber 3-in-1 Sportz personal blender",
    "It runs on a 400 W copper motor and ships with a 500 ml and a 300 ml lockable jar, a chopping bowl, two lids and a sipper cap, so it handles smoothies, wet and dry grinding and chopping.",
    "The blades detach for cleaning and the motor has overheat protection. At 3.6 stars the reviews are mixed, so read the recent ones before ordering."),
  az("B0G4RXB1P4", "Milton 5 Litre 3000W Instant Water Geyser with SS304 Tank", 3749, 8999, "61CZGdcGJLL._SL1500_", 4.1, 35,
    "Milton's 5-litre 3000 W instant water geyser",
    "It has an SS304 stainless steel tank and a nickel-coated copper element, with a pressure release valve, thermostat and thermal cut-out for safety. Milton says it heats water in 2 to 3 minutes.",
    "The compact vertical body suits small bathrooms and kitchen sinks. It carries a 2-year product warranty and a 5-year tank warranty."),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
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
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1006d-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
