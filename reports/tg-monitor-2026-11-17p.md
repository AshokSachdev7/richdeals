# TELEGRAM-DEAL-MONITOR tick — 2026-11-17p

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl, deduped against `data/tg-multi-seen.json` and the live DB, and read each Amazon PDP that resolved to a single product in the logged-in Amazon tab (in-tab fetch). Run at about 15:00–15:07 IST.

**Result: 1 new deal pushed LIVE (#16752, BoroPlus cream + Kesh King shampoo pack at ₹98). One dup (Philips air fryer #5084) was repriced from ₹5,000 to ₹5,599 to match the PDP. A second dup (Biotique #16741) has lost its buy box and was added to the watch list. 5 posts were rejected. IndexNow returned HTTP 200 for 5 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| CoolzTricks | `amzn.to/3WM8HUO`, "98" → BoroPlus Soft Ayurvedic Antiseptic Cream 50 g + free Kesh King shampoo 30 ml, pack of 2 (B0DX79RV1L) | **New.** PDP ₹98 / M.R.P. ₹260 (62% off), in stock, add-to-cart present. Pushed LIVE as #16752. |
| Dealzone | `link.amazon/B07WTwDJG`, "204" → Biotique Bio Morning Nectar lotion 120 ml x2 (B078LH5DWT) | Dup of LIVE #16741 (DB ₹204 / M.R.P. ₹600). The PDP has no buy box: no price, no add-to-cart, no `#outOfStock`, only "see all buying choices". Kept LIVE and added to the no-buy-box watch list. |
| ONLINE SHOPPING DEALS | `link.amazon/B0jdIoh8Y`, Philips air fryer, "Deal Price ₹3428" → B09CTWFV5W | Dup of LIVE #5084. See the dup re-check below. |
| Dealdost | `amzn.to/4C6Y7aS`, `amzn.to/4zRdQcQ` | Rejected: both resolve to `/s?` search pages |
| Rogerkart | `rogerkart.com/r/iVeMreg` (soft toys) | Rejected: does not resolve, and not a supported store |
| SB Loots | `myntr.it/q0X474X` + `myntr.it/JP9Ov93` (Myntra shirts and tees) | Rejected: category post |
| NonStopDeals | `fkrt.it/dyoEV7uuuN` (Caprese) | Already in seen. Category post. |
| INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` (LG washer) | Unchanged. Dup of LIVE #5035. |
| Hidden Loot, IFS Tips | Swiggy Dineout | Not a product |
| RichDeals | — | Our own channel |

`data/tg-multi-seen.json` gained 9 entries (8 links plus the BoroPlus ASIN) and now holds 5,273.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16752 | BoroPlus Soft Ayurvedic Antiseptic Cream 50 g + free Kesh King shampoo 30 ml (pack of 2) | ₹98 | ₹260 | 62% | Amazon `/dp/B0DX79RV1L?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. Prisma read-back confirms LIVE with ₹98 / ₹260 / 62%.
- **Image:** `m.media-amazon.com/images/I/61W0uZT1cSL._SL1500_.jpg`, the PDP's initial hiRes.
- **Copy:** every ₹ in the title and description matches the numeric price.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 5084 | Philips HD9200/90 air fryer 4.1 L (B09CTWFV5W) | ₹5,000 / M.R.P. ₹6,995 (29%) | ₹5,599 / M.R.P. ₹6,995, in stock, add-to-cart present | Repriced to ₹5,599, discountPct 20. The title's ₹ was updated and a priceHistory row was written. |
| 16741 | Biotique Bio Morning Nectar lotion 120 ml x2 (B078LH5DWT) | ₹204 / M.R.P. ₹600 | No buy box | Kept LIVE; added to the watch list |

The channel's "₹3,428" for the Philips is about 61% of the PDP price. It is most likely a bank-card offer price, so it was not used.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the BoroPlus and Philips slugs returned **HTTP 200 for 5 URLs** (2 slugs plus the 3 hub paths).
- **Pages on prod:** BoroPlus 200 (0.28s), Philips 200 (0.42s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 15:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,172 = 16,172 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,752 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,751 vs 16,752 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 15:07 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g and h, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, plus #16741 (new this tick).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 16:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
