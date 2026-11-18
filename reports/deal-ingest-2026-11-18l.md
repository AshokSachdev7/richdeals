# DEAL-INGEST indiafreestuff tick — 2026-11-18l

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` with at least 2.5s between requests. It tried to resolve each card's base64 `?rto=` Buy Now id to a real merchant URL. Run at about 22:55–23:05 IST.

**Result: 0 deals pushed. All 96 discovered cards failed to resolve: every `?rto=` Buy Now redirected to `https://www.indiafreestuff.in/` (the homepage), not to a merchant. No product was guessed from a card title. With no batch, there was no IndexNow ping. Prod returned 200 on 7 of 7 endpoints and every CEO-audit check is green.**

## Stage 1

| Measure | Value |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 96 |
| Resolved to a merchant URL | 0 |
| Pushed | 0 |

The cards that were dropped included Gesto, Park Avenue, Mustard Magma, Halonix, Quace, Signora Ware, a Royal Enfield helmet, Panasonic, Dove, Tu Casa, Aivin, Dabur Gulabari, Sparkmate, Livon, a Xiaomi 65" TV, Bergner, Winix and Ant Ghost. Several of these brands are already LIVE from DesiDime and Telegram ticks (Sparkmate #16677, Livon #16866, Ant Ghost #16880, Panasonic #16872).

Redirector history: 7 of 93 resolved at 17f, 7 of 99 at 18g, 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j, 0 of 94 at 18k and **0 of 96 at 18l**. That makes three straight zero ticks. The rule stands: if every tick on 11-19 IST resolves 0, repoint the `23 */2 * * *` slot.

## Pushed

None.

## Freshness

- **IndexNow:** not pinged, because there was no batch.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

All probes used `curl -m 30`.

## CEO audit

Run at about 23:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,273 = 16,273 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,881 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,881 = 16,881 | OK. The cursor has fully drained DESIDIME 18l's 7 rows. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`, or unverified feature claims.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST): TG 23:05 and SITEMON 23:50 on 11-18. On 11-19: CONTENT-SEO 00:39, DESIDIME 00:43, DEAL-INGEST 00:53, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
