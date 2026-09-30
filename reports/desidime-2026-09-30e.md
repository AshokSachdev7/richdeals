# DesiDime ingest — 2026-09-30e (06:45 IST)

**0 pushed · 2 candidates · 2 rejected · IndexNow skipped (no slugs)**

Stage 1 (`ingest-desidime.mjs`) handled discovery, resolution and DB dedup, and returned 2 candidates.

| id | Product | Store | Card | Live | Verdict |
|---|---|---|---|---|---|
| 2170466 | Activa 25 L geyser (WGYENAUCCHXZHMXC) | Flipkart | ₹3769 | ₹3879 (ld+json) | REJECT: drift ₹110 |
| 2168189 | boAt Airdopes 141 Gen 2 (B0F8BVSK21) | Amazon | ₹761 | ₹799 (#centerCol), MRP ₹3990, in stock, ATC yes, 3.8★ (91,040) | REJECT: drift ₹38, no clip coupon on PDP |

## CEO audit: 0 rot
- Endpoints 7/7 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- Live 11575 = API total · pending 0 · nullPrice 0 · nullImage 0
- Posts 349 · coverless 0 · seoless 0
- Posts/day IST (09-22→09-30): 3,2,3,4,4,4,4,4,2
- Broadcast cursor 11944 = maxDeal 11944
- Unpushed commits: 0
