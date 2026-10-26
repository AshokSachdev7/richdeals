# DESIDIME-INGEST · 2026-10-26g (~16:20 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Dropped: JUNK/GROCERY regex, DesiDime tracking landing, or non-`/p/itm` Flipkart path | 8 |
| Resolved to a single product | 21 |
| Already in the DB (by productId) | 6 |
| Fresh candidates | 15 |

## Verification

Five non-Amazon candidates failed stage-1 `productLd()`, and all five were already in `data/dd-rejected.json`:

- **Price drift:** four Flipkart listings (CUCKOO and Mi air purifiers, Lenovo LOQ, HP Chromebook).
- **No ld+json:** Dell "festive offers", a sitewide promo rather than a product.

The 10 Amazon PDPs were fetched same-origin in the logged-in Playwright tab, reading:

- `.a-price-whole` in `#corePriceDisplay`
- the `M.R.P.:` text
- `#availability`
- `#add-to-cart-button`

There was no captcha, so the mobile-UA fallback was not needed.

| ASIN | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B09VZBP4RL | Mahesh Dutt set of 3 Hindi books | 89 | 89 (M.R.P. 650) | **PUSHED**, MRP nulled (86% off fails the ≥80% rule) |
| B0H4M66HTJ | Sonata Poze 9 men's watch, grey | 1,897 | 1,897 (M.R.P. 2,710) | **PUSHED**, 30% off |
| B0BZPV35LC | Sonata Unveil women's watch, blue dial | 1,099 | 1,099 (M.R.P. 2,199) | **PUSHED**, 50% off |
| B0CYH6JV5G | Havells Blaze 2 kg dry iron, 1250 W | 1,458 | 1,458 (M.R.P. 2,095) | **PUSHED**, 30% off |
| B097GNF52Q | Safari 45 L backpack | 949 | 999 | rejected: price drift |
| B0FLKF5V9Y | Acer 50" Ultra V QLED TV | 23,749 | 27,999 | rejected: price drift |
| B07MXHP8K4 | Cinthol soap, 8-pack | 161 | 335 | rejected: price drift (the card price was likely a coupon or Subscribe & Save price) |
| B0GF2QG5K3 | Samsung 27" Odyssey G5 | 14,349 | 16,499 | rejected: price drift |
| B0DGX3GMJY | Spigen SA-TW P20 earbuds | 1,290 | 1,443 | rejected: price drift |
| B0FND9VQCF | Artis mini UPS | 1,105 | 1,199 | rejected: price drift |

Shadow-row check: none of the four pushed ASINs appear in any DB row by `productId`, `affiliateUrl` or slug. The six Amazon rejects were added to `data/dd-rejected.json`, which now holds 266 entries.

## Push

- `/admin/deals/bulk` returned **HTTP 201, count=4**, all `created:true`. The new DB max is #14959.
- Affiliate: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was dropped.
- Prod spot-check: all 4 slugs returned 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` returned **HTTP 200** for 7 URLs (4 slugs + 3 hub paths).
- **Sitemap:** ISR `revalidate = 1800`, at most 30 min stale.
- **llms.txt:** force-dynamic, rebuilt per request.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,428 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Posts total / coverless / seo-less | 434 / 0 / 0 |
| Posts on 10-26 (IST) | 3 |
| Broadcast cursor | 14955 vs DB max 14959; the gap is only this push, and the external cron picks it up next run |
| Unpushed commits | 0 before this commit |

Nothing rotting.
