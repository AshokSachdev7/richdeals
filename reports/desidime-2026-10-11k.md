# DESIDIME tick 2026-10-11k (22:45 IST)

**0 of 18 fresh candidates pushed.** Nothing passed the gate.

- Stage 1 found 35 cards: 22 resolved to a product page and 4 were already in the DB, leaving 18 fresh.
- Stage 1 itself skipped 7 of them (price drift, out of stock, or no ld+json).
- No push, so no IndexNow ping.

## Rejected

| Deal | Reason |
|---|---|
| Arto acrylic drawer organiser, 2 sizes (B0D1KNLYD7 ₹629, B0D1KPR7K3 ₹499) | 1 rating each (0-7 ratings rule) |
| Wooden lace dandiya, Hammer Airflow Plus earbuds (Instamart) | Instamart is location-locked and shows no rating, so the rating can't be checked |
| Black+Decker wet & dry vacuum | Price drift: ₹2,970 listed vs ₹3,299 live |
| Prestige Iris Plus mixer, 2-pack | Price is only valid with an SBI credit card; ₹5,398 live; 2 ratings |
| Hitachi 1T AC | No add-to-cart (unavailable) |
| Aquaguard Delight RO | Price drift: ₹10,799 listed vs ₹11,999 live |
| Digimore voice amplifier | Price drift: ₹679 listed vs ₹2,659 live; rated 3.5 |
| Bergner 3 L pressure cooker | Price drift: ₹679 listed vs ₹899 live; rated 3.5 |
| Dove shampoo 1 L | Price drift: ₹455 listed vs ₹479 live |
| Cello Puro bottle | Price drift: ₹232 listed vs ₹258 live |
| Garlic, spaghetti, earrings, crystal-ball light (Instamart); Parachute lotion, Pixel 11 (Flipkart) | Skipped by stage 1: price drift, out of stock, or no ld+json. Garlic and spaghetti are food. |

Nine of these were already rejected in tick 10-11j and have not moved.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-11) | 4, at the cap |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,413, unchanged |
| Broadcast cursor | 12930, equal to DB max 12930. The external cron caught up. |
| Prod endpoints (7) | all 200 in 0.13–0.92s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
