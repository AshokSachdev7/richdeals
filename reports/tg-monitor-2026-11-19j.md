# TELEGRAM-DEAL-MONITOR tick — 2026-11-19j

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. Both new links were resolved with curl, then deduped against `data/tg-multi-seen.json` and against live DB productIds. The surviving product was read on the Amazon PDP with a same-origin fetch in the logged-in tab. Run at about 09:01–09:03 IST.

**Result: 0 new deals, 1 price sync. The Lakmé repost matched LIVE #16246, and its PDP price had dropped from ₹422 to ₹400, so the row was repriced and pinged (IndexNow HTTP 200, 4 URLs). The Havells post was an Amazon search link and was skipped. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | Lakmé Glow-And-Cover Duo @400, `amazn.lt/bIz3yb8t` | New. Resolves to B0H264JF8Q (source tag `bhavesh015-21`). Not in the seen file, but already LIVE as #16246, so the PDP was re-read (below). |
| Dealzone | Havells coupon, `link.amazon/B01ICznik` | New. Resolves to an `/s?` search (Havells brand, deal-type filter). Skipped: search page, not a single product. |
| CoolzTricks | Bata derby shoes | Unchanged since 19i. Skipped: category post |
| Rogerkart Deals | Fastrack watch | Unchanged. Already #16886 |
| Dealdost | La-Fetch perfume bundle | Unchanged. Skipped: bundle |
| ONLINE SHOPPING DEALS | Iron kadhai | Unchanged. Already in the seen file |
| INDIAN CHEAP DEALS | LG washing machine sale | Unchanged. Skipped: sale hub |
| NonStopDeals | Caprese handbags | Unchanged. Skipped: category post |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout vouchers | Unchanged. Skipped: not a product deal |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were again not among the rendered sidebar rows.

## Price sync

| Deal | Product | Before | PDP now | Stock | Action |
|---|---|---|---|---|---|
| #16246 | Lakmé Skin Stylist Lumi + CC Kit (60g + 30g) | ₹422, M.R.P. ₹469, 10% off | ₹400 (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`), M.R.P. ₹1,134 (`#centerCol`), no coupon | In stock, add-to-cart present | Updated with `prisma.deal.update`: price ₹400, M.R.P. ₹1,134, 65% off. The title was rewritten so its ₹ figure and discount match ("at ₹400 (65% Off)"). A priceHistory row was written. The slug is unchanged. |

The stored M.R.P. jumped from ₹469 to ₹1,134. ₹1,134 is the PDP's printed M.R.P., and 65% is under the 80% rule, so it was kept. #16246 joins the M.R.P. watch list.

The codes `bIz3yb8t` and `B01ICznik` were added to the seen file, which now holds 5,576 entries.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs: the #16246 slug plus the 3 hubs that slug mode adds.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.82s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.61s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 09:03 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,292 = 16,292 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,900 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,900 = 16,900 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19e. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, and now #16246 (M.R.P. ₹469 → ₹1,134).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 09:14 |
| TG | 10:01 |
| DESIDIME | 10:43 |
| DEAL-INGEST | 10:53 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
