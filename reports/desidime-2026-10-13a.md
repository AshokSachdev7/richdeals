# DESIDIME tick 2026-10-13a (00:47 IST)

**0 of 15 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 16 to a single product. 1 was already in the DB, leaving 15 fresh.
- Nothing passed verification, so nothing was pushed to the bulk endpoint.
- IndexNow was not pinged because there were no new slugs.

**What failed:** every Amazon deal in this batch had a live price above the DesiDime card price. The listings were posted at prices that have since ended.

## Rejected (15)

All Amazon reads were done with a same-origin fetch in the logged-in Playwright Amazon tab (price, `#availability`, add-to-cart).

| Deal | Reason |
|---|---|
| Pigeon 1000W hair dryer (B0F2J73W4T) | Price drift: ₹475 listed vs ₹499 live |
| Lee Cooper LC07975 watch (B0D2TN18WP) | Price drift: ₹4,337 listed vs ₹4,818 live; no ratings |
| Origami 2-ply tissues, 3 packs (B0C597FX2B) | ₹145 listed vs ₹149 live; the ₹145 needs a clip coupon |
| Apple AirPods 5 (B0HJ9SC113) | Price drift: ₹12,650 listed vs ₹13,900 live |
| Godrej Neo Pro View smart lock (B0G34MC2B9) | Price drift: ₹17,749 listed vs ₹18,999 live |
| Safe-X microfiber cloth roll (B0G4WJFVHL) | Price drift: ₹99 listed vs ₹320 live |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190.50 live (fifth tick in a row) |
| Shade net clips, 30 pcs (B0HDZ2DB6J) | Price drift: ₹179 listed vs ₹297 live; only 8 ratings |
| Sparkfusion ashwagandha powder; Trunativ fiber supplement sample | Health rule |
| Saffola high-protein oats (Flipkart); churan goli (Digihaat) | Food rule |
| ADIDAS Team Court sneakers, RED TAPE casuals, women's kurta set (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,442 (no change) |
| Broadcast cursor | 12959, equal to DB max 12959 |
| Prod endpoints (7) | all 200 in 0.10–0.66s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
