# DESIDIME-INGEST tick — 2026-11-12e

Stage 1 `apps/api/scripts/ingest-desidime.mjs` read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK/GROCERY filters and resolved outbound links through `visit.desidime.com`. Amazon was verified by in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart). Non-Amazon was verified with `productLd()` (ld+json, ±₹1, InStock). Dedup is by productId against the live DB.

**Result: 3 pushed** (`/admin/deals/bulk` returned 201, `count:3`, all `created:true`, so no slug restore was needed).

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 36 |
| Dropped (JUNK / GROCERY / non-product / other-store) | 15 |
| Resolved to a merchant URL | 21 |
| Dup of LIVE row (productId) | 11 |
| Rejected in last 24h (Jiomart hing ₹17, Gunmaster G9 movie voucher ₹100, Zepto sooji ₹29, Klook) | 4 |
| Fresh (all Amazon) | 6 |
| Fresh rejected (card ≠ PDP) | 3 |
| Pushed | **3** |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0CM9MHFQP | Wembley educational kids laptop learning toy (blue) | ₹752 | 1,899 | 60% |
| B0CJ9DF7LS | Eveready Ultima alkaline AAA batteries, pack of 10 | ₹179 | 220 | 19% |
| B0H6FYP8XP | Noise Buds Mini X TWS earbuds, 50h playtime (ice blue) | ₹999 | 2,999 | 67% |

For B0CJ9DF7LS, the PDP strike-through read ₹17.90, which is a per-unit rate. The card MRP of 220 was used instead.

Each description ends with a line saying the price was checked on the live product page and should be confirmed at checkout.

### Fresh rejects

| ASIN | Product | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|---|
| B0GWF65QCW | NACIA rug | 15 | 3,399 | card price is from a different size variant |
| B0CZL6VKD9 | Milton Micro Meal | 299 | 531 | drift |
| B08HQCWYR4 | Milton Pro Cook Tope | 499 | 1,002 | drift |

## Dup LIVE rows: PDP re-verify

### Synced

None.

### Confirmed PDP = DB (10)

A priceHistory row was written for each one, so `priceValidUntil` now runs to 11-26. All are still LIVE.

#16364 ₹649 · #16367 ₹50 · #16368 ₹300 · #16369 ₹1,199 · #16370 ₹349 (Myntra, ld+json InStock) · #16372 ₹94 · #16373 ₹3,999 · #16374 ₹23,990 · #16378 ₹1,209 · #16379 ₹3,199.

### Delisted (1)

#2351 `power-guard-165-cm-65-inches-frameless-4k-ultra-hd-smart-led-tv-pg65f4k-black` was set to EXPIRED. Its ASIN now opens an HP OmniBook X laptop, not the Power Guard 65" TV the slug and title name. The page stays live with the expired banner and `noindex`.

10 priceHistory rows were written by the re-verify. The push path's own history writes were not checked this tick.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 13 slugs (3 pushed + 10 confirmed) returned **HTTP 200** (16 URLs: 13 slugs + 3 hubs). #2351 was delisted, so it was not pinged.
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.22s) |
| /llms.txt | 200 (0.51s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,828 = 15,828 (+3 pushed, −1 delisted) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,401 = 16,401 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`. This tick handled it by hand for the rows it touched.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- **NEW:** #2351 showed that Amazon reuses ASINs. Old Amazon rows may now point at a different product than their slug names. Only the rows the re-verify touches get checked, so older rows are unchecked.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
