# DESIDIME-INGEST tick — 2026-11-15b

Stage 1 (`ingest-desidime.mjs`) read the listing cards only, applied the JUNK and GROCERY filters and resolved `visit.desidime.com`. It found 34 cards. 17 were dropped as junk or non-store, 15 resolved to products, 7 were already in the DB, 6 had been rejected in the last 24h, and 2 were fresh. Amazon prices were checked in the logged-in Playwright tab (`#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart). The Myntra dup was checked through its ld+json. Run at about 02:45 IST.

**Result: 2 new deals pushed LIVE (count:2, both created:true, #16584–16585). All dup rows match the DB, so nothing needed a price sync. IndexNow returned HTTP 200 for 5 urls. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| Row | Slug | Price | MRP | Off |
|---|---|---|---|---|
| #16584 | wireless-heated-shiatsu-neck-shoulder-massager-b0hb64mlwp | ₹999 | ₹3,999 | 75% |
| #16585 | dubstep-pop-1400-14w-portable-bluetooth-speaker-b0fhhqqnzy | ₹642 | — | — |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Images come from `m.media-amazon.com` at `_SL1500_`. All copy is original, and the ₹ in each title equals the numeric price.
- #16585 Dubstep: the card said ₹637 and the PDP said ₹642, so it was pushed at the PDP price. The PDP M.R.P. of ₹6,999 (91% off) is not credible for a 14W speaker, so the deal was pushed with no MRP or discount, and the copy says the price itself is the deal.
- #16584: the PDP image was a `_SX300_` thumbnail. It was upsized to `_SL1500_`.

## Dup re-checks

| Row | Deal | Card | PDP / ld+json | Action |
|---|---|---|---|---|
| #4692 | Logitech K250 B0FJQWRBVH | ₹604 | ₹854, in stock (matches the DB) | No change. The card price looks like a coupon or bank offer |
| #16571 | KRAFT INDIA Nehru jacket (Myntra) | ₹678 | ld+json ₹675, InStock (matches the DB) | No change |
| #16568 | Symbol kurta set B0DFWGS7B5 | ₹319 | Matches the DB | No change |
| #16365 | Gala scrubber B01568SIG8 | ₹110 | Matches the DB | No change |
| #16509 | TRIGGR Raze 1 (Flipkart) | ₹599 | Matches the DB | No change |
| #15255 | Solimo dinner set B0CB5QMMR4 | ₹464 | ₹789 at 15a (matches the DB) | No change |
| — | Dabur shower gel B0CJLY8XS3 | ₹81 | Low-ticket FMCG | Left as is |

## Rejected / skipped

- 6 candidates were rejected in the last 24h, so stage 1 skipped them: Q-RIOUS, Haier AC, BoroPlus, Lakme mask, ORDRO, Klook.
- A BHIM UPI app-store link was dropped in stage 1.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 2 slugs. It returned **HTTP 200** for 5 urls (2 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.60s) |
| new deal #16584 | 200 (0.17s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,006 = 16,006 (+2) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,583 vs 16,585 | Pending. The external broadcast run drains it and self-heals |
| Crons | 9/9 vs roster (CronList) | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- Stage 1 still records only Flipkart rejects.
- Same-price confirm paths still write no priceHistory row.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- 13 IFS Flipkart cards are still unresolved.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras (1 left) and #16558 Symbol shorts (4 left).
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
