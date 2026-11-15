# DESIDIME-INGEST tick — 2026-11-15d

This tick ran stage 1 with `ingest-desidime.mjs` (cards only, JUNK/GROCERY filters, visit.desidime.com resolve). Amazon candidates were verified in the logged-in Playwright Amazon tab: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, and stock from `#availability` plus add-to-cart. Dedup was by productId against the live DB. Run at about 06:45 IST.

**Result: 2 pushed LIVE (bulk count 2, both `created:true`). 2 dup rows were price-synced: #4395 repriced and #1411 revived from EXPIRED. IndexNow returned HTTP 200 for 7 urls. Prod returned 200 on 7 of 7 endpoints plus the new deal page. LIVE is 16,011, which matches the API.**

## Stage 1

34 cards discovered, 22 dropped as junk, 12 resolved, 6 already in the DB, 3 rejected in the last 24h, 3 fresh.

## Pushed

| ASIN | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B08GL16RDS | Solimo 12-Inch Designer Wall Clock, Silent Movement, Black | ₹266 | ₹1,100 | 76% | price = card, in stock, add-to-cart present |
| B0F8VZ1KZF | HP 400 Quiet Wireless Mouse, Purple | ₹762 | ₹2,499 | 70% | price = card, in stock, add-to-cart present |

Affiliate links are `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`. Images come from m.media-amazon.com with the size segment stripped. Titles and descriptions are original copy.

## Dup re-checks

| ID | Deal | Before | After | Action |
|---|---|---|---|---|
| #4395 | Philips Stellar Bright 10W LED T-Bulb, pack of 2 | LIVE ₹278, MRP null, last PH 08-02 | ₹227, MRP ₹559, 59% off | Price-synced. Title and description rewritten with the new ₹. PH row added. |
| #1411 | Dabur Gulabari Shower Gel 250 ml | EXPIRED ₹89 | LIVE ₹89, MRP ₹219, 59% off | In stock on the PDP, so revived. The card's ₹81 is not on the PDP, so ₹89 was kept. The truncated source-style title was rewritten. PH row added. The slug is unchanged. |
| #12947 | B01303OKV8 | ₹226 = DB | — | Skipped, PH row already at 11-14 23:19Z |
| #15255 | B0CB5QMMR4 | ₹530 = DB | — | Skipped, PH row already at 11-14 23:19Z |
| #16571 | Myntra | ₹675 | — | Skipped, PH row at 11-14 23:19Z |
| #16509 | Flipkart TRIGGR | ₹599 = card | — | Skipped, PH row at 11-14 17:18Z |

## Rejected

- Epic Games "Knightica": a digital giveaway with no ld+json. Written to `dd-rejected.json` by stage 1.
- Rejected within the last 24h, not re-checked: B0GR6W5BFB, the Flipkart Haier AC (ACNHHMBYDG2HDCRP), and the Klook sale.

## Freshness

- IndexNow: HTTP 200 for 7 urls (the 4 slugs plus the 3 hub urls slug mode adds).
- `sitemap.xml`: ISR, at most 30 min stale. Deal pages only enter the top-100 deals child by rank.
- `llms.txt`: force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.08s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.52s) |
| /solimo-12-inch-…-b08gl16rds | 200 (0.20s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,011 = 16,011 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,587 vs 16,589 | OK. The 2 new deals are waiting for the external broadcast cron, which self-heals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post.

## Still open

- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506, #16558, #7461.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #3538).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
