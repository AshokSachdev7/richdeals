// DEAL-INGEST indiafreestuff tick 2026-09-24j
//
// /deals + /deals/superdeals -> 41 candidates -> Buy Now ?rto= resolved. Myntra via InRDeals.
// Amazon verified in logged-in tab (#centerCol); Flipkart + Myntra in a Playwright tab (ld+json price/stock,
// struck-through MRP beside the price, and the product's own /p/itm path carrying the same pid).
// Coupon deals are listed at the live pre-coupon price; the coupon is named in the how-to.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (id) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(`https://www.myntra.com/${id}`)}`;
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
    store: 'Amazon', productId: 'B0HCPHZWVL', name: 'B7000 Multipurpose Precision-Tip Glue, 50 ml',
    price: 249, mrp: 799, image: IMG('712zYVF6WmL._SL1500_.jpg'), coupon: 50,
    description: [
      "B7000 is the clear, slightly flexible glue that phone repair shops use to seat screens and back panels, and it has become a staple for craft work too. Unlike instant super glue it stays workable for a few minutes, so you can line parts up properly, and it dries clear rather than white, which matters on jewellery, glass and rhinestone work.",
      "This is a 50 ml tube with a fine precision nozzle, which is the part that makes it useful: you can lay a thin bead exactly along the edge of a phone frame, or fix a single loose stone on a sandal strap, without smearing the surrounding surface. A 50 ml tube lasts a long time for home repairs, fabric, shoes and small craft batches.",
      "Use it in a ventilated room, since solvent glues give off a strong smell while curing. Clamp or tape the parts and leave them overnight for full strength; it grips within minutes but is not fully set for hours. The Amazon listing carries a 50% coupon on top of this price, so tick it before checkout and the final bill drops to roughly half of the figure shown here.",
    ],
    variant: 'Confirm the 50 ml tube is selected — smaller packs on the same page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0H37BS2PH', name: 'BonKaso Tamper-Proof Poly Courier Bags with POD Sleeve, 6x8 inch, Pack of 500',
    price: 679, mrp: 4799, image: IMG('61aH1uNFo+L._SL1500_.jpg'),
    description: [
      "Anyone selling on Meesho, Instagram or their own small store goes through courier bags quickly, and buying them 50 at a time at the local market costs far more per piece. A pack of 500 at this price works out to about ₹1.36 per bag, the kind of number that actually moves the margin on low-ticket orders like jewellery, socks or phone cases.",
      "These BonKaso bags are 6x8 inch poly mailers with a self-adhesive strip and a tamper-proof seal, so once closed they cannot be opened and resealed without it showing. Each one also has a POD sleeve on the front, a clear pocket for the invoice or shipping label, which saves tape and keeps the paperwork readable when the courier scans it.",
      "Check the size before ordering: 6x8 inch suits flat, small items such as accessories, cosmetics, a tightly folded t-shirt or documents. Anything bulkier needs the larger sizes sold on the same listing. Store the pack away from heat so the adhesive strip does not weaken, and seal each bag firmly along its full width for the best hold.",
    ],
    variant: 'Select the 6x8 inch, pack of 500 option — other sizes and pack counts cost more.',
  },
  {
    store: 'Amazon', productId: 'B0HD7F1F46', name: 'Crompton Galaxy Leaf LED Festive String Light, 4 m, Warm White',
    price: 359, mrp: 1999, image: IMG('71tQNUj368L._SL1500_.jpg'),
    description: [
      "Diwali lighting is where a known brand is worth a little extra: cheap unbranded string lights are the ones that fail after one season or run on thin wire. Crompton is a household name in fans and lighting, and this festive light plugs straight into a standard Indian socket through a 2-pin plug, with no adapter or batteries to lose.",
      "The string is 4 metres long with 180 LEDs shaped as small leaves, in a warm white that looks softer on balconies, mandirs and door frames than the blue-white of basic fairy lights. It draws about 5 W, so leaving it on through a festive evening barely registers on the electricity bill.",
      "Measure the space before hanging: 4 m covers one door frame or a small balcony rail, and longer runs need a second string. Keep the plug end indoors or under cover if you use it outside, and switch it off at the socket when it is not in use. The listing showed only one unit left at this price, so stock may not last.",
    ],
    variant: 'Confirm the Leaf design, 4 m warm white is selected — other patterns on the same page are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0773H53QS', name: 'Hosley Lavender Fields Scented Pillar Candles, Pack of 2',
    price: 399, mrp: 900, image: IMG('71TgTLHk68L._SL1500_.jpg'),
    description: [
      "A scented candle is one of the easiest ways to make a room feel finished for guests, and lavender is the safe fragrance choice: calm, familiar and rarely overpowering in a small bedroom or living room. Pillar candles also work as decor when unlit, which is why they are a common festive and return gift.",
      "These are Hosley pillar candles with a lavender fragrance, about 3 inches tall and 2.75 inches across the base, so they fit most standard candle plates and holders. The brand sells them as dripless, which holds when the candle stands straight and away from a fan or window draught.",
      "Trim the wick to around 5 mm before each use and let the top melt evenly across on the first burn so the candle does not tunnel down the middle. Never leave a lit candle unattended, especially near curtains or with children and pets around. At this price the pair costs about the same as a single candle from a mall store.",
    ],
    variant: 'Make sure the Lavender Fields pack of 2 is selected — other fragrances and pack sizes are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B08KFYHZ79', name: "Lavie Women's Zarya Tote Bag",
    price: 1149, mrp: 4499, image: IMG('71EtlLdcj1S._SL1500_.jpg'),
    description: [
      "A structured tote is the one bag that covers most of a working week: it takes a tiffin, a water bottle, a diary and the usual wallet and keys, and still looks right in an office. Lavie is one of the better-known Indian handbag brands, sold in malls and department stores, so the quality is a known quantity.",
      "The Zarya is a women's tote from Lavie's everyday range, with top handles for carrying on the forearm or shoulder. At this price it costs about a quarter of its listed MRP, which puts a branded bag in the same bracket as unbranded market totes that tend to lose their shape or peel at the handles within a year.",
      "Colour decides the price on this listing, so check that the shade you want is the one showing the deal price. Faux-leather bags last longest when kept away from direct sun and not stuffed beyond their shape; wipe them with a damp cloth rather than washing. Check the dimensions on the page if you need a specific laptop or tablet to fit.",
    ],
    variant: 'Pick the colour, then confirm the price still reads ₹1,149 — other shades can cost more.',
  },
  {
    store: 'Amazon', productId: 'B008KH5258', name: 'Maybelline New York Hypercurl Washable Mascara, Black, 9.2 g',
    price: 235, mrp: 429, image: IMG('51A7QCfQYJL._SL1250_.jpg'),
    description: [
      "Hypercurl is one of Maybelline's long-running drugstore mascaras and a common first mascara in India, because it is easy to apply and comes off with face wash rather than a separate remover. For straight lashes that do not hold a curl, it is built to lift them while it adds colour.",
      "This is the washable version in black, a 9.2 g tube. Being washable, it is the better pick for daily office or college wear; for rain, swimming or weddings where you might cry, a waterproof mascara holds up better. At ₹235 it is a little over half its listed MRP.",
      "Apply from the base of the lashes and move the wand upward in a slight zig-zag, and add the second coat before the first dries to avoid clumps. Replace the tube around three months after opening, as eye products should not be kept longer. Buying from the brand's own listing on Amazon rather than an unknown seller is the safer route against fakes.",
    ],
    variant: 'Confirm the Washable, Black, 9.2 g variant — the waterproof version is priced separately.',
  },
  {
    store: 'Amazon', productId: 'B08H4FSGDX', name: 'Maybelline New York Superstay Matte Ink Liquid Lipstick, Exhilarator',
    price: 259, mrp: 749, image: IMG('413dG7eRuNL._SL1000_.jpg'),
    description: [
      "Superstay Matte Ink is Maybelline's long-wear liquid lipstick, the one people buy when they want colour that survives a meal, a work day or a wedding without touch-ups. It sits in the same space as pricier cult matte liquids, which is why it appears on nearly every best-drugstore-lipstick list.",
      "This listing is the Exhilarator shade. Maybelline rates the formula for up to 16 hours of wear, in a fully matte finish. At ₹259 it costs about a third of its listed MRP, which makes it a good time to try the line if you have not, or to stock up on a shade you already use.",
      "Apply to clean, dry lips and let it set for a minute before pressing them together; it goes on wet and turns matte as it dries. Long-wear mattes can feel dry, so a lip balm the night before helps. Use an oil-based remover or cleansing balm to take it off, because plain water will not shift it. Shades on a screen can differ from the real colour.",
    ],
    variant: 'Confirm the shade shows Exhilarator — other shades on the same page are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0GVFL11FC', name: 'MIKANIX Digital Finger Ring Tally Counter',
    price: 99, mrp: 199, image: IMG('51SQY+AWbQL._SL1080_.jpg'),
    description: [
      "A finger tally counter is the modern replacement for counting on a jaap mala: you wear it like a ring and press the button with your thumb to count each mantra, so there is no need to keep track in your head. The same click counter is handy for counting laps, steps, reps, stitches or stock in a small shop.",
      "This MIKANIX counter is a digital unit worn on the finger, with a screen that shows the running count. Because it sits on your hand, it is easier to use with eyes closed than a handheld counter, and at ₹99 it costs half its listed MRP.",
      "Digital ring counters run on a small button cell, so keep a spare at home. Learn the reset button before you begin, so a long count is not wiped by mistake. The band suits most adult fingers; on small children it may sit loose. It is a sensible low-cost gift for elders who chant daily, and cheap enough to keep one in the car or gym bag.",
    ],
    variant: 'Confirm the listing shows the single counter.',
  },
  {
    store: 'Amazon', productId: 'B0DQCFMLRS', name: 'Moon & Mount Liquid Hand Wash, 5 L, Fresh',
    price: 381, mrp: 1199, image: IMG('61XgPha4HCL._SL1254_.jpg'),
    description: [
      "A 5-litre can is the cheapest way to keep every sink in the house stocked: refill the small pump bottles you already have instead of buying a new one every few weeks. For a family, 5 litres lasts many months, and bulk cans are also what offices, clinics and small restaurants buy for the washroom.",
      "This is Moon & Mount liquid hand wash in the Fresh fragrance, in a 5 L can. At ₹381 it works out to about ₹76 per litre, well below what branded refill pouches cost per litre at the supermarket, and about a third of its listed MRP.",
      "Pour it into small dispensers with a funnel rather than using the can directly, and keep the cap closed between refills. Wash for at least 20 seconds, fronts and backs of both hands, for it to do its job. Do a patch test first if anyone at home has sensitive skin. The Amazon price moved by paise while we checked, so confirm it before paying.",
    ],
    variant: 'Confirm the 5 L can in the Fresh fragrance is selected — other sizes and variants cost differently.',
  },
  {
    store: 'Amazon', productId: 'B086XSXPQY', name: 'Panasonic 18W B22 LED Bulb, Cool Day Light',
    price: 156, mrp: 350, image: IMG('61yQQNkgaxL._SL1500_.jpg'),
    description: [
      "An 18 W LED is the right bulb for a large room or hall where a 9 W or 12 W bulb looks dim, and it still uses a fraction of the power of the old CFL it replaces. Panasonic is a trusted electrical brand in India, and this bulb fits the standard B22 pin holder found in most Indian homes.",
      "This bulb gives cool day light, a crisp white rated at 6500K that suits study tables, kitchens and work areas. Panasonic rates it for 25,000 hours, which is years of normal home use before it needs replacing. At ₹156 it costs less than half its listed MRP, below what a branded 18 W bulb usually costs at a local shop.",
      "Check the holder in your fitting: B22 is the push-and-twist type, not the screw-in E27. Cool day light is bright and white; for a bedroom or living room where you want a softer mood, a warm white bulb is the better pick. Switch off the power before changing bulbs. Amazon showed paise-level movement in the price, so confirm it at checkout.",
    ],
    variant: 'Confirm the 18W, pack of 1, Cool Day Light option — other wattages and packs are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0FH22RSJ8', name: 'Philips Joy Vision 0.5W LED Night Lamp, Yellow, Pack of 24',
    price: 996, mrp: 2760, image: IMG('61iGmsqYw7L._SL1080_.jpg'),
    description: [
      "Night lamps are the bulbs people forget to stock until one fails at 2 am, and a pack of 24 covers every bedroom, corridor, bathroom and puja corner in the house for years, with plenty left over for relatives or a housing society. At this price each lamp costs about ₹41.",
      "These are Philips Joy Vision plug-and-play night lamps in warm yellow. They push straight into a standard 2-pin socket, so there is no holder, wiring or tools involved. At just 0.5 W each, even a lamp left on every night through the year uses very little power, which is the whole point of replacing older night bulbs.",
      "Check that the rooms you want to light have a free 2-pin socket at a sensible height, since the lamp plugs in directly. A yellow light is softer on the eyes at night than white and less likely to disturb sleep. Keep sockets out of reach of small children. The pack of 24 is the bulk option; smaller packs cost more per lamp.",
    ],
    variant: 'Select the pack of 24 in yellow — smaller packs on the same page cost more per lamp.',
  },
  {
    store: 'Amazon', productId: 'B0GZGLLW14', name: 'Plantex Iris Ceramic One-Piece Western Toilet with Soft-Close Seat, S-Trap, White',
    price: 3999, mrp: 22400, image: IMG('816UDjGGuDL._SL1500_.jpg'),
    description: [
      "A one-piece western toilet is the cleaner, easier-to-maintain option when renovating a bathroom: with the tank and bowl moulded together there is no joint for dirt to collect in, and it looks tidier than the two-piece units in older flats. Plantex is a well-known Indian bath-fittings brand sold widely online.",
      "This is the Plantex Iris, a ceramic single-suite commode in white with a dual-flush system and a soft-closing seat that lowers itself instead of banging. It is the S-trap version, which means the outlet goes down into the floor. At ₹3,999 it sells for a small fraction of its listed MRP.",
      "The trap type is the one thing to get right: S-trap needs a floor outlet, while P-trap goes into the wall. Measure the distance from the wall to the centre of your drain before ordering, and budget for a plumber and fittings on top of the price. Check the box on delivery, since ceramic can chip in transit. Only two units were showing at this price.",
    ],
    variant: 'Confirm the S-Trap version is selected — the P-Trap option on the same page is a different fitting.',
  },
  {
    store: 'Amazon', productId: 'B0CR4B8W67', name: 'SIMPARTE Air-Tight Modular Storage Containers, 250 ml, Set of 6',
    price: 272, mrp: 2999, image: IMG('41Tcn7fiSrL._SL1500_.jpg'),
    description: [
      "Small airtight containers are what keep a kitchen shelf organised: spices, dry fruits, seeds and tea stay fresh, and matching stackable jars use shelf space far better than a mix of old pickle bottles and plastic pouches. A 250 ml size is right for items you use in small quantities.",
      "This SIMPARTE set has six round 250 ml containers in food-grade, BPA-free plastic, with airtight lids. They are modular so they stack neatly, and the brand lists them as microwave, freezer and dishwasher safe. At about ₹45 per container, the set costs less than many single branded jars.",
      "Wash and fully dry the containers before first use so no moisture gets trapped with dry food. Do not heat food in them with the lid locked, since steam builds pressure. 250 ml is a small size, enough for spices, dry fruits or a week of tea, so pick the bigger sets on the same brand page for atta, rice or dal.",
    ],
    variant: 'Select the 250 ml, set of 6 option — the set of 4 and larger sizes are priced separately.',
  },
  {
    store: 'Amazon', productId: 'B0774LDZ2V', name: 'SYSKA 9W B22 LED Bulb, Cool Day Light, Pack of 6',
    price: 284, mrp: 894, image: IMG('81cDNNddGML._SL1500_.jpg'),
    description: [
      "9 W is the everyday LED bulb for bedrooms, kitchens and bathrooms in most Indian homes, and buying six at once means spares are ready when one fails. SYSKA is one of the most widely sold LED brands in the country, and these bulbs fit the standard B22 pin holder.",
      "This is a pack of six SYSKA 9 W bulbs in cool day light, the bright white suited to kitchens, study tables and bathrooms. At about ₹47 per bulb, the pack costs less than what a single branded bulb sometimes does at a neighbourhood electrical shop, and each one draws a fraction of the power of an old incandescent.",
      "Check that your holders are B22 (push and twist) rather than E27 screw-in before ordering. Cool day light can feel harsh in a bedroom at night, so use warm white there if you prefer a softer tone. Switch off the mains before changing a bulb, and keep the spares in their boxes so they do not get knocked about.",
    ],
    variant: 'Confirm the 9W, pack of 6, Cool Day Light option — other packs and wattages cost differently.',
  },
  {
    store: 'Amazon', productId: 'B0F2GH2XDL', name: 'Unicorn Cutter Case Eraser Set for Kids',
    price: 169, mrp: 399, image: IMG('6117ql-jfxL._SL1200_.jpg'),
    description: [
      "Novelty stationery is the easiest return gift for a child's birthday party and a small reward that school kids actually get excited about. A unicorn-themed eraser set sits in the same budget as a chocolate but lasts longer, and it still does a real job in the pencil box.",
      "This set is shaped like a unicorn cutter case, so it doubles as a small toy on the study table while holding the erasers. At ₹169 it is well under half its listed MRP, and the listing showed only one unit left at this price, so it may not stay in stock.",
      "Small erasers are not suitable for toddlers who still put things in their mouth, so keep it for school-age children. Novelty erasers rub out pencil well enough for homework, but for exams a plain white eraser is still the cleaner choice. If you are buying for a whole party, check whether larger packs on the same seller page work out cheaper per piece.",
    ],
    variant: 'Confirm the single unicorn set is selected — larger packs are priced separately.',
  },
  {
    store: 'Flipkart', productId: 'CCEH3ENXZBYFRZWK', name: 'EAST COAST Carnage 20T Fat Bike Cycle for Kids 5-9 Years',
    price: 3671, mrp: 18599,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/cycle/s/n/c/carnage-20t-cycle-fat-bike-for-5-to-9-year-kids-20-14-5-east-resized-original-imahdhnfhzvzukhz.jpeg?q=70',
    affiliateUrl: FK('east-coast-carnage-20t-cycle-fat-bike-5-9-year-kids-20-t-inch-mountain-cycle/p/itm109477152c8f0', 'CCEH3ENXZBYFRZWK'),
    description: [
      "A first proper cycle is a big moment for a child, and fat-tyre bikes are what kids ask for now: the thick tyres look tough, roll over rough society roads and park paths more easily, and feel more stable for a child moving off training wheels. A 20-inch wheel is the usual size for ages five to nine.",
      "This is the EAST COAST Carnage 20T, a fat-bike style mountain cycle with 20-inch wheels, sized for children of roughly 5 to 9 years. At ₹3,671 it sells for a fraction of its listed MRP, which prices it like a basic kids' cycle from a local shop rather than a fat-bike style one.",
      "Check your child's height against the size guide: they should be able to touch the ground with their toes when seated. Cycles ship partly assembled, so budget for a local cycle shop to fit the handlebar and pedals and check the brakes. Keep the tyres at the pressure written on the sidewall. A helmet is not optional, whatever the child's age.",
    ],
    variant: 'Confirm the 20T Carnage variant is selected before paying.',
  },
  {
    store: 'Flipkart', productId: 'SNDHFXHFSYUZCWNN', name: 'Froh Feet Women Bellies, Silver',
    price: 534, mrp: 1995,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/sandal/k/z/5/3-fz-2-silver-froh-feet-silver-original-imahfxhfxdwavmy9.jpeg?q=70',
    affiliateUrl: FK('froh-feet-women-bellies/p/itm71ae37565d3ea', 'SNDHFXHFSYUZCWNN'),
    description: [
      "Bellies are the flat, closed-toe shoe that goes with almost everything in an Indian wardrobe: kurtas, jeans, office trousers and dresses. A metallic silver pair is the festive-season version, dressy enough for a wedding function or Diwali party but still comfortable to walk around in all evening.",
      "This pair is from Froh Feet, a women's footwear label on Flipkart, in silver. At ₹534 it is roughly a quarter of the listed MRP. Flipkart sale prices on fashion move often, so the figure may go back up once the current sale ends.",
      "Bellies fit differently by brand, so check Flipkart's size chart and the reviews on fit before ordering, and size up if you have wide feet. Metallic finishes scuff, so wipe them with a soft dry cloth after wear and store them in a bag. Flipkart's return window covers a wrong size, so try them on indoors first.",
    ],
    variant: 'Pick your size, then confirm the silver pair still reads ₹534.',
  },
  {
    store: 'Flipkart', productId: 'WIPHFBZHZTSKVQZZ', name: 'Mamma Love 99% Pure Water Baby Wet Wipes with Lid, Pack of 2 x 72',
    price: 199, mrp: 796,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/wipe/k/q/s/99-pure-water-baby-wet-wipes-with-lid-pack-of-2-72-pcs-pack-288-original-imahkbjpsakfkgcc.jpeg?q=70',
    affiliateUrl: FK('mamma-love-99-pure-water-baby-wet-wipes-lid-pack-2-72-pcs-pack/p/itm3e479d46073be', 'WIPHFBZHZTSKVQZZ'),
    description: [
      "Parents of a small baby go through wet wipes faster than almost anything else, so the per-wipe price matters. Water-based wipes are the gentler pick for a baby's skin, as a short ingredient list means fewer fragrances and additives that can irritate a nappy area that is already sensitive.",
      "This is a pack of two Mamma Love baby wipe packs of 72 each, 144 wipes in all, sold as 99% pure water. Each pack has a lid rather than a sticky flap, which keeps the wipes from drying out between changes. At ₹199 that is about ₹1.38 per wipe, a quarter of the listed MRP.",
      "Close the lid firmly after every use; a pack left open dries out within a day. Do a small patch test the first time, even with water-based wipes, if your baby has eczema or a rash. Never flush wipes, as they block drains. For a newborn in the first weeks, some paediatricians still prefer cotton and plain water, so ask yours.",
    ],
    variant: 'Confirm the pack of 2 (72 wipes each) is selected — other pack counts are priced separately.',
  },
  {
    store: 'Flipkart', productId: 'ACCHHJTD2DHHGNSU', name: 'MOTOROLA AmphisoundX Vibe 220 W Bluetooth Soundbar',
    price: 4799, mrp: 17999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/speaker/q/e/9/-original-imahm7jm4qftqhcf.jpeg?q=70',
    affiliateUrl: FK('motorola-amphisoundx-vibe-220-w-bluetooth-soundbar/p/itme8b88ccbd7fd8', 'ACCHHJTD2DHHGNSU'),
    description: [
      "Flat TVs have thin speakers, and dialogue is the first thing to suffer: film voices get lost under the background score, and people end up turning the volume up and down all evening. A soundbar is the simplest fix, one unit under the TV with no receiver or wiring runs across the room.",
      "This is the MOTOROLA AmphisoundX Vibe, rated at 220 W, with Bluetooth so you can also play music from a phone. At ₹4,799 it sells for roughly a quarter of its listed MRP, which is low for a branded soundbar at this output.",
      "Before buying, check which connections your TV has, such as HDMI ARC, optical or AUX, and match that against the input list on the product page, since the connection decides how easily it works with the TV remote. Place it centred below the screen and not inside a closed cabinet, which muffles the sound. Keep the invoice for the warranty.",
    ],
    variant: 'Confirm the Vibe 220 W model — the higher-wattage AmphisoundX models are priced much higher.',
  },
  {
    store: 'Flipkart', productId: 'SHOHD2VWHGGF97G6', name: 'NIKE W Downshifter 13 Running Shoes for Women',
    price: 2491, mrp: 4295,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shoe/p/r/4/6-fd6476-012-6-nike-cannon-mint-foam-black-bordeaux-white-watermarked-original-imahd2vvvjaqtg56.jpeg?q=70',
    affiliateUrl: FK('nike-w-downshifter-13-running-shoes-women/p/itm79563c952e772', 'SHOHD2VWHGGF97G6'),
    description: [
      "The Downshifter is Nike's entry-level running shoe, the model people buy for daily walks, gym sessions and easy jogs rather than serious marathon training. It is often the most affordable way into a genuine Nike, and the 13th version keeps the same everyday brief.",
      "This listing is the women's Downshifter 13. At ₹2,491 it is 42% below its listed MRP. Buying from Flipkart's own listing rather than an unknown seller lowers the risk of fakes, which are common for Nike. Sale prices on shoes move quickly, so the figure may rise after the current sale.",
      "Running shoes should leave about a thumb's width beyond your longest toe, so check Nike's size chart, which uses UK sizes, before ordering. Colour and size change the price on this page, so confirm yours shows the deal figure. Replace running shoes every 600 to 800 km. For long-distance running, look at a more cushioned model.",
    ],
    variant: 'Pick your size and colour, then confirm the price still reads ₹2,491 — other combinations can cost more.',
  },
  {
    store: 'Flipkart', productId: 'SHOHCTZTUWGNT99W', name: 'NIKE W Legend Essential 3 NN Training Shoes for Women',
    price: 2747, mrp: 4995,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shoe/m/i/k/-watermarked-original-imahh6w7awfzkdet.jpeg?q=70',
    affiliateUrl: FK('nike-w-legend-essential-3-nn-training-gym-shoes-women/p/itm5fb82ed9717ed', 'SHOHCTZTUWGNT99W'),
    description: [
      "Gym training and running need different shoes: running shoes are soft and raised at the heel, which feels unstable under squats, lunges and HIIT. A training shoe is flatter and firmer for side-to-side movement, which is what the Legend Essential line is built for.",
      "This is the women's Nike Legend Essential 3 NN, a training and gym shoe. At ₹2,747 it is 45% below its listed MRP, and sale prices like this tend to go back up once the sale ends. It suits weights, gym classes and indoor workouts more than road running.",
      "Check Nike's UK size chart before ordering, and leave a little room at the toe for movement. Colour and size affect the price on this page, so confirm the figure matches yours. Keep training shoes for the gym only, since wearing them outside wears the grip down faster. Fake Nike listings are common, so buy from the brand's or Flipkart's own listing.",
    ],
    variant: 'Pick your size and colour, then confirm the price still reads ₹2,747 — other combinations can cost more.',
  },
  {
    store: 'Myntra', productId: '29834766', name: 'French Connection Gold-Toned Wall Clock',
    price: 1224, mrp: 3499,
    image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/29834766/2024/5/28/eb1c32e9-820e-441b-8e5a-9eb2ee9cfb5e1716867734919Clocks1.jpg',
    affiliateUrl: MY('29834766'),
    description: [
      "A wall clock is one of the few decor pieces everyone looks at every day, so it does more for a living room than its size suggests. A gold-toned clock is the easy way to add a metallic accent to a plain wall, and it sits well with both wooden and modern furniture.",
      "This is a gold-toned wall clock from French Connection's home range, sold on Myntra. At ₹1,224 it is 65% below its listed MRP, which brings a designer-label clock close to the price of an unbranded one from a local market. It was in stock on Myntra when we checked.",
      "Check the diameter on the product page against your wall before ordering, since a clock that is too small looks lost on a large wall. Use a proper wall plug and screw rather than a nail. Most wall clocks run on an AA battery that is often not included, so keep one ready. Metallic finishes are best dusted with a soft dry cloth.",
    ],
    variant: 'Open the Myntra page and confirm the gold-toned wall clock still shows ₹1,224.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\//, Myntra: /^https:\/\/assets\.myntassets\.com\// };
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
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0924j-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
