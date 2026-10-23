# DESIDIME — 2026-10-24b (02:21 IST)

**1 deal pushed (#14522): a Sony PS5 Disc console from Blinkit via Cuelinks. This is the first Blinkit deal in the DB. All 8 Amazon candidates were rejected on the product page: 7 had a page price above the card price, and 1 had no buy box. IndexNow returned HTTP 200 for 4 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage cards:
  - The JUNK and GROCERY filters were applied.
  - Each `visit.desidime.com` Buy Now was resolved to the real merchant URL.
  - Non-Amazon prices were checked with `productLd()` (ld+json price within ±₹1, InStock).
- **Dedup:** each `productId` was checked against the live DB. The 5 fresh product IDs had 0 hits, and the PS5 pid was re-checked just before the push.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
- **Price rule:** a deal is rejected if the page price is more than ₹1 above the card price.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Junk, grocery or non-product links | −12 |
| Product URL not resolved (vivo T5 Lite Flipkart) | −1 |
| Product-resolved | 20 |
| Already in the DB | −7 |
| Fresh | 13 |
| Script SKIP (Jiomart: no ld+json; 3 Flipkart: price drift) | −4 |
| Rejected on the Amazon product page | −8 |
| **Pushed** | **1** |

## Pushed

The bulk response was `201`, `count: 1`, `created: true`. The title and description are original, and every ₹ value and % was checked against the price and MRP before posting.

| # | Store | ID | Deal | Price | MRP |
|---|---|---|---|---|---|
| 14522 | Blinkit | 1007f6836183 | Sony PlayStation 5 Disc Edition console (CFI-2116A01Y, white) | ₹65,990 | ₹69,990 (6%) |

- **Price check:** plain curl of the Blinkit page returned 200, with ld+json `price` 65990 and `InStock`.
- **Image:** the `cdn.grofers.com` product image from og:image (Blinkit's own CDN).
- **Link:** Cuelinks `linksredirect.com/?cid=527&…&url=<enc blinkit /prn/…/prid/763266>`.
- **Copy:** says plainly that Blinkit stock depends on the pin code.

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B0F8VHRFBX | Godrej 600 L side-by-side fridge | No buy box | ₹44,499 |
| B0H4GC4BFH | Haier 325 L bottom mount fridge | ₹40,990 | ₹29,490 |
| B0H2YVXLBR | DREAME D30 Ultra robot vacuum | ₹44,999 | ₹39,449 |
| B00IYF6C4Q | Jabra Link 265 training cable | ₹8,949 | ₹5,355 |
| B0GYD6YC2N | iFFALCON 75" Google TV | ₹69,999 | ₹49,999 |
| B0GYFYMLFX | IFB 222 L fridge | ₹20,990 | ₹16,740 |
| B0CF5PN648 | SleepyHug Ortho Luxe mattress | ₹8,409 | ₹5,768 |
| B0HHRB6DQG | Lenovo Idea Tab Pro Gen 2 | ₹47,999 | ₹41,999 |

- The last 4 were also rejected in 10-24a, and their page prices are unchanged.
- The card prices look like bank-offer prices. They are not the buy-box price.

Script SKIPs:

- Jiomart Maxkleen floor cleaner: the page has no ld+json.
- Flipkart Wildcraft luggage set (`STCH3JCUVUF2GBRG`), EcoLink fan and Stardom Racer fan: price drift.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs: the new slug plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14522 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the deal.
- **Prod:** `/sony-playstation-5-disc-console-cfi-2116a01y-white-1007f6836183` returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,991 LIVE (13,990 + 1). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14522.
- **Posts (IST 2026-10-24):** 1 (post 523). The IST day is under 2.5 hours old, so this is not rot. The next CONTENT-SEO tick (`9 */6`) ships #2. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14521. #14522 (this batch) is waiting for the external cron. This is normal lag.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
