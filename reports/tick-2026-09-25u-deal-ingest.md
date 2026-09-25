# DEAL-INGEST indiafreestuff tick — 2026-09-25u (06:28 IST)

**0 pushed.** IFS has posted nothing new since tick 0925j (02:49 IST). Nothing was posted to `/admin/deals/bulk`, and there was nothing to ping.

## Funnel
| Stage | Count |
|---|---|
| IFS listed (`/deals` + `/deals/superdeals`, both HTTP 200, fetched ≥2.5 s apart) | 64 unique |
| New (not in the 0925o seen set of 447 + 69 slugs) | **0** |

The listing still starts with the Tasty Nibbles pickle, then the Frosty bottles, the same as at 0925j and 0925o. It has 64 slugs instead of 69 only because 5 older cards rolled off the tail; no new cards arrived. IFS posts in daytime bursts, so a quiet listing at this hour is normal.

## Freshness
- **IndexNow:** not run, because 0 slugs were pushed. The last deal ping was at tick 0925j (38 URLs, HTTP 200).
- **Sitemap and llms.txt:** unchanged by this tick.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image. Max deal id is 11130.
- **Posts:** 329 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):**

  | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|
  | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 2 so far |

- **Broadcast cursor:** 11130 (file re-read), equal to the max id.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200. Slowest: `/blog`, 0.54 s.
- **Git:** 0 unpushed commits before this report.

Verdict: green. The tick yielded nothing because the source had nothing new.
