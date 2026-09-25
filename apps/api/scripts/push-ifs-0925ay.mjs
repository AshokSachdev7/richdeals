// DEAL-INGEST indiafreestuff tick 2026-09-25ay
//
// /deals + /deals?page=2 + /deals/superdeals = 90 slugs -> 25 new -> 2 rejected before resolving (freebie sample,
// SBI-card price) -> 23 resolved Buy Now -> 7 bank-card / card-EMI-only prices rejected (5 Flipkart, 2 Amazon)
// -> 1 DB dup (B0BR5J92KX = LIVE 5407) -> 14 Amazon ASINs checked in the logged-in tab + 1 Flipkart pid.
// Amazon: 9 pass; rejected: 2 coupon-dependent (B0GXKWYRNG ₹949 vs ₹699, B09MFVWRCW ₹299 vs ₹159), 1 drift
// (B0D8169B13 ₹150 vs ₹145), 2 price read null (B0CHVPQLC7, B0DQPT85TB). Flipkart: Bellavita ld+json ₹189 InStock.
// Price / M.R.P. / image / stock come from the PDP read in .playwright-mcp/az0925ay.json — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../.playwright-mcp/az0925ay.json', import.meta.url), 'utf8'));
if (typeof pdp === 'string') pdp = JSON.parse(pdp);
const byAsin = Object.fromEntries(pdp.map((r) => [r.a, r]));
// ponytail: fetched .a-text-price on these two is the per-count rate (₹61, ₹30.83); M.R.P. re-read from #corePriceDisplay text
const MRP_FIX = { B00SUYEQ8U: 790, B0FJFB8M9G: 1399 };

const HOWTO = (what, variant, store = 'Amazon') => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const SAME = 'Confirm this exact variant is selected — other colours, sizes or pack options on the same page are priced differently.';

const A = (productId, name, description, variant = SAME) => {
  const r = byAsin[productId];
  if (!r) throw new Error(`no PDP read ${productId}`);
  const left = r.av.match(/only (\d+) left/i);
  return {
    store: 'Amazon', productId, name, description, variant,
    price: r.p, mrp: MRP_FIX[productId] ?? r.mrp, exp: r.exp, av: r.av,
    // ponytail: thumbnails (_SX/_SY) upgraded to the full-size _SL1500_ rendition of the same image id
    image: r.img.replace(/\._[^/]+_\.jpg$/, '._SL1500_.jpg'),
    stock: left ? `only ${left[1]} left in stock at this price when checked` : undefined,
  };
};

const DEALS = [
  A('B0DZCYP7X8', 'CELLO All Day Water Bottles, Set of 3 (310 ml, 790 ml, 2085 ml), Pink', [
    "One bottle size never fits a whole family's day. A small bottle slides into a school bag, a mid-size one sits on an office desk, and a two-litre bottle covers a gym session or the dining table. Buying the three together is cheaper than picking them up one at a time.",
    "This CELLO All Day set has three pink bottles of 310 ml, 790 ml and 2085 ml. The listing says they are food-grade, BPA-free plastic with a leakproof lid and a wide mouth, and have time markers printed on the side so you can track how much you have drunk through the day.",
    "Plastic bottles are for room-temperature or cold water — do not fill them with hot tea or boiling water. The wide mouth makes them easy to scrub, so wash them with a bottle brush every couple of days instead of just rinsing. Keep them out of a hot parked car, where plastic bottles warp and water picks up a taste.",
  ], 'Confirm the Set of 3 in Pink is selected — other colours and pack sizes on the same page are priced differently.'),
  A('B0DXPQ9XHT', 'HP KM120 Wired Keyboard and Mouse Combo (AB3D0AA)', [
    "A plain wired keyboard and mouse is still the most reliable desk setup: no batteries to die mid-meeting, no pairing, no lag. For a work-from-home desk, a student laptop or a shop billing counter, a wired combo from a known brand is the lowest-hassle buy.",
    "HP's KM120 is a full-size wired keyboard plus a wired mouse. The listing gives the mouse a 1600 DPI optical sensor, and the keyboard has LED indicators for Num Lock, Caps Lock and Scroll Lock. Both connect over USB, so they work with any Windows laptop or desktop with no driver install.",
    "If your laptop has only one or two USB-A ports, you will need a small USB hub, since the keyboard and mouse each take one. Keep the keyboard free of crumbs with a quick shake upside down once a week. For a laptop setup, raise the laptop screen to eye level and use the combo on the desk to save your neck.",
  ], 'Confirm the KM120 combo (AB3D0AA) is selected.'),
  A('B0DCG5GBYV', 'Amazon Brand Solimo Stainless Steel Insulated Cola Bottle, 1000 ml, Steel Finish', [
    "A one-litre insulated bottle is the size that actually lasts a working day. It keeps water cold through an Indian summer afternoon in a bag or a two-wheeler dickey, and in winter it can hold tea or hot water for a long journey instead of paying for station chai.",
    "This Solimo bottle is Amazon's own brand, in a cola-bottle shape with a steel finish. The listing says it is 304-grade stainless steel with vacuum insulation that keeps drinks hot or cold for up to 24 hours, has a leak-proof BPA-free cap, and is tested to IS 17526, the Indian standard for vacuum flasks.",
    "Pre-chill or pre-heat the bottle with a splash of cold or hot water for a minute before filling — it holds temperature noticeably longer. Do not put it in the freezer or the microwave. Wash the cap seal separately, since that is where smells build up, and let it dry open overnight.",
  ], 'Confirm the 1000 ml size in Steel Finish is selected — other sizes and colours are priced differently.'),
  A('B00SUYEQ8U', 'Neelam Stainless Steel Masala Dabba (Spice Box), 10 Pieces, 1225 ml', [
    "A masala dabba is the one kitchen tool every Indian stove needs: seven everyday spices in one round tin, within reach while the tadka is on. A steel one lasts for decades and does not stain from turmeric the way plastic boxes do.",
    "This Neelam spice box counts as 10 pieces: the main dabba, its lid, seven spice containers, a small spoon and an inner steel plate. The listing gives the capacity as 1225 ml and the size as 19 x 19 x 6 cm. The inner steel lid stops spices spilling across bowls, and the outer lid closes the whole box.",
    "Fill each bowl only three-quarters full so the inner lid sits flat. Keep the box away from the stove's steam, and never put a wet spoon into it, because moisture makes powders like haldi and chilli clump. Wash it with mild soap, dry it completely and refill once a month so spices stay fresh.",
  ], 'Confirm the 10-piece, 1225 ml spice box is selected — other sizes are priced differently.'),
  A('B0FJFB8M9G', 'Plastic Food Storage Containers with Lids, Set of 12 (6 x 350 ml + 6 x 250 ml), Black', [
    "Small containers are the ones a kitchen always runs out of: leftover sabzi, chopped onions for the morning, chutney, dry fruit or a lunchbox side. A set of twelve in two sizes covers the fridge, the pantry and the office tiffin at once.",
    "This unbranded set has six 350 ml and six 250 ml containers with lids. The listing says they are food-grade BPA-free plastic, airtight and leak-proof, microwave safe and dishwasher safe. At this price each container works out to about ₹31.",
    "Take the lid off before microwaving, or at least loosen it, so steam can escape and the lid does not warp. Oily and turmeric-heavy curries can stain light plastic, so keep the darker boxes for those. The listing's title says black while one bullet mentions violet, so check the photos on the page to see which colour you are getting.",
  ], 'Confirm the Set of 12 (6 x 350 ml + 6 x 250 ml) is selected — other pack sizes are priced differently.'),
  A('B086344R9H', 'Apple Leather Folio Case for iPhone 11 Pro, Peacock Blue', [
    "iPhone 11 Pro owners still using the phone are exactly the people who want it to last a few more years, and a folio case covers the screen as well as the back. It also doubles as a slim wallet for a metro card, a credit card and a bit of cash.",
    "This is Apple's own leather folio in Peacock Blue, made only for the iPhone 11 Pro — not the 11 or the 11 Pro Max. Opening the cover wakes the phone and closing it puts it to sleep. The inside has a microfiber lining with space for cards and a few notes, and the listing says it stays on for wireless charging.",
    "Genuine leather darkens and picks up a patina with use, which is normal. Keep it away from water and wipe it with a dry cloth. Do not stack more than a couple of cards inside, or the cover stops closing flat and the sleep/wake magnet misses. At this price it is roughly a fifth of the M.R.P., since the iPhone 11 Pro is an older model.",
  ], 'Confirm the iPhone 11 Pro folio in Peacock is selected — other colours and models are priced differently.'),
  A('B07T9D72FS', 'Joyroom JR-D3S Dual Battery Sports Bluetooth Neckband, Black', [
    "The usual weakness of a budget neckband is the battery: it dies halfway through a long day. A dual-battery design spreads the cells across both sides of the band, which keeps it balanced on the neck and gives more room for battery than a single pod.",
    "Joyroom's JR-D3S is a Bluetooth neckband with two batteries. The listing rates it for about 7 hours of playback, IPX5 sweat and splash resistance, and magnetic earbuds that clip together when you are not listening. It comes with a 6-month warranty.",
    "IPX5 covers sweat and light rain, not swimming or a shower. Wipe the earbuds after a workout and let them dry before charging. Clip the magnets together when the band is around your neck so the earbuds do not swing and snag. Stock is very limited at this price, so check the page before counting on it.",
  ], 'Confirm the JR-D3S in Black is selected.'),
  A('B0G1MQHQNY', 'Kratos 51W PD + QC Dual-Port Fast Car Charger', [
    "An old 12W car charger cannot keep up with a phone running navigation, so the battery barely holds level on a long drive. A dual-port charger with a USB-C Power Delivery port fast-charges the phone that matters and still has a second port for a passenger or a dashcam.",
    "This Kratos charger is rated 51W total across two ports: a USB-C PD port and a USB-A Quick Charge port, so two devices charge at once. The listing describes it as ultra-compact, sitting close to flush in the 12V socket, with protection against overheating, overload and short circuits.",
    "51W is the combined total, not what one phone gets — the USB-C port gives the most. Use a USB-C to USB-C cable (or USB-C to Lightning for an iPhone) on the PD port for fast charging; a USB-A cable will not carry PD. Our car charger buying guide explains per-port watts in detail.",
  ], 'Confirm the 51W PD + QC model is selected.'),
  A('B0BN681RB5', 'Havells USB Star Type-A to Type-C Data Cable, 65W, 5A, 1 m', [
    "A cheap charging cable is usually the real reason a fast charger feels slow. A cable rated for 5A carries the full current a fast-charging brick can deliver, and a known brand is less likely to fray at the connector within a few months.",
    "Havells' USB Star cable has a USB-A plug on one end and USB-C on the other, 1 m long. The listing rates it for up to 65W and 5A, with fast data transfer, and says it is bend-tested up to 10,000 times.",
    "Check your charger first: this cable needs a USB-A charging brick. It will not work with a USB-C-only charger, and USB-A to USB-C cables do not carry USB Power Delivery, so an iPhone or a PD-only phone will not fast-charge through it. For Android phones that fast-charge over USB-A, such as many Xiaomi, Realme and OnePlus models, it is a solid spare.",
  ], 'Confirm the Type-A to Type-C, 65W model is selected.'),
  {
    store: 'Flipkart', productId: 'DEOHD95MJKUSUMMH', name: 'BELLAVITA Polar Breeze & Mystic Bloom Deodorant Combo, 2 x 200 ml',
    price: 189, mrp: 598, exp: 189, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/deodorant/j/8/c/400-polar-breeze-mystic-bloom-deodorant-combo-2x200ml-long-resized-original-imahegxfhhs9yxwt.jpeg?q=70',
    affiliateUrl: FK('bellavita-polar-breeze-mystic-bloom-deodorant-combo-2x200ml-long-lasting-fragrance-body-spray-men-women/p/itm067ea24b02d64', 'DEOHD95MJKUSUMMH'),
    description: [
      "Deodorant is a monthly repeat buy, so the per-can price matters more than the brand name. Two 200 ml cans for under ₹200 is about ₹95 a can, well below what most branded body sprays cost at a chemist.",
      "Bellavita's combo has two 200 ml body sprays: Polar Breeze and Mystic Bloom, sold as unisex for men and women. Flipkart lists it as IFRA-certified and long-lasting. Flipkart does not accept returns on this item, so buy it for the scents you already know you like.",
      "Spray from about 15 cm onto dry skin, not straight after a shower while still damp, and let it settle before dressing. Do not spray on broken or freshly shaved skin. Keep the cans out of a hot car or direct sun — aerosols are pressurised. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm the Polar Breeze & Mystic Bloom 2 x 200 ml combo is selected.',
  },
];

// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs IFS ${d.productId}`);
  if (!/in ?stock|only \d+ left/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  // hand-typed ₹ in copy must match the PDP price (title-rupee-vs-price rule)
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  const imgOk = d.store === 'Flipkart'
    ? /^https:\/\/rukmini\d\.flixcart\.com\/image\/1500\/1500\//.test(row.image)
    : /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/.test(row.image);
  if (!imgOk) throw new Error(`bad image ${d.productId} ${row.image}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate ASIN');

const file = process.argv[2] ?? 'ifs-0925ay-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
