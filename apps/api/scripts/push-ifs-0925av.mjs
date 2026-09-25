// DEAL-INGEST indiafreestuff tick 2026-09-25av
//
// homepage 104 cards -> 95 new -> 88 resolved Buy Now -> 1 DB dup (B0BP7GTLM3 = LIVE 686) + 5 rejected upfront
// (pasta sauce grocery, 2 bank-card-only prices, 2 min-qty-2 listings) -> 77 Amazon ASINs checked in the logged-in tab.
// 54 pass (price within ±₹1 of IFS, in stock, below M.R.P.); Clovia babydoll dropped (lingerie, thumbnail-only image) -> 53.
// Price / M.R.P. / image / stock come straight from the PDP read in .playwright-mcp/az0925av.json — never retyped.
// Flipkart (4) + Myntra (1) not verified this tick — skipped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../.playwright-mcp/az0925av.json', import.meta.url), 'utf8'));
if (typeof pdp === 'string') pdp = JSON.parse(pdp);
const byAsin = Object.fromEntries(pdp.map((r) => [r.a, r]));

const HOWTO = (what, variant) => [
  `Tap Grab Deal to open the ${what} on Amazon at the live price.`,
  variant,
  'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
  NO_COUPON,
];
const SAME = 'Confirm this exact variant is selected — other colours, sizes or pack options on the same page are priced differently.';

const A = (productId, name, description, variant = SAME) => {
  const r = byAsin[productId];
  if (!r) throw new Error(`no PDP read ${productId}`);
  const left = r.av.match(/only (\d+) left/i);
  return {
    productId, name, description, variant,
    price: r.p, mrp: r.mrp, exp: r.exp, av: r.av,
    // ponytail: thumbnails (_SX/_SY) upgraded to the full-size _SL1500_ rendition of the same image id
    image: r.img.replace(/\._[^/]+_\.jpg$/, '._SL1500_.jpg'),
    stock: left ? `only ${left[1]} left in stock at this price when checked` : undefined,
  };
};

const DEALS = [
  A('B0CZ9FK4YV', 'Amazon Brand Solimo Iron Gourd Flower Vase, Rust-Resistant Coating, Aqua', [
    "A single vase with dried pampas grass or a couple of money-plant cuttings is the cheapest way to lift a bare side table, bookshelf or entryway. A metal vase also survives a knock from a child or a cat, which a glass or ceramic one will not.",
    "This Solimo vase is Amazon's own brand, shaped like a gourd and finished in aqua. The listing says it is made from a single piece of iron with a rust-resistant coating and an easy-to-clean finish, sized for a table top rather than the floor.",
    "Iron and standing water do not mix for long, even with a coating — for fresh flowers, put a small glass or plastic liner inside and change the water every two days. For dried stems or artificial flowers, simply dust it. Wipe with a dry cloth; avoid scrubbing pads that scratch through the coating.",
  ], 'Confirm the Gourd Vase in Aqua is selected — other shapes and colours on the same page are priced differently.'),
  A('B0CWHB9QVN', 'Amazon Brand Solimo Metal Wall Mounted Planter Stand, Set of 2, Without Pot', [
    "Balcony floors in Indian flats fill up fast once you have more than a few pots. Wall-mounted planter rings move plants up onto the wall, free the floor for a chair or a drying rack, and put trailing plants like pothos at eye level where they look their best.",
    "This Solimo set from Amazon's own brand has two metal wall-mounted stands, sold without pots, and the listing says they work indoors or outdoors. At about ₹148 a stand, it costs less than most single brass-finish planter hooks.",
    "Measure your pots before ordering — the ring decides the pot size, and a pot that sits loose can tip in the wind. On a balcony, use proper wall plugs and screws, not adhesive hooks, because a wet pot of soil is heavy. Put a saucer under each pot so water does not streak the wall below.",
  ], 'Confirm the Set of 2 is selected — other finishes and pack sizes on the same page are priced differently.'),
  A('B0D22XG31W', 'Amazon Brand Solimo Modular Plastic Storage Containers with Lid, 3 L Each, Set of 2, Light Red', [
    "Three-litre containers are the size most kitchens are missing: big enough for a full kilo of atta, rice, sugar or poha, but still easy to lift down from an upper shelf. Two matching tubs also stack, which keeps a cabinet from turning into a pile of half-open packets.",
    "This is Solimo, Amazon's own brand: a set of 2 modular containers of 3 L each in light red. The listing says they are BPA-free, with airtight lids to keep moisture out, and are designed to stack. At this price each container costs about ₹183.",
    "Fill containers completely dry — wash and sun-dry them before the first use, because any water left inside turns flour lumpy. Keep the lid seal clean of spilled flour so it keeps closing tight. Label each tub with its contents and the date you filled it so older stock gets used first.",
  ], 'Confirm the 3 L, Set of 2 option in Light Red is selected — other sizes and colours are priced differently.'),
  A('B08GL2S3LL', 'Amazon Brand Solimo 12-Inch Plastic Wall Clock, Silent Sweep Movement, Black Frame', [
    "A ticking clock is easy to ignore in a busy living room and impossible to ignore in a bedroom at 2 am. A silent sweep movement fixes that — the second hand glides instead of stepping, so there is no tick at all.",
    "This Solimo clock from Amazon's own brand has a 12-inch round black plastic frame and large, clear numerals that are readable from across a room. The listing names it for a living room, bedroom or office, and it runs on a sweep (silent) movement.",
    "Clocks like this usually take one AA cell — use a good alkaline battery and replace it once a year, before it leaks. Hang it on a proper nail or screw, not a sticky hook, and keep it off walls that get direct afternoon sun, which fades the dial over time.",
  ]),
  A('B0FKH2LW8Q', 'American Tourister Nexa Style 01 Casual Backpack, 3 Compartments, Navy', [
    "A daily backpack for college or the office needs to separate a laptop and books from lunch, a water bottle and chargers. Three compartments do exactly that, so you are not digging to the bottom of one big pocket at the metro turnstile.",
    "This American Tourister Nexa Style 01 is a casual backpack in navy with three compartments, a quick-access front pocket and padded back and shoulder straps. The title lists it as 36 L while the feature bullets say 32 L, so check the capacity on the product page if size matters. It carries a 1-year global warranty.",
    "Keep heavy items like a laptop or books in the compartment nearest your back — that keeps the weight close to your spine and eases shoulder strain. Tighten both straps rather than slinging it on one shoulder. Empty it out and air it after monsoon commutes so the lining does not smell.",
  ], 'Confirm the Navy colour is selected — other colours on the same page are priced differently.'),
  A('B0B1V46M5J', 'AMFIN 10-Inch Red Metallic Balloons, Pack of 25 with Ribbon', [
    "Balloons are still the cheapest decoration that makes a room look ready for a birthday, anniversary or small office celebration. Metallic balloons catch the light and look more finished than plain latex, especially in photos.",
    "This AMFIN pack has 25 metallic balloons of 10 inches in red, plus one matching ribbon. At ₹74 for the pack, each balloon costs about ₹3 — cheap enough to cover a full backdrop or a door arch with extras for the ones that burst.",
    "Use a hand pump instead of blowing them up — 25 balloons by mouth takes a long time. Inflate to about 90% so they look round without being stretched to bursting. Keep them away from ceiling fans, direct sun and hot bulbs, and blow them up on the day of the event, because latex balloons shrink overnight.",
  ], 'Confirm the Red, Pack of 25 option is selected — other colours and pack sizes on the same page are priced differently.'),
  A('B0DCBXVB42', 'Ant Esports Ninja Extended Gaming Mouse Pad, Stitched Edges, Non-Slip Base, White', [
    "An extended desk mat does more than a small mouse pad: the keyboard and mouse sit on the same smooth surface, wide arm movements stay on the pad, and the desk underneath is protected from scratches and tea rings.",
    "The Ant Esports Ninja is an extra-large pad measuring 35.4 x 15.74 inches (about 90 x 40 cm) in white. The listing says it has a smooth surface, a non-slip rubber base, stitched edges that stop fraying, and a water-resistant finish.",
    "Measure your desk before ordering — at 90 cm wide, it covers most of a standard study table. Wipe spills straight away with a damp cloth. A white pad will show dust and wrist marks sooner than a black one, so clean it gently every few weeks with mild soap and let it dry flat.",
  ], 'Confirm the White, Extra Large option is selected — other colours and sizes on the same page are priced differently.'),
  A('B08GSPYJBC', 'Athom Living Disney Frozen Kids Bath Towel, 350 GSM, 60 x 120 cm', [
    "Children who fight bath time can often be bribed with a towel that has their favourite character on it. A kid-size towel is also easier for them to wrap themselves in than a heavy adult towel that drags on the floor.",
    "This Athom Living towel carries a Disney Frozen print, measures 60 x 120 cm, and is 350 GSM. The listing describes it as 100% cotton, soft on sensitive skin and quick to absorb, and suitable for bath, pool or beach use.",
    "Wash a new towel once before use to remove loose fibres and set the print. Skip fabric softener, which coats the cotton and makes it absorb less. Dry it fully in the sun between uses so it does not pick up a damp smell in the bathroom.",
  ], 'Confirm the Disney Frozen design is selected — other character prints on the same page are priced differently.'),
  A('B0CYY7CF5Z', 'Baseus Enjoyment Pro 55W Car Charger with Retractable USB-C and Lightning Cables, Black', [
    "Most car-charger clutter is the cable, not the charger — it falls under the seat, tangles in the gear lever or goes missing. A charger with its own retractable cables keeps everything in the socket and pulls out only as much wire as you need.",
    "The Baseus Enjoyment Pro has two retractable cables — one USB-C and one Lightning (the \"C + IP\" in the name) — with 55W total output, split as 30W and 25W across the two. The listing gives input as DC 12–24V, so it suits cars as well as larger vehicles, and the cable is TPE with aluminium-alloy ends.",
    "With 30W on one cable and 25W on the other, both a USB-C Android phone and an iPhone can fast-charge at the same time. Retract the cables slowly rather than letting them snap back, which strains the spring. Unplug it if the car will sit unused for weeks, as some sockets stay live with the ignition off.",
  ], 'Confirm the Cluster Black, USB-C + Lightning version is selected — other versions on the same page are priced differently.'),
  A('B00C8SXUAO', 'Baseus Golden Contactor Pro 40W Dual Car Charger, USB-A + USB-C, Dark Gray', [
    "A dual-port car charger with one USB-C and one USB-A port covers both a new phone and an older cable or a dashcam, which is why this layout is the default recommendation for most cars in India.",
    "The Baseus Golden Contactor Pro is a dual quick charger rated 40W, with one USB-A and one USB-C port, in dark gray. Baseus is a well-known accessory brand, and this model sells at well under a fifth of its listed M.R.P. at this price.",
    "Use the USB-C port with a USB-C to USB-C (or USB-C to Lightning) cable for the fastest phone charging — a USB-A cable cannot carry Power Delivery. Put the dashcam or the passenger's phone on the USB-A port. The product page showed very low stock when checked, so this price may not last.",
  ], 'Confirm the Dark Gray, U+C 40W version is selected — other versions on the same page are priced differently.'),
  A('B09YS16STT', 'Baseus Super Si 25W USB-C Fast Charger, PD and QC, Black', [
    "A 25W USB-C charger covers most phones sold today: it fast-charges an iPhone over Power Delivery and a Samsung at its standard fast-charge rate. Many phones now ship without a charger in the box, which makes a cheap, reliable 25W brick a common buy.",
    "The Baseus Super Si is a single USB-C port charger rated 25W, supporting both PD and Quick Charge, in black. The listing mentions over-current, over-voltage and overheating protection. Note that it comes with an EU-style two-pin plug, not the Indian three-pin type.",
    "An EU two-pin plug fits most Indian 5A two-pin sockets, but the fit can be loose in older or worn sockets — check that it sits firmly. You need a USB-C cable (USB-C to USB-C, or USB-C to Lightning for an iPhone); a USB-A cable will not work in this port. Unplug the charger from the wall when not in use.",
  ], 'Confirm the Black, 25W 1C version is selected — other versions on the same page are priced differently.'),
  A('B0CRXSZ143', 'Belkin BoostCharge Pro 15W Qi2 Magnetic Charging Stand for iPhone, Black', [
    "A magnetic stand turns a phone into a bedside clock or a desk display while it charges, and the magnets line the coil up every time — no more waking up to a phone that sat slightly off the pad all night.",
    "This Belkin stand is Qi2-certified with 15W magnetic wireless charging, compatible with iPhone 12 to 16 series, AirPods and other MagSafe-compatible devices. It works upright or folded flat, adjusts from 0° to 70° with a 0° to 75° viewing angle, and folds for travel.",
    "Qi2 and MagSafe reach 15W only with a suitable power adapter — the listing notes charging behaviour depends on the adapter, so use a good USB-C PD brick. Remove thick or non-magnetic cases, which weaken the hold and slow charging. At under a third of M.R.P., it is one of the cheaper ways to get a Belkin Qi2 stand.",
  ], 'Confirm the Black stand is selected — other colours and models on the same page are priced differently.'),
  A('B0F23YDPN8', 'Boldfit High Waist Gym Leggings for Women, Yoga and Workout Tights', [
    "Gym leggings take more wear than everyday clothes — squats, stretches and sweat all test the fabric. A high waist that stays up during movement, and fabric that is not see-through when you bend, matter more than the colour.",
    "Boldfit is an Indian fitness brand, and these are its high-waist gym tights for women, listed for yoga, gym and general workouts. At ₹497, they sit at the lower end of branded activewear pricing.",
    "Check the size chart against your waist and hip measurements, not your jeans size — compression tights are meant to fit snugly. Do the \"squat test\" in front of a mirror when they arrive to make sure the fabric is opaque. Wash inside out in cold water and skip the dryer to keep the stretch.",
  ], 'Pick your size and colour on the product page — this price may apply only to some sizes and colours.'),
  A('B01GCTAI3G', 'BRUSTRO Artists 25% Cotton Watercolour Paper, 300 GSM, A5, Cold Pressed, 48 Sheets', [
    "Cheap watercolour paper is the most common reason beginners give up — it buckles, pills and refuses to blend. Moving up to 300 GSM paper with some cotton content makes washes behave, and the difference shows from the first painting.",
    "This BRUSTRO pack has 48 A5 sheets of 300 GSM cold-pressed paper with 25% cotton. The listing names it for watercolour, gouache, acrylic, ink, charcoal and graphite. At ₹225, each sheet costs under ₹5, cheap enough for daily practice.",
    "Cold-pressed paper has a slight tooth that holds pigment and suits most styles. Tape the edges to a board before heavy washes to keep the sheet flat as it dries. A5 is sketchbook size — good for studies, postcards and travel painting, less so for large compositions.",
  ], 'Confirm the A5, Pack of 48 option is selected — other sizes and pack counts on the same page are priced differently.'),
  A('B0H4V8LPWH', 'Crompton Arno Neo 5.9 Litre Instant Water Heater, 3 kW, SS Tank', [
    "An instant water heater suits a kitchen sink or a small bathroom where you need hot water for a few minutes, not a full bucket bath. It heats a small tank quickly, so there is less waiting than with a big storage geyser.",
    "The Crompton Arno Neo has a 5.9-litre food-grade stainless-steel tank and a 3 kW heating element. The listing gives a 6 bar pressure rating for high-rise flats and pressure pumps, three levels of safety (thermal cut-out, pressure release valve, shockproof body) and a 5-year tank warranty.",
    "A 3 kW heater needs a proper 16A socket with earthing — not an extension board. At 5.9 litres, it gives a short stream of hot water, so it is best for a wash basin, kitchen or a quick shower rather than a family's back-to-back baths. Get it installed with the pressure valve fitted, and descale it yearly in hard-water areas.",
  ], 'Confirm the 5.9 Litre model is selected — other capacities on the same page are priced differently.'),
  A('B07QMZMK9J', 'DANIEL KLEIN Leather Analog Multicolour Dial Men\'s Watch DK12013-2', [
    "An analog watch with a leather strap is the easiest way to dress up office wear or a kurta for a function, and a colourful dial keeps it from looking like every other black-and-silver watch.",
    "This is the DANIEL KLEIN DK12013-2 men's analog watch with a multicolour dial on a leather strap. At ₹1,147 against a ₹4,250 M.R.P., it is 73% off, and the product page showed very low stock at this price when checked.",
    "Leather straps do not like water or sweat — take the watch off before washing hands or exercising, and let the strap air out after a hot day. Check the dial size in the product images if you have thin wrists. When the battery runs out, get it changed at a watch shop so the case seal is refitted properly.",
  ], 'Confirm model DK12013-2 is selected — other models on the same page are priced differently.'),
  A('B0CPHCVV85', 'Disney Princess Ariel\'s Rolling Chariot with Ariel Doll and Sebastian Figure', [
    "A doll with a vehicle gives children more to do than a doll on its own — they can push it around, load it up and act out a story. That is why sets like this tend to get played with longer than a single figure.",
    "This Disney Princess set, inspired by The Little Mermaid, includes a posable Ariel fashion doll with a removable soft tail and brushable hair, a rolling chariot with a clip to hold her, and Sebastian, who attaches to the chariot in two places. When the chariot is pushed forward, the seahorse moves up and down.",
    "Check the age recommendation on the product page before buying, since small parts like Sebastian are easy to lose or put in a mouth. Brush the doll's hair gently with a wide-tooth comb to avoid tangles. At 72% off M.R.P., it makes a reasonably priced birthday or Diwali gift.",
  ]),
  A('B0DH288S2P', 'Energizer 2-in-1 15W Magnetic Wireless Charging Car Vent Mount ECA002', [
    "Navigation drains a phone faster than almost anything else. A vent mount that also charges wirelessly holds the phone at eye level and keeps it topped up — no cable to plug in every time you get into the car.",
    "The Energizer ECA002 combines a car vent phone holder with a 15W magnetic wireless charger. The listing says strong magnets align MagSafe iPhones and other compatible phones, it clips onto the air vent, and it rotates 360° for portrait or landscape viewing.",
    "Non-MagSafe Android phones usually need a magnetic ring or a MagSafe-compatible case to hold on. Wireless charging needs a car USB charger with enough power behind it — plug the mount into a good fast car charger. With the AC on, the vent keeps the phone cool, which helps it charge faster.",
  ]),
  A('B08ZM4F3B6', 'Energizer WCP-105 15W Wireless Charging Pad, Non-Slip, Qi Compatible', [
    "A charging pad on a bedside table or desk means you just set the phone down — no fumbling with a cable in the dark, and less wear on the phone's charging port over the years.",
    "The Energizer WCP-105 is a slim Qi wireless charging pad with a non-slip surface and an LED charging indicator. The listing gives 7.5W for iPhone, 10W for Android phones, and up to 15W for supported Samsung, Huawei and LG models.",
    "Place the phone centred on the pad — an off-centre phone charges slowly or not at all. Thick or metal cases, and pop-sockets, block wireless charging. Use a good wall adapter; the pad cannot give its top speed from an old 5W brick.",
  ]),
  A('B0GF3BGZV8', 'Fargo Matrix Vegan Leather Tote Bag for Women with 15-Inch Laptop Compartment', [
    "A tote that carries a laptop saves women commuting to work or college from carrying a separate laptop bag. The key detail is a padded laptop section, so the laptop is not banging against keys and a water bottle.",
    "The Fargo Matrix is a vegan-leather tote with a compartment for laptops up to 15 inches and a zip closure. The listing says it is made in India and names it for office, college and daily use.",
    "Measure your laptop before buying — some \"15-inch\" laptops are 15.6-inch and may not fit a 15-inch sleeve. Vegan leather wipes clean with a damp cloth, but keep it away from direct heat. Do not overload one shoulder strap — a laptop plus lunch is heavy.",
  ], 'Confirm the colour you want is selected — other colours on the same page are priced differently.'),
  A('B0FVY2FGN6', 'GLUN Multipurpose Metal Book and Laptop Stand, Ergonomic Riser', [
    "Working on a laptop flat on a desk means looking down for hours, which is where most neck and shoulder pain comes from. Raising the screen closer to eye level is the cheapest ergonomic fix there is.",
    "The GLUN stand works for books, laptops and tablets. The listing describes a metal build with non-slip pads that keep the device steady and protect the desk. The title says matte black while the bullets mention a matt silver finish, so check the colour in the product images.",
    "With the laptop raised, use an external keyboard and mouse so your wrists are not bent upward. As a book stand, it holds a recipe book in the kitchen or a textbook while you take notes. The product page showed very low stock at this price when checked.",
  ]),
  A('B09P385YZC', 'GOVO GOKIXX 421 Bluetooth Neckband Earphones with Mic, 10H Battery, Platinum Black', [
    "A neckband is still the most practical wireless earphone for commuters — the earbuds hang around your neck instead of going into a case, so they are harder to lose in a metro or a bus.",
    "The GOVO GOKIXX 421 has 10mm drivers tuned for bass, Bluetooth 5.0 with about 10 m range, up to 10 hours of playback, magnetic earbuds and in-line controls with a mic. The listing gives IPX5 sweat and splash resistance.",
    "Snap the magnetic earbuds together when not in use — on many neckbands this pauses playback and saves battery. IPX5 covers sweat and light rain, not a swim or shower. At ₹339, it is priced for a backup or gym pair.",
  ], 'Confirm the Platinum Black colour is selected — other colours on the same page are priced differently.'),
  A('B0F7R2K5NV', 'Homeor 2-Tier Metal Fruit and Vegetable Basket, Countertop Organizer, Chrome', [
    "Onions, potatoes and fruit kept in plastic bags sweat and rot faster. A two-tier open wire basket lets air circulate, keeps them in view so nothing gets forgotten, and uses vertical space on a crowded kitchen counter.",
    "This Homeor basket has two tiers in a chrome finish. The listing says it is made from stainless steel that resists rust, stands on its own with no installation, and can also hold bread, small household items or office supplies.",
    "Keep onions and potatoes on separate tiers — onions release gases that make potatoes sprout faster. Wipe the wire with a dry cloth after washing so water spots do not form. Keep it away from the stove, where oil splashes build up on the wire.",
  ]),
  A('B0F74JQD4Y', 'Homeor Manual Hand Press Juicer with Steel Handle and Vacuum Base, Blue', [
    "Fresh lime, orange or mosambi juice without dragging out an electric juicer and then washing all its parts — a hand-press juicer does a glass in about a minute.",
    "The Homeor juicer is a manual hand press in blue with a stainless-steel handle and a masher to push fruit down. The listing says it is BPA-free and food grade, has a vacuum-fitted non-slip base that keeps it steady, has no sharp edges, and comes apart for hand washing.",
    "Cut citrus into halves or quarters before pressing — whole fruit will not fit. Press the base firmly onto a smooth, clean counter so the suction holds. Rinse it straight after use; dried pulp in the strainer takes much longer to clean.",
  ], 'Confirm the Blue colour is selected — other colours on the same page are priced differently.'),
  A('B0HHPKFH7M', 'HRX Helium 2-Piece Polypropylene Hard Shell Luggage Set, 8 Spinner Wheels, Canes Grey', [
    "Buying a cabin bag and a check-in bag as a set usually costs less than buying them one at a time, and they nest inside each other at home to save cupboard space.",
    "This HRX Helium set has two hard-shell suitcases in canes grey, made from polypropylene that the listing says flexes on impact and springs back. They have eight double spinner wheels, a built-in number lock, a water-resistant body, a multi-stage telescopic handle and a cushioned top handle.",
    "Check the airline's cabin size limits against the smaller bag's dimensions before your first flight. Set your own lock code as soon as it arrives. At ₹3,299 against a ₹20,999 M.R.P., the listed discount is 84% — check reviews for wheel durability before relying on it for long trips.",
  ], 'Confirm the Canes Grey, 2-Piece set is selected — other colours and sets on the same page are priced differently.'),
  A('B0HHPR1CST', 'HRX Helium Cabin Size Polypropylene Hard Shell Suitcase, 8 Spinner Wheels, Haileys Black', [
    "A cabin-size trolley is enough for a 2–3 day trip or a work visit, and it skips the baggage belt entirely — land and walk out.",
    "This HRX Helium cabin suitcase in black is made of polypropylene that the listing says is lightweight and flexes rather than cracks on impact. It has eight dual spinner wheels, an integrated number lock, a water-resistant body and a telescopic trolley handle.",
    "Domestic airlines in India usually allow 7 kg in the cabin — weigh the packed bag before leaving. Check the bag's dimensions against your airline's limit. Set your lock code when it arrives and write it down somewhere other than the bag.",
  ], 'Confirm the Cabin size in Haileys Black is selected — other sizes and colours on the same page are priced differently.'),
  A('B0HHPYFWXW', 'HRX Kyoto 2-Piece Polypropylene Hard Shell Luggage Set, 8 Spinner Wheels, Light Blue', [
    "A matched cabin and check-in pair covers most family trips, and the two bags nest inside each other in storage.",
    "The HRX Kyoto set has two light-blue hard-shell suitcases in polypropylene, which the listing says flexes under pressure and bounces back. They have eight silent double spinner wheels, a flush number lock, a water-resistant body and a telescopic handle with a cushioned top grip.",
    "Light colours show scuffs from baggage handling sooner — a cheap stretch luggage cover keeps them clean. Check the larger bag's size against your airline's check-in rules. At ₹3,299, this is the same price as the HRX Helium 2-piece set in this batch, so pick by colour and shell style.",
  ], 'Confirm the Light Blue, 2-Piece set is selected — other colours and sets on the same page are priced differently.'),
  A('B0HHPQX1PG', 'HRX Kyoto Cabin Size Polypropylene Hard Shell Suitcase, 8 Spinner Wheels, White', [
    "A hard-shell cabin trolley protects a laptop and a few days' clothes better than a soft duffel, and eight wheels let it glide beside you instead of being dragged.",
    "This HRX Kyoto cabin suitcase in white is made of polypropylene, with an 8-wheel 360° spinner system, a multi-dial combination lock built into the shell, a water-resistant body and a telescopic handle, according to the listing.",
    "White hard-shell luggage scuffs easily — a luggage cover, or a wipe with a damp cloth after each trip, keeps it looking new. Weigh it packed; most Indian domestic airlines allow 7 kg in the cabin. Set the lock code on arrival.",
  ], 'Confirm the Cabin size in White is selected — other sizes and colours on the same page are priced differently.'),
  A('B0HHQ547XP', 'HRX Kyoto Medium Size Polypropylene Hard Shell Suitcase, 8 Spinner Wheels, Light Blue', [
    "A medium check-in suitcase is the most used size for a week-long holiday or a trip home for the festivals — big enough for a week's clothes, not so big that it goes over the airline weight limit.",
    "This HRX Kyoto medium suitcase in light blue is polypropylene, with eight 360° spinner wheels, a multi-dial combination lock built into the shell, a water-resistant body and a telescopic handle, per the listing.",
    "Weigh it once packed — economy check-in on domestic flights is often 15 kg, which a medium bag can pass. Set your lock code on arrival. A luggage strap or a coloured tag helps you spot it on the belt, since many suitcases look alike.",
  ], 'Confirm the Medium size in Light Blue is selected — other sizes and colours on the same page are priced differently.'),
  A('B0HHPBQ1QH', 'HRX Parabola 3-Piece Polypropylene Hard Shell Luggage Set, 8 Spinner Wheels, Light Blue', [
    "A three-piece set covers every trip — cabin for weekends, medium for a week, large for long holidays or moving — and the bags nest together so they take the space of one in storage.",
    "The HRX Parabola set has three light-blue polypropylene hard-shell suitcases, each with eight 360° spinner wheels, a built-in multi-dial lock, a water-resistant body and a telescopic handle, according to the listing.",
    "Check the cabin bag's dimensions against your airline's limit before flying. Set the lock codes when the set arrives. At ₹3,599 for three bags against a ₹34,999 M.R.P., the listed discount is 90% — at about ₹1,200 a bag, check reviews for wheel and zip durability.",
  ], 'Confirm the Light Blue, 3-Piece set is selected — other colours and sets on the same page are priced differently.'),
  A('B0HHQ1V3B8', 'HRX Parabola Cabin Size Polypropylene Hard Shell Suitcase, 8 Spinner Wheels, Grey', [
    "A cabin trolley is the one suitcase most people use the most — weekend trips, work travel and train journeys where you keep the bag at your berth.",
    "This HRX Parabola cabin suitcase in grey is made of polypropylene, with eight dual spinner wheels, an integrated number lock, a water-resistant body and a telescopic trolley handle, per the listing. It is the cheapest HRX cabin bag in this batch at ₹1,099.",
    "Grey hides scuffs better than white or light blue, which matters for a bag that goes under train berths and into overhead lockers. Weigh it packed — Indian domestic cabin allowance is usually 7 kg. Set your lock code on arrival.",
  ], 'Confirm the Cabin size in grey is selected — other sizes and colours on the same page are priced differently.'),
  A('B07VHDVFN2', 'JOYROOM JR-E208 Wired Earphones with Metal Earbuds and Inline Remote, Blue', [
    "Wired earphones still have their place — no battery to charge, no Bluetooth lag in games, and they work on flights and old laptops with a 3.5 mm jack.",
    "The JOYROOM JR-E208 has metal earbuds, a leather-finish stranded wire and an inline remote to answer or end calls and play or pause music. The listing highlights an ergonomic anti-fall fit. It comes in blue.",
    "Check your phone has a 3.5 mm headphone jack — many new phones do not, and would need a USB-C adapter. Wrap the cable loosely when storing to avoid breaks near the plug. The product page showed very low stock at this price when checked.",
  ], 'Confirm the Blue colour is selected — other colours on the same page are priced differently.'),
  A('B0CLRNT5D3', 'K&F Concept NP-FZ100 Dual Battery Charger with LCD for Sony Alpha Cameras', [
    "Sony mirrorless shooters go through NP-FZ100 batteries quickly on long shoots and travel days. A dual charger tops up two spares at once, often while the camera is also in use.",
    "This K&F Concept charger takes two NP-FZ100 batteries, with an LCD showing a 4-level charge bar for each. It charges via USB-C or Micro USB, so a laptop, power bank or car USB adapter can power it. The listing names compatibility with Sony A7 III, A7 IV, A7R III, A7R IV, A7C, A7C II, FX30, A6700, A6600, A9, A1, ZV-E1 and ZV-E10 II.",
    "Use a USB adapter of at least 5V/2.1A for normal charging speed. Charging from a power bank on location saves carrying a wall adapter. The product page showed very low stock at this price when checked.",
  ]),
  A('B0BY2C934P', 'KINGSWAY SilverTech Waterproof Car Cover for BYD Atto 3 (2022 Onwards)', [
    "A car parked in the open in India faces sun, bird droppings, dust and monsoon rain. A fitted cover protects the paint and keeps the interior cooler, which matters a lot for an EV parked outside all day.",
    "This KINGSWAY cover is made only for the BYD Atto 3 (2022 onwards, all variants). The listing says it is waterproof and dustproof with a soft cotton inner lining to prevent scratches, and has mirror and antenna pockets for a snug fit.",
    "This fits only the BYD Atto 3 — it will not fit other cars. Put the cover on only once the car is clean and dry, or grit under it will scratch the paint. Let the bonnet cool before covering after a long drive, and remove it every few days in humid weather so moisture is not trapped.",
  ]),
  A('B0H3638HD9', 'Large Capacity Textured Tote Handbag for Women, Office and College Shoulder Bag', [
    "A big tote is the everyday bag that swallows a lunch box, a water bottle, a diary and a charger without a second bag. Textured surfaces also hide scratches better than smooth leather.",
    "This is a large-capacity textured tote shoulder bag for women, listed for office, college, shopping and daily use. At ₹284, it is a low-risk buy for a spare everyday bag.",
    "Check the product images for inner pockets and the closure type, since loose items slide around in an open tote. Do not overload one shoulder — keep heavy items like a laptop to a bag with proper padding. Wipe with a dry cloth and store it stuffed with paper so it keeps its shape.",
  ], 'Confirm the colour you want is selected — other colours on the same page are priced differently.'),
  A('B0FJM3BVRK', 'Lenovo 700 Multi-Device Wireless Silent Mouse, Bluetooth 5.3 and 2.4 GHz, Seashell', [
    "A silent mouse is a small upgrade that matters in shared offices, libraries and when someone is sleeping nearby — no clicking noise at all. Multi-device pairing also lets one mouse switch between a laptop, a desktop and a tablet.",
    "The Lenovo 700 pairs with up to three devices over Bluetooth 5.3 or the included 2.4 GHz receiver, with silent clicks, programmable buttons and a dynamic scroll wheel. The listing claims up to 36 months of battery life, sensitivity up to 4000 DPI and button life of up to 5 million clicks. It comes in seashell.",
    "Use the 2.4 GHz receiver for a desktop and Bluetooth for a laptop, so you save a USB port. Lower the DPI in settings if the pointer feels too fast. At less than half its M.R.P., it is priced close to basic office mice.",
  ], 'Confirm the Seashell colour is selected — other colours on the same page are priced differently.'),
  A('B0GKGM7VHR', 'London Fog Regent Collection Men\'s Analog Quartz Watch, Stainless Steel Strap', [
    "A steel-strap analog watch is a safe everyday choice: it goes with office wear and casual clothes, does not soak up sweat like leather, and lasts for years with only a battery change.",
    "The London Fog Regent is a men's quartz analog watch with a round dial, stainless-steel strap and metal case. The listing mentions a date display, luminous hands and hour markers, and water resistance.",
    "Water-resistant usually means splashes and rain, not swimming — check the rating on the product page. Get the strap sized at a watch shop; removing links needs a small tool. At 53% off M.R.P., it is a reasonable gift for Diwali or a birthday.",
  ], 'Confirm the dial colour you want is selected — other colours on the same page are priced differently.'),
  A('B0FFZLH3B8', 'Mobilla MCharge Aero 15W Wireless Charger with Built-In Fan, Black', [
    "Wireless charging produces heat, and a warm phone slows its own charging. A charger with a built-in fan keeps both cool, and on a hot Indian afternoon the fan also blows a little air at you.",
    "The Mobilla MCharge Aero is a 15W wireless charger for phones and earbuds with a built-in cooling fan, adjustable fan speed and a flexible neck to angle both the charger and the fan, according to the listing.",
    "Place the phone centred on the charging pad and remove thick or metal cases. Use a good USB adapter to get the full 15W. The fan is a desk-fan style breeze, not an air cooler — think of it as a bedside or study-table gadget.",
  ]),
  A('B09B4PQD1W', 'Murphy 7W PHOCUS LED Spot Round Panel Light, Warm White, Pack of 2', [
    "Spot lights are how false ceilings get their warm, layered look — they light a painting, a mandir corner or a kitchen counter instead of flooding the whole room.",
    "This Murphy PHOCUS pack has two 7W round spot lights in warm white, for concealed or junction-box ceiling fitting. The listing says each gives up to 700 lumens, is flicker-free and BIS-approved, has surge protection up to 4 kV, and comes with a 2-year warranty.",
    "Check the cut-out size needed for the false ceiling before ordering. Warm white suits bedrooms and living rooms; pick cool white for a study or kitchen. At ₹293 for two, each light costs under ₹150 — get an electrician to fit them.",
  ], 'Confirm Warm White, Pack of 2 is selected — other colours and pack sizes on the same page are priced differently.'),
  A('B0BQMYW3SQ', 'Nisha Nature Mate Natural Brown Henna Based Hair Colour, Ammonia Free, 10 g x 10', [
    "Sachet hair colour is the simplest way to cover greys at home — pre-measured, no leftover mix, and cheap enough to use every few weeks.",
    "Nisha Nature Mate is a henna-based hair colour in natural brown, ammonia-free with no resorcinol, per the listing. This pack has 10 sachets of 10 g each, so at ₹78 each application costs under ₹8.",
    "Do a patch test behind the ear 48 hours before the first use, even with henna-based colour. Apply on clean, dry, oil-free hair and wear gloves. Results depend on how grey your hair is — natural brown shows best on up to moderate greys.",
  ], 'Confirm Natural Brown, 10 g x 10 packs is selected — other shades and pack sizes on the same page are priced differently.'),
  A('B0DHH7WZVZ', 'Promate MagHalo Portable MagSafe LED Selfie Light with 3 Lighting Modes', [
    "Front-camera video calls and reels look much better with a light facing you. A clip-on light that snaps to the back of the phone means no ring light stand to set up.",
    "The Promate MagHalo is a MagSafe-compatible ring light with a 300 mAh battery, three lighting modes, intensity control and a 180° flip to aim the light. It comes with a 20 cm charging cable, per the listing.",
    "MagSafe attachment works directly on iPhone 12 and later; other phones need a magnetic ring or MagSafe case. A 300 mAh battery is small, so charge it before a shoot. Point it slightly above eye level for the most flattering light.",
  ]),
  A('B0FK2YMWQR', 'Puma Unisex Adult Ferrari Race X-Ray 2 Sneaker', [
    "The Puma X-Ray is a chunky retro running-style sneaker, and the Ferrari Race version adds the Scuderia badging for motorsport fans. It is a casual shoe, not a running shoe.",
    "This listing is the Puma Ferrari Race X-Ray 2 unisex sneaker. At ₹2,700 against an ₹8,999 M.R.P., it is 70% off, and the product page showed very low stock at this price when checked.",
    "Price and stock differ by size — pick your size on the product page first and confirm the price stays at ₹2,700. Puma sizing is usually true to UK size. Clean with a soft brush and damp cloth, not the washing machine.",
  ], 'Pick your size on the product page — this price may apply only to some sizes.'),
  A('B0FDR84NGV', 'Rise For Men Beard Touch-Up Wax, Instant Grey Beard Colour with Argan Oil', [
    "A few grey hairs in the beard are easy to cover for a day without committing to a full beard dye. A touch-up wax colours them in minutes and washes out.",
    "The Rise For Men beard touch-up wax covers grey beard hair instantly, per the listing, with argan oil for smoother application, a smudge- and water-resistant formula and up to 12 hours of hold.",
    "Test on a small patch first to check the shade matches your beard. Apply sparingly with the applicator and comb through so it does not look painted on. It washes out, so it suits events and photos rather than permanent colour.",
  ]),
  A('B0FNRQV31W', 'SANDALS Kids Girls Casual Sandals, PU, Velcro Closure, Design BG5401', [
    "Velcro sandals are the easiest footwear for young children — they can put them on themselves, and a quick adjustment gives a snug fit as feet grow.",
    "These are girls' casual sandals in PU with a velcro closure, design BG5401. The product page showed very low stock at this price when checked.",
    "Check the size chart against your child's foot length, not age — measure heel to toe in cm. Leave a thumb-width gap at the toe for growth. PU wipes clean with a damp cloth; keep it out of long soaks and direct heat.",
  ], 'Pick your size and colour on the product page — this price may apply only to some sizes.'),
  A('B014RA1TTE', 'SignoraWare 1.2 Litre Modular Storage Container with Lid, Set of 2, Blue', [
    "Square containers use shelf space better than round ones — no dead corners — and a 1.2-litre size suits dals, sugar, tea and snacks that you reach for every day.",
    "This SignoraWare set has two 1.2-litre square containers in blue with push-locking lids. The listing says they are food-grade BPA-free plastic, leak-proof, and freezer and microwave safe.",
    "Microwave-safe means the base only — take the lid off before heating. Wash and dry fully before the first fill. Price is only ₹87 below M.R.P., but SignoraWare rarely drops much, so this is still a fair price for a brand known for lasting lids.",
  ], 'Confirm Square 1200 ml, Set of 2 in Blue is selected — other sizes and colours are priced differently.'),
  A('B0H83K8JJ5', 'SilverArrow Women\'s Celelle Summer Flat Slippers, Lightweight Open Toe', [
    "Flat open-toe slippers are what most women actually wear every day at home, for a quick market trip or on holiday. Light, easy to slip on and quick to dry after rain.",
    "The SilverArrow Celelle is a lightweight open-toe flat for women and girls, listed for daily wear. The product page showed very low stock at this price when checked.",
    "Pick your size carefully; open-toe flats should leave a little space beyond the toes. Price and stock can differ by size. Wipe with a damp cloth; do not leave them in direct sun for long, which can warp the sole.",
  ], 'Pick your size and colour on the product page — this price may apply only to some sizes.'),
  A('B0DFMX36HZ', 'SKYCELL Magnetic MagSafe-Compatible Wireless Charger for iPhone, White', [
    "A magnetic wireless charger snaps onto the back of an iPhone and stays aligned, so you can pick up the phone and keep using it while it charges — unlike a flat pad.",
    "The SKYCELL charger is MagSafe-compatible, with magnets built in for alignment, and made for iPhone 12, 13, 14, 15 and later models and other Apple accessories that support magnetic charging, per the listing. It comes in white.",
    "Use a good USB-C PD adapter for the best speed — wireless charging is slow on an old adapter. Remove non-magnetic cases. Android phones need a MagSafe-compatible case or ring to hold on.",
  ]),
  A('B0GY173X7J', 'SNITCH Loop Cabin Size Polypropylene Hard Suitcase with 4 Wheels, Yellow', [
    "A bright yellow suitcase is easy to spot in an airport or train crowd — nobody walks off with it by mistake.",
    "The SNITCH Loop is a cabin-size hard suitcase in yellow made of recycled polypropylene, per the listing. It has four wheels, a combination lock, a multi-stage telescopic handle, an interior with a zip compartment and cross-straps, and a free shoe bag. It is sized for 2–3 day trips.",
    "Check its dimensions against your airline's cabin limit. Four wheels are fine on smooth floors, but eight-wheel bags glide more easily on long walks. Use the shoe bag to keep shoes off clothes.",
  ], 'Confirm Cabin size in Yellow is selected — other sizes and colours on the same page are priced differently.'),
  A('B07TT7WW4R', 'Sonero Ultra High Speed 8K HDMI 2.1 Cable with Ethernet, Nylon Braid, 2 m', [
    "An HDMI 2.1 cable matters if you have a PS5, Xbox Series X or a 120 Hz TV — older cables cannot carry 4K at 120 Hz, and you lose the smoothest gaming mode without knowing why.",
    "The Sonero cable is an Ultra High Speed HDMI 2.1 cable, 2 m long, with nylon braiding and gold-plated connectors. The listing gives 48 Gbps bandwidth, 8K at 60 Hz, 4K at 120 Hz, dynamic HDR, VRR and eARC-era features like HEAC.",
    "To get 4K 120 Hz, the TV port and the console setting both need to support it — check the TV's HDMI 2.1 port label. 2 m is enough for a TV unit; avoid very long cables for high bandwidth. At ₹309, it costs less than most branded HDMI 2.1 cables.",
  ], 'Confirm the 2 m length is selected — other lengths on the same page are priced differently.'),
  A('B0F91PR9G8', 'Sounce Hard Carry Case for Two Game Controllers, PS5, PS4, Xbox', [
    "Game controllers are easy to damage in a bag — sticks bend and buttons get pressed. A hard case with room for two controllers makes taking them to a friend's place or on a trip safe.",
    "The Sounce case is made of polyester and holds two controllers for PS5, PS4, Xbox and iPega. The listing says it is shockproof, with 3-layer protection, an accessory pocket for cables, and a carry handle.",
    "Check the product images to confirm your controller fits. Put cables in the accessory pocket, not against the sticks. At ₹899, it costs less than one PS5 DualSense thumbstick repair.",
  ]),
  A('B0C2D11HP9', 'The Indian Garage Co Men Olive Slim Fit Solid Puffer Jacket', [
    "A puffer jacket is the warmest jacket for its weight — it packs down for a trip to the hills and does the job through a North Indian winter.",
    "This is The Indian Garage Co men's olive slim-fit solid puffer jacket. At ₹872 against a ₹5,099 M.R.P., it is 83% off, a pre-winter price.",
    "Slim fit sits close to the body; if you want to layer a sweater underneath, size up. Price and stock differ by size — pick yours first. Wash on a gentle cycle and dry flat, then shake it out to spread the filling.",
  ], 'Pick your size on the product page — this price may apply only to some sizes.'),
  A('B0BNLLC17W', 'The Indian Garage Co Men White Slim Fit Solid Puffer Jacket', [
    "A white puffer is a statement winter jacket — it looks sharp in hill-station photos and over dark jeans, though it does need more care than a dark one.",
    "This is The Indian Garage Co men's white slim-fit solid puffer jacket. At ₹692 against a ₹3,849 M.R.P., it is 82% off.",
    "Slim fit sits close; size up to layer over a sweater. Price and stock differ by size. Spot-clean marks quickly, as white shows dirt; wash gently and dry flat.",
  ], 'Pick your size on the product page — this price may apply only to some sizes.'),
  A('B0BQ34GB1Z', 'UNIGEN UNIFOLD 3-in-1 Foldable Magnetic Wireless Charging Station, White', [
    "Apple users end up with three chargers on the bedside table — phone, AirPods and Apple Watch. A 3-in-1 station charges all three from one plug.",
    "The UNIGEN UNIFOLD is a 3-in-1 wireless charger for iPhone (listed for 12 to 14 series), AirPods and Apple Watch. It folds for travel, is made of ABS, and is described as Qi-certified, per the listing. It comes in white.",
    "Use the adapter recommended on the product page — three devices at once need more power than a 5W brick. Remove thick cases from the phone. At ₹639, it is far cheaper than Apple's own chargers for the same three devices.",
  ]),
];

// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live Amazon price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: 'Amazon', productId: d.productId, affiliateUrl: AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs IFS ${d.productId}`);
  if (!/in stock|only \d+ left/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  // hand-typed ₹ in copy must match the PDP price (title-rupee-vs-price rule)
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  if (!/^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/.test(row.image)) throw new Error(`bad image ${d.productId} ${row.image}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate ASIN');

const file = process.argv[2] ?? 'ifs-0925av-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
