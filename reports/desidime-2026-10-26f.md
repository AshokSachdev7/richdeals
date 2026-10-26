# DESIDIME-INGEST · 2026-10-26f (~14:26 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Dropped: JUNK/GROCERY regex or `/s?` search link | 11 |
| Resolved to a single product | 19 |
| Already in the DB (by productId) | 9 |
| Fresh candidates | 10 |

## Verification

Amazon PDPs were fetched same-origin in the logged-in Playwright tab, reading `.a-price-whole` in `#corePriceDisplay`, the `M.R.P.:` text, `#availability` and `#add-to-cart-button`. There was no captcha, so the mobile-UA fallback was not needed.

| Product ID | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B0C2YLC2LP | Bigsmall Retro Gramophone Bluetooth Speaker | 1,499 | 1,499 (M.R.P. 3,398) | **PUSHED**, 56% off |
| B0H1J6ZZ25 | Microfiber non-scratch wire dishcloth + gap brush | 29 | 29 (M.R.P. 499) | **PUSHED**, 94% off |
| B0H45QM391 | Bajaj Majesty Pro 15 L geyser | 7,740 | 8,599 | rejected: price drift |
| B0D44XN39V | Habere cane hanging swing chair | 5,133 [ICICI CC] | 5,703 | rejected: bank-card price |
| B0D8QJ52PS | Interio by Godrej EWA 4-door wardrobe | 20,566 | 23,490 | rejected: price drift |
| B0FV38CM9M | Wonderchef OTG 10 L | 1,711 | 2,899 | rejected: price drift |
| B0F8LX9S2X | Butterfly ZieraChrome 750 W mixer, 5 jars | 4,303 | 4,780 | rejected: price drift |
| B0HKZMGPMC | "Sample ₹1 [8 Samples Added]" | — | — | rejected: sample bundle, not a single product |
| d0f89d8300e4 | Hamaramall Betwa Aahar Matar | 25 | — | rejected: grocery, no ld+json |
| 54edc5c2ca55 | Hamaramall NAFED Gram Black | 30 | — | rejected: grocery, no ld+json |

Images are the first `colorImages` hiRes. `landingAsinColor` is "Retro Gramophone" for the speaker and "initial" (no variants) for the dishcloth. All 8 rejects were added to `data/dd-rejected.json`, which now holds 227 entries.

## Push

- `/admin/deals/bulk` returned **HTTP 201, count=2**, both `created:true` (new DB max is #14938).
- Affiliate: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was dropped.
- Prod spot-check: both slugs returned 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` returned **HTTP 200** for 5 URLs (2 slugs + 3 hub paths).
- **Sitemap:** ISR `revalidate = 1800`, at most 30 min stale.
- **llms.txt:** force-dynamic, rebuilt per request.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,407 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Posts total / coverless | 434 / 0 |
| Posts on 10-26 (IST) | 3 |
| Broadcast cursor | 14936 vs DB max 14938: just this push, the external cron picks it up next run |
| Unpushed commits | 0 before this commit |

Nothing rotting.
