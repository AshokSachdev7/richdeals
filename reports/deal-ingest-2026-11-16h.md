# DEAL-INGEST (indiafreestuff) tick — 2026-11-16h

Probed one fresh IFS Buy Now id before running the full stage 1 sweep, per the redirector-dead rule. Run at about 22:54 IST.

**Result: 0 pushed. The IFS redirector still sends every Buy Now home, so this is the seventh dry IFS tick in a row. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` returned 200.
- **Newest id:** `MzA4NDc4OTI2OA==` decodes to 3,084,789,268. That is +16,665 (15 × 1,111) since tick g's 3,084,772,603, so IFS is still posting.
- **Buy Now probe:** `/?rto=MzA4NDc4OTI2OA==` with the `/deals` Referer returned 302 → `https://www.indiafreestuff.in/`.
- **Load on IFS:** 2 requests, 3s apart. `/deals/superdeals` was not swept because it uses the same redirector.

No products were guessed from card titles. Without the redirector there is no verifiable merchant URL, so nothing can be priced on the PDP.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,137 = 16,137 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,717 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,717 vs 16,717 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (7 dry ticks since 11-16). Per the memory rule, if it is still dead after 11-17, IFS tick slots should source elsewhere (TG and DesiDime carry the load meanwhile).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST (IFS) run is at 00:53 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
