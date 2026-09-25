// DEAL-INGEST indiafreestuff tick 2026-09-25al
//
// /deals + /deals/superdeals -> 79 slugs -> 59 new -> 10 hubs/seasonal dropped -> 49 resolved -> 6 DB dups.
// Amazon verified in the logged-in tab: #corePriceDisplay + #centerCol M.R.P. + #availability + hiRes image + buy box.
// Myntra: ld+json offers (regex, block fails JSON.parse) + page-state mrp. Flipkart: rendered PDP in the tab, Add to cart required.
// Rejected on PDP: 7 Amazon (no buy box / drift), Myntra 43874883 (OutOfStock), Flipkart Mivi One 5G (Notify Me only).
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const INR = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const FK = (path, pid) => `https://www.flipkart.com${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const CLIP = 'If a clip coupon shows under the price on the product page, tick it before checkout — it comes off at payment, on top of the price listed here.';
const FK_OFFER = 'Flipkart may show a lower "Buy at" figure after bank or UPI offers at checkout — the price listed here is before any of those offers.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const A = (productId, name, price, mrp, img, description, variant, extra = {}) =>
  ({ store: 'Amazon', productId, name, price, mrp, image: IMG(img), description, variant, ...extra });

const DEALS = [
  A('B0BDFHXCC6', 'Myx Women Cotton Maxi Kaftan Nightdress, Loose Fit, Plus Size Available', 299, 1899, '71fGpIR8dPL._SL1500_.jpg', [
    "A kaftan nightdress is the loosest thing you can sleep in: one wide, straight panel of fabric with no waistband and no fitted sleeves to twist around you at night. In Indian summers and humid monsoon months, that airflow matters more than any print or cut.",
    "This Myx kaftan is a maxi-length cotton nightdress in a loose fit, and the listing covers plus sizes as well as regular ones. Cotton absorbs sweat and breathes better than polyester or satin, which is why it stays the default fabric for nightwear in hot climates. At under ₹300 it is priced like a basic nightie, not a branded lounge piece.",
    "Wash the first time in cold water on its own, since printed cotton can bleed colour in the first wash. Dry it in shade to keep the print from fading, and expect a little shrinkage — if you are between sizes, the loose fit means the bigger one is the safer pick. Check the size chart on the product page before ordering.",
  ], 'Pick your size on the product page — the price can change between sizes and prints.'),
  A('B09VLQ2N22', 'Presto! Dish Wash Gel, Lemon, 4 L (Refill Pack)', 459, 878, '61Spg95Z1+L._SL1500_.jpg', [
    "Dishwashing liquid is one of those kitchen items you buy every month without thinking about the price per litre. A 4 litre refill pack changes that maths: you pay once, refill the small bottle by the sink, and stop running out on a Sunday night.",
    "This is Presto, Amazon's own household brand, in a lemon-scented gel with 4 litres in total. The pack directions say to dilute 1 teaspoon (about 4 ml) in 40 ml of water for a round of dishes, so a little goes a long way. At about ₹115 a litre, it costs far less than buying 500 ml bottles off the supermarket shelf.",
    "Pour a working amount into a small squeeze bottle and keep the large pack closed in a cool cupboard so it does not thicken or lose scent. Diluting as the pack says gives better lather than using it neat, and wastes less. Rinse plates well — gel residue can leave a lemon taste on steel tumblers.",
  ], 'Confirm the 4 L pack is selected — smaller sizes on the same page are priced differently.'),
  A('B07TKYQCFG', 'Symbol Women Sweatshirt, Regular Fit, Cotton Blend', 399, 1699, '8195OnZJkIL._SL1500_.jpg', [
    "A plain crew-neck sweatshirt is the easiest winter layer to own. It goes over a T-shirt for a cool morning, under a jacket for a colder evening, and works for travel, college or a weekend at home without looking out of place.",
    "This is a women's sweatshirt from Symbol, one of Amazon's own fashion brands. At ₹399 against an M.R.P. of ₹1,699, it costs about the same as a basic T-shirt from a high-street label. Buy it early — sweatshirt prices tend to climb once north Indian winter demand kicks in around November.",
    "The product page showed only 1 left in stock at check time for the variant we checked, so sizes may sell out fast. Wash inside out in cold water to keep the fabric from pilling, and dry flat or on a line rather than in a hot dryer. Check the size chart before ordering, as fit differs between brands.",
  ], 'Pick your size and colour on the product page — prices change between variants.', { stock: 'only 1 left in stock at check time' }),
  A('B0C6DRD1MW', 'BeBe Baby Diaper Pants, New Born (up to 4 kg), 160 Count (2 x 80), Magic Gel', 1649, 2498, '51liXMFqvlL._SL1000_.jpg', [
    "A newborn goes through eight to ten diapers a day in the first weeks, so a family can easily use 250 or more in the first month. Buying newborn size in bulk only makes sense if the baby stays in that size for a few weeks, which is why it helps to know the weight limit before you stock up.",
    "This BeBe pack has 160 newborn diapers in two packs of 80, for babies up to 4 kg. The listing mentions a Magic Gel core that locks in wetness, and an expandable waist for a snug fit around the tummy. At about ₹10 a diaper, it is priced below many big-brand newborn packs.",
    "Babies outgrow the newborn size quickly — once your baby is near 4 kg, a bulk newborn pack may not be used up. Change diapers every two to three hours and let the skin air out between changes to prevent rash. Check the pack's manufacturing date on delivery, and store diapers in a dry cupboard away from damp walls.",
  ], 'Confirm the New Born, 160 Count (2 x 80) option is selected — other sizes and counts on the same page are priced differently.'),
  A('B08GQCZMX2', 'Black+Decker DVC320B21 Cordless Dustbuster Handheld Vacuum, 7.2V, Wet and Dry', 1869, 5250, '61gbYK-q2kL._SL1500_.jpg', [
    "A Dustbuster-style handheld vacuum is for small messes: spilled sugar on the counter, crumbs around a dining chair, dust on a keyboard. It lives on a shelf, charged and ready, so a spill takes thirty seconds to clean instead of dragging out a full vacuum.",
    "This Black+Decker model runs on a 7.2V, 10.8 Wh lithium-ion battery and handles both wet and dry pickup, so small liquid spills are fine too. It has a wide mouth for bigger debris, and the bowl and filter are washable. Black+Decker is a long-running tool brand with service support in India.",
    "The product page shows a clip coupon at check time — tick it before checkout for an extra saving. Charge it fully before the first use, as the manual advises. Empty the bowl after each wet pickup and let the bowl and filter dry completely before refitting, otherwise the filter can smell and lose suction.",
  ], 'Confirm the DVC320B21 model is selected — other models on the same page are priced differently.', { coupon: true }),
  A('B0FDXD55D5', 'HOMENU Airtight Kitchen Storage Containers, 500 ml, BPA-Free, Stackable', 276, 1099, '71guHsqanzL._SL1500_.jpg', [
    "Airtight containers keep dal, rice, sugar and snacks fresh and free of ants and moisture, which matters a lot in humid Indian kitchens. Clear, matching containers also make it easy to see what is running low before it runs out.",
    "These HOMENU containers hold 500 ml each and are listed as BPA-free, airtight and stackable. The 500 ml size suits spices, tea leaves, dry fruits and small snacks rather than bulk grains. At this price the set costs about the same as a couple of branded single jars, so it is a cheap way to organise a pantry shelf.",
    "Wash and dry each container fully before filling, since trapped moisture spoils dry food. Label the lids so family members find things quickly. Keep them away from the stove, as plastic near a hot burner can warp. Check the number of pieces in the set on the product page before ordering.",
  ], 'Confirm the listed set is selected — other set sizes on the same page are priced differently.'),
  A('B0GPD6MVY1', 'Cortina Linen Blend Sheer Curtain, 150 x 115 cm (5 ft Window), Set of 2, Eyelet, Black and Yellow Stripe', 394, 999, '71iP4VtTE8L._SL1279_.jpg', [
    "Sheer curtains let daylight in while softening glare and giving some privacy from the street. They are a common first layer on Indian windows, often paired with a thicker blackout curtain for bedrooms.",
    "This Cortina pair is a linen-blend sheer, 150 x 115 cm each, sized for a standard 5 ft window. It uses an eyelet top, which slides straight onto a rod with no hooks, and has a black and yellow stripe pattern. At under ₹200 a panel, it is a cheap way to refresh a room.",
    "Measure your window width and rod height before ordering — for a full look, the combined curtain width should be about one and a half to two times the window width. Wash sheer fabric gently in cold water and hang it back while slightly damp to let the creases fall out.",
  ], 'Confirm the 5 ft Window, Set of 2 option is selected — other sizes on the same page are priced differently.'),
  A('B0CJ2G7RNT', 'Crompton 5W Round LED Downlighter, Cool Daylight, 95 mm Cut-out, 2.5kV Surge Protection', 180, 450, '61jEsXY2UyL._SL1500_.jpg', [
    "A small round downlighter sits flush in a false ceiling and gives soft, even light for passages, wardrobes, bathrooms and pooja corners. A 5W light is enough for these small spaces without glare.",
    "This Crompton downlighter is 5W with an efficacy of 90 lumens per watt, surge protection up to 2.5kV and a wide working voltage of 140-350V, which helps in areas with unstable supply. The listing gives a CRI above 80 for natural-looking colours, and the cut-out size is 95 mm. Crompton is a well-known Indian lighting and fan brand.",
    "Check that your ceiling cut-out is 95 mm before ordering, because a light that does not match the hole will not sit flush. Switch off the mains at the board before fitting. Cool daylight suits kitchens and bathrooms; for bedrooms, a warm white version may feel softer.",
  ], 'Confirm the 5W Cool Daylight option is selected — other wattages on the same page are priced differently.'),
  A('B073BFZ6RB', 'Derwent Academy Acrylic Pad, A3 Landscape, 12 Sheets, 300 GSM, Acid-Free', 350, 1319, '81FjxtS+cPL._SL1500_.jpg', [
    "Acrylic paint needs a heavy, textured surface. Thin drawing paper buckles and pills under wet paint, while a proper acrylic pad holds thick strokes, layering and a bit of water without falling apart.",
    "This Derwent Academy pad has 12 sheets of 300 GSM acrylic paper in A3 landscape format, and the paper is acid-free, so finished work does not yellow over time. Derwent is a British art brand best known for its pencils. At about ₹29 a sheet, this pad is priced for students and hobby painters.",
    "Tape the sheet to a board on all four edges before painting to limit warping, and let each layer dry before adding the next. Store the pad flat and away from damp. A3 is large, so check that your table and your storage folder can take it before ordering.",
  ], 'Confirm the A3 Landscape pad is selected — other sizes on the same page are priced differently.'),
  A('B0DDQCDQQG', 'Fastrack Jupitor R2 Smartwatch, 1.38" Round Display, BT Calling, 100+ Sports Modes, IP68', 1699, 3999, '81p2I9e7gmL._SL1500_.jpg', [
    "A round-dial smartwatch looks more like a regular watch than the square fitness-band style, which makes it easier to wear to the office as well as to the gym. At this price it covers the basics most buyers use daily: notifications, calls from the wrist and step tracking.",
    "The Fastrack Jupitor R2 has a 1.38-inch round TFT display at 240 x 240 resolution and up to 500 nits brightness. It supports Bluetooth calling, 100+ sports modes, and the listing gives up to 5 days of battery life. It is IP68 rated for dust and water resistance. Fastrack is Titan's youth brand, with service centres across India.",
    "Bluetooth calling and always-on features drain the battery faster, so expect less than 5 days with heavy use. IP68 covers sweat, rain and hand washing — avoid hot showers and saunas. Pair it through the brand's app and allow notification access, or messages will not show on the watch.",
  ], 'Confirm the listed strap colour is selected — other colours on the same page may be priced differently.'),
  A('B0F5HNW218', 'Fastrack Volt S1 Smartwatch, 1.83" Display, BT Calling, Heart Rate and SpO2, IP68, Beige', 1499, 2995, '71bGSvPHeNL._SL1500_.jpg', [
    "A large rectangular screen makes a smartwatch easier to read: longer messages, bigger numbers and simpler menus. For buyers who mostly check time, steps and incoming calls, screen size matters more than extra features.",
    "The Fastrack Volt S1 has a 1.83-inch display with a silicone strap in beige. It supports Bluetooth calling, heart rate and SpO2 monitoring, and is IP68 rated. The listing gives up to 5 days of battery. Fastrack is Titan's youth brand, so after-sales service is easy to find in most cities.",
    "Wrist-based heart rate and SpO2 readings are for general fitness, not medical diagnosis. Wear the watch snugly about a finger's width above the wrist bone for steadier readings. Expect less battery life with calling and frequent measurements on, and clean the strap regularly if you wear it while working out.",
  ], 'Confirm the Beige strap option is selected — other colours on the same page may be priced differently.'),
  A('B0B2K5XDK9', 'French Connection FCS002D Analog Watch for Women, Black Dial, 36 mm Case', 1044, 6950, '61HQ2rc03yL._SL1440_.jpg', [
    "A slim 36 mm women's watch works as an everyday piece: small enough to sit neatly under a sleeve, but with a clear dial that is easy to read. A black dial also pairs with most outfits, from office wear to evening dress.",
    "This French Connection FCS002D has a 36 mm case that is 10 mm thick, a black dial, a 12 mm band and a mineral glass crystal. The listing includes a 12-month warranty. At ₹1,044 against a ₹6,950 M.R.P., it is priced near entry-level fashion watches from much smaller labels.",
    "The product page showed only 2 left in stock at check time, so this one may sell out quickly. Mineral glass resists scratches better than plastic but can still mark on hard surfaces, so take it off for heavy work. Keep it away from water unless the page states a water resistance rating you are comfortable with.",
  ], 'Confirm the FCS002D model is selected — other French Connection watches on the same page are priced differently.', { stock: 'only 2 left in stock at check time' }),
  A('B0DCZNN68C', 'GM Fogo 5 Litre Instant Water Heater, 3 kW, 6.5 Bar, 5 Star, Magnesium Anode', 2799, 6390, '515b7EmvWML._SL1500_.jpg', [
    "A 5 litre instant geyser is the right size for a kitchen sink or a small bathroom where you need warm water quickly for washing hands, dishes or a bucket top-up. It heats in minutes and takes little wall space.",
    "This GM Fogo is a 5 litre, 3 kW water heater rated for 6.5 bar pressure, with a 5-star energy rating. It uses a magnesium anode rod to slow corrosion from hard water. The warranty in the listing is 7 years on the tank, 4 years on the heating element and 2 years on the product.",
    "Have it installed by a qualified electrician on a properly earthed socket rated for 3 kW. Check the magnesium anode every year or two in hard-water areas and replace it when worn, which helps the tank reach its long warranty. Switch it off once the water is hot rather than leaving it on all day.",
  ], 'Confirm the 5 Litre model is selected — other capacities on the same page are priced differently.'),
  A('B08DG2T1W8', 'Havells Ventil Air Hush 150 mm Exhaust Fan, Copper Motor, 40W, Screwless Removable Front', 1490, 1875, '31QyssVM6FL._SL1200_.jpg', [
    "An exhaust fan pulls steam out of a bathroom and smoke and cooking smells out of a kitchen, which keeps walls from growing mould and cabinets from gathering grease. A quiet model matters when the fan runs for long periods.",
    "This Havells Ventil Air Hush is a 150 mm exhaust fan with a copper motor, drawing 40W. The front grill comes off without screws, which makes cleaning much easier, and the listing includes a 2-year warranty. The 150 mm size suits most bathrooms and small kitchens in Indian homes.",
    "The product page shows a clip coupon at check time — tick it before checkout for an extra saving. Measure the wall or window opening before ordering, since a 150 mm fan needs a matching cut-out. Clean the grill and blades every month in a kitchen, as grease buildup makes any exhaust fan louder and weaker.",
  ], 'Confirm the 150 mm model is selected — other sizes on the same page are priced differently.', { coupon: true }),
  A('B0D6NDDK1Z', 'HP 620 FHD Webcam, 1080p, 4 MP, Dual Mics, AI Autofocus, 360° Swivel, Zoom Certified', 4495, 16000, '61AyML85C1L._SL1500_.jpg', [
    "Most laptop webcams are still 720p and struggle in dim rooms. An external 1080p webcam on top of the monitor gives a sharper picture at eye level, which makes a real difference on long video calls and interviews.",
    "The HP 620 has a 4 MP sensor recording at 1080p, dual microphones and AI autofocus. It swivels 360 degrees and offers a field of view of 66, 78 or 90 degrees, so it can frame one face or a small group. It is Zoom certified, connects over USB 3.0 Type-A, and HP says it is made with 70% recycled plastic.",
    "Plug it into a USB 3.0 port for the best frame rate — older USB 2.0 ports can limit video quality. Put a light source in front of you rather than behind, which matters more for image quality than any camera spec. Select it as the default camera and mic in Zoom or Teams settings after connecting.",
  ], 'Confirm the HP 620 model is selected — other HP webcams on the same page are priced differently.'),
  A('B0FJLZZTW5', 'Lenovo 700 Multi-Device Wireless Mouse, Silent Clicks, BT 5.3 + 2.4GHz, 4000 DPI, Luna Grey', 1499, 3390, '518W5tttCCL._SL1500_.jpg', [
    "A multi-device mouse pairs with more than one computer and switches between them at the press of a button. That is handy if you use a work laptop and a personal PC on the same desk, or move between a laptop and a tablet.",
    "The Lenovo 700 pairs with up to 3 devices through Bluetooth 5.3 and a 2.4GHz USB receiver, has silent clicks for shared spaces, and tracks at up to 4000 DPI. The listing claims up to 36 months of battery life. It comes in luna grey.",
    "Use the 2.4GHz receiver for the main computer and Bluetooth for the others, so you keep a free USB port on laptops that have few. Battery life depends heavily on use, so treat 36 months as a best case. Silent clicks are quieter but feel softer, which some users take a day to get used to.",
  ], 'Confirm the Luna Grey option is selected — other colours on the same page may be priced differently.'),
  A('B0DP34NJNK', 'Life Wear Wrist Splint, Size Small, Ambidextrous, Removable Aluminium Palmar Splint', 178, 460, '71ODa1h961L._SL1500_.jpg', [
    "A wrist splint holds the wrist in a neutral position so it can rest. Doctors and physiotherapists often suggest one after a sprain or for repetitive-strain pain, where keeping the joint still, especially at night, helps it settle.",
    "This Life Wear splint is size small and works on either hand. It has a removable aluminium palmar splint that keeps the wrist straight, and a wide elastic strap for support. At under ₹200 it costs less than most splints sold at chemist counters.",
    "The product page showed only 1 left in stock at check time for this size. Measure your wrist against the size chart before ordering, because a splint that is too tight restricts blood flow. Use it as your doctor advises — a splint supports healing but does not replace a check-up for pain that does not improve.",
  ], 'Confirm the Small size is selected — other sizes on the same page are priced differently.', { stock: 'only 1 left in stock at check time' }),
  A('B0H6XDC1CJ', 'Lifelong Cuppy ATM Money Bank for Kids, Password Lock, Note Feeder with Sound and Light, Blue', 799, 2999, '71lLn62sETL._SL1251_.jpg', [
    "A toy ATM money bank turns saving into a game. Children feed notes in, open it with their own password, and see their savings grow, which is an easy way to teach the habit of putting money aside.",
    "The Lifelong Cuppy bank has a password lock and a note feeder that pulls notes in with sound and light effects. It runs on 3 AA batteries, which are not included, so buy them along with it. It comes in blue.",
    "The product page shows a clip coupon at check time — tick it before checkout for an extra saving. Set the password together with your child and note it down somewhere safe, since a forgotten code is the most common problem. Remove the batteries if it will sit unused for months to avoid leakage.",
  ], 'Confirm the Blue option is selected — other colours on the same page may be priced differently.', { coupon: true }),
  A('B0FJM7L2R5', 'Lifelong LLBT03AB Stainless Steel Water Bottle, 900 ml, Leak-Proof Screw Cap, Almond Birch', 199, 649, '51kuqAzA0AL._SL1500_.jpg', [
    "A steel bottle does not hold smells, does not crack when dropped, and lasts for years. A 900 ml size is enough for a school or office day without a refill, which is why it is a common size for Indian lunch bags.",
    "This Lifelong LLBT03AB is a 900 ml stainless steel bottle with a leak-proof screw cap, in an almond birch colour. At ₹199 it costs about the same as a plastic bottle from a local shop, but will outlast many of them.",
    "Wash it with warm soapy water and a bottle brush before first use, and let it dry with the cap off. Clean the seal inside the cap once a week, since residue collects there. If this is a single-wall bottle, it will not keep drinks hot or cold for long, so check the product page if you need insulation.",
  ], 'Confirm the 900 ml, Almond Birch option is selected — other sizes and colours on the same page are priced differently.'),
  A('B0DFX21B5F', 'MIRADH 300 LED Curtain Lights, 3 x 3 m, USB Powered with Remote, White', 399, 1999, '61PKs6dolJL._SL1100_.jpg', [
    "Curtain lights hang as vertical strands of small LEDs from a rod or window frame. They are popular for Diwali, weddings and birthday backdrops, and also as soft lighting behind a bed or on a balcony all year round.",
    "This MIRADH set has 300 white LEDs across a 3 x 3 metre curtain, powered over USB and controlled with a remote. USB power means it can run from a phone charger or a power bank, which makes it easy to place where there is no wall socket.",
    "Unpack the strands carefully and hang them before switching on, as tangled wires are the main hassle with curtain lights. Keep the USB adapter away from rain if you use it on a balcony. Store the lights wound around a piece of cardboard after the festival so they are easy to reuse.",
  ], 'Confirm the 300 LED, White option is selected — other colours on the same page may be priced differently.'),
  A('B0H5QQCZM5', 'Nokia 300 Charge 2G Keypad Phone, 3700 mAh Battery, Reverse Charging, UPI, Type-C', 2599, 3199, '71QqRj4m0UL._SL1500_.jpg', [
    "A keypad phone still makes sense for parents and grandparents who want calls and not apps, as a backup phone during travel, or as a second SIM phone that lasts days on one charge.",
    "The Nokia 300 Charge is a 2G keypad phone with a 2.4-inch screen and a 3700 mAh removable battery. It supports 10W reverse charging, so it can top up another phone in an emergency, and comes with a 4-in-1 cable. It has a torch, PhonePe UPI payments and a Type-C port. The listing includes 1-year replacement.",
    "This is a 2G phone, so check that your SIM operator still offers 2G service in your area before buying. Reverse charging drains the phone's own battery, so use it only when needed. Set up UPI with the bank-linked SIM inserted, and keep the phone PIN private.",
  ], 'Confirm the listed colour is selected — other colours on the same page may be priced differently.'),
  A('B0H26HJM7R', '360° Rotating RC Stunt Car for Kids, Spins and Flips, Ages 7-14, Orange', 278, 899, '71YKzGO09qL._SL1254_.jpg', [
    "A stunt car that spins and flips gives children more to do than a plain remote car that just drives forward and back. It keeps kids busy indoors on rainy days and outdoors on a flat floor or terrace.",
    "This orange RC stunt car rotates 360 degrees and flips, and the listing gives an age range of 7 to 14. At under ₹300 it is a budget gift pick for a birthday or a return gift rather than a hobby-grade car.",
    "Check the product page for the battery type and whether batteries and a charging cable are included. Run it on a smooth, flat floor — carpets and rough ground slow cheap stunt cars down quickly. Supervise younger children, and remove the batteries when the car is put away for a long time.",
  ], 'Confirm the Orange option is selected — other colours on the same page may be priced differently.'),
  A('B0BXD7Y1H9', 'Origo Single-Origin Assam CTC Tea, 500 g, Estate-Owned, Resealable Pouch', 279, 349, '71A+Sf+t+RL._SL1500_.jpg', [
    "Assam CTC is the strong, malty, granular tea behind most Indian masala chai. It brews dark quickly and holds up to milk and sugar, which is why it is the everyday choice in most homes.",
    "This Origo tea is a single-origin Assam CTC from an estate the brand owns, in a 500 g resealable pouch. Single-origin tea comes from one estate rather than a blend of many, so the taste should stay consistent from pack to pack.",
    "Press the air out and seal the pouch after each use — tea absorbs moisture and kitchen smells fast. Store it away from spices and the stove. For strong chai, boil the leaves in water for a minute before adding milk, rather than adding tea to boiling milk.",
  ], 'Confirm the 500 g pack is selected — other sizes on the same page are priced differently.'),
  A('B0HHYBBDFB', 'Personalised Rotating Photo Lamp, 4 Photos, Warm LED, "Memories Forever" Top', 488, 999, '610I+-4gDbL._SL1254_.jpg', [
    "A personalised photo lamp is a gift that people keep on a bedside table for years. It works for anniversaries, birthdays, Raksha Bandhan and farewells, where a gift with shared memories matters more than a gadget.",
    "This rotating lamp holds 4 photos around a warm LED light, with a \"Memories Forever\" top. It measures about 10 x 10 x 20 cm and weighs around 400 g, so it fits a small bedside table or shelf.",
    "Personalised gifts need time to make and ship, so order well before the date you need it. Send clear, well-lit photos in good resolution — dark or low-quality phone images print poorly. Follow the upload steps on the product page after ordering, and check the preview if the seller offers one.",
  ], 'Follow the personalisation steps on the product page — the price shown is for the standard 4-photo lamp.'),
  A('B0CS9R2VH8', 'Plantex Ceramic Tabletop Wash Basin, 41 x 41 x 15 cm (16 x 16 x 6 in), NC-460', 3099, 12950, '81PQD0Njd9L._SL1500_.jpg', [
    "A tabletop or countertop basin sits on top of a vanity instead of being sunk into it. It is a quick way to make a bathroom or dining-area wash space look modern without rebuilding the whole counter.",
    "This Plantex NC-460 is a ceramic tabletop basin measuring 41 x 41 x 15 cm (about 16 x 16 x 6 inches). At ₹3,099 against a ₹12,950 M.R.P., it is priced well below similar countertop basins sold at tile showrooms. The M.R.P. is the seller's figure; judge value by the actual price.",
    "Check that the counter is large enough and that the tap will reach the centre of the bowl — countertop basins usually need a tall tap or a wall-mounted tap. The waste coupling and tap are normally sold separately, so check the product page. Have a plumber fit it with proper sealant to avoid leaks.",
  ], 'Confirm the NC-460 model is selected — other models on the same page are priced differently.'),
  A('B0DXTYPY9B', 'Provogue Cascade 55 cm Cabin Trolley Bag, PP Hard Shell, Expandable, 8 Wheels, Grey and Orange', 1993, 6125, '61LLl8iqf1L._SL1500_.jpg', [
    "A 55 cm cabin bag is the size most domestic airlines accept as carry-on, which means no check-in queue and no waiting at the belt for short trips. A hard shell also protects clothes and gadgets better than soft luggage.",
    "The Provogue Cascade is a 55 cm cabin trolley with a polypropylene hard shell, an expandable zip, 8 spinner wheels and a recessed combination lock. The listing includes a 5-year warranty, and the colour is grey and orange.",
    "Expanding the bag adds room but can push it over airline cabin limits, so keep it closed when flying carry-on only. Check your airline's weight limit — many allow just 7 kg in the cabin. Set the lock combination before the first trip and note it somewhere safe.",
  ], 'Confirm the 55 cm Cabin size in Grey and Orange is selected — other sizes and colours on the same page are priced differently.'),
  A('B0HFFZ4M49', 'Mini Karaoke Bluetooth Speaker with Wireless Mic, LED Lights, Rechargeable', 399, 1299, '61hHZ+AsPCL._SL1254_.jpg', [
    "A small karaoke speaker with a wireless mic is a party toy for birthdays, family get-togethers and kids who love to sing. It plays music from the phone over Bluetooth while the mic adds your voice on top.",
    "This speaker comes with a wireless mic, LED lights and a rechargeable battery, and connects over Bluetooth. At under ₹400 it is a fun gift rather than a serious audio product — expect party-level sound, not deep bass.",
    "Charge both the speaker and the mic fully before the first use. Keep the mic a little away from the speaker to avoid feedback squeal. Check the product page for what comes in the box and the charging cable type, since budget gadgets vary from batch to batch.",
  ], 'Confirm the listed colour is selected — other colours on the same page may be priced differently.'),
  A('B0FTZ4CWB6', 'Shatanuvart S7 Mini Karaoke Bluetooth Speaker, Rechargeable, LED Lights', 474, 999, '71-jep6L+2L._SL1500_.jpg', [
    "A pocket-size karaoke speaker is easy to carry to a picnic, a road trip or a friend's house. Kids especially enjoy singing along to their favourite songs with lights flashing on the speaker.",
    "The Shatanuvart S7 measures about 10 x 8 x 5 cm, connects over Bluetooth, has LED lights and runs on a rechargeable battery. Its small size makes it light enough for a school bag or handbag.",
    "Charge it fully before the first use and keep the volume moderate — small speakers distort at maximum volume. Check the product page for whether a mic is included in the box and what cable it uses. Keep it away from water, since the listing does not claim waterproofing.",
  ], 'Confirm the S7 model is selected — other models on the same page are priced differently.'),
  A('B0H6JC42H6', 'Skybags Brat Pro Max 35L Laptop Backpack, Fits up to 15.6" Laptop, 3 Compartments', 853, 2100, '71t2tPA2oTL._SL1500_.jpg', [
    "A 35 litre backpack is big enough for a laptop, books, lunch box and a jacket, which makes it a good all-rounder for college students and office commuters who travel by bus or metro.",
    "The Skybags Brat Pro Max is a 35 litre laptop backpack with three compartments that fits laptops up to 15.6 inches. Skybags is VIP Industries' youth brand, with service support across India.",
    "Check your laptop's size before ordering — some 15.6-inch gaming laptops are thicker than the sleeve allows. Use both shoulder straps and adjust them so the bag sits high on your back, which is easier on the shoulders when fully loaded. Spot-clean with a damp cloth rather than machine washing.",
  ], 'Confirm the listed colour is selected — other colours on the same page may be priced differently.'),
  A('B0F4KG42QN', 'Skybags Paradise 67 cm Medium Check-in Trolley, PC+PP Hard Shell, 8 Wheels, Blue Caribbean Print', 3299, 8000, '61IiYm7Zb6L._SL1500_.jpg', [
    "A 67 cm trolley is the medium check-in size, enough for a week-long trip or a family wedding. It fits into car boots more easily than a large suitcase and stays within most airline weight limits when packed sensibly.",
    "The Skybags Paradise has a polycarbonate and polypropylene hard shell, an anti-theft zipper, a 3-digit number lock and 8 spinner wheels. The listing gives a 5-year international warranty, and the design is a blue Caribbean print that is easy to spot on the belt.",
    "The product page shows a clip coupon at check time — tick it before checkout for an extra saving. Set the lock combination before the first trip. Weigh the bag after packing, since domestic economy fares often allow only 15 kg, and use a cover if you want to protect the print from scratches.",
  ], 'Confirm the 67 cm Medium size in Blue Caribbean print is selected — other sizes on the same page are priced differently.', { coupon: true }),

  { store: 'Myntra', productId: '33942198', name: 'Lakmé Forever Matte Liquid Lipstick, Set of 3, 16.8 ml (3 x 5.6 ml), Brownie Bite', price: 472, mrp: 1350,
    image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2025/MAY/27/MIwb6nGi_e7e556d4d3b7412baac06358b9df7c03.jpg',
    affiliateUrl: INR('https://www.myntra.com/33942198'), description: [
    "Liquid matte lipstick goes on as a liquid and dries to a flat, transfer-resistant finish that lasts longer than regular bullet lipstick. It suits long office days, weddings and events where touch-ups are hard.",
    "This Lakmé Forever Matte set has three liquid lipsticks of 5.6 ml each, 16.8 ml in total, in the Brownie Bite shade combination. Myntra lists it as manufactured by Ancorotti Cosmetics in Baddi. At about ₹157 a lipstick, the trio costs less than one full-price Lakmé liquid lipstick at many stores.",
    "Apply on clean, moisturised lips and let each layer dry before pressing your lips together. Matte formulas can feel dry, so use a lip balm the night before. Remove with an oil-based remover rather than rubbing. Check shade photos on the product page, as screens show colours differently.",
  ], variant: 'Confirm the Brownie Bite set of 3 is selected — other shades on Myntra are priced differently.' },

  { store: 'Flipkart', productId: 'BDSHG8WNDPA9AMQJ', name: 'ChhabraTexcofab Polycotton Double Flat Bedsheet with 2 Pillow Covers, 150 TC, Floral, Brown', price: 130, mrp: 999,
    image: 'https://rukminim2.flixcart.com/image/800/1070/xif0q/bedsheet/i/m/8/3d-01-1-3d-01-flat-chhabratexcofab-enriched-0-original-imahmz6awqemhp6v.jpeg?q=90',
    affiliateUrl: FK('/chhabratexcofab-polycotton-double-flat-150-tc-floral-1-summer-bedsheet-2-pillow-covers/p/itmbbee814335897', 'BDSHG8WNDPA9AMQJ'), offer: true, description: [
    "A spare double bedsheet set is always useful: for guests, for the weekly change while the other set is washing, or to refresh a room for a festival. At a price under ₹150, it is cheap enough to keep an extra set in the cupboard.",
    "This ChhabraTexcofab set is a polycotton double flat bedsheet with 2 pillow covers, in a brown floral print, with a thread count of 150. Polycotton blends cotton with polyester, so it wrinkles less and dries faster than pure cotton, though it feels a little less breathable in peak summer.",
    "Wash it before first use in cold water to remove any loose dye, and dry it in shade to keep the print from fading. Check the bedsheet size on the product page against your mattress — a flat sheet needs extra fabric on each side to tuck in properly.",
  ], variant: 'Confirm the brown floral print is selected — other prints on Flipkart are priced differently.' },
  { store: 'Flipkart', productId: 'TROHAZH4WQ4VFGPQ', name: 'CLOWALL Women Regular Fit Black Viscose Rayon Trousers', price: 113, mrp: 999,
    image: 'https://rukminim2.flixcart.com/image/800/1070/xif0q/trouser/u/6/l/32-trending-trousers-for-women-clowall-original-imahrhhqhsvn6hjr.jpeg?q=90',
    affiliateUrl: FK('/clowall-regular-fit-women-black-trousers/p/itmb07f1c70e39d5', 'TROHAZH4WQ4VFGPQ'), offer: true, description: [
    "Black regular-fit trousers are one of the most versatile pieces in a wardrobe. They go with a kurti, a shirt or a T-shirt, and work for office, college and casual days alike.",
    "These CLOWALL trousers are made of viscose rayon in black, in a regular fit, with sizes from 26 to 34 listed on Flipkart. Viscose rayon is soft and drapes well, and it feels cool on the skin, which suits Indian weather. At about ₹113, they cost less than a pair of socks at many stores.",
    "Viscose can shrink and lose shape in hot water, so wash in cold water on a gentle cycle, or by hand, and dry in shade. Iron on a low setting. Check the size chart on the product page — rayon trousers often run slightly small, so go up a size if you are between sizes.",
  ], variant: 'Pick your waist size on the product page — stock differs between sizes.' },
  { store: 'Flipkart', productId: 'ICTGFGW4RKVQG2SP', name: 'Longway 2000 W Induction Cooktop, Push Button, Black', price: 1410, mrp: 2999,
    image: 'https://rukminim2.flixcart.com/image/800/1070/xif0q/induction-cook-top/n/y/k/-original-imahpuxbvmnqrgrm.jpeg?q=90',
    affiliateUrl: FK('/longway-2000-w-induction-cooktop-push-button/p/itmaef1ddcfca245', 'ICTGFGW4RKVQG2SP'), offer: true, description: [
    "An induction cooktop heats the pan directly using a magnetic field, so it wastes less energy than gas and keeps the kitchen cooler. It is a common backup when an LPG cylinder runs out, and the main stove in many hostels and rented rooms.",
    "This Longway cooktop is rated at 2000 W with push-button controls, in black. At ₹1,410 against a ₹2,999 M.R.P., it is priced at the budget end of the induction market. Flipkart may show a lower price at checkout with some bank or UPI offers.",
    "Induction works only with pans that have a magnetic base — test yours with a fridge magnet before buying. Plug it into a 16A socket with proper earthing, since 2000 W is a heavy load for a thin extension cord. Wipe the glass top only after it cools, and keep the air vents clear.",
  ], variant: 'Confirm the 2000 W push-button model is selected — other models on Flipkart are priced differently.' },
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
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? CLIP : d.offer ? FK_OFFER : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) console.log(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`flipkart url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0925al-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
