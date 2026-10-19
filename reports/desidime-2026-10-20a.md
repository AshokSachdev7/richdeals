# DESIDIME — 2026-10-20a (00:31 IST)

**1 pushed (count 1, created:true, slug 200) · IndexNow HTTP 200 (4 URLs)**

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 35 |
| Product-resolved (after JUNK/GROCERY filters) | 13 |
| Already in DB | 7 |
| Fresh | 6 |
| Rejected: price drift (Amazon PDP) | 3 |
| Rejected: other | 2 (Digihaat groundnut: grocery with no ld+json; Amazon ₹1 sample promo) |
| **Pushed** | **1** |

## Pushed

| Store | PID | Deal | Price / MRP | Check |
|---|---|---|---|---|
| Amazon | B0GQJ6MHRC | Hitachi 1.5 Ton 5 Star inverter split AC with Wi-Fi (RAS.Y519PC) | 50990 / 84990 (40% off) | #centerCol, In stock, add-to-cart |

## Rejected — price drift (DesiDime card → Amazon PDP)

| ASIN | Item | Card | PDP |
|---|---|---|---|
| B0BRKXF951 | JBL Bar 800 Pro soundbar | 50949 | 54999 |
| B0FK5JR8ZR | Samsung 32" M5 smart monitor | 13099 | 16099 |
| B0GY4PPX7F | Sony 1000X The Collexion headphones | 46489 | 54989 |

The Samsung and Sony rows drifted in 10-19k too. DesiDime's card prices bake in bank offers.

## CEO audit

- **Posts:** 0 so far for 2026-10-20 (00:31 IST). Yesterday had 4. The 00:09 CONTENT-SEO fire has not run in this session yet (ticks queue while another tick is busy); the next slot is 06:09. Not rot yet, but re-check at SITEMON. Coverless 0, seoless 0.
- **Deals:** 13,377 LIVE. Null-price 0, null-image 0, PENDING_REVIEW 0.
- **Broadcast cursor:** 13899, DB max 13900. The gap is this push.
- **Prod endpoints:** all 7 return 200 (0.09–0.63s).
- **Housekeeping:** 0 unpushed commits before this report.
