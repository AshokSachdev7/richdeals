# INDEXNOW tick — 2026-09-25x (07:23 IST)

**IndexNow returned HTTP 200 for 41 URLs. `api.indexnow.org` accepted the batch, so the Bing GET fallback was not needed.**

## Submitted
The window is the last 6 hours, 01:23 → 07:23 IST. URLs were taken from the DB: LIVE deals by `createdAt`, and posts by `publishedAt`.

| Group | URLs |
|---|---|
| Hub pages: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` | 5 |
| LIVE deals, newest is id 11130 (Mast & Harbour driving shoes) | 35 |
| Posts: `/blog/spin-mop-vs-flat-mop-india-2026` | 1 |
| **Total** | **41** |

Command: `node scripts/indexnow-ping.mjs --paths <hubs> <urls>`, run from `apps/api`.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200 |
| Deals | 10783 LIVE, 0 PENDING_REVIEW, 0 with a null price, 0 with a null image, max id 11130 |
| Posts | 329 in total, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0. |
| Broadcast cursor | 11130 (file re-read), equal to the DB max |
| Unpushed commits | 0 |

Verdict: green.
