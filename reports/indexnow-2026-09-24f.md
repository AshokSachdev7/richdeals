# INDEXNOW tick — 2026-09-24f (~13:45 UTC / 19:15 IST)

**api.indexnow.org → HTTP 200 for 81 URLs.** The Bing GET fallback was not needed because the response was not a 422.

## Submitted (window: last 6h)
- **76 deal pages:** LIVE deals whose `createdAt` falls within the last 6h. They are the IFS 0924e batch, both telegram batches (0924e and 0924f) and anything else that went live in the window.
- **2 blog posts:** `/blog/<slug>` for posts whose `publishedAt` falls within the last 6h.
- **3 hub paths** added by the script: `/`, `/offers`, `/sitemap.xml`.
- Total: 76 + 2 + 3 = 81. The key is `33f3a9d63ca15676bbd90586ea80e65f`, verified via `https://richdeals.in/33f3a9d63ca15676bbd90586ea80e65f.txt`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10678, max id 11025, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11025 against a max of 11025, a gap of 0.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green. Nothing to fix.
