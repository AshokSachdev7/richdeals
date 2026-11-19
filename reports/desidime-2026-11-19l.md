# DESIDIME-INGEST tick — 2026-11-19l

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) was started from `apps/api` with `node -r dotenv/config`. It failed before it read any listing, so nothing was verified, deduped or pushed. The rest of the tick was spent on diagnosis, prod probes and the parts of the CEO audit that do not need the local DB. Run at about 22:43–22:51 IST (17:13–17:21 UTC).

**Result: 0 deals pushed. Stage 1 aborted with `Can't reach database server at 127.0.0.1:15432`: the local DB tunnel that `apps/api/.env` points at is down. The local API on :4000 (pid 14460) is still listening, but `/deals` returns HTTP 500. Prod is unaffected: 7 of 7 endpoints returned 200, and the prod API reports 16,359 deals with newest id 16,968, the same as SITEMON 19v.**

## Stage 1

| Check | Finding |
|---|---|
| `DATABASE_URL` in `apps/api/.env` | Points at a local tunnel, `127.0.0.1:15432/richdeals`. The file was last modified at 12:14 IST today and was not touched this tick. |
| Port 15432 | Nothing is listening. |
| Local API :4000 | Listening (pid 14460), `/deals` returns 500 because it cannot reach the same DB. |
| Tunnel origin | Not found. There is no `~/.ssh/config` entry, no cloud-sql-proxy process, and no command in this session's transcripts that opened it. |
| Concurrent activity | Another process is running `ssh root@168.144.24.63 "tar czf - … -C /var/www . /etc/nginx"`, and HEAD `dab16c7` (22:37 IST, not from this session) moved the image-upload scripts to a GCS `SPACES_ENDPOINT`. An infra migration appears to be in progress elsewhere. |

The tick did not edit `.env`, did not switch to the old DigitalOcean connection in `.env.bak`, and did not start a tunnel of its own. Those steps touch credentials, and the old DB may be stale mid-migration.

## Pushed

None.

## Repriced

None. Repricing needs the DB.

## Rejected

None recorded. Stage 1 never read the cards, so `data/dd-rejected.json` is unchanged.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced. |
| `sitemap.xml` | 200, unchanged by this tick (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.62s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.08s); total 16,359, newest id 16,968 |
| /llms.txt | 200 (0.33s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 22:51 IST. The checks marked "not run" need the local DB.

| Check | Value | Status |
|---|---|---|
| Prod API total | 16,359 | Same as 19v. Prod reads its own DB. |
| DB LIVE vs API total | Not run | Local DB unreachable |
| PENDING_REVIEW | Not run | Last known: 3 (16261, 16262, 16928) at 19v |
| Null price / null image | Not run | Last known: 0 / 0 at 19v |
| Posts | Not run | Last known: 500, 0 coverless, 0 seo-less at 19v |
| Broadcast cursor vs prod max | 16,968 = 16,968 | OK |
| Local API on :4000 | Up, `/deals` 500 | **DOWN**: no DB |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** not re-read this tick. At 19v it was 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**, so 11-19 has already met its target.

## Impact on the next ticks

DEAL-INGEST (22:53), TG (23:01) and SITEMON (23:14) all push through the local API or read the local DB. Until port 15432 is back, they can only probe prod and will push nothing.

## Still open

- **New: local DB tunnel `127.0.0.1:15432` down.** The owner needs to restart it, or confirm the migration state and the new `DATABASE_URL`.
- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** 0 of 92 at DEAL-INGEST 19k.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967.
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-19 22:53 |
| TG | 11-19 23:01 |
| SITEMON | 11-19 23:14 |
| DESIDIME | 11-20 00:43 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
