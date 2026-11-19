# TELEGRAM-DEAL-MONITOR tick — 2026-11-19r

The tick read all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over the Telegram Web sidebar in the Playwright richDeals profile. Shortlinks (`link.amazon`, `amzn.to`, `myntr.it`) were resolved with curl. Candidates were deduped against `data/tg-multi-seen.json` and against the live DB by productId. Amazon candidates were read on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). Run at about 17:01–17:05 IST.

**Result: 0 deals pushed. All 3 new posts were rejected: one for being out of stock, one as a perishable product only sold in one city, and one as a category page. There was nothing to ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| Dealzone | `link.amazon/B05e9XJ0r` (via `amzlinks.in`) | B0HG97GN9R, Cetaphil Baby Mild Cleansing Bar 3 x 100 g | Rejected. The PDP shows "Currently unavailable" in `#availability`, has no add-to-cart button and no buy-box price. Only the Pack of 1 variant (₹476) is listed. The channel's ₹428 loot has sold out. |
| CoolzTricks | `amzn.to/3WR2xmn` | B0FKMNKY5C, Minus30 sugar-free ice cream stick, 40 ml | Rejected. It is a perishable, low-price grocery item, the post says it ships to Hyderabad only, and the PDP shows no add-to-cart button. |
| SB Loots | `myntr.it/i63MFhK` | Myntra Adidas Originals "Upto 60% OFF" | Rejected as a category or sale page, not a single product. |

Neither ASIN was in the seen list or the DB (the productId query returned `[]`). The other groups had nothing new to take:

- **Already seen:** the INDIAN CHEAP DEALS LG hub, Rogerkart Dr. Batra's, the Dealdost La-Fetch bundle and the NonStopDeals Caprese post.
- **Unchanged since 19q:** ONLINE SHOPPING DEALS (still the Van Heusen post, pushed at 19q), Hidden Loot and IFS Tips (both still the Swiggy Dineout post, not a product).
- **Inactive, not in the top 40 sidebar rows:** Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba.

## Pushed

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced, so there were no slugs to submit. |
| `sitemap.xml` | Unchanged by this tick (ISR 1800s, the deals child holds the top 100 only by design) |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 5 codes added (`B05e9XJ0r`, `B0HG97GN9R`, `3WR2xmn`, `B0FKMNKY5C`, `i63MFhK`), now 5,625 entries |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.62s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.34s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 17:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,331 = 16,331 | OK, unchanged since DESIDIME 19i |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,940 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,940 = 16,940 | OK, caught up on DESIDIME 19i's 4 pushes |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for fourteen ticks in a row.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 17:14 |
| TG | 18:01 |
| CONTENT-SEO | 18:39 |
| DESIDIME | 18:43 |
| DEAL-INGEST | 18:53 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
