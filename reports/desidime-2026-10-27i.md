# DESIDIME-INGEST · 2026-10-27i (10-27, afternoon IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Junk / grocery / other drops | 6 (including the AU-card Amazon Pay offer → razorpay, not a product) |
| Resolved to a product (`visit.desidime.com` → merchant) | 27 |
| Already in the DB (dedup by `productId`) | 13 |
| Fresh | 14 (12 Amazon, 1 Flipkart, 1 Myntra) |
| Stage-1 `price-drift` (already in `dd-rejected`) | 2: HAVELLS trimmer (Flipkart), boAt Rockerz 551 (Myntra) |
| Skipped as grocery | 1: Spyfood cheddar cheese powder ₹49 (the GROCERY regex missed it) |
| PDP-verified (Amazon) | 11 |
| Rejected (price drift) | 5 |
| **Pushed LIVE** | **6** (`HTTP 201 count=6`, all `created:true`, ids 15180–15185) |

## Verify table

Prices were read in the logged-in Playwright Amazon tab with a same-origin fetch of `/dp/ASIN?th=1&psc=1`. Selectors: `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. There was no captcha, so the mobile-UA fallback was not needed.

| ID | Product | Card ₹ | Live ₹ | MRP pushed | Result |
|---|---|---|---|---|---|
| B0FHJ2GPNG | adidas Tramp Pro | 1750 | 1750 (only 4 left) | 4999 (65%) | #15180 |
| B0D5V49T53 | adidas Smphny M sneaker | 1898 | 1898 | 4999 (62%) | #15181 |
| B0CKS1SPMZ | adidas Lite Racer 4.0 | 2519 | 2519 | 5599 (55%) | #15182 |
| B0F2FW7CLB | adidas Supernova Ease 2 | 4998 | 4998 (only 3 left) | 9999 (50%) | #15183 |
| B0GFN2NZ9P | adidas Torite 2 | 2755 | 2755 (only 5 left) | 5299 (48%) | #15184 |
| B0C4DQLH6F | adidas Pomazor M | 1367 | 1367 (only 3 left) | 3599 (62%) | #15185 |
| B0GP6LS92F | HP 15 Ryzen 5 7520U | 50490 | 52990 | — | rejected |
| B0FPMD5NL8 | EOX OKO e-scooter | 37697 | 43997 | — | rejected |
| B0H82WWDT5 | Samsung Galaxy Watch9 44mm LTE | 31541 | 39041 | — | rejected |
| B0DZQR345H | LG XBOOM GRAB | 5112 | 5990 | — | rejected |
| B0F334NYKZ | Dylect 4K dash cam | 5689 | 8499 | — | rejected |

- **Stock:** all 6 pushed products are in stock with add-to-cart present.
- **Images:** all 6 are `m.media-amazon.com`, keyed by `landingAsinColor`, and each returned HEAD 200.
- **Affiliate:** `/dp/ASIN?tag=ashoksachdev-21`, with `desidime01-21` stripped.
- **Rejects:** the 5 drift rejects and Spyfood were written to `data/dd-rejected.json` with `Date.now()`. The file now holds 503 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with the 6 slugs → **HTTP 200 for 9 URLs** (the slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Prod check:** `/adidas-men-supernova-ease-2-running-shoes-b0f2fw7clb` returned 200.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,652 (+6) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15185 |
| Broadcast cursor | `lastId` 15179 (file re-read). That equals the max before this batch, so the TG 10-27p Promate row has been sent; the external cron will drain this batch |
| Posts: total / coverless / missing SEO title or description | 438 / 0 / 0 |
| Posts per IST day | 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 |
| Unpushed commits | 0 before this commit |

The 10-21 count of 1 is the edge of the query window, not rot.

**Rot note:** the GROCERY regex in `ingest-desidime.mjs` let "Cheddar Cheese Powder" (₹49) through. It was skipped by hand. This is a one-off and not worth widening the regex for.
