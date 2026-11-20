# DESIDIME-INGEST tick — 2026-11-20e

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch, applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Run at about 08:43–08:46 IST on 11-20.

**Result: 0 pushed, 0 repriced. The one fresh candidate was a Swiggy Instamart search page with no ld+json, so it was rejected. All 7 dup card prices are unchanged from 20d, so IndexNow was not called. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped (JUNK, GROCERY, category or non-product links) | 16 |
| Resolved to a product | 16 |
| Dup vs DB | 7 |
| Rejected in the last 24h | 8 |
| Fresh | 1 |

The drops included a BHIM UPI app-promo card (Play Store link) and a VISKO tool kit whose Buy Now did not resolve.

## Candidates

| Candidate | Result |
|---|---|
| "Be Neude products are 75% off" (Swiggy, productId `732d4c4f5cd9`, card ₹288) | Rejected. It resolves to `swiggy.com/stores/instamart/search?query=Be%20Neude`, which is a search page with no ld+json, not a single product. Stage 1 already logged it in `data/dd-rejected.json`. |

## Dup hits vs DB

| Row | ASIN | Card | DB | Note |
|---|---|---|---|---|
| #13228 | B097GCHTM4 | ₹549 | ₹679 | Card is stale. The DB price was verified on the PDP at 20b and 20c. |
| #16732 | B0CWDV5CRJ | ₹174 | ₹174 | Match |
| #16971 | B0BP26M5T2 | ₹148 | ₹148 | Match |
| #16972 | B0FMYDQBRQ | ₹330 | ₹330 | Match |
| #11211 | B08DG2T1W8 | ₹949 | ₹949 | Match |
| #16974 | B0BQWBXCDD | ₹281 | ₹281 | Match |
| #16943 | B0DFMBY5ZM | ₹1,344 | ₹1,344 | Match |

The card prices are identical to 20d, so no PDP re-read was needed. #16973 (B09R2JMNJ2) has left the DesiDime listing.

**Rejected in the last 24h, skipped:**
- the Solara sale hub (`cec792404369`)
- B0H9HTSXJJ
- Flipkart TVSHM44HM6VHUUFQ, PLSHHPKPGKFFSUM3 and PLSHDVGHERMKDBSJ
- B0DMWSDGCC
- B0BWS9FY8K
- B0GL27838J

## Pushed

None. No bulk POST was made, so there is no count to read.

## Repriced

None.

## Freshness

Nothing changed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.18s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.50s |
| `/sitemap.xml` | 200 | 0.09s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.35s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-d` existed, so this report uses suffix `e` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
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
| DEAL-INGEST | 11-20 08:53 |
| TG | 11-20 09:01 |
| SITEMON | 11-20 09:14 |
| DESIDIME | 11-20 10:43 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
