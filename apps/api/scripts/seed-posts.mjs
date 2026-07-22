// Seed SEO/AEO/GEO blog posts into the Post table. Idempotent (upsert by slug).
// Run: cd apps/api && node scripts/seed-posts.mjs
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const posts = [
  {
    slug: 'how-to-find-best-deals-amazon-india',
    title: 'How to Find the Best Deals on Amazon India (2026 Guide)',
    excerpt: 'Practical, no-nonsense ways to catch real discounts on Amazon India — from price-history checks to bank offers and lightning deals.',
    seoTitle: 'How to Find the Best Deals on Amazon India (2026)',
    seoDesc: 'A practical 2026 guide to finding genuine discounts on Amazon India: price history, lightning deals, bank offers, coupons and how to avoid fake MRPs.',
    tags: ['amazon', 'buying-guide', 'save-money'],
    body: `Finding a genuine discount on Amazon India is less about luck and more about knowing where to look. Prices change many times a day, and a "50% off" banner doesn't always mean you're getting the best price. Here's how experienced shoppers actually save.

## Check the price history first
The single most useful habit is checking a product's price history before you buy. A deal is only a deal if the current price is genuinely lower than what the item normally sells for. If a product's "discounted" price matches its average price over the last three months, it isn't really a discount.

## Time your purchase around sale events
Amazon India's biggest price drops cluster around a few events: the Great Indian Festival (around Diwali), Prime Day, and end-of-season clearances. If your purchase isn't urgent, waiting for one of these events often saves more than any coupon.

## Stack bank offers and coupons
The final price you pay is rarely just the listed price. Look for:

- **Instant bank discounts** (often 10% with specific credit or debit cards)
- **Clip coupons** on the product page — many shoppers miss these
- **No-cost EMI** on higher-value items
- **Exchange offers** on phones and appliances

Stacking a bank offer on top of an already-discounted price is where the real savings are.

## Watch lightning and "deal of the day" listings
Lightning deals are time-boxed and limited in quantity. The genuine ones move fast. The trick is to add the item to your cart early — the deal price is locked once it's in your cart during the deal window.

## Don't trust the strikethrough MRP blindly
An inflated MRP with a big "80% off" tag is a common trick. Focus on the actual selling price and whether it's competitive versus other stores, not the size of the discount percentage.

## FAQ

### What is the best time to buy on Amazon India?
The best prices usually appear during the Great Indian Festival (around October–November), Prime Day (mid-year), and end-of-season sales. For non-urgent purchases, waiting for one of these events typically beats everyday coupons.

### How do I know if an Amazon deal is genuine?
Compare the current price against the product's typical price over the last few months. If the "deal" price is close to the normal average price, the discount is mostly marketing. A genuine deal is meaningfully below the usual selling price.

### Can I combine bank offers with coupons on Amazon?
Yes. In most cases you can clip an on-page coupon and also get an instant bank discount at checkout, which stacks on top of the listed sale price for the lowest final amount.

### Are lightning deals worth it?
They can be, but they're limited in quantity and time. Add the item to your cart quickly during the deal window to lock the price, then decide before it expires.`,
  },
  {
    slug: 'flipkart-big-billion-days-2026-guide',
    title: 'Flipkart Big Billion Days 2026: How to Get the Best Deals',
    excerpt: 'Everything you need to prepare for Flipkart Big Billion Days 2026 — wishlist strategy, bank offers, and how to avoid overpaying in the rush.',
    seoTitle: 'Flipkart Big Billion Days 2026 — Best Deals & Tips',
    seoDesc: 'Get ready for Flipkart Big Billion Days 2026: how to prepare your wishlist, stack bank offers, catch early access deals, and avoid fake discounts.',
    tags: ['flipkart', 'sale-events', 'buying-guide'],
    body: `Flipkart Big Billion Days (BBD) is the biggest shopping event of the year in India, usually running around the festive season. The discounts are real, but so is the chaos — prices, stock and offers shift by the hour. A little preparation goes a long way.

## Build your wishlist before the sale
The shoppers who save the most decide what they want before the sale starts. Add everything you're considering to your wishlist so you can track price changes and act fast when the deal goes live. This also stops impulse buys on things you don't actually need.

## Line up the right bank offer
Every BBD has a headline bank partner offering an extra instant discount, often 10%, on specific cards. If you have that card, the savings stack on top of the sale price. If you don't, check whether a partner wallet or EMI option gives similar value.

## Use early access windows
Flipkart Plus members and select bank customers often get a few hours of early access before the public sale. The best-value units — especially on phones and large appliances — can sell out in that window, so early access is worth using.

## Focus on categories that genuinely drop
The deepest, most reliable discounts during BBD tend to be on:

- Smartphones (often the lowest price of the year)
- Large appliances (TVs, refrigerators, washing machines)
- Fashion and footwear
- Laptops and electronics accessories

## Avoid the fake-urgency trap
"Only 2 left!" and countdown timers are designed to rush you. If a price looks good, verify it's genuinely lower than the usual selling price before buying. A real BBD deal stands on its price, not on pressure.

## FAQ

### When is Flipkart Big Billion Days 2026?
Flipkart Big Billion Days typically runs during the festive season around September–October. Exact 2026 dates are announced by Flipkart closer to the event — add products to your wishlist so you're ready the moment it goes live.

### How do I get early access to Big Billion Days deals?
Early access is usually offered to Flipkart Plus members and customers of the sale's partner bank. Being signed in with the right card or membership lets you shop a few hours before the public sale.

### Are Big Billion Days prices really the lowest of the year?
For smartphones and large appliances, BBD prices are often the lowest of the year once bank offers are stacked. Always compare against the product's recent price history to confirm.

### What should I do before the sale starts?
Build your wishlist, save your preferred payment method, confirm which bank offer applies to you, and note the launch time. Preparation is what separates a good BBD haul from an overpriced impulse buy.`,
  },
  {
    slug: 'best-cashback-coupon-sites-india-2026',
    title: 'Best Ways to Use Coupons and Cashback in India (2026)',
    excerpt: 'How coupon codes, cashback and affiliate deal sites actually work in India — and how to combine them for the lowest final price.',
    seoTitle: 'Coupons & Cashback in India 2026 — How to Save More',
    seoDesc: 'A clear guide to how coupons, cashback and deal sites work in India in 2026, and how to stack them safely for the lowest final price.',
    tags: ['coupons', 'cashback', 'save-money'],
    body: `Coupons and cashback can meaningfully cut your bill in India — if you understand how they work and how to combine them. Here's a straightforward guide without the hype.

## Coupon codes vs. cashback: what's the difference
A **coupon code** reduces the price at checkout instantly. **Cashback** returns a portion of what you spent after the purchase is confirmed, usually into a wallet or bank account after a waiting period. The two are separate, and in many cases you can use both on the same order.

## The order that gets you the lowest price
To minimise your final cost, apply savings in this order:

1. Start from a genuine deal price (already discounted product)
2. Apply a working coupon code at checkout
3. Use an instant bank offer if available
4. Earn cashback on top via a cashback route

Each layer applies to a smaller amount, so the sequence matters.

## Where deal sites fit in
Deal aggregators — like RichDeals — do the tedious part for you: they surface products that are genuinely at a low price right now, with the working link and any coupon already noted. That saves you from hunting across dozens of tabs and from expired-coupon frustration.

## How to avoid wasting time on dead coupons
Most coupon frustration comes from expired or region-locked codes. Stick to codes that are dated and verified recently, and always confirm the discount actually applied before you pay. If a code doesn't work, it usually means it has expired or has usage limits.

## Read the cashback fine print
Cashback often has conditions: a minimum order value, category exclusions, or a confirmation window of several weeks. It's real money, but treat it as a delayed bonus rather than an instant discount when planning your budget.

## FAQ

### Can I use a coupon and cashback on the same order?
Often yes. A coupon reduces the price at checkout, while cashback is credited separately after the purchase confirms. When both are allowed, using them together gives the lowest effective price.

### Why do some coupon codes not work?
The most common reasons are expiry, a minimum order value not being met, category restrictions, or the code being limited to new users. If a code fails, it has usually expired or doesn't apply to your cart.

### Is cashback actually paid out?
Legitimate cashback is paid, but usually after a confirmation window that can range from a few days to several weeks, and only if the order isn't cancelled or returned. Read the conditions before relying on it.

### How do deal sites make money if the deals are free?
Deal sites typically earn an affiliate commission from the store when you buy through their link, at no extra cost to you. That's how a site like RichDeals stays free to use.`,
  },
  {
    slug: 'how-to-spot-fake-discounts-fake-mrp',
    title: 'How to Spot Fake Discounts and Fake MRP Tricks',
    excerpt: 'Big "80% off" tags are often illusions. Learn the common fake-discount tactics used online in India and how to check a price is genuinely low.',
    seoTitle: 'How to Spot Fake Discounts & Fake MRP (India Guide)',
    seoDesc: 'Learn the common fake-discount and inflated-MRP tricks used by online sellers in India, and simple checks to confirm a price is genuinely low.',
    tags: ['buying-guide', 'save-money', 'consumer-tips'],
    body: `A giant "80% off" badge feels great — but online, a big discount percentage is often an illusion built on an inflated MRP. Here's how to see through the common tricks and buy on real value.

## The inflated-MRP trick
The most common tactic is setting an unrealistically high "MRP" and then showing a huge discount off it. The strikethrough price was never a real selling price — it exists only to make the discount look dramatic. Always judge the **actual selling price**, not the percentage off.

## "Lowest price ever" that isn't
Labels like "lowest ever" or "deal of the year" are marketing claims, not facts. The only way to verify them is against the product's real price history. If the current price matches what it usually sells for, the claim is empty.

## Fake urgency and stock counters
"Only 3 left" and countdown timers are designed to stop you from checking whether the price is genuinely good. Real deals don't need pressure. If you feel rushed, that's a reason to slow down and verify.

## Bundle and "combo" inflation
Some listings bundle a cheap accessory to justify a higher price, or show a combo "saving" that disappears when you compare buying the main item alone. Price the item you actually want on its own.

## How to confirm a price is genuinely low
- Compare the selling price across two or three stores
- Check the product's recent price trend, not just today's tag
- Ignore the discount percentage; focus on the rupee amount you'll pay
- Confirm any coupon or bank offer actually applies before paying

A deal aggregator that only lists items at a genuinely low current price — and shows the real selling price — saves you from most of these traps automatically.

## FAQ

### Why do online stores show such high MRPs?
A high MRP makes the discount percentage look bigger. The strikethrough price is often not a price the item ever genuinely sold at. Focus on the actual selling price rather than the percentage off.

### How can I tell if a discount is real?
Compare the current selling price against the product's typical price over recent months and across a couple of stores. If it's clearly below the usual price, the discount is real; if it matches the normal price, it isn't.

### Are countdown timers and "only 2 left" real?
Sometimes stock is genuinely limited, but these labels are mainly there to create urgency. Don't let them rush a purchase — verify the price is genuinely good first.

### Does a higher discount percentage mean a better deal?
No. A 70% discount off an inflated MRP can cost more than a 30% discount off a fair price. Always compare the final rupee amount you'll actually pay.`,
  },
  {
    slug: 'amazon-vs-flipkart-which-has-better-deals',
    title: 'Amazon vs Flipkart: Which Has Better Deals in India?',
    excerpt: 'A category-by-category look at where Amazon India and Flipkart each tend to win on price — and why checking both always pays off.',
    seoTitle: 'Amazon vs Flipkart: Which Has Better Deals? (2026)',
    seoDesc: 'A practical comparison of Amazon India vs Flipkart on deals, categories, delivery and offers in 2026 — and why smart shoppers check both.',
    tags: ['amazon', 'flipkart', 'buying-guide'],
    body: `Amazon India and Flipkart are the two giants of Indian online shopping, and the honest answer to "which has better deals" is: it depends on the category and the moment. Here's how they compare where it matters.

## Smartphones
Flipkart has historically been strong on smartphone launches and exclusives, often pairing them with aggressive bank offers during Big Billion Days. Amazon counters with its own exclusives and festival pricing. For phones, checking both on the same day is essential — the gap can be thousands of rupees.

## Electronics and appliances
Both platforms run deep discounts on TVs, laptops and large appliances during festive sales. Amazon often edges ahead on accessories and everyday electronics; Flipkart frequently wins on big-ticket appliance bundles with exchange offers. Compare the final price after exchange and bank offer, not the sticker price.

## Fashion and lifestyle
Flipkart's fashion arm (including Myntra in its group) gives it strong coverage in apparel and footwear. Amazon has grown here too. For fashion, discounts are broad on both, so coupons and end-of-season timing matter more than the platform.

## Delivery and returns
Amazon's Prime delivery speed and return experience are widely rated highly. Flipkart's delivery network is strong across India too, especially in smaller cities. If speed matters for your order, factor it in alongside price.

## The real answer: check both
Because prices shift constantly and each platform wins different categories on different days, the smartest habit is simply to compare both before buying. That's exactly the problem deal aggregators solve — surfacing the genuinely lower price across stores so you don't have to open ten tabs.

## FAQ

### Does Amazon or Flipkart have better prices?
Neither wins every time. Flipkart is often strong on smartphones and appliance bundles; Amazon is often competitive on electronics and everyday items. The best price depends on the category and the day, so comparing both is the reliable approach.

### Which is better for smartphones, Amazon or Flipkart?
Flipkart has a strong track record on smartphone launches and festive pricing, but Amazon runs competitive exclusives too. For any specific phone, check both platforms on the same day — differences can be significant.

### Is Amazon or Flipkart delivery faster?
Amazon Prime is known for fast, reliable delivery, while Flipkart has a wide network reaching smaller cities well. For time-sensitive orders, compare the estimated delivery date on each alongside the price.

### How can I quickly compare Amazon and Flipkart deals?
Use a deal aggregator that lists genuine current prices across both stores. It surfaces the lower price for you, saving the effort of manually checking each platform.`,
  },
];

const now = new Date();
let done = 0;
for (const post of posts) {
  const { tags, ...data } = post;
  const created = await p.post.upsert({
    where: { slug: post.slug },
    update: { ...data, publishedAt: now },
    create: { ...data, author: 'RichDeals Editorial', publishedAt: now },
  });
  // tags
  for (const t of tags) {
    const tag = await p.tag.upsert({
      where: { slug: t },
      update: {},
      create: { slug: t, name: t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) },
    });
    await p.postTag.upsert({
      where: { postId_tagId: { postId: created.id, tagId: tag.id } },
      update: {},
      create: { postId: created.id, tagId: tag.id },
    });
  }
  done++;
  console.log(`  upserted: ${post.slug}`);
}
await p.$disconnect();
console.log(`DONE: ${done} posts seeded`);
