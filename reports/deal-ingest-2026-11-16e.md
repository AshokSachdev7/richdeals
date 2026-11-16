# DEAL-INGEST indiafreestuff tick — 2026-11-16e

Run at about 16:55 IST (11:25 UTC). As in tick d, this tick probed one fresh `?rto=` id before running the full stage 1 sweep.

**Result: 0 pushed. IFS's Buy Now redirector still sends every `?rto=` id to the IFS homepage. This is the fourth dry tick in a row (b, c, d, e). The full sweep was skipped, so their domain was not hammered.**

## Probe

- `https://www.indiafreestuff.in/deals` page 1 returned 200.
- The newest decoded id is **3,084,728,163** (`MzA4NDcyODE2Mw==`). That is 6,666 above tick d's newest (3,084,721,497), so IFS is still publishing deals, on the usual 1,111 grid.
- After a 3s gap, a curl of `/?rto=MzA4NDcyODE2Mw==` with a browser UA and the `/deals` Referer returned **302 → `https://www.indiafreestuff.in/`**. Same outcome as ticks b, c and d.
- Two requests were made to their domain in total, at least 2.5s apart. `/deals/superdeals` was not swept, because the redirector fails for every id regardless of listing.

No products were guessed from card titles. IFS card prices are wrong about 68% of the time, and without a resolved store URL no price can be verified.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| / | 200 | 0.29s |
| /offers | 200 | 0.11s |
| /blog | 200 | 0.73s |
| /sitemap.xml | 200 | 0.11s |
| /feed.xml | 200 | 0.12s |
| /api/deals | 200 | 0.14s |
| /llms.txt | 200 | 0.64s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,114 = 16,114 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,694 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,692 vs 16,694 | OK. The external cron is working through the DesiDime e batch. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- **The IFS source is blocked** for the fourth tick running. The next IFS tick (18:53 IST) probes one id again. If it is still dead after 11-17, find a replacement source; until then TG and DesiDime carry the deal flow.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, #360, B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY, #16678 (B0D7MQ6WVG), #16682 (B0FXVPK6R7), B0FM8D7C1Z.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
