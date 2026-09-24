// DEAL-INGEST indiafreestuff tick 2026-09-25j
//
// /deals + /deals/superdeals -> 53 candidates -> Buy Now ?rto= resolved. Myntra via InRDeals.
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

const V = 'Check the variant selected on the product page matches this listing — other options on the same page can be priced differently.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0DFTJ14JC', name: 'Frosty Square Twist Fridge Water Bottle Set of 6, 1 Litre',
    price: 306, mrp: 1080, image: IMG('61B3+5fps7L._SL1500_.jpg'),
    description: [
      'Square bottles make better use of fridge-door space than round ones: they stand flush against each other, so six one-litre bottles fit where four round ones would. The twist cap on this Frosty set screws down rather than pressing in, which keeps the water sealed when the door swings open and shut all day.',
      'At ₹306 for six, each bottle works out to about ₹51. That is cheap enough to keep one set in the fridge and send a couple along in school bags or to the office without worrying about losing them. A set of six also means there is always a cold, full bottle ready while the others refill.',
      'Rinse new bottles with warm water and a drop of dish soap before first use, and leave the caps off to dry so no smell builds up. Plastic fridge bottles are made for cold water — do not fill them with boiling water or put them in a hot dishwasher cycle, which can warp the thread so the cap stops sealing.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0FMRQDJL6', name: 'Cortina Velvet Sofa Cover with Tassels, 2 Seater',
    price: 148, mrp: 599, image: IMG('81hoKj0oEVL._SL1500_.jpg'),
    description: [
      'A sofa topper is a throw-style cover that lies over the seat and back rather than fitting tightly like a stretch slipcover. That makes it quick to put on and pull off, and it protects the upholstery underneath from spills, pet hair and the wear marks that build up where people sit most.',
      'This Cortina cover is velvet with a tasselled edge and is sized for a 2-seater. The listing says it is machine washable, which is the main reason to use a topper at all: washing a cover every few weeks is far easier than cleaning the sofa fabric itself. At ₹148 it costs less than a single professional spot clean.',
      'Wash velvet inside a laundry bag on a gentle cold cycle and dry it flat or on a line in the shade, so the pile does not crush and the tassels do not tangle. Measure the sofa seat width first — a topper that is too narrow slides off the arms, while a slightly generous one tucks neatly into the gaps.',
    ],
    variant: 'Confirm the 2 Seater size and your colour are selected — other sizes on the same page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0FCBPT18L', name: 'araami Cervical Neck Pillow, Memory Foam Neck Roll',
    price: 284, mrp: 2099, image: IMG('81kGG4UIvRL._SL1500_.jpg'),
    description: [
      'A cervical roll is a firm cylinder that sits in the curve of the neck instead of under the whole head. The idea is to support the natural curve of the neck while you sleep on your back, so the head does not tip forward on a thick pillow or drop back on a flat one. Many people use one on top of or in place of a regular pillow.',
      'This araami roll is memory foam, which slowly shapes itself to the neck under body heat and then springs back when you get up. At ₹284 it is an inexpensive way to find out whether a neck roll suits you before spending on a full contoured orthopaedic pillow that costs several times as much.',
      'Give memory foam a night or two to settle; it can feel firm at first, especially in a cold room. Air it out of the packaging for a few hours before use. If neck pain is persistent or comes with numbness or tingling, see a doctor or physiotherapist — a pillow can make sleep more comfortable but is not a treatment.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B09S3NN3LS', name: 'Kabello Kids Role Play Set, Return Gift for Girls',
    price: 99, mrp: 499, image: IMG('61csCbnzuBL._SL1400_.jpg'),
    description: [
      'Role play sets give young children small props to act out everyday grown-up jobs — the kind of pretend play that builds vocabulary, turn-taking and fine motor control while it looks like just a game. Sets like this Kabello one are sold as birthday return gifts because they are small, colourful and cheap enough to buy in multiples.',
      'At ₹99 a piece, ten return gifts cost under ₹1,000, which is the usual budget problem when a whole class is invited to a party. Buying the same item for every child also avoids the comparisons that start when goodie bags differ. Order a spare or two in case of a late extra guest.',
      'Check the age marking on the product page before buying for toddlers: small parts in pretend-play sets are a choking hazard for children under three. Keep the packaging until after the party so a gift that arrives damaged can still be returned, and open one set beforehand to see exactly what is inside.',
    ],
    variant: 'Confirm the Multicolor set is selected before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0GLFYBMX5', name: 'Goldmedal Bolt+ Universal Travel Adaptor with 2 USB-A and 1 USB-C',
    price: 387, mrp: 1400, image: IMG('518rgHnAENL._SL1327_.jpg'),
    description: [
      'A universal travel adaptor lets a single plug fit the different socket shapes used around the world, which saves carrying a separate converter for each country on a trip. Built-in USB ports mean the phone, earbuds and a power bank can charge from the one adaptor overnight instead of fighting over a single hotel socket.',
      'The Goldmedal Bolt+ has two USB-A ports and one USB-C port alongside its main socket, so three devices can charge together. Goldmedal is an Indian electrical brand best known for switches and wiring accessories. At ₹387 it costs well under what airport shops charge for similar adaptors.',
      'An adaptor changes the plug shape only — it does not convert voltage. Most phone and laptop chargers accept 100–240V and are fine anywhere, but check the label on hair dryers and straighteners before plugging them in abroad. Unplug the adaptor when you leave the room, and do not stack further adaptors off it.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0HDNWMGR9', name: 'Sitting Monkey Soft Toy Plush, 28cm',
    price: 199, mrp: 599, image: IMG('613K9md8+XL._SL1080_.jpg'),
    description: [
      'A 28cm sitting plush is the size that works for small children: big enough to hug, small enough to carry around the house and take along in a car seat. Seated toys also stay upright on a shelf or bed, which is why they are popular as room decor as well as cuddle toys.',
      'This monkey plush sits at ₹199, which puts it in the range of a return gift or a small add-on present rather than a big-ticket toy. Soft toys at this size are also easy to post or pack in a bag if you are sending a gift to a child in another city. Plush toys are also one of the few gifts that suit almost any age from toddlers upwards, so a spare or two in the cupboard covers a last-minute birthday invite.',
      'For babies and toddlers, check that eyes and noses are stitched or firmly fixed and give the seams a tug before handing it over. Hand wash in lukewarm water with mild soap, squeeze rather than wring, and dry fully in the sun so the stuffing does not stay damp and start to smell.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0HDNQQWF8', name: 'Cow Plush Soft Toy, 30cm',
    price: 199, mrp: 599, image: IMG('61OKz8Iwn3L._SL1080_.jpg'),
    description: [
      'A 30cm plush animal is a comfortable size for young children: easy to hold with both arms, light enough to carry from room to room, and not so big that it takes over the bed. Farm animals like a cow are also among the first animals small children learn to name, which makes them a good first cuddle toy.',
      'At ₹199 this cow plush is priced as a return gift or a small add-on present. It sells alongside a sitting monkey from the same range at the same price, so the two make an easy matched pair for siblings or twins. Plush toys are also one of the few gifts that suit almost any age from toddlers upwards, so a spare or two in the cupboard covers a last-minute birthday invite.',
      'For babies and toddlers, check that the eyes and any horns are stitched or firmly fixed and give the seams a tug before handing it over. Hand wash in lukewarm water with mild soap, squeeze rather than wring, and dry fully in the sun so the stuffing does not stay damp inside.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0GZ4T3HV4', name: 'ECOMISTIQ Sofa Spring Stretcher Tool, Furniture Repair Kit',
    price: 928, mrp: 6018, image: IMG('41w6MGAm+bL._SL1500_.jpg'),
    description: [
      'Sofas and chairs with zig-zag or tension springs sag when a spring clip pops loose or a spring slips out of its rail. Stretching a spring back into place by hand is hard work and a common way to cut fingers, because the spring has to be pulled well past its resting length before it will seat. A spring stretcher tool gives you leverage to do that safely.',
      'This ECOMISTIQ tool is sold as a multipurpose furniture repair kit. At ₹928 it is a fraction of what an upholsterer charges for a home visit, and it pays for itself on the first sofa that no longer sags in the middle. It is also useful for re-seating springs on bed bases and car seats.',
      'Before you start, turn the sofa over and photograph how the springs and clips sit, so you can put everything back the same way. Wear gloves and safety glasses — a spring that slips off the tool under tension can whip back hard. Replace any clips that are cracked rather than reusing them.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0DWK3TPPQ', name: 'MiniSteps Ultra-Soft Washable Fat Cat Plush Toy',
    price: 102, mrp: 1299, image: IMG('61IdBl4naiL._SL1500_.jpg'),
    description: [
      'A washable plush is the practical choice for toddlers, whose soft toys go everywhere: on the floor, into the food, and into the bath. MiniSteps sells this round, fat cat design as ultra-soft, safe and non-toxic, which is what parents look for in a toy that ends up in a small child\'s mouth.',
      'At ₹102 it is one of the cheapest branded plush toys in its range, and the price makes it easy to buy two — one to use and one to swap in while the first is being washed. That is often the only way to wash a favourite toy without a bedtime meltdown. The listed M.R.P. is ₹1,299, so the current price is more than 90% below it — the kind of drop that usually does not last long on Amazon.',
      'Wash it inside a pillowcase on a gentle cold cycle or by hand, then squeeze out the water and dry it fully in the sun. Check the seams and any stitched features after each wash; if a seam starts to open, stitch it up before small hands find the stuffing.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0FDG5H3S5', name: 'Ani Divine Sheesham Wood Rehal Book Holder, 12 Inch',
    price: 239, mrp: 699, image: IMG('71L6gMswW1L._SL1500_.jpg'),
    description: [
      'A rehal is a folding X-shaped book stand, traditionally used to hold scripture off the floor during recitation. Two interlocking wooden leaves open into a cradle that supports a heavy book at a comfortable reading angle, then fold flat for storage. It is used for the Gita, Ramayan, Shiv Puran, Guru Granth Sahib gutkas and the Quran alike.',
      'This Ani Divine rehal is handcrafted in sheesham (Indian rosewood), a dense hardwood that is strong enough for a thin, interlocking design. At 12 inches it suits most standard-size religious books. At ₹239, with a further 5% coupon on the page, it is a modest price for solid wood.',
      'Wipe sheesham with a dry or slightly damp cloth and keep it out of direct sun, which can dry the wood and cause fine cracks. A little furniture wax once or twice a year keeps the finish rich. Open and close the leaves gently along the joint, since forcing it can split the interlocking slots.',
    ],
    variant: 'Confirm the 12 Inch size is selected — other sizes on the same page are priced differently.',
    coupon: 5,
  },
  {
    store: 'Amazon', productId: 'B071NL2GQ8', name: 'Klapp KL-ARSKT Adjustable Baby Roller Skates',
    price: 545, mrp: 999, image: IMG('81-fbccfI0L._SL1500_.jpg'),
    description: [
      'Adjustable roller skates grow with a child: the shoe section slides out a few sizes, so one pair lasts through more than one growth spurt. That matters for beginners, who often go through two or three sizes in the time it takes to get confident on wheels. These Klapp skates are the adjustable, strap-on kind made for small children learning to skate.',
      'At ₹545, with a further 3% coupon on the page, they are an inexpensive way to find out whether a child actually enjoys skating before buying a pricier inline pair. Start on a smooth, flat, traffic-free surface such as a building compound or a basketball court.',
      'A helmet plus knee and elbow pads are not optional for beginners — most falls in the first few weeks are backwards or onto the wrists. Check the wheel nuts and adjustment lock before every session. Wipe dust off the wheels after use and keep the skates dry so the bearings do not rust.',
    ],
    variant: 'Confirm the size range selected fits your child\'s current shoe size.',
    coupon: 3,
  },
  {
    store: 'Amazon', productId: 'B0HG33DNC5', name: 'Turbo Cooler Fan 5015 5V Dual Ball Bearing DC Fan for MK3S 3D Printer',
    price: 1242, mrp: 2334, image: IMG('618a1+NLOZL._SL1500_.jpg'),
    description: [
      'A 5015 blower is the part-cooling fan on many FDM 3D printers, including Prusa MK3S-style machines. It blows air across freshly laid plastic so overhangs and bridges set before they droop. When it gets noisy, wobbles or stops spinning, print quality on fine detail drops quickly, so it is one of the most commonly replaced printer parts.',
      'This replacement uses dual ball bearings, which usually last longer and cope better with heat than the sleeve bearings on cheaper fans. It runs on 5V, so check that your printer\'s fan header supplies 5V before ordering — many printers use 12V or 24V fans and a mismatched voltage will not work correctly.',
      'Switch the printer off and let the hotend cool before swapping the fan. Photograph the connector and cable routing first, and keep the new cable away from the heater block and moving belts. After fitting, run a short test print with overhangs to confirm the airflow is aimed at the nozzle tip.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0HG5TLDZ7', name: '3D Printer PT100 V6 Heater Block, Nickel Plated',
    price: 1131, mrp: 2121, image: IMG('61AYXv-67eL._SL1500_.jpg'),
    description: [
      'The heater block is the small metal block in an FDM hotend that holds the heater cartridge, the temperature sensor and the nozzle. This one is made for the V6 hotend design and is drilled for a PT100 sensor, which reads high temperatures more accurately than a standard thermistor and is used for printing materials such as nylon and polycarbonate.',
      'Nickel plating resists molten plastic sticking to the block and holds up better at high temperatures than bare aluminium. Replacing a block is the usual fix after a blob of plastic has engulfed the hotend or the threads have been damaged by over-tightening the nozzle.',
      'Confirm your hotend is a V6 and your sensor is a PT100 before ordering — the sensor bore size differs between sensor types. Tighten the nozzle hot, at printing temperature, against the heat break so it seals, and do not over-tighten. Re-run a PID tune after fitting a new block so temperatures stay stable.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0DWK9TSF2', name: 'Mini Steps Floating Rubber Bath Toys for Babies',
    price: 152, mrp: 699, image: IMG('61DwU66BfxL._SL1500_.jpg'),
    description: [
      'Floating bath toys turn bath time from a struggle into something a baby looks forward to. Toys that bob, spin and can be squeezed give little hands something to grab and track, which is good practice for grip and hand-eye coordination. This Mini Steps set is made for babies and small toddlers.',
      'At ₹152 for the set it is priced as a small add-on, and cheap enough to replace every few months. That is worth planning for, because rubber bath toys are hard to fully clean on the inside. Bath toys also help with babies who dislike having water poured over their heads: a toy to hold and watch keeps their attention while you rinse their hair quickly and gently.',
      'Squeeze out all the water after every bath and leave the toys to dry upside down in an airy spot. If a toy has a hole, mould can grow inside where you cannot see it. Soak them now and then in a mild vinegar solution, and throw away any toy that squirts dark water.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0F1N9GNPK', name: 'Protoner Cricket Set, Full Size Bat with 3 Stumps and Wind Ball',
    price: 515, mrp: 2999, image: IMG('71d5HOZZ0xL._SL1500_.jpg'),
    description: [
      'A complete gully-cricket kit in one box: a full-size bat, three stumps on a stand and a wind ball. The stand is the useful part — it lets you set the stumps up on a terrace, in a building compound or on a hard court where you cannot drive them into the ground.',
      'Wind balls are hollow and light, so they are safer for windows, cars and players without pads than a tennis ball wrapped in tape. That makes this set suited to mixed-age play at home and to beginners. At ₹515 for the whole kit it costs less than many standalone bats. Having your own stumps and ball also means the game does not end when the one child who owns the kit goes home for dinner, which anyone who played gully cricket will remember.',
      'A full-size bat will be heavy for children under about 12 — check the size before buying one for a young player. Store the bat indoors, away from damp and direct sun, so it does not warp or crack. Wipe the ball after play in wet weather.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0H7KX13BS', name: 'Plastic Arm Chair Set of 2 for Home, Garden and Cafe',
    price: 898, mrp: 2500, image: IMG('61B2Z7g9bFL._SL1500_.jpg'),
    description: [
      'Moulded plastic arm chairs are the workhorse seating of Indian homes: light enough to carry to the balcony or the terrace, stackable when guests leave, and fine to leave out in the rain. This listing is a set of two, sold for indoor and outdoor use at home, in the garden, in an office or in a cafe.',
      'At ₹898 for the pair, each chair works out to about ₹449. Arm rests make them more comfortable than armless stacking chairs for longer sitting, such as a morning tea on the balcony or a family function where people sit for hours. Two matching chairs are also the right number for a small balcony or a verandah corner, where a full outdoor dining set would not fit.',
      'Plastic chairs fade and turn brittle after long sun exposure, so store them in shade when not in use. Wash them with soap and water rather than harsh cleaners. Check the maximum weight rating on the product page, and do not stand on them to reach high shelves.',
    ],
    variant: 'Confirm the set of 2 and your colour are selected before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0GYS9TZWP', name: 'Amazon Brand Solimo Airtight Round Storage Containers, Set of 6',
    price: 442, mrp: 1999, image: IMG('61oCifJ-NNL._SL1500_.jpg'),
    description: [
      'Airtight containers keep dals, rice, atta, snacks and spices fresh and dry through the monsoon, and stop ants and weevils from getting in. Round containers are easy to scoop from and to clean, since there are no corners for flour to cake into. This Solimo set is food-grade plastic, with the largest container at 1.3 litres.',
      'Solimo is Amazon\'s own house brand for home and kitchen basics. At ₹442 for six, each container is under ₹75, which is less than many single branded jars. Clear plastic also lets you see at a glance when a staple is running low.',
      'Wash new containers before first use and let them dry completely before filling, especially for flour and spices that clump in any moisture. Do not microwave them with the lid on, and keep them away from the hob. Replace any seal that has cracked or stopped clicking shut.',
    ],
    variant: 'Confirm the set of 6 is selected — other pack sizes on the same page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B08B8QSCFD', name: 'KINGSWAY Aura Car Body Cover, Dustproof (2020-2022 Models)',
    price: 583, mrp: 1450, image: IMG('61tnziYfhrL._SL1500_.jpg'),
    description: [
      'A fitted car body cover keeps dust, bird droppings, tree sap and sun off the paint when a car is parked outdoors for days at a time. That cuts down on washing and slows the fading of paint and the cracking of rubber trims. This KINGSWAY cover is cut for the Hyundai Aura, 2020 to 2022 models.',
      'A model-specific cover sits closer to the body than a generic one, so it is less likely to balloon and flap in wind, which can scratch the paint over time. At ₹583 it costs less than a couple of professional washes. A cover also keeps the cabin cooler after a day parked in the sun, since the roof and windscreen are shaded instead of absorbing direct heat for hours.',
      'Only put a cover on a clean, dry car — grit trapped underneath acts like sandpaper. Fold it from the front and back towards the middle so the inner lining stays clean. On very windy days, tie the straps under the car. Check the listing says your model year before ordering.',
    ],
    variant: 'Confirm your car model and year match the cover selected — other models on the same page are different sizes.',
  },
  {
    store: 'Amazon', productId: 'B0HC469Y9L', name: 'Elevate Study Table with Bookshelf Hutch, Wooden Computer Desk',
    price: 1998, mrp: 10000, image: IMG('81-4TZxQ2oL._SL1500_.jpg'),
    description: [
      'A study table with a hutch puts shelves above the work surface, so books, files and stationery stay within reach without taking up desk space. That makes it a good fit for small bedrooms and work-from-home corners, where a separate bookshelf will not fit. This Elevate desk has storage both above and below the top.',
      'At ₹1,998 against a listed ₹10,000, it is priced below many plain desks without any shelving. It is a flat-pack design, so it arrives in a box and is assembled at home. Shelves at eye level also keep the desk top clear for a laptop and a notebook, which makes it easier to settle into focused work or homework without clutter in the way.',
      'Assemble it close to where it will stand, since a hutch desk is tall and awkward to move once built. If the kit includes a wall anchor, use it — a hutch puts weight up high, and children pulling on shelves is a real tip-over risk. Measure the ceiling height under any window sill or AC first.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0BL1J3JP1', name: 'SignoraWare Steel Executive Lunch Box 500ml + 350ml with Bag',
    price: 357, mrp: 751, image: IMG('614aaJnKV5L._SL1500_.jpg'),
    description: [
      'An all-steel lunch box does not stain with turmeric or hold on to smells the way plastic tiffins do, and it can be scrubbed hard every day without scratching into something unhygienic. This SignoraWare set has two containers, 500ml and 350ml, and comes with a carry bag.',
      'Two sizes cover the usual office lunch: roti or rice in the larger box and sabzi or dal in the smaller one. The listing says the set is food grade and BPA free. At ₹357 it is a fair price for a steel set with its own bag. Steel boxes also last for years with daily use, so the cost per meal ends up far lower than replacing plastic tiffins that crack or stain every few months.',
      'Steel does not keep food warm on its own — pack it hot and eat within a few hours, or use the bag to keep it from cooling too fast. Do not microwave steel. Check the lid seals before packing liquid curries, and wash the gasket separately so food does not collect under it.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0CYHDGQ7H', name: 'Amazon Brand Symactive 20mm Knee and Elbow Cushion Pad, Set of 2',
    price: 289, mrp: 900, image: IMG('81lVZjHWEIL._SL1500_.jpg'),
    description: [
      'A 20mm cushion pad sits under the knees or elbows during floor exercise, yoga holds and home workouts, where a thin mat is not enough padding on a hard tiled floor. It is also handy for gardening, cleaning floors or working under a car, where you kneel for long stretches.',
      'Symactive is Amazon\'s own fitness brand. This set has two pads, so one can stay with the yoga mat and one in the garden or garage. At ₹289 for the pair, each pad is under ₹145. A thick pad also makes floor stretches and core work less of a chore for beginners, who often give up on floor exercises simply because kneeling on tiles hurts. A pad removes that excuse.',
      'Wipe the pads with a damp cloth and mild soap after sweaty sessions and let them air dry out of direct sun, which can harden foam. A kneeling pad cushions pressure but does not fix joint pain — if kneeling still hurts with a pad, get it checked rather than pushing through.',
    ],
    variant: 'Confirm the set of 2 and your pattern are selected before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0821KJSJ1', name: 'Fastrack Beat Perfume for Women, Fruity Scent, 100ml',
    price: 419, mrp: 895, image: IMG('510mdJDiCjL._SL1440_.jpg'),
    description: [
      'Fastrack Beat is a fruity women\'s fragrance from Titan\'s youth brand, sold in a 100ml spray. Fruity scents are bright and easy to wear in the day, which makes them a popular everyday choice for college and office rather than an evening-only perfume.',
      'At ₹419 with a further 3% coupon on the page, 100ml of a branded perfume costs less than many 50ml body mists. It is a practical gift pick too, since Fastrack is a name most people recognise. A 100ml bottle also lasts a long time with daily use at two or three sprays, which brings the cost per wear down to a few paise. It makes an easy birthday or Rakhi gift too.',
      'Spray onto pulse points such as the wrists and neck rather than onto clothes, and do not rub the wrists together, which breaks down the top notes faster. Store the bottle in a cool, dark cupboard — bathroom heat and sunlight both make perfume fade and turn sooner.',
    ],
    variant: 'Confirm the 100ml size is selected before adding to cart.',
    coupon: 3,
  },
  {
    store: 'Amazon', productId: 'B0H5QVST75', name: 'LONGWAY Clipzy Rechargeable Clip Fan, 360 Degree Rotation, BLDC',
    price: 799, mrp: 2199, image: IMG('71wBGx5xcZL._SL1500_.jpg'),
    description: [
      'A clip fan clamps onto a bed frame, study table, pram or kitchen shelf, putting airflow exactly where you are sitting rather than stirring the whole room. Because this LONGWAY Clipzy is rechargeable, it also keeps running during power cuts, when the ceiling fan stops.',
      'It has a BLDC motor, which draws less power than a conventional motor at the same speed and so stretches each charge further. It has 3 speeds and a head that rotates through 360 degrees. At ₹799 it is priced well below most rechargeable table fans. Clip fans are also useful in a kitchen corner, over a baby cot or at a study desk, where the ceiling fan either does not reach or cannot be run at full speed.',
      'Charge it fully before first use and top it up after each long run rather than running the battery to zero every time. Keep the clip on a stable edge, away from where children can pull it down. Wipe the blades with a dry cloth — do not wash the fan or charge it near water.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0F9LF8ZYC', name: 'Halonix 11W Emergency Inverter LED Bulb B22D, Pack of 2',
    price: 385, mrp: 1198, image: IMG('71XGloNyT8L._SL1500_.jpg'),
    description: [
      'An emergency LED bulb has a small rechargeable battery built in. It charges while the power is on and keeps lighting when the supply cuts, so a room is not plunged into darkness during a load-shedding hour. It fits a normal B22D bayonet holder, the standard round-pin fitting in most Indian homes, so no inverter wiring is needed.',
      'Halonix is an Indian lighting brand. This is a pack of two 11W bulbs, and at ₹385 for the pair each bulb is under ₹200 — less than many single emergency bulbs from other brands. Put one in the kitchen and one on the stairs, where darkness is most dangerous.',
      'The switch must stay ON for the bulb to charge and to light up in a power cut. Backup time depends on battery age and charge, so do not rely on one for medical equipment. Fit the bulbs with the power off at the switch, and do not use them in enclosed fittings that trap heat.',
    ],
    variant: 'Confirm the pack of 2 and 11W are selected — other wattages and pack sizes are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0GYNL9WPL', name: 'French Press Coffee Maker 600ml, Borosilicate Glass',
    price: 499, mrp: 1699, image: IMG('71G9cleCuRL._SL1500_.jpg'),
    description: [
      'A French press is the simplest way to brew full-bodied coffee at home: coarse grounds steep in hot water for about four minutes, then a mesh plunger pushes them to the bottom. No paper filters, no electricity and nothing to break down. This 600ml press makes two to three cups at a time.',
      'The carafe is borosilicate glass, the heat-resistant kind used in lab glassware, which copes with boiling water better than ordinary glass. The listing mentions a 4-level filter. It also works for loose-leaf tea and cold brew. At ₹499 it costs less than a week of cafe coffee.',
      'Use a coarse grind — fine powder slips through the mesh and makes the cup muddy. Let boiled water rest for 30 seconds before pouring. Pour the coffee out as soon as you plunge, or it keeps extracting and turns bitter. Unscrew and rinse the filter layers regularly so old oils do not build up.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0CY5GNHKQ', name: 'Faber Sportz 2-in-1 Nutrifit Nero Blender Mixer Grinder 400W',
    price: 1785, mrp: 5490, image: IMG('51-GW8OaX3L._SL1500_.jpg'),
    description: [
      'A personal blender is built for single servings: blend a smoothie, protein shake or chutney straight in the bottle and drink from it or carry it to work. This Faber Sportz is a 2-in-1 — it blends and also grinds, so it can handle dry masalas as well as shakes.',
      'It has a 400W motor with copper windings, according to the listing, and a detachable jar. Faber is best known in India for kitchen chimneys and hobs. At ₹1,785 it is priced well below its listed M.R.P. Stock was very low when we checked, with only one unit left, so it may sell out quickly. A single-serve blender also saves washing a full mixer jar for one shake.',
      'Do not overfill — leave room for the blades to move liquid. Add liquid before ice or frozen fruit. Run it in short bursts when grinding dry spices so the motor does not overheat. Rinse the jar straight after use, before smoothie residue dries on the blades.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0FJMGWF5K', name: 'Lifelong Stainless Steel Heavy Bottom Saucepan 1.5L, 17cm',
    price: 199, mrp: 999, image: IMG('61Mq8-H4I3L._SL1500_.jpg'),
    description: [
      'A 1.5 litre saucepan is the everyday pan for boiling milk, making chai for two to four people, heating dal or cooking Maggi. A heavy bottom spreads heat evenly and stops milk scorching onto the base, which is the most common complaint about thin steel pans.',
      'This Lifelong pan is stainless steel, 17cm across, with a handle. Stainless steel does not react with tomato or tamarind, and can be scrubbed without wearing off a coating. At ₹199 it costs about what a single non-stick tawa coating repair would. A small, sturdy saucepan is also one of the most-used pans in any Indian kitchen, so it is worth having a spare for the days when chai and milk are both on the stove at once.',
      'Heat steel on medium, not high — it heats evenly once warm, and high heat just burns milk faster. Soak burnt milk in warm soapy water before scrubbing. Check on the product page whether the base is induction-compatible if you cook on an induction hob.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0GLFSFF46', name: 'Lifelong 4.2L Air Fryer 1350W with 7 Presets',
    price: 2999, mrp: 12999, image: IMG('617IP8W8zJL._SL1500_.jpg'),
    description: [
      'An air fryer is a compact countertop convection oven that circulates hot air fast enough to crisp food with a spoon of oil instead of a pan of it. Samosas, fries, tikkas and paneer come out crisp without deep frying, and it reheats leftovers without making them soggy the way a microwave does.',
      'This Lifelong model has a 4.2 litre basket, enough for a family of three or four, and a 1350W heater. It has 7 presets including defrost. At ₹2,999 against a listed ₹12,999, it is among the lower-priced 4-litre-plus air fryers. Presets take the guesswork out of time and temperature for common foods, which helps if you are new to air frying.',
      'Do not overcrowd the basket — air needs space to flow, so cook in batches for crisp results. Shake the basket halfway through. Keep 10–15cm of clear space around it while it runs, and never put it under a wall cabinet. Wash the basket after every use so oil does not bake on.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0H42DBG6P', name: 'Meridian Set of 3 Trolley Bags, Cabin + Medium + Large, 8 Spinner Wheels',
    price: 3999, mrp: 37997, image: IMG('51+fzVZMT7L._SL1080_.jpg'),
    description: [
      'A three-piece luggage set covers every kind of trip: the cabin size for a weekend or a flight with hand baggage only, the medium for a week away, and the large for long trips or moving home. The bags nest inside each other when not in use, so the set takes the storage space of one bag.',
      'These Meridian trolleys are hard-shell polypropylene with 8 spinner wheels, which roll in any direction and are easier to steer in airports and stations than 2-wheel trolleys. At ₹3,999 for all three, each bag works out to about ₹1,333. The listed M.R.P. of ₹37,997 is for all three bags together, so the current price is roughly 90% below it.',
      'Check your airline\'s cabin size limit against the cabin bag\'s dimensions on the product page before flying with it. Do not overpack a hard shell to force it shut — that strains the zip and hinges. Lift by the handles rather than the extended trolley bar when climbing stairs.',
    ],
    variant: 'Confirm the Set of 3 and your colour are selected before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0FKBRGT1B', name: 'Lifelong Hair Dryer 1200W Foldable, 2 Heat Settings',
    price: 699, mrp: 2499, image: IMG('61-TyvHhp8L._SL1500_.jpg'),
    description: [
      'A 1200W dryer is a sensible everyday size: powerful enough to dry shoulder-length hair in a few minutes, and light enough for daily use and travel. This Lifelong dryer folds at the handle, so it fits in a drawer or a travel bag without a bulky case, and it works for men and women alike.',
      'It has 2 heat settings. Using the lower one for most of the drying and the higher one only at the end is kinder to hair. At ₹699 it is priced like a basic unbranded dryer. A foldable dryer also suits hostels and PGs, where storage space is tight and appliances get shared or carried from room to room. It can go in a backpack for a weekend trip without taking up much space.',
      'Keep the nozzle a hand-width from the scalp and keep it moving. Pull lint off the rear air intake regularly — a blocked intake makes the dryer overheat and cut out. Never use it near a filled basin or bath, and unplug it before wrapping the cord.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0CCJ8MBLD', name: 'Lifelong Cordless Beard Trimmer for Men',
    price: 549, mrp: 2000, image: IMG('71V2tpaSF6L._SL1500_.jpg'),
    description: [
      'A cordless beard trimmer keeps stubble and short beards at a fixed length between barber visits, and is handy for neatening the neckline and sideburns. Cordless means no fighting a cable in front of the mirror, and it can go in a travel bag.',
      'This Lifelong trimmer is sold as an all-in-one hair trimmer for men. At ₹549 it is a budget pick against the ₹1,000-plus trimmers from the bigger brands, and a reasonable first trimmer. For anyone trimming at home every week or two, a trimmer usually pays for itself within a couple of months compared with regular barber visits for a beard tidy. It also lets you keep the same length between visits instead of letting the beard grow out unevenly.',
      'Start with the longest length comb and work down, since you cannot put back hair once it is cut. Brush out the blade after each use and add a drop of trimmer oil now and then so it cuts cleanly. Charge it fully before first use.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0GGBVHRTS', name: 'Lifelong 3-in-1 Nose, Ear and Eyebrow Trimmer',
    price: 599, mrp: 1499, image: IMG('71c5DjJ+cuL._SL1500_.jpg'),
    description: [
      'Nose and ear trimmers use a guarded rotating blade that cuts hair at the opening without touching the skin, which is safer and less painful than scissors or tweezers. The 3-in-1 heads on this Lifelong trimmer switch it between nose, ear and eyebrow work, and it suits men and women.',
      'The listing says the heads are washable, which matters for a tool used inside the nose. At ₹599 it covers a job most people handle with small scissors. A dedicated trimmer also keeps grooming quick: a minute in front of the mirror once a week is enough to keep stray nose, ear and brow hairs under control, without the redness that plucking leaves behind.',
      'Only trim the hair at the entrance of the nose — nose hair filters dust, so do not try to clear it all. Insert the head gently, no deeper than the guard. Rinse the heads after use and let them dry before refitting. Do not share a trimmer.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0B19475TB', name: 'Lifelong Rechargeable Wireless Body Massager, 20 Modes',
    price: 299, mrp: 2499, image: IMG('61rLtnnOvCL._SL1500_.jpg'),
    description: [
      'A handheld massager gives targeted vibration to stiff shoulders, calves and the lower back after a long day at a desk or on your feet. Rechargeable and wireless means you can use it on the sofa without being tethered to a socket. This Lifelong model has 20 vibration modes and 8 speeds.',
      'At ₹299 it costs less than a single session at a massage parlour. It is a low-cost way to find out whether a massager helps you before spending on a percussion gun. A handheld massager is also easy to share around the family — parents with sore calves, a partner with a stiff neck after a long commute — so one unit ends up getting a lot of use.',
      'Start on the lowest speed and keep it moving — do not hold it on one spot or over bone, the spine or the front of the neck. Keep sessions to 10–15 minutes per area. Avoid use if you are pregnant or have a pacemaker, blood clots or a recent injury unless a doctor says it is fine.',
    ],
    variant: V,
  },
  {
    store: 'Amazon', productId: 'B0CSZ4YN4C', name: 'Impulse Aspireatlas 30L Water Resistant Laptop Backpack with USB Charging Port',
    price: 399, mrp: 2999, image: IMG('41HcR6yNL+L.jpg'),
    description: [
      'A 30 litre backpack is the everyday size for college, office and short trips: room for a laptop, a lunch box, a water bottle and a change of clothes. This Impulse Aspireatlas is water resistant and has a USB charging port, which lets you plug a phone cable into the bag while a power bank rides inside.',
      'At ₹399 it is priced below many basic unbranded school bags, while offering a laptop compartment and weather resistance. It is unisex in design. The listed M.R.P. is ₹2,999, so the current price is about 87% below it. For students who carry a laptop every day, a padded laptop compartment is worth having at any price.',
      'Water resistant is not waterproof — in heavy monsoon rain, use a rain cover or keep the laptop in a sleeve. The USB port only passes charge from your own power bank; it does not store any. Measure your laptop against the compartment size on the product page before buying.',
    ],
    variant: V,
  },
  {
    store: 'Myntra', productId: '43988901', name: 'Mast & Harbour Men Suede Driving Shoes',
    price: 384, mrp: 1999, image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/JULY/10/JRRBV4VK_4989df2cc81240f096dde2d3fc34ac46.jpg',
    affiliateUrl: MY('43988901'),
    description: [
      'Driving shoes are soft, flexible slip-ons with a thin, grippy sole that wraps up the heel, originally designed so the foot could feel the pedals. They have since become a smart-casual staple: dressier than sneakers, easier than laced formal shoes, and good with chinos, linen trousers and denim.',
      'This pair from Mast & Harbour, a Myntra house brand, has a suede upper. At ₹384 against an M.R.P. of ₹1,999, it costs about what a pair of basic canvas slip-ons would. Driving shoes slip on without laces, which makes them quick to wear for errands, travel days and airport security. They pair well with casual shirts and polos for a relaxed weekend look.',
      'Suede does not like water — avoid wearing it in the monsoon, and brush it with a suede brush to lift the nap after wear. A suede protector spray helps against stains. Driving shoes are usually worn without socks or with no-show socks, so check the size chart on Myntra, since they should fit snugly.',
    ],
    variant: 'Pick your size from the Myntra size chart before adding to bag — prices can differ between sizes.',
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

const file = process.argv[2] ?? 'ifs-0925j-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
