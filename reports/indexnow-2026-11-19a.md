# INDEXNOW tick — 2026-11-19a

A Prisma query (`apps/api/_inx1119a.cjs`, same logic as 18d) built the URL list from three groups:

- the newest 25 LIVE deals;
- every LIVE deal with a priceHistory row in the last 6 hours, excluding those 25;
- the newest 6 posts, as `/blog/<slug>`.

The list went to `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. That mode adds nothing on its own, so the 9 hubs and sitemaps were listed by hand. Run at about 01:07 IST.

**Result: IndexNow returned HTTP 200 for 47 URLs. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16832 to #16886 (the ids have gaps) |
| Repriced in the last 6h | 7 | #219, #274, #4793, #7683, #12328, #16391, #16677 |
| Newest posts | 6 | ids 622 to 629, including the new sweatshirt guide (629) |
| **Total** | **47** | **HTTP 200** |

The newest 25 deals cover this hour's pushes: #16884 and #16885 from DESIDIME 19a, and #16886 from TG 19b. The reprice group includes #12328 Cello, which was synced from ₹208 to ₹293 in DESIDIME 19a, and #219 Creative's, which was re-confirmed in the same tick.

## Freshness

- **IndexNow:** HTTP 200 for 47 URLs (above).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.51s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.57s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 01:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,279 = 16,279 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,886 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,885 vs 16,886 | OK. TG 19b's row is waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 at SITEMON 19a (00:57) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l and 19a. Repoint the slot if every 11-19 tick resolves 0.
- **DesiDime yield:** low, because the card price lags the PDP. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): SITEMON 01:50, TG 02:03, DESIDIME 02:43, DEAL-INGEST 02:53, SCHEMA-AUDIT 04:39, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
