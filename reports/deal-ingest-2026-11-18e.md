# DEAL-INGEST (indiafreestuff) tick — 2026-11-18e

The IFS `?rto=` Buy Now redirector has been dead since 11-16, apart from a 7 of 93 partial recovery at 11-17 tick f. So this tick again probed the 4 newest Buy Now ids (the top 2 on `/deals` and on `/deals/superdeals`) with one curl each, spaced 3 s apart, before deciding whether to run the full stage 1 sweep of `apps/api/scripts/ingest-ifs-proper.mjs`. Both listings were fetched with a browser UA (HTTP 200 each, 3 s apart). Run at about 08:54–08:55 IST.

**Result: 0 deals pushed. All 4 probes 302 to `https://www.indiafreestuff.in/`, so this is the 11th dead tick in a row (g–q). The full sweep was skipped. Unlike 11-18b to d, the listings have moved: each one has a new top id (3084978138 on `/deals`, 2579106508 on superdeals). IFS is still posting, but its outbound links still go to its homepage. Every CEO-audit check is green, and all 9 session crons are armed.**

## Redirector probe

| Listing | Buy Now id | Decoded | Response |
|---|---|---|---|
| /deals | `MzA4NDk3ODEzOA==` | 3084978138 (new) | 302 → `https://www.indiafreestuff.in/` |
| /deals | `MzA4NDk3NzAyNw==` | 3084977027 | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MjU3OTEwNjUwOA==` | 2579106508 (new) | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MjE4Njc0Nzk3MA==` | 2186747970 | 302 → `https://www.indiafreestuff.in/` |

Without a resolved store URL there is no product id to verify, dedup or wrap in our affiliate link. The IFS card prices can't stand in for it either: 68% of them were wrong in earlier sweeps, so nothing is published from the card alone.

## Slot decision

Brand-new ids also go home, so this is not a case of only old deals expiring: the redirector itself is off, or our IP is blocked. The `23 */2 * * *` slot stays probe-only for the rest of 11-18 IST, as decided at 11-18b. If no 11-18 tick resolves by the end of the IST day, the slot is repointed then.

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.65s) |

The local API answers 200 on :4000.

## CEO audit

Run at 08:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,203 = 16,203 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,783 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,783 vs 16,783, ts 0.6 min old | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 08:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **IFS redirector:** dead at g through q (11 ticks), new ids included. Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 10:53 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
