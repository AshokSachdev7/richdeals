# DESIDIME-INGEST tick — 2026-11-20d

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch, applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Run at about 06:43–06:55 IST on 11-20.

**Result: 0 pushed, 0 repriced. The one fresh candidate was a sale hub with no ld+json, so it was rejected. All 8 dups match the DB, so IndexNow was not called. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Dropped (JUNK, GROCERY, category or non-product links) | 16 |
| Resolved to a product | 17 |
| Dup vs DB | 8 |
| Rejected in the last 24h | 8 |
| Fresh | 1 |

The drops included a Flipkart health-care category page and an iBELL `/clp/B0F3TQH63Y` landing page.

## Candidates

| Candidate | Result |
|---|---|
| Solara Black Friday Sale (`track.clickonik.com`, productId `cec792404369`) | Rejected: sale hub, no ld+json, not a single product. Stage 1 already logged it in `data/dd-rejected.json`. |

## Dup hits vs DB

| Row | ASIN | Card | DB | Note |
|---|---|---|---|---|
| #13228 | B097GCHTM4 | ₹549 | ₹679 | Card is stale. The DB price was verified on the PDP at 20b and 20c. |
| #16732 | B0CWDV5CRJ | ₹174 | ₹174 | Match |
| #16971 | B0BP26M5T2 | ₹148 | ₹148 | Match |
| #16972 | B0FMYDQBRQ | ₹330 | ₹330 | Match |
| #16973 | B09R2JMNJ2 | ₹1,634 | ₹1,634 | Match |
| #11211 | B08DG2T1W8 | ₹949 | ₹949 | Match |
| #16974 | B0BQWBXCDD | ₹281 | ₹281 | Match |
| #16943 | B0DFMBY5ZM | ₹1,344 | ₹1,344 | Match |

The card prices are unchanged from 20c, so no PDP re-read was needed.

**Rejected in the last 24h, skipped:** B0H9HTSXJJ, B0GPKCK7T3, Flipkart TVSHM44HM6VHUUFQ, PLSHHPKPGKFFSUM3 and PLSHDVGHERMKDBSJ, B0DMWSDGCC, B0BWS9FY8K and B0GL27838J.

## Pushed

None. No bulk POST was made, so there is no count to read.

## Repriced

None.

## Freshness

Nothing changed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.23s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.61s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.38s |
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
| Report suffix | `desidime-2026-11-20a` to `-c` existed, so this report uses suffix `d` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
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
- **Cover lag after publish** is known behaviour and self-heals within 300s.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 07:01 |
| SITEMON | 11-20 07:14 |
| INDEXNOW | 11-20 07:23 |
| DESIDIME | 11-20 08:43 |
| DEAL-INGEST | 11-20 08:53 |
| CONTENT-SEO | 11-20 12:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
