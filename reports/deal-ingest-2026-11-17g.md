# DEAL-INGEST (indiafreestuff) tick — 2026-11-17g

The tick fetched the IFS `/deals` listing (32 cards) and probed the card Buy Now links (`?rto=` base64 ids) one at a time with `curl -s -o NUL -w '%{redirect_url}'`, waiting about 3 s between requests. All three ids probed (`MzA4NDg1MTQ4NA==`, `MzA4NDg0OTI2Mg==`, `MzA4NDg0ODE1MQ==`) returned 302 to `https://www.indiafreestuff.in/`, the homepage. Per the redirector-dead rule, the full stage 1 sweep (`/deals` pages 1–3 plus `/deals/superdeals`) was skipped so as not to hammer their domain for nothing. Run at about 12:57–12:59 IST.

**Result: 0 deals pushed. The IFS redirector is dead again for the newest cards (3 of 3 probed go to the homepage). No IndexNow ping was needed. Every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards on `/deals` page 1 | 32 |
| Buy Now ids probed | 3 |
| Resolved to the homepage (dead) | 3 |
| Resolved to a store | 0 |
| Full sweep run | No (probe failed) |
| Fresh candidates | 0 |

## Candidates

None. Nothing resolved to a product, so no PDP was read and nothing was pushed.

## Freshness

- **IndexNow:** not run, because nothing was pushed.
- **`sitemap.xml` / `llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 12:59 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,163 = 16,163 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,743 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,743 vs 16,743 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 12:59 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector:** partial at 11-17f (7 of 93), dead again for the newest cards at 11-17g (0 of 3). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source; DesiDime and Telegram are carrying the deal flow today.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 14:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
