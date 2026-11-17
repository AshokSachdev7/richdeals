# TELEGRAM-DEAL-MONITOR tick — 2026-11-17k

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and read every candidate and dup PDP in the logged-in Amazon tab. Run at about 10:03–10:08 IST.

**Result: 2 new deals pushed LIVE (#16727, #16728), and 3 dup LIVE rows price-synced to the PDP (#1012, #15041, #3172). IndexNow returned HTTP 200 for 8 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Live-sidebar check

SB Loots posted steadily from 09:16 to 09:57 IST, CoolzTricks posted at 09:26 IST and Dealzone at 09:54 IST. The other groups are unchanged since tick 11-17j.

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 09:57 IST, Prestige Castlite cast iron kadai (B0G5Y68CDF) | Pushed as #16727 |
| SB Loots | 09:57 IST, Pigeon cast iron frying pan (B0CZTL52NF) | Pushed as #16728 |
| SB Loots | 09:57 IST, "more" links | Category, skipped |
| SB Loots | 09:35 IST, Oral-B Criss Cross 4-pack (B0B594571T) | Dup of LIVE #3172, synced |
| SB Loots | 09:28 IST, jeans links | Category, skipped |
| SB Loots | 09:28 IST, `bittli.in` → Shopsy khajoor dates | Grocery, skipped |
| SB Loots | 09:22 IST, Del Monte chocolate syrup 1.2 kg (B0D5HRSWF4) | Dup of LIVE #15041, synced |
| SB Loots | 09:16 IST, Havells REO BLDC fan (B0GGXZ357B) | Dup of LIVE #1012, synced |
| CoolzTricks | 09:26 IST, same Havells REO fan at ₹1,999 with a 25% coupon | Same ASIN as #1012 |
| Dealzone | 09:54 IST, Roadster jeans (`myntr.it`) | Category, skipped |
| RichDeals | — | Our own channel |
| LATEST IPHONE RATES | OPPO coupons | Coupon, not a product |
| Rogerkart | Anjeer 1 kg | Grocery |
| ONLINE SHOPPING DEALS | Vega scalp brush | Already rejected |
| Dealdost | coupons | Coupon loot |
| Hidden Loot / IndiaFreeStuff Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG washer | Already LIVE as #5035 |
| NonStopDeals | Caprese | Category |

`data/tg-multi-seen.json` gained 6 entries and now holds 5,236.

## Fresh deals

| Id | Product | PDP | Action |
|---|---|---|---|
| 16727 | Prestige Castlite enamel cast iron kadai, 20 cm / 1.4 L (B0G5Y68CDF) | ₹1,138.34 / M.R.P. ₹3,935, in stock, add-to-cart present | Pushed LIVE at ₹1,138 (71% off) |
| 16728 | Pigeon by Stovekraft enamel cast iron frying pan, 20 cm (B0CZTL52NF) | ₹1,221.98 / M.R.P. ₹4,195, in stock, add-to-cart present | Pushed LIVE at ₹1,222 (71% off) |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:2`, both `created:true`, so no slug restore was needed.
- **Rows:** both are LIVE with the Amazon store, the `ashoksachdev-21` tag on `/dp/ASIN`, and a `m.media-amazon.com` hiRes image.
- **discountPct:** this time the payload carried it, and both rows stored 71. No hand backfill was needed.
- **M.R.P. read:** the core price block had no M.R.P. for these two, so it was read from the `#centerCol` text.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 1012 | Havells REO BLDC 1200 mm fan (B0GGXZ357B) | ₹2,449 / M.R.P. ₹4,300 | ₹2,665 / M.R.P. ₹4,920, in stock | Synced to ₹2,665 (46% off). The channel's ₹1,999 is exactly 75% of ₹2,665, so it is the post-coupon price. The description now names the clip coupon as conditional. |
| 15041 | Del Monte chocolate syrup 1.2 kg (B0D5HRSWF4) | ₹225 / M.R.P. ₹277 | ₹229 / M.R.P. ₹277, in stock | Synced to ₹229 (17% off) |
| 3172 | Oral-B Criss Cross toothbrush, pack of 4 (B0B594571T) | ₹137, no M.R.P. | ₹135 / M.R.P. ₹300, in stock | Synced to ₹135, with M.R.P. ₹300 added (55% off) |

The core-block `.a-text-price` read per-unit rates for #15041 (₹19.08 per 100 g) and #3172 (₹33.75 per brush). The real M.R.P. came from `#centerCol`, as in earlier ticks. Each synced row got a new title and description with matching ₹ and %, plus a priceHistory row.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs and the 3 synced slugs returned **HTTP 200 for 8 URLs** (5 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **New pages on prod:** the Prestige page returned 200 (0.23s) and the Pigeon page 200 (0.31s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.35s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.22s) |
| /feed.xml | 200 (0.24s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.73s) |

## CEO audit

Run at 10:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,148 = 16,148 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,728 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,726 vs 16,728 | OK. The 2-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 10:07 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** twelve dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. The 10:53 IST DEAL-INGEST run probes one id; if it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 11:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
