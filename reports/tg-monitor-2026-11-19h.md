# TELEGRAM-DEAL-MONITOR tick — 2026-11-19h

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. ONLINE SHOPPING DEALS was already the open chat, so it also read that chat's last six messages to get the full links. Shortlinks were resolved with curl. Every candidate was deduped against `data/tg-multi-seen.json` and against live DB productIds, and the one duplicate LIVE row was re-read on the Amazon PDP in the logged-in tab. Run at about 07:00–07:05 IST.

**Result: 0 deals pushed. Every single-product link in the sidebar was already handled by earlier ticks. The one repost (the Fastrack watch, #16886) matches its PDP price, so nothing was written. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | Five Amazon `link.amazon` posts: Park Avenue after-shave ₹112, Old Spice shower gel ₹359, two Gulf engine oils at ₹239 and ₹225, and an iron kadhai at ₹297 | All 5 codes already in the seen file (resolved to B075KM119J, B07NJYBX1T, B07TPLCLC9, B0CCPFPBKM and B0H2SF8CL7) |
| Rogerkart Deals | Fastrack watch at ₹1,182, "apply coupon" | Resolves to B0HDC3978Q, which is already LIVE as #16886. Re-verified below. |
| Dealdost | La-Fetch TomHill perfume bundle, 3 for ₹799 | Skipped. `bitl.in` resolves to a bundle collection page (`/bundle?collection=…`), not a single product. |
| Dealzone, CoolzTricks | Jack & Jones 70–80% off, Bata up to 84% off | Skipped: category and sale posts |
| NonStopDeals | Caprese handbags up to 90% off (`fkrt.it`) | Skipped: category post |
| INDIAN CHEAP DEALS | "LG washing machine sale live" | Skipped: sale hub |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout ₹11 vouchers | Skipped: not a product deal |
| SB Loots And Deals | Channel notification settings promo | Skipped: no deal |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not among the rendered sidebar rows, so they have posted nothing more recent than the personal chats above them.

The two new codes (`2879PkR`, `hTBRN6D`) were added to the seen file, which now holds 5,573 entries.

## Duplicate LIVE row

| id | productId | Product | Channel | DB | PDP | Action |
|---|---|---|---|---|---|---|
| 16886 | B0HDC3978Q | Fastrack 9 to Fine quartz analog metal-strap watch | ₹1,182 | ₹1,182, M.R.P. ₹3,195 | ₹1,182 (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`), M.R.P. ₹3,195 from `#centerCol`, In stock, add-to-cart present | Same price, no write |

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.57s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 07:03 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,291 = 16,291 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,899 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,899 = 16,899 | OK. The external cron has broadcast DESIDIME 19d's two rows. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. One more same-price confirm this tick (#16886).
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
| INDEXNOW | 07:05 |
| SITEMON | 07:14 |
| TG | 08:01 |
| DESIDIME | 08:43 |
| DEAL-INGEST | 08:53 |
| CONTENT-SEO | 12:39 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
