// TELEGRAM-DEAL-MONITOR tick 2026-09-24b
//
// Sidebar read of 13 groups -> 7 product posts -> 3 fresh after tg-multi-seen dedup
// (B0G38DGNKM handbag, PWBGGD4THDQZYAY6 Syska, B0D6VPTZ52 Puma already seen;
// boAt 20000mAh was a Flipkart collection page -> rejected).
// All 3 PDP-read in the logged-in Amazon tab; channel price == PDP price on each.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;

const STD_HOWTO = (what, variant) => [
  `Tap Grab Deal to open the ${what} on Amazon.in at the live price.`,
  variant,
  'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

const AMZ = [
  {
    productId: 'B0HKN3CNYZ', name: 'Doctor Set Pretend-Play Toy for Children',
    price: 50, mrp: 699, image: IMG('61VV2GtHSYL._SL1024_.jpg'),
    description: [
      'A toy doctor set is one of the oldest pretend-play toys for a reason: children copy what they see adults do, and a visit to the doctor is something almost every child has sat through. Playing it out with a stethoscope and a pretend syringe turns a slightly scary memory into a game they control.',
      'This set bundles the familiar pieces — a toy stethoscope, play glasses, a pretend syringe, scissors and a doctor tray to keep the tools in one place. It is a plastic set, so treat it as a play kit rather than a keepsake; the value is in how many afternoons of role-play it starts, not in how long each piece lasts.',
      'Before handing it over, check the pieces yourself. Small parts are a choking hazard for toddlers who still put things in their mouths, so the set suits children who have moved past that stage, and play with a younger sibling around is best supervised. At this price it also works as a return-gift or party-bag item.',
      `Live Amazon price is ₹${inr(50)} against an M.R.P. of ₹${inr(699)} — 93% off, In stock.`,
    ],
    howTo: STD_HOWTO('doctor set toy', 'Check the listing photos for the exact pieces included before adding to cart — low-priced toy listings sometimes ship a smaller assortment than the lifestyle images suggest.'),
  },
  {
    productId: 'B0FHHKP966', name: 'boAt Bassheads 211 Wired Earphones with Mic, Raging Black',
    price: 249, mrp: 599, image: IMG('51iovHVfaLL._SL1500_.jpg'),
    description: [
      "Wired earphones have quietly become the sensible backup again. They never need charging, they have no pairing lag for calls or games, and at this price losing a pair on a bus is not a disaster. boAt Bassheads is the brand's long-running wired line, and the 211 is one of its entry models.",
      "It uses 10mm dynamic drivers tuned to boAt's bass-forward house sound, an in-line microphone for calls, and a single multi-function button to play, pause, take calls and trigger Siri or Google Assistant. The cable is 120cm and ends in a standard 3.5mm jack, so it plugs straight into laptops, older phones, tablets and gaming controllers.",
      'Check your phone before ordering: many recent phones have dropped the 3.5mm headphone socket and will need a USB-C to 3.5mm adapter, which is sold separately. Wrap the cable loosely rather than tightly around a finger when storing it — the joint where the cable meets the plug is where cheap wired earphones fail first.',
      `Live Amazon price is ₹${inr(249)} against an M.R.P. of ₹${inr(599)} — 58% off, In stock.`,
    ],
    howTo: STD_HOWTO('boAt Bassheads 211 wired earphones', 'This price was read on the Raging Black colour. boAt prices each colour of the Bassheads 211 separately, so another shade may cost more.'),
  },
  {
    productId: 'B0FJ2FNTCB', name: 'USHA AquaBuddy Neo 25L 5 Star Storage Water Geyser',
    price: 5999, mrp: 17490, image: IMG('51+mt-BR9XL._SL1000_.jpg'),
    description: [
      "A 25-litre storage geyser is the size most homes pick for a main bathroom: enough hot water for a couple of back-to-back showers without waiting for a reheat. USHA's AquaBuddy Neo is a vertical storage water heater carrying a 5-star BEE rating, the top band for energy use in this category.",
      "It heats with a copper element and uses a magnesium anode to protect the tank from corrosion, which matters most in hard-water areas where scale and rust shorten a geyser's life. USHA quotes an 8-year warranty on the tank and 2 years on the product; the listing also mentions separate cover on the heating element, so read the warranty card for the exact terms.",
      "Budget for installation. Geysers usually need a wall mount, inlet and outlet pipes and a pressure-release valve fitted by a plumber or the brand's technician, and those parts are often charged separately. Draining and descaling the tank once a year, and replacing the anode rod when it wears down, keeps a storage geyser efficient.",
      `Live Amazon price is ₹${inr(5999)} against an M.R.P. of ₹${inr(17490)} — 66% off, In stock.`,
    ],
    howTo: STD_HOWTO('USHA AquaBuddy Neo 25L geyser', 'Confirm the 25 litre capacity is selected before adding to cart — USHA lists other AquaBuddy sizes on the same page at different prices.'),
  },
];

// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of AMZ) {
  const description = d.description.join('\n\n');
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
    description, howTo: d.howTo, image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: 'Amazon', productId: d.productId,
    affiliateUrl: `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`no discount ${d.productId}`);
  if (!/^https:\/\/m\.media-amazon\.com\//.test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  const pctLine = description.match(/— (\d+)% off/);
  if (!pctLine || Number(pctLine[1]) !== discountPct) throw new Error(`pct line ${d.productId}: ${pctLine?.[1]} vs ${discountPct}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0924b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
