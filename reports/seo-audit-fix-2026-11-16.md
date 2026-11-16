# SEO-AUDIT-FIX tick — 2026-11-16

Daily audit-and-fix tick. Today's highest-priority finding came from the 11-16 schema audit: freshly price-synced deal pages served their pre-sync Offer price on the first fetch. This tick fixed the root cause in code, deployed it, and verified the Offer on every page synced today. Run at about 11:20–11:32 IST.

**Result: 1 fix shipped (commit 48a58f1, deploy 6a0d3817 ACTIVE). The prod Offer price now equals the DB price on all 7 deals synced today, each with priceValidUntil 2026-11-30. IndexNow returned HTTP 200 for the 3 pages that had served stale. Prod is 7/7 at 200.**

## Fix: stale Offer price on deal pages

| | |
|---|---|
| Symptom | #7683, #16134 and #16632 served their old Offer price (and #7683 no priceValidUntil) on the first fetch after a direct `prisma.update` price sync, and the correct one on the next fetch. |
| Root cause | `getDeal()` in `apps/web/src/lib/api.ts` fetched with `next: { revalidate: 300 }`. The deal page is `force-dynamic`, but the Next data cache still held the API response and served it stale-while-revalidate. Direct price syncs do not go through the revalidate webhook. |
| Fix | `getDeal()` now passes revalidate 0, so every deal page render reads the API fresh. Other callers keep their cache windows (the deal sitemap and llms-full use their own 1800s reads). |
| Commit | 48a58f1 `fix(web): getDeal reads fresh (revalidate 0) so deal pages never serve a pre-sync Offer` |
| Deploy | `git push origin master`, local :4000 stopped, `doctl apps create-deployment cd95718d-… --force-rebuild` → 6a0d3817 **ACTIVE**, local API restarted (200) |

Why it matters: a crawler that hits a rarely viewed page right after a sync would read the old price. A stale Offer price is a demotion signal for product results, so the price search engines see has to match the DB on the first request.

## Verification on prod

| Row | Deal | DB price | Prod Offer | priceValidUntil |
|---|---|---|---|---|
| #652 | Vector X track suit | ₹1,604 | ₹1,604 | 2026-11-30 |
| #7683 | Wonderchef Vista Plus | ₹1,899 | ₹1,899 | 2026-11-30 |
| #12798 | Ant Esports kitchen scale | ₹189 | ₹189 | 2026-11-30 |
| #14012 | CareFoam pillow | ₹879 | ₹879 | 2026-11-30 |
| #14458 | Havells Glamax bulb | ₹349 | ₹349 | 2026-11-30 |
| #16134 | Axe Midnight Oak | ₹374 | ₹374 | 2026-11-30 |
| #16632 | USHA TechnoAir R | ₹2,699 | ₹2,699 | 2026-11-30 |

7/7 match on the first fetch after the deploy.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the slugs of #7683, #16134 and #16632 (the three that had served stale) and returned **HTTP 200** for 6 urls (3 slugs plus 3 hub paths). TG tick a had already pinged the other four.
- No static route was added, so `staticRoutes` in the pages sitemap and the llms.txt hub links need no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,082 = 16,082 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,659 vs 16,661 | OK. The external cron is catching up. |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post.

## Not fixed this tick

- #14635 Mivi (Flipkart) still has no priceValidUntil because its last priceHistory row is from 10-24. It needs a Flipkart PDP read in the browser, not a code change.
- 94.2% of LIVE deals carry no priceValidUntil because the same-price confirm paths write no priceHistory row. Only the top-100 deals are indexable and every sampled one is valid, so this is not urgent for search.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
