# Telegram deal monitor — 2026-11-12d

One `browser_evaluate` over the `.chat-list` sidebar (13 groups in `data/tg-groups.json`, Playwright richDeals profile). Shortlinks resolved (bittli.in, amzn.to, link.amazon, fkrt.co), dedup vs `data/tg-multi-seen.json` + live DB productId/slug.

## Funnel

| Step | Count |
|---|---|
| Groups read | 13 |
| Single-product candidates | 5 |
| Category / loot / junk posts skipped | 8 |
| Already seen | 5 |
| Fresh | 0 |
| Pushed | **0** |

Sidebar unchanged since 12c: no group posted a new single-product deal in the window.

## Candidates

| Group | Deal | Product id | Result |
|---|---|---|---|
| CoolzTricks | Cricket helmet cover (amzn.to) | B09NQ5CJDT | Seen, rejected 12b (PDP ₹449 vs posted ₹119), skip |
| Dealzone | Moonatic wall clock (bittli.in → Shopsy) | XWAGUVD6RMSZ7DD8 | Seen, skip |
| INDIAN CHEAP DEALS | LG 8kg 5-star inverter top-load washer | B0DPHTSTYJ | Dup of LIVE id 5035, PDP ₹20,990 = DB (verified 12b), no sync |
| Loot Deals 24x7 | Syska 10000mAh power bank (fkrt.co) | PWBGGD4THDQZYAY6 | Seen, skip |
| ONLINE SHOPPING DEALS | MuscleTrail | B0FC6QNWF5 | Seen, skip |

Skipped: Shopsy wall-clock collection, watches loot, Swiggy Dineout (×2), Myntra Libas category, Caprese handbags category, settings post, "video dekho paisa kamao", Dhanteras greeting.

## Freshness

- No push, no price sync → no IndexNow ping needed this tick.
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.61s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.53s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,829 = 15,829 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Still open: same-price confirmations write no priceHistory row (91% of LIVE Offers lack priceValidUntil, schema-audit 11-12); the GSC rows #2321/#3492/#4188/#3498/#3506 go into the deal-ingest 12c price-sync batch.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
