# TELEGRAM-DEAL-MONITOR tick — 2026-11-17q

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl, deduped against `data/tg-multi-seen.json` and the live DB, and read each Amazon PDP that resolved to a single product in the logged-in Amazon tab (in-tab fetch). Run at about 16:00–16:07 IST.

**Result: 3 new deals pushed LIVE (#16753 Nova hair dryer at ₹499, #16754 Crompton LED batten 2-pack at ₹254, #16755 Zebronics Cube cabinet at ₹3,699). One dup (Zebronics Jumbo LITE neckband #14393) was repriced from ₹498 to ₹490 and gained its missing M.R.P. Another dup (atomberg Renesa #9063) matched the PDP and was left as is. 2 posts were rejected. IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/T7p6pEwF` → Nova NHP 8100 Silky Shine 1200 W foldable hair dryer (B0123G8CZ8) | **New.** PDP ₹499 / M.R.P. ₹845 (41% off), in stock, add-to-cart present. Pushed LIVE as #16753. |
| SB Loots | `amazn.lt/fpCJNpqh` → Crompton Laser Ray Smile 20 W LED batten, pack of 2 (B0D2R4L7VF) | **New.** PDP ₹254 / M.R.P. ₹1,150 (78% off), in stock, add-to-cart present. Pushed LIVE as #16754. |
| SB Loots | `amazn.lt/sUiLat9O` → Zebronics Cube mATX/ITX gaming cabinet (B0GHX5KSFS) | **New.** PDP ₹3,699 / M.R.P. ₹10,999 (66% off), in stock, add-to-cart present. Pushed LIVE as #16755. |
| CoolzTricks + SB Loots | `amzn.to/4iW2gpn` + `amazn.lt/NdEagz94` → atomberg Renesa Smart Elite 600 mm fan (B0F7XZH9P4) | Dup of LIVE #9063. PDP ₹2,999 / M.R.P. ₹7,200 matches the DB, so no change. |
| SB Loots | `amazn.lt/8usAGobo` → Zebronics Jumbo LITE neckband (B0BGS28H74) | Dup of LIVE #14393. See the dup re-check below. |
| Dealzone | `myntr.it/NTawP1x` (Levi's) | Rejected: category post |
| Rogerkart | `rogerkart.com/r/KkfRkmf` (ghee) | Rejected: does not resolve, and not a supported store |

`data/tg-multi-seen.json` gained 11 entries (8 links plus the 3 new ASINs) and now holds 5,284.

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16753 | Nova NHP 8100 Silky Shine 1200 W hot & cold foldable hair dryer (Black) | ₹499 | ₹845 | 41% | Amazon `/dp/B0123G8CZ8?tag=ashoksachdev-21` |
| 16754 | Crompton Laser Ray Smile 20 W LED batten (pack of 2) | ₹254 | ₹1,150 | 78% | Amazon `/dp/B0D2R4L7VF?tag=ashoksachdev-21` |
| 16755 | Zebronics Cube mATX/ITX gaming cabinet, 3 ARGB fans, tempered glass | ₹3,699 | ₹10,999 | 66% | Amazon `/dp/B0GHX5KSFS?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:3`, all `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms all three LIVE with the prices above.
- **Images:** the `colorImages` regex returned null this tick, so images came from the `#landingImage` `data-old-hires` attribute, which matched the first hiRes. All are `m.media-amazon.com`.
- **Copy:** every ₹ in each title and description matches the numeric price. The Crompton description's ₹127 is the per-batten figure (₹254 ÷ 2).

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 14393 | Zebronics Jumbo LITE Bluetooth neckband (B0BGS28H74) | ₹498 / M.R.P. null | ₹490 / M.R.P. ₹2,999, in stock, add-to-cart present | Repriced to ₹490 with M.R.P. ₹2,999 and discountPct 84. The title and description ₹ were updated and a priceHistory row was written. |
| 9063 | atomberg Renesa Smart Elite 600 mm (B0F7XZH9P4) | ₹2,999 / M.R.P. ₹7,200 | ₹2,999 / M.R.P. ₹7,200 | No change |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs plus #14393 returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 hub paths).
- **Pages on prod:** Nova 200 (0.29s), Crompton 200 (0.32s), Zebronics Cube 200 (0.25s), Zebronics neckband 200 (0.22s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.84s) |
| /sitemap.xml | 200 (0.27s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.70s) |

## CEO audit

Run at 16:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,175 = 16,175 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,755 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,752 vs 16,755 | OK. The 3-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 16:07 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g and h, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 17:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
