# DEAL-INGEST (indiafreestuff) tick — 2026-11-17c

Following the redirector-dead rule, the tick probed one IFS Buy Now id before running a full stage 1 sweep. It ran at about 04:52 IST.

**Result: 0 pushed. The IFS redirector still sends every Buy Now link to the homepage, so this is the tenth dry IFS tick in a row. IFS has posted nothing new since tick 11-17a. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` returned 200.
- **Newest id:** `MzA4NDgyMjU5OA==` decodes to 3,084,822,598, the same id as ticks 11-17a (00:53 IST) and 11-17b (02:53 IST). IFS has posted nothing new in four hours.
- **Buy Now probe:** `/?rto=MzA4NDgyMjU5OA==` with the `/deals` Referer returned 302 → `https://www.indiafreestuff.in/`.
- **Load on IFS:** 2 requests, 3s apart. `/deals/superdeals` was not swept because it goes through the same redirector.

No products were guessed from card titles. Without the redirector there is no verifiable merchant URL, so nothing can be priced on the PDP.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.56s) |

## CEO audit

Run at 04:53 IST.

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

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source dead:** 10 dry ticks since 11-16 ~11:00 IST. The memory rule says to source elsewhere if it is still dead after 11-17. DesiDime (every 2 h) and Telegram (hourly) are carrying ingest; this tick keeps a one-probe check so a recovery is caught.
- **#1411 history gap:** a price change was written without a priceHistory row. Same root as same-price confirms writing no row (94.2% of LIVE deals have no priceValidUntil).
- **#11896:** Flipkart drift; lapses 11-18.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 06:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
