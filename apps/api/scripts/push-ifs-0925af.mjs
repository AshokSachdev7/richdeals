// DEAL-INGEST indiafreestuff tick 2026-09-25af
//
// /deals + /deals/superdeals -> 83 slugs -> 32 new -> 1 seasonal (rakhi hamper) dropped -> 31 resolved (all Amazon).
// Rejected: 12 DB dups (productId already live).
// Amazon verified in the logged-in tab: #corePriceDisplay + #centerCol M.R.P. + #availability + hiRes image + buy box.
// Guess GW0964G3: IFS showed ₹6,009 (Axis CC EMI offer); pushed PDP price ₹6,675.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const INR = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const CLIP = 'If a clip coupon shows under the price on the product page, tick it before checkout — it comes off at payment, on top of the price listed here.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const A = (productId, name, price, mrp, img, description, variant, extra = {}) =>
  ({ store: 'Amazon', productId, name, price, mrp, image: IMG(img), description, variant, ...extra });

const DEALS = [
  A('B0FM4479FD', 'Amazon Basics SoftBristle Sensitive Toothbrush, 12-Count (4 x 3 Packs), Ultra-Soft', 165, 480, '71Xf9ehOS3L._SL1500_.jpg', [
    "Dentists usually suggest a new toothbrush every three months, or sooner once the bristles splay. For a family of four that is sixteen brushes a year, so buying a 12-count bulk pack brings the per-brush cost right down and means there is always a fresh one in the drawer when an old one wears out or falls on the floor.",
    "This Amazon Basics pack has 12 toothbrushes in three packs of four, in mixed colours so each family member can tell theirs apart. The bristles are ultra-soft and the listing aims them at sensitive teeth and gums. Soft bristles clean well enough with proper technique and are less likely to wear down enamel or push back the gum line than medium or hard ones.",
    "Brush for two minutes twice a day with gentle circular strokes rather than hard scrubbing — pressure does more harm than good, whatever the bristle type. Rinse the brush after use and store it upright so it dries in open air. Replace any brush sooner after a cold or fever. At around ₹14 a brush, there is no reason to keep one past its best.",
  ], 'Confirm the 12-Count (4 x 3 Packs) option is selected — smaller packs on the same page are priced differently.'),
  A('B0929NC283', 'Amazon Brand Solimo Stainless Steel Water Bottle, Set of 3, 1 Litre Each', 519, 1199, '81XL+WWpgwS._SL1500_.jpg', [
    "Steel water bottles have replaced plastic in most Indian homes for good reasons: they do not hold smells or stains, they do not crack when dropped, and they last for years instead of months. A set of three covers school bags, the office bag and the fridge in one purchase.",
    "This Solimo set from Amazon's own brand has three stainless steel bottles of 1 litre each — a practical size that lasts a school or work day without a refill. At about ₹173 a bottle, the set costs less than many single branded steel bottles on the same shelf. Being single-wall steel, they keep water at room temperature rather than holding it hot or cold for hours.",
    "Wash each bottle with warm soapy water and a bottle brush before first use, and let it dry with the cap off so no moisture is trapped inside. Avoid putting hot tea or milk in a bottle meant for water, as the smell can linger in the cap seal. Remove and clean the cap seal once a week, since that is where residue collects.",
  ], 'Confirm the Set of 3, 1 litre option is selected — other set sizes on the same page are priced differently.'),
  A('B0GXZ5WFKZ', 'American Tourister Mystic 83 cm Large Check-in Soft Luggage Trolley, 4 Wheels, Dutch Blue', 3299, 11000, '51nXkaSoC4L._SL1080_.jpg', [
    "An 83 cm trolley is the large check-in size — the bag you take on a two-week family holiday or when a student moves to a hostel. Soft polyester luggage at this size weighs less than most hard shells, which leaves more of your airline weight allowance for what is inside.",
    "This American Tourister Mystic is a soft-shell polyester suitcase with one main compartment, an expandable zip that adds room on the way back, four 360-degree spinner wheels and a mounted combination lock (non-TSA). The listing also mentions a flexi-plus telescopic handle and a 3-year warranty. American Tourister is Samsonite's value brand, so after-sales service is available in most cities.",
    "Weigh the bag at home before leaving — a large check-in fills up fast and most domestic economy fares allow 15 kg. Set the lock combination before the first trip and note it somewhere safe. Pack heavy things at the wheel end so the bag stays upright, and use the expander only when needed, as a fully expanded bag puts more strain on the zip.",
  ], 'Confirm the 83 cm Large Check-in size in Dutch Blue is selected — cabin and medium sizes on the same page are priced differently.'),
  A('B0DKJLLXZ9', 'Archer Tech Lab Tri-Mode Wireless Gaming Mouse, BT 5.3 + 2.4GHz + Wired, 7 RGB Lights, Rechargeable', 519, 2999, '61ilZxsYqpL._SL1500_.jpg', [
    "A tri-mode mouse connects three ways: Bluetooth for a laptop or tablet with no free USB port, a 2.4GHz USB receiver for lower lag while gaming, and a wired cable when the battery is flat. That flexibility means one mouse can move between a work laptop and a home PC without re-pairing every day.",
    "This Archer Tech Lab mouse supports Bluetooth 5.3, 2.4GHz wireless through a USB receiver, and wired use. It has a 500mAh rechargeable battery charged over USB-C, four DPI levels from 1200 to 3200, and seven-colour RGB breathing lights. At this price it is a budget pick for casual gaming and office work rather than competitive esports.",
    "Use the 2.4GHz receiver for games, since it usually has less input lag than Bluetooth. Turn the RGB lighting off when you do not need it — it is the biggest drain on the battery. Start at a middle DPI level and adjust from there; higher DPI moves the cursor faster but is harder to control for precise work like photo editing.",
  ], 'Confirm the listed colour option is selected — other colours on the same page can be priced differently.'),
  A('B0C8YW686H', 'Aristocrat Oasis Plus Large 79 cm Soft Check-in Spinner Luggage, Dazzling Red', 2209, 11000, '61WkWtxn5gL._SL1500_.jpg', [
    "A 79 cm soft check-in bag sits between medium and extra-large: big enough for ten days of clothes, but still light enough that most people can lift it onto a luggage belt without help. Soft polyester also squeezes into tight car boots and train berths better than a rigid shell.",
    "This Aristocrat Oasis Plus is a large soft-shell spinner in dazzling red, with four wheels and a combination lock. The listing describes it as unisex with a 5-year warranty. Aristocrat is VIP Industries' value luggage brand, so it comes with VIP's service network. A bright red bag is also quick to spot on an airport belt full of black suitcases.",
    "The product page shows a 15% clip coupon at check time. Tick it before checkout to pay less than the listed price. Weigh the bag after packing, as a 79 cm case can pass 20 kg quickly. Store it with the lock set and the handle fully retracted, and keep the zip clean of sand or dust after beach trips.",
  ], 'Confirm the Large 79 cm size in Dazzling Red is selected — other sizes and colours on the same page are priced differently.', { coupon: true }),
  A('B0CYLCJ69Y', 'Crompton 8.5W Emergency LED Bulb, Up to 4 Hours Backup, Cool Day Light, Pack of 20, B22', 3191, 12980, '91L44Fyw+fL._SL1500_.jpg', [
    "An emergency LED bulb looks like a normal bulb and fits a normal B22 holder, but it has a small battery inside. When the power cuts out, it keeps glowing on its own, so you are not searching for a torch in the dark. In areas with frequent or long power cuts, a few of these around the house can replace a small inverter for lighting.",
    "This is a pack of 20 Crompton 8.5W emergency bulbs in cool day light (6500K). The listing says they give up to 4 hours of backup light from a lithium-ion battery, with overcharge, deep-discharge and short-circuit protection managed by a BMS (battery management system). At about ₹160 a bulb, this bulk pack suits a whole house, a shop, or a society buying for common areas.",
    "The bulb charges only while the wall switch is on and mains power is flowing, so keep the switch on in the rooms where you want backup. The first few cycles may give less than full runtime. Actual backup depends on battery age and how fully it was charged, so plan for less than 4 hours as the bulbs get older.",
  ], 'Confirm the Pack of 20 option is selected — smaller packs on the same page are priced differently.'),
  A('B0CVV4NNW1', 'Eveready 20W Ultraslim LED Batten Tubelight for Home and Office, Pack of 4', 399, 956, '71yBuZyVfDL._SL1500_.jpg', [
    "A 20W LED batten replaces the old 40W tube light and choke in most Indian rooms, giving similar brightness at about half the power and with no flicker or humming. The ultraslim body sits flat against the wall or ceiling, so it looks cleaner than the old bulky fittings.",
    "This is a pack of four Eveready 20W ultraslim LED battens, meant for homes and offices. Four battens cover a bedroom, living room, kitchen and passage in one go. At about ₹100 a batten, the pack costs less than many single branded battens bought at a local electrical shop. Eveready is a long-running Indian lighting and battery brand.",
    "Switch off the mains at the board before replacing an old tube light. Remove the old choke and starter, as an LED batten wires straight to the supply. Mount it on a dry surface away from the bathroom shower spray. An electrician can fit all four in well under an hour if you are not comfortable doing the wiring yourself.",
  ], 'Confirm the Pack of 4 option is selected — single battens and other packs on the same page are priced differently.'),
  A('B0D6RJXG5T', 'Goldmedal LIGO 9W LED Round Downlight with 3-inch Concealed Junction Box, Cool Daylight, Pack of 10', 1357, 3100, '616EOJKC-0L._SL1200_.jpg', [
    "Recessed downlights sit flush in a false ceiling and give even light without the glare of a hanging bulb. For low-ceiling rooms, small round downlights spread light evenly without the room feeling cramped, which is why they are common in modern Indian flats.",
    "This Goldmedal LIGO pack has ten 9W round LED downlights in cool daylight (6500K). They are built for a 3-inch concealed junction box (3-inch cut-out) and are rated at 80 lumens per watt, so each light gives about 720 lumens. At about ₹136 per light, ten are enough for a living room plus a bedroom false ceiling. The listing specifies indoor use.",
    "Check that your ceiling already has 3-inch cut-outs or 3-inch junction boxes before ordering, because a light that does not match the hole will not sit properly. Switch off the mains before fitting. Cool daylight suits kitchens, study areas and offices; if you want a softer look for a bedroom, a warm white version is a better match.",
  ], 'Confirm the Pack of 10, Cool Daylight option is selected — other packs and colour temperatures on the same page are priced differently.'),
  A('B0CGRBBZ4K', 'Goldmedal Thor 30W B22 LED Bulb, 230-Degree Coverage, 4KV Surge Protection, Cool Daylight, Pack of 2', 439, 1200, '51yJysTomSL._SL1200_.jpg', [
    "A 30W LED bulb is much brighter than the usual 9W or 12W bulbs found in homes. It suits a large hall, a garage, a shop counter or a staircase where one fitting has to light a big area. It uses a normal B22 holder, so no new wiring is needed.",
    "This Goldmedal Thor pack has two 30W B22 LED bulbs in cool daylight (6500K). The listing mentions 230-degree light coverage, surge protection up to 4KV for areas with unstable voltage, and a rated life of 15,000 hours. At about ₹220 a bulb, the pair costs less than many single high-wattage bulbs bought at a local shop.",
    "A 30W bulb is heavier than a small one, so make sure the holder is firmly fixed and not cracked. Use it in open fittings rather than closed glass covers, where heat builds up and shortens LED life. For a bedroom or reading corner, a lower wattage is more comfortable — this bulb is meant for places that need a lot of light.",
  ], 'Confirm the 30W, Pack of 2 option is selected — other wattages and packs on the same page are priced differently.'),
  A('B0FJ23726W', 'Guess Round 44mm Black Dial Analog Men Watch GW0964G3', 6675, 18995, '71TXMhLcNSL._SL1500_.jpg', [
    "Guess watches are known for bold, fashion-led designs — large cases, strong dials and polished finishes that stand out on the wrist. A 44mm round case is on the larger side, suited to men who like a watch that makes a statement rather than one that sits quietly under a cuff.",
    "This Guess GW0964G3 has a 44mm round case and a black dial with analog hands. The listing is sold on Amazon at ₹6,675 against an M.R.P. of ₹18,995. Some card EMI offers on the page can bring the effective price lower; the figure shown here is the price before any bank offer.",
    "Check your wrist size against a 44mm case before buying — on slim wrists, a case this size can overhang. Keep the watch away from strong magnets and remove it before swimming unless the listing clearly states the water resistance you need. Store it in its box when not in use to protect the dial glass from scratches.",
  ], 'Confirm the GW0964G3 model is selected — other Guess watches on the same page are priced differently.'),
  A('B07WJ65YLL', 'Halonix 20W LED Batten Tubelight, 4 ft, Cool Day Light, Pack of 6', 699, 2094, '61tdV-hs05L._SL1500_.jpg', [
    "A 4 ft 20W LED batten is the standard modern replacement for the old fluorescent tube light. It gives similar brightness at about half the power, turns on instantly with no flicker, and needs no choke or starter. A pack of six can relight most of a flat in one go.",
    "This is a pack of six Halonix 20W LED battens, each 4 ft long, in cool day light — suited to living rooms, bedrooms, kitchens and offices. At about ₹117 a batten, it is one of the cheaper ways to switch a whole home over to LED. Halonix is an Indian lighting brand with a wide dealer network.",
    "The product page showed only 1 left in stock at check time, so this pack may sell out quickly. Switch off the mains before removing an old tube light and its choke. Fit battens on a dry surface, away from direct water spray. If more than one person will use the same switchboard, label the switches after fitting to avoid confusion later.",
  ], 'Confirm the Pack of 6 option is selected — smaller packs on the same page are priced differently.', { stock: 'only 1 left in stock at check time' }),
  A('B0DSWD5QH9', 'Livguard Inverter Battery Trolley with Covered Box, Fits Jumbo, Flat Plate or Tall Tubular Battery', 1299, 2999, '51ZX7LLeIeL._SL1500_.jpg', [
    "An inverter battery weighs 50 to 70 kg, so moving it for cleaning or when shifting house is hard work. A trolley with wheels lets one person roll it out, sweep behind it and roll it back. A covered box also keeps dust, water splashes and curious children away from the terminals.",
    "This Livguard trolley has a covered box and supports a single jumbo, flat-plate or tall tubular inverter battery. The listing describes it as a heavy-duty, easy-move stand for both the inverter and battery, and it is in black and red. Livguard makes inverters and batteries itself, so the trolley is designed around standard Indian battery sizes.",
    "Measure your battery's length, width and height before ordering and compare them with the dimensions on the product page. Switch off the inverter and disconnect the terminals before lifting the battery into the trolley — or ask your battery service person to do it during a routine top-up visit. Keep the vents clear, since batteries release gas while charging.",
  ], 'Confirm the listed model is selected — other sizes on the same page may be priced differently.'),
  A('B0H42FRRX7', 'Meridian Set of 3 Trolley Bags, Cabin + Medium + Large, Polypropylene Hard Suitcase, 8 Spinner Wheels', 3999, 37997, '61xAP5hMxKL._SL1080_.jpg', [
    "A three-piece luggage set covers every trip in one buy: the cabin bag for a weekend away, the medium for a week at a wedding, and the large for a long family holiday. Because the three nest inside each other, they take up the space of a single suitcase when stored.",
    "This Meridian set has a cabin, medium and large hard suitcase made of polypropylene, each with eight spinner wheels and a recessed number lock. The listing also mentions a 2-pocket Convipack design for quick access, and the colours are twilight sea blue and galaxy blue. At about ₹1,333 a bag, it costs less than a single hard-shell suitcase from many bigger brands.",
    "The product page shows a 5% clip coupon at check time. Tick it before checkout to pay less than the listed price. The ₹37,997 M.R.P. is the seller's own figure; judge value by the ₹3,999 price. Check the cabin bag against your airline's carry-on limit, as sizes differ between carriers, and set each lock's combination before the first trip.",
  ], 'Confirm the Set of 3 in the listed colour combination is selected — other sets and colours on the same page are priced differently.', { coupon: true }),
  A('B091LBRG28', 'Murphy Flora 7W LED Down Light, Round Recessed, Cool White, 3-inch Junction Box, Pack of 2', 232, 590, '71jxm3olQdL._SL1500_.jpg', [
    "Small recessed downlights are the easiest way to light a false ceiling in a passage, wardrobe area, bathroom vanity or pooja corner. A 7W light is enough for these small spaces without making them too bright or harsh.",
    "This Murphy Flora pack has two 7W round LED downlights in cool white, sized for a 3-inch junction box. The listing includes a 2-year warranty. At about ₹116 a light, it is a cheap way to replace old CFL downlights or fill empty cut-outs left after a false-ceiling job.",
    "The product page shows a 2% clip coupon at check time. Tick it before checkout for a small extra saving. Check that your ceiling has 3-inch cut-outs first, because a light that does not match the hole will not sit flush. Switch off the mains before fitting, and keep the warranty details with the invoice in case a light fails early. LED downlights also run far cooler than old CFL or halogen fittings.",
  ], 'Confirm the 7W, Pack of 2, Cool White option is selected — other packs on the same page are priced differently.', { coupon: true }),
  A('B0F373ZHTB', 'Panasonic 20W LED Bulkhead, IP54 Outdoor Waterproof, Cool White, Pack of 4', 1614, 4800, '61a74mMvxDL._SL1500_.jpg', [
    "A bulkhead light is a sealed, sturdy fitting made for places that face weather or rough handling: balconies, garden walls, parking areas, building entrances and staircases. The enclosed design keeps rain and insects out, which is why it lasts much longer outdoors than a normal bulb holder.",
    "This is a pack of four Panasonic 20W LED bulkhead lights in cool white (6500K). They carry an IP54 rating, meaning protection against dust and water splashes from any direction — fine for covered outdoor areas and walls exposed to rain. At about ₹404 a light, the pack suits a whole building or a large garden.",
    "IP54 handles splashing rain but not jets of water or submersion, so do not fit these where water pools or a hose is used. Seal the cable entry properly during installation. Switch off the mains first, and consider a timer or photocell switch for outdoor lights so they are not left on all day.",
  ], 'Confirm the 20W, Pack of 4 option is selected — other packs on the same page are priced differently.'),
  A('B0D8LH326T', 'RR Signature Zello 25L Star Rated Storage Water Heater, Glass Line Tank, 8 Bar, for High-Rise', 5599, 13500, '51Mv13QEkWL._SL1500_.jpg', [
    "A 25 litre storage geyser suits one bathroom used by two or three people. It heats a tank of water and keeps it hot, so you can run two buckets back to back — unlike an instant geyser, which only heats a small flow at a time.",
    "This RR Signature Zello is a 25L star-rated storage water heater with a glass-lined tank, which resists corrosion from hard water better than plain steel. It is rated for 8 bar pressure, so the listing says it is suitable for high-rise buildings where water pressure is higher. It has a thermal cutout and safety valve, with 2 years of warranty on the product and 6 years on the tank.",
    "Have a qualified electrician install it on a dedicated socket with proper earthing. Keep the thermostat at a moderate setting — hotter settings waste power and scale up the tank faster in hard-water areas. Drain and flush the tank once a year, and check the safety valve is not blocked, especially in older buildings.",
  ], 'Confirm the 25L model is selected — other capacities on the same page are priced differently.'),
  A('B0DHZ7QDSG', 'UN1QUE Cordless 2-in-1 Car and Home Vacuum Cleaner, 8000Pa Suction, 650ml Dustbin, Blue', 1799, 4499, '71+sWxtD7XL._SL1500_.jpg', [
    "A handheld cordless vacuum is the easy tool for quick jobs: crumbs on a car seat, dust on a sofa, hair on a bathroom floor. With no cable, it reaches the car without an extension cord and can be grabbed for a two-minute clean without setting up a full-size vacuum.",
    "This UN1QUE vacuum is rechargeable over USB, with 8000Pa suction according to the listing. It has a 650ml dustbin, which is large for a handheld and means fewer trips to empty it. There is a steel mesh filter in front of the HEPA filter to catch larger debris first, and four nozzles for crevices, upholstery and floors.",
    "Empty the dustbin after each use and tap the steel mesh filter clean — a clogged filter is the main reason suction drops. Wash the HEPA filter only if the manual says it is washable, and let it dry fully before refitting. Charge it after use so it is ready next time, and do not use it to pick up water or wet spills.",
  ], 'Confirm the Blue option is selected — other colours on the same page may be priced differently.'),
  A('B0CH34WWFR', 'Wonderchef Taurus Hard Anodized Outer Lid Pressure Cooker, 3 Litre, Induction Friendly, ISI Certified', 1190, 3500, '51-HhKCgEJL._SL1000_.jpg', [
    "A 3 litre pressure cooker is the everyday size for a family of two to four: enough for dal, rice or a small batch of curry in one go. Hard-anodized cookers heat evenly, do not react with sour food like tamarind or tomato, and do not blacken the way plain aluminium does.",
    "This Wonderchef Taurus is a 3 litre hard-anodized cooker with an outer lid, cool-touch handles and an induction-friendly base, so it works on gas and induction stoves. It is ISI certified, which is mandatory for pressure cookers sold in India, and the listing includes a 5-year warranty.",
    "Never fill a pressure cooker more than two-thirds full, or half full for dal and rice that froth. Check the gasket and safety valve regularly and replace the gasket when it hardens or cracks. Wash by hand with a soft scrubber — dishwashers and steel wool damage the hard-anodized surface over time.",
  ], 'Confirm the 3 litre option is selected — other capacities on the same page are priced differently.'),
  A('B09M6HZMSR', 'Yogabar Muesli Fruits and Nuts, 93% Wholegrain, Gluten Free, 700g Pack of 2', 419, 798, '816Og7yQIML._SL1500_.jpg', [
    "Muesli is a ready breakfast of rolled oats and other grains mixed with dried fruits, nuts and seeds. It needs no cooking — pour milk or curd over it and it is ready. That makes it a quick option on busy weekday mornings when there is no time to make poha or upma.",
    "This Yogabar Fruits and Nuts muesli is a pack of two 700g packs. The listing says it is 93% whole grains with dried fruits, nuts and seeds, including chia and flax seeds, and that it is gluten free and high in omega-3. It is baked for crunch. Check the pack for the full ingredient list and nutrition label, especially if you watch your sugar intake.",
    "Store it in an airtight container once the pack is open, because muesli turns soft and stale in humid weather. Eat it cold with milk or curd, or warm it for a porridge-like breakfast. Add fresh fruit like banana or apple for extra fibre. Check the best-before date when the pack arrives.",
  ], 'Confirm the 700g (Pack of 2) option is selected — single packs on the same page are priced differently.'),
];
// ------------------------------------------------------------------- derive + gate
const HOSTS = {
  Amazon: /^https:\/\/m\.media-amazon\.com\//,
  Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\//,
  Myntra: /^https:\/\/assets\.myntassets\.com\//,
};
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? CLIP : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) console.log(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0925af-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
