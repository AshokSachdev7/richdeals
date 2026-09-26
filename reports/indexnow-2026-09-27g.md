# INDEXNOW tick 2026-09-27g (01:23 IST)

**Verdict:** IndexNow returned **HTTP 200 for 35 URLs**. The Bing fallback was not needed because there was no 422.

## Submitted
All URLs created in the last 6 hours, from the DB (`createdAt` ≥ now − 6 h):

| Group | Count | Details |
|---|---|---|
| Deals | 31 | Status LIVE. This covers TG ticks 26bg/27a and IFS 27d, from Studds Drifter through VAS pillow covers. |
| Posts | 1 | `/blog/borosilicate-vs-tempered-glass-containers-india-2026` |
| Hub paths | 3 | `/`, `/offers`, `/sitemap.xml`, added by the script |

Command used: `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs <31 deal slugs> blog/<post slug>`. Key `33f3a9d63ca15676bbd90586ea80e65f`, sent to api.indexnow.org.

## CEO audit (DB-verified)
- **Endpoints:** all 7 prod endpoints return 200.
- **Deals:** 11,192 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11539.
- **Posts:** 336, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day** (09-18 → 09-27): 2/3/2/1/3/2/3/4/4/1. No day is 0.
  - 09-27 is only about 1.5 hours old and already has 1 post, so it is on track.
- **Broadcast cursor:** 11539, equal to the DB max.
- **Git:** 0 unpushed commits before this report.
