# DESIDIME — 2026-10-19k (22:33 IST)

**6 pushed (count 6, all created:true, all slugs 200) · IndexNow HTTP 200 (9 URLs)**

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 39 |
| Product-resolved (after JUNK/GROCERY filters) | 18 |
| Already in DB | 7 |
| Fresh | 11 |
| Rejected: price drift (Amazon PDP) | 3 |
| Rejected: other | 2 (Instamart brownie = grocery/location-locked; Amazon ₹1 sample promo) |
| **Pushed** | **6** |

## Pushed

| Store | PID | Deal | Price / MRP | Check |
|---|---|---|---|---|
| Amazon | B0DMP9ZFFW | Lifelong tri-ply fry pan 22 cm | 449 / 1899 | #centerCol, In stock, add-to-cart |
| Amazon | B0969Y1NZS | Philips Avent steam sterilizer | 2899 / 4995 | #centerCol, In stock, add-to-cart |
| Amazon | B0HNKC5SQT | Desidiya LED rope light 100 m | 1999 / 19999 | #centerCol, In stock, add-to-cart |
| Amazon | B0DGLKH2RL | Dettol Original soap 900 g | 250 / 300 | #centerCol, In stock, add-to-cart |
| Flipkart | ELWHB5PWEEDQ9DHK | CabONE Lite 2.5 sq mm wire 90 m | 628 / 2999 | ld+json ok (±₹1, InStock) |
| Flipkart | VPAHEM2GQNSGGJJ4 | Super Toy pull-back diecast car | 98 / 799 | ld+json ok (±₹1, InStock) |

CabONE description flags CCA (copper-clad aluminium) from the listing URL.

## Rejected — price drift (DesiDime card → Amazon PDP)

| ASIN | Item | Card | PDP |
|---|---|---|---|
| B0FK5JR8ZR | Samsung 32" M5 smart monitor | 13099 | 16099 |
| B0GY4PPX7F | Sony 1000X The Collexion headphones | 46489 | 54989 |
| B0GPW1TLSM | Xiaomi Pad 8 nano texture | 37499 | 44999 |

Card prices include bank-card offers; PDP is truth.

## CEO audit

- **Posts:** 4 today (IST, cap reached). Coverless 0, seoless 0.
- **Deals:** 13,356 LIVE. Null-price 0, null-image 0, PENDING_REVIEW 0.
- **Broadcast cursor:** 13873, DB max 13879. Gap = this batch; external cron picks it up.
- **Prod endpoints:** `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all 200 (0.11–0.86s).
- **Housekeeping:** 0 unpushed commits. CronList 9 of 9 roster jobs.
