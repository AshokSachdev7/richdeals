# DESIDIME-INGEST tick — 2026-11-18a

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards. It did not fetch any per-deal pages. It applied the JUNK and GROCERY filters, then resolved each Buy Now through `visit.desidime.com`. Fresh Amazon candidates were checked in the logged-in Playwright Amazon tab with an in-tab fetch:

- price from `#corePriceDisplay` `.a-price-whole`
- M.R.P. from `#centerCol`
- stock from `#availability` and the add-to-cart button

Candidates that were already LIVE got the same PDP read and were price-synced where the price had moved. Run at about 00:44–00:53 IST.

**Result: 0 new deals pushed. All 5 fresh Amazon candidates were rejected for price drift: each DesiDime card showed a bank-offer or coupon price below the PDP price. 1 dup LIVE row was price-synced (#3542), including its stale title. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 37 |
| Junk, grocery or no store link | 17 |
| Resolved to a single product | 19 |
| Already in the DB | 5 |
| Rejected in the last 24 h | 7 |
| Fresh candidates | 7 |

## Candidates

| Store | Product | Id | Card | Live | Outcome |
|---|---|---|---|---|---|
| Flipkart | METRONAUT shirt | SHTHHG9KUWZEGGKY | ₹189 | — | Skipped by stage 1: out of stock |
| Shopsy | Ang GI 71 ink | 511a1b5fb38f | ₹89 | — | Skipped by stage 1: price drift |
| Amazon | Lenovo IdeaPad Slim 3 | B0F637DPFW | ₹74,593 | ₹76,900 | Rejected: price drift |
| Amazon | Wallet Store earrings | B0GSW3MDG8 | ₹844 | ₹944 | Rejected: price drift |
| Amazon | Redmi 17C 5G | B0HGRWPRGB | ₹23,752 | ₹24,999 | Rejected: price drift |
| Amazon | Carbamide Forte patches | B0FM43Z9WT | ₹449 | ₹499 | Rejected: price drift |
| Amazon | Redmi 17 5G | B0HBWPNQQF | ₹27,552 | ₹28,999 | Rejected: price drift |

All 5 Amazon candidates were in stock with add-to-cart present; none were already in the DB by productId. The 5 rejects were written to `data/dd-rejected.json`, which now holds 2,077 entries.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 3542 | Amazon Basics exhaust fan (B0CYLJR6MF) | ₹765 / M.R.P. ₹2,799 / 73% | ₹1,499 / M.R.P. ₹2,799 | **Price-synced** to ₹1,499 / ₹2,799 / 46%, with a priceHistory row. The title still read "at ₹765 (73% Off)", so it was rewritten to "at ₹1,499 (46% Off)". Prod page 200. |
| 16767 | Lexar NQ100 512GB SSD (B0FJXC9NBX) | ₹6,599 / ₹16,999 / 61% | ₹6,599 / ₹16,999. "Only 1 left in stock", add-to-cart present | None. Stays on the low-stock list. |
| 10710 | Fujifilm X Half (B0FB9HZ7S4) | ₹45,999 / ₹76,999 / 40% | ₹45,999 / ₹76,999 | None |
| 16756 | Lifelong LLM270 massager (B08CDZ3M5K) | ₹546 / ₹2,300 / 76% | No price, no add-to-cart | None. Stays on the no-buy-box watch. |
| 219 | Creative's gift pack (B009319D46) | ₹211 / ₹620 / 66% | ₹211 / ₹620 | None |

The DB's ₹765 for #3542 no longer matches the PDP, so it was probably a short-lived deal price. The next dup hit should re-read it.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the #3542 slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.78s) |

## CEO audit

Run at 00:52 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,192 = 16,192 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,772 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,772 vs 16,772 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~00:52 IST) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g, h, i, j, k and l, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **DesiDime yield:** Amazon cards are showing bank-offer or coupon prices; all 5 fresh Amazon candidates drifted this tick, so 0 were pushed.
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

The next DESIDIME-INGEST run is at about 02:43 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
