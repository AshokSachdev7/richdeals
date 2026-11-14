# TELEGRAM-DEAL-MONITOR tick — 2026-11-14d

Read the newest post of each group in `data/tg-groups.json` with one `browser_evaluate` over the logged-in Telegram Web sidebar, scrolling the virtualized list to reach the lower rows. Kept only single-product links, resolved the shortlinks, and deduped against `data/tg-multi-seen.json` and the live DB. Verified every candidate price on the Amazon PDP in the logged-in tab. Run at about 23:19 IST.

**Result: 0 new deals pushed. Both shortlinked candidates were already LIVE, and both PDPs matched the DB price, so no row changed and no IndexNow ping was needed. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

None new.

## SEEN re-checks

| Row | Deal | Source | PDP | Action |
|---|---|---|---|---|
| #10870 | Vaseline Cloud Soft 300 ml B0F4W9RPZ2 | CoolzTricks `amzn.to/4BZB1Dj` (tag `collab-amafhh-21`) and SB Loots `amazn.lt/rxkLosNm` (tag `bhavesh015-21`), both "@270" | ₹275 / ₹699, in stock, add-to-cart present, "Apply 2% coupon" | No change. The channel's ₹270 is the post-coupon price. The DB already holds ₹275 from the deal-ingest 11-14a sync. |
| #16501 | RR NUTS Afghani Anjeer 1 kg B0HMHFZ2ZM | Dealdost `amzn.to/4zNxQNi` (tag `7383-21`), ₹399 | ₹399 / ₹999, in stock, add-to-cart present | No change |

## Rejected

| Group | Item | Reason |
|---|---|---|
| ONLINE SHOPPING DEALS | Shatras Panchgavya soap, pack of 3, ₹151 | Low-ticket FMCG |
| Dealzone | Jeans loot "from ₹195" (`link.amazon`) | Category page |
| Rogerkart | Havells coupon | Hub page |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG washer sale (Oct 29) | Stale, and #5035 was re-checked in 11-14a |
| NonStopDeals | Caprese "Surf All Pages" (Oct 5) | Stale category page |
| OMG LOOTDEALS (Aug 14), Loot Deals 24x7 (Nov 2023) | — | Dormant |
| Deal Dibba | — | Not rendered even after scrolling |

B0HMHFZ2ZM was added to `data/tg-multi-seen.json` (5,138 entries). B0F4W9RPZ2 was already there.

## Freshness

- IndexNow: not run. No row was created or changed this tick.
- `sitemap.xml`: ISR, at most 30 min stale. Nothing new.
- `llms.txt`: force-dynamic. Nothing new.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.19s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.24s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,988 = 15,988 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 486, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,514 vs 16,566 | Pending. The external broadcast is draining the 57-row deal-ingest batch (16,509 → 16,514 since the last tick), and it self-heals |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2. OK.

## Still open

- Telegram yield is thin tonight: 3 links, all of them dups of live rows. Daytime runs carry the source.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Same-price confirm paths in the other ingests still write no priceHistory row.
- Low-stock rows to re-check (carried over), plus the Symbol shorts B0F79NPMPQ.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
