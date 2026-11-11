# SCHEMA-AUDIT tick 2026-11-12

**Result: 30 URLs, all HTTP 200. 29 PASS, 1 FAIL. PRIORITY: #2321 handmade soap has a stale Offer (last priceHistory row 10-28, 14d, so no priceValidUntil). 4 more GSC top deals (#3492, #4188, #3498, #3506) lapse tonight. Sitewide, 14,432 of 15,829 LIVE deals (91%) ship an Offer without priceValidUntil.**

## What was checked

- **Product + Offer**:
  - The Offer price matches the visible price and the DB price.
  - `priceCurrency` is INR.
  - `priceValidUntil` is present and in the future. It is the last priceHistory row + 14d, and it is omitted when that row is older than 14d.
  - `availability` is InStock for LIVE rows and Discontinued for EXPIRED rows.
- **BreadcrumbList** is present on every deal, hub and post page.
- **FAQPage**: the Q&A count matches the visible FAQ `<section>`.
- **Article** is present on posts, with BreadcrumbList and FAQ.
- Sample:
  - 5 hubs.
  - 8 GSC top deal pages.
  - The 7 newest deals.
  - 6 rows price-synced or re-confirmed this cycle.
  - The 4 newest posts.
- Sitewide: every LIVE deal bucketed by the age of its last priceHistory row (Prisma `groupBy`, read-only).

## Results

| Group | URLs | PASS | FAIL | Notes |
|---|---|---|---|---|
| Hubs | 5 | 5 | 0 | `/` has Organization, WebSite and ItemList. `/offers` and `/blog` have CollectionPage and BreadcrumbList. `/stores/amazon` has a 9-question FAQ. `/category/shopping-category/appliances` has a 4-question FAQ. |
| GSC top deals | 8 | 7 | 1 | Discontinued: #4142 (EXPIRED, ₹759) and #2440 (EXPIRED, ₹1,999). LIVE: #3593 ₹479 (lastPH 10-31, valid until 11-14). #3492 ₹299, #4188 ₹1,709, #3498 ₹4,299 and #3506 ₹249 all have lastPH 10-29, valid until 11-12 (today). **FAIL: #2321 ₹220, lastPH 10-28, priceValidUntil missing.** |
| Newest deals | 7 | 7 | 0 | #16392 to #16398 (₹399, ₹9,199, ₹204, ₹6,999, ₹621, ₹1,333, ₹49). All have lastPH 11-11 and are valid until 11-25. |
| Synced / re-confirmed rows | 6 | 6 | 0 | #7022 ₹108, #9063 ₹2,999, #9916 ₹79,990, #15258 ₹35,990, #16226 ₹79 (all valid until 11-23). #12508 ₹69 (valid until 11-24, was the 11-10 FAIL, now fixed by a fresh PH row). |
| Newest posts | 4 | 4 | 0 | Each has Article, BreadcrumbList and a 5-question FAQ. |
| **Total** | **30** | **29** | **1** | |

0 Offer price mismatches. All Offers are INR. 0 FAQ visibility fails.

The 4 newest posts:
- `steel-vs-glass-vs-insulated-lunch-box`
- `wedge-pillow-for-acid-reflux`
- `laptop-backpack-size-litres`
- `bentonite-clumping-cat-litter`

## PRIORITY: stale Offer price

| id | Deal | DB price | Offer price | lastPH | Age | priceValidUntil |
|---|---|---|---|---|---|---|
| 2321 | Handmade soap (GSC top deal) | ₹220 | ₹220 | 2026-10-28 | 14d | **missing** |
| 3492 | Aadhik (GSC top deal) | ₹299 | ₹299 | 2026-10-29 | 13d | 11-12, lapses tonight |
| 4188 | Bluemix (GSC top deal) | ₹1,709 | ₹1,709 | 2026-10-29 | 13d | 11-12, lapses tonight |
| 3498 | boAt soundbar (GSC top deal) | ₹4,299 | ₹4,299 | 2026-10-29 | 13d | 11-12, lapses tonight |
| 3506 | Amazon Basics stand (GSC top deal) | ₹249 | ₹249 | 2026-10-29 | 13d | 11-12, lapses tonight |

Sitewide, LIVE deals by age of last priceHistory row:

| Bucket | Deals | Offer has priceValidUntil? |
|---|---|---|
| No priceHistory row | 454 | No |
| Last row older than 14d | 13,978 | No |
| Last row 13 to 14d old (lapses within 24h) | 218 | Yes, until tonight |
| Last row under 13d old | 1,179 | Yes |
| **Total LIVE** | **15,829** | **14,432 (91%) without** |

- The prices are correct. The DB, the Offer and the visible copy agree on every sampled page.
- The problem is the date. `priceValidUntil` is recommended, not required, so the Offer stays valid. But Google sees an Offer with no validity date on 91% of LIVE pages, which weakens the freshness signal on exactly the deal pages that rank at positions 1 to 3.
- **Root cause (same as 11-10):** a same-price re-confirmation and the IFS dup-sync never write a priceHistory row. #12508 recovered only because it got re-priced.
- **Fix direction (not done, this tick is report only):** write a priceHistory row on every verified confirmation, including same-price ones, in the IFS dup-sync, desidime, TG and price-sync paths. Do not derive the date from `updatedAt`, which is the click counter. The 4 GSC deals that lapse tonight should be in the next price-sync batch.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.53s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,829 = 15,829 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- Blog misses: 11-08 had 0 posts, 11-01 had 1.
- Same-price confirmations and the IFS dup-sync write no priceHistory row. This is the root cause of #2321 and the sitewide 91%.
- TG 11-04l backlog still unchecked.
- TG items still pending: MILTON tiffin, TIED RIBBONS toran.
- Price drift:
  - #11896: Flipkart ₹664 vs DB ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
- The DO API token still needs rotating (owner action).

Closed this tick:
- #12508 FRONTECH HDMI (the 11-10 FAIL). It now has a PH row from 11-10 and is valid until 11-24.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
