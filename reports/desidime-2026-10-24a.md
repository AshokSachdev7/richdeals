# DESIDIME — 2026-10-24a (00:15 IST)

**3 deals pushed (#14507–#14509): 2 Amazon plus 1 from the Maharishi Ayurveda brand store via Cuelinks. 7 Amazon cards were rejected on the product page (6 because the page price was above the card price, 1 with no buy box). The script dropped 2 more: a Flipkart price-drift and a JioMart grocery item. IndexNow returned HTTP 200 for 6 URLs.**

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` read the `/new` page plus the homepage cards. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link, swapped in our affiliate tag, and deduped `productId` against the live DB.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Non-Amazon check:** `productLd()` reads the ld+json price and checks for InStock, within ±₹1.
  - On Maharishi, the ld+json price of ₹1,104 maps to the Shopify variant "Pack of 1" (SKU `A1778Q060GD-WHM-1`, 60 tablets).
- **Price rule:** a deal is rejected if the page price is more than ₹1 above the card price.
- **MRP check:** if price/MRP ≤ 0.2, the MRP is nulled and the copy carries no % or M.R.P. The HP sleeve's ratio is 0.208, so its MRP was kept.
- **Re-dedup:** the 3 product IDs were checked against the DB just before the push. There were 0 hits.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Junk or other-store, dropped | 10 |
| Resolved to a product | 19 |
| Already in the DB | 7 |
| Fresh | 12 |
| Script rejects (price-drift, no ld+json) | −2 |
| Rejected on the product page | −7 |
| **Pushed** | **3** |

Several cards were dropped at stage 1 because they were not single products or were tracking landings:

- The Amazon Funzone `/b?node` hub.
- The Flipkart `/DesiDime/p/` Mi trimmer.
- The Flipkart `/dd/p/` Haier geyser.
- The Titan Valerie Aura `/p/itm` link, which had no pid.

## Pushed

The bulk response was `201`, `count: 3`, `created: true` ×3.

- Titles and descriptions are original.
- Every ₹ value and % was checked against the price and MRP before posting.
- The Maharishi copy makes no medical claims.

| # | Store | ID | Deal | Price | MRP |
|---|---|---|---|---|---|
| 14507 | Amazon | B09B2N1T6V | HP 15" water-resistant padded laptop sleeve (14V33AA, black) | ₹457 | ₹2,197 (79%) |
| 14508 | Amazon | B0CL6D8Z4X | Mini low-profile "invisible" Bluetooth earbuds | ₹2,900 | ₹5,999 (52%) |
| 14509 | Maharishi Ayurveda | 8a4b00686c3c | Blissful Sleep herbal tablets, pack of 1 | ₹1,104 | ₹1,200 (8%) |

Links:
- Amazon: `dp/<ASIN>?tag=ashoksachdev-21`.
- Maharishi: Cuelinks `linksredirect.com/?cid=527&source=linkkit&url=…`, with the brand CDN image.

## Rejected (9)

| ID | Item | Reason |
|---|---|---|
| COMGJ75H9TH3ZGTD | Flipkart Alienware x15 R2 | Script price-drift: live ₹2,19,779 vs card ₹2,13,779 |
| 0e50f2517a45 | JioMart Kellogg's oats ₹167 | No ld+json, and it is a grocery item |
| B0FHDBL4S1 | GLUN baby bed sheet, 2-pack | No price, no add-to-cart and no buy-now (card ₹71) |
| B0GYD6YC2N | iFFALCON 75" 75U75 | Page ₹69,999 vs card ₹49,999 |
| B0GYFYMLFX | IFB 222 L fridge | Page ₹20,990 vs card ₹16,740 (same as 10-23l) |
| B0CF5PN648 | SleepyHug mattress | Page ₹8,409 vs card ₹5,768 (fourth tick running) |
| B0HHRB6DQG | Lenovo Idea Tab Pro Gen 2 | Page ₹47,999 vs card ₹41,999 (same as 10-23l) |
| B0GHYPBM5R | NARWAL Freo Z10 Ultra | Page ₹79,990 vs card ₹69,990 (same as 10-23l) |
| B0H7C7NM7V | Lenovo Legion 5 | Page ₹1,62,991 vs card ₹1,50,892 (same as 10-23l) |

DesiDime keeps printing bank-card prices as the deal price. Five of these 9 were also rejected in earlier ticks.

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs: the 3 new slugs, plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14507–#14509 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the `/hp-15-inch-laptop-sleeve-water-resistant-14v33aa-b09b2n1t6v` deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,978 LIVE (13,975 + 3). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14509.
- **Posts (IST 2026-10-24):** 0 so far. The IST day is 15 minutes old, so this is not rot. The CONTENT-SEO cron (`9 */6`) publishes later today. 0 of 426 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14506, caught up through the TG 10-23x batch. #14507–#14509 (this batch) are waiting for the external cron. This is normal lag.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
