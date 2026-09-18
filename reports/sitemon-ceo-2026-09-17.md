# SITEMON + CEO audit — 2026-09-17 01:50 IST

Read-only run. No data fixes needed (0 LIVE deals with null price/image). No deploy.

## Prod (https://richdeals.in)

| Path | HTTP | Time | Size |
|---|---|---|---|
| / | 200 | 0.22s | 309 KB |
| /offers | 200 | 0.14s | 59 KB |
| /blog | 200 | 0.37s | 149 KB |
| /coupons | 200 | 0.22s | 374 KB |
| /freebies | 200 | 0.23s | 375 KB |
| /sitemap.xml | 200 | 0.28s | 2.0 MB, 9,270 `<loc>` |
| /feed.xml | 200 | 0.11s | 37 KB |
| /llms.txt | 200 | 0.35s | 15 KB |
| /api/deals | 200 | 0.14s | JSON, `total` 9,982, newest id 10317 |

Live deal count: prod API total 9,982 = DB LIVE 9,982. Match.
(Web `NEXT_PUBLIC_API_URL` locally is localhost:4000; prod serves the API at `/api/*`.)

## DB

| Check | Result | Verdict |
|---|---|---|
| Posts/day IST | 09-17=0 (day 1h50m old) · 09-16=3 · 09-15=3 · 09-14=4 · 09-13=4 · 09-12=3 · **09-11=0** · **09-10=0** · 09-09=3 | ROT (historical): 09-10 and 09-11 broke the never-0 rule. Last 6 days OK. Last post published 09-16 01:26 IST; 09-17 still needs 2-3. |
| Posts missing cover / seoTitle / seoDesc | 0 / 0 / 0 (of 307) | OK |
| LIVE deals null price / null image | 0 / 0 | OK (nothing to expire) |
| Deal status | LIVE 9,982 · EXPIRED 246 · PENDING_REVIEW 1 | see below |
| PENDING_REVIEW | 1: id 10150 "Ready to Play? Get Up to 50% OFF! at ₹900", member submission (submittedById 19), since 09-15 | ROT (minor): sitting 40h; looks like a sale-hub/category promo, likely reject via deal-review |
| Deals ingested/day IST | 09-16=124 · 09-15=51 · 09-14=118 · 09-13=133 · 09-12=283; newest 01:13 IST | OK (09-15 dip) |
| tg-broadcast cursor vs DB max | cursor 10317 (09-17 01:14 IST) = max id 10317, 0 LIVE above cursor | OK |
| Task `richdeals-tg-broadcast` | Ready, every 5 min, last run 01:49, Last Result 0 | OK |

## Git

| Check | Result | Verdict |
|---|---|---|
| Unpushed commits (origin/master..master) | 0 | OK |
| Working tree | 13 tracked modified/deleted (agent docs, cron-schedules, ingest.config.json, AccountClient.tsx, globals.css, EarnBanner.tsx, …) + ~1,520 untracked scratch files (`_*.mjs/.cjs/.json/.html`, `NUL`, `apps/api/.env.bak`) | ROT: uncommitted web source changes not in prod; scratch clutter; `.env.bak` must stay out of git |

## 23:48 IST tick
- Prod: 7/7 200 (/, /offers, /blog, /sitemap.xml, /feed.xml, /api/deals, /llms.txt).
- DB: live 10,013, pending 0, null price/image 0, coverless/seo-less posts 0, posts IST 09-15 3 / 09-16 3 / 09-17 3.
- Broadcast cursor 10358 = DB max 10358 (caught up). Unpushed commits 0.
- ROT: _sitemon-0917.mjs first run died `PrismaClientInitializationError: Too many database connections opened: FATAL: remaining connection slots are reserved for roles with the SUPERUSER attribute` — despite connection_limit=1. Local API (PID 7348) holds :4000 and eats slots. Retry passed. Needs permanent pool cap, owner call.
