# DEAL-INGEST (indiafreestuff) tick — 2026-11-17e

Following the redirector-dead rule, the tick probed one IFS Buy Now id before running a full stage 1 sweep. It ran at about 08:53 IST.

**Result: 0 pushed. IFS has posted a new deal since tick 11-17d, but the redirector still sends every Buy Now link to the homepage, so this is the twelfth dry IFS tick in a row. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` returned 200.
- **Newest id:** `MzA4NDgyMzcwOQ==` decodes to 3,084,823,709. That is newer than 3,084,822,598, the id seen in ticks 11-17a to 11-17d, so IFS is posting again; the card is timestamped 08:51 IST.
- **Buy Now probe:** `/?rto=MzA4NDgyMzcwOQ==` with the `/deals` Referer returned 302 → `https://www.indiafreestuff.in/`.
- **Load on IFS:** 2 requests, 3s apart. `/deals/superdeals` was not swept, because it goes through the same redirector.

No products were guessed from card titles. Without the redirector there is no verifiable merchant URL, and IFS card prices are wrong about 68% of the time, so nothing can be priced on the PDP.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.88s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.76s) |

## CEO audit

Run at 08:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,143 = 16,143 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,723 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,723 vs 16,723 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 08:50 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** the redirector has been down since 11-16 at about 11:00 IST, and is still dead even though IFS is posting again. DesiDime and Telegram carry ingest. If it is still dead after 11-17, the IFS slot should move to another source rather than keep probing.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 10:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
