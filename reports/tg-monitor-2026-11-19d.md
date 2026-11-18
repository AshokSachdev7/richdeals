# TELEGRAM-DEAL-MONITOR tick — 2026-11-19d

The tick read the Telegram Web sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`. It then read the ONLINE SHOPPING DEALS history and resolved 7 `link.amazon` shortlinks. Each candidate was deduped against `data/tg-multi-seen.json` and live DB productIds. Prices were verified on the Amazon PDP through a same-origin fetch in the logged-in tab, reading `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, `#availability` plus the add-to-cart button, and the M.R.P. from `#centerCol` text. Run at about 03:01–03:06 IST.

**Result: 2 new deals pushed LIVE (count 2, both `created:true`): Old Spice Bearglove 3-in-1 shower gel at ₹359 and Gulf Pride Scooter Plus 10W-30 at ₹239. One candidate drifted from the PDP and was rejected, and one repost matched a LIVE row at the same price. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 9 of 9 endpoints, including both new slugs.**

## Sidebar (10 of 13 groups rendered)

Nothing new outside ONLINE SHOPPING DEALS. The latest posts in Rogerkart (Fastrack `2879PkR`), the LG washer (`B08FsUNwo`) and La-Fetch (`bitl.in/hTBRN6D`, a bundle collection) were already in the seen list. The Jack & Jones, Bata and Caprese category posts, a Swiggy Dineout loot, an iPhone rate list, and personal and bot chats were skipped.

## Pushed

| id | Product | Store | Channel | PDP | M.R.P. | Slug |
|---|---|---|---|---|---|---|
| 16887 | Old Spice Bearglove 3-in-1 shower gel 400ml (B07NJYBX1T) | Amazon | ₹359 | ₹359, in stock, add-to-cart | ₹449 (20% off) | `old-spice-bearglove-3in1-shower-gel-400ml-b07njybx1t` |
| 16888 | Gulf Pride Scooter Plus 10W-30 800ml (B07TPLCLC9) | Amazon | ₹239 | ₹239, in stock, add-to-cart | ₹380 (37% off) | `gulf-pride-scooter-plus-10w-30-800ml-b07tplclc9` |

Both use `?tag=ashoksachdev-21` on `/dp/ASIN` and an `m.media-amazon.com` hiRes image. The push script checked that every ₹ figure in the title and howTo equals `price` and that `discountPct` matches the M.R.P.

On the M.R.P. read: `.a-text-price` returned the per-unit rate (₹89.75 per 100ml for Old Spice, ₹35.44 for Gulf Zipp), not the M.R.P. The M.R.P. was taken from the "M.R.P." text in `#centerCol` instead, as recorded in the `#centerCol` memory.

## Rejected

| Product | Store | Channel | PDP | Reason |
|---|---|---|---|---|
| Gulf Zipp Smart 20W40 900ml (B0CCPFPBKM) | Amazon | ₹225 | ₹319 | Drift |
| LEGO 77237 (B0DWF1X7C5) | Amazon | ₹319 | ₹319, in stock | Duplicate of LIVE #16832 (DB ₹319). Same-price confirm, no reprice. |

Skipped as already seen: B06BBnioq (Milton), B0432S3zN (Park Avenue) and B0ik4bSBJ (kadhai). The seen list grew from 5,465 to 5,473.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs, **HTTP 200 for 5 URLs** (2 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.49s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.62s) |
| Old Spice slug | 200 (0.25s) |
| Gulf Pride slug | 200 (0.20s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 03:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,281 = 16,281 | OK (+2 from this tick) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,888 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,886 vs 16,888 | OK. This tick's 2 rows are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Session crons vs roster | 9 of 9 | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a and 19b. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 04:53.
- **DesiDime yield:** low, because card prices lag the PDP or show post-coupon figures. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): SITEMON 03:14, TG 04:01, SCHEMA-AUDIT 04:39, DESIDIME 04:43, DEAL-INGEST 04:53, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39. CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX and AI-OVERVIEW may still hit the 7-day expiry on 11-19; SITEMON recreates any that drop.
