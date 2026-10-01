# INDEXNOW — 2026-10-01 (13:10 IST)

**One batch was sent to api.indexnow.org: HTTP 200 for 64 URLs.** No 422, so the Bing GET fallback was not needed.

## URLs submitted (6h window)

- 59 LIVE deals created in the last 6h: the IFS batch of 22, DesiDime 3, Telegram, plus earlier ticks.
- 1 post: `/blog/extension-board-vs-surge-protector-6a-vs-16a-india`.
- 4 hubs: `/`, `/offers`, `/blog`, `/sitemap.xml`.
- Sent with `indexnow-ping.mjs --paths`. The script undoes the MSYS path rewrite, so none of the paths were mangled.

## CEO audit

- Prod endpoints 7/7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`.
- LIVE 11,778 · PENDING 0 · LIVE null price 0 / null image 0 · max id 12,256.
- Posts 354, coverless 0, seo-less 0. IST posts/day: 09-30 4, 10-01 3 (met).
- Broadcast cursor 12,251 < max 12,256: the external cron is catching up (self-heals).
- Unpushed commits 0 before this report.
