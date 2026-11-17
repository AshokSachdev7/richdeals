# SCHEMA-AUDIT tick — 2026-11-18

Report only. The tick fetched and parsed the JSON-LD on 33 prod URLs, then checked it against the DB and the visible page copy. Run at about 04:39–04:41 IST.

**Result: no stale Offer price on any sampled page. 0 parse errors, every page carries the expected types, and 32 of 33 URLs are clean. 1 FAIL is carried over: #14635 Mivi still has no priceValidUntil. Yesterday's 111-character post headline no longer flags. #11896's priceValidUntil is today (11-18), so its Offer lapses tonight. Sitewide, the share of LIVE deals with no priceValidUntil rose from 94.2% to 95.0%.**

## What was checked

- Every `application/ld+json` block parses.
- **Deal pages:**
  - Product and Offer: INR currency, Offer price equal to the DB price, the same ₹ figure in the visible copy, priceValidUntil present (skipped for EXPIRED deals, which correctly carry none), availability (InStock, Discontinued or OutOfStock), and an image.
  - FAQPage, with every question and answer visible on the page.
  - BreadcrumbList.
- **Posts:** Article (headline ≤110, datePublished, image, author), BreadcrumbList, and visible FAQ questions.
- Every breadcrumb item except the last has a url.

## Results

| Group | URLs | Clean | Issues |
|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`) | 4 | 4 | — |
| GSC top deals (#4142, #2440, #3498, #2321, #3492, #3506, #4188, #3593) | 8 | 8 | #4142, #2440 and #3498 are EXPIRED. Their Offer is Discontinued with no priceValidUntil, which is correct. |
| Flagged (#14635, #11896) | 2 | 1 | #14635 has no priceValidUntil (FAIL, carried over) |
| Re-checks (#652, #16224, #16722, #7683, #16134, #16632) | 6 | 6 | — |
| Newest LIVE deals (#16765–#16773) | 9 | 9 | — |
| Newest posts (4) | 4 | 4 | — |
| **Total** | **33** | **32** | |

Hub types: `/` Organization, WebSite, ItemList. `/offers` and `/blog` Organization, WebSite, BreadcrumbList, CollectionPage. `/stores/amazon` Organization, WebSite, ItemList, BreadcrumbList, FAQPage. Every deal page: Organization, WebSite, Product, BreadcrumbList, FAQPage.

### Deal Offers

Every Offer price below equals the DB price and the visible ₹ figure.

- **GSC top deals, EXPIRED:** #4142 ₹759, #2440 ₹1,999, #3498 ₹4,299. Availability Discontinued.
- **GSC top deals, LIVE:**
  - #2321 ₹289, #3492 ₹223, #3506 ₹249 and #4188 ₹1,699 are valid until 11-26.
  - #3593 ₹617 is valid until 11-28.
- **Flagged:**
  - #14635 Mivi ₹599: InStock, no priceValidUntil.
  - #11896 American Tourister ₹899: valid until 11-18 (today).
- **Re-checks:**
  - #652 ₹1,604, #16722 ₹780, #7683 ₹1,899, #16134 ₹374 and #16632 ₹2,699 are valid until 11-30.
  - #16224 ₹225 is valid until 11-23.
- **Newest LIVE deals**, all valid until 12-01: #16773 ₹326, #16772 ₹999, #16771 ₹1,661, #16770 ₹298, #16769 ₹327, #16768 ₹11,000, #16767 ₹6,599, #16766 ₹330, #16765 ₹470.

### Posts

| Post | Types | Issue |
|---|---|---|
| `how-to-dry-clothes-indoors-winter-without-damp-smell-i…` | Article, BreadcrumbList, FAQPage | — |
| `stand-mixer-vs-hand-mixer-atta-kneading-cake-baking-in…` | Article, BreadcrumbList, FAQPage | — |
| `air-purifier-filter-replacement-when-to-change-hepa-ca…` | Article, BreadcrumbList, FAQPage, HowTo | — |
| `hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india` | Article, BreadcrumbList, FAQPage, HowTo | — (yesterday's 111-char headline no longer flags) |

All four returned 200 on the first fetch; no 504s this run.

- **HowTo:** two posts emit a HowTo block. Google removed HowTo rich results in 2023, so the block is harmless but earns nothing. Info only.
- **FAQPage:** FAQ rich results were retired for all sites on 2026-05-07. The visible FAQ still helps answer engines, so FAQPage stays. Info only.

## PRIORITY: stale Offer price

**No sampled Offer is stale.** Every LIVE Offer matches the DB price and the visible ₹ copy. Two rows need a price re-read, and the sitewide freshness gap is widening:

| Row | Offer | Last priceHistory | State |
|---|---|---|---|
| #14635 Mivi DuoPods Zig | ₹599, no priceValidUntil | 10-24 (25 days) | FAIL. Needs a Flipkart PDP read in the browser, then a priceHistory row, or delisting. |
| #11896 American Tourister | ₹899, valid until 11-18 | 11-04 | Lapses tonight. Known Flipkart drift; re-read the PDP today. |

## Sitewide: age of the last priceHistory row (LIVE deals)

| Bucket | 11-18 | 11-17 | Offer state |
|---|---|---|---|
| none | 452 | 453 | no priceValidUntil |
| older than 14 days | 14,927 | 14,750 | no priceValidUntil |
| 12–14 days | 113 | 305 | valid, lapses within 2 days |
| under 12 days | 701 | 634 | valid |
| **Total** | **16,193** | **16,142** | |

**95.0% of LIVE deals carry no priceValidUntil** (15,379 of 16,193), up from 94.2% on 11-17. The 12–14 day bucket drained 192 rows into the over-14 bucket, and only 67 rows were added under 12 days. The cause is unchanged: the same-price confirm paths write no priceHistory row, so a deal that was re-checked and found unchanged still ages out. Only the top-100 deals are indexable, and every one sampled today is valid.

## CEO audit

Run at 04:40 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Prod endpoints | 7 of 7 at 200 (`/` 0.39s, `/offers` 0.18s, `/blog` 0.96s, `/sitemap.xml` 0.12s, `/feed.xml` 0.13s, `/api/deals` 0.11s, `/llms.txt` 0.60s) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 04:41 IST) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **#14635 Mivi:** re-read the Flipkart PDP and write a priceHistory row, or delist it.
- **#11896:** Flipkart drift; Offer lapses tonight.
- **Same-price confirms:** they should write a priceHistory row so priceValidUntil stays current. 95.0% of LIVE deals now lack one.
- **IFS redirector:** dead at g through n (8 ticks). Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **Low-stock re-check list:** unchanged from DESIDIME 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next SCHEMA-AUDIT run is at about 04:39 IST on 11-19, per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
