# DesiDime tick 2026-10-09i (16:46 IST)

**1 deal pushed** (count 1, created:true). IndexNow HTTP 200 (4 URLs). Deal page on prod returns 200.

Stage 1 found 28 cards. 11 resolved to a single product, 0 were already in the DB, and 11 were fresh. 10 of the 11 were rejected after verification.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| [L'Oreal Paris Excellence Creme hair colour, 4 Natural Brown](https://richdeals.in/l-oreal-paris-excellence-creme-permanent-hair-colour-4-natural-brown-72-ml-100-g-b006qhb8ha) (B006QHB8HA) | ₹399 | ₹699 (43% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.2★ / 27,369 ratings | Amazon `ashoksachdev-21` |

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| Kidsmate Cruiser kick scooter (Amazon) | ₹658 | ₹699 | Price drift |
| Cult women leggings (Amazon) | ₹399 | ₹399 | Only 3 left; 3 ratings |
| Lee Cooper chronograph LC07277.350 (Amazon) | ₹3,129 | ₹3,129 | No ratings |
| Seagate One Touch 8TB (Amazon) | ₹25,499 | ₹27,499 | Price drift |
| Bosch 302L 3-star fridge (Amazon) | ₹26,240 | ₹39,990 | Price drift |
| JBL Go 5 (Amazon) | ₹3,493 | ₹3,999 | Price drift |
| Sony WF-1000XM5 (Reliance Digital) | ₹13,990 | ₹13,990 | Only 1 rating |
| TCL G64 25" monitor (Flipkart) | ₹14,992 | ₹17,990 | Price drift (ld+json read in browser tab) |
| CP PLUS dashcam (Flipkart) | ₹1,669 | n/a | ICICI card-only price |
| OnePlus N6X (Instamart) | ₹15,000 | n/a | Quick-commerce, location-locked, no ld+json |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12370,max:12887}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12886. DB max is 12887, which is this tick's row; the external broadcast cron will pick it up on its next run. |
| Unpushed commits | 0 before this commit |

Clean.
