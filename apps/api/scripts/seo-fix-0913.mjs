// One-off SEO data repair (SEO-AUDIT-FIX tick 2026-09-13).
//   1. seoDesc outside the house 120-165 range on 7 posts
//   2. one post with no excerpt (blank meta fallback + blank card)
//   3. one seoTitle duplicated across two posts after the BBD merge
//   4. 4 LIVE deals with mrp <= price -> invalid Offer + a lying "(N% Off)"
//   5. 386 LIVE deals whose title still carries the source's "..."/"…" cut
// DRY=1 prints without writing.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const DRY = process.env.DRY === '1';

const POST_SEO_DESC = {
  'best-external-ssd-india-2026':
    'External SSD buying guide for India 2026: fair price bands, USB Gen1 vs Gen2 real-world speeds, how much storage you actually need, and the brands worth trusting.',
  'amazon-coupons-offers-guide-india-2026':
    'Find real Amazon India coupons and offers in 2026: stack clip coupons, bank card discounts and Amazon Pay cashback to pay well below the listed price.',
  'cashback-vs-coupons-vs-reward-points-india':
    'Cashback vs coupons vs reward points in India: which saves more on shopping and money products, and how to stack all three on a single purchase.',
  'best-bluetooth-calling-smartwatch-under-2000-india-2026':
    'Best Bluetooth calling smartwatch under Rs 2000 in India 2026: Noise Quad Call, Fire-Boltt and pTron compared on live price, battery, screen and water rating.',
  'best-air-fryer-under-6000-india-2026':
    'Best air fryer under Rs 6000 in India 2026 - 10 live-price picks by use case: best overall, best budget and best for a family, plus the specs that matter.',
  'free-protein-supplement-samples-india-2026':
    'Where to get free protein and supplement samples in India in 2026: single-serve sachets, brand trial packs, sampling apps and gym counters - and fake-freebie red flags.',
  'flipkart-big-billion-days-2026-vs-amazon-great-indian-festival':
    'Big Billion Days 2026 vs Amazon Great Indian Festival: category-by-category on where the discount is real, where it is inflated MRP, and which bank offer wins.',
};

// The BBD comparison post carried the dates post's seoTitle verbatim.
const POST_SEO_TITLE = {
  'flipkart-big-billion-days-2026-vs-amazon-great-indian-festival':
    'Big Billion Days vs Great Indian Festival 2026',
};

const POST_EXCERPT = {
  'best-hand-blender-india-2026':
    'Seven hand blenders worth buying in India right now, sorted by wattage and budget - from a 300W lassi blender to a 600W chutney grinder, with what each one is actually good at.',
};

// Trailing junk left behind once the truncation marker is cut off.
const TRAIL = /(?:[\s,;:|\-–—&+/]+|\s+(?:with|and|of|for|in|the|to|by|a|an|at|on|from|plus|is|its)\b)+$/i;

function untruncate(title) {
  // Keep the generated " at ₹999 (57% Off) – Store" tail, clean only the name.
  const m = title.match(/^(.*?)( at ₹.*)$/s);
  let name = m ? m[1] : title;
  const tail = m ? m[2] : '';
  if (!/(\.\.\.|…)/.test(name)) return null;
  name = name.replace(/\s*(?:\.\.\.|…)\s*$/, '');
  // Prefer cutting back to the last clause boundary — a half-word ("Adjustable
  // He", "50X Vitam") reads worse than one spec fewer.
  const cut = Math.max(name.lastIndexOf(','), name.lastIndexOf('|'), name.lastIndexOf(';'));
  if (cut > 25) name = name.slice(0, cut);
  else name = name.replace(/\s+\S+$/, '');
  name = name.replace(TRAIL, '').replace(/\s+/g, ' ').trim();
  if (name.length < 15) return null; // too little left to be a title — leave it
  const out = name + tail;
  return out === title ? null : out;
}

let n = 0;
for (const [slug, seoDesc] of Object.entries(POST_SEO_DESC)) {
  const data = { seoDesc };
  if (POST_SEO_TITLE[slug]) data.seoTitle = POST_SEO_TITLE[slug];
  console.log(`post ${slug} seoDesc=${seoDesc.length}${data.seoTitle ? ` seoTitle="${data.seoTitle}"` : ''}`);
  if (!DRY) await prisma.post.update({ where: { slug }, data });
  n++;
}
for (const [slug, excerpt] of Object.entries(POST_EXCERPT)) {
  console.log(`post ${slug} excerpt=${excerpt.length}`);
  if (!DRY) await prisma.post.update({ where: { slug }, data: { excerpt } });
  n++;
}

// mrp <= price: no discount exists, so drop the fake MRP/percent rather than
// keep an Offer that claims one. The "(0% Off)"/"(70% Off)" tail goes too.
const bad = await prisma.deal.findMany({
  where: { status: 'LIVE', mrp: { not: null }, price: { not: null } },
  select: { id: true, title: true, price: true, mrp: true, discountPct: true },
});
for (const d of bad.filter((x) => x.mrp <= x.price)) {
  const title = d.title.replace(/\s*\(\d+%\s*Off\)/i, '');
  console.log(`deal ${d.id} mrp ${d.mrp}<=price ${d.price} -> null; title: ${title}`);
  if (!DRY) await prisma.deal.update({ where: { id: d.id }, data: { mrp: null, discountPct: null, title } });
  n++;
}

const trunc = await prisma.deal.findMany({
  where: { status: 'LIVE', OR: [{ title: { contains: '...' } }, { title: { contains: '…' } }] },
  select: { id: true, title: true },
});
let fixed = 0, skipped = 0;
for (const d of trunc) {
  const title = untruncate(d.title);
  if (!title) { skipped++; continue; }
  if (fixed < 5) console.log(`deal ${d.id}\n  - ${d.title}\n  + ${title}`);
  if (!DRY) await prisma.deal.update({ where: { id: d.id }, data: { title } });
  fixed++;
}
console.log(`\ntruncated titles: ${trunc.length} found, ${fixed} rewritten, ${skipped} left alone`);
console.log(`${n + fixed} rows ${DRY ? 'would change' : 'changed'}`);
await prisma.$disconnect();
