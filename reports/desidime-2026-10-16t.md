# DESIDIME tick 2026-10-16t (16:33 IST)

**3 deals pushed LIVE (count 3, all created:true). IndexNow HTTP 200 (6 URLs). No rot.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 35 |
| Resolved to a single product (JUNK/GROCERY filters applied) | 22 |
| Already in DB | 4 |
| Fresh candidates | 18 |
| Verified and pushed | 3 |

## Pushed

All are Amazon, verified in the logged-in tab (price, `#availability`, add-to-cart button), affiliate `?tag=ashoksachdev-21`, image from `m.media-amazon.com`.

| ASIN | Product | Price | MRP |
|---|---|---|---|
| B0C6KVLWRX | Cortina damask curtain, 5 ft | ₹119 | ₹698 |
| B0HKZ8Q2B5 | LUMONY clear PVC makeup pouch, set of 3 | ₹99 | ₹599 |
| B0H4267PNT | Core 55 cm cabin trolley, 8 spinner wheels | ₹999 | ₹8,999 |

## Rejected

| Item | Reason |
|---|---|
| REDMI Turbo 5 B0H293SFTR | DesiDime card ₹35,999, product page ₹40,999 (card price includes coupon/bank offer) |
| Symbol women's pyjama set B09TPCP8Y9 | Card ₹155, product page ₹249 |
| Sleepyhead Flip mattress B0DFQB9NWT | Card ₹5,558, product page ₹6,539 |
| Lenovo IdeaPad Slim 3 B0HKJN24R2 | Card ₹64,990, product page ₹77,990 |
| Kalyan 2 g gold coin B0DHVWY583 | Card ₹29,660, product page ₹32,737 (same as last tick) |
| Samsung Odyssey G9 B0HDSK5WMF | Card ₹89,240, product page ₹91,999 |
| Crompton Arno Neo 15 L geyser B08GSQXLJ2 | Card ₹4,874, product page ₹5,698 |
| baybee car seat (Flipkart) | Card ₹399; rendered page shows ₹2,898 and Sold Out |
| FABRIPPLE cargo pants (Ajio) | Card ₹200; rendered page shows ₹480 (₹400 only with new-user code) |
| DesiDiya LED lights (Instamart) | Quick-commerce, location-locked |
| OnePlus trimmer, KENT purifier, Motorola soundbar, realme washer, Kaff air fryer (Flipkart) | Price drift caught by stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,704 / 13224 |
| Broadcast cursor | 13221. The gap is this batch; the external broadcast cron picks it up on its next run |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9, matches roster |
| Unpushed commits | 0 before this report |

No rot found.
