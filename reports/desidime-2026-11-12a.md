# DESIDIME — 2026-11-12a

Swept `/new` and the homepage cards. Junk and grocery filters were applied first.

| Candidate | Verdict | Reason |
|---|---|---|
| Myntra 29629756 (LOCOMOTIVE satin shirt ₹349) | **Accepted** | Pushed in the IFS batch through InRDeals (see deal-ingest-2026-11-12a) |
| Jiomart item | Skipped | No ld+json, so the price can't be verified |
| Zepto item | Skipped | No ld+json, quick-commerce and location-locked |
| Flipkart HLMGQFVABUZACBUA | Rejected | Price drift >₹1 |
| Amazon B0HC3N7G4R | Skipped | PDP price unverified |
| Amazon B0GVNHJ3LY | Skipped | PDP price unverified |

Net new from DesiDime: 1, counted in the IFS push. IndexNow is covered by the same 200 ping.
