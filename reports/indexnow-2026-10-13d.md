# INDEXNOW tick 2026-10-13d (19:23 IST)

**IndexNow returned HTTP 200 for 9 URLs.**

These are every LIVE deal and every post created in the last 6 hours, according to the DB, plus 5 hub pages. The ping used `--paths` mode with `MSYS_NO_PATHCONV=1`.

| URL | Type |
|---|---|
| `/lakme-9-to-5-eyeconic-kajal-twin-pack-of-2-kjlf7vnfp2kxucvq` | deal |
| `/longway-super-dlx-juicer-mixer-grinder-750w-4-jars-b0c33flxjj` | deal |
| `/philips-tat1269-true-wireless-earbuds-40h-ipx5-b0fhkht717` | deal |
| `/blog/how-smart-door-locks-work-battery-wifi-fingerprint-india` | post |
| `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt` | hubs |

Only 4 content URLs were created in the last 6 hours. The 16:45 DesiDime tick rejected every candidate, and the indiafreestuff and Telegram session crons are still missing.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 4 (cap reached) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,460 |
| Broadcast cursor | 12977, equal to DB max 12977 |
| Prod endpoints (7) | all 200 in 0.11–0.70s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
