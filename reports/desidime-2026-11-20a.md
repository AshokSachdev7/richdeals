# DESIDIME-INGEST tick — 2026-11-20a

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage. It did not fetch any per-deal pages, applied the JUNK and GROCERY filters, and resolved each Buy Now link through `visit.desidime.com` to the merchant URL. Amazon candidates were then verified in the logged-in Playwright tab. Non-Amazon candidates were checked with `productLd()` (ld+json price within ±₹1, InStock). Run at about 00:45–01:15 IST on 11-20.

**Result: 4 deals pushed LIVE (bulk 201, `count: 4`, all `created: true`). 3 existing LIVE rows were re-priced, 3 Amazon candidates and all 3 non-Amazon candidates were rejected for price drift. IndexNow returned HTTP 200, and prod returned 200 on all probes.**

## Stage 1 funnel

| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Dropped as junk, grocery or non-product | 14 |
| Resolved to a single product | 19 |
| Already in the DB | 5 |
| Rejected in the last 24h | 4 (PLSHDVGHERMKDBSJ, B0DMWSDGCC, B0F3TQH63Y, B0BWS9FY8K) |
| Fresh candidates | 10 (7 Amazon, 2 Myntra, 1 Flipkart) |

## Pushed

All 4 are LIVE with an image and a price. The affiliate URL is `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.

| Id | ASIN | Product | Price | M.R.P. | Slug |
|---|---|---|---|---|---|
| 16971 | B0BP26M5T2 | Enter USB 2.0 to Ethernet LAN adapter | ₹148 | ₹500 | `enter-usb-2-0-to-ethernet-lan-adapter-10-100-mbps-rj45-b0bp26m5t2` |
| 16972 | B0FMYDQBRQ | ACTION boys' school shoes | ₹330 | ₹1,199 | `action-boys-school-shoes-with-lightweight-eva-sole-b0fmydqbrq` |
| 16973 | B09R2JMNJ2 | VISKO tool kit with carpenter's apron | ₹1,634 | none | `visko-tool-kit-with-carpenter-s-apron-5-pocket-tool-belt-and-welding-gloves-b09r2jmnj2` |
| 16974 | B0BQWBXCDD | Sky Heights men's thermal pant | ₹281 | ₹899 | `sky-heights-men-thermal-pant-grey-winter-warmer-bottom-b0bqwbxcdd` |

The VISKO card M.R.P. implied 83% off, so it was set to null under the M.R.P. sanity rule. Where `data-a-dynamic-image` was empty, the image came from the `colorImages` entry for `landingAsinColor`.

## Price-synced (existing LIVE rows)

These candidates were already LIVE. Each was re-read on the PDP and updated with `prisma.deal.update`. The ₹ amount in the title was changed to match the new price.

| Id | ASIN | Product | Old price | New price | M.R.P. |
|---|---|---|---|---|---|
| 13228 | B097GCHTM4 | Safari backpack | ₹599 | ₹549 | ₹1,999 |
| 16732 | B0CWDV5CRJ | Softouch tissues | ₹194 | ₹174 | ₹489 |
| 11211 | B08DG2T1W8 | Havells exhaust fan | ₹1,490 | ₹949 | ₹1,875 |

Two duplicates were unchanged: #16943 (B0DFMBY5ZM, ₹1,344, with only 1 left in stock) and #16938 (B07FD54CBQ, ₹946).

## Rejected

All of these were written to `data/dd-rejected.json` with a `Date.now()` timestamp.

| Candidate | Store | Reason |
|---|---|---|
| B0H9HTSXJJ | Amazon | Card ₹74, PDP ₹138 |
| B0GPKCK7T3 | Amazon | Card ₹105, PDP ₹116 |
| B0F2J1WF3R | Amazon | Card ₹144, PDP ₹360 |
| 41305136 | Myntra | ld+json price drift |
| 25372462 | Myntra | ld+json price drift |
| PLSHHPKPGKFFSUM3 | Flipkart | Price drift |

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 10 URLs: 7 slugs (4 new and 3 re-priced) plus 3 hubs |
| `sitemap.xml` | 200 (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.37s |
| `/offers` | 200 | 0.15s |
| `/blog` | 200 | 0.75s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.14s |
| `/llms.txt` | 200 | 0.56s |
| `/enter-usb-2-0-to-ethernet-lan-adapter-10-100-mbps-rj45-b0bp26m5t2` | 200 | 0.25s |
| `/api/deals` | 200: total 16,367, newest id 16,974 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,367 = 16,367 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,974 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,970 vs 16,974 | OK. The external tg-broadcast cron closes this gap on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `desidime-2026-11-20*` file existed, so this report uses suffix `a` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967. New this tick: #16972 (2 left), #16973 (1 left), #16974 (1 left).
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 00:54 |
| TG | 11-20 01:01 |
| INDEXNOW | 11-20 01:05 |
| SITEMON | 11-20 01:14 |
| DESIDIME | 11-20 02:43 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| AI-OVERVIEW | 11-25 11:39 |
