# DESIDIME 2026-11-03a (08:35 IST)

**Result: 1 new LIVE deal (#15977, Amazon, product-page verified). 10 Amazon candidates were rejected for drift. IndexNow returned HTTP 200 for 4 URLs.**

## Method

1. Stage 1 ran `ingest-desidime.mjs`:
   - It reads cards only and never fetches a per-deal page.
   - JUNK and GROCERY filters are applied.
   - Buy Now links are resolved through `visit.desidime.com`.
   - Non-Amazon candidates are checked with `productLd()`: price within ±₹1 and InStock.
2. Amazon candidates were verified by curl of the product page, reading `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart.
   - The Playwright MCP is still hung and reticle is CONNECTION_CLOSED.
3. Every productId was deduped against the live DB with Prisma. All 11 Amazon ASINs returned `[]`, so none are already listed.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 38 |
| Resolved to a single product | 16 |
| Already in DB | 1 |
| Rejected in the last 24h | 0 |
| Fresh candidates | 15 |
| Dropped at stage 1: no ld+json, out of stock or sitewide offer | 4 (AMKETTE keyboard, Timesprime, Disney kitchen set, Dellstore) |
| Amazon product pages read | 11 |
| **Pushed LIVE** | **1** |

## Pushed

| # | Store | Product | Price / MRP | Slug |
|---|---|---|---|---|
| 15977 | Amazon B0C33BN4J5 | Longway Kwid 1100W Non-Stick Dry Iron | ₹398 / ₹879 (55%) | `longway-kwid-1100w-non-stick-dry-iron-with-2-year-warranty-b0c33bn4j5` |

## Rejected after product-page read

The card prices on these deals are bank-offer or card-offer prices, not the listed price.

| ASIN | Product | Card | Product page |
|---|---|---|---|
| B0HCB1Z9BR | iQOO 15R | ₹46,500 | ₹53,999 |
| B0GTVDH4G2 | HP 15 Ryzen 5 (also a TG 11-03a reject) | ₹57,440 | ₹69,990 |
| B0FXMKN396 | LG 34U511A monitor | ₹20,749 | ₹20,999 |
| B0G2SXHLV4 | Mankind multivitamin "₹1 sample" | ₹1 | ₹266 |
| B0DZHJT3JB | Ambrane 20000 mAh power bank | ₹1,299 | ₹1,499 |
| B0CZTGRS2S | WHP 1 g gold pendant (also rejected 11-01c) | ₹14,394 | ₹15,580 |
| B07FK733X4 | Yardley Morning Dew 100 ml | ₹194 | ₹259 |
| B0GVK5Q87C | TCL 43" QLED | ₹24,740 | ₹32,990 |
| B0HF7V9646 | Lenovo LOQ | ₹1,27,240 | ₹1,39,990 |
| B0DTK2KCPQ | Sony A6100K | ₹50,740 | ₹62,990 |

All 10 were written to `data/dd-rejected.json` with a Number `Date.now()` value. The file now has 1,407 keys.

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 slug plus 3 hub paths).
- sitemap.xml: ISR 1800s. llms.txt: force-dynamic. Both return 200.
- #15977 returns 200 on prod.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` + #15977 | all 200 | ok |
| DB LIVE / prod API total | 15,419 / 15,419 | equal |
| DB max id | 15,977 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 455 / 0 / 0 | ok |
| Posts per day (IST) | 10-31:4, 11-01:1, **11-02:0, 11-03:0** | **ROT** |
| Broadcast cursor | 15,950 vs max 15,977. It moved up from 15,940, so it is draining. | ok |
| Unpushed commits | 0 | ok |

## Still open

- Blog rot: 0 posts on 11-02, and 0 so far on 11-03. CONTENT-SEO 11-03 runs next and must ship at least 2 posts.
- The Playwright MCP is hung and reticle is down. Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified.
- #15898 needs a price read. JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual check.
- The DO token needs rotating. That is the owner's job.
