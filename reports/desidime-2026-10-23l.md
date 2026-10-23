# DESIDIME — 2026-10-23l (22:21 IST)

**4 Amazon deals pushed (#14495–#14498). 11 were rejected because the product-page price was above the card price, 1 because the listing now shows a different product, and all 3 Flipkart drops failed the script's price check. IndexNow returned HTTP 200 for 7 URLs.**

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` read the `/new` page plus the homepage cards. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link, swapped in our affiliate tag, and deduped `productId` against the live DB.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay .a-price-whole`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`. The socks page had no `data-old-hires`, so its landing `src` image (`51+LNlXkPfL`) was used rather than the first hiRes, which can be another variant.
- **Non-Amazon check:** `productLd()` reads the ld+json price and checks for InStock, within ±₹1.
- **Price rule:** a deal is rejected if the page price is more than ₹1 above the card price.
- **MRP check:** if price/MRP ≤ 0.2, the MRP is nulled and the copy carries no % or M.R.P.
- **Re-dedup:** the 4 product IDs were checked against the DB just before the push. There were 0 hits.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 31 |
| Junk or other-store, dropped | 8 |
| Resolved to a product | 23 |
| Already in the DB | 4 |
| Fresh | 19 |
| Flipkart price-drift (script) | −3 |
| Rejected on the product page | −12 |
| **Pushed** | **4** |

## Pushed

The bulk response was `201`, `count: 4`, `created: true` ×4.
- The links are `dp/<ASIN>?tag=ashoksachdev-21`.
- Titles and descriptions are original.
- Every ₹ value and % was checked against the price and MRP before posting.

| # | ID | Deal | Price | MRP |
|---|---|---|---|---|
| 14495 | B0D4J2X86C | 6-piece microfiber high-ceiling duster with 30–100 in pole | ₹584 | ₹2,499 (77%) |
| 14496 | B0GRVHXLK1 | Men's cotton sports ankle socks, pack of 5 | ₹69 | — (ratio, ₹599 listed) |
| 14497 | B0HJRMLKBX | Unscented wax tealight candles, 25 pcs | ₹79 | — (ratio, ₹599 listed) |
| 14498 | B0B97N5V97 | One94Store 300-LED fairy curtain string lights, warm white | ₹249 | ₹999 (75%) |

## Rejected (15)

| ID | Item | Reason |
|---|---|---|
| AFRHCVUKZQGBNNAV | Greenchef 12 L air fryer oven (Flipkart) | Script price-drift |
| RFRH8WRUK9UJZFVA | Whirlpool 215 L triple-door fridge (Flipkart) | Script price-drift |
| MOBHMYR3NMRPYBY4 | realme P4R 5G (Flipkart) | Script price-drift |
| B0GN1NNYXF | Samsung Galaxy M17e 5G | Page ₹19,499 vs card ₹18,529 |
| B0CF5PN648 | SleepyHug Ortho Luxe Plus mattress | Page ₹7,143 vs card ₹5,768 (same as an earlier tick) |
| B0FDW7819M | Acer 50" Ultra I 4K TV | Page ₹25,999 vs card ₹22,800 |
| B0D5MNMX94 | HP V22v G5 monitor | Page ₹8,499 vs card ₹3,430 |
| B0GYFYMLFX | IFB 222 L fridge | Page ₹20,990 vs card ₹16,740 (same as an earlier tick) |
| B0GSL29B5W | ZIVO laminated gunny bags | The ASIN now shows "5 Big Large Polythene Plastic Bags 30×50" at ₹199, not the carded product |
| B0FMWXRQRR | Hollyland Lark M2 | Page ₹11,799 vs card ₹10,320 |
| B0DH7RFRS6 | Better Home Fumato soup maker | Page ₹3,935 vs card ₹3,542 |
| B0HHRB6DQG | Lenovo Idea Tab Pro Gen 2 | Page ₹47,999 vs card ₹41,999 |
| B0GHYPBM5R | NARWAL Freo Z10 Ultra | Page ₹79,990 vs card ₹69,990 |
| B0H7C7NM7V | Lenovo Legion 5 i7 | Page ₹1,62,991 vs card ₹1,50,892 |
| B0G5PXZJ71 | Blaupunkt OMG ATOM | Page ₹4,299 vs card ₹3,420 (third tick running) |

The 10–15% gaps fit bank-card prices that DesiDime printed as the deal price.

## Freshness

- **IndexNow:** HTTP 200 for 7 URLs: the 4 new slugs, plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14495–#14498 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the `/one94store-fairy-curtain-string-lights-300-led-warm-white-b0b97n5v97` deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,967 LIVE (13,963 + 4). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14498.
- **Posts (IST 2026-10-23):** 3. The minimum is met. 0 posts lack a cover, and 0 of 426 lack a seoTitle or seoDesc.
- **Broadcast cursor:** 14494, caught up through the TG 10-23v batch. #14495–#14498 (this batch) are waiting for the external cron. This is normal lag.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
