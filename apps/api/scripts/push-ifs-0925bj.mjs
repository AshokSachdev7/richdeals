// DEAL-INGEST indiafreestuff tick 2026-09-25bj
//
// homepage + /deals p1-p2 + superdeals = 100 slugs -> 54 new -> 5 pre-rejected (min-buy x3, sarees sale hub,
// grocery figs) -> 49 resolved Buy Now -> 3 rejected (min buy 2, Haier coupon+SBI card, Prowl promo page)
// -> 4 DB dups (AYDH75DXCMK5ZNRF, B0F4NFCHX8, B0D63HJTMF, B00XRJBOBA).
// Amazon: 35 checked in the logged-in tab, 24 pass; rejected 5 drift, 5 coupon-only, 1 price null.
// Flipkart: 5 checked via ld+json, 1 pass (OSCAR combo ₹284), 4 drift. Myntra: Duke slip-on ₹599 pass.
// Ajio 703672269004: curl 403, unverified -> rejected.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0925bj.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0925bj.json', import.meta.url), 'utf8'));
if (typeof pdp === 'string') pdp = JSON.parse(pdp);
const byAsin = Object.fromEntries(pdp.map((r) => [r.a, r]));

const HOWTO = (what, variant, store = 'Amazon') => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const SAME = 'Confirm this exact variant is selected — other colours, sizes or pack options on the same page are priced differently.';
const SIZE = 'Pick your size from the size chart first — this price applies to the listed colour, and some sizes may already be sold out.';

const A = (productId, name, description, variant = SAME) => {
  const r = byAsin[productId];
  if (!r) throw new Error(`no PDP read ${productId}`);
  const left = r.av.match(/only (\d+) left/i);
  return {
    store: 'Amazon', productId, name, description, variant,
    price: r.p, mrp: r.mrp, exp: r.exp, av: r.av,
    // ponytail: every rendition (_SY355_, _SL1254_ …) normalised to the full-size _SL1500_ of the same image id
    image: r.img.replace(/\._[^/]+_\.jpg$/, '._SL1500_.jpg'),
    stock: left ? `only ${left[1]} left in stock at this price when checked` : undefined,
  };
};

const DEALS = [
  A('B0C4B6DT63', 'Ant Esports GS170 USB-Powered 2.0 Desktop Speakers with RGB Lights', [
    "Laptop speakers are thin and quiet, and a Bluetooth speaker needs charging. A small pair of wired desktop speakers fixes both for a study table or office desk: plug in once and forget about it.",
    "Ant Esports' GS170 is a 2.0 stereo pair that draws power from a USB port and takes sound over a 3.5 mm aux cable. The listing gives 6W RMS in total, a 25 Hz–20 kHz range, an in-line volume control and RGB lighting. Each speaker is about 2.6 x 2.4 x 3.5 inches and the pair weighs roughly 340 g.",
    "It needs a 3.5 mm headphone jack for sound — many new laptops and phones have dropped it, so check yours or budget for a USB-C to 3.5 mm dongle. The RGB colours cycle on their own and cannot be synced to music. 6W suits a desk, not a room-filling party.",
  ], 'Confirm the GS170 is selected.'),
  A('B0H7N5ZJQQ', 'Manual Baby Nasal Aspirator with Soft Silicone Tip, BPA-Free', [
    "Babies cannot blow their nose, so a blocked nose means broken sleep and fussy feeds for everyone. A simple squeeze-bulb aspirator is the first thing most paediatricians suggest keeping at home, and it needs no batteries.",
    "This unbranded aspirator is a manual suction bulb with a soft food-grade silicone tip. The listing says it is BPA-free, suitable from birth, and that the tip detaches for washing in warm soapy water. It is small enough for a diaper bag.",
    "Squeeze the bulb before placing the tip at the edge of the nostril, then release slowly — never push the tip deep inside. A drop of saline first loosens thick mucus. Wash and fully dry it after every use. If congestion comes with fever, breathing trouble or lasts several days, see a doctor rather than relying on suction.",
  ], 'Confirm the single manual aspirator is selected.'),
  A('B0GKGK15CL', "Bewakoof Men's Typography Oversized Half Sleeve Cotton T-Shirt", [
    "Oversized tees are the everyday uniform for college and weekends, and Bewakoof is one of the Indian brands that made the cut popular. Its prints rarely go on deep discount on Amazon, so a big markdown is worth a look.",
    "This is a men's round-neck, half-sleeve cotton T-shirt with a typography print, cut in Bewakoof's oversized fit. The seller is Cocoblu Retail, one of Amazon's main fulfilment sellers.",
    "Oversized means the shoulders drop and the body is loose by design, so do not size down unless you want a regular fit. Wash printed tees inside out in cold water and skip the dryer to keep the print from cracking.",
  ], SIZE),
  A('B0GSFT875M', "BONO Men's Printed Cotton Blend Trunks, Regular Fit", [
    "Innerwear is a repeat buy that most people restock only when the old pack falls apart. A branded pair for under ₹300 is a low-risk way to try a new label.",
    "BONO's printed trunks are a cotton blend in a regular fit. The listing describes an anti-bacterial finish, microfibre and a soft waistband.",
    "Check the size chart against your waist, since trunks fit closer than briefs. Wash before first wear and avoid hot water, which loosens the waistband over time. Amazon generally does not accept returns on innerwear once opened, so pick the size carefully.",
  ], SIZE),
  A('B07YX5LCQR', "BRUSTRO Artist's Acrylic Paper Pad, 400 GSM, A4, 12 Sheets", [
    "Acrylic paint on ordinary drawing paper buckles and soaks through. Heavy, textured acrylic paper holds thick layers without warping, which is why art students are told to buy a proper pad instead of a sketchbook.",
    "BRUSTRO's pad has 12 A4 sheets of 400 GSM textured, acid-free paper, glued along one edge so each sheet peels off cleanly. The listing says it takes both acrylic and oil paint.",
    "400 GSM is thick enough for heavy layering, but very wet washes still ripple a little — tape the sheet down on a board while working. Acid-free paper does not yellow, so finished pieces can be framed. At 12 sheets, it is a practice pad rather than a bulk supply.",
  ], 'Confirm the A4, 12-sheet pad is selected — other sizes are priced differently.'),
  A('B09QMKDCQZ', 'Cello ColourUp Travel Art Kit for Kids with Crayons, Pencils, Sketch Pens and Clay', [
    "A long train journey or a summer holiday goes better with something to keep children busy that is not a screen. An all-in-one art kit in a carry case also makes a ready birthday return gift.",
    "Cello's ColourUp Travel Kit comes in a suitcase-style pack. The listing lists 15 plastic crayons, 12 jumbo wax crayons, 12 colour pencils, 12 sketch pens, 12 clay strips (100 g), 2 permanent markers, an activity book, a DIY passport, a DIY greeting card and a travel tag. It weighs about 850 g.",
    "The permanent markers do not wash out of clothes or upholstery, so keep them for older children or supervised use. Clay dries out once opened — press it back into its wrapper after play.",
  ], 'Confirm the ColourUp Travel Kit is selected.'),
  A('B0FGX5FH4B', 'Ezra Polyester Blend Dog Shirt, Heart Abstract Print, Small', [
    "A light shirt is an easy way to dress a small dog up for a festival, a birthday or photos without the heat of a sweater.",
    "Ezra's dog shirt is a breathable polyester blend with a blue-and-white abstract heart print and button closures. The listing sizes it for small breeds such as Shih Tzu, Pomeranian or a young Beagle.",
    "Measure your dog's chest and neck and check them against the size chart — breed names are only a rough guide. Keep outings in it short on hot days and take it off at home. Check the buttons regularly so a chewer does not swallow one.",
  ], 'Confirm the Heart Abstract print in Small is selected — other sizes and prints are priced differently.'),
  A('B0D8KM1WM4', "Femmora Women's Solid Round Neck Half Sleeve Cotton T-Shirt", [
    "A plain, well-fitting tee is the base of most casual wardrobes, and at this price it is cheap enough to buy in two colours.",
    "Femmora's women's T-shirt is a solid round-neck, half-sleeve top in soft cotton, sold as a pack of one in a comfortable fit.",
    "Cotton tees can shrink slightly on the first wash, so check the size chart and go with your usual size rather than a tight one. Wash dark colours separately the first time. Stock is very limited at this price.",
  ], SIZE),
  A('B09P34XY7M', 'GOVO GOKIXX 400 Bluetooth Neckband with Mic, Platinum Black', [
    "A neckband is still the most practical wireless earphone for commuting: nothing to lose, and the earbuds hang round your neck when you stop to talk.",
    "GOVO's GOKIXX 400 has 10 mm drivers, magnetic earbuds, in-line controls for calls, media and the voice assistant, and a mic for calls. The listing rates it IPX5 against sweat and splashes and gives a 1-year warranty. The title claims 9 hours of playback and a bullet says up to 8 hours, so plan for about 8.",
    "IPX5 handles sweat and light rain, not a shower. Snap the magnetic earbuds together when not in use so they do not swing and catch on a bag strap.",
  ], 'Confirm the GOKIXX 400 in Platinum Black is selected.'),
  A('B0FLPXXJL2', 'Jensons Stainless Steel Dinner Set, 5 Pieces', [
    "A steel thali set outlasts every ceramic plate in the house, and it is what most homes keep for children, hostel life or extra guests.",
    "This Jensons set has five round stainless steel pieces with a glossy finish: one dinner plate, three bowls and one tumbler. The listing says it is dishwasher safe and the full set weighs about 700 g.",
    "It serves one person, so a family needs more than one set. Dry the pieces soon after washing to avoid water spots on the shiny finish, and use a soft scrubber instead of steel wool, which scratches it.",
  ], 'Confirm the 5-piece set is selected.'),
  A('B0CJ2PV25Z', 'Lakmé Lumi Skin Silver Shimmer Tint Cream, 60 g', [
    "A tinted glow cream is the quick way to look fresh without a full base: one layer instead of primer, highlighter and foundation.",
    "Lakmé's Lumi Skin tint cream in Silver Shimmer comes in a 60 g tube. The listing describes it as giving a hint of highlight and a 3D glow, and says it is made for all skin tones.",
    "Silver shimmer shows most on fair to medium skin and can look grey on deeper tones — check the swatch photos first. Apply a thin layer after moisturiser, and blot oily areas so the shimmer does not turn greasy by afternoon.",
  ], 'Confirm the Silver Shimmer, 60 g variant is selected — other shades are priced differently.'),
  A('B0HJ9TMTNM', 'Magic Eraser Cleaning Sponge, Pack of 4', [
    "Crayon on the wall, scuffs on white shoes and grime on switchboards are the stains regular sponges cannot shift. Melamine foam erasers remove them with just water.",
    "This is an unbranded pack of four melamine foam sponges. The listing says to soak, squeeze and wipe, with no detergent, and names walls, tiles, plastic chairs, doors, shoes and switchboards as surfaces.",
    "Melamine foam is a very fine abrasive, so test a hidden spot first — it can dull glossy paint, polished wood, car paint and non-stick coatings. Never use it wet on a live switchboard; switch off the power first. Each sponge wears down as you use it.",
  ], 'Confirm the Pack of 4 is selected — other pack sizes are priced differently.'),
  A('B09LCL456X', 'MAONO AU-PM360TR Condenser Microphone with Tripod Stand', [
    "A phone or laptop mic picks up the fan, the traffic and the echo of the room. A cardioid condenser mic on a desk tripod is the cheapest real upgrade for YouTube voice-overs, online classes and podcasts.",
    "MAONO's AU-PM360TR is a cardioid condenser mic with a gain knob. The box includes the mic, a tripod stand, an XLR-to-3.5 mm cable, a foam windscreen, a mounting ring, a Y adapter and a manual. The listing says it is plug and play, with no driver.",
    "It connects over 3.5 mm, so it needs a mic-in or combo jack, or a USB sound card — it is not a USB mic. Many phones need a TRRS adapter. Keep it 10–15 cm from your mouth and speak across it rather than straight into it to cut pops.",
  ], 'Confirm the AU-PM360TR with tripod is selected.'),
  A('B09B72DN1R', 'Murphy STRIMAX 3W Surface LED Downlight, Warm White, Pack of 2', [
    "Surface-mounted downlights need no false-ceiling cut-out, so they are an easy way to light a kitchen shelf, a wardrobe or a passage.",
    "Murphy's STRIMAX is a slim round 3W LED about 70 mm across and only 15 mm tall. This pack of two is in warm white, and the listing gives a 2-year warranty.",
    "3W is accent and cabinet lighting, not the main light for a room. Wiring into mains should be done by an electrician with the power off. Warm white suits bedrooms and living rooms; choose cool white for a kitchen work area.",
  ], 'Confirm the Warm White, Pack of 2 option is selected — other colours are priced differently.'),
  A('B0D5YHLLKQ', 'Philips WiZ 15W Square Wi-Fi Smart LED Ceiling Light, Tunable White, Pack of 2', [
    "Smart ceiling lights let you dim the room from the sofa, set warm light for the evening and turn everything off from your phone after you have already left.",
    "This is a pack of two Philips WiZ Prime Neo 15W square ceiling lights with tunable white. They need a 6-inch cut-out and work with Alexa and Google Assistant. The listing also mentions music sync and a SpaceSense motion feature.",
    "These are recessed lights, so you need a false ceiling with a 6-inch opening — measure before ordering. They connect over 2.4 GHz Wi-Fi only, not 5 GHz. Stock is very limited at this price.",
  ], 'Confirm the 15W Square, Pack of 2 option is selected — the 10W and round versions are priced differently.'),
  A('B073ZFN66Z', "PINACOLADA Women's Solid Sweatshirt", [
    "Winter layers sell out fast once the cold sets in, and buying before the season is when prices are lowest.",
    "PINACOLADA's women's sweatshirt is a solid-colour pullover, sold by Cocoblu Retail on Amazon.",
    "Check the size chart for chest and length, as sweatshirt fits vary. Wash in cold water and dry flat so the fleece does not pill. Colour and size availability varies at this price.",
  ], SIZE),
  A('B0F63QRJW4', 'Popsugar Off Roader Rechargeable RC Monster Truck, Blue', [
    "A rechargeable RC car saves a fortune in AA cells, and a monster truck can handle a park, a terrace or a rough driveway.",
    "Popsugar's Off Roader is a made-in-India RC monster truck with a 2.4 GHz remote. The listing says it has a range of over 125 feet, a built-in 3.7V 1200 mAh lithium battery with USB-C charging, about 75 minutes of play per charge, drift steering and four headlight modes.",
    "Charge it only while someone is watching, with the included cable, and unplug it once it is full. Keep it out of water and wet grass. For children under 8, an adult should do the charging.",
  ], 'Confirm the Blue Off Roader is selected.'),
  A('B07SBW3HRH', "Puma Women's Cilia Mode Lux Sneakers", [
    "Puma sneakers rarely drop to about 70% off on Amazon itself, and the Cilia is one of its everyday women's lifestyle models.",
    "These are Puma's Cilia Mode Lux women's shoes, sold by Cocoblu Retail with Amazon fulfilment.",
    "Puma uses UK sizes on Amazon India; check the size chart and your usual Puma size, since the fit runs snug. Only the listed colour is at this price. Amazon's standard returns window lets you swap a size if the pair does not fit.",
  ], SIZE),
  A('B0CG4GLR3R', 'Super Dotted Passion Fruit Flavoured Lubricated Condoms, 12 x 3 (36 Pieces)', [
    "Condoms bought in bulk online cost far less per piece than a single box at a chemist, and delivery is discreet.",
    "This pack has three boxes of 12 Super Dotted condoms, 36 in all, with passion fruit flavour. The listing describes them as latex, lubricated, parallel-sided and teat-ended.",
    "They are latex, so they are not suitable for anyone with a latex allergy. Use only water- or silicone-based lubricant, never oil, which weakens latex. Check the expiry date on arrival and store them away from heat.",
  ], 'Confirm the 12 x 3 pack is selected.'),
  A('B0GK1MTW98', 'truke Bass S2 Wired Sleeping Earphones with Type-C Plug, Black', [
    "Normal earbuds press into your ear when you sleep on your side. Sleep earphones sit flush in the ear, so you can fall asleep to white noise or a podcast while a partner snores.",
    "truke's Bass S2 are wired earphones with a low-profile soft silicone design, 13 mm drivers and a TPE cable. They use a USB-C plug, not 3.5 mm.",
    "The USB-C plug works with most modern Android phones, but not with iPhones that have a Lightning port or with 3.5 mm-only devices. Keep the volume low when sleeping, and clean the silicone tips every few days.",
  ], 'Confirm the Bass S2 in Black is selected.'),
  A('B0GX2BTNHJ', 'Uniboom 32-Inch HD Smart QLED Android TV (UB32S-E-QCLB)', [
    "A 32-inch smart TV is the standard size for a bedroom, a kid's room or a rented flat. A QLED panel under ₹10,000 is uncommon in this size.",
    "Uniboom's UB32S-E-QCLB is a 32-inch HD Ready (1366 x 768), 60 Hz Android smart TV with a QLED panel. The listing gives 30W speakers, 2 HDMI ports, 1 USB port, Wi-Fi, screen casting and voice command, plus a 1-year warranty.",
    "HD Ready is 720p, not Full HD — fine at bedroom distance, softer on a big wall. Uniboom is a small brand, so check the listing for how installation and warranty service work in your city before buying.",
  ], 'Confirm the 32-inch UB32S-E-QCLB is selected.'),
  A('B0H9XK5MZP', 'UNICRON 24-Inch HD Ready Frameless Android Smart LED TV', [
    "A 24-inch smart TV works as a kitchen screen, a guest room TV or a second monitor, and costs a fraction of a big set.",
    "UNICRON's 24-inch set is HD Ready (1366 x 768), Android based with built-in Wi-Fi, screen mirroring, HDMI and USB ports, and a frameless black design. The listing says YouTube, Prime Video and Netflix are supported, but app availability may vary.",
    "App support on small Android TV brands is not guaranteed — check the listing and recent reviews for Netflix support if that matters. UNICRON is a small brand, so check how service works in your city.",
  ], 'Confirm the 24-inch frameless model is selected — the TE variant is a different listing.'),
  A('B0H756VHYQ', 'UNICRON TE 24-Inch HD Ready Android Smart LED TV with 30W Sound', [
    "Compact smart TVs have become cheap enough to put in every small room. This TE model pairs a 24-inch screen with bigger speakers than most sets its size.",
    "The UNICRON TE is a 24-inch HD Ready Android smart TV with Wi-Fi, mobile screencast and 30W speakers. The listing mentions a quad-core processor, Bluetooth, and wall-mount support.",
    "HD Ready means 720p. Confirm whether a wall mount is in the box or sold separately. As with any small TV brand, read the warranty terms on the page before buying.",
  ], 'Confirm the TE 24-inch model is selected — the non-TE 24-inch is a different listing.'),
  A('B0F2MK2C8R', 'Go24 Pexpo Stainless Steel Fridge Water Bottle, 750 ml', [
    "Steel fridge bottles replace the old plastic ones that crack and smell after a summer. They also chill faster than plastic or glass.",
    "Go24's Pexpo is a single-wall 750 ml stainless steel bottle with a leakproof lid and sipper spout. The listing says it is ISI certified, BPA-free and scratch resistant, with an anti-slip base, a 24-day free lid replacement and a 12-month warranty.",
    "This is a fridge bottle, not a vacuum flask — it will not keep water cold for long outside the fridge. Do not freeze it full. Wash the lid seal separately to keep it from smelling.",
  ], 'Confirm the 750 ml size is selected.'),
  {
    store: 'Flipkart', productId: 'PERHGNUPEMJBANYA', name: 'OSCAR Forever Aqua Sports & Oud Intense Perfume Combo, 2 x 100 ml',
    price: 284, mrp: 2298, exp: 284, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/1/9/f/-original-imahkyy89jp8mgdf.jpeg?q=70',
    affiliateUrl: FK('oscar/p/itm74fc4cc198349', 'PERHGNUPEMJBANYA'),
    description: [
      "Two perfumes for less than ₹300 is about ₹142 a bottle — a cheap way to keep one fresh scent for the gym and one deeper scent for the evening.",
      "OSCAR's combo has two 100 ml bottles, 200 ml in total: Forever Aqua Sports, a fresh aquatic scent, and Oud Intense, a heavier woody oud.",
      "Budget perfumes fade faster than premium ones, so reapply after a few hours. Spray on pulse points like wrists and neck, not on clothes, which can stain. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm the Forever Aqua Sports & Oud Intense 2-bottle combo is selected.',
  },
  {
    store: 'Myntra', productId: '26695020', name: 'Duke Men Textured Slip-On Walking Shoes',
    price: 599, mrp: 2995, exp: 599, av: 'InStock (sizes 8 and 10 when checked)',
    image: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/26695020/2023/12/28/8fefab19-c4b9-49a4-9e5b-5df7e49b429e1703712176616SportsShoes1.jpg',
    affiliateUrl: MY('https://www.myntra.com/sports-shoes/duke/duke-men-textured-slip-on-walking-shoes/26695020/buy'),
    stock: 'in stock in UK 8 and 10 when checked',
    description: [
      "Slip-on walking shoes are what most people end up wearing for morning walks, market runs and travel. There are no laces to tie, and they come off easily at a temple or a relative's door.",
      "Duke's men's slip-on has a textured synthetic upper and a rubber sole with a regular ankle height. Myntra lists it as a walking shoe for outdoor surfaces with medium arch support.",
      "When checked, only UK 8 and 10 were in stock at this price, and sizes 6, 7 and 9 were sold out. Slip-ons cannot be tightened, so if you are between sizes pick the smaller one. Myntra allows size exchanges on most footwear within its return window.",
    ],
    variant: 'Select your size — only some sizes were in stock at this price when checked.',
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
  const imgOk = {
    Flipkart: /^https:\/\/rukmini\d\.flixcart\.com\/image\/1500\/1500\//,
    Myntra: /^https:\/\/assets\.myntassets\.com\/h_1440,q_90,w_1080\//,
    Amazon: /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/,
  }[d.store].test(row.image);
  if (!imgOk) throw new Error(`bad image ${d.productId} ${row.image}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate ASIN');

const file = process.argv[2] ?? 'ifs-0925bj-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
