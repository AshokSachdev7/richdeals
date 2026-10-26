# DESIDIME-INGEST · 2026-10-26h (~17:20 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Dropped: JUNK/GROCERY regex, `/s?` search link, non-`/p/itm` Flipkart path | 11 |
| Resolved to a single product | 21 |
| Already in the DB (by productId) | 8 |
| Fresh candidates | 13 |

## Verification

Two non-Amazon candidates failed stage-1 `productLd()`, both already in `data/dd-rejected.json`:

- **Price drift:** Motorola Edge 70 Fusion on Flipkart (MOBHN973ZNVAMG7V).
- **No ld+json:** Maxwax shoe polish on Digihaat.

The 11 Amazon PDPs were fetched same-origin in the logged-in Playwright tab (2.6 s gap), reading `.a-price-whole` in `#corePriceDisplay`, the `M.R.P.:` text, `#availability` and `#add-to-cart-button`. No captcha, so the mobile-UA fallback was not needed.

| ASIN | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B0HJHB96QR | TEX-RO clothes drying stand, black | 1,098 | 1,098 (M.R.P. 2,999) | **PUSHED**, 63% off |
| B0FVZQBY9C | SanDisk Crayola Type-C 128 GB pendrive, Vivid Violet | 1,999 | 1,999 (M.R.P. 10,100) | **PUSHED**, MRP nulled (80% off trips the ≥80% rule) |
| B0D7C2H6FM | CELLO Kitchen Pro 2-layer storage trolley | 983 | 982 (M.R.P. 3,999) | **PUSHED** at the PDP price, 75% off |
| B0HJ2QPL77 | OTEK HEPA H13 air purifier | 5,355 | 8,499 | rejected: price drift |
| B0GSVR9C3X | Lenovo LOQ Essential Ryzen 7 / RTX 3050 | 85,740 | 94,990 | rejected: price drift (card price is after a bank offer) |
| B0FT2S65SX | Impex 6.5 L air fryer | 2,970 | 3,299 | rejected: price drift |
| B0H8P8CFQ4 | ASUS Vivobook 16 (2026) Core Ultra 5 | 81,740 | 88,990 | rejected: price drift (bank-offer price) |
| B0GP6V371Z | Haier 540 L side-by-side fridge | 44,740 | 58,990 | rejected: price drift (bank-offer price) |
| B0DF7Y7RKM | Van Heusen polo T-shirt | 269 | none | rejected: "Currently unavailable", no add-to-cart |
| B0FWKGN5XY | CELLO Air-Vel USB fan, pink | 599 | none | rejected: "Currently unavailable", no add-to-cart |
| B0FS23TZ4N | Cello Trion juicer mixer grinder | 979 | none | rejected: "Currently unavailable", no add-to-cart |

The three null reads were checked against `#centerCol` text: each shows "Currently unavailable" with `#outOfStock` and no add-to-cart button, so this is real stock-out, not the twister-JSON false positive.

Shadow-row check: none of the three pushed ASINs appear in any DB row by `productId`, `affiliateUrl` or slug. The 8 Amazon rejects were added to `data/dd-rejected.json` (301 → 309 keys).

## Push

- `/admin/deals/bulk` returned **HTTP 201, count=3**, all `created:true`. New DB max is #14981.
- Affiliate: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was dropped.
- Images from `m.media-amazon.com` (`#landingImage` `data-old-hires`), colour matched to `landingAsinColor`.
- Prod spot-check: all 3 slugs returned 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` returned **HTTP 200** for 6 URLs (3 slugs + 3 hub paths).
- **Sitemap:** ISR `revalidate = 1800`, at most 30 min stale.
- **llms.txt:** force-dynamic, rebuilt per request.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,449 (+3) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Posts total / coverless / seo-less | 434 / 0 / 0 |
| Posts on 10-26 (IST) | 3 |
| Broadcast cursor | `lastId` 14978 vs DB max 14981: this push only, the external cron picks it up next run |
| Unpushed commits | 0 before this commit |

Nothing rotting.
