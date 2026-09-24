// DEAL-INGEST indiafreestuff tick 2026-09-24e
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
    store: 'Amazon', productId: 'B0C8YWB46Y', name: 'Aristocrat Oasis Plus 69 cm Soft Check-in Trolley Bag, 4 Spinner Wheels, Dazzling Red',
    price: 1800, mrp: 9000, image: IMG('61g7S5-hq6L._SL1500_.jpg'), coupon: 15,
    description: [
      "A 69 cm bag is the medium check-in size: big enough for a week-long trip or two people's clothes on a short holiday, but still under most airline weight limits once packed. Soft-sided luggage flexes to squeeze into a car boot or a loft at home, and it weighs less empty than a hard shell of the same size, which leaves more of your baggage allowance for what you carry.",
      "This Aristocrat Oasis Plus is a softcase with four spinner wheels, a three-dial combination lock, a kick guard at the base and an expander zip that the brand says adds roughly 30% extra space for the return leg. Aristocrat is VIP Industries' value label, so service and spares are easy to find across India. The colour on this listing is Dazzling Red, which is also easy to spot on a baggage belt.",
      "Soft luggage is the right pick if you travel by train or road as often as by air and want something that survives being squashed. If your trips are mostly flights with fragile items inside, a hard shell protects better. Before checking out, note that the Amazon page carries a separate 15% coupon — ticking it takes the final price well below the list figure below.",
    ],
    variant: 'Confirm the page shows the 69 cm Medium size in Dazzling Red — other sizes and colours are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0CGLR5MTR', name: 'Bella Vita CEO Man Body Wash with Aloe Vera, 500 ml',
    price: 200, mrp: 499, image: IMG('61zVklp8MiL._SL1500_.jpg'),
    description: [
      "Bella Vita built its name on low-cost perfumes, and CEO Man is one of its best-known men's scents. The body wash puts that same woody fragrance into a daily shower gel, so the scent carries over from the bath instead of only coming from a spray. For anyone who already wears the CEO Man perfume, it is an easy way to layer it without paying perfume prices every day.",
      "This is the 500 ml bottle — the large size, which lasts one person roughly two to three months with daily use. The formula is enriched with aloe vera for hydration, and Amazon lists it as suitable for all skin types. At this price it costs about 40 paise per millilitre, which is in line with mass-market shower gels that have no fragrance story behind them at all.",
      "A shower gel with a strong perfume note is best for people who like a lingering scent after bathing; if you have very sensitive or eczema-prone skin, a fragrance-free wash is the safer choice. Use a loofah or mesh sponge to get more lather from less gel, and keep the cap closed between uses so the fragrance does not fade.",
    ],
    variant: 'Make sure the size shown is 500 ml — the smaller bottles on the same listing are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0G3XBGPG8', name: 'Clay Craft Vacbott Sonic Pro 550 ml Vacuum Insulated Steel Flask, Pink',
    price: 364, mrp: 999, image: IMG('61hCxRjgEZL._SL1500_.jpg'),
    description: [
      "An insulated steel bottle does two jobs a plastic bottle cannot: it keeps tea or coffee hot through a long commute, and it keeps water cold through an Indian afternoon without sweating all over your bag. 550 ml is the everyday size — enough for a morning at the office or a school day, but slim enough to fit a side pocket.",
      "Clay Craft is a Jaipur ceramics and kitchenware brand, and the Vacbott Sonic Pro is its double-wall vacuum flask in food-grade 304 stainless steel. The brand quotes up to 18 hours hot and 24 hours cold, a locking leak-proof cap, and a compact body about 23 cm tall. The listing also states it is BIS certified. The colour on this deal is pink.",
      "Real-world retention depends on how full the bottle is and how often you open it, so treat the hour figures as a best case. Pre-warm the flask with hot water for a minute before filling with tea, and hand-wash rather than putting it in a dishwasher to protect the vacuum seal. Avoid storing milk-based drinks in it for more than a few hours.",
    ],
    variant: 'Check the listing shows the 550 ml pink variant before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0FFHBK89D', name: "D'Velas Earth & Ember Scented Candle Gift Set with Bandhani Bowl Candle and Diyas",
    price: 256, mrp: 2799, image: IMG('91PRbgDAb2L._SL1500_.jpg'),
    description: [
      "Scented candle sets are one of the easiest low-cost gifts to get right: they suit almost anyone, need no size guessing, and look finished straight out of the box. This one is priced at a level that works for office gift exchanges, return favours and festive hampers, where you need several of the same thing without spending much on each.",
      "The D'Velas Earth & Ember box combines a bandhani-print bowl candle, four small matki-style diyas and four diya candles, packed in a ready-to-gift box weighing about 870 grams. The styling leans on Indian festive colours and craft prints, so it fits Diwali décor as easily as a housewarming table, and it works both as a gift and as your own festive lighting.",
      "For safety, burn candles on a heat-proof plate, away from curtains and out of reach of children and pets, and trim the wick before each lighting to keep the flame small. The first burn should last long enough for the wax to melt to the edge of the container, which prevents tunnelling and makes the candle last longer.",
    ],
    variant: "Confirm the page shows the Earth & Ember gift set — other D'Velas boxes on the same listing are priced differently.",
  },
  {
    store: 'Amazon', productId: 'B0H8ZDTZJ5', name: 'USB-C Rechargeable Electric Arc Gas Lighter for Kitchen with Flexible Neck',
    price: 169, mrp: 799, image: IMG('61b4CbktZtL._SL1024_.jpg'), coupon: 19,
    description: [
      "A rechargeable arc lighter replaces both the matchbox and the spark gun that stops clicking after a few months. It makes a small electric plasma arc instead of a flame, so there is no fuel to refill, it works in a breeze on a balcony stove, and it lights diyas and candles as easily as a gas burner.",
      "This one charges over a USB Type-C cable, has a neck that bends through 360 degrees to keep your fingers away from the burner, and a safety lock so it cannot fire by accident in a drawer. The listing carries a one-year warranty and quotes around 200 lights per charge — enough for weeks of normal kitchen use between top-ups.",
      "Keep the tip clean — a film of oil or food on the electrodes is the usual reason an arc lighter stops working. Charge it before it runs flat rather than after, and store it with the lock on. The Amazon page also carries a separate 19% coupon; ticking it brings the final price below the figure shown here.",
    ],
    variant: 'Make sure the lighter shown is the USB-C rechargeable arc model with the bendable neck.',
  },
  {
    store: 'Amazon', productId: 'B0HKRRBRQH', name: 'JK Vision Fascia Massage Gun with 6 Heads, USB-C Rechargeable, Sage Green',
    price: 1649, mrp: 8999, image: IMG('61CfnffiD9L._SL1200_.jpg'),
    description: [
      "A percussion massage gun is the at-home version of a sports massage: it taps rapidly into a tight muscle to ease soreness after a run, a gym session, or a long day at a desk. It is most useful for large muscle groups — calves, thighs, shoulders and the upper back — where a foam roller is awkward to use.",
      "This JK Vision fascia gun comes with six interchangeable heads, so you can switch between a broad ball for big muscles and narrower heads for smaller areas. It weighs about 800 grams, which is light enough to hold against your own shoulder without your arm tiring, and it charges over USB-C, the same cable most phones now use. The colour on this deal is sage green.",
      "Start on the lowest speed and keep the head moving for one to two minutes per muscle rather than holding it on one spot. Do not use it on the front of the neck, directly on bones or joints, or on injuries, varicose veins or swelling; people with heart conditions or who are pregnant should check with a doctor first.",
    ],
    variant: 'Confirm the colour shown is Sage Green with the 6-head kit.',
  },
  {
    store: 'Amazon', productId: 'B0GR5KY1TD', name: 'Karnage by EVM Visage 95 Tri-Mode Wireless Gaming Keyboard with Display',
    price: 1899, mrp: 4999, image: IMG('71p+K0Eo4BL._SL1500_.jpg'),
    description: [
      "A 95-key layout keeps the number pad and arrow keys of a full-size keyboard but squeezes them into a narrower body, which frees space on the desk for a mouse. It suits people who game and also type spreadsheets or code on the same machine, and who find a 60% or 65% board too cramped.",
      "The Karnage Visage 95 from Indian brand EVM connects three ways — 2.4 GHz dongle, Bluetooth 5.0, or a USB-C cable — so it can switch between a PC, a laptop and a tablet. It is a mecha-membrane keyboard (membrane switches with a firmer, more tactile feel) with RGB backlighting, 19-key anti-ghosting, a volume knob, a small status display and a 2000 mAh battery.",
      "Be clear about the switch type: this is not a true mechanical keyboard, so it is quieter and cheaper but not hot-swappable. Use the 2.4 GHz dongle or the cable for gaming, since Bluetooth adds a little input lag, and turn the RGB down when on battery to stretch the time between charges.",
    ],
    variant: 'Check the page shows the Visage 95 model — other Karnage keyboards on the listing are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0GPXTLGDX', name: 'Kronokare Root Awakening Onion and Rosemary Hair Oil, 90 ml, Pack of 3',
    price: 360, mrp: 900, image: IMG('51pLUhMXUyL._SL1500_.jpg'),
    description: [
      "Onion and rosemary are two of the most searched ingredients in Indian hair care right now, usually by people dealing with hair fall. A pack of three bottles works out to a few months of regular oiling for one person, or a single round for a household that shares.",
      "Kronokare's Root Awakening oil blends onion and rosemary in a 90 ml bottle, and the listing says it is free of mineral oil, parabens and silicones. It is pitched at reducing hair fall, calming a dry scalp and adding shine. This deal is for the pack of three, which brings the price to about ₹120 per bottle.",
      "Be realistic about results: oiling helps scalp comfort and hair texture, but hair fall from stress, thyroid issues, low iron or genetics needs a doctor, not an oil. Warm a small amount, massage it into the scalp for a few minutes, and wash it out after one to two hours or overnight. Patch-test first if you react to onion or essential oils.",
    ],
    variant: 'Make sure the pack size shown is Pack of 3 — single bottles are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0GC6DF1FY', name: 'Marwadi Farm Afghani Anjeer Dried Figs, 1 kg',
    price: 399, mrp: 1399, image: IMG('71-HFO5eQPL._SL1500_.jpg'),
    description: [
      "Anjeer (dried fig) is one of the costlier dry fruits in India, so a one-kilogram pack at this price is worth noting for anyone who snacks on dry fruits, soaks a couple each morning, or makes sweets and milkshakes for the festive season. Figs are naturally sweet and high in fibre, which is why they are a common swap for sugary snacks.",
      "This Marwadi Farm pack is sold as Afghani sun-dried figs in a one-kilogram bag. At ₹399 per kilogram it works out to roughly 40 paise per gram — well below typical supermarket anjeer prices, which makes it a sensible pick for bulk use in festive cooking or for a family that eats dry fruits daily.",
      "Dry-fruit quality varies from batch to batch, so open the pack on arrival and check that the figs are soft, not rock-hard, and free of mould or insects. Store them in an airtight jar in a cool place, or in the fridge during humid months. Soaking two or three figs overnight in water makes them easier to digest.",
    ],
    variant: 'Confirm the weight shown is 1 kg — smaller packs on the listing are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0FJXVNK41', name: "Mumma's LIFE Spin Mop with Bucket, Steel Wringer and 2 Microfibre Refills",
    price: 699, mrp: 1299, image: IMG('51snVFN9SkL._SL1500_.jpg'), coupon: 2,
    description: [
      "A spin mop is the fastest upgrade from a floor cloth and bucket: you spin the head in the basket to wring it, so your hands never touch dirty water and the floor dries faster because the mop leaves less water behind. For tiled or marble Indian floors that get mopped daily, it saves both time and knee strain.",
      "This Mumma's LIFE set includes the bucket, a steel wringer basket, an extendable handle and two microfibre mop heads. The rotating head helps it reach under beds, sofas and into corners. The bucket colour is random, so you may not get the exact shade in the photos — the parts and function are the same.",
      "Rinse and dry the microfibre heads after use and swap them every few months, since a worn head spreads dirt instead of lifting it. Do not use bleach on microfibre. There is also a small 2% coupon on the Amazon page that takes a little more off at checkout.",
    ],
    variant: 'Check that the set shown includes the bucket with steel wringer and two refills.',
  },
  {
    store: 'Amazon', productId: 'B08GC2BBFZ', name: 'Nirlon Bling Non-Stick Induction Kadhai 24 cm, 3 L, with Glass Lid',
    price: 1042, mrp: 3495, image: IMG('71b7RrnIPyL._SL1500_.jpg'),
    description: [
      "A 3-litre kadhai is the working pan of most Indian kitchens — big enough for a sabzi for four, a batch of pakodas or a small biryani. Choosing one with an induction base means it keeps working if you switch from gas to an induction cooktop, or cook on both.",
      "This Nirlon Bling kadhai has an aluminium body with a triple-layer PTFE non-stick coating, a 24 cm diameter and a glass lid in the box. Nirlon states it works on both gas and induction. The non-stick surface means you can cook with noticeably less oil, and the glass lid lets you check a simmering gravy without letting the steam out.",
      "Look after the coating: use wooden or silicone spatulas, avoid heating the pan empty on high flame, and let it cool before washing so it does not warp. Stock is low on this listing — the page showed only one left — so check it is still available before paying.",
    ],
    variant: 'Make sure the page shows the 24 cm / 3 L kadhai with glass lid in the Bling finish.',
  },
  {
    store: 'Amazon', productId: 'B0DZ6PZ8JN', name: 'Red Tape Printed Activewear Round Neck T-Shirt for Men, Regular Fit',
    price: 653, mrp: 2799, image: IMG('61OzdfbsGML._SL1500_.jpg'),
    description: [
      "Activewear tees are made from synthetic fabric that pulls sweat away from the skin and dries quickly, which is why they feel better than cotton at the gym, on a run or on a humid commute. They also hold their shape and colour through frequent washing better than basic cotton tees.",
      "This Red Tape tee uses an 88% nylon, 12% elastane fabric at 170 GSM — a mid-weight knit with enough stretch for movement. It has a round neck, half sleeves, a regular fit and a printed design. Red Tape is an Indian footwear and apparel brand widely sold on Amazon, and its sizing is consistent across its tees.",
      "Apparel prices on Amazon often change by size and colour, so the price below is for the variant that was checked. Look at the size chart rather than guessing, since activewear can sit closer to the body than a cotton tee. Wash it inside out in cold water with similar colours, and skip fabric softener, which blocks the sweat-wicking finish.",
    ],
    variant: 'Pick your size and check the price shown for that size and colour still matches — apparel variants are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B097JLKP8X', name: 'Safari 55 cm Hardside Cabin Trolley with Laptop Compartment, 8-Wheel Spinner',
    price: 2299, mrp: 8800, image: IMG('71uNY+zpzBL._SL1500_.jpg'),
    description: [
      "A 55 cm cabin trolley fits the carry-on size most Indian domestic airlines allow, so you can skip the check-in queue on short trips. A dedicated laptop compartment is the useful twist here: you can pull the laptop out at security without unzipping the whole case on the floor.",
      "This Safari cabin bag has a polycarbonate hard shell, eight spinner wheels for smooth 360-degree rolling, and a recessed combination lock that sits flush so it does not snag on belts. Safari backs it with a three-year global warranty, which is unusually long at this price and useful if a wheel or handle gives up abroad.",
      "Airline cabin limits are about both size and weight (often 7 kg in India), and a hard shell adds weight before you pack anything, so weigh the packed bag at home. Polycarbonate flexes rather than cracks, but it does scuff; a cover keeps it looking new. Confirm the colour you want before checking out, as the price can differ by colour.",
    ],
    variant: 'Confirm the size is 55 cm cabin with the laptop compartment and check the colour you want is at this price.',
  },
  {
    store: 'Amazon', productId: 'B0BP2RTPRL', name: "Spykar Men's Cotton Blend Printed Round Neck Sweatshirt, Slim Fit",
    price: 654, mrp: 2599, image: IMG('61SVc3EapqL._SL1500_.jpg'),
    description: [
      "A crew-neck sweatshirt is the easiest layer for the Indian winter, which in most cities means cool mornings and nights rather than real cold. It goes over a tee, works for college or casual office days, and is lighter to carry than a jacket.",
      "This Spykar sweatshirt is a cotton-blend fabric with a printed design, full sleeves, a round neck and a slim fit. Spykar is a Mumbai denim and casualwear brand with wide retail presence, so sizing is consistent with its jeans and tees if you already own them. Amazon showed only a few left in stock on this variant when it was checked.",
      "Slim fit means sizing up if you plan to wear it over a shirt or a thick tee. The price here is for the variant that was checked, and other sizes or colours can cost more, so check the price after choosing your size. Wash it inside out on a gentle cycle and dry it in the shade so the print lasts.",
    ],
    variant: 'Choose your size and colour and check the price shown for that variant still matches.',
  },
  {
    store: 'Amazon', productId: 'B08LSPTLN4', name: 'SX Fitness 14 kg Home Gym Combo with PVC Plates and Adjustable Dumbbell Rods',
    price: 899, mrp: 2999, image: IMG('51A7+nQmwqL.jpg'),
    description: [
      "A plate-loaded dumbbell set is the cheapest way to start strength training at home, because you buy one set of plates and move them between rods as you get stronger. Fourteen kilograms covers most beginner routines — curls, presses, rows and lunges — for the first several months.",
      "This SX Fitness combo includes 14 kg of PVC weight plates — four 2.5 kg plates and four 1 kg plates — with adjustable dumbbell rods. PVC plates are filled rather than solid iron, so they are bulkier for the same weight but quieter on the floor and will not rust or mark tiles the way bare iron does.",
      "Always lock the plates with the collars before lifting, and check them between sets — loose plates are the main injury risk with adjustable dumbbells. Start light and learn the movement before adding weight. If you expect to progress quickly past 7 kg per hand, plan to buy extra plates later rather than a whole new set.",
    ],
    variant: 'Confirm the page shows the 14 kg combo with dumbbell rods — other weight combos are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0FN7T6K73', name: 'TAG Gamerz Titan RGB Wired Over-Ear Gaming Headphone with Mic',
    price: 1038, mrp: 2199, image: IMG('71ginKZuo9L._SL1500_.jpg'),
    description: [
      "A wired gaming headset is still the lowest-lag way to hear footsteps and call-outs in a multiplayer game, and a boom mic close to your mouth is clearer on voice chat than most laptop microphones. For work calls, over-ear cups also block more background noise than earphones.",
      "The TAG Gamerz Titan uses 50 mm drivers with 32 ohm impedance, so a phone or laptop can drive it without an amplifier. Sound and mic run over a single 3.5 mm plug, while a separate USB plug only powers the RGB lighting. It has a retractable mic and an in-line volume roller, so you can turn down the game without alt-tabbing.",
      "Because audio runs over the 3.5 mm jack, a PC with separate mic and headphone ports needs a splitter cable. The RGB lighting only works when the USB plug is connected, but you can leave it unplugged if you do not want the lights. Check that your console controller has a 3.5 mm port before buying for console use.",
    ],
    variant: 'Make sure the page shows the Titan RGB model.',
  },
  {
    store: 'Amazon', productId: 'B0CGXPQQC6', name: 'Zebronics Shark Lite Wireless Rechargeable Gaming Mouse, 4600 DPI, RGB',
    price: 699, mrp: 1999, image: IMG('61K2ZX6suPL._SL1500_.jpg'),
    description: [
      "A rechargeable wireless mouse removes two annoyances at once: no cable dragging across the desk, and no AA batteries to replace. At this price it is a sensible upgrade for laptop users who want a proper-sized mouse for work and casual gaming.",
      "The Zebronics Shark Lite connects over a 2.4 GHz USB receiver and has a DPI button that steps through 700, 1500, 3000 and 4600, so you can drop it low for precise work and raise it for fast games. It has RGB lighting and charges over Type-C; Zebronics says a three-hour charge gives up to about four days of use.",
      "For competitive gaming, a wired or high-polling-rate wireless mouse will feel faster, but for office work and single-player games this is plenty. Turn the RGB off to get longer battery life, and plug the receiver into a port on the side of the laptop, not behind a metal case, to avoid dropouts.",
    ],
    variant: 'Confirm the model shown is the Shark Lite wireless mouse.',
  },
  {
    store: 'Flipkart', productId: 'SNRHQKD9HF8FGNNB', name: 'Aqueria 3-in-1 Bright Detan Sunscreen SPF 50 PA++++ with Vitamin C and Niacinamide, 100 g',
    price: 198, mrp: 899,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/sunscreen/g/j/4/100-3-in-1-bright-detan-sunscreen-vitamin-c-niacinamide-original-imahqkd9nbjgwwqr.jpeg?q=70',
    affiliateUrl: FK('aqueria-sunscreen-spf-50-pa-3-in-1-bright-detan-vitamin-c-niacinamide-hyaluronic-acid/p/itmc78501d0f8f7a', 'SNRHQKD9HF8FGNNB'),
    description: [
      "Daily sunscreen is the single most effective anti-tan and anti-ageing step in any skincare routine, and in Indian sun it matters year-round, not only in summer. A 100 g tube is a generous size — many sunscreens are sold in 50 g — so it lasts much longer with the two-finger amount dermatologists recommend for face and neck.",
      "Aqueria's cream sunscreen is rated SPF 50 and PA++++, the highest PA grade for UVA protection, and covers both UVA and UVB. It combines sunscreen with vitamin C, niacinamide and hyaluronic acid, pitching itself as a detan and brightening step in one. Flipkart lists it for all skin types.",
      "Sunscreen only works if enough goes on: two finger-lengths for face and neck, applied 15 minutes before stepping out, and reapplied every two to three hours outdoors. Patch-test first if you have acne-prone or sensitive skin, since active ingredients like vitamin C can sting on broken skin. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm the page shows the 100 g 3-in-1 Bright Detan variant.',
  },
  {
    store: 'Flipkart', productId: 'ACCGUSZZZPAT5PKS', name: 'Frontech SPK-0004 2.0 USB Desktop Speakers with AUX and RGB Lights',
    price: 575, mrp: 900,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/speaker/laptop-desktop-speaker/v/4/e/spk-0004-frontech-original-imahgxgqdvvgfhz4.jpeg?q=70',
    affiliateUrl: FK('frontech-spk-0004-2-0-usb-speakers-aux-2-x-3w-drivers-rgb-lights-6-w-laptop-desktop-speaker/p/itmd8d9972021a6b', 'ACCGUSZZZPAT5PKS'),
    description: [
      "Laptop speakers are thin and tinny, and a pair of small desktop speakers is the cheapest fix for video calls, YouTube and background music at a work-from-home desk. A 2.0 set means two stereo speakers with no separate subwoofer, so they fit either side of a monitor.",
      "Frontech's SPK-0004 draws power from a USB port and takes sound through a 3.5 mm AUX cable, so it works with laptops, desktops and TVs with a headphone jack. It uses two 2-inch, 3 W drivers for 6 W total, has an in-line volume control, and adds RGB lighting. It holds a 3.6-star rating from over 450 Flipkart buyers.",
      "Set expectations: at 6 W these fill a desk, not a room, and bass is light. Plug the USB into a port that supplies steady power (a phone charger brick also works) to avoid hum, and keep the laptop volume high while controlling loudness from the in-line knob for the cleanest sound. The price here is before any bank offer.",
    ],
    variant: 'Confirm the model shown is Frontech SPK-0004.',
  },
  {
    store: 'Flipkart', productId: 'FVBHFZHJFRKGXZUT', name: 'Kichenkraft Apple Shape 2-Tier Fruit and Vegetable Basket with Lid',
    price: 149, mrp: 1500,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/fruit-vegetable-basket/i/o/l/0025-kichenkraft-original-imahm5qwm9zybtjn.jpeg?q=70',
    affiliateUrl: FK('kichenkraft-apple-shape-fruit-vegetable-basket-protective-lid-plastic-stainless-steel/p/itm973a631c34aca', 'FVBHFZHJFRKGXZUT'),
    description: [
      "A covered fruit basket keeps fruit on the dining table where people will actually eat it, while the lid keeps flies and dust off — a real issue in Indian kitchens with open windows. A two-tier design also separates items that ripen fast, like bananas, from those that bruise easily.",
      "This Kichenkraft basket is shaped like an apple, made from plastic and stainless steel, with two tiers and a protective lid. The model number is 0025 and it comes as a single basket. On Flipkart it holds a 4.1-star rating from about 100 buyers, and at ₹149 it is among the lowest prices for a lidded two-tier basket.",
      "Flipkart marks the item as fragile, so check it on delivery and report any cracks straight away within the return window. Wipe it with a damp cloth rather than soaking, and keep it out of direct sun, which can fade plastic. Do not store fruit together with onions or potatoes, since they spoil each other faster.",
    ],
    variant: 'Confirm the page shows the apple-shape two-tier basket with lid.',
  },
  {
    store: 'Flipkart', productId: 'WATHDGZDDYRAZYP6', name: 'Van Heusen VH000066D Analog Watch for Women, Rose Gold Strap',
    price: 1299, mrp: 4799,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/watch/k/c/c/1-vh000066d-van-heusen-women-resized-original-imahhrzbadv9hvzw.jpeg?q=70',
    affiliateUrl: FK('van-heusen-analog-watch-women/p/itmb9da1e7b137b5', 'WATHDGZDDYRAZYP6'),
    description: [
      "A slim analogue watch in rose gold is one of the safest accessory gifts: it goes with ethnic and western outfits, suits both office wear and weddings, and never needs charging. Branded watches at this price usually turn up in end-of-season clearance, so it is worth grabbing while stock lasts.",
      "This Van Heusen piece (style code VH000066D) has a silver round dial, a rose-gold strap, a 29 mm case and an 8.5 mm thickness, with a quartz movement. It is water resistant for splashes and hand-washing, not swimming. Flipkart lists it with a 4.5-star rating, though from only a handful of buyers so far.",
      "A 29 mm dial is on the small, dainty side, which suits slim wrists; if you prefer a bolder look, compare it against a watch you already own. Keep it away from perfume sprays and take it off before washing dishes to protect the finish. The price here is before any Flipkart bank offer.",
    ],
    variant: 'Confirm the style code shown is VH000066D with the rose-gold strap.',
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

const file = process.argv[2] ?? 'ifs-0924e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
