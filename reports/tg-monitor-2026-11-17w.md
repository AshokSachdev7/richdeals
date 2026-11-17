# TELEGRAM-DEAL-MONITOR tick — 2026-11-17w

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Shortlinks were resolved with curl. Each result was deduped against `data/tg-multi-seen.json` and the live DB. Every Amazon PDP that resolved to a single product was then read in the logged-in Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Run at about 22:03–22:06 IST.

**Result: 1 new deal pushed LIVE: #16766, a Solimo 6-piece 295ml beer glass set at ₹330. One dup repost (LG 8 kg top-load washer, #5035) was re-checked; its PDP price matches the DB. Seven posts were rejected. IndexNow returned HTTP 200 for 5 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B0ivh7So8` → Solimo beer glass set, 6 × 295ml (B07PCCQ56J) | **New.** Not in seen or the DB. PDP ₹330 / M.R.P. ₹1,390 (76% off), in stock, add-to-cart present. Pushed LIVE as #16766. |
| INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` → LG 8 kg 5-star top-load washer T80VBMB4Z (B0DPHTSTYJ) | Dup of LIVE #5035. See the dup re-check below. |
| Dealzone, SB Loots, CoolzTricks | "Upto 86% off on Solimo kitchenware" (`link.amazon/B00a2JekR`, `amazn.lt/EthK06fl`, `amzn.to/4ACZWei`) | Rejected: category post. The Dealzone link resolves to an Amazon `/s?k=Solimo` search page. |
| NonStopDeals | Caprese handbags, `fkrt.it/dyoEV7uuuN` | Rejected: category post, already seen |
| Dealdost | EUCOS, `amzn.to/4aA0XJF` | Already seen |
| Rogerkart | `rogerkart.com/r/CZ3AYN6` | Already rejected (an Amazon `/s?` search page) |
| Hidden Loot, IFS Tips | Swiggy Dineout | Rejected: not a product deal |

`data/tg-multi-seen.json` gained 5 entries (4 links plus 1 ASIN) and now holds 5,316.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16766 | Solimo beer glass set, 6 pieces, 295ml | ₹330 | ₹1,390 | 76% | Amazon `/dp/B07PCCQ56J?tag=ashoksachdev-21` |

- **Push:** the `{deals:[…]}` POST to `/admin/deals/bulk` returned HTTP 201 with `count:1` and `created:true`, so no slug restore was needed. A Prisma read-back confirms the deal is LIVE at ₹330 / ₹1,390 / 76%.
- **Price:** the PDP shows ₹330.38. The `price` column is an integer, so ₹330 was stored, which is within the ±₹1 tolerance. The channel's "₹330.38" matched the PDP, so it is not a post-coupon price.
- **Image:** `m.media-amazon.com` 51T-fq0x2EL, from `#landingImage` `data-old-hires`. The product has no colour variants.
- **Copy:**
  - Every ₹ figure in the title and description matches the numeric price and M.R.P.
  - The first draft said "sold and shipped by Amazon". The PDP read did not check the seller, so that sentence was removed with a `prisma.update` right after the push.

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 5035 | LG 8 kg 5-star top-load washer, T80VBMB4Z, Middle Black (B0DPHTSTYJ) | ₹20,990 / M.R.P. ₹28,990 | ₹20,990 / M.R.P. ₹28,990. In stock, with add-to-cart present and a ₹750 clip coupon. | None. The price and M.R.P. are unchanged, so the slug was only re-pinged. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the Solimo and LG slugs returned **HTTP 200 for 5 URLs** (2 slugs plus the 3 hub paths).
- **Pages on prod:** Solimo 200 (0.29s), LG 200 (0.40s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.66s) |

## CEO audit

Run at 22:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,186 = 16,186 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,766 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,765 vs 16,766 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 22:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i, j and k, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 23:03 IST (11-17), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
