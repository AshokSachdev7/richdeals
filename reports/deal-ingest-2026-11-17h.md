# DEAL-INGEST (indiafreestuff) tick — 2026-11-17h

The tick fetched the IFS `/deals` listing (37 Buy Now links) and the `/deals/superdeals` listing (41 unique ids), then probed card Buy Now links (`?rto=` base64 ids) one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. Three ids came from `/deals` (`MzA4NDg2NTkyNw==`, `MzA4NDg2NDgxNg==` and `MzA4NDg2MzcwNQ==`, all newer than tick g's) and one from superdeals (`MzAxMTIzMTA2OQ==`). All four returned 302 to `https://www.indiafreestuff.in/`, the homepage. Per the redirector-dead rule, the full stage 1 sweep was skipped so as not to hammer their domain for nothing. Run at about 14:52–14:55 IST.

**Result: 0 deals pushed. The IFS redirector is still dead: 4 of 4 probes, across both listings, went to the homepage. That makes two dead ticks in a row (g and h), after the partial 7 of 93 at tick f. No IndexNow ping was needed. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Buy Now links on `/deals` page 1 | 37 |
| Unique ids on `/deals/superdeals` | 41 |
| Buy Now ids probed | 4 (3 from `/deals`, 1 from superdeals) |
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
| / | 200 (0.35s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.67s) |

## CEO audit

Run at 14:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,171 = 16,171 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,751 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,751 vs 16,751 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 14:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector:** dead at g and h, after a 7 of 93 partial at f. The cutoff is "under 10% after 11-18". If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source, such as a second DesiDime sweep or more Telegram groups.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **Stage 1 (DesiDime) skips Flipkart `/a/p/b?pid=` links:** a Wildcraft card was lost this way at DESIDIME 11-17h.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 16:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
