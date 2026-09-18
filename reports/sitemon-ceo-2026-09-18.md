# SITEMON + CEO audit — 2026-09-18

## 00:50 IST tick
- Prod: 7/7 200 (/ 0.26s, /offers 0.14s, /blog 0.56s, /sitemap.xml 0.28s, /feed.xml 0.09s, /api/deals 0.14s, /llms.txt 0.33s).
- DB: live 10,014, pending 0, null price/image 0, coverless/seo-less posts 0.
- Posts IST: 09-16 3, 09-17 3, 09-18 1 (day 50 min old; blog cron 06:09 + 12:09 cover the remaining 1-2). Not rot.
- Broadcast cursor 10359 = DB max 10359. Unpushed commits 0. Nothing to fix inline.
- ROT open (owner call): DB pool cap (connection_limit=5&pool_timeout=20 on API Prisma URL); free-samples cluster cannibalisation (28d 6 clicks vs 90d 50, winner pos 6.9→14.2, fix = merge + 301 ~30 URLs); DesiDime Task Scheduler job `7,37 * * * *` missing.
