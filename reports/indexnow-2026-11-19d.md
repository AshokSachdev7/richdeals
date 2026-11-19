# INDEXNOW tick — 2026-11-19d

The URL list came from the same Prisma query as 19a–19c (`apps/api/_inx1119b.cjs`). It took three groups:

- the newest 25 LIVE deals;
- every LIVE deal with a priceHistory row in the last 6 hours, excluding those 25;
- the newest 6 posts, as `/blog/<slug>`.

The list was passed to `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. That mode adds no URLs of its own, so the 9 hubs and sitemaps were listed by hand. Run at about 19:07 IST (13:37 UTC).

**Result: IndexNow returned HTTP 200 for 49 URLs. Prod returned 200 on all 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16925 to #16950 (#16928 is PENDING_REVIEW, so it is skipped) |
| Repriced in the last 6h | 9 | #360, #3221, #3538, #4722, #4792, #6027, #13345, #13527, #16171 |
| Newest posts | 6 | ids 625 to 631 |
| **Total** | **49** | **HTTP 200** |

The newest-25 group covers every push since 19c: DESIDIME 19i (#16937–#16940), TG 19s (#16941), DESIDIME 19j (#16942–#16945) and DEAL-INGEST 19j (#16946–#16950). The reprice group covers the price syncs from TG 19s (#6027) and DESIDIME 19i–19j (#13527, #360, #16171, #4792), plus earlier syncs still inside the 6-hour window.

## Freshness

- **IndexNow:** HTTP 200 for 49 URLs, listed above.
- **`sitemap.xml`:** uses ISR with an 1800s revalidate. The deals child holds only the top 100, by design.
- **`llms.txt`:** is force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (1.67s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.54s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.07s) |
| /api/deals | 200 (0.08s) |
| /llms.txt | 200 (0.38s) |

All probes used `curl -m 30`. The homepage took 1.67s against its usual 0.2s, which looks like an ISR regeneration on the first hit after this hour's pushes. It is a single sample, so it is noted here and not flagged.

## CEO audit

Run at about 19:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,341 = 16,341 | OK |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,950 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,945 vs 16,950 | Behind only by DEAL-INGEST 19j's 5 pushes from about 19:00. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

These items are carried forward and are unchanged by this tick:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- about 95% of LIVE deals have no `priceValidUntil`, because same-price confirms write no priceHistory row;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector has partly revived (7 of 92 at DEAL-INGEST 19j);
- the inflated M.R.P. list (#16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947);
- the no-buy-box watch list (#9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204);
- low-stock items (#16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946);
- the Stage 1 Flipkart gaps;
- ASIN reuse (#2351, #15344, #6989, #4097; B0C7BM7L45 on #5577 and #7673);
- the DO API token still needs rotating.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-19 19:14 |
| TG | 11-19 20:01 (this hour's run is the queued tick that follows this report) |
| DESIDIME | 11-19 20:43 |
| DEAL-INGEST | 11-19 20:53 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
