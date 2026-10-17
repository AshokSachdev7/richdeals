# DESIDIME tick 2026-10-17m (18:34 IST)

**5 deals pushed LIVE (count 5, all created:true). IndexNow HTTP 200 (8 URLs). All 5 deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 37 |
| Resolved through `visit.desidime.com` | 27 |
| Already in the DB (productId match) | 4 |
| Fresh | 23 (13 Amazon, 9 Flipkart, 1 JioMart) |
| Dropped by the script (Flipkart ld+json price drift) | 6 |
| Dropped by hand | 1 (JioMart Bikaji bhujia 1 kg: grocery/FMCG the GROCERY regex missed) |
| Checked on the live product page | 16 (13 Amazon in the logged-in tab, 3 Flipkart ld+json in tab) |
| Passed | 5 |
| Pushed | 5 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0D4V271TT | Orient Electric Eternal 9W LED ceiling light, 3000K | ₹125 | ₹4,500 | Core price ₹125, M.R.P. ₹4,500 (-97%), in stock, add-to-cart present |
| Amazon | B0G64V2LFN | PHILIPS TAS4400BK 40W Bluetooth speaker | ₹2,749 | ₹5,999 | Core price ₹2,749, M.R.P. ₹5,999, in stock, add-to-cart present |
| Amazon | B0G7K5J9D8 | Philips TAB4120BL 20W Bluetooth soundbar | ₹1,639 | ₹3,999 | Core price ₹1,639, M.R.P. ₹3,999, in stock, add-to-cart present |
| Flipkart | ACCGJWPGAGSHEFDH | Samsung 15W adaptive fast-charging wall charger | ₹299 | ₹1,199 | ld+json ₹299 InStock |
| Flipkart | ACCFYZ7YE9NYR6ZY | TCL SOCL200 wired in-ear headset, Ocean Blue | ₹499 | ₹899 | ld+json ₹499 InStock |

- **Links:** Amazon `/dp/ASIN?tag=ashoksachdev-21` (DesiDime tag `desidime01-21` stripped). Flipkart `/p/itm…?pid=…&affid=djhackraj` (`affid=salescueli` + `affExtParam*` stripped).
- **Images:** m.media-amazon.com `#landingImage` hi-res; rukmini1.flixcart.com ld+json image.
- **Dedup:** a DB productId check on all 5 just before the push returned 0 rows.

## Rejected (live price differs from the card)

| Store | ID | Item | Card | Product page |
|---|---|---|---|---|
| Amazon | B0GRV2DWP3 | Daikin 1.42 T 3-star AC | ₹33,240 | ₹37,490 |
| Amazon | B08ZSLWQ1V | Logitech G333 | ₹1,421 | ₹1,495 |
| Amazon | B0D11TBMH4 | E-COSMOS 4-unit cupboard | ₹1,259 | ₹1,799 (plus coupon) |
| Amazon | B0C5MXF7GF | AO Smith 15 L geyser | ₹5,804 | ₹6,449 |
| Amazon | B0D45Y8313 | JBL Cinema SB510 | ₹7,649 | ₹8,499 |
| Amazon | B0FBRS76BR | Redmi Pad 2 | ₹13,899 | ₹17,499 |
| Amazon | B0DHVWY583 | Kalyan gold coin | ₹29,660 | ₹32,695 |
| Amazon | B0H9KQSHKK | Acer Iconia Tab11 | ₹17,749 | ₹19,999 (plus coupon) |
| Amazon | B0H9S4NG94 | Muthoot pendant | ₹29,165 | ₹32,222 |
| Amazon | B0HKZW61GK | Aquaguard Sure Delight | ₹5,624 | ₹6,499 (plus coupon) |
| Flipkart | FANGQFKGPPBCDBZF | Crompton Energion Hyperjet fan | ₹1,670 | ₹2,165 |
| Flipkart | 6 by script | Glen chimney, Surface Laptop 13, boAt Rockerz 411, Nothing Headphone (1), KODAK 32" TV, Miss & Chief scooter | — | ld+json price drift |

Six of these (Redmi Pad 2, Kalyan, Acer, Muthoot, Aquaguard, boAt / Miss & Chief) were also rejected at 16:34 (tick 17l): DesiDime keeps showing stale card prices.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 3. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,924 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13447 / 13442. The 5-row gap is this batch; the external cron will drain it |
| Prod endpoints (6) + 5 deal pages | all 200 |
| Session crons | 9 of 9 (CronList at sitemon 17s, 18:07 IST) |
| Unpushed commits | 0 before this report |

No rot found.
