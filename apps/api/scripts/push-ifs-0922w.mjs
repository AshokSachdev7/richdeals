// DEAL-INGEST indiafreestuff tick 2026-09-22w.
// 2 listing pages (deals + superdeals, >=2.5s apart) -> 61 slugs -> 23 product candidates
// -> 23/23 ?rto= base64 ids resolved to real store URLs -> dedup vs live DB (21 FRESH, 1 HIT)
// -> price-verified per store -> 17 rows here (16 NEW + 1 UPD), 3 stores.
//
// PRICE TRUTH PER STORE (their card prices lie ~68% of the time — two more this tick):
//   Amazon    : same-origin fetch + DOMParser in the logged-in tab, FULL #centerCol innerText.
//   Flipkart  : ld+json offers.price. Their card said Rs106 for the soap -> real Rs97.
//   Myntra    : ld+json (PRETTY-PRINTED, so single-line grep finds nothing — parsed in node).
//
// FLIPKART URL SHAPE, resolved this tick. The published shape needs /p/itm..., and the itm
// hash is NOT recoverable: /p/itm?pid=<PID> on a bare path 404s, /search?q=<PID> returns zero
// pid-matching hrefs, and the IFS deeplink (params stripped) renders the right product but its
// link[rel=canonical] is the cosmetic fetched path, not /p/itm<hash>. What DOES work, verified
// on all 3 pids at HTTP 200 with matching ld name + price: any name slug + /p/itm?pid= or
// /p/itme?pid=. 22 live rows already carry the /p/itme? form, so that is what ships.
//
// REJECTED, on evidence:
//   B0H6F67WKV Classmate Pulse notebook  - no MRP, no badge, zero discount.
//   B0D5WD73X8 Herbal Handmade Soaps     - unbuyable PDP (no price window, cart:false, buy:false).
//   B09B3ZP8KL OREVA wall clock          - same unbuyable signature.
//   B0FZKFCFYB STRIDERS BTS gift box     - in stock at -76%, but the title sells a BTS/Hello
//                                          Kitty gift set while every bullet describes a kids'
//                                          lunch box. Incoherent listing, not publishable.
//   ACCHDYD8S39BSRDC boAt Stone Arc Pro  - card Rs2499, real Rs4199. Rs1,700 drift.
//   riya-cotton-kurti (Snapdeal)         - ?rto= lands on an admitad-wrapped brand listing.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (storeName, confirm) => [
  `Tap Grab Deal to open the product on ${storeName} at the live price.`,
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const kebab = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const slugFor = (name, productId) =>
  `${kebab(name).slice(0, 80).replace(/-+$/, '')}-${productId.toLowerCase()}`;

// Indexed before slugs carried the full productId. Reusing the DB slug instead of minting a
// new one keeps the live URL, so the endsWith(productId) assert has to let it through.
const LEGACY_SLUGS = new Set(['wipro-northwest-nowa-6a-bell-push-white-pack-of-10-b0bnnk']);

const CUELINKS = (url) =>
  `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(url)}`;

const deals = [
  // ---------------------------------------------------------------- Amazon (12)
  {
    store: 'amazon',
    productId: 'B0G1BX23BV',
    name: 'Ajanta 4067 Silent Sweep Non-Ticking Wall Clock, 12.2 Inch, Brown',
    price: 720,
    mrp: 1290,
    image: 'https://m.media-amazon.com/images/I/71Mnq5jlvIL._SX679_.jpg',
    confirm:
      'Measure the wall space before ordering — 12.2 inches is 310 mm across, which reads much larger on a small wall than the product photo suggests.',
    description:
      'The spec that matters on a wall clock is not the dial, it is the movement, and this one is a silent sweep — the second hand glides continuously instead of stepping once a second, so there is no tick. That is the difference between a clock you can hang in a bedroom or a study and one you end up moving to a hallway after the first quiet night. Ajanta quotes accuracy at about twenty seconds a month, which is ordinary quartz behaviour and means you will nudge it forward or back roughly twice a year rather than reset it weekly. The dial is 12.2 inches, or 310 mm, which is the standard drawing-room size in India: large enough to read across a room from a sofa, small enough not to dominate a single wall. Frame is brown, plain enough to sit against either a painted wall or wood panelling without fighting the room. Nothing here is unusual — it is a plain, honestly specified round wall clock — and that is the point at ₹720 against a ₹1,290 list price, because most of what sells under a thousand rupees uses a stepping movement that clicks all night. In stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0C7SVNF9H',
    name: 'AW! Car Cup Holder Expander with Adjustable Base',
    price: 565,
    mrp: 1499,
    image: 'https://m.media-amazon.com/images/I/61ew68puBiL._SX679_.jpg',
    confirm:
      'Check the diameter of your own cup holder against the listing dimensions first — the base is adjustable, but it still has to drop into the factory holder in your car, and older hatchbacks use narrower wells than the ones this is sized for.',
    description:
      'A car cup holder expander solves one specific annoyance: the factory holder in most Indian cars was designed around a 250 ml can, and a one-litre bottle, a large tumbler or a takeaway coffee cup either will not go in or sits in it loose and rattles. This one drops into the existing holder and widens the opening, with an adjustable base so the same unit fits different well diameters rather than only one car. The adjustable base is the part worth paying for — fixed-base expanders are a gamble, because cup holder wells vary between models from the same manufacturer, let alone between brands, and a fixed base that is even a few millimetres out either will not seat or wobbles every time the car turns. Once seated it holds the larger container upright and stops it tipping into the gear console, which is the actual failure this fixes. It is a small plastic accessory doing a small job, so the honest way to judge it is by whether it fits your car and how much you are paying: ₹565 against a ₹1,499 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0DQ46HMK6',
    name: 'Crompton LED Downlighter Trio Panel with Indirect Lighting Mode, Pack of 2',
    price: 1292,
    mrp: 2800,
    image: 'https://m.media-amazon.com/images/I/31TfCcqrxrL._SX679_.jpg',
    confirm:
      'This is the pack of 2 — the specification block on the listing describes a single panel, so treat every figure there as per-panel, not for the set.',
    description:
      'A trio panel is a downlighter with three switchable modes rather than one fixed output, and Crompton splits them by room use: a bright work mode, a dimmer theatre mode, and a party mode. The mode that justifies the product is the indirect lighting one — light thrown up and out rather than straight down, which removes the hard pool of glare a normal downlighter drops onto a floor or a table. In a living room with a television that is the difference between a usable evening light and one you switch off. Because the modes are selected on the panel itself, there is no dimmer, no driver box and no wiring change: it goes into the same ceiling cut-out as any recessed downlighter and runs off the existing switch. Crompton carries a two-year warranty on it, which is the reason to pay for a brand here rather than an unbranded panel — what fails on cheap LED panels is the driver, not the diodes, and a two-year warranty on a ceiling-mounted fitting is worth more than a slightly higher lumen figure. This is the pack of two, ₹1,292 against a ₹2,800 bundle list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0GWLVZSMP',
    name: 'Floral Print Door Curtain, 8 Feet, Grey',
    price: 204,
    mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/91nKCUHXFtL._SX679_.jpg',
    confirm:
      'Confirm the quantity on the listing before ordering — the title says Pack of 1 while one of the bullets says set of 2, and at this price the single panel is the safer assumption.',
    description:
      'Two numbers decide whether a curtain at ₹204 is worth buying, and both are on this listing. The first is the size: 118 cm by 242 cm, which is a door-length 8 foot panel rather than a window curtain, so it reaches the floor on a standard Indian door frame instead of ending awkwardly above it. The second is GSM, which is fabric weight per square metre, and at 250 GSM this is a mid-weight polyester — heavy enough to hang with a straight fall and block a hallway view, not heavy enough to be a blackout curtain. If you need a bedroom dark at 6am, this is not that product; if you need a door covered, a passage screened or a room divided, it is exactly that product. Polyester is also the practical choice for a door curtain that gets pushed aside twenty times a day: it does not crease like cotton, dries fast after a wash, and holds printed colour rather than fading down the fold lines. The print is a grey floral, which is neutral enough to work against either a white or a coloured wall. ₹204 against a ₹1,999 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0B1PXSHXQ',
    name: 'Galaxy Home Decor Embossed Tree Punching Window Curtains, 6 Feet, Pack of 2, Aqua',
    price: 425,
    mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/91j9KRXsuZL._SY879_.jpg',
    confirm:
      'These are semi-transparent — they filter light and soften a view rather than blocking either, so plan them as day curtains or pair them with a heavier layer behind.',
    description:
      'This is a pack of two 6 foot window panels, which is the length for a standard window rather than a door, and the fabric is 100% polyester with an embossed tree pattern punched into it. Semi-transparent is the key description and it is a deliberate choice, not a shortcoming: a sheer panel with a raised pattern reads as texture against daylight and keeps a room bright while taking the hard edge off both the glare and the view in. Anyone expecting a room to go dark behind these will be disappointed, which is why the honest use is either a day curtain on its own or the inner layer under a heavier drape. The embossing matters more than the print on a sheer panel, because a flat printed sheer looks washed out once light passes through it while a punched or embossed pattern still shows relief. Polyester keeps the panel light enough to move on a simple rod, resists creasing, and dries quickly — all of which matters on a curtain that gets drawn twice a day. Aqua is a cool shade that reads well against white or cream walls. Two panels for ₹425 against a ₹1,999 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0D3Z2BSPB',
    name: 'JustLatest Solar Powered Scalp Massager, Marble Pink',
    price: 39,
    mrp: 199,
    image: 'https://m.media-amazon.com/images/I/61JeMF3xF-L._SX679_.jpg',
    confirm:
      'Delivery is not free on this one — there is a ₹59 charge at checkout, which is more than the product costs, so it only makes sense added to a larger order.',
    description:
      'At ₹39 the only sensible way to describe this is exactly what it is: a hand-held scalp massager, model JL-009, weighing 100 g, made in India, that runs off a small solar cell rather than a battery you replace. Solar powered here means there is no cell to buy and nothing to charge from a wall socket — it picks up what it needs from ambient light, which is the whole reason a product this cheap can run at all without becoming battery-shaped e-waste in a month. It works the way every manual scalp massager works: the head sits against the scalp and the fingers move over it, which feels good, helps a stiff head unwind after a screen-heavy day and is pleasant while shampooing. Amazon ranks it #2,684 in Health and Personal Care, which for a ₹39 accessory means steady volume rather than a fad. The honest caveat is the shipping: at ₹59, delivery costs more than the item, so this is something to add to a basket rather than order on its own. ₹39 against a ₹199 list price, in stock on Amazon, in a marble pink finish.',
  },
  {
    store: 'amazon',
    productId: 'B0D9QPS4MM',
    name: 'Panasonic 20 Meter LED Rope Light, IP65, 120 LED per Meter, Warm White',
    price: 1688,
    mrp: 4500,
    image: 'https://m.media-amazon.com/images/I/71vOVcykNCL._SX679_.jpg',
    confirm:
      'Do not pierce or staple through the rope when mounting it — the IP65 rating depends on the outer sleeve staying intact, and a nail through it is what turns an outdoor-rated light into a failed one.',
    description:
      'Two specifications separate a rope light that survives a balcony from one that dies in the first rain, and both are stated here. The first is IP65, which means the sleeve is sealed against dust and can take water jets — enough for an open balcony, a terrace railing or a porch, though not for submersion. The second is LED density at 120 per metre, which is what decides whether the light reads as a continuous line or as a row of visible dots; at 120 per metre across 20 metres the run looks like a lit line rather than a string of beads, and that is the difference between architectural cove lighting and festival decoration. The rope is bendable, so it follows a curve, a railing or a false-ceiling cove without connectors, and warm white keeps it in the 2700K-ish range that sits comfortably against brick, wood and plaster instead of the clinical look of cool white. Panasonic carries a one-year warranty on it. Twenty metres is enough for a full balcony perimeter or a medium cove run with slack to spare. ₹1,688 against a ₹4,500 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0D3M31SHX',
    name: 'PHILIPS Rose Gold Reflector LED COB Spot Light, 138mm Cut Out, Natural White',
    price: 841,
    mrp: 1630,
    image: 'https://m.media-amazon.com/images/I/61IzEHjkhJL._SX679_.jpg',
    confirm:
      'The wattage is inconsistent on the listing itself — the title says 18 W and one bullet says 12 W. The 1440 lumen output matches the 18 W figure, but confirm the variant selected on the page before ordering.',
    description:
      'The number to buy a spot light on is lumens, not watts, and this one is quoted at 1440 lm — bright enough to work as task lighting over a kitchen counter or a reading chair, not just as accent light. COB means chip-on-board: many LED dies packed onto a single substrate instead of separate discrete LEDs, which gives one clean beam with a sharp edge rather than several overlapping shadows. In a spot light that is what you want, because multiple shadows from one fitting is the tell of a cheap multi-die lamp. The cut-out is 138 mm, which is the figure that decides whether it fits at all — that is the hole the fitting drops into, so it must be checked against an existing false-ceiling opening before ordering rather than after. Natural white is the middle colour temperature, neither the yellow of warm white nor the blue of cool daylight, which is the safe choice for a room used for both living and work. The reflector carries a rose gold finish, so the visible ring reads as a deliberate trim rather than a plain white plate. ₹841 against a ₹1,630 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0CTQ238T5',
    name: 'PURE HOME + LIVING Black Polyresin Sitting Mother and Baby Monkey Showpiece',
    price: 728,
    mrp: 1299,
    image: 'https://m.media-amazon.com/images/I/71Xxx1pmc1L._SX679_.jpg',
    confirm:
      'The bullets on this listing call the figure a gorilla while the title says monkey — same product, inconsistent copy, so go by the photo for the shape you are actually buying.',
    description:
      'A showpiece is bought on size, material and finish, and all three are stated here. The size is 17 by 8.9 by 18.8 cm, which places it as a shelf or console piece rather than a floor sculpture — small enough for a bookshelf, a sideboard or a study desk, large enough to read as an object rather than a trinket. The material is polyresin, which matters for a practical reason: resin holds fine moulded detail that ceramic loses and does not chip the way a glazed piece does when it is knocked, which is why most cast decor figures at this price are resin rather than stone or metal. The finish is an antique treatment over black, so edges and raised detail catch light and the piece reads as aged cast metal rather than moulded plastic — that finish is most of what you are paying for on a figure this size. The subject is a seated mother and baby, which gives it a reason to sit somewhere personal rather than merely filling a gap on a shelf. Made in China. ₹728 against a ₹1,299 list price, in stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B0HG4YFXCG',
    name: 'Uttam Mukhwas Daily Freshness Combo Pack, Mint Masti, Delight and 5 Star',
    price: 321,
    mrp: 387,
    image:
      'https://m.media-amazon.com/images/I/717hNhieDUL._SX679_PIbundle-3,TopRight,0,0_AA679SH20_.jpg',
    confirm:
      'This is a three-pack combo, not a single jar — 349 g net across the three variants, so check the quantity reads 3 before ordering if you only wanted one flavour.',
    description:
      'A mukhwas combo is only worth buying over a single jar if the variants are actually different, and these three are: Mint Masti is the cooling one, Delight is the sweeter mixed-seed style, and 5 Star is the heavier traditional blend. Net quantity across the three is 349 g, which for a household that keeps a bowl on the dining table after meals is a few weeks rather than a few days. Buying the combo rather than three jars separately is the only reason this listing exists, and at ₹321 for the set the per-jar cost lands close to ₹107. The discount here is modest at 17% off a ₹387 list price — this is not a fire sale, it is a small saving on a repeat-purchase pantry item, and mukhwas is exactly the category where the list price is real because nobody discounts seeds heavily. Worth noting on freshness: the combo first went on sale on 22 August 2026, so current stock is recent rather than shelf-aged, which matters more for seeds and fennel than for most packaged food. In stock on Amazon.',
  },
  {
    store: 'amazon',
    productId: 'B01L9CQHJK',
    name: 'Cockatoo Adjustable Hand Grip Strengthener, 10 KG to 40 KG, Blue',
    price: 99,
    mrp: 530,
    image: 'https://m.media-amazon.com/images/I/71+cZ8KaWJL._SX679_.jpg',
    confirm:
      'The in-box contents read 2 hand grips, so this is a pair rather than a single unit — which is what you want, because grip work is trained on both hands.',
    description:
      'The reason to buy an adjustable grip rather than a fixed one is that grip strength moves fast in the first few weeks and a fixed-resistance trainer becomes useless almost immediately. This one dials from 10 kg to 40 kg, which covers a beginner squeezing at the bottom of the range and a climber or a lifter working near the top, and means one purchase rather than three. Grip work is also one of the few things worth training with a ₹99 tool: forearm and hand strength carries directly into deadlifts, pull-ups, carrying shopping up stairs, and recovery after a wrist or hand injury, and none of that needs a machine. The adjustment is a knob on the spring, so resistance changes in seconds rather than requiring a different unit for each level. In-box contents are two grips, which is the correct quantity — training one hand and not the other builds an imbalance you then have to undo. Nothing about this is sophisticated; it is a spring, two handles and a dial, which at this price is exactly what it should be. ₹99 against a ₹530 list price, in stock on Amazon, in blue.',
  },
  {
    store: 'amazon',
    productId: 'B0BNNKJBTL',
    slug: 'wipro-northwest-nowa-6a-bell-push-white-pack-of-10-b0bnnk',
    name: 'Wipro Northwest Nowa 6A Bell Push, White, Pack of 10',
    price: 355,
    mrp: 2150,
    image: 'https://m.media-amazon.com/images/I/51ga2eKS5pL._SX679_.jpg',
    confirm:
      'This is a 1 module bell push, so confirm your plate has a free 1M slot — it snap-fits into a modular plate and does not come with one.',
    description:
      'A bell push is a momentary switch: it closes the circuit only while pressed, which is why it cannot be swapped for a normal rocker and why a pack of ten is a sensible buy for a builder, an electrician or anyone rewiring a floor rather than a single flat. This is Wipro Northwest Nowa, a 6 A 1 module rocker that snap-fits into a standard modular plate — no screws into the module itself, so it goes in and comes out without dismantling the plate. The specification worth reading is the positive kick-off contact assembly. That is the mechanism that snaps the contacts apart rather than letting them drift open, and it is what stops the small arc that pits contacts and eventually leaves a switch warm, crackling or stuck. On a bell push, which gets pressed harder and more often than any other switch in a house, that mechanism is the difference between a five-year part and a five-month one. It is made to IS 3854:97, the Indian standard for switches for domestic and similar purposes, so it is a certified part rather than a look-alike. Ten pieces for ₹355 against a ₹2,150 list price, in stock on Amazon.',
  },

  // ---------------------------------------------------------------- Myntra (2)
  {
    store: 'myntra',
    productId: '36356431',
    name: 'Priority Unisex Textured 360 Degree Rotation Hard Cabin Trolley Bag, 48.38 L',
    price: 999,
    mrp: 2899,
    image:
      'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/MAY/27/lbcpkR2n_5c84ca418f7b45f5901c9c8eb85590ad.jpg',
    buyUrl:
      'https://www.myntra.com/trolley-bag/priority/priority-unisex-textured-360-degree-rotation-hard-cabin-trolley-bag---4838-l/36356431/buy',
    confirm:
      'Cabin size rules differ by airline — 48.38 L clears most Indian domestic cabin allowances, but check your carrier weight limit, because a hard case starts heavier than a soft one before anything goes in it.',
    description:
      'Cabin capacity is quoted at 48.38 litres, which is at the generous end of carry-on and in practice means three to four days of clothes without sitting on the lid to close it. The case is a hard shell, and that is the decision that matters: a hard case protects what is inside from being crushed in an overhead bin and keeps its shape on a conveyor, while a soft case swallows an extra jacket. For a cabin bag that mostly carries laptop, chargers, documents and folded clothes, hard is the right side of that trade. Wheels are 360 degree rotation — four spinner wheels rather than two fixed ones, so the bag stands upright and pushes alongside you through an airport instead of being dragged behind at an angle, which is the single biggest difference in how a trolley feels over a long terminal walk. The exterior is textured rather than gloss, which is a practical finish choice because a matte textured shell hides the scuffs and hairline scratches every gloss case picks up on its first trip. Unisex styling keeps it neutral. ₹999 against a ₹2,899 list price on Myntra, in stock.',
  },
  {
    store: 'myntra',
    productId: '46320922',
    name: 'Aqueria 3 in 1 Brightening Body Wash with Hyaluronic Acid and Alpha Arbutin, 875 ml',
    price: 299,
    mrp: 1499,
    image:
      'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/SEPTEMBER/16/a7ce608c6bcf4d4b8dbdbb177fe4bed4.jpg',
    buyUrl:
      'https://www.myntra.com/body-wash-and-shower-gel/aqueria/aqueria-3-in-1-brightening-body-wash-with-hyaluronic-acid-alpha-arbutin-875-ml/46320922/buy',
    confirm:
      'Patch test on a small area before the first full use — alpha arbutin is an active, and any brightening active deserves one wash on a forearm before it goes over the whole body.',
    description:
      'Two actives are named on the label and they do different jobs, which is the reason to look at this over a plain shower gel. Hyaluronic acid is a humectant: it holds water at the surface of the skin, which is what stops the tight, squeaky feeling a strong cleanser leaves behind — useful in a body wash, because body skin is washed with hotter water and dries out faster than facial skin. Alpha arbutin is the brightening active, a gentler derivative that works on pigmentation gradually rather than stripping, and it is the one to introduce slowly. Together they explain the 3 in 1 positioning: cleanse, hydrate, brighten in one step. The size is the other half of the value — 875 ml is a large bottle, close to double the usual 400 to 500 ml shower gel, which at ₹299 works out to roughly ₹34 per 100 ml and puts it below most supermarket body washes that carry no actives at all. A brightening claim is a slow claim: expect weeks of consistent use, not a visible change after one shower. ₹299 against a ₹1,499 list price on Myntra, in stock.',
  },

  // ---------------------------------------------------------------- Flipkart (3)
  {
    store: 'flipkart',
    productId: 'SOPGAYGUNV98SNBP',
    name: 'Cara Mia Paraben-free Glycerin Soap, 125 g, Pack of 4',
    price: 97,
    mrp: 265,
    image:
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/soap/q/o/r/4-500-glycerin-soap-caramia-by-flipkart-original-imaghj5h5ju94eyf.jpeg?q=70',
    confirm:
      'Confirm the pack count on the listing before paying — this is the 4 x 125 g pack, 500 g total, and the same product is also sold as a single bar.',
    description:
      'Glycerin soap is a different thing from a regular bathing bar, and the difference is worth ₹97 for four. Glycerin is a humectant: it pulls water toward the skin rather than stripping oil off it, which is why glycerin bars are what dermatologists suggest for dry or winter-irritated skin while ordinary soap leaves it tight. The trade-off is honest — glycerin bars are softer, so they wear down faster and should sit in a dish that drains rather than in a pool of water. Paraben-free is the second claim on the label, and it is a formulation choice rather than a marketing one: parabens are preservatives, and leaving them out matters most to anyone who reacts to them or who is buying for a child. This is the pack of four at 125 g each, 500 g of soap in total, which for a two-person bathroom is roughly a couple of months. Buying soap in a four-pack is the cheapest thing on this list to get right, because the per-bar cost falls to about ₹24 against ₹66 at the single-bar list rate. ₹97 against a ₹265 list price on Flipkart, in stock.',
  },
  {
    store: 'flipkart',
    productId: 'BDSHPHJFC7ZXHZWY',
    name: 'Flipkart Perfect Homes 244 TC Cotton Double Fitted Bedsheet with 2 Pillow Covers',
    price: 292,
    mrp: 1999,
    image:
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/bedsheet/u/d/s/premium-fitted-bedsheet-brown-barfi-1-fitted-bedsheet-brown-original-imahjm94zn3ejhrv.jpeg?q=70',
    confirm:
      'Check the design and colour selected on the listing before paying — the variant naming on this product family covers several prints, and the image filename and the title do not use the same one.',
    description:
      'This is a fitted bedsheet, not a flat one, and that is the whole reason to pick it. A fitted sheet has an elasticated skirt that grips the mattress corners, so it does not work loose and bunch under you the way a flat sheet does after two nights — the difference anyone who makes a bed every morning will notice first. Thread count is 244 TC, which is the honest middle of cotton bedding: dense enough to feel smooth and hold up to repeated machine washing, not so dense that it sleeps warm through an Indian summer the way a heavy 400 TC sateen does. The fabric is cotton, which breathes and gets softer with each wash rather than pilling like a polyester blend. The set is one double fitted sheet plus two pillow covers, so it is a complete bed rather than a sheet you then have to match covers to. Double size fits a standard Indian double or queen mattress; the elastic accommodates normal mattress depth but a very thick orthopaedic mattress is worth measuring first. ₹292 against a ₹1,999 list price on Flipkart, in stock.',
  },
  {
    store: 'flipkart',
    productId: 'EMLHM44G7DR5EDZW',
    name: 'Pigeon Radiance Rechargeable LED Torch and 2-in-1 Lantern Emergency Light, 1800mAh',
    price: 550,
    mrp: 2999,
    image:
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/emergency-light/c/k/c/radiance-rechargeable-led-torch-1800mah-battery-2-in-1-lantern-original-imahm44gagte5fav.jpeg?q=70',
    confirm:
      'Charge it fully and then top it up every couple of months even if unused — a lithium emergency light left flat in a drawer for a year is the most common way these die before they are ever needed.',
    description:
      'The 2-in-1 part is what makes this useful rather than just another torch. In torch mode it throws a directed beam, which is what you want walking a dark stairwell or looking under a car; in lantern mode it puts out light in all directions, which is what an actual power cut needs, because a beam pointed at a ceiling is a poor way to light a room. One device covering both means one thing to find in the dark instead of two. Battery capacity is 1800 mAh and Pigeon quotes about three hours of torch runtime, which is the right order of magnitude for a load-shedding evening or a night in a tent, though lantern mode on full output will always drain faster than a spot beam. Rechargeable is the other half of the value: no dry cells to keep buying and none to leak inside the barrel, which is what kills most old torches that sit unused in a drawer for a year. It is priced as a household emergency light rather than a tactical torch, and that is the honest way to buy it. ₹550 against a ₹2,999 list price on Flipkart, in stock.',
  },
];

const STORES = {
  amazon: { slug: 'amazon', name: 'Amazon' },
  flipkart: { slug: 'flipkart', name: 'Flipkart' },
  myntra: { slug: 'myntra', name: 'Myntra' },
};

for (const d of deals) {
  const st = STORES[d.store];
  d.storeSlug = st.slug;
  d.storeName = st.name;
  d.slug ??= slugFor(d.name, d.productId);
  if (d.store === 'amazon') {
    d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  } else if (d.store === 'flipkart') {
    // Verified HTTP 200 + matching ld name/price on this path form; itm hash unrecoverable.
    d.affiliateUrl = `https://www.flipkart.com/${kebab(d.name).slice(0, 60).replace(/-+$/, '')}/p/itme?pid=${d.productId}&affid=djhackraj`;
  } else {
    d.affiliateUrl = CUELINKS(d.buyUrl);
  }
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – ${d.storeName}`;
  d.howTo = HOW(d.storeName, d.confirm);
}

// Pre-flight. Same checks as every push path, plus the per-store affiliate shape — this is the
// first multi-store batch, so a wrong tag or a Cuelinks wrap on an Amazon row would otherwise
// only surface as lost commission weeks later.
const HOSTS =
  /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com|assets\.myntassets\.com)\//;
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.image.includes('indiafreestuff')) throw new Error(`source image ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase()) && !LEGACY_SLUGS.has(d.slug))
    throw new Error(`slug missing productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  if (d.store === 'amazon' && !/\/dp\/[A-Z0-9]{10}\?th=1&psc=1&tag=ashoksachdev-21$/.test(d.affiliateUrl))
    throw new Error(`bad amazon url ${d.productId}`);
  if (d.store === 'flipkart' && !/^https:\/\/www\.flipkart\.com\/[a-z0-9-]+\/p\/itme?\?pid=[A-Z0-9]+&affid=djhackraj$/.test(d.affiliateUrl))
    throw new Error(`bad flipkart url ${d.productId}`);
  if (d.store !== 'amazon' && d.store !== 'flipkart' && !d.affiliateUrl.startsWith('https://linksredirect.com/?cid=527&source=linkkit&url='))
    throw new Error(`non-cuelinks url ${d.productId}`);
  if (/dealhind-21|adminpais|affExtParam|pwsvid|indiafreestuff/.test(d.affiliateUrl))
    throw new Error(`source affiliate params survived ${d.productId}`);
  seen.add(d.slug); seen.add(d.productId);
}
console.log(`pre-flight OK, ${deals.length} rows\n`);

let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const store = await p.store.upsert({
    where: { slug: d.storeSlug },
    update: {},
    create: { slug: d.storeSlug, name: d.storeName },
  });
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: store.id,
  };
  const existing =
    (await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })) ??
    (await p.deal.findUnique({ where: { slug: d.slug } }));
  if (existing) {
    const before = { price: existing.price, mrp: existing.mrp, pct: existing.discountPct };
    await p.deal.update({ where: { id: existing.id }, data: { ...data, slug: existing.slug } });
    if (existing.price !== d.price) await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    updated++; slugs.push(existing.slug);
    console.log('UPD', existing.id, existing.slug, JSON.stringify(before), '->', JSON.stringify({ price: d.price, mrp: d.mrp, pct: d.discountPct }));
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug);
    console.log('NEW', row.id, d.storeSlug, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
