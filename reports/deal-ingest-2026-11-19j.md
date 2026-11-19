# DEAL-INGEST indiafreestuff tick — 2026-11-19j

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept IFS `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id to the merchant URL. Amazon candidates were checked on the PDP in the logged-in Playwright Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). The Flipkart candidate was read in a Playwright tab. New deals were deduped by productId against the live DB. Run at about 18:53–19:04 IST (13:23–13:34 UTC).

**Result: 5 new deals pushed LIVE (HTTP 201, count 5, all `created:true`, #16946–#16950). 3 candidates were rejected. IndexNow returned HTTP 200 for 8 URLs. Prod returned 200 on 7 of 7 endpoints and on all 5 new pages at the first probe.**

## Stage 1 and the redirector

A 3-id probe resolved 3 of 3, so the full sweep ran. Of 92 ids, only the first 7 resolved to a merchant; the remaining 85 were sent to the IFS homepage, which looks like rate-limiting after a short burst. Stage 1 produced 7 candidates and 85 drops.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19i | 0 at each tick |
| **19j** | **7 of 92 (probe 3 of 3)** |

This is the first non-zero tick after fourteen zero ticks. The pattern matches 18g and 18i: the first handful resolve, then everything goes home.

**Decision:** keep the slot on `23 */2 * * *`. The fallback plan from 19i (move the slot's work to Telegram deep-history reads on 11-20) is cancelled, because the redirector still yields a few verified deals per tick. If the 7-then-home pattern holds, the next tick should try spacing the resolves further apart than the 2.5 s minimum.

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|---|
| 16946 | Treo by Milton Aurelia Lunis opalware dinner set, 6 pieces (B0G7ZN1868) | Amazon | ₹450 | ₹925 | 51% | 1 left in stock |
| 16947 | Lymio lightweight hoodie sweatshirt, unisex (B0HFS31TML) | Amazon | ₹449 | none | none | The listed ₹3,999 implied 89% off, so the M.R.P. was nulled as inflated |
| 16948 | Lux Cozi men's cotton crew-neck sweatshirt (B0DMP7C2PG) | Amazon | ₹501 | ₹750 | 33% | |
| 16949 | GROOVES Boom Box portable Bluetooth speaker (B0FZSZKLVH) | Amazon | ₹911 | ₹2,999 | 70% | |
| 16950 | Amazon Basics 10-sheet micro-cut paper shredder, 13 L (B0GJCSPGC7) | Amazon | ₹5,599 | ₹11,398 | 51% | |

Every price matched the PDP. Every link is `/dp/ASIN` with `tag=ashoksachdev-21` (the source tag `dealhind-21` was stripped), and every image is from `m.media-amazon.com`. Titles and descriptions were written fresh, not copied from IFS. The validators passed on all five: every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., discountPct is under 80, and the row with no M.R.P. has a null discountPct and no "% Off" in the title.

## Rejected

| Item | Card price | Reason |
|---|---|---|
| B0HK7FD8GD home IVI insemination kit, 2 catheters | ₹249 | Sensitive medical device from a no-name brand |
| B0HK7KFS3D home IVI insemination kit, 1 catheter | ₹199 | Same reason |
| Flipkart MOBHZPMCBYNXVYDB AI+ Pulse 2 (128 GB) | ₹10,749 | Drift: the PDP shows ₹11,499 |

All three were written to `data/dd-rejected.json`, which now holds 2,142 entries.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 8 URLs: 5 new slugs and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.08s) |
| /blog | 200 (0.54s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.07s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.39s) |
| New pages #16946–#16950 | 200 on all 5 (0.13–0.18s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 19:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,341 = 16,341 | OK (+5 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,950 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,945 vs 16,950 | Behind by this tick's 5 pushes only. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Since DEAL-INGEST 19i

| Tick | Outcome |
|---|---|
| DESIDIME 19i | Pushed #16937–#16940, repriced #13527 (2df0be6) |
| TG 19r | 0 pushed (7f95fab) |
| SITEMON 19q | Green (e0b6434) |
| TG 19s | Pushed #16941, repriced #6027 (0022df5) |
| SITEMON 19r | Green (ecbbfcb) |
| CONTENT-SEO 19d | Skipped, 11-19 already had 3 posts (63e9961) |
| DESIDIME 19j | Pushed #16942–#16945, repriced #360, #16171, #4792; IndexNow 200 for 10 URLs (6b8bdd1) |

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** partial revival, 7 of 92 resolved; the rest go home.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, and now **#16947** (Lymio hoodie, M.R.P. nulled at push).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality, #360, #16943, and now **#16946** (Treo dinner set, 1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-19 19:05 |
| INDEXNOW | 11-19 19:05 |
| SITEMON | 11-19 19:14 |
| DESIDIME | 11-19 20:43 |
| DEAL-INGEST | 11-19 20:53 |
| CONTENT-SEO | 11-20 00:39 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
