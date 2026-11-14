# TELEGRAM-DEAL-MONITOR tick — 2026-11-15d

This tick read the newest post of every group with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). Run at about 03:10 IST.

**Result: 0 pushed. The only post since the 02:03 tick (`tg-monitor-2026-11-15c`) is an SB Loots channel-settings promo, which has no product. The three low-stock rows were re-checked on their Amazon PDPs; all match the DB and are still in stock. No IndexNow ping was needed because nothing was pushed or changed. Prod 7/7 returned 200 and every DB check is green.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| SB Loots | "Missed some loots" notification-settings promo (02:32) | New. Skipped, no product |
| Dealdost | Anjeer 1kg ₹399 | Already live as #16501 |
| ONLINE SHOPPING DEALS | Shatras soap ₹151 | Already live as #16506 |
| INDIAN CHEAP DEALS | LG washer | Already live as #5035 |
| CoolzTricks | AC "24K with card offer" | Bank-offer price, already rejected |
| Dealzone, NonStopDeals | PUMA and Caprese category posts | Skipped, not single products |
| Hidden Loot, IFS Tips | Swiggy Dineout | Skipped, not a deal |
| Rogerkart | "Photo" | Skipped, no link |

## Low-stock re-checks

All three were read in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart).

| Row | ASIN | PDP | DB | Action |
|---|---|---|---|---|
| #16506 Shatras soap | B0F2M184N3 | ₹151, 1 left, add-to-cart present | ₹151 | No change |
| #16558 Symbol shorts | B0F79NPMPQ | ₹159, 4 left, add-to-cart present | ₹159 | No change |
| #7461 | B0CDPJ565Q | ₹89, 2 left, add-to-cart present | ₹89 | No change |

## Freshness

- IndexNow: no ping was needed because nothing was pushed or changed. The deal-ingest 15b tick returned HTTP 200 for 8 urls at about 03:05 IST.
- `sitemap.xml` and `llms.txt` needed no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.65s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.60s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,585 vs 16,587 | Pending. The external broadcast run drains it and self-heals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- Low-stock rows to re-check: #16506 Shatras (1 left), #16558 Symbol shorts (4 left), #7461 (2 left).
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- Same-price confirm paths still write no priceHistory row.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
