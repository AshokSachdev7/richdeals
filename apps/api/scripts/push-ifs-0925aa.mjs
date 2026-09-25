// DEAL-INGEST indiafreestuff tick 2026-09-25aa
//
// /deals + /deals/superdeals -> 72 slugs -> 52 new -> base64 ?rto= Buy Now resolved to store URLs.
// Rejected: Kook N Keech (Myntra category URL), 6 DB dups, 3 Amazon with no buy box (kurta, Nilkamal
// Mini Medium, Yamaha ZG01), Nilkamal Mini Small (no M.R.P. on PDP), Rode NT2-A B00915GCOS (same mic as
// B004L06ZCM at a higher price), Sonata 8182KM03 (Myntra OutOfStock), boAt power bank (Flipkart ₹1,475 vs
// ₹1,499 M.R.P. = 2% off, not a deal).
// Amazon verified in the logged-in tab: #corePriceDisplay + #centerCol M.R.P. + #availability + hiRes image.
// Myntra verified via PDP ld+json (price, InStock) + "mrp" in page state.
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
  A('B0D9BLT3ZH', 'Amazon Basics French Press Coffee and Tea Maker, 600ml, Borosilicate Glass, Black', 699, 1899, '51vXuCslkAL._SL1500_.jpg', [
    "A French press makes full-bodied coffee with nothing more than hot water and coarse ground beans: the grounds steep in the glass jug for about four minutes, then the mesh plunger pushes them to the bottom and you pour. There is no paper filter and no machine to descale, so the natural oils stay in the cup and the only running cost is the coffee itself.",
    "This Amazon Basics press holds 600ml, enough for two large mugs or three small cups. The jug is heat-resistant borosilicate glass, the same kind used in lab and oven glassware, so pouring in just-off-the-boil water will not crack it. The listing describes a 4-level filtration system on the plunger to keep fine sediment out of the cup. It works for loose-leaf tea and cold brew as well.",
    "Grind coarse — close to breadcrumb size — because fine powder slips past the mesh and makes the last sip muddy. Use water just off the boil rather than at a rolling boil, and stir once before pressing. Rinse the plunger mesh under running water after each use and take it apart now and then, as trapped grounds are what make an old press taste bitter.",
  ], 'Confirm the 600ml Black press is selected — other sizes and colours on the same page can be priced differently.', { coupon: true }),
  A('B07KTB8BBV', 'Amazon Brand Presto! Bathroom Cleaner, Floral, 1 Litre', 89, 189, '71cOCA4JX7L._SL1500_.jpg', [
    "A dedicated bathroom cleaner is formulated for the grime a floor cleaner does not handle well: soap scum on tiles, hard-water marks on taps and the grey film that builds up on sinks and basins. Using one for the bathroom and a separate one for living-room floors keeps each job quicker and stops you over-scrubbing.",
    "Amazon's own Presto! brand sells this 1 litre bottle in a floral fragrance. The listing says it is suitable for bathroom floors, slabs, wall tiles, sinks, basins and stainless steel taps and showers, so one bottle covers most of the room. At under ₹100 a litre it costs less than most branded bathroom cleaners on the same shelf.",
    "Spray or pour a little onto the surface, leave it for a minute or two so it can loosen the scum, then scrub and rinse with plain water. Always rinse steel taps afterwards so no residue dries on them. Keep the bottle away from children, never mix it with bleach or another cleaner, and open a window or run the exhaust fan while you clean.",
  ], 'This offer needs a minimum of 2 bottles in the cart — add two to get the listed per-bottle price.'),
  A('B07P7ZX8NP', 'Amazon Brand Solimo Modular Plastic Storage Containers with Lid, Set of 4, 525ml', 319, 800, '71pN0KSA+JL._SL1500_.jpg', [
    "Modular containers are sized so they stack on top of each other and sit flush side by side, which is what turns a crowded kitchen shelf into one where you can see every dal, spice and snack at a glance. Transparent walls mean you know when something is running low without opening the lid.",
    "This Solimo set, from Amazon's own brand, has four transparent containers of 525ml each, with lids. That size suits the things you use daily in smaller amounts — tea leaves, sugar, poha, dry fruits, masala mixes — rather than bulk atta or rice. Because all four are the same size, the lids interchange and the stack stays neat.",
    "Wash and fully dry the containers before the first fill, as moisture inside is what makes dry groceries clump. Label the lids or fronts so the family puts things back in the same place. Keep them away from the stove flame and do not use them in the microwave unless the listing confirms they are microwave safe.",
  ], 'Confirm the Set of 4, 525ml option is selected — other set sizes on the same page are priced differently.', { coupon: true }),
  A('B0F5HPHW7C', 'American Tourister Liftoff+ 3-Piece Hard PP Luggage Set with TSA Lock and 8 Wheels', 6999, 25900, '51gWGqm12JL._SL1280_.jpg', [
    "Buying luggage as a set of three covers every kind of trip in one purchase: the small bag goes into the cabin for weekend trips, the medium one handles a week away, and the large one takes the long family holiday or the move to a hostel. The three also nest inside each other, so they take up the space of one suitcase at home.",
    "This American Tourister Liftoff+ set is small, medium and large hard-shell suitcases made of polypropylene (PP). PP flexes on impact rather than cracking, which is why it is common in check-in luggage. Each bag has a TSA lock, which lets airport security in the US open it without breaking the lock, and 8 wheels, which means two double spinners at each corner for smoother rolling.",
    "Check your airline's cabin size limit before using the small bag as carry-on, as limits vary by carrier. Set the lock combination before your first trip and note it somewhere safe. Stand the bags on their wheels rather than on their sides when stored, and wipe the shell with a damp cloth — no abrasive scrubbers, which leave scratches.",
  ], 'Confirm the 3-piece set (Small + Medium + Large) is selected — single sizes and other colours on the same page are priced differently.'),
  A('B0C5DM5GVC', 'Aristocrat Airpro Set of 2 Trolley Bags, Cabin + Medium, Teal Blue', 2696, 17500, '51dO7vj5dpL._SL1001_.jpg', [
    "A cabin-plus-medium pair suits most Indian travel: the cabin trolley for a short work trip or as carry-on alongside a checked bag, and the medium for a week at home during a festival or a family wedding. Buying both together as a set usually costs much less than picking up two separate bags.",
    "This Aristocrat Airpro set is two trolley bags, one cabin size and one medium, in teal blue. Aristocrat is VIP Industries' value luggage brand, so the bags come with that company's service network behind them. At under ₹2,700 for both, it is priced closer to a single mid-range suitcase.",
    "Measure the cabin bag against your airline's carry-on limit, as the limit differs by carrier. Pack heavy items at the wheel end so the trolley does not tip when you let go of the handle. Retract the handle fully before check-in, and store the medium bag inside the cabin bag at home to save space.",
  ], 'Confirm the Teal Blue set of 2 is selected — other colours on the same page can be priced differently.', { stock: 'only 1 left in stock at check time' }),
  A('B08F2NRL1H', 'Askprints A5 Sketchbook Set of 2, 50 Sheets Each, Top Spiral Bound, Acid-Free Paper', 152, 399, '81gNNXUNWYL._SL1500_.jpg', [
    "A5 is the size most artists carry every day: at 5.8 x 8.3 inches it fits in a bag or large pocket but still gives enough room for a full figure study or a page of thumbnail sketches. A top spiral lets the book fold completely back on itself, so you can hold it in one hand while standing and the spiral never gets in the way of a left-handed drawer.",
    "This Askprints listing is a set of two sketchbooks with 50 sheets each. The paper is acid-free, which means it does not yellow or turn brittle over the years the way cheap notebook paper does — important if you want to keep your early drawings. At about ₹76 a book it is priced for daily practice rather than for display work.",
    "Use pencil, charcoal, pen or dry media; heavy watercolour washes will buckle sketch paper, so keep wet media light. Date each page so you can see your progress over a month. A fixative spray or a sheet of tracing paper between charcoal pages stops smudging when the book is closed.",
  ], 'Confirm the Set of 2, A5 option is selected — other sizes and sheet counts on the same page are priced differently.'),
  A('B0DXPL5XHF', 'boAt Nirvana Zenith Pro TWS Earbuds, 50dB Hybrid ANC, LDAC, 80H Battery', 2799, 14990, '61F5uOdJqlL._SL1500_.jpg', [
    "Hybrid active noise cancellation uses microphones both outside and inside each earbud to hear background noise and play the opposite sound wave, which cuts steady noise such as a bus engine, a ceiling fan or aircraft hum. Adaptive ANC changes the strength of the cancellation to suit your surroundings, so you do not have to switch modes by hand.",
    "boAt's Nirvana Zenith Pro claims up to 50dB of hybrid adaptive ANC, spatial audio, and support for the LDAC codec, which carries higher-resolution audio from Android phones that support it. The listing also mentions 6 microphones with AI-ENx noise reduction for calls and up to 80 hours of total battery with the case. At ₹2,799 it sits well below the usual price of LDAC earbuds.",
    "LDAC needs to be switched on from your phone's Bluetooth or developer settings, and iPhones do not support it, so check your phone first. Try every ear-tip size in the box — a proper seal matters more for ANC than any setting. Keep the case charged, and wipe the tips now and then, as wax build-up muffles both music and cancellation.",
  ], 'Confirm the colour you want is selected — other colours on the same page can be priced differently.'),
  A('B0H429S991', 'Core Large Check-in Suitcase, 75cm / 28 inch, Polypropylene Hard Trolley, 8 Spinner Wheels', 2499, 13999, '71SMsA7-JpL._SL1500_.jpg', [
    "A 75cm (28 inch) suitcase is the large check-in size, meant for long trips, study abroad and family holidays where one bag carries clothes for two. Most airlines have a weight limit per checked bag, and a large shell makes it easy to pack right up to that limit, so weigh it before leaving home.",
    "This Core suitcase has a hard polypropylene shell, 8 spinner wheels (two at each corner) that let it roll in any direction, and a recessed number lock that sits flush with the body so it does not snag on airport belts. The listing describes it as lightweight, which matters on a large bag because the suitcase's own weight counts against your baggage allowance.",
    "Use a luggage scale when packing, as an overweight bag costs more at the counter than the suitcase did. Put shoes and heavy items at the wheel end and soft clothes at the top. Set your own lock combination before the first trip and note it down. When empty, it can hold a smaller cabin bag inside to save storage space.",
  ], 'Confirm the Large 75cm option and your colour are selected — other sizes and colours on the same page are priced differently.'),
  A('B0GFWP5XM2', 'DYLECT NutriMax Cold Press Juicer with 130mm Wide Chute and Reverse Function', 7999, 13499, '618xpRMVQaL._SL1254_.jpg', [
    "A cold press (slow) juicer crushes fruit and vegetables with a slow-turning auger instead of shredding them with a high-speed blade. The slow crush produces less heat and froth and gets more juice out of leafy greens such as spinach, palak and wheatgrass, which fast centrifugal juicers mostly throw out as wet pulp.",
    "The DYLECT NutriMax has a 130mm wide feeding chute, which means many fruits such as apples and oranges go in whole or halved, with much less chopping than a narrow-mouth juicer. It has a reverse function to clear the auger if fibrous produce jams it, safety features that stop it running when not assembled correctly, and a compact body that takes little counter space.",
    "Feed hard and soft produce alternately so the auger does not clog, and cut stringy items like celery and ginger into short pieces. Drink the juice soon after making it, or refrigerate it in a closed bottle. Rinse the strainer and auger straight after use — dried pulp in the fine mesh is far harder to clean than fresh.",
  ], 'Confirm the NutriMax model and colour shown are selected — other variants on the same page can be priced differently.'),
  A('B0B8J5546Z', 'EVEREADY 9W Rechargeable Emergency Inverter LED Bulb, B22, Pack of 4', 549, 2196, '71-pEeUTwdL._SL1500_.jpg', [
    "An emergency inverter bulb looks and fits like an ordinary LED bulb, but it has a small rechargeable battery inside. While mains power is on, it lights normally and charges itself; when the power cuts, it keeps glowing from the battery with the switch still on. For areas with daily power cuts, it gives light in key rooms without buying a full inverter.",
    "This Eveready pack has four 9W bulbs with the B22 fitting, which is the push-and-twist bayonet base used in most Indian homes. At ₹549 for four, each bulb costs about ₹137, close to the price of a plain 9W LED bulb. Eveready is a long-standing Indian battery and lighting brand with a wide retail presence.",
    "Leave each bulb switched on under mains power for a full charge before relying on it in a power cut. The switch must stay on for the backup to work, so tell the family not to flip it off during an outage. Put them where light matters most — kitchen, staircase and bathroom — and keep a torch as backup for longer cuts.",
  ], 'Confirm the 9W, Pack of 4 option is selected — other wattages and pack sizes on the same page are priced differently.'),
  A('B0H6262QV3', 'Eveready Ultima Mosquito Repellent Machine + 2 Refills Combi Pack, Dual Mode', 151, 190, '711YJmBXIiL._SL1500_.jpg', [
    "A plug-in liquid vaporiser heats a small refill bottle so the repellent spreads slowly through the room, keeping mosquitoes away through the night without the smoke of a coil. It is the most common protection in Indian bedrooms during the monsoon, when mosquitoes that spread dengue, chikungunya and malaria are most active.",
    "This Eveready Ultima combo is one machine plus two refills. The machine has two modes: normal for everyday use, and high for heavy mosquito nights or right after the room has been open. The listing describes an advanced Japanese formula and claims protection from dengue, chikungunya and malaria mosquitoes.",
    "Plug the machine in 30 minutes before sleeping and keep windows mostly closed so the vapour stays in the room. Use high mode only when needed, as normal mode makes a refill last longer. Keep it out of children's reach, do not use it in a small closed room with an infant, and pair it with nets or screens during peak dengue season.",
  ], 'Confirm the Machine + 2 Refill combi is selected — refill-only packs on the same page are priced differently.'),
  A('B0H2HSNYVL', 'Eveready Ultima Mosquito Repellent Refill, Fits All Machines, Pack of 2', 113, 160, '81FhCNfYmzL._SL1500_.jpg', [
    "Liquid vaporiser refills are the running cost of mosquito protection: the machine lasts for years, but a household using it every night goes through a refill every month or so in the monsoon. Buying refills that fit the machine you already own means you do not need to change brands to save money.",
    "This Eveready Ultima pack has two refills and the listing says they fit all machines, so they can go into a vaporiser from another brand already plugged in at home. It uses the same advanced Japanese formula as the Eveready combo pack and claims protection from dengue, chikungunya and malaria mosquitoes.",
    "Check that the refill screws in firmly and sits straight, as a tilted bottle heats unevenly. Write the date on the bottle when you start it so you know how long a refill lasts in your room. Keep windows closed after switching on, and keep refills away from children and pets.",
  ], 'Confirm the Pack of 2 refills is selected — larger packs and the machine combo on the same page are priced differently.'),
  A('B0H2HP2X1T', 'Eveready Ultima Mosquito Repellent Refill, Fits All Machines, Pack of 4', 219, 310, '81VdRjGhv3L._SL1500_.jpg', [
    "A four-pack of refills covers about a season of nightly use in one room, or one month for a home with a machine in every bedroom. Buying the larger pack brings the price per refill down and means you are not caught without one on a heavy mosquito night.",
    "This Eveready Ultima pack contains four refills that the listing says fit all machines, so they work in a vaporiser from another brand too. At ₹219 each refill costs under ₹55, less than buying the two-pack twice. The formula is the same advanced Japanese formula used in the rest of the Ultima range.",
    "Store unopened refills upright in a cool, dry cupboard, away from direct sun, with the caps on. Rotate one machine per bedroom and label the start date on each bottle. Keep windows closed after switching on, use nets for infants, and keep the refills out of children's reach.",
  ], 'Confirm the Pack of 4 refills is selected — smaller packs and the machine combo on the same page are priced differently.'),
  A('B08SVNCFWT', 'Flexnest Stand for Adjustable Dumbbells, Heavy-Duty Compact Weight Stand', 8999, 17998, '41xUqcmL1uL._SL1125_.jpg', [
    "Adjustable dumbbells replace a whole rack of fixed weights, but lifting them off the floor between every set is awkward and hard on the lower back. A dedicated stand holds both dumbbells at hip height, so you can pick them up, change the weight and put them down without bending.",
    "This Flexnest stand is built for adjustable dumbbells and described as heavy-duty and compact, taking little more floor space than the dumbbells themselves. That suits home gyms set up in a bedroom corner or a balcony, where a full rack does not fit.",
    "Check that the stand's cradle fits the model of dumbbells you own before ordering. Put it on a flat floor and use a rubber mat underneath to protect tiles. Always return the dumbbells fully seated in the cradle before changing weights, and tighten any bolts after the first few weeks of use.",
  ], 'Confirm the stand variant shown is selected — dumbbell bundles on the same page are priced differently.', { coupon: true }),
  A('B0CQYHHRQP', 'Goldmedal Iconiq 10L Storage Water Heater (Geyser), 5 Star Rated', 11566, 15990, '41BFWQooFWL._SL1200_.jpg', [
    "A 10 litre storage geyser suits a single bathroom for one or two people: it heats a tank of water in advance, so hot water comes at a good flow for a shower, while an instant geyser gives only a trickle. Ten litres is enough for a quick shower or a full bucket bath for one person per heating cycle.",
    "The Goldmedal Iconiq is a 10L storage water heater with a 5 star energy rating. Star ratings on geysers are about standby losses — how well the tank keeps the water hot — so a 5 star unit uses less electricity reheating water that has been sitting in the tank. Goldmedal is an Indian electrical brand known for switches and wiring accessories.",
    "Have it installed by an electrician on a dedicated socket with proper earthing, and fit a pressure-release valve if the plumber recommends one. Switch it on around 15–20 minutes before a bath and off afterwards. Flushing the tank once a year removes scale, which matters in areas with hard water.",
  ], 'Confirm the 10L model is selected — other capacities on the same page are priced differently.', { coupon: true }),
  A('B0HBB6W6GQ', 'Haier 6 kg 5 Star Oceanus Wave Drum Fully Automatic Top Load Washing Machine HWM60-AEN', 13740, 22400, '61eH5s890WL._SL1500_.jpg', [
    "A 6 kg fully automatic top loader suits a household of two to three people: you load the drum from the top, pick a program, and it fills, washes, rinses and spins without any tub transfer. Top loaders are usually cheaper than front loaders and do not need you to bend down to load and unload clothes.",
    "This Haier Smart Choice model (HWM60-AEN, Moonlight Silver) has 6 kg capacity, a 5 star energy rating and what Haier calls an Oceanus Wave drum, designed to create a wave-like water flow for gentler washing. The 5 star rating means lower electricity and water use per wash compared with lower-rated machines.",
    "Do not overload the drum — clothes need room to move for a proper wash. Use detergent made for top-load machines, as regular powder can over-foam. Leave the lid open after each wash so the drum dries out, and clean the lint filter every few weeks. If your water pressure is low, check the machine's minimum pressure before installing.",
  ], 'Confirm the 6 kg HWM60-AEN in Moonlight Silver is selected — other capacities on the same page are priced differently.'),
  A('B0D3531YQT', 'JPT 21V Cordless Brushless Impact Wrench Combo, 550 N.m Torque, 4000mAh Battery', 8689, 11999, '61aSjJ1JFWL._SL1080_.jpg', [
    "An impact wrench delivers short, powerful rotational blows rather than steady torque, which breaks loose rusted wheel nuts and large bolts that a normal drill or hand spanner struggles with. It is the tool for swapping car tyres at home, working on bikes and tractors, and assembling heavy steel frames.",
    "This JPT combo is a 21V cordless impact wrench with a brushless motor, which runs cooler and gets more work out of each battery charge than a brushed motor. The listing gives 550 N.m of torque, 2300 RPM, a 4000mAh lithium-ion battery, an LED work light and forward/reverse mode for both tightening and loosening.",
    "Use impact-rated sockets only — ordinary chrome sockets can crack under impact. Loosen wheel nuts with the wrench, but tighten them the final bit by hand with a torque wrench to the car maker's spec so you do not over-tighten. Wear eye protection, and charge the battery fully before storing it for long periods.",
  ], 'Confirm the combo shown (wrench + battery + charger) is selected — tool-only options on the same page are priced differently.', { coupon: true }),
  A('B0GD1J4945', 'Lifelong BRIK 2-in-1 Air Fryer and Grill, 1350W, 4.2L See-Through Basket, 8 Presets', 4499, 17999, '71bOYrDQDRL._SL1500_.jpg', [
    "An air fryer cooks by blowing very hot air around the food, so samosas, fries, tikkis and chicken wings come out crisp with a spoon of oil instead of a deep kadhai. Adding a grill function means the same appliance can also char paneer tikka, vegetables and sandwiches.",
    "The Lifelong BRIK is a 1350W 2-in-1 air fryer and grill with a 4.2 litre basket, which suits a family of three to four. The basket is see-through, so you can watch the food brown without opening it and losing heat. It has 8 preset menus for common dishes and a detachable flip design that switches between air frying and grilling.",
    "Preheat for a few minutes before adding food, and do not pile the basket — food needs space around it to crisp. Shake or turn halfway through. Use only a light spray of oil, and clean the basket after it cools; a soak in warm soapy water lifts grease without scratching the coating.",
  ], 'Confirm the 4.2L BRIK 2-in-1 model is selected — other sizes on the same page are priced differently.'),
  A('B08HK1QW81', 'Livpure Smart Ortho DUOS-X Reversible HR Foam Mattress, King Bed, 72x72x6 inch', 10998, 18999, '81Z3Wd3CUlL._SL1500_.jpg', [
    "A reversible mattress has two different sides, usually one softer and one firmer, so you can flip it to find which feel suits your back, or flip it seasonally so it wears evenly. For a king bed shared by two people, that flexibility helps when both sleepers want slightly different support.",
    "This Livpure Smart Ortho DUOS-X is a king-size mattress measuring 72 x 72 x 6 inches, built from HR (high-resilience) foam. HR foam springs back faster and keeps its shape longer than ordinary PU foam, which is the soft foam in budget mattresses that sags within a couple of years. The orthopaedic label points to firmer support for back sleepers.",
    "Measure your bed frame before ordering — 72 x 72 inches is a standard Indian king size, but frames vary. When it arrives rolled, give it 24–48 hours to expand fully before judging the feel. Flip and rotate it every three months, and use a washable mattress protector to keep sweat and spills out of the foam.",
  ], 'Confirm the King, 72x72x6 inch size is selected — other sizes and thicknesses on the same page are priced differently.', { coupon: true }),
  A('B0BW5RP8TK', 'Microtek Heavy Duty Pure Sinewave UPS Model 2350 (24V) SW, 3 Year Warranty', 10999, 19190, '41zUg+TJlWL._SL1000_.jpg', [
    "A home inverter UPS stores power in batteries while mains power is on and switches the house over during cuts. A pure sine wave unit produces the same smooth current as the grid, so fans run without a hum and sensitive electronics — computers, LED TVs, refrigerators with inverter compressors — work as they would on mains.",
    "The Microtek Heavy Duty 2350 is a 24V pure sinewave UPS, meaning it runs on two 12V batteries connected together. That is the setup used to back up a larger load than a single-battery 12V inverter can, such as several fans, lights, a TV and a fridge in a 2–3 BHK home. Microtek backs it with a 3 year warranty.",
    "The batteries are sold separately — budget for two matched tubular batteries of the same make and age. Place the unit and batteries in a ventilated spot away from direct sun, check battery water levels every month or two if they are flooded type, and have the wiring done by an electrician so the changeover switch is installed safely.",
  ], 'Confirm the 2350 (24V) SW model is selected — other capacities on the same page are priced differently.'),
  A('B0DN1LY37S', 'MOKOBARA Aisle Trunk Check-in Trolley Bag, 65cm, 70L, Orange', 5899, 12999, '61ttMIT8gCL._SL1500_.jpg', [
    "A trunk-style suitcase is deeper and more boxy than a standard trolley, which gives more usable space for bulky items such as shoes, a jacket or gifts without bulging the lid. A 65cm, 70 litre bag sits in the medium check-in size, right for a one-to-two week trip.",
    "The MOKOBARA Aisle Trunk is a 65cm check-in trolley with 70 litres of capacity, in orange. MOKOBARA is an Indian D2C travel brand known for design-led luggage, and at ₹5,899 this is well below the usual list price. A bright colour like orange also makes the bag easy to spot on the airport belt.",
    "Weigh the packed bag at home, as a deep trunk makes it easy to go over the airline weight limit. Put heavy things at the wheel end. Wipe the shell with a soft damp cloth and store it standing upright, with a cloth bag over it if you want to keep the colour looking fresh.",
  ], 'Confirm the Aisle Trunk 65cm in Orange is selected — other colours and sizes on the same page are priced differently.'),
  A('B0GRV73M4R', 'Motorola A300 (2026) Dual SIM Keypad Phone with Type-C Charging and Wireless FM', 1299, 1799, '61Dbu-jw8uL._SL1200_.jpg', [
    "A keypad phone still makes sense as a backup phone, a phone for elderly parents who find touchscreens confusing, or a second SIM holder that runs for days on a charge. It makes calls and texts, plays FM radio, and does not need updates, apps or a data plan.",
    "The Motorola A300 (2026) is a dual SIM keypad phone with a Type-C charging port, so it shares a charger with most modern smartphones instead of needing an old pin charger. The listing highlights a long-lasting battery, a loud speaker and wireless FM, which plays radio without plugging earphones in. Motorola offers 2 years of replacement on it.",
    "Check that both of your SIMs are the network type the phone supports before ordering. Save important numbers on speed dial for elderly users, and turn up ringtone volume from the settings menu. Charge it fully on arrival and keep the box and bill, as the 2-year replacement needs proof of purchase.",
  ], 'Confirm the colour you want is selected — other colours on the same page can be priced differently.'),
  A('B0H6G4CVJ5', 'Nilkamal Freedom FMDR1BE Plastic Storage Wardrobe with Bottom Drawer', 3010, 11300, '71bS2KuT2uL._SL1500_.jpg', [
    "A plastic wardrobe is a practical choice for rented homes, hostel rooms and children's rooms: it is light enough to move without a carpenter, it does not swell or rot in humid weather the way particle board does, and it can be wiped clean. It adds closed storage in rooms that have no built-in almirah.",
    "The Nilkamal Freedom FMDR1BE is a plastic storage wardrobe with one bottom drawer and a clothes organiser layout. Nilkamal is one of India's largest moulded furniture makers, and this unit carries a 3-year warranty. The listing positions it for home, living room and bedroom use.",
    "Assemble it on a flat floor and tighten every joint before loading it. Keep heavier items in the lower sections so it stays stable, and do not stand on the drawer. Keep it away from direct sun and heaters, which can warp plastic over time, and wipe it with a damp cloth rather than harsh cleaners.",
  ], 'Confirm the FMDR1BE colour shown is selected — other colours and models on the same page are priced differently.', { coupon: true }),
  A('B0GSZKMP78', 'Nilkamal Freedom Small (FMS) 2-Shelf Plastic Bookshelf, 3-Year Warranty', 3090, 4300, '611xQ2H7wyL._SL1500_.jpg', [
    "A small open bookshelf gives books, toys, files and daily-use items a fixed spot at a reachable height, instead of piling up on tables and beds. Plastic units suit homes with children because they have no sharp wooden corners and are easy to clean when something spills.",
    "The Nilkamal Freedom Small (FMS) is a 2-shelf plastic bookshelf with a 3-year warranty. The listing describes it as durable, waterproof and multipurpose, working as a book rack, a storage cabinet for toys or a side unit in a study. Nilkamal is one of India's largest makers of moulded furniture.",
    "Put heavy books on the bottom shelf and lighter items on top so it cannot tip. Keep it away from direct sun and heaters to stop the plastic warping. If you have toddlers, place it against a wall, and wipe it with a damp cloth rather than abrasive cleaners to keep the finish.",
  ], 'Confirm the Freedom Small (FMS) 2-shelf model and colour shown are selected — other models on the same page are priced differently.', { coupon: true }),
  A('B0GP679RWJ', 'NUUK LIT PRO Rechargeable 9 inch BLDC Table Fan, 8000 mAh, 20 hrs Runtime, Remote', 3799, 5499, '51if5SWvTyL._SL1000_.jpg', [
    "A rechargeable table fan keeps air moving through power cuts and works in places without a plug point — a balcony, a study table away from the wall, a car during a long wait, or a hostel room with a single socket. A BLDC (brushless DC) motor matters here because it uses much less power than a regular motor, so the battery lasts far longer.",
    "The NUUK LIT PRO is a 9 inch wireless BLDC fan with an 8000 mAh battery rated for up to 20 hours of runtime. It adds three mood lights, a magnetic remote that sticks to the fan body so it does not get lost, and 120 degree auto oscillation to sweep air across the room.",
    "Runtime figures are usually quoted at the lowest speed, so expect fewer hours on the top setting. Charge it fully before the first use and top it up before a known power cut. Clean the grille and blades with a dry cloth every couple of weeks, as dust on BLDC fans cuts airflow noticeably.",
  ], 'Confirm the LIT PRO model and colour are selected — other NUUK fans on the same page are priced differently.'),
  A('B0DH4L39SC', 'NUUK REN GO Cordless Car Vacuum Cleaner for Car, Sofa, Keyboard and Pet Hair', 3129, 5699, '61mezwNCngL._SL1000_.jpg', [
    "A cordless handheld vacuum is for the quick clean-ups a full-size vacuum is too bulky for: crumbs on car seats, dust in the keyboard, pet hair on the sofa, sand in the car footwell. With no cord, you can take it straight to the car or the balcony without hunting for a socket.",
    "The NUUK REN GO is a cordless vacuum sized for car interiors and home surfaces like sofas and keyboards, with pet-hair pickup mentioned in the listing. NUUK is an Indian brand best known for rechargeable fans and portable appliances.",
    "Empty the dust bin after every use, as a full bin cuts suction quickly. Wash or tap out the filter regularly and let it dry fully before putting it back. Use the narrow nozzle for seat gaps and the brush attachment on fabric, and charge it after each use so it is ready next time. Avoid picking up liquids unless the listing says it handles wet spills.",
  ], 'Confirm the REN GO model and colour shown are selected — other NUUK vacuums on the same page are priced differently.'),
  A('B0FJLJSXJ4', 'Pigeon Rechargeable Electric Scalp Massager with Silicone Kneading Nodes', 699, 2995, '61HHmrEqg1L._SL1500_.jpg', [
    "An electric scalp massager uses rotating soft nodes to knead the scalp the way fingertips do in a head massage. Many people use one to relax after a long day, and some use it while shampooing for a more thorough wash of the scalp.",
    "This Pigeon massager is rechargeable, so there is no cord to manage, and uses silicone kneading nodes that are gentler on the scalp than hard plastic. The listing positions it for relaxation and body pain relief as well as deep cleaning while washing. Pigeon is an Indian kitchen and home appliance brand under Stovekraft.",
    "Start on the lowest setting and short sessions to see how your scalp reacts. Check the listing for water resistance before using it in the shower. Wipe the silicone nodes clean after each use. Do not use it on broken skin or scalp conditions, and consult a doctor for persistent pain rather than relying on a massager.",
  ], 'Confirm the colour shown is selected — other colours on the same page can be priced differently.'),
  A('B0CWRXD18P', 'PME HyperCharge Portable EV Charger 7.2kW, 32A, 6m Cable, LCD Display', 20424, 22104, '61EYowl3wrL._SL1080_.jpg', [
    "A 7.2kW home charger is the upgrade most EV owners make after living with the slow 3.3kW charger that ships with many cars. At 7.2kW an electric car can add roughly twice as much range per hour of charging, which turns overnight charging from a stretch into a comfortable buffer.",
    "The PME HyperCharge is a portable 7.2kW EV charger with a 6 metre cable, a large LCD screen and adjustable current up to 32A on a single-phase supply. It carries an IP67 rating and built-in protections according to the listing. Adjustable current lets you lower the charging rate if your home connection cannot handle a full 32A.",
    "Check your car's onboard charger — if it accepts only 3.3kW, a 7.2kW charger will still charge at 3.3kW. Have an electrician confirm your home's sanctioned load and install a dedicated 32A circuit with proper earthing before running it at full current. Store the cable coiled and dry.",
  ], 'Confirm the 7.2kW HyperCharge model is selected — other ratings on the same page are priced differently.'),
  A('B004L06ZCM', 'Rode NT2-A Large Diaphragm Studio Condenser Microphone, XLR', 13148, 39700, '61+XZ2kxbHL._SL1500_.jpg', [
    "A large diaphragm condenser microphone is the standard choice for studio vocals, voice-over and acoustic instruments: the big capsule captures detail and a warm low end that USB or dynamic microphones miss. It is the step up for home studios and podcasters who already use an audio interface.",
    "The Rode NT2-A is a long-running large diaphragm condenser microphone with switchable polar patterns — cardioid, omnidirectional and figure-8 — so one microphone can record a single voice, a room, or two people facing each other. It connects over XLR, so it needs an audio interface or mixer with phantom power.",
    "Check that your interface supplies 48V phantom power before buying. Use a pop filter for vocals and a proper shock mount to cut desk rumble. Record in a treated or soft-furnished room, as a sensitive condenser picks up echo and fan noise. Store it in its case, away from humidity, which damages condenser capsules over time.",
  ], 'Confirm the NT2-A microphone listing is the one selected — bundles on the same page are priced differently.'),
  A('B0H2FCX5T8', 'Shayan Dual Comfort Reversible HD Foam Mattress, Single, 72x36x6 inch', 4288, 11458, '81+pk7kvMTL._SL1500_.jpg', [
    "A dual comfort mattress has a soft side and a firm side, so you can choose which one to sleep on and flip it if your back needs a change. It is a practical choice for a guest bed, a child's bed, or a hostel room where you are not sure yet which feel suits you.",
    "The Shayan Dual Comfort is a single-size mattress, 72 x 36 x 6 inches, with superior HD (high-density) foam and a breathable knitted fabric cover. HD foam holds its shape longer than low-density foam, and a knitted cover helps air move so the mattress stays cooler in Indian summers.",
    "Measure the bed before ordering — 72 x 36 inches is a standard single, but frames vary. Let it expand for 24–48 hours if it arrives rolled. Rotate and flip it every few months so it wears evenly, and use a washable protector to keep sweat and spills out of the foam — it is far easier to wash a cover than a mattress.",
  ], 'Confirm the Single, 72x36x6 inch size is selected — other sizes and thicknesses on the same page are priced differently.', { coupon: true }),
  A('B0FFTP6RMP', 'Silicone Toilet Cleaning Brush with Holder Stand', 117, 399, '71a1EsywqlL._SL1500_.jpg', [
    "A silicone toilet brush does the same job as a bristle brush, but its soft silicone bristles do not trap dirt and hair, and they dry quickly instead of staying damp and smelly. They also flex under the rim, where most stains build up and where stiff plastic bristles struggle to reach.",
    "This listing is a silicone toilet brush with a holder stand, so the brush stands upright and off the floor between uses. At ₹117, it costs about as much as a basic plastic brush, which makes it an easy swap if your current brush has gone grey and flattened.",
    "Rinse the brush in the flushing water after each use and let it drip dry over the bowl before putting it back in the holder. Clean the holder once a week so water does not collect in it. Replace the brush if the silicone bristles tear, and keep a separate brush for each bathroom.",
  ], 'Confirm the colour and pack size shown are selected — other options on the same page are priced differently.'),
  A('B0CZP9RQ9X', 'Trunativ Everyday Sweet Erythritol and Monk Fruit Sweetener Powder, Zero-Calorie Sugar Substitute', 329, 449, '618fPA9waLL._SL1000_.jpg', [
    "Erythritol and monk fruit sweeteners are used by people cutting sugar — for diabetes management, keto diets or weight loss — because they taste sweet without adding calories. Erythritol provides the body and bulk of sugar, while monk fruit extract adds most of the sweetness.",
    "Trunativ Everyday Sweet is a powdered blend of erythritol and monk fruit, sold as a zero-calorie sugar substitute that replaces sugar 1:1 in cooking and baking. That 1:1 ratio means you can use it in tea, coffee, kheer or cakes without recalculating the recipe. The listing positions it for keto diets.",
    "Start with a little less than the sugar amount in a recipe, as some people find erythritol slightly cooling on the tongue. Large amounts of erythritol can upset some stomachs, so build up slowly. People with diabetes should still check with their doctor or dietitian when changing sweeteners.",
  ], 'Confirm the pack size shown is selected — other pack sizes on the same page are priced differently.', { coupon: true }),
  A('B0DWN5DCW8', 'vissera Designer Metal Wall Clock, Antique Decorative Big Size', 1936, 3999, '61TRkBML+VL._SL1500_.jpg', [
    "A large decorative wall clock does two jobs: it tells the time from across the room and works as a statement piece on an otherwise plain wall. Metal designs with an antique finish suit living rooms and dining areas with warm lighting and wooden furniture.",
    "This vissera clock is a designer metal wall clock in an antique style, described in the listing as big size and suited to living rooms, bedrooms, offices, kitchens and dining areas. At ₹1,936 it costs less than half its listed M.R.P.",
    "Measure the wall first and check the clock's dimensions on the product page, as big decorative clocks can overwhelm a small wall. Use a wall plug and screw rated for the weight rather than a nail. Use a fresh AA battery, and dust the metal with a dry cloth — damp cloths can dull an antique finish. Hang it slightly above eye level so it reads clearly from the sofa or dining table.",
  ], 'Confirm the design and colour shown are selected — other designs on the same page are priced differently.'),
  A('B0H2Z1P4BW', 'vivo Y51 Pro 5G, 8GB RAM, 256GB Storage, Crimson Red', 37999, 59999, '71mwDFbGwPL._SL1500_.jpg', [
    "The vivo Y series is vivo's everyday line, aimed at buyers who want long battery life, plenty of storage and 5G without paying flagship prices. A 256GB variant means years of photos, videos and WhatsApp media before storage becomes a problem.",
    "This listing is the vivo Y51 Pro 5G with 8GB RAM and 256GB storage in Crimson Red. Amazon shows no-cost EMI and exchange offers on the page, which can bring the effective price down further depending on your card and old phone.",
    "Compare the price on the page with the card and exchange offers applied before paying, as those change daily. Check that your SIM supports 5G and that your area has 5G coverage. Keep the box and bill for warranty service, and transfer data from your old phone before trading it in. Set up screen lock and a backup of photos in the first week so nothing is lost if the phone is damaged.",
  ], 'Confirm the 8GB + 256GB Crimson Red variant is selected — other storage and colours on the same page are priced differently.'),
  A('B0H5PPNZ4M', 'Wakefit Sleeping Pillow Set of 4, Adjustable Height, Standard Size 27x16 inch', 1278, 2141, '81AfePLX9FL._SL1500_.jpg', [
    "Pillow height matters more than most people realise: too high and the neck bends up, too low and it drops, both of which leave you stiff in the morning. An adjustable pillow lets you add or remove filling until your neck lines up with your spine in your usual sleeping position.",
    "This Wakefit set has four standard-size 27 x 16 inch pillows with siliconised hollow fibre fill and a knitted cover. Siliconised fibre stays soft and fluffy longer than plain fibre, and at under ₹320 per pillow the set covers two beds in one order. Wakefit is an Indian D2C sleep brand.",
    "Fluff the pillows daily and air them in indirect sunlight once a week. Use a pillow cover and wash it weekly. Side sleepers usually need a higher pillow than back sleepers, so adjust each pillow for the person using it, and replace pillows once the fill goes flat.",
  ], 'Confirm the Set of 4 is selected — smaller sets on the same page are priced differently.'),
  A('B0FG91N1WG', 'Wudyhub Computer Desk for Home and Office, Compact Study and Laptop Table', 1899, 4999, '61s5+09b0HL._SL1080_.jpg', [
    "A proper desk makes working or studying from home far more comfortable than a bed or dining table: the laptop sits at a stable height, cables stay in one place, and you get into a routine. Compact desks fit into a bedroom corner or under a window without crowding the room.",
    "The Wudyhub desk is a simple, modern computer and study table sized for small spaces, described in the listing as sturdy for home and office use. At ₹1,899, it is priced well below a carpenter-made desk and arrives ready to assemble.",
    "Check the desk's height and depth on the product page against your chair and screen. Ideally your elbows rest at desk height with shoulders relaxed. Tighten all screws after the first week of use. Put a laptop stand or a book under the laptop to raise the screen to eye level. Keep a gap behind it for cables so chargers are not pinched against the wall.",
  ], 'Confirm the size and colour shown are selected — other variants on the same page are priced differently.'),
  A('B0H8NHLBH4', 'Zeno 100 Pro, 3GB RAM + 5GB Virtual RAM, 64GB, 5000mAh, 6.6 inch Display', 8599, 11999, '61l5qLCjICL._SL1500_.jpg', [
    "Budget smartphones under ₹10,000 are bought mainly for calls, WhatsApp, UPI payments and video, often as a first smartphone or a phone for a parent. Battery life and a big screen matter more here than camera specs or gaming power.",
    "The Zeno 100 Pro has 3GB RAM plus 5GB virtual RAM, 64GB storage, a 5000mAh battery, a 6.6 inch display and a UNISOC octa-core processor. The listing mentions DTS sound and military-grade protection. Virtual RAM uses part of the storage as extra memory, which helps keep a few apps open in the background.",
    "Virtual RAM is slower than real RAM, so expect this phone to handle everyday apps rather than heavy games. Use a microSD card if the phone supports it and 64GB fills up. Keep the box and bill for warranty service, and set up screen lock and UPI PIN before handing it to a first-time user.",
  ], 'Confirm the 3GB + 64GB variant and colour are selected — other variants on the same page are priced differently.'),
  A('B0CJDXRZJ3', 'Zevpoint 7.5 kW EV Charger, 32A, 5m Cable, App Control, Waterproof', 20999, 39999, '61qXydtbkzL._SL1080_.jpg', [
    "A 7.5 kW home charger roughly doubles the charging speed of the 3.3 kW portable charger bundled with many electric cars, so an overnight charge fills the battery with room to spare. It also means a quick top-up before an evening drive.",
    "The Zevpoint 7.5 kW charger comes with a carry bag, a wall bracket and a CEE socket, so it can be wall-mounted at home or carried in the car. It supports 32A, is waterproof, has a 5 metre cable, a 3 inch display, app control, adjustable power and auto cut-off, according to the listing.",
    "Check your car's onboard charger rating — if it only accepts 3.3 kW, a faster charger will not speed it up. Have an electrician confirm your sanctioned load and fit a dedicated 32A circuit with proper earthing and the matching socket. Lower the current from the app if your home wiring or load limit cannot take 32A.",
  ], 'Confirm the 7.5 kW model with accessories is selected — other ratings on the same page are priced differently.'),
  {
    store: 'Myntra', productId: '30621073', name: 'Michael Kors Men Stainless Steel Analogue Watch AK_MK9178',
    price: 9798, mrp: 24495,
    image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2024/AUGUST/19/F56QQ5g8_acedceab7afc4808b755da08f6ef60f5.jpg',
    affiliateUrl: INR('https://www.myntra.com/watches/michael+kors/michael-kors-men-dial--stainless-steel-straps-analogue-watch-akmk9178/30621073'),
    description: [
      "A stainless steel analogue watch is the easiest dress watch to live with: the bracelet does not absorb sweat the way leather does, it can be wiped clean, and it pairs with both office shirts and weekend wear. Analogue dials also read faster at a glance than digital displays.",
      "This Michael Kors watch (model AK_MK9178) has a stainless steel strap and an analogue dial. Michael Kors is an American fashion brand whose watches sell at a premium, and Myntra's listing price of ₹9,798 is 60% below the ₹24,495 M.R.P. — the kind of markdown usually seen only in end-of-season sales.",
      "Check the case size on the product page and compare it with a watch you already own, as fashion watches often run large. Bracelets usually need links removed to fit — a local watch shop can do this. Wipe the steel with a soft dry cloth, and check the water resistance rating before wearing it in the shower or pool.",
    ],
    variant: 'Confirm the AK_MK9178 model is selected — other Michael Kors watches on Myntra are priced differently.',
  },
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
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0925aa-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
