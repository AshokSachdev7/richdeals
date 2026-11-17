# TELEGRAM-DEAL-MONITOR tick — 2026-11-17m

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and read every candidate and dup PDP in the logged-in Amazon tab (in-tab fetch). Run at about 11:45–12:08 IST.

**Result: 5 new deals pushed LIVE (#16736–#16740), and 2 dup LIVE rows price-synced to the PDP (#12714, #16729). IndexNow returned HTTP 200 for 10 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/ZzJyoNMW` → Amazon Basics digital safe, 49 L (B078K44SG4) | Pushed as #16736 |
| SB Loots | `amazn.lt/ITljPWZ6` → Casio LTP-SN8YL-2B, A2508 (B0GHGST5X7) | Pushed as #16737 |
| SB Loots | `amazn.lt/wks1RXpl` → Casio LTP-SN5YRL-2A, A2449 (B0FF4W4VTY) | Pushed as #16738 |
| SB Loots | `amazn.lt/OWflyT9P` → INALSA 1400 W stand mixer, two bowls (B0DXQ37D97) | Pushed as #16739 |
| ONLINE SHOPPING DEALS | `link.amazon/B04Je7OAo` → Casio Youth LF-30W-3ADF, D398 (B0FD3MCMTH) | Pushed as #16740 |
| SB Loots | `amazn.lt/iMixzwcK` → HP 410 Slim Bluetooth mouse (B0B2PGJHMT) | Dup of LIVE #12714, synced |
| CoolzTricks | `amzn.to/48omGCQ` → Wipro 3-way multiplug adaptor (B08GMDSVC3) | Dup of LIVE #16729, synced |
| SB Loots | Axe EDP | Already seen |
| AJIO | USPA / M&S | Category, skipped |
| CoolzTricks | "More" links | Category, skipped |
| Dealzone | Allen Solly | Category, skipped |
| RichDeals | — | Our own channel |
| Other groups | — | Unchanged since tick 11-17l |

`data/tg-multi-seen.json` gained 7 entries and now holds 5,247.

## Fresh deals

| Id | Product | PDP | Action |
|---|---|---|---|
| 16736 | Amazon Basics digital safe with electronic keypad, 49 L gross / 43 L net, black (B078K44SG4) | ₹5,999 / M.R.P. ₹11,900, in stock, add-to-cart present | Pushed LIVE at ₹5,999 (50% off) |
| 16737 | Casio LTP-SN8YL-2B women's analog watch, blue dial, A2508 (B0GHGST5X7) | ₹1,747 / M.R.P. ₹3,495, in stock, add-to-cart present | Pushed LIVE at ₹1,747 (50% off) |
| 16738 | Casio LTP-SN5YRL-2A women's analog watch, blue dial, A2449 (B0FF4W4VTY) | ₹1,797 / M.R.P. ₹3,595, in stock, add-to-cart present | Pushed LIVE at ₹1,797 (50% off) |
| 16739 | INALSA stand mixer, 1400 W copper motor, two 5 L steel bowls, 10-speed (B0DXQ37D97) | ₹9,499 / M.R.P. ₹22,995, in stock, add-to-cart present | Pushed LIVE at ₹9,499 (59% off) |
| 16740 | Casio Youth LF-30W-3ADF unisex digital watch, green strap, D398 (B0FD3MCMTH) | ₹1,497 / M.R.P. ₹2,995, add-to-cart present | Pushed LIVE at ₹1,497 (50% off) |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:5`, all `created:true` (HTTP 201), so no slug restore was needed.
- **Rows:** all five are LIVE with the Amazon store, the `ashoksachdev-21` tag on `/dp/ASIN`, and a `m.media-amazon.com` hiRes image. The payload carried `discountPct` on every row, and the DB stored it (50, 50, 50, 59, 50).
- **B0FD3MCMTH stock:** `#availability` was empty on the fetched PDP, but add-to-cart was present, the buy box offered a warranty add-on, and the price matched the channel exactly. It was accepted; re-check it on the next tick.
- **Images:** the colour-keyed `landingAsinColor` lookup returned null, so the images come from `colorImages.initial[0].hiRes`. All five ASINs are single-variant.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 12714 | HP 410 Slim Bluetooth mouse (B0B2PGJHMT) | ₹667 / M.R.P. ₹2,697 | ₹512 / M.R.P. ₹2,697, in stock | Synced to ₹512. 81% off is ≥80%, so the M.R.P. and discountPct were nulled. |
| 16729 | Wipro 3-way multiplug adaptor, 6 A (B08GMDSVC3) | ₹323, no M.R.P. (DesiDime 11-17f) | ₹695 / M.R.P. ₹1,800, in stock | Synced to ₹695, with the M.R.P. added (61% off). The ₹323 price from this morning has ended. |

Each synced row got a new title and description with matching ₹ and %, plus a priceHistory row. Both slugs are unchanged.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 5 new slugs and the 2 synced slugs returned **HTTP 200 for 10 URLs** (7 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Pages on prod:** the safe page returned 200 (0.19s), the INALSA page 200 (0.22s) and the synced Wipro page 200 (0.18s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

Run at 12:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,160 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,740 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,735 vs 16,740 | OK. The 5-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 12:08 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, plus #16740 (empty `#availability`).
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 13:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
