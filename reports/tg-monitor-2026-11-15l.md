# TELEGRAM-DEAL-MONITOR tick — 2026-11-15l

This tick read the sidebar of the 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright richDeals profile. For SB Loots, whose history lazy-loads, the evaluate also scrolled `.MessageList` to the bottom so the newest messages were read. Shortlinks were resolved with curl, and each candidate was deduped against `data/tg-multi-seen.json` and the live DB. Prices were checked on the PDP in the logged-in Amazon tab: `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. The run finished before 11:50 IST.

**Result: 3 pushed LIVE (bulk count 3, all created, all Amazon). 3 dup rows were re-verified and price-synced, and 3 more were confirmed unchanged. IndexNow returned HTTP 200 for 9 urls. Prod is 7/7 at 200 and every DB check is green.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| ONLINE SHOPPING DEALS | 10:52 Parachute hair cream | **Pushed.** |
| SB Loots | 09:20–09:48 keyboard combo, V-Guard geyser, ACTIVA geyser, Tata coffee; MANGO, women's jeans, dry dates | **Pushed:** keyboard combo, V-Guard. ACTIVA and Tata coffee were dups (synced). MANGO and the jeans are Myntra category posts, and the dates post has several links, so all three were skipped. |
| Dealzone | Reebok and Bata category posts; Go24 bottle; Bata loafer | Category posts skipped. Go24 was a dup (synced). Bata loafer already #16618. |
| CoolzTricks / others | Treo by Milton, CELLO Glassy Square, Longway juicer | Already #16625, #16592 and the 15f Longway deal |
| RichDeals | — | Our own broadcast, skipped |
| Rogerkart | 00:39 "Photo" | No link |
| Dealdost | Anjeer 1kg | Already #16501 |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG washer | Already #5035 |
| NonStopDeals | Caprese category post | Category post, skipped |
| Loot Deals 24x7 / OMG LOOTDEALS / Deal Dibba | Not in the top rows | Nothing new since the last tick |

## Pushed

| ASIN | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B077HRJF54 | Parachute Advansed men hair cream, 100g, pack of 3 | ₹163 | ₹300 | 46% | Post = PDP. In stock, add-to-cart present. |
| B0FH25BLFV | Ant MASTER10 wired keyboard and mouse combo, Black | ₹318 | ₹1,499 | 79% | PDP ₹318. In stock. |
| B094NQYG66 | V-Guard Victo 25L storage water heater, White | ₹8,899 | ₹14,500 | 39% | PDP ₹8,899. In stock. |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. Source tags were stripped.
- Images are from `m.media-amazon.com`.
- Titles and descriptions are original copy. The builder pre-flight checks passed: every ₹ in the copy matches the price or MRP (the Parachute copy also gives the per-tube cost, about ₹54), price < MRP, the image matches the CDN pattern, and each slug ends in the lowercase ASIN.
- None of the 3 productIds existed in the DB or the seen list, so no slug restore was needed. Spot check: the V-Guard page returns 200 on prod.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #16355 | ACTIVA 25 L storage water geyser (B08641ND67) | ₹4,099 | ₹4,199, M.R.P. ₹7,490 | **Synced to ₹4,199 (44% off).** |
| #12229 | Tata Classic instant coffee 200g pouch (B09VGRNCJ7) | ₹281 | ₹318, M.R.P. ₹520 | **Synced to ₹318 (39% off).** Add-to-cart present; `#availability` read empty. |
| #6989 | Go24 pexpo 950ml steel bottle (B0C9TSPB6B) | ₹382 | ₹579, M.R.P. ₹1,098 | **Synced to ₹579 (47% off).** The ASIN now serves the Pack of 2 in Military Green, so the title and copy were rewritten for the pack. The post's ₹355.87 was not on the PDP. |

Title, description, price, MRP and discount were updated and a priceHistory row was added for each. Slugs were not changed.

These rows already matched the PDP, so nothing was written:

- #16618 Bata loafer: ₹578.84 against ₹579, within ₹1.
- #16625 Treo by Milton: ₹387.
- #16592 CELLO Glassy Square: ₹587.

`tg-multi-seen.json` now has 5,155 entries (8 added: the 3 new ASINs plus B0G4N2H575, B0C9TSPB6B, B0FXVM1BRR, B08641ND67 and B0DXPPJ8YQ).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 3 new slugs and the 3 synced slugs. It returned **HTTP 200** for 9 urls (6 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,062 = 16,062 (16,059 + 3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,635 vs 16,641 | OK. The cursor moved from 16,625 since the deal-ingest 11-15f tick. The 6-id gap is the tail of that batch plus this tick's 3 deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Stage 1 still drops IFS Flipkart cards whose pid is null (`/indiafreestuff/p/`). They are resolved by hand each tick.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610 B08DRNBZS4, #13537 (1 left), B0BWJWTRGC La Opala, #360 Sulfar (2 left), and Reebok MACHRUN M B0HKNB18Q6 (1 left).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, and now #6989, which moved from a single bottle to a pack of 2). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
