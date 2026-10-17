# DESIDIME tick 2026-10-17n (20:33 IST)

**1 deal pushed LIVE (count 1, created:true). IndexNow HTTP 200 (4 URLs). The deal page returns 200 on prod.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 38 |
| Resolved through `visit.desidime.com` | 25 |
| Already in the DB (productId match) | 5 |
| Fresh | 20 (13 Amazon, 7 Flipkart) |
| Dropped by the script (Flipkart ld+json price drift) | 5 (Bosch mixer, boAt Rockerz 411, Nothing Headphone (1), KODAK 32" TV, Miss & Chief scooter) |
| Dropped by hand (low-ticket FMCG the GROCERY regex missed) | 2 (Boroplus soap 8-pack ₹162, Bellavita soap ₹132) |
| Checked in the logged-in Amazon tab | 13 |
| Passed | 1 |
| Pushed | 1 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0GV7FNR2H | Toyshine 2-in-1 LCD writing tablet with pencil box, red | ₹139 | ₹699 (80% off) | `.priceToPay` 139, In stock, add-to-cart present, no coupon |

- **Link:** `/dp/B0GV7FNR2H?tag=ashoksachdev-21` (DesiDime tag stripped).
- **Image:** `#landingImage` `data-old-hires`, `_SL1500_`, HTTP 200.
- **Text:** title and description rewritten from the product page bullets.
- **Dedup:** a DB productId check just before the push returned 0 rows.

## Rejected (product page ≠ card price)

| ID | Item | Card | Product page |
|---|---|---|---|
| B08B59Q9S3 | Glare chopper 430 mm | ₹428 | ₹453 |
| B0H2J11J8Y | Bajaj Classico Sleek 5S BLDC fan | ₹2,008 | ₹2,112 |
| B0GP6V371Z | Haier 540 L side-by-side fridge | ₹41,890 | ₹57,990 + coupon, 1 left |
| B0DKFZZY11 | Forus 1 m LED rope light | ₹135 | ₹143 + coupon |
| B0HDZN3L6V | Augmont 2 g gold bar pendant | ₹28,967 | ₹31,968 |
| B0CFFPLZXJ | Bosch 7 kg front-load washer | ₹20,490 | ₹26,990 |
| B0DFCWTNT6 | Samsung 12 kg washer | ₹33,740 | ₹46,490 + coupon |
| B0GRGKY1HT | Zebronics mechanical keyboard | ₹1,049 | ₹1,099 |
| B0DHVWY583 | Kalyan 2 g gold coin pendant | ₹29,660 | ₹32,695 |
| B0FF5H4PGD | Lumio Arc 5 projector | ₹16,239 | ₹18,489 + coupon |
| B0FBRS76BR | Redmi Pad 2 | ₹13,899 | ₹17,499 |
| B0H9KQSHKK | Acer Iconia Tab11 | ₹17,749 | ₹19,999 + coupon |

The big-ticket drops are bank-card or coupon-stacked prices. The gold items track the daily gold rate.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 4 (cap) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,945 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13468 / 13467. The gap is this tick's deal; the external cron will pick it up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 (CronList) |
| Unpushed commits | 0 before this report |

No rot found.
