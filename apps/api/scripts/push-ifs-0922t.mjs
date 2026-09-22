// DEAL-INGEST indiafreestuff tick 2026-09-22t.
// 44 cards discovered -> 39 resolved to a product -> 29 fresh Amazon ASINs after dedup
// vs the live DB -> 22 rows here (21 NEW + 1 ROT FIX).
//
// Every price/MRP below was read off the Amazon PDP itself in a logged-in tab
// (same-origin fetch + DOMParser, regex over the FULL #centerCol innerText — never
// head-sliced, never .a-offscreen). IFS card prices are post-clip-coupon and were
// not trusted for a single row.
//
// Dropped (8), all verified reasons:
//   B0DSC5T75R  ₹249, no list price on the PDP -> no verifiable savings
//   B0BXX2KVFC  ₹809/₹3300 but "Only 1 left in stock." -> quality
//   B07XKXFGX2  price/mrp null, #availability reads P.when("A","load").ex  (apparel /
//   B0GR6RSJ4M  unresolved-variant signature — unverifiable, not a read failure, so
//   B0F4865BRP  no retry)
//   B0GZNRCFMQ  ₹53/₹61 = -13% -> junk discount
//   B0HJBCJK3W  ₹4490, no list price
//   B09YV753WH  ₹699/₹840 = -17% -> below the indexable floor with a short description
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (confirm) => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const kebab = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const slugFor = (name, productId) =>
  `${kebab(name).slice(0, 80).replace(/-+$/, '')}-${productId.toLowerCase()}`;

const deals = [
  {
    productId: 'B0H79YBXPN',
    name: 'ATTRO Prime Linear Deluxe Water Bottle 1.5 L, Set of 2 (Red, Blue)',
    price: 389,
    mrp: 698,
    image: 'https://m.media-amazon.com/images/I/61VHuWpVsaL._SX679_.jpg',
    confirm: 'Confirm the listing reads Set of 2 at 1.5 L each — ATTRO sells the same bottle singly and in a 1 L size at different prices.',
    description:
      'A 1.5 litre bottle is the size that actually removes the refill trip. Most desk bottles hold 750 ml to a litre, which means two or three walks to the cooler across a working day; this one covers the day in a single fill, which is the entire reason for buying big rather than pretty. It comes as a set of two, one red and one blue, so a household can colour-code them instead of arguing about whose is whose, and the second bottle costs nothing extra against the pair price. The body is BPA-free plastic — the specification that matters for a bottle that will sit in a hot car or a gym bag, because BPA is what leaches out of cheap polycarbonate when it warms up. The lid is a flip-top, so it opens one-handed while walking or driving rather than needing a screw cap unthreaded and held. A moulded carry strap is built into the neck, which sounds trivial until a full 1.5 L bottle has to be carried alongside a bag in the same hand. The narrow linear profile fits a standard car door pocket and a cycle cage, unlike most bottles at this capacity, which are wide enough to need a backpack. ₹389 for the pair against a ₹698 list price on Amazon, in stock.',
  },
  {
    productId: 'B0H29RXCD5',
    name: 'PEARLPET Aqualine Stainless Steel Single Wall Water Bottle 700 ml',
    price: 176,
    mrp: 355,
    image: 'https://m.media-amazon.com/images/I/51l-epnu8jL._SX679_.jpg',
    confirm: 'Confirm the listing shows the 700 ml single-wall Aqualine — PEARLPET also sells double-wall vacuum versions of this bottle at a higher price.',
    description:
      'Single-wall stainless steel is the honest choice for a daily water bottle, and it is worth knowing why before buying: it will not keep water cold for twelve hours the way a vacuum flask does, but it weighs a fraction of one, costs a fraction of one, and cannot develop the seal failure that turns a double-wall bottle into a heavy paperweight. What stainless does give you over plastic is a surface that does not hold flavour or smell. Water carried in a plastic bottle for a week starts tasting of the bottle; steel does not, which is the practical difference for anyone who actually drinks from the same bottle every day rather than replacing it. The capacity is 700 ml, which suits a bag side-pocket and a gym rack better than a litre bottle does. The profile is deliberately slim and ergonomic, so it is held in one hand without splaying the fingers, and it clears the cup holders that a wide-bodied flask will not enter. The cap is leak-resistant, and there is a carry loop moulded into it for clipping to a bag rather than burying it inside one. ₹176 against a ₹355 list price on Amazon, in stock.',
  },
  {
    productId: 'B0CRVLVWPJ',
    name: 'PunnkFunnk Q18 Kids Calling Smart Watch with SIM Slot and Camera',
    price: 1349,
    mrp: 4999,
    image: 'https://m.media-amazon.com/images/I/71Z7fbF7QSL._SX679_.jpg',
    confirm: 'Confirm the network before ordering — the listing states Jio and BSNL SIMs are not supported, so it needs an Airtel or Vi nano SIM to make calls.',
    description:
      'A calling watch for a child solves a specific problem: the kid is reachable without being handed a phone and everything that comes with one. This one takes a nano SIM directly, so calls are placed and received from the wrist with no paired handset involved. One thing to check first, because it decides whether the watch works at all — the listing is explicit that Jio and BSNL SIMs are not supported, so the plan has to be Airtel or Vi. Beyond calling, the 1.5-inch HD display carries the usual sensor set: continuous heart-rate tracking across 24 hours, blood-pressure readings, and sleep monitoring, plus built-in games, which is honestly what gets a child to wear it every day. Call alerts and notifications mirror across, and the companion app works with both Android and iOS, so it does not force a parent to change phones. Battery life is quoted at about two days of mixed use, which is realistic for a watch with an active cellular radio and worth knowing so the charger goes in the school bag rather than staying home. Treat the health readings as trend indicators, not medical measurements. ₹1,349 against a ₹4,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B084MJBGRX',
    name: 'Prettykrafts Non-Woven Foldable Saree Cover, Set of 9 (Black)',
    price: 373,
    mrp: 699,
    image: 'https://m.media-amazon.com/images/I/61umhhXxWTL._SX679_.jpg',
    confirm: 'Confirm the quantity reads Set of 9 — the same cover is listed in 3-piece and 6-piece packs at different prices.',
    description:
      'Sarees fail in storage, not in wear. Stacked loose in an almirah they crease along the fold, pick up dust down the exposed edge, and the one you want is always four sarees down the pile. A set of nine covers fixes all three problems at once, and nine is the number that matters — it is enough to cover a working collection rather than the three or six that force you to double up and defeat the point. Each cover measures 40 x 35 x 19.5 cm, which takes several folded sarees without compressing them into a crease, and the non-woven fabric breathes rather than sealing moisture in the way a polythene bag does. There is a clear window on the front panel, so the contents are identified without opening anything — that is the difference between a storage system and nine identical black boxes. A full-length zipper runs around the opening so the cover closes completely against dust, and the whole thing folds flat when empty, so the nine of them store in the space of a magazine between seasons. They stack squarely in a wardrobe shelf or a trunk. ₹373 for the set of 9 against a ₹699 list price on Amazon, in stock.',
  },
  {
    productId: 'B08WC67B4V',
    name: 'HEAD Igniton Pro 3R Badminton Kitbag, Size L (Black and Gold)',
    price: 631,
    mrp: 1100,
    image: 'https://m.media-amazon.com/images/I/61pTcTOm9dL._SX679_.jpg',
    confirm: 'Confirm the size reads L and the colour Black/Gold — HEAD lists smaller Igniton bags and other colourways separately.',
    description:
      'A badminton kitbag is judged on whether it carries a session without anything being left behind, and that comes down to compartments rather than volume. This one is the size L in the Igniton Pro line, with multiple separate compartments so rackets, shoes, shuttles and a change of clothes each get their own space — the shoe section being the one that earns the bag, because loose shoes in a single main cavity is how a grip ends up smelling of court. The shell is polyester, which is the right material choice here for a bag that gets dropped on concrete and left in a car boot: it shrugs off abrasion and does not hold water the way canvas does. The shoulder straps are padded and the back panel is contoured, which matters more than it sounds for a bag carried with two rackets, shoes and a water bottle in it — an unpadded strap on that load cuts into the shoulder within ten minutes. It works as a badminton bag first but takes a squash or tennis frame just as well, and doubles as a gym holdall on non-court days. ₹631 against a ₹1,100 list price on Amazon, in stock.',
  },
  {
    productId: 'B00OCBT7KW',
    name: 'Intex Deluxe Single-High Twin Airbed with Fiber-Tech Construction',
    price: 1280,
    mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/41KmaXM+hmL._SX679_.jpg',
    confirm: 'Note that the pump is sold separately on this listing — confirm you already own a pump, or add one to the order.',
    description:
      'One thing to settle before ordering, because it is the most common complaint on airbeds generally: this listing does not include a pump. If there is no pump in the house already, budget for one alongside. With that out of the way, this is the single-high twin size — 39 x 75 x 10 inches — which is the format that suits a guest room, a floor in a shared flat, or a car boot on a trip, as opposed to the tall double-high beds that need far more air and far more storage space. Inside it uses Intex Fiber-Tech construction: thousands of high-strength polyester fibres bonded between the top and bottom surfaces instead of the old I-beam chambers. The practical result is a flatter sleeping surface that sags less in the middle, and a bed that packs down smaller because the internal structure is fibre rather than moulded plastic. The top is flocked, a soft velvety layer that stops bedsheets sliding off through the night and takes the chill off bare PVC. The 2-in-1 valve has a wide mouth for fast inflation and a double seal against slow leaks. Rated to 300 lb. ₹1,280 against a ₹1,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B0CTMRPJTW',
    name: 'TEXUM TVC-5D 800 W Handheld Vacuum Cleaner, 18 kPa Suction',
    price: 1499,
    mrp: 6999,
    image: 'https://m.media-amazon.com/images/I/61qvSVkOHDL._SX679_.jpg',
    confirm: 'Confirm the model reads TVC-5D at 800 W — TEXUM lists other handheld vacuums in the same range at different power ratings.',
    description:
      'Handheld vacuums are bought for the jobs a full-size machine is too much trouble to drag out for: a car interior, a sofa, a keyboard, the stairs. The two numbers that decide whether one is worth owning are suction and weight, and this one is honest on both — 18 kPa from an 800 W motor, at about 500 grams in the hand. That weight is the real feature. A heavier handheld gets used twice and then lives in a cupboard, because holding a vacuum at arm-length under a car seat is a forearm exercise. Filtration is a washable cloth filter rather than a disposable cartridge, so there is no consumable to reorder — rinse it, dry it, put it back. Worth noting that the listing\'s own spec table claims HEPA while its feature bullets say cloth; the bullets are the ones describing what ships, so treat it as a washable cloth filter and not as a HEPA machine for allergen work. The dust cup holds 1 litre, which is a couple of car interiors between emptyings. Corded, which is the trade being made for 800 W in something this light. ₹1,499 against a ₹6,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B0DPQXGYMP',
    name: 'ANKRI Rechargeable Wireless Bottle Lamp with 3 Colour Temperatures',
    price: 419,
    mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/71wDgw3RtYL._SX679_.jpg',
    confirm: 'Confirm the listing shows the rechargeable cordless version — corded table lamps with a similar body are sold separately.',
    description:
      'A cordless table lamp is worth more than a corded one for a simple reason: it goes where the socket is not. This one runs off an internal rechargeable battery, so it sits on a dining table, a balcony ledge, a bedside without a plug point behind it, or moves outside for an evening and comes back in. The control is the part done right. Three colour temperatures cover the actual use cases — warm for evenings and sleep, neutral for reading, cool for anything that needs to be seen properly — and brightness is a stepless touch dimmer running the full 10 to 100 per cent rather than three fixed steps. It also remembers the last setting, which sounds minor until you have reset a lamp to the same warm dim level every single night. The body is metal with an acrylic diffuser shade, so the light comes out spread rather than as a visible point source, and the metal base gives it enough weight not to topple when a cable or a sleeve catches it. Compact at roughly 11 x 11 x 15 cm, so it takes a corner of a nightstand rather than owning it. ₹419 against a ₹1,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B0GKH31VTF',
    name: 'Kadence K111-V2 Cardioid Dynamic Microphone with On-Off Switch',
    price: 260,
    mrp: 799,
    image: 'https://m.media-amazon.com/images/I/519Rs+tj6AL._SX679_.jpg',
    confirm: 'Confirm the model reads K111-V2 — Kadence lists several similar-looking handheld dynamic mics at different prices.',
    description:
      'For karaoke, a small PA, a classroom or an event announcement, a dynamic microphone is the correct tool and a condenser is the wrong one — and at ₹260 this is the cheapest way to own the correct tool. A dynamic capsule needs no power at all: no batteries, no phantom supply, no USB. Plug it into a mixer, an amplifier or a karaoke speaker and it works, which is why every venue mic in the world is one. The pickup pattern is cardioid, meaning it hears what is in front of it and rejects what is behind it. That is the whole game in a room with a loudspeaker in it, because a mic that hears the speaker it is feeding produces feedback howl; pointing a cardioid away from the speaker is what keeps a karaoke evening listenable. It is a handheld body built for being passed around, with a physical on-off switch on the barrel — a real switch, not a software mute, so a singer can cut their own mic between songs without anyone reaching for the mixer. Note that the listing spec table renders as page script rather than text, so the feature bullets are the reliable description here. ₹260 against a ₹799 list price on Amazon, in stock.',
  },
  {
    productId: 'B0F6BNVW2F',
    name: 'Havells CERA BLDC 1200 mm 5-Star Ceiling Fan with LED Underlight (Slate)',
    price: 6047,
    mrp: 8900,
    image: 'https://m.media-amazon.com/images/I/511toeH3QqL._SX679_.jpg',
    confirm: 'Confirm the colour reads Slate and the sweep 1200 mm — Havells sells the CERA in other finishes at different prices.',
    description:
      'A BLDC ceiling fan is the one household upgrade that pays for itself on the electricity bill rather than in comfort. A conventional induction fan draws roughly 75 watts; a BLDC motor delivers the same air at around a third of that, and Havells rates this one at up to 55 per cent less power consumption, with a 5-star BEE label to back the claim rather than just marketing copy. On a fan that runs eight months a year in most of India, that difference compounds. Air delivery is 225 CMM at a 1200 mm sweep, so the efficiency is not bought by moving less air — that figure is in line with good conventional fans of the same size. The motor is wound with pure copper, which runs cooler and holds its efficiency over years better than aluminium windings do. There is an LED underlight built into the canopy, which is genuinely useful in a room where the fan sits where a light fitting would otherwise go, and it is controlled separately from the fan speed. The Slate finish is a flat dark grey rather than a gloss. BLDC fans also start and stop more quietly than induction ones. ₹6,047 against an ₹8,900 list price on Amazon, in stock.',
  },
  {
    productId: 'B0931LDLPT',
    name: "BATA Women's Velancia Slipper",
    price: 162,
    mrp: 649,
    image: 'https://m.media-amazon.com/images/I/51dv5nOWS9L._SY695_.jpg',
    confirm: 'Check the size chart on the listing before ordering and confirm the Velancia colourway shown — BATA lists this slipper in several colours at different prices.',
    description:
      'This is a straightforward everyday women\'s slipper from BATA, in the Velancia line, at ₹162 against a ₹649 list price — a 75 per cent cut on a household-name brand, which is the whole case for the deal. Being direct about the listing: Amazon carries no feature bullets and no specification table for this product, so there is no published detail on sole material, insole construction or grip pattern to report, and inventing any of it would be worse than saying so. What is on the record is the brand, the line, the category and the price. BATA is the reason that is still enough to be worth buying at this price: it has been making footwear in India since the 1930s, its sizing runs consistently across lines, and its retail network means a bad fit is a solvable problem rather than a loss. The practical advice is therefore about the order rather than the product — open the size chart on the listing and match it against a pair you already own, because a slipper at this price is not worth a return shipment, and confirm the colour shown in the image is the one being added to the cart. In stock on Amazon.',
  },
  {
    productId: 'B0DFQFT8VQ',
    name: 'Sulfar Water Resistant Custom-Fit Car Body Cover for Land Rover Discovery Sport (Dark Grey)',
    price: 946,
    mrp: 2950,
    image: 'https://m.media-amazon.com/images/I/61Z0+d9pCrL._SX679_.jpg',
    confirm: 'Confirm the model listed is the Land Rover Discovery Sport — this cover is cut to that body shape and Sulfar lists separate covers per vehicle.',
    description:
      'A universal car cover is a tarpaulin with elastic at the ends; a custom-cut cover is a different product, and the difference shows within a month. This one is patterned for the Land Rover Discovery Sport specifically, so it follows the roofline and the bumper contours instead of tenting over them — a loose cover flaps in wind, and flapping fabric on paint is a polishing compound. There are dedicated mirror pockets, which is the tell for a genuinely vehicle-specific cut, and they also stop the cover being dragged off centre every time it is fitted. The fabric is water resistant and triple-stitched along the seams, which is where cheap covers fail first: the panels survive and the stitching lets go, usually at the corners. It blocks UV and dust, the two things that actually age a parked car in India — UV fades and chalks clear coat, dust turns into an abrasive the moment anyone wipes the car down dry. An elastic hem pulls it in under the sills so it stays on in wind without needing straps under the car. A carry bag is included, so it stores in the boot rather than loose. Dark grey. ₹946 against a ₹2,950 list price on Amazon, in stock.',
  },
  {
    productId: 'B0FC2M42JY',
    name: 'APFEN 45 W USB-C to USB-C Fast Charging Cable, 1 m (White)',
    price: 287,
    mrp: 1299,
    image: 'https://m.media-amazon.com/images/I/51+FPUuG6oL._SX522_.jpg',
    confirm: 'Confirm the cable is the 45 W USB-C to USB-C, 1 m white variant — the listing also carries other lengths.',
    description:
      'Charging cables are where phone makers quietly cut the box contents, and a 45 W Power Delivery cable is the one worth owning because it is the bottleneck nobody checks. A charger rated at 45 W or higher will negotiate down to 18 W over a cheap cable that cannot carry the current, and the phone charges slowly while both the charger and the cable look fine. This one is rated for the full 45 W PD, so a modern USB-C phone, a tablet, a pair of earbuds and most thin-and-light laptops all charge at the speed their own charger supports. Data runs at 480 Mbps — USB 2.0 speed, which is honest and worth knowing: it is fine for photo transfers, backups and CarPlay or Android Auto, and it is not the cable to buy for moving video off an SSD. The connector housings are reinforced where the cable enters them, which is the only place a charging cable ever dies; strain at that joint is what kills every frayed cable in the drawer. One metre is the useful length for a desk, a car or a power bank in a bag, as opposed to the half-metre that never reaches. ₹287 against a ₹1,299 list price on Amazon, in stock.',
  },
  {
    productId: 'B0D8HCKD5D',
    name: 'JGD PRODUCTS 4-in-1 USB-C Hub with 4 USB-A Ports',
    price: 199,
    mrp: 699,
    image: 'https://m.media-amazon.com/images/I/41MQnMOB1xL._SX679_.jpg',
    confirm: 'Confirm the port layout — this hub is 4 x USB-A only, with no HDMI, card reader or pass-through charging.',
    description:
      'Be clear about what this is before buying, because USB-C hubs vary wildly: it is a straight port multiplier with four USB-A sockets and nothing else — no HDMI, no card reader, no charging pass-through. That narrowness is also why it costs ₹199. What it solves is the laptop with two USB-C ports and a drawer full of USB-A devices: a mouse, a keyboard, a pen drive and a printer cable all plug in at once through a single port. Of the four sockets, one is USB 3.0 rated at 5 Gbps and three are USB 2.0. That split is sensible rather than a shortcut — an external drive or a fast pen drive goes in the 3.0 port and moves a file in a tenth of the time, while a mouse, a keyboard and a dongle neither need nor benefit from more than USB 2.0. The internal wiring is tinned copper, which resists the corrosion that makes a cheap hub go intermittent after a humid season, and there is surge and overload protection built in, so a faulty device on one port does not take the laptop\'s controller with it. Bus-powered, so no adapter to carry. Note the listing spec table renders as page script; the bullets are the reliable source. ₹199 against a ₹699 list price on Amazon, in stock.',
  },
  {
    productId: 'B0BZSTHKW7',
    name: 'Ortho-XR Ayurvedic Pain Relief Hydrogel, 75 g x 2 (150 g Total)',
    price: 399,
    mrp: 530,
    image: 'https://m.media-amazon.com/images/I/61taWGG6OmL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg',
    confirm: 'Confirm the pack reads 75 g x 2 — the single 75 g tube is a separate listing at a different price.',
    description:
      'This is a two-tube pack of Ortho-XR ayurvedic pain relief hydrogel, 75 grams each for 150 grams total, which is the format that makes sense for anything used regularly — one tube at home and one in a bag, or simply not running out mid-week. The formulation is a hydrogel rather than an oil or a balm, and that is the practical difference at the point of use: it is non-sticky and absorbs into the skin instead of sitting on it, so it can be applied before getting dressed or before work without transferring onto clothes and bedding. The gel is a warming formulation, which is the sensation most people are looking for on a stiff joint or a tight muscle, and it is intended for multiple sites — knee, shoulder, lower back, neck, calves — rather than being sold per body part. The listing states it contains no preservatives. Two honest caveats: the product spec table on the page renders as page script rather than readable text, so the feature bullets are the only reliable description; and a topical ayurvedic gel is for everyday aches and stiffness, not a substitute for seeing a doctor about pain that is new, severe or not improving. ₹399 for the 150 g pack against a ₹530 list price on Amazon, in stock.',
  },
  {
    productId: 'B0G4D9XCTK',
    name: 'F Gear Tavero 15 L Premium Laptop Backpack (Green)',
    price: 1609,
    mrp: 5998,
    image: 'https://m.media-amazon.com/images/I/81sW2z1AjxL._SX679_.jpg',
    confirm: 'Confirm the colour reads Green and the capacity 15 L — F Gear lists the Tavero in other colours and sizes at different prices.',
    description:
      'This is the F Gear Tavero in green, a 15 litre laptop backpack, at ₹1,609 against a ₹5,998 list price — a 73 per cent cut, which is the reason it is on this page. Worth being straight about the listing: Amazon carries no feature bullets and no specification table for it, so there is no published word on the fabric, the laptop sleeve size, the water resistance or the warranty, and making any of that up would be worse than admitting it is absent. What the listing does establish is the brand, the model, the capacity and the colour. On capacity: 15 litres is the daypack size, not the travel size. It is the right volume for a laptop, a charger, a notebook and a lunch box on a commute, and the wrong one for a weekend\'s clothes — anyone looking to fly cabin-only wants roughly twice this. F Gear is a long-running Indian bag brand whose backpacks in this price band typically come with a multi-year warranty, so the sensible move is to check the warranty line on the product page itself and read the customer photographs for the laptop-compartment fit before ordering. In stock on Amazon.',
  },
  {
    productId: 'B0GVJ72BJN',
    name: 'USB-C to 3.5 mm Headphone Jack Adapter with Hi-Res DAC',
    price: 298,
    mrp: 2999,
    image: 'https://m.media-amazon.com/images/I/61tcO9DV3XL._SX679_.jpg',
    confirm: 'Confirm your phone is on the compatibility list — this adapter carries its own DAC, which is what makes it work on phones that reject passive dongles.',
    description:
      'Not all USB-C headphone dongles are the same part, and the difference decides whether one works on your phone at all. A passive dongle is just wires: it relies on the phone having an analogue audio path on its USB-C port, and many phones do not, so the dongle stays silent with no error to explain why. This one contains its own digital-to-analogue converter, which means the phone sends it digital audio and the adapter does the conversion itself — that is why it works across iPhone 17, 16 and 15 as well as Samsung, Pixel, OnePlus and Nothing handsets, rather than one family only. Having a real DAC also affects how it sounds. A built-in Hi-Res converter drives wired headphones with more headroom than a phone\'s own shared audio path, which is most audible on higher-impedance over-ear headphones that a bare port struggles to make loud. It is not only for headphones either: the 3.5 mm output feeds a car AUX input or a powered speaker, which is the everyday use for anyone driving a car older than its phone. Small enough to stay on the keyring. ₹298 against a ₹2,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B0BSWJ7GD9',
    name: 'Havells Ambrose 1200 mm Energy Saving Ceiling Fan (Cola Espresso Brown)',
    price: 2195,
    mrp: 3675,
    image: 'https://m.media-amazon.com/images/I/513I-old+qL._SX679_.jpg',
    confirm: 'Confirm the colour reads Cola Espresso Brown at a 1200 mm sweep — Havells lists the Ambrose in several finishes at different prices.',
    description:
      'The Ambrose is Havells\' conventional induction-motor fan rather than a BLDC one, and that is a legitimate choice rather than a compromise: it costs roughly a third of a BLDC fan of the same sweep, it runs on any ordinary regulator without needing a dedicated remote or controller, and there is no electronics module to fail out of warranty. If a fan is going into a room used a few hours a day, the electricity saving on BLDC will not repay the price difference for years; if it runs all day, it will. That is the whole decision. The sweep is 1200 mm, the standard size for a normal Indian bedroom or living room, and the motor is wound with pure copper. Copper windings matter more on an induction fan than on anything else here — they run cooler than aluminium, hold their efficiency as the motor ages, and are the main reason a fan is still moving air properly a decade in. Havells covers it with a two-year warranty. The finish is Cola Espresso Brown, a dark warm brown rather than the usual white or brown-grey, which is the point of buying this model over a base one. Listed dimensions 20.2 x 56 x 31.4 cm boxed. ₹2,195 against a ₹3,675 list price on Amazon, in stock.',
  },
  {
    productId: 'B0FPF9N2PJ',
    name: 'Samsung Galaxy Buds3 FE with ANC and Galaxy AI (Black)',
    price: 10999,
    mrp: 14999,
    image: 'https://m.media-amazon.com/images/I/619sy14HnYL._SX679_.jpg',
    confirm: 'Confirm the model reads Buds3 FE in Black — Samsung sells the standard Buds3 and Buds3 Pro as separate, higher-priced listings.',
    description:
      'The Buds3 FE sits below the Buds3 Pro in Samsung\'s line, and what it keeps from the more expensive models is the part that matters day to day. Active noise cancellation is here, along with Ambient Sound Control, which is the feature that actually gets used: it pipes the outside world through the microphones on demand, so a platform announcement or a conversation does not require pulling an earbud out. Call quality is handled by a six-microphone array, a genuinely high count at this price and the reason voices come through cleanly on a windy street rather than only in a quiet room. The AI integration is Samsung\'s current-generation one — Gemini Quick Access from the buds and Gemini Live conversations, so a question can be asked and answered without touching the phone. Controls are physical gestures on the stems: pinch to play, pause and answer, swipe to change volume, which is far more reliable than tapping a touch surface with a gloved or wet hand. They are rated IP54, meaning dust resistant and protected against water spray, so they survive a workout and a monsoon dash but are not for swimming. ₹10,999 against a ₹14,999 list price on Amazon, in stock.',
  },
  {
    productId: 'B0F79XLMTK',
    name: 'STRIDERS Cocomelon Kids Backpack, 36 cm',
    price: 380,
    mrp: 1199,
    image: 'https://m.media-amazon.com/images/I/71+DtykdfnL._SX679_.jpg',
    confirm: 'Confirm the size reads 36 cm and the print is the Cocomelon one shown — STRIDERS lists other character bags and sizes separately.',
    description:
      'A licensed-character backpack for a small child at ₹380 against a ₹1,199 list price, in the Cocomelon print, from STRIDERS. Straight about the listing first: Amazon carries no feature bullets and no specification table for this product, so there is nothing published on the fabric, the number of compartments, the padding or the water resistance, and inventing those details would be worse than stating their absence. What the listing does fix is the brand, the licence and the size, and the size is the number a parent should actually be checking. At 36 cm tall this is a nursery and pre-primary bag, not a school bag for an older child — it is the right height to sit between a small child\'s shoulders and the base of their spine without the bottom edge hanging below the waist, which is what makes a too-large bag drag and get carried in the hand instead. For a child who knows Cocomelon, the print is the entire reason the bag gets worn rather than abandoned, and that is a real consideration at this age. Check the product images for the compartment layout and read recent customer photographs for a sense of the build before ordering. In stock on Amazon.',
  },
  {
    productId: 'B0BBFJ54J1',
    name: 'Joker & Witch Halo Alloy Analogue Watch for Women',
    price: 987,
    mrp: 6499,
    image: 'https://m.media-amazon.com/images/I/61sVfj7IOYL._SX679_.jpg',
    confirm: 'Confirm the model reads Halo and the strap and dial match the image — Joker & Witch lists several similar alloy analogue watches at different prices.',
    description:
      'The Halo is a women\'s analogue watch from Joker & Witch with an alloy case and strap, at ₹987 against a ₹6,499 list price — an 85 per cent cut, and the largest discount in this batch. Being straight about the source: Amazon carries no feature bullets and no specification table for this listing, so there is no published detail on the movement, the water resistance rating, the case diameter or the warranty, and fabricating any of it would be worse than saying it is missing. What the listing establishes is the brand, the model, the category and the material. Alloy is worth understanding rather than dismissing: it is what most fashion watches at any price use for case and bracelet, it takes plating well, and it is light on the wrist compared with solid steel — the trade is that plating wears through at the clasp and the lug edges over a few years. That places this as a fashion accessory rather than an heirloom, which is what an analogue quartz dress watch at this price is meant to be. Check the case size against the product images before ordering, and treat it as splash-resistant rather than swim-safe unless the page states a rating. In stock on Amazon.',
  },
  {
    // ROT FIX — keeps the EXISTING slug. #7713 has been live and indexed since
    // 2026-08-28 and renaming the URL to chase the current slug convention would
    // cost the page its history. Stored as price 1699 with mrp NULL and
    // discountPct NULL; the PDP reads ₹1,599 / M.R.P. ₹8,500 / -81% / In stock,
    // and the indiafreestuff card independently agreed on ₹1,599.
    productId: 'B0GSW5HKNK',
    name: 'KAMILIANT by American Tourister Selva Cabin Trolley Bag, 56 cm Hard Shell (Peach)',
    slug: 'kamiliant-selva-cabin-trolley-bag',
    price: 1599,
    mrp: 8500,
    image: 'https://m.media-amazon.com/images/I/51q64YYqewL._SX679_.jpg',
    confirm: 'Confirm the size reads 56 cm cabin and the colour Peach — Kamiliant sells the Selva in check-in sizes and other colours at different prices.',
    description:
      'Cabin luggage is a size decision before it is a brand decision, and 56 cm is the number that matters: it is the standard cabin allowance on Indian carriers, so this bag goes into the overhead bin rather than into the hold. Kamiliant is American Tourister\'s value line, which is the reason to look at it at ₹1,599 — the same design language and distribution, at a fraction of the parent brand\'s price. The shell is polypropylene, the material worth having on a hard case: it flexes under impact and springs back where cheaper ABS cracks, and the whole bag still comes in at roughly 2.2 kg, which is weight that stays in the baggage allowance rather than being spent on the case itself. The shell is grooved rather than flat, which is not styling — the ribs stiffen the panels against flexing and hide the scuffs that a smooth gloss shell displays. It rolls on eight 360-degree spinner wheels, so it pushes alongside rather than being dragged behind, and the trolley handle is telescopic with fixed stops. Inside it is split 50:50 with cross-ribbon restraints on one side and a zippered compartment on the other. A combination lock is built into the main zipper. ₹1,599 against an ₹8,500 list price on Amazon, in stock.',
  },
];

for (const d of deals) {
  d.slug ??= slugFor(d.name, d.productId);
  d.storeSlug = 'amazon';
  d.storeName = 'Amazon';
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – Amazon`;
  d.howTo = HOW(d.confirm);
}

// Pre-flight. A hand-typed ₹ in a title that disagrees with the numeric price ships a
// page whose visible copy contradicts its own Product schema.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const LEGACY_SLUGS = new Set(['kamiliant-selva-cabin-trolley-bag']); // pre-date the full-productId rule, indexed
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase()) && !LEGACY_SLUGS.has(d.slug))
    throw new Error(`slug missing productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
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
    await p.deal.update({ where: { id: existing.id }, data });
    if (existing.price !== d.price) await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    updated++; slugs.push(existing.slug);
    console.log('UPD', existing.id, existing.slug, JSON.stringify(before), '->', JSON.stringify({ price: d.price, mrp: d.mrp, pct: d.discountPct }));
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug);
    console.log('NEW', row.id, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
