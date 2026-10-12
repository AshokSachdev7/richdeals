# DESIDIME tick 2026-10-12i (16:50 IST)

**5 of 18 fresh candidates pushed.**

- Stage 1 found 34 deals, resolved 23 to a single product (7 junk/other-store links dropped), 5 already in the DB, leaving 18 fresh.
- The bulk endpoint returned `count: 5`, all `created: true`.
- All 5 deal pages return 200 on prod (0.17–0.27s).
- IndexNow returned **HTTP 200** for 8 URLs (5 deal slugs plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Philips Ace Saver 9W E27 LED bulb, pack of 4 (B01303OKV8) | Amazon | ₹324 | ₹980 | 67% | 4.0 (2,076) | `tag=ashoksachdev-21` |
| MILTON Pro lunch box, 3 steel containers (B0C85PX1P5) | Amazon | ₹618 | ₹1,999 | 69% | 4.2 (11,027) | `tag=ashoksachdev-21` |
| Lifelong 5-piece stainless steel cookware set (B0FJMKF68S) | Amazon | ₹1,199 | ₹3,999 | 70% | 3.6 (197) | `tag=ashoksachdev-21` |
| Halonix 20W 4 ft LED batten, pack of 2 (B07GLQPQF5) | Amazon | ₹199 | ₹349 | 43% | 3.7 (3,506) | `tag=ashoksachdev-21` |
| Mivi Fort H350 5.1 soundbar, 350W (ACCH3MUYDSWNP3CS) | Flipkart | ₹4,999 | ₹34,999 | 86% | 4.2 (25,414) | `affid=djhackraj` |

**How each was checked:**

- **Amazon deals:** read on the product page in the logged-in tab.
  - The `#centerCol` price matches the listing exactly, `#availability` says In stock, and the add-to-cart button is present.
  - None has a real coupon or an "only N left" warning.
  - Each image is the hiRes image for the landing variant (Pack of 4; Maroon; 20W CDL 2 pack).
- **Flipkart deal:** read from the product page's ld+json in a browser tab: ₹4,999, InStock. The M.R.P. of ₹34,999 was read from the page. The listing says replacement only, no returns; the copy states this. The bank-card price (₹4,499) was not used.
- **Copy notes:** the Philips copy warns that the bulbs use an E27 screw base, not B22. The Lifelong copy states its middling 3.6 rating plainly.

## Rejected (13)

| Deal | Reason |
|---|---|
| Crompton 14-place dishwasher | Rated 2.5 from 14 ratings; "Only 1 left"; ₹28,790 listed vs ₹31,290 live |
| LG 14-place dishwasher | Price drift: ₹48,490 listed vs ₹54,990 live |
| Bosch 14-place dishwasher | Price drift: ₹42,390 listed vs ₹48,890 live |
| Godrej Interio Vurv study chair | Price drift: ₹4,320 listed vs ₹4,800 live |
| NUUK REN PRO stick vacuum | Price drift: ₹16,499 listed vs ₹17,999 live |
| Nilkamal Sierra recliner | Price drift: ₹10,861 listed vs ₹15,190 live |
| Havells Ambrose DX BLDC fan | Price drift: ₹2,000 listed vs ₹2,890 live |
| Acer EK220Q 21.5-inch monitor | Price drift: ₹4,994 listed vs ₹5,548 live |
| Unbranded analog watch | Only 3 ratings; no price shown |
| HomeBasic face razor "₹1 samples" | Sample/loot promotion |
| Bajaj Pulsar NS 125 | Booking listing, not a buyable product |
| Hero Pleasure+ | Booking listing (repeat) |
| Milton casserole set (Flipkart) | Price drift, caught in stage 1 (repeat) |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,434 (12,429 + 5) |
| Broadcast cursor | 12946 vs DB max 12951. The gap is this tick's 5 deals; the external broadcast cron picks them up. |
| Prod endpoints (7) | all 200 in 0.10–0.54s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
