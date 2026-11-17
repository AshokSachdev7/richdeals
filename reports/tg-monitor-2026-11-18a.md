# TELEGRAM-DEAL-MONITOR tick — 2026-11-18a

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Shortlinks were resolved with curl. Each result was deduped against `data/tg-multi-seen.json` and the live DB. Every Amazon PDP that resolved to a single product was then read in the logged-in Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Run at about 00:04–00:08 IST.

**Result: 1 new deal pushed LIVE: #16772, a MANQ slim-fit casual blazer (grey, size 38) at ₹999. One dup repost was re-checked: #16666 (GM Balin 15L geyser) matched the DB. Two posts were rejected. IndexNow returned HTTP 200 for 5 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/kGWgSW5J` → MANQ men's slim-fit casual blazer (B08RZ7K77S) | **New.** Not in seen or the DB. PDP ₹999, in stock, add-to-cart present. Pushed LIVE as #16772. |
| Dealzone | `link.amazon/B08odvMhL` → GM Balin 15L 4-star storage water heater (B0FM8D7C1Z) | Dup of LIVE #16666. See the dup re-check below. |
| CoolzTricks | `amzn.to/4tp8u6l` | Rejected: resolves to an Amazon `/s?k=REVLON` search page |
| Rogerkart | `rogerkart.com/r/LRwaYfq`, "Upto 80% off Lavie handbags" | Rejected: category post |
| RichDeals | — | Our own channel; skipped |

Older or already-seen posts: ONLINE SHOPPING DEALS Outsup, Dealdost EUCOS, INDIAN CHEAP DEALS LG, NonStopDeals Caprese, Hidden Loot and IFS Tips (Swiggy).

`data/tg-multi-seen.json` gained 5 entries (4 links plus 1 ASIN) and now holds 5,330.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16772 | MANQ men's slim-fit casual blazer, grey, size 38 | ₹999 | null | null | Amazon `/dp/B08RZ7K77S?tag=ashoksachdev-21` |

- **Push:** the `{deals:[…]}` POST to `/admin/deals/bulk` returned HTTP 201 with `count:1` and `created:true`, so no slug restore was needed. A Prisma read-back confirms the deal is LIVE at ₹999 with M.R.P. and discount null.
- **M.R.P. rule:** the PDP lists an M.R.P. of ₹4,999, which would make the discount 80.02%. That is over the inflated-M.R.P. threshold, so M.R.P. and discount were stored as null and the copy makes no M.R.P. claim.
- **Variant:** the price was read on the selected variant (grey, size 38). The description says other sizes and colours can be priced differently. The image (`m.media-amazon.com` 61MRhQDGXqL) matches `landingAsinColor` Grey.
- **Copy:** the only ₹ figure in the title and description is ₹999, which matches the numeric price. The PDP detail rows list "Department: Women" against a "Men's" title, so the copy describes the cut and use, not a gender fit. The copy makes no seller, rating or coupon claim.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 16666 | GM Balin 15L 4-star storage water heater (B0FM8D7C1Z) | ₹5,499 / M.R.P. ₹12,490 / 56% | ₹5,499 / M.R.P. ₹12,490. In stock, with add-to-cart present. | None. The price matches, so the slug was only re-pinged. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the blazer and geyser slugs returned **HTTP 200 for 5 URLs** (2 slugs plus the 3 hub paths).
- **Pages on prod:** blazer 200 (0.31s), geyser 200 (0.26s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.65s) |

## CEO audit

Run at 00:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,192 = 16,192 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,772 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,771 vs 16,772 (cursor written 23:09 IST) | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 00:08 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3. The 11-18 count is 0 eight minutes into the day, which is expected; CONTENT-SEO runs at 00:39 IST.

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

The next TELEGRAM-DEAL-MONITOR run is at about 01:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
