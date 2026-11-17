# TELEGRAM-DEAL-MONITOR tick — 2026-11-17r

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl and deduped against `data/tg-multi-seen.json` and the live DB. The one single-product candidate was on Shopsy, which has no ld+json, so its price was read with an in-tab fetch of the Shopsy PDP (finalPrice/M.R.P., availability flags, and no Sold Out widget). Run at about 16:57–17:08 IST.

**Result: 1 new deal pushed LIVE (#16757, Harrison 50 mm 6-lever padlock at ₹110 on Shopsy). 2 posts were rejected. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `bittli.in/qZ9GPgUS` → Shopsy Harrison padlock, 50 mm, 6-lever, 3 keys, J-Supreme 0656 (pid LQZGZFZSG6CZHCCX) | **New.** Not in seen or the DB. PDP ₹110 / M.R.P. ₹124 (11% off). `isAvailable` true, `isNonBuyable` false, no Sold Out widget; rated 3.9 by 826 buyers. Pushed LIVE as #16757. |
| CoolzTricks | `amzn.to/4t10A2w` + `amzn.to/4kXdHjj` (Jack & Jones) | Rejected: both resolve to `/s?` search pages |
| Dealzone, Rogerkart, ONLINE SHOPPING DEALS, Dealdost, Hidden Loot, IFS Tips, INDIAN CHEAP DEALS, NonStopDeals | — | Unchanged since tick q |
| RichDeals | — | Our own channel |

`data/tg-multi-seen.json` gained 4 entries (3 links plus the Shopsy pid) and now holds 5,288.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16757 | Harrison J-Supreme 0656 50 mm 6-lever steel padlock with 3 keys | ₹110 | ₹124 | 11% | Cuelinks → Shopsy `/p/itm07b8e6182cf78?pid=LQZGZFZSG6CZHCCX` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms LIVE with ₹110 / ₹124 / 11%.
- **Image:** `rukminim3.flixcart.com` at 832×832 (`?q=70`), HTTP 200 `image/jpeg`.
- **Copy:** every ₹ in the title and description matches the numeric price and M.R.P.
- **Store:** Shopsy is not Flipkart, so the affiliate link goes through Cuelinks, the same as earlier Shopsy rows such as #16698.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the padlock slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **Page on prod:** padlock 200 (0.30s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.15s) |
| /blog | 200 (1.00s) |
| /sitemap.xml | 200 (0.25s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 17:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,177 = 16,177 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,757 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,756 vs 16,757 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 17:08 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g, h and i, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
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

The next TELEGRAM-DEAL-MONITOR run is at about 18:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
