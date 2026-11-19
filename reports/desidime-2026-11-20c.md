# DESIDIME-INGEST tick — 2026-11-20c

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards without fetching any per-deal pages. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link to the merchant URL and deduped by `productId` against the live DB. The fresh Amazon candidate and the one dup whose card price differed from the DB were read on the PDP in the logged-in Amazon tab. Run at about 04:43–04:55 IST on 11-20.

**Result: 0 new deals pushed. The only fresh candidate was rejected because it is a personalised listing with no add-to-cart button. 0 rows were re-priced: the one dup with a different card price still matches the DB on the PDP. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 funnel

| Stage | Count |
|---|---|
| Cards discovered | 36 |
| Dropped (junk, grocery or no resolvable store) | 16 |
| Resolved to a single product | 20 |
| Already in DB (`dup`) | 8 |
| Rejected in the last 24h (`rej24h`) | 11 |
| Fresh | 1 |

## Candidates

| Product | Store / id | Card price | Live check | Outcome |
|---|---|---|---|---|
| Customisable kids' name LED neon wall light (Eurotex) | Amazon B0GL27838J | ₹63 | PDP ₹63, M.R.P. ₹699, "In stock", **no add-to-cart button** | Rejected: personalised listing. ₹63 is the base price shown before customisation, so it is not a buyable price. Added to `data/dd-rejected.json` |

## Dup hits vs DB

| Id | ASIN | DB price | Card price | Outcome |
|---|---|---|---|---|
| 13228 | B097GCHTM4 (Safari Thrive 36L) | ₹679 | ₹549 | PDP read: ₹679, M.R.P. ₹1,999, In stock, add-to-cart present. The DesiDime card is still stale (same as 20b) and the DB is correct, so no re-price was made. |
| 16732 | B0CWDV5CRJ | ₹174 | ₹174 | Unchanged |
| 16971 | B0BP26M5T2 | ₹148 | ₹148 | Unchanged |
| 16972 | B0FMYDQBRQ | ₹330 | ₹330 | Unchanged |
| 16973 | B09R2JMNJ2 (VISKO) | ₹1,634 | ₹1,634 | Unchanged. Stays on the no-buy-box watch list. |
| 11211 | B08DG2T1W8 | ₹949 | ₹949 | Unchanged |
| 16974 | B0BQWBXCDD | ₹281 | ₹281 | Unchanged |
| 16943 | B0DFMBY5ZM | ₹1,344 | ₹1,344 | Unchanged |

Rejected within the last 24h and skipped by the script: B0H9HTSXJJ, B0GPKCK7T3, B0F2J1WF3R, Myntra 41305136, Myntra 25372462, Flipkart TVSHM44HM6VHUUFQ, Flipkart PLSHHPKPGKFFSUM3, Flipkart PLSHDVGHERMKDBSJ, B0DMWSDGCC, B0F3TQH63Y, B0BWS9FY8K.

## Pushed

None. No bulk POST was made.

## Repriced

None.

## Freshness

No deal was pushed or re-priced, so there were no slugs to ping and IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.63s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.42s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `desidime-2026-11-20a` and `-b` existed, so this report uses suffix `c` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day is about 5 hours old, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **#14635 and #11896:** stale Offer (no `priceValidUntil`, last price check more than 14 days old), flagged as PRIORITY by SCHEMA-AUDIT 11-20.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 04:53 |
| TG | 11-20 05:01 |
| SITEMON | 11-20 05:14 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| DESIDIME | 11-20 06:43 |
| INDEXNOW | 11-20 07:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| AI-OVERVIEW | 11-25 11:39 |
