# DESIDIME tick 2026-10-13c (04:46 IST)

**1 of 16 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 18 to a single product. 2 were already in the DB, leaving 16 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:1`, `created:true`. Before the push, the DB had no existing row for this productId.
- The new deal page returns 200 on prod (0.29s).
- IndexNow returned HTTP 200 for 4 URLs: the slug plus the 3 hub pages.

## Pushed (1)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [LuvLap pant style baby diapers, Newborn, 120 count](https://richdeals.in/luvlap-pant-style-baby-diapers-newborn-120-b09q3cjmr9) (B09Q3CJMR9) | Amazon | ₹631 | ₹1,258 | 50% | 3.7★ (17,628) | `?tag=ashoksachdev-21` |

**How it was checked:** a same-origin fetch in the logged-in Playwright Amazon tab.

- **Price:** ₹631 against an M.R.P. of ₹1,258, with no coupon. The page's per-unit rate of ₹5.26 per count confirms the 120-count pack (631 / 120 = 5.26).
- **Stock:** `#availability` reads "In stock", the add-to-cart button is present, and there is no "only N left" warning.
- **Image:** the hiRes image belongs to the "New Born 120" variant, which is the landing variant.
- **Copy:** original. It uses only the price, count, weight range, features and rating read from the product page.

## Rejected (15)

| Deal | Reason |
|---|---|
| Janasya kurta (B0FPG7L7N4) | Price matches at ₹499, but there are only 2 ratings (0–7 rule) |
| EASYMART 40-pc wooden blocks (B0FK5KCTYX) | Price drift: ₹126 listed vs ₹57 live |
| Lifelong sandwich griller (B08LVVTGZK) | Price drift: ₹722 listed vs ₹759 live |
| BIGASUO mini projector (B0HJ5N982M) | Price drift: ₹3,135 listed vs ₹3,299 live; 0 ratings |
| JIFAR HY320 projector (B0HJD5WKWR) | Price drift: ₹3,800 listed vs ₹3,999 live |
| Godrej Interio Emperor sofa (B0FFTK3X6Q) | Price drift: ₹12,316 listed vs ₹14,490 live; only 2 left |
| MetaShot smart cricket bat (B0F3CZ4P1R) | Price drift: ₹5,579 listed vs ₹6,499 live; the lower price needs a coupon |
| Morphy Richards BlendMaster (B0CPY6ZZ6Y) | Price drift: ₹2,090 listed vs ₹2,199 live; only 1 left |
| LG 322 L refrigerator (B0GMQBMGGN) | No price and no add-to-cart button (unavailable) |
| Centuary Sleepables mattress (B0B252M1CH) | Price drift: ₹9,134 listed vs ₹11,004 live |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190.50 live (seventh tick in a row) |
| Safe-X microfiber cloth roll (B0G4WJFVHL) | Price drift: ₹99 listed vs ₹299 live |
| Trunativ fiber supplement sample (B0B59MRG9M) | Health rule |
| Lifelong mixer grinder (Myntra), RED TAPE casuals (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,444 (+1, this push) |
| Broadcast cursor | 12960 vs DB max 12961. The new deal is waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.13–0.93s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
