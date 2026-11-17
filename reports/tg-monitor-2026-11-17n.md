# TELEGRAM-DEAL-MONITOR tick — 2026-11-17n

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. It resolved shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and read every candidate and dup PDP: Amazon in the logged-in Amazon tab (in-tab fetch), Flipkart and Shopsy in a Playwright tab. Run at about 12:58–13:12 IST.

**Result: 3 new deals pushed LIVE (#16744–#16746), and 1 dup LIVE row price-synced to the PDP (#16729). 3 posts were rejected (1 ambiguous Shopsy price, 2 `/s?` search links). IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/IgswR1Kg` → STRIFF mouse pad, pack of 2 (B0CV7XMKDJ) | Pushed as #16744 |
| SB Loots | `amazn.lt/zIw6nyLs` → Colgate Lemon Fresh gel toothpaste, 240 g (B0DCZQYC7H) | Pushed as #16745 |
| Dealzone | `fktr.in/ziHfvly` → Signoraware glass lunch box (Flipkart LBXF5A8EYKCTVRWY) | Pushed as #16746 |
| SB Loots | `amazn.lt/EYjzE04P` → Wipro 3-way multiplug adaptor (B08GMDSVC3) | Dup of LIVE #16729, synced |
| SB Loots | `amazn.lt/TFYIjVbp` → Axe (B0FQP1N4TL) | Dup of LIVE #16134, no change |
| — | `amzn.to/3VvyTmf` → Biotique lotion (B078LH5DWT) | Dup of LIVE #16741 (DesiDime 11-17g), no change |
| ONLINE SHOPPING DEALS | `link.amazon/B08FsUNwo` → LG washing machine (B0DPHTSTYJ) | Dup of LIVE #5035 at ₹20,990, no change |
| — | `fktr.in/fWRDcgU` → boAt Swift Lynk USB hub | Dup of LIVE #16743 (DesiDime 11-17g), no change |
| — | `bittli.in/jTKpeCZD` → Shopsy GHKHG9SRTE5HC7UZ | Rejected: price ambiguous (`finalPrice` ₹203 vs visible ₹226 / ₹899) and no image |
| Dealdost | `amzn.to/4C6Y7aS` | Rejected: `/s?` search page |
| Dealdost | `amzn.to/4zRdQcQ` | Rejected: `/s?` search page |
| RichDeals | — | Our own channel |
| Other groups | — | Unchanged since tick 11-17m |

`data/tg-multi-seen.json` gained 10 entries (one of the 11 links was already present) and now holds 5,257.

## Fresh deals

| Id | Product | PDP | Action |
|---|---|---|---|
| 16744 | STRIFF mouse pad, 230 x 190 x 2 mm, pack of 2 (B0CV7XMKDJ) | ₹129, in stock | Pushed LIVE at ₹129. The listing showed 87% off, which is ≥80%, so the M.R.P. and discountPct were nulled. |
| 16745 | Colgate Lemon Fresh gel toothpaste, 240 g (120 g x 2) (B0DCZQYC7H) | ₹231 / M.R.P. ₹387, in stock | Pushed LIVE at ₹231 (40% off) |
| 16746 | Signoraware microwave-safe glass lunch box (Flipkart LBXF5A8EYKCTVRWY) | ₹120, in stock | Pushed LIVE at ₹120, no M.R.P. (not readable on the PDP) |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:3`, all `created:true` (HTTP 201), so no slug restore was needed.
- **Affiliate:** the Amazon rows use `/dp/ASIN?tag=ashoksachdev-21`. The Flipkart row uses `/signoraware-glass-lunch-box/p/itm57c4d637fb724?pid=LBXF5A8EYKCTVRWY&affid=djhackraj`. A bare `/p/itm…` path returned 404 on fetch, so the slug path is kept.
- **Images:** `m.media-amazon.com` for the Amazon rows, `rukmini1.flixcart.com` for Flipkart.
- **Copy corrections after push:** two rows carried claims the PDP read did not verify.
  - #16745: the title said "Active Salt". It was reset to "Colgate Lemon Fresh Gel Toothpaste, 240 g (120 g x 2) at ₹231 (40% Off) – Amazon".
  - #16744: the title and description claimed "gaming", a cloth top and a rubber base. They were rewritten to only the verified size, pack count and price.
  - The slugs were not changed, so the URLs are stable. The STRIFF slug still contains "gaming"; it is only a URL token.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 16729 | Wipro 3-way multiplug adaptor, 6 A (B08GMDSVC3) | ₹695 / M.R.P. ₹1,800 (tick 11-17m) | ₹999 / M.R.P. ₹1,800, "Only 1 left" | Synced to ₹999 (44% off) |
| 16134 | Axe (B0FQP1N4TL) | LIVE | Matches | No change |
| 16741 | Biotique lotion (B078LH5DWT) | ₹204 | Matches | No change |
| 5035 | LG washing machine (B0DPHTSTYJ) | ₹20,990 | ₹20,990 | No change |
| 16743 | boAt Swift Lynk USB hub | ₹299 | Matches | No change |

#16729 got a new title and description with matching ₹ and %, plus a priceHistory row. Its slug is unchanged. This is the third price on this ASIN today (₹323 → ₹695 → ₹999), and it is down to one unit, so it joins the low-stock re-check list.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs and the synced Wipro slug returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Pages on prod:** STRIFF 200 (0.31s), Colgate 200 (0.23s), Signoraware 200 (0.20s), Wipro 200 (0.22s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.36s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.59s) |

## CEO audit

Run at 13:11 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,166 = 16,166 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,746 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,743 vs 16,746 | OK. The 3-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 13:12 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, plus #16729 ("Only 1 left").
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 14:03 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
