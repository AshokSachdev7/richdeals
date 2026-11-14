# DESIDIME-INGEST tick — 2026-11-15c

Stage 1 (`ingest-desidime.mjs`) read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Results:

- 34 cards discovered.
- 18 dropped as junk or non-product.
- 16 resolved to a product.
- 10 already in the DB.
- 6 already rejected in the last 24h.
- 0 fresh.

All Amazon dups were re-checked on the PDP with an in-tab fetch in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability`, add-to-cart). The Myntra dup was read from the PDP's `discountedPrice` and `mrp`. Run at about 04:45 IST.

**Result: 0 pushed (0 fresh cards). 4 dup LIVE rows were price-synced, and 4 same-price confirms got a new priceHistory row, so all 8 now carry a priceValidUntil to 11-29. IndexNow returned HTTP 200 for 11 urls. Prod is 8/8 at 200 and every DB check is green.**

## Pushed

None. Every product card was either already in the DB or rejected in the last 24h.

## Dup re-checks

| Row | Deal | Card | PDP / ld+json | Action |
|---|---|---|---|---|
| #4692 | Logitech K250 B0FJQWRBVH | ₹604 | ₹854, M.R.P. ₹1,395, in stock | MRP fixed from ₹2,820 to ₹1,395, now 39% off instead of 70%. Description updated, PH row added. |
| #12947 | Philips 9W E27, pack of 4, B01303OKV8 | ₹226 | ₹226, M.R.P. ₹980, in stock | **Synced from ₹324 to ₹226 (77% off).** Title, description and PH row updated. Prod Offer shows 226. |
| #15255 | Solimo dinner set B0CB5QMMR4 | ₹464 | ₹530, M.R.P. ₹1,499 | **Synced from ₹789 to ₹530 (65% off).** The card's ₹464 is not on the PDP. Title, description and PH row updated. |
| #16568 | Symbol kurta set B0DFWGS7B5 | ₹319 | ₹274, M.R.P. ₹1,999 | **Synced from ₹319 to ₹274.** MRP stays null because 86% off breaks the ≥80% rule. Title, description and PH row updated. |
| #10870 | Vaseline 300 ml B0F4W9RPZ2 | ₹270 | ₹275, in stock | Price matches the DB. Same-price PH row added. |
| #16365 | Gala scrubber B01568SIG8 | ₹110 | ₹110 | Price matches. Same-price PH row added. |
| #16569 | Jungle puzzle B09PDFT2YF | ₹200 | ₹200 | Price matches. MRP stays null (90%). Same-price PH row added. |
| #16571 | KRAFT INDIA jacket (Myntra) 20050728 | ₹678 | discountedPrice 675, mrp 2,799 | Price matches. Same-price PH row added. |
| #16509 | TRIGGR Raze 1 (Flipkart) | ₹599 | Not re-read (card = DB) | No change |
| #1411 | Dabur shower gel B0CJLY8XS3 | ₹81 | ₹89 | Stays EXPIRED. Low-ticket FMCG, as in 15b. |

Slugs were not changed: `prisma.update` leaves them alone.

## Rejected / skipped

The 6 already rejected in the last 24h:

| Item | Price |
|---|---|
| Q-RIOUS B0GR6W5BFB | ₹119 |
| Haier AC ACNHHMBYDG2HDCRP | ₹24,390 |
| BoroPlus B0CMCW69WH | ₹49 |
| Lakme mask (Myntra 11523460) | ₹37 |
| ORDRO B07ZQ2T3Q6 | ₹6,660 |
| Klook | — |

The 18 junk drops were gift cards, cashback offers, app promos and other non-store links.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 8 synced or confirmed slugs. It returned **HTTP 200** for 11 urls (8 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.65s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.63s) |
| #12947 Philips deal page | 200 (0.20s), Offer price 226 |

## CEO audit

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

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- The same-price confirm paths in the scripts still write no priceHistory row. This tick added the rows by hand for 8 rows. The sitewide 94.7% without priceValidUntil needs the fix in the IFS dup-sync, desidime, TG and price-sync code.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB, and it lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras, #16558 Symbol shorts, #7461.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
