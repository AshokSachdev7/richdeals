# DEAL-INGEST indiafreestuff tick — 2026-11-15f

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals`, its follow-on pages and `/deals/superdeals`, and resolved the base64 `?rto=` Buy Now ids. Run at about 10:55–11:20 IST.

- 69 cards resolved to a product. 19 were dropped (Flipkart null-pid cards, category pages and carry-overs). 34 were fresh and 35 were dups.
- The Flipkart null-pid cards were resolved by hand: the `itm` path, price and stock were read from ld+json in the logged-in Flipkart tab.
- Every fresh Amazon ASIN and every dup with a changed card price was read in the logged-in Amazon tab. The checks were `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. There was no captcha.

**Result: 13 pushed LIVE (bulk count 13, all created: 11 Amazon, 2 Flipkart). 1 dup row was price-synced and 6 cards were rejected. IndexNow returned HTTP 200 for 17 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | Reebok men's Rout 2 sneakers, Blue (B0D96B8VV5) | ₹989 | ₹3,299 | 70% |
| Amazon | Longway Super Pro juicer mixer grinder, 4 jars (B0GYNT7ZF1) | ₹1,489 | ₹3,939 | 62% |
| Amazon | Reebok men's MACHRUN M running shoes, Black (B0HKNB18Q6) | ₹2,160 | ₹4,799 | 55% |
| Amazon | boAt Type-A to Type-C 65W fast charging cable, Red (B0FMRMXNCG) | ₹219 | ₹799 | 73% |
| Amazon | Hindware Immedio 3L instant water geyser (B0H9531NZM) | ₹2,599 | ₹5,000 | 48% |
| Amazon | BSB Home glow-in-the-dark kids blanket (B0GR9BPW2F) | ₹399 | ₹1,799 | 78% |
| Amazon | USHA TechnoAir R 1200mm BLDC ceiling fan, Black (B0HHJM5TGT) | ₹1,930 | ₹4,199 | 54% |
| Amazon | Maped colouring kit, pack of 2 (B0DHXYLF4V) | ₹82 | ₹200 | 59% |
| Amazon | Wonderchef Glory push chopper, 800ml (B0CX5H2C1Y) | ₹299 | ₹900 | 67% |
| Amazon | Wipro 2W LED spotlight, pack of 6 (B0B4P6TCF8) | ₹385 | ₹1,350 | 71% |
| Amazon | Orient Electric Harrier BLDC pedestal fan, White (B0GS5DSXC1) | ₹2,858 | ₹6,499 | 56% |
| Flipkart | NIRLON Supreme 2L inner-lid induction pressure cooker | ₹449 | ₹2,635 | 83% |
| Flipkart | WONDERCHEF Ultima glass-top 2-burner manual gas stove | ₹4,799 | ₹7,000 | 31% |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Flipkart links use `/p/itm…?pid=…&affid=djhackraj`.
- Images are from `m.media-amazon.com` or `rukmini1.flixcart.com`.
- Titles and descriptions are original copy. The builder pre-flight checks passed: every ₹ in the copy matches the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs. The USHA product name was corrected from the PDP title before the push.
- None of the 13 productIds existed in the DB before the push, so no slug restore was needed.
- Spot check: the USHA and NIRLON pages return 200 on prod. The USHA page carries Offer price 1930.
- The Reebok MACHRUN M PDP showed only 1 left in stock.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #1722 | BeyBee Beta baby tricycle (B0CCST4DTC) | ₹2,290 | ₹2,184, M.R.P. ₹9,999 | **Synced to ₹2,184 (78% off).** Title and description rewritten, PH row added. |

The slug was not changed.

These rows already matched the PDP, so nothing was written:

- #16575 Skechers is ₹2,099. The card showed ₹1,931, which was wrong.
- #16521 ₹654 and #16518 ₹319.
- #360 Sulfar ladder ₹1,081, with 2 left.
- #16558 ₹159, with 4 left.

The other 29 dups were within ₹1 of the PDP.

## Rejected / skipped

- B09BLD5965 ASUS ROG Strix G16: the card showed ₹240,490 but the PDP shows ₹249,990. Price drift.
- B0FB3KN1T5 Wipro Garnet panel: the PDP shows ₹469 / M.R.P. ₹578 against the card's ₹1,870 / ₹5,780. Variant mismatch.
- B0DR2V971J Silver's racket: no buy box; the PDP shows ₹392 against the card's ₹171.
- Flipkart CNSHG6ZYR6GD7JVP Moon Dust bone china set: OutOfStock.
- Flipkart PRCFH8WHDSFZFZTZ WONDERCHEF 5L pressure cooker: OutOfStock.
- Flipkart CKSGGF9SGED33RDY Renberg Orchid cookware set: OutOfStock.

All six were added to `data/dd-rejected.json` with `Date.now()` values. Skipped: carry-overs already judged or LIVE in 15a–15e (AGARO, zonezer, DAYNEO, AsfA, RAPOO, LIMESTONE, EUREKA, GAUVIK, truke, FUBAR, TRIGGR, TCL, VEGA) and "Try it First Samples", which is a category page.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 13 new slugs and the synced slug. It returned **HTTP 200** for 17 urls (14 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.54s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,059 = 16,059 (16,046 + 13) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,625 vs 16,638 | OK. The cursor drained the desidime 11-15f batch. The 13-id gap is this tick's deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Stage 1 still drops IFS Flipkart cards whose pid is null (`/indiafreestuff/p/`). They are resolved by hand each tick.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610 B08DRNBZS4, #13537 (1 left), B0BWJWTRGC La Opala, #360 Sulfar (2 left), and the new Reebok MACHRUN M (1 left).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
