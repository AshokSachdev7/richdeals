# Telegram deal monitor — 2026-11-12e

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

Sidebar unchanged since 12d: no group posted a new single-product deal in the window.

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
| / | 200 (0.17s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.55s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Still open: same-price confirm paths in the desidime/TG/IFS scripts write no priceHistory row, so most LIVE Offers lack `priceValidUntil`; #11896 Flipkart ₹664 vs DB ₹899; 16 bare Flipkart links; 96 drift rows; #3498 GSC deal lost (EXPIRED, OOS on Amazon); DO API token rotation (owner action).

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
