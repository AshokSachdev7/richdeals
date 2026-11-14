# TELEGRAM-DEAL-MONITOR tick — 2026-11-15c

This tick read the newest post of every group with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). Run at about 02:03 IST.

**Result: 0 pushed. Every group's newest post is the same one the 01:20 tick (`tg-monitor-2026-11-15b`) already handled, so this tick had no new candidates. #16506 Shatras was re-checked on its PDP because it was low on stock: ₹151, still in stock (1 left), add-to-cart present, so the row stays as is. No IndexNow ping was needed because nothing was pushed. Prod 7/7 returned 200 and every DB check is green.**

## Sidebar (no new posts since 15b)

| Group | Newest post | Status |
|---|---|---|
| Dealdost | Anjeer 1kg ₹399 | Already live as #16501, verified at 15b |
| ONLINE SHOPPING DEALS | Shatras soap ₹151 | Already live as #16506; re-checked this tick (₹151, 1 left) |
| INDIAN CHEAP DEALS | LG washer | Already live as #5035, verified at 15b |
| CoolzTricks | Haier AC "24K with card offer" | Bank-offer price, already rejected |
| Dealzone, SB Loots, NonStopDeals | PUMA, Symbol and Caprese category posts | Skipped, not single products |
| Hidden Loot, IFS Tips | Swiggy Dineout | Skipped, not a deal |
| Rogerkart | "Photo" | Skipped, no link |

## Freshness

- IndexNow: no ping was needed because nothing was pushed. The INDEXNOW tick at 01:25 IST returned HTTP 200 for 106 urls.
- `sitemap.xml` and `llms.txt` needed no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,004 = 16,004 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,583 = 16,583 | OK |
| Crons | 9/9 vs roster (CronList at 01:50 IST) | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-15 has 1 so far. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- #16506 Shatras is down to 1 left. Expire it when it goes out of stock. #16558 Symbol shorts (4 left) also needs a re-check.
- 13 IFS Flipkart cards are still unresolved.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
