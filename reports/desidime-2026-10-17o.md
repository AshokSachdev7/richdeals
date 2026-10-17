# DESIDIME tick 2026-10-17o (22:32 IST)

**1 deal pushed LIVE (count 1, created:true). IndexNow HTTP 200 (4 URLs). The deal page returns 200 on prod.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 32 |
| Junk / other-store dropped by the card filter | 10 |
| Dropped after resolve (rewards ads, LiveShop, Flipkart pids the script could not use) | 7 |
| Product-resolved | 15 |
| Already in the DB (productId match) | 1 |
| Fresh | 14 (13 Amazon, 1 Flipkart) |
| Dropped by the script (Flipkart ld+json price drift) | 1 (Kenstar Veda Pro 18 L purifier, ₹3,799) |
| Checked in the logged-in Amazon tab | 13 |
| Passed | 1 |
| Pushed | 1 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0F42XKR94 | Storio die-cast metal SUV car model, 1:32, light & music | ₹199 | ₹2,599 (92% off) | `.priceToPay` 199, In stock, add-to-cart present, no coupon |

- **Link:** `/dp/B0F42XKR94?tag=ashoksachdev-21` (DesiDime tag stripped).
- **Image:** `#landingImage` `data-old-hires`, `_SL1254_`.
- **Text:** title and description rewritten from the product title. One unverified detail ("doors") was removed from the description in the DB right after the push.
- **Dedup:** a DB productId check just before the push returned 0 rows.

## Rejected (product page ≠ card price)

| ID | Item | Card | Product page |
|---|---|---|---|
| B0DTTZZ6Q3 | DJI Osmo 360 | ₹32,740 | ₹36,990 |
| B0GTPTWW27 | Portronics 60W Velin C-to-C cable | ₹231 | ₹269 + coupon |
| B0H6WHHSHR | Lenovo IdeaPad Slim 3 i5-13420H | ₹65,990 | ₹74,990 |
| B08XQQD59F | Nike deodorant, pack of 2 | ₹317 | ₹684 + coupon |
| B0H25X3W7F | ASUS TUF A15 (2026) | ₹81,740 | ₹99,990 |
| B0HDZDX4KW | 24K 2 g gold bar pendant | ₹28,868 | ₹32,222 |
| B0GYD6YC2N | iFFALCON 75" TV | ₹45,999 | ₹69,999 |
| B0DHVWY583 | Kalyan 2 g gold coin pendant | ₹29,660 | no price / no add-to-cart |
| B0C5MXF7GF | AO Smith 15 L geyser | ₹5,804 | ₹6,449 |
| B0DFCWTNT6 | Samsung 12 kg washer | ₹33,740 | ₹46,490 + coupon |
| B0CFFPLZXJ | Bosch 7 kg front-load washer | ₹20,490 | ₹26,990 |
| B0GP6V371Z | Haier 540 L side-by-side fridge | ₹41,890 | no price / no add-to-cart |

The big-ticket drops are bank-card or coupon-stacked prices, and 6 of the 12 (DJI, gold pendant, iFFALCON, Samsung, Bosch, Haier) were rejected at 17n too. The gold items track the daily gold rate.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 4 (cap) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,961 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13484 / 13483. The gap is this tick's deal; the external cron will pick it up |
| Prod endpoints (7) + new deal page | all 200 |
| Session crons | 9 of 9 (CronList) |
| Unpushed commits | 0 before this report |

No rot found.
