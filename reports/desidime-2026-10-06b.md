# DesiDime tick 2026-10-06b

Stage 1 (`ingest-desidime.mjs`): 35 cards, 15 resolved to a product, 3 already in the DB, **12 fresh**. Each fresh candidate was checked on its PDP:
- Amazon in the logged-in tab: `#centerCol` price, `#availability`, add-to-cart and rating.
- Flipkart: ld+json in the browser tab.

## Pushed: 3 (`/admin/deals/bulk` count 3, all created:true, status live)

| Deal | Store | Price / M.R.P. | Rating |
|---|---|---|---|
| ESR Geo digital iPad pencil with Find My (B0DM5ZLR2S) | Amazon | 2,326 / 4,999 | 4.4 (3,801) |
| Double-decker lunch box, 3 containers + 2 spoons (B0DR76GBXT) | Amazon | 135 / 1,999 | 3.8 (269) |
| Mivi Fort H160 2.1ch 160W soundbar (ACCH3MUYBBS8HVYH) | Flipkart | 3,799 / 25,999 | 4.2 (20,226) |

Affiliate links: Amazon `tag=ashoksachdev-21`, and Flipkart `/p/itm…?pid=…&affid=djhackraj`. The DesiDime tags (`desidime01-21`, `salescueli`) were stripped.

## Skipped

| Item | Reason |
|---|---|
| Beardo Mariner perfume (B0CVBFQ7LM), Moxie shampoo combo (B0DHH2W6B1) | cosmetics/personal care |
| Shopsy ceiling fan | price drift (stage 1) |
| Amazon Basics 1000W dry iron (B0CHYTGQCM) | rating 3.5 |
| BISSELL SpotClean (B0DHS41MPF) | drift: 8,810 on the PDP vs 7,692 on the card |
| Polycab Aerofame BLDC fan (B0HCVQLQ7T) | 4,499 on the PDP vs 3,600 on the card (coupon/card-only price) |
| SATTVA bean bag cover (B08YMX9RSH) | no buy box / no add-to-cart |
| 20 L water can (B0GVBMKC67) | 8 ratings; only a 300px image |
| Philips TAT1179 (Flipkart ACCH4MGUVD6VVDZH) | rating 3.3 |

## Freshness

- IndexNow: **HTTP 200** for 6 URLs (3 slugs + 3 hubs).
- All 3 deal pages return 200 on prod.
- Sitemap: ISR, 30 min.
- llms.txt: dynamic.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 1. The cadence needs 1–2 more before midnight; the next blog cron (`9 */6`) covers it. |
| Coverless posts | 0 |
| LIVE null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 |
