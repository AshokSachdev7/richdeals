# DESIDIME tick 2026-10-17h (08:34 IST)

**2 deals pushed LIVE (count 2, both created:true). IndexNow HTTP 200 (5 URLs). Both deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 36 |
| Resolved to a merchant product | 22 |
| Already in the DB (productId match) | 3 |
| Fresh candidates | 19 (17 Amazon, 2 Flipkart) |
| Checked on the product page | 19 (Amazon in the logged-in tab, Flipkart in a Playwright tab via ld+json) |
| Passed verification | 2 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B07P7ZXPVD | Solimo 3 L square modular container, blue | ₹219 | ₹500 | Logged-in tab: core price block shows ₹219, M.R.P. ₹500, add-to-cart present, no coupon |
| Amazon | B0BKLJQZS7 | 1.5 mm derma roller | ₹99 | ₹599 | Logged-in tab: core price block shows ₹99, M.R.P. ₹599, add-to-cart present, coupon badge shown (noted in the copy) |

- **Affiliate link:** `?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- **Image:** the m.media-amazon.com hiRes for the landing variant.
- **Dedup:** a DB productId re-check just before the push returned 0 rows.

## Rejected (card price vs product page)

| ID | Item | Card | Product page |
|---|---|---|---|
| B0DKNLVK9C | Elica chimney | ₹21,556 | ₹24,690 |
| B0DCK453V1 | AO Smith Z9 Pro | ₹16,488 | ₹21,988 |
| B00020J1BC | Timex watch | ₹2,515 | ₹3,038 |
| B0F5PXXWM9 | Aquaguard purifier | ₹7,499 | ₹9,499 |
| B0D6R19L4F | Colorbot fan | ₹2,469 | ₹2,769 |
| B0D33H2HBG | Ocean Mart watering can | ₹80 | ₹159 |
| B0HMKYSJVT | iQOO Z11xa | ₹25,280 | ₹30,479 |
| B0CTTDLYZJ | BSB comforter | ₹633 | ₹689 |
| B0DHVWY583 | Kalyan gold coin | ₹29,660 | ₹32,737 |
| B0H9T73HJ7 | Bosch fridge | ₹25,990 | ₹37,990 |
| B0B8ZMLRH4 | Haier side-by-side | ₹52,580 | ₹63,680 |
| B0GXTVZZWB | Samsung 65" TV | ₹58,290 | No price, no add-to-cart button |
| B0D6YVDP7M | RENEE palette | ₹149 | ₹425 |
| B0H69FXJC8 | Lenovo LOQ monitor | ₹6,200 | ₹7,999 |
| B0HJ5YYV7Q | Laptop sleeve, pack of 2 | ₹215 | ₹449 |
| COMHPPZ69EP7QNRK | HP Victus i5 13450HX (Flipkart) | ₹80,240 | ₹1,07,990 |
| WATH9EGYJNE7XW92 | Fastrack Stunners X (Flipkart) | ₹1,281 | ₹1,349 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST 10-17) | 2. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,820 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13342 / 13342. In sync; this batch is already broadcast |
| Prod endpoints (7) | all 200 (0.10–0.63 s) |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
