# DEAL-INGEST (indiafreestuff) tick — 2026-11-17l

The tick fetched the IFS `/deals` and `/deals/superdeals` listings (both HTTP 200). It probed four distinct card Buy Now links (`?rto=` base64 ids) from the top of both listings, one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. All four returned 302 to `https://www.indiafreestuff.in/`, the IFS homepage. Per the redirector-dead rule, the full stage 1 sweep was skipped so as not to load their domain for no result. Run at about 22:54–22:55 IST.

**Result: 0 deals pushed, because the IFS redirector is still dead: 4 of 4 probes went to the homepage. This is the sixth dead tick in a row (g, h, i, j, k and l), after the partial 7 of 93 at tick f. No IndexNow ping was needed. Every CEO-audit check is green, the broadcast cursor is caught up, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Listings fetched | 2 (`/deals` 200, `/deals/superdeals` 200) |
| Buy Now ids probed | 4 distinct (`MzA4NDk0MTQ3NQ==` is the top card on both listings) |
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
| /offers | 200 (0.12s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

Run at 22:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,190 = 16,190 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,770 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,770 vs 16,770 (cursor written 22:54 IST) | OK. Caught up; the DESIDIME 11-17l push (#16767–#16770) has gone out. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 22:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i, j, k and l, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747, #16767.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 00:53 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
