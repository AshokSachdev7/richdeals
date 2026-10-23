# DESIDIME — 2026-10-23g (12:20 IST)

**5 deals pushed (#14308–#14312). 6 fresh candidates were rejected on the product page: 4 for price drift, 1 unavailable, and 1 ₹1 sample that now sells at ₹115. IndexNow returned HTTP 200 for 8 URLs.**

Stage 1 was `apps/api/scripts/ingest-desidime.mjs`, run on `/new` plus the homepage. All fresh candidates this tick were Amazon.

Prices were read in Playwright tab 1 (the logged-in richDeals profile) with an in-page `fetch('/dp/…?th=1&psc=1')`:
- **Price:** `#centerCol .priceToPay .a-price-whole`.
- **MRP:** `.basisPrice .a-offscreen`.
- **Stock:** `#availability` plus `#add-to-cart-button`.
- **Image:** `#landingImage` `data-old-hires`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 31 |
| Junk, other-store or non-product drops | 15 (12 junk/other-store, plus 3 Flipkart links that did not resolve to a usable product page: PUMA backpack, Voltas Beko washer (home-page link) and Hisense AC) |
| Resolved to a product | 16 |
| Already in the DB | 5 |
| Fresh, checked on the product page | 11 |
| Rejected after the product-page read | 6 |
| **Pushed** | **5** |

## Pushed

Every deal below had add-to-cart on its product page, and every link is `dp/<ASIN>?tag=ashoksachdev-21` (the source tag `desidime01-21` was stripped).

| # | Deal | Card | Product page |
|---|---|---|---|
| 14308 | `inalsa-500w-mixer-grinder-3-stainless-steel-jars-b0fb8mp7hc` | ₹1,664 | ₹1,664 / ₹4,695, 65% off |
| 14309 | `milton-comet-1000-stainless-steel-water-bottle-1-litre-black-b0cxnsccvw` | ₹226 | ₹226 / ₹439, 49% off |
| 14310 | `milton-drift-1000-stainless-steel-water-bottle-950ml-set-of-3-b0dczh69pp` | ₹581 | ₹581 / ₹1,165, 50% off |
| 14311 | `portronics-my-buddy-k-portable-laptop-stand-grey-b00eu6txc6` | ₹394 | ₹394. MRP ₹1,999 nulled (ratio ≤ 0.2) |
| 14312 | `boat-nirvana-crown-anc-tws-earbuds-blazing-red-b0g2s1mzrx` | ₹2,280 | ₹2,199 / ₹9,990, 78% off. The page is **below** the card, so the deal was published at the verified ₹2,199. |

The bulk response was `count: 5`, `created: true` ×5. Titles and descriptions are original rewrites. Before posting, the push script checked every ₹ value and % against the price and MRP.

## Rejected

| Item | Card | Product page now | Reason |
|---|---|---|---|
| Longway Superb 35 L geyser B08BXTBNXT | ₹4,104 | ₹4,559 / ₹9,269 | Price drift |
| Lenovo Idea Tab with pen B0HBBGL6C2 | ₹20,999 | ₹23,999 / ₹53,000 | Price drift (the card price relies on a bank offer) |
| Livpure Smart Ortho DUOS-X mattress B0D7HYFVRT | ₹3,600 | ₹3,999 / ₹9,585 | Price drift |
| Mango Cool master Thunder Plus cooler B08HX2RGHM | ₹2,597 ("Delhi available") | ₹5,492 / ₹7,999 | Price drift, and the card price was location-locked |
| pTron Dynamo Spark power bank B0CTHYRZKM | ₹649 | no price, no add-to-cart | Unavailable |
| Acnestar pimple patch B0GW8XGTBQ | ₹1 ("Amazon Sample") | ₹115 / ₹250 | Sample offer is gone. The sticker is drift. |

The 5 candidates already in the DB were not re-read, because stage 1 does not list which productIds it skipped.

## Freshness

- **IndexNow:** HTTP 200 for 8 URLs: 5 pushed slugs, plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14308–#14312 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already reflects the deals.
- **Prod:** the boAt deal page returns 200, and the `/api/deals` total is 13,782.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,782 LIVE = API total. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14312.
- **Posts (IST 2026-10-23):** 2. The minimum is met. 0 posts lack a cover and 0 lack SEO fields. CONTENT-SEO runs at 12:39.
- **Broadcast cursor:** 14307. #14308–#14312 are waiting for the external broadcast cron.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
