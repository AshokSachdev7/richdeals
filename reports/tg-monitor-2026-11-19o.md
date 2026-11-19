# TELEGRAM-DEAL-MONITOR tick — 2026-11-19o

The tick read the `.chat-list` sidebar in the Playwright richDeals profile with one `browser_evaluate` covering all 13 groups in `data/tg-groups.json`. It took single-product deals from any store and resolved the shortlinks. Each candidate was deduped against `data/tg-multi-seen.json` and against the live DB by productId. Every Amazon price was read on the PDP in the logged-in tab. Run at about 14:00–14:10 IST.

**Result: 0 deals pushed. One duplicate LIVE row (#5848) was re-verified at the same price, so nothing was written. Three candidates were skipped or rejected. There was no IndexNow ping because nothing was pushed or repriced. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B0d19g25u` (ONLY women's clothing, up to 85% off) | `amazon.in/s?k=ONLY…` | Skipped as a search page; marked seen |
| CoolzTricks | `amzn.to/493xNBd` (Cetaphil, up to 56% off) | `amazon.in/s?k=Cetaphil…` | Skipped as a search page; marked seen |
| SB Loots | `amazn.lt/yjWakbil` (Patanjali Kesh Kanti 650 ml) | `amazon.in/dp/B0D8BRRD1B` | Duplicate of LIVE #5848. The PDP reads ₹240, M.R.P. ₹600, In stock, with add-to-cart present, the same as the DB, so nothing was written. Marked seen. |
| Dealzone | `link.amazon/B0fP5geOe` (Reebok Lite 3.0, posted at ₹1,196) | `amazon.in/dp/B096CVMM2G` (parent) | Rejected. Neither size is buyable: size 7 (B096CPPQKL) reads "Currently unavailable" with no price and no add-to-cart, and size 12 (B09MMGP1CP) has no price and no add-to-cart either. Marked seen. |
| Rogerkart | Dr. Batra's (Myntra) | — | Already LIVE as #16927 (TG 19n) |
| Dealdost | La-Fetch bundle | — | Already seen |
| INDIAN CHEAP DEALS | LG `/clp/` | — | Category page, already seen |
| NonStopDeals | Caprese "Surf All Pages" | — | Category post, skipped |
| Hidden Loot / IFS Tips | Swiggy Dineout | — | Not a product, skipped |

The two `/s?` redirects returned HTTP 503 from curl, but `url_effective` had already landed on the search URL, so the skip decision stands.

## Pushed

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced, so there were no slugs to submit. |
| `sitemap.xml` | ISR 1800s, unchanged by this tick |
| `llms.txt` | `force-dynamic`, 200 |

`data/tg-multi-seen.json` now has 5,606 entries (4 codes added).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.53s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.43s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 14:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,319 = 16,319 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,927 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,927 = 16,927 | OK, caught up |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

These items are carried forward and are unchanged by this tick:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- about 95% of LIVE deals have no `priceValidUntil`, because same-price confirms (one more this tick, #5848) write no priceHistory row;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead (12 zero ticks);
- the inflated M.R.P. list (#16784, #16792, #16891, #16882, #12328, #4927, #16246);
- the no-buy-box watch list (#9689, #15663, #14424, #16741, #16756, #3906);
- low-stock items (#16768, #16779, #12651, the Max sweatshirt, #16917 Flux);
- the Stage 1 Flipkart gaps;
- ASIN reuse (#2351, #15344, #6989, #4097; B0C7BM7L45 on #5577 and #7673);
- the DO API token still needs rotating.

## CronList next runs

All times are IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 14:14 |
| DESIDIME | 14:43 |
| DEAL-INGEST | 14:53 |
| TG | 15:01 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58, and AI-OVERVIEW 11-25 at 11:39.
