# INDEXNOW tick 2026-10-16a (~01:25 IST)

**Both pings returned HTTP 200: 39 URLs in slug mode and 9 URLs in paths mode.**

| Ping | What it covered | URLs | HTTP |
|---|---|---|---|
| Slug mode | All 35 LIVE deals created or repriced in the last 6h, plus 1 post (`/blog/wireless-android-auto-carplay-adapter-worth-it-india`). The script adds `/`, `/offers` and `/sitemap.xml`. | 39 | 200 |
| `--paths` | `/blog`, `/best`, `/freebies`, `/coupons`, `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/stores`, `/categories` | 9 | 200 |

The hubs `/stores`, `/categories`, `/best`, `/freebies` and `/coupons` all return 200 on prod.

## CEO audit

All green.

| Check | Result |
|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`) | all 200 |
| Posts per day (IST) | 10-14: 2, 10-15: 3, 10-16: 1 so far. It is 01:25 IST, and the CONTENT-SEO cron fills the rest. |
| Posts missing cover / missing SEO fields | 0 / 0 |
| LIVE deals with null price / null image / PENDING_REVIEW | 0 / 0 / 0 |
| LIVE deals / DB max id | 12,602 / 13119 |
| Newest deal age | 4 min |
| Broadcast cursor vs DB max | 13108 vs 13119. The gap is the IFS batch from minutes ago. The external tg-broadcast cron self-heals it. |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 (verified in the SITEMON tick just before this) |
