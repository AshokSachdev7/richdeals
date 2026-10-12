# DESIDIME tick 2026-10-12e (08:47 IST)

**2 of 8 fresh candidates pushed.**

- Stage 1 found 37 deals and resolved 15 to a store URL. 7 of those were already in the DB, leaving 8 fresh.
- The bulk endpoint returned `count: 2`, both `created: true`.
- Both deal pages return 200 on prod.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| boAt Nirvana Eutopia headphones with head tracking, Primia Black (B0CVRXTRBY) | Amazon | ₹1,493 | ₹7,490 | 80% | 3.8 (210) | `tag=ashoksachdev-21` |
| Orient Electric Arc Plus 1 kW immersion heater (B0C82QQVV3) | Amazon | ₹419 | ₹990 | 58% | 4.2 (1,126) | `tag=ashoksachdev-21` |

**How each was checked:** both were read on the Amazon product page (`#centerCol`) in the logged-in tab.

- `#availability` shows In stock and the add-to-cart button is present.
- Neither has an "only N left" warning.
- Each image is the hiRes entry for the variant's own colour (`landingAsinColor`).
- **boAt price:** the listed ₹1,493 is the price after Amazon's 17% coupon (₹1,799 live × 0.83). The deal's `couponNote` tells buyers to clip the coupon before checkout.
- **Orient price:** ₹419 matches the product page exactly.

## Rejected (6)

| Deal | Reason |
|---|---|
| adidas Clear Factor | No price and no add-to-cart on the product page |
| Hitachi 1T AC | No price and no add-to-cart on the product page (repeat) |
| Nilkamal recliner | Price drift: ₹10,861 listed vs ₹15,190 live (repeat) |
| AGARO foot massager | Health device |
| Prestige Iris Plus mixer | Price is only valid with an SBI credit card |
| Parachute lotion (Flipkart) | Price drift, caught by stage 1's ld+json check |

## IndexNow

HTTP 200 for 5 URLs: the 2 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,421 (12,419 before this push) |
| Broadcast cursor | 12936; DB max is now 12938 after this push. The external broadcast cron picks up the new rows on its next run. |
| Prod endpoints (7) | all 200 in 0.10–0.66s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
