# DEAL-INGEST indiafreestuff tick — 2026-09-22 (03:03 IST)

**Result: 0 published.** All 6 fresh candidates failed PDP verification. No batch → no IndexNow ping (correctly skipped).

## Discovery

`node apps/api/scripts/ingest-ifs-proper.mjs` over `/deals` + `/deals/superdeals`, 2600ms gap between their requests.

- 43 cards discovered, **38 resolved to a real product**.
- 5 dropped at resolve time as non-products: `prime-members-amazon-great-indian-festiv` (events page), `flipkart-bbd-the-big-billion-daysale-ear` (dl.flipkart store), `amazon-skillmatics-brand-days` (brand store), `jiomart-quick-offer--free-rs100-shopping` (jiomart root), `extra-25-off-on-woodland-footwear-snapde` (`/s?k=woodland` search).

## Dedup vs live DB

`_dedup-0922b.mjs` by resolved `productId` → **32 dups** (mostly #10809-10835 from the previous sweep), **6 fresh**.

## PDP verification — all 6 rejected

Read in the logged-in Playwright tab (profile richDeals). IFS card price is never trusted.

| ASIN | IFS card | PDP truth | Verdict |
|---|---|---|---|
| B0F4FL29LQ Tokyo Talkies Women Tops | ₹249 / ₹2,449 | no price block, no ATC, "Currently unavailable" on the variant | **DROP** — out of stock |
| B0GLYZ6TB3 HEAVENGLOW 4K Android STB | ₹2,319 / ₹18,082 | **₹10,048** / ₹15,381, in stock | **DROP** — 333% price drift |
| B0GJZY4PT9 Kids Convocation Gown + Cap | ₹130 / ₹1,599 | redirects to sibling ASIN **B0GJZJRKN5**, **₹312.98** / ₹1,599, "Only 5 left" | **DROP** — 141% drift + ASIN swap |
| B0H2JQ28G8 AMFIN 20pc Balloon Bouquet | ₹103 / ₹599 | no price, no ATC, "Temporarily out of stock" | **DROP** — out of stock |
| B0H1M6C2GP Godrej aer Plug 2 Refills | ₹179 / ₹199 | ₹179 vs ₹199 MRP = 10% off | **DROP** — discount too thin, and FMCG refill (price swings daily) |
| B09P8K152F Wonderchef Forza 19cm Cast Iron Pan | ₹399 / ₹1,200 | no price, no ATC, "Currently unavailable" | **DROP** — dead listing |

**6/6 card prices were wrong or the listing was dead** — worse than the standing ~68% lie rate, consistent with an overnight sweep where the good stock from the previous tick is already taken.

Note carried forward: `B0GJZY4PT9` silently 302s to `B0GJZJRKN5`. A pushed deal keyed on the card ASIN would have stored a product id that Amazon no longer serves. Always read `currentAsin` off the landed page, not the requested URL.

## Freshness

No deals created → `indexnow-ping.mjs` not run. Nothing to ping; sitemap and llms.txt unchanged.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-17=2 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (known, unfixable — see 09-22 telegram report) |
| coverless posts | 0 | OK |
| seo-less posts | 0 | OK |
| LIVE deals | 10,491 | OK |
| LIVE null price | 0 | OK |
| LIVE null image | 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10838 = DB max | OK |
| unpushed commits | 0 | OK |
| prod endpoints | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` | **7/7 200** |

**Standing structural risk (unchanged):** every tick runs only while this Claude session is open. `schtasks` has zero richdeals entries; session crons are in-memory. The Task Scheduler fix was offered and never approved, so nothing was changed.
