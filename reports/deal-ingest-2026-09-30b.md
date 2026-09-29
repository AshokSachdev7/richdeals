# DEAL-INGEST indiafreestuff — 2026-09-30b

## Result: 16 new deals LIVE (count:16, all created:true)

| Store | Pushed |
|---|---|
| Amazon | 14 (`?tag=ashoksachdev-21`) |
| Myntra | 2 (InRDeals) |

IndexNow: **HTTP 200**, 19 urls (16 slugs + 3).

## Funnel
- 103 slugs discovered across 4 pages → 32 new → 30 candidates.
- Rejected (not a single product): 2 "upto N% off" hubs, 3 Caprese deals that resolved to the Flipkart `/indiafreestuff/p/indiafreestuff` tracking landing.
- Duplicate: B0CSJWNRTG Femora tawa (#11925 LIVE).
- Amazon PDP verify (#centerCol, logged-in tab), 24 checked:
  - Price drift: B0GLN6WDX5 kids keyboard (₹999 vs ₹666), B0GVKGTTLP GNC whey (₹3999 vs ₹2976), B0BYSR7ZCM Puma Max Slide (₹799 vs ₹669).
  - Out of stock / no add-to-cart: B0C7V59CFQ Duke, B099WQ8J9H Fastrack, B0CQK56FTP Shoetopia, B093TH3THH Yamaha PSR-F52.
  - Skipped: B08FRF3NQR chutney (low-ticket grocery, 1 left), B0FGQKM377 shampoo (no MRP), B0BFDX6R22 (duplicate Puma City listing, same page).
- Coupon deals are priced at the live list price. The clip coupon is stated in the copy (Attro 20%, ATTRO combo 5%, Mamaearth 5%, Swasa 3%, wrist wraps 2%).

## CEO audit
| Check | Value |
|---|---|
| Endpoints | 7/7 200 |
| Live deals | 11572 = API total |
| pending / nullPrice / nullImage | 0 / 0 / 0 |
| posts / coverless / seoless | 348 / 0 / 0 |
| posts 09-30 IST | 1 (blog cron ticks every 6h) |
| broadcast cursor | 11925 vs maxDeal 11941 (external cron, catches up next run) |
| unpushed commits | 0 |
