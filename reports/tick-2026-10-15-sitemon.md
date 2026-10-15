# SITEMON + CEO audit 2026-10-15 (11:08 IST)

**All green. Nothing needed fixing.**

## Uptime (prod)

| Endpoint | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.19 s |
| `/offers` | 200 | 0.12 s |
| `/blog` | 200 | 0.67 s |
| `/sitemap.xml` | 200 | 0.13 s |
| `/feed.xml` | 200 | 0.13 s |
| `/llms.txt` | 200 | 0.61 s |
| `/api/deals` | 200 | 0.17 s |

## Deal-count sanity

- **Deals:** 12,494 LIVE; DB max id 13011.
- **Newest deal:** `/api/deals` top item = id 13011 (KURIC jet spray, the TG tick at 11:07 IST), about 1 minute old.
- **Sitemap:** 11,948 `<loc>`, up from 10,100 at 09-25z.
  - It has fewer URLs than there are LIVE deals by design: `sitemap.ts` keeps only deals that pass `dealIndexable` (the same filter as the page robots rule).
  - The TG batch is partly in already (1 of 2 checked slugs); the rest is within the 30-min ISR window.

## CEO audit (verified against DB)

| Check | Result |
|---|---|
| Posts today (IST 10-15) | 2 (cap 4). The rule is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Broadcast cursor | 12992 vs max 13011. 19 behind; the external cron is draining them and it self-heals. |
| Unpushed commits | 0 |
| CronList vs roster | 9/9 present: telegram, IFS, desidime, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX |
| Intake today | IFS +21 (11:03), desidime +2 (10:32), TG +3 (11:07) |
