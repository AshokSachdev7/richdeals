# TELEGRAM-DEAL-MONITOR tick — 2026-11-19e

The tick read the Telegram Web sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, then resolved the Amazon shortlinks in the newest posts. Each candidate was deduped against `data/tg-multi-seen.json` and live DB productIds. Prices were verified on the Amazon PDP through a same-origin fetch in the logged-in tab, reading `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, `#availability` plus the add-to-cart button, and the M.R.P. from `#centerCol` text. Run at about 04:01–04:07 IST.

**Result: 3 new deals pushed LIVE (count 3, all `created:true`): WROGN briefs pack of 2 at ₹299, LOVETC compact powder at ₹425 and YOHO printed boots at ₹499. Three candidates drifted from the PDP and one grocery post was skipped. Two reposts matched LIVE rows whose prices had moved, so #11026 and #16779 were repriced and their copy rewritten. Two more reposts matched LIVE rows at the same price. IndexNow returned HTTP 200 for 8 URLs. Prod returned 200 on 12 of 12 endpoints.**

## Sidebar (10 of 13 groups rendered)

The new candidates came from the newest posts in the rendered groups. Loot, category, `/s?` search and multi-product posts were skipped, as were personal and bot chats.

## Pushed

| id | Product | Store | Channel | PDP | M.R.P. | Slug |
|---|---|---|---|---|---|---|
| 16889 | WROGN men's cotton-spandex briefs, pack of 2 (B0GXL3R3WR) | Amazon | ₹299 | ₹299, in stock (only 5 left), seller Cocoblu | ₹599 (50% off) | `wrogn-mens-pack-of-2-cotton-spandex-briefs-b0gxl3r3wr` |
| 16890 | LOVETC filter-finish compact powder, Espresso Truffle 9g (B0FQJRXCJ6) | Amazon | ₹425 | ₹425, in stock, add-to-cart | ₹1,599 (73% off) | `lovetc-filter-finish-compact-powder-espresso-truffle-9g-b0fqjrxcj6` |
| 16891 | YOHO women's printed boots, Forest Green, 7 UK (B0CQYFBG8G) | Amazon | ₹499 | ₹499, in stock, add-to-cart | ₹5,299 (91% off) | `yoho-women-printed-boots-b0cqyfbg8g` |

All three use `?tag=ashoksachdev-21` on `/dp/ASIN` and an `m.media-amazon.com` hiRes image. The push script checked that every ₹ figure in the title and howTo equals `price`, that every ₹ figure in the description is the price, the M.R.P. or the stated per-piece figure, and that `discountPct` matches the M.R.P.

YOHO's 91% off implies an inflated M.R.P., the same pattern as #16792. Its title leaves the percentage out, and its description says the M.R.P. looks inflated and points to the ₹499 price instead.

## Rejected

| Product | Store | Channel | PDP | Reason |
|---|---|---|---|---|
| Amazon Basics mug set (B0FTSGMPVB) | Amazon | ₹537.79 | ₹584 | Drift |
| Solimo wall clock (B0FLPRQNLL) | Amazon | ₹393.61 | ₹703 | Drift |
| Mildy shampoo (B0FYXSHXYH) | Amazon | ₹199 | ₹395 | Drift |
| Outsup Sea Buckthorn juice (B0H2JN172V) | Amazon | — | Not read | FMCG / grocery |
| Solimo glass (#16812) | Amazon | ₹397 | ₹397 | Duplicate of a LIVE row. Same-price confirm, no reprice. |
| Active pain cream (#16805) | Amazon | ₹99 | ₹99 | Duplicate of a LIVE row. Same-price confirm, no reprice. |

The seen list grew from 5,473 to 5,494.

## Repriced (duplicate reposts)

| id | Before | After (PDP) | Slug |
|---|---|---|---|
| 11026 Solimo 16-piece dinner set | ₹1,709 (66% off) | ₹2,759, M.R.P. ₹5,099 (46% off) | `amazon-brand-solimo-ceramic-16-piece-dinner-set-red-strip-serves-4-b0b7s4t6wd` |
| 16779 Yera 250ml glass bowls, set of 6 | ₹188, no M.R.P. | ₹280, M.R.P. ₹599 (53% off) | `yera-250-ml-glass-dessert-bowls-set-of-6-b0crdjh5yz` |

Each update went through `prisma.deal.update` with a new priceHistory row, and every ₹ figure and percentage in the title and description was rewritten to match the new `price`. The channel quoted ₹1,511.16 for #11026, which is a stale or post-coupon figure. #11026 also lost its stale "lowest price in 30 days" and "Amazon's Choice" claims. #16779 gained its M.R.P. and a note that only 1 unit was left.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new and 2 repriced slugs, **HTTP 200 for 8 URLs** (5 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.64s) |
| WROGN slug | 200 (0.24s) |
| LOVETC slug | 200 (0.23s) |
| YOHO slug | 200 (0.26s) |
| Solimo dinner set slug | 200 (0.17s) |
| Yera slug | 200 (0.17s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 04:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,284 = 16,284 | OK (+3 from this tick) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,891 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,888 vs 16,891 | OK. This tick's 3 rows are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Session crons vs roster | 9 of 9 | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a and 19b. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 04:53.
- **DesiDime yield:** low, because card prices lag the PDP or show post-coupon figures. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **Inflated M.R.P.s:** #16792 Bio-th implies 93% off and #16891 YOHO implies 91% off.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`. This tick fixed two of them.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio has 2 units left at ₹5,500 from a third-party seller, and #16779 Yera has 1 unit left.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): SITEMON 04:14, SCHEMA-AUDIT 04:39, DESIDIME 04:43, DEAL-INGEST 04:53, TG 05:01, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39.
