# DEAL-INGEST indiafreestuff tick — 2026-11-20c

This tick ran the liveness probe agreed at 19l instead of a full stage 1 sweep. It fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA (both 200) and probed the newest base64 `?rto=` Buy Now id from each with `curl -s -o NUL -w '%{http_code} %{redirect_url}'`. With the redirector still dead, the rest of the slot went to the two PRIORITY stale-Offer rows from SCHEMA-AUDIT 11-20. Both were read on the Flipkart PDP in the Playwright richDeals tab and re-priced in place. Run at about 04:53–05:10 IST on 11-20.

**Result: 0 new deals pushed, because both probed ids returned a 302 to the IFS homepage. 2 LIVE rows were re-priced (#11896 and #14635), which fixes the stale Offers: both now serve the PDP price with `priceValidUntil` 2026-12-03. IndexNow returned HTTP 200. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Source | Result |
|---|---|---|
| `MzA4NTMyMzY1OQ==` | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `Mjk4NDYyNDg0MQ==` | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |

The top ids are the same as at 20b. IFS has posted nothing new in the last 2 hours.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 19j | 7 of 92 (last non-zero tick) |
| 19k | 0 of 92 |
| 19l | 0 of 90 |
| 20a | 0 of 3 probed |
| 20b | 0 of 2 probed |
| **20c** | **0 of 2 probed** |

**Plan (unchanged):** this slot stays probe-only for all of 11-20. If every 11-20 tick is 0, repoint the `23 */2 * * *` slot to another source at the first 11-21 tick. Until then, the spare time in each tick goes to stale-Offer re-prices, as it did here.

## Pushed

None. No bulk POST was made, so there is no count to read.

## Repriced

Each PDP was read in the logged-in Playwright tab, because curl gets a reCAPTCHA 403 on Flipkart. The price and availability come from the Product ld+json and were cross-checked against the visible text next to the title. Each row got a `prisma.deal.update` (price, discountPct, the ₹ in the title, a rewritten description) and a new `PriceHistory` row. Both rows stay LIVE.

| Row | Old | PDP read | New |
|---|---|---|---|
| #11896 American Tourister 17" Valex laptop backpack | ₹899, 64% off | ld+json ₹1,299, InStock, add-to-cart present. M.R.P. ₹2,500, 48% off, 4.4 stars (1,921 ratings) | ₹1,299, 48% off. Title "…at ₹1,299 (48% Off) – Flipkart" |
| #14635 Mivi DuoPods Zig TWS earbuds | ₹599 | ld+json ₹699, InStock, add-to-cart present. 3.8 stars (1,839 ratings) | ₹699. `mrp` left null on purpose |

- #11896 also shows "Buy at ₹1,234" with a bank offer. That price depends on the card used, so the stored price is the ld+json ₹1,299.
- #14635's page shows M.R.P. ₹3,999 ("Hot Deal 83%"). That M.R.P. looks inflated, so it was not stored and no discount is claimed.

**Schema check after the update:** both prod pages now serve the new Offer.

| Slug | Offer |
|---|---|
| `american-tourister-17-inch-valex-laptop-backpack-ltbgu8qbxr5qdjrv` | price 1299, InStock, `priceValidUntil` 2026-12-03 |
| `mivi-duopods-zig-tws-earbuds-ai-enc-70h-acchhu6qs5qy7xhn` | price 699, InStock, `priceValidUntil` 2026-12-03 |

## Freshness

- `node apps/api/scripts/indexnow-ping.mjs` was run with both slugs and returned **"IndexNow -> HTTP 200 for 5 urls"** (the 2 slugs plus the 3 hub URLs).
- `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200. No new static route was added.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.22s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.47s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` and `-b` existed, so this report uses suffix `c` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day is about 5 hours old, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`. The GSC top rows (#2321, #3492, #3506, #4188) lapse on 11-26 unless they are re-checked first.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965. #14635 shows an inflated M.R.P. on Flipkart, but it is not stored.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 05:01 |
| SITEMON | 11-20 05:14 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| DESIDIME | 11-20 06:43 |
| DEAL-INGEST | 11-20 06:53 |
| INDEXNOW | 11-20 07:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| AI-OVERVIEW | 11-25 11:39 |
