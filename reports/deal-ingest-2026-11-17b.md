# DEAL-INGEST (indiafreestuff) tick — 2026-11-17b

Following the redirector-dead rule, the tick probed one fresh IFS Buy Now id before running a full stage 1 sweep. It ran at about 02:53 IST.

**Result: 0 pushed. The IFS redirector still sends every Buy Now link to the homepage, so this is the ninth dry IFS tick in a row. IFS has posted nothing new since tick 11-17a. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` returned 200.
- **Newest id:** `MzA4NDgyMjU5OA==` decodes to 3,084,822,598, the same id as tick 11-17a at 00:53 IST. IFS has posted nothing new in the last two hours.
- **Buy Now probe:** `/?rto=MzA4NDgyMjU5OA==` with the `/deals` Referer returned 302 → `https://www.indiafreestuff.in/`.
- **Load on IFS:** 2 requests, 3s apart. `/deals/superdeals` was not swept because it goes through the same redirector.

No products were guessed from card titles. Without the redirector there is no verifiable merchant URL, so nothing can be priced on the PDP.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.44s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post. The CONTENT-SEO runs at 06:39 and 12:39 IST will cover it.

## Still open

- **IFS source blocked:** every `?rto=` link redirects to the homepage (9 dry ticks since 11-16).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift. It lapses on 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311, #16722.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at 04:53 IST (11-17). Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
