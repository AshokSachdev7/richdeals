# DESIDIME-INGEST · 2026-10-26e (~12:26 IST)

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Junk / grocery filtered | 12 |
| Resolved to a store product | 20 |
| Already in DB (by productId) | 7 |
| Fresh candidates | 13 |

Two cards were dropped before verification: the Ajio sale page (not a product) and a Lenovo Idea Tab Flipkart URL without a `/p/itm` path.

## Verification

Amazon PDPs were fetched same-origin in the logged-in Playwright tab. Price is `.a-price-whole` in `#corePriceDisplay`, and stock needed `#add-to-cart-button`. Flipkart was checked by `verifyFromHtml` ld+json in stage 1.

| Product ID | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B09XS7JWHH | Sony WH-1000XM5 | 19,989 | 19,989 | **PUSHED** |
| B0GJDQKSGJ | Steel wire dish rags ×6 | 29 | 29 | **PUSHED** |
| B0F1CYD5PS | truke Mega 9 earbuds | 999 | 899 | **PUSHED** at the lower PDP price |
| WAPHKBFFGFZR4MGY | Kenstar AquaVeda RO+UV+UF (Flipkart) | 3,927 | 3,927 (ld+json, InStock) | **PUSHED** |
| B0B8ZMLRH4 | Haier 602 L fridge | 51,430 | 63,680 | rejected: drift |
| B07ZRZTDJY | Wonderchef Nutri-Pot | 4,950 | 6,999 | rejected: drift |
| B0H9D837RS | Indigo powder 200 g | 169 | 199 | rejected: drift |
| B0F3DBMCBQ | Godrej 7 kg washer | 12,491 | 14,990 | rejected: drift |
| B0H2YVXLBR | DREAME D30 Ultra | 36,249 | 44,999 | rejected: drift |
| B0G8JSRB87 | Samsung 189 L fridge | 14,990 | none | rejected: no buy box / ATC |
| B0BQML7CW8 | CrossBeats Ignite S5 | 2,999 | none | rejected: empty desktop PDP, mobile `/gp/aw/d/` 404 |
| 6f90d6024061 | Klook travel sale | — | — | rejected: not a product |
| 0d2f553864cd | Hamaramall raw peanuts | 60 | — | rejected: grocery, no ld+json |

Most drift was card prices quoting bank-card offers. All 9 rejects were written to `data/dd-rejected.json` (24h skip).

## Push

- `/admin/deals/bulk` returned **HTTP 201, count=4**, all 4 `created:true`.
- Affiliate: Amazon `?tag=ashoksachdev-21` on `/dp/ASIN`; Flipkart `/p/itm…?pid=WAPHKBFFGFZR4MGY&affid=djhackraj` (DesiDime's `affid=salescueli` + `affExtParam*` stripped).
- Images: Amazon hiRes from `colorImages.initial`; Kenstar from `rukmini1.flixcart.com`.
- Prod spot-check: `/sony-wh-1000xm5-wireless-noise-cancelling-headphones-black-b09xs7jwhh` returned 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` returned **HTTP 200** for 7 URLs (4 slugs + 3 hub paths).
- **Sitemap:** ISR `revalidate = 1800`, at most 30 min stale.
- **llms.txt:** force-dynamic, rebuilt per request.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,380 (+4) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Posts on 10-26 (IST) | 2; CONTENT-SEO runs 12:39 IST |
| Broadcast cursor | 14907 vs DB max 14911: just this batch, the external cron picks it up next run |
| Unpushed commits | 0 before this commit |

Nothing rotting.
