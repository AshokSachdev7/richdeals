# TELEGRAM-DEAL-MONITOR tick — 2026-11-18b

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Shortlinks were resolved with curl. Each result was deduped against `data/tg-multi-seen.json` and the live DB. Every Amazon PDP that resolved to a single product was then read in the logged-in Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Run at about 00:55–01:06 IST.

**Result: 1 new deal pushed LIVE: #16773, Athom Living Ecosaviour cotton bath towels (pearl white, pack of 5) at ₹326. Four posts were rejected as Amazon search pages. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| CoolzTricks | `amzn.to/3UXi57w` → Athom Living Ecosaviour bath towels, pack of 5 (B09ZL1W7Q3; source tag `collab-amafhh-21` stripped) | **New.** Not in seen or the DB. PDP ₹326, in stock, add-to-cart present. Pushed LIVE as #16773. |
| Dealzone | `link.amazon/B014F5Z01` | Rejected: resolves to an Amazon `/s?k=gap` search page |
| SB Loots | `amazn.lt/NgTy3lDA` | Rejected: `/s?k=Reebok` search page |
| SB Loots | `amazn.lt/4hBGOkfy` | Rejected: `/s?k=Reebok` search page |
| SB Loots | `amazn.lt/1QYDurrw` | Rejected: `/s?k=SOLETHREADS` search page |
| RichDeals | — | Our own channel; skipped |

Older or already-seen posts: Rogerkart Lavie, ONLINE SHOPPING DEALS Outsup, Dealdost EUCOS, INDIAN CHEAP DEALS LG, NonStopDeals Caprese, Hidden Loot and IFS Tips (Swiggy).

`data/tg-multi-seen.json` gained 6 entries (5 links plus 1 ASIN) and now holds 5,336.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16773 | Athom Living Ecosaviour cotton bath towels, pearl white, pack of 5 | ₹326 | ₹1,495 | 78% | Amazon `/dp/B09ZL1W7Q3?tag=ashoksachdev-21` |

- **Push:** the `{deals:[…]}` POST to `/admin/deals/bulk` returned HTTP 201 with `count:1` and `created:true`, so no slug restore was needed. A Prisma read-back confirms the deal is LIVE at ₹326 / ₹1,495 / 78%.
- **M.R.P. rule:** 78.2% off is under the 80% inflated-M.R.P. threshold, so the M.R.P. was kept.
- **Price:** the Telegram post said ₹327; the PDP read ₹326, and ₹326 is what was stored. No coupon block was present on the PDP.
- **Image:** `m.media-amazon.com` 81cbt5vk+RL, the first `colorImages` hiRes for `landingAsinColor` Multi29.
- **Copy:** the only ₹ figures are ₹326 (price) and ₹1,495 (M.R.P.), both matching the numeric fields. Facts come from the PDP detail rows (100% cotton, 150 x 75 cm, 5 items, machine wash). The copy makes no seller, rating or coupon claim, and says other colours can be priced differently.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the towel slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **Page on prod:** 200 (0.34s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

Run at 01:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,772 vs 16,773 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~01:06 IST) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through m, after a 7 of 93 partial at f. If the remaining 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Telegram search-page share:** 4 of 5 new links this tick were `/s?` search pages; SB Loots posts are now mostly brand searches.
- **DesiDime yield:** Amazon cards are showing bank-offer or coupon prices.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#3542:** price moved from ₹765 to ₹1,499; re-read it on the next dup hit.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747, #16767.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 02:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
