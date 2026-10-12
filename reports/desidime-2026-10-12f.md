# DESIDIME tick 2026-10-12f (10:46 IST)

**2 of 18 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 22 to a store URL. 4 of those were already in the DB, leaving 18 fresh.
- The bulk endpoint returned `count: 2`, both `created: true`.
- Both deal pages return 200 on prod.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| EcoLink Champion Compact 20W 4-ft LED batten, cool white, pack of 4 (B09GPKP1LY) | Amazon | ₹509 | ₹1,800 | 72% | 3.8 (2,177) | `tag=ashoksachdev-21` |
| Samsung 24-inch G3 gaming monitor, FHD IPS, 144 Hz (B0HDPLHJ35) | Amazon | ₹7,999 | ₹15,900 | 50% | 4.5 (174) | `tag=ashoksachdev-21` |

**How each was checked:** both were read on the Amazon product page (`#centerCol`) in the logged-in tab.

- The price matches exactly.
- `#availability` shows In stock and the add-to-cart button is present.
- Neither has a coupon or an "only N left" warning.
- Each image is the hiRes entry for the variant's own colour (`landingAsinColor`).

## Rejected (16)

| Deal | Reason |
|---|---|
| Hero Pleasure+ scooter | Booking listing at ex-showroom price, not a buy-now product |
| Hero HF Deluxe motorcycle | Booking listing at ex-showroom price, not a buy-now product |
| Pampers diapers M 4-count | Low-ticket baby-care FMCG; no ratings |
| Pampers diapers S 4-count | Low-ticket baby-care FMCG; no M.R.P. |
| Arto acrylic organiser | Only 1 rating |
| Personalised name pencils | No add-to-cart button; this is a made-to-order item |
| Larah Borosil dinner set | "Only 2 left in stock"; only 9 ratings |
| Acer SA242Y monitor | Price drift: ₹5,120 listed vs ₹5,699 live |
| SanDisk GX PRO SSD | Price drift: ₹32,499 listed vs ₹34,999 live; only 8 ratings (repeat) |
| Hitachi 1T AC | No price and no add-to-cart on the product page (repeat) |
| Lenovo ThinkBook 16 | Price drift: ₹84,740 listed vs ₹91,990 live (repeat) |
| Rosebell sofa | Price drift: ₹9,595 listed vs ₹10,661 live; only 2 ratings (repeat) |
| MIOOX electric scooter | Price drift: ₹42,934 listed vs ₹45,683 live (repeat) |
| JBL Grip speaker | Price drift: ₹6,119 listed vs ₹6,799 live (repeat) |
| Raymond bedsheet (Instamart) | Out of stock, caught by stage 1 |
| Adrenex Stryker cycle (Flipkart) | Price drift, caught by stage 1's ld+json check |

## IndexNow

HTTP 200 for 5 URLs: the 2 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,423 (12,421 before this push) |
| Broadcast cursor | 12938; DB max is now 12940 after this push. The external broadcast cron picks up the new rows on its next run. |
| Prod endpoints (7) | all 200 in 0.10–0.66s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
