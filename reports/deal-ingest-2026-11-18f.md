# DEAL-INGEST indiafreestuff tick — 2026-11-18f

The IFS redirector has been dead since 11-16 (`?rto=` 302s to the homepage), so this tick probed before sweeping. It fetched `/deals` and `/deals/superdeals` with a browser UA, 3 s apart, and probed the newest Buy Now ids with one curl each, also spaced 3 s apart. The full stage 1 sweep (`apps/api/scripts/ingest-ifs-proper.mjs`) would run only if a probe resolved to a store URL. Run at about 10:53–10:55 IST.

**Result: 0 deals pushed. All 4 probes returned 302 to the IFS homepage, which makes this the 12th dead tick in a row (g through r). Both listings returned 200 and still carry fresh ids, so IFS is publishing, but the Buy Now links are dead. Stage 1 was skipped and there was nothing to ping. Every CEO-audit check is green and all 9 session crons are armed.**

## Redirector probe

| Listing | Buy Now id | Decoded | Response |
|---|---|---|---|
| /deals | `MzA4NDk4OTI0OA==` | 3084989248 | 302 home |
| /deals and superdeals | `MzA4NDk4ODEzNw==` | 3084988137 | 302 home |
| superdeals | `MjE4Njc0Nzk3MA==` | 2186747970 | 302 home |
| superdeals | `MjAzMjgzNjY5Ng==` | 2032836696 | 302 home |

The newest `/deals` id moved from 3084978138 (18e) to 3084989248, so new listings keep appearing. The second-newest `/deals` id is also the newest on superdeals, so the 4th probe used the next superdeals id. 2186747970 was also probed in 18e and is still dead.

## Slot decision

No candidate resolved, so stage 1, PDP verification, dedup and the push were all skipped. Nothing was written to the DB. The probe-only rule stands until the end of 11-18 IST. If the 12:53 and later ticks also fail, the slot should be repointed, for example to a second sweep of DesiDime or the Telegram groups, which are both yielding today.

## Freshness

- **IndexNow:** skipped, because no deals were pushed.
- **`sitemap.xml`:** ISR 1800s, so nothing to do.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.59s) |

All probes used `curl -m 30`.

## CEO audit

Run at 10:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,211 = 16,211 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,791 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,791 vs 16,791 | OK. The external tg-broadcast cron has drained the DesiDime 18f batch; no gap |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 10:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Old rows with contradictory copy:** rows created before the title-vs-price check may carry a title ₹ or howTo ₹ that differs from `price`. A sweep that diffs them would find the rest.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 12:53 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
