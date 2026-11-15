# DESIDIME-INGEST tick — 2026-11-15f

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage without fetching any per-deal pages. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and wrote the candidates. Amazon candidates were then verified in the logged-in Playwright Amazon tab: `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. Non-Amazon candidates went through `productLd()` (±₹1, InStock). Run at about 10:30–10:55 IST.

**Result: 10 pushed LIVE (bulk count 10, all created, all Amazon). 1 EXPIRED dup was revived at its live PDP price and 5 candidates were rejected. IndexNow returned HTTP 200 for 14 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| ASIN | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B0GRNQDQR6 | Height-adjustable multipurpose table with wheels, Wooden Black | ₹999 | ₹1,999 | 50% | Card = PDP. In stock, add-to-cart present. |
| B0FJW6PC7R | Boldfit women sliders, cushioned EVA, Grey | ₹199 | ₹799 | 75% | Card = PDP. In stock. Size-variant copy used. |
| B0G4N2H575 | Bata men casual loafer, Tan | ₹579 | ₹2,199 | 74% | PDP ₹578.84, rounded. In stock. Size-variant copy used. |
| B0D6QQTC1J | Amazon Brand Solimo photo frame set of 12, Black | ₹573 | ₹1,789 | 68% | Card = PDP. In stock. |
| B0CYHCVGC5 | Teal by Chumbak Rose Garden women's watch, Off White | ₹899 | ₹2,995 | 70% | Card = PDP. In stock. |
| B0DCBFN3TS | LuvLap reusable cloth diapers, 3 shells + 3 pads | ₹449 | ₹2,247 | 80% | Card = PDP. In stock. |
| B0CM3P4BL1 | Wonderchef Verona lunch box set of 3, 400 ml | ₹599 | ₹1,700 | 65% | Card = PDP. In stock. |
| B0BWJWTRGC | La Opala borosilicate vertical lunch box set of 3 with bag | ₹554 | ₹1,425 | 61% | Card = PDP. Only 2 left. |
| B0H2984KMS | United Colors of Benetton lunch bag + 3 glass containers | ₹591 | ₹1,799 | 67% | Card = PDP. In stock. |
| B0FXVM1BRR | Treo by Milton glass tiffin set of 2, 400 ml, Black | ₹387 | ₹995 | 61% | Card = PDP. In stock. |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. DesiDime's `desidime01-21` tag was stripped.
- Images are from `m.media-amazon.com`.
- Titles and descriptions are original copy written to the GEO playbook. The builder pre-flight checks passed: every ₹ in the copy matches the price, the first line states the % below M.R.P., price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the 10 productIds existed in the DB before the push. Spot check: the Bata page returns 200 on prod.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #360 | Sulfar foldable 5-step steel ladder (B0D1MMF994) | EXPIRED, ₹2,789 | ₹1,081, M.R.P. ₹13,195, only 2 left | **Revived LIVE at ₹1,081 (92% off).** Title and description rewritten, PH row added, slug unchanged. |
| #16583 | HP 360 speaker (B08NQXP8CR) | ₹701 | ₹701 | No change. The card's ₹680 was not on the PDP. |
| — | TRIGGR earbuds (Flipkart ACCHKBK5C8YFPKVS) | ₹599 | ₹599 | Already current, skipped. |

## Rejected

- B0F7R874PC Havells Crabtree: the card showed ₹2,343 but the PDP shows ₹3,906. Price drift.
- B0FF5H4PGD Lumio Arc 5: the card showed ₹19,166 but the PDP shows ₹21,990. The card price needs a bank offer.
- B0DRK1QWS2 French Connection watch: no price and no add-to-cart on the PDP.
- Flipkart ACNHJPE4GHAFFYZN TCL AC and ACNHHEJ6QBKH9QHJ Haier AC: stage 1 flagged price drift.

All five were added to `data/dd-rejected.json` with `Date.now()` values (1,985 entries).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 10 new slugs and the #360 slug. It returned **HTTP 200** for 14 urls (11 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.75s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.55s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,046 = 16,046 (16,035 + 10 new + #360 revived) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,620 vs 16,625 | OK. The cursor drained the tg-monitor 11-15k batch. The gap is this tick's deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461 (₹139), #16506 (₹151), #16558 (₹159), #16610 B08DRNBZS4, #13537 (1 left), and now B0BWJWTRGC La Opala (2 left) and #360 Sulfar (2 left).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
