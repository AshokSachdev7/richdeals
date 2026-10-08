# DesiDime tick 2026-10-09c (04:45 IST)

**1 pushed. IndexNow returned HTTP 200 for 4 URLs** (the new slug plus 3 hub pages). The new page returns 200 on prod.

Stage 1 found 28 cards and dropped 14 as junk or other-store. 13 resolved to a product, 2 of those were already in the DB, and 11 were fresh.

## Pushed (1)

| id | ASIN | Product | Price | M.R.P. | Rating | Slug |
|---|---|---|---|---|---|---|
| 12845 | B0D2TWL8R9 | TEAKWOOD LEATHERS 55 cm hard cabin trolley, 8 wheels, aqua green | ₹859 | ₹8,199 (90% off) | 4.1★ (1,536) | `teakwood-leathers-55-cm-hard-cabin-trolley-bag-with-8-wheels-aqua-green-b0d2twl8r9` |

Checked on the Amazon product page: in stock with add-to-cart. Image is from `m.media-amazon.com`. Affiliate link uses `?tag=ashoksachdev-21`. POST returned count 1, `created:true`.

## Rejected (10)

| Candidate | Reason |
|---|---|
| Amazon B0FDKMG44N Royal Enfield Airforce helmet, ₹1,303 | Only 2 left |
| Amazon B0CQF7TQP4 Sony SRS-XV500, ₹18,240 on DesiDime | Product page shows ₹21,990 (drift) |
| Amazon B07GDWBLXR Faber 90 cm chimney | Currently unavailable, and only 5 ratings |
| Amazon B0GTZJVD3Y Lenovo LOQ Essential, ₹84,990 on DesiDime | Product page shows ₹99,990 (drift), 3.5★ from 3 ratings |
| Amazon B0932TCPT7 LUX bodywash | Personal care |
| Flipkart ACCH4RKZHFDRSHSW Marshall Monitor III | Stage-1 price drift |
| Myntra 72320c192a64 Sony SRS-XV800 | Stage-1 price drift |
| Flipkart SHOHP2SZRQCDZ5Z4 Nike Jordan Court Connect | Stage-1 price drift |
| Flipkart CHYHK53GSCXHETSW Hindware Regina chimney | Stage-1 price drift |
| Flipkart COMHHDEES8YNG4HP Lenovo IdeaPad Slim 3 | Stage-1 price drift |

Also dropped in stage 1: an Amazon `/promotion/psp/` "Get 2 for the price of 1" page, because it is a promo hub and not a single product.

## CEO audit (04:45 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 1 (the IST day is 4.75h old; CONTENT-SEO ticks will add more) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,328 |
| Broadcast cursor | 12844 vs DB max 12845: the 1 new deal, which the external cron will pick up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
