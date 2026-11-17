# TELEGRAM-DEAL-MONITOR tick — 2026-11-17u

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl and deduped against `data/tg-multi-seen.json` and the live DB. It then read both Amazon PDPs that resolved to a single product in the logged-in Amazon tab, using an in-tab fetch (`#corePriceDisplay` `.a-price-whole`, `#centerCol` M.R.P., `#availability` and add-to-cart). Run at about 20:03–20:06 IST.

**Result: 0 new deals. Both single-product posts were dups of LIVE pages. One of them, the EUCOS tripod #16044, was stale: its DB price was ₹1,958 and the PDP now shows ₹2,199, so it was repriced. The other, the Parachute hair cream #16639, matched its PDP exactly. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B0dQ08Ouw` → Parachute Advansed men's hair cream, 100g pack of 3 (B077HRJF54), "₹163" | Dup of LIVE #16639. See the dup re-check below. |
| Dealdost | `amzn.to/4aA0XJF` → EUCOS 62" phone tripod with selfie stick and remote (B0FM8C47F6), "at 2002" | Dup of LIVE #16044. See the dup re-check below. The second link was cut off in the sidebar preview. |
| CoolzTricks | SPARX footwear "starts @242", two `amzn.to` links | Rejected: both resolve to Amazon `/s?` search pages |
| SB Loots | `myntr.it/Wpp6v2A`, formal shoes up to 75% off | Rejected: category post |
| Dealzone | Spin & Win cashback | Rejected: not a product deal |
| INDIAN CHEAP DEALS | LG washing machine sale | Already seen |
| Rogerkart, NonStopDeals | — | Already seen; unchanged since tick t |
| Hidden Loot, IFS Tips | Swiggy Dineout | Rejected: not a product deal |

`data/tg-multi-seen.json` gained 6 links and now holds 5,305.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 16044 | EUCOS 62" phone tripod with selfie stick and remote (B0FM8C47F6) | ₹1,958 / M.R.P. ₹2,999 (35%) | ₹2,199 / M.R.P. ₹2,999, in stock, add-to-cart present | **Repriced** to ₹2,199 (27% off) via `prisma.update`, with a priceHistory row. The ₹ figures in the title and description were rewritten to match. The channel's "2002" looks like a post-coupon or bank-offer figure, so the PDP price was used. |
| 16639 | Parachute Advansed men's hair cream, 100g pack of 3 (B077HRJF54) | ₹163 / M.R.P. ₹300 | ₹163 / M.R.P. ₹300, in stock, add-to-cart present | No change |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the tripod slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **Pages on prod:** tripod 200 (0.30s), hair cream 200 (0.33s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.59s) |

## CEO audit

Run at 20:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,182 = 16,182 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,762 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,762 vs 16,762 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 20:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i and j, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Minor:** the Fujifilm #10710 title shows "₹45999" without a thousands comma.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 21:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
