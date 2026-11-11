# DEAL-INGEST (indiafreestuff) — 2026-11-12a

Source: `/deals` + `/deals/superdeals`, stage 1 via `apps/api/scripts/ingest-ifs-proper.mjs`, every ASIN read on the live Amazon PDP (`#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart).

| Step | Count |
|---|---|
| Rows within ₹1 of the live PDP | 70 |
| Rejected: null price / no add-to-cart | 6 |
| Rejected: price drift >₹1 (up-drift brand blocks rejected whole) | 33 |
| Already in DB (same productId), so price-synced instead of re-pushed | 7 |
| Pushed `/admin/deals/bulk` status:live | 67 (66 Amazon + 1 Myntra) |

- Bulk push returned count 67, and the readback shows 67/67 LIVE.
- Amazon links use `/dp/ASIN?th=1&psc=1&tag=…-21`.
- The Myntra item (29629756, ₹349) goes through InRDeals.
- Images come from m.media-amazon.com and assets.myntassets.com.

Price-synced rows (prisma.update, slug unchanged): 15943→₹999, 4836→₹507, 1127→₹646, 15390→₹1241, 2565→₹266, 8843→₹493, 16147→₹274.

## Freshness

- IndexNow: **HTTP 200**, 78 urls. That is 67 new slugs, 7 synced slugs and 1 TG slug, plus `/`, `/offers` and `/sitemap.xml`.
- sitemap.xml: ISR 1800s. The deals child is top-100 by design.
- llms.txt: force-dynamic.
