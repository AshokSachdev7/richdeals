# TELEGRAM-DEAL-MONITOR tick — 2026-11-15f

This tick read the newest post in every group with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile), at about 05:05 IST.

**Result: 0 pushed.** No source group has posted since the 04:03 tick (`tg-monitor-2026-11-15e`). The newest source post is still the 02:32 SB Loots channel-settings promo, which has no product in it. No IndexNow ping was needed because nothing was pushed or changed. Prod returned 200 on all 7 endpoints and every DB check is green.

The low-stock rows were re-checked on their PDPs at 05:00 IST in the deal-ingest 11-15c run, so this tick did not re-read them.

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| SB Loots | "Missed some loots" notification-settings promo (02:32) | Seen before. Skipped, no product. |
| Dealdost | Anjeer 1kg ₹399 | Already LIVE as #16501 |
| ONLINE SHOPPING DEALS | Shatras soap ₹151 | Already LIVE as #16506 |
| INDIAN CHEAP DEALS | LG washing machine | Already LIVE as #5035 |
| CoolzTricks | AC "24K with card offer" | Bank-offer price, already rejected |
| Dealzone, NonStopDeals | PUMA and Caprese category posts | Skipped, not single products |
| Hidden Loot, IFS Tips | Swiggy Dineout | Skipped, not a deal |
| Rogerkart | "Photo" | Skipped, no link |

## Freshness

- IndexNow: not pinged, because nothing was pushed or changed.
- `sitemap.xml` and `llms.txt`: no change needed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.15s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.88s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.56s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 without a cover, 0 without SEO fields | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9 of 9 match the roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST):

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| **11-15 (so far)** | **1** |

The 06:39 IST CONTENT-SEO run must add the second post for 11-15.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- The same-price confirm paths in the scripts still write no priceHistory row, so 94.7% of LIVE deals have no `priceValidUntil`.
- #14635 (Mivi, Flipkart): PDP still unchecked. It is the schema-audit FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB, and the row lapses on 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- Low-stock rows to re-check: #16506, #16558, #7461, #16190.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses some ASINs (#2351, #15344). Older rows are unchecked.
- The DO API token still needs rotating. This is an owner action.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
