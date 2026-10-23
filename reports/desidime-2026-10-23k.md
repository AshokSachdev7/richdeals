# DESIDIME — 2026-10-23k (20:22 IST)

**6 deals pushed (#14468–#14473): 5 Amazon, 1 Flipkart. 12 were rejected because the product-page price was above the card price or there was no buy box. 1 was rejected for missing ld+json and 1 by the GROCERY filter. IndexNow returned HTTP 200 for 9 URLs.**

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` read the `/new` page plus the homepage cards. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link, swapped in our affiliate tag, and deduped `productId` against the live DB.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay .a-price-whole`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Non-Amazon check:** `productLd()` reads the ld+json price and checks for InStock, within ±₹1.
- **Price rule:** a deal is rejected if the page price is more than ₹1 above the card price.
- **MRP check:** if price/MRP ≤ 0.2, the MRP is nulled and the copy carries no % or M.R.P.
- **Re-dedup:** the 6 product IDs were checked against the DB just before the push. There were 0 hits.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk or other-store, dropped (Flipkart LiveShop, Amazon `/s?` saree listing, …) | 9 |
| Resolved to a product | 23 |
| Already in the DB | 3 |
| Fresh | 20 |
| GROCERY filter | −1 |
| No ld+json | −1 |
| Rejected on the product page | −12 |
| **Pushed** | **6** |

## Pushed

The bulk response was `201`, `count: 6`, `created: true` ×6.
- Titles and descriptions are original. Every ₹ value and % was checked against the price and MRP before posting.
- The ZOUK product page showed ₹2 below the card price, so the page price was used.

| # | ID | Deal | Price | MRP |
|---|---|---|---|---|
| 14468 | B092QSVY7Z | Green Soul Seoul mid-back mesh office chair | ₹2,990 | ₹5,980 (50%) |
| 14469 | B00CMU36GQ | Revlon Super Lustrous Lip Gloss, 215 Super Natural | ₹246 | — (ratio, ₹1,299 listed) |
| 14470 | B0HN2BF66J | Desidiya LED rope light, 100 m, warm white | ₹1,999 | — (ratio, ₹19,999 listed) |
| 14471 | B0DGQNLJX7 | ZOUK women's office essential jute tote | ₹1,377 | ₹5,465 (75%) |
| 14472 | B0FLXLZD5D | boAt Enigma Daze women's smartwatch | ₹1,729 | — (ratio, ₹8,999 listed) |
| 14473 | PERGQUTN7SZF4G24 | OSCAR Forever Luxury Aqua & Oud perfume combo, 200 ml (Flipkart) | ₹199 | — |

The links are `dp/<ASIN>?tag=ashoksachdev-21` for Amazon and `/p/itm71f2b7f22cce7?pid=…&affid=djhackraj` for Flipkart.

## Rejected (14)

| ID | Item | Reason |
|---|---|---|
| — | Digihaat Corn Papad | No ld+json |
| B0F9L75CLP | Haldiram's Malai Peda, ₹91 | GROCERY filter (perishable) |
| B0FHHBK75N | Nesugar steamer | Page ₹2,600 vs card ₹1,300 |
| B0H273NRF6 | Elica Kitty chimney | Page ₹11,490 vs card ₹10,041 |
| B0BS1MB671 | Jabra Evolve2 55 | Page ₹15,762 vs card ₹14,186 |
| B0FPRLV5R6 | ENEM kettle | Page ₹1,895 vs card ₹1,751 |
| B0BHCRX6K7 | MSI B650I motherboard | Page ₹21,484 vs card ₹19,535 |
| B0CJ9VPPF2 | Intex 2650 Pro | Page ₹2,160 vs card ₹2,116 |
| B0G5PXZJ71 | Blaupunkt OMG ATOM | Page ₹4,299 vs card ₹3,420 |
| B0DCSFJSNK | Blaupunkt Knightz | Page ₹12,990 vs card ₹10,991 |
| B0GMQG7QM5 | Xiaomi 17 Ultra | Page ₹1,39,999 vs card ₹1,19,999 |
| B0HGG4LRTT | boAt Stone 510 | Page ₹2,499 vs card ₹2,250 |
| B0GL7M6KT4 | LG 43 L minibar | Page ₹10,890 vs card ₹9,071 |
| B0FFTFPYLV | LG 650 L side-by-side fridge | No price and no add-to-cart button |

Most of the gaps (9–20%) look like bank-card prices that DesiDime printed as the deal price.

## Freshness

- **IndexNow:** HTTP 200 for 9 URLs: the 6 new slugs, plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14468–#14473 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the `/boat-enigma-daze-womens-smartwatch-b0flxlzd5d` deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,943 LIVE (13,937 + 6). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14473.
- **Posts (IST 2026-10-23):** 3. The minimum is met. 0 posts lack a cover.
- **Broadcast cursor:** 14467. #14468–#14473 (this batch) are waiting for the external cron. This is normal lag.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
