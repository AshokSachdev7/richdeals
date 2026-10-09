# DesiDime tick 2026-10-09g (12:49 IST)

**1 deal pushed** (count 1, created:true). IndexNow HTTP 200 (4 URLs). Deal page on prod returns 200.

Stage 1 found 33 cards. 17 resolved to a single product, 2 were already in the DB, and 15 were fresh. 14 of the 15 were rejected after verification.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| [Lifelong GlideOff Luxe 6-in-1 women's trimmer](https://richdeals.in/lifelong-glideoff-luxe-6-in-1-rechargeable-body-and-face-trimmer-for-women-b0fk59rkzm) (B0FK59RKZM) | ₹899 | ₹2,499 (64% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.0★ / 124 ratings | Amazon `ashoksachdev-21` |

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| Hero Pleasure+ XTEC scooter (Amazon) | ₹66,625 | none | Booking listing, not a product sale |
| Red Tape men sliders (Myntra) | ₹283 | ₹383 | Price drift |
| ASUS Chromebook CM1405 (Amazon) | ₹16,490 | ₹17,990 | Price drift; also 3.8★ / 23 ratings |
| ASUS V470 AIO (Amazon) | ₹53,240 | ₹59,990 | Price drift; no ratings |
| Sennheiser Momentum 4 (Amazon) | ₹16,040 | ₹20,990 | Price drift (re-read on the rendered PDP: no coupon) |
| Samsung 32" M5 Smart Monitor (Amazon) | ₹13,999 | ₹15,999 | Price drift |
| Luxor NOX pens, 50 pack (Amazon) | ₹299 | ₹299 | Only 1 rating |
| Borosil Grip Go 950 ml bottle (Flipkart) | ₹181 | ₹349 | Price drift |
| Nike, "any 3 at ₹1,500" (Flipkart) | ₹1,600 | n/a | Conditional multi-buy |
| ASUS Vivobook Go 14 (Amazon) | ₹42,990 | ₹48,990 | Price drift; no ratings |
| Havells Gatik Pro wall fan (Flipkart) | ₹1,672 | ₹2,090 | Price drift |
| Mi Air Purifier 4 Lite (Flipkart) | ₹7,578 | ₹10,990 | Price drift |
| Muthoot 24K gold pendant (Amazon) | ₹29,867 | ₹33,132 | Price drift (gold) |
| Nobero tees, pack of 3 (Amazon) | ₹499 | ₹849 | Price drift; only 1 left |

Flipkart prices were read from the ld+json in the logged-in browser tab. Curl gets a 403 from Flipkart, so stage 1's drift flags for these rows were not trusted. The drift was real for every one.

The `/p/itm…` path without a slug returns 404 on an in-tab fetch, but `/a/p/i?pid=` works.

## CEO audit

| Check | Result |
|---|---|
| Audit counts | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12363,max:12880}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12879. DB max is 12880, which is this tick's row; the external broadcast cron will pick it up on its next run. |
| Unpushed commits | 0 before this commit |

Clean.
