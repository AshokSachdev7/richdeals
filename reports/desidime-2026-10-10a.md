# DesiDime tick 2026-10-10a (00:48 IST)

**4 deals pushed** (count 4, all created:true). IndexNow HTTP 200 (7 URLs). Sample deal page on prod returns 200.

Stage 1 found 36 cards. 23 resolved to a single product, 4 were already in the DB, and 19 were fresh. 15 of the 19 were rejected after verification.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| Safari 45L expandable overnighter backpack, blue (B097G8NHNH) | ₹999 | ₹3,699 (73% off) | Amazon PDP: price matches, In stock + add-to-cart | Amazon `ashoksachdev-21` |
| Safari Weekender Neo 45L backpack, black (B097GD9LCJ) | ₹1,229 | ₹5,140 (76% off) | Amazon PDP: price matches, In stock + add-to-cart | Amazon |
| Amazon Brand Symbol men chino shorts, navy, waist 28 (B09ZHV4R95) | ₹99 | ₹1,799 (94% off) | Amazon PDP: price matches for waist 28, In stock + add-to-cart | Amazon |
| Bajaj Majesty DX-6 1000 W dry iron (IRNEFSJ4CJHXSUW8) | ₹579 | ₹1,400 (59% off) | Flipkart ld+json in the browser tab: ₹579, InStock, 3,76,469 ratings | Flipkart `djhackraj` |

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| Doctor slippers (Amazon) | ₹419 | ₹441 | Price drift |
| Redmi Pad 2 Pro (Amazon) | ₹22,749 | ₹26,999 | Price drift |
| Fossil FS5991 (Amazon) | ₹7,054 | ₹7,837 | Price drift |
| Haier 10 kg washer (Amazon) | ₹26,740 | ₹39,990 | Price drift; 3.0★ / 2 ratings; only 1 left |
| Samsung ViewFinity S8 32" (Amazon) | ₹29,249 | ₹31,999 | Price drift |
| Graco Lite Rider (Amazon) | n/a | none | No price, no add-to-cart |
| Havells Epic Storm fan (Amazon) | ₹2,881 | ₹3,590 | Price drift; no ratings |
| Cosmic Byte Lumora controller (Amazon) | ₹2,429 | ₹2,699 | Price drift |
| Xiaomi 43" FX Pro (Amazon, repeat) | ₹19,337 | ₹26,999 | Price drift |
| Origami tissues (Amazon) | ₹99 | ₹99 | Low-ticket FMCG |
| BenQ GW2790P (Flipkart) | ₹7,434 | ₹10,099 | Price drift; 2 ratings |
| Carrier 1.5 T AC (Flipkart) | ₹29,990 | ₹36,490 | Price drift |
| Lloyd 2 T AC (Flipkart) | ₹50,990 | ₹56,990 | Price drift |
| Godrej 185L fridge (Flipkart, repeat) | ₹12,996 | ₹17,040 | Price drift |
| Lenovo LOQ (Flipkart, repeat) | ₹84,380 | ₹1,09,990 | Price drift |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:0,cov:0,seo:0,np:0,ni:0,pend:0,live:12378,max:12895}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12891. DB max is 12895; the gap is this tick's 4 rows, which the external broadcast cron will pick up on its next run. |
| Unpushed commits | 0 before this commit |

Posts today is 0 because the IST day started 48 minutes ago. The CONTENT-SEO blog cron will publish today's posts. Otherwise clean.
