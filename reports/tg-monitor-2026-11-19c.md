# TELEGRAM-DEAL-MONITOR tick — 2026-11-19c

The tick read the Telegram Web sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`. It then scanned the Rogerkart history for deeper posts, resolving 26 shortlinks. Each candidate was deduped against `data/tg-multi-seen.json` and live DB productIds. Prices were verified on the PDP: Amazon through a same-origin fetch in the logged-in tab, Flipkart through ld+json read in a same-origin tab fetch. Run at about 02:04–02:09 IST.

**Result: 0 new deals pushed. Every fresh candidate either drifted from the PDP, quoted a post-coupon price, had no buy box, or was a loot, grocery or category post. Three reposts matched existing LIVE rows whose prices had moved, so those rows were repriced and their copy fixed (#760, #4947, #13051). IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints. The TG session cron had expired and was recreated as `cde84e2e`.**

## Sidebar (10 of 13 groups rendered)

Identical to 19b: no group had a newer post than the last tick. The Rogerkart history scan supplied the candidates below.

## Rejected

| Product | Store | Channel | PDP | Reason |
|---|---|---|---|---|
| Havells purifier B0CKVLCMJZ | Amazon | ₹8,289 effective | ₹11,990 | Post-coupon price |
| Chimney B0G1CJNJMN | Amazon | ₹12,770 | ₹12,490 | Drift |
| Dorado hob B0CRB8ZGML | Amazon | ₹12,649 | ₹18,199 | Drift |
| playR bag B0CXY8T9YW | Amazon | ₹2,001 | ₹4,549 | Drift |
| Alum B0H522VGPX | Amazon | ₹44 effective | ₹119 | Post-coupon price |
| Cello cooler B01BSQRLQ0 | Amazon | — | No buy box | No buy box |
| SPYFOOD B0G26153ZX | Amazon | — | ₹109 | Loot / FMCG |
| Hammer B0D7SNDKW9 (#3906) | Amazon | — | No buy box | Added to the watch list |
| Beardo B0FKT4N4MS | Amazon | — | — | Duplicate of #6261 |
| Digismart mixer | Flipkart | ₹1,389 | ₹1,378 | Drift |
| Digismart combo | Flipkart | ₹1,499 | ₹1,549 | Drift |
| Zebronics monitor | Flipkart | ₹5,935 | ₹5,999 | Drift |
| Usha | Flipkart | ₹9,722 effective | ₹17,289 | Post-coupon price |
| Tibra kurta | Flipkart | — | ₹306 | Bare loot post, no channel price |
| KILLER STRING suitcase | Flipkart | — | ₹4,079 | Bare loot post, no channel price |

Skipped without a PDP read: an Amazon store page (q3uGne5), a `/s?` search (CrrTjNS), category or search links (gsrf6j, e7al4y, hBtHKX, aa7kmN), and grocery posts for dates and Saffola oil (WYkaF9, SfzTgr).

## Repriced (duplicate reposts)

| id | Before | After (PDP) | Slug |
|---|---|---|---|
| 760 Bigmuscles whey | ₹1,691, MRP ₹2,899 | ₹1,699, MRP ₹2,349 | `bigmuscles-nutrition-premium-gold-whey-1kg-informed-choice-uk-certified-isolate-h8lwc3` |
| 4947 OnePlus N6x | ₹20,999 | ₹22,999, MRP ₹28,999 | `oneplus-n6x-4gb-128gb-smartphone` |
| 13051 Boltt ACE 5G | ₹11,999 | ₹14,999, MRP ₹24,999 | `boltt-ace-5g-midnight-black-64gb-4gb-ram-mobhpp596ahabwnp` |

Each update went through `prisma.deal.update` with a new priceHistory row. The stale ₹ figures and discount percentages in the titles and descriptions were rewritten to match the new `price`; for example, #760's "roughly 42% off" became "roughly 28% off". The seen list grew from 5,424 to 5,465.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 repriced slugs, **HTTP 200 for 6 URLs** (3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.62s) |
| Bigmuscles slug | 200 (0.25s) |
| OnePlus slug | 200 (0.22s) |
| Boltt slug | 200 (0.16s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 02:09 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,279 = 16,279 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,886 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,886 = 16,886 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up | OK |
| Session crons vs roster | 8 of 9 found; TG missing | **Fixed.** Recreated as `cde84e2e` (`37 * * * *`, next run 03:01 IST). |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l and 19a. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 02:53.
- **DesiDime yield:** low, because the card price lags the PDP. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`. This tick fixed three of them.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, and now #3906 Hammer.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): DESIDIME 02:43, DEAL-INGEST 02:53, TG 03:01, SITEMON 03:14, SCHEMA-AUDIT 04:39, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39.
