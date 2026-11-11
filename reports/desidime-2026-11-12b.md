# DesiDime ingest — 2026-11-12b

Stage 1 `ingest-desidime.mjs` (cards only, no per-deal fetch, JUNK/GROCERY filters, visit.desidime.com resolve). Amazon verified in logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart).

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Junk / non-product dropped | 15 |
| Resolved to merchant URL | 20 |
| Already in DB (pushed/synced in IFS 11-12a, price current) | 8 |
| Seen <24h, rejected (Jiomart hing, movie voucher, Klook sale) | 3 |
| Fresh (all Amazon) | 9 |
| PDP-verified + pushed LIVE | **8** |
| Rejected at PDP | 1 |

Push: HTTP 201, `count:8`, 8/8 `created:true`, readback 8/8 LIVE (ids 16372–16379). Affiliate: Amazon `/dp/ASIN?tag=…-21`.

## Accepted (card vs PDP)

| ASIN | Deal | Card ₹ | PDP ₹ | MRP | Off |
|---|---|---|---|---|---|
| B0GVFPHS69 | Decorative Brooch Pins, Pack of 20 | 94 | 94 | — (PDP showed per-unit 4.70) | — |
| B0HC3N7G4R | USHA Instano 5L 3000W Instant Water Heater | 2899 | 2899 | 5999 | 52% |
| B0GVNHJ3LY | Toshiba 40" QLED Smart TV 40V37SP | 23271 | **23990** | 32999 | 27% |
| B0H3PM4CR6 | Lenovo IdeaPad Slim 3 (Core Ultra 7 355, 16/512) | 109990 | **114990** | 221290 | 48% |
| B0FCXX1SHC | Action Women's Platform Block-Heel Sandals | 276 | **293** | 999 | 71% |
| B0BZP2H373 | Sony WH-1000XM5 | 16989 | **19989** | 34990 | 43% |
| B0GP22GR62 | adidas Skate Smart M Sneakers | 1090 | **1209** | 3999 | 70% |
| B0FYGSLVRW | SINGER Leo Rapid 5.9L 3000W Instant Water Heater | 2251 | **3199** | — (PDP bogus 319900) | — |

6/8 card prices stale (DesiDime card = post-time price). Published PDP price only. Toshiba + sandals "Only 1 left".

## Rejected

- B0FK3Y39BZ SignoraWare borosilicate container: no buybox price, no add-to-cart (AOD only).

## Freshness

- IndexNow: **HTTP 200, 11 urls** (8 deals + 3 hubs).
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,810 = 15,810 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,338 vs 16,379 (lag 41 = this tick + IFS 11-12a; external cron drains) | OK |
| Unpushed commits | 0 | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
