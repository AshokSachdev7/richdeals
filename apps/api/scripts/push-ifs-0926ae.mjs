// DEAL-INGEST indiafreestuff tick 2026-09-26ae
//
// 84 IFS rows resolved from base64 ?rto= Buy Now ids. Every Amazon ASIN was re-read on the PDP in the logged-in tab
// (#centerCol price, #availability, #landingImage data-old-hires, bullets); Flipkart pids via ld+json in a browser tab.
// Rejects (clip coupon, drift, unavailable, 1-star, dedup, min-buy, grocery) are listed in reports/tick-2026-09-26ag-ifs.md.
// Copy is written from the PDP title + bullets only. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/product/p/itme?pid=${id}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });

const DEALS = [
  A('B0G2YVFDPY', 'Acer Nitro Katana NT-02 Wireless Game Controller for Switch, PS4, PC, Android and iOS', 1888, 3599, '71gXe3aITNL._SL1500_', [
    "A multi-platform wireless gamepad from Acer's Nitro line, down to ₹1,888 on Amazon.",
    'It pairs over Bluetooth 5.3 with Nintendo Switch, PS4, Android, iOS and Windows PCs. Hall-effect triggers avoid the drift that wears out ordinary potentiometer triggers, and two programmable back buttons (MR/ML) let you map combos.',
    'There is a touchpad and speaker for PS4 games, dual vibration motors and a 6-axis gyro for motion aiming. A good pick if you play across a console and a phone and want one controller for both.',
  ], 'Check the listing shows the NT-02 Katana model before adding to cart.'),
  A('B0D46YVP2J', 'Amazon Basics Rectangular Wall Mirror, Modern Design', 836, 1899, '61dX0wCWddL._SL1500_', [
    "Amazon Basics' rectangular wall mirror drops to ₹836, less than half its M.R.P.",
    'It is a plain modern-frame mirror built for wall mounting — hallway, bedroom or above a dresser. No lights or smart features, just a clean rectangle.',
    'Measure the wall space first; the size is fixed on this listing.',
  ], 'Confirm the rectangular wall-mount variant is selected.'),
  A('B0F93TRXRM', 'Symactive PU Boxing Gloves, 10 oz', 659, 1999, '61sWh4zSZ8L._SL1500_', [
    'Symactive 10 oz boxing gloves are ₹659 on Amazon, 67% off the M.R.P.',
    'The outer is PU leather with a breathable lining, and the padding is shock-absorbing foam to protect knuckles on bag and pad work.',
    '10 oz is the usual weight for fitness boxing and bag training; sparring usually calls for 14–16 oz, so pick accordingly.',
  ], 'Select the 10 oz size — other weights are priced differently.'),
  A('B0B2LMS1WV', 'Babbler Weightlifting Belt, 4 inch, XL', 199, 550, '512v52B-x3L._SL1100_', [
    'A foam-padded 4-inch lifting belt from Babbler for ₹199 on Amazon.',
    'It closes with hook-and-loop and is made of nylon mesh over foam, so it is light and quick to adjust between sets — a support belt for general gym work rather than a stiff powerlifting lever belt.',
    'Only a couple were left in XL when we checked, so stock may run out fast.',
  ], 'Choose size XL — this price is for the XL belt.'),
  A('B0B2VL3K54', 'Baseus Lite Series 4-Port USB 3.0 Hub, 25 cm', 309, 1799, '51J4nvazwVL._SL1200_', [
    "Baseus' 4-port USB 3.0 hub is ₹309 on Amazon, 83% below its M.R.P.",
    'It turns one USB-A port into four, each rated for 5 Gbps transfers, on a 25 cm cable. Plug and play — no drivers.',
    'Handy for laptops short on ports: mouse, keyboard, pen drive and a charging cable at once. Bus-powered hubs are not meant for high-draw drives.',
  ], 'Select the 25 cm USB-A version.'),
  A('B086H49DQ3', 'Belkin USB-A to USB-C Cable, 2 m', 319, 1299, '51vKfdYalfL._SL1500_', [
    'A 2-metre Belkin USB-A to USB-C cable for ₹319 on Amazon — 75% off.',
    'It is USB-IF certified and carries a 2-year Belkin warranty, which is the main reason to pick it over unbranded cables.',
    'The 2 m length reaches a bed or sofa from a wall socket; it charges and syncs Type-C phones, earbuds and tablets.',
  ], 'Pick the 2 m length.'),
  A('B0GPLG4M5L', 'Cortina 300 GSM Microfibre Bath Towel, Pack of 2, 70x140 cm', 499, 999, '81cLyva+ZZL._SL1500_', [
    'Two full-size Cortina microfibre bath towels for ₹499 on Amazon — half the M.R.P.',
    'Each towel is 70 x 140 cm at 300 GSM: lighter than thick cotton, so they dry quickly on a line even in humid weather.',
    'Good for travel, gym bags and guest use where fast drying matters more than plushness.',
  ], 'Confirm the 2-towel pack is selected.'),
  A('B09NJS43X4', 'Crompton Laser Ray Maxx Pro 30W LED Batten, Pack of 6', 1173, 4500, '712xZzdinwL._SL1500_', [
    'Six Crompton 30W LED battens for ₹1,173 on Amazon, about ₹196 a light.',
    'The Laser Ray Maxx Pro runs on a wide 170–270 V input, which helps with the voltage swings common in Indian homes, and carries a 1-year warranty.',
    'A straightforward tube-light replacement for rooms, corridors and shops.',
  ], 'Select the pack of 6.'),
  A('B09V5HBRBF', 'Cutting Edge Interlocking Drawer Organiser, Pack of 2', 116, 185, '51PoaHaIgjL._SL1500_', [
    'Two Cutting Edge drawer organiser trays for ₹116 on Amazon.',
    'They interlock and stack, so you can build a grid inside a desk or kitchen drawer. The plastic is BPA-free.',
    'Useful for cutlery, stationery or makeup; measure the drawer depth before buying.',
  ], 'Confirm the 2-piece pack.'),
  A('B073BFTQ7J', 'Derwent Academy A5 Sketchbook, 128 Pages', 219, 849, '71DYAFhHDXL._SL1500_', [
    "Derwent's Academy A5 sketchbook is ₹219 on Amazon, 74% off.",
    'It has 128 pages of 135 gsm acid-free, FSC-certified paper with micro-perforated sheets that tear out cleanly.',
    'A good everyday pad for pencil, charcoal and dry media; heavy watercolour needs thicker paper.',
  ], 'Choose the A5 size.'),
  A('B0CY2B8S2H', 'Devkund Aloe Vera Gel, 200 g', 140, 250, '81cbE-VlkwL._SL1500_', [
    'A 200 g tub of Devkund aloe vera gel for ₹140 on Amazon.',
    'The maker sources its aloe from Rajasthan and uses agar as the thickener.',
    'Common uses are as a light face or hair gel and an after-sun soother. Patch-test first if you have sensitive skin.',
  ], 'Select the 200 g pack.'),
  A('B07QDJHWSR', 'Ekan Kids Water Bottle with Straw, 500 ml', 99, 399, '61JhivqCAiL._SL1400_', [
    "Ekan's 500 ml kids' straw bottle is ₹99 on Amazon — 75% off.",
    'The straw is tethered inside and the spout has a cover to keep it clean in a school bag. The bottle is BPA- and BPS-free.',
    'Sized for a school day or a trip to the park.',
  ], 'Pick your colour — price can differ between colours.'),
  A('B08C2DWFS8', 'Fashnex Knee Support, Single Piece', 457, 999, '81zsdgFDKBL._SL1500_', [
    'A neoprene Fashnex knee support for ₹457 on Amazon.',
    'It fits knees roughly 11–17 inches around and gives compression and warmth during walking, running or gym work. It is a single piece, not a pair.',
    'It is not a medical-grade brace — see a doctor for an injury.',
  ], 'Measure around the knee and pick the matching size.'),
  A('B0B9XVQJ5C', "Fastrack Women's Handbag FT75, Teal Blue", 771, 2098, '81egsJjj1eL._SL1500_', [
    "Fastrack's FT75 women's handbag in teal blue is ₹771 on Amazon, 63% below M.R.P.",
    "A structured everyday bag from the Titan group's youth brand — room for a phone, wallet and daily essentials.",
    'The teal colour is the one on offer; other colours are priced separately.',
  ], 'Make sure Teal Blue is selected.'),
  A('B0GH89RS26', 'Fire-Boltt Phoenix Air Smartwatch, 1.26 inch, Bluetooth Calling', 1199, 14999, '71CFSHzozvL._SL1500_', [
    "Fire-Boltt's Phoenix Air is ₹1,199 on Amazon, against a ₹14,999 M.R.P.",
    'It has a 1.26-inch round display in a metal body, Bluetooth calling from the wrist and a rotating crown for scrolling menus.',
    'Budget smartwatch M.R.P.s are inflated, so judge it on the actual price, not the percentage.',
  ], 'Pick your strap colour before checkout.'),
  A('B0H7MWJ5RV', 'Stainless Steel 304 Cutting Board, 32x21.5 cm', 239, 1399, '51DdmxYsrzL._SL1024_', [
    'A 304-grade stainless steel chopping board for ₹239 on Amazon.',
    'It measures 32 x 21.5 cm and is 2 mm thick. Steel is non-porous, so it does not soak up juices or smells the way wood does.',
    'Steel is harder on knife edges than wood or plastic; keep a honing rod handy.',
  ], 'Confirm the 32 x 21.5 cm size.'),
  A('B0DLVYNZM5', 'Foodie Puppies Dog Poop Bag Holder with 6 Rolls', 299, 799, '81aen-+PiKL._SL1500_', [
    'A leash-mount poop-bag dispenser with six refill rolls for ₹299 on Amazon.',
    'The holder clips on with a carabiner, and the bags are leak-proof and listed as biodegradable.',
    'Six rolls last a while for one dog on daily walks.',
  ], 'Check the listing includes the holder plus 6 rolls.'),
  A('B0H9HZ9DG6', 'Greciilooks Linen Check Co-ord Set for Women', 699, 1999, '51rTOivTWmL._SL1500_', [
    "Greciilooks' linen check co-ord set is ₹699 on Amazon, 65% off.",
    'A matching top and bottom in a checked pattern — wear them together or split them up.',
    'Check the size chart; co-ord sets fit differently across brands.',
  ], 'Select your size — stock varies by size.'),
  A('B0F45QNXNJ', "Highlander Men's Cotton Blend Casual Shirt, Long Sleeves", 607, 1899, '71WdIZ-hjzL._SL1440_', [
    'A Highlander poly-cotton casual shirt for ₹607 on Amazon.',
    'Long sleeves in a cotton-blend fabric that creases less than pure cotton.',
    "Highlander is one of Amazon's best-selling budget menswear labels.",
  ], 'Pick your size; price can vary by size.'),
  A('B0F2T8N42R', "Highlander Men's Straight Fit Stretch Jeans", 545, 2599, '71i1ZdCffoL._SL1500_', [
    'Highlander straight-fit jeans are ₹545 on Amazon, 79% below M.R.P.',
    'The denim is a cotton, polyester and Lycra mix, so there is some stretch for comfort.',
    'Straight fit sits between slim and relaxed — a safe everyday cut.',
  ], 'Select waist size; price can vary by size.'),
  A('B0FPWV2RZV', 'Ichaa Rayon Maxi Nighty for Women, Plus Sizes', 408, 1999, '61bbEYev+LL._SL1500_', [
    'An Ichaa rayon maxi nighty for ₹408 on Amazon.',
    'It is round-neck with half sleeves in soft rayon, and comes in plus sizes too.',
    'Machine wash cold to keep the print and fit.',
  ], 'Select your size.'),
  A('B0GCN2XTWB', 'Kratos Pop Wireless Earbuds, 60 Hours Playtime, Dark White', 499, 2999, '61Y95bXooCL._SL1500_', [
    'Kratos Pop true-wireless earbuds are ₹499 on Amazon.',
    'The brand rates them at 60 hours total playback with the case, using 10 mm drivers and Bluetooth 5.3. They are IPX4 splash-resistant, support voice assistants and charge over Type-C.',
    'Rated 3.9 stars — expect budget sound, not audiophile quality.',
  ], 'Confirm the Dark White colour.'),
  A('B0C3QPBC76', 'Kuber Industries Non-Woven Saree Cover, Pack of 3, Red Polka', 180, 659, '710X25JF6NL._SL1500_', [
    'Three Kuber Industries saree covers for ₹180 on Amazon, 73% off.',
    'Each non-woven bag is 46 x 33 x 22 cm with a zip and a clear window, holding about 5–6 sarees. They fold flat when empty. Made in India.',
    'Keeps silk and festive sarees dust-free in a cupboard.',
  ], 'Select the red polka pack of 3.'),
  A('B0H3FFJ3BV', "LEOTUDE Men's Oversized Drop-Shoulder Printed T-Shirt", 269, 1099, '51ckoY1mtmL._SL1440_', [
    'A LEOTUDE oversized printed tee for ₹269 on Amazon.',
    'Cotton-blend fabric, drop shoulders, half sleeves and a loose baggy fit.',
    'It has very few reviews so far, so check the size chart — oversized cuts run large by design.',
  ], 'Select your size.'),
  A('B0GP8Q88YP', "LITZO Women's Korean Night Suit Set, Top and Pyjama", 549, 3999, '518lkTa3LvL._SL1445_', [
    "LITZO's Korean-style night suit is ₹549 on Amazon.",
    'The set is a top with full-length pyjamas in a relaxed regular fit.',
    'Only a few were left in stock when we checked.',
  ], 'Select your size — stock is low.'),
  A('B0F8QX1MHQ', 'Mila Beauté Colour Switch pH Tinted Lip Balm', 100, 229, '61+ZTvOTknL._SL1500_', [
    "Mila Beauté's pH lip balm is ₹100 on Amazon.",
    "It shifts to a pink tint that reacts to your lips' pH, so the shade differs person to person. The gel texture includes rapeseed oil and squalane.",
    'A cheap way to try a colour-changing balm.',
  ], 'Confirm the Colour Switch variant.'),
  A('B0FH6QYH52', 'Milton Candy Tom & Jerry Tiffin Box, 520 ml, Pink', 125, 250, '716wKfQ1QqL._SL1500_', [
    "Milton's Candy tiffin with a Tom & Jerry print is ₹125 on Amazon — half price.",
    'It holds 520 ml, has a leak-proof inner container and a 4-side locking lid, and comes with a spoon and fork. BPA-free.',
    "Sized for a child's school lunch.",
  ], 'Select Pink.'),
  A('B0DS5Q7DBS', 'Milton Evoke 1000 Insulated Casserole, 850 ml, Maroon', 199, 485, '71LaLrbnFlL._SL1500_', [
    "Milton's Evoke 1000 casserole is ₹199 on Amazon, 59% off.",
    'PU insulation around an inner steel bowl keeps rotis and sabzi warm; it holds 850 ml and measures 18 x 10.2 x 18 cm. 1-year warranty.',
    "Right-sized for a small family's chapatis.",
  ], 'Select Maroon.'),
  A('B0FDL4ZZYC', 'Milton Halo 600 Thermoware Steel Bottle, 500 ml, Beige', 249, 510, '51yEjhxZ06L._SL1500_', [
    "Milton's Halo 600 bottle is ₹249 on Amazon.",
    'It has an inner steel body with PU insulation, a leak-proof cap and a carry strap, holding 500 ml.',
    'Thermoware keeps drinks cool or warm for a few hours — less than a vacuum flask.',
  ], 'Select Beige.'),
  A('B0CLZLJSHV', 'Milton Pearl 2500 Inner Steel Casserole, 2.1 L, Black', 568, 975, '61WZbMPaKbL._SL1500_', [
    "Milton's Pearl 2500 casserole is ₹568 on Amazon.",
    'A 2.1-litre double-walled server with an inner steel bowl and side handles — big enough for rice or curry for a family.',
    'Rated 4.2 stars across more than 1,800 reviews.',
  ], 'Select Black.'),
  A('B0FKMF7L6Z', 'Milton Super Sherry Tiffin Box, 780 ml, Beige', 149, 280, '61zfqdA-smL._SL1500_', [
    "Milton's Super Sherry tiffin is ₹149 on Amazon.",
    'It holds 780 ml with a leak-proof inner container and a 4-side locking lid. BPA-free.',
    'A bigger size for office lunches.',
  ], 'Select Beige.'),
  A('B07ZGW378Z', 'Milton Tasty 3 Combo Lunch Box with Tumbler, Cyan', 518, 885, '81qOj0501mL._SL1500_', [
    "Milton's Tasty 3 lunch combo is ₹518 on Amazon.",
    'You get three steel containers (200, 320 and 500 ml) plus a 380 ml tumbler inside an insulated fabric jacket.',
    'Rated 4.2 stars across more than 8,600 reviews.',
  ], 'Select Cyan.'),
  A('B0GWHZP6Z9', 'Intra Kids My First Car Bus Toy, 24 Months+', 141, 300, '51K3bOu5-rL._SL1000_', [
    'A push-along bus toy for toddlers, ₹141 on Amazon.',
    'It has rounded edges and non-toxic paint, and is made for ages 24 months and up.',
    'No reviews yet, so treat it as a simple starter toy.',
  ], 'Confirm the bus model.'),
  A('B0DSJW5T51', 'Nexa SS304 Single Bowl Kitchen Sink, 18x16x8 inch, Satin', 2502, 5150, '61SCihjqsgL._SL1000_', [
    'A Nexa 304 stainless steel kitchen sink is ₹2,502 on Amazon.',
    'Single bowl, 18 x 16 x 8 inches, 1 mm steel with a satin finish and round waste coupling. The maker gives a 10-year warranty.',
    'Check your countertop cut-out before ordering.',
  ], 'Confirm the 18x16x8 inch size.'),
  A('B0DGT9Y5LM', 'Nippon Paint Atom 2-in-1 Emulsion, 20 L', 2170, 4816, '71KMDiYn3WL._SL1500_', [
    'A 20-litre bucket of Nippon Paint Atom emulsion is ₹2,170 on Amazon.',
    'It works on interior and exterior walls, gives a smooth matt finish, is washable and low-VOC.',
    'Check the shade on the listing before ordering; 20 L covers a lot of wall.',
  ], 'Select the 20 L pack and your shade.'),
  A('B0843CHXTG', 'OFIXO 10-Slot Card Holder, Brown and Silver', 132, 999, '81HFqnMa0zL._SL1500_', [
    'An OFIXO pocket card holder for ₹132 on Amazon.',
    'It holds 10 cards in leatherite with a magnetic closure.',
    'Only a couple were left when we checked.',
  ], 'Select Brown/Silver.'),
  A('B0C39763HQ', 'OFIXO Neon Sticky Notes, 5 Colours, 400 Sheets, 3x3 inch', 110, 499, '61sg0RBG1hL._SL1500_', [
    '400 OFIXO sticky notes for ₹110 on Amazon.',
    'Five neon colours, 80 sheets each, all 3 x 3 inches.',
    'Enough for a desk or study table for months.',
  ], 'Confirm the 400-sheet pack.'),
  A('B0DJJXXN6B', 'Orgatre Grey Hair Touch-Up Stick, Black, 4.5 ml', 172, 299, '61v+scq6vbL._SL1500_', [
    "Orgatre's grey-hair touch-up stick is ₹172 on Amazon.",
    'A stick applicator covers roots and greys between colouring sessions; it is sweat- and smudge-resistant, with argan oil and vitamin E.',
    'It washes out — not permanent colour.',
  ], 'Select Black.'),
  A('B0D1FQMTSR', 'Philips 3W AceSaver LED Bulb B22, Crystal White, Pack of 6', 499, 780, '61PI6S2IegL._SL1080_', [
    'Six Philips 3W LED bulbs for ₹499 on Amazon — about ₹83 a bulb.',
    'B22 bayonet base, crystal white light, Eye Comfort, 90 lumens per watt.',
    '3W is dim — for bathrooms, balconies and night lamps, not main room light.',
  ], 'Select the pack of 6.'),
  A('B08JNYX7N3', 'Plantex Stainless Steel Towel Ring, Chrome, Pack of 3', 389, 2310, '71EWIo1y9aL._SL1500_', [
    'Three Plantex towel rings for ₹389 on Amazon.',
    'Each oval ring is 20.5 x 12 x 5 cm in rust-free chrome-finish steel, with fittings included. Made in India.',
    'Enough for a bathroom and a kitchen.',
  ], 'Select the pack of 3.'),
  A('B0F5Q9QTH1', 'Portronics Toad 103 Wired Mouse', 119, 499, '61X+SfvMh1L._SL1500_', [
    "Portronics' Toad 103 wired mouse is ₹119 on Amazon.",
    'It tracks at up to 2400 DPI, suits either hand, has a 1.5 m cable and is rated for 30 lakh clicks.',
    'Plug and play over USB.',
  ], 'Confirm Toad 103.'),
  A('B0FQJQDPF7', 'pTron Studio Over-Ear Wireless Headphones, Beige', 599, 2599, '51UjEUnn24L._SL1200_', [
    'pTron Studio wireless headphones are ₹599 on Amazon.',
    'The brand rates them for 60 hours of playback with 40 mm drivers and Bluetooth 5.4, plus dual-device pairing, aux and TF-card playback. IPX4, 6-month warranty.',
    'Budget over-ears for calls and casual listening.',
  ], 'Select Beige.'),
  A('B0CRYL3T6M', 'Shuban 30-Pocket FS Display Book, Pack of 2', 244, 899, '81FKclXGpfL._SL1500_', [
    'Two Shuban display books for ₹244 on Amazon.',
    'Each holds 30 foolscap-size clear PP sleeves for certificates, documents or project sheets.',
    'Good for exam and job-interview files.',
  ], 'Confirm the pack of 2.'),
  A('B09D3Q1TW2', 'SIMPARTE 3 L Square Storage Container, Pack of 2, Blue Lid', 309, 550, '61CTZR4NOiL._SL1500_', [
    'Two 3-litre SIMPARTE containers for ₹309 on Amazon.',
    'Square, airtight, stackable and BPA-free — for atta, rice or dal.',
    'Square shapes use shelf space better than round jars.',
  ], 'Select the blue-lid pack of 2.'),
  A('B0GKPQY3N8', 'TEKCOOL Extendable Microfibre Ceiling Duster, 30 to 100 inch', 199, 499, '61WnuoW5VNL._SL1100_', [
    'A TEKCOOL extendable duster for ₹199 on Amazon.',
    'The pole stretches from 30 to 100 inches to reach fans and ceilings, and the microfibre head detaches for washing.',
    'Saves climbing a stool for fan cleaning.',
  ], 'Confirm the extendable model.'),
  A('B0CMTF7FKT', 'Treo by Milton Embassy Glass Tumbler, 260 ml, Set of 6', 310, 575, '61HyQ2+19mL._SL1500_', [
    'Six Treo Embassy glass tumblers for ₹310 on Amazon.',
    'Each holds 260 ml and measures 5.9 x 5.9 x 16.2 cm — a tall, slim glass for water or juice.',
    "Treo is Milton's glassware brand.",
  ], 'Select the set of 6.'),
  A('B0FGKCFFD8', 'Treo by Milton Ridge 210 Ceramic Mug, Set of 6, Beige', 399, 1095, '71+p6fwA4zL._SL1500_', [
    'Six Treo Ridge ceramic mugs for ₹399 on Amazon — about ₹67 a mug.',
    'Each is 210 ml with a matt finish and is microwave-safe.',
    'A tea-size mug for everyday use.',
  ], 'Select Beige.'),
  A('B0GBXNRZ42', 'V-Guard Windle Deco Bz 1200 mm Ceiling Fan, Matte Brown', 1799, 3799, '51EBFe5fuhL._SL1500_', [
    "V-Guard's Windle Deco Bz ceiling fan is ₹1,799 on Amazon.",
    'It spins at 370 RPM with 215 m³/min air delivery, uses double ball bearings and has a powder-coated finish. 1200 mm sweep.',
    'A regular (non-BLDC) fan, so running cost is higher than a BLDC model.',
  ], 'Select Matte Brown.'),
  A('B08D7CSBBW', 'Veet Pure Hair Removal Cream for Dry to Normal Skin, 30 g', 115, 230, '61qAY1uOznL._SL1000_', [
    'A 30 g tube of Veet Pure hair removal cream for ₹115 on Amazon — half price.',
    'It works in 3–6 minutes, contains shea butter and is dermatologically tested, for dry to normal skin.',
    'Patch-test first; 30 g is a small tube for a few uses.',
  ], 'Confirm the dry-to-normal skin 30 g tube.'),
  A('B0H4WDY4SW', 'Xtore Gold Ceramic Planter, Set of 2', 368, 1999, '61TCj+EKOcL._SL1024_', [
    'Two Xtore gold ceramic planters for ₹368 on Amazon.',
    'Each is about 10.5 cm across and 7.5 cm tall with a 7 cm opening — small tabletop pots. Planters only, no plants.',
    'Suits succulents and small indoor plants on a desk or shelf.',
  ], 'Confirm the 2-piece gold set.'),
  { store: 'Flipkart', productId: 'RCLH3ZWHYGHMHWAW', name: 'Crompton 48 LED Rice Lights, 10 m, Green Steady', price: 79, mrp: 400, exp: 79, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/rice-light/6/7/t/-original-imah47m9tnqggfys.jpeg?q=70',
    description: [
      'A 10-metre Crompton string of 48 green LEDs for ₹79 on Flipkart.',
      'Steady glow, no flashing — for balconies, doorways and festive decoration.',
      'Flipkart marks this as its lowest price since launch.',
    ], variant: 'Confirm the green 10 m string.' },
];
// ------------------------------------------------------------------- derive + gate
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/\S+)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0926ae-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
