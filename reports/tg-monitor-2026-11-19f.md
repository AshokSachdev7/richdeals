# TELEGRAM-DEAL-MONITOR tick — 2026-11-19f

The tick read the Telegram Web sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, then resolved the Amazon links in the newest single-product posts. Rogerkart's `/r/` link does not follow as a redirect, so its `amazon.in/dp/` URL was read from the page HTML. Each candidate was deduped against `data/tg-multi-seen.json` and live DB productIds. Every price, including those on duplicate LIVE rows, was verified on the Amazon PDP through a same-origin fetch in the logged-in tab, reading `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, `#availability` plus the add-to-cart button, and the M.R.P. from `#centerCol` text. The two reprices were cross-checked against the mobile PDP (`/gp/aw/d/ASIN` `priceAmount`). Run at about 05:01–05:12 IST.

**Result: 0 new deals pushed. Of 9 resolved ASINs, 7 were already LIVE and 2 were seen but not in the DB. Two LIVE rows had moved on the PDP, so #16830 LEGO 77245 and #16834 Park Avenue were repriced and their copy rewritten. Five LIVE rows matched at the same price. Both non-DB candidates drifted from the channel price and were rejected. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 9 of 9 endpoints.**

## Sidebar

Only ONLINE SHOPPING DEALS and Rogerkart carried single-product posts. Skipped: RichDeals (our own channel), SB Loots (settings promo), Dealzone and CoolzTricks (category posts), Dealdost (La-Fetch bundle loot), Hidden Loot and IFS Tips (Swiggy), INDIAN CHEAP DEALS (LG sale category), NonStopDeals (Caprese category) and the iPhone rate list. From ONLINE SHOPPING DEALS, Nescafé (grocery), Mildy B0FYXSHXYH (drift reject in 19e) and YOHO (already #16891) were also skipped.

## Pushed

None. Every candidate either matched an existing LIVE row or drifted on the PDP.

## Rejected

| Product | Store | Channel | PDP | Reason |
|---|---|---|---|---|
| Milton Pro Cook set (B0B5XQMLJM) | Amazon | ₹1,555 | ₹1,994, M.R.P. ₹5,155 | Drift |
| Gulf Zipp engine oil (B0CCPFPBKM) | Amazon | ₹225 | ₹319, M.R.P. ₹481 | Drift |

The seen list grew from 5,494 to 5,495 (B0DHSDWPP2, the only resolved ASIN not already on it).

## Repriced (duplicate reposts)

| id | Before | After (PDP) | Slug |
|---|---|---|---|
| 16830 LEGO Speed Champions Aston Martin F1 AMR24 77245 | ₹319, M.R.P. ₹359 (11% off) | ₹2,499, M.R.P. ₹2,999 (17% off), mobile PDP ₹2,499 | `lego-speed-champions-aston-martin-aramco-f1-amr24-77245-b0dhsdwpp2` |
| 16834 Park Avenue Good Morning after shave 100ml | ₹112 (50% off) | ₹180, M.R.P. ₹225 (20% off), mobile PDP ₹180 | `park-avenue-good-morning-after-shave-lotion-for-men-100ml-b075km119j` |

Each update went through `prisma.deal.update` with a new priceHistory row, and every ₹ figure and percentage in the title and description was rewritten and checked against the new `price` and M.R.P. Neither howTo carries a ₹ figure. The channel still quoted ₹319 for the LEGO set, which the desktop and mobile PDPs both contradict. #16830's description now says the earlier low price has ended, and #16834 dropped its stale low-stock line. Prod's Offer for #16830 already shows `"price":"2499"`.

## Same-price confirms

| id | Product | PDP |
|---|---|---|
| 16832 | LEGO 77237 Dodge Challenger SRT Hellcat | ₹319, M.R.P. ₹359, in stock |
| 16887 | Old Spice Bearglove 3-in-1 shower gel 400ml | ₹359, M.R.P. ₹449, in stock |
| 16888 | Gulf Pride Scooter Plus 10W-30 800ml | ₹239, M.R.P. ₹380, in stock |
| 16882 | Arshan iron hammered kadhai 22cm | ₹297, in stock. The PDP shows an M.R.P. of ₹2,999, implying 90% off, which looks inflated. The row keeps its null M.R.P. |
| 16886 | Fastrack 9 to Fine metal-strap watch (Rogerkart) | ₹1,182, M.R.P. ₹3,195, in stock |

Same-price confirms write no priceHistory row.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 repriced slugs, **HTTP 200 for 5 URLs** (2 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.67s) |
| LEGO 77245 slug | 200 (0.35s) |
| Park Avenue slug | 200 (0.18s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 05:12 IST.

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
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a, 19b and 19c. If every remaining 11-19 tick resolves 0, the first 11-20 DEAL-INGEST tick repoints the slot to Telegram deep-history reads.
- **DesiDime yield:** 0 fresh for two ticks running.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **Inflated M.R.P.s:** #16792 Bio-th implies 93% off and #16891 YOHO implies 91% off. The #16882 kadhai PDP shows ₹2,999 (90% off), which was not written to the row.
- **M.R.P. drift:** #12328 Cello (row ₹440, PDP ₹719) and #4927 Bouncefit (row none, PDP ₹2,999).
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`. This tick fixed two of them.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio has 2 units left at ₹5,500 from a third-party seller, and #16779 Yera has 1 unit left.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): SITEMON 05:14, SEO-AUDIT-FIX 05:58, TG 06:01, CONTENT-SEO 06:39, DESIDIME 06:43, DEAL-INGEST 06:53 and INDEXNOW 07:05. SCHEMA-AUDIT runs 11-20 at 04:39 and AI-OVERVIEW 11-25 at 11:39.
