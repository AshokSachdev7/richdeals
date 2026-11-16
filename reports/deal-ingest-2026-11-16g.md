# DEAL-INGEST (indiafreestuff) tick — 2026-11-16g

The tick probed one fresh IFS Buy Now id before running the full stage 1 sweep, per the redirector-dead rule. Run at about 20:53 IST.

**Result: 0 deals pushed. The IFS `?rto=` redirector still sends every Buy Now to the homepage, so there is no merchant URL to verify. This is the sixth dry IFS tick in a row. Every CEO-audit check is green, and all 9 session crons are armed.**

## Probe

- **Listing:** `https://www.indiafreestuff.in/deals` page 1 returned **200**.
- **Newest id:** `MzA4NDc3MjYwMw==` decodes to **3,084,772,603**. That is 17,776 (16 × 1,111) above tick f's newest, 3,084,754,827, so IFS is still posting about 16 deals per 2 hours.
- **Buy Now probe:** `https://www.indiafreestuff.in/?rto=MzA4NDc3MjYwMw==` with a browser UA and the `/deals` Referer returned **302 → `https://www.indiafreestuff.in/`**.
- **Requests to IFS:** 2, spaced 3s apart. `/deals/superdeals` was not swept, since its Buy Now links go through the same redirector.

No products were guessed from card titles. Without the resolved merchant URL there is no product id to verify on a PDP, so nothing was pushed.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.75s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,131 = 16,131 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,711 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,711 vs 16,711 | OK. Caught up; #16708–#16711 have been broadcast. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (checked at 20:52 IST) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (sixth dry tick). If it is still dead after 11-17, IFS ticks stay probe-only and DesiDime + Telegram carry ingest.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678, #16682
  - #16666 (GM Balin, "Only 2 left")
  - #10311 (CELLO cooler)
- **#16224 slug:** kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST (IFS) run is at 22:53 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
