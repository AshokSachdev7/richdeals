# DESIDIME-INGEST tick: 2026-11-28b

**Result:** 1 new deal is LIVE, #17640: the Adidas Adizero Evo SL running shoes on Myntra at ₹8,639, down from an M.R.P. of ₹15,999 (46% off). The bulk push returned HTTP 201 with count 1, and the row came back `created:true`, so no slug needed restoring. IndexNow returned HTTP 200 for 4 URLs. The new page returned 200.

## Stage 1

`ingest-desidime.mjs` read only the cards on `/new` and the homepage; no individual deal pages were fetched.

| Step | Count |
|---|---|
| Cards discovered | 28 |
| Dropped by the JUNK, GROCERY or non-store filters | 17 |
| Resolved through `visit.desidime.com` to a single product | 11 |
| LIVE duplicates | 3 |
| Rejected in the last 24 hours | 7 |
| Fresh | 1 |

## Pushed (1)

| ID | Deal | Price | M.R.P. | Affiliate |
|---|---|---|---|---|
| 17640 | Adidas Men's Adizero Evo SL Lightstrike Pro, grey (Myntra 44609653) | ₹8,639 | ₹15,999 | InRDeals |

- **Verification:** Myntra's ld+json price matched the card price exactly (₹8,639), and the product was InStock.
- **Image:** the `assets.myntassets.com` image returned HTTP 200 (`image/jpeg`) on a HEAD check.
- **Dedup:** the database was checked by productId, affiliateUrl and slug, so legacy rows with a null productId were also covered. Nothing matched.
- **Copy:** the title and description are rewritten and answer-first, and state that the price was checked on Myntra on 28 November 2026. The how-to includes the "pick your size" step. The ₹ guard passed: the only ₹ figures are the price and the M.R.P.

## Duplicates (3, left unchanged)

| Product | Notes |
|---|---|
| B0CPJJDC3N Dabur | Pushed as #17594 last tick |
| B0G43WXXRC Boldfit | ₹299, unchanged |
| TVSHZTYRVBSWQJS5 Toshiba | The card's ₹24,990 is a bank-offer price; the list price of ₹29,990 is unchanged |

All three were re-read within the last 1–2 hours, so they were not re-verified this tick.

## Rejects (already rejected within the last 24 hours)

WGYHPAH4HPUVQDAD Hindware, 9c5dcaa45ceb Horlicks, B0GTVZ47CS ASUS, TVSHQZZNWBZKFGG7 Xiaomi 65", B0F6ZLFNVT Xiaomi 43", B01CSKD9AW Kindle ebooks, APFHN6YQKSHXJAYR Motorola AirShield.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the new slug, `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** the deals child is the top-100 pinned set, so the new deal is noindex by design and stays out of it.
- **llms.txt:** generated on each request, so nothing to do.
- **Audit after the push:**
  - 0 LIVE deals with a null price, 0 with a null image.
  - 0 PENDING_REVIEW.
  - 17,034 LIVE deals; the newest is #17640.
  - Prod: all 6 endpoints returned 200 at SITEMON 11-28c (02:06 IST).
  - 1 post on 11-28 (IST). CONTENT-SEO has 3 more ticks today.
  - Crons: 9 of 9.
  - 0 unpushed commits before this one.
