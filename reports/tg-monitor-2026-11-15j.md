# TELEGRAM-DEAL-MONITOR tick — 2026-11-15j

This tick read the sidebar of the 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright richDeals profile. Shortlinks were resolved with curl, each candidate was deduped against `data/tg-multi-seen.json` and the live DB, and the price was verified on the PDP with an in-tab fetch in the logged-in Amazon tab. Run at about 09:15–09:25 IST.

**Result: 1 pushed LIVE (bulk count 1, created). IndexNow returned HTTP 200 for 4 urls. Prod is 7/7 at 200 and every DB check is green.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| Dealzone | 09:11 "Backpack at 89", `link.amazon/B0gw6ubXB` | **Pushed.** See below. |
| RichDeals | 08:49 CELLO lunch box | Our own broadcast (#16592), skipped |
| SB Loots | 02:32 notification-settings promo | Not a deal |
| Rogerkart | 00:39 "Photo" | No link |
| CoolzTricks | AC at ₹24K with a card offer | Bank-offer price, already rejected |
| Dealdost | Anjeer 1kg ₹399 | Already #16501 |
| ONLINE SHOPPING DEALS | Shatras soap ₹151 | Already #16506 |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG washer | Already #5035 |
| NonStopDeals | Caprese category post | Category post, skipped |
| Loot Deals 24x7 / OMG LOOTDEALS / Deal Dibba | Not in the top 40 rows | Nothing new since the last tick |

## Pushed

| ASIN | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B08DRNBZS4 | ArtzFolio Colorful Triangles reusable sack bag, Velvet | ₹89 | ₹679 | 87% | Post = PDP. "Only 2 left in stock", add-to-cart present, no captcha, no minimum quantity. |

- The shortlink code `B0gw6ubXB` is not the ASIN. It resolved to `/dp/B08DRNBZS4` with the source tag `glitzdeal05-21`. That tag was stripped and `?tag=ashoksachdev-21` applied.
- The ASIN was not in `tg-multi-seen.json` and matched no DB row by productId or affiliateUrl. It has now been added to the seen list (5,140 entries).
- Image: the `landingAsinColor` is Velvet. Its hiRes (`71aMTewKFWL._SL1500_`) is the same as the landing image.
- Title and description are original copy. The builder pre-flight checks passed (every ₹ in the copy matches the price, and the image matches the CDN pattern).
- Slug: `artzfolio-colorful-triangles-reusable-velvet-sack-bag-b08drnbzs4`.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the new slug. It returned **HTTP 200** for 4 urls (1 slug plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the deal.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,030 = 16,030 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,597 vs 16,610 | OK. The cursor moved from 16,592 to 16,597 since the last tick, so the external cron is draining the deal-ingest 11-15e batch plus this deal. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461 (₹139), #16506 (₹151), #16558 (₹159). The new B08DRNBZS4 deal is also low stock (2 left).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
