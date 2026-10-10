# DesiDime tick 2026-10-10j (20:43 IST)

Stage 1: 32 discovered, 15 product-resolved, 1 already in DB, 14 fresh.

## Pushed: 6 (bulk count 6, all created:true, status live)

All Amazon, verified on the PDP in the logged-in tab: price = card, In stock, add-to-cart present.

| ASIN | Item | Price / M.R.P. | Rating |
|---|---|---|---|
| B0FHWSXC4C | Desidiya crystal pendant light 400mm | ₹1,709 / ₹9,999 (83%) | 3.8★ (140) |
| B0G1JY47MV | Storio kids pottery wheel kit | ₹649 / ₹1,999 (68%) | 3.9★ (267) |
| B0CQFM8RBD | Storio kitchen set, sound & light | ₹799 / ₹2,469 (68%) | 3.8★ (1,340) |
| B0H5VWCNWN | JioTag 2nd Gen, grey | ₹999 / ₹2,999 (67%) | 3.8★ (372) |
| B01J1CFO30 | Redgear MP35 mousepad | ₹109 / ₹550 (80%) | 4.6★ (29,326) |
| B08R4DWM3N | Halonix 2-in-1 9W/0.5W LED bulb | ₹49 / ₹159 (69%) | 4.0★ (8,920) |

IndexNow: HTTP 200, 9 URLs (6 deals + 3 hubs). Sample deal page returns 200 on prod.

## Rejected (8)

| ID | Item | Reason |
|---|---|---|
| B0GT11NJ6T | HP Victus | ₹138,153 card vs ₹142,990 PDP; 7 ratings |
| B0GGR9DCCB | VW 43" TV | ₹19,499 vs ₹22,999 drift |
| B0GRV2DWP3 | Daikin AC | no add-to-cart |
| B0F3JKY28G | Xiaomi 43" | repeat drift |
| B0GY4VSVFN | Lifelong cooker set | ₹1,940 vs ₹1,999 drift |
| B0C9DTPM52 | Amazon Basics 128GB pen drive | ₹1,249 vs ₹1,299 drift |
| TMRHYFWEHUMW6RZV | Bombay Shaving Power Play NXT (Flipkart) | ₹489 card vs ₹499 ld+json |
| 1a1bef5cb8b1 | DEALZONE soap dish (Digihaat) | no ld+json, price unverifiable |

## CEO audit
- 3 posts today (IST), 0 coverless, 0 seo-less.
- 0 null-price, 0 null-image, 0 PENDING_REVIEW.
- 12,392 live deals, max id 12909. Broadcast cursor is 12903; the 6-row gap is this batch, and the external broadcast cron picks it up.
- All 7 prod endpoints return 200.
- 0 unpushed commits before this report.
