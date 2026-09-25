// DEAL-INGEST indiafreestuff tick 2026-09-26b
//
// 107 slugs -> 68 new -> 59 candidates -> 6 DB dups -> 43 after dropping coupon / card-offer / min-buy deals.
// Amazon: 39 checked in the logged-in tab, 31 pass; rejected 5 unavailable (B092T5R2Y9, B07HHXGH8J, B0BZC7T884,
// B0F3NS98MT, B0CJR9TWX6) and 3 drift (B0DFBTXSSM 369->870, B0H41MJZYP 797->1499, B0DQXQXL68 559->1390).
// Flipkart: 3 checked via ld+json in a Playwright tab, 3 pass. Myntra 21084086: available:false -> rejected.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0926b.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0926b.json', import.meta.url), 'utf8'));
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
  A('B0G4WD3HYZ', 'Amazon Basics Rabbit Fur 3-Seater Sofa Cover, 350 GSM, Grey', [
    "A sofa cover is the cheapest way to make a tired couch look new again and to shield good upholstery from pets, kids and spilled chai. A soft faux-fur fabric also makes the seat warmer through the winter months.",
    "This Amazon Basics cover is sized for a 3-seater sofa and made from a 350 GSM rabbit-fur-feel fabric in grey. GSM measures fabric weight, and 350 is on the thicker side for a sofa cover, so it drapes rather than slides around.",
    "Measure your sofa's seat width and arm-to-arm length before ordering, because sofa shapes vary a lot and an L-shape or deep recliner may not fit. Plush fabrics collect hair and dust, so shake the cover out weekly and wash it gently on a cold cycle.",
  ], 'Confirm the 3-seater grey option is selected — other sizes and colours are priced differently.'),
  A('B0BYNYRQHR', 'Amazon Basics Magnetic TPU Case for Samsung Galaxy S23 Plus, Sierra Blue', [
    "A case is the first accessory any new phone needs, and paying several hundred rupees for a plain one rarely makes sense. This one costs less than a cup of coffee.",
    "Amazon Basics makes this flexible TPU case for the Samsung Galaxy S23 Plus in Sierra Blue, with a built-in magnetic ring that lets magnetic chargers, mounts and wallets snap onto the back.",
    "It fits only the Galaxy S23 Plus. It will not fit the S23, S23 Ultra or S24 series because the camera cut-outs and sizes differ. TPU yellows slowly with sunlight and skin oils, so expect a coloured case to hold up better than a clear one.",
  ], 'Confirm the Galaxy S23 Plus, Sierra Blue option is selected.'),
  A('B0BSXFXT1G', 'Solimo Steel-Jacketed Glass Jar with Oval Window, 1700 ml, Set of 2', [
    "Glass jars keep atta, rice, dal and snacks fresh without the plastic smell, but a plain glass jar is fragile on a busy kitchen shelf. A steel jacket protects the glass while the window still shows how much is left.",
    "Amazon's Solimo brand sells this as a set of two 1700 ml glass jars, each wrapped in a steel outer body with an oval viewing window.",
    "1700 ml holds roughly 1.2–1.5 kg of rice or dal, depending on the grain. Let the jar dry completely after washing before refilling it with flour or spices, since trapped moisture causes clumping and bugs.",
  ], 'Confirm the 1700 ml, set of 2 option is selected.'),
  A('B0H44SVPZ9', 'Axis Set of 3 PP Trolley Bags (55, 65, 75 cm) with 8 Wheels and Number Lock, Green', [
    "Buying luggage as a set is cheaper than buying one bag at a time, and a family trip usually needs one cabin bag and one or two check-in bags anyway.",
    "This Axis set includes three hard-shell polypropylene trolleys in 55 cm, 65 cm and 75 cm sizes, each with eight wheels and a number lock, in green. The 55 cm bag is the usual cabin size, and the 65 and 75 cm bags are check-in sizes.",
    "Airlines in India limit cabin bags by weight (usually 7 kg) as well as size, so check your airline's rules before relying on the 55 cm bag. Set the lock code before your first trip and write it down somewhere safe. The listed M.R.P. is high, so judge the deal by the price you pay, not the discount.",
  ], 'Confirm the set of 3, green option is selected.'),
  A('B0H1J51MFK', 'boAt EnergyShroom PB300 Neo 10000mAh 22.5W Power Bank, Mocha Brown', [
    "A 10000mAh power bank is the everyday size: it covers one or two full phone charges and still fits in a pocket or sling bag.",
    "The boAt EnergyShroom PB300 Neo supports up to 22.5W fast charging and has three outputs, so it can top up a phone, earbuds and a smartwatch together. This listing is the Mocha Brown colour.",
    "No power bank delivers its full rated capacity, because some energy is lost converting it to USB voltage. Expect about 60–70% in practice. Charging a phone at the full 22.5W needs a compatible phone and cable, and charging several devices at once shares the output between them.",
  ], 'Confirm the Mocha Brown colour is selected.'),
  A('B0D6RPL6GX', 'Boldfit Aluminium Badminton Racket with Cover, Orange', [
    "Badminton is one of the easiest sports to start: a racket, a shuttle and a stretch of terrace or society lawn is enough. A beginner racket does not need to be expensive.",
    "Boldfit's racket has an aluminium frame and comes with a cover, in orange.",
    "Aluminium rackets are heavier and more forgiving than carbon ones, which suits beginners, kids and casual evening games. If you play competitively or several times a week, a lighter carbon-graphite racket is worth the upgrade. Store it in the cover and away from direct heat to protect the strings.",
  ], 'Confirm the single orange racket is selected.'),
  A('B08CKZ972Q', 'Classic Baby Mosquito Net with Cotton Bed for 0-12 Months, Pink Mickey', [
    "Mosquito repellents and coils are not recommended for newborns, so a physical net is the safest way to protect a sleeping baby from bites.",
    "This baby bed comes with a zip-up mosquito net cover and a cotton mattress, sized for babies up to about 12 months. This listing is the pink Mickey print.",
    "Keep the net zipped whenever the baby is inside, and never leave loose pillows or toys in the bed. Check the size against your baby's length, as babies grow out of these beds quickly. Once the baby can sit up or roll strongly, move them to a cot.",
  ], 'Confirm the pink Mickey print is selected.'),
  A('B0H42H48ST', 'Core Set of 2 Trolley Bags (55 + 65 cm), Moss Green and Lunar Yellow', [
    "A cabin bag and a medium check-in bag cover most trips of up to a week, and buying them together costs less than buying them separately.",
    "This Core set pairs a 55 cm cabin trolley with a 65 cm check-in trolley, in moss green and lunar yellow.",
    "Indian airlines usually cap cabin bags at 7 kg as well as by size, so check your airline's rules before a flight. The M.R.P. printed on luggage sets is often inflated, so judge the deal by the price you actually pay.",
  ], 'Confirm the 2-piece moss green and lunar yellow set is selected.'),
  A('B0HBJZ5JTN', 'Dark Cloud 2 L Steel Water Jug with Laser Flower Design', [
    "A steel jug on the dining table keeps water cooler than plastic and does not pick up smells or stains.",
    "This Dark Cloud jug holds 2 litres and is made of steel with a laser-etched flower pattern on the body.",
    "Two litres is enough for a family meal. Steel does not break if dropped, but it can dent. Wash it with a bottle brush and let it dry upside down so water does not collect inside.",
  ], 'Confirm the 2 L option is selected.'),
  A('B09JSL6FR2', 'Flash Ready-to-Pour Acrylic Paint, 500 ml, Metallic Magenta', [
    "Pour painting (fluid art) uses a lot of paint, so the small tubes sold for sketchbook painting run out almost immediately. A 500 ml bottle suits canvases, craft projects and school décor.",
    "Flash's acrylic comes pre-mixed to a pourable consistency in a 500 ml bottle. This is the metallic magenta shade.",
    "Ready-to-pour means you do not need to add pouring medium, but test it on scrap first. Acrylic is water-based while wet and permanent once dry, so cover your work surface and wash brushes before the paint sets.",
  ], 'Confirm the 500 ml metallic magenta option is selected — other shades and sizes are priced differently.'),
  A('B0GV4HBLHM', 'GLUN 50 x 30 mm Direct Thermal Labels, 1 Roll of 200', [
    "Small sellers, pharmacies and kirana stores use thermal labels for barcodes, prices and shipping stickers. A cheap roll is worth keeping in stock.",
    "GLUN's roll has 200 direct thermal labels, each 50 x 30 mm.",
    "Direct thermal labels need no ink or ribbon, but they fade with heat and sunlight over months, so they suit short-term uses like shipping and shelf prices, not permanent asset tags. Check that your printer supports 50 mm width and the roll's core size before ordering.",
  ], 'Confirm the 50 x 30 mm, 1-roll option is selected.'),
  A('B0GNS1F5H8', 'GLUN Zipper Pouch Stationery Kit, Pack of 2', [
    "Loose pens and erasers vanish from school bags. A pair of zip pouches keeps one kit at home and one in the bag.",
    "GLUN sells this as a pack of two zipper pouch stationery kits.",
    "Check the photos and the listing for exactly what is inside each pouch before buying it as a gift, because contents vary between kit versions.",
  ], 'Confirm the pack of 2 option is selected.'),
  A('B0HKGP1BYF', 'GRAPHENE 1:24 RC 4x4 Drift Car with 2.4 GHz Remote and LED Lights', [
    "A remote-control car is still one of the most popular birthday gifts for children, and a drift car adds tricks beyond simply driving forward and back.",
    "This GRAPHENE car is a 1:24 scale 4x4 with a 2.4 GHz remote and LED lights. 2.4 GHz remotes let several cars run in the same room without interfering with each other.",
    "At 1:24 scale this is a small indoor car. It will struggle on grass or gravel, so smooth floors work best. Check the listing for the battery type and charging method before gifting, and keep charging supervised.",
  ], 'Confirm this drift car model is selected.'),
  A('B07NLP4CZR', 'HAZEL Steel Ghee Container, 1000 ml', [
    "Ghee keeps its flavour best in a clean, dry, airtight steel container. It does not absorb smells the way some plastics do, and it looks good on the dining table.",
    "HAZEL's container is steel and holds 1000 ml.",
    "Always use a dry spoon, because a drop of water in ghee leads to spoilage. A 1-litre container suits a family's regular supply. Store it away from the stove so the ghee does not repeatedly melt and set.",
  ], 'Confirm the 1000 ml option is selected.'),
  A('B0F494W9R6', "Highlander Men's Loose Fit Jeans", [
    "Loose and relaxed-fit jeans have replaced skinny cuts for everyday wear. They are easier to move in and more comfortable through a long day.",
    "These are Highlander's men's jeans in a loose fit.",
    "Stock was low when we checked. Loose fits run roomy by design, so pick your usual waist size and use the size chart for the length. Wash dark denim inside out in cold water for the first few washes to limit colour bleed.",
  ], 'Pick your waist size first — this price applies to the listed colour, and sizes were running low when checked.'),
  A('B0D2KFC5DF', 'Joyo Steel Tiffin Box 590 ml with 4-Side Clip Lock, Aqua Green', [
    "A leak-proof steel tiffin is what most office lunches and school dabbas need. It does not stain, smell or crack the way cheap plastic does.",
    "Joyo's box has a 590 ml steel body and a lid with four-side clip locks, in aqua green.",
    "590 ml fits one person's meal of roti-sabzi or rice. The clip lid keeps dry and semi-dry food secure, but keep watery dal in a separate container for the bag ride. Steel cannot go in the microwave, so move food to a microwave-safe bowl to reheat.",
  ], 'Confirm the 590 ml aqua green option is selected.'),
  A('B0C2VRSDHC', 'Kabello Ice-Cream Mini Highlighters, Set of 4', [
    "Novelty stationery is an easy, cheap return gift for kids' birthday parties, and these ice-cream shapes are a hit with school children.",
    "Kabello's set has four mini highlighters shaped like ice-cream cones.",
    "Mini highlighters hold less ink than full-size ones, so they suit occasional use and gifting rather than heavy study sessions. Keep the caps on so the tips do not dry out.",
  ], 'Confirm the set of 4 option is selected.'),
  A('B0H6Q1XHMQ', "London Fog Marylebone Women's Watch LFW20007 with Roman Numerals and Leather Strap", [
    "An analogue watch with a leather strap goes with both office and festive outfits, which is why it remains a popular gift.",
    "London Fog's Marylebone LFW20007 is a women's analogue watch with a Roman-numeral dial, a crystal-studded bezel and a leather strap.",
    "Leather straps do not like water or sweat, so take the watch off before washing hands or exercising. Check the dial size on the listing if you prefer a small or large watch face.",
  ], 'Confirm model LFW20007 is selected.'),
  A('B0DVLJRKQQ', 'Longway Cruiser IC PB 2000W Induction Cooktop with 8 Preset Modes, BIS Certified', [
    "An induction cooktop is a handy backup when the LPG cylinder runs out, and it is useful in hostels and rented rooms where there is no gas connection.",
    "Longway's Cruiser IC PB is rated at 2000W, has eight preset cooking modes and is BIS certified.",
    "Induction only works with magnetic cookware. Test a pan with a fridge magnet, because aluminium and most glass pans will not heat. A 2000W unit needs a proper 15A socket, not an extension board. Keep the vents clear while cooking.",
  ], 'Confirm the Cruiser IC PB 2000W model is selected.'),
  A('B06XYSXSXP', 'Nirlon Non-Stick Aluminium Cookware Set, 3 Pieces', [
    "A basic non-stick set covers most daily cooking, from dosa and omelettes to light sautéing, with less oil than steel.",
    "Nirlon's set has three non-stick aluminium pieces.",
    "Only one set was left when we checked. Use wooden or silicone spatulas, keep the flame low to medium, and never heat an empty non-stick pan. Hand-wash with a soft sponge to make the coating last. Check the listing to see whether the base is induction-compatible.",
  ], 'Confirm the 3-piece set is selected.'),
  A('B0GN8YQGLL', 'Orient Apex-FX HS 1200 mm Ceiling Fan, BEE 1-Star, Brown', [
    "A ceiling fan runs for hours every day through most of the year in India, so its price, air delivery and energy rating all matter.",
    "Orient's Apex-FX HS is a 1200 mm (48-inch) ceiling fan in brown. The listing gives 400 RPM, 210 CMM air delivery and a BEE 1-star rating.",
    "Only one was left when we checked. 1200 mm suits a standard bedroom or a small living room. A 1-star rating means it uses more electricity than a BLDC fan, which matters if the fan runs all day. Installation and a regulator may not be included, so check the listing.",
  ], 'Confirm the brown 1200 mm option is selected.'),
  A('B07CWMNMLS', 'Plantex Steel Bathroom Shelf, 18 Inch, Chrome', [
    "Most Indian bathrooms have no built-in storage, so a wall shelf is the easiest way to get shampoo bottles and soaps off the floor.",
    "Plantex's shelf is 18 inches long and made of steel with a chrome finish.",
    "Only one was left when we checked. Wall shelves need drilling and wall plugs. Check that your tiles can take a drill bit before buying. Wipe it dry now and then, because standing water marks chrome over time.",
  ], 'Confirm the 18-inch chrome option is selected.'),
  A('B0GPQS5RRD', 'Shatras Fabric Conditioner, Pink Lily', [
    "A fabric conditioner makes washed clothes softer and helps reduce wrinkles and static, which is especially useful for towels and cotton.",
    "Shatras sells this fabric conditioner in a Pink Lily fragrance.",
    "Check the pack size on the listing to compare the price per litre with your current brand. Add it only in the rinse cycle or the machine's softener drawer, not with detergent. Use less on towels, because too much conditioner makes them less absorbent.",
  ], 'Confirm the Pink Lily fragrance and pack size are selected.'),
  A('B095YXYVL9', 'Signoraware Storewell Steel Container, 3 L, ModBlue', [
    "A large airtight container keeps rice, atta or sugar fresh and free from insects for weeks.",
    "Signoraware's Storewell container holds 3 litres, has a steel body and comes in the ModBlue colour.",
    "Three litres holds roughly 2–2.5 kg of rice or sugar. Refill only after washing and fully drying the container, because moisture ruins flour and spices. Label the lid so you can tell stored grains apart.",
  ], 'Confirm the 3 L ModBlue option is selected.'),
  A('B0C5HK3C89', 'SIMPARTE Anti-Bacterial Container Set, 6 x 525 ml, Orange', [
    "Matching containers make fridge and pantry storage neater and stack better than a mix of old takeaway boxes.",
    "SIMPARTE's set has six 525 ml containers in orange, which the brand markets as anti-bacterial.",
    "525 ml suits leftovers, cut fruit and spices. Plastic containers can stain from haldi and curries, so wash them promptly. Check the listing before using them in the microwave or dishwasher.",
  ], 'Confirm the 6 x 525 ml orange option is selected.'),
  A('B0CBTVF2WJ', 'SIMPARTE Borosilicate Glass Containers, Set of 3 (370, 670 and 1040 ml)', [
    "Borosilicate glass can go from the fridge to the microwave without the stains and smells that plastic picks up, which makes it a favourite for storing leftovers.",
    "SIMPARTE's set has three borosilicate glass containers of 370 ml, 670 ml and 1040 ml.",
    "Borosilicate handles heat well, but let a container come to room temperature before moving it from the freezer to a hot oven. Lids are usually plastic, so take them off before microwaving.",
  ], 'Confirm the set of 3 option is selected.'),
  A('B08V8TM2JW', 'SIMPARTE Modular Kitchen Container Set of 9, Blue', [
    "A kitchen restock is easier with one matching set of three sizes than with a mix of odd jars.",
    "SIMPARTE's modular set has nine blue containers designed to stack together on a shelf.",
    "Check the capacity of each container on the listing before planning what goes where. Stack them by size to save shelf space, and dry each one fully before refilling.",
  ], 'Confirm the set of 9 blue option is selected.'),
  A('B09M3DKNSM', 'SIMPARTE Plastic Serving Bowls, 12 x 220 ml', [
    "A dozen matching bowls are useful for serving curd, dal or dessert at family meals and small gatherings.",
    "SIMPARTE's set has twelve plastic bowls of 220 ml each.",
    "220 ml is a katori-plus size, which suits dal, curd and dessert. Check the listing before putting them in the microwave, and avoid scrubbers that scratch the surface.",
  ], 'Confirm the pack of 12 option is selected.'),
  A('B0DYTYRMFD', 'UNIGEN Unipad 200 15W Qi Wireless Charger, Pink', [
    "A wireless charging pad on the desk or nightstand means you simply put your phone down to charge, with no cable to plug in.",
    "UNIGEN's Unipad 200 is a Qi wireless charging pad rated up to 15W, in pink.",
    "It only works with phones that support Qi wireless charging. Many budget Android phones do not, so check your phone's specs first. The phone decides how much of the 15W it accepts. Take thick or metal cases off, and use a proper adapter, because a low-watt adapter limits charging speed.",
  ], 'Confirm the pink Unipad 200 is selected.'),
  A('B0FMS798K1', 'USA EternalBlack Gel Eyeliner with Applicator', [
    "Gel liner gives a sharper, bolder line than pencil and lasts longer than most liquid liners through humid Indian weather.",
    "This is USA's EternalBlack gel eyeliner, which comes with its own applicator.",
    "Close the lid tightly after every use, because gel liners dry out quickly once exposed to air. Clean the applicator regularly. Patch-test around the eye area first if you have sensitive eyes.",
  ], 'Confirm the EternalBlack shade is selected.'),
  A('B0FWXT3Y71', 'WARMEO Borofresh Borosilicate Lunch Box, 2 x 325 ml, with Bag', [
    "Glass lunch boxes are popular with office-goers because food can be reheated in the office microwave in the box itself.",
    "WARMEO's Borofresh set has two 325 ml borosilicate glass containers and an insulated carry bag.",
    "325 ml per box suits a sabzi-plus-rice lunch for one. Take the lid off before microwaving. Glass is heavier than steel and can break if dropped, so carry it in the bag.",
  ], 'Confirm the 2 x 325 ml set with bag is selected.'),
  {
    store: 'Flipkart', productId: 'STCHKMHPFMYBPUH6', name: 'ALFA by VIP Rhino 66 cm Hard-Side Check-in Suitcase with 8 Wheels, Blue',
    price: 1376, mrp: 9500, exp: 1376, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/suitcase/h/5/i/-watermarked-original-imahmgv8xen9sb8x.jpeg?q=70',
    affiliateUrl: FK('alfa-vip-rhino-strong-hard-side-luggage-trolley-bag-flushed-combination-lock-check-in-suitcase-8-wheels-26-inch/p/itm030fd0848e8a1', 'STCHKMHPFMYBPUH6'),
    description: [
      "A 66 cm (26-inch) suitcase is the medium check-in size and holds about a week of clothes for one person, which covers most family trips and wedding travel.",
      "ALFA by VIP is VIP Industries' budget line. The Rhino is a hard-side trolley with eight spinner wheels and a flush combination lock, in blue.",
      "Check-in bags on Indian domestic flights are usually limited to 15 kg in economy, and a packed 66 cm bag can go over that, so weigh it before you leave. Set the lock code before your first trip. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm Blue and 66 cm (Medium) are selected — the 55 cm and 76 cm sizes are priced differently.',
  },
  {
    store: 'Flipkart', productId: 'SMWH9RZMBT7B8PFZ', name: 'Fire-Boltt Ninja Talk 1.39-Inch Bluetooth Calling Smartwatch with Metal Body',
    price: 999, mrp: 11999, exp: 999, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/smartwatch/i/n/j/-enriched-transparent-original-imahjkzuypzhdyss.png?q=70',
    affiliateUrl: FK('fire-boltt-ninja-talk-35-3mm-1-39-round-bluetooth-calling-metal-body-120-sports-modes-smartwatch/p/itm7eedef2f3e96f', 'SMWH9RZMBT7B8PFZ'),
    description: [
      "Bluetooth calling lets you take and make calls from your wrist while the phone stays in your pocket or bag, which is handy while driving a scooter or cooking.",
      "Fire-Boltt's Ninja Talk has a 1.39-inch round display, a metal body, Bluetooth calling and 120 sports modes.",
      "Budget smartwatches estimate steps, heart rate and SpO2 and are not medical devices. Calls go through your phone, so keep it within Bluetooth range. Some colour options were out of stock when we checked. The M.R.P. listed is far above the usual selling price, so judge the deal by the price, not the percentage.",
    ],
    variant: 'Pick an in-stock colour — some colour options were sold out when checked.',
  },
  {
    store: 'Flipkart', productId: 'WAPHZTVGPGU4G9JG', name: 'Flipkart SmartBuy PureAura 9 L RO + UV + UF Copper Alkaline Water Purifier',
    price: 4799, mrp: 20000, exp: 4799, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/water-purifier/o/x/f/pureaura-needs-no-service-for-2-years-flipkart-smartbuy-original-imahztvgrcnpyyyf.jpeg?q=70',
    affiliateUrl: FK('flipkart-smartbuy-pureaura-needs-no-service-2-years-9-l-ro-uv-uf-copper-alkaline-zinc-water-purifier/p/itmff23286de4675', 'WAPHZTVGPGU4G9JG'),
    description: [
      "RO purifiers are the default choice in cities where tap or borewell water has high TDS. UV and UF stages add protection against bacteria and fine particles.",
      "Flipkart's SmartBuy PureAura is a 9-litre RO + UV + UF purifier with copper, alkaline and zinc stages. Flipkart advertises it as needing no service for 2 years, and it includes authorised installation.",
      "RO is only needed when your water's TDS is high, roughly above 300–500 ppm. If it is lower, RO removes useful minerals and wastes water. Get the TDS checked first. \"No service for 2 years\" depends on your water quality, so read the warranty terms. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm the PureAura 9 L model is selected.',
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

const file = process.argv[2] ?? 'ifs-0926b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
