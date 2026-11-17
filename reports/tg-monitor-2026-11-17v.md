# TELEGRAM-DEAL-MONITOR tick — 2026-11-17v

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl and deduped against `data/tg-multi-seen.json` and the live DB. The one new product was a Shopsy page. Shopsy serves no ld+json, so the price was read from the rendered PDP in the Playwright tab. Run at about 20:58–21:06 IST.

**Result: 1 new deal pushed LIVE (#16765, ZPELDORN SuperPods Immersio TWS earbuds on Shopsy at ₹470). Four posts were rejected. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `bittli.in/fC4wOyO1` → Shopsy ZPELDORN SuperPods Immersio, Brown (XHOHHBQ6VUJBHB8B) | **New.** Not in seen or the DB. Rendered PDP ₹470 / M.R.P. ₹2,999 (84% off), in stock (no Sold Out, buy button present). Pushed LIVE as #16765. |
| CoolzTricks | `amzn.to/4fBfcQC`, `amzn.to/4jmKvB2` → `/s/?keywords=shoe+rack+with+door` | Rejected: search pages, plus an "apply coupon at checkout" post |
| Dealzone | `link.amazon/B0dsiaeXC`, `link.amazon/B09BUky3C` → `/s?k=sparx` | Rejected: "starts at" category search |
| ONLINE SHOPPING DEALS | Parachute (`B0dQ08Ouw`) | Already seen |
| Dealdost | EUCOS tripod (`4aA0XJF`) | Already seen |
| Rogerkart | — | Already rejected (`/s?`) |
| Hidden Loot, IFS Tips, INDIAN CHEAP DEALS, NonStopDeals | — | Unchanged since tick u |

The older SB Loots history held only a Myntra category post and `amazn.lt` links already read. `data/tg-multi-seen.json` gained 6 entries (5 links plus 1 pid) and now holds 5,311.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16765 | ZPELDORN SuperPods Immersio TWS earbuds, Brown | ₹470 | ₹2,999 | 84% | Cuelinks wrapping the clean Shopsy `/p/itm65fb4d0f435fb?pid=XHOHHBQ6VUJBHB8B` URL |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms LIVE with ₹470 / ₹2,999 / 84%, store Shopsy (id 13).
- **Price read:** the fetched HTML carries several `finalPrice` values, and the first (₹438) is not the displayed price. The rendered PDP shows ₹470, and that is what was pushed.
- **Image:** `rukminim3.flixcart.com` marketplace CDN, the Brown variant.
- **Copy:** original. Every ₹ in the title and description matches the numeric price and M.R.P.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the SuperPods slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **Page on prod:** 200 (0.30s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.62s) |

## CEO audit

Run at 21:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,185 = 16,185 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,765 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,764 vs 16,765 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 21:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i, j and k, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 22:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
