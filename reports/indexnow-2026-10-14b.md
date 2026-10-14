# INDEXNOW tick 2026-10-14b (23:52 IST)

**7 URLs submitted. IndexNow returned HTTP 200.**

From the DB, the last 6 hours (LIVE only) contained 1 deal and 1 post. The 5 hub URLs were added by hand, since `--paths` mode adds nothing on its own.

| Type | URL |
|---|---|
| Deal | `/motorola-amphisoundx-200w-2-1-bluetooth-soundbar-accgxtst9dghvpsb` |
| Post | `/blog/what-is-tds-in-water-how-to-check-at-home-india` |
| Hubs | `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt` |

Command: `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths …`, with `MSYS_NO_PATHCONV=1` so Git Bash does not rewrite the paths.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-14) | 2 (cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,468 |
| Newest deal | 2026-10-14 23:45 IST (DesiDime tick c) |
| Broadcast cursor | 12984 vs DB max 12985. The 1-row lag is the external cron's next run picking up that push. |
| Prod endpoints (7) | all 200 in 0.12–0.81s |
| Unpushed commits | 0 before the reports |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
