# DESIDIME — 2026-10-24e (08:18–08:27 IST)

**4 deals pushed LIVE (#14537–#14540): 3 Amazon (KASHIVAL toiletry bags ₹99, SMART PICKS puzzle ₹62, boAt PB401 power bank ₹1,399) and 1 Blinkit via Cuelinks (Portronics Luxcell MagSafe power bank ₹799). 8 Amazon candidates failed on the product page. IndexNow returned HTTP 200 for 7 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage, applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and swapped in our affiliate tag. Non-Amazon candidates were checked with `productLd()` (price within ±₹1, InStock). Every productId was deduped against the DB.
- **Amazon check:** done in the logged-in Playwright tab (profile richDeals) with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`, 2.6 s apart:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Rule:** a candidate is rejected if the page price is more than ₹1 from the card price, or the page has no buy box.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 30 |
| Junk or other-store dropped | −13 |
| Product-resolved | 17 |
| Already in the DB | −3 |
| Fresh | 14 (11 Amazon, 1 Blinkit, 2 Flipkart) |
| Script SKIP (Flipkart price drift) | −2 |
| Rejected on the Amazon product page | −8 |
| **Pushed** | **4** |

## Pushed

| ID | Store | productId | Item | Price | MRP |
|---|---|---|---|---|---|
| 14537 | Amazon | B0G3GFNFSJ | KASHIVAL clear travel toiletry bag set | ₹99 | dropped (p/m 0.198 ≤ 0.2 guard) |
| 14538 | Amazon | B098XNKZTJ | SMART PICKS transport vehicle puzzle | ₹62 | ₹199 (69%) |
| 14539 | Amazon | B0H4RBY9JN | boAt Energyshroom PB401 20000mAh 22.5W | ₹1,399 | ₹4,499 (69%) |
| 14540 | Blinkit | 9542d732d920 | Portronics Luxcell Wireless Mini MagSafe 10000mAh | ₹799 | dropped (p/m 0.1998 ≤ 0.2 guard) |

- **Amazon:** all 3 show In stock with add-to-cart live. SMART PICKS card said ₹63, the page says ₹62 (within ±₹1); pushed at the page price.
- **Blinkit:** `productLd()` read price 799, InStock. Image from `cdn.grofers.com`. Description notes pin-code-dependent delivery. Second Blinkit deal after #14522.
- **Push:** the bulk endpoint returned 201 with `count:4`, all `created:true`.
- **Prod:** all 4 pages return 200. The JSON-LD Offer prices are 99, 62, 1399 and 799.

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B0H3NXYKRR | Haier 9 kg washer | ₹35,990 | ₹24,490 |
| B0F9L8Z848 | Sleepify 6-seater L sofa | ₹18,849 | ₹17,099 |
| B0G3Q4M2QX | FURNY Grovila L sofa | ₹12,811 | ₹11,530 |
| B0G3Q18C8G | FURNY Grovila L sofa (colour 2) | ₹12,811 | ₹11,530 |
| B0G3XS4777 | FURNY Harloy 3-seater | ₹12,652 | ₹11,387 |
| B0GYD6YC2N | iFFALCON 75" TV | ₹69,999 | ₹49,999 |
| B0GYFYMLFX | IFB 222L fridge | ₹20,990 | ₹16,740 |
| B0CF5PN648 | SleepyHug mattress | ₹7,143 | ₹5,768 |

The card prices are bank-offer or coupon prices. The last 3 were also rejected in 10-24b, 10-24c and 10-24d.

## Script SKIPs

- **Flipkart SFSHQ4GBPBC6CQVW, Interio Godrej Cresco sofa (₹21,632):** price drift.
- **Flipkart OSCHYQ8GVU9ADNUG, Interio Godrej Curv office chair (₹2,748):** price drift.

## Freshness

- **IndexNow:** HTTP 200 for 7 URLs: the 4 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR revalidates every 1800 s, so the batch appears within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already reflects the batch.

## CEO audit (08:27 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,009 LIVE, matching the API total of 14,009. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14540.
- **Posts (IST 2026-10-24):** 2, meeting the daily minimum. The next CONTENT-SEO tick (12:39) can ship #3. 0 of 428 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14536. The DB maximum is 14540 because this batch was just pushed. The external broadcast cron picks it up on its next run, so this is not rot.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
