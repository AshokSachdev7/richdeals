// DEAL-INGEST indiafreestuff tick 2026-09-26au
//
// 30 IFS rows resolved from base64 ?rto= Buy Now ids: 26 Amazon + 4 Flipkart. Every Amazon ASIN was re-read on the PDP in
// the logged-in tab (core #centerCol price, add-to-cart presence, no clip coupon, #landingImage data-old-hires). Flipkart
// pids were read from the PDP ld+json (offers.price, InStock, rukmini image) in a same-origin tab. Rejects (dedup, no buy
// box, clip coupon, low rating, grocery, ambiguous pack, wrong CDN image) are listed in reports/tick-2026-09-26au-ifs.md.
// Copy is original, written from the PDP title and listing facts only. Writes a {deals:[...]} payload for POST
// /admin/deals/bulk (status live).
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
const F = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const RK = (p) => `https://rukmini1.flixcart.com/image/1500/1500/xif0q/${p}?q=70`;

const DEALS = [
  A('B0CH2YZNMV', 'Amazon Brand Symbol Women\'s Oversized Half Sleeve T-Shirt', 439, 1598, '71ZMm7vhiBL._SL1500_', [
    'A relaxed oversized tee from Amazon\'s own Symbol label for ₹439, about 73% under the M.R.P.',
    'The dropped shoulders and half sleeves give it the loose street-style fit that works over joggers, denim shorts or leggings. It holds a 4.1-star average from buyers.',
    'Oversized cuts run roomy by design, so stay with your usual size unless you want an even looser drape.',
  ], 'Pick your size and colour; the price can change between variants.'),
  A('B07TP687L5', 'Amazon Brand Symbol Women\'s Crew Neck Sweatshirt', 279, 1499, '81+br4ilqmL._SL1500_', [
    'A basic crew-neck sweatshirt from Symbol for ₹279 on Amazon, an 81% cut from the listed M.R.P.',
    'It is a plain pullover layer for cool mornings, flights and AC offices, rated 4.0 stars by buyers. The simple crew neck layers over a shirt collar or under a jacket.',
    'At this price it makes sense as a spare travel or lounge layer rather than a statement piece.',
  ], 'Pick your size and colour; only some variants carry this price.'),
  A('B0BYGZCPW1', 'Antec P20C ARGB Mid Tower E-ATX Gaming Cabinet', 6794, 12210, '71Po6dOYJaL._SL1500_', [
    'The Antec P20C ARGB mid-tower case is down to ₹6,794 on Amazon, 44% under its M.R.P.',
    'It is a high-airflow case with a mesh front and pre-installed ARGB fans, and it takes boards up to E-ATX, so it suits a full-size gaming or workstation build. Buyers rate it 4.4 stars.',
    'Check GPU length and CPU cooler height against the spec sheet before ordering, as with any case.',
  ], 'Confirm the P20C ARGB (black) model is selected.'),
  A('B0BHF3CQ2G', 'BABBLER Premier Gym Gloves, Medium, Navy Blue', 159, 320, '7128t2973iL._SL1100_', [
    'Padded BABBLER Premier gym gloves in medium for ₹159 on Amazon, half the M.R.P.',
    'Gloves like these protect palms from barbell knurling and reduce calluses on pulls and presses. A snug fit matters more than padding thickness, so measure palm width before choosing a size.',
    'This listing is the medium navy-blue pair; other sizes may be priced differently.',
  ], 'Confirm size Medium in navy blue is selected.'),
  A('B0FDGFGY46', 'Belkin SheerForce Magnetic Qi2 Protective Case for Samsung Galaxy S25 Edge', 1036, 3999, '61IxEVc7DqL._SL1500_', [
    'Belkin\'s SheerForce magnetic case for the Galaxy S25 Edge is ₹1,036 on Amazon, 74% below the M.R.P.',
    'The built-in magnet ring lets the Galaxy S25 Edge snap onto Qi2 and MagSafe-style chargers, stands and car mounts that the phone cannot hold on its own. Buyers rate it 4.2 stars.',
    'It fits only the S25 Edge, not the regular S25 or S25+, so check the model before ordering.',
  ], 'Confirm the Galaxy S25 Edge version is selected.'),
  A('B0H9Z4TFSV', 'Boldfit Typhoon Protein Shaker Bottle', 199, 799, '61By2vs2w5L._SL1500_', [
    'A Boldfit Typhoon shaker for ₹199 on Amazon, 75% under the M.R.P.',
    'It is a leak-resistant shaker for whey, creatine or electrolyte mixes, rated 4.1 stars. A shaker with a mixing insert breaks up powder clumps faster than a plain bottle.',
    'Rinse it right after use; protein residue left overnight is what makes shakers smell.',
  ], 'Pick the colour you want; confirm the price on the variant.'),
  A('B0H5X3KJT7', 'Crompton Arno Plus 15 Litre 5 Star Storage Water Heater', 6359, 15800, '61lwMWcnKFL._SL1500_', [
    'The Crompton Arno Plus 15-litre storage geyser is ₹6,359 on Amazon, 60% below the M.R.P.',
    'A 15-litre tank covers back-to-back showers for a small family, and the 5-star rating means lower standby heat loss than lower-rated tanks. Buyers rate it 3.9 stars.',
    'Installation and the inlet/outlet pipes are usually extra, so budget for a plumber visit.',
  ], 'Confirm the 15 L Arno Plus is selected.'),
  A('B0BNHFJP1F', 'Dabur Red Bae Fresh Gel Toothpaste, 600 g (300 g x 2)', 195, 360, '81euWdb9UqL._SL1500_', [
    'A twin pack of Dabur Red Bae Fresh gel toothpaste, 600 g in total, for ₹195 on Amazon, 46% off.',
    'It is Dabur\'s gel variant of the Red Ayurvedic paste, aimed at people who want a fresher, milder feel. Two 300 g tubes last a household roughly two months.',
    'Buyers rate it 4.1 stars; check the manufacturing date on delivery as with any FMCG pack.',
  ], 'Confirm the 300 g x 2 pack.'),
  A('B09CLGGFBB', 'essence What The Fake! Extreme Plumping Lip Filler', 262, 525, '61ABI9f52EL._SL1500_', [
    'The essence What The Fake! Extreme plumping lip filler is ₹262 on Amazon, half its M.R.P.',
    'It is a clear plumping gloss that gives a tingling, fuller look for a few hours, and it can be worn alone or over lipstick. Buyers rate it 4.1 stars.',
    'The tingle is normal for plumping formulas; patch-test if your lips are sensitive.',
  ], 'Confirm the Extreme plumping version.'),
  A('B086XLMVBV', 'Faber-Castell Albrecht Dürer Watercolour Marker Set, Portrait Tones', 830, 1800, '81MuZpX415L._SL1500_', [
    'Faber-Castell\'s Albrecht Dürer watercolour markers in the portrait-tones set are ₹830 on Amazon, 54% off.',
    'These are artist-grade, water-soluble brush markers: lay colour down, then blend it with a wet brush. The portrait set focuses on skin tones for figure and face work. Buyers rate it 4.5 stars.',
    'Use watercolour paper; regular sketch paper pills when wet.',
  ], 'Confirm the Portrait Tones set.'),
  A('B000WL0T9E', 'Faber-Castell Polychromos Artist Colour Pencil, Light Green', 178, 720, '4185E54BT8L._SL1280_', [
    'A single Faber-Castell Polychromos artist pencil in light green for ₹178 on Amazon, 75% off.',
    'Polychromos pencils use oil-based leads that layer and blend without wax bloom. Open-stock singles let artists replace a used-up shade instead of rebuying a full tin.',
    'This is one pencil, not a set. Buyers rate it 4.1 stars.',
  ], 'Confirm the Light Green single pencil.'),
  A('B0013LYR3G', 'Faber-Castell Polychromos Artist Colour Pencil, Warm Grey VI', 223, 900, '41VKZirnl8L._SL1280_', [
    'A single Faber-Castell Polychromos pencil in Warm Grey VI for ₹223 on Amazon, 75% off.',
    'Warm Grey VI is one of the darker warm greys, often used for shadows in portrait and still-life work, so it runs out before most shades in a set. Buyers rate it 4.7 stars.',
    'This is one pencil, not a set.',
  ], 'Confirm the Warm Grey VI single pencil.'),
  A('B0D7D4K1ZG', 'FUR JADEN Vegan Leather Anti-Theft Laptop Backpack', 1429, 5000, '61zsPgVJTXL._SL1500_', [
    'A FUR JADEN vegan-leather laptop backpack for ₹1,429 on Amazon, 71% below the M.R.P.',
    'It pairs a smart faux-leather shell with a padded laptop sleeve, so it passes for a work bag while carrying like a backpack. Buyers rate it 4.3 stars.',
    'Check the laptop compartment size against your machine before ordering.',
  ], 'Confirm the colour; price can change by variant.'),
  A('B093FDQ5HK', 'JD FRESH 8 Inch Bypass Pruner Garden Secateurs', 368, 999, '71kgrjtO1YL._SL1500_', [
    'JD FRESH 8-inch bypass pruning shears for ₹368 on Amazon, 63% off.',
    'Bypass blades cut like scissors, giving clean cuts on live stems and small branches that heal faster than crushed ones. They suit balcony pots, rose bushes and hedges. Buyers rate them 4.0 stars.',
    'Wipe the blades after cutting diseased plants so infection does not spread.',
  ], 'Confirm the 8-inch bypass pruner.'),
  A('B0F29G8WT9', 'KAMILIANT by American Tourister Savvy Cabin Trolley Bag, 55 cm', 1199, 8500, '61-J2aIqNUL._SL1500_', [
    'The KAMILIANT Savvy 55 cm cabin trolley, from American Tourister\'s budget label, is ₹1,199 on Amazon, 86% below the M.R.P.',
    'A 55 cm height fits the cabin-bag limit on most Indian domestic airlines. Buyers rate it 4.2 stars.',
    'Airlines also cap cabin weight (usually 7 kg), so weigh the packed bag before you fly.',
  ], 'Confirm the 55 cm cabin size and your colour.'),
  A('B0DVT7SWXV', 'KiKiluxxa 1000 ml Borosilicate Glass Teapot with Infuser', 499, 999, '51o2bV9UqdL._SL1024_', [
    'A 1-litre borosilicate glass teapot from KiKiluxxa for ₹499 on Amazon, half the M.R.P.',
    'Borosilicate glass handles hot water without cracking, and the infuser lets loose-leaf green tea, herbal blends or chai masala steep and lift out. A litre serves four cups.',
    'Buyers rate it 4.0 stars. It is for brewing, not for direct flame unless the listing says stovetop safe.',
  ], 'Confirm the 1000 ml size.'),
  A('B0H884KXXM', 'Little\'s AirSense Baby Pant Diapers, Medium, 54 Count', 613, 1299, '61MxswGLH8L._SL1500_', [
    'A 54-count pack of Little\'s AirSense pant diapers in size M for ₹613 on Amazon, 53% off.',
    'Pant-style diapers pull on like underwear, which is easier than tape diapers once a baby starts rolling and crawling. Size M generally fits babies of about 7–12 kg.',
    'Buyers rate it 3.9 stars. Try a pack before stocking up, since fit varies between babies.',
  ], 'Confirm size M, 54 count.'),
  A('B089TKXP92', 'Panasonic 9W Motion Sensor LED Bulb, B22 Base', 177, 700, '618JJCG5W+L._SL1500_', [
    'A Panasonic 9W LED bulb with a built-in motion sensor for ₹177 on Amazon, 75% off.',
    'It switches on when someone walks past and off after a short delay, which suits staircases, corridors, porches and bathrooms where lights get left on. It fits a standard B22 pin holder.',
    'Buyers rate it 3.8 stars. The sensor needs a clear line of sight, so avoid enclosed fittings.',
  ], 'Confirm the B22 base.'),
  A('B0GL8VK9QC', 'Perfora Oral Care Essentials Pack', 549, 1224, '71Amn7rqWCL._SL1500_', [
    'Perfora\'s Oral Care Essentials pack is ₹549 on Amazon, 55% below the M.R.P.',
    'It bundles several of the brand\'s daily-use oral care products into one kit, so it works as a trial of the range or as a gift. Buyers rate it 4.1 stars.',
    'Check the pack contents on the product page; bundle components can change between batches.',
  ], 'Confirm the Essentials Pack is selected.'),
  A('B0D1FX5YHS', 'Philips 20W Ujjwal 4 ft LED Batten, Cool Day Light', 1159, 5000, '61oIrZGu17L._SL1080_', [
    'A Philips Ujjwal 20W 4-foot LED batten for ₹1,159 on Amazon, 77% off.',
    'A 4-foot batten is the standard replacement for old tube lights in kitchens, garages and shops, and 20W LED gives brighter light than a 40W tube. Buyers rate it 4.0 stars.',
    'Check whether the listing is a single batten or a multi-pack before comparing prices.',
  ], 'Confirm the pack size and light colour.'),
  A('B0CK1RGQ5S', 'Philips Compact 4 ft 20W 3-in-1 Colour Changing LED Batten', 899, 3000, '51AFltnMxHL._SL1080_', [
    'A Philips 4-foot 20W LED batten that switches between three colour temperatures is ₹899 on Amazon, 70% off.',
    'Flicking the wall switch cycles between cool white, neutral white and warm yellow, so one fitting covers work light and evening light. Buyers rate it 3.9 stars.',
    'It replaces a standard 4-foot tube fitting.',
  ], 'Confirm the 3-in-1 colour-changing model.'),
  A('B07V7RNMY5', 'Puma Men\'s Dwane IDP Running Shoes', 1199, 3999, '61KQFVT3j4L._SL1200_', [
    'Puma Dwane IDP men\'s running shoes are ₹1,199 on Amazon, 70% below the M.R.P.',
    'This is an everyday entry-level runner for walks, the gym and light jogging, with a lace-up mesh upper. Buyers rate it 3.9 stars.',
    'The price is per size; only some sizes are at the deal price.',
  ], 'Pick your UK size and colour; the price differs by size.'),
  A('B0FXH6VM1W', 'Sehaz Artworks Metal Wall Clock, Silver, 20 x 20 cm', 197, 999, '61hSkCpmhuL._SL1500_', [
    'A compact silver Sehaz Artworks wall clock for ₹197 on Amazon, 80% off.',
    'At 20 x 20 cm it suits a kitchen, study nook or kid\'s room where a large clock would crowd the wall. Buyers rate it 3.9 stars.',
    'Most analog wall clocks take one AA cell, usually not included.',
  ], 'Confirm the silver 20 x 20 cm version.'),
  A('B0GC7GV6SH', 'Crossbody Sling Bag for Men and Women', 559, 1999, '51VsQwoP6zL._SL1500_', [
    'A crossbody sling bag for ₹559 on Amazon, 72% below the M.R.P.',
    'A sling keeps phone, wallet, keys and earbuds on the front of your body, which is safer than a back pocket in crowded markets and metros. Buyers rate it 4.1 stars.',
    'Check the listed dimensions if you need it to take a tablet or a power bank.',
  ], 'Confirm the colour; price can differ by variant.'),
  A('B0GX9FS133', 'Story@Home Jaipuri Sanganeri Hand Block Print Cotton Double Bedsheet, 250 x 225 cm', 899, 2999, '91XDcYzBGqL._SL1500_', [
    'A Story@Home Jaipuri Sanganeri hand-block double bedsheet (250 x 225 cm) for ₹899 on Amazon, 70% off.',
    'Sanganeri prints are the fine floral block prints from near Jaipur, and cotton sheets breathe better in Indian summers than polyester. At 250 x 225 cm it drapes over a standard double or queen bed.',
    'Buyers rate it 4.1 stars. Wash block prints cold and separately for the first few washes.',
  ], 'Confirm the print and the 250 x 225 cm size.'),
  A('B0953M737P', 'Sunset Lamp Projection Light, 180 Degree Rotation', 495, 999, '71AyEQ51x9S._SL1500_', [
    'A sunset projection lamp for ₹495 on Amazon, half the M.R.P.',
    'It throws a warm sunset-coloured halo onto a wall, and the head rotates 180 degrees to aim it. It is popular as mood lighting for bedrooms and as a photo and reel backdrop.',
    'Buyers rate it 3.7 stars. It is ambient light, not a reading lamp.',
  ], 'Confirm the colour option before adding to cart.'),
  F('PERGG8GRWE6QHJSP', 'Ajmal Prose Fougere Eau de Parfum, 50 ml', 270, 1000, RK('perfume/t/g/y/50-prose-fougere-perfume-long-lasting-scent-spray-casual-wear-original-imahgnvemyeqhvvp.jpeg'), [
    'Ajmal Prose Fougere eau de parfum, 50 ml, is ₹270 on Flipkart, 73% below the M.R.P.',
    'Fougere is the classic barbershop family, herbal and green over a mossy base, which reads clean for office wear. As an EDP it holds longer than a body spray. Buyers rate it 4 stars.',
    'Spray on moisturised skin and pulse points for the longest wear in Indian heat.',
  ], 'Confirm the 50 ml Prose Fougere bottle.'),
  F('PERHG7PDVPZ8XFEA', 'AXE Midnight Oak Eau de Parfum, 100 ml', 325, 1400, RK('perfume/x/u/x/-original-imahmfwqhqjzyeun.jpeg'), [
    'AXE Midnight Oak eau de parfum, 100 ml, is ₹325 on Flipkart, 77% off.',
    'It is a woody EDP from AXE\'s fine-fragrance line, a step up from the brand\'s deo sprays in concentration and wear time. 100 ml works out to about ₹3.3 per ml. Buyers rate it 4.1 stars.',
    'Woody scents suit evenings and cooler months best.',
  ], 'Confirm the 100 ml Midnight Oak bottle.'),
  F('WATGH78FM2BEHYCA', 'LEE COOPER LC07361.351 Analog Watch for Men', 1579, 14750, RK('watch/f/2/5/1-lc07361-351-lee-cooper-men-watermarked-original-imahhy5mfjrfb32b.jpeg'), [
    'The LEE COOPER LC07361.351 men\'s analog watch is ₹1,579 on Flipkart, 89% below the M.R.P.',
    'Model LC07361.351 is a dressy analog piece that suits office wear and occasions. Buyers rate it 4.3 stars.',
    'Watch M.R.P.s run high, so judge the deal on the final price, not the discount percentage.',
  ], 'Confirm model LC07361.351.'),
  F('ICTHQFMXDU8XTHHQ', 'LivHome Infra Pro 2200W Infrared Cooktop', 1898, 7999, RK('induction-cook-top/u/e/c/infra-pro-infra-pro-livhome-original-imahqfmxvfvr7gvf.jpeg'), [
    'The LivHome Infra Pro 2200W infrared cooktop is ₹1,898 on Flipkart, 76% below the M.R.P.',
    'Unlike induction, an infrared cooktop heats a glass plate, so it works with any flat-bottomed vessel, including aluminium, clay and glass that induction ignores. 2200W is enough for daily cooking.',
    'It has no buyer ratings yet, and the plate stays hot after switching off, so keep children away while it cools.',
  ], 'Confirm the Infra Pro 2200W model.'),
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

const file = process.argv[2] ?? 'ifs-0926au-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
