# DESIDIME-INGEST tick — 2026-11-16a

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage without fetching any per-deal pages. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and wrote the candidates. Amazon candidates were then verified in the logged-in Playwright Amazon tab: `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. Non-Amazon candidates went through `productLd()` (±₹1, InStock), and the Flipkart row was re-read in a Playwright tab. Run at about 11:05–16:40 IST.

**Result: 9 pushed LIVE (bulk count 9, all created): 8 Amazon, 1 Flipkart. 4 candidates were rejected for price drift and 3 were skipped. IndexNow returned HTTP 200 for 12 urls. Prod is 7/7 at 200 and every DB check is green.**

Sweep: 39 cards discovered, 18 resolved to a product, 1 already in the DB, 1 rejected within the last 24h, 16 fresh candidates.

## Pushed

| Product id | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B0FWRT9NNJ | Portronics Power Plate 9 Pro 2500W 7-in-1 desktop charging station | ₹899 | ₹2,499 | 64% | Card = PDP. In stock, add-to-cart present. |
| B0GC61P1RZ | Just Herbs Luxe Infinite Glow hydrating foundation | ₹187 | ₹1,299 | 86% | Card = PDP. M.R.P. confirmed on the PDP. In stock. |
| B0FJGBJ1RD | Just Herbs Luxe Dream Muse mousse liquid lipstick | ₹108 | ₹899 | 88% | Card = PDP. M.R.P. confirmed on the PDP. In stock. |
| B0GMW86PWV | Mumma's LIFE triply pressure cooker 3L, inner lid, ISI | ₹1,482 | ₹4,495 | 67% | Card ₹1,483, PDP ₹1,482 (within ±₹1, listed at the PDP price). In stock. |
| B0D89TRKR6 | Bloomingdale universal raincoat | ₹149 | ₹499 | 70% | Card = PDP. In stock. Size-variant copy used. |
| B08KHK2LQM | SKINQ Hydrate face serum with hyaluronic acid | ₹394 | ₹699 | 44% | Card = PDP. In stock. |
| B08V8BRLW4 | SIMPARTE Nesterware round container set of 6, Purple | ₹209 | ₹799 | 74% | Card = PDP. In stock. Image taken from the colorImages entry for the landing colour. |
| B0DPMCWQC6 | Beardo Man Curls curly hair cream, 100g | ₹87 | ₹350 | 75% | Card = PDP. In stock. |
| ACCG3P98YHPFWFKF | SONY CFI-ZCT2W Bluetooth gamepad (PS5/PC/Mac), Red | ₹4,390 | ₹6,390 | 31% | ld+json `offers.price` 4390, InStock, add-to-cart present. M.R.P. read from the PDP (the card had none). |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. DesiDime's `desidime01-21` tag was stripped.
- The Flipkart link uses the real `/p/itmf1ac906dea167` path with `pid` + `affid=djhackraj`. DesiDime's `affid=salescueli` and `affExtParam` values were dropped.
- Images come from `m.media-amazon.com` and `rukminim2.flixcart.com`. The SIMPARTE `#landingImage` was empty, so the image was keyed by `landingAsinColor` ("Set of 6 Purple 1L,750ml &500ml") rather than the first hiRes, which can show another variant.
- The two Just Herbs rows are above 80% off. Both M.R.P. figures were read on the Amazon PDP, not taken from the card, so they are kept (same rule as the LuvLap row on 11-15f).
- Sony: Flipkart shows "Buy at ₹4,170" with bank offers. We list the base price of ₹4,390, and the copy says card offers can lower it at checkout.
- Titles and descriptions are original copy written to the GEO playbook. The builder pre-flight checks passed: every ₹ in the copy matches the price, the first line states the % below M.R.P., price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the 9 productIds existed in the DB before the push, so no slug restore was needed. Spot check: the Sony page returns 200 on prod.

## Dup re-checks

None this tick. The one DB hit in stage 1 was already LIVE at the card price.

## Rejected / skipped

Rejected for drift between the card and the PDP:

- B0H6G1PLG3 Jmax bottle: card ₹332, PDP ₹349.
- B0H9T73HJ7 Bosch 302L refrigerator: card ₹32,240, PDP ₹37,990.
- B0H2VFNQFL Bergner belly hot pot: card ₹630, PDP ₹899.
- B0GSZC1W7J Lifelong 4-burner hob: card ₹6,867, PDP ₹7,630.

All four were added to `data/dd-rejected.json` with `Date.now()` values (2,001 entries).

Skipped:

- Hamaramall NAFED Rajma: grocery.
- Hamaramall Portronics blower: the page has no ld+json, so the price cannot be verified.
- Klook: a sale hub, not a single product.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 9 new slugs and returned **HTTP 200** for 12 urls (9 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,080 = 16,080 (16,071 + 9) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,650 vs 16,659 | OK. The external broadcast cron picks up the 9 new rows on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. 11-16 is still below the 2-post floor. The CONTENT-SEO cron (`9 */6 * * *`) adds the second post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC La Opala, #360 Sulfar, Reebok MACHRUN M (B0HKNB18Q6), B09MJCSBQ2, B094RHH82D, B096CHYS68.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug, which contains "676" from the old junk title. Changing it would 404 the existing URL, so it stays.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
