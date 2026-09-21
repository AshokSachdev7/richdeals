# Deal outage: root cause + remediation — 2026-09-22 (IST)

## Why no new deals were coming

All scheduled work on this project runs as **session crons** (CronCreate) — they
live in memory inside a Claude session and die the moment that session exits.
The previous session closed, so all 8 jobs in `.claude/cron-schedules.md` stopped
firing. `reports/` shows the hole: last tick 2026-09-21 10:30 IST, next nothing
until this one (~14h).

`.claude/cron-schedules.md` also claims desidime (`7,37 * * * *`) and
tg-broadcast run as **external OS / Task Scheduler** cron. They do not:

    schtasks /query | grep -iE 'deal|desidime|broadcast|ingest|richdeals'  -> 0 rows

Nothing OS-level is scheduled on this machine. So when the session dies,
ingestion, broadcast and blog all stop, silently. The sources themselves
(indiafreestuff, Amazon PDPs, prod site) are healthy — nothing was broken
upstream.

## Remediation this tick

- indiafreestuff sweep → 38 candidates resolved, 33 fresh after DB dedup.
- Every ASIN price/stock read on the **PDP** in the logged-in browser (their
  listing prices drift badly). 6 dropped with cause:
  - B0F4FL29LQ, B0H2JQ28G8, B09P8K152F — no buy box
  - B0GLYZ6TB3 — 4.3x price drift + implausible MRP
  - B0H1M6C2GP — 0% off
  - B0GJZY4PT9 — near-duplicate variant of B0GJZY36S9
- 27 pushed LIVE via `scripts/push-ifs-0922.mjs` (`created=27 updated=0`).
- Freshness: `indexnow-ping.mjs` → **HTTP 200 for 30 urls** (27 slugs + 3 fixed paths).
- tg-broadcast was 27 deals behind (cursor 10808 vs max 10835) and had no cron to
  advance it — ran it manually 5x (batches of 5): **cursor 10808 → 10835**, drained.

## CEO audit

| Check | Result |
|---|---|
| prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` | 7/7 **200** |
| LIVE deals | 10488 |
| LIVE null price / null image | 0 / 0 |
| PENDING_REVIEW backlog | 0 |
| deals last 24h | 37 |
| broadcast cursor vs DB max | 10835 vs 10835 (drained this tick) |
| unpushed commits | 0 |
| coverless / seo-less posts | 0 / 0 |
| posts/day IST | 09-17=3 09-18=3 09-19=3 **09-20=2 09-21=1** 09-22=0 (at 02:00 IST) |

**ROT: blog.** Hard rule is 2-3 original posts every day. 09-21 shipped 1 — the
rule broke, same failure mode as 2026-07-25→07-27. BLOG tick spawned for 09-22
with a 3-post target. 09-22=0 is not yet rot (day is 2h old), but it only stays
that way because the tick was started here, not by any cron.

## Structural gap (unresolved, needs owner call)

Session crons cannot survive a closed session. Until something OS-level exists
(Task Scheduler entries calling the ingest/broadcast/blog scripts directly), every
outage like this one repeats the next time the session ends. Offered earlier, not
approved — no change made.
