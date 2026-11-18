# CONTENT-SEO tick — 2026-11-18d

## Method

The tick counted posts per day in IST first, using the DB audit script (`apps/api/_audit1112.mjs`). 11-18 already stood at 3 posts (CONTENT-SEO 18c published id 628 at about 12:43 IST), which meets the target of 2–3. A fourth post is allowed under the cap but is not needed, and padding the count runs against the near-dup thin-content finding, so no post was written. The tick then ran the CEO audit, probed the 7 prod endpoints, compared CronList with the roster in `.claude/cron-schedules.md`, and counted unpushed commits after a `git fetch`. Run at about 18:39 IST.

**Result: no post needed. 11-18 is at 3 posts, the target is met and the cap of 4 is not exceeded. Prod returned 200 on 7 of 7 endpoints, every CEO-audit check is green, the broadcast cursor is fully drained, and all 9 session crons are armed.**

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| **11-18** | **3** |

No day is 0 and none is over the cap of 4. The next CONTENT-SEO run (11-19, 00:39 IST) starts 11-19 at 0 and covers it.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.84s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.70s) |

All probes used `curl -m 30`.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,252 = 16,252 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,831 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,831 = 16,831 | OK. Fully drained; #16829 to #16831 were broadcast. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK. Nothing to recreate. |

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 resolved at 18h and 7 of 91 at 18i, so the slot stays on IFS. It gets repointed if a tick resolves 0 again.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): DESIDIME 18:43, SITEMON 18:50, DEAL-INGEST 18:53, TG 19:03, INDEXNOW 19:05. On 11-19: CONTENT-SEO 00:39, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
