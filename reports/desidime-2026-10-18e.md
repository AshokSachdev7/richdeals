# DESIDIME tick 2026-10-18e (08:35 IST)

**3 deals pushed LIVE (count 3, all created, ids 13549-13551). IndexNow HTTP 200, 6 URLs.**

## Funnel

| Stage | Count |
|---|---|
| Stage-1 candidates (listing cards, JUNK/GROCERY filtered, visit.desidime resolved) | 22, all Amazon |
| No add-to-cart | 2 (B0D7PWGS5S IFB dishwasher, B0DHVWY583 Kalyan gold coin) |
| Card price drift > ₹1 vs `#centerCol` price-to-pay | 17 |
| Passed | 3 |
| Already in DB (productId) | 0 |

## Pushed

| ASIN | Deal | Price | MRP | Off |
|---|---|---|---|---|
| B0G4WJFVHL | AM Safe-X microfiber cloth roll, 20 pcs | ₹99 | ₹999 | 90% |
| B0FQJ1RFDN | XGIMI Vibe One 1080p projector | ₹19,999 | ₹49,999 | 60% |
| B0GK1M53R9 | truke Bass S2 sleeping earphones, Blue | ₹399 | ₹2,299 | 83% |

All 3 slugs return 200 from the API. Images from m.media-amazon.com, colour matches `landingAsinColor`.

## Rejected (card → product page)

| ASIN | Card | PDP | Note |
|---|---|---|---|
| B0BKT1WDJ5 Nilkamal shoe rack | ₹4,653 | ₹5,170 | |
| B0HHJ88VZ3 Carrier 1T AC | ₹28,740 | ₹32,490 | coupon + bank price |
| B0H9HXGK77 Ankoda earphones | ₹184 | ₹177 | MRP also differs (₹1,599 vs ₹1,000) |
| B07ZTRJDNG Casio CT-S300 | ₹8,280 | ₹9,199 | |
| B0DR9P2H1V BOXJOY organizer | ₹597 | ₹847 | per-count price + coupon |
| B0GRTMV67F Philips straightener | ₹5,120 | ₹5,989 | coupon |
| B00KPSSPZY Panasonic 23L microwave | ₹8,690 | ₹10,990 | |
| B0FWY8TT1X Ninja Combi | ₹19,449 | ₹22,999 | |
| B0H2DD8Z5T dreame L50 Plus | ₹31,249 | ₹33,999 | |
| B0HDZDX4KW 2g gold bar | ₹28,868 | ₹32,749 | |
| B0HCTHQRVJ OnePlus Pad Lite | ₹18,749 | ₹21,999 | coupon + bank |
| B0HCDXQP92 LG 12kg washer | ₹37,489 | ₹48,989 | coupon + bank |
| B0GYD6YC2N iFFALCON 75" | ₹45,999 | ₹69,999 | |
| B0H25X3W7F ASUS TUF A15 | ₹81,740 | ₹99,990 | |
| B0H6WHHSHR Lenovo IdeaPad Slim 3 | ₹65,990 | ₹74,990 | |
| B0DTTZZ6Q3 DJI Osmo 360 | ₹32,740 | ₹36,990 | |
| B0C5MXF7GF AO Smith 15L geyser | ₹5,804 | ₹6,449 | |

Most of the high-ticket cards are effective prices after a bank card offer, not the price to pay.

## CEO audit (08:35 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,027 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13551 / 13548 (this batch, broadcaster not yet run; not rot) |
| Prod endpoints (7) | all 200, max 0.60 s |
| Unpushed commits | 0 before this report |

No rot found.
