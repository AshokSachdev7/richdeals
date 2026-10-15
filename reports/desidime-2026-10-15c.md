# DESIDIME tick 2026-10-15c (14:20 IST)

**2 deals pushed (bulk `count:2`, both created). IndexNow HTTP 200 for 5 URLs.**

Stage 1 found 33 cards. 12 were dropped as junk or non-product links: a combo, an app link, Flipkart category pages, an AJIO sale hub and others. 15 resolved to a single product. 5 of those were already in the DB, which left 10 fresh. The script rejected the 3 non-Amazon rows. The 7 Amazon rows were read on the product page in the logged-in Playwright tab. The fetched HTML had a blank `.priceToPay` block (festival pricing), so the price was read from the buy-box `priceAmount` JSON, cross-checked against `apex-pricetopay-value`.

## Pushed (Amazon, `tag=ashoksachdev-21`; PDP = card price, add-to-cart present)

| ASIN | Deal | Price | MRP |
|---|---|---|---|
| B0DRPFG5FR | iBELL SM410N 800W sandwich maker | ₹990 | ₹2,090 (53%) |
| B0CJ52CD2D | ANTINA hand gripper (1 left) | ₹29 | null (94% off, ≥80% rule) |

- **Copy:** titles and descriptions are original rewrites.
- **Images:** `data-old-hires` from m.media-amazon.com.
- **Prod check:** the iBELL page returns 200.

## Rejected (8)

| Deal | Reason |
|---|---|
| Lacoste LC33 watch (B0DFWXJP2V) | PDP ₹6,540 vs card ₹3,826 |
| Safari Thorium Royale set of 3 (B097GQVKTJ) | PDP ₹6,099 vs card ₹5,215 |
| TONOR USB mic (B0CQX4K9P5) | PDP ₹1,499 vs card ₹1,398 (the card price needs a 2% coupon) |
| ASUS Vivobook 15 (B0H8P895HL) | No buy-box price. The card price is a bank-card price. Also rejected at 10-15b. |
| Hitachi 1T 5-star AC (B0GP6S6S5F) | Same as ASUS. Also rejected at 10-15b. |
| OnePlus Nord Buds 4 (Myntra) | `productLd` price drift |
| Lenovo IdeaPad Slim 3 (Flipkart) | Price drift (again) |
| VLCC facial kit (JioMart) | No ld+json, so the price could not be verified |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 (cap 4). The rule is met. |
| No cover / no SEO / null price / null image / pending | 0 / 0 / 0 / 0 / 0 |
| LIVE deals / DB max id | 12,540 (+2) / 13057 |
| Broadcast cursor | 13055 vs max 13057. The 2-deal gap is this batch; the external cron will pick it up. |
| Prod endpoints (6) | All 200 in 0.18–0.63s |
| Session crons | 9 of 9 running (checked at the 10-15d SITEMON tick, 12 minutes earlier) |
| Unpushed commits | 0 before this report |

Fixes applied: none needed.
