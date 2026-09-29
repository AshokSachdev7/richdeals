# DesiDime ingest — 2026-09-30b

Stage 1 found 35 cards. After the DB dedup, 3 candidates were fresh. 1 was pushed LIVE.

| Candidate | Store | Product-page check | Result |
|---|---|---|---|
| JBL Vibe Beam 2 ANC earbuds, Black (B0DN45YMP6) | Amazon | ₹2999, M.R.P. ₹7499 (60% off; the card said ₹7999), rated 4.2 by 7,114, add-to-cart present | **LIVE** |
| boAt Airdopes 141 Gen 2 (B0F8BVSK21) | Amazon | Product page shows ₹799 vs ₹761 on the card (₹38 drift; the ₹761 is likely a card-only price) | REJECT |
| Activa 25 L geyser (WGYENAUCCHXZHMXC) | Flipkart | Stage-1 script flagged price drift | REJECT |

- Push: `/admin/deals/bulk` returned count 1, created true. Slug `jbl-vibe-beam-2-anc-earbuds-black-b0dn45ymp6`, page returns 200.
- IndexNow: **HTTP 200**, 4 URLs.

## CEO audit
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200.
- Live deals 11573, the same as the API total. Pending 0, nullPrice 0, nullImage 0.
- Posts: 348 total, 0 without a cover, 0 without SEO fields. 1 post on 09-30 (IST).
- Broadcast cursor 11935 vs max deal 11942. The external cron catches up; not rot.
- Unpushed commits: 0.
