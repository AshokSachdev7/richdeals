# IndexNow resubmit — 2026-09-30c (13:10 IST)

## Submitted
- **api.indexnow.org POST:** HTTP **200** for **75 URLs**. The 75 URLs are:
  - 70 LIVE deals created in the last 6h (DB `createdAt >= now-6h`)
  - 1 post created in the last 6h (`/blog/<slug>`)
  - `/blog`
  - the script's 3 fixed paths: `/`, `/offers`, `/sitemap.xml`
- **Bing GET for sitemap.xml:** HTTP **200**.
- There was no 422, so the Bing per-URL fallback was not needed.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,643 · PENDING_REVIEW 0 · null price 0 · null image 0 · DB max 12015.
- **Posts:** 3 today (IST) · coverless 0 · seo-less 0.
- **Broadcast cursor:** I re-read the file. lastId is **12012**, up from 12002 at 13:04. It is still advancing toward 12015 (self-healing), so this is not rot.
- **Prod:** 7/7 endpoints return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`).
- **Unpushed commits:** 0.

## Rot
0.
