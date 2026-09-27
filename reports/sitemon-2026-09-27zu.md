# SITEMON + CEO audit 2026-09-27zu (~21:20 IST)

**Result:** all 7 prod endpoints are up and the audit found no rot. There was nothing to fix.

## Endpoints
| Path | Status | Time |
|---|---|---|
| / | 200 | 0.28s |
| /offers | 200 | 0.15s |
| /blog | 200 | 0.61s |
| /sitemap.xml | 200 | 0.10s |
| /feed.xml | 200 | 0.09s |
| /llms.txt | 200 | 0.77s |
| /api/deals | 200 | 0.14s |

## Deal-count sanity
- **DB:** 11,254 live deals, 2 more than at 27zs (the 27zt TG batch).
- **`/api/deals`:** total 11,254, and the newest item is id 11601 (the 27zt Lotus gel creme). Both match the DB.
- **`sitemap.xml`:** 10,579 `<loc>` entries, up 2 from 10,577. ISR has picked up 27zt.
  - A streamed `curl | grep -c` first read only 19 and looked like the sitemap had collapsed to static routes.
  - Re-fetching into a file (`x-nextjs-cache: HIT`) gave the full 10,579. It was a false alarm: count from a saved file, never a live pipe.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Posts missing cover or SEO fields | 0 of 338 |
| Live deals with null price or image | 0 |
| Pending review | 0 |
| Broadcast cursor | 11601, equal to DB max 11601. I re-read the file: the 27zt batch is broadcast. Fully caught up. |
| Unpushed commits | 0 (checked after `git fetch`) |

**Ops note:** the session's local API shell (:4000) was reaped under memory pressure. It was not restarted. Prod is unaffected, since it runs on DO.
