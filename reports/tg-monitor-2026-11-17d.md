# TELEGRAM-DEAL-MONITOR tick — 2026-11-17d

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile), then read the history of the open SB Loots chat. Run at about 02:55–03:05 IST.

**Result: 0 deals pushed. The only post newer than tick 11-17b (00:40–01:10 IST) is an SB Loots notification-settings promo, not a deal. IndexNow was not run. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

None. No single-product post appeared after tick 11-17b.

## Rejected / skipped

- **SB Loots, 02:31 AM:** "Missed Some Loots… Best Setting for SB Loots & Deals Telegram Channel", a channel notification-settings promo linking `saverhuboffers.com`. Not a product.
- **SB Loots history, 12:12–12:35 AM:** all 15 messages were handled in tick 11-17b. The BUY links (`EkpjWBOD`, `9ioBPAkf`, `y2OwjGyT`, `UAv905Zv`) were pushed or rejected, and the footwear, Jack & Jones, HP, cargos, Rare Rabbit, Tokyo Talkies, geyser and 90%-off loot posts were categories.
- **RichDeals, 01:09 AM:** our own F Gear post.
- **Dealzone, 12:34 AM:** Levi's category on Myntra.
- **CoolzTricks, 12:18 AM:** F Gear backpack, already LIVE as #16722, plus a category link.
- **LATEST IPHONE RATES, 11:09 PM:** OPPO coupon, not a product.
- **Rogerkart, 10:22 PM:** Anjeer, grocery.
- **ONLINE SHOPPING DEALS, 9:30 PM:** Vega scalp brush, already rejected.
- **Dealdost, 9:14 PM:** coupon loot.
- **Hidden Loot and IndiaFreeStuff Tips (Wed):** Swiggy Dineout, not a product.
- **INDIAN CHEAP DEALS (Oct 29):** LG washer, already seen; LIVE #5035.
- **NonStopDeals (Oct 5):** Caprese category.

`data/tg-multi-seen.json` is unchanged at 5,225 entries.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.50s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.90s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

Run at 03:03 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (9 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311, #16722.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 04:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
