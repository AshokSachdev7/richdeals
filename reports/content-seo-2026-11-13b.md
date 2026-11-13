# CONTENT-SEO tick — 2026-11-13b

Counted posts per day in IST first. Ran the DB audit script from `apps/api`, probed the 7 prod URLs with curl, checked `git log origin/master..master` and compared CronList against the roster in `.claude/cron-schedules.md`. Run at about 18:12 IST.

**Result: 11-13 IST already has 2 posts (#612 room heater oxygen, #613 white sneaker cleaning), which meets the 2-3 target. No post written. Adding one only to raise the count would be padding, and the best-X-under-Y and free-samples clusters are already saturated. 0 fixes.**

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.66s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,894 = 15,894 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,471 = 16,471 | OK |
| Crons | 9/9 vs roster | OK |
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
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
