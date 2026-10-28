# DESIDIME-INGEST · 2026-10-28h (10-28, night IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk / grocery / other-store drops | 6 |
| Non-product drops | 2 (Amazon Diwali-lights store page, TataPlay) |
| Resolved to a product (`visit.desidime.com` → merchant) | 28 |
| Already in the DB or rejected within 24h | 8 (4 LIVE dups, re-verified below; the rest in the 24h reject window) |
| Fresh | 20 |
| Stage-1 skips | 9 (Flipkart `price-drift`, stamped by stage 1) |
| PDP-verified (Amazon in the logged-in Playwright tab, Blinkit via ld+json) | 11 |
| Rejected after the PDP read | 10 |
| **Pushed LIVE** | **2** (ids 15356-15357) |
| Price-synced LIVE rows | 2 (#5023, #4983) |

## Pushed

| ID | Store | Product | ₹ | MRP |
|---|---|---|---|---|
| 15356 | Amazon | Lifelong Smartchoice 4.2L digital air fryer, 1200W (B0FH569G3V) | 1,999 | nulled (listed 12,499 implies 84% off) |
| 15357 | Blinkit | Kyari organic cow dung manure, 5kg (prid 605801) | 200 | 349 (43%) |

Both returned `created:true` (`count:2`). The title ₹ and discount % were diffed against `price`/`mrp` before POST, and neither productId nor slug was in the DB beforehand. Amazon carries `tag=ashoksachdev-21` (DesiDime's `desidime01-21` stripped). Blinkit goes through Cuelinks (`cid=527`). Images come from `m.media-amazon.com` and `cdn.grofers.com` (Blinkit's own CDN). Ids 15354-15355 do not exist: an autoincrement gap from another writer, no rows lost.

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab (`#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability`, add-to-cart). Blinkit was read via `productLd()` (ld+json `Product.offers`).

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| B0FH569G3V | Lifelong 4.2L air fryer | 1999 | 1999, In stock, ATC | **pushed** |
| prid 605801 | Kyari cow dung manure 5kg (Blinkit) | 200 | 200, InStock (ld+json) | **pushed** |
| B0H8P8CFQ4 | ASUS Vivobook 16 | 77990 | 88990 | rejected: drift |
| B0GQBL66R3 | CELLO Steelox Pro | 5518 | 6131 (card was HDFC CC price) | rejected: drift |
| B0DB1QSZ5B | boAt Aavante A3070 | 5772 | 6691 | rejected: drift |
| B0H26HF7FW | boAt Stone 900 | 3600 | 3999 (card was HDFC EMI price) | rejected: drift |
| B0B51YY6C5 | Livpure mattress | 3940 | 6174 (card was HDFC EMI price) | rejected: drift |
| B0F7XNF1QF | ZEBRONICS soundbar | 2700 | 2999 | rejected: drift |
| B0GJ68952R | Havells GEOSLIM JUMBO | 4558 | 6330 (20% coupon gives 5064) | rejected: drift |
| B0G8JYQ9GY | Samsung 236L fridge | 22990 | 27990 (₹1000 coupon only) | rejected: drift |
| B09BB7XMWQ | ASUS Vivobook Go 14 | 38990 | 42990 | rejected: drift |
| B0HM3C2KH9 | Amazon Pay gift voucher | — | — | rejected: junk |

- **Rejects:** this tick stamped 10 in `data/dd-rejected.json` with `Date.now()`, and stage 1 stamped the 9 Flipkart drifts. The file now holds 797 entries.

## Duplicate re-verify (LIVE rows on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| — | #5023 VW 43" Spectra QLED TV (VW43AQ3) | 14499 | **14299** | **price-synced**: price, discountPct 52 against MRP 29,999, title and description |
| — | #4983 Samsung 43" Crystal UHD 4K (UA43UE86AHULXL) | 29990 | **29750** | **price-synced**: price, discountPct 25 against MRP 39,900, title and description |
| — | #15341 Havells GEOSLIM 3-burner | 5490 | 5490 | ok |
| — | #1450 Optimist AC | 38990 | 38990 | ok |

All slugs were unchanged: the syncs used `prisma.deal.update`, not the bulk upsert.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 4 slugs (2 pushed, 2 synced) → **HTTP 200 for 7 URLs**.
- **Prod check:** all 4 pages return 200, and prod `/api/deals` lists #15357 first.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic, 200.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,817 (+2), equal to the prod `/api/deals` total of 14,817 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15357 |
| Broadcast cursor | `lastId` 15357 = max: drained |
| Posts: total / coverless / missing SEO fields | 442 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 4 (cap) |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`: all 200 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. Yield was low again: 9 of the 10 Amazon cards carried bank-card, EMI or coupon prices that did not hold on the PDP.
