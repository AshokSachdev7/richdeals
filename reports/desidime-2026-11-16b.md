# DESIDIME-INGEST tick — 2026-11-16b

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) swept `/new` and the homepage cards, resolved each Buy Now through `visit.desidime.com` to the real merchant URL, filtered junk and grocery, and deduped against the live DB by productId. Every surviving price was then read on the PDP in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` plus add-to-cart). Run at about 11:30–11:41 IST.

**Result: 4 pushed LIVE (bulk count 4, all created, all Amazon). 2 dup rows had moved price and were synced with a priceHistory row. 1 dup row has no buy box and is on watch. IndexNow returned HTTP 200 for 9 urls. Prod is 7/7 at 200 and every DB check is green.**

Stage 1 line: `33 discovered, 18 product-resolved, 8 already in DB, 5 rejected <24h, 5 fresh`.

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | Just Herbs festive makeup kit for women (B0HBR7B2WZ) | ₹457 | ₹999 | 54% |
| Amazon | Drools Trio Bolt Ring rubber dog toy, 130g (B0BS9M28LM) | ₹89 | ₹299 | 70% |
| Amazon | Drools Trio Bolt Ring rubber dog toy, 115g (B0BS9J61NQ) | ₹76 | ₹299 | 75% |
| Amazon | Fashion Frill gold-plated stretchable ring watch (B0CYQ5Q5ZV) | ₹269 | ₹999 | 73% |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Images are from `m.media-amazon.com`.
- The 115g Drools card said ₹77; the PDP shows ₹76 (within ±₹1), and the PDP figure was used.
- Titles and descriptions are original copy. The builder pre-flight passed: every ₹ in the copy equals the price, the title's ₹ equals the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the four productIds existed in the DB, so no slug restore was needed. The Just Herbs page returns 200 on prod.

## Dup re-checks

| Row | Deal | DB | PDP | Action |
|---|---|---|---|---|
| #13311 | Margo neem soap, pack of 8 (B082GB1N7K) | ₹300 / ₹315 | ₹284, M.R.P. ₹448, in stock | Synced to ₹284 / ₹448, priceHistory row added |
| #16651 | Portronics Power Plate 9 Pro (B0FWRT9NNJ) | ₹899 / ₹2,499 | ₹1,099, M.R.P. ₹2,499, in stock | Synced to ₹1,099, priceHistory row added |
| #9689 | Haier 8kg washing machine (B0GSF13KJS) | ₹29,110 / ₹45,000 | No buy box, no add-to-cart ("See All Buying Options") | Left as is, on watch. The card's ₹27,130 could not be verified. |
| #12284 | Nestasia | ₹999 / ₹2,499 | same | None |
| #12798 | Ant Esports kitchen scale | ₹189 / ₹1,199 | same | None |
| #16652 | Just Herbs foundation | ₹187 / ₹1,299 | same | None |
| #16653 | Just Herbs lipstick | ₹108 / ₹899 | same | None |
| #16658 | Beardo | ₹87 / ₹350 | same | None |

## Rejected / skipped

- Flipkart Dettol (CBKHEPQZ8ARJZHGG): the card's ₹250 drifted from the PDP. Skipped.
- An Adidas Flipkart link resolved to `/search?`, a category page. Dropped.
- 5 already rejected in the last 24h: Jmax B0H6G1PLG3, Klook, Bergner B0H2VFNQFL, Lifelong B0GSZC1W7J, VIP B09YV753WH.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 4 new slugs plus the #13311 and #16651 slugs and returned **HTTP 200** for 9 urls (6 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,086 = 16,086 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,661 vs 16,665 | OK. The external broadcast cron picks up this tick's 4 rows on its next run. |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16, and SITEMON b re-checks it.

## Still open

- #9689 Haier washer: no buy box on the PDP. Re-check next tick; set EXPIRED if it stays unavailable.
- #14635 (Mivi, Flipkart): no priceValidUntil. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil; the same-price confirm paths still write no priceHistory row.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
