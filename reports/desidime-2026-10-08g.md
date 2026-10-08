# DesiDime tick 2026-10-08g (12:49 IST)

**20 fresh candidates → 2 pushed** (both Amazon). `/admin/deals/bulk` count 2, both `created:true`. Both live pages return 200. IndexNow **HTTP 200** for 5 URLs.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [Amazon Basics large modular organizer, off white, 2 piece](https://richdeals.in/amazon-basics-multi-purpose-large-modular-organizer-off-white-2-piece-b0fxxz1gfz) (B0FXXZ1GFZ) | ₹1,419 | ₹2,999 | 53% | 4.2★ (19,411) |
| [LEGO Speed Champions Red Bull RB20 F1 car 77243](https://richdeals.in/lego-speed-champions-oracle-red-bull-racing-rb20-f1-car-77243-b0dhsfbrpb) (B0DHSFBRPB) | ₹1,274 | ₹2,794 | 54% | 4.6★ (22,183) |

Both were checked on the Amazon product page in the logged-in tab: `#centerCol` price matched the DesiDime price, `#availability` showed In stock, and add-to-cart was present. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

## Rejected (18)

| Candidate | Reason |
|---|---|
| Triumph Tracker 400, Super Splendor XTEC, Pulsar 125, Pulsar N160 | Bike bookings, not a product deal |
| P.N.Gadgil gold ring, Muthoot gold pendant | Gold price moves daily |
| Boat 20000mAh power bank, Portronics keyboard (Flipkart) | Price drift, caught by stage 1 |
| OnePlus Pad 4 | ₹59,999 live vs ₹57,999 posted (bank-card price) |
| Lenovo IdeaPad Slim 3 i7 | ₹77,990 vs ₹68,740, and 0 ratings |
| Lenovo ThinkPad E14 | ₹95,990 vs ₹88,490, 3.0★ from 4 ratings |
| DJI Osmo Pocket 3 Creator Combo | ₹45,990 vs ₹42,990 |
| COSORI 4.7L air fryer | ₹7,999 vs ₹7,199 |
| CP PLUS CP-E45Q camera | Rating 3.5★ (at or below the 3.5 cutoff) |
| BLACK+DECKER lawn mower | ₹8,396 vs ₹7,137 |
| Haier 596L fridge | ₹66,990 vs ₹48,540 |
| Xiaomi Pad 8 | ₹35,999 vs ₹30,749, only 1 left |
| Hitachi 1.5T AC | ₹35,489 vs ₹30,739 |

## CEO audit (12:49 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,263 |
| Broadcast cursor | 12780 vs DB max 12782. The 2 new rows are waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
