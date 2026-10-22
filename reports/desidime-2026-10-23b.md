# DESIDIME — 2026-10-23b (02:20 IST)

**1 Amazon deal pushed (ID 14254, Sneaker & Shoe Cleaner Wipes 80-pack at ₹49). 5 fresh candidates rejected (4 price drift, 1 out of stock). IndexNow returned HTTP 200 for 4 URLs. The new deal page returns 200 on prod.**

Stage 1 (`ingest-desidime.mjs`) read `/new` and the homepage cards, applied the JUNK/GROCERY filters, resolved each `visit.desidime.com` Buy Now to the merchant URL, swapped in our affiliate tags and deduped by productId against the DB. Two cards resolved to non-products: a District × Nirula's app deep link and an Amazon rewards-ad page. All 6 fresh candidates were Amazon ASINs, so stage 1 had no ld+json verification to run on them. Each was read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…?th=1')`: price from `.priceToPay .a-price-whole`, MRP from `.basisPrice .a-offscreen`, stock from `#availability` plus `#add-to-cart-button`, cross-checked against `#centerCol`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 28 |
| Dropped by stage 1 (junk, other store, non-product) | 14 |
| Resolved to a single product | 14 |
| Already in the DB | 8 |
| Fresh | 6 |
| Rejected after PDP read | 5 |
| **Pushed** | **1** |

## Pushed

| Product ID | Deal | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| B0GX76Y5PQ | Sneaker & Shoe Cleaner Wipes, pack of 80 | Amazon | ₹49 | — | — |

- **MRP guard:** the PDP shows an M.R.P. of ₹299. That implies 84% off and fails the 0.2 price/MRP ratio, so MRP and discount are null.
- **Image:** `51Y01GdpCUL` from `#landingImage`, with the `._SY395_` size segment stripped.
- **Affiliate:** `/dp/B0GX76Y5PQ?tag=ashoksachdev-21`.
- **Copy:** original title and description. The validator confirmed every ₹ amount equals the price; there are no "% off" claims.
- **Bulk response:** `count:1`, `created:true`, so no slug restore was needed.

## Rejected

| Item | Card | PDP now | Reason |
|---|---|---|---|
| B0GR9BFTYK Greenchef Ripple Pro mixer grinder | ₹1,955 | ₹3,599 / ₹6,665 | Price drift |
| B08HX2RGHM Mango Cool Master THK35 cooler | ₹2,597 | ₹5,492 / ₹7,999 | Price drift. The card also said "Delhi available" |
| B0H6QCSMJK Lenovo LOQ Essential, Ryzen 7 / RTX 4050 | ₹1,07,740 | ₹1,14,990 / ₹1,75,590 | Price drift. The card price is most likely after a bank offer |
| B0DGX8D44F Interio by Godrej Curv mesh chair | ₹4,420 | ₹5,199 / ₹16,500 | Price drift |
| B0HK3HB3V7 Set Wet Luxury perfume, 18 ml | ₹49 | No price | Currently unavailable, no add-to-cart |

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs: the new slug plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800, so the deal will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists the deal.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new deal page returns 200.
- **Posts (IST 2026-10-23):** 1, from CONTENT-SEO 10-23a. This is not rot: the IST day is 140 minutes old, and the next CONTENT-SEO run is at 06:39 IST. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,724 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14254.
- **Broadcast cursor:** 14253 against a highest ID of 14254. The gap is this tick's deal, which the external cron will pick up.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
