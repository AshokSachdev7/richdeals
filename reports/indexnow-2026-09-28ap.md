# INDEXNOW tick — 2026-09-28ap (13:10 IST)

## Resubmit (last 6 hours)
- The window runs from 07:10 IST to 13:10 IST, using `createdAt ≥ now−6h` from the DB.
- **65 LIVE deals** fall in the window: 36 from the IFS 28am batch, plus the Telegram 28ai, 28ak and 28ao ticks, plus the other ingests in that time.
- **1 post**: `/blog/air-fryer-size-guide-litres-by-family-india-2026`.
- **5 hub URLs**: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`.
- Sent with `node apps/api/scripts/indexnow-ping.mjs --paths …` and `MSYS_NO_PATHCONV=1`.
- **Result: api.indexnow.org → HTTP 200 for 71 URLs.**
- There was no 422, so the Bing GET fallback was not needed.

## CEO audit (DB)

| Check | Result |
|---|---|
| Live deals | 11,339 |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11683 vs DB max 11686 (was 11678 last tick), so it is catching up |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
