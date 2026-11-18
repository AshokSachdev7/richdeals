# DEAL-INGEST indiafreestuff tick — 2026-11-18i

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id. Every candidate was then verified on the live product page:

- Amazon: a same-origin fetch of the PDP in the logged-in Playwright Amazon tab, reading `.a-price-whole` in the core price block, `#availability`, the add-to-cart button and the hiRes image.
- Flipkart: an in-tab fetch, reading the ld+json `Product.offers` price and availability plus the page-state MRP.

Run at about 16:53–17:20 IST.

**Result: 6 deals pushed LIVE (#16820–16825): 5 Amazon and 1 Flipkart. The bulk endpoint returned HTTP 201 with count 6 (all `created:true`), and the readback shows all 6 LIVE. IndexNow returned HTTP 200 for 9 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards read | 91 |
| `?rto=` ids that resolved to a store | 7 |
| Dropped by stage 1 | 84 (83 redirected to the IFS homepage, 1 Flipkart `/indiafreestuff/p/` card) |
| Flipkart card recovered by in-tab fetch | 1 (TRIGGR) |
| Already in the DB, unchanged | 1 (#16819 Levi's co-ords, ₹1,287 = DB) |
| Rejected after verification | 1 |
| Pushed | 6 |

The redirector resolved 7 of 91 this tick after 0 of 85 at 18h. It is flaky rather than dead, so the IFS cron slot is **not** repointed. The repoint rule only applies when a tick resolves 0.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16820 | Amazon | B0GWJK8TKH | Storite Lightweight School Backpack for Girls 21L, Purple | ₹379 | — (nulled) |
| 16821 | Amazon | B0DCNLXW9C | Storite Women's Small Nylon Sling Crossbody Bag, Peacock Blue | ₹799 | ₹1,999 (60% off) |
| 16822 | Amazon | B0FYN24C5N | Storite 2 Pack Luggage Strap Belt with Number Lock, Rainbow | ₹299 | — (nulled) |
| 16823 | Amazon | B00GGMKKDS | Storite 30cm USB 3.0 Extension Cable, Type A Male to Female | ₹249 | — (nulled) |
| 16824 | Amazon | B0DBKWL9DK | NISUN PU Leather Professional File Folder with 20 Leafs, Green | ₹999 | — (nulled) |
| 16825 | Flipkart | ACCHR9NDQHZJHMBA | TRIGGR Trinity 1 Gen 2 Wireless Headphones with Dual Pairing, 40H Battery | ₹699 | ₹2,999 (77% off) |

## Notes

- **Verification:** every pushed row was In stock, and each Amazon row had an add-to-cart button. The PDP price matched the card to within ₹1.
- **Storite brand block:** all four Storite cards matched their PDPs, so the block passed. The seller is SaiTech IT.
- **Nulled MRPs:** those four pages show the price with no discount claim.

  | Product | Reason |
  |---|---|
  | Backpack | PDP MRP ₹2,599 would imply 85% off, over the 80% rule. |
  | Luggage straps | The PDP's struck-through ₹149.50 is a per-unit rate below the price. |
  | USB cable | No PDP MRP. The card's ₹1,499 would imply 83% off. |
  | NISUN folder | No PDP MRP. The card claimed ₹1,999. |
- **TRIGGR:** stage 1 dropped the card because IFS's `/indiafreestuff/p/` link carries no usable pid. The pid and `itm` path were resolved in the browser. The ld+json read ₹699 InStock and the page state `"mrp":2999`.
- **Affiliate matrix:**
  - Amazon: `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
  - Flipkart: `/p/itm9fb46e6cebe88?pid=ACCHR9NDQHZJHMBA&affid=djhackraj`.
  - No other store came through, so Cuelinks and InRDeals were not used.
- **Images:** from the marketplace CDNs (`m.media-amazon.com`, `rukmini1.flixcart.com`). No IFS images were used.
- **Copy:** titles and descriptions were rewritten, and no IFS text was copied.

## Rejected

| productId | Product | Reason |
|---|---|---|
| B0GXQD4VNT | Body massager | Price drift: PDP ₹999 vs card ₹979. DesiDime 18i rejected it for the same drift. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 6 new slugs, **HTTP 200 for 9 URLs** (the 6 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.64s) |
| /storite-women-s-small-nylon-sling-crossbody-bag-peacock-blue-b0dcnlxw9c | 200 (0.35s) |
| /triggr-trinity-1-gen-2-wireless-headphones-with-dual-pairing-40h-battery-acchr9ndqhzjhmba | 200 (0.17s) |
| /nisun-pu-leather-professional-file-folder-with-20-leafs-green-b0dbkwl9dk | 200 (0.23s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 17:20 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,246 = 16,246 (+6) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,825 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,823 vs 16,825 | OK. The external cron is draining this batch. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 resolved at 18h and 7 of 91 at 18i, so the slot stays on IFS. It gets repointed if a tick resolves 0 again.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): TG 17:04, SITEMON 17:50, CONTENT-SEO 18:39, DESIDIME 18:43, DEAL-INGEST 18:53, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
