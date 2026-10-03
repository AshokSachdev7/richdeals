# DesiDime tick 2026-10-03x — 2 pushed, IndexNow 200

Stage 1: 35 discovered, 18 resolved, 2 already in DB, 16 fresh. Every Amazon candidate was read in the logged-in Amazon tab (priceToPay, #availability, add-to-cart, rating). `/admin/deals/bulk` returned count 2 (both created:true). Both prod pages return 200. IndexNow returned HTTP 200 for 5 URLs.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| SPYDER CRAFT engineered wood computer desk (B0G448YFQW) | ₹2,246 | ₹9,999 | 78% | 3.6 / 304 |
| Fastrack Stunners X black dial leather watch (B0DVG7XMJ9) | ₹1,194 | ₹2,095 | 43% | 4.0 / 194 |

## Rejected

| Candidate | Reason |
|---|---|
| Digihaat organic ACV | food, no ld+json |
| Samsung G3 monitor (Flipkart) | price drift |
| Careforce ear-wax cleaner B0DQTHXPKK | health |
| Dove Dryness Care shampoo B07HB1YHZP | low-ticket FMCG |
| XPG GAMMIX S60 512GB SSD B0GKG7MYHW | no buy box, 2 ratings |
| Beyond Auriga Pro 4 gas stove B0GFDYCGQF | 3.1 stars, no buy-box price |
| Maybelline Fit Me blush B0BD27W634 | unavailable (no add-to-cart) |
| Aristocrat Harbour 66 cm trolley B0BSV5RK5C | unavailable (no add-to-cart) |
| Mini steam iron B0HLQ15XTT | 0 ratings |
| Foldable travel bag B0HLPMG48H | 0 ratings, no availability |
| Gleva lipstick B0D7S1647B | 3 ratings |
| IFB 1.5T 3-star AC B0GSJLW576 | card ₹28,740 vs PDP ₹33,990 |
| GOVO GoSurround 900 B09YV5LC7F | card ₹4,185 vs PDP ₹4,999 |
| GadgetBite EON 84W car charger B0GW1XWH62 | paise price ₹559.82, 11 ratings |

## CEO audit

| Check | Result |
|---|---|
| LIVE / pending / null price / null image | 12,000 / 0 / 0 / 0 |
| Posts / coverless / seo-less | 362 / 0 / 0 |
| Posts per day IST (10-03) | 4 (cap met) |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | all 200 |
| Broadcast cursor vs max deal | 12477 vs 12479 (this tick's 2 queued for external cron, not rot) |
| Unpushed commits | 0 |
