# DESIDIME-INGEST tick — 2026-11-19e

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage without fetching any per-deal page. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then read on the PDP with a same-origin fetch in the logged-in Playwright tab. The price came from `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, the M.R.P. from `#centerCol`, and stock from `#availability` plus the add-to-cart button. Every productId was deduped against the live DB with Prisma. Run at about 08:30–08:48 IST.

**Result: 1 deal pushed (#16900, WINIX 5500-2 air purifier, `count: 1`). One duplicate LIVE row (#4097) was rewritten because its ASIN now sells a different product. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 7 of 7 endpoints.**

## Stage 1

| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Dropped (junk, grocery or unsupported store) | 17 |
| Product-resolved | 17 |
| Already in the DB | 6 |
| Rejected in the last 24h | 9 (iPad Air M4, iPad mini, Orient Litpod, Panasonic AC, Godrej fridge, VIP vest, LiveShop cashews, Coway Airmega 50, Dettol) |
| **Fresh** | **2** |

## Fresh candidates

| productId | Product | Card | PDP | M.R.P. | Stock | Outcome |
|---|---|---|---|---|---|---|
| B01D8DAYII | WINIX 5500-2 air purifier (True HEPA, carbon filter, PlasmaWave, rated to 1,881 sq ft) | ₹13,499 | ₹13,499 | ₹24,990 (46% off) | In stock, add-to-cart present | **Pushed as #16900**, `status: LIVE`, `created: true`. Affiliate `?tag=ashoksachdev-21`. Image from `m.media-amazon.com` hiRes. |
| B0BX9M87C1 | SANGANI kids play tent | ₹450 | ₹899 | ₹2,499 | In stock | Rejected: price drift (card price is half the PDP price). Added to `data/dd-rejected.json`, which now holds 2,119 keys. |

The title-₹ guard passed. Every ₹ figure in the title and howTo equals the price, and every ₹ figure in the description is the price or the M.R.P.

## Duplicate LIVE rows

| id | productId | DB before | PDP | Action |
|---|---|---|---|---|
| 4097 | B09FN1TRL1 | "POND'S Bright Beauty Light Crème", ₹367, no M.R.P. | POND'S Triple Vitamin Moisturising Body Lotion, 600 ml, ₹366, M.R.P. ₹915 | **ASIN reuse.** Title, description, howTo, image, price ₹366, M.R.P. ₹915 and 60% off were rewritten to match the lotion. A priceHistory row was added. The slug `ponds-bright-beauty-light-creme-b09fn1trl1` was kept so the URL does not break. |
| 16898 | B0HG5C4R4V | Beardo perfume pack, ₹663, M.R.P. ₹3,000 | Same | No write |
| 4927 | B0H36MXL3V | Bouncefit, ₹499 | ₹499. The card's ₹389 is a coupon price. The PDP M.R.P. of ₹2,999 implies 83% off, so it stays null. | No write |
| 174 | B0GZQBMXTZ | Shimmer, ₹495 | ₹495 | No write |
| 219 | B009319D46 | Creative, ₹145 | ₹145 | No write |
| 16899 | HLMHACQ5UEERWZNX | TVS Racing helmet (Flipkart), ₹1,595 | Not re-read; the card price matched the DB | No write |

## Freshness

| Check | Result |
|---|---|
| IndexNow (`indexnow-ping.mjs`, slug mode) | **HTTP 200 for 5 URLs** (the Winix and Ponds slugs plus 3 hubs) |
| New deal page on prod | `/winix-5500-2-air-purifier-true-hepa-plasmawave-b01d8dayii` returned 200 |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | force-dynamic, so it is already current |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.77s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 08:48 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,292 = 16,292 | OK (up 1 for #16900) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,900 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,899 vs 16,900 | OK. #16900 was pushed minutes ago; the external broadcast cron picks it up on its next run. |
| Local API on :4000 | Up | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. Four more same-price confirms this tick (#16898, #4927, #174, #219).
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19d. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344, #6989, and now #4097 (rewritten this tick, slug still names the old crème). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DEAL-INGEST | 08:53 |
| TG | 09:01 |
| SITEMON | 09:14 |
| DESIDIME | 10:43 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
