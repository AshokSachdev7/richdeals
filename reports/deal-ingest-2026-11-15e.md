# DEAL-INGEST indiafreestuff tick — 2026-11-15e

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals`, its follow-on pages and `/deals/superdeals`, and resolved the base64 `?rto=` Buy Now ids. IFS had started posting again after the quiet early-morning window in 15d. Run at about 08:55–09:15 IST.

- 78 cards resolved to a product. 24 were dropped, mostly Flipkart null-pid cards (stage 1 still nulls `/indiafreestuff/p/` pids).
- The Flipkart null-pid cards were resolved by hand: the `itm` path and the price were read in the logged-in Flipkart tab.
- Every fresh Amazon ASIN and every dup with a changed card price was read in the logged-in Amazon tab. The checks were `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. There was no captcha.

**Result: 17 pushed LIVE (bulk count 17, all created: 8 Amazon, 9 Flipkart). 3 dup rows were price-synced and 4 cards were rejected. IndexNow returned HTTP 200 for 23 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | SIMPARTE 750ml food container set of 3 (B08V88N7FD) | ₹142 | ₹285 | 50% |
| Amazon | TrustBasket Jasmine flower pot set of 5 (B099ZTWB5C) | ₹139 | ₹1,499 | 91% |
| Amazon | MAMTA MDF bedside end table (B08XMKLMHR) | ₹1,049 | ₹4,166 | 75% |
| Amazon | TP-Link Tapo RV10 robot vacuum and mop (B0BRG3V24Q) | ₹15,999 | ₹28,999 | 45% |
| Amazon | Note Real Look mascara (B07Z7VMFS2) | ₹306 | ₹999 | 69% |
| Amazon | Maybelline Superstay Vinyl Ink, Witty (B0B9R71F1V) | ₹372 | ₹849 | 56% |
| Amazon | Zilka air quality monitor, White (B0FQJBV8Q8) | ₹999 | ₹9,999 | 90% |
| Amazon | Tokyo Talkies women track pants, Peach (B0F498ZKZB) | ₹279 | ₹1,049 | 73% |
| Flipkart | AGARO Regal hand-held vacuum cleaner | ₹1,336 | ₹2,999 | 55% |
| Flipkart | Kenstar Estella 2.0 electric kettle, 2 litre | ₹549 | ₹1,990 | 72% |
| Flipkart | MILTON Rapid 4.2L air fryer | ₹3,699 | ₹6,499 | 43% |
| Flipkart | Ambit steel clip carrier lunch box, 2 boxes / 6 containers | ₹389 | ₹999 | 61% |
| Flipkart | HALONIX Jasper Neo 1000W halogen heater | ₹888 | ₹1,949 | 54% |
| Flipkart | TRIGGR Arcus One wireless earbuds | ₹799 | ₹4,999 | 84% |
| Flipkart | Greenchef knife set, 5 pieces with chopping board | ₹299 | ₹899 | 67% |
| Flipkart | Engage Exquisite Collection grooming kit | ₹349 | ₹999 | 65% |
| Flipkart | Gear Dual 30L laptop backpack | ₹299 | ₹1,399 | 79% |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Flipkart links use `/p/itm…?pid=…&affid=djhackraj`.
- Images are from `m.media-amazon.com` or `rukmini1.flixcart.com`.
- Titles and descriptions are original copy.
- None of the 17 productIds existed in the DB before the push.
- Spot check: the Tapo RV10 and MILTON pages return 200 on prod. The Tapo page carries Offer price 15999.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #2109 | Nike Black Pepper deodorant, pack of 3 (B07S34X3Y7) | ₹249 | ₹284, M.R.P. ₹1,197 | **Synced to ₹284 (76% off).** Title and description updated, PH row added. |
| #5249 | boAt Sailor Play kids headphone (B0H1WXV25D) | ₹1,499 | ₹1,299, M.R.P. ₹4,999 | **Synced to ₹1,299 (74% off).** Title and description updated, PH row added. |
| #14556 | BEARDO ACID X SUNBURN 100ml (B0G81Y4G6T) | ₹799, M.R.P. ₹1,499 | ₹625, M.R.P. ₹2,500 | **Synced to ₹625 (75% off).** Title and description updated, PH row added. |

Slugs were not changed.

These rows already matched the PDP, so nothing was written:

- #16575 Skechers is ₹2,099. The card showed ₹1,931, which was wrong.
- #16518 ₹319 and #16521 ₹654.
- #16558 ₹159, with 4 left.
- #7461 ₹139, with 1 left.
- #16506 ₹151, with 1 left.

₹1 differences on #16591, #16579 and #16524 were ignored, because they are within tolerance.

## Rejected / skipped

- B0CPSSLGMR GLUN box: the card showed ₹15 but the PDP shows ₹108. Price drift.
- B09X5W9RR6 MQ Gloss lipstick: the PDP requires a minimum quantity of 2 (₹51), so the card price is not a single-unit price.
- Flipkart FANGZJBZUGN6MZCT Orient fan: the card showed ₹2,564 but the PDP shows ₹2,849. Price drift.
- Flipkart ACCGVQ5Z8BNDGKJH MSNR soundbar: no `itm` product path could be found.

All four were added to `data/dd-rejected.json` with `Date.now()` values. The remaining stage-1 drops were category hubs or carry-overs that were already judged in 15a–15d.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 17 new slugs and the 3 synced slugs. It returned **HTTP 200** for 23 urls (20 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.27s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.99s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,029 = 16,029 (16,012 + 17) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,592 vs 16,609 | OK. The gap is this tick's 17 deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Stage 1 still drops IFS Flipkart cards whose pid is null (`/indiafreestuff/p/`). They are resolved by hand each tick.
- Low-stock rows: #7461 (1 left), #16506 (1 left), #16558 (4 left). Re-check next tick.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
