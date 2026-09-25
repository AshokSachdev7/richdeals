// TELEGRAM-DEAL-MONITOR tick 2026-09-25ad
//
// Sidebar read of 13 tg groups -> 4 new posts. Crompton mixer B0F8NT3CQY + boAt Airdopes Joy v2 B0GZMYP6Y6 verified in
// logged-in Amazon tab; Aqua Fresh purifier (Flipkart pid WAPGW5YZQHM7EY3S) read in a Playwright tab (no ld+json,
// price from page text, selected variant buyable). Anjeer B0HDFZWQY1 skipped (grocery, 500g title vs 415g bullet).
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

const FK_LAST = 'No coupon is needed for the listed price. Flipkart may show optional bank-card cashback at checkout (for example on Flipkart Axis or SBI credit cards), which lowers the final amount further if you hold that card; Flipkart also adds a small Protect Promise fee at checkout.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0F8NT3CQY', name: 'Crompton Ameo 500W Mixer Grinder with 3 Stainless Steel Jars, Blue and Black',
    price: 1899, mrp: 3400, image: IMG('51WhJiv7P1L._SL1200_.jpg'),
    description: [
      "A 500W mixer grinder is the everyday size for a small Indian kitchen: enough power for chutneys, masalas, idli and dosa batter in small batches, and milkshakes, without the bulk and noise of a 750W machine. Three jars cover the usual split — a large jar for wet grinding and blending, a medium one for dry masalas, and a small chutney jar for coconut or green chutney.",
      "The Crompton Ameo pairs a Powertron 500W motor with Crompton's Vent-X motor ventilation, which is meant to keep the motor cooler during longer grinding runs. All three jars are stainless steel, and the couplers are high-grade nylon with metal inserts, the part that usually wears out first on budget mixers. The body is finished in blue and black.",
      "With a 500W motor, grind hard items like whole spices or turmeric in short pulses and in small quantities rather than filling the jar, and give the motor a break between long batches of batter. Never run a jar empty, and keep the lid pressed down at the start of each run. Wash the blades and gasket right after use so masala residue does not harden around them.",
    ],
    variant: 'Confirm the 500W, 3-jar Blue and Black model is selected — other wattages and jar sets on the same page can be priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0GZMYP6Y6', name: 'boAt Airdopes Joy v2 TWS Earbuds, 35H Battery, 13mm Drivers, ENx',
    price: 799, mrp: 3490, image: IMG('61ha05nY0kL._SL1500_.jpg'),
    description: [
      "Truly wireless earbuds under ₹1,000 are now a commuter staple in India: no cable to tangle in a bag, and a charging case that tops the buds up through the day. At this price the things that matter most are battery life, a stable Bluetooth connection and a case small enough to carry in a jeans pocket, rather than premium features like active noise cancellation.",
      "The boAt Airdopes Joy v2 is a 2026 launch rated for up to 35 hours of total playback with the case. It uses 13mm drivers, touch controls, boAt's ENx environmental noise cancellation for clearer voice on calls, ASAP Charge for quick top-ups, and IWP (Insta Wake N' Pair), so the buds connect as soon as the case lid opens. It also works with the boAt app.",
      "ENx works on the microphones to cut background noise for the person you are calling; it is not active noise cancellation for your own music, so expect normal passive isolation from the ear tips. Try the different ear-tip sizes in the box for a better seal and fuller bass. Keep the case charged at least once every few days, since a fully drained case can take longer to wake.",
    ],
    variant: 'Pick your colour on the product page — some colours of the Airdopes Joy v2 can be priced differently from the one shown here.',
  },
  {
    store: 'Flipkart', productId: 'WAPGW5YZQHM7EY3S', name: 'Aqua Fresh Smoke Audi 18L RO + UV + UF + Copper + Alkaline + TDS Control Water Purifier',
    price: 3608, mrp: 16500, image: 'https://rukminim2.flixcart.com/image/800/1070/xif0q/water-purifier/2/m/l/-original-imahz372bgeppfhv.jpeg?q=90',
    affiliateUrl: FK('aqua-fresh-smoke-audi-18-ltr-drink-pure-india-1st-bis-is-16240-2023-cm-l8100159306-l-ro-uv-uf-copper-alkaline-tds-control-water-purifier/p/itmc3da457d7de29', 'WAPGW5YZQHM7EY3S'),
    last: FK_LAST,
    description: [
      "An RO + UV + UF purifier is the standard pick for Indian homes on borewell or tanker water, where dissolved salts (TDS) are high. The RO membrane removes dissolved solids and hardness, UV treats bacteria and viruses, and UF filters out finer suspended particles. A TDS control valve blends back some minerals so the water does not taste flat, which matters if your supply is only moderately hard.",
      "This Aqua Fresh Smoke Audi model has an 18 litre storage tank, so there is a buffer of purified water through power cuts and busy mornings. It adds a copper stage and an alkaline stage on top of RO + UV + UF, and the listing shows BIS certification under IS 16240:2023, the Indian standard for RO purifiers. The unit is finished in black with a smoked front.",
      "Test your tap water's TDS before buying — if it is already low (municipal supply under about 200 ppm), a UV + UF purifier without RO wastes less water. RO units reject a share of the input as waste water, so route the reject line to a bucket for mopping or plants. Budget for filter and membrane changes roughly every 6 to 12 months, and check whether installation is included with your pincode.",
    ],
    variant: 'Confirm the Black, Smoke 18L model is selected — other colours of this purifier were showing as out of stock and can be priced differently.',
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
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.last ?? NO_COUPON), image: d.image,
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

const file = process.argv[2] ?? 'tg-0925ad-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
