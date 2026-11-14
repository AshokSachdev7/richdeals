# SCHEMA-AUDIT tick 2026-11-15

**Result: 32 URLs, all HTTP 200. 31 PASS, 1 FAIL. PRIORITY: #14635 Mivi (Flipkart) still has a stale Offer (last priceHistory row 10-24, 22d, so no priceValidUntil). #11896 lapses 11-18 and still carries the ₹664 Flipkart drift. Sitewide, 15,160 of 16,008 LIVE deals (94.7%) ship an Offer without priceValidUntil, up from 92.0% on 11-13.** Run at about 04:40 IST.

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
  - 4 hubs.
  - 8 GSC top deal pages.
  - 7 rows price-synced or flagged this cycle.
  - 9 newest deals (#16572, #16579, #16581 to #16587).
  - The 4 newest posts.
- Sitewide: every LIVE deal bucketed by the age of its last priceHistory row (read-only raw SQL).

## Results

| Group | URLs | PASS | FAIL | Notes |
|---|---|---|---|---|
| Hubs | 4 | 4 | 0 | `/` has Organization, WebSite and ItemList. `/offers` and `/blog` have CollectionPage and BreadcrumbList. `/stores/amazon` has ItemList, BreadcrumbList and FAQPage. |
| GSC top deals | 8 | 8 | 0 | Discontinued, as expected for EXPIRED rows: #4142 (PH 07-30), #2440, #3498 (PH 10-29). LIVE: #2321 ₹289, #3492 ₹223, #3506 ₹249 and #4188 ₹1,699 are valid until 11-26. #3593 is now ₹617 (PH 11-14), valid until 11-28. |
| Synced / flagged rows | 7 | 6 | 1 | #3538 ₹1,033, #9998 ₹125, #16518 ₹319 and #16521 ₹654 are valid until 11-28. #7751 ₹899 is valid until 11-26. #11896 ₹899 (PH 11-04) is valid until 11-18. **FAIL: #14635 Mivi ₹599, lastPH 10-24, priceValidUntil missing.** |
| Newest deals | 9 | 9 | 0 | #16572, #16579, #16581 to #16587. All have fresh PH rows and are valid until 11-28. |
| Newest posts | 4 | 4 | 0 | Each has Article, BreadcrumbList and FAQPage, with 0 issues. |
| **Total** | **32** | **31** | **1** | |

0 real Offer price mismatches. All Offers are INR. 0 FAQ visibility fails.

**#16521 note:** the first sweep read "Offer 645 != DB 654". A re-fetch showed Offer `"price":"654"` on 5 of 5 fetches. The ₹645 on the page is the 11-14 entry in the visible price-history timeline (PH rows 654 at 21:33Z and 645 at 17:45Z), which is legitimate. Recorded as PASS.

The 4 newest posts:
- `mink-vs-sherpa-vs-fleece-vs-microfibre-blank…`
- `keep-lunch-warm-till-afternoon-insulated-tif…`
- `yoga-mat-thickness-4mm-vs-6mm-vs-8mm-eva-vs-…`
- `how-to-clean-white-sneakers-at-home-canvas-l…`

## PRIORITY: stale Offer price

| id | Deal | DB price | Offer price | lastPH | Age | priceValidUntil |
|---|---|---|---|---|---|---|
| 14635 | Mivi (Flipkart) | ₹599 | ₹599 | 2026-10-24 | 22d | **missing** |
| 11896 | Flipkart row | ₹899 | ₹899 | 2026-11-04 | 11d | 11-18, but Flipkart shows ₹664 (drift) |

Sitewide, LIVE deals by age of last priceHistory row:

| Bucket | Deals | Offer has priceValidUntil? |
|---|---|---|
| No priceHistory row | 453 | No |
| Last row older than 14d | 14,707 | No |
| Last row 12 to 14d old (lapses within 48h) | 65 | Yes, for at most 2 more days |
| Last row under 12d old | 783 | Yes |
| **Total LIVE** | **16,008** | **15,160 (94.7%) without** |

- The prices are correct. The DB, the Offer and the visible copy agree on every sampled page.
- The date is the problem, and it keeps getting worse: 91% on 11-12, 92.0% on 11-13, 94.7% today.
- `priceValidUntil` is recommended, not required, so the Offer stays valid. But nearly 95% of LIVE pages carry no validity date, which weakens the freshness signal on the deal pages that rank at positions 1 to 3.
- **Root cause (unchanged since 11-10):** a same-price re-confirmation and the IFS dup-sync never write a priceHistory row. The GSC top deals stay valid only because they get re-synced by hand.
- **Fix direction (not done, this tick is report only):** write a priceHistory row on every verified confirmation, including same-price ones, in the IFS dup-sync, desidime, TG and price-sync paths. Do not derive the date from `updatedAt`, which is the click counter.
- **Next price-sync batch:**
  - #14635: needs a Flipkart PDP read in a Playwright tab.
  - #11896: fix the ₹664 drift before it lapses 11-18.
  - GSC top deals #2321, #3492, #3506, #4188: re-verify before they lapse 11-26.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.57s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- The same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 94.7%.
- #14635 (Mivi, Flipkart): PDP unchecked. It is still the schema FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB, and it lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- Low-stock rows to re-check: #16506 Shatras (1 left), #16558 Symbol shorts (4 left), #7461 (2 left).
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Closed this tick:
- #3593 (GSC top deal, the 11-13 lapse risk). It was re-synced to ₹617 with a PH row from 11-14 and is valid until 11-28.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
