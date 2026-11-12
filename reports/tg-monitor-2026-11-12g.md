# TELEGRAM-DEAL-MONITOR tick — 2026-11-12g

The Playwright MCP (richDeals profile) read the `.chat-list` sidebar for all 13 groups in `data/tg-groups.json` in one `browser_evaluate`. Single-product deals from all stores were extracted and shortlinks resolved. Dedup ran against `data/tg-multi-seen.json` and the live DB productId.

**Result: 0 pushed.** Nothing new has been posted since 12f. Every candidate in the sidebar was already rejected, already seen, or confirmed in 12f.

## Funnel

| Step | Count |
|---|---|
| Groups scanned | 13 (Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba had no sidebar row) |
| Single-product candidates | 4 |
| Skipped (already seen and rejected) | 3 (CoolzTricks B0G6KD4TVY and B0FFN3J26J, rejected in 12f; Dealzone bittli.in → Shopsy XWAGUVD6RMSZ7DD8 Moonatic clock) |
| Dup of LIVE row (productId) | 1 (#16371 MuscleTrail Ashwagandha ₹399, confirmed in 12f with a priceHistory row, so it was not re-read) |
| Fresh | 0 |
| Pushed | **0** |

Not candidates: Dealdost watches "Upto 90%" (category loot), NonStopDeals Caprese handbags (category), Rogerkart Myntra Libas "Upto 87%" (category), INDIAN CHEAP DEALS LG washing machine sale (sale hub), Hidden Loot and IndiaFreeStuff Tips Swiggy Dineout (non-store), SB Loots notification promo (no deal).

## Dup LIVE rows: PDP re-verify

Synced: none. Confirmed: none this tick (#16371 already confirmed in 12f). Delisted: none.

The seen list is unchanged at 5,081 entries.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- No ping needed: 0 deals pushed and 0 slugs touched.
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.65s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.57s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
