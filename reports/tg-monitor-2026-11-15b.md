# TELEGRAM-DEAL-MONITOR tick — 2026-11-15b

One `browser_evaluate` over the `.chat-list` sidebar read the newest post of every group in `data/tg-groups.json` (Playwright MCP, richDeals profile). Each single-product candidate was resolved and then deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was read on the PDP: Amazon with an in-tab fetch in the logged-in tab, Flipkart from the ld+json in the tab. Run at about 01:20 IST.

**Result: 0 pushed. 3 duplicate rows were re-verified on the PDP and all match the DB. 1 rejected (Syska, out of stock and price drift). The rest were category, loot or non-deal posts. IndexNow was not needed for this tick; the INDEXNOW tick (`indexnow-2026-11-15a`) resubmitted 106 urls with HTTP 200. Prod 7/7 returned 200 and every DB check is green.**

## Dup re-verifies (no change)

| Row | Deal | PDP reading |
|---|---|---|
| #5035 | LG 8kg washer B0DPHTSTYJ | ₹20,990, MRP ₹28,990, in stock, add-to-cart. Matches the DB. |
| #16506 | Shatras soap B0F2M184N3 | ₹151, MRP ₹999. Matches the DB, but **only 1 left**. |
| #16501 | RR Nuts Anjeer B0HMHFZ2ZM | ₹399, MRP ₹999, in stock. Matches the DB. |

## Rejected

| Item | Reason |
|---|---|
| Syska 10000mAh power bank (Flipkart PWBGGD4THDQZYAY6, via `fkrt.co/l5KOxl`, their affid `adminpais`) | ld+json says ₹1,392 and **OutOfStock**, against the channel's ₹799 |

The pid was added to `data/dd-rejected.json` with `Date.now()`, bringing it to 1,973 keys. That file carries earlier uncommitted changes, so it is not part of this commit.

## Skipped

- CoolzTricks Haier AC: the post price includes a bank offer, and the deal was already rejected.
- Category posts: Dealzone PUMA, SB Loots Symbol, NonStopDeals Caprese.
- Not deals: Swiggy Dineout (Hidden Loot, IFS Tips), OMG "Video dekho", Rogerkart "Photo".
- Deal Dibba did not appear in the sidebar.

## Freshness

- IndexNow: nothing was pushed, so this tick needed no ping. The INDEXNOW tick in the same run resubmitted the 94 recent deal urls, 6 posts and 6 hubs: **HTTP 200**.
- `sitemap.xml` (ISR 1800s) and `llms.txt` (force-dynamic) needed no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.95s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.75s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,004 = 16,004 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,576 vs 16,583 | Pending. The external broadcast run drains it and self-heals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- #16506 Shatras is down to 1 left. Expire it when it goes out of stock. #16558 Symbol shorts (4 left) also needs a re-check.
- 13 IFS Flipkart cards are still unresolved.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
