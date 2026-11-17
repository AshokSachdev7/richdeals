# TELEGRAM-DEAL-MONITOR tick — 2026-11-17h

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Run at about 06:55–07:04 IST.

**Result: 0 pushed. The sidebar is unchanged since tick 11-17g; the newest source post is still SB Loots at 02:31 IST, and every newest post is either not a product, a category or coupon post, grocery, or already LIVE. IndexNow was not run. Every CEO-audit check is green.**

## Stale-sidebar cross-check

The public preview pages agree that the groups are quiet overnight:
- `t.me/s/coolztricks`: newest post 11-17 00:18 IST.
- `t.me/s/dealdibba`: newest post 11-15 19:38 IST.

## Candidates

| Group | Newest post | Why skipped |
|---|---|---|
| SB Loots | 02:31 IST, notification-settings promo | Not a product |
| RichDeals | 01:09 IST, F Gear backpack | Our own post |
| Dealzone | 00:34 IST, Levi's on Myntra, flat 70% | Category |
| CoolzTricks | 00:18 IST, F Gear backpack @385 | Already LIVE as #16722 at the PDP price of ₹780; the post also carries a category link |
| LATEST IPHONE RATES | 11-16 23:09 IST, OPPO coupons | Coupon, not a product |
| Rogerkart | 11-16 22:22 IST, Anjeer 1 kg | Grocery |
| ONLINE SHOPPING DEALS | 11-16 21:30 IST, Vega scalp brush | Already rejected |
| Dealdost | 11-16 21:14 IST, ₹500-off coupons | Coupon loot |
| Hidden Loot | Wed, Swiggy Dineout | Not a product |
| IndiaFreeStuff Tips | Wed, Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | Oct 29, LG washer | Already LIVE as #5035 |
| NonStopDeals | Oct 5, Caprese | Category |

Non-source chats (Ricautomate_bot, RichCEO, BotFather and personal chats) were ignored. `data/tg-multi-seen.json` is unchanged at 5,225 entries.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.43s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.26s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

Run at 07:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 06:50 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** eleven dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. If it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 08:03 IST (11-17), per CronList. Daytime yield should pick up from around 09:00 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
