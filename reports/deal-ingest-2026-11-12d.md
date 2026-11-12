# DEAL-INGEST indiafreestuff tick — 2026-11-12d

Stage 1 `apps/api/scripts/ingest-ifs-proper.mjs`: swept `/deals` + `/deals/superdeals`, base64 `?rto=` Buy Now ids resolved, ALL stores. Every fresh price was verified on the PDP via in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart). Dedup is by productId against the live DB.

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 106 |
| Resolved to a merchant URL | 102 |
| Dup of LIVE row (productId) | 84 |
| Fresh (not in DB) | 18 |
| Rejected at stage 1 (GROCERY) | 1 (Quaker B00O7XQPN2) |
| Fresh rejected (card ≠ PDP) | 12 |
| Fresh rejected (no price / no add-to-cart) | 5 |
| Pushed | **0** |

### Fresh rejects: card price vs PDP

These are the same 17 ASINs as 12c, and the PDP prices have not moved. IFS is still re-listing them at card prices that are wrong (see `ifs-card-prices-lie`).

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

No price and no add-to-cart on the PDP: B0FHKY29D7, B0D71HVXHG (Casio), B0GFM1LKKT (Peppa scooter), B0HHMLJMW9 (MILTON casserole), B0H9PF9X2C (bean bag).

## Dup LIVE rows

All 84 dup rows were already PDP re-verified in tick 12c a few hours ago: 4 synced, 15 confirmed and 3 delisted. Their priceHistory rows are valid to 11-26. This tick did not repeat that sync, wrote 0 priceHistory rows and made 0 DB writes.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

Nothing was pushed or changed, so no IndexNow ping was needed. `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.57s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.52s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
