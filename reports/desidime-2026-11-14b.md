# DESIDIME-INGEST tick — 2026-11-14b

Stage 1 (`ingest-desidime.mjs`) read the listing cards only, applied the JUNK and GROCERY filters and resolved `visit.desidime.com`. It found 35 cards: 15 resolved to a single product, 5 were already in the DB, 1 had been rejected in the last 24h (Klook) and 9 were fresh. Amazon prices were checked in the logged-in Playwright tab (`#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart). Flipkart prices were checked with an in-tab ld+json read.

**Result: 3 new deals pushed LIVE (count:3, all created:true). 2 duplicate rows were price-synced. IndexNow returned HTTP 200 for 8 urls. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| Slug | Price | MRP | Off |
|---|---|---|---|
| borosil-4-piece-borosilicate-glass-lunch-box-set-b0fcltfbzp | ₹765 | ₹2,195 | 65% |
| aesthetic-womens-pu-leather-shoulder-tote-bag-with-chain-strap-b0g9mqkmrr | ₹295 (the card said ₹297, so the PDP price was used) | ₹999 | 70% |
| triggr-raze-1-bluetooth-earbuds-40h-battery-low-latency-acchkbk5c8yfpkvs (Flipkart) | ₹599 | ₹3,999 | 85% |

## Dup re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #4360 | Lavie Sport Bristol duffle B0BNKHF1FD | DB had ₹599 and no MRP. PDP shows ₹699, MRP ₹3,499, in stock. | Synced to ₹699, MRP ₹3,499, 80% off. Description fixed, slug kept. |
| #15255 | Solimo dinner set B0CB5QMMR4 | DB had ₹463. PDP shows a flat ₹789 (read twice), MRP ₹1,499, in stock. | Synced to ₹789 (47% Off). Title and description fixed, slug kept. |
| #16500 | VAS blanket B0HNSDJS4W | PDP shows ₹2,199, which matches the DB | No change |

## Rejected

| Item | Reason |
|---|---|
| Spotzero toilet cleaner B096M74BKW, ₹50 | Low-ticket FMCG |
| Natureland flour B07B9XWKWS | Grocery |
| TrustBasket planter B099ZY1MQL | PDP ₹711 vs card ₹168 |
| AsfA drone DNEHGZWUWRVHZGYH (Flipkart) | PDP ₹12,443 vs card ₹11,537 |
| Canon EOS R8 DLLGQAQYC4TWGN8R (Flipkart) | PDP ₹1,05,990 vs card ₹1,01,640 |
| Hisense AC ACNHHEJQZBFWH2G3 (Flipkart) | PDP ₹25,990 vs card ₹24,695. The card prices include bank offers. |
| Klook | Already rejected in the last 24h |

Stage 1 only writes Flipkart rejects to `data/dd-rejected.json`, so the 3 Amazon rejects were added by hand (`Date.now()`), bringing the file to 1,921 keys.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 3 new slugs plus #4360 and #15255. It returned **HTTP 200** for 8 urls (the 5 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals sitemap child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.53s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,931 = 15,931 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 486, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,506 vs 16,509 (the 3 new rows are waiting for the external broadcast) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, **11-14 2** (meets the rule).

## Still open

- Bank-offer rejects B08SW56CDQ and B0H9FK9XZZ are now in `dd-rejected.json`. **Closed.**
- Stage 1 does not record Amazon or other non-Flipkart verify rejects in `dd-rejected.json`, so they come back as candidates on every sweep unless they are added by hand.
- Same-price confirm paths and dup-syncs write no priceHistory row, which is the root cause of missing priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it.
- #11896 has Flipkart drift (₹664 vs ₹899 in the DB).
- #16506 (soap) is down to 1 left. Re-check it.
- Post 615 is under 900 words and was written with no SERP research. Expand it.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
