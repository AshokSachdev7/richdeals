# DESIDIME tick 2026-10-12c (04:46 IST)

**3 of 20 fresh candidates pushed.**

- The bulk endpoint returned `count: 3`, all `created: true`.
- All 3 deal pages return 200 on prod.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Willow Vine LED wall lights, 5.5 ft, 72 LED, with remote (B0H69N3FF9) | Amazon | ₹599 | ₹999 | 40% | 4.0 (35) | `tag=ashoksachdev-21` |
| Safari Terra 2 37L printed backpack, black (B0GFVL7JJZ) | Amazon | ₹746 | ₹3,799 | 80% | 4.1 (51) | `tag=ashoksachdev-21` |
| Solimo checkered jar containers, set of 18 (B0BVZ15PL5) | Amazon | ₹350 | ₹1,999 | 82% | 4.2 (17,314) | `tag=ashoksachdev-21` |

**How each was checked:** all 3 were read on the Amazon product page (`#centerCol`) in the logged-in tab.

- The price matches exactly.
- `#availability` shows In stock and the add-to-cart button is present.
- None has an "only N left" warning.
- Each image is the hiRes entry for the variant's own colour (`landingAsinColor`). The backpack falls back to the `initial` image set.

## Rejected (17)

| Deal | Reason |
|---|---|
| adidas Clear Factor running shoe | "Only 2 left in stock" |
| Lakme Unreal compact | Price drift: ₹197 listed vs ₹201 live |
| Tommy Hilfiger Wyoming trolley | Price drift: ₹2,980 listed vs ₹3,379 live |
| JBL Grip speaker | Price drift: ₹6,119 listed vs ₹6,799 live |
| Zebronics Thunder headphones | Price drift: ₹599 listed vs ₹629 live |
| Ant Esports GW V3 wheel | Price drift: ₹3,799 listed vs ₹3,998 live; rated 3.3 |
| MILTON Pro lunch box | Price drift: ₹583 listed vs ₹845 live |
| MIOOX electric scooter | Price drift: ₹42,934 listed vs ₹45,683 live |
| Havells Shine & Chime bell | Price drift: ₹570 listed vs ₹599 live; no ratings |
| PremiumAV microphone | No add-to-cart and no price on the product page |
| Nilkamal recliner | Price drift: ₹10,861 listed vs ₹15,190 live (repeat) |
| INALSA air fryer | Marked expired on DesiDime; live price ₹3,399 vs ₹2,699 listed |
| Hitachi 1T AC | Repeat item, already rejected (no add-to-cart) |
| AGARO foot massager | Health device |
| Prestige Iris Plus mixer | Price is only valid with an SBI credit card |
| HAVELLS Fab Neo purifier (Flipkart) | Price drift, caught by stage 1's ld+json check |
| Parachute lotion (Flipkart) | Price drift, caught by stage 1's ld+json check |

## IndexNow

HTTP 200 for 6 URLs: the 3 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,419 (12,416 before this push) |
| Broadcast cursor | 12933; DB max is now 12936 after this push. The external broadcast cron picks up the new rows on its next run. |
| Prod endpoints (7) | all 200 in 0.10–0.58s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
