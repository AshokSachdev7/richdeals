# DESIDIME — 2026-10-24d (06:14–06:20 IST)

**0 deals pushed.** The sweep turned up the same 9 fresh candidates as DESIDIME 10-24b and 10-24c. All 7 Amazon candidates failed again on their product pages (card prices are bank-offer prices), and the script skipped the other 2. Because nothing was pushed, there was nothing to ping on IndexNow.

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and swapped in our affiliate tag. Non-Amazon candidates were checked with `productLd()` (price within ±₹1, InStock), and every productId was deduped against the DB.
- **Amazon check:** done in the logged-in Playwright tab (profile richDeals) with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`, 2.6 s apart:
  - Price: `#centerCol .priceToPay`.
  - Stock: `#availability` plus `#add-to-cart-button`.
- **Rule:** a candidate is rejected if the page price is more than ₹1 from the card price, or the page has no buy box.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk or other-store dropped | −16 |
| Product-resolved | 15 (1 `/b?node` banner dropped) |
| Already in the DB | −6 |
| Fresh | 9 (7 Amazon, 1 Jiomart, 1 Flipkart) |
| Script SKIP | −2 |
| Rejected on the Amazon product page | −7 |
| **Pushed** | **0** |

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B0F8VHRFBX | Godrej 600L fridge | No buy box | ₹44,499 |
| B0H4GC4BFH | Haier 325L fridge | ₹40,990 | ₹29,490 |
| B0H2YVXLBR | Dreame D30 Ultra | ₹44,999 | ₹39,449 |
| B0GYD6YC2N | iFFALCON 75" TV | ₹69,999 | ₹49,999 |
| B0GYFYMLFX | IFB 222L fridge | ₹20,990 | ₹16,740 |
| B0CF5PN648 | SleepyHug mattress | ₹7,143 | ₹5,768 |
| B0HHRB6DQG | Lenovo Idea Tab Pro Gen 2 | ₹47,999 | ₹41,999 |

All 7 were also rejected in 10-24b and 10-24c.

## Script SKIPs

- **Jiomart Maxkleen floor cleaner (₹230):** the page has no ld+json, so the price cannot be verified.
- **Flipkart STCH3JCUVUF2GBRG, Wildcraft luggage set (₹2,510):** the page price has drifted from the card.

## Freshness

No batch was pushed, so there was no IndexNow ping, and the sitemap and `llms.txt` did not change.

## CEO audit (06:20 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,004 LIVE, matching the API total of 14,004. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14535.
- **Posts (IST 2026-10-24):** 1. CONTENT-SEO runs at 06:39 and ships #2, so this is not rot. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14535, which equals the DB maximum.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
