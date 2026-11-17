# DEAL-INGEST (indiafreestuff) tick — 2026-11-17k

The tick fetched the IFS `/deals` and `/deals/superdeals` listings (both HTTP 200). It probed the two newest card Buy Now links (`?rto=` base64 ids) on each listing, one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. All four returned 302 to `https://www.indiafreestuff.in/`, the IFS homepage. Per the redirector-dead rule, the full stage 1 sweep was skipped so as not to load their domain for no result. Run at about 20:53–20:54 IST.

**Result: 0 deals pushed, because the IFS redirector is still dead: 4 of 4 probes went to the homepage. This is the fifth dead tick in a row (g, h, i, j and k), after the partial 7 of 93 at tick f. No IndexNow ping was needed. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Listings fetched | 2 (`/deals` 200, `/deals/superdeals` 200) |
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
| / | 200 (0.26s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.82s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.39s) |
| /llms.txt | 200 (0.76s) |

## CEO audit

Run at 20:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,184 = 16,184 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,764 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,762 vs 16,764 (cursor written 19:09 IST) | OK. The 2-deal gap is the DESIDIME 11-17k push (#16763–#16764, about 20:48 IST). The external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 20:54 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met, under the cap of 4.

## Still open

- **IFS redirector:** dead at g, h, i, j and k, after a 7 of 93 partial at f. The next probe is the 22:53 IST tick. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 22:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
