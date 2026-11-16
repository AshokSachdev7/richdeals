# TELEGRAM-DEAL-MONITOR tick — 2026-11-16b

This tick read the Telegram Web sidebar inline in the Playwright "richDeals" profile and pulled single-product deals from every store. Shortlinks were resolved first. Each candidate was deduped against `data/tg-multi-seen.json` and against productId in the live DB. Its price was then read on the PDP: Amazon in the logged-in tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability`, add-to-cart), Flipkart via the page's ld+json `offers` in a Playwright tab. Run at about 11:15–11:30 IST.

**Result: 2 pushed LIVE (bulk count 2, both created, both Amazon). 1 dup row re-checked and found unchanged, 1 Flipkart candidate rejected for drift. IndexNow returned HTTP 200 for 5 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | Nescafé Sunrise Instant Coffee, 190g Stabilo (B00VJYYJ80) | ₹361 | ₹680 | 47% |
| Amazon | Amazon Brand Jam & Honey 3-in-1 tabletop foosball with Ludo and Snakes & Ladders (B0H4W3VKR2) | ₹800 | ₹3,999 | 80% |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Images are from `m.media-amazon.com`.
- Titles and descriptions are original copy. The builder pre-flight passed: every ₹ in the copy equals the price, the title's ₹ equals the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- Neither productId existed in the DB, so no slug restore was needed. The Nescafé page returns 200 on prod.

## Dup re-checks

| Row | Deal | DB | PDP | Action |
|---|---|---|---|---|
| #5035 | LG 8kg front-load washing machine (B0DPHTSTYJ) | ₹20,990 / ₹28,990 | ₹20,990, M.R.P. ₹28,990, in stock | None (unchanged) |

## Rejected / skipped

- WATHZFYXZ6GW9WVS LIMESTONE OTUS069 watch (Flipkart): the PDP ld+json shows ₹298 InStock (M.R.P. ₹2,499). The post implied a base of about ₹287 (₹275 after a ₹12 coupon), which is an ₹11 drift. Added to `data/dd-rejected.json` (2,002 entries).
- Skipped: Myntra Kook N Keech and NonStopDeals Caprese (category listings), SIMPARTE containers (the link could not be resolved from the post), and Swiggy Dineout and iPhone rate posts (not product deals).

The handled ids were appended to the `tg-multi-seen.json` array (now 5,171 entries).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 2 new slugs and returned **HTTP 200** for 5 urls (2 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,082 = 16,082 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,659 vs 16,661 | OK. The external broadcast cron picks up this tick's 2 rows on its next run. |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16, and SITEMON b re-checks it.

## Still open

- #14635 (Mivi, Flipkart): no priceValidUntil. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil; the same-price confirm paths still write no priceHistory row.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
