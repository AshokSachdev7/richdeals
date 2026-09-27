# SITEMON + CEO audit 2026-09-27zg (~10:51 IST)

**Result:** all 7 prod endpoints are up and the audit found no rot. There was nothing to fix.

## Endpoints
| Path | Status | Time |
|---|---|---|
| / | 200 | 0.24s |
| /offers | 200 | 0.13s |
| /blog | 200 | 0.57s |
| /sitemap.xml | 200 | 0.30s |
| /feed.xml | 200 | 0.12s |
| /llms.txt | 200 | 0.37s |
| /api/deals | 200 | 0.10s |

## Deal-count sanity
- **DB:** 11,220 live deals (11,205 before the 27zf IFS batch added 15).
- **`/api/deals`:** the newest item is id 11567, which is the DB max.
- **`sitemap.xml`:** 10,544 `<loc>` entries, 15 more than the 10,529 at tick 27za. ISR has picked up the 27zf batch.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Posts today (IST) | 2 (the rule is 2–3; the CONTENT-SEO cron runs later) |
| Posts missing cover or SEO fields | 0 |
| Live deals with null price or image | 0 |
| Pending review | 0 |
| Broadcast cursor | 11562, DB max 11567. I re-read the file: it moved from 11552 since 27zf, so the external cron is working through the batch. Not rot. |
| Unpushed commits | 0 |
