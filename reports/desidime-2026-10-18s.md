# DESIDIME tick 2026-10-18s (18:33 IST)

**5 new deals pushed LIVE: 4 Amazon, 1 Myntra.** The bulk call returned 201 with count 5, all created:true, and every slug returns 200. IndexNow returned HTTP 200 for 8 URLs.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Junk or non-store links dropped | 7 (plus an app-store link, the Amazon homepage and a dead Flipkart link) |
| Resolved to a single product | 25 |
| Already in the DB | 4 |
| Fresh candidates | 21 (17 Amazon, 3 Flipkart, 1 Myntra) |
| Flipkart checked by stage 1 (ld+json) | 3: 0 pass, all drift |
| Myntra checked by stage 1 | 1: 1 pass |
| Amazon checked on the PDP (`#corePriceDisplay` + `#centerCol`) | 17: 4 pass, 13 rejected |
| **Pushed** | **5** |

## Pushed

| Store | Product | Price / M.R.P. |
|---|---|---|
| Amazon | The Sleep Company AeroPlus Electric Height Adjustable Desk 1200mm | ₹17,990 / ₹39,999 |
| Amazon | Van Heusen Proactive Women Racerback Tank Top | ₹317 / ₹1,059 |
| Amazon | Havells NE6322 Nose and Ear Hair Trimmer | ₹449 / ₹1,095 |
| Amazon | Wakefit Gravita Ergonomic Office Chair | ₹5,497 / ₹12,999 |
| Myntra | Lakme Blush & Glow Strawberry Sheet Mask 25ml | ₹28 / ₹100 |

Affiliate links: Amazon uses `?tag=ashoksachdev-21` and Myntra goes through InRDeals. Stage 1 gave the Myntra card a bad productId (`2560500563aa`), so it was pushed with Myntra style id `11523452`, deduped by that id and by the affiliate URL.

## Rejected

| Product | Card price | Live price | Reason |
|---|---|---|---|
| Samsung 8kg AI Eco Bubble washer | ₹27,140 | none | no price, no add-to-cart |
| Eha serving bowls | ₹680 | ₹733 | drift |
| Polycab Wizzy Prime BLDC fan | ₹2,699 | ₹2,999 | drift |
| OnePlus Nord 6 8/256 | ₹42,999 | ₹44,999 | drift (bank offer) |
| Orient Enamour Classic Pro 25L geyser | ₹5,444 | ₹6,399 | drift |
| Energizer 20000mAh 65W power bank | ₹2,499 | ₹3,499 | drift |
| iQOO Z11 Lite 4/128 | ₹16,147 | ₹19,497 | drift |
| Lenovo IdeaPad Slim 3 i3 | ₹49,990 | ₹54,490 | drift |
| Kalyan 24K gold coin pendant 2g | ₹29,660 | none | no price, no add-to-cart (same as tick 18i) |
| iFFALCON 65" 4K TV | ₹32,499 | ₹39,999 | drift |
| Lenovo V15 G4 Athlon | ₹41,490 | ₹44,990 | drift |
| TCL 55" Mini LED TV | ₹49,490 | ₹55,990 | drift |
| Bhima 24K gold ring 2g | ₹29,517 | ₹32,518 | drift (same as tick 18i) |
| Haier 445L fridge, Acer Aspire 14 i7, ZEBRONICS Juke Bar 11000 (Flipkart) | | | drift, caught by stage 1 |

## CEO audit (18:33 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,155 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13680 / 13675. The gap of 5 is this batch. |
| Prod endpoints (7) | all 200, max 0.53 s (`/llms.txt`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 running, the whole roster |

No rot found.
