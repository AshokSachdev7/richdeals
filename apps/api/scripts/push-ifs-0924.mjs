// DEAL-INGEST indiafreestuff tick 2026-09-24
//
// Funnel: 54 cards off /deals + /deals/superdeals (2.6s gap, no 403/429)
// -> 38 resolved through the base64 ?rto= Buy Now -> 36 fresh after productId dedup
// -> 35 Amazon PDP-read in the logged-in tab + 1 Myntra ld+json -> 28 publishable.
// Every price is the PDP figure (corePriceDisplay regex), never the card figure.
// Rejected: 5 card/PDP drift (B07W7TZ71T, B07TL3DTD3 Larah, B0CVL448H5, B0HD6S6T4K,
// B0CT5GD3Q6 Skybags), 1 no MRP on PDP (B08PD6HHHP).
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
    productId: 'B0BJQKPVRK', name: "DTR Fashion Women's 4-Way Stretch Ankle Length Leggings, White",
    price: 279, mrp: 999, image: IMG('71B13QwrA3L._SL1500_.jpg'),
    description: [
      'Ankle-length leggings are the most worn and least thought-about item in a wardrobe, which is why the fabric matters more than the brand. This DTR pair is a viscose-elastane blend with a cotton-soft hand feel, built to stretch four ways — lengthwise and across — so it moves with a squat or a long commute instead of pulling at the knee.',
      'White is the variant on this price. It is the colour that pairs with every kurta and long top, and also the one that shows fabric thinness first, so the practical test on arrival is to check opacity in daylight before cutting the tags. Ankle length suits kurtis and tunics that end at the knee or below; it looks cropped under shorter tops.',
      'At this price the sensible approach is to treat leggings as a consumable. Wash them inside out in cold water and skip the dryer, because heat is what wrecks the elastane first and turns a good fit baggy at the knees within a few months.',
      `Live Amazon price is ₹${inr(279)} against an M.R.P. of ₹${inr(999)} — 72% off, In stock.`,
    ],
    howTo: STD_HOWTO('DTR Fashion ankle-length leggings', 'Pick your size and colour before adding to cart. This price was read on the White variant — Amazon prices each colour and size of these leggings separately, so the figure can differ on another combination.'),
  },
  {
    productId: 'B0CGRLYLL1', name: "OOMPH! Women's Cotton Blend Maxi Nighty",
    price: 453, mrp: 2000, image: IMG('61O+o6VOpxL._SL1500_.jpg'),
    description: [
      'A full-length nighty is still the default sleepwear in most Indian homes for a practical reason: it covers enough to answer the door, and it is loose enough to sleep in without anything riding up. OOMPH! makes this one in a cotton blend, which is the fabric choice that decides whether a nightdress is comfortable on a humid night.',
      'A cotton blend sits between pure cotton and polyester. It breathes better than a synthetic satin gown and holds its shape and colour through more washes than pure cotton, which tends to shrink and fade. The maxi length and relaxed gown cut are what make it double as loungewear for the morning, not only sleepwear.',
      'Sizing on nighties runs generous by design, so most buyers are better off ordering their usual size rather than sizing up. Wash the first time on its own, since printed cotton blends can release a little dye in the first cycle.',
      `Live Amazon price is ₹${inr(453)} against an M.R.P. of ₹${inr(2000)} — 77% off, In stock.`,
    ],
    howTo: STD_HOWTO('OOMPH! cotton blend maxi nighty', 'Pick your size and print before adding to cart. OOMPH! prices each print and size separately, so the figure shown here applies to the variant the page opens on.'),
  },
  {
    productId: 'B0G1BS17WC', name: 'boAt EnergyShroom PB665 Turbo X 30000mAh 65W Laptop Power Bank',
    price: 3699, mrp: 9999, image: IMG('71Eo-q1QOsL._SL1500_.jpg'),
    description: [
      'A 65W power bank is a different product from a phone power bank. Most phone banks top out at 20-22.5W, which is too little to charge a laptop while it is in use. At 65W, the boAt EnergyShroom PB665 Turbo X can keep a MacBook or a USB-C Windows laptop going on a train or at an airport gate, which is the only reason to buy one at this capacity.',
      'The 30000mAh lithium-polymer cell is the capacity that makes laptop charging worthwhile — enough for a meaningful laptop top-up plus phones on the same trip. It has four outputs (two USB-A and two two-way Type-C) so it can charge several devices at once, plus pass-through charging, so the bank and a device can both charge from one wall socket overnight. boAt lists 12-layer IC protection against overcharging, overheating and short circuits.',
      'Two practical notes. Airlines allow power banks in cabin baggage only, never checked in, and 30000mAh is within the usual limit. And a 65W bank only delivers 65W through a cable rated for it; boAt includes a 100W cable in the box, so use that one for the laptop.',
      `Live Amazon price is ₹${inr(3699)} against an M.R.P. of ₹${inr(9999)} — 63% off, In stock.`,
    ],
    howTo: STD_HOWTO('boAt EnergyShroom PB665 Turbo X power bank', 'Check the model before adding to cart. This price is the 30000mAh 65W PB665 Turbo X — boAt lists its lower-capacity and lower-wattage EnergyShroom banks as separate pages at their own prices.'),
  },
  {
    productId: 'B0DJQP575S', name: "Giordano Women's Analog Watch with Metal Strap",
    price: 1699, mrp: 8150, image: IMG('71SwkkFEdbL._SL1500_.jpg'),
    description: [
      'Giordano sits in the space between fashion-label watches and entry-level Japanese brands: a recognisable name on the dial, a clean analog face, and a price that works as a gift rather than an investment. This women\'s model pairs a three-hand movement with a metal bracelet, the most versatile combination for wearing to work and out in the evening.',
      'Three hands (hours, minutes and seconds) and no extra dials keep the face readable at a glance. The metal strap is the part that dresses it up, and it is also the part to check on arrival: bracelet watches ship sized for a large wrist, and removing a link or two is a five-minute job at any watch shop.',
      'The listing calls it water resistant. On a fashion watch that almost always means splash-proof, safe for hand-washing and rain but not for swimming or a hot shower. At this price it makes a strong gift pick, and the listing showed only a few units left when we checked.',
      `Live Amazon price is ₹${inr(1699)} against an M.R.P. of ₹${inr(8150)} — 79% off, only a few left in stock.`,
    ],
    howTo: STD_HOWTO('Giordano women\'s analog watch', 'Check the dial colour before adding to cart. Giordano lists each dial and strap colour as its own variant with its own price, and stock on this one was low when we checked.'),
  },
  {
    productId: 'B0HCNNSWB5', name: 'Zebronics PixaPlay 63 Plus Native 1080p Smart Projector, 7000 Lumens',
    price: 8499, mrp: 26999, image: IMG('61YuvxjGLAL._SL1500_.jpg'),
    description: [
      'The number that matters on a budget projector is native resolution, not the 4K badge. The Zebronics PixaPlay 63 Plus is native Full HD 1080p: it draws a real 1920x1080 image, and it also accepts a 4K input signal and scales it down. Many projectors at this price are native 720p or lower and only accept 1080p, so native FHD is the main reason to pick this one.',
      'It is a smart projector with app support running on a quad-core processor, so it can stream without a separate stick. Dual-band Wi-Fi (2.4 and 5GHz), Miracast and iOS screen mirroring cover casting from a phone. Bluetooth 5.4 handles a soundbar or headphones, while HDMI (ARC), USB and AUX out cover a console or a laptop. Auto focus and auto keystone correction square up the picture on their own, and a 90° tilt lets you project onto a ceiling.',
      'Zebronics rates it at 7000 lumens with a projection size up to 304cm. Treat lumen figures on budget projectors as a marketing number rather than an ANSI measurement. In practice, a dark room is what makes a projector at this price look good, and curtains matter more than the spec sheet.',
      `Live Amazon price is ₹${inr(8499)} against an M.R.P. of ₹${inr(26999)} — 69% off, In stock.`,
    ],
    howTo: STD_HOWTO('Zebronics PixaPlay 63 Plus projector', 'Check the model name before adding to cart. This price is the PixaPlay 63 Plus — Zebronics sells several PixaPlay models with near-identical names and very different specs, each at its own price.'),
  },
  {
    productId: 'B0CFVRN89K', name: "Jack & Jones Men's Cotton Slim Fit Polo T-Shirt",
    price: 572, mrp: 1999, image: IMG('51FVd+uVwiL._SL1440_.jpg'),
    description: [
      'A polo is the one shirt that works both for a casual Friday and a weekend lunch, and Jack & Jones is one of the brands whose polos regularly drop to a plain-tee price on Amazon. This one is cotton with a proper polo collar and a slim fit, the cut the brand is known for.',
      'Slim fit is the detail to take seriously before ordering. Jack & Jones cuts close through the chest and waist, so anyone between sizes or with a broader build usually goes one size up. Cotton breathes better than the poly-blend piqué used on cheaper polos, which makes it the better choice for Indian summers. Check the care label on arrival and follow it over any general advice, since it is specific to the fabric you received.',
      'To keep the collar from curling, wash it cold, dry it flat or on a hanger, and iron the collar while it is slightly damp. That habit makes a cotton polo look new for far longer than the fabric alone would.',
      `Live Amazon price is ₹${inr(572)} against an M.R.P. of ₹${inr(1999)} — 71% off, In stock.`,
    ],
    howTo: STD_HOWTO('Jack & Jones slim fit polo', 'Pick your size and colour before adding to cart. Jack & Jones prices each colour and size separately, and the slim cut runs small, so size up if you are between sizes.'),
  },
  {
    productId: 'B078GT84VH', name: "WINTAGE Men's Velvet Notch Lapel Tuxedo Blazer",
    price: 2499, mrp: 4499, image: IMG('61BJ7ALDR6L._SL1500_.jpg'),
    description: [
      'A velvet blazer suits the kind of occasion where a regular suit looks too office-like: a sangeet, a reception, a year-end party. WINTAGE makes this one as a tuxedo-style coat with a notch lapel, so it stays on the smart-casual side of formal and does not demand a bow tie and full tux trousers.',
      'Velvet is also the fabric that makes a plain outfit look deliberate. Wear it over a black shirt or a white tee with dark trousers and the blazer does all the work. The notch lapel is more versatile than a shawl or peak lapel, because it reads as a jacket rather than a costume.',
      'Velvet needs careful handling. Hang it on a broad-shouldered hanger rather than folding it, steam it instead of ironing it (an iron crushes the pile), and dry-clean it rather than machine-washing it. Stock was down to the last unit when we checked, so sizes may go quickly.',
      `Live Amazon price is ₹${inr(2499)} against an M.R.P. of ₹${inr(4499)} — 44% off, last units in stock.`,
    ],
    howTo: STD_HOWTO('WINTAGE velvet tuxedo blazer', 'Pick your size and colour before adding to cart. WINTAGE prices each colour and size separately, and stock on this variant was down to the last unit when we checked.'),
  },
  {
    productId: 'B0FKY1XR9K', name: 'Dynore Hammered Stainless Steel Milk Frothing Pitcher, 150ml',
    price: 140, mrp: 499, image: IMG('51CYZdkw5RL._SL1024_.jpg'),
    description: [
      'A 150ml bell creamer is the small jug that makes a home coffee setup look finished. It holds exactly enough milk for one cup, which makes it the right size for frothing a single cappuccino or serving milk and cream on a tea tray. Dynore makes this one in stainless steel with a hammered finish.',
      'The hammered texture is decorative, but it also hides the fine scratches that plain polished steel shows after a few months. The two features that matter for use are a wide mouth, so a frothing wand or spoon fits inside, and a precision pour spout, which is what lets you pour cleanly and attempt basic latte art.',
      'Stainless steel means it goes into the dishwasher, will not stain from turmeric milk, and will not crack like ceramic. At this price it also works as an easy add-on gift for someone who has just bought a coffee machine.',
      `Live Amazon price is ₹${inr(140)} against an M.R.P. of ₹${inr(499)} — 72% off, In stock.`,
    ],
    howTo: STD_HOWTO('Dynore 150ml hammered steel creamer', 'Check the size before adding to cart. This price is the 150ml single piece — Dynore lists larger jugs and multi-piece sets as separate pages at their own prices.'),
  },
  {
    productId: 'B0F5HNMKQ3', name: 'American Tourister Liftoff+ 67cm Medium Check-in Trolley Bag',
    price: 2699, mrp: 8600, image: IMG('61pPDgH2rkL._SL1500_.jpg'),
    description: [
      'A 67cm trolley is the medium check-in size: big enough for a week-long trip or two people on a short one, and small enough to stay under a typical 15kg domestic check-in allowance without much effort. The American Tourister Liftoff+ is a hard-shell polypropylene case, the material most mid-range luggage has moved to.',
      'Polypropylene flexes on impact rather than cracking, which is what you want from a bag that goes down an airport belt. It has eight spinner wheels (four double wheels) that roll 360°, so it glides next to you rather than being dragged behind. A mounted TSA-approved lock covers international trips where security may need to open the case.',
      'American Tourister backs the Liftoff+ with a three-year global warranty that works in 120+ countries, which is the practical reason to buy a known luggage brand over an unbranded shell. Keep the invoice from the order, because warranty claims ask for it.',
      `Live Amazon price is ₹${inr(2699)} against an M.R.P. of ₹${inr(8600)} — 69% off, In stock.`,
    ],
    howTo: STD_HOWTO('American Tourister Liftoff+ 67cm trolley', 'Check the size and colour before adding to cart. This price is the 67cm medium check-in — the cabin and large sizes of the Liftoff+ are separate listings, and each colour is priced on its own.'),
  },
  {
    productId: 'B0FHXY7VZ5', name: 'LG 27U411A-BD 27 inch Full HD IPS 120Hz Monitor',
    price: 9499, mrp: 16500, image: IMG('71NkGlJa2aL._SL1500_.jpg'),
    description: [
      'The LG 27U411A-BD is a 27-inch Full HD IPS monitor, a good second screen for a laptop user or a main screen for a home office. IPS panels hold their colour when seen from the side, so they suit a shared desk or a screen viewed from a sofa better than a cheaper VA or TN panel. LG rates it at sRGB 99% (typical), which is enough for everyday photo work.',
      'The 120Hz refresh rate sets it apart from the standard 60Hz office monitor at a similar price. Scrolling, cursor movement and casual gaming all look noticeably smoother, and the 1ms (MBR) response figure reduces motion blur. It also supports HDR10, has 3-side virtually borderless bezels that suit a dual-screen setup, and has Reader Mode and Flicker Safe for long workdays.',
      'The honest caveat is pixel density. 1080p stretched over 27 inches is visibly softer for text than a 24-inch 1080p screen or a 27-inch 1440p one, so it is best for media, general office work and casual gaming at a normal desk distance. Connection is over HDMI, so check that your laptop has an HDMI port or a USB-C adapter.',
      `Live Amazon price is ₹${inr(9499)} against an M.R.P. of ₹${inr(16500)} — 42% off, In stock.`,
    ],
    howTo: STD_HOWTO('LG 27U411A-BD monitor', 'Check the model number before adding to cart. This price is the 27U411A-BD — LG lists the 24-inch and other 27-inch models under similar names as separate pages at their own prices.'),
  },
  {
    productId: 'B0FNL7FBT7', name: 'Lifelong Woolen Beanie Winter Cap, Unisex',
    price: 99, mrp: 799, image: IMG('71d6HGnpi6L._SL1500_.jpg'),
    description: [
      'A knitted beanie is the cheapest single piece of winter gear that makes a real difference to warmth, because it covers the head and ears, the parts a jacket leaves exposed. Lifelong makes this one in knitted wool with a slouchy fit, and at under ₹100 it is priced like a stocking filler.',
      'The slouchy cut is the style detail: it sits looser at the back than a tight watch cap, which suits casual winter outfits and suits both men and women, as the listing says. It is stretchable and one-size-fits-most, so there is no size to choose, and the knit is described as soft and breathable rather than heavy.',
      'Winter gear is cheapest before the season starts, which is when a deal like this makes sense. Order it now for a December trip to the hills or a North India winter, rather than paying the in-season price later. Hand-wash woolens in cold water and dry them flat, because wringing and hanging stretches the knit out of shape.',
      `Live Amazon price is ₹${inr(99)} against an M.R.P. of ₹${inr(799)} — 88% off, In stock.`,
    ],
    howTo: STD_HOWTO('Lifelong woolen beanie cap', 'Pick the colour before adding to cart. Lifelong lists each colour of this beanie as a variant, and the ₹99 price applies to the colour the page opens on.'),
  },
  {
    productId: 'B0GVS3CDDQ', name: 'Lemon Dishwash Gel Refill Can, 1 Litre, Pack of 4',
    price: 337, mrp: 880, image: IMG('71LV4rWoKlL._SL1500_.jpg'),
    description: [
      'Dishwash liquid is a monthly repeat purchase, so the only number worth comparing is price per litre. This is a four-litre super-saver pack (four 1-litre refill cans), which works out to roughly ₹84 a litre at this price, well below what a single branded bottle from the shelf costs per litre.',
      'It is a lemon gel formula positioned as a grease cutter for all utensils. The listing says one spoonful (about 4ml) cleans a load, that it does not leave residue or a lingering smell, and that it is gentle on hands and safe on delicate cookware without scratching. The lemon fragrance is the standard choice for masking fish and onion smells on steel.',
      'Refill cans are meant to decant into a pump bottle you already own, which is where the saving comes from. A bulk pack is also sensible storage: dishwash gel keeps for months unopened, so four litres will not go off before you finish it.',
      `Live Amazon price is ₹${inr(337)} against an M.R.P. of ₹${inr(880)} — 62% off, In stock.`,
    ],
    howTo: STD_HOWTO('lemon dishwash gel 4 x 1L pack', 'Check the pack count before adding to cart. This price is four 1-litre cans — the single can and smaller packs are listed separately at a higher per-litre price.'),
  },
  {
    productId: 'B0BQYK6RSF', name: "NutriGlow Natural's Papaya Face Wash and Papaya Scrub Combo, 100g Each",
    price: 231, mrp: 498, image: IMG('71LViyBxItL._SL1440_.jpg'),
    description: [
      'This NutriGlow Natural\'s combo pairs a daily papaya face wash with a papaya facial scrub, 100g each. Together they form the two-step cleanse-and-exfoliate routine that tan-removal skincare is built around. Buying the two as a set is cheaper than picking them up separately.',
      'The face wash combines papaya extract with orange peel and niacinamide, pitched at removing suntan and evening out skin tone. The scrub adds lemon oil as an antioxidant and an AHA (alpha hydroxy acid) solution for exfoliation. That is the ingredient worth knowing about, because AHAs are what actually loosen dead skin, beyond the physical scrub particles.',
      'Use the face wash daily and the scrub only two or three times a week. Exfoliating every day, especially with an AHA product, irritates most skin types. Wear sunscreen during the day while using it, since exfoliated skin burns more easily and a tan-removal routine without sunscreen undoes itself.',
      `Live Amazon price is ₹${inr(231)} against an M.R.P. of ₹${inr(498)} — 54% off, In stock.`,
    ],
    howTo: STD_HOWTO('NutriGlow papaya face wash and scrub combo', 'Check that the listing is the two-piece combo before adding to cart. NutriGlow sells the face wash and the scrub separately as well, at their own prices.'),
  },
  {
    productId: 'B0FCY2VJQ3', name: 'Longway Kiger P1 600mm High Speed 4-Blade Ceiling Fan, Ivory',
    price: 1049, mrp: 2341, image: IMG('715c2VTsejL._SL1500_.jpg'),
    description: [
      'A 600mm (24-inch) ceiling fan is a small-room fan, and choosing the right sweep matters more than choosing the brand. A standard 1200mm fan in a kitchen, balcony, veranda or small bathroom-side passage is oversized and noisy for the space. The Longway Kiger P1 is built for exactly those rooms, at 600mm with four blades.',
      'Longway rates it at 800 RPM with 230 CMM air delivery and five speed settings. That is high speed for the sweep, which is how a small fan moves a useful amount of air. The motor uses a double ball-bearing set, and the body is rust-proof powder-coated with dust-resistant blades, which counts for a lot in a kitchen where grease and dust settle on everything.',
      'The box has the full kit (motor, down rod, shackle assembly, canopy set and blades), so nothing extra is needed apart from an electrician. The warranty is one year standard plus one more year if you register within 15 days of purchase, so register the fan on the day it is installed.',
      `Live Amazon price is ₹${inr(1049)} against an M.R.P. of ₹${inr(2341)} — 55% off, In stock.`,
    ],
    howTo: STD_HOWTO('Longway Kiger P1 600mm ceiling fan', 'Check the sweep size and colour before adding to cart. This price is the 600mm Ivory single pack — Longway lists the 1200mm fans and other colours as separate pages at their own prices.'),
  },
  {
    productId: 'B07L94ZZMJ', name: 'Vector X Power Rubber Basketball, Size 3',
    price: 281, mrp: 549, image: IMG('81YnauO5sfL._SL1500_.jpg'),
    description: [
      'Vector X is one of the most common sports-goods brands in Indian school and club kits, and the Power is its moulded rubber basketball. Moulded rubber is the right material for a first ball or an outdoor court, because it survives concrete and tar far better than composite leather, which is meant for indoor wooden floors.',
      'The listing title says size 3, which is a mini ball for young children. Adult and teen play uses size 7 for men and size 6 for women and youth, and a size 3 is too small for them. Since the listing text mentions more than one size, choose from the size selector on the page rather than trusting the title alone. A butyl bladder is what keeps the ball holding air for weeks rather than days.',
      'Balls like this ship deflated for transport. The listing says a pump and needle come with it, so inflate it to the pressure printed near the valve and moisten the needle before inserting it. Forcing a dry needle is the most common way a new ball\'s valve gets damaged.',
      `Live Amazon price is ₹${inr(281)} against an M.R.P. of ₹${inr(549)} — 49% off, In stock.`,
    ],
    howTo: STD_HOWTO('Vector X Power basketball', 'Choose the ball size from the size selector before adding to cart. Size 3 is a mini ball for young children, size 7 is the adult men\'s ball, and each size is priced separately.'),
  },
  {
    productId: 'B0CXPVMMFX', name: "La'Bangerry Ubtan Brightening Face Wash with Niacinamide, 2 x 50ml",
    price: 152, mrp: 498, image: IMG('71l-Qy0G0pL._SL1500_.jpg'),
    description: [
      'Ubtan is the traditional Indian pre-wedding paste of turmeric, gram flour and herbs, and ubtan face washes put that idea into a daily foaming cleanser. This La\'Bangerry version adds niacinamide, the most studied brightening ingredient in mainstream skincare, to the botanical base. It is labelled for all skin types, men and women.',
      'The listing names niacinamide along with bearberry (Arctostaphylos uva-ursi) and licorice (Glycyrrhiza glabra) extracts. Bearberry and licorice both appear in skincare aimed at pigmentation and uneven tone, and niacinamide is known for calming redness. It is pitched at tan removal, brighter tone and gentle exfoliation through a foam texture rather than scrub particles.',
      'This pack is two 50ml tubes, a practical format for keeping one at home and one in a gym or travel bag. Brightening cleansers work gradually over weeks of daily use, not in one wash, and they pair best with a daily sunscreen.',
      `Live Amazon price is ₹${inr(152)} against an M.R.P. of ₹${inr(498)} — 69% off, In stock.`,
    ],
    howTo: STD_HOWTO("La'Bangerry ubtan face wash twin pack", "Check the pack before adding to cart. This price is two 50ml tubes — La'Bangerry lists the single tube and larger sizes as separate pages at their own prices."),
  },
  {
    productId: 'B0FYPCY2NN', name: 'Q1 Gaming TWS Earbuds with Bluetooth 5.4, AI-ENC and 45ms Low Latency',
    price: 750, mrp: 4999, image: IMG('51K4YlNio6L._SL1500_.jpg'),
    description: [
      'Gaming earbuds are defined by one spec: latency, the delay between something happening on screen and hearing it. Standard budget TWS earbuds lag enough that footsteps and gunshots in a mobile shooter arrive late. These Q1 earbuds run a dedicated 45ms low-latency mode over Bluetooth 5.4, which keeps the sound close to in sync with the game.',
      'Calls use dual microphones with AI environmental noise cancellation (AI-ENC). ENC cleans up your voice for the person on the other end; it is not ANC and does not block noise for you. The listing puts playtime at around five hours per charge, with a total from the case in the 40-45 hour range (the title and bullets give slightly different figures). Each bud weighs about 5g, with soft silicone tips.',
      'At this price these are a budget gaming pair, not an audiophile one. Judge them on latency, fit and battery, which is what the spec sheet actually promises. Turn on the game mode after pairing, because low latency is usually a mode you switch on rather than the default.',
      `Live Amazon price is ₹${inr(750)} against an M.R.P. of ₹${inr(4999)} — 85% off, In stock.`,
    ],
    howTo: STD_HOWTO('Q1 gaming TWS earbuds', 'Check the colour before adding to cart. Each colour of these earbuds is listed as its own variant with its own price.'),
  },
  {
    productId: 'B0DJH3NWKY', name: 'Safari Spree 30L USB Laptop Backpack',
    price: 749, mrp: 2599, image: IMG('514vaM7C9TL._SL1100_.jpg'),
    description: [
      'At 30 litres, the Safari Spree is the everyday backpack size: big enough for a laptop, a tiffin and a day of books or office papers, and small enough to carry on a crowded bus without knocking into everyone. Safari is a known Indian luggage brand, which counts for more than it seems on a bag that gets used every day.',
      'It has two main compartments, a front pocket with an organiser for pens and cables, and a side bottle holder. There is also a USB port, a pass-through that lets you connect a power bank inside the bag and charge your phone from outside. The power bank is not included, so the port only works with one you already own.',
      'The listing pitches it for school, college, office and travel, and for boys and girls, which is accurate for a plain, clean design. Check the laptop sleeve size against your laptop if it is larger than 15.6 inches.',
      `Live Amazon price is ₹${inr(749)} against an M.R.P. of ₹${inr(2599)} — 71% off, In stock.`,
    ],
    howTo: STD_HOWTO('Safari Spree 30L backpack', 'Pick the colour before adding to cart. Safari prices each colour of the Spree separately, and the figure shown here applies to the variant the page opens on.'),
  },
  {
    productId: 'B0DFYKMR8T', name: 'boAt Lunar Discovery 2026 Edition Bluetooth Calling Smartwatch',
    price: 1199, mrp: 8499, image: IMG('71KjlqIB37L._SL1500_.jpg'),
    description: [
      'The feature that sets the boAt Lunar Discovery apart from other budget smartwatches is turn-by-turn navigation powered by MapMyIndia. Most watches at this price only mirror phone notifications. This one shows routes on the wrist, which is useful for a two-wheeler rider or anyone walking an unfamiliar area.',
      'The screen is a 1.39-inch (3.53cm) TFT display at 240x240 resolution. Bluetooth calling lets you save up to 20 contacts or use the built-in dial pad, and there is an emergency SOS feature. Health tracking covers heart rate, SpO2 and sleep, and the DIY Watch Face Studio lets you make a watch face from your own photos. It is rated IP67 against dust, sweat and splashes, so it is fine for the gym and rain but not for swimming.',
      'Calling and navigation both depend on the watch staying connected to your phone over Bluetooth and on the boAt app running in the background. Allow the app to run in the background after setup, or the watch will quietly drop both features.',
      `Live Amazon price is ₹${inr(1199)} against an M.R.P. of ₹${inr(8499)} — 86% off, In stock.`,
    ],
    howTo: STD_HOWTO('boAt Lunar Discovery smartwatch', 'Check the edition and strap colour before adding to cart. This price is the 2026 Edition — boAt lists the older Lunar Discovery and each strap colour as separate variants at their own prices.'),
  },
  {
    productId: 'B0BYHHSLPC', name: 'TONOR TC777 Pro RGB USB Condenser Microphone with Tripod',
    price: 1699, mrp: 8499, image: IMG('71wJBecMrBL._SL1500_.jpg'),
    description: [
      'A USB condenser mic is the single biggest upgrade for anyone on calls, streaming or recording voice-overs. Even a basic one sounds clearly better than a laptop mic or a headset boom. The TONOR TC777 Pro is plug and play: it connects over USB to a Mac or Windows PC with no driver or audio interface needed.',
      'It uses a cardioid pickup pattern, which captures sound mainly from the front and cuts down on keyboard noise and room echo from the sides and back. Useful controls on the mic include a quick-mute button (the RGB lighting turns red when muted, so you can see at a glance), a gain knob, and a 3.5mm headphone jack for zero-latency monitoring of your own voice.',
      'Position matters more than price with any condenser mic. Keep it about a hand-span from your mouth, slightly off-axis, and turn the gain down rather than up, because too much gain makes a condenser pick up the whole room.',
      `Live Amazon price is ₹${inr(1699)} against an M.R.P. of ₹${inr(8499)} — 80% off, In stock.`,
    ],
    howTo: STD_HOWTO('TONOR TC777 Pro USB microphone', 'Check the model before adding to cart. This price is the TC777 Pro with the tripod stand — TONOR lists the base TC777 and the boom-arm bundles as separate pages at their own prices.'),
  },
  {
    productId: 'B0CYGLTZ6N', name: 'American Tourister Quad 3.0 33.5L School and College Backpack',
    price: 699, mrp: 2300, image: IMG('81WDO3lnHIL._SL1500_.jpg'),
    description: [
      'A 33.5-litre backpack with three compartments is a school and college bag sized for a full timetable: textbooks, notebooks, a lunch box and a water bottle, with space left over. The American Tourister Quad 3.0 is the brand\'s everyday unisex backpack, and at this price it costs about the same as an unbranded bag.',
      'Three separate compartments are what keep books from being crushed by a tiffin. The padded back panel and adjustable shoulder straps matter for anyone carrying a heavy load daily. Tighten both straps so the bag sits high on the back rather than hanging low; a low-hanging bag puts the weight on the lower back.',
      'American Tourister backs it with a one-year global warranty against manufacturing defects, which covers the zips and seams, the two parts that fail first on a school bag. Keep the Amazon invoice for any claim.',
      `Live Amazon price is ₹${inr(699)} against an M.R.P. of ₹${inr(2300)} — 70% off, In stock.`,
    ],
    howTo: STD_HOWTO('American Tourister Quad 3.0 backpack', 'Pick the style and colour before adding to cart. This price is Quad 3.0 Style 01 — American Tourister lists each style and colour as its own variant with its own price.'),
  },
  {
    productId: 'B0CZJFZQ7H', name: 'Focus 4-in-1 60W Metal Braided USB-C Data Cable',
    price: 220, mrp: 2999, image: IMG('71S8kwcszlL._SL1500_.jpg'),
    description: [
      'A 4-in-1 cable replaces the loose mix of cables most bags carry: it has USB-C and USB-A on one end and USB-C and Lightning on the other, which covers an Android phone, an iPhone, an iPad and a USB-C laptop with one cable. The Focus cable is rated for 60W charging with Power Delivery support.',
      '60W is enough for phones, tablets and many thin USB-C laptops, though not for high-wattage gaming laptops that need 100W or more. The metal flat braided jacket is the durability upgrade: a flat braid tangles less than a round rubber cable and survives being wound around a charger far longer.',
      'Take the M.R.P. with a pinch of salt, since cables are among the most inflated M.R.P. categories on Amazon. The meaningful number is ₹220 for a braided 60W multi-head cable, which is a fair price on its own terms. Stock was down to the last unit when we checked.',
      `Live Amazon price is ₹${inr(220)} against an M.R.P. of ₹${inr(2999)} — 93% off, last units in stock.`,
    ],
    howTo: STD_HOWTO('Focus 4-in-1 60W braided cable', 'Check the length and colour before adding to cart. Focus lists each length and colour as its own variant, and stock on this one was down to the last unit when we checked.'),
  },
  {
    productId: 'B07NJPKHTM', name: 'DIY Crafts 20-Piece Magnetic Precision Screwdriver Set with Storage Box',
    price: 98, mrp: 1360, image: IMG('61FkRPtT3LL._SL1100_.jpg'),
    description: [
      'A precision screwdriver set is the tool you do not own until the day you need it, whether that is a toy battery cover, glasses hinges, a remote or a laptop panel. This DIY Crafts set has 20 pen-shaped precision drivers with magnetic tips, in a plastic storage box, and at under ₹100 it is priced as an impulse buy.',
      'Magnetic tips are the feature that makes small-screw work bearable, because the screw sticks to the driver instead of dropping into the carpet. The listing describes rust- and corrosion-resistant tips. The storage box matters as well: it is what stops a 20-piece set from becoming a 12-piece set within a month.',
      'Set expectations to the price. The M.R.P. is inflated, and budget precision tips are softer than branded bits, so use the correct size for each screw and do not force a stripped screw. For household repairs, remotes and eyeglasses it does the job well.',
      `Live Amazon price is ₹${inr(98)} against an M.R.P. of ₹${inr(1360)} — 93% off, In stock.`,
    ],
    howTo: STD_HOWTO('DIY Crafts 20-piece precision screwdriver set', 'Check the design before adding to cart. This price is Design No. 2 with the storage box — DIY Crafts lists other designs and piece counts as separate variants at their own prices.'),
  },
  {
    productId: 'B0B6FGFYVL', name: 'Crompton Dyna Ray 9W LED Bulb, Cool Day Light, Pack of 4',
    price: 210, mrp: 620, image: IMG('71qe+ifc02L._SL1500_.jpg'),
    description: [
      'A four-pack of 9W LED bulbs is the basic household re-stock, and at this price each Crompton bulb works out to about ₹52. That is cheaper than most unbranded bulbs at a local shop, from a brand that has been making lighting in India for decades.',
      'These are 9W, B22 base (the standard Indian bayonet fitting, push and twist) and cool daylight, the bright white light that suits kitchens, study tables and workspaces. Crompton rates them at 105 lumens per watt with a three-star rating, and at 25,000 burning hours, which is years of normal household use.',
      'The spec that matters most in India is surge protection. Crompton lists up to 4kV surge protection and 440V high-voltage protection, and voltage spikes are the most common reason cheap LED bulbs die early. For warm yellow light in a bedroom, choose the warm white variant instead of this one.',
      `Live Amazon price is ₹${inr(210)} against an M.R.P. of ₹${inr(620)} — 66% off, In stock.`,
    ],
    howTo: STD_HOWTO('Crompton Dyna Ray 9W LED bulb 4-pack', 'Check the wattage, colour and pack before adding to cart. This price is the 9W Cool Day Light B22 four-pack — the warm white, other wattages and pack sizes are separate variants at their own prices.'),
  },
  {
    productId: 'B082L91XTJ', name: 'Maybelline New York Sensational Liquid Matte Lipstick, 11 Made Easy',
    price: 180, mrp: 399, image: IMG('51rv9uqXoLL._SL1000_.jpg'),
    description: [
      'The Maybelline Sensational Liquid Matte is one of the most popular drugstore liquid lipsticks in India, and this offer is on shade 11, Made Easy. The formula aims for full-coverage matte colour that is lightweight rather than drying, which is the usual complaint about liquid mattes.',
      'Maybelline describes it as highly pigmented, non-sticky and quick-drying, with an arrow applicator that draws a precise line along the lip edge without needing a separate liner. The tube holds 7ml. It is dermatologically tested and odourless, which matters for anyone sensitive to perfumed lip products.',
      'Every liquid matte lasts longer when applied to a lip that has been lightly moisturised and then blotted, so the colour sits on a smooth surface rather than on dry patches. Remove it with an oil-based or two-phase remover, since plain water barely touches a matte formula.',
      `Live Amazon price is ₹${inr(180)} against an M.R.P. of ₹${inr(399)} — 55% off, In stock.`,
    ],
    howTo: STD_HOWTO('Maybelline Sensational Liquid Matte shade 11', 'Confirm the shade before adding to cart. This price is shade 11 Made Easy — every other shade of the Sensational Liquid Matte is its own variant with its own price.'),
  },
  {
    productId: 'B097GK5B5Z', name: 'Safari Pentagon Pro 8-Wheel Hard Case Trolley Bag, Set of 3',
    price: 4999, mrp: 33997, image: IMG('61MODRSmVpL._SL1500_.jpg'),
    description: [
      'A set of three trolleys covers a whole household\'s travel in one purchase: a cabin bag, a medium check-in and a large check-in that nest inside each other for storage. The Safari Pentagon Pro set at this price works out to under ₹1,700 a bag, which is well below the price of a single branded trolley.',
      'The shells are polypropylene, lightweight and flexible under impact rather than brittle, and each bag rolls on eight 360° spinner wheels. Security is a built-in three-digit combination lock with heavy-duty zips. Safari notes the check-in sizes meet airline standards. Airlines differ on exact dimensions, so check the cabin bag against your carrier\'s limit before relying on it.',
      'The set is made in India and carries a three-year international warranty against manufacturing defects, which is the practical reason to buy a known luggage brand. The M.R.P. is the combined list price of three bags, so it looks large; the real value is the per-bag price.',
      `Live Amazon price is ₹${inr(4999)} against an M.R.P. of ₹${inr(33997)} — 85% off, In stock.`,
    ],
    howTo: STD_HOWTO('Safari Pentagon Pro set of 3', 'Check that the listing is the set of three and choose a colour before adding to cart. Safari sells each size of the Pentagon Pro individually too, at its own price.'),
  },
  {
    productId: 'B0GV4BWJYS', name: "Cruiser Men's Chunky Sole Mesh Running Sneakers",
    price: 975, mrp: 2499, image: IMG('71wYirMXCNL._SL1500_.jpg'),
    description: [
      'Chunky-sole sneakers are the current everyday shoe style: a thick sole that adds some height and cushioning, paired with a light upper that keeps the shoe from feeling like a boot. The Cruiser men\'s pair uses a breathable mesh upper with laces, pitched as a do-everything shoe for walks, the gym, travel and casual wear.',
      'Mesh is the upper to want in Indian weather, because it ventilates far better than synthetic leather and dries quickly after rain. The listing describes the shoe as lightweight despite the chunky sole, which is the balance to check when you wear it for the first time.',
      'Use it as a lifestyle and walking shoe rather than a dedicated running shoe for distance training, which needs purpose-built cushioning and support. Sneaker sizing varies by brand, so compare the listing\'s size chart with the length of a shoe you already own before ordering.',
      `Live Amazon price is ₹${inr(975)} against an M.R.P. of ₹${inr(2499)} — 61% off, In stock.`,
    ],
    howTo: STD_HOWTO("Cruiser men's chunky sole sneakers", 'Pick your size and colour before adding to cart. Cruiser prices each size and colour separately, so the figure applies to the variant you select.'),
  },
];

// Myntra: verified via ld+json (₹1615, InStock) — InRDeals, not Cuelinks.
const MYNTRA = {
  productId: '7dd035527853',
  name: 'GUESS Seductive Noir Fragrance Mist for Women, 125ml',
  price: 1615, mrp: 1900,
  image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2025/DECEMBER/27/9bGjS75j_bbe8e8632676472aa841f3ac25ad4c0c.jpg',
  affiliateUrl: 'https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=https%3A%2F%2Fwww.myntra.com%2Fbody-mist-and-spray%2Fguess%2Fguess-seductive-noir-fragrance-mist-for-women-125ml%2F38999491%2Fbuy',
  description: [
    'A fragrance mist is the lighter, cheaper relative of an eau de parfum. It has a lower concentration of perfume oil, so it is meant to be sprayed generously over the body and hair and topped up during the day, rather than dabbed on pulse points once. GUESS Seductive Noir is the darker, evening-leaning member of the brand\'s Seductive line.',
    'The 125ml bottle is the full-size body-mist format, much larger than a travel spray, and it lasts for months of daily use. Mists suit anyone who finds full-strength perfume too heavy for office wear or Indian heat, since the scent stays close to the skin and does not fill a room.',
    'Expect a few hours of wear rather than a full day, which is normal for a mist and the reason the bottle is big. Spraying onto moisturised skin or clothing, not bare dry skin, noticeably extends how long it lasts. Keep the bottle away from direct sunlight, because heat breaks down fragrance faster than anything else.',
    `Live Myntra price is ₹${inr(1615)} against an M.R.P. of ₹${inr(1900)} — 15% off, In stock.`,
  ],
  howTo: [
    'Tap Grab Deal to open the GUESS Seductive Noir fragrance mist on Myntra at the live price.',
    'Check that the size is 125ml before adding to bag. GUESS lists the other Seductive variants and sizes as separate products on Myntra, each at its own price.',
    'Add to bag and check out. Myntra prices and stock move without notice, and bank or coupon offers at checkout may reduce the price further, so compare the final figure on the checkout page.',
    'Nothing to apply on our side — no code or cashback step is needed for the price shown here.',
  ],
};

// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of [...AMZ, MYNTRA]) {
  const isAmz = d !== MYNTRA;
  const description = d.description.join('\n\n');
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const storeName = isAmz ? 'Amazon' : 'Myntra';
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${storeName}`,
    description, howTo: d.howTo, image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: storeName, productId: d.productId,
    affiliateUrl: isAmz ? `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21` : d.affiliateUrl,
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`no discount ${d.productId}`);
  if (!/^https:\/\/(m\.media-amazon\.com|assets\.myntassets\.com)\//.test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  const pctLine = description.match(/— (\d+)% off/);
  if (!pctLine || Number(pctLine[1]) !== discountPct) throw new Error(`pct line ${d.productId}: ${pctLine?.[1]} vs ${discountPct}`);
  out.push(row);
}
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate productId');
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0924-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
