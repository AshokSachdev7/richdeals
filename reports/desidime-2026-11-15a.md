# DESIDIME-INGEST tick — 2026-11-15a

Stage 1 (`ingest-desidime.mjs`) read the listing cards only, applied the JUNK and GROCERY filters and resolved `visit.desidime.com`. It found 37 cards: 10 fresh single-product candidates, 5 already in the DB, and 1 rejected in the last 24h (Yogabar). Amazon prices were checked in the logged-in Playwright tab (`#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart). Non-Amazon prices were checked with `productLd()` (ld+json, ±₹1, InStock). Run at about 00:45 IST.

**Result: 4 new deals pushed LIVE (count:4, 3 Amazon + 1 Myntra, all created:true). 1 duplicate row was price-synced and 3 were confirmed. IndexNow returned HTTP 200 for 8 urls. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| Row | Slug | Price | MRP | Off |
|---|---|---|---|---|
| #16568 | symbol-boys-festive-rayon-kurta-pajama-set-b0dfwgs7b5 | ₹319 | — | — |
| #16569 | jungle-animal-wooden-puzzle-for-kids-11-pieces-b09pdft2yf | ₹200 | — | — |
| #16570 | adidas-mens-zapcore-running-shoe-b0cpvkcdv3 | ₹1,824 | ₹4,799 | 62% |
| #16571 | kraft-india-mens-green-jacquard-nehru-jacket-20050728 (Myntra) | ₹675 | ₹2,799 | 76% |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`.
- The Myntra link goes through InRDeals (`inr.deals/track?id=inr678975705…`), not Cuelinks.
- Images come from `m.media-amazon.com` and `assets.myntassets.com`. All copy is original.

## Dup re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #4692 | Logitech K250 keyboard B0FJQWRBVH | DB had ₹1,099. PDP shows ₹854, MRP ₹2,820, in stock. | Synced to ₹854 (70% off) via `prisma.deal.update`. Slug kept, priceHistory row added. |
| #15255 | Solimo dinner set B0CB5QMMR4 | Card said ₹464. PDP shows ₹789, which matches the DB. | No change |
| #16365 | Gala scrubber | PDP shows ₹110, which matches the DB | No change |
| #16509 | TRIGGR Raze 1 (Flipkart) | PDP shows ₹599, which matches the DB | No change |
| #1411 | Dabur | EXPIRED, low-ticket FMCG | Left as is |

## Rejected

| Item | Reason |
|---|---|
| Q-RIOUS sweatpants B0GR6W5BFB | No buybox or add-to-cart, and the claimed 92% off is not credible |
| ORDRO camcorder B07ZQ2T3Q6 | PDP ₹7,399 vs card ₹6,660 |
| BoroPlus B0CMCW69WH, ₹49 | Low-ticket FMCG |
| Lakme sheet mask 11523460 (Myntra), ₹37 | Low-ticket FMCG |
| Haier AC ACNHHMBYDG2HDCRP (Flipkart) | PDP ₹33,990 vs card ₹24,390. The card price includes bank offers. |
| Klook | Sale hub, no ld+json |
| App-store link, Amazon `/clp/` Milton page | Dropped in stage 1 (not single products) |
| Yogabar B0CBRXH9TN | Already rejected in the last 24h |

Stage 1 only writes Flipkart rejects to `data/dd-rejected.json`, so the other keys were set by hand (`Date.now()`). The file now has 1,964 keys. It also carries earlier uncommitted changes, so it is not part of this commit.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 4 new slugs plus the #4692 slug. It returned **HTTP 200** for 8 urls (the 5 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals sitemap child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.78s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,993 = 15,993 (+4) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,567 vs 16,571 | Pending. The external broadcast run drains it and self-heals |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run should add the second post.

## Still open

- 11-15 IST is 1/2 posts. The 06:39 IST CONTENT-SEO run must publish one more.
- Stage 1 still records only Flipkart rejects. Amazon and other-store rejects are added by hand.
- Same-price confirm paths still write no priceHistory row.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras, Symbol shorts B0F79NPMPQ.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
