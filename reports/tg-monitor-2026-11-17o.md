# TELEGRAM-DEAL-MONITOR tick — 2026-11-17o

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl, deduped against `data/tg-multi-seen.json` and the live DB, and read the one Amazon PDP that resolved to a single product in the logged-in Amazon tab (in-tab fetch). Run at about 13:55–14:05 IST.

**Result: no new deals this tick. The only single-product post (Casio LF-30W) was a dup of LIVE #16740, and its PDP still matches the DB. 5 posts were rejected as search or category links. Nothing was pushed, so no IndexNow ping was due. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B04Je7OAo` → Casio Youth LF-30W-3ADF (B0FD3MCMTH) | Dup of LIVE #16740. The PDP matches, so no change was made. |
| CoolzTricks | `amzn.to/4iXK0vU`, "Creative Kids Educational Puzzles Starts @52" | Rejected: resolves to an `/s?` search page |
| Dealzone | `fktr.in/DTFgdoG` (Engage deodorant) | Rejected: Flipkart brand listing (`/pr?sid=`), not a product |
| Dealzone | `fktr.in/ux5ffUA` (Set Wet) | Rejected: Flipkart `/search` |
| Dealzone | `fktr.in/i6xo022` (Axe) | Rejected: Flipkart `/search` |
| SB Loots | `myntr.it/4osxo8u` + 3 more Myntra footwear links | Rejected: category post |
| NonStopDeals | `fkrt.it/dyoEV7uuuN` (Caprese, "Surf All Pages") | Already in seen. Category post. |
| — | `rogerkart.com/r/gkfwpVj` (anjeer) | Rejected: not a supported store, and it is grocery |
| Hidden Loot, IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` (LG washer) | Dup of LIVE #5035, already checked at 11-17n |
| RichDeals | — | Our own channel |
| Other groups | — | Unchanged since tick 11-17n |

`data/tg-multi-seen.json` gained 7 entries (the 6 new links plus the Casio ASIN) and now holds 5,264.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 16740 | Casio Youth LF-30W-3ADF digital watch (B0FD3MCMTH) | ₹1,497 / M.R.P. ₹2,995 | ₹1,497 / M.R.P. ₹2,995, add-to-cart present | Confirmed, no change |

#16740 is on the low-stock re-check list. Add-to-cart is present and `#availability` was empty, so it stays on the list as is.

## Freshness

- **IndexNow:** not run. No deal was pushed or repriced, so no URL changed.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.91s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

Run at 14:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,166 = 16,166 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,746 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,746 vs 16,746 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 14:05 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 15:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
