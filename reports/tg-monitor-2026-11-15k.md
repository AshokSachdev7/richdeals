# TELEGRAM-DEAL-MONITOR tick — 2026-11-15k

This tick read the sidebar of the 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright richDeals profile. Shortlinks were resolved with curl, and each candidate was deduped against `data/tg-multi-seen.json` and the live DB. Prices were checked on the PDP: Amazon with an in-tab fetch in the logged-in Amazon tab, Shopsy by reading the price fields embedded in the page. Run at about 10:00–10:30 IST.

**Result: 5 pushed LIVE (bulk count 5, all created: 4 Amazon, 1 Shopsy). 3 dup rows were re-verified and price-synced. IndexNow returned HTTP 200 for 11 urls. Prod is 7/7 at 200 and every DB check is green.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| Dealzone | 09:58 Himalaya diaper; 09:14 Cello dinner set | Diaper was a dup (#13537, synced). **Cello pushed.** |
| SB Loots | 09:56 agarbatti (Shopsy) | **Pushed.** |
| ONLINE SHOPPING DEALS | 09:26–09:55, 5 posts | **Pushed:** Lifelong cooker, Symactive raincoat, TrueCare cream. HP backpack and Zureni towel rack were dups (synced). |
| CoolzTricks | 09:54 MANGO Myntra category post | Category post, skipped |
| RichDeals | 09:29 | Our own broadcast, skipped |
| Rogerkart | 00:39 "Photo" | No link |
| Dealdost | Anjeer 1kg | Already #16501 |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG washer | Already #5035 |
| NonStopDeals | Caprese category post | Category post, skipped |
| Loot Deals 24x7 / OMG LOOTDEALS / Deal Dibba | Not in the top rows | Nothing new since the last tick |

## Pushed

| ID | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B0GQT5H6QH | Lifelong 2L tri-ply stainless steel pressure cooker | ₹1,191 | ₹3,999 | 70% | Post said ₹1,191.30, PDP ₹1,191. In stock, add-to-cart present. |
| B0GG9PGBQZ | Amazon Brand Symactive unisex rain coat with pant, Blue, L | ₹401 | ₹1,600 | 75% | PDP ₹400.85 (post said the same). In stock. Size-variant copy used. |
| B0GS52XKW7 | TrueCare face cream, 50g | ₹299 | ₹999 | 70% | Post = PDP. In stock. |
| B0DNMN3GBZ | Cello Opalware Dazzle Imperial Rose 35-piece dinner set | ₹2,092 | ₹4,295 | 51% | Post = PDP. In stock. |
| XISHHYQXHGYTFVSM | DMLPBP premium 5-in-1 agarbatti, Guggal/Loban, 400g (Shopsy) | ₹113 | ₹749 | 85% | `finalPrice` ₹113, `mrp` ₹749, no Sold Out widget. |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. The source tag on the Cello post (`glitzdeal05-21`) was stripped.
- Shopsy is not Flipkart, so the clean `shopsy.in/.../p/itm…?pid=…` URL is wrapped in Cuelinks (`cid=527`). The store is "Shopsy", the same as #16164.
- The TrueCare PDP title stuffs another brand's name ("lakme") into its keywords. The copy uses the TrueCare name only.
- Images are from `m.media-amazon.com` (hiRes keyed by `landingAsinColor`) or `rukmini1.flixcart.com`.
- Titles and descriptions are original copy. The builder pre-flight checks passed: every ₹ in the copy matches the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs.
- None of the 5 productIds existed in the DB or in the seen list. Spot check: the Cello page returns 200 on prod.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #12651 | HP Campus Core 16 backpack, Green (B0FDKLVCMS) | ₹385 | ₹999, M.R.P. ₹2,299 | **Synced to ₹999 (57% off).** The post's ₹317 was not on the PDP. |
| #6456 | Zureni folding steel towel rack (B0D5BF3NY7) | ₹619 | ₹572, M.R.P. ₹2,399 | **Synced to ₹572 (76% off).** |
| #13537 | Himalaya Total Care baby pants, M, 76 count (B0H6BH9CB1) | ₹539 | ₹599, M.R.P. ₹1,199 | **Synced to ₹599 (50% off).** Only 1 left in stock. |

Title, description, price, MRP and discount were updated and a priceHistory row was added for each. Slugs were not changed.

`tg-multi-seen.json` now has 5,147 entries (7 added: the 5 new ids plus B0D5BF3NY7 and B0H6BH9CB1).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 5 new slugs and the 3 synced slugs. It returned **HTTP 200** for 11 urls (8 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.91s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.77s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,035 = 16,035 (16,030 + 5) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,610 vs 16,615 | OK. The gap is this tick's 5 deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461 (₹139), #16506 (₹151), #16558 (₹159), #16610 B08DRNBZS4, and now #13537 (1 left).
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673), both on ₹907.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
