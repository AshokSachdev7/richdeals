# TELEGRAM-DEAL-MONITOR tick — 2026-11-17j

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and read every candidate and dup PDP in the logged-in Amazon tab. Run at about 09:00–09:12 IST.

**Result: 3 new deals pushed LIVE (#16724–#16726), 2 dup LIVE rows price-synced to the PDP, and one stale row found by the audit (#5355) fixed. IndexNow returned HTTP 200 for both pings. Every CEO-audit check is green, and all 9 session crons are armed.**

## Live-sidebar check

Daytime posting has started. SB Loots posted 5 `amazn.lt` deals between 08:38 and 08:54 IST, and Dealzone posted at 08:06 IST. The other groups are unchanged since tick 11-17i.

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 08:38 IST, Biotique body lotion (B0C3ZYR6HH) | Pushed as #16724 |
| SB Loots | 08:49 IST, animal matching puzzle cards (B0H6ZW2V1R) | Pushed as #16725 |
| SB Loots | 08:51 IST, Milton smart lunch box (B0DPMYL6M5) | Pushed as #16726 |
| SB Loots | Ecolink batten 4-pack (B09GPKP1LY) | Dup of LIVE #12939, synced |
| SB Loots | Bajaj Classico Sleek 5S fan (B0G48YNZP6) | Dup of LIVE #327, synced |
| Dealzone | 08:06 IST, `link.amazon` → Dot & Key Cica combo (B0HDNWB3QK) | Dup of LIVE #16723 at ₹597, which matches the PDP. Skipped. |
| RichDeals | — | Our own channel |
| CoolzTricks | 00:18 IST, F Gear backpack | Already LIVE as #16722 |
| LATEST IPHONE RATES | 11-16 23:09 IST, OPPO coupons | Coupon, not a product |
| Rogerkart | 11-16 22:22 IST, Anjeer 1 kg | Grocery |
| ONLINE SHOPPING DEALS | 11-16 21:30 IST, Vega scalp brush | Already rejected |
| Dealdost | 11-16 21:14 IST, coupons | Coupon loot |
| Hidden Loot / IndiaFreeStuff Tips | Wed, Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | Oct 29, LG washer | Already LIVE as #5035 |
| NonStopDeals | Oct 5, Caprese | Category |

`data/tg-multi-seen.json` gained 6 ASINs and now holds 5,231 entries.

## Fresh deals

| Id | Product | PDP | Action |
|---|---|---|---|
| 16724 | Biotique Ubtan & Collagen light gel body lotion, 300 ml (B0C3ZYR6HH) | ₹129 / M.R.P. ₹340, in stock, add-to-cart present | Pushed LIVE at ₹129 (62% off) |
| 16725 | Animal matching puzzle cards, 16 animals, 48 pieces (B0H6ZW2V1R) | ₹113.37 / M.R.P. ₹399, in stock | Pushed LIVE at ₹113 (72% off) |
| 16726 | MILTON Steel Smart Lunch Box, 3 containers with insulated bag (B0DPMYL6M5) | ₹928 / M.R.P. ₹1,120, in stock | Pushed LIVE at ₹928 (17% off) |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:3`, all `created:true`, so no slug restore was needed.
- **Rows:** all three are LIVE with the Amazon store, the `ashoksachdev-21` tag on `/dp/ASIN`, a `m.media-amazon.com` image and one priceHistory row each.
- **discountPct:** the bulk endpoint leaves it null, so it was set by hand afterwards (62, 72, 17). #16723 from the DesiDime 11-17e push had the same gap and was set to 67.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 12939 | EcoLink Champion 20W 4-ft LED batten, pack of 4 (B09GPKP1LY) | ₹509 | ₹469.66, in stock | Synced to ₹470 / M.R.P. ₹1,800 (74% off). Title updated. |
| 327 | Bajaj Classico Sleek 5S 1200 mm BLDC fan with remote (B0G48YNZP6) | ₹2,599 (51% off) | ₹2,288.99, in stock | Synced to ₹2,289 / M.R.P. ₹5,300 (57% off). The raw copied title and description were rewritten. |
| 16723 | Dot & Key Cica combo (B0HDNWB3QK) | ₹597 | ₹597 | None |

## Audit fix: #5355

The audit flagged #5355 (Orient Electric Joylite LED rope light, B09ZBH6D86) as the only LIVE row with an M.R.P. but a null discountPct. The row was also inconsistent: the DB price was ₹2,999, while the title and description said ₹3,299. The PDP read ₹3,498 / M.R.P. ₹15,000, in stock with add-to-cart and no captcha. The row was synced to ₹3,498, 77% off (under 80%, so the M.R.P. stays), with a new title and description carrying the same ₹ and %, plus a priceHistory row.

## Freshness

- **IndexNow (batch):** `indexnow-ping.mjs` for the 3 new slugs and the 2 synced slugs returned **HTTP 200 for 8 URLs** (5 slugs plus the 3 hub paths).
- **IndexNow (#5355):** a second ping returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **New pages on prod:** the Biotique page returned 200 (0.28s) and the Milton page 200 (0.23s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.25s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.65s) |

## CEO audit

Run at 09:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,146 = 16,146 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,726 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,723 vs 16,726 | OK. The 3-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 09:08 IST) | OK |
| LIVE rows with M.R.P. but null discountPct | 1 (#5355) | Fixed this tick |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **Bulk push leaves discountPct null:** the `/admin/deals/bulk` endpoint does not compute it from price and M.R.P. Until the endpoint is fixed, every push needs a manual follow-up.
- **IFS source dead:** twelve dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. If it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 10:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
