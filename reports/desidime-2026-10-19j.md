# DesiDime tick — 2026-10-19j — 6 pushed, IndexNow HTTP 200 (9 urls)

**Bulk push: 201, count 6, all created:true, all 6 slugs return 200.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (cards) | 39 |
| Product-resolved | 18 (20 junk/other dropped) |
| Already in DB | 4 |
| Fresh candidates | 14 (12 Amazon, 1 Flipkart, 1 Blinkit) |
| PDP price match | 8 |
| **Pushed** | **6** |

## Pushed

| Deal | ID | Price / MRP |
|---|---|---|
| Triple-wall insulated steel jug 2.1L + 2L (pack of 2) | B0H1CKPG8J | 177 / — (₹9,999 MRP not credible, nulled) |
| Deejay wall-mount kitchen shelf + knife holder | B0B8VVQ3H6 | 294 / 1099 |
| SITOVI 400ml airtight glass jars ×6 | B091MLKY9C | 255 / 899 |
| JD FRESH 3-slot steel mop/broom holder | B0DX1M2CNK | 359 / 1138 |
| Amazon Brand Solimo study table | B0G5SDWMXF | 1396 / 6399 (image from dynamic-image; no hiRes) |
| BRUTON men's running shoes (Flipkart) | SHOHRSKPZQDTTFE9 | 148 / 1299 (ld+json InStock, read in browser tab) |

Amazon checks: `#centerCol` price, `#availability` In Stock, add-to-cart present.

## Rejected

| Item | Reason |
|---|---|
| Indus Valley cookware set of 5 (B0GJF5GBZZ) | Drift 2108 → 2429 |
| Lifelong curd maker (B0DK1WFTQK) | Drift 522 → 544 |
| Sony 1000X Collexion headphones (B0GY4PPX7F) | Drift 46489 → 54989 (bank price) |
| Xiaomi Pad 8 Nano (B0GPW1TLSM) | Drift 37499 → 44999 (bank price) |
| Lifelong FitPro treadmill (B0FD7ZFZ1V) | No price, no add-to-cart |
| FKW501 keyboard (B09L83KMW2) | Duplicate of live #13832 (B0BJVRR4PW): same image, same ₹259 |
| Patanjali Kanti soap ×4 (B0DX1XRB3D) | Low-ticket FMCG (GROCERY rule) |
| Disano peanut butter (Blinkit) | Quick-commerce grocery, location-locked |

## CEO audit

- **Posts:** 4 today (IST, cap reached). Coverless 0, seoless 0.
- **Deals:** 13,326 LIVE. Null-price 0, null-image 0, PENDING_REVIEW 0.
- **Broadcast cursor:** 13843, DB max 13849. The gap is this batch; the external cron will pick it up.
- **Prod endpoints:** `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all return 200 (0.10–0.65s).
- **Housekeeping:** 0 unpushed commits. CronList shows 9 of 9 roster jobs.
