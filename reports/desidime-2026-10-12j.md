# DESIDIME tick 2026-10-12j (18:53 IST)

**3 of 20 fresh candidates pushed.**

- Stage 1 found 38 deals and resolved 24 to a single product. 4 were already in the DB, leaving 20 fresh. Before the push, the 3 passing product IDs were checked against the DB again: no matches.
- The bulk endpoint on the local API returned `count: 3`, all `created: true`. An earlier attempt against the prod URL returned 401 and wrote nothing.
- All 3 deal pages return 200 on prod (0.20–0.29s).
- IndexNow returned **HTTP 200** for 6 URLs (3 deal slugs plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Crompton Ultimo I 1 HP residential water pump (B0CGQ834KW) | Amazon | ₹3,879 | ₹5,700 | 32% | 3.9 (1,268) | `tag=ashoksachdev-21` |
| Tizum aluminium laptop stand, 7 angles (B0FPMHKJPL) | Amazon | ₹329 | ₹499 | 34% | 3.9 (81) | `tag=ashoksachdev-21` |
| Skybags Paratrip hard-sided cabin trolley (26805038) | Myntra | ₹1,376 | ₹7,060 | 81% | 4.6 (2,280) | InRDeals `inr678975705` |

**How each was checked:**

- **Amazon deals:** read on the product page in the logged-in Playwright tab (`#centerCol`, `#availability`, add-to-cart).
  - The price matches the listing exactly, and the add-to-cart button is present.
  - Neither deal has a coupon or an "only N left" warning.
  - Each image is the hiRes image from the product page.
- **Myntra deal:** read from the product page's ld+json and `__myx` page data in a browser tab: ₹1,376, InStock, not out of stock.

## Rejected (17)

| Deal | Reason |
|---|---|
| Bouncefit Sonic 144 neckband | Currently unavailable; no add-to-cart |
| Biotique Ubtan face pack | Skincare with a "fairer skin" claim, rejected under the health rule |
| Fossil blue dial watch | ₹5,847 listed was the price after a bank offer; the live price is ₹6,497 |
| Nilkamal Sierra recliner | Price drift: ₹10,861 listed vs ₹15,190.50 live |
| Nilkamal Arthur bed | Rated 3.3; price depends on a coupon |
| NUUK REN PRO vacuum | Price drift: ₹16,499 listed vs ₹17,999 live |
| Bosch dishwasher | Price drift: ₹42,390 listed vs ₹48,890 live, plus a coupon |
| LG DFB424FP dishwasher | Price drift: ₹48,490 listed vs ₹54,990 live |
| Lenovo IdeaPad Slim 3, R5 7520U (Flipkart) | Price drift: ₹57,285 listed vs ₹71,597 live |
| Kevriz BBQ grill basket (Flipkart) | Price drift: ₹1,015 listed vs ₹697 live |
| Sonata men's watch 77107SL01 (Myntra) | Out of stock; the ₹249 listing is gone and the price is back at the full ₹1,649 |
| Fastrack NJ3114PP02C (Myntra) | Out of stock; the ₹251 listing is gone and the price is back at the full ₹1,395 |
| 5 Flipkart listings | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 4 (cap reached) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,437 (12,434 + 3) |
| Broadcast cursor | 12951 vs DB max 12954. The gap is this tick's 3 deals; the external broadcast cron will pick them up. |
| Prod endpoints (7) | all 200 in 0.10–0.95s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
