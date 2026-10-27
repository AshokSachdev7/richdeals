# DESIDIME-INGEST · 2026-10-27e (~03:10Z / 08:40 IST 10-27)

## Funnel

| Stage | Count |
|---|---|
| Stage-1 candidates (`/new` + homepage cards, no per-deal fetch) | 9 after JUNK/GROCERY/RESTRICTED |
| Dropped in stage 1 | Amazon gift-card promotion (`/promotion/psp/`) |
| DB dedup by resolved productId | 0 hits |
| Price-verified | 7 |
| Rejected | 1 (price drift) |
| **Pushed LIVE** | **7** (`HTTP 201 count=7`, all `created:true`) |

## Verify table

Amazon PDPs were read in the logged-in Playwright tab (same-origin `fetch('/dp/ASIN')`, `.a-price-whole` + `#availability` + add-to-cart). Myntra was read with `productLd()` on the clean `/19219068` URL.

| ID | Product | Card ₹ / MRP | Live ₹ | Stock | Result |
|---|---|---|---|---|---|
| B0B7NM8MVL | GM 1000W immersion rod | 359 / 750 | 359 | In stock | Pushed (52% off, MRP kept) |
| B0CZ9KWD6Q | Milton Decker lunch box | 560 / 1750 | 560 | In stock | Pushed (68% off, MRP kept) |
| B0C8MTWMK2 | Samsung 24" FHD IPS 75Hz monitor | 1651 / 17000 | 1651 | "Only 1 left", sold by Clicktech Retail, ships from Amazon | Pushed, MRP nulled (90%) |
| B0GKG8TH3S | Yera Prima Oak glasses ×4 | 231 / 2038 | 231 | In stock | Pushed, MRP nulled (88.7%) |
| B0GNB11LG5 | OnePlus Type-C → 3.5mm adapter ×2 | 79 / 999 | 79 | In stock | Pushed, MRP nulled (92%) |
| B09J56LJZK | Pure Source India ceramic vase | 75 / 599 | **74** | In stock | Pushed at live ₹74, MRP nulled (87.6%) |
| Myntra 19219068 | BLAUPUNKT SBA20 16W soundbar | 849 / 3499 | 849 | InStock | Pushed (75.7%, MRP kept), InRDeals link |
| B0177FJWAE | Wood Delmonte dining set | 57,781 | 61,281 | — | **Rejected**: ₹3,500 drift, added to `data/dd-rejected.json` (epoch ms) |

All 7 images returned HEAD 200. Prod spot checks returned 200 for the Samsung and BLAUPUNKT pages.

## Fix: Myntra productId (cross-source dedup was blind)

`affiliate()` in `apps/api/scripts/lib/ingest-common.mjs` fell through to the generic branch for Myntra. That branch keys on an md5 of the path, so the soundbar came out as `5b344cba97ee`, and the link kept DesiDime's `campaign_id=gh_flash&pub_id=7`. TG and IFS store the numeric style id, so the same Myntra product could land twice.

- **Code:** Myntra now keys on the numeric style id and links bare `https://www.myntra.com/<id>`, wrapped in InRDeals. Asserted on `/product/p/p/19219068/buy?...` → `19219068`, `/31810921` → `31810921`, `/hand-towels` → null.
- **Backfill:** 312 Myntra rows, 233 with non-numeric pids. **121 rows** (116 LIVE) carried a numeric id in their URL with no `(storeId, productId)` collision, and were updated to it. 0 failures. Slugs untouched.
- **Left:** 22 LIVE Myntra rows are still non-numeric. Either no style id in the URL, or the id already belongs to another Myntra row (a same-product duplicate page). They stay as-is; not worth a merge pass for 22 rows.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with 7 slugs → **HTTP 200 for 10 URLs** (slugs + `/`, `/offers`, `/sitemap.xml`).
- **Sitemap:** ISR 1800s; the deals sitemap is the top-100 indexable set by design.
- **llms.txt:** force-dynamic, so it picks the batch up on the next request.

## CEO audit (DB re-read at ~03:10Z)

| Check | Result |
|---|---|
| LIVE deals | 14,553 (+7) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Max deal id | 15087 |
| Broadcast cursor | `lastId` 15080. That is 7 behind because this batch just landed; the external tg-broadcast cron drains it next run |
| Unpushed commits | 0 before this commit |

Nothing else is rotting. The Myntra pid blind spot was the only rot found, and it is fixed above.
