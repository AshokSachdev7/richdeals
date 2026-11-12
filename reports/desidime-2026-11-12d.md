# DESIDIME-INGEST tick — 2026-11-12d

Stage 1 `apps/api/scripts/ingest-desidime.mjs` read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK/GROCERY filters and resolved outbound links through `visit.desidime.com`. Amazon was verified by in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart). Non-Amazon was verified with `productLd()` (ld+json, ±₹1, InStock). Dedup is by productId against the live DB.

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 31 |
| Dropped (JUNK / GROCERY / non-product, incl. SOLIMO kadhai `/clp/` link) | 12 |
| Resolved to a merchant URL | 18 |
| Dup of LIVE row (productId) | 15 |
| Rejected in last 24h (Jiomart hing ₹17, Klook) | 2 |
| Fresh | 1 |
| Fresh rejected (card ≠ PDP) | 1 |
| Pushed | **0** |

Fresh reject: B0FK3Y39BZ SignoraWare 620 ml container. Card said ₹197, PDP says ₹568 (variant "Container 630 ML Round").

## Dup LIVE rows: PDP re-verify

### Synced (2)

Each was updated with `prisma.deal.update` (price/mrp/discountPct/title/description, with the ₹ in the copy matching the price), and a new priceHistory row was written. Slugs were kept and both are still LIVE.

| id | Product | Before | After |
|---|---|---|---|
| 16373 | USHA Instano 5L 3000W instant water heater | ₹2,899 | **₹3,999 / MRP 5,999 / 33%** |
| 16376 | Action women's platform block-heel sandals | ₹293 | **₹629 / MRP 999 / 37%** |

### Confirmed PDP = DB (13)

A priceHistory row was written for each one, so `priceValidUntil` now runs to 11-26.

#16323 ₹4,799 · #16349 ₹65 · #16364 ₹649 · #16365 ₹110 · #16367 ₹50 · #16368 ₹300 · #16369 ₹1,199 · #16372 ₹94 · #16374 ₹23,990 · #16375 ₹1,14,990 · #16378 ₹1,209 · #16379 ₹3,199 · #16370 ₹349 (Myntra, ld+json InStock, MRP 3,499).

### Delisted

None.

15 priceHistory rows were written this tick.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the 15 touched slugs (2 synced, 13 confirmed) returned **HTTP 200** (18 URLs: 15 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.61s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.46s) |

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

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`. This tick handled it by hand for the rows it touched.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
