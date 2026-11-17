# DEAL-INGEST (indiafreestuff) tick — 2026-11-17j

The tick fetched the IFS `/deals` and `/deals/superdeals` listings (both HTTP 200) and probed the two newest card Buy Now links (`?rto=` base64 ids) on each, one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. All four returned 302 to `https://www.indiafreestuff.in/`, the homepage. Per the redirector-dead rule, the full stage 1 sweep was skipped so as not to hammer their domain for nothing. Run at about 18:53–18:55 IST.

**Result: 0 deals pushed. The IFS redirector is still dead: 4 of 4 probes, across both listings, went to the homepage. That makes four dead ticks in a row (g, h, i and j), after the partial 7 of 93 at tick f. No IndexNow ping was needed. Every CEO-audit check is green, and all 9 session crons are armed.**

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
| / | 200 (0.27s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.19s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.65s) |

## CEO audit

Run at 18:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,181 = 16,181 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,761 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,761 vs 16,761 | OK. Caught up at 18:54 IST; the DESIDIME 11-17j push (#16759–#16761) has gone out. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 18:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i and j, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Minor:** the Fujifilm #10710 title shows "₹45999" without a thousands comma.
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 20:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
