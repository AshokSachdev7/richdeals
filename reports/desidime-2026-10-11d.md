# DesiDime tick 2026-10-11d (06:47 IST)

Stage 1 found 31 deals. 24 resolved to a product page and 4 were already in the DB, which left 20 candidates. Only 1 Amazon ASIN is new since tick 10-11c (the LG TV).

## Pushed: 1

| Deal | Price | M.R.P. | Rating | Result |
|---|---|---|---|---|
| Fiama Gel Bar Soap Blackcurrant & Bearberry 1kg (125g x 8), B0DMVTBYBJ | ₹340 (card = product page) | ₹640 (47% off) | 4.4★ (5,119) | created, count 1, prod page 200 |

- Stock: add-to-cart present; `#availability` text was empty, with no low-stock warning.
- Image: hiRes `61Q3mNeC7bL`, keyed to `landingAsinColor`.
- Affiliate: `?tag=ashoksachdev-21`.
- IndexNow (slug mode, 4 URLs): **HTTP 200**.

## Rejected (19)

The DesiDime card price was the bank-card or coupon price, so the product-page price drifted:

| Item | Card | Product page | Other |
|---|---|---|---|
| LG 55" NU87 Nano 4K TV (new) | ₹35,740 | ₹40,990 | 3.9★ |
| Sony INZONE Buds | ₹12,090 | ₹15,989 | 3.5★ |
| Zebronics DDR4 | ₹7,408 | ₹10,175 | 2.0★ (2) |
| Sony MHC-V73D | ₹26,239 | ₹32,989 | |
| Sony HT-S100F | ₹6,690 | no price | no add-to-cart |
| APC UPS | ₹2,521 | ₹3,299 | |
| HP Victus | ₹72,740 | ₹92,990 | |
| Dell 15 | ₹42,740 | ₹49,990 | |
| realme Buds Wireless 3 Neo | ₹1,002 | ₹1,199 | |
| boAt Airdopes 131 Gen 2 | ₹749 | ₹799 | |
| Lenovo Yoga Slim 7 | ₹97,740 | ₹1,14,990 | |
| HP Smart Tank 720 | ₹15,949 | ₹18,699 | 3.4★ |
| Bergner kadai | ₹450 | ₹499 | 3.2★ |
| FUTOPIA all-in-one PC | ₹70,849 | ₹81,099 | |
| SleepyHug mattress | ₹5,009 | ₹5,979 | |
| TONZO projector | ₹19,949 | ₹26,699 | |

Other rejects:
- Samsung A07 (JioMart): 0 ratings.
- Steam free game: not a store product.
- Yu coconut water (Zepto): food, and no ld+json.

## CEO audit
- Posts: 2 today (IST). 0 coverless, 0 seo-less.
- Deals: 0 null price, 0 null image, 0 PENDING_REVIEW.
- 12,397 live deals. DB max id is 12914; the broadcast cursor is 12913, so the new row is waiting for the external tg-broadcast cron.
- All 7 prod endpoints return 200 (slowest: `/llms.txt` at 0.57s). 0 unpushed commits before this report.
