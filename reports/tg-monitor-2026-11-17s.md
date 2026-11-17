# TELEGRAM-DEAL-MONITOR tick — 2026-11-17s

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl and deduped against `data/tg-multi-seen.json` and the live DB. It then read every Amazon PDP that resolved to a single product in the logged-in Amazon tab, using an in-tab fetch. The M.R.P. was taken from the `#centerCol` text (`M.R.P.: ₹`), because `.a-text-price` returned per-unit rates on two of these PDPs (₹33.20 and ₹2.00). Run at about 17:55–18:06 IST.

**Result: 1 new deal pushed LIVE (#16758, Celest Spearmint Herbal Tea, 50 pyramid bags, at ₹100). Two dups (Go Desi chikki #921 and LG 8 kg washer #5035) were checked against their PDPs and both matched. Four posts were rejected. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B01rCFtWO` → Celest Spearmint Herbal Tea, 50 pyramid tea bags (B0F7R75BSM) | **New.** Not in seen or the DB. PDP ₹100 / M.R.P. ₹200 (50% off), in stock, add-to-cart present, no coupon. Pushed LIVE as #16758. |
| SB Loots + CoolzTricks | `amazn.lt/YyNFzmL6` + `amzn.to/4iZwWX5` → Go Desi peanut chikki, 50 pcs, 750 g (B0C627BWQC) | Dup of LIVE #921. See the dup re-check below. |
| INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` → LG 8 kg top-load washer T80VBMB4Z (B0DPHTSTYJ) | Dup of LIVE #5035. See the dup re-check below. |
| Dealdost | `amzn.to/4C6Y7aS` + `amzn.to/4zRdQcQ` | Rejected: already seen, and both are `/s?` search pages |
| Dealzone | Casio "up to 50% off" | Rejected: category post |
| NonStopDeals | Caprese via `fkrt.it` | Rejected: category post |
| Hidden Loot, IFS Tips | Swiggy Dineout | Rejected: not a product deal |
| Rogerkart | — | Unchanged since tick r |
| RichDeals | — | Our own channel |

`data/tg-multi-seen.json` gained 6 entries (4 links plus 2 ASINs; the third ASIN was already present) and now holds 5,294.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16758 | Celest Spearmint Herbal Tea, 50 pyramid tea bags | ₹100 | ₹200 | 50% | Amazon `/dp/B0F7R75BSM?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms LIVE with ₹100 / ₹200 / 50%.
- **Image:** `m.media-amazon.com/images/I/61FGFkvXxML._SL1500_.jpg`, from `#landingImage` `data-old-hires`. Its `landingAsinColor` is "Spearmint 50 Count (Pack of 1)", so the image shows the right variant.
- **Copy:** every ₹ in the title and description matches the numeric price and M.R.P. The ₹2 per-bag figure is ₹100 ÷ 50.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 921 | Go Desi peanut chikki, 50 pcs, 750 g (B0C627BWQC) | ₹249 / M.R.P. ₹350 | ₹249 / M.R.P. ₹350, in stock, add-to-cart present | No change |
| 5035 | LG 8 kg 5-star top-load washer T80VBMB4Z (B0DPHTSTYJ) | ₹20,990 / M.R.P. ₹28,990 | ₹20,990 / M.R.P. ₹28,990, in stock, add-to-cart present. The PDP also offers an optional ₹750 coupon. | No change. The listed price is the pre-coupon price, which matches the DB. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the tea slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **Page on prod:** tea 200 (0.32s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 18:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,178 = 16,178 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,758 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,757 vs 16,758 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 18:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g, h and i, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil. Today's #921 and #5035 confirms are more of the same.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 19:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
