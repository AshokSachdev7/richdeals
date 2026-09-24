# DEAL-INGEST indiafreestuff tick — 2026-09-25o (04:28 IST)

**0 pushed.** IFS has posted nothing new since tick 0925j (02:49 IST), so nothing was posted to `/admin/deals/bulk` and there was nothing to ping.

## Funnel
| Stage | Count |
|---|---|
| IFS listed (`/deals` + `/deals/superdeals`, both HTTP 200, fetched ≥2.5 s apart) | 69 |
| New (not in the 447-slug seen set) | **0** |

The newest card on the listing is still the Tasty Nibbles pickle, followed by the Frosty bottles. That is the same head as at 0925j, so the listing is unchanged. This is normal overnight, since IFS posts in daytime bursts.

## Freshness
- **IndexNow:** not run, because 0 slugs were pushed. The last ping was at tick 0925j (38 URLs, HTTP 200).
- **Sitemap and llms.txt:** unchanged by this tick.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image. Max deal id is 11130.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 04:28 IST). No finished day at 0.
- **Broadcast cursor:** 11130 (file re-read), equal to the max id, so it is caught up.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green. The tick yielded nothing because the source had nothing new.
