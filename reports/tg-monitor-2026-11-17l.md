# TELEGRAM-DEAL-MONITOR tick — 2026-11-17l

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and read every candidate and dup PDP in the logged-in Amazon tab. Run at about 11:03–11:11 IST.

**Result: 1 new deal pushed LIVE (#16735), and 3 dup LIVE rows price-synced to the PDP (#10755, #1443, #4912). IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Link | Resolves to | Outcome |
|---|---|---|---|
| SB Loots | `amazn.lt/SZOGWlqy` | B0DP56Z5MY, French Connection women's watch | Fresh, pushed as #16735 |
| SB Loots | `amazn.lt/oIQzfdu0` | B0H6QNLB28, Cello Wild Poppy 40-pc dinner set | Dup of LIVE #10755, synced |
| SB Loots | `amazn.lt/6qJPVnnY` | B0GQBX1NZB, Onida 43" 4K Fire TV | Dup of LIVE #1443, synced |
| SB Loots | `amazn.lt/BFICyMrq` | B07BJ41DZF, Cello H2O bottle set of 3 | Already seen; dup of LIVE #4912, synced |
| SB Loots | `amazn.lt/TFYIjVbp` | B0FQP1N4TL, Axe Midnight Oak EDP | Already seen; dup of LIVE #16134, same price |
| SB Loots | `bittli.in/n57iO5jJ` | Shopsy MDMGYRFABEAGNTA3, Boost 1.6 kg | FMCG/grocery, and the price was ambiguous (₹648 / ₹680 / ₹378). Skipped. |
| SB Loots | `amazn.lt/SAWB3FGS` | `/s?` search | Skipped |
| Dealzone | `link.amazon/B0fBvujMx` | `/s?` search | Skipped |
| CoolzTricks | geyser link | Category | Skipped |

`data/tg-multi-seen.json` gained 4 entries and now holds 5,240.

## Fresh deal

| Id | Product | PDP | Action |
|---|---|---|---|
| 16735 | French Connection FCN055A women's analog watch (B0DP56Z5MY) | ₹1,106 / M.R.P. ₹6,950, only 3 left, add-to-cart present | Pushed LIVE at ₹1,106. 84% off is ≥80%, so the M.R.P. and discountPct were nulled. Added to the low-stock list. |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. Slug: `french-connection-fcn055a-analog-watch-women-b0dp56z5my`.
- **Row:** LIVE, Amazon store, the `ashoksachdev-21` tag on `/dp/B0DP56Z5MY`, image `m.media-amazon.com/images/I/61FbNGaL2bL._SL1440_.jpg`.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 10755 | Cello Wild Poppy dinner set, 40 pcs (B0H6QNLB28) | ₹1,811 / ₹3,379 | ₹2,399 / M.R.P. ₹3,729, in stock | Synced to ₹2,399 (36% off) |
| 1443 | Onida 43" 4K Fire TV 43UFD (B0GQBX1NZB) | ₹22,999 / ₹33,190 | ₹27,499 / M.R.P. ₹33,190, in stock | Synced to ₹27,499 (17% off) |
| 4912 | Cello H2O 1 L bottle, set of 3 (B07BJ41DZF) | ₹300 / ₹618 | ₹577 / M.R.P. ₹618, in stock | Synced to ₹577 (7% off) |
| 16134 | Axe Midnight Oak EDP (B0FQP1N4TL) | ₹374 / ₹1,499 | ₹374 / M.R.P. ₹1,499, in stock | None |

All three synced rows had moved up in price since they were last read. Each got a new title and description with matching ₹ and %, plus a priceHistory row.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the new slug and the 3 synced slugs returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **New page on prod:** the watch page returned 200 (0.20s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.15s) |
| /blog | 200 (1.09s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.69s) |

## CEO audit

Run at 11:11 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,155 = 16,155 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,735 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,734 vs 16,735 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 11:11 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 12:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
