# DESIDIME — 2026-10-23e (08:24 IST)

**3 deals pushed LIVE (#14268–#14270): PrettyKrafts laundry bag ₹94 (Amazon), ZEBRONICS Duke Pro WHP-13 ₹1,449 (Flipkart) and Acer Aspire 14 AS14-39 ₹36,990 (Flipkart). 3 Amazon candidates rejected for price drift. IndexNow returned HTTP 200 for 6 URLs. Shared-lib fix: `affiliate()` now accepts Flipkart `/hi/` locale URLs.**

Stage 1 was `ingest-desidime.mjs`, run on `/new` plus the homepage with the JUNK/GROCERY filters. Its Amazon candidates were read in Playwright tab 1 with an in-page `fetch('/dp/…?th=1')`, using:
- `#centerCol .priceToPay`
- `.basisPrice`
- `#availability` plus add-to-cart

Flipkart candidates were read in tab 2 with `fetch('/a/p/i?pid=…')`, using the ld+json `offers.price` and availability. Each `visit.desidime.com` Buy Now link was resolved with curl `-L`. None of the 6 productIds matched a row in the DB.

## Funnel

| Stage | Count |
|---|---|
| Amazon candidates from stage 1 | 4 |
| Flipkart cards that stage 1 dropped (`affiliate()` returned null), re-read by hand | 2 |
| Already in the DB (by productId) | 0 |
| Rejected after reading the product page | 3 |
| **Pushed** | **3** (`count:3`, all `created:true`) |

## Pushed

| # | Item | Product page | M.R.P. stored | Note |
|---|---|---|---|---|
| 14268 | PrettyKrafts 45 L foldable laundry bag (B09PL4S53V) | ₹94, In stock, add-to-cart | null (₹499 dropped by the MRP guard, which drops any M.R.P. more than 80% above the price) | Matches the card price |
| 14269 | ZEBRONICS Duke Pro WHP-13 (Flipkart ACCHGHJJHGTN5SP5) | ₹1,449, InStock | null (₹8,099 dropped by the same MRP guard) | Matches the card. Resolved via the `/hi/` locale URL |
| 14270 | Acer Aspire 14 Ryzen 5 3500U 8/256 AS14-39 (Flipkart COMHPDSBZGUAUVBT) | ₹36,990, InStock | ₹74,999 (51%) | Card said ₹31,740 "incl. ₹5,250 off HDFC". Stored at the verified price; the HDFC credit-card full-swipe offer widget is present on the product page and is recorded in `couponNote` without a number |

## Rejected

| Item | Card | Product page now | Reason |
|---|---|---|---|
| Greenchef Ripple Pro mixer grinder B0GR9BFTYK | ₹1,955 | ₹3,599 / ₹6,665 | Price drift |
| Mango Cool THK35 air cooler B08HX2RGHM | ₹2,597 ("Delhi available") | ₹5,492 / ₹7,999, 1 left | Price drift and location-locked |
| Lenovo LOQ Essential R7 7735HS / RTX 4050 B0H6QCSMJK | ₹1,07,740 | ₹1,14,990 / ₹1,75,590 | Price drift (the card price assumes an offer the product page doesn't show) |

## Fixes

- **`scripts/lib/ingest-common.mjs` `affiliate()`:**
  - Flipkart serves language variants as `/hi/<slug>/p/itm…`. The strict path regex rejected them, so stage 1 dropped valid cards; the Zebronics card was one.
  - It now strips a 2-letter locale prefix before the check and builds the clean URL from the stripped path.
  - Self-check: the `/hi/` URL now returns the pid with `/hi/` dropped, `/desidime/p/desidime_deals` still returns null, and a plain `/slug/p/itm?pid=` URL is unchanged.
  - The IFS ingest shares this lib, so it benefits too.
- **Acer:** the DesiDime outbound resolved to an itm URL with no `pid`. The pid COMHPDSBZGUAUVBT was read from the product page, and the affiliate URL was built by hand.
- **`data/dd-dead.json`:** stage 1 marked 2186163 and 2186168 as dead. Both are now live as #14269 and #14270, so leaving them there stops a re-ingest.

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (3 slugs plus `/`, `/offers` and `/sitemap.xml`).
- **New pages:** the PrettyKrafts and Acer deal pages return 200 on prod.
- **Sitemap:** ISR 1800 s, so it will carry the batch within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already reflects the batch.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The DO ingress returns 200.
- **Posts (IST 2026-10-23):** 2 (#519, #520). The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,740 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14270.
- **Broadcast cursor:** 14267, 3 behind the highest ID. That gap is this batch, waiting for the external tg-broadcast cron, so it is not rot.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
