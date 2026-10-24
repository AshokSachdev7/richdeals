# DESIDIME — 2026-10-24f (10:05–10:22 IST)

**6 deals pushed LIVE (#14541–#14546). 4 are Amazon: Storio sound book ₹199, 6-layer tap filter ₹65, Aristocrat Nova backpack ₹288 and Wild Stone Hydra Energy 50ml ₹199. 2 are Blinkit via Cuelinks: Fackelmann Elite tri-ply cookware set ₹1,349 and Ambrane MagSafe 10000mAh ₹799. 4 Amazon candidates failed on the product page. IndexNow returned HTTP 200 for 9 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage, applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and swapped in our affiliate tag. Non-Amazon candidates were checked with `productLd()` (price within ±₹1, InStock). Every productId was deduped against the DB.
- **Second dedup check:** each ASIN and Blinkit prid was also searched in `slug` and `affiliateUrl`, which catches legacy rows with a null productId. Nothing matched.
- **Amazon check:** done in the logged-in Playwright tab (profile richDeals) with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`, 2.6 s apart:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Rule:** a candidate is rejected if the page price is more than ₹1 from the card price, or the page has no buy box.

## Funnel

| Stage | Count |
|---|---|
| Fresh after stage 1 | 13 (8 Amazon, 4 Blinkit, 1 Flipkart) |
| Script SKIP | −2 (Blinkit out of stock, Flipkart price drift) |
| Near-duplicate dropped | −1 (second Ambrane MagSafe listing on Blinkit) |
| Rejected on the Amazon product page | −4 |
| **Pushed** | **6** |

## Pushed

| ID | Store | productId | Item | Price | MRP |
|---|---|---|---|---|---|
| 14541 | Amazon | B0BQC76JB7 | Storio Intelligence sound book | ₹199 | ₹499 (60%) |
| 14542 | Amazon | B0FHBHKDQF | 6-layer activated-carbon tap filter | ₹65 | dropped (p/m 0.065 ≤ 0.2 guard) |
| 14543 | Amazon | B0FPWJX447 | Aristocrat Nova 15L laptop backpack, Dark Blue | ₹288 | ₹999 (71%) |
| 14544 | Amazon | B08TGZX73K | Wild Stone Hydra Energy perfume 50ml | ₹199 | ₹499 (60%) |
| 14545 | Blinkit | a027483c1aa0 | Fackelmann Elite tri-ply cookware set of 4 | ₹1,349 | ₹4,499 (70%) |
| 14546 | Blinkit | 65b0990c99c8 | Ambrane MagSafe 10000mAh power bank | ₹799 | ₹2,999 (73%) |

- **Amazon:** all 4 have a page price equal to the card price, show In stock, and have add-to-cart live. Images come from `m.media-amazon.com` landing hiRes.
- **Blinkit:** `productLd()` read the card price and InStock for both. Images come from `cdn.grofers.com`. Each description notes that delivery depends on the pin code. The existing Ambrane MagSafe pages (#11772 and #12480) are Flipkart listings of different SKUs at ₹1,499 and ₹1,299, so this page does not duplicate them.
- **Copy:** product claims that the card or page title does not support were removed before the push: a fragrance profile, "sturdy pages" and the cookware's layer metals.
- **Push:** the bulk endpoint returned 201 with `count:6`, all `created:true`.
- **Prod:** all 6 pages return 200. The JSON-LD Offer prices are 199, 65, 288, 199, 1349 and 799.

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B0GDQFZBQC | Lenovo IdeaPad Slim 3 i5-13420H 16/512 | ₹73,975 | ₹67,180 |
| B0CPJG92ZS | Samsung 8kg front load WW80T504DAX1TL | ₹34,490 | ₹26,740 |
| B0BYLK9PZC | P.N.Gadgil 1gm 24kt gold ring | ₹15,727 (empty `#availability`) | ₹14,477 |
| B0GYD6YC2N | iFFALCON 75" TV | ₹69,999 | ₹49,999 |

The card prices are bank-offer or coupon prices. The iFFALCON TV was also rejected in 10-24e. The gold ring's card price is stale because the gold rate has moved.

## Script SKIPs and drops

- **Blinkit 6be730a9c2f7, Black+Decker wet/dry vacuum (₹1,799):** out of stock.
- **Flipkart OSCHYQ8GVU9ADNUG, Godrej Interio Curv office chair:** price drift. The card says ₹2,748 and the page says ₹5,199. Also skipped in 10-24e.
- **Blinkit 020e8de9b569, Ambrane Wireless MagSafe 10000mAh (prid 756297, ₹799, no MRP):** dropped as a near-duplicate of prid 697196, which has the same capacity, the same price and the same store. One page is enough for that offer.

## Freshness

- **IndexNow:** HTTP 200 for 9 URLs: the 6 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR revalidates every 1800 s, so the batch appears within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already reflects the batch.

## CEO audit (10:22 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,015 LIVE (+6). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14546.
- **Posts (IST 2026-10-24):** 2, meeting the daily minimum. The next CONTENT-SEO tick (12:39) can ship #3. 0 of 428 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14540. The DB maximum is 14546 because this batch was just pushed. The external broadcast cron picks it up on its next run, so this is not rot.
- **Unpushed commits:** 0 before this report.
- **Still open:** 47 shadowed same-ASIN duplicate pages are waiting for a price sync (from TG 10-24j).
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
