# DESIDIME — 2026-10-23c (04:19 IST)

**0 deals pushed. All 4 fresh candidates were the same Amazon items rejected in 10-23b, re-listed on DesiDime at the same card prices. A fresh product-page read confirmed every one still drifts. No IndexNow ping, since nothing was pushed or repriced.**

Stage 1 (`ingest-desidime.mjs`) read `/new` and the homepage cards, applied the JUNK/GROCERY filters, resolved each `visit.desidime.com` Buy Now to the merchant URL, swapped in our affiliate tags and deduped by productId against the DB. All 4 fresh candidates were Amazon ASINs, so stage 1 had no ld+json verification to run. Each was re-read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…?th=1')`: price from `.priceToPay .a-price-whole`, MRP from `.basisPrice .a-offscreen`, stock from `#availability` plus `#add-to-cart-button`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 26 |
| Dropped by stage 1 (junk, other store, non-product) | 13 |
| Resolved to a single product | 13 |
| Already in the DB | 9 |
| Fresh | 4 |
| Rejected after PDP read | 4 |
| **Pushed** | **0** |

## Rejected

| Item | Card | PDP now | Reason |
|---|---|---|---|
| B0GR9BFTYK Greenchef Ripple Pro mixer grinder | ₹1,955 | ₹3,599 / ₹6,665, in stock | Price drift (10-23b repeat) |
| B08HX2RGHM Mango Cool Master THK35 cooler | ₹2,597 | ₹5,492 / ₹7,999, only 1 left | Price drift. The card also said "Delhi available" (10-23b repeat) |
| B0H6QCSMJK Lenovo LOQ Essential, Ryzen 7 / RTX 4050 | ₹1,07,740 | ₹1,14,990 / ₹1,75,590, in stock | Price drift. The card price is most likely after a bank offer (10-23b repeat) |
| B0DGX8D44F Interio by Godrej Curv mesh chair | ₹4,420 | ₹5,199 / ₹16,500, only 1 left | Price drift (10-23b repeat) |

These 4 cards will keep showing as "fresh" on every DesiDime tick, because a rejected item never reaches the DB. Each re-read costs one PDP fetch.

## Freshness

- **IndexNow:** not pinged, since no slugs were pushed or repriced.
- **Sitemap and `llms.txt`:** unchanged by this tick.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-23):** 1, from CONTENT-SEO 10-23a. This is not rot: the IST day is 259 minutes old, and the next CONTENT-SEO run is at 06:39 IST. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, equal to the highest deal ID. Nothing is waiting.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
