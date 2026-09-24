// DEAL-INGEST indiafreestuff tick 2026-09-24f
//
// /deals + /deals/superdeals -> 40 candidates after junk filter -> Buy Now ?rto= resolved.
// Amazon verified in logged-in tab (#centerCol); Flipkart via the IFS dl link in a Playwright tab
// (ld+json price/stock) + the product's own /p/itm path, re-opened to confirm it lands on the same pid.
// Coupon deals are listed at the live pre-coupon price; the coupon is named in the how-to.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const COUPON = (n) => `Tick the ${n}% coupon box on the product page before adding to cart — it comes off at checkout, below the price shown here.`;

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0HC7KXN8M', name: '30 cm Rechargeable LED Under-Cabinet Light',
    price: 499, mrp: 1099, image: IMG('41pnVk-fGKL._SL1500_.jpg'), coupon: 30,
    description: [
      "Most Indian kitchens have one overhead tube light, which leaves the counter under the wall cabinets in your own shadow exactly where you chop and cook. A rechargeable strip light stuck under the cabinet fixes that without an electrician, a new switch point or any wiring across the tiles, and it works just as well inside a wardrobe, a shoe rack or along a staircase.",
      "This is a 30 cm bar that runs on a built-in battery and charges over USB, so it can go anywhere a magnet or adhesive strip can hold it. Because it has no cable, it can be moved later if you rearrange the kitchen, and a single charge covers regular short bursts of use through the week. The 30 cm length suits a single cabinet or a wardrobe shelf.",
      "Before buying, measure the space: one 30 cm bar lights one work zone, and a long counter will need two or three. Charge it fully before the first mount, clean the surface with a dry cloth so the adhesive holds, and mount it towards the front edge of the cabinet so the light falls on the counter rather than the wall. The Amazon page also carries a 30% coupon that takes the final price well below the figure shown here.",
    ],
    variant: 'Check the listing shows the 30 cm size — longer bars on the same page cost more.',
  },
  {
    store: 'Amazon', productId: 'B0DY4JVDSG', name: 'Amazon Brand Solimo Stainless Steel Kadhai with Glass Lid, 20 cm',
    price: 494, mrp: 999, image: IMG('61FuI9ioRFL._SL1500_.jpg'),
    description: [
      "A kadhai is the workhorse of an Indian kitchen: sabzi, deep-frying pakoras, a quick poha or halwa all come out of the same deep, rounded pan. A 20 cm size is right for one to three people, and stainless steel is the no-fuss choice — no coating to scratch off, safe with steel ladles, and fine to scrub hard after something catches at the bottom.",
      "This one is from Solimo, Amazon's own house brand, with a matching glass lid so you can watch food simmer without letting the steam out. A lid matters more than people expect: covered cooking saves gas, keeps vegetables moist and cuts splatter when tempering. Steel kadhais also go straight from the stove to the table and do not pick up the smell of the last dish the way aluminium can.",
      "Stainless steel needs a little technique: heat the pan first, then add oil, and food sticks far less. Check the base type on the product page if you cook on induction, since not every steel pan is induction-ready. Hand-wash the glass lid and avoid putting it under cold water while hot. At this price, it is a sensible replacement for an old dented aluminium kadhai.",
    ],
    variant: 'Confirm the page shows the 20 cm kadhai with glass lid — other sizes are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0DCG58QQ9', name: 'Amazon Brand Solimo Stainless Steel Water Bottles, Set of 3, 970 ml',
    price: 498, mrp: 1799, image: IMG('71oD2BkQy0L._SL1500_.jpg'),
    description: [
      "Steel bottles are the easy swap away from single-use plastic: they do not leach taste into water, they survive being dropped, and they last for years. A set of three covers a small family — one for the fridge, one for the office bag, one for the kids' school bag — and a litre-class size means fewer refills through a hot day.",
      "This Solimo set, Amazon's own brand, has three stainless steel bottles of 970 ml each. At this price that is about ₹166 per bottle, less than many single steel bottles sell for on their own. These are single-wall fridge bottles rather than vacuum flasks, so they will get cold fast in the fridge but will not keep drinks cold for hours in a bag the way an insulated bottle does.",
      "Wash the bottles before first use and scrub the neck with a bottle brush every few days, since that is where residue builds up. Steel can dent if dropped on a hard floor, but a dent does not affect use. If you mainly want water that stays cold on a long commute, pick an insulated flask; if you want fridge storage for the whole family, this set is the better value.",
    ],
    variant: 'Make sure the listing shows the set of 3 in 970 ml — single bottles and other sizes cost differently.',
  },
  {
    store: 'Amazon', productId: 'B08DGP11M2', name: 'Attro Non-Stick Grill Pan, 24 cm',
    price: 473, mrp: 1199, image: IMG('51mC0wx1I5L._SL1234_.jpg'),
    description: [
      "A grill pan gives paneer tikka, vegetables, sandwiches and chicken the charred stripes and smoky edge of a tandoor or barbecue, right on a gas stove. The raised ridges hold food above the fat that drips away, so it cooks with less oil than a flat tawa and the surface browns instead of stewing in its own juices.",
      "This Attro pan is 24 cm across with a non-stick coating, which makes it easier for beginners: food releases cleanly and the pan wipes clean without long soaking. Attro is a budget Indian cookware brand, and a 24 cm grill surface holds two sandwiches or a single layer of paneer cubes for two people at a time.",
      "Non-stick lasts longest on low to medium heat with wooden or silicone tools — metal spatulas and high flame are what wear the coating out. Brush a few drops of oil on the ridges rather than pouring it in, preheat for a minute, and do not move food until it lifts on its own to get clean grill marks. Check the product page if you need induction compatibility.",
    ],
    variant: 'Confirm the 24 cm grill pan is selected before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0FDL2B53V', name: 'Toshiba 139 cm (55 inch) 4K Ultra HD Smart QLED TV',
    price: 41990, mrp: 53999, image: IMG('71BINZg+q9L._SL1500_.jpg'),
    description: [
      "55 inches is the sweet spot for most Indian living rooms: big enough to feel like a proper cinema screen from a sofa 2 to 2.5 metres away, but still sized to fit a standard wall unit. At that size, 4K resolution is worth having — Netflix, Prime Video, YouTube and JioHotstar all stream 4K content, and the extra detail is visible at normal viewing distance.",
      "This Toshiba set uses a QLED panel, where a quantum-dot layer widens the colour range compared with a regular LED TV, so reds and greens look richer in HDR content and cricket greens stay natural. It is a smart TV, so streaming apps run on the TV itself without a separate stick. Check the warranty terms and service coverage for your city on the listing.",
      "The price here is the plain live Amazon price, before any bank card offer — some cards may take more off at checkout, but you do not need one to get this figure. Measure your wall or table space before ordering, check whether the stand or wall mount is included, and book the free installation if Amazon offers it. Compare it with same-size QLEDs from other brands to see if the features fit.",
    ],
    variant: 'Confirm the page shows the 55 inch (139 cm) model — other screen sizes are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B07ZVRW5Q8', name: 'Coconut Stainless Steel U5 Milk Pot, 2000 ml',
    price: 553, mrp: 789, image: IMG('71VZWYKE1LL._SL1500_.jpg'),
    description: [
      "Boiling milk is a daily ritual in most Indian homes, and a dedicated milk pot makes it safer and cleaner than a random saucepan. The tall shape gives the froth room to rise before it spills over, and a 2 litre size handles a family's full day of milk plus tea in one boil.",
      "This is a Coconut brand stainless steel milk pot in 2000 ml capacity. Steel is the right material for milk: it does not react with it, holds no smell from the previous day, and can be scrubbed clean of the thin layer that sticks to the bottom. A handle means you can pour without a cloth or tongs, which is the main safety upgrade over a plain patila.",
      "Stock was very low when this price was checked — only a couple of units left — so it may sell out or change price soon. Rinse the pot with cold water before pouring in milk to reduce sticking at the base, and keep the flame medium once it starts to rise. Check the base type on the listing if you use an induction cooktop.",
    ],
    variant: 'Confirm the 2000 ml size is selected — smaller pots on the same listing are cheaper.',
  },
  {
    store: 'Amazon', productId: 'B07NQL72FP', name: "Giordano Analog White Dial Women's Watch",
    price: 2698, mrp: 11590, image: IMG('61FNvUw0ScL._SL1200_.jpg'),
    description: [
      "A white-dial analog watch is one of the few accessories that works with nearly everything: office formals, ethnic wear at a wedding, or weekend casuals. It is also a safe gifting pick when you are not sure of someone's style, because a clean white face reads classic rather than trendy and does not date quickly.",
      "Giordano is a Hong Kong fashion label whose watches are sold widely in India, known for dressy designs at mid-range prices. This women's model has a white dial with analog hands. At this price the discount is large against the printed MRP, which puts a branded dress watch within the budget normally spent on unbranded fashion watches.",
      "Only a couple of units were left in stock when the price was checked, so it may not last. Check the strap type and size on the product page, and whether the strap can be adjusted at home or needs a watch shop. Most fashion watches are splash-resistant rather than swim-proof, so take it off before a shower. Keep the box and warranty card if you are buying it as a gift.",
    ],
    variant: 'Confirm the listing shows the white dial model before checkout.',
  },
  {
    store: 'Amazon', productId: 'B0FWCJXL3W', name: 'Halonix 70W LED Outdoor Flood Light, Cool White',
    price: 1199, mrp: 1699, image: IMG('71vZbnE-R3L._SL1500_.jpg'),
    description: [
      "A flood light is the bright, wide beam you mount on a gate, building front, parking area, terrace or shop signboard — anywhere a normal bulb leaves dark corners. A 70 watt LED throws enough light to cover a driveway or a small compound, and it uses a fraction of the power of the old halogen flood lights it replaces.",
      "Halonix is an Indian lighting brand with wide availability of spares and service. This is an outdoor-rated LED flood light, built to be mounted on a wall or pole and to handle rain and dust. Cool white light is the usual choice for security and visibility because it makes colours and faces easier to see at night than warm yellow light.",
      "Outdoor lights must be wired properly: have an electrician fix it to a weatherproof junction, angle it downwards to avoid glare into neighbours' windows, and add a timer or photocell if you want it to switch on at dusk automatically. Amazon listed a 1 to 2 day dispatch time when checked. Confirm the wattage on the product page before ordering.",
    ],
    variant: 'Confirm the 70W option is selected — other wattages are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0DG96XKTW', name: 'Milton Cool Touch Epic 800 Insulated Tiffin Box, Set of 2',
    price: 499, mrp: 845, image: IMG('61BdCYXxd-L._SL1500_.jpg'),
    description: [
      "An insulated lunch box keeps rice and sabzi warm until lunch without needing an office microwave, which is the main complaint with plain steel dabbas. For school children and office goers who leave early in the morning, warm food at 1 pm is what makes a packed lunch actually get eaten.",
      "Milton is one of India's best-known names in bottles and tiffins, and the Cool Touch range uses insulated containers so the outside stays comfortable to hold while the food inside keeps its heat. This Epic 800 pack has two containers, so it covers a main dish and a side, or two lunches on the same day. The price works out to under ₹250 per container.",
      "Warm the containers with hot water for a minute before packing, and fill them close to the top — a half-empty insulated box loses heat faster. Keep lids closed until you eat. Check the product page for whether the inner containers are steel or plastic and which parts are microwave-safe, since that varies between Milton ranges.",
    ],
    variant: 'Confirm the listing shows the Epic 800 set of 2 before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0CGNHVV84', name: "POPWINGS Women's Casual V-Neck Tops, Combo Pack",
    price: 194, mrp: 2499, image: IMG('71ouKMx+O0L._SL1500_.jpg'),
    description: [
      "Basic V-neck tops are the everyday layer of a wardrobe: worn alone with jeans, under a shrug in the office, or at home. A combo pack means several go-to tops in one order, which is useful for college, travel or restocking tops that have gone faded or stretched.",
      "This POPWINGS listing is a combo of women's casual V-neck tops in solid colours. At under ₹200 for the pack, it is priced like a single top from a mall brand. POPWINGS is a budget online brand, so treat this as a comfortable everyday basic rather than a premium fabric — good value for home, college and casual outings.",
      "Size and colour decide the price on combo listings, so check that the price still shows after you pick your size and colour set. Read the size chart rather than going by your usual size, since online fast-fashion brands can run small. Wash dark and light tops separately the first few times. Amazon's return window covers fit problems if the size is off.",
    ],
    variant: 'Pick your size and colour combo, then confirm the price still reads ₹194.',
  },
  {
    store: 'Amazon', productId: 'B0DTTF3KZJ', name: 'Sakura Goldfish Food Pellets, 2 kg',
    price: 2331, mrp: 2590, image: IMG('712YLmu8oTL._SL1500_.jpg'),
    description: [
      "Goldfish need a food made for them: they are omnivores that do best on a mix of plant matter and protein, and flake food made for tropical fish can lead to bloating in fancy goldfish. Pellets sink or float slowly depending on the formula, which lets slow, round-bodied goldfish eat without gulping air at the surface.",
      "Sakura is a well-known Japanese brand of fish food used by hobbyists and breeders. This is the 2 kg pack, a bulk size that suits breeders, pet shops, garden ponds or anyone keeping a large tank of goldfish or koi. Buying bulk brings the per-kg cost down sharply compared with the small 100 g tubs sold at local aquarium shops.",
      "Fish food loses nutrients once opened, so decant a month's supply into a small airtight jar and keep the main pack sealed, cool and dry. Feed only what the fish finish in two to three minutes, once or twice a day — overfeeding is the most common cause of cloudy water. For a single small tank, a smaller pack will stay fresher.",
    ],
    variant: 'Confirm the 2 kg pack size is selected — smaller packs are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0BCG65LPG', name: "Spykar Men's Slim Fit Trackpants, Grey Melange",
    price: 737, mrp: 2899, image: IMG('61PLJIGriML._SL1500_.jpg'),
    description: [
      "Trackpants have moved from the gym to everyday wear: working from home, travelling, a morning walk, or a quick run to the market. A slim fit keeps them looking neat rather than baggy, so they pass as smart casual with a plain t-shirt or a hoodie.",
      "Spykar is an Indian denim and casual-wear brand sold in its own stores and major malls. These are men's slim-fit trackpants in grey melange, a colour that hides lint and small stains better than plain black and pairs with almost any top. At this price they cost roughly a quarter of the printed MRP.",
      "The price shown was checked for the XL size; other sizes on the same listing may cost more or be out of stock, so select your size and confirm the price before paying. Check the size chart for waist and length, since slim fits run narrower at the ankle. Wash inside out in cold water to keep the melange from pilling.",
    ],
    variant: 'Select size XL (the size at this price) — other sizes may be priced differently.',
  },
  {
    store: 'Amazon', productId: 'B08KWKDRFF', name: 'SteelSeries Aerox 3 Wireless Lightweight Gaming Mouse',
    price: 4144, mrp: 13999, image: IMG('51o4cXyeMqL._SL1500_.jpg'),
    description: [
      "Lightweight mice took over competitive gaming because a lighter mouse is quicker to flick and stop, and less tiring over long sessions of shooters like Valorant or CS2. The Aerox line uses a honeycomb shell with holes to cut weight, and the wireless version removes cable drag altogether, which is the other big advantage for fast aiming.",
      "SteelSeries is a Danish gaming-peripheral brand, and the Aerox 3 Wireless connects over a 2.4 GHz dongle for low-latency play or over Bluetooth for a laptop on the move. It has RGB lighting and a battery that charges over USB-C. The shell has a water- and dust-resistance rating, which matters with a perforated design.",
      "The discount is big against the printed MRP, which makes this one of the more affordable ways into a branded wireless gaming mouse. Use the 2.4 GHz dongle for gaming rather than Bluetooth, and install SteelSeries GG to set DPI and lighting. If you have large hands or prefer a palm grip, check the dimensions on the listing — the Aerox 3 is a smaller, symmetrical shape.",
    ],
    variant: 'Confirm the page shows the Aerox 3 Wireless (not the wired version).',
  },
  {
    store: 'Amazon', productId: 'B08L3DW3GM', name: 'WaterScience CLEO Shower and Tap Filter for Hard Water',
    price: 1495, mrp: 2295, image: IMG('51BXb0EsIWL._SL1080_.jpg'),
    description: [
      "Hard water and chlorine are the two usual culprits behind dry hair, itchy skin and white scale on taps in Indian cities, especially where homes run on borewell or tanker water. A shower filter sits between the pipe and the shower head and treats water right at the point of use, without a plumber or a whole-house softener.",
      "WaterScience is an Indian brand focused on shower and bath filters. The CLEO filter attaches to a shower or a tap, and uses a replaceable cartridge to reduce chlorine and the effects of hard water. Installation is usually a simple screw-on job with the adapters in the box.",
      "A filter is only as good as its cartridge, so note the replacement interval on the listing and budget for refills — a spent cartridge does nothing. Check your shower arm thread size before ordering. If your water is very hard, a shower filter reduces the damage but will not fully soften it; a whole-house softener is the bigger fix.",
    ],
    variant: 'Confirm the CLEO shower and tap filter is selected before checkout.',
  },
  {
    store: 'Flipkart', productId: 'SMWHB97A4F7FKFCN', name: 'boAt Storm Infinity Plus Smartwatch with 1.96 inch HD Display',
    price: 999, mrp: 6499,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/smartwatch/w/x/i/-original-imahbzq3nusgch4r.jpeg?q=70',
    affiliateUrl: FK('boat-storm-infinity-plus-20-days-big-battery-asap-charge-1-96-4-97-cm-hd-display-smartwatch/p/itm8850196df8194', 'SMWHB97A4F7FKFCN'),
    description: [
      "Under ₹1,000 is where most first-time smartwatch buyers start: something to show notifications, count steps, track sleep and heart rate, and last days between charges. At that price the watch that gets worn every day is the one with a big, readable screen and a battery that does not need charging every night.",
      "boAt's Storm Infinity Plus has a 1.96 inch HD display and is sold on the strength of its battery, which the listing claims lasts up to 20 days, with fast charging. boAt is India's biggest wearables brand, so service centres and replacement straps are easy to find.",
      "Battery claims assume light use — heavy notifications, always-on display and frequent workouts cut it down. Budget smartwatches estimate heart rate and SpO2 well enough for trends but are not medical devices. Install the boAt companion app, keep Bluetooth on for notifications, and check the strap colour on the listing before ordering.",
    ],
    variant: 'Pick the strap colour you want, then confirm the price still reads ₹999.',
  },
  {
    store: 'Flipkart', productId: 'FWTGEDV2MCH398J4', name: 'JMB 20 kg PVC Adjustable Dumbbell Set, 2.5 kg x 8 Plates',
    price: 847, mrp: 3649,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/l37mtu80/free-weight/j/a/7/20-kg-pvc-2-5kg-x-8pcs-adjustable-dumbbell-20kg-jb-20-20-jmb-original-imagedv2qeszh9qu.jpeg?q=70',
    affiliateUrl: FK('jmb-10-kg-20-pvc-2-5kg-x-8pcs-adjustable-dumbbell-20kg-home-gym-combo/p/itm90e9ce28fe3a0', 'FWTGEDV2MCH398J4'),
    description: [
      "An adjustable dumbbell set is the most useful single piece of home-gym equipment: curls, presses, rows, lunges and goblet squats all need nothing more. Plates let you start light and add weight as you get stronger, instead of buying a new pair of fixed dumbbells every few months.",
      "This JMB kit has 20 kg of PVC-covered plates, eight plates of 2.5 kg each, to load on dumbbell rods. PVC plates are filled with sand or cement inside a plastic shell: quieter on floors and gentler on tiles than bare iron. At this price that is roughly ₹42 per kg, well below the cost of iron plates.",
      "PVC plates are bulkier than iron for the same weight, so the maximum load per dumbbell is limited by rod length — check what rods are included on the listing. Always tighten the locks before every set, and lift over a mat to protect the floor. For beginners, 20 kg total (10 kg per hand) covers several months of progress.",
    ],
    variant: 'Confirm the listing shows the 20 kg PVC combo (2.5 kg x 8 plates).',
  },
  {
    store: 'Flipkart', productId: 'STFHGXMAZ7NNG2GH', name: 'KR Toys Super Soft Combo of 12 Stuffed Toys',
    price: 447, mrp: 1999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/stuffed-toy/x/c/z/super-soft-combo-of-12-stuffed-soft-toys-teddy-bear-in-for-kids-original-imahgegh6thwyhwz.jpeg?q=70',
    affiliateUrl: FK('kr-toys-super-soft-combo-12-stuffed-soft-toys/p/itm46f227dd98989', 'STFHGXMAZ7NNG2GH'),
    description: [
      "Small soft toys are the easy answer for return gifts at a child's birthday party, a gift basket, or filling a play corner. A multi-pack is far cheaper than buying single plush toys from a gift shop, and children usually love having a whole set of small animals to arrange and play with.",
      "This KR Toys combo includes 12 small stuffed soft toys, including teddy bears, in a single pack. At under ₹450 for the lot, each toy works out to about ₹37, cheaper than most individually wrapped return gifts. These are small plush toys, so expect a palm-sized to small cuddly size rather than a large bear.",
      "For toddlers under three, check that eyes and noses are embroidered or firmly fixed, and remove any loose tags before giving them. Soft toys collect dust, so hand-wash in mild soap and air-dry fully before use. Mix of designs in combo packs can vary from the photos on the listing.",
    ],
    variant: 'Confirm the listing shows the combo of 12 soft toys before checkout.',
  },
  {
    store: 'Flipkart', productId: 'SHTHZV5VQQ2XGDDK', name: 'Lyphy Men Solid Casual Shirt, Beige',
    price: 379, mrp: 2499,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shirt/c/y/j/l-checks-dp-lyphy-original-imahzv5vx47vpb8y.jpeg?q=70',
    affiliateUrl: FK('lyphy-men-solid-casual-beige-shirt/p/itm8a6916a5ece16', 'SHTHZV5VQQ2XGDDK'),
    description: [
      "A plain beige shirt is one of the most versatile pieces in a man's wardrobe: it pairs with blue jeans, black trousers, olive chinos and white sneakers alike, and it works from a college day to a casual dinner. Neutral colours also hide small stains and wrinkles better than white.",
      "This Lyphy shirt is a solid beige casual shirt for men. Lyphy is a budget fashion label on Flipkart, and at under ₹400 it is priced for everyday wear rather than a formal occasion. A shirt at this price makes sense as a spare you do not mind wearing out during travel or weekend outings.",
      "Check the size chart for chest and shoulder measurements rather than going by your usual size, since fits differ between budget brands. Wash it in cold water, inside out, and hang it to dry to keep the colour even. Flipkart's return window covers size issues if the fit is wrong.",
    ],
    variant: 'Pick your size, then confirm the price still reads ₹379.',
  },
  {
    store: 'Flipkart', productId: 'LSKFANUB6ETQGBGW', name: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick, 50 Voyager',
    price: 310, mrp: 749,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/lipstick/l/j/r/-original-imahf667gzjtzab2.jpeg?q=70',
    affiliateUrl: FK('maybelline-new-york-super-stay-matte-ink-liquid-lipstick/p/itm82e60e2cf508a', 'LSKFANUB6ETQGBGW'),
    description: [
      "Long-wear liquid lipsticks are for days when reapplying is not an option: a full office day, a wedding function or a long event. They dry down to a matte finish that does not transfer onto cups or masks, which is why they have become a staple in many makeup kits.",
      "Maybelline's Super Stay Matte Ink is one of the best-known long-wear liquid lipsticks sold in India. This listing is the shade 50 Voyager, a warm rose-nude that suits everyday wear on many Indian skin tones. At this price it costs well under half the printed MRP.",
      "Apply on clean, moisturised lips and let it set without pressing the lips together for a minute. Long-wear formulas can feel dry, so use a lip balm the night before rather than under the colour. To remove, use an oil-based cleanser or micellar water. Confirm the shade on the listing before ordering, since other shades may be priced differently.",
    ],
    variant: 'Confirm the shade selected is 50 Voyager — other shades may cost differently.',
  },
  {
    store: 'Flipkart', productId: 'VSLHEX7F9EK9FSF5', name: 'Nutriburst Japanese Marine Collagen Powder, Orange Flavour',
    price: 314, mrp: 799,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/vitamin-supplement/l/j/g/-original-imahg72gvvfbepmh.jpeg?q=70',
    affiliateUrl: FK('nutriburst-japanese-marine-collagen-powder-hair-nails-glowing-skin-orange/p/itm660d02d1f0526', 'VSLHEX7F9EK9FSF5'),
    description: [
      "Collagen is the main structural protein in skin, and the body makes less of it with age. Marine collagen supplements are popular as a daily drink for skin, hair and nails, and a flavoured powder that mixes into water is easier to keep up with than tablets.",
      "Nutriburst sells this Japanese marine collagen powder in orange flavour, marketed for hair, nails and skin. Marine collagen comes from fish, so it is not vegetarian — check this before buying if it matters for your diet. At this price it is a low-cost way to try a collagen routine.",
      "Supplements are not medicines, and results for skin and hair vary and take weeks of regular use. Anyone pregnant, on medication or with a fish allergy should speak to a doctor first. Follow the serving size on the pack, keep it sealed and dry, and check the expiry date on delivery.",
    ],
    variant: 'Confirm the orange flavour is selected — other flavours may be priced differently.',
  },
  {
    store: 'Flipkart', productId: 'VSLHGYCMKWXQTBHC', name: 'Nutriburst Vitamin D3 + K2 Supplement for Men and Women',
    price: 324, mrp: 799,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/vitamin-supplement/t/y/a/120-vitamin-d3-k2-supplement-for-men-women-bone-strength-heart-original-imahmaw8g9hk2kw5.jpeg?q=70',
    affiliateUrl: FK('nutriburst-vitamin-d3-k2-supplement-men-women-bone-strength-heart-health-support/p/itm6671fcbf0fee2', 'VSLHGYCMKWXQTBHC'),
    description: [
      "Vitamin D deficiency is very common in India despite all the sunshine, because office jobs, pollution and covered clothing cut down skin exposure. Vitamin D helps the body absorb calcium, and vitamin K2 is often paired with it because it helps direct that calcium into bones rather than soft tissue.",
      "This Nutriburst supplement combines vitamin D3 with K2, marketed for bone strength and heart health for both men and women. D3 is the form the body makes from sunlight and is generally preferred over D2 in supplements. At this price it is a budget option for a daily D3 routine.",
      "Vitamin D is fat-soluble and can build up if overdosed, so get a blood test and follow a doctor's advice on the right dose, especially if you already take calcium or other supplements. Anyone on blood thinners should check with a doctor before taking K2. Take it with a meal that has some fat for better absorption.",
    ],
    variant: 'Confirm the D3 + K2 pack shown matches the one at this price before checkout.',
  },
  {
    store: 'Flipkart', productId: 'STFG8DEGAAY86JYM', name: 'Osjs 4 Feet Soft Huggable Teddy Bear, 120.5 cm',
    price: 362, mrp: 2999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/stuffed-toy/p/o/f/3-feet-rd-resd-teddy-bear-vest-bear-best-teddy-bear-89-jst-soft-original-imah2wyhzzg4fwwc.jpeg?q=70',
    affiliateUrl: FK('osjs-4-feet-soft-huggable-teddy-bear/p/itm5722f7487f6cf', 'STFG8DEGAAY86JYM'),
    description: [
      "A big teddy bear is a classic gift for birthdays, anniversaries and Valentine's Day, and for children it doubles as a reading pillow and a bedtime companion. A four-foot bear has a strong effect on the person receiving it, which a small plush toy never matches.",
      "This Osjs teddy bear is listed at 120.5 cm, about four feet tall, in a soft, huggable plush. At under ₹400 it is priced like a much smaller toy, which is why oversized budget bears are popular on Flipkart for gifting. Big plush toys ship compressed, so expect it to need a day or two to fluff back up.",
      "Size and colour decide the price on this listing, so confirm the 120.5 cm option is selected. Large plush is hard to wash at home — spot clean with mild soap and sun-dry, or use a dry cleaner. For toddlers, check that the eyes and nose are firmly fixed. The colour and design can differ slightly from the listing photo.",
    ],
    variant: 'Select the 120.5 cm (4 feet) size — smaller sizes on the same page cost differently.',
  },
  {
    store: 'Flipkart', productId: 'KITG5AXGZEHPZDTY', name: 'saipro ROXON Phantom Badminton Racquet Set of 2 with 6-Piece Kit',
    price: 167, mrp: 999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/kit/g/i/7/roxon-phantom-badminton-racquet-set-of-2-piece-with-6-piece-new-original-imaha6bacprhaqfg.jpeg?q=70',
    affiliateUrl: FK('saipro-roxon-phantom-badminton-racquet-set-2-piece-6-kit/p/itma59b04c9cad42', 'KITG5AXGZEHPZDTY'),
    description: [
      "Badminton is India's most-played casual sport — in colonies, terraces, parks and school grounds — and all it takes to start is two racquets and a shuttle. A starter set lets kids and families play in the evenings without spending on premium racquets that beginners do not need yet.",
      "This saipro ROXON Phantom set comes with two racquets as part of a 6-piece kit. At under ₹170, it is priced for casual play rather than club competition. It is a sensible buy for children learning the game, a spare set at a holiday home, or evening games with friends.",
      "Budget racquets are heavier and have looser strings than branded graphite ones, which is fine for casual rallies but not ideal for serious training. Keep the racquets in their cover away from direct sun to protect the strings. If you start playing seriously, move to a lighter branded racquet and nylon or feather shuttles.",
    ],
    variant: 'Confirm the listing shows the set of 2 racquets with the 6-piece kit.',
  },
  {
    store: 'Flipkart', productId: 'SHTHZQSSWRCJ55UY', name: 'Solbiza Men Checkered Casual Shirt, Multicolor',
    price: 484, mrp: 1298,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shirt/z/y/c/s-lafr-solbiza-original-imahzqszqfssybhc.jpeg?q=70',
    affiliateUrl: FK('solbiza-men-checkered-casual-multicolor-shirt/p/itmf27c8181ccfdc', 'SHTHZQSSWRCJ55UY'),
    description: [
      "A checkered shirt is the easy middle ground between a plain formal and a loud printed shirt: it looks put-together with jeans or chinos, works open over a t-shirt, and hides creases better than a solid colour. It is a reliable pick for college, travel and casual Fridays.",
      "This Solbiza shirt is a men's checkered casual shirt in a multicolour pattern. Solbiza is a budget fashion label on Flipkart, and at under ₹500 the shirt costs a little over a third of its MRP. Multicolour checks pair easily with plain bottoms in blue, black or beige.",
      "Check the size chart for chest and shoulder measurements before ordering, as budget labels can fit differently from mall brands. Wash in cold water with similar colours for the first few washes so the dyes do not bleed. Flipkart's return window covers fit problems if the size is off.",
    ],
    variant: 'Pick your size, then confirm the price still reads ₹484.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\// };
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? COUPON(d.coupon) : NO_COUPON), image: d.image,
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
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0924f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
