# DESIDIME tick 2026-10-16d (12:33 IST)

**6 pushed (count 6, all created:true). IndexNow HTTP 200 for 9 URLs.**

## Stage-1 funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 34 |
| Resolved to a merchant product | 18 |
| Already in DB (productId) | 7 |
| Fresh candidates | 11 |
| Verified and pushed | 6 |

## Candidates

| Product | Store | Price / MRP | Result |
|---|---|---|---|
| HP K160 wireless keyboard (B0827J6TFC) | Amazon | ₹829 / ₹1,700 (51%) | PUSHED |
| Sensi 8-inch main door handle, rose gold (B0F28XLWHX) | Amazon | ₹378 / ₹1,899 (80%) | PUSHED |
| Arto 11-piece ribbed storage box set (B0GX1T4YGN) | Amazon | ₹509 / ₹1,499 (66%) | PUSHED |
| Reebok women's solid T-shirt (B0BRXTY67S) | Amazon | ₹269 / ₹1,499 (82%) | PUSHED (only 2 left) |
| Symbol women's sleeveless wrap top (B0CSG4F3NW) | Amazon | ₹149 / ₹1,499 (90%) | PUSHED |
| Lakmé liquid lipstick trio (LSKHDQ3AXMZSVK36) | Flipkart | ₹279 / ₹1,350 (79%), ld+json InStock | PUSHED |
| Clovia pajama set (B0BFR83FVH) | Amazon | n/a | REJECT: no buy box |
| Lenovo IdeaPad Slim 3 (B0HGXVSQ9R) | Amazon | card ₹54,490 vs PDP ₹64,990 | REJECT: bank-offer price |
| Sony 1000X headphones (B0GY4PPX7F) | Amazon | card ₹46,489 vs PDP ₹54,989 | REJECT: card below PDP |
| Kalyan gold coin (B0DHVWY583) | Amazon | n/a | REJECT: gold-price policy |
| Everyuth body lotion (MSCG6Z9WAKJFJY6N) | Flipkart | ₹95 / ₹625 | REJECT: low-ticket FMCG |

The Amazon deals were verified in the logged-in tab with an in-tab fetch of `/dp/ASIN?th=1&psc=1` (#centerCol price, #availability, add-to-cart button). The Flipkart deal was verified with an in-tab fetch reading Product.offers from ld+json. Amazon links use `tag=ashoksachdev-21`; the Flipkart link uses `affid=djhackraj`.

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,652 / 13169 (newest 0 min old) |
| Broadcast cursor | 13163, which is behind by this batch only; the external cron picks it up |
| Prod endpoints (7) | all 200 in 0.12–0.71s |
| Session crons | 9 of 9, matches the roster |
| Unpushed commits | 0 before this report |
