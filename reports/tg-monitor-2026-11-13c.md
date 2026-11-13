# TELEGRAM-DEAL-MONITOR tick — 2026-11-13c

Read the sidebar for the 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright richDeals profile. Pulled single-product deals from every store and resolved the shortlinks (amzn.to, amazn.lt, myntr.it). Deduped against `data/tg-multi-seen.json` and against `productId` in the live DB. Amazon prices were checked on the PDP in the logged-in tab, reading `#corePriceDisplay .a-price-whole` plus `#availability` and add-to-cart. Myntra prices were checked against the ld+json `Product.offers` (±₹1, InStock). Deals were pushed with `/admin/deals/bulk` as `status:live`. Run at about 16:10 IST.

**Result: 5 pushed (201, count:5, all created:true), 2 Amazon and 3 Myntra. 1 repost was a duplicate with an unchanged price. IndexNow returned HTTP 200 for 8 URLs (5 slugs plus 3 hubs).**

## Pushed

| Store | Deal | Price | MRP | Off | Affiliate |
|---|---|---|---|---|---|
| Amazon | LONGWAY Zephyr 1200mm BLDC ceiling fan with remote, BEE 5 star | ₹2,299 | — | — | `tag=…-21` |
| Amazon | Puma Women Maka sneaker, Foxglove-Pristine | ₹1,349 | ₹4,499 | 70% | `tag=…-21` |
| Myntra | Maniac men's solid T-shirt | ₹598 | ₹1,999 | 70% | InRDeals |
| Myntra | The Modern Soul men's mid-rise loose-fit track pant | ₹527 | ₹1,499 | 65% | InRDeals |
| Myntra | Layasa men's colourblocked sneakers | ₹482 | ₹1,999 | 76% | InRDeals |

The LONGWAY row was pushed with no MRP. The PDP's strike price read ₹1,149.50, which is below the selling price, so it is a per-unit `a-text-price` and not a real MRP. No % off is claimed.

Slugs:
- `longway-zephyr-1200mm-bldc-ceiling-fan-with-remote-bee-5-star-b0hc3g1ff5`
- `puma-women-maka-sneaker-foxglove-pristine-b09rg35frq`
- `maniac-men-solid-t-shirt-40598480`
- `the-modern-soul-men-mid-rise-loose-fit-track-pant-34828724`
- `layasa-men-colourblocked-sneakers-42166833`

## Skipped

| Item | Reason |
|---|---|
| LG B0DPHTSTYJ (#5035) | Repost of a LIVE row. The PDP shows ₹20,990, the same as the DB, so nothing changed |
| Coupon loot post | Multi-product loot |
| Swiggy Dineout post (2 groups) | Not a product |
| Myntra category link | Category page, not a single product |
| Caprese category link | Category page, not a single product |

## Freshness

- IndexNow: HTTP 200, 8 URLs.
- `sitemap.xml`: ISR 1800s. The deals child lists the top 100 only, by design.
- `llms.txt`: force-dynamic, so it picks up the batch on the next request.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.36s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.56s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,903 = 15,903 (+5 this tick) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,475 vs 16,480 | OK, these are the 5 new rows waiting for the external broadcast cron, which catches up on its own |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2. On target.

## Still open

- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), Puma Maka B09RG35FRQ (1 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
