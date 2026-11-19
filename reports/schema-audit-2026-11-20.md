# SCHEMA-AUDIT tick — 2026-11-20

This is a report-only run: no data was changed. `apps/api/_schema1120.cjs` (a copy of `_schema1119.cjs` with an updated re-check list) fetched each prod URL, parsed every `<script type="application/ld+json">` block and compared it with the DB row and the visible page text. The same script bucketed every LIVE deal by the age of its last `PriceHistory` row. Run at about 04:39–04:42 IST on 11-20.

**Result: 31 URLs checked, 29 clean. The same 2 rows fail as on 11-19: #14635 Mivi and #11896 American Tourister. Both are LIVE Flipkart rows with no `priceValidUntil` because their last price check is more than 14 days old. No Offer price disagrees with the DB or the visible copy, and there are no parse errors.**

## What was checked

- **Product + Offer:** Offer price equals the DB price, the visible copy shows the same `₹` figure (en-IN format), currency is INR, availability is InStock / Discontinued / OutOfStock, and the Product has an image. LIVE rows need a future `priceValidUntil`; EXPIRED rows show Discontinued and need none.
- **FAQPage:** every question, and the first 40 characters of every answer, must appear in the visible text.
- **BreadcrumbList:** present, and every non-final item has a URL.
- **Article (posts):** `headline` (110 characters or fewer), `datePublished`, `image` and `author`, plus a BreadcrumbList.

## Results

| Group | URLs | Clean | Fail |
|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`) | 4 | 4 | 0 |
| GSC top deals (#4142, #2440, #3498, #2321, #3492, #3506, #4188, #3593) | 8 | 8 | 0 |
| Re-checks (#14635, #11896, #10653, #13228, #16973, #16977, #16891) | 7 | 5 | 2 |
| Newest LIVE deals (#16976 and #16978–16984; #16977 is counted under re-checks) | 8 | 8 | 0 |
| Newest posts | 4 | 4 | 0 |
| **Total** | **31** | **29** | **2** |

On 11-19 the run covered 34 URLs (32 clean). The total is smaller today because the newest-9 window overlaps the re-check list at #16977.

**Hub types:**
- `/`: Organization, WebSite, ItemList.
- `/offers` and `/blog`: Organization, WebSite, BreadcrumbList, CollectionPage.
- `/stores/amazon`: Organization, WebSite, ItemList, BreadcrumbList, FAQPage.

## Deal Offers

- Every deal page carries Organization, WebSite, Product, BreadcrumbList and FAQPage.
- **Offer = DB = visible ₹** on all 23 deal pages, all in INR.
- **EXPIRED (#4142, #2440, #3498):** Discontinued with no `priceValidUntil`, which is correct.
- **#10653 and #13228**, re-priced at TG 20c (₹195 → ₹190 and ₹549 → ₹679), now serve the new price with `priceValidUntil` 2026-12-03, so the re-price reached the schema.
- **#16973** (no buy box) and **#16977** (low stock) serve InStock with `priceValidUntil` 2026-12-03. The schema matches the DB. Whether the DB is still true is tracked on the watch lists below, not here.
- **#16891** (inflated M.R.P.) serves ₹499 = DB with `priceValidUntil` 2026-12-02. The Offer carries no M.R.P., so the inflated M.R.P. does not reach the schema.
- The GSC top LIVE rows (#2321, #3492, #3506, #4188) all have `priceValidUntil` 2026-11-26, and #3593 has 2026-11-28. Their last price check was 11-12 (11-14 for #3593), so they drop out of the valid window on 11-26 unless re-checked.
- **FAQPage** Q&As are all visible. FAQ rich results were retired for all sites on 2026-05-07, so this is Info only: the block stays for AI answer engines.

## Posts

| Slug | Types | Status |
|---|---|---|
| `belt-size-guide-leather-vs-pu-vs-canvas-india` | Article, BreadcrumbList, FAQPage, HowTo | Clean |
| `on-ear-vs-over-ear-headphones-which-to-buy-india` | Article, BreadcrumbList, FAQPage | Clean |
| `how-to-use-bike-car-cover-without-scratching-paint-or-…` | Article, BreadcrumbList, FAQPage, HowTo | Clean |
| `sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` | Article, BreadcrumbList, FAQPage, HowTo | Clean |

HowTo rich results were removed in September 2023. The blocks are valid and harmless, so this is Info only.

## PRIORITY: stale Offer price

| Row | Offer | Last priceHistory | State |
|---|---|---|---|
| #14635 Mivi DuoPods Zig (Flipkart) | ₹599, InStock, no `priceValidUntil` | 2026-10-24 (27 days old) | Stale, unchanged since 11-19 |
| #11896 American Tourister Valex backpack (Flipkart) | ₹899, InStock, no `priceValidUntil` | 2026-11-04, ₹899 (16 days old) | Stale, unchanged since 11-19 |

Both rows have GSC impressions, and both send Google an InStock price that nobody has re-checked for over two weeks. Stale Offer prices are the demotion risk noted in GSC keyword strategy. The fix is a Flipkart PDP read in a Playwright tab (curl gets a reCAPTCHA 403), followed by a re-price or delisting. That belongs to an ingest tick and was not done here, because this tick is report-only.

## Sitewide: age of the last priceHistory row

| Bucket | 11-19 | 11-20 | Change |
|---|---|---|---|
| No priceHistory | 452 | 451 | −1 |
| Older than 14 days (no `priceValidUntil`) | 15,016 | 15,011 | −5 |
| 12–14 days (loses `priceValidUntil` within 2 days) | 47 | 45 | −2 |
| Under 12 days | 769 | 870 | +101 |
| **LIVE total** | 16,284 | **16,377** | +93 |
| **Share with no `priceValidUntil`** | 95.0% | **94.4%** | −0.6 pt |

The total matches the 16,377 LIVE rows in the CEO audit. The small gain comes from the new TG and DesiDime rows and the two re-prices. The backlog of more than 15,000 LIVE pages with no `priceValidUntil` does not shrink on its own; it needs a bulk price-sync pass. Those pages are valid without it, but they are weaker merchant-listing candidates.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.16s, `/offers` 0.08s, `/blog` 0.47s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/llms.txt` 0.33s, `/api/deals` 0.07s; all 200 | OK |
| DB LIVE vs API total | 16,377 = 16,377 (newest id 16,984) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Local API (`localhost:4000/deals`) | 200 | OK |
| Report suffix | No `schema-audit-2026-11-20*` existed, so no suffix | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day is about 5 hours old, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **#14635 and #11896:** stale Offer, see PRIORITY above.
- **About 94% of LIVE deals** have no `priceValidUntil` (15,462 rows).
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## Next SCHEMA-AUDIT run

11-21 04:39 IST. Re-check #14635 and #11896, and watch the GSC top rows (#2321, #3492, #3506, #4188), whose `priceValidUntil` lapses on 11-26.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DESIDIME | 11-20 04:43 |
| DEAL-INGEST | 11-20 04:53 |
| TG | 11-20 05:01 |
| SITEMON | 11-20 05:14 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| AI-OVERVIEW | 11-25 11:39 |
