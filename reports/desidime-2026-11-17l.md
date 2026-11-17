# DESIDIME-INGEST tick — 2026-11-17l

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards. It did not fetch any per-deal pages. It applied the JUNK and GROCERY filters, then resolved each Buy Now through `visit.desidime.com`. Fresh Amazon candidates were checked in the logged-in Playwright Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Candidates that were already LIVE got the same PDP read and were price-synced where the price had moved. Run at about 22:44–22:51 IST.

**Result: 4 new deals pushed LIVE (#16767–#16770). 4 dup LIVE rows were price-synced (#3542, #4683, #12745, #3681). 6 candidates were rejected. IndexNow returned HTTP 200 for 11 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Junk, grocery or no store link | 11 |
| Resolved to a single product | 23 |
| Already in the DB | 8 |
| Rejected in the last 24 h | 5 |
| Fresh candidates | 10 |

## Candidates

| Store | Product | Id | Card | Live | Outcome |
|---|---|---|---|---|---|
| Amazon | Philips hair dryer | B09DYY72F9 | ₹916 | ₹944 | Rejected: price drift |
| Amazon | Lexar NQ100 512GB SATA SSD | B0FJXC9NBX | ₹6,599 | ₹6,599 | **Pushed** as #16767 |
| Amazon | Kardelen oud perfume | B0FSX3D6NM | ₹199 | ₹399 | Rejected: price drift |
| Amazon | Solimo storage containers | B07PCBM6SP | — | No price, no add-to-cart | Rejected: no buy box |
| Amazon | Lumio Arc 5 Google TV projector | B0FF5H4PGD | ₹11,750 | ₹11,000 | **Pushed** as #16768 at the PDP price |
| Amazon | Solimo Troilus beer mugs, 470ml ×2 | B07J4TTFZP | ₹327 | ₹327 | **Pushed** as #16769 |
| Amazon | Solimo triply cookware | B0DGTMCZZF | — | No price, no add-to-cart | Rejected: no buy box |
| Instamart | Aveeno | 87b07c4869a5 | ₹99 | — | Rejected: low-ticket quick-commerce FMCG |
| Amazon | iCall P47 Bluetooth on-ear headphones | B08K9D1CZC | ₹298 | ₹298 | **Pushed** as #16770 |
| Amazon | Havells Carlo 3L water heater | B08GM68XW4 | ₹2,494 | ₹3,079 | Rejected: price drift |

The 6 rejects were written to `data/dd-rejected.json`, which now holds 2,070 entries.

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16767 | Lexar NQ100 512GB SATA SSD | ₹6,599 | ₹16,999 | 61% | Amazon `/dp/B0FJXC9NBX?tag=ashoksachdev-21` |
| 16768 | Lumio Arc 5 portable projector, Google TV | ₹11,000 | ₹39,999 | 72% | Amazon `/dp/B0FF5H4PGD?tag=ashoksachdev-21` |
| 16769 | Solimo Troilus glass beer mug set, 470ml ×2 | ₹327 | ₹1,300 | 75% | Amazon `/dp/B07J4TTFZP?tag=ashoksachdev-21` |
| 16770 | iCall P47 wireless Bluetooth on-ear headphones | ₹298 | null | null | Amazon `/dp/B08K9D1CZC?tag=ashoksachdev-21` |

- **Push:** the `{deals:[…]}` POST to `/admin/deals/bulk` returned HTTP 201 with `count:4`, and every item was `created:true`, so no slug restore was needed. A Prisma read-back confirms all 4 are LIVE.
- **M.R.P. rule:** the iCall PDP lists an M.R.P. of ₹1,499, which would make the discount 80.1%. That is over the inflated-M.R.P. threshold, so M.R.P. and discount were stored as null and the copy makes no M.R.P. claim.
- **Images:** all from `m.media-amazon.com`: 41Ho4vbAnjS, 719ChY6aQ6L, 71hQOPG7H1L and 51g5rSzritL.
- **Stock:** the Lexar PDP showed "Only 1 left in stock", so #16767 joins the low-stock re-check list.
- **Copy:** every ₹ figure in each title and description matches the numeric price and M.R.P., and the discount math checks out.

## Dup re-checks

| Id | ASIN | DB | PDP | Action |
|---|---|---|---|---|
| 3542 | B0CYLJR6MF (exhaust fan) | ₹968 / 65% | ₹765 / M.R.P. ₹2,799 | **Synced** to ₹765 / ₹2,799 / 73%. Title updated; priceHistory row written. |
| 4683 | B0GZBMH17Y (Amkette M15) | ₹379 / M.R.P. ₹999 / 62% | ₹249 | **Synced** to ₹249 with M.R.P. and discount null. The description was rewritten with no M.R.P. claim. |
| 12745 | B0B31SLPS2 (Solimo multi kadai) | ₹524 / 74% | ₹403 / M.R.P. ₹1,999 | **Synced** to ₹403 / ₹1,999 / 80% (79.8%, under the threshold). Title and description updated, and an unverified rating line was removed. |
| 3681 | B0D4F4ZNW4 (Eveready 12W ×2) | ₹503 | ₹444 | **Synced** to ₹444. M.R.P. stays null because the PDP M.R.P. of ₹12,980 is inflated. Title updated. |
| 16730 | MAGIK | ₹50 / ₹155 | ₹50 / ₹155 | None. The price matches. |
| 10710 | Fujifilm | ₹45,999 | ₹45,999 | None. The card's ₹42,749 is a bank-offer price. |
| 219 | Creative's | ₹211 / ₹620 | ₹211 / ₹620 | None. The price matches. |
| 16756 | Lifelong (B08CDZ3M5K) | — | No price, no add-to-cart | None. Stays on the no-buy-box watch. |

Each sync wrote a `priceHistory` row, which refreshes `priceValidUntil` in the Offer schema.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 4 new slugs and the 4 synced slugs returned **HTTP 200 for 11 URLs** (8 slugs plus the 3 hub paths).
- **New pages on prod:** Lexar 200 (2.04s), Lumio 200 (0.38s), mugs 200 (0.33s), iCall 200 (0.20s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.31s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.65s) |

## CEO audit

Run at 22:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,190 = 16,190 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,770 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,766 vs 16,770 | OK. The 4-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 22:51 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i, j and k, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
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

The next DESIDIME-INGEST run is at about 00:43 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
