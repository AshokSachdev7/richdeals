# DEAL-INGEST (indiafreestuff) tick — 2026-11-17i

The tick fetched the IFS `/deals` listing (33 unique Buy Now ids) and the `/deals/superdeals` listing (41 unique ids), then probed the four newest card Buy Now links (`?rto=` base64 ids) one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. Two ids came from `/deals` (`MzA4NDg5MDM2OQ==` and `MzA4NDg4OTI1OA==`, both newer than tick h's) and two from superdeals (`MzA4NDg4ODE0Nw==` and `MzA4NDg4NzAzNg==`). All four returned 302 to `https://www.indiafreestuff.in/`, the homepage. The href format is unchanged (`https://www.indiafreestuff.in/?rto=…`), and the listing HTML carries no direct store links to fall back on. Per the redirector-dead rule, the full stage 1 sweep was skipped so as not to hammer their domain for nothing. Run at about 16:53–16:55 IST.

**Result: 0 deals pushed. The IFS redirector is still dead: 4 of 4 probes, across both listings, went to the homepage. That makes three dead ticks in a row (g, h and i), after the partial 7 of 93 at tick f. No IndexNow ping was needed. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Unique Buy Now ids on `/deals` page 1 | 33 |
| Unique ids on `/deals/superdeals` | 41 |
| Buy Now ids probed | 4 (2 from `/deals`, 2 from superdeals) |
| Resolved to the homepage (dead) | 4 |
| Resolved to a store | 0 |
| Full sweep run | No (probe failed) |
| Fresh candidates | 0 |

## Candidates

None. Nothing resolved to a product, so no PDP was read and nothing was pushed. Products were not guessed from card titles, because IFS card prices are unreliable.

## Freshness

- **IndexNow:** not run, because nothing was pushed.
- **`sitemap.xml` / `llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.25s) |
| /blog | 200 (0.89s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.69s) |

## CEO audit

Run at 16:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,176 = 16,176 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,756 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,756 vs 16,756 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 16:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g, h and i, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 18:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
