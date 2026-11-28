# DESIDIME-INGEST tick: 2026-11-28e (about 08:25 IST)

**Result:** 0 new deals went LIVE, because there were 0 fresh candidates. One LIVE duplicate had a different price on its PDP and was repriced: #12909 Halonix, from ₹49 to ₹59, with a PriceHistory row. The other 3 duplicates still match the DB. IndexNow returned **HTTP 200** for 4 URLs.

## Stage 1

`ingest-desidime.mjs` read the `/new` and homepage cards only, with no per-deal pages.

| Step | Count |
|---|---|
| Cards discovered | 27 |
| Dropped as junk, grocery or other-store | 16 |
| Resolved to a product | 11 |
| Already in the DB (by productId) | 4 |
| Rejected in the last 24 hours (skip list) | 7 |
| Fresh | **0** |

The 7 skip-list items are the same as in 11-28d:
- Hindware geyser (Flipkart)
- Horlicks (JioMart)
- ASUS Vivobook S16
- Xiaomi 65" (Flipkart)
- Xiaomi 43" (Amazon)
- a free Kindle eBooks bundle (₹0)
- a Motorola air purifier (Flipkart)

## LIVE duplicates re-verified

| Deal | Store / pid | DesiDime card | PDP now | DB before | Outcome |
|---|---|---|---|---|---|
| #12909 Halonix 2-in-1 9W/0.5W bulb | Amazon B08R4DWM3N | ₹59 | ₹59 (M.R.P. ₹159), in stock, add-to-cart present | ₹49 | **Repriced** to ₹59 (63% off), PriceHistory 18031 |
| #17504 Boldfit bicycle pump | Amazon B0G43WXXRC | ₹299 | ₹481, in stock, add-to-cart present | ₹481 | OK |
| #12224 Toshiba V37SP 50" QLED | Flipkart TVSHZTYRVBSWQJS5 | ₹24,990 | ld+json ₹29,990, InStock | ₹29,990 | OK |
| #17640 Adidas Adizero Evo SL | Myntra 44609653 | ₹8,639 | ld+json ₹8,639, InStock (read with curl) | ₹8,639 | OK |

- **Halonix (new duplicate this tick):** the title, description and howTo were rewritten to ₹59 / 63%. The ₹ guard passed: every ₹ figure in the copy now equals the price (59) or the M.R.P. (159). The page returns 200 on prod.
- **Amazon:** read with an in-tab fetch in the logged-in Playwright tab, using `#corePriceDisplay .a-price-whole`, `#availability` and the add-to-cart button. No captcha was served.
- **Flipkart:** the ld+json Product offer was read with an in-tab fetch.
- **Boldfit, Toshiba, Adidas:** these already got PriceHistory rows in 11-28d (06:30). Their prices have not changed since, so no new rows were written.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the Halonix slug and returned **HTTP 200** for 4 URLs (the slug plus 3 hub URLs).
- **Bulk push:** none, because there were 0 fresh deals.
- **Sitemap:** the deals child is the top-100 pinned set, so nothing changes there.
- **llms.txt:** generated on each request, so nothing to do.

## CEO audit (about 08:06 IST, SITEMON 11-28i)

| Check | Value | Status |
|---|---|---|
| Prod | all 6 endpoints return 200, `/blog` 0.60s | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,041 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17647 / 17647 | OK |
| Posts on 11-28 (IST) | 2 / coverless 0 / missing SEO fields 0 | OK |
| Crons | 9 of 9 | OK |
| Unpushed commits | 0 before this report | OK |
| Fixed this tick | The sitemon 11-28i header had the time as 13:37 IST; it is 08:06 IST, because the clock read already included the IST offset | Fixed |
| Still open | The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
