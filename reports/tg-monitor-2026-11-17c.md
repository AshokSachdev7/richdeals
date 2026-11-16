# TELEGRAM-DEAL-MONITOR tick — 2026-11-17c

The tick read the Telegram Web sidebar with one `browser_evaluate` (Playwright, richDeals profile). Run at about 02:03 IST.

**Result: 0 pushed. No source group has posted since tick 11-17b, so there was nothing new to dedup or verify. Every CEO-audit check is green, and all 9 session crons are armed.**

## Sidebar

| Group | Newest post | Status |
|---|---|---|
| SB Loots And Deals | 12:35 AM, "Upto 90% Off" loot list (kitchenware, cookware, kurtas, lamps) | Already seen in 11-17b; category loot |
| Dealzone | 12:34 AM, Levi's on Myntra | Already seen; category |
| CoolzTricks | 12:18 AM, F Gear backpack + backpack category | Already pushed (#16722) |
| LATEST IPHONE RATES | 11:09 PM, OPPO coupons | Already seen; not a product |
| Rogerkart Deals | 10:22 PM, Anjeer 1 kg | Already seen; grocery |
| ONLINE SHOPPING DEALS | 09:30 PM, Vega scalp brush | Already rejected (11-16m); low-ticket |
| Dealdost | 09:14 PM, ₹500-off coupon loot | Already seen; coupon |
| Hidden Loot / IndiaFreeStuff Tips | Wed, Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | Oct 29, LG washer | Already seen; LIVE #5035 |
| NonStopDeals | Oct 5, Caprese category | Category |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | Not rendered in the virtualised list (older than Sep) | Inactive |

The newest message overall is our own RichDeals broadcast of #16722 at 01:09 AM. `data/tg-multi-seen.json` is unchanged at 5,225 entries.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.27s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

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

- **IFS source blocked:** every `?rto=` redirects home (8 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311, #16722.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at 03:07 IST (11-17). Overnight yield is low; the daytime ticks carry most of the volume.
