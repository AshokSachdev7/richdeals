# DESIDIME-INGEST tick — 2026-11-12g

Stage 1 (`ingest-desidime.mjs`) read the listing cards on `/new` and the homepage. It made no per-deal fetch, applied the JUNK and GROCERY filters, and resolved each Buy Now link through `visit.desidime.com`. Every Amazon price was then verified on the PDP in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, M.R.P. read from `#centerCol`). Text was rewritten, and images come from the marketplace CDN. New rows were deduped by productId against the live DB.

**Result: 1 pushed** (`/admin/deals/bulk` returned 201, `count:1`, `created:true`, so no slug restore was needed). 1 dup LIVE row was price-synced.

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Resolved to a product | 16 |
| Junk or other-store drops (Supercoins, Amazfit `/ax/claim`, toingit, …) | 16 |
| Skipped: rejected within the last 24h (CRUISE AC, Pigeon cooktop, cello opalware, realme AC, Daikin AC) | 5 |
| Already in the DB (dup LIVE rows) | 2 |
| Fresh candidates | 9 |
| Rejected before the PDP read (hub or grocery) | 4 |
| ASINs PDP-verified | 5 |
| Pushed | **1** |
| Fresh rejected (drift) | 4 |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0D14LDBNL | Kuber Industries transparent storage box for clothes, set of 2 | ₹678 | 3,999 | 83% |

The card said ₹679 and the PDP read ₹678, which is within ₹1. The item was in stock with add-to-cart.

### Fresh rejects

| Item | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|
| Hostinger | n/a | n/a | "Top 10" hub, not a product |
| Klook | n/a | n/a | sale hub, no ld+json |
| Snickers B07MVSC9L1 | 120 | n/a | GROCERY |
| Snickers B0DK1784C8 | 69 | n/a | GROCERY |
| Treo shot glasses B0G1SQ29TP | 250 | 678 | drift, plus "Only 1 left" |
| Lawson sofa B0GCGCN34F | 18,199 | 19,199 | drift |
| Whirlpool chimney B0DFHZC7FS | 7,641 | 9,990 | drift |
| INALSA vacuum B0C2PRHNV2 | 6,210 | 6,899 | drift |

## Dup LIVE rows: PDP re-verify

- **#14873** Hoi Polloi DWYT convertible laptop messenger bag (B0FGJT4N1R) was **synced from ₹1,310 to ₹1,014**. MRP is 7,499, so the discount is 86%. The sync updated the price, discountPct and the title's ₹ figure and "(86% Off)", and wrote 1 priceHistory row.
- **#14635** Mivi DuoPods Zig (Flipkart ACCHHU6QS5QY7XHN) is ₹599 in the DB and ₹599 on the card. The PDP was not read, because a Flipkart PDP needs a browser tab. It was left unchanged.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 2 slugs (1 pushed + #14873) returned **HTTP 200** (5 URLs: 2 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.50s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,848 = 15,848 (+1 pushed) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,422 vs 16,423 (lag 1, the external cron catches up) | OK |
| Crons | 9/9 vs roster, none recreated | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper now fixes "% Off" in titles, but not "below/under ₹X" or "saves ₹X" copy.
- Low-stock pushes are fragile (#16406). Re-check any "only N left" row on the next tick.
- #14635 (Mivi, Flipkart) is same-price on the card, but its PDP is unchecked.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
