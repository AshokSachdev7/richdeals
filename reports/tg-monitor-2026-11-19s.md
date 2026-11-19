# TELEGRAM-DEAL-MONITOR tick — 2026-11-19s

The tick read all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over the Telegram Web sidebar in the Playwright richDeals profile. Shortlinks (`amzn.to`, `link.amazon`, `bittli.in`) were resolved with curl. Candidates were deduped against `data/tg-multi-seen.json` and against the live DB by productId. Amazon candidates were read on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). The Shopsy candidate was read from the saved product-page HTML. Run at about 17:45–18:06 IST.

**Result: 1 new deal pushed LIVE (HTTP 201, count 1, `created:true`, #16941). 1 duplicate LIVE row was repriced (#6027 Park Avenue, ₹263 → ₹239). 1 candidate was rejected because its price could not be verified. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 7 of 7 endpoints and on both touched pages at the first probe.**

## Candidates

| Group | Link | Resolved to | Decision |
|---|---|---|---|
| CoolzTricks | `amzn.to/3WFB6vN` | B0FLY9JKTQ, Park Avenue Grace Women EDP 100 ml | Duplicate of LIVE #6027. The PDP shows ₹239, M.R.P. ₹799, in stock, with add-to-cart. **Repriced** (see below), not pushed through bulk. |
| Dealzone | `link.amazon/B02LBBTCn` | B09XJ1NN14, Atom 20 Pcs stainless steel door hinges, 3 inch | New. The PDP shows ₹360, M.R.P. ₹3,398, in stock, with add-to-cart. **Pushed** as #16941. |
| SB Loots | `bittli.in/CVnn6jWz` | Shopsy BKPGCYEFKEYZUMKC, Fast Fashion 30 L laptop backpack | Rejected. The page carries conflicting `finalPrice` values (₹261 and ₹278) and three different `mrp` values (₹540, ₹999, ₹1,999). The channel posted no price, and Shopsy has no ld+json, so the price cannot be verified to ±₹1. It is also an unbranded, generic item. |

The other groups had nothing new: their newest posts were already in the seen list, were unchanged since 19r, or were not single products.

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16941 | Atom 20 Pcs stainless steel door hinges, 3 inch, 304 SS, 16 gauge, HNG-3X16 (B09XJ1NN14) | Amazon | ₹360 | ₹3,398 | 89% |

The affiliate link is `https://www.amazon.in/dp/B09XJ1NN14?th=1&psc=1&tag=ashoksachdev-21` and the image is from the marketplace CDN (`m.media-amazon.com`). Every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., and "89% off" equals discountPct. The description says plainly that the M.R.P. looks inflated and gives the per-hinge cost (about ₹18), and it notes that screws are not included. The deal was added to the inflated-M.R.P. watch list.

## Repriced (duplicate LIVE rows)

| Id | Deal | PDP | Action |
|---|---|---|---|
| 6027 | Park Avenue Grace Women EDP 100 ml | ₹239 / M.R.P. ₹799, in stock | **Repriced** ₹263 → ₹239 (67% → 70%) via `prisma.deal.update`. The ₹ in the title, description and howTo was rewritten, and a priceHistory row was added. Prod shows Offer price 239. |

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 5 URLs: the new hinges slug, the repriced Park Avenue slug, and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 6 codes added (`3WFB6vN`, `B0FLY9JKTQ`, `B02LBBTCn`, `B09XJ1NN14`, `CVnn6jWz`, `BKPGCYEFKEYZUMKC`), now 5,631 entries |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.16s) |
| /offers | 200 (0.08s) |
| /blog | 200 (0.43s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.08s) |
| /llms.txt | 200 (0.38s) |
| New page #16941 | 200 (0.15s), first probe |
| Repriced page #6027 | 200 (0.14s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 18:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,332 = 16,332 | OK (+1 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,941 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,940 vs 16,941 | Behind by this tick's 1 push only. The external broadcast cron catches up on its next run, so this is not rot. |
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
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, and now **#16941** (Atom hinges, M.R.P. ₹3,398 for a ₹360 pack).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 18:14 |
| CONTENT-SEO | 18:39 |
| DESIDIME | 18:43 |
| DEAL-INGEST | 18:53 |
| TG | 19:01 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
