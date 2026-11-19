# DEAL-INGEST indiafreestuff tick — 2026-11-19l

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, waiting 2.6s between requests. It applied the JUNK, GROCERY and RESTRICTED filters and tried to resolve every base64 `?rto=` Buy Now id to a merchant URL. During the tick the owner reported that Approve crashed on the prod admin page. That fix shipped as ba94cca and is described below. Run at about 22:53–23:10 IST (17:23–17:40 UTC).

**Result: 0 deals pushed. Stage 1 found 90 cards and resolved none of them, because every `?rto=` id returned a 302 to the IFS homepage. Later in the tick the local DB tunnel was restarted, ba94cca was deployed to the GCP prod host, and all 3 pending deals were resolved. Prod returned 200 on 7 of 7 endpoints.**

## Stage 1 and the redirector

All 90 drops have the same final URL, the IFS homepage, and stage 1 produced 0 candidates. Nothing was guessed from card titles.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19i | 0 at each tick |
| 19j | 7 of 92 |
| 19k | 0 of 92 |
| **19l** | **0 of 90** |

**Decision (now triggered):** this was the last 11-19 tick, and it resolved 0. The first 11-20 tick (00:53 IST) will run a 1-id liveness probe. If that probe fails, the tick skips the full card sweep and uses the rest of its slot for Telegram deep-history reads.

## Admin fix shipped this tick (ba94cca)

The owner sent a screenshot of `/admin?status=PENDING_REVIEW` and said that Approve was throwing an error. They also asked for a column showing who submitted each deal.

- **Cause:** `DealsService.setStatus` refuses LIVE when a deal has no image or no price, and returns HTTP 400 (`Deal needs an image and a price before it can go live.`). The admin server action rethrew that 400, so Next.js rendered it as an error page. None of the 3 pending deals has an image.
- **Fix:**
  - `setStatus` in `apps/web/src/app/admin/actions.ts` catches the API error and redirects to `/admin?err=…`, where a red banner shows the message.
  - Approve is only rendered when the deal has both an image and a price. Deals missing either show a grey "No image" or "No price" chip instead. Expire and Delete still work on every row.
- **By column:** `adminList` in `apps/api/src/deals/deals.service.ts` looks up `submittedById` against `user` (there is no Prisma relation) and returns `submittedBy`, the member's name or email. Rows without a submitter show "bot", meaning they came from an ingest.
- **Rollout:** pushed to `origin/master`, then deployed to the GCP host with `/opt/richdeals-deploy.sh`. The smoke test returned api 200 / web 308. The compiled `admin/page.js` and `deals.service.js` on the server both contain the new code, and prod `/admin` renders again.
- **The 3 pending deals:** all set to EXPIRED through the local DB tunnel (which is the prod DB). PENDING_REVIEW is now 0.

  | Id | Deal | Submitter | Outcome |
  |---|---|---|---|
  | 16928 | CH95 Curcumin at ₹599 | Ramesh (user 62) | `amzn.in/d/0anyxujg` returns 404 in the browser, so the link is dead. Expired. |
  | 16262 | "amazon deal at ₹99" | Rashmi KM (user 60) | Junk title, no image. Expired. |
  | 16261 | "amazon deal at ₹299" | Rashmi KM (user 60) | Junk title, no image. Expired. |

## Deploy path (new)

Prod is the owner's GCP VM `web-2` (34.14.145.203) running aaPanel behind Cloudflare. pm2 runs `rd-api` on :4000 and `rd-web` (`next start`) on :3010, nginx serves 80/443, and Postgres 16 runs in docker `richdeals-pg` on 127.0.0.1:5432. The repo lives at `/opt/richdeals`.

Deploy is `git push origin master`, then `ssh -i /c/ssh/gcp_root -o IdentitiesOnly=yes root@34.14.145.203 'bash /opt/richdeals-deploy.sh'`. The script pulls, runs `npm ci`, generates Prisma, builds both apps and restarts pm2, taking about 4 minutes. The old DigitalOcean `doctl` path is dead, and CLAUDE.md now documents the GCP path.

The local DB is reached through `C:sshd-db-tunnel.ps1`, which forwards 15432 to the server's 5432. Local Prisma writes are prod writes.

## Pushed

None.

## Rejected

None recorded. The 90 drops are redirector failures, not quality rejects, so `data/dd-rejected.json` was not changed.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced. |
| `sitemap.xml` | 200, unchanged by this tick (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200: total 16,360, newest id 16,968 |
| /llms.txt | 200 |

All probes used `curl -m 30`.

## CEO audit

Re-run after the tunnel was restored.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,360 = 16,360 | OK |
| PENDING_REVIEW | 0 | OK (3 expired this tick) |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,968 | OK |
| Posts | 500, 0 coverless | OK |
| Broadcast cursor vs prod max | 16,968 = 16,968 | OK |
| Local API on :4000 | `/deals` 200 | OK |
| Unpushed commits | 0 before this report | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-17 3, 11-18 3, **11-19 3**. Target met.

## Still open

- **New: `/posts` API response is 5.8MB**, above Next's 2MB data-cache limit, so rd-web never caches the posts fetch. This is a performance issue, not an outage.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic:** down about 70% since 10-28.
- **IFS redirector:** 0 of 90 at 19l. The 1-id probe at the next tick decides whether to keep sweeping.
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
| TG | 11-19 23:08 |
| SITEMON | 11-19 23:14 |
| CONTENT-SEO | 11-20 00:39 |
| DESIDIME | 11-20 00:43 |
| DEAL-INGEST | 11-20 00:53 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
