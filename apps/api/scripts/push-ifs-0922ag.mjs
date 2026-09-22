// DEAL-INGEST indiafreestuff tick 2026-09-22ag
//
// Funnel: 47 cards discovered off /deals + /deals/superdeals (2.6s gap, no 403/429)
// -> 38 resolved through the base64 ?rto= Buy Now redirect to a real product URL
// -> 29 fresh after dedup against the live DB -> 28 PDP-fetched in the logged-in
// Amazon tab (1 dropped pre-fetch: card mrp == price, "[Mrp Error]" title)
// -> 14 publishable + 6 dedup-hit refreshes; 15 rejected.
//
// Card prices were wrong on 10 of 28 fresh ASINs. Every number below is the PDP
// figure read from #corePriceDisplay_desktop_feature_div / #centerCol, never the
// card figure. MRP from the M.R.P. line, image from #landingImage[data-old-hires],
// availability tested with /In stock/.
//
// The 6 refreshes are dedup hits: the row already exists and is indexed, so the
// slug is preserved and the row is rewritten in place rather than duplicated.
// All six were stale AND thin (115-263 char descriptions, two with empty howTo,
// four on low-res thumbnails, one with null mrp+pct, two with wrong stored MRPs).
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');

// ------------------------------------------------------------------ 14 new pages
const NEW = [
  {
    productId: 'B0H1WKZR2F',
    name: 'Torche Foldable Study Table, Snow White',
    price: 2376,
    mrp: 6500,
    image: 'https://m.media-amazon.com/images/I/81izteWG3VL._SL1500_.jpg',
    description: [
      'A folding study desk answers a problem most desks create: the desk itself. In a shared bedroom or a rented room, a fixed table permanently claims a corner whether anyone is working or not. This one folds flat when the day is over, which is the entire argument for buying a folding desk instead of a cheaper fixed one.',
      'The Snow White finish is the plain, light variant rather than a wood-print laminate, so it sits against a pale wall without visually crowding the room, and it photographs cleanly for anyone using it as a video-call backdrop. The top is sized for a laptop plus a notebook open beside it, which is the realistic working footprint for a student or a work-from-home day.',
      'Treat a folding desk as a folding desk. The hinge is the part that decides how long it lasts, so it is worth opening and closing it deliberately rather than dropping the top, and worth not loading it as a permanent stand for a heavy monitor arm. Used as intended, it replaces a dining table that was never meant to be a workstation.',
      `Live Amazon price is ₹${inr(2376)} against an M.R.P. of ₹${inr(6500)} — 63% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Torche foldable study table on Amazon.in at the live price.',
      'Check the colour and size variant before you add to cart. This price is the Snow White foldable table specifically — Torche lists other finishes and sizes as separate pages, each at its own price, and the listing you land on is the one that ships.',
      'Add to cart and check out. Furniture prices and stock on Amazon move without notice, so confirm the figure on the product page still matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0BF4M42NY',
    name: 'Plantex Triple Security Door Lock 7110, Brass Antique',
    price: 2499,
    mrp: 8330,
    image: 'https://m.media-amazon.com/images/I/71OcFVwt8AL._SL1500_.jpg',
    description: [
      'A main-door lock is one of the few household purchases where the cheap option is genuinely the wrong option. This is a triple-security mortise set — the bolt, the latch and the deadlock work together rather than relying on a single tongue — which is the configuration most flats fit on the entrance door and keep on the internal doors only when the budget allows.',
      'The finish is Brass Antique, a darkened brass rather than a bright polished one, so it reads closer to traditional Indian door hardware and hides fingerprints better than chrome. The set is the lock body plus handles and keys, which is the part worth checking against your existing door cut-out before ordering any mortise lock.',
      'The practical caution with every mortise lock is the door itself: the body has to match the thickness and the existing mortise pocket, otherwise a carpenter has to recut the door. Measure before you buy, not after the box arrives. Fitting is a 30-minute job for a carpenter and an afternoon for a confident DIY attempt.',
      `Live Amazon price is ₹${inr(2499)} against an M.R.P. of ₹${inr(8330)} — 70% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Plantex 7110 triple-security door lock on Amazon.in at the live price.',
      'Measure your door before adding to cart. A mortise lock has to match the door thickness and the existing pocket, and Plantex lists the other finishes of the 7110 as separate pages — this price is the Brass Antique variant only.',
      'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0GVSKRSCB',
    name: 'DOMO Slate SL39 10.1 inch 4G Calling Tablet, 4GB + 32GB',
    price: 7549,
    mrp: 24990,
    image: 'https://m.media-amazon.com/images/I/71oid74HQOL._SL1500_.jpg',
    description: [
      'A 10.1-inch 4G calling tablet is a specific tool, not a small laptop. It is the right buy for a parent who wants a big readable screen for video calls, a student who needs something to read PDFs and attend classes on, or a shop counter that needs a screen with its own SIM and no dependence on a router. It is the wrong buy for anyone expecting flagship gaming performance.',
      'The SL39 ships with 4GB of RAM and 32GB of storage. That is enough for a browser, a video-call app, a reader and a handful of light apps running comfortably; it is not enough to install everything and never clear cache. Storage on tablets in this bracket is normally expandable by microSD, which is the sane way to hold films and course videos rather than filling the internal 32GB.',
      'The 4G calling part is what separates this from a Wi-Fi-only tablet at a similar price: it takes a SIM, so it works on a train, at a site office, or anywhere the broadband has not reached. On a 10.1-inch panel, that combination is genuinely more useful than a phone for anybody who reads for long stretches.',
      `Live Amazon price is ₹${inr(7549)} against an M.R.P. of ₹${inr(24990)} — 70% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the DOMO Slate SL39 tablet on Amazon.in at the live price.',
      'Check the variant before adding to cart. This price is the 4GB + 32GB 4G calling model — DOMO lists other RAM, storage and Wi-Fi-only configurations of the Slate line as separate pages at their own prices.',
      'Add to cart and check out. Tablet prices and stock on Amazon move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0HDPCC49R',
    name: 'Urban Decor 3-Seater Wooden Sofa Set with Ottoman',
    price: 9499,
    mrp: 38999,
    image: 'https://m.media-amazon.com/images/I/61Op35knWKL._SL1500_.jpg',
    description: [
      'A wooden-frame sofa set is the honest choice for an Indian living room that has to last a decade and survive a shift or two. Unlike a moulded foam-and-board sofa, a wooden frame can be re-cushioned and re-upholstered when the fabric goes, which is why the same three-seater outlives three cheaper ones.',
      'This set is the three-seater with a matching ottoman, so the ottoman does the double duty it is actually good at: extra seating when guests arrive, footrest when they do not. That matters more in a compact hall than a fourth armchair does, because an ottoman can be pushed under the coffee table when the floor has to be clear.',
      'Two practical notes on any sofa bought online. First, measure the doorway and the lift, not just the room — a three-seater that fits the wall and not the stairwell is a return, not a purchase. Second, check whether assembly is included in your pincode before ordering, because wooden sets usually arrive with legs and frame separate.',
      `Live Amazon price is ₹${inr(9499)} against an M.R.P. of ₹${inr(38999)} — 76% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Urban Decor 3-seater wooden sofa set on Amazon.in at the live price.',
      'Check what is in the box before adding to cart. This price is the 3-seater plus ottoman configuration — the 2-seater, the 3+1+1 set and the other fabric colours are listed as separate pages at their own prices, and delivery and assembly terms vary by pincode.',
      'Add to cart and check out. Furniture prices and stock on Amazon move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B07CYS8V2N',
    name: 'PrettyKrafts Batman Foldable Toy Storage Box',
    price: 199,
    mrp: 599,
    image: 'https://m.media-amazon.com/images/I/61RuGVj6R0L._SL1100_.jpg',
    description: [
      'A foldable storage box is the one piece of kid-room furniture that actually gets used, because it asks nothing of the child beyond throwing things into an open box. There is no lid to align, no drawer to jam, and no shelf height that a four-year-old cannot reach. The Batman print does the rest of the persuading.',
      'Foldable is the operative word. The box collapses flat when it is empty, so it stores behind a cupboard between uses instead of becoming another permanent object in a small room, and it travels flat in a suitcase for a holiday or a trip to grandparents. That is the difference from a rigid plastic crate at the same price.',
      'Beyond toys, this size handles the things that never have a home — cricket gear, art supplies, winter blankets in the off season, laundry on a chair. The fabric sides mean it does not scuff a wall or chip a painted skirting when a child drags it across the floor, which a hard plastic crate reliably does.',
      `Live Amazon price is ₹${inr(199)} against an M.R.P. of ₹${inr(599)} — 67% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the PrettyKrafts foldable toy storage box on Amazon.in at the live price.',
      'Check the print and the size before adding to cart. PrettyKrafts lists this box in several character prints and capacities as separate pages — this price is the Batman variant, and what ships is one box, not a set.',
      'Add to cart and check out. Prices and stock on low-ticket Amazon items move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0H6G48DD4',
    name: 'boAt Apex PB400 20000 mAh Power Bank',
    price: 2199,
    mrp: 4799,
    image: 'https://m.media-amazon.com/images/I/51RAMMlfsWL._SL1440_.jpg',
    description: [
      'Twenty thousand milliamp-hours is the size worth buying when a power bank has to cover more than a commute. It is roughly three to four full charges of a modern phone, or a phone plus a pair of earbuds plus a smartwatch across a two-day trip without finding a socket. Below 10000 mAh you are topping up; at 20000 you are actually off-grid.',
      'The Apex line is boAt positioning above its entry power banks, which in this bracket means fast charging on the output side rather than the slow 10W trickle that makes a large-capacity bank frustrating — a big battery that refills a phone slowly is worse in practice than a small one that refills it quickly. Check the wattage on the listing against what your phone actually negotiates.',
      'One thing every 20000 mAh bank shares: it is airline cabin-legal in India but it is heavy, around the weight of a paperback, and it takes several hours to recharge itself. Plan to charge it overnight before a trip rather than an hour before leaving, and carry the cable it wants, not whatever is in the bag.',
      `Live Amazon price is ₹${inr(2199)} against an M.R.P. of ₹${inr(4799)} — 54% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the boAt Apex PB400 power bank on Amazon.in at the live price.',
      'Check the capacity and colour variant before adding to cart. boAt lists the 10000 mAh Apex models and the other colourways as separate pages at their own prices — this price is the 20000 mAh PB400.',
      'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0965RR6WQ',
    name: 'Mamaearth Skin Illuminate Face Serum, 15 g',
    price: 188,
    mrp: 349,
    image: 'https://m.media-amazon.com/images/I/61ucrklDhIS._SL1200_.jpg',
    description: [
      'A face serum is a leave-on step, which is why the size looks small and the price per gram looks high next to a face wash. Fifteen grams is a normal serum bottle: two or three drops on cleansed skin, morning or night, is the whole dose, and a bottle this size lasts most people six to eight weeks at that rate.',
      'Mamaearth positions the Skin Illuminate serum for dullness and uneven tone rather than for acne or oil control, so it belongs after cleansing and before moisturiser, on skin that is still slightly damp. The brand line is toxin-free and dermatologically tested, which is the claim it is sold on and the reason it moves at this price point.',
      'The sensible way to buy any serum is to treat the first bottle as a trial. Skincare is individual, a serum takes four to six weeks to show anything at all, and a small bottle at a low price is a cheaper experiment than a full-size one. Patch-test on the inner forearm before putting a new active on the face.',
      `Live Amazon price is ₹${inr(188)} against an M.R.P. of ₹${inr(349)} — 46% off, which works out to ₹${(188 / 15).toFixed(2)} per gram. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Mamaearth Skin Illuminate face serum on Amazon.in at the live price.',
      'Check the pack size before adding to cart. This price is the 15 g bottle only — Mamaearth lists larger sizes and multi-packs of the same serum as separate pages at their own prices.',
      'Add to cart and check out. Prices and stock on low-ticket beauty listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0FHQB7HXR',
    name: 'Cadlec CookEase 2000W Induction Cooktop',
    price: 1599,
    mrp: 3199,
    image: 'https://m.media-amazon.com/images/I/71UpjvAGchL._SL1500_.jpg',
    description: [
      'Two thousand watts is the number that matters on an induction cooktop. A 1200W or 1500W unit boils a litre of water slowly enough that people quietly go back to the gas burner; 2000W is the point at which induction stops feeling like a compromise and starts being the faster option for everyday Indian cooking.',
      'Induction only works with magnetic cookware — steel and iron yes, pure aluminium and most non-stick-on-aluminium no. The usual test is a fridge magnet on the base of the pan: if it sticks, it will heat. Worth doing before the cooktop arrives rather than discovering half the kitchen does not work on it.',
      'The real case for a cooktop like this is as a second burner, not a replacement for the gas stove. It is the unit that handles tea and the pressure cooker while the main hob is busy, the one that travels to a hostel room or a rented flat where a cylinder connection is a bureaucratic ordeal, and the one that works when the cylinder runs out mid-cooking.',
      `Live Amazon price is ₹${inr(1599)} against an M.R.P. of ₹${inr(3199)} — 50% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Cadlec CookEase induction cooktop on Amazon.in at the live price.',
      'Check the wattage on the listing before adding to cart, and check your pans. This price is the 2000W model, and induction needs magnetic-base cookware — a fridge magnet that sticks to the pan base is the test.',
      'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B08MVZN9XN',
    name: 'iBELL 25 L Oven Toaster Griller with Rotisserie',
    price: 4474,
    mrp: 10590,
    image: 'https://m.media-amazon.com/images/I/61WRFf1iiHL._SL1200_.jpg',
    description: [
      'Twenty-five litres is the smallest OTG size that will take a standard 9-inch cake tin and a tray of a dozen cookies without crowding. The 9L and 16L units sold below it are toasters with ambitions; 25L is where an OTG becomes the thing you actually bake a birthday cake in.',
      'The rotisserie is the feature that separates this from a plain box oven. A turning spit cooks a whole chicken evenly without anybody opening the door to baste it, and it is the one function a microwave convection oven handles badly. With the rotisserie, grilling and roasting join baking and toasting on the same appliance.',
      'An OTG heats with exposed coils rather than microwaves, which makes it slower than a microwave and much better at anything that has to brown — bread, pizza bases, gratins, roast vegetables. It is also the safer buy for anyone who bakes with metal tins, since everything that goes into an OTG can be metal.',
      `Live Amazon price is ₹${inr(4474)} against an M.R.P. of ₹${inr(10590)} — 58% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the iBELL 25 L oven toaster griller on Amazon.in at the live price.',
      'Check the capacity before adding to cart. This price is the 25 L rotisserie model — iBELL lists 16 L, 30 L and higher-wattage OTGs as separate pages at their own prices, and the accessories in the box differ between them.',
      'Add to cart and check out. Appliance prices and stock on Amazon move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0F8W83DYC',
    name: 'Dabur Babool Toothpaste, 700 g Pack',
    price: 193,
    mrp: 464,
    image: 'https://m.media-amazon.com/images/I/81kSjn1RyXL._SL1500_.jpg',
    description: [
      'Seven hundred grams of toothpaste is a household-quantity buy, not a single tube. At the rate an average adult uses toothpaste — roughly a gram a brushing — this is several months of supply for a family, and buying it in this format is the only reason the per-gram price falls far enough to matter.',
      'Babool is Dabur\'s babool-bark (acacia) herbal line, the mass-market end of its oral care range rather than the premium Meswak or Red Paste positioning. It is a conventional fluoride-free herbal paste with the bark extract as the marketed active, and it is bought overwhelmingly on price per gram rather than on claims.',
      'The practical caution with bulk toothpaste is storage, not quality. Keep the spare tubes out of direct sun and out of a hot bathroom cupboard, and check the manufacture date on arrival — a paste with eighteen months of shelf life left is a bulk buy, one with four months left is a quantity you will not finish.',
      `Live Amazon price is ₹${inr(193)} against an M.R.P. of ₹${inr(464)} — 58% off, which is ₹${(193 / 7).toFixed(2)} per 100 g across the pack. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Dabur Babool 700 g toothpaste pack on Amazon.in at the live price.',
      'Check the pack weight before adding to cart. This price is the 700 g quantity — Dabur lists single tubes and other combo weights of Babool as separate pages at their own prices, and the per-gram maths is completely different on those.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0BNMSYJ2W',
    name: 'Odonil Room Air Freshener Spray Combo, Citrus Fresh & Ocean Breeze, 440 ml',
    price: 199,
    mrp: 308,
    image: 'https://m.media-amazon.com/images/I/71hE7kfUlVL._SL1500_.jpg',
    description: [
      'A room spray is bought on fragrance and quantity, and this is the combo pack rather than a single can — two variants, Citrus Fresh and Ocean Breeze, totalling 440 ml. Two different scents in one order is genuinely more useful than 440 ml of one, because the same fragrance in every room stops being noticeable within a week.',
      'Odonil is Dabur\'s air-care brand and the spray format is the instant one: it clears a room in seconds and then fades, as against the gel blocks and pocket sachets in the same range that release slowly over weeks. Most homes end up using both — a block in the bathroom for the baseline, a spray for when guests are at the door.',
      'Citrus Fresh is the sharper of the two and works in a kitchen or after cooking; Ocean Breeze is the cleaner, cooler one that suits a bedroom or a bathroom. Spray upward into the air rather than at soft furnishing, which is what leaves a residue on curtains and upholstery.',
      `Live Amazon price is ₹${inr(199)} against an M.R.P. of ₹${inr(308)} — 35% off for the 440 ml combo. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Odonil room spray combo on Amazon.in at the live price.',
      'Check the fragrance pack before adding to cart. This listing is the Citrus Fresh and Ocean Breeze combo totalling 440 ml — Odonil lists other fragrance combinations and single cans as separate pages at their own prices, and the scent names on the page are the ones that ship.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0FCXRSJ8K',
    name: 'CellForce UltraShield Coolant',
    price: 479,
    mrp: 1347,
    image: 'https://m.media-amazon.com/images/I/61dWBsKmDIL._SL1080_.jpg',
    description: [
      'Engine coolant is the maintenance item people skip until the temperature needle climbs in traffic. It does two jobs at once — carries heat out of the engine, and stops the cooling system corroding from the inside — and the second job is why topping up with plain water is a short-term fix that costs a radiator in the long run.',
      'Ready-to-use coolant of this kind goes straight into the reservoir with no dilution maths, which is the sensible format for anyone who is topping up rather than doing a full flush. A full coolant change is a workshop job on most cars; a top-up between services is a five-minute one, done on a cold engine only.',
      'Never open a coolant cap on a hot engine. The system is pressurised, and the fluid that comes out is above boiling point. Let the car stand until the cap is cool to touch, top up to the marked level on the reservoir, and check again after a drive — a level that keeps dropping is a leak, not a consumption rate.',
      `Live Amazon price is ₹${inr(479)} against an M.R.P. of ₹${inr(1347)} — 64% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the CellForce UltraShield coolant listing on Amazon.in at the live price.',
      'Read the quantity on the listing carefully before adding to cart. This listing\'s own title carries a conflict — it names both "1 Litre" and "(Pack of 3)" — so confirm on the product page exactly how many bottles and how many litres this price covers before you order, and check the coolant type against what your car\'s manual specifies.',
      'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B0BN45YSL5',
    name: 'Dabur Red Bae Fresh Gel Toothpaste, 300 g',
    price: 130,
    mrp: 230,
    image: 'https://m.media-amazon.com/images/I/719b9m0botL._SL1500_.jpg',
    description: [
      'Dabur Red Bae is the gel version of the Red Paste line, aimed squarely at people who dislike the taste and texture of the classic red ayurvedic paste but want the same herbal positioning. A gel foams less, tastes milder and is the format most teenagers and young adults will actually keep using.',
      'At 300 g this is a multi-tube household quantity rather than a single travel tube, which is where the per-gram price falls to something worth buying in bulk. The herbal actives are the same family the Red line has always been sold on — clove, pudina and the rest of the ayurvedic oral-care set — with the fresh-gel base doing the flavour work.',
      'Buy it on the maths, not the marketing. A 300 g quantity of any toothpaste is around three months for a couple, so check the manufacture date on arrival the way you would with any bulk FMCG order, and keep the spare tubes out of a hot cupboard.',
      `Live Amazon price is ₹${inr(130)} against an M.R.P. of ₹${inr(230)} — 43% off, which is ₹${(130 / 3).toFixed(2)} per 100 g. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Dabur Red Bae Fresh Gel 300 g pack on Amazon.in at the live price.',
      'Ignore any minimum-quantity claim you may have seen elsewhere. A deal listing quoted this as needing a minimum buy of 3; the Amazon product page prices it flat at ₹130 for the 300 g pack with no minimum attached — the page is the authority, so read the quantity and the price on it before ordering.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    productId: 'B07SK7PTM1',
    name: 'Amazon Brand Symbol Men\'s Cotton Rich Polo T-Shirt',
    price: 299,
    mrp: 1199,
    image: 'https://m.media-amazon.com/images/I/81R+dod6SEL._SL1500_.jpg',
    description: [
      'A plain cotton-rich polo is the most-worn shirt in most Indian men\'s wardrobes for a simple reason: it is acceptable at an office with no dress code, at a weekend lunch, and on a flight, which is three occasions a printed tee cannot cover. Buying it plain rather than logo-heavy is what keeps it usable across all three.',
      'Symbol is Amazon\'s own in-house apparel label, which is why the price sits well under branded polos of similar construction — there is no distributor margin and no retail markup in it. Cotton-rich rather than pure cotton means a small share of synthetic in the blend, which in practice means it holds shape through more washes and wrinkles less out of the machine.',
      'The one thing worth doing before ordering any apparel online is reading the size chart on the page rather than assuming your usual size. Indian apparel sizing varies widely between brands, and a polo that is one size too tight across the chest is the most common reason these get returned.',
      `Live Amazon price is ₹${inr(299)} against an M.R.P. of ₹${inr(1199)} — 75% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Symbol men\'s cotton-rich polo on Amazon.in at the live price.',
      'Pick the size and colour on the page before adding to cart. Apparel listings price every size and colour separately, so the ₹299 figure applies to the specific combination shown when you land — check the size chart on the page rather than assuming your usual size.',
      'Add to cart and check out. Apparel prices and stock on Amazon move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
];

// -------------------------------------------------------- 6 in-place refreshes
// Dedup hits. Indexed slugs preserved — never renamed for cosmetics.
const REFRESH = [
  {
    id: 1423,
    productId: 'B07FW8H9C1',
    name: 'Dabur Red Gel Ayurvedic Toothpaste 300g (150g x 2)',
    price: 123,
    mrp: 270,
    image: 'https://m.media-amazon.com/images/I/61+sJIYwojL._SL1200_.jpg',
    description: [
      'Dabur Red Gel is the gel form of the Red Paste line — the same ayurvedic oral-care positioning, in a milder-tasting, lower-foaming base that people who dislike the classic red paste will actually keep using. This listing is the twin pack: two 150 g tubes, 300 g in total.',
      'A twin pack is the format worth buying for a household rather than a single traveller. One tube lives in the bathroom, the second stays in the cupboard, and the per-gram price is meaningfully lower than buying two singles at different times. The actives are the clove-and-pudina family the Red line has always been sold on.',
      'The stored figures on this page were out of date before this refresh — an older price, and no M.R.P. or discount recorded at all. Both have now been read off the live product page, so the number here is the one Amazon is charging today, not the one it charged when the page was first written.',
      `Live Amazon price is ₹${inr(123)} against an M.R.P. of ₹${inr(270)} — 54% off, which is ₹${(123 / 3).toFixed(2)} per 100 g across the two tubes. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Dabur Red Gel twin pack on Amazon.in at the live price.',
      'Check the pack before adding to cart. This price is the 300 g twin pack — two 150 g tubes — and Dabur lists single tubes and larger combos of Red Gel as separate pages at their own prices.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    id: 1476,
    productId: 'B0F28YCYZX',
    name: 'Orient Electric 9W High Glow LED Bulb',
    price: 209,
    mrp: 720,
    image: 'https://m.media-amazon.com/images/I/71mO3PYIVEL._SL1500_.jpg',
    description: [
      'Nine watts of LED is the standard replacement for the old 60W incandescent bulb, and it is the wattage most Indian homes fit in a bedroom or a passage. Orient sells this one as its High Glow line, which is the brighter-per-watt end of its range rather than the base economy bulb.',
      'Two specifications on this bulb matter more than the wattage. The beam angle is 180 degrees, which means the light spreads across a room instead of pooling straight down the way a narrow-beam bulb does — the practical difference between a lit room and a lit patch of floor. And the surge protection is rated to 4 kV, which is the part that decides whether a bulb survives an Indian voltage spike or dies in eight months.',
      'The colour temperature is 6500K, the cool daylight white. That is the right choice for a kitchen, a study or a bathroom where you want things to look sharp, and the wrong choice for a bedroom where a warm 3000K bulb is easier on the eyes at night. Check which one the listing is before ordering.',
      `Live Amazon price is ₹${inr(209)} against an M.R.P. of ₹${inr(720)} — 71% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Orient Electric High Glow LED bulb on Amazon.in at the live price.',
      'Check the pack count and the colour temperature before adding to cart. This listing is the 6500K cool daylight bulb, and Orient prices single bulbs and multi-bulb packs as separate pages — the quantity shown on the page you land on is what ships.',
      'Add to cart and check out. Prices and stock on low-ticket Amazon items move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    id: 7314,
    productId: 'B0CG16N3P4',
    name: 'Parachute Advansed Cocoa Repair Body Lotion, 600 ml',
    price: 192,
    mrp: 575,
    image: 'https://m.media-amazon.com/images/I/71OJbvvZynL._SL1500_.jpg',
    description: [
      'Six hundred millilitres is the family-size body lotion bottle — the one that sits in the bathroom and lasts a season rather than the 100 ml tube that lives in a handbag. At that size the price per millilitre is low enough that people actually use it generously, which is the only way a body lotion does anything at all.',
      'Parachute Advansed Cocoa Repair is built around cocoa butter, which is the heavier end of the moisturiser scale — the right choice for dry skin, elbows, knees and heels, and for winter rather than peak humidity. A light gel lotion disappears in an hour on dry skin; a cocoa-butter formulation stays.',
      'The best time to apply any body lotion is within a couple of minutes of stepping out of a bath, while the skin is still slightly damp, because the lotion then seals in the water that is already there rather than trying to add moisture to dry skin. That single habit does more than switching brands.',
      `Live Amazon price is ₹${inr(192)} against an M.R.P. of ₹${inr(575)} — 67% off, which is ₹${(192 / 6).toFixed(2)} per 100 ml. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Parachute Advansed Cocoa Repair body lotion on Amazon.in at the live price.',
      'Check the bottle size before adding to cart. This price is the 600 ml bottle — the 250 ml and 400 ml sizes and the multi-bottle combos are listed as separate pages at their own prices, and the per-millilitre maths is different on each.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    id: 5910,
    productId: 'B0F4R4BG5G',
    name: 'Dabur Red Gel Toothpaste 600g (150g x 4)',
    price: 239,
    mrp: 540,
    image: 'https://m.media-amazon.com/images/I/81nab+ii5EL._SL1500_.jpg',
    description: [
      'This is the four-tube quantity of Dabur Red Gel — 150 g each, 600 g in total — which is the format that makes sense for a family rather than a single user. Four tubes is roughly six months for a household of two, and the per-gram price is the lowest of any Red Gel pack size.',
      'Red Gel is the milder, lower-foaming gel counterpart to the classic Dabur Red Paste, carrying the same ayurvedic clove-and-pudina positioning in a base that people who dislike the original taste will keep using. That is the whole reason the gel exists as a separate line.',
      'The stored MRP on this page was wrong before this refresh, which meant the discount shown was wrong too. Both the price and the M.R.P. have now been read directly off the live product page, so the percentage below is the real one rather than an arithmetic result of a stale number.',
      `Live Amazon price is ₹${inr(239)} against an M.R.P. of ₹${inr(540)} — 56% off, which is ₹${(239 / 6).toFixed(2)} per 100 g across the four tubes. In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Dabur Red Gel four-tube pack on Amazon.in at the live price.',
      'Check the quantity before adding to cart. This price is the 600 g pack — four 150 g tubes — and the single tube and the 300 g twin pack are separate listings at their own prices, with quite different per-gram maths.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    id: 6257,
    productId: 'B0FKH9GTX6',
    name: 'Colgate Visible White Purple Teeth Whitening Serum, 40ml, Mint & Yuzu',
    price: 448,
    mrp: 800,
    image: 'https://m.media-amazon.com/images/I/61PvbszlCXL._SL1500_.jpg',
    description: [
      'The purple-serum category works on colour theory rather than bleaching. Purple sits opposite yellow on the colour wheel, so a purple-tinted film on the tooth surface visually cancels yellow tones the moment it is applied — this is an optical correction, not a chemical whitening treatment, and the distinction matters for what you should expect.',
      'That makes it a different product from a whitening toothpaste or a peroxide strip. A serum like this shows a difference immediately and the effect is temporary; peroxide-based whitening works slowly and lasts. People who buy this are usually buying it for an event, not for a long-term shade change.',
      'The Mint and Yuzu flavouring is the part that decides whether you will use it twice, because the base of a purple serum is otherwise unpleasant. Forty millilitres is a small bottle by design — the dose is a few drops brushed over the teeth, so it lasts considerably longer than the volume suggests.',
      `Live Amazon price is ₹${inr(448)} against an M.R.P. of ₹${inr(800)} — 44% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Colgate Visible White Purple serum on Amazon.in at the live price.',
      'Check the variant and size before adding to cart. This price is the 40 ml Mint & Yuzu serum — Colgate lists the other Visible White formats, including the toothpaste and the pen, as separate pages at their own prices, and they are different products, not different sizes of this one.',
      'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
  {
    id: 6422,
    productId: 'B0F4RHPBYK',
    name: 'Odonil Bathroom & Toilet Air Freshener Neem Blocks',
    price: 364,
    mrp: 560,
    image: 'https://m.media-amazon.com/images/I/81DF2bXhXAL._SL1500_.jpg',
    description: [
      'An air-freshener block is the low-effort half of bathroom air care: it is hung once and releases fragrance slowly for weeks, as against a spray that works instantly and then fades. Most homes need both, and the block is the one that handles the baseline so the spray is only for guests.',
      'The neem variant is the one worth picking for a bathroom specifically. Neem carries a genuine antibacterial reputation in Indian households, and in this format the pitch is deodorising plus that association rather than a pure fragrance play — which is why it reads as clean rather than perfumed.',
      'Blocks like this are bought in multi-packs because every bathroom and toilet in the house wants one, and because a single block is finished in a few weeks. Hang it where air moves — near the exhaust or the ventilator — rather than in a closed corner, which is what makes the difference between a block that works and one that does not.',
      `Live Amazon price is ₹${inr(364)} against an M.R.P. of ₹${inr(560)} — 35% off, In stock.`,
    ],
    howTo: [
      'Tap Grab Deal to open the Odonil neem bathroom and toilet blocks on Amazon.in at the live price.',
      'Check the pack count before adding to cart. Odonil prices every block-count combination separately, so the quantity shown on the page you land on is what ships at this price — the smaller and larger packs are their own listings.',
      'Add to cart and check out. Prices and stock on FMCG listings move daily, so confirm the figure on the product page matches what is shown here.',
      'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
    ],
  },
];

// ------------------------------------------------------------------- derive + gate
for (const d of [...NEW, ...REFRESH]) {
  d.description = Array.isArray(d.description) ? d.description.join('\n\n') : d.description;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${inr(d.price)} (${d.discountPct}% Off) – Amazon`;
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`;
}
for (const d of NEW) {
  d.slug = `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`;
}

const HOSTS = /^https:\/\/m\.media-amazon\.com\//;
const THUMB = /_(SX\d+|SY\d+|SX\d+_SY\d+)_/; // low-res thumbnail tells
for (const d of [...NEW, ...REFRESH]) {
  const t = Number((d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (THUMB.test(d.image)) throw new Error(`thumbnail, not CDN hi-res ${d.productId}: ${d.image}`);
  if (d.description.length < 900) throw new Error(`description too thin ${d.productId}: ${d.description.length}`);
  if (!Array.isArray(d.howTo) || d.howTo.length !== 4) throw new Error(`howTo must be a 4-step array ${d.productId}`);
  if (!/^https:\/\/www\.amazon\.in\/dp\/[A-Z0-9]{10}\?tag=ashoksachdev-21$/.test(d.affiliateUrl))
    throw new Error(`bad affiliateUrl ${d.productId}: ${d.affiliateUrl}`);
}
for (const d of NEW) {
  if (!d.slug.endsWith(d.productId.toLowerCase())) throw new Error(`slug missing productId: ${d.slug}`);
}
const ids = new Set([...NEW, ...REFRESH].map((d) => d.productId));
if (ids.size !== NEW.length + REFRESH.length) throw new Error('duplicate productId in payload');
console.log(`pre-flight OK, ${NEW.length} creates + ${REFRESH.length} refreshes\n`);

// ------------------------------------------------------------------------- write
const store = await p.store.upsert({
  where: { slug: 'amazon' },
  update: {},
  create: { slug: 'amazon', name: 'Amazon' },
});

const slugs = [];

for (const d of NEW) {
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
    await p.deal.update({ where: { id: existing.id }, data });
    if (existing.price !== d.price) await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    slugs.push(existing.slug);
    console.log('UPD', existing.id, existing.slug);
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    slugs.push(row.slug);
    console.log('NEW', row.id, row.slug);
  }
}

for (const d of REFRESH) {
  const before = await p.deal.findUnique({ where: { id: d.id } });
  if (!before) throw new Error(`deal ${d.id} is gone`);
  if (before.productId !== d.productId) throw new Error(`productId moved on ${d.id}: ${before.productId}`);
  const after = await p.deal.update({
    where: { id: d.id },
    data: {
      title: d.title, description: d.description, howTo: d.howTo, image: d.image,
      price: d.price, mrp: d.mrp, discountPct: d.discountPct,
      isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
      affiliateUrl: d.affiliateUrl,
    },
  });
  if (before.price !== d.price) await p.priceHistory.create({ data: { dealId: d.id, price: d.price } });
  slugs.push(after.slug);
  console.log(`REFRESH id=${d.id} price=${before.price}->${after.price} mrp=${before.mrp}->${after.mrp} pct=${after.discountPct}`);
}

console.log(`\nSLUGS: ${slugs.join(' ')}`);
console.log(`count ${slugs.length}`);
await p.$disconnect();
