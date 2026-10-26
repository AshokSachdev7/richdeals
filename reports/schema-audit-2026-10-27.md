# SCHEMA-AUDIT · 2026-10-27 (~23:20Z 10-26 / 04:50 IST 10-27)

**Verdict: all 12 URLs are clean. No issues found, so there was no code change and no deploy.**

## What was checked

The checker fetched the live HTML from https://richdeals.in, parsed every `application/ld+json` block, and compared the values with the DB through Prisma. For each URL:

- Every ld+json block parses.
- Deal pages:
  - `Product` and `Offer` are present, `priceCurrency` is INR, and `Offer.price` equals the DB price.
  - The visible copy shows the same `₹`.
  - `priceValidUntil` is present and in the future, `availability` is set, and there is an image.
- Deal pages: `FAQPage` exists, and every question and the start of every answer appear in the visible text.
- `BreadcrumbList` is present, and every entry except the last has an `item` URL.
- Posts: `Article` has `headline` (110 characters or fewer), `datePublished`, `image` and `author`.
- Any `₹` in `<title>` or `<h1>` must equal `Offer.price`.
- The robots meta tag is present and the canonical points to the page itself.

The checker is `schema1027.cjs` in the session scratchpad. The h1 and `₹` regexes, which had lost their escapes, were fixed, and the store and category paths were updated to `/stores/amazon` and `/category/shopping-category/appliances`.

I hand-checked one page to confirm the title `₹` check is not passing silently. #15080 has the title "Panasonic 30W B22 LED Bulb, Cool Day Light @ ₹289 (77% Off)" and the h1 "… at ₹289 (77% Off) – Amazon", and both match the Offer price of 289.

## Results

| URL | JSON-LD | Offer | Robots | Issues |
|---|---|---|---|---|
| `/` | Organization, WebSite, ItemList | — | index | 0 |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | — | index | 0 |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | — | index | 0 |
| `/stores/amazon` | Organization, WebSite, ItemList, BreadcrumbList, FAQPage | — | index | 0 |
| `/category/shopping-category/appliances` | Organization, WebSite, ItemList, BreadcrumbList, FAQPage | — | index | 0 |
| `/panasonic-30w-b22-led-bulb-cool-day-light-b086xtk2ph` (#15080) | Product, BreadcrumbList, FAQPage | 289 INR, valid until 11-09, InStock | noindex | 0 |
| `/hp-v150w-32gb-usb-2-0-pen-drive-blue-b00tiy58ag` | Product, BreadcrumbList, FAQPage | 639 INR, valid until 11-09, InStock | noindex | 0 |
| `/striders-frozen-kids-lunch-box-420ml-water-bottle-set-b0fgxy6gpk` | Product, BreadcrumbList, FAQPage | 171 INR, valid until 11-09, InStock | noindex | 0 |
| `/verox-rgb-1202-5w-wireless-bluetooth-speaker-with-mic-b0ds8ntr4s` | Product, BreadcrumbList, FAQPage | 498 INR, valid until 11-09, InStock | noindex | 0 |
| `/halonix-rigel-pro-7w-led-recessed-cob-light-warm-white-b0df79c7vt` | Product, BreadcrumbList, FAQPage | 365 INR, valid until 11-09, InStock | noindex | 0 |
| `/blog/hot-water-bag-vs-electric-gel-bag-vs-heating-pad-india` | Article, BreadcrumbList, FAQPage | — | index | 0 |
| `/blog/led-strip-light-buying-guide-12v-24v-230v-india` | Article, BreadcrumbList, FAQPage, HowTo | — | index | 0 |

All 12 pages return HTTP 200, and every canonical points to the page itself.

## Notes (expected, not bugs)

- **New deals are `noindex, follow`.** `dealIndexable()` indexes only the top 100 deals by clicks, per the owner's 2026-10-16 directive.
- **`priceValidUntil` is 11-09, which is +13 days rather than +14.** These pages were ISR-rendered on 10-26 and the date is still in the future.
- **The HowTo block on posts is harmless.** Google has retired that rich result.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,546 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15080 |
| Broadcast cursor | `lastId` 15080, which equals the DB max (fully drained) |
| Posts total / without cover / without SEO title or description | 436 / 0 / 0 |
| Posts per IST day | 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 1 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| CronList vs roster | 9 of 9 running |
| Unpushed commits | 0 before this commit |

10-27 IST has 1 post so far. CONTENT-SEO runs next at 06:39 IST, so the 2-post minimum is not at risk yet.

## Carried forward

- The chrome-devtools and reticle MCPs fail with CONNECT_TIMEOUT. Playwright works.
- Rotate the DO API token.
- Re-verify the prices of the 71 GSC-pinned deals before 11-20.
