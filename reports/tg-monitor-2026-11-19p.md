# TELEGRAM-DEAL-MONITOR tick — 2026-11-19p

The tick read all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over the Telegram Web sidebar in the Playwright richDeals profile, and read full links from the open chat. Shortlinks (`link.amazon`, `amzn.to`, `amazn.lt`, `fkrt.it`) were resolved with curl. Candidates were deduped against `data/tg-multi-seen.json` and against the live DB by productId. Every Amazon price was read on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). Run at about 14:40–15:04 IST.

**Result: 1 new deal pushed LIVE (HTTP 201, count 1, `created:true`, #16934). 1 candidate was rejected for price drift, and 2 duplicate LIVE rows were re-verified with no write. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 7 of 7 endpoints and on the new page at the first probe.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B06hVPLfp` | B0GYS218W3, Nivia String 2.0 backpack | **Pushed.** PDP ₹89, M.R.P. ₹249, in stock |
| CoolzTricks | `amzn.to/4C6obmB` | B0H363VZ21, Amazonbasics basket set of 3 | Rejected: PDP ₹559 vs channel ₹212 |
| CoolzTricks | `amzn.to/3WT35Il` | "Min 70% off" category | Skipped: not a single product |
| SB Loots | `amazn.lt/Hs9JdSrY` | B0D5HRSWF4, Del Monte chocolate syrup | Duplicate of #15041. PDP ₹229 / M.R.P. ₹277, same as the DB, no write |
| ONLINE SHOPPING DEALS | `link.amazon/B0fGwczHx` | B00K0AMYFO, Sony MDR-ZX310AP | Duplicate of #16920. PDP "Currently unavailable" with no add-to-cart, so no buy box. Added to the watch list, no write |
| ONLINE SHOPPING DEALS | `link.amazon/B0d19g25u` | ONLY women's clothing listing | Skipped: category |
| Dealzone | `link.amazon/B0iZX0PKm` | North Star shoes listing | Skipped: category |
| INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` | LG washing machine sale page | Skipped: sale hub |
| NonStopDeals | `fkrt.it/dyoEV7uuuN` | Caprese handbags listing | Skipped: category |
| Rogerkart | `myntr.in/J0jKwh` | Dr. Batra's | Skipped: already seen |
| Dealdost | `bitl.in/hTBRN6D` | La-Fetch bundle collection | Skipped: already seen |
| Hidden Loot, IFS Tips | Swiggy Dineout | — | Skipped: not a product |

The remaining groups showed no new post since the 19o tick.

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16934 | Nivia String 2.0 Compact Drawstring Backpack, 5 Litres (B0GYS218W3) | Amazon | ₹89 | ₹249 | 64% |

Affiliate link: `https://www.amazon.in/dp/B0GYS218W3?th=1&psc=1&tag=ashoksachdev-21`. The image is the marketplace CDN (`m.media-amazon.com/images/I/61MIlPv1O9L._SL1500_.jpg`). Every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., and "64% Off" equals discountPct. The description is original copy.

## Re-verified duplicates

| Id | Deal | PDP | Action |
|---|---|---|---|
| 15041 | Del Monte Chocolate Syrup 1.2 kg | ₹229 / M.R.P. ₹277, in stock | Same price, no write |
| 16920 | Sony MDR-ZX310AP wired headphones | Currently unavailable, no add-to-cart | No buy box. Added to the watch list |

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 4 URLs: the new slug plus the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 8 codes added, now 5,614 entries |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.08s) |
| /blog | 200 (0.59s) |
| /sitemap.xml | 200 (0.29s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.42s) |
| New page #16934 | 200 (0.17s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 15:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,325 = 16,325 | OK (+1 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,934 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,933 vs 16,934 | Behind by this tick's push only. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil` (one more this tick, #15041).
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for thirteen ticks in a row.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, and now **#16920 Sony**.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 Flux, #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 15:14 |
| TG | 16:01 |
| DESIDIME | 16:43 |
| DEAL-INGEST | 16:53 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
