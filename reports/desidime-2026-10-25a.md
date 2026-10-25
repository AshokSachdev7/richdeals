# DESIDIME — 2026-10-25a (10:23 IST)

**7 new deals pushed LIVE: 6 Amazon and 1 Myntra.** One push, read back from the DB as #14690–#14696, all `LIVE`:
- #14690 Mini exercise ball 25 cm, ₹129 (MRP guard fired, no % shown)
- #14691 DSC Condor Atmos leg guard, youth left, ₹688 / ₹1,679 (59% off)
- #14692 SIVON 6-piece gardening kit, ₹219 / ₹999 (78% off)
- #14693 CELLO Glassy lunch box with glass bottle, ₹702 / ₹1,849 (62% off)
- #14694 Amazon Basics Iconic lap desk, ₹1,295 / ₹3,800 (66% off)
- #14695 Coirfit OrthoCoir single mattress, ₹4,636 / ₹17,854 (74% off)
- #14696 BOROPLUS FromMaa baby soap, set of 4 (Myntra via InRDeals), ₹91 / ₹260 (65% off)

Stage 1 output 16 candidates. 7 passed verification. 7 Amazon rows were rejected for drift or a missing price, and 2 Flipkart rows were rejected in stage 1 for drift.

**IndexNow returned HTTP 200 for 10 URLs:** the 7 slugs plus `/`, `/offers` and `/sitemap.xml`.

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage and applied the JUNK/GROCERY filter. It resolved each `visit.desidime.com` link and ran `affiliate()`. Non-Amazon prices were checked with `productLd()`. Output went to `apps/api/_dd25a.json`.
- **Amazon check:** in-tab `fetch('/dp/ASIN?th=1&psc=1')` in the logged-in Playwright tab:
  - price from `#corePriceDisplay_desktop_feature_div .a-price-whole`
  - MRP from `.basisPrice .a-offscreen`
  - stock from `#availability` and `#add-to-cart-button`
  - image from `#landingImage[data-old-hires]`
- **Myntra:** stage 1 read the ld+json price (₹91) and `InStock`. The link goes through InRDeals, and the image is the myntassets CDN file.
- **Dedup:** none of the 7 product ids was in the DB.
- **Images:** all 7 returned HTTP 200. For Coirfit, `data-old-hires` was empty, so the `_SL1500_` file was derived from the `img` fallback and checked.
- **Push:** `apps/api/_dd25a-push.cjs`, built from the TG 10-24t template.
  - The validators caught a per-bar figure (₹23) in the Boroplus copy, because it was neither the price nor the MRP. That sentence was rewritten without a number, and all validators then passed.
- **MRP guard:** fired for the mini exercise ball, because 129 / 899 = 0.143, at or under the 0.2 floor. MRP is stored as null, and the copy has no % or M.R.P. text.

## Candidates

| Product id | Item | Card | Page | Action |
|---|---|---|---|---|
| B0HCV371Z8 | Mini exercise ball 25 cm | ₹129 | ₹129 / ₹899, in stock, add-to-cart | **pushed #14690** |
| B07SCDW1H9 | DSC Condor Atmos leg guard | ₹688 | ₹688 / ₹1,679, in stock, add-to-cart | **pushed #14691** |
| B0FPX4X42W | SIVON gardening kit, 6 pcs | ₹219 | ₹219 / ₹999, in stock, add-to-cart | **pushed #14692** |
| B0DXP56PMZ | CELLO Glassy lunch box | ₹702 | ₹702 / ₹1,849, in stock, add-to-cart | **pushed #14693** |
| B0DYDWFQYQ | Amazon Basics Iconic lap desk | ₹1,295 | ₹1,295 / ₹3,800, in stock, add-to-cart | **pushed #14694** |
| B0DYDVKGLN | Coirfit OrthoCoir mattress | ₹4,636 | ₹4,636 / ₹17,854, in stock, add-to-cart | **pushed #14695** |
| 0a5018a99dc7 | BOROPLUS baby soap, 4 × 75 g (Myntra) | ₹91 | ld+json ₹91, InStock | **pushed #14696** |
| B0GRCY68XY | LG 185 L fridge | — | no price, no add-to-cart | reject |
| B0BDZZ5LWD | USHA Warmboy | ₹5,262 | ₹6,897 | reject, drift |
| B0BCJVZX91 | Hindware Galaxia | ₹9,891 | ₹10,990 | reject, drift |
| B0CGN8FMJ8 | IFB microwave | ₹7,461 | ₹8,790 | reject, drift |
| B08GM5QJPR | Havells Instanio | ₹5,633 | ₹7,990 | reject, drift |
| B08H1SRXZM | Sleepyhead Flip | ₹5,706 | ₹7,819 | reject, drift |
| B0CMXRP1YS | Dylect | ₹3,850 | ₹5,499 | reject, drift |
| MOBHQDMKYG8JCE4R | Samsung S25 (Flipkart) | — | stage-1 verify failed | reject, drift |
| WMNHMJHSFZWHHU4G | Bosch washer (Flipkart) | — | stage-1 verify failed | reject, drift |

- **Pattern:** every drifted Amazon card was a large appliance whose card price was 15–30% under the product page. These look like bank-offer or exchange prices.
- **Not recovered:** a Haier AC Flipkart card that `affiliate()` dropped for lacking a pid.

## Fix

- **`data/dd-rejected.json`:** the 7 Amazon rejects were added with ms timestamps, taking the file from 145 to 152 entries. The 2 Flipkart rejects were already written by stage 1.

## Freshness

- **IndexNow:** HTTP 200 for 10 URLs.
- **Prod JSON-LD:** the Coirfit page returns 200, and its Offer price of 4636 matches the DB.
- **Sitemap:** ISR revalidates every 1800 s. No new static route was added.
- **`llms.txt`:** force-dynamic, so it is already current.

## CEO audit (10:23 IST)

- **Prod (`richdeals.in`):** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 14,166 LIVE (+7), which matches the API total of 14,166, and 412 EXPIRED. The highest ID is 14696. 0 LIVE deals have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Posts per IST day:**

  | Day | Posts |
  |---|---|
  | 10-19 | 4 |
  | 10-20 | 2 |
  | 10-21 | 3 |
  | 10-22 | 3 |
  | 10-23 | 3 |
  | 10-24 | 3 |
  | 10-25 | **0** so far |

  429 posts in total. 0 lack a cover, a seoTitle or a seoDesc.
  - **10-25 has 0 posts at 10:23 IST.** The CONTENT-SEO cron (`9 */6`) must publish at least 2 today.
- **Broadcast cursor:** 14689, 7 behind the DB maximum. The gap is this batch, and the external cron picks it up. Not rot.
- **Unpushed commits:** 0 before this report.

## Still open

- **Blog:** 10-25 IST has 0 posts. At least 2 are due today.
- **INDEXNOW:** resubmit owed for #14683 onward.
- `affiliate()` drops Flipkart links that lack either a pid or an itm path.
- IFS card prices are unreliable (28 of 51 Amazon cards drifted at 10-24j).
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE with no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` NXDOMAIN (since 09-19). The DO API token has not been rotated.
- **Unresolved:** the chrome-devtools and reticle MCPs time out when connecting (CONNECT_TIMEOUT). Playwright covers the work.
