# TELEGRAM-DEAL-MONITOR tick — 2026-11-18v

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. Amazon prices were read with a same-origin fetch of the PDP in the logged-in Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, M.R.P. from `.basisPrice`). Run at about 21:03–21:10 IST.

**Result: 0 new deals pushed. Every fresh post was either a dup of a LIVE row or failed the PDP price check. One LIVE row gained its missing MRP (#16817 Dove, M.R.P. ₹360). IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 8 of 8 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks | amzn.to/4kZIgot | PROWL Detan Men Body Soap (B0HBBR8NJ8) | Rejected: PDP ₹199 (M.R.P. ₹399) against the channel's ₹99 |
| SB Loots | amazn.lt/q0G7crwI | Marwar Seth Afghani Anjeer 1Kg (B0HPFD26B2) | Dup of LIVE #16868; PDP ₹379 = DB, unchanged |
| Dealdost | amzn.to/4zVSj2P | Marwar Seth Afghani Anjeer 1Kg (B0HPFD26B2) | Same dup as above |
| Dealzone | link.amazon/B06tKbB7c | Dove Eventone Deodorant Spray 150ml (B08ZZW5HDJ) | Dup of LIVE #16817; PDP ₹144 = DB; MRP backfilled |
| ONLINE SHOPPING DEALS | — | Park Avenue after shave | Skipped: already LIVE as #16834 |
| INDIAN CHEAP DEALS | — | LG washing machine | Skipped: already LIVE as #5035 |
| Rogerkart, NonStopDeals | — | PUMA winterwear, Caprese | Skipped: category posts |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | Not rendered in the sidebar; no new top message |

The CoolzTricks link resolved to an Amazon search URL (`/s/?keywords=kojic+soap&field-asin=B0HBBR8NJ8`), and the ASIN was read from `field-asin`. The post says "Apply Coupon at Checkout" and claims a pack of 2 at ₹99. The PDP shows a single soap at ₹199 with a coupon badge, so the ₹99 figure depends on a checkout coupon that a fetched PDP cannot confirm. DesiDime 18k rejected the same ASIN for the same reason.

Seen list: 5 keys appended, now 5,400 entries.

## Pushed

None.

## MRP backfill

| id | Product | Price | MRP was | MRP now |
|---|---|---|---|---|
| 16817 | Dove Eventone Deodorant Spray for Women, 150 ml | ₹144 (unchanged) | null | ₹360 (60% off) |

The PDP showed ₹144, in stock, add-to-cart present, with M.R.P. ₹360 in `.basisPrice`. The implied 60% discount is under the 80% rule, so `mrp` and `discountPct` were set with `prisma.deal.update`. The slug and title did not change; the title's ₹144 still matches `price`.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the #16817 slug, **HTTP 200 for 4 URLs** (1 slug plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (1.68s) |
| /dove-eventone-deodorant-spray-for-women-150-ml-b08zzw5hdj | 200 (0.20s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 21:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,262 = 16,262 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,871 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,871 = 16,871 | OK. Fully drained, including DESIDIME 18k's 4 rows. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j, 0 of 94 at 18k. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 21:50, TG 22:03, DESIDIME 22:43, DEAL-INGEST 22:53. On 11-19: CONTENT-SEO 00:39, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
