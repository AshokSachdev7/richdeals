# TELEGRAM-DEAL-MONITOR tick — 2026-11-16a

This tick read the Telegram Web sidebar inline in the Playwright "richDeals" profile and pulled single-product deals from every store. Shortlinks were resolved first. Each candidate was deduped against `data/tg-multi-seen.json` and against productId in the live DB, then its price was read on the PDP in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability`, add-to-cart). Run at about 10:35–10:50 IST.

**Result: 3 pushed LIVE (bulk count 3, all created, all Amazon). 7 dup rows were price-synced to the PDP and 3 candidates were rejected. IndexNow returned HTTP 200 for 13 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | TRESemmé Keratin Smooth anti-frizz hair serum with argan oil, 100ml (B0BHHJXNY3) | ₹268 | ₹446 | 40% |
| Amazon | LEGO Speed Champions Bugatti Vision Gran Turismo car set 77253 (B0FPVT4VG6) | ₹1,899 | ₹2,999 | 37% |
| Amazon | PHILIPS DLC4160AR 18W Type-C fast charging cable, 2m, Coral Reef (B0GPDVLHH4) | ₹238 | ₹998 | 76% |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Images are from `m.media-amazon.com`.
- Titles and descriptions are original copy. The builder pre-flight checks passed: every ₹ in the copy matches the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the 3 productIds existed in the DB before the push, so no slug restore was needed.
- Spot check: the TRESemmé page returns 200 on prod.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #16134 | Axe Midnight Oak EDP, 100ml (B0FQP1N4TL) | ₹299 | ₹374, M.R.P. ₹1,499 | Synced (75% off) |
| #14458 | Havells Glamax 9W WiFi smart bulb (B0D738FNB2) | ₹299, no MRP | ₹349, M.R.P. ₹1,999 | Synced (83% off) |
| #12798 | Ant Esports AEKS100 kitchen scale (B0CP2FPPM5) | ₹159 | ₹189, M.R.P. ₹1,199 | Synced (84% off) |
| #14012 | CareFoam memory foam pillow (B0D4QWY4S4) | ₹499 | ₹879, M.R.P. ₹1,799 | Synced (51% off) |
| #7683 | Wonderchef Vista Plus 500W, 3 jars (B0GV3Z8FGQ) | ₹1,699, no MRP | ₹1,899, M.R.P. ₹4,000 | Synced (53% off) |
| #652 | Vector X men's winter track suit set (B0BLVTT8ZM) | ₹1,899, junk "@676" title | ₹1,604, M.R.P. ₹3,049 | Synced (47% off), title rewritten |
| #16632 | USHA TechnoAir R 1200mm BLDC fan, Black (B0HHJM5TGT) | ₹1,930 | ₹2,699, M.R.P. ₹4,199 | Synced (36% off) |

Each sync rewrote the title and description so that no stale ₹ figure remains, and added a priceHistory row. The script checked that every ₹ in the new copy equals the price or the MRP. No slug was changed.

## Rejected / skipped

- B09YV753WH VIP vest: currently unavailable.
- B0FFN736CP Milton: the PDP shows ₹836 against the post's ₹250.
- B07JPLC6R6 Signoraware: the PDP shows ₹639 against the post's ₹349.

All three were added to `data/dd-rejected.json` with `Date.now()` values. Skipped: a Nayasa `/s?` search page, a Myntra Kook N Keech category listing, and B09N2TK64V and B07SRM58TP, which were already seen. The 13 ASINs handled this tick were appended to the `tg-multi-seen.json` array (now 5,168 entries).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 3 new slugs and the 7 synced slugs. It returned **HTTP 200** for 13 urls (10 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.26s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.53s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,065 = 16,065 (16,062 + 3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,644 = 16,644 | OK. The external broadcast cron already picked up this tick's 3 deals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16 (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC La Opala, #360 Sulfar, Reebok MACHRUN M (B0HKNB18Q6).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug, which contains "676" from the old junk title. Changing it would 404 the existing URL, so it stays.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
