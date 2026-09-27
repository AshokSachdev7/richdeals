# DEAL-INGEST indiafreestuff tick 2026-09-27zr

**Result:** 11 new deals live (10 Amazon, 1 Flipkart). Live deals went from 11,241 to 11,252.

## Sweep
- **Swept:** homepage + /deals pages 1-3, 28 new slugs.
- **Dropped before resolve:** Navneet crayons (min-buy-2), Cadbury rakhi hamper (seasonal).
- **Resolved:** 26 via the base64 `?rto=` Buy Now. 0 productIds already in the DB, so no upsert overwrote an existing slug.
- **Verified:** Amazon PDPs in the logged-in tab (`.priceToPay`, M.R.P., `#availability`, add-to-cart, rating). Flipkart via ld+json.
- **Result:** 11 passed, 14 rejected.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 11, all `created:true`)
| Deal | Store | Price | M.R.P. |
|---|---|---|---|
| Symbol men's stretch jogger jeans | Amazon | ₹549 | ₹2,299 |
| Brustro semi-auto pencil sharpener | Amazon | ₹425 | ₹597 |
| CP PLUS 2U CCTV wall rack | Amazon | ₹999 | ₹1,600 |
| Eveready Ultima AAA, pack of 4 | Amazon | ₹59 | ₹170 |
| Fire Turtle vintage 10W speaker | Amazon | ₹602 | ₹1,999 |
| Meridian set of 3 trolleys | Amazon | ₹3,999 | ₹37,997 |
| One94Store lotus string lights, 3 m | Amazon | ₹199 | ₹499 |
| PANCA auto 3-fold umbrella | Amazon | ₹299 | ₹999 |
| Trident 500 GSM face towels, set of 4 | Amazon | ₹278 | ₹499 |
| Zebronics Cat 6 cable, 1.5 m | Amazon | ₹134 | ₹499 |
| Kemei 1600W hair dryer | Flipkart | ₹634 | ₹1,699 |

- **Rounded price:** Brustro reads ₹425.42 on the PDP; drift under ₹1.
- **One94 image:** `data-old-hires` was null; `516aIoXpytL._SL1500_` verified by loading it (679x679).
- **Copy:** original, GEO style. **Images:** m.media-amazon.com / rukmini1.flixcart.com only. **Affiliate:** `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`.
- **Script:** `apps/api/scripts/push-ifs-0927zr.mjs`.

## Rejected (14)
- **Coupon only:** HELLCAT girls' co-ord set (10% coupon), Logitech G915 X (₹6,500 coupon).
- **Already rejected at TG 27zq:** coaster set B0GSFK1WF1 (IFS ₹100 vs PDP ₹448).
- **No buy box:** egg dispenser, Navneet study kit, STREETJAM scooter.
- **Price drift:** Kingsway door guard (IFS ₹119 vs PDP ₹349), Kemei km-6830 (IFS ₹432 vs ld+json ₹540).
- **Low rating:** GameSir Echo Plus (3.2), FIMI landing gear (1.0), wireless charging receiver (2.6), X-Level Note 9 case (1.0).
- **Thin listing:** ARGB heatsink (2 reviews, blank availability), Clovia tights (only 1 left).

## Freshness
- **IndexNow:** HTTP 200 for 14 URLs (11 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes. **llms.txt:** force-dynamic, already current.
- **Spot check:** Eveready and Kemei deal pages return 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,252 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11588 vs DB max 11599. This batch is queued for the external broadcast cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
