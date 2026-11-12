# DEAL-INGEST indiafreestuff tick — 2026-11-12c

Stage 1 `apps/api/scripts/ingest-ifs-proper.mjs`: swept `/deals` + `/deals/superdeals`, base64 `?rto=` Buy Now ids resolved, ALL stores. Every price was verified on the PDP: Amazon via in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart), Flipkart in a browser tab (ld+json). Dedup is by productId against the live DB.

## Funnel

| Step | Count |
|---|---|
| Fresh (not in DB) | 17 |
| Dup of LIVE row (productId) | 16 + 3 GSC rows re-checked |
| Rejected at stage 1 (GROCERY) | 1 (Quaker B00O7XQPN2) |
| Fresh rejected (card ≠ PDP) | 12 |
| Fresh rejected (no price / no add-to-cart) | 5 |
| Pushed | **0** |

### Fresh rejects: card price vs PDP

IFS card prices were wrong again on every fresh row (see `ifs-card-prices-lie`).

| ASIN | Product | Card ₹ | PDP ₹ |
|---|---|---|---|
| B0DTJ1S4C9 | FINGERS cable | 151 | 230 |
| B0C7MKRYGY | Larah | 3,866 | 6,244 |
| B0FQHZ6Y4Q | BBQ grill | 1,002 | 4,434 |
| B0CR7KY39D | BEDSPUN | 447 | 836 |
| B0F2J513N8 | John Players | 255 | 399 |
| B0F8QYK8R2 | John Players | 302 | 999 |
| B0G33XW8JF | Santa costume | 166 | 719 |
| B0H29Q8WPS | PEARLPET | 130 | 238 |
| B0G3FY54LJ | Lunch box | 208 | 499 |
| B0042A9UXC | Energizer CR2032 | 198 | 250 |
| B0F91PS1PP | MILTON container | 299 | 866 |
| B0F1JZHHTP | R59 bag | 363 | 799 |

No price and no add-to-cart on the PDP: B0FHKY29D7, B0D71HVXHG (Casio), B0GFM1LKKT (Peppa scooter), B0HHMLJMW9 (MILTON casserole), B0H9PF9X2C.

## Dup LIVE rows: PDP re-verify

### Synced (4)

Each was updated with `prisma.deal.update` (price/mrp/discountPct/title/description, with the ₹ in the copy matching the price), and a new priceHistory row was written. Slugs were kept and all four are still LIVE.

| id | Product | Before | After |
|---|---|---|---|
| 2321 | S2M herbal soap combo, 4 × 125 g (GSC row) | ₹220 | **₹289 / MRP 340 / 15%** |
| 3492 | AADHIK gas saver stand, set of 2 (GSC row) | ₹299 | **₹223 / MRP 999 / 78%** |
| 16364 | Creative's Classic Board Game Pack | ₹141 | **₹649 / MRP 699 / 7%**. Buybox is back, which closes the desidime-12c flag |
| 4188 | Bluemix Smart PLUS 750W mixer + iron (Flipkart, GSC row) | ₹1,709 | **₹1,699 / MRP 4,299 / 60%** |

### Confirmed PDP = DB (15)

A priceHistory row was written for each one, so `priceValidUntil` now runs to 11-26.

#16380 ₹21,299 · #16381 ₹49,787 · #16382 ₹178 · #16383 ₹299 · #16385 ₹940 · #16387 ₹215 · #16389 ₹10,299 · #16390 ₹9,999 · #16392 ₹399 · #16393 ₹9,199 · #16394 ₹204 · #16395 ₹6,999 · #16360 ₹1,699 · #16147 ₹274 · #3506 ₹249 (GSC top row).

### Delisted to EXPIRED (3)

These had no buybox and no add-to-cart. The pages stay live with the EXPIRED banner, drop out of the sitemap and are served noindex.

| id | Product |
|---|---|
| 16388 | MIKANIX extendable ceiling-fan duster |
| 16391 | Bluetooth neckband v5.1 |
| 3498 | boAt Aavante 2.1 soundbar, ₹4,299 (**GSC top deal lost**: out of stock on Amazon) |

19 priceHistory rows were written this tick. This closes the schema-audit 11-12 FAIL on #2321 (stale Offer, no `priceValidUntil`) and refreshes the GSC rows #3492, #4188 and #3506.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the 22 touched slugs (4 synced, 15 confirmed, 3 delisted) returned **HTTP 200** (25 URLs: 22 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.34s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.62s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.54s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 (−3 delists) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`. This tick handled it by hand for the rows it touched.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
