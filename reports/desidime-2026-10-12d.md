# DESIDIME tick 2026-10-12d (06:45 IST)

**0 of 17 fresh candidates pushed.** Nothing was sent to the bulk endpoint, so there was no IndexNow ping.

Stage 1 discovered 34 deals. 25 resolved to a product, 8 were already in the DB, and 17 were fresh. 16 of the 17 repeat the 04:46 tick (`desidime-2026-10-12c`). They were re-checked anyway, because prices can move in 2 hours. None had come back into line.

## Rejected (17)

| Deal | Reason |
|---|---|
| Butterfly Smart 750W mixer (B07CPZP4FK), **new** | Price drift: ₹2,302 listed vs ₹2,549 live. The live 5% coupon only takes it to about ₹2,422. |
| adidas Clear Factor running shoe | No price and no add-to-cart on the product page |
| Lakme Unreal compact | Price drift: ₹197 listed vs ₹201 live |
| Tommy Hilfiger Wyoming trolley | Price drift: ₹2,980 listed vs ₹3,379 live |
| JBL Grip speaker | Price drift: ₹6,119 listed vs ₹6,799 live |
| Zebronics Thunder headphones | Price drift: ₹599 listed vs ₹629 live |
| Ant Esports GW V3 wheel | Price drift: ₹3,799 listed vs ₹3,998 live; rated 3.3 |
| MILTON Pro lunch box | Price drift: ₹583 listed vs ₹719 live |
| MIOOX electric scooter | Price drift: ₹42,934 listed vs ₹45,683 live |
| Havells Shine & Chime bell | Price drift: ₹570 listed vs ₹599 live; no ratings |
| Hitachi 1T AC | No price and no add-to-cart |
| Nilkamal recliner | Price drift: ₹10,861 listed vs ₹15,190 live |
| INALSA air fryer | Marked expired on DesiDime |
| AGARO foot massager | Health device |
| Prestige Iris Plus mixer | Price is only valid with an SBI credit card |
| HAVELLS Fab Neo purifier (Flipkart) | Price drift, caught by stage 1's ld+json check |
| Parachute lotion (Flipkart) | Price drift, caught by stage 1's ld+json check |

All Amazon items were checked with a same-origin fetch of the product page in the logged-in Amazon tab.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,419 (no change) |
| Broadcast cursor | 12936, equal to DB max 12936 |
| Prod endpoints (7) | all 200 in 0.09–0.83s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
