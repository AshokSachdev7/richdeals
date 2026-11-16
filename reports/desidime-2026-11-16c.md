# DESIDIME-INGEST tick — 2026-11-16c

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) swept `/new` and the homepage cards, resolved each Buy Now through `visit.desidime.com` to the real merchant URL, filtered junk and grocery, and deduped against the live DB by productId. Every Amazon price was then read on the PDP in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` plus add-to-cart). Flipkart was read from the PDP ld+json in a Playwright tab. Run at about 12:15–12:50 IST.

**Result: 4 pushed LIVE (bulk count 4, all created, all Amazon). 2 dup rows had moved price and were synced with a priceHistory row. IndexNow returned HTTP 200 for 9 urls. Prod is 7/7 at 200, the 6 touched deal pages return 200, and DB LIVE = API total = 16,091.**

Stage 1 line: `35 discovered, 16 junk/other dropped, 19 product-resolved, 4 already in DB, 5 rejected <24h, 10 fresh`.

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | Longway Kwid 1100W dry iron (B0BN384XRY) | ₹449 | ₹879 | 49% |
| Amazon | Microfiber cleaning cloth roll, tearable, 50 pcs (B0H4LHM8FV) | ₹425 | ₹999 | 57% |
| Amazon | Pepe Jeans men's regular fit track pants, black (B0C3DCYQ8N) | ₹541 | ₹1,399 | 61% |
| Amazon | Pspeaches girls' ethnic cotton floral 2-piece dress with cape (B0D22R2T6V) | ₹859 | ₹3,122 | 72% |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Images are from `m.media-amazon.com`.
- The microfiber roll card said M.R.P. ₹499; the PDP shows ₹999, and the PDP figure was used.
- The Longway iron PDP showed "Only 1 left". It went on the low-stock re-check list.
- Titles and descriptions are original copy. The builder pre-flight passed: every ₹ in the copy equals the price, the title's ₹ equals the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the four productIds existed in the DB, so no slug restore was needed. All four pages return 200 on prod.

## Dup re-checks

| Row | Deal | DB | PDP | Action |
|---|---|---|---|---|
| #16666 | GM Balin 15L geyser (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | same, in stock | None. The card's ₹4,948 is a bank-offer price. |
| #12146 | Sony XB100 speaker (B0C29BL8BS) | ₹2,990 / ₹4,990 | same, in stock | None. The card's ₹2,489 did not show on the PDP. |
| #16658 | Beardo curl cream (B0DPMCWQC6) | ₹87 / ₹350 | ₹235, M.R.P. ₹350, in stock | Synced to ₹235 / ₹350 (33% off). Title and description rewritten, priceHistory row added. |
| #1822 | Booster blender (Flipkart, MIXHGBHCR6MWREFS) | ₹1,342 / ₹2,999 | ld+json ₹1,044, InStock, mrp ₹2,999 | Synced to ₹1,044 (65% off). Title renamed to match the listing, "BOOSTER Powerful Blender 750 W". The affiliateUrl moved off the invalid `/indiafreestuff/p/indiafreestuff` path to the real `/p/itm19357a86141c7?pid=…&affid=djhackraj`. Slug kept. |

## Rejected / skipped

- B0H63P2MDC foot detox pads: a pseudo-science health claim. Quality reject.
- B0BS1RT9S2 Sony WH-CH520: the card said ₹2,989, the PDP shows ₹3,989. Drift.
- B075Z25PQK Sony MDR-EX14AP: unavailable, no price and no add-to-cart.
- Instamart Lifelong tent and Neemans slip-ons: no ld+json price to verify.
- Lloyd 1.5T AC (Flipkart): price drift.
- 5 already rejected in the last 24h: Klook sale, Bergner belly, Lifelong hob, VIP vests, Dettol (Flipkart).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 4 new slugs and the 2 synced slugs and returned **HTTP 200** for 9 urls (6 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| / | 200 | 0.30s |
| /offers | 200 | 0.15s |
| /blog | 200 | 0.84s |
| /sitemap.xml | 200 | 0.10s |
| /feed.xml | 200 | 0.09s |
| /api/deals | 200 | 0.11s |
| /llms.txt | 200 | 0.84s |
| 4 new deal pages + 2 synced deal pages | 200 | 0.15–0.21s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,091 = 16,091 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,670 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,666 vs 16,670 | OK. The external broadcast cron picks up this tick's 4 rows on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 2-per-day floor is met. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- IFS yield: if the 12:53 IST IFS tick finds 0 new ids again, check whether the Buy Now format changed.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
