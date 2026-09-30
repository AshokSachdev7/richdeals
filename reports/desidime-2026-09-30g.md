# DesiDime ingest — 2026-09-30g

## Stage 1
The script discovered 29 deals. 13 resolved to a real store URL, 3 were already in the DB, and **10 fresh candidates** remained.

## Result: 0 net pushed
- **Alton Leo 2050 sink mixer (B071VZBVZB):** verified at ₹2,238. It was pushed in the same-hour IFS batch (deal-ingest-2026-09-30f), so the credit went there and no duplicate was created.
- **B0GH7FZB5Q:** rejected, rating 3.1.
- **CADLEC B0FLWTYCHK:** rejected for drift. The PDP shows ₹1,449; the card claimed ₹1,199.
- **boAt B0F8BVSK21:** rejected for drift. The PDP shows ₹799; the card claimed ₹761.
- **6 Flipkart candidates:** rejected for missing ld+json, price drift, or out of stock.

With nothing pushed, no IndexNow ping was needed. The Alton slug was already pinged with the IFS batch (HTTP 200).

## CEO audit (DB-verified)
- **Deals:** LIVE 11,614 · PENDING 0 · null price 0 · null image 0.
- **Posts:** 349 · coverless 0 · seo-less 0.
- **Posts per day (IST):** 09-29 = 4, 09-30 = 2.
- **Broadcast cursor:** 11972 vs max id 11985, normal drift.
- **Prod endpoints:** all 7 return 200.
- **Unpushed commits:** 0.
- **Result: 0 rot.**
