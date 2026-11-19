# CONTENT-SEO tick — 2026-11-19d

The tick checked posts per day in IST first, using `apps/api/_aud1119inx.cjs` and a direct Prisma read of the four newest posts. It then ran the CEO audit: the 7 prod URLs probed with `curl -m 30`, the API total, the broadcast cursor, the local API, and `git fetch` for unpushed commits. Run at about 18:39 IST (13:09 UTC).

**Result: no post written. 11-19 IST already has 3 posts, which is the top of the 2–3 target, and a 4th is not needed. Every CEO-audit check is green, and prod returned 200 on 7 of 7 endpoints.**

## Posts on 11-19 (IST)

| Published (IST) | Slug |
|---|---|
| 00:45 | `sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` |
| 06:45 | `how-to-use-bike-car-cover-without-scratching-paint-or-rust` |
| 12:44 | `on-ear-vs-over-ear-headphones-which-to-buy-india` |

**Decision:** skip. The target is met. A 4th post would stay under the cap, but it would add count rather than quality, which goes against the dup-slug and thin-content guidance. The next CONTENT-SEO slot (11-20, 00:39 IST) opens the new IST day and writes the first post for 11-20.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.53s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.08s) |
| /llms.txt | 200 (0.37s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,332 = 16,332 | OK |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,941 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,941 = 16,941 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 at SITEMON 19r (18:14) | OK |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

These items are carried forward and are unchanged by this tick:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- about 95% of LIVE deals have no `priceValidUntil`, because same-price confirms write no priceHistory row;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead (14 zero ticks);
- the inflated M.R.P. list (#16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941);
- the no-buy-box watch list (#9689, #15663, #14424, #16741, #16756, #3906, #16920);
- low-stock items (#16768, #16779, #12651, the Max sweatshirt, #16917 CG Iraya geyser, #3221 Kwality);
- the Stage 1 Flipkart gaps;
- ASIN reuse (#2351, #15344, #6989, #4097; B0C7BM7L45 on #5577 and #7673);
- the DO API token still needs rotating.
