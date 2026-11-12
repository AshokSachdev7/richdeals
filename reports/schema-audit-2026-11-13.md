# SCHEMA-AUDIT tick 2026-11-13

**Result: 30 URLs, all HTTP 200. 29 PASS, 1 FAIL. PRIORITY: #14635 Mivi (Flipkart) has a stale Offer (last priceHistory row 10-24, 19d, so no priceValidUntil). GSC top deal #3593 lapses tomorrow (valid until 11-14). Sitewide, 14,622 of 15,892 LIVE deals (92.0%) ship an Offer without priceValidUntil, up from 91% on 11-12.** Run at about 05:08 IST.

## What was checked

- **Product + Offer**:
  - The Offer price matches the visible price and the DB price.
  - `priceCurrency` is INR.
  - `priceValidUntil` is present and in the future. It is the last priceHistory row + 14d, and it is omitted when that row is older than 14d.
  - `availability` is InStock for LIVE rows and Discontinued for EXPIRED rows.
- **BreadcrumbList** is present on every deal, hub and post page.
- **FAQPage**: every schema question appears in the visible FAQ `<section>`.
- **Article** is present on posts, with BreadcrumbList and FAQ.
- Sample:
  - 5 hubs.
  - 8 GSC top deal pages.
  - The 7 newest deals.
  - 6 rows price-synced or re-confirmed this cycle.
  - The 4 newest posts.
- Sitewide: every LIVE deal bucketed by the age of its last priceHistory row (read-only raw SQL).

## Results

| Group | URLs | PASS | FAIL | Notes |
|---|---|---|---|---|
| Hubs | 5 | 5 | 0 | `/` has Organization, WebSite and ItemList. `/offers` and `/blog` have CollectionPage and BreadcrumbList. `/stores/amazon` has a 9-question FAQ. `/category/shopping-category/appliances` has a 4-question FAQ. |
| GSC top deals | 8 | 8 | 0 | Discontinued: #4142, #2440 and #3498 (all EXPIRED). LIVE: #2321 ₹289, #3492 ₹223, #4188 ₹1,699 and #3506 ₹249 all have lastPH 11-12, valid until 11-26. #3593 ₹479 has lastPH 10-31 (12d), valid until 11-14. |
| Newest deals | 7 | 7 | 0 | #16462 to #16468 (₹156, ₹315, ₹1,675, ₹899, ₹399, ₹200, ₹2,329). All have fresh PH rows and are valid until 11-26. |
| Synced / re-confirmed rows | 6 | 5 | 1 | #7751 ₹899, #16173 ₹616 and #16243 ₹299 are valid until 11-26. #11896 ₹899 is valid until 11-18. #16043 is EXPIRED, Discontinued. **FAIL: #14635 Mivi ₹599, lastPH 10-24, priceValidUntil missing.** |
| Newest posts | 4 | 4 | 0 | Each has Article, BreadcrumbList and a 5-question FAQ. |
| **Total** | **30** | **29** | **1** | |

0 Offer price mismatches. All Offers are INR. 0 FAQ visibility fails.

The 4 newest posts:
- `steel-vs-glass-vs-insulated-lunch-box-office-school-india`
- `wedge-pillow-for-acid-reflux-angle-height-guide-india`
- `laptop-backpack-size-litres-15-6-inch-anti-theft-guide-india`
- `bentonite-clumping-cat-litter-guide-india`

## PRIORITY: stale Offer price

| id | Deal | DB price | Offer price | lastPH | Age | priceValidUntil |
|---|---|---|---|---|---|---|
| 14635 | Mivi (Flipkart) | ₹599 | ₹599 | 2026-10-24 | 19d | **missing** |
| 3593 | GSC top deal | ₹479 | ₹479 | 2026-10-31 | 12d | 11-14, lapses tomorrow |
| 11896 | Flipkart row | ₹899 | ₹899 | 2026-11-04 | 8d | 11-18, but Flipkart shows ₹664 (drift) |

Sitewide, LIVE deals by age of last priceHistory row:

| Bucket | Deals | Offer has priceValidUntil? |
|---|---|---|
| No priceHistory row | 453 | No |
| Last row older than 14d | 14,169 | No |
| Last row 12 to 14d old (lapses within 48h) | 546 | Yes, for at most 2 more days |
| Last row under 12d old | 724 | Yes |
| **Total LIVE** | **15,892** | **14,622 (92.0%) without** |

- The prices are correct. The DB, the Offer and the visible copy agree on every sampled page.
- The problem is the date, and it is getting worse: 91% on 11-12, 92% today, with 546 more rows lapsing in the next 48h.
- `priceValidUntil` is recommended, not required, so the Offer stays valid. But 92% of LIVE pages carry no validity date, which weakens the freshness signal on the deal pages that rank at positions 1 to 3.
- **Root cause (unchanged since 11-10):** a same-price re-confirmation and the IFS dup-sync never write a priceHistory row. Yesterday's 4 lapsing GSC deals were saved only because they were re-synced by hand.
- **Fix direction (not done, this tick is report only):** write a priceHistory row on every verified confirmation, including same-price ones, in the IFS dup-sync, desidime, TG and price-sync paths. Do not derive the date from `updatedAt`, which is the click counter.
- **Next price-sync batch:**
  - #14635: needs a Flipkart PDP read in a Playwright tab.
  - #3593: re-verify before it lapses 11-14.
  - #11896: still needs its ₹664 drift fixed.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.21s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.65s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,892 = 15,892 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,468 = 16,468 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3. 11-13 still has 0 at 05:08 IST. The CONTENT-SEO post is queued next in this session.

## Still open

- The same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92%.
- #14635 (Mivi, Flipkart): PDP unchecked, and now the schema FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Closed this tick:
- #2321 handmade soap (the 11-12 FAIL). It now has a PH row from 11-12 and is valid until 11-26.
- #3492, #4188 and #3506 were re-synced before they lapsed. All are valid until 11-26.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
