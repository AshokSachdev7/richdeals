# TELEGRAM-DEAL-MONITOR tick — 2026-11-19q

The tick read all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over the Telegram Web sidebar in the Playwright richDeals profile, and read full links from the open chat. Shortlinks (`link.amazon`, `amazn.lt`) were resolved with curl. Candidates were deduped against `data/tg-multi-seen.json` and against the live DB by productId and affiliateUrl. Every Amazon price was read on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). Run at about 16:01–16:05 IST.

**Result: 2 new deals pushed LIVE (HTTP 201, count 2, both `created:true`, #16935–#16936). 1 candidate was rejected for price drift. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 7 of 7 endpoints and on both new pages at the first probe.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B00X6qBzR` | B01M0GS016, Van Heusen Colour Fresh Pima cotton briefs | **Pushed.** PDP ₹99, M.R.P. ₹299, add-to-cart present (Sodalite Blue, size S) |
| SB Loots | `amazn.lt/GFltMPQi` | B0BGNXG9NW, Dabur Chyawanprash 900g with jaggery | **Pushed.** PDP ₹292, M.R.P. ₹450, in stock |
| ONLINE SHOPPING DEALS | `link.amazon/B00vXJZ9M` | B0B4P1WL9M, Borosil 3.1 L tri-ply sauce pan | Rejected: PDP ₹2,325 (M.R.P. ₹3,195) vs channel ₹1,071.54 |

All other groups were unchanged since 19p, or showed posts that were already seen or were category, hub or non-product posts (CoolzTricks basket and "Min 70%", Dealzone North Star, Rogerkart Dr. Batra's, Dealdost La-Fetch, Hidden Loot and IFS Swiggy Dineout, INDIAN CHEAP DEALS LG hub, NonStopDeals Caprese).

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16935 | Van Heusen Men Colour Fresh Pima Cotton Briefs, Pack of 1 (B01M0GS016) | Amazon | ₹99 | ₹299 | 67% |
| 16936 | Dabur Chyawanprash Awaleha 900g with Jaggery, No Added Sugar (B0BGNXG9NW) | Amazon | ₹292 | ₹450 | 35% |

Affiliate links: `https://www.amazon.in/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Images are the marketplace CDN (`m.media-amazon.com/images/I/91KIIYwad3L._SL1500_.jpg`, keyed by `landingAsinColor`; `m.media-amazon.com/images/I/815eDZWDzUL._SL1500_.jpg`). Every ₹ in titles and howTo equals the price, every ₹ in descriptions equals the price or the M.R.P., and every "N% Off" equals discountPct. The Van Heusen howTo names the colour and size the ₹99 price applies to. Descriptions are original copy.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 5 URLs: the 2 new slugs plus the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 6 codes added, now 5,620 entries |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.53s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.07s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.36s) |
| New page #16935 | 200 (0.16s), first probe |
| New page #16936 | 200 (0.19s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 16:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,327 = 16,327 | OK (+2 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,936 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,934 vs 16,936 | Behind by this tick's 2 pushes only. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for thirteen ticks in a row.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 Flux, #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 16:14 |
| DESIDIME | 16:43 |
| DEAL-INGEST | 16:53 |
| TG | 17:01 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
