# TELEGRAM-DEAL-MONITOR tick — 2026-11-12i

The tick read the Telegram sidebar of the 13 groups in `data/tg-groups.json` with one `browser_evaluate` call in the Playwright richDeals profile. It extracted single-product deals, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and against productIds in the live DB. Every Amazon price was verified by an in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, M.R.P. read from `#centerCol`). Text was rewritten, and images come from the marketplace CDN.

**Result: 2 pushed** (`/admin/deals/bulk` returned 201, `count:2`, both `created:true`, so no slug restore was needed). 1 dup LIVE row was set EXPIRED.

## Funnel

| Step | Count |
|---|---|
| New single-product candidates, PDP-verified | 3 |
| Pushed | **2** |
| Fresh rejected | 0 |
| Dup of LIVE row, expired | 1 |
| Seen-file entries added | 6 (total 5,097) |

Skipped without a PDP read: B0DPHTSTYJ (already seen), B08SPXBMPS (drift reject in 11-12h), B0GCDZPYTG (synced in 11-12h). The other groups' newest posts were coupon, category, Swiggy, Myntra category and Caprese category posts, so none was a single product.

### Pushed

| ASIN | Product | Price | MRP | Off | Source |
|---|---|---|---|---|---|
| B0093J2C0A | Himalaya Refreshing Body Lotion, Aloe & Cucumber, 200 ml | ₹115 | 249 | 54% | amzn.to shortlink |
| B08QJCQF32 | Lenskart BLU zero-power blue-cut computer glasses | ₹399 | 599 | 33% | link.amazon shortlink |

For Himalaya, `.a-text-price` read ₹57.50, which is the per-100 ml rate. The `#centerCol` M.R.P. of ₹249 was used instead.

## Dup LIVE rows: PDP re-verify

#13500 `lifelong-llsm120g-classic-pro-750w-4-slice-sandwich-maker-b08lvvtgzk` (DB ₹669) was reposted via an amazn.lt shortlink. The PDP buybox is suppressed: no price, no add-to-cart, no buy-now, only "see all buying choices". The row was set **EXPIRED**, following the #16391 precedent. The page stays live with the EXPIRED banner and drops out of the sitemap.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 3 slugs (2 pushed + #13500) returned **HTTP 200** (6 URLs: 3 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.56s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,847 = 15,847 (+2 pushed, −1 expired) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,420 vs 16,422 (lag 2, the external cron catches up) | OK |
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

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
