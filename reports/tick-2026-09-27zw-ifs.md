# DEAL-INGEST indiafreestuff tick 2026-09-27zw

**Result:** 13 new deals live (12 Amazon, 1 Myntra). Live deals went from 11,254 to 11,267.

## Sweep
- **Swept:** homepage + /deals pages 1-3, 37 new slugs.
- **Dropped before resolve:** Lotus gel creme (already live from TG 27zt), Christmas plush toy (seasonal).
- **Resolved:** 35 via the base64 `?rto=` Buy Now.
- **Already live:** 3 productIds (JVX jeans B0DVZK577F, ALYNE boyshorts B0DX28Z5DT, Symbol night suit B0FWB2K326). Skipped them so the bulk upsert could not rewrite their slugs.
- **Verified:**
  - Amazon PDPs in the logged-in tab (`.priceToPay`, M.R.P., `#availability`, add-to-cart, rating).
  - Flipkart via ld+json.
  - Myntra via the PDP state JSON (`discounted`, `mrp`, `outOfStock`).
- **Result:** 13 passed, 19 rejected.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 13, all `created:true`)
| Deal | Store | Price | M.R.P. |
|---|---|---|---|
| adidas Clear Factor M running shoe | Amazon | ₹1,443 | ₹3,799 |
| Symbol heavyweight crew-neck sweatshirt | Amazon | ₹379 | ₹1,999 |
| Symbol high-neck sweatshirt | Amazon | ₹599 | ₹2,399 |
| Symbol zipper polo | Amazon | ₹449 | ₹1,199 |
| BlissClub front-zip sports bra | Amazon | ₹1,199 | ₹2,399 |
| boAt Airdopes 138 Gen 2 | Amazon | ₹890 | ₹2,990 |
| Juarez JJ10GR harmonica, C | Amazon | ₹192 | ₹690 |
| Larah Mimosa pudding set, 5 pc | Amazon | ₹342 | ₹665 |
| Larah veg bowls, set of 6 | Amazon | ₹313 | ₹565 |
| Noise ALT Buds (S) | Amazon | ₹1,499 | ₹1,899 |
| POPWINGS floral maxi dress | Amazon | ₹159 | ₹1,299 |
| Samfor corduroy pants | Amazon | ₹399 | ₹2,999 |
| Sonata 77097PP01 digital watch | Myntra | ₹719 | ₹2,249 |

- **PDP beat IFS:** on the adidas shoe, IFS showed ₹1,709 and the PDP ₹1,443. We published the PDP price. The Larah pudding set was ₹343 on IFS and ₹342 on the PDP.
- **Myntra:** the affiliate link is InRDeals wrapping `https://www.myntra.com/23315822`. The image is from `assets.myntassets.com`. The push script's image check now accepts Myntra images.
- **Copy:** original, GEO style.
- **Images:** m.media-amazon.com and assets.myntassets.com only.
- **Affiliate:** Amazon `tag=ashoksachdev-21`, Myntra via InRDeals.
- **Script:** `apps/api/scripts/push-ifs-0927zw.mjs`.

## Rejected (19)
- **Price drifted up:** Symbol pullover (IFS ₹399 vs PDP ₹499), Symbol Chinese-collar shirt (₹469 vs ₹519), Dollar Lehar panty (₹244 vs ₹292), DTR leggings (₹276 vs ₹288).
- **Coupon only:** DTR tight, WROGN sneakers, Zyphen shower caddy (PDP ₹685 vs IFS ₹524).
- **Low rating:** Highlander jeans (2.9), Lee Cooper sneaker (2.4), YOHO loafer (2.2), Samfor pant B0FVDX1HBG (3.3), Ubon charger (3.1).
- **Out of stock:** MamyPoko, Triumph shuttlecocks, Vector X shorts, Mi grooming kit (Flipkart ld+json OutOfStock).
- **Thin listing:** PROSAC mouse (no ratings), Himalaya diapers (only 1 left), kiaro Vivo X300 cover (₹15, no ratings; looks like a price error).

## Freshness
- **IndexNow:** HTTP 200 for 16 URLs (13 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Spot check:** the adidas and Sonata deal pages return 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,267 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11601 vs DB max 11614. The gap is exactly this batch of 13, queued for the external broadcast cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
