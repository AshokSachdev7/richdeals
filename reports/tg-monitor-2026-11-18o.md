# TELEGRAM-DEAL-MONITOR tick — 2026-11-18o

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Run at about 14:05 IST.

**Result: 0 deals pushed. Every post since TG 18n (13:05) was a category master link or low-ticket FMCG, so there was nothing to verify and no slugs to ping on IndexNow. Prod returned 200 on 7 of 7 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks (13:56) | myntr.it/uRPLDku | Reebok women's clothing, "up to 77% off" | Skipped: Myntra master link, a category post. |
| SB Loots (13:39) | amazn.lt/EbwJRu3G | Wicked Gud noodles, 50% coupon | Skipped: low-ticket FMCG. |
| Dealdost (13:29) | bitli.in/EOVgaLE + category links | mCaffeine buy 1 get 3 | Skipped: store-wide offer, multi-product. |
| Dealzone (13:21) | myntr.it/K8IsXeW | Reebok women's clothing, "up to 78% off" | Skipped: Myntra master link, a category post. |
| ONLINE SHOPPING DEALS (10:33) | link.amazon/B0aniYt2d | Bio-th glasses | Already seen, LIVE as #16792. |
| Rogerkart, NonStopDeals, INDIAN CHEAP DEALS, Hidden Loot, IFS Tips | — | Lavie bags, Caprese bags, LG sale, Swiggy Dineout | Unchanged since 18n; category or non-product posts. |
| RichDeals | — | Our own channel | Skipped. |

The four new shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,362 entries.

## Freshness

- **IndexNow:** no slugs to ping, because nothing was pushed.
- **`sitemap.xml` and `llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.86s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 14:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,224 = 16,224 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,804 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,804 vs 16,804 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList in SITEMON 18n, about 13:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **IFS redirector:** 7 of 99 resolve (Amazon only); the rest 302 to the homepage.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): DESIDIME 14:43, SITEMON 14:50, DEAL-INGEST 14:53, TG 15:03, CONTENT-SEO 18:39, INDEXNOW 19:05; SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58 on 11-19; AI-OVERVIEW 11-25 11:39. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
