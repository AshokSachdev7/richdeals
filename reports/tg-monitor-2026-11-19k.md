# TELEGRAM-DEAL-MONITOR tick — 2026-11-19k

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. Every new link was resolved with curl, then deduped against `data/tg-multi-seen.json` and against live DB productIds. Each surviving product was read on the Amazon PDP with a same-origin fetch in the logged-in tab. Run at about 10:01–10:10 IST.

**Result: 1 deal pushed (#16901, adidas Airshift M at ₹1,052) and 1 price confirm with no change. The bulk push returned count 1, created:true. IndexNow returned HTTP 200 for 4 URLs. The Rogerkart nighty was skipped because Amazon shows it as unavailable. The SB Loots Myntra links and the CoolzTricks geyser post were skipped because they point to listing pages, not single products. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| Dealzone | adidas Airshift M running shoes at ₹1,052, `link.amazon/B08QTWel3` | New. Resolves to B0GPR7424R (source tag `glitzdeal05-21`). It was in neither the seen file nor the DB. Read on the PDP and **pushed as #16901**. |
| Rogerkart Deals | E-Ezra nighty set of 2 at ₹250 "effective" after a 50% coupon, `rogerkart.com/r/KVHGktH` | New. The page body links B0HS56DMNW, which is not in the DB. The PDP shows "Currently unavailable" and has no add-to-cart button. Skipped: dead listing. |
| SB Loots And Deals | Glitchez jackets, `myntr.it/jLt0VeS` (men) and `myntr.it/yKk6SYH` (women) | New. Both resolve to Myntra listing pages filtered to the Glitchez brand. Skipped: listing pages, not single products. |
| ONLINE SHOPPING DEALS | Wonderchef Venice serving casserole, set of 2, at ₹549, `link.amazon/B0aLRaLDS` | New post. Resolves to B0B1J91BCD, which is already LIVE as #10841 at ₹549 (M.R.P. ₹1,960). The PDP was re-read (below), and the price had not changed. |
| CoolzTricks | "Upto 60% Off On Water Heater", 4 `amzn.to` links | New. The post links four geyser listings instead of one product. Skipped: category post. |
| Dealdost | La-Fetch perfume bundle | Unchanged. Skipped: bundle |
| INDIAN CHEAP DEALS | LG washing machine sale | Unchanged. Skipped: sale hub |
| NonStopDeals | Caprese handbags | Unchanged. Skipped: category post |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout vouchers | Unchanged. Skipped: not a product deal |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were again not among the rendered sidebar rows.

## Read on the PDP

| productId | Product | PDP price | M.R.P. | Stock | Outcome |
|---|---|---|---|---|---|
| B0GPR7424R | adidas Airshift M men's running shoes, dark blue / lucid lemon / core black | ₹1,052 (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | ₹3,799 (`#centerCol`), so 72% off | In stock, add-to-cart present | **Pushed as #16901.** |
| B0HS56DMNW | E-Ezra women's nighty, set of 2 | — | — | "Currently unavailable" in `#availability`, no add-to-cart | Skipped: dead listing |
| B0B1J91BCD (#10841) | Wonderchef Venice serving casserole, set of 2 | ₹549 | ₹1,960 | In stock, add-to-cart present | Same price as the stored row. No update and no ping. |

## Pushed

| Deal | Slug | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| #16901 | `adidas-airshift-m-mens-running-shoes-b0gpr7424r` | ₹1,052 | ₹3,799 | 72% | `amazon.in/dp/B0GPR7424R?th=1&psc=1&tag=ashoksachdev-21` |

- **Push response:** `POST /admin/deals/bulk` returned `count:1` and `created:true`. The slug is ours, so there was nothing to restore.
- **Title:** the ₹ figure and discount in the title match the numeric price and M.R.P. ("at ₹1,052 (72% Off)").
- **Description:** the description and how-to steps were written for this page. No source text was copied.
- **Image:** `m.media-amazon.com/images/I/71yzjJVIS-L._SL1500_.jpg`. The `colorImages` object lists another colourway (`OWHITE/BETSCA/NONE`) first, so the image was taken from the `DKBLUE/LUCLEM/CBLACK` entry, which matches `landingAsinColor`.
- **Prod page:** `https://richdeals.in/adidas-airshift-m-mens-running-shoes-b0gpr7424r` returns 200.

Nine codes were added to the seen file, which now holds 5,585 entries: `B08QTWel3`, `KVHGktH`, `jLt0VeS`, `yKk6SYH`, `B0aLRaLDS`, `4ALtruF`, `4ADTeEN`, `4ADTeVj` and `4ADTfbP`.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs: the #16901 slug plus the 3 hubs that slug mode adds.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design, so #16901 is served `noindex,follow` until it ranks into the top 100.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.44s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.20s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.66s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 10:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,293 = 16,293 | OK. It went up by 1 for #16901. |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,901 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,900 vs 16,901 | OK. #16901 was pushed minutes before the read. The external broadcast cron picks it up on its next run. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. Today's #10841 confirm is one more example.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19e. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
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
| SITEMON | 10:14 |
| DESIDIME | 10:43 |
| DEAL-INGEST | 10:53 |
| TG | 11:01 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
