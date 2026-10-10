# DesiDime tick 2026-10-10h (22:16 IST)

Stage 1: 33 discovered, 16 product-resolved, 1 already in DB, 15 fresh.

## Pushed (4, `/admin/deals/bulk` count 4, all created, ids 12900-12903)

| ASIN | Deal | Price / M.R.P. | Off | Rating |
|---|---|---|---|---|
| B0CV7ST9PQ | EVEREADY 20W LED batten tubelight | ₹125 / ₹239 | 48% | 3.8★ (2,174) |
| B00W1SO13G | Origami So Soft 2 ply facial tissues, 4-pack | ₹149 / ₹390 | 62% | 4.2★ (7,123) |
| B08VNYBLB1 | CELLBELL Desire C104 mesh office chair | ₹2,899 / ₹3,599 | 19% | 4.0★ (10,616) |
| B0FQBP9XJ5 | PrettyKrafts 60L laundry basket with lid | ₹899 / ₹2,999 | 70% | 4.0★ (458) |

All verified on the PDP in the logged-in Amazon tab: price, In stock, add-to-cart present.

IndexNow: HTTP 200 for 7 URLs (4 slugs + 3 hub URLs).

## Rejected (11)

- Ajio ×5 (kajal, Philips trimmer, moisturizer, vitamin C serum, mousse foundation): no ld+json, so the price can't be verified. Most are also beauty/health items.
- Flipkart Aquaguard Enrich Glory RO: price drift.
- Instamart Philips NA120 air fryer: price drift.
- Waterbury's Compound: health product.
- Xiaomi 43" FX Pro B0F3JKY28G: card ₹19,337 vs PDP ₹26,999, drift (repeat).
- Lenovo IdeaCentre AIO B0HC6RKFNN: [SBI CC EMI] card-only price.
- HP Victus B0GVRZD89W: card ₹80,740 vs PDP ₹1,07,990, drift.

## CEO audit

- 2 posts today (IST), 0 coverless, 0 seo-less.
- 0 null-price, 0 null-image, 0 PENDING_REVIEW.
- 12,386 live deals, max id 12903.
- Broadcast cursor 12899 trails max by 4 (just pushed; the external cron self-heals).
- All 7 prod endpoints return 200.
- 0 unpushed commits before this report.
