# TELEGRAM-DEAL-MONITOR tick — 2026-11-23a

This tick read the Telegram Web sidebar in the Playwright `richDeals` profile at about 21:06 IST on 11-23, using one `browser_evaluate` over `.chat-list .ListItem.Chat` to get the newest message from each group in `data/tg-groups.json`. Single-product links were resolved, deduplicated against `data/tg-multi-seen.json` and the live DB by `productId`, and every price was read on the merchant's product page: Amazon in the logged-in tab (`.a-price-whole` in `#corePriceDisplay`), and Flipkart through a same-origin fetch of the PDP with `ld+json` parsed in the tab. Verified items were pushed `status:live` through `/admin/deals/bulk` with Flipkart's `affid=djhackraj`.

**Result: 10 of 13 groups visible in the sidebar, 6 links resolved, 2 new Flipkart deals pushed LIVE (ids 17078 and 17079, each POST returned count 1 and the slug matched), 1 duplicate LIVE row repriced in place, 2 rejected. IndexNow returned HTTP 200 for 6 URLs.**

## Pushed (2)

| Deal | Store | Price | M.R.P. | Check |
|---|---|---|---|---|
| #17078 Sony WH-CH730N noise-cancelling headphones (ACCHSSBFSWJSFNPG) | Flipkart | ₹12,990 | ₹16,990 | `ld+json` ₹12,990, InStock. The channel's ₹11,899 was the price after a bank offer, so the page states the list price and notes that bank offers can lower it. |
| #17079 Sony WH-CH530 wireless headphones (ACCHSS9QSCERWZ9G) | Flipkart | ₹4,490 | ₹5,990 | `ld+json` ₹4,490, InStock, matches the channel |

Both rows use Flipkart CDN images (`rukmini1.flixcart.com`) and original descriptions.

## Repriced in place

| Deal | ASIN | Old → new price | M.R.P. |
|---|---|---|---|
| #5514 Havells HD3151 hair dryer | B01N33BLDT | ₹799 → ₹649 | ₹1,415 (54% off) |

Dealzone and ONLINE SHOPPING DEALS reposted it through two `link.amazon` shortlinks (`B0iXHU1hl`, `B0gxwHZfB`). Both resolved to the same ASIN, which was already LIVE. The product page showed ₹649 and in stock, so the title, price, M.R.P. and discount were updated and a price-history row was added.

## Rejected or skipped

- **CoolzTricks** `amzn.to/48AjqV4` and `amzn.to/4jgy4ps`: both resolve to `/s?keywords=` Amazon search pages (BOXJOY), not single products.
- **SB Loots, Rogerkart:** Myntra category pages.
- **IFS Tips, Hidden Loot:** Swiggy promotions, not products.
- **INDIAN CHEAP DEALS, NonStopDeals:** the newest posts were old category sale posts.
- **Not in the loaded sidebar:** Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba.

The six new codes and pids were appended to `data/tg-multi-seen.json` (now 5,761 entries).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (2 new slugs + 1 repriced slug + 3 hubs) |
| New deal page | `/sony-wh-ch530-wireless-headphones-55-hour-battery-acchss9qscerwz9g` returns 200 on prod |
| sitemap.xml | ISR `revalidate = 1800`; the deals child is top-100 by design |
| llms.txt | `force-dynamic`; reflects the batch on the next request |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 21:50 IST | OK |
| DB LIVE vs API total | 16,472 = 16,472 (16,929 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,079 | OK |
| Broadcast cursor vs DB max | 17,048 vs 17,079 | OK; the external broadcast cron is working through the DEAL-INGEST batch |
| Posts | 0 coverless | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `tg-monitor-2026-11-23*` existed, so this report uses suffix `a` | OK |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| 11-20 | 3 |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |

## Still open

- **GSC top rows:** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first (PRIORITY).
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is alive again: 96 of 102 resolved at DEAL-INGEST 11-23a.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973, #7259 (B0H5CLR14S).
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033, plus the six low-stock items in DEAL-INGEST 11-23a.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
