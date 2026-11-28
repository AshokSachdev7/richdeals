# DESIDIME-INGEST tick: 2026-11-28d (about 06:30 IST)

**Result:** 0 new deals went LIVE, because there were 0 fresh candidates. All 4 LIVE duplicates were re-read on their merchant PDPs and every price matches the DB. A PriceHistory row was written for each one, which moves `priceValidUntil` forward. IndexNow returned HTTP 200 for 7 URLs.

## Stage 1

`ingest-desidime.mjs` read the `/new` and homepage cards only, with no per-deal pages.

| Step | Count |
|---|---|
| Cards discovered | 28 |
| Dropped as junk, grocery or other-store | 17 |
| Resolved to a product | 11 |
| Already in the DB (by productId) | 4 |
| Rejected in the last 24 hours (skip list) | 7 |
| Fresh | **0** |

The 7 skip-list items were Hindware geyser (Flipkart), Horlicks (JioMart), ASUS Vivobook S16, Xiaomi 65" (Flipkart), Xiaomi 43" (Amazon), a free Kindle eBooks bundle (₹0) and a Motorola air purifier (Flipkart).

## LIVE duplicates re-verified

| Deal | Store / pid | DesiDime card | PDP now | DB | Outcome |
|---|---|---|---|---|---|
| #17640 Adidas Adizero Evo SL | Myntra 44609653 | ₹8,639 | ₹8,639 (M.R.P. ₹15,999), read with curl | ₹8,639 | OK, PriceHistory 18013 |
| #17594 Dabur Odonil refill | Amazon B0CPJJDC3N | ₹170 | ₹170 (M.R.P. ₹299), in stock, add-to-cart present | ₹170 | OK, PriceHistory 18014 |
| #17504 Boldfit bicycle pump | Amazon B0G43WXXRC | ₹299 | ₹481 (M.R.P. ₹1,499), in stock, add-to-cart present | ₹481 (repriced in 11-28c) | OK, PriceHistory 18015 |
| #12224 Toshiba V37SP 50" QLED | Flipkart TVSHZTYRVBSWQJS5 | ₹24,990 | ld+json ₹29,990, InStock | ₹29,990 | OK, PriceHistory 18016 |

- **Amazon:** read with an in-tab fetch in the logged-in Playwright tab, using `#corePriceDisplay .a-price-whole`, the M.R.P. from `#centerCol`, `#availability` and the add-to-cart button. No captcha was served.
- **Flipkart:** the PDP ld+json Product offer was read in a Flipkart tab.
- **The two stale cards** (Boldfit ₹299, Toshiba ₹24,990) are DesiDime card prices; the Toshiba figure is most likely a bank-offer price. In both cases the DB follows the PDP, not the card.

## Freshness

- **IndexNow:** HTTP 200 for 7 URLs: the 4 re-verified slugs, `/`, `/offers` and `/sitemap.xml`. These were pinged because the new PriceHistory rows move each page's `priceValidUntil`.
- **Bulk push:** none, because there were 0 fresh deals.
- **Sitemap:** the deals child is the top-100 pinned set, so nothing changes there.
- **llms.txt:** generated on each request, so nothing to do.

## CEO audit (about 06:30 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.15s, `/offers` 0.07s, `/blog` 0.51s, `/sitemap.xml` 0.08s, `/feed.xml` 0.07s, `/api/deals` 0.09s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 (SITEMON 11-28g, 06:12) | OK |
| Newest deal / broadcast cursor | #17645 / 17645 | OK; the last 6 ingest ticks found 0 fresh deals that passed verification, which is source quality, not rot |
| Posts on 11-28 (IST) | 1 | CONTENT-SEO runs at 06:39 |
| Crons | 9 of 9 (SITEMON 11-28g) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. #3593 `priceValidUntil` drops today. The deploy script builds web before restarting rd-api | Carried |
