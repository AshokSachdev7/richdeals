# INDEXNOW tick — 2026-11-18d

A Prisma query built the URL list: the newest 25 LIVE deals, every LIVE deal with a priceHistory row in the last 6 hours (excluding those 25), and the newest 6 posts as `/blog/<slug>`. The list went to `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. That mode adds nothing on its own, so the 9 hubs and sitemaps were listed by hand. Run at about 19:10 IST.

**Result: IndexNow returned HTTP 200 for 56 URLs. Prod returned 200 on 7 of 7 endpoints and every CEO-audit check is green.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16811 to #16835 |
| Repriced in the last 6h | 16 | #174, #4927, #5836, #8996, #15386, #16768, #16801 to #16810 |
| Newest posts | 6 | ids 621 to 628 |
| **Total** | **56** | **HTTP 200** |

The 6-hour reprice window catches two kinds of rows. #174, #4927, #5836 and #8996 were price-synced to their PDPs in DESIDIME 18j, and #15386 and #16768 were repriced earlier in the window. #16801 to #16810 fall just outside the newest 25 but were created inside the window, so their creation wrote priceHistory rows.

## Freshness

- **IndexNow:** HTTP 200 for 56 URLs (above).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.18s) |
| /blog | 200 (0.94s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.30s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.57s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 19:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,256 = 16,256 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,835 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,835 = 16,835 | OK. Fully drained; TG 18t's 3 rows have been broadcast. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j. Repoint the slot if all of 11-19 resolves 0.
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

CronList next runs (IST, 11-18): SITEMON 19:50, TG 20:03, DESIDIME 20:43, DEAL-INGEST 20:53. On 11-19: CONTENT-SEO 00:39, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
