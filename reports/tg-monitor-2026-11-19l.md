# TELEGRAM-DEAL-MONITOR tick — 2026-11-19l

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. Every new link was resolved with curl, then deduped against `data/tg-multi-seen.json` and against live DB productIds. Amazon products were read on the PDP with a same-origin fetch in the logged-in tab. The Shopsy product was read from its product page with curl. Run at about 11:01–11:06 IST.

**Result: 1 deal pushed (#16910, R Global women's printed kurta on Shopsy at ₹278) and 1 duplicate LIVE row repriced (#5848 Patanjali Kesh Kanti, ₹170 → ₹240). The bulk push returned HTTP 201 with count 1, created:true. A third post was a price confirm with no change (#12947). IndexNow returned HTTP 200 for 5 URLs. The CoolzTricks mixer-grinder post was skipped because it links four products. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | "BUY -", `bittli.in/21Un4sUN` | New. Resolves to a Shopsy R Global women's printed kurta, pid KUUGZF58GFSXYBWT, which is not in the DB. Read on the product page and **pushed as #16910**. |
| Dealzone | Patanjali Kesh Kanti shampoo 650 ml "at 240", `link.amazon/B00nQmbXQ` | New post. Resolves to B0D8BRRD1B (source tag `glitzdeal05-21`), which is already LIVE as #5848 at ₹170. The PDP now reads ₹240, so the row was **repriced**. |
| ONLINE SHOPPING DEALS | Philips Ace Saver 9W E27 LED bulb, pack of 4, "₹226.54", `link.amazon/B07jDeK7G` | New post. Resolves to B01303OKV8 (source tag `vivek123034-21`), which is already LIVE as #12947. The PDP price matches the stored row, so there was no write and no ping. |
| CoolzTricks | Havells mixer grinder, 4 `amzn.to` links | New. The post links four different products. Skipped: multi-product post. |
| Rogerkart Deals, Dealdost, INDIAN CHEAP DEALS, NonStopDeals, Hidden Loot, IndiaFreeStuff Tips | — | Unchanged since 19k. |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were again not among the rendered sidebar rows.

## Read on the product page

| productId | Product | Price | M.R.P. | Stock | Outcome |
|---|---|---|---|---|---|
| KUUGZF58GFSXYBWT | R Global women's printed kurta, purple (Shopsy) | ₹278 (FSP in the pid's `prices` block) | ₹999, so 72% off (`totalDiscount` 72 confirms it) | `ld+json` InStock, page state IN_STOCK | **Pushed as #16910.** |
| B0D8BRRD1B (#5848) | Patanjali Kesh Kanti anti-dandruff hair cleanser, 650 ml | ₹240 (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | ₹600 (`#centerCol`), so 60% off | In stock, add-to-cart present | **Repriced from ₹170.** |
| B01303OKV8 (#12947) | Philips Ace Saver 9W E27 LED bulb, pack of 4 | ₹226 | ₹980 | In stock, add-to-cart present | Same price as the stored row. No update and no ping. |

The Shopsy page carries several products' prices, and its first `"mrp"` match is ₹1,999, which belongs to a different item. The M.R.P. was taken from the `prices` block for this pid instead.

## Pushed

| Deal | Slug | Store | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|---|
| #16910 | `r-global-women-printed-kurta-purple-kuugzf58gfsxybwt` | Shopsy | ₹278 | ₹999 | 72% | Cuelinks (`linksredirect.com/?cid=527`), wrapping the clean `shopsy.in/…/p/itm60b68e5016969?pid=KUUGZF58GFSXYBWT` URL |

- **Push response:** `POST /admin/deals/bulk` returned HTTP 201, `count:1` and `created:true`. The slug is ours, so there was nothing to restore.
- **Title-₹ guard:** every ₹ figure in the title and how-to steps equals the numeric price, and the discount equals `round((1 − price/mrp) × 100)`. The guard also ran on the #5848 update.
- **Copy:** the description and how-to steps were written for this page. No source text was copied.
- **Image:** `rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-kurta/…-original-imagz9zgn52ztkk3.jpeg`, from the marketplace CDN.
- **Prod page:** `https://richdeals.in/r-global-women-printed-kurta-purple-kuugzf58gfsxybwt` returns 200.

## Duplicate LIVE row

| Deal | Before | Now | Action |
|---|---|---|---|
| #5848 Patanjali Kesh Kanti 650 ml | ₹170, 72% off | ₹240, M.R.P. ₹600, 60% off | `prisma.deal.update`: price, discountPct, title ("at ₹240 (60% Off)") and the ₹ figure in how-to step 2. A priceHistory row was written. The slug is unchanged and the prod page returns 200. |

Seven codes were added to the seen file, which now holds 5,592 entries: `B07jDeK7G`, `21Un4sUN`, `B00nQmbXQ`, `3XzXxCJ`, `4iW86qY`, `491QqFH` and `3VAqwWv`.

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs: the #16910 slug, the #5848 slug, and the 3 hubs that slug mode adds.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design, so #16910 is served `noindex,follow` until it ranks into the top 100.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.74s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 11:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,302 = 16,302 | OK. It went up by 1 for #16910. |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,910 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,909 vs 16,910 | OK. The external broadcast cron has finished DESIDIME 19f's batch. #16910 was pushed minutes before the read, and the next run picks it up. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Since the last TG tick (19k, 10:01)

| Tick | Outcome |
|---|---|
| SITEMON 19j | Nothing to fix. |
| DESIDIME 19f | Pushed #16902–#16909 (count 8). Repriced #13590 and #2205. IndexNow 200 for 13 URLs. |
| DEAL-INGEST 19f | 0 pushed. Both redirector probes returned a 302 to the IFS homepage. |

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. This tick's #12947 confirm is one more example.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** dead for eleven ticks in a row (18j through 19f). If every remaining 11-19 tick also resolves 0, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
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
| SITEMON | 11:14 |
| TG | 12:01 |
| CONTENT-SEO | 12:39 |
| DESIDIME | 12:43 |
| DEAL-INGEST | 12:53 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
