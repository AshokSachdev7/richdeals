# INDEXNOW tick 2026-10-19a (11:15 IST)

I resubmitted everything new in the last 6 hours from the DB:
- **18 LIVE deal slugs** created in the window (the IFS 10-19b, TG 10-19a/b and DesiDime 10-19a batches), sent in slug mode, which adds 3 hub URLs. **HTTP 200 for 21 URLs.**
- **Hubs plus the newest post,** sent with `--paths` and `MSYS_NO_PATHCONV=1`: `/sitemap.xml`, `/offers`, `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, and `/blog/usb-c-vs-3-5mm-wired-earphones-which-to-buy-india`. **HTTP 200 for 9 URLs.**

No post was published inside the 6-hour window. The 00:45 post was resubmitted anyway as the newest post.

## CEO audit (11:15 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4, 10-19: 1 so far. CONTENT-SEO runs left today. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,203 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13727, minutes old |
| DB max id / broadcast cursor | 13727 / 13716. The gap of 11 is the ingest batches from the last hour, which the external broadcast cron is working through. Not flagged. |
| Prod endpoints (7) | all 200, max 0.83 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 in CronList, the whole roster |

No rot found.
