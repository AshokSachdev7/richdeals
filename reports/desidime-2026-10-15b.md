# DESIDIME tick 2026-10-15b (12:32 IST)

**7 pushed (bulk `count:7`, all `created:true`). IndexNow HTTP 200 (10 URLs).**

Stage 1 found 33 cards and resolved 18 to a single product. 1 was already in the DB, leaving 17 fresh. The script rejected 4 non-Amazon rows. All 13 Amazon rows were then read on the product page in the logged-in Playwright tab: 7 passed and 6 drifted.

## Pushed (all Amazon, `tag=ashoksachdev-21`; product-page price = card price ±₹1, in stock, add-to-cart present)

| ASIN | Deal | Price | MRP |
|---|---|---|---|
| B0C8TNJV3Y | RATAN Tidy Bin 25L swing-lid dustbin | ₹449 | ₹899 |
| B0DGD6QGVX | Paper napkins, 400 sheets | ₹110 | ₹340 |
| B0FHQ2LW5N | Door curtains 9 ft, set of 2 | ₹229 | null (87% off) |
| B0DJ99M1MP | PUMA RunningRoad running shoe | ₹2,228 | ₹7,499 |
| B08FDZK7FC | Orient Ventilator DX 200mm exhaust fan | ₹1,263 | ₹2,100 |
| B075FK1B9Z | Classmate Pulse 5-subject notebook | ₹87 | ₹160 |
| B0C65FZ2F8 | FRONTECH RGB Bluetooth speaker | ₹1,039 | ₹2,000 |

- Titles and descriptions are rewritten.
- Images come from m.media-amazon.com.
- Prod check: the PUMA page returns 200.

## Rejected (10)

| Deal | Reason |
|---|---|
| Supples baby wipes (B09RPBZRT8) | Product page ₹202 vs card ₹196 |
| L'Oréal Revitalift serum (B08QSRRYGL) | Product page ₹291 vs card ₹283 |
| Galaxy Tab S10 Lite (B0FNWRZSC5) | Product page ₹33,999 vs card ₹30,249 (the card price needs a bank card) |
| Galaxy S25 Ultra (B0DSKMV3ZC) | Product page ₹94,999 vs card ₹84,999 |
| ASUS Vivobook 15 (B0H8P895HL) | Product page ₹64,990 vs card ₹56,490 |
| Hitachi 1T 5-star AC (B0GP6S6S5F) | Product page ₹36,999 vs card ₹31,749 |
| Glen chimney (Flipkart) | Price drift (₹8,549 vs ₹7,308) |
| Lenovo IdeaPad Slim 3 (Flipkart) | Price drift (₹58,990 vs ₹54,520) |
| STUDDS Jetstar helmet (Flipkart) | Out of stock |
| CELLO (Instamart) | Out of stock; also a multi-product listing |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 2 (cap 4). The rule is met. |
| No cover / no SEO / null price / null image / pending | 0 / 0 / 0 / 0 / 0 |
| LIVE deals | 12,507 (+7) |
| Broadcast cursor | 13017 vs max 13024. The external cron will pick up this batch on its next run. |
| Prod endpoints (7) | all 200 in 0.14–0.73s |
| Unpushed commits | 0 before this report |
