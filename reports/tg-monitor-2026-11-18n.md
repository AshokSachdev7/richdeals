# TELEGRAM-DEAL-MONITOR tick — 2026-11-18n

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Shortlinks were resolved with curl. The one Amazon candidate was checked in the logged-in Amazon tab, then with the mobile-UA `/gp/aw/d/` fallback. Run at about 13:05 IST.

**Result: 0 deals pushed. The only fresh single-product candidate had no buy box, and every other newest post was a category post, a multi-product post, low-ticket FMCG, a non-product offer or already LIVE. With nothing pushed, there were no slugs to ping on IndexNow. Prod returned 200 on 7 of 7 endpoints, every CEO-audit check is green and all 9 session crons are armed.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| Dealzone | link.amazon/B03ZrbHDb → B0GVN9CCFB | Sounce 20W iPhone fast-charging adapter, channel price ₹339 | **Rejected:** no buy box. The desktop PDP had no `.a-price-whole` and no add-to-cart button; the mobile PDP had no `priceAmount` and showed "Currently unavailable". |
| ONLINE SHOPPING DEALS | link.amazon/B0aniYt2d → B0GC4J22D3 | Bio-th glasses, ₹219 | Already seen. LIVE as #16792 at the same price, confirmed by DESIDIME 18g. |
| SB Loots | bittli.in/S0ovK0ew → Shopsy HOLFVFXY9TJ8KXBJ | Walnut-almond hair oil | Skipped: low-ticket generic FMCG. |
| CoolzTricks | amzn.to/4jmCThT | Panasonic LED bulbs | Skipped: resolves to an `/s?` search page, so it is a category post. |
| Rogerkart, NonStopDeals, INDIAN CHEAP DEALS, Dealdost | — | Lavie bags, Caprese bags, LG sale, EUCOS multi-pack | Skipped: category or multi-product posts, some older than a day. |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product deal. |
| RichDeals | — | Our own channel | Skipped. |

The three shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,358 entries.

## Freshness

- **IndexNow:** no slugs to ping, because nothing was pushed.
- **`sitemap.xml` and `llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.46s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.64s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 13:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,220 = 16,220 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,800 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,800 vs 16,800 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 13:00 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499. The 77% discount may rest on an inflated MRP.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST): SITEMON 13:50, TG 14:03, DESIDIME 14:43, DEAL-INGEST 14:53, CONTENT-SEO 18:39 on 11-18; SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58 on 11-19; AI-OVERVIEW 11-25 11:39. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
