# INDEXNOW tick 2026-10-10b (07:23 IST)

**IndexNow returned HTTP 200 for 7 URLs.**

## What was in the last 6 hours

| Type | New in the DB | Notes |
|---|---|---|
| LIVE deals | 0 | The newest deal was created at 00:47 IST. |
| Posts | 1 | `led-batten-2ft-vs-4ft-20w-vs-36w-buying-guide-india` |

## URLs sent

Sent with `indexnow-ping.mjs --paths`, run with `MSYS_NO_PATHCONV=1` so Git Bash does not rewrite the paths:

- `/blog/led-batten-2ft-vs-4ft-20w-vs-36w-buying-guide-india`
- `/`
- `/sitemap.xml`
- `/offers`
- `/blog`
- `/feed.xml`
- `/llms.txt`

## CEO audit

| Check | Result |
|---|---|
| Audit counts | `{posts:1,cov:0,seo:0,np:0,ni:0,pend:0,live:12378,max:12895}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | All 7 return 200 |
| Broadcast cursor | 12895, equal to the DB max |
| Unpushed commits | 0 before this commit |

The audit counts are: posts today (IST), posts without a cover, posts without SEO fields, LIVE deals with no price, LIVE deals with no image, PENDING_REVIEW deals, LIVE deals, and the highest deal id in the DB.

## Flags

- **No new deals for 6.5 hours.**
  - DesiDime keeps reposting the same overnight cards, all with drifted prices.
  - The telegram-deal-monitor and deal-ingest IFS session crons are still missing; the owner can say "restore all crons" to bring them back.
- **Posts today = 1.** The CONTENT-SEO cron runs again at 12:09 and 18:09 IST.
