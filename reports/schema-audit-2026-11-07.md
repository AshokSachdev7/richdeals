# SCHEMA-AUDIT tick 2026-11-07 (IST ~09:40)

**Result: 35 URLs checked, all HTTP 200. 31 PASS, 4 FAIL. All 4 FAILs are the same PRIORITY issue: a stale Offer price. The 8 stale rows from 11-04 are all fixed now. 4 new ones came from the 11-07 price-syncs, which updated `deal.price` but wrote no PriceHistory row. This tick is report-only; no code or data was changed.**

## What was checked

Script: `schema1107.cjs`. It parses every `<script type="application/ld+json">` block from the live prod HTML and diffs it against the visible copy and the DB row (Prisma). For each LIVE deal it also reads the newest `priceHistory.postedAt`.

- **Product/Offer:**
  - price = visible price = DB price
  - `priceCurrency` is INR
  - `priceValidUntil` is present
  - `availability` is InStock on LIVE deals and Discontinued on EXPIRED deals
  - there is no `seller`
- **BreadcrumbList:** the block is present and its items resolve.
- **FAQPage:** the questions match the visible FAQ `<section>` 1:1.
- **Article:** present on posts, with headline, image, datePublished and author.
- **URL sample:** homepage, /offers, /blog, 2 store and category hubs, GSC top deal pages, the 4 newest deals, the 11-04 stale 8 (re-check), the 11-07 synced rows, and the 4 newest posts.

## Results

| Group | URLs | PASS | FAIL | Notes |
|---|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`, `/category/shopping-category/appliances`) | 5 | 5 | 0 | `/`: Organization + WebSite + ItemList. `/offers` and `/blog`: CollectionPage + BreadcrumbList. Store hub: FAQ 9Q. Category hub: FAQ 4Q. |
| GSC top deal pages (#4142, #2321, #2440, #3593, #3492, #4188, #3498, #3506) | 8 | 8 | 0 | Every page has 5 blocks (Organization, WebSite, Product, BreadcrumbList, FAQPage), INR, no seller. #4142 and #2440 are EXPIRED and show Discontinued with no validUntil, which is correct. |
| Newest deals (#16213–16216) | 4 | 4 | 0 | lastPH 0d, until 11-20. |
| 11-04 stale 8, re-check | 8 | 8 | 0 | **Fixed.** lastPH is 11-04 (2d), until 11-18. |
| 11-07 synced rows | 6 | 2 | 4 | #15475 ₹474 (8d) and #15843 ₹599 (6d) PASS. The 4 FAILs are below. |
| Newest posts (mattress topper, neck pillow, lumbar cushion, ab roller) | 4 | 4 | 0 | Article + BreadcrumbList + FAQ 4Q. |
| **Total** | **35** | **31** | **4** | |

The 11-04 stale 8 were #2279 ₹1,799, #2483 ₹799, #3663 ₹554, #3881 ₹646, #4171 ₹351, #4172 ₹12,999, #4430 ₹1,019 and #6409 ₹600.

## PRIORITY: stale Offer price

| id | Deal | DB price | Offer price | lastPH | Age | priceValidUntil |
|---|---|---|---|---|---|---|
| 3594 | STRIDERS lunch box | ₹119 | **₹159 (stale)** | 07-27 | 102d | missing |
| 4817 | Philips HP8120 dryer | ₹807 | **₹869 (stale)** | 08-05 | 93d | missing |
| 1920 | Samsung 55" Mini LED | ₹45,965 | ₹45,965 | 07-26 | 103d | missing |
| 9473 | ANT Flora scale | ₹278 | ₹278 | 09-09 | 58d | missing |

**The stale Offer prices on #3594 and #4817 are the worst finding.** Each Offer still carries the deal's price from before the 11-07 sync: ₹159 on #3594 (IFS 11-07a) and ₹869 on #4817 (DesiDime 11-07b). The visible price and the DB price have both moved, so the schema and the visible copy disagree. That is the same signal that cost us Merchant Listings before (see the `gsc-keyword-strategy` memory).

**Root cause (inferred):**
- The 11-07 dup-row price-syncs used `prisma.deal.update` and inserted no PriceHistory row.
- Because of that, `dealPriceCheck()` (`apps/web/src/lib/site.ts:265`, called at `[dealSlug]/page.tsx:139`) sees a PriceHistory row more than 14 days old and drops `priceValidUntil`. All 4 rows show that.

**Not verified:** why the Offer on #3594 and #4817 still shows the old price. It is either an ISR page cached from before the sync, or the Offer price being read from the last PriceHistory row. Next tick should check this in the code before fixing.

**Fix for the next fix tick (not done here, report-only):**
1. Every price-sync path (IFS and DesiDime dup handling) inserts `priceHistory {dealId, price, postedAt: now}` next to the `deal.update`.
2. Backfill PriceHistory rows for the 4 ids above.
3. Revalidate those 4 slugs and ping IndexNow.
4. Re-run `schema1107.cjs` and confirm 35/35 PASS.

## Doc drift

None. The Offer has no `seller` on purpose (`[dealSlug]/page.tsx:178`), and CLAUDE.md already documents that.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200 | OK |
| API total vs DB LIVE | 15,650 = 15,650 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id vs broadcast cursor | 16,216 / 16,216 (drained) | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | OK (11-02 = 0 is historical; no day over the cap of 4) |
| Unpushed commits | 0 (before this report) | OK |
| Crons | 9/9 (last CronList, sitemon 11-07d) | OK |

## Still open

- **New:** 4 stale Offer rows (#3594, #4817, #1920, #9473). The price-sync paths need to write PriceHistory (see above).
- **TG 11-04l:**
  - B0GXB76VRW duplicates #4983 (LIVE ₹29,750). The channel's ₹25,175 is after a coupon and an HDFC offer.
  - Still unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- **Price and link backlog:**
  - #11896: Flipkart shows ₹664, DB has ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
  - Single deals to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **Other:**
  - Reticle MCP is down (CONNECTION_CLOSED).
  - DO token rotation is the owner's job.
