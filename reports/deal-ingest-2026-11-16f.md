# DEAL-INGEST indiafreestuff tick — 2026-11-16f

Run at about 18:55 IST (13:25 UTC). As in ticks d and e, this tick probed one fresh `?rto=` id before running the full stage 1 sweep.

**Result: 0 pushed. IFS's Buy Now redirector still sends every `?rto=` id to the IFS homepage. This is the fifth dry tick in a row (b–f). The full sweep was skipped, so their domain was not hammered.**

## Probe

- `https://www.indiafreestuff.in/deals` page 1 returned 200.
- The newest decoded id is **3,084,754,827** (`MzA4NDc1NDgyNw==`). That is 26,664 above tick e's newest (3,084,728,163), on the usual 1,111 grid, so IFS is still publishing deals.
- After a 3s gap, a curl of `/?rto=MzA4NDc1NDgyNw==` with a browser UA and the `/deals` Referer returned **302 → `https://www.indiafreestuff.in/`**. Same outcome as ticks b–e.
- Two requests were made to their domain in total, at least 2.5s apart. `/deals/superdeals` was not swept, because the redirector fails for every id regardless of listing.

No products were guessed from card titles. IFS card prices are wrong about 68% of the time, and without a resolved store URL no price can be verified.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| / | 200 | 0.25s |
| /offers | 200 | 0.09s |
| /blog | 200 | 0.73s |
| /sitemap.xml | 200 | 0.08s |
| /feed.xml | 200 | 0.11s |
| /api/deals | 200 | 0.12s |
| /llms.txt | 200 | 0.63s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,125 = 16,125 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,705 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,703 vs 16,705 | OK. The external broadcast cron is catching up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** five dry ticks since about 11:00 IST. If it is still dead after 11-17, DesiDime and Telegram carry the deal volume and IFS ticks stay probe-only.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666 (GM Balin, "Only 1 left"), #10311 (CELLO cooler).
- **#16224 slug:** kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at 20:53 IST.
