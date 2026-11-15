# TELEGRAM-DEAL-MONITOR tick — 2026-11-15g

This tick read the newest post of every group with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). Run at about 06:07 IST.

**Result: 0 pushed. No source group has posted since tick 11-15f. The newest source post is still the 02:32 SB Loots channel-settings promo, which has no product. No IndexNow ping was needed because nothing was pushed or changed. Prod 7/7 returned 200 and every DB check is green.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| SB Loots | "Missed some loots" notification-settings promo (02:32) | Already seen. Skipped, no product |
| Dealzone | PUMA shoes "upto 77%" (00:39) | Skipped, category post |
| Rogerkart | "Photo" (00:39) | Skipped, no link |
| CoolzTricks | AC "24K with card offer" (00:31) | Bank-offer price, already rejected |
| Dealdost | Anjeer 1kg ₹399 | Already live as #16501 |
| ONLINE SHOPPING DEALS | Shatras soap ₹151 | Already live as #16506 |
| Hidden Loot, IFS Tips | Swiggy Dineout | Skipped, not a deal |
| INDIAN CHEAP DEALS | LG washer | Already live as #5035 |
| NonStopDeals | Caprese category post | Skipped, not a single product |

## Freshness

- IndexNow: no ping was needed because nothing was pushed or changed.
- `sitemap.xml` and `llms.txt` needed no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.17s) |
| /offers | 200 (0.07s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.06s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.53s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- Low-stock rows to re-check: #16506 Shatras, #16558 Symbol shorts, #7461. All three matched on the PDP at 04:03.
- Same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #3538).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
