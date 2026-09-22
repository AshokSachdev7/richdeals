// TELEGRAM-DEAL-MONITOR tick 2026-09-22ap.
// 28 sidebar rows -> 13 of 13 tracked groups present -> 3 shortlinks resolved -> 1 survivor.
//
// A. Amazon B0CRNPD5P8 (MSI PRO MP275Q) — SB Loots And Deals, https://amazn.lt/pSXsl3FO.
//    Dedup hit on deal 4991, so this is an in-place refresh and the indexed slug is kept.
//    PDP read in the logged-in Amazon tab: ₹13,399.00, M.R.P. ₹30,000.00, In stock, no coupon.
//    The stored row said ₹12,999 / 57% off — the price has MOVED UP ₹400 since 2026-08-07 and
//    the page had been carrying a stale figure. PriceHistory gets its second row (the first and
//    only entry was 12999 at creation).
//    Two more defects on the stored row, both fixed here: the description was 374 characters,
//    and the image was `812eXt89ddL._SX679_.jpg` — an SX thumbnail, the exact pattern the
//    pre-flight THUMB gate rejects. Swapped to the PDP's own `_SL1500_` asset.
//
// Killed this tick, both for reasons worth recording:
//   - Flipkart PWBGGD4THDQZYAY6 (Syska 10000 mAh) — Loot Deals 24x7 shouted "Rs.799".
//     The PDP reads **Out of stock** and ₹1,388. Wrong by 74% AND unbuyable. It was already in
//     tg-multi-seen.json from ticks ac/af/al/an; this is the first tick that establishes WHY.
//   - Amazon B07QX21WZQ (TrustBasket pots) — NonStopDeals repeating its ₹151 claim against a
//     ₹549 PDP. Deal 5825, refreshed at `al`. Not touched, not re-pinged.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

const A = {
  id: 4991,
  productId: 'B0CRNPD5P8',
  price: 13399,
  mrp: 30000,
  image: 'https://m.media-amazon.com/images/I/812eXt89ddL._SL1500_.jpg',
};
A.discountPct = Math.round((1 - A.price / A.mrp) * 100);
A.title = `MSI PRO MP275Q 27" 2K WQHD IPS Monitor (100Hz, Built-in Speakers) at ₹${A.price.toLocaleString('en-IN')} (${A.discountPct}% Off) – Amazon`;
A.description = [
  'A 27-inch IPS panel at 2560 x 1440, which is the resolution that actually changes how a desk feels rather than how a spec sheet reads. At 27 inches a 1080p screen stretches roughly 82 pixels to the inch and text edges go soft; WQHD on the same diagonal lands near 109 PPI, so code, spreadsheets and documents stay sharp at arm’s length and two full windows fit side by side without either being unreadable.',
  'The refresh rate is 100 Hz, not the 60 Hz that most office monitors at this price stop at. That is not a gaming claim — it is the difference between a cursor that smears across the screen and one that tracks, and it costs nothing to use once the cable supports it. Response time is quoted at 1 ms and FreeSync adaptive sync is supported, so a console or a laptop GPU plugged into it will not tear.',
  'Colour is 100% sRGB at 10-bit, 300 nits brightness and a 1300:1 contrast ratio — the numbers that matter if photos or design work pass through this screen and not just terminal windows. MSI’s eye-comfort stack is TÜV Rheinland certified for both Less Blue Light and Anti-Flicker, and the surface is anti-glare rather than gloss, which is the right choice for a room with a window behind the desk.',
  'Practical details: 2 W speakers are built in, so a conference call needs no separate hardware; the stand tilts and the back carries a 100 mm VESA pattern for a wall or arm mount; inputs are HDMI 2.0b and DisplayPort 1.2a with a headphone-out jack. It weighs 4.1 kg, ships in black, and carries a 3-year manufacturer warranty.',
  `Live Amazon price is ₹${A.price.toLocaleString('en-IN')} against an M.R.P. of ₹${A.mrp.toLocaleString('en-IN')} — ${A.discountPct}% off, In stock. Note the figure has moved: this page previously listed ₹12,999, and ₹${A.price.toLocaleString('en-IN')} is what the product page shows today.`,
].join('\n\n');
A.howTo = [
  'Tap Grab Deal to open the MSI PRO MP275Q on Amazon.in at the live price.',
  `Confirm the price before you add to cart. This listing has moved from ₹12,999 to ₹${A.price.toLocaleString('en-IN')} since it was first published here, and a deal channel is currently circulating only the ₹30,000 M.R.P. with no selling price at all — the product page is the only figure worth trusting.`,
  'Check the variant while you are there. MP275Q is the 2K WQHD 100 Hz model; MSI sells a near-identical MP275 at 1080p, and the two sit next to each other in search results.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price. Bank and No-Cost-EMI offers, if Amazon is showing any, are applied at checkout.',
];

// ------------------------------------------------------------------------- pre-flight
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukminim?\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const THUMB = /_(SX\d+|SY\d+|SX\d+_SY\d+)_/;
for (const d of [A]) {
  const t = Number((d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (THUMB.test(d.image)) throw new Error(`low-res thumbnail ${d.productId}: ${d.image}`);
  if (d.description.length < 900) throw new Error(`description too thin ${d.productId}: ${d.description.length}`);
  if (!Array.isArray(d.howTo) || d.howTo.length !== 4) throw new Error(`howTo must be a 4-step array ${d.productId}`);
}
console.log('pre-flight OK, 0 create + 1 refresh\n');

// ------------------------------------------------------------------------------ write
const before = await p.deal.findUnique({ where: { id: A.id } });
if (!before) throw new Error('deal 4991 is gone');
if (before.productId !== A.productId) throw new Error(`productId moved: ${before.productId}`);
// Amazon row, already carries our tag — assert rather than rebuild.
if (!/[?&]tag=ashoksachdev-21/.test(before.affiliateUrl)) throw new Error(`affiliateUrl not ours: ${before.affiliateUrl}`);
if (/affid=|ascsubtag=|[?&]lid=|marketplace=/.test(before.affiliateUrl)) throw new Error('foreign tracking param on stored affiliateUrl');

const after = await p.deal.update({
  where: { id: A.id },
  data: {
    title: A.title, description: A.description, howTo: A.howTo, image: A.image,
    price: A.price, mrp: A.mrp, discountPct: A.discountPct,
    isSuper: A.price <= 250, isHot: A.price <= 500, status: 'LIVE',
  },
});
if (before.price !== A.price) {
  await p.priceHistory.create({ data: { dealId: A.id, price: A.price } });
  console.log(`priceHistory written ${before.price} -> ${A.price}`);
} else {
  console.log(`price unchanged at ${after.price} — no PriceHistory row`);
}
console.log(`refreshed id=${A.id} pct=${before.discountPct}->${A.discountPct} desc=${before.description.length}->${A.description.length} howTo=${before.howTo.length}->${A.howTo.length} img=${before.image !== A.image ? 'swapped' : 'same'}`);
console.log('SLUGS:', after.slug);
await p.$disconnect();
