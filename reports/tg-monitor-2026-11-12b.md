# Telegram deal monitor — 2026-11-12b

One `browser_evaluate` over the `.chat-list` sidebar (13 groups in `data/tg-groups.json`, Playwright richDeals profile). Shortlinks resolved, dedup vs `data/tg-multi-seen.json` + live DB productId/slug, every price re-read on the Amazon PDP in the logged-in tab (`.a-price-whole` in `#corePriceDisplay`, `.basisPrice`, `#availability` + add-to-cart).

## Funnel

| Step | Count |
|---|---|
| Groups read | 13 |
| Single-product candidates | 5 |
| Category / loot / junk posts skipped | 7 |
| Already seen | 5 |
| Fresh | 0 |
| Pushed | **0** |

## Candidates

| Group | Deal | Product id | Result |
|---|---|---|---|
| CoolzTricks | Cricket helmet cover @119 (amzn.to) | B09NQ5CJDT | Seen, not in DB. PDP now ₹449 (MRP 999), deal gone, stays rejected |
| Dealzone | Moonatic wall clock (Shopsy) | XWAGUVD6RMSZ7DD8 | Seen, skip |
| INDIAN CHEAP DEALS | LG 8kg 5-star inverter top-load washer (link.amazon) | B0DPHTSTYJ | Dup repost of LIVE id 5035. PDP ₹20,990 / MRP 28,990, in stock + ATC = DB price, no sync |
| Loot Deals 24x7 | Syska 10000mAh power bank (fkrt.co) | PWBGGD4THDQZYAY6 | Seen, not in DB (earlier reject), skip |
| ONLINE SHOPPING DEALS | MuscleTrail | B0FC6QNWF5 | Seen, skip |

Skipped: watches loot, Caprese handbags category, Myntra Libas category, Swiggy Dineout (×2), "video dekho paisa kamao", settings post.

## Freshness

- No push, no price sync → no IndexNow ping needed this tick.
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,829 = 15,829 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,368 vs 16,398 (lag 30, was 16,363, draining) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
