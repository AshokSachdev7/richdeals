# DESIDIME-INGEST tick — 2026-11-19f

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage listing cards. It did not fetch any per-deal pages. It applied the JUNK and GROCERY filters and resolved every Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were then read on the PDP in the logged-in Playwright tab. Non-Amazon candidates were checked against their `ld+json` price, which had to be within ±₹1 and InStock. Candidates were deduped by productId against the live DB, and the survivors were pushed `status:live`. Run at about 10:43–10:58 IST.

**Result: 8 deals pushed (#16902–#16909). The bulk push returned HTTP 201 with count 8, all created:true. Two duplicate LIVE rows were repriced (#13590, #2205) and #4927 got a coupon note. 6 candidates were rejected. IndexNow returned HTTP 200 for 13 URLs. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 36 |
| Dropped by JUNK / GROCERY / non-product filters | 10 |
| Resolved to a merchant URL | 24 |
| Already in the DB (productId match) | 5 |
| Rejected within the last 24h (`data/dd-rejected.json`) | 5 |
| Fresh candidates | 14 |

## Pushed

| Deal | Slug | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| #16902 | `solimo-plastic-storage-containers-set-of-6-600ml-b0cj5bhv6g` | Amazon | ₹319 | ₹1,199 | 73% |
| #16903 | `hp-all-in-one-24-ryzen-3-7320u-8gb-512gb-b0gxvcm44z` | Amazon | ₹49,993 | ₹76,527 | 35% |
| #16904 | `vgr-v-183-cordless-trimmer-for-men-b08lt5n34s` | Amazon | ₹1,149 | ₹1,899 | 39% |
| #16905 | `havells-heatking-1800w-room-heater-b0hl8wcdjm` | Amazon | ₹2,390 | ₹3,899 | 39% |
| #16906 | `halonix-jasper-neo-1000w-ceramic-room-heater-b0fvmlh3n2` | Amazon | ₹888 | ₹1,949 | 54% |
| #16907 | `havells-greta-pro-15l-storage-water-heater-b0fblvskdf` | Amazon | ₹8,945 | ₹17,890 | 50% |
| #16908 | `stanley-stht80894-1-high-pressure-foot-pump-pmpgeaz37bhzf2cn` | Flipkart | ₹862 | ₹2,499 | 66% |
| #16909 | `boat-rockerz-330-bluetooth-neckband-62217e97a771` | boAt (D2C) | ₹1,199 | ₹2,999 | 60% |

- **Affiliate links:** Amazon `/dp/ASIN?tag=ashoksachdev-21`. Flipkart `/p/itm…?pid=PMPGEAZ37BHZF2CN&affid=djhackraj`. boAt goes through Cuelinks (`linksredirect.com/?cid=527`). None of this tick's deals were from Myntra, so InRDeals was not used.
- **Havells Greta Pro #16907:** the PDP shows a ₹850 clip coupon. It is recorded as a couponNote ("Apply the ₹850 coupon on Amazon → ₹8,095"), and the stored price stays at the pre-coupon ₹8,945.
- **boAt #16909:** the DesiDime card said "Rockerz 230", but the resolved URL and the product page are for the Rockerz 330. The page was written for the 330.
- **Slugs:** all 8 slugs are ours, so none needed restoring.
- **Copy and images:** each description and set of how-to steps was written for this page, and no source text was copied. Images come from `m.media-amazon.com`, `rukmini1.flixcart.com` and boAt's Shopify CDN.
- **Prod pages:** all 8 return 200.

## Title-₹ guard

Before the POST, the script checked every ₹ figure in each title and how-to step against the numeric price, and checked each discount against `round((1 − price/mrp) × 100)`. All 8 passed.

## Duplicate LIVE rows

| Deal | Before | PDP now | Action |
|---|---|---|---|
| #13590 Crompton Star Lord 5W downlighter, pack of 10 | ₹850 | ₹944, M.R.P. ₹2,500, 62% off | Repriced. The title was rewritten to match, and a priceHistory row was written. |
| #2205 Livon Keratin shampoo 650 ml | ₹223 | ₹238, M.R.P. ₹800, 70% off | Repriced. The title was rewritten to match, and a priceHistory row was written. |
| #4927 BounceFit MG-203 massage gun | ₹499 | ₹499 plus a 20% clip coupon | Price unchanged. couponNote set to "Apply the 20% coupon on Amazon". |
| #219 | ₹145 | ₹145 | Same price, no write |
| #174 | ₹495 | ₹495 | Same price, no write |

All slugs are unchanged.

## Rejected

| Key | Product | Reason |
|---|---|---|
| B0FH6VGGGJ | Noh.Voh kids jeans | Price drift: card ₹251, PDP ₹870 |
| B0DQPYPQ31 | Redmi Note 14 Pro+ | Price drift: card ₹25,829, PDP ₹27,189 |
| B0HBC46M9H | Clazkit sink organizer | Price drift: card ₹343, PDP ₹686 |
| B0F9KBZ8W3 | ASUS monitor | Price drift: card ₹6,992, PDP ₹7,768 |
| 72c57447f24e | Tjzuh Airdopes 318 | No `ld+json` on the merchant page, so the price cannot be verified |
| aad95fbee69f | JioMart Dabur toothpaste | No `ld+json` on the merchant page, so the price cannot be verified |

All 6 keys were added to `data/dd-rejected.json`, which now holds 2,124 entries.

## Freshness

- **IndexNow:** HTTP 200 for 13 URLs. These are the 8 new slugs, the #13590 and #2205 slugs, and the 3 hubs that slug mode adds.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design, so the new pages are served `noindex,follow` until they rank into the top 100.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.66s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 10:58 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,301 = 16,301 | OK. It went up by 8 for this tick. |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,909 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,906 vs 16,909 | OK. The external broadcast cron is partway through this tick's batch and picks up the rest on its next run. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. This tick's #219, #174 and #4927 are three more examples.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19e. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DEAL-INGEST | 10:55 |
| TG | 11:01 |
| SITEMON | 11:14 |
| CONTENT-SEO | 12:39 |
| DESIDIME | 12:43 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
