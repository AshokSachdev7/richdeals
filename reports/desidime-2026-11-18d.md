# DESIDIME-INGEST tick — 2026-11-18d

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. There were no per-deal page fetches. Products already in the DB were re-read on the Amazon PDP in the logged-in Playwright tab (richDeals profile) and compared with their DB rows. Run at about 06:43–06:50 IST.

**Result: 0 deals pushed. Stage 1 found 0 fresh candidates: of 15 single products, 11 were rejected in the last 24 h and 4 are already LIVE. On the PDP, 3 of the 4 LIVE dups match their DB price and the fourth (#16756) still has no buy box, so there were 0 price-syncs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Junk, grocery or unsupported store, dropped | 19 |
| Resolved to a single product | 15 |
| Already in the DB (dup) | 4 |
| Rejected within the last 24 h | 11 |
| **Fresh** | **0** |

## Rejected within 24 h (not re-checked)

METRONAUT shirt (Flipkart SHTHHG9KUWZEGGKY, ₹189), Ang ink refill (Shopsy, ₹89), Lenovo IdeaPad Slim 3 (B0F637DPFW, ₹74,593), Wallet Store jhumka (B0GSW3MDG8, ₹844), Redmi 17C 5G (B0HGRWPRGB, ₹23,752), Carbamide Forte eye patches (B0FM43Z9WT, ₹449), Havells Carlo geyser (B08GM68XW4, ₹2,494), Krisons projector (B0FRFY488S, ₹4,349), Snickers gift pack (Zepto, ₹89), VIP Bonus vests (B09YV753WH, ₹269), Dettol grooming kit (Flipkart CBKHEPQZ8ARJZHGG, ₹250).

Since 11-18c, the Redmi 17 5G and the Philips hair styler have dropped out of the DesiDime feed.

## Dup re-checks

All 4 PDPs returned 200 with no captcha (same-origin fetch, `#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart).

| Id | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|
| #3542 | Amazon Basics exhaust fan (B0CYLJR6MF) | ₹765 | ₹1,499 | ₹1,499, in stock, add-to-cart present | None. The card price is stale. |
| #10710 | Fujifilm X Half (B0FB9HZ7S4) | ₹42,749 | ₹45,999 | ₹45,999, in stock, add-to-cart present | None. The card price is a bank-offer price. |
| #16756 | Lifelong LLM270 massager (B08CDZ3M5K) | ₹546 | ₹546 | No price, no add-to-cart | None. Second tick in a row with no buy box; stays on the watch list. |
| #219 | Creative's gift pack (B009319D46) | ₹104 | ₹211 | ₹211, in stock, add-to-cart present | None. The card price is below the PDP price. |

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.34s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.30s) |
| /feed.xml | 200 (0.07s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.60s) |

## CEO audit

Run at 06:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 06:49 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The next CONTENT-SEO run (about 12:39 IST) can take 11-18 to 3.

## Still open

- **DesiDime yield:** 0 fresh candidates for the third tick running (11-18b, c, d). The feed keeps recycling cards that were already rejected or are LIVE. The overnight lull usually lifts after about 08:00 IST.
- **IFS redirector:** dead. Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the Offer lapses tonight (11-18).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 08:43 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
