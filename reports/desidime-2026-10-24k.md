# DESIDIME — 2026-10-24k (20:24 IST)

**2 new deals pushed LIVE: 1 Amazon and 1 Flipkart.** One push (`201`, `count: 2`, both `created: true`):
- #14687 Taparia T-10L Torx screwdriver, ₹43 / ₹110 (61% off)
- #14688 ECAPT fridge child lock, ₹178

Stage 1 output 8 candidates, and 6 Flipkart cards were recovered by hand. 2 of these passed verification. The other 12 were rejected for drift, product mismatch, grocery or junk, or because the price could not be verified.

**IndexNow returned HTTP 200 for 5 URLs:** the 2 slugs plus `/`, `/offers` and `/sitemap.xml`.

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage, then applied the JUNK/GROCERY filter. It resolved each `visit.desidime.com` link to the merchant URL and ran `affiliate()`. Non-Amazon prices were checked with `productLd()`. Output went to `apps/api/_dd24k.json`.
- **Amazon check:** in-tab `fetch('/dp/ASIN?th=1&psc=1')` in the logged-in Playwright tab:
  - price from `#corePriceDisplay_desktop_feature_div .a-price-whole`
  - MRP from `.basisPrice .a-offscreen`
  - stock from `#availability` and `#add-to-cart-button`
- **Flipkart check:** in-tab fetch of the itm path in Playwright tab 2, reading the ld+json `offers.price` and `availability`. The pid was taken from the regex `itm<id>\?pid=` anchored to the product's own itm path.
- **Dedup:** neither product id was in the DB, by productId, slug or affiliateUrl.
- **Images:** both returned HTTP 200.
- **Push:** `apps/api/_dd24k-push.cjs`, built from the TG 10-24t template. The title ₹, description ₹, % and MRP-text validators all passed.
- **MRP guard:** fired for ECAPT, because 178 / 1199 = 0.148, which is at or under the 0.2 floor. MRP is stored as null, and the copy has no % or M.R.P. text.

## Candidates

| Product id | Item | Card | Page | Action |
|---|---|---|---|---|
| B07DD1HN38 | Taparia T-10L Torx screwdriver | ₹43 | ₹43 / ₹110, in stock, add-to-cart | **pushed #14687** |
| B0HNWFFSJX | Desidiya 70 m pixel string light | ₹199 | ASIN now serves a "Bottle Lights with Cork" listing at ₹49 | reject, product mismatch |
| B0GRW5BSBW | boAt CineHead E1 projector | ₹7,275 | ₹8,499 / ₹14,999 | reject, drift |
| ACCHQ5U6FEBYCWY3 | POVA AI Buds Pro (Flipkart) | — | stage-1 verify failed | reject, drift |
| TVSHBYPVTZEGGJAM | Sony BRAVIA 75" (Flipkart) | — | stage-1 verify failed | reject, drift |
| Instamart 0f427ae85ac5 | peas | — | — | reject, grocery |
| Instamart 570d98fd2cf4 | trail mix | — | — | reject, grocery |
| Sbicard | credit-card promo | — | no ld+json | reject, junk |

### Flipkart cards dropped by `affiliate()`

These had either a `/a/p/itm…` path with no pid or a `/item/p/product?pid=` link with no itm path. Each was re-resolved in the Flipkart tab:

| DesiDime id | Item | Card | Page | Action |
|---|---|---|---|---|
| 2187121 | ECAPT fridge child lock, pid LOCHYVVSCSJHAGPH, `itm5bbdb6a9dd5f6` | ₹178 / ₹1,199 | ₹178, InStock, rated 4.2 (82 ratings) | **pushed #14688** |
| 2187117 | Kenstar 45 L fridge | ₹6,640 | ₹6,990 | reject, drift |
| 2187111 | HP Victus i5-13420H | ₹78,990 | no ld+json at `/a/p/itm1692bd8b2fe84` | reject, unverifiable |
| 2187108 | Ai+ PulseTab, pid TABHJFJYFFGFDZGT | ₹12,749 | ₹13,999 | reject, drift |
| 2187094 | TCL T6D 65", pid TVSHM44HM6VHUUFQ | ₹42,028 | ₹58,990 | reject, drift |
| 2187053 | HMD Vibe2 Pro 5G | ₹14,749 | ₹16,999 | reject, drift |

- **ECAPT pid:** the first unanchored `pid=` match was LOCH388KNVGZ4KPG, which belongs to a recommended product. The pid anchored to the product's own itm path is LOCHYVVSCSJHAGPH.
- **ECAPT copy:** limited to facts on the product page (brand, function, rating). The page shows no specification list.
- **Also unrecoverable:** a Cetaphil card that links to a Flipkart play/watch URL, and a Magicpin card that links to the Play Store.
- **Already in the DB:** 7 cards.

## Fix

- **`data/dd-rejected.json`:** this tick's 6 rejects with a known product id were added with ms timestamps, taking the file from 137 to 143 entries. They are B0HNWFFSJX, B0GRW5BSBW, ACCHQ5U6FEBYCWY3, TVSHBYPVTZEGGJAM, TVSHM44HM6VHUUFQ and TABHJFJYFFGFDZGT. The Kenstar, HMD and HP cards never resolved to a pid. They are already in `dd-dead.json`, so they are skipped anyway.
- **`ingest-desidime.mjs` stage 1** now writes its own verify failures (drift, out of stock, no ld+json) to `dd-rejected.json` with `Date.now()`, so the 24-hour skip covers them. Before this, the file was only read and never written.
  - This closes the "stage 1 reads `dd-rejected.json` but never writes it" item from earlier reports.
  - Amazon rejects are still added by the tick, because stage 1 does not verify Amazon prices.
  - `node --check` passes.

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs.
- **Prod JSON-LD:** both pages return 200, and the Offer prices match the DB (43 and 178).
- **Sitemap:** ISR revalidates every 1800 s. No new static route was added.
- **`llms.txt`:** force-dynamic, so it is already current.

## CEO audit (20:24 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` return 200 on both `richdeals.in` and `richdeals-jw726.ondigitalocean.app`.
- **Deals:** 14,157 LIVE (+2), which matches the API total of 14,157, and 413 EXPIRED. The highest ID is 14688. 0 LIVE deals have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Posts per IST day:**

  | Day | Posts |
  |---|---|
  | 10-19 | 4 |
  | 10-20 | 2 |
  | 10-21 | 3 |
  | 10-22 | 3 |
  | 10-23 | 3 |
  | 10-24 | 3 |

  429 posts in total. 0 lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14688, equal to the DB maximum.
- **Unpushed commits:** 0 before this report.

## Still open

- **Gap:** `affiliate()` still drops Flipkart links that lack either a pid or an itm path. This tick, 6 cards needed recovery by hand.
- IFS card prices are unreliable (28 of 51 Amazon cards drifted at 10-24j).
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE with no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` NXDOMAIN (since 09-19). The DO API token has not been rotated.
- **Unresolved:** the chrome-devtools and reticle MCPs time out when connecting (CONNECT_TIMEOUT). Playwright covers the work.
