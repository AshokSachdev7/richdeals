# DesiDime tick 2026-10-11b (02:43 IST)

Stage 1 found 31 deals. 23 resolved to a product page, 3 were already in the DB, so 20 were checked.

## Pushed: 1 (count 1, created)

| Store | ID | Item | Price | M.R.P. | Rating |
|---|---|---|---|---|---|
| Amazon | B0CH1499X7 | Amazon Basics braided Micro USB cable 1.2m (3A/18W) | ₹86 | ₹499 (83% off) | 3.8★ (3,428) |

- Checked on the product page in the logged-in tab: price ₹86, in stock, add-to-cart present. Image read for the 1.2 Meter variant.
- Prod page 200. IndexNow HTTP 200 for 4 URLs.

## Rejected (19)

16 of the 17 Amazon candidates had a different price on the product page than on the card. The card price was the bank-card or coupon price.

| ASIN | Item | Card | Product page | Other issue |
|---|---|---|---|---|
| B0CR9YYYC1 | Sony INZONE Buds | ₹12,090 | ₹15,989 | 3.5★ |
| B0GMQXHWKP | Zebronics 16GB DDR4 | ₹7,408 | ₹10,175 | 2.0★ (2 ratings) |
| B08FMT6ZM1 | Sony MHC-V73D | ₹26,239 | ₹32,989 | |
| B0797MY6JB | Sony HT-S100F soundbar | ₹6,690 | no price shown | no add-to-cart |
| B016XVRKZM | APC BX600C UPS | ₹2,521 | ₹3,299 | |
| B0HK7QBFYM | HP Victus 15 | ₹72,740 | ₹92,990 | no ratings |
| B0FZKZTXSN | Dell 15 i3 | ₹42,740 | ₹49,990 | |
| B0DVC6MP1D | realme Buds Wireless 3 Neo | ₹1,002 | ₹1,199 | |
| B0FPLQRBM6 | boAt Airdopes 131 Gen 2 | ₹749 | ₹799 | |
| B0HF7X1XS1 | Lenovo Yoga Slim 7 | ₹97,740 | ₹1,14,990 | no ratings |
| B09H5QB4G8 | HP Smart Tank 720 | ₹15,949 | ₹18,699 | 3.4★ |
| B097N5VVLY | Bergner kadai | ₹450 | ₹499 | 3.2★ |
| B0H6K9LNGZ | FUTOPIA all-in-one PC | ₹70,849 | ₹81,099 | 1 rating |
| B0F5WR2D2H | SleepyHug mattress | ₹5,009 | ₹5,979 | |
| B0FPFS63HL | TONZO projector | ₹19,949 | ₹26,699 | no ratings |
| B0HG929FR4 | iQOO Z11xa 5G | ₹24,998 | ₹28,998 | |

Other rejects:
- **Samsung Galaxy A07 (JioMart):** ratingCount is 0.
- **Steam "Fireside Feelings":** a free game, not a store product.
- **Yu coconut water (Zepto):** no ld+json, and it is a food item.

## CEO audit
- Posts: 1 today (IST), 0 without a cover, 0 without SEO fields.
- Deals: 0 null price, 0 null image, 0 PENDING_REVIEW.
- 12,396 live. Max id is 12913 and the broadcast cursor is at 12912. The 1-row gap is this push waiting for the external broadcast cron, which catches up on its own.
- All 7 prod endpoints return 200. 0 unpushed commits before this report.
