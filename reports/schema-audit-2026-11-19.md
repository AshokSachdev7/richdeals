# SCHEMA-AUDIT tick — 2026-11-19

Report only. The tick fetched each URL from prod, parsed every `<script type="application/ld+json">` block and checked it against the DB row and the visible page copy (`apps/api/_schema1119.cjs`, the 11-18 script with an updated pick list). Run at about 04:39 IST.

**Result: 34 URLs, all HTTP 200, 0 parse errors. 32 are clean and 2 FAIL, both on the Offer. #14635 Mivi carries over from earlier ticks. #11896 American Tourister is NEW: its Offer lapsed after 11-18 and now ships with no `priceValidUntil`. Every newest deal, every re-checked deal and every newest post is clean. Sitewide, 95.0% of LIVE deals still carry no `priceValidUntil`, flat against 11-18.**

## What was checked

- **Product + Offer:** the price matches the DB `price` and the visible ₹ figure, `priceCurrency` is INR, `priceValidUntil` is present on LIVE rows, and `availability` is InStock for LIVE and Discontinued for EXPIRED. An EXPIRED Offer should carry no `priceValidUntil`.
- **BreadcrumbList:** present, with absolute item URLs.
- **FAQPage:** every question and answer is in the visible FAQ section.
- **Article (posts):** headline (110 characters or fewer), `datePublished`, `image` and `author`.

## Results

| Group | URLs | Clean | Issues |
|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`) | 4 | 4 | 0 |
| GSC top deals | 8 | 8 | 0 |
| Re-checks from earlier ticks | 9 | 7 | 2 (#14635, #11896) |
| Newest LIVE deals | 9 | 9 | 0 |
| Newest posts | 4 | 4 | 0 |
| **Total** | **34** | **32** | **2** |

Hub types: `/` carries Organization, WebSite and ItemList. `/offers` and `/blog` carry Organization, WebSite, BreadcrumbList and CollectionPage. `/stores/amazon` carries Organization, WebSite, ItemList, BreadcrumbList and FAQPage. Every deal page carries Organization, WebSite, Product, BreadcrumbList and FAQPage.

### Deal Offers

- **GSC top deals, EXPIRED (correct):** #4142 ₹759, #2440 ₹1,999 and #3498 ₹4,299 show Offer `Discontinued` with no `priceValidUntil`.
- **GSC top deals, LIVE:** #2321 ₹289, #3492 ₹223, #3506 ₹249 and #4188 ₹1,699 are valid until 11-26. #3593 ₹617 is valid until 11-28.
- **Re-checks, clean:** #11026 ₹2,759, #16779 ₹280, #16768 ₹5,500, #16792 ₹219 and #16784 ₹2,699 are valid until 12-02. #11026 and #16779 were repriced by TG 19e, and their new prices match the DB and the visible copy.
- **Newest LIVE deals, clean:** #16891 ₹499, #16890 ₹425, #16889 ₹299, #16888 ₹239, #16887 ₹359, #16886 ₹1,182, #16885 ₹649, #16884 ₹289 and #16883 ₹148, all valid until 12-02.
- **FAIL:** #14635 and #11896, see the priority section.

### Posts

| Slug | Types | Status |
|---|---|---|
| `sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` | Article, BreadcrumbList, FAQPage, HowTo | Clean |
| `earbuds-one-side-not-working-how-to-fix-tws-india` | Article, BreadcrumbList, FAQPage | Clean |
| `garment-steamer-vs-steam-iron-which-to-buy-india` | Article, BreadcrumbList, FAQPage | Clean |
| `how-to-dry-clothes-indoors-winter-without-damp-smell-india` | Article, BreadcrumbList, FAQPage | Clean |

Info only: HowTo rich results were removed in 2023, and FAQ rich results were retired for all sites on 2026-05-07. Both blocks are valid and match the visible copy, so they stay.

## PRIORITY: stale Offer price

| Row | Offer | Last priceHistory | State |
|---|---|---|---|
| #11896 American Tourister (Flipkart) | ₹899, InStock, **no `priceValidUntil`** | 11-04, ₹899 (15 days) | **NEW FAIL.** The 14-day window lapsed after 11-18. Earlier ticks already flagged Flipkart price drift on this row. It needs a Flipkart PDP re-read in the Playwright tab (curl gets a 403 reCAPTCHA), then either a reprice with a new priceHistory row or a delist to EXPIRED. |
| #14635 Mivi (Flipkart) | ₹599, InStock, **no `priceValidUntil`** | 10-24 (26 days) | **FAIL, carried over.** Same fix path: Flipkart PDP re-read in the browser, then reprice or delist. |

Both rows show InStock at a price nobody has confirmed for two weeks or more. A stale Offer price is the demotion risk recorded in the GSC keyword memory, so these two come before anything else in this report.

## Sitewide: age of the last priceHistory row

LIVE deals only.

| Bucket | 11-19 | 11-18 |
|---|---|---|
| No priceHistory row | 452 | 452 |
| Older than 14 days | 15,016 | 14,927 |
| 12–14 days | 47 | 113 |
| Under 12 days | 769 | 701 |
| **Total LIVE** | **16,284** | **16,193** |

That leaves 15,468 of 16,284 LIVE deals (95.0%) with no `priceValidUntil`, flat against 11-18. Same-price confirms still write no priceHistory row, so a confirmed price ages out of the window the same as an unchecked one. The 12–14 day bucket fell from 113 to 47, which means 66 more rows crossed into the stale bucket overnight.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,284 = 16,284 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,891 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,891 = 16,891 | OK |
| Prod endpoints | 7 of 7 at 200 (`/` 0.26s, `/offers` 0.11s, `/blog` 0.69s, `/sitemap.xml` 0.17s, `/feed.xml` 0.18s, `/api/deals` 0.15s, `/llms.txt` 0.54s) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil` (priority above).
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a and 19b. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 04:53.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **Inflated M.R.P.s:** #16792 Bio-th implies 93% off and #16891 YOHO implies 91% off.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio has 2 units left at ₹5,500 from a third-party seller, and #16779 Yera has 1 unit left.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

Next SCHEMA-AUDIT run: 11-20 at 04:39 IST.
