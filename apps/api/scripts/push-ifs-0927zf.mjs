// DEAL-INGEST indiafreestuff tick 2026-09-27zf
//
// 103 slugs swept (homepage + /deals pages 1-3), 34 new; 1 category post dropped, 33 resolved via base64 ?rto= Buy Now,
// 0 already in DB. 15 pass the PDP re-read (14 Amazon in the logged-in tab, 1 Flipkart ld+json). Rejected:
// card-only prices (AGARO, Glen, Lloyd, Whirlpool x2), coupon-driven prices (Scott x2, Arcticool x2, AWG, ImTheBest,
// Ronteno, Sumeet x2, Tunai), no buy box (Stealodeal), price drift (Joy 168 -> 184), rating 3.3 (GWALBROS).
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const FK_PATH = {
  COMHMPEEZFDGBAPZ: '/acer-aspire-3-i3-14th-gen-intel-core-100u-8-gb-256-gb-ssd-windows-11-home-a324-53-notebook/p/itm1fc4a7fe21644',
};
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com${FK_PATH[id]}?pid=${id}&affid=djhackraj`,
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
const DEALS = [
  A('B0D22BV4C5', 'Borosil 750ml Crysto Borosilicate Glass Bottle Set with Lid, Pack of 2, Blue Husk', 487, 895, '51AsyjRyaaL._SL1000_', [
    'A pack of two Borosil Crysto 750 ml glass bottles is ₹487 on Amazon, 46% below the M.R.P.',
    'They are wide-mouth borosilicate glass bottles with lids, safe for hot and cold drinks, and easy to fill with milk, lassi or juice for the fridge. Buyers rate them 5 stars.',
    'Borosilicate glass handles temperature swings better than ordinary glass, but it still breaks if dropped on a hard floor.',
  ], 'Confirm the pack of 2 with the Blue Husk lid is selected.'),
  A('B0C8FQZ9WP', 'Borosil ProChef Non-Stick Aluminium Kadhai with Lid, 26 cm, Blue', 975, 1795, '51d+i1+GMNL._SL1000_', [
    'The Borosil ProChef 26 cm non-stick kadhai with lid is ₹975 on Amazon, 46% off its M.R.P.',
    'It has a thick aluminium body for even heating, a 5-layer PFOA-free non-stick coating, is dishwasher safe and carries a 1-year warranty. It works on gas stoves. Buyers rate it 4.3 stars.',
    'It is not listed as induction compatible, so check your cooktop before ordering.',
  ], 'Check the 26 cm size and blue colour are selected.'),
  A('B0C788GL4X', 'CELLO Angelica Round Glass Casserole with Lid, 2000 ml, Transparent', 516, 915, '81UHHzt0fyL._SL1500_', [
    'The CELLO Angelica 2000 ml round glass casserole is ₹516 on Amazon, 44% below its M.R.P.',
    'It is lead-free toughened glass with a lid, safe in the microwave, oven, dishwasher and fridge, and large enough to serve rotis, rice or curry at the table. Buyers rate it 4 stars.',
    'Glass does not keep rotis hot as long as an insulated casserole; warm it first for longer hold.',
  ], 'Confirm the 2000 ml size is selected.'),
  A('B0CM12LBF6', 'Go24 Pexpo Flip Pro 750 Vacuum Insulated Steel Flask, 730 ml, Military Green', 630, 1099, '81STnf6gjXL._SL1500_', [
    'The Go24 Pexpo Flip Pro 730 ml vacuum-insulated steel flask is ₹630 on Amazon, 43% off the M.R.P.',
    'It keeps drinks hot or cold, has a leak-proof flip lid and comes with a zipper bag for school, office, gym or trekking. Buyers rate it 3.6 stars.',
    'A flip lid is quick to drink from but needs the lock engaged before it goes into a bag.',
  ], 'Pick the Military Green colour shown in the deal image.'),
  A('B0F6V65CHM', 'MILTON Aroma Tiffin Big, Inner Steel, PU Insulated 500 ml Lunch Box, Red', 499, 875, '61OiTDeq22L._SL1500_', [
    'The MILTON Aroma Big insulated tiffin (500 ml) is ₹499 on Amazon, 43% below its M.R.P.',
    'It has an inner steel container inside a PU-insulated body with a leak-proof side lock, sized for a school or office lunch. Buyers rate it 3.9 stars.',
    'Insulation keeps food warm for a few hours, not all day; pack it close to leaving home.',
  ], 'Confirm the red colour is selected.'),
  A('B0G1MT95QS', 'MILTON Copper Charge Drinkware Gift Set, 2 Copper Bottles 850 ml and 2 Tumblers 280 ml', 1148, 2295, '417QHZQ+PuL._SL1500_', [
    'The MILTON Copper Charge gift set is ₹1,148 on Amazon, 50% off its M.R.P.',
    'It includes two 99.9% pure copper bottles of 850 ml and two 280 ml copper tumblers with a leak-proof design, which makes it a ready gift for Diwali or a housewarming. Buyers rate it 5 stars.',
    'Copper tarnishes over time; a wash with lemon and salt restores the shine. Do not store acidic juices in it.',
  ], 'Check the listing shows 2 bottles and 2 tumblers.'),
  A('B0C3DCRZTR', 'MILTON Gripper 750 Stainless Steel Water Bottle, 750 ml, Blue', 205, 410, '61XKXrVhZ2L._SL1500_', [
    'The MILTON Gripper 750 ml stainless steel bottle is ₹205 on Amazon, 50% below the M.R.P.',
    'It is a single-wall steel bottle with a leak-proof cap and an easy-grip body, light enough for school bags and gym kits. Buyers rate it 3.6 stars.',
    'Being single-wall, it does not keep water cold; choose an insulated bottle for that.',
  ], 'Confirm the blue colour is selected.'),
  A('B0CZL1NW4D', 'MILTON Micro Meal Lunch Box, 3 Microwave Safe Steel Containers with Insulated Bag, Purple', 508, 875, '71OoN2Zai3L._SL1500_', [
    'The MILTON Micro Meal lunch box set is ₹508 on Amazon, 42% off its M.R.P.',
    'It has three microwave-safe inner steel round containers (one 180 ml and two 320 ml) in an insulated carry bag, odour proof and leak proof for office lunches. Buyers rate it 4.1 stars.',
    'Remove the outer lids before microwaving and heat only the containers.',
  ], 'Pick the purple colour shown in the deal image.'),
  A('B0F3JLFH26', 'Milton Smarty 600 Thermosteel Bottle, 490 ml, 24 Hours Hot and Cold, Beige', 499, 980, '618WXFKvT4L._SL1500_', [
    'The Milton Smarty 600 Thermosteel bottle (490 ml) is ₹499 on Amazon, 49% below its M.R.P.',
    'It is double-wall vacuum insulated to keep tea, coffee or water hot or cold for up to 24 hours, and is ISI certified. Buyers rate it 4.2 stars.',
    'At 490 ml it suits a single commute or class, not a full day of water.',
  ], 'Confirm the beige colour is selected.'),
  A('B0G34Z8ZP2', 'MILTON Steel Seal 750 Airtight BPA Free Modular Container, Set of 2, 750 ml Each', 180, 310, '71fDtv7ljnL._SL1500_', [
    'A set of two MILTON Steel Seal 750 ml airtight containers is ₹180 on Amazon, 42% off the M.R.P.',
    'They are food-grade, BPA-free transparent containers with see-through lids and wide mouths, and they stack for cereals, pulses and spices. Buyers rate them 4.3 stars.',
    'That works out to about ₹90 per container.',
  ], 'Check the listing shows the set of 2.'),
  A('B07SCNZPWZ', 'Neelam Stainless Steel Puri Dabba, 350 ml, Silver', 114, 200, '31DoAyoISaL._SL1500_', [
    'The Neelam stainless steel puri dabba (350 ml) is ₹114 on Amazon, 43% below its M.R.P.',
    'It is a small steel lunch container for puris, parathas or dry snacks, easy to wash and rust resistant. Buyers rate it 3.8 stars.',
    'It is not leak proof, so keep curries and gravies in a separate sealed box.',
  ], 'Confirm the 350 ml size is selected.'),
  A('B0CKW3MRRR', 'PEARLPET BPA Free Plastic Water Bottle Set of 6, 1000 ml Each, Wine', 374, 1020, '71ob0ulB44L._SL1500_', [
    'A set of six PEARLPET 1-litre BPA-free plastic water bottles is ₹374 on Amazon, 63% off its M.R.P.',
    'They are fridge bottles in a wine colour with screw caps, a common pick for stocking chilled water at home. Buyers rate them 4.2 stars.',
    'That is about ₹62 per bottle.',
  ], 'Check the set of 6 in the wine colour is selected.'),
  A('B0CQ2RJJT1', 'Rylan Double Spring Tummy Trimmer for Abs Workout, Men and Women', 159, 999, '81Btx060iNL._SL1500_', [
    'The Rylan double-spring tummy trimmer is ₹159 on Amazon, 84% below the M.R.P.',
    'It is a foot-anchored spring puller for sit-up style abs, arm and back work at home. Buyers rate it 3.6 stars.',
    'Anchor the foot bar firmly before each rep; a slipping spring can snap back.',
  ], 'Confirm the double-spring variant is selected.'),
  A('B08JV755SK', 'Silicone Air Fryer Liners, 2 Square and 1 Round, 3 Pack Reusable', 182, 699, '51cPjuHpd6L._SL1500_', [
    'A 3-pack of reusable silicone air fryer liners is ₹182 on Amazon, 74% off its M.R.P.',
    'The pack has two square liners and one round liner in food-grade silicone that replace disposable parchment paper and lift out for washing. Buyers rate it 4.2 stars.',
    'Measure your basket first; a liner that is too tall blocks the airflow and crisps food unevenly.',
  ], 'Check the 2 square plus 1 round pack is selected.'),
  F('COMHMPEEZFDGBAPZ', 'Acer Aspire 3 A324-53 Laptop, Intel Core 3 100U, 8 GB RAM, 256 GB SSD, Windows 11', 42990, 49990,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/computer/d/b/f/-original-imahr5dsturyekwj.jpeg?q=70', [
    'The Acer Aspire 3 A324-53 with an Intel Core 3 100U processor is ₹42,990 on Flipkart, 14% below its listed M.R.P.',
    'It pairs the Core 3 100U with 8 GB RAM, a 256 GB SSD and Windows 11 Home, a fit for students and office work. Buyers rate it 4.3 stars.',
    'Flipkart may show a lower figure after bank or card offers at checkout; the price here is before any offer. 256 GB fills quickly, so plan on cloud or external storage.',
  ], 'Confirm the 8 GB / 256 GB SSD variant is selected, not the 512 GB one.'),
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

const file = process.argv[2] ?? 'ifs-0927zf-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
