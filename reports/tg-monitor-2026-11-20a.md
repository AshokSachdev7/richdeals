# TELEGRAM-DEAL-MONITOR tick — 2026-11-20a

The tick ran inline in Playwright (richDeals profile). It read every group in `data/tg-groups.json` with one `browser_evaluate` over the `.chat-list` sidebar, resolved shortlinks, and checked each candidate against `data/tg-multi-seen.json` and the live DB `productId`. Every price was verified on the Amazon PDP in the logged-in tab, through a same-origin fetch that hit no captcha. Run at about 23:45 IST on 11-19 to 00:06 IST on 11-20.

**Result: 2 new deals pushed LIVE (#16969, #16970) and 1 existing deal repriced (#11774). IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 7 of 7 endpoints.**

## Candidates

| Post | Product | Channel price | PDP check | Outcome |
|---|---|---|---|---|
| Rogerkart `/r/` → B0D8YR7RS5 | Havells FAB BLDC Ceiling Fan 1200 mm, 30 W, Elegant White | ₹2,645 | ₹2,645, M.R.P. ₹5,320, in stock, add-to-cart present | **Pushed** #16970 |
| B0B8QG4K3G | BoroPlus Soft Light Moisturising Cream 200 ml | ₹128 | ₹128, M.R.P. ₹310, in stock, add-to-cart present | **Pushed** #16969 |
| B0HHHYP91N | 70mai M310 Plus 2K Dash Cam | ₹3,998 | ₹3,998, M.R.P. ₹8,999, in stock, add-to-cart present | Already LIVE as #11774 at ₹3,499. **Repriced** |
| Dove sale, LG sale | Brand sale pages | — | — | Rejected: sale hub, not a single product |
| La-Fetch, USPA, Caprese | — | — | — | Already seen |
| Swiggy Dineout | — | — | — | Rejected: not a store product |
| iPhone group, RichDeals | — | — | — | Skipped: not tracked, or our own channel |

## Pushed

`POST /admin/deals/bulk` returned HTTP 201 with count 2. Both rows came back `created: true`, so no slug restore was needed.

| Id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 16969 | `boroplus-soft-light-moisturising-cream-200ml-b0b8qg4k3g` | ₹128 | ₹310 | 59% |
| 16970 | `havells-fab-bldc-ceiling-fan-1200mm-white-b0d8yr7rs5` | ₹2,645 | ₹5,320 | 50% |

Both use `?tag=ashoksachdev-21` on `/dp/ASIN` and an `m.media-amazon.com` hiRes image. Every rupee figure in each title, description and howTo was checked against the numeric price and M.R.P. before the POST.

## Repriced

**#11774** (`70mai-m310-plus-2k-dash-cam-360-rotating-lens-b0hhhyp91n`) went from ₹3,499 (61% off) to **₹3,998 (56% off)**, with the M.R.P. unchanged at ₹8,999. The update covered:

- the price, discount, title and description;
- the howTo, whose stale "₹3,999" step was corrected;
- a new priceHistory row.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200**: 6 URLs (3 deal slugs plus the 3 standard paths) |
| `sitemap.xml` | 200 (ISR 1800s). The deals child is top-100 only, by design. |
| `llms.txt` | 200, `force-dynamic` |
| New slug on prod | `/boroplus-…-b0b8qg4k3g` returned 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200: total 16,363, newest id 16,970 |
| /llms.txt | 200 |

All probes used `curl -m 30`.

## CEO audit

Run at 00:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,363 = 16,363 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,970 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs prod max | 16,968 vs 16,970 | OK. This tick's 2 deals have not been broadcast yet; the external cron picks them up on its next run. |
| Unpushed commits | 0 before this report | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-17 3, 11-18 3, 11-19 3. 11-20 is 6 minutes old, and CONTENT-SEO runs at 00:39.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit, so rd-web never caches the posts fetch. This is a performance issue, not an outage.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic:** down about 70% since 10-28.
- **IFS redirector:** 0 of 90 at 19l. A 1-id probe at DEAL-INGEST 00:53 decides whether to keep sweeping.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST, 11-20:

| Job | Next run |
|---|---|
| SITEMON | 00:14 |
| CONTENT-SEO | 00:39 |
| DESIDIME | 00:43 |
| DEAL-INGEST | 00:53 |
| TG | 01:01 |
| INDEXNOW | 01:05 |

SCHEMA-AUDIT runs at 04:39, SEO-AUDIT-FIX at 05:58 and AI-OVERVIEW on 11-25 at 11:39.
