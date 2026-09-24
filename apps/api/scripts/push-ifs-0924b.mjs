// DEAL-INGEST indiafreestuff tick 2026-09-24b
//
// Funnel: 68 cards off /deals + /deals/superdeals (2.6s gap, no 403/429) -> 61 not seen in prior
// ticks -> 44 after dropping hubs/credit cards/coupons/min-buy/pincode posts -> resolved through the
// base64 ?rto= Buy Now: Flipkart dl/indiafreestuff pid-only landings dropped, 16 Amazon + 1 Myntra
// + 1 Flipkart itm -> 17 fresh after productId dedup (B07KSPKVGL already LIVE) -> 11 publishable.
// Every price is the PDP figure, never the card figure.
// Rejected: drift B07S493VBS Nike deo (card 192 / live 618), B0DWH4F1CJ Sony WF-C710N (3575 / 8490),
// B0G1MVCH7W EVM mouse (179 / 199); OOS B0D5RBBNHZ Impulse rucksack; Myntra Pepe Jeans 30440976
// (1299 / 1399, most sizes unavailable); Flipkart MacBook Neo (bank-card-only price).
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
    productId: 'B01AT95TJS', name: 'Orient Electric Ventilator DX 200mm Exhaust Fan, White',
    price: 1139, mrp: 1730, image: IMG('61Ba2ypv1kL._SL1500_.jpg'),
    description: [
      'A kitchen or bathroom without a working exhaust fan turns every tadka and every hot shower into a moisture and smell problem that spreads to the rest of the house. The Orient Electric Ventilator DX is a 200mm (8-inch) wall exhaust fan built for exactly that job, from one of the brands most electricians in India stock by default.',
      'Orient rates it at 1300 RPM with an air delivery of 550 CMH, driven by a 100% copper motor — copper windings run cooler and last longer than aluminium ones, which matters for a fan that sits in steam and grease every day. The blades are aerodynamically shaped, and louvered shutters close when the fan is off so dust and insects stay outside.',
      'Before ordering, measure the wall opening: 200mm suits most standard kitchen and bathroom cut-outs, but an older or larger opening may need a different size. Clean the blades and shutters every couple of months in a kitchen, because a grease layer is what cuts suction first. Orient covers it with a 2-year warranty.',
      `Live Amazon price is ₹${inr(1139)} against an M.R.P. of ₹${inr(1730)} — 34% off, In stock.`,
    ],
    howTo: STD_HOWTO('Orient Ventilator DX 200mm exhaust fan', 'Check the size before adding to cart. This price is the 200mm Ventilator DX in white — Orient lists other sweep sizes and colours as separate variants at their own prices.'),
  },
  {
    productId: 'B08Z83Y2N5', name: "Lavie Women's Rex Satchel Handbag",
    price: 999, mrp: 3999, image: IMG('71QzeqhLq6L._SL1500_.jpg'),
    description: [
      'A structured satchel is the work bag that holds its shape on a desk and still looks right at dinner afterwards. Lavie is one of the best-known Indian handbag labels at the mid-price level, and the Rex is its satchel design — a boxy, structured body rather than a slouchy tote.',
      'At a quarter of its M.R.P., this is the price range where a branded bag competes directly with unbranded marketplace bags. The difference is usually finishing — stitching, zip quality and hardware — which is what a label like Lavie is paying for. It also works as a gift, which is how the listing positions it.',
      'Check the dimensions on the listing against what you carry every day; a satchel suits a tablet, diary and daily essentials rather than a full-size laptop. Stock was down to a single unit when we checked, so it may sell out quickly. Store it stuffed with paper to keep the structure from sagging.',
      `Live Amazon price is ₹${inr(999)} against an M.R.P. of ₹${inr(3999)} — 75% off, only 1 left in stock.`,
    ],
    howTo: STD_HOWTO('Lavie Rex satchel handbag', 'Check the colour before adding to cart. Lavie lists each colour of the Rex as its own variant with its own price, and this one was down to its last unit when we checked.'),
  },
  {
    productId: 'B0B7GCYJN1', name: 'SHARP EM-S34N-W 300W Stand Mixer with 3.4L Steel Bowl',
    price: 2599, mrp: 13200, image: IMG('61HvkePk83L._SL1500_.jpg'),
    description: [
      'A stand mixer takes the two most tiring kitchen jobs — kneading dough and whisking batter — off your arms. The SHARP EM-S34N-W does both with a 300W DC motor and a 3.4-litre stainless steel bowl, a sensible size for roti or bread dough for a family, or a cake batter for one or two tins.',
      'It has five speed settings plus a turbo mode, stainless steel beater hooks for whisking and dough hooks for kneading, and an eject button to swap attachments between jobs. The body is plastic, which keeps it light and easy to wipe down; the parts that touch food are the steel bowl and hooks.',
      'At 80% off, this is priced below many hand mixers. Set expectations for a 300W motor: it handles everyday atta dough and batters well, but very stiff or very large doughs are better done in batches so the motor does not strain. Start on a low speed when adding flour so it does not fly out of the bowl.',
      `Live Amazon price is ₹${inr(2599)} against an M.R.P. of ₹${inr(13200)} — 80% off, In stock.`,
    ],
    howTo: STD_HOWTO('SHARP EM-S34N-W stand mixer', 'Check the model number before adding to cart. This price is the EM-S34N-W — SHARP lists its other mixers under similar names at different prices.'),
  },
  {
    productId: 'B0CQ556CGW', name: 'Parker Jotter Originals Chrome Trim Ball Pen, Yellow, Blue Ink',
    price: 221, mrp: 380, image: IMG('51sHQnTNKoL._SL1280_.jpg'),
    description: [
      'The Parker Jotter is one of the most recognisable pens ever made — the clicky ball pen with the arrow clip that has sat in shirt pockets and on office desks for decades. The Jotter Originals line brings back the brighter body colours, and this one is yellow with chrome trim and a blue ink refill.',
      'It is a stainless steel and chrome pen, so it has more weight in the hand than a disposable, and the refill writes smoothly and evenly. The real value of a Jotter is that it is refillable: the pen itself lasts years, and Parker ball pen refills are sold in stationery shops across India.',
      'At this price it works as a small gift for a student, a colleague or anyone starting a new job, and the yellow body makes it easy to spot on a crowded desk. If you prefer a finer line or black ink, swap in a different Parker refill rather than buying a new pen.',
      `Live Amazon price is ₹${inr(221)} against an M.R.P. of ₹${inr(380)} — 42% off, In stock.`,
    ],
    howTo: STD_HOWTO('Parker Jotter Originals ball pen', 'Check the body colour before adding to cart. This price is the yellow Jotter Originals — Parker lists each colour separately, and prices differ between them.'),
  },
  {
    productId: 'B0CQXMY5RG', name: 'Ant Esports ALS05 Aluminium Foldable Laptop Stand, Black',
    price: 220, mrp: 1499, image: IMG('61-yVMoyy+L._SL1500_.jpg'),
    description: [
      'Working on a laptop flat on a desk means looking down at the screen for hours, which is where most neck and shoulder strain comes from. A stand that lifts the screen closer to eye level is the cheapest ergonomic fix there is, and the Ant Esports ALS05 does it for about the price of a lunch.',
      'It has six height levels, folds flat to go in a laptop bag, and is made of 4mm aluminium alloy, which keeps it stable without wobbling. Rubber strips hold the laptop in place and stop it sliding, and the open frame lets air flow under the laptop — useful for thin laptops that throttle when they get warm.',
      'Raising the laptop means typing on its keyboard at an awkward angle, so pair the stand with an external keyboard and mouse if you use it for a full workday. For short sessions or video calls it works fine on its own at a low setting.',
      `Live Amazon price is ₹${inr(220)} against an M.R.P. of ₹${inr(1499)} — 85% off, In stock.`,
    ],
    howTo: STD_HOWTO('Ant Esports ALS05 laptop stand', 'Check that the listing is the ALS05 in black before adding to cart. Ant Esports sells other stand models and colours on separate pages at their own prices.'),
  },
  {
    productId: 'B0D41CW6YP', name: "Puma Men's Kardio Slip-On Sneaker",
    price: 1350, mrp: 4499, image: IMG('51dLAfIo9cL._SL1200_.jpg'),
    description: [
      'Slip-on sneakers solve the everyday problem of laces: they go on in a few seconds at the door, which is why they have become the default casual shoe for errands, travel and office days with a relaxed dress code. The Puma Kardio is the brand\'s men\'s slip-on in this style.',
      'Puma is one of the brands most often discounted on Amazon India, but 70% off M.R.P. is at the deep end even for Puma. At this price it sits in the range of unbranded slip-ons, with the brand\'s sizing consistency and build quality on top.',
      'Slip-ons have no laces to adjust the fit, so sizing matters more than with a lace-up shoe. Too loose and the heel lifts when you walk; too tight and there is no way to loosen it. Compare the size chart with a shoe you already own. Stock was limited on this listing when we checked, so popular sizes may run out first.',
      `Live Amazon price is ₹${inr(1350)} against an M.R.P. of ₹${inr(4499)} — 70% off, only 5 left in stock.`,
    ],
    howTo: STD_HOWTO("Puma men's Kardio slip-on sneaker", 'Pick your size and colour before adding to cart. Puma prices each size and colour of the Kardio separately, so the figure applies to the variant you select.'),
  },
  {
    productId: 'B0DC73VHG5', name: 'E GATE C212 20W Wireless Bluetooth Speaker with Dual Passive Radiators',
    price: 790, mrp: 2100, image: IMG('812qk2QRuyL._SL1500_.jpg'),
    description: [
      'The E GATE C212 is a soundbar-shaped Bluetooth speaker for a desk, a bedroom or a small living room — a wider stereo image than a round portable speaker, at a price closer to a pair of wired earphones. It is rated at 20W, with a 2.0-channel layout plus two passive radiators that add bass without a separate subwoofer.',
      'Connectivity is its strong point: Bluetooth 5.3, AUX, USB, microSD and a built-in FM radio, so it plays from a phone, a laptop, a pen drive or a memory card. Two C212s can pair over TWS for a combined 40W stereo setup. It also has RGB LED lighting, which can be switched off.',
      'E GATE rates the 2000mAh battery at up to 15 hours at 50% volume with the LEDs off; expect less at high volume or with the lights on. For a TV, use the AUX input rather than Bluetooth, since a wired connection avoids lip-sync delay.',
      `Live Amazon price is ₹${inr(790)} against an M.R.P. of ₹${inr(2100)} — 62% off, In stock.`,
    ],
    howTo: STD_HOWTO('E GATE C212 Bluetooth speaker', 'Check the model name before adding to cart. This price is the C212 — E GATE sells other speakers with similar names and different wattage on separate pages.'),
  },
  {
    productId: 'B0F29HX8Z7', name: 'KAMILIANT by American Tourister Savvy 55cm Cabin Trolley Bag, Black',
    price: 1299, mrp: 8500, image: IMG('71I6jjG2SfL._SL1500_.jpg'),
    description: [
      'Kamiliant is American Tourister\'s value label: lighter feature sets and prices well below the main line. The Savvy is a 55cm hard-shell cabin trolley in polypropylene, the size most domestic airlines accept as hand baggage, which makes it the bag to buy if you want to skip the check-in queue.',
      'Its boxy shape maximises packing volume for the outer size. It rolls on eight 360° wheels, has retractable top and side handles, and a built-in 3-digit combination lock. Inside, cross-ribbons and a U-shaped pocket keep clothes in place. Polypropylene flexes on impact rather than cracking, which is why it is the standard shell material at this price.',
      'Cabin allowances vary by airline in both size and weight — most Indian carriers cap cabin bags at 7kg, and a hard shell uses some of that on its own. Check your airline\'s current limit before packing to the brim. At 85% off M.R.P., this is one of the lowest prices a brand-backed cabin trolley reaches.',
      `Live Amazon price is ₹${inr(1299)} against an M.R.P. of ₹${inr(8500)} — 85% off, In stock.`,
    ],
    howTo: STD_HOWTO('Kamiliant Savvy 55cm cabin trolley', 'Check the colour and the 55cm size before adding to cart. Kamiliant lists each size and colour of the Savvy as its own variant at its own price.'),
  },
  {
    productId: 'B0FLYFXZNY', name: 'SLEEPSPA by Coirfit Soft Bounce 3-Fold 3-Inch Single HD Foam Mattress (78x30)',
    price: 3625, mrp: 4200, image: IMG('71Pxh9ZfcLL._SL1500_.jpg'),
    description: [
      'A folding mattress is the answer to guests who stay two nights a year, a child\'s sleepover, or a room that has to switch between bedroom and study. SLEEPSPA is Coirfit\'s mattress label, and the Soft Bounce is a tri-fold single-size mattress in high-density foam that folds into a compact block when it is not in use.',
      'It measures 78 x 30 inches (198 x 76cm) and is 3 inches thick. High-density foam is what keeps a thin mattress from bottoming out, and the listing describes it as orthopedic HD foam. It comes with a 1-year manufacturer warranty and needs no assembly: unfold it and it is ready.',
      'The discount here is modest, at 14%, so this is a fair price rather than a steal. Treat a 3-inch folding mattress as a guest, floor or travel bed rather than a replacement for a full mattress you sleep on every night. Unpack it and let it air out for a day before first use, since new foam often carries a faint smell.',
      `Live Amazon price is ₹${inr(3625)} against an M.R.P. of ₹${inr(4200)} — 14% off, In stock.`,
    ],
    howTo: STD_HOWTO('SLEEPSPA Soft Bounce folding mattress', 'Check the size (78x30 inches, single) and the 3-inch thickness before adding to cart. SLEEPSPA lists other sizes and thicknesses as separate variants at different prices.'),
  },
  {
    productId: 'B0GHFBNVSM', name: 'Stainless Steel Rectangular Dish Drying Rack with Handles',
    price: 100, mrp: 699, image: IMG('7148zd3axzL._SL1500_.jpg'),
    description: [
      'In most Indian kitchens without a dishwasher, washed utensils end up stacked wet on the counter, which keeps them damp and leaves water marks. A wire dish basket beside the sink fixes that for the price of a cup of tea at a cafe, and this stainless steel one is at ₹100.',
      'It is a rectangular basket in rust-resistant stainless steel wire, with an open grid that lets water drain and air circulate so plates, bowls, cups and cutlery dry faster and without smells. Handles on both sides make it easy to carry the whole basket from the sink to the table or a cupboard.',
      'Put a tray or a folded cloth under it if your counter has no slope to the sink, because the water drains straight through the open grid. Rinse the basket itself every week or two, since food bits collect in the wires. At this price it is an easy add-on to another order.',
      `Live Amazon price is ₹${inr(100)} against an M.R.P. of ₹${inr(699)} — 86% off, In stock.`,
    ],
    howTo: STD_HOWTO('stainless steel dish drying rack', 'Check the size and the listing photos before adding to cart. Several sellers sell near-identical wire dish racks at different prices, and this deal applies to this listing only.'),
  },
  {
    productId: 'B0H3L1QMW9', name: 'Kamiliant by American Tourister Ather Printed 55cm Cabin Trolley Bag, Black',
    price: 1349, mrp: 8700, image: IMG('71EWkYGKkrL._SL1500_.jpg'),
    description: [
      'The Ather is the printed option in Kamiliant\'s cabin range. Kamiliant is American Tourister\'s value label, and this is a 55cm hard-shell cabin trolley — the size most domestic airlines accept as hand baggage — with a printed finish that is easier to spot in an overhead rack than a plain shell.',
      'The shell is polypropylene with a grooved pattern that adds strength and hides scratches. It rolls on 360° spinner wheels with a telescopic handle, and the interior is split 50:50 with cross-ribbons and zippered compartments, the layout that keeps clothes on one side and shoes and toiletries on the other. A built-in 3-digit combination lock is included, and the listing states a 3-year international warranty.',
      'Most Indian airlines cap cabin bags at 7kg including the bag itself, so weigh it packed before leaving for the airport. At 84% off M.R.P. it is priced within ₹50 of Kamiliant\'s plain Savvy cabin bag, so choose between them on looks and interior layout.',
      `Live Amazon price is ₹${inr(1349)} against an M.R.P. of ₹${inr(8700)} — 84% off, In stock.`,
    ],
    howTo: STD_HOWTO('Kamiliant Ather 55cm cabin trolley', 'Check the print and the 55cm size before adding to cart. Kamiliant lists each print and size of the Ather as its own variant at its own price.'),
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
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate productId');
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0924b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
