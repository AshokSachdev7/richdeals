# DESIDIME-INGEST tick — 2026-11-17i

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards without fetching any per-deal page, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Each fresh candidate was then verified: Amazon in the logged-in Playwright Amazon tab (richDeals profile), other stores via `productLd()` (±₹1, InStock). Dedup ran by `productId` against the live DB, with a shadow-row check by slug and affiliate URL. Run at about 16:40–16:50 IST.

**Result: 1 new deal pushed LIVE (#16756, Lifelong LLM270 handheld massager at ₹546). Two dup rows were repriced to match the PDP: Orient Gusto iron #13935 (₹815 → ₹999) and acer wireless mouse #9352 (₹355 → ₹319). 4 candidates were rejected (2 price drift, 1 no ld+json, 1 out of stock). IndexNow returned HTTP 200 for 6 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk, grocery or other-store (dropped) | 12 |
| Unresolved, hub or dead link (dropped) | 6 |
| Resolved to a single product | 18 |
| Already in the DB (dup) | 6 |
| Rejected in the last 24 h | 7 |
| Fresh candidates | 5 |

The 7 skipped as rejected in the last 24 h were a Digihaat puja kit, Klook, Jabra Speak 510, durfi mattress, Havells Bianca+ B0FBLX3PXW, VIP B09YV753WH and Dettol CBKHEPQZ8ARJZHGG, all from ticks 11-17g and 11-17h.

## Candidates

| Product | Id | Card | PDP | Action |
|---|---|---|---|---|
| Lifelong LLM270 handheld electric massager, brown | B08CDZ3M5K | ₹546 | ₹546 / M.R.P. ₹2,300, in stock, add-to-cart present | Pushed LIVE as #16756 |
| Havells REO BLDC ceiling fan | B0GGRZQBQ3 | ₹1,999 | ₹2,665 | Rejected: drift |
| Dr Vision CCTV camera | B0HQN9CHTH | ₹1,836 | ₹1,989 | Rejected: drift |
| Digihaat item | 38392a4431e0 | — | No ld+json | Rejected |
| Instamart item | 15b69a3205c3 | — | Out of stock | Rejected |

All 4 rejects were written to `data/dd-rejected.json` under their `productId` with `Date.now()`, so stage 1 skips them for 24 h.

## Fresh deal

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16756 | Lifelong LLM270 handheld electric massager (brown) | ₹546 | ₹2,300 | 76% | Amazon `/dp/B08CDZ3M5K?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms LIVE with ₹546 / ₹2,300 / 76%.
- **Image:** `m.media-amazon.com/images/I/51eYW2ilXcL._SL1000_.jpg`, from `#landingImage` `data-old-hires`.
- **Copy:** every ₹ in the title and description matches the numeric price. No specs beyond the PDP title were stated.

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 13935 | Orient Electric Gusto heavy-weight dry iron 1100 W (B0CJF4BJ2T) | ₹815 / M.R.P. ₹1,800 | ₹999 / M.R.P. ₹1,890 (47%), in stock | Repriced to ₹999 / ₹1,890 / 47%. The title gained the price tail, the description ₹ was updated, and a priceHistory row was written. |
| 9352 | acer wireless mouse 1600 DPI 2.4 GHz (B0D7VSW3W9) | ₹355 / M.R.P. ₹1,499 | ₹319 / M.R.P. ₹1,499 (79%), in stock | Repriced to ₹319, discountPct 79. The title and description ₹ were updated and a priceHistory row was written. The card's ₹310 did not match the PDP, so it was not used. |
| 16749 | AO Smith X2 Neo water purifier (B0BHYVJFGC) | ₹6,722 | ₹6,722 | Confirmed, no change. The card showed ₹6,222. |
| 12714 | HP 410 Slim Bluetooth mouse (B0B2PGJHMT) | ₹512 | ₹512 | Confirmed, no change |
| 219 | Creative's gift pack (B009319D46) | ₹211 | ₹211 | Confirmed, no change |
| 10652 | Samsung S4 monitor (B0DQ57M8HC) | EXPIRED | No buy box | Stays EXPIRED |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the new Lifelong slug and the two repriced slugs returned **HTTP 200 for 6 URLs** (3 slugs plus the 3 hub paths).
- **Pages on prod:** Lifelong 200 (0.27s), Orient 200 (0.24s), acer 200 (0.27s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.53s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 16:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,176 = 16,176 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,756 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,755 vs 16,756 | OK. The 1-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 16:49 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met. The 18:39 IST CONTENT-SEO run may add a fourth post (the cap) or skip.

## Still open

- **IFS redirector:** dead at g and h, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 18:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
