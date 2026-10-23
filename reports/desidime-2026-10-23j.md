# DESIDIME — 2026-10-23j (18:22 IST)

**9 Amazon shoe deals pushed (#14432–#14440). 4 were rejected for a price that did not match, a wrong product, or no price. 1 grocery item was filtered out. IndexNow returned HTTP 200 for 12 URLs.**

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` read the `/new` page plus the homepage cards. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link, swapped in our affiliate tag, and deduped `productId` against the live DB.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay .a-price-whole`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Price rule:** a deal is rejected if the page price differs from the card price by more than ₹1, or there is no add-to-cart button.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk or other-store, dropped | 9 |
| Resolved to a product | 22 |
| Already in the DB | 8 |
| Fresh (all Amazon) | 14 |
| GROCERY filter (Horlicks B0D9Q46MSX) | −1 |
| Rejected on the product page | −4 |
| **Pushed** | **9** |

## Pushed

The bulk response was `201`, `count: 9`, `created: true` ×9.
- The links are `dp/<ASIN>?tag=ashoksachdev-21`.
- Titles and descriptions are original. Every ₹ value and % was checked against the price and MRP before posting.
- All 9 page prices matched the DesiDime card prices exactly.

| # | ASIN | Deal | Price | MRP |
|---|---|---|---|---|
| 14432 | B0BR5K1YX3 | Woodland men's sneaker | ₹2,595 | ₹4,495 (42%) |
| 14433 | B08BXFHKWG | ASICS Fuzor B casual shoes | ₹2,039 | ₹4,999 (59%) |
| 14434 | B0FCY81FH2 | ASICS Jolt 5 running shoes (only 1 left) | ₹2,474 | ₹5,499 (55%) |
| 14435 | B0DS66HDZM | ASICS Jolt 5 running shoes, other colour | ₹2,699 | ₹5,499 (51%) |
| 14436 | B0GPR9BKJ1 | adidas Air-yardfun M | ₹1,443 | ₹3,799 (62%) |
| 14437 | B0CPVPBBG3 | adidas Basenew | ₹1,634 | ₹4,299 (62%) |
| 14438 | B094QB2BFX | adidas Run Steady M, blue | ₹2,519 | ₹6,299 (60%) |
| 14439 | B0D9YF4X1P | adidas Runally M | ₹2,349 | ₹4,999 (53%) |
| 14440 | B07LBFPDNX | Woodland men's leather sneaker | ₹1,499 | ₹2,995 (50%) |

## Rejected

| ASIN | Item | Reason |
|---|---|---|
| B0F9S93RK5 | GRECIILOOKS polo | Page ₹549 vs card ₹468. The card price needs Prime Reward plus an ICICI card offer. |
| B0D8QJ52PS | "Godrej Vurv chair" | The ASIN is an Interio EWA 4-door wardrobe at ₹23,490, not the chair at ₹20,566. Wrong product. |
| B084685MT1 | Sony HT-S20R soundbar | Page ₹13,989 vs card ₹12,590 |
| B0F1T6XXYG | ViewSonic VX2779A monitor | No buy-box price and no add-to-cart button. This is the third rejection after 10-23h and 10-23i. |
| B0D9Q46MSX | Horlicks | GROCERY filter (low-ticket FMCG) |

## Freshness

- **IndexNow:** HTTP 200 for 12 URLs: the 9 new slugs, plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14432–#14440 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the `/woodland-mens-sneaker-b0br5k1yx3` deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,910 LIVE (13,901 + 9). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14440.
- **Posts (IST 2026-10-23):** 3. The minimum is met. 0 posts lack a cover.
- **Broadcast cursor:** 14431. #14432–#14440 (this batch) are waiting for the external cron. This is normal lag.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
