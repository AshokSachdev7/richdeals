# DESIDIME — 2026-10-23d (06:19 IST)

**0 deals pushed. DesiDime's listing is unchanged since 10-23c: all 4 fresh Amazon rows are the same price-drift rejects, and their product-page prices have not moved. No IndexNow ping, since nothing was pushed or repriced.**

Stage 1 (`ingest-desidime.mjs`) swept `/new` and the homepage, applied the JUNK and GROCERY filters, resolved `visit.desidime.com` outbound links, swapped in our affiliate tags and deduped by productId against the DB.

Every Amazon price was read again in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…?th=1')`:
- **Price:** `#centerCol .priceToPay .a-price-whole`.
- **MRP:** `.basisPrice .a-offscreen`.
- **Stock:** `#availability` plus `#add-to-cart-button`.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 26 |
| Dropped as junk or other-store | 13 (includes the Amazon rewards `/h/rewards/` ad) |
| Resolved to a product | 12 |
| Already in the DB | 8 |
| Fresh (all Amazon), read on the product page | 4 |
| Rejected after the product-page read | 4 |
| **Pushed** | **0** |

## Rejected

All 4 were also rejected in 10-23c. The product-page prices are exactly the same as then.

| Item | Card | Product page now | Reason |
|---|---|---|---|
| Greenchef Ripple Pro mixer B0GR9BFTYK | ₹1,955 | ₹3,599 / ₹6,665, in stock | Price drift |
| Mango Thunder Plus cooler B08HX2RGHM | ₹2,597 | ₹5,492 / ₹7,999, 1 left | Price drift (the card price was a Delhi-only offer) |
| Lenovo LOQ Essential R7 B0H6QCSMJK | ₹1,07,740 | ₹1,14,990 / ₹1,75,590, in stock | Price drift |
| Godrej Interio Curv chair B0DGX8D44F | ₹4,420 | ₹5,199 / ₹16,500, 1 left | Price drift |

## Freshness

- **IndexNow:** not pinged, since no slugs were pushed or repriced.
- **Sitemap and `llms.txt`:** unchanged by this tick.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-23):** 1, from CONTENT-SEO 10-23a. This is not rot: the next CONTENT-SEO run is at 06:39 IST. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, equal to the highest deal ID.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
