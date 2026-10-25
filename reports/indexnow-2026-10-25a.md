# INDEXNOW tick — 2026-10-25a (~13:24 IST)

Window: the last 6 hours from the DB (LIVE deals by createdAt, posts by publishedAt), queried with `connection_limit=1`.

## Submitted

- **60 deal slugs**, all LIVE: #14690 through #14749. That covers the IFS 10-25a batch, DesiDime 10-25b and TG 10-25b/c. Newest is `tijane-maroon-cotton-carpet-120x182-cm-rgzhguk2vjfpkfm3`; oldest is `mini-exercise-ball-9-inch-25cm-yoga-pilates-ball-b0hcv371z8`.
- **1 post**: `blog/usb-c-hub-hdmi-not-working-laptop-fix-india` (#526).
- Slug mode adds `/`, `/offers` and `/sitemap.xml`. The list is 65 urls after dedup.

## Result

`node apps/api/scripts/indexnow-ping.mjs <slugs>` → **HTTP 200 for 65 urls** (api.indexnow.org, key `33f3a9d63ca15676bbd90586ea80e65f`). Bing's per-url GET fallback was not needed.

These slugs were already pinged in their own batch ticks. This run is the 6-hour resubmit.

## CEO audit (13:24 IST)

- Prod `/ /offers /blog /sitemap.xml /feed.xml /api/deals`: all 200.
- Live deals: 14,219. Null price: 0. Null image: 0. PENDING_REVIEW: 0. Coverless or seo-less posts: 0. Max id: 14749.
- Posts today (IST): **1**. CONTENT-SEO 87b26cf8 runs next at 18:39 IST and must publish post 2. If it doesn't, the 2/day rule fails today.
- Broadcast cursor: 14742 (was 14722 at 13:00). The external cron is draining it. Not rot.
- Crons: 9/9 present in CronList.
- `master` matched `origin/master` before this commit.
