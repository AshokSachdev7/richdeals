# DESIDIME-INGEST tick — 2026-11-19b

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage without fetching any per-deal page. It applied the JUNK and GROCERY filters, resolved each Buy Now link through `visit.desidime.com`, and deduped by productId against the live DB. It also applied the 24-hour reject window from `data/dd-rejected.json`. Duplicate LIVE rows whose card price disagreed with the DB, or whose last verification was stale, were re-read on the Amazon PDP through a same-origin fetch in the logged-in Playwright tab. Run at about 02:40–02:48 IST.

**Result: 0 new deals pushed, because stage 1 produced 0 fresh candidates. Three duplicate LIVE rows were re-read on the PDP and all three matched the DB, so nothing was repriced and there was no batch to ping. Prod returned 200 on 7 of 7 endpoints. The DESIDIME session cron had expired after its final run and was recreated as `8ecdc597`.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped as junk, grocery or unsupported | 12 |
| Resolved to a single product | 22 |
| Already in the DB (duplicate productId) | 6 |
| Rejected in the last 24h, not re-read | 16 |
| **Fresh candidates** | **0** |

The 16 still inside the reject window: Amazon B0GQVL28XJ (iPad Air), B0H1BVGRN2 (Orient Litpod), B0HPBQNPYY (iPad mini), B0BKZVR1J8 (Cooler Master), B0GC5Q9DXF (FableStreet), B0HJBCGNFM (iPhone 18 Pro), B0HK8R1B47 (Bajaj geyser), B0CC5Y34CQ (car shade), B07L95GQTK (Miss Chase), B0GHQVNMKQ (Panasonic AC), B0HCZJTD61 (JBL), B0DB63LKMG (Godrej fridge) and B09YV753WH (VIP); Flipkart NDFGRK5DRJUZ38ZA (cashews), APFHS6VSJJKZBSZW (Coway) and CBKHEPQZ8ARJZHGG (Dettol).

## Duplicate LIVE rows

| id | productId | Product | Card | DB | PDP (this tick) | Action |
|---|---|---|---|---|---|---|
| 219 | B009319D46 | Creative's kids game pack | ₹104 | ₹145 | ₹145, in stock, add-to-cart | Kept. The card price is stale or post-coupon. |
| 4927 | B0H36MXL3V | Bouncefit MG-203 massage gun | ₹389 | ₹499 | ₹499, in stock, coupon badge shown | Kept. ₹389 is the post-coupon figure. |
| 174 | B0GZQBMXTZ | Shimmer Pro Max toilet cleaner 10L | ₹495 | ₹495 | ₹495, in stock, add-to-cart | Kept. Last verified 18:48 IST on 11-18, now re-confirmed. |
| 12328 | B07XY5LX2W | Cello mug | ₹293 | ₹293 | Not re-read | Synced in 19a, so the price is current. |
| 16884 | B0DM63JQ9Q | Istyle | ₹289 | ₹289 | Not re-read | Pushed in 19a. |
| 16885 | 30918417 | KLOTTHE (Myntra) | ₹649 | ₹649 | Not re-read | Pushed in 19a. |

A same-price confirmation writes no priceHistory row, consistent with earlier ticks.

## Freshness

- **IndexNow:** no batch this tick (0 pushed, 0 repriced), so no ping was sent.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.65s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 02:48 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,279 = 16,279 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,886 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,886 = 16,886 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Session crons vs roster | 8 of 9 found; DESIDIME missing | **Fixed.** Recreated as `8ecdc597` (`13 */2 * * *`, next run 04:43 IST). |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

The DESIDIME expiry follows TG and SITEMON earlier on 11-19: the roster jobs were created together and are reaching the 7-day limit one after another. DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX and AI-OVERVIEW are likely to lapse next. SITEMON diffs CronList against the roster every hour and recreates anything missing.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l and 19a. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 02:53.
- **DesiDime yield:** 0 fresh this tick. Card prices lag the PDP or show post-coupon figures (#219 and #4927 this tick), so the PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): DEAL-INGEST 02:53, TG 03:01, SITEMON 03:14, SCHEMA-AUDIT 04:39, DESIDIME 04:43, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39.
