# TELEGRAM-DEAL-MONITOR tick — 2026-11-17x

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Shortlinks were resolved with curl. Rogerkart `/r/` links do not redirect, so the ASIN was read from the HTML body. Each result was deduped against `data/tg-multi-seen.json` and the live DB. Every Amazon PDP that resolved to a single product was then read in the logged-in Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Run at about 23:03–23:09 IST.

**Result: 1 new deal pushed LIVE: #16771, an Amazon Basics 2200W induction cooktop at ₹1,661. Two dup reposts were re-checked. #2594 (Solimo tea cups) had moved from ₹561 to ₹569 and was price-synced. #16769 (Solimo beer mugs) matched the DB. Four posts were rejected. IndexNow returned HTTP 200 for 6 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/o1kLvkaL` → Amazon Basics 2200W induction cooktop (B0FC223RDQ) | **New.** Not in seen or the DB. PDP ₹1,661 / M.R.P. ₹6,499 (74% off), in stock, add-to-cart present. Pushed LIVE as #16771. |
| CoolzTricks, Rogerkart | `amzn.to/4zqOIIG`, `rogerkart.com/r/pB2rZDz` → Solimo borosilicate double-wall tea cups, set of 4 (B0BNNH9J99) | Dup of LIVE #2594. See the dup re-check below. |
| CoolzTricks, Rogerkart | `amzn.to/4khsiG9`, `rogerkart.com/r/NvYCGAu` → Solimo Troilus beer mugs, 470ml ×2 (B07J4TTFZP) | Dup of LIVE #16769 (pushed by DESIDIME 11-17l). See the dup re-check below. |
| Rogerkart | `rogerkart.com/r/pQWRKEJ` → flywheel exercise bike (B0CY57T48R), posted at Rs.3,702 | Rejected: no buy box. The PDP shows no price and no add-to-cart. |
| Dealzone | Lavie handbags, `link.amazon/B0ak1ZqNP` | Rejected: category post. It resolves to an Amazon `/s?k=` search page. |
| CoolzTricks, Rogerkart | "Upto 86% off on Solimo kitchenware" | Rejected: category post |
| ONLINE SHOPPING DEALS | Outsup juice | Rejected: FMCG, no product link |
| RichDeals | — | Our own channel; skipped |

Older or already-seen posts: Dealdost EUCOS, INDIAN CHEAP DEALS LG, NonStopDeals Caprese, Hidden Loot and IFS Tips (Swiggy).

`data/tg-multi-seen.json` gained 9 entries (7 links plus 2 ASINs) and now holds 5,325.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16771 | Amazon Basics 2200W induction cooktop | ₹1,661 | ₹6,499 | 74% | Amazon `/dp/B0FC223RDQ?tag=ashoksachdev-21` |

- **Push:** the `{deals:[…]}` POST to `/admin/deals/bulk` returned HTTP 201 with `count:1` and `created:true`, so no slug restore was needed. A Prisma read-back confirms the deal is LIVE at ₹1,661 / ₹6,499 / 74%.
- **Image:** `m.media-amazon.com` 61yk4qA1VKL.
- **Copy:** every ₹ figure in the title and description matches the numeric price and M.R.P. (4,838 / 6,499 = 74.4%). The features named (8 preset menus, LED display, touch panel, auto cut-off) come from the PDP. The copy makes no seller, rating or coupon claim.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 2594 | Solimo double-wall glass tea cups, set of 4, 350ml (B0BNNH9J99) | ₹561 / M.R.P. ₹2,499 / 78% | ₹569 / M.R.P. ₹2,499. In stock, with add-to-cart present. | **Synced** to ₹569 / ₹2,499 / 77%, and a priceHistory row was written. The title and description were rewritten to the new price. The old copy carried an unverified "Apply 2% Coupon" note, which was removed. |
| 16769 | Solimo Troilus glass beer mugs, 470ml ×2 (B07J4TTFZP) | ₹327 / M.R.P. ₹1,300 | ₹327 / M.R.P. ₹1,300 | None. The price matches, so the slug was only re-pinged. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the cooktop, tea-cup and beer-mug slugs returned **HTTP 200 for 6 URLs** (3 slugs plus the 3 hub paths).
- **Pages on prod:** cooktop 200 (0.35s), tea cups 200 (0.26s), beer mugs 200 (0.18s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.26s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.67s) |

## CEO audit

Run at 23:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,191 = 16,191 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,771 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,770 vs 16,771 (cursor written 22:54 IST) | OK. The DESIDIME 11-17l batch (#16767–#16770) has gone out. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 23:09 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i, j, k and l, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747, #16767.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 00:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
