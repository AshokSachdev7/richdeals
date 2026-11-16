# DEAL-INGEST (indiafreestuff) tick — 2026-11-17a

Probed one fresh IFS Buy Now id before running the full stage 1 sweep, per the redirector-dead rule. Run at about 00:53 IST.

**Result: 0 pushed. The IFS redirector still sends every Buy Now home, so this is the eighth dry IFS tick in a row. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` returned 200.
- **Newest id:** `MzA4NDgyMjU5OA==` decodes to 3,084,822,598. That is +33,330 (30 × 1,111) since tick h's 3,084,789,268, so IFS is still posting.
- **Buy Now probe:** `/?rto=MzA4NDgyMjU5OA==` with the `/deals` Referer returned 302 → `https://www.indiafreestuff.in/`.
- **Load on IFS:** 2 requests, 3s apart. `/deals/superdeals` was not swept because it uses the same redirector.

No products were guessed from card titles. Without the redirector there is no verifiable merchant URL, so nothing can be priced on the PDP.

The redirector has now been dead since 11-16. The Telegram (13 groups) and DesiDime ticks are carrying deal intake. If it is still dead after today, the IFS tick should drop to the single probe and nothing more, as it already does.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.50s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.62s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,141 = 16,141 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,721 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,721 vs 16,721 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (8 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at 02:53 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
