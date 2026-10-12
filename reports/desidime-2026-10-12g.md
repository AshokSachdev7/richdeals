# DESIDIME tick 2026-10-12g (12:45 IST)

**2 of 13 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 18 to a store URL. 13 junk or other-store links were dropped, and 5 deals were already in the DB, leaving 13 fresh.
- The bulk endpoint returned `count: 2`, both `created: true`.
- Both deal pages return 200 on prod (0.34s, 0.27s).
- IndexNow returned **HTTP 200** for 5 URLs (2 deal slugs plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Livon Keratin Shampoo, 1 L (B0HFKCYBQV) | Amazon | ₹299 | ₹1,199 | 75% | 4.2 (970) | `tag=ashoksachdev-21` |
| boAt Aavante Bar Prime B160 5.1 soundbar, 160W (B0HC7C2ZS9) | Amazon | ₹4,999 | ₹23,990 | 79% | 4.1 (2,391) | `tag=ashoksachdev-21` |

**How each was checked:** both were read on the Amazon product page in the logged-in tab.

- The price matches the listing exactly.
- The add-to-cart button is present.
- Neither has a coupon or an "only N left" warning.
- Each image is the main hiRes image for the landing variant (1 L bottle; Cosmic Black).

The copy is original. Brand claims, such as the shampoo's repair claims, are attributed to the brand and not stated as fact.

## Rejected (11)

| Deal | Reason |
|---|---|
| Solimo 2-seater sofa cum bed | No price and no add-to-cart on the product page; rated 3.4 |
| Fire-Boltt Ring X smartwatch | Rated 3.5 (the cutoff is ≤3.5) |
| Shiv Textiles trackpants, pack of 3 | No add-to-cart; only 1 rating |
| Lenovo Idea Tab | Only 2 ratings; the listed price needs a ₹2,000 coupon |
| Hero Pleasure+ 110 scooter | Booking listing; live price ₹76,287 vs ₹60,596 listed (repeat) |
| Hitachi 1 Ton AC | "Only 1 left in stock"; no price shown (repeat) |
| Butterfly Smart mixer grinder | Price drift: ₹2,302 listed vs ₹2,549 live |
| Redmi Pad 2 | Card-only price: ₹14,146 listed vs ₹17,499 on the product page |
| Midea dishwasher (Flipkart) | Price drift, caught in stage 1 |
| Cetaphil water gel (Myntra) | Price drift, caught in stage 1 |
| Milton casserole set (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,425 |
| Broadcast cursor | 12940 vs DB max 12942. The gap is this tick's 2 deals; the external broadcast cron picks them up. |
| Prod endpoints (7) | all 200 in 0.11–1.30s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
