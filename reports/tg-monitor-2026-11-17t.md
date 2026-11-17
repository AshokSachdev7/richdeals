# TELEGRAM-DEAL-MONITOR tick — 2026-11-17t

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks with curl and deduped against `data/tg-multi-seen.json` and the live DB. It then read every Amazon PDP that resolved to a single product in the logged-in Amazon tab, using an in-tab fetch (`#corePriceDisplay` `.a-price-whole`, `#centerCol` M.R.P., `#availability` and add-to-cart). Run at about 19:00–19:07 IST.

**Result: 1 new deal pushed LIVE (#16762, SPARX men's sandal in Olive Camel at ₹453). One dup (STRIFF mouse pad 2-pack, #16744) matched its PDP price; its missing M.R.P. was backfilled. Five posts were rejected. IndexNow returned HTTP 200 for 5 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B0dGWZUyx` → SPARX men's sandal, Olive Camel (B07V572MTR) | **New.** Not in seen or the DB. PDP ₹453 / M.R.P. ₹749 (40% off), in stock, add-to-cart present. Pushed LIVE as #16762. |
| Dealzone | `link.amazon/B07BEsuep` → STRIFF mouse pad, pack of 2 (B0CV7XMKDJ) | Dup of LIVE #16744. See the dup re-check below. |
| Rogerkart | `rogerkart.com/r/CZ3AYN6` | Rejected: resolves to an Amazon `/s?` search page (boldfit sliders), not a product |
| SB Loots + CoolzTricks | Myntra HERE&NOW | Rejected: category post. The older SB Loots history held only category posts and `amazn.lt` links already read. |
| Dealdost | `/s?` links | Rejected: already seen, and search pages |
| Hidden Loot, IFS Tips | Swiggy Dineout | Rejected: not a product deal |
| INDIAN CHEAP DEALS, NonStopDeals | — | Unchanged since tick s |

`data/tg-multi-seen.json` gained 5 entries (3 links plus 2 ASINs) and now holds 5,299.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16762 | SPARX men's sandal, Olive Camel | ₹453 | ₹749 | 40% | Amazon `/dp/B07V572MTR?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms LIVE with ₹453 / ₹749 / 40%.
- **Image:** `m.media-amazon.com` 613YsqtSLnL, from `#landingImage` `data-old-hires`. Its `landingAsinColor` is the Olive Camel variant, so the image shows the right colour.
- **Copy:** every ₹ in the title and description matches the numeric price and M.R.P.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 16744 | STRIFF mouse pad, pack of 2 (B0CV7XMKDJ) | ₹129 / M.R.P. null | ₹129 / M.R.P. ₹999, in stock, add-to-cart present | **Backfilled** M.R.P. ₹999 and discount 87% via `prisma.update`. The price was unchanged, and the description makes no M.R.P. claim, so no copy change was needed. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the sandal and mouse-pad slugs returned **HTTP 200 for 5 URLs** (2 slugs plus the 3 hub paths).
- **Pages on prod:** sandal 200 (0.27s), mouse pad 200 (0.30s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.15s) |
| /blog | 200 (1.01s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 19:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,182 = 16,182 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,762 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,761 vs 16,762 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 19:07 IST) | OK |

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

The next TELEGRAM-DEAL-MONITOR run is at about 20:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
