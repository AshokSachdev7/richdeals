# SITEMON + CEO audit tick — 2026-09-25l (03:12 IST)

**Prod is green.** Nothing is broken, so nothing needed fixing.

## Prod endpoints
| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.41 s |
| `/offers` | 200 | 0.13 s |
| `/blog` | 200 | 0.39 s |
| `/sitemap.xml` | 200 | 0.34 s |
| `/feed.xml` | 200 | 0.20 s |
| `/llms.txt` | 200 | 0.34 s |
| `/api/deals` | 200 | 0.15 s |

## Deal-count sanity
- **DB:** 10783 LIVE. Max deal id is 11130.
- **`/api/deals`:** the newest item is id 11130 (Mast & Harbour driving shoes, from the 0925j IFS batch), which matches the DB.
- **Sitemap:** lists 10097 URLs, up from 10062 at 0925i. The +35 matches the 35-deal IFS batch, so ISR has already picked it up.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):**

  | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|
  | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 1 so far |

  It is 03:12 IST, and no finished day is at 0.
- **Broadcast cursor:** 11120 (file re-read), up from 11110 at 0925k, against a max id of 11130. The external cron is working through the 0925j batch and is about 10 behind, which clears on its own.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
