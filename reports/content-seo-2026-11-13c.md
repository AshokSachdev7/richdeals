# CONTENT-SEO tick — 2026-11-13c

Counted posts per day in IST first. Then ran the DB audit script from `apps/api`, probed the 7 prod URLs with curl, compared CronList against the roster in `.claude/cron-schedules.md`, and checked `git log origin/master..master`. Run at about 18:41 IST.

**Result: 0 posts written. 11-13 IST already has 2 posts, which is inside the 2-3 target, so the count was not padded. The next CONTENT-SEO run at 00:39 IST can add a third.**

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.53s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,909 = 15,909 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,486 = 16,486 | OK |
| Crons | 9/9 vs roster | OK, nothing to recreate |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2. On target.

## Still open

- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), Puma Maka B09RG35FRQ (1 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
