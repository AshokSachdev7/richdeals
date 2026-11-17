# DESIDIME-INGEST tick — 2026-11-18b

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards. It did not fetch any per-deal pages. It applied the JUNK and GROCERY filters, then resolved each Buy Now through `visit.desidime.com`. Every candidate that was already LIVE got a PDP read in the logged-in Playwright Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Run at about 02:41–02:46 IST.

**Result: 0 new deals pushed, because stage 1 found 0 fresh candidates. All 13 non-dup products had been rejected within the last 24 hours. The 5 dup LIVE rows were re-read on the PDP. The 4 with a buy box match the DB exactly, so nothing was synced. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Junk, grocery or other-store drops | 16 |
| Resolved to a single product | 18 |
| Already in the DB | 5 |
| Rejected in the last 24 h | 13 |
| Fresh candidates | 0 |

The 13 recent rejects are the 7 from DESIDIME 11-18a plus 6 from earlier ticks:

- Philips hair styler (B09DYY72F9)
- Havells Carlo 3 L geyser (B08GM68XW4)
- Krisons projector (B0FRFY488S)
- Snickers gift pack (Zepto)
- VIP Bonus vests (B09YV753WH)
- Dettol grooming kit (Flipkart)

## Dup re-checks

| Id | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|
| 16767 | Lexar NQ100 512GB SSD (B0FJXC9NBX) | ₹6,599 | ₹6,599 | ₹6,599 / M.R.P. ₹16,999, "Only 1 left in stock", add-to-cart present | None. Stays on the low-stock list. |
| 3542 | Amazon Basics exhaust fan (B0CYLJR6MF) | ₹765 | ₹1,499 | ₹1,499 / ₹2,799, in stock | None. The card still shows the old ₹765 price; the 11-18a sync holds. |
| 10710 | Fujifilm X Half (B0FB9HZ7S4) | ₹42,749 | ₹45,999 | ₹45,999 / ₹76,999, in stock | None. The card price is a bank-offer price. |
| 16756 | Lifelong LLM270 massager (B08CDZ3M5K) | ₹546 | ₹546 | No price, no add-to-cart | None. Stays on the no-buy-box watch. |
| 219 | Creative's gift pack (B009319D46) | ₹104 | ₹211 | ₹211 / ₹620, in stock | None. The card price is below the PDP price. |

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.19s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.22s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 02:45 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~02:46 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through m, after a 7 of 93 partial at f. If the remaining 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **DesiDime yield:** this tick found 0 fresh candidates. The feed is recycling cards that were already rejected or are already LIVE, and its Amazon cards keep showing bank-offer or coupon prices.
- **Telegram code-only prices:** in TG 11-18c, the Dealdost EUCOS post needed a promo code (₹2,092 vs PDP ₹2,299).
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

The next DESIDIME-INGEST run is at about 04:43 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
