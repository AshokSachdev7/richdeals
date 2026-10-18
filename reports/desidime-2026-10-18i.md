# DESIDIME tick 2026-10-18i (16:32 IST)

**6 new Amazon deals pushed LIVE.** The bulk call returned 201 with count 6, all created:true, and every slug returns 200. IndexNow returned HTTP 200 for 9 URLs.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 37 |
| Resolved to a single product | 19 |
| Already in the DB | 4 |
| Fresh candidates | 15 (13 Amazon, 2 Flipkart) |
| Amazon checked on the PDP (`#centerCol`) | 13: 6 pass, 7 rejected |
| Flipkart checked (ld+json) | 2: 0 pass |
| **Pushed** | **6** |

## Pushed

| Product | Price / M.R.P. | Note |
|---|---|---|
| Woodland Men's Sneaker | ₹2,199 / ₹4,295 | |
| Woodland Men's OSGC 6698024 Sports Shoe | ₹1,749 / ₹3,995 | 2 left |
| Woodland Men's Casual Sneaker | ₹1,838 / ₹3,695 | |
| ASICS Unisex Tiger Runner II Sneakers | ₹2,491 / ₹6,999 | 1 left |
| ASICS Women's Patriot 13 Running Shoe | ₹2,089 / ₹5,499 | |
| ASICS Men's Trail Scout 3 Running Shoe | ₹2,749 / ₹5,499 | |

Affiliate: `?tag=ashoksachdev-21` on `/dp/ASIN`. Images come from m.media-amazon.com (`landingAsinColor` hiRes).

## Rejected

| Product | Card price | Live price | Reason |
|---|---|---|---|
| Wakefit King Mattress Protector | ₹992 | ₹724 | drift |
| Bhima 24K Gold Vedhani Ring 2g | ₹29,517 | ₹32,518 | drift (the gold rate moved) |
| Kalyan 24K Ayodhya Gold Coin Pendant 2g | ₹29,660 | none | no price, no add-to-cart |
| Clovia Women Yoga Pants | ₹348 | ₹370 | drift |
| Lenovo IdeaPad Slim 3 Ryzen 5 | ₹59,610 | ₹64,660 | drift (bank offer) |
| E GATE Atom 7X Projector | ₹11,142 | ₹11,990 | drift |
| ABOUT SPACE Study Table | ₹3,959 | ₹4,399 | drift |
| ZEBRONICS Juke Bar 11000 (Flipkart) | ₹50,749 | ₹56,999 | drift |
| Ai+ Nova 2 5G 64GB (Flipkart) | ₹11,399 | — | drift (stage 1) |

## CEO audit (16:32 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,137 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13662 / 13656. The gap of 6 is this batch. |
| Prod endpoints (7) | all 200, max 0.66 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 (checked at 16:07) |

No rot found.
