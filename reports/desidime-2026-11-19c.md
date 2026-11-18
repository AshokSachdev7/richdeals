# DESIDIME-INGEST tick — 2026-11-19c

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage with no per-deal fetch, applied the JUNK and GROCERY filters, resolved Buy Now through `visit.desidime.com`, skipped productIds rejected in the last 24 hours, and deduped against live DB productIds. Duplicate LIVE rows were re-read on the PDP: Amazon through a same-origin fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, `#availability` plus the add-to-cart button, M.R.P. from `#centerCol` text), Myntra through its ld+json with curl. Run at about 04:43–04:47 IST.

**Result: 0 new deals pushed, 0 repriced. The only fresh card (Shimmer Pro Max toilet cleaner) never resolved past `visit.desidime.com` and is low-ticket FMCG, so it was rejected. All 5 duplicate LIVE rows matched their PDP price, including #219 Creative's, whose card showed ₹104 against a PDP of ₹145. With no batch there was nothing to ping. Prod returned 200 on 7 of 7 endpoints.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped (junk or other store) | 12 |
| Product-resolved | 22 |
| Already in DB | 5 |
| Rejected in the last 24 hours | 16 |
| **Fresh** | **1** |

Rejects still in the 24-hour window: Apple iPad Air M4, Orient Litpod, Apple iPad mini, Cooler Master Storm controller, FableStreet shirt, iPhone 18 Pro, Bajaj StyloHot geyser, car window shades, Miss Chase top, Open Secret cashews (Flipkart), Panasonic 1.45 ton AC, Coway Airmega 50 (Flipkart), JBL PartyBox 130, Godrej 472 L fridge, VIP Bonus vests and Dettol shower gel (Flipkart).

The fresh card, Shimmer Pro Max toilet cleaner 10L at ₹495, stopped at `visit.desidime.com/visit/home-get-deals-1/2199471` with no merchant URL and no ld+json. Stage 1 logged it to `data/dd-rejected.json` (`103fbb23ac20`). It would also fail the GROCERY/FMCG bar.

## Duplicate LIVE rows

| id | productId | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|---|
| 219 | B009319D46 | Creative's gift pack for kids | ₹104 | ₹145 | ₹145, in stock, M.R.P. ₹620 | Same-price confirm. The card figure is stale or post-coupon. |
| 4927 | B0H36MXL3V | Bouncefit MG-203 massage gun | ₹389 | ₹499 | ₹499, in stock | Same-price confirm. ₹389 is post-coupon, as in 19b. |
| 12328 | B07XY5LX2W | Cello melamine mug, set of 4 | ₹293 | ₹293 | ₹293, in stock | Same-price confirm. |
| 16884 | B0DM63JQ9Q | Istyle ribbed top | ₹289 | ₹289 | ₹289, in stock, M.R.P. ₹999 | Same-price confirm. |
| 16885 | 30918417 | KLOTTHE sherpa night suit (Myntra) | ₹649 | ₹649 | ₹649, InStock (ld+json) | Same-price confirm. |

Same-price confirms write no priceHistory row. Two M.R.P. notes, left unchanged because the price did not move: the Cello PDP showed M.R.P. ₹719 while the row carries ₹440, and the Bouncefit PDP showed ₹2,999 while the row carries none.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.18s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.59s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,284 = 16,284 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,891 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,891 = 16,891 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil` (#11896 a new FAIL in SCHEMA-AUDIT 11-19). Both need a Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no `priceValidUntil`. This tick added five more confirms that leave no trace.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a and 19b. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 04:53.
- **DesiDime yield:** 0 fresh for the second tick running. Card prices lag the PDP or show post-coupon figures, and most of the feed is already seen or rejected.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **Inflated M.R.P.s:** #16792 Bio-th implies 93% off and #16891 YOHO implies 91% off.
- **M.R.P. drift:** #12328 Cello (row ₹440, PDP ₹719) and #4927 Bouncefit (row none, PDP ₹2,999).
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio has 2 units left at ₹5,500 from a third-party seller, and #16779 Yera has 1 unit left.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): DEAL-INGEST 04:53, TG 05:01, SITEMON 05:14, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39, DESIDIME 06:43 and INDEXNOW 07:05. SCHEMA-AUDIT runs 11-20 at 04:39 and AI-OVERVIEW 11-25 at 11:39.
