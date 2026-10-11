# DESIDIME tick 2026-10-11h (20:18 IST)

1 of 16 fresh candidates was pushed. Stage 1 found 35 cards; 18 resolved to a product page, 2 were already in the DB, leaving 16 fresh. The bulk endpoint returned `count: 1`, `created: true`.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| WildHorn genuine leather slim bifold RFID wallet for men (B079TN3GCD) | Amazon | ₹272 | ₹1,499 | 82% | 4.2 (4,479) | `tag=ashoksachdev-21` |

The listing was checked on the Amazon product page (`#centerCol`): the price matches DesiDime exactly, it shows In stock, and the add-to-cart button is present.

## Rejected (15)

| Deal | Reason |
|---|---|
| Pampers Premium Care Pants (Instamart) | Price drift: ₹171 listed vs ₹186 live |
| ZEBRONICS 32" curved monitor (Flipkart) | Price drift: ₹9,314 listed vs ₹10,499 live |
| ZEBRONICS 22" IPS monitor (Flipkart) | Price drift: ₹2,969 listed vs ₹3,299 live |
| Borosil 3-pc glass tiffin (Flipkart) | Price drift: ₹499 listed vs ₹836 live |
| Bajaj Platina 110 ES (Amazon) | Price drift: ₹63,654 listed vs ₹74,877 live |
| Voltas 1.5T inverter AC | No add-to-cart (seller-only listing) |
| Amazon Basics granite cookware set | No add-to-cart (seller-only listing) |
| Solar motion sensor wall light | Price drift: ₹584 listed vs ₹899 live, and 0 ratings |
| Bosch 8kg front-load washer | Price drift: ₹24,990 listed vs ₹29,990 live, and only 2 left |
| Bosch 13-place dishwasher | Price drift: ₹36,840 listed vs ₹52,990 live, and no add-to-cart |
| Hitachi 1.5T AC | Price drift: ₹37,499 listed vs ₹44,999 live, and only 2 left |
| Hitachi 1T AC | No add-to-cart (unavailable) |
| Classmate Pulse notebook | Price drift: ₹184 listed vs ₹208 live |
| HP 15 (Core 5 120U) | Price drift: ₹50,240 listed vs ₹59,990 live, and 0 ratings |
| HP Omnipad 12 | Price drift: ₹35,240 listed vs ₹46,490 live; rated 3.5 from 8 ratings |

DesiDime's posted prices for the Bajaj, Bosch, Hitachi and HP listings are bank-card or exchange prices. They cannot be verified as list prices.

## IndexNow

HTTP 200 for 4 URLs: the deal slug plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,406 |
| Broadcast cursor | 12922. DB max is 12923 because of this push; the external broadcast cron picks it up on its next run. |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
