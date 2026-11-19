# TELEGRAM-DEAL-MONITOR tick — 2026-11-19n

The tick read the `.chat-list` sidebar in the Playwright richDeals profile with one `browser_evaluate` covering all 13 groups in `data/tg-groups.json`. It took single-product deals from any store and resolved the shortlinks. Each candidate was deduped against `data/tg-multi-seen.json` and against the live DB by productId. Every price was read on the PDP: Amazon in the logged-in tab, Myntra from its `ld+json`, Shopsy from `finalPrice` plus a check for the Sold Out widget. Run at about 13:00–13:08 IST.

**Result: 1 deal pushed (#16927, Myntra). The bulk push returned HTTP 201 with count 1, created:true. Two duplicate LIVE rows were re-verified at the same price, so nothing was written. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 7 of 7 endpoints and on the new page, and every CEO-audit check is green.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| Dealzone | `link.amazon/B031XZbuk` (Arrow blazer) | `amazon.in/s?k=Arrow+blazer…` | Skipped as a search page; marked seen |
| SB Loots | `bittli.in/uoNlLVM0` | Shopsy Lois Caron LCSS-8326 watch, pid `XWWHFZEMTGDDYTTD` | Duplicate of LIVE #15707. Shopsy reads ₹283 with no Sold Out, the same as the DB, so nothing was written. Marked seen. |
| Rogerkart | `myntr.in/J0jKwh` | `myntra.com/20784486` | **Pushed as #16927** |
| CoolzTricks | `amzn.to/4AA5XZ8` | `amazon.in/dp/B0H9FK9XZZ` (CG Iraya 5.9L geyser) | Duplicate of LIVE #16921. The PDP reads ₹3,199, M.R.P. ₹7,990, In stock, with add-to-cart present, the same as the DB, so nothing was written. Marked seen. |
| La-Fetch | `bitl.in/hTBRN6D` | Bundle collection | Already seen |
| (Amazon post) | `link.amazon/B08FsUNwo` | `/clp/` category page | Already seen |
| NonStopDeals | Caprese "Surf All Pages" | — | Category post, skipped |
| Hidden Loot / IFS Tips | Swiggy Dineout | — | Not a product, skipped |
| (Amazon post) | Solimo plant stand | — | Already LIVE as #16914 |

## Pushed

| Deal | Slug | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| #16927 | `dr-batras-pro-colour-nourish-hair-colour-cream-60g-60ml-20784486` | Myntra | ₹233 | ₹325 | 28% |

- **Verification:** the Myntra `ld+json` `Product.offers` reads price 233 and InStock. `sizeSellerData` agrees (discountedPrice 233, availableCount 101), and the M.R.P. is 325.
- **Affiliate link:** InRDeals (`inr.deals/track?id=inr678975705…&url=<encoded https://www.myntra.com/20784486>`), following the Myntra rule. Cuelinks was not used.
- **Image:** from `assets.myntassets.com`, the marketplace CDN.
- **Copy:** the description and how-to steps were written for this page, and no channel text was copied.
- **Title-₹ guard:** every ₹ figure in the title and how-to steps matches 233, and the title carries `(28% Off)`, which equals `round((1 − 233/325) × 100)`.
- **Prod:** the page returns 200 and its Offer price is 233.

## Freshness

| Check | Result |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 1 slug plus 3 hubs) | HTTP 200, 4 URLs |
| `sitemap.xml` | ISR 1800s. The deals child is top-100 only by design, so nothing was regenerated. |
| `llms.txt` | `force-dynamic`, no new hub page, 200 |

`data/tg-multi-seen.json` now has 5,602 entries (4 codes added).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.41s) |
| /dr-batras-…-20784486 | 200 (0.16s) |

## CEO audit

Run at about 13:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,319 = 16,319 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,927 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,924 vs 16,927 | OK. The cursor moved from 16,919 at DEAL-INGEST 19g, so the external broadcast cron is working through the batch. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

These items are carried from DEAL-INGEST 19g and are unchanged by this tick:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- 95% of LIVE deals have no `priceValidUntil`, because same-price confirms (two more this tick) write no priceHistory row;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead (12 zero ticks);
- the inflated M.R.P. list (#16784, #16792, #16891, #16882, #12328, #4927, #16246);
- the no-buy-box watch list (#9689, #15663, #14424, #16741, #16756, #3906);
- low-stock items (#16768, #16779, #12651, the Max sweatshirt, #16917 Flux);
- the Stage 1 Flipkart gaps;
- ASIN reuse (#2351, #15344, #6989, #4097; B0C7BM7L45 on #5577 and #7673);
- the DO API token still needs rotating.
