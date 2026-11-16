# SCHEMA-AUDIT tick — 2026-11-16

Report only. The JSON-LD on 36 prod URLs was fetched and parsed, then checked against the DB and the visible page copy. Run at about 11:15 IST.

**Result: 0 parse errors and every page carries the expected types. 1 real FAIL remains (#14635 Mivi, no priceValidUntil). 3 freshly price-synced pages served their pre-sync Offer price on the first fetch and the correct price on the next one. That is the Next data cache serving stale-while-revalidate, and the SEO-AUDIT-FIX tick fixes it today.**

## What was checked

- Every `application/ld+json` block parses.
- Deal pages: Product + Offer (INR, Offer price = DB price, the same ₹ figure in the visible copy, priceValidUntil present and in the future, availability InStock/Discontinued/OutOfStock, image), FAQPage with every Q and A visible on the page, and BreadcrumbList.
- Posts: Article (headline ≤110, datePublished, image, author), BreadcrumbList, and visible FAQ questions.
- Every breadcrumb item except the last has a url.

## Results

| Group | URLs | Clean | Issues |
|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`) | 4 | 4 | — |
| GSC top deals (#4142, #2440, #3498, #2321, #3492, #3506, #4188, #3593) | 8 | 8 | #4142, #2440, #3498 are EXPIRED: Offer is Discontinued with no priceValidUntil, which is correct |
| Flagged (#14635, #11896) | 2 | 1 | #14635 has no priceValidUntil (FAIL, carried over) |
| Today's TG dup-syncs (#16134, #14458, #12798, #14012, #7683, #652, #16632) | 7 | 4 | #7683, #16134, #16632 served stale on the first fetch (below) |
| Newest LIVE deals (#16651–#16659) | 9 | 9 | — |
| Newest posts (615–618) | 4 | 4 | — |
| **Total** | **34 checked + 2 re-fetched** | **30** | |

Every Offer on the GSC top LIVE deals is valid: #2321, #3492, #3506 and #4188 until 11-26, and #3593 (₹617) until 11-28. The thermal-curtains post (618) also emits a HowTo block alongside Article, BreadcrumbList and FAQPage.

## PRIORITY: stale Offer price

| Row | First fetch | DB / second fetch | Cause |
|---|---|---|---|
| #7683 Wonderchef Vista Plus | ₹1,699, no priceValidUntil | ₹1,899, valid until 11-30 | Next data cache |
| #16134 Axe Midnight Oak | ₹299, valid until 11-17 | ₹374, valid until 11-30 | Next data cache |
| #16632 USHA TechnoAir R | ₹1,930 | ₹2,699, valid until 11-29 | Next data cache |
| #14635 Mivi DuoPods Zig | ₹599, no priceValidUntil | same (last priceHistory 10-24) | No price row in 14+ days |

The deal page is `force-dynamic`, but `getDeal()` in `apps/web/src/lib/api.ts` still fetches with `next: { revalidate: 300 }`. The Next data cache therefore holds the API response, and the first request after the window returns the old copy while a background refresh runs. The TG tick synced these prices with `prisma.update`, which does not go through the revalidate webhook, so the old Offer was served once. A crawler that hits a rarely viewed page right after a sync gets the stale price, which is the demotion signal this audit exists to catch. Fix: `getDeal()` reads with revalidate 0 so the deal page is fresh on every request, as the page's own comment intends.

#11896 (American Tourister) is clean today: ₹899, valid until 11-18. The Flipkart drift (₹664) lapses on 11-18 unless the PDP is re-read.

## Sitewide: age of the last priceHistory row (LIVE deals)

| Bucket | Deals | Offer state |
|---|---|---|
| none | 453 | no priceValidUntil |
| older than 14 days | 14,687 | no priceValidUntil |
| 12–14 days | 359 | valid, lapses within 2 days |
| under 12 days | 581 | valid |
| **Total** | **16,080** | |

**94.2% of LIVE deals carry no priceValidUntil** (94.7% on 11-15, 92.0% on 11-13). The same-price confirm paths still write no priceHistory row, so a deal whose price was re-checked and found unchanged still ages out. Only the top-100 deals are indexable, and all of those sampled today are valid.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,080 = 16,080 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,655 vs 16,659 | OK. The external cron is mid-catch-up. |
| Prod endpoints | 7/7 at 200 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16.

## Still open

- #14635 Mivi: re-read the Flipkart PDP and write a priceHistory row, or delist it.
- Same-price confirms should write a priceHistory row so priceValidUntil stays current.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
