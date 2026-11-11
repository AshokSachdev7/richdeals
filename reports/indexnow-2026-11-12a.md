# INDEXNOW — 2026-11-12a

**Result:** IndexNow HTTP 200 for 34 URLs (slug mode, `indexnow-ping.mjs`). Session crons were 4/9 at tick start; restored to 9/9.

## URLs submitted

| Group | Count | URLs |
|---|---|---|
| Hubs (auto, slug mode) | 3 | `/`, `/offers`, `/sitemap.xml` |
| Newest LIVE deals | 25 | ids 16279–16303 |
| Newest posts | 6 | wedge-pillow-for-acid-reflux, laptop-backpack-size-litres, steel-vs-glass-vs-insulated-lunch-box, clumping cat litter, kids scooter 2w vs 3w, wallet guide |

Endpoint: api.indexnow.org (key `33f3a9d6…`), HTTP 200.

## Freshness surfaces

- `sitemap.xml`: ISR `revalidate = 1800`; deals child = top-100 indexable by design. Worst case 30 min stale.
- `llms.txt`: `force-dynamic`, rebuilt per request.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | 7/7 200 | OK |
| DB LIVE vs API | 15,734 = 15,734 | OK |
| Max deal id vs broadcast cursor | 16,303 = 16,303 (lag 0) | OK |
| PENDING_REVIEW | 2 (#16261, #16262, member queue) | OK |
| Null price / null image | 0 / 0 | OK |
| Posts total / coverless / seo-less | 482 / 0 / 0 | OK |
| Posts per IST day (11-03 → 11-12) | 4, 2, 3, 3, 3, —, 3, 3, 3, 3 | OK (11-12 = 3) |
| Session crons | 4/9 → restored 9/9 | FIXED |
| Unpushed commits | 0 | OK |

### Cron restore

Missing at tick start: TELEGRAM-DEAL-MONITOR, DEAL-INGEST, DESIDIME-INGEST, SITEMON + CEO AUDIT, AI-OVERVIEW. Recreated:

| Job | ID | Cron |
|---|---|---|
| TELEGRAM-DEAL-MONITOR | e02a6212 | `37 * * * *` |
| DEAL-INGEST | b6e40261 | `23 */2 * * *` |
| DESIDIME-INGEST | 8e8d377e | `13 */2 * * *` |
| SITEMON + CEO AUDIT | 193ceaeb | `47 * * * *` |
| AI-OVERVIEW | 3c0853db | `9 11 * * 3` |

Kept: CONTENT-SEO ea1fb506, INDEXNOW 0e95a428, SCHEMA-AUDIT 3b585b73, SEO-AUDIT-FIX 0f6a75a5. Session crons auto-expire after 7 days (~2026-11-19) and die with the session.

## Still open

- No deals ingested yet on 11-12 (max id 16,303); DEAL-INGEST + DESIDIME verify queue: 109 fresh + 7 dup ASINs pending PDP check.
- Member queue #16261 / #16262.
- IFS Flipkart null-pid cards; #11896 price drift.
- `deals.service.ts` pin-gate fix uncommitted/undeployed.
- DO API token rotation (owner).
