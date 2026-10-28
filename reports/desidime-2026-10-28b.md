# DESIDIME-INGEST · 2026-10-28b (10-28, evening IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 32 |
| Junk / grocery / other drops | 11 |
| Resolved to a product (`visit.desidime.com` → merchant) | 20 |
| Tracking landing dropped (`/flipkart/p/item?pid=`, went to dd-dead) | 1 (Lifelong LLM432 foot massager) |
| Already in the DB (dedup by `productId`) | 8 |
| Fresh | 12 (8 Amazon, 4 Flipkart) |
| Flipkart stage-1 `price-drift` (ld+json) | 3 |
| PDP-verified (Amazon in the logged-in Playwright tab, Flipkart via in-tab ld+json) | 9 |
| Rejected (price drift / no buy box) | 5 |
| **Pushed LIVE** | **4** (`HTTP 201 count=4`, all `created:true`, ids 15240–15243) |
| Unverified, skipped | 0 |

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1`, using `#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart and a `#centerCol` cross-check. There was no captcha, so the mobile-UA fallback was not needed.

| ID | Product | Card ₹ | Live ₹ | MRP pushed | Result |
|---|---|---|---|---|---|
| B0D8L8BNWG | Orient Eternal Shine 40W LED bulb | 329 | 329, add-to-cart present | null (2999 = 89%) | #15240 |
| B0GDPCTM52 | Wooden wall key holder, 5 hooks | 49 | 49 | null (799) | #15241 |
| B0HLKCR68D | Wooden Radha Krishna key holder | 39 | 39 | null (299) | #15242 |
| SMPHE29J7MB5YC2A | Dove Hairfall Rescue shampoo 1200 ml (Flipkart) | 448 | 448, InStock | 1595 (72%) | #15243 |
| B0FXFG8QL4 | Xiaomi 65" X Pro | 42999 | 56999 | — | rejected: drift |
| B0CWVX1GNX | Sony ULT900N | 9791 | 12989 | — | rejected: drift |
| B0DFLT2Q9W | IFB 6 kg washer | 19240 | 24990 | — | rejected: drift |
| B0H3PLTHSC | DROGO chair | 4778 | 5915 | — | rejected: drift |
| B0GHFS8GMH | Cruise AC | 25240 | no buy box, no add-to-cart (#centerCol shows 28,990) | — | rejected |
| ACNHJPE48MZGHEHS | TCL 1.5 T AC (Flipkart) | 30490 | 32990 | — | rejected: drift (stage 1) |
| STCHFK2CZZJHDFJS | Kamiliant luggage set (Flipkart) | 2153 | 3419 | — | rejected: drift (stage 1) |
| STCG3WC3KHR7ZBMS | Killer luggage set (Flipkart) | 2296 | 3799 | — | rejected: drift (stage 1) |

- **Dove MRP:** the card said ₹1,499 and the page says ₹1,595. The page has one `"mrp":1595` and 1595 appears 11 times, so 1595 was pushed.
- **Images:** all 4 come from the marketplace CDN (`m.media-amazon.com` / `rukminim*.flixcart.com`), and each returned HEAD 200.
- **Affiliate:** Amazon `/dp/ASIN?tag=ashoksachdev-21` with `desidime01-21` stripped. Flipkart `?pid=SMPHE29J7MB5YC2A&affid=djhackraj` with `salescueli`/`affExtParam*` stripped.
- **Preflight:** each title ₹ equals the price field, and each description ₹ is either the price or the MRP.
- **Rejects:** the 5 Amazon rejects were written to `data/dd-rejected.json` with `Date.now()`, and the 3 Flipkart rejects were stamped by the script. The file now holds 626 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 4 slugs → **HTTP 200 for 7 URLs**.
- **Prod checks:** `richdeals.in/orient-eternal-shine-40w-led-bulb-cool-white-b0d8l8bnwg` returned 200, and so did `/dove-hairfall-rescue-shampoo-1200ml-smphe29j7mb5yc2a`. The newest item on `/api/deals` is #15243.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,710 (+4) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15243 |
| Broadcast cursor | `lastId` 15243, equal to the max: the external cron has already drained this batch |
| Posts: total / coverless / missing SEO fields | 440 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 2 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 already has 2 posts, which meets the daily rule.
