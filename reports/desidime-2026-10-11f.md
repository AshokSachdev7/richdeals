# DesiDime tick 2026-10-11f (10:45 IST)

Stage 1 found 34 deals. 25 resolved to a product page and 2 were already in the DB, which left 23 candidates. The /new feed rotated this time, so most candidates were new.

## Pushed: 5 (count 5, all created:true, all slugs return 200)

| Deal | Store | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|---|
| Vector X Blaze 2.0 football shoes B0948NWGC6 | Amazon | ₹798 | ₹1,175 | 32% | 4.0★ (1,512) |
| Panasonic 5W LED junction downlighter B0F3XJNBZK | Amazon | ₹99 | ₹380 | 74% | 4.1★ (40) |
| Longway Super Pro 750W mixer grinder B0GWCRPGDB | Amazon | ₹1,498 | ₹3,939 | 62% | 4.0★ (1,754) |
| Mia Fashion grey jacket JCKH8YNHU5KPXGT7 | Flipkart | ₹551 | ₹3,999 | 86% | 3.7★ (551) |
| HIGHLANDER puffer jacket JCKGTMRMYWZAGRHC | Flipkart | ₹576 | ₹2,599 | 78% | 4.1★ (7,681) |

How each was verified:
- **Amazon:** price, availability and add-to-cart read from the product page in the logged-in tab. The Vector X image was taken from the `Blaze 2.0 Black/Gold` colour entry, which is the variant the link opens.
- **Flipkart:** the ld+json price, InStock status and rating were read in the browser tab. The M.R.P. was read from the page JSON.
- **Copy:** written fresh, and the preflight check passed.

**IndexNow:** HTTP 200 for 8 URLs (the 5 slugs plus 3 hubs).

## Rejected (18)

**Card or coupon price drift.** The DesiDime price is lower than the product page:

| Item | DesiDime price | Product page |
|---|---|---|
| LERIMO shoe rack | ₹3,760 | ₹5,760 |
| ASUS V440 all-in-one | ₹66,040 | ₹76,990 |
| Solar wall light | ₹181 | ₹259 |
| Lenovo L22-4e monitor | ₹5,300 | ₹5,999 |
| Samsung S3 32" curved monitor | ₹11,591 | ₹13,999 |
| SleepyHug mattress | ₹5,009 | ₹5,979 |
| HP Smart Tank 720 | ₹15,949 | ₹18,699 (also 3.4★) |
| Lenovo D-Series 27" (Flipkart) | ₹6,299 | ₹6,999 |
| Hindware 50L cooler (Flipkart) | ₹6,074 | ₹6,749 |
| Maharaja 65L cooler (Flipkart) | ₹6,299 | ₹6,999 |
| Whirlpool 7kg washer (Flipkart) | ₹8,541 | ₹9,490 |
| Frontech 20" monitor (Flipkart) | ₹2,497 | ₹2,791 |
| GADDA pregnancy pillow (Flipkart) | ₹743 | ₹711 (price moved; also a health-adjacent product) |

**Failed other rules:**
- **Only 1–2 left:**
  - Lee Cooper sneaker: 2 left, and only 11 ratings.
  - Gigabyte B650 UD AC: 1 left, rated 3.3★ from 3 ratings.
- **Low rating or too few ratings:**
  - Magic Sponge: 3.0★ from 2 ratings.
  - Mia Fashion jacket JCKHFYDECPFKK95G: 4 ratings.

**Remaining rejects** are carried over from earlier ticks with the same reasons as before.

## CEO audit (10:48 IST)
- Posts: 2 today (IST); next CONTENT-SEO run at 12:09. 0 coverless, 0 seo-less.
- Deals: 0 null price, 0 null image, 0 PENDING_REVIEW.
- LIVE: 12,403, up 5 from this push. DB max id is 12920. The broadcast cursor is at 12915; it trails because of this push and the external cron catches it up.
- Prod endpoints: all 7 return 200, slowest is `/blog` at 0.50s.
- Unpushed commits: 0 before this report.
- Still open: 3 roster crons are missing (telegram-deal-monitor, deal-ingest indiafreestuff, AI-OVERVIEW). Say "restore all crons" to rebuild them.
