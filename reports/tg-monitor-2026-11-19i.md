# TELEGRAM-DEAL-MONITOR tick — 2026-11-19i

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. The one new link was resolved with curl and deduped against `data/tg-multi-seen.json` and against live DB productIds. It was then read on the Amazon PDP with a same-origin fetch in the logged-in tab. Run at about 08:00 IST.

**Result: 0 deals pushed. The only new post was a grocery item (Veeba ketchup at ₹82), so it was skipped on quality grounds. Every other group's newest post was unchanged since 19h. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | `amazn.lt/zBCLE5S2` (link only) | New. Resolves to B09GWR9S2H (source tag `bhavesh015-21`). It was in neither the seen file nor the DB. Read on the PDP below, then skipped as grocery. |
| Rogerkart Deals | Fastrack watch | Unchanged since 19h. Already #16886, which was re-verified in 19h. |
| Dealdost | La-Fetch perfume bundle | Unchanged. Skipped: bundle |
| Dealzone, CoolzTricks | Jack & Jones, Bata | Unchanged. Skipped: category posts |
| ONLINE SHOPPING DEALS | Iron kadhai | Unchanged. Already in the seen file |
| INDIAN CHEAP DEALS | LG washing machine sale | Unchanged. Skipped: sale hub |
| NonStopDeals | Caprese handbags | Unchanged. Skipped: category post |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout vouchers | Unchanged. Skipped: not a product deal |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were again not among the rendered sidebar rows.

## Candidate read on the PDP

| productId | Product | PDP price | M.R.P. | Stock | Outcome |
|---|---|---|---|---|---|
| B09GWR9S2H | Veeba Chef's Choice Tomato Ketchup, 900 g | ₹82 (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | ₹99 (`#centerCol`) | In stock, add-to-cart present | Skipped: grocery and low-ticket FMCG. Its price swings daily, and the 17% discount is thin. This matches the grocery skips in 19c, 19e and 19f. |

The code `zBCLE5S2` was added to the seen file, which now holds 5,574 entries.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.67s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 08:02 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,291 = 16,291 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,899 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,899 = 16,899 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19d. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 08:14 |
| DESIDIME | 08:43 |
| DEAL-INGEST | 08:53 |
| TG | 09:01 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
