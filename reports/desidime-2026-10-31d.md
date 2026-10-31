# DESIDIME-INGEST: 2026-10-31d (~06:30 IST)

**Result: 0 new deals pushed. Every resolved card was either already in the DB or rejected in the last 24 h. Price-sync on the 2 duplicates: #14231 matches its product page, and #2327 (Amazon Basics descaler ×2, ₹77) has a dead product page, so it was set to EXPIRED. IndexNow returned HTTP 200 for 4 URLs. CEO audit clean.**

## Method
- Stage 1: `apps/api/scripts/ingest-desidime.mjs` → `scratchpad/dd1031d.json`. Reads cards from `/new` and the homepage only (no per-deal page fetch), applies the JUNK/GROCERY filters and resolves links through `visit.desidime.com`.
- Amazon product pages: Playwright MCP still hung and reticle returns CONNECTION_CLOSED, so pages were read with plain curl (desktop UA). Price comes from `#corePriceDisplay .a-price-whole`; stock from `#availability` plus `add-to-cart-button`. When the desktop read was empty, a mobile-UA read of `/gp/aw/d/ASIN` was the fallback.
- Dedup by `productId` against the live DB through Prisma.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 26 |
| Dropped (junk, grocery, or tracking landing page) | 13 |
| Resolved to a single product | 9 |
| Already in the DB (duplicate) | 2 |
| Rejected in the last 24 h, skipped again (WATFB4N4XTWAUZ8Z, B0FR27R9BB, B0CXQ5TGDZ, B0CZTGRS2S, Dellstore, District, Klook) | 7 |
| Fresh | 0 |
| Pushed | 0 |

## Duplicates rechecked on the product page
| ASIN | Row | Card | Product page | DB | Action |
|---|---|---|---|---|---|
| B0H4RSRSB5 | #14231 Bajaj Prohot 3 L | ₹2,430 | ₹2,699, in stock, add-to-cart present | ₹2,699 / MRP ₹5,720, LIVE | None. The card price is most likely after a coupon or bank offer |
| B0FCYLCX57 | #2327 Amazon Basics descaler ×2 | ₹77 | No price and no add-to-cart in any of 3 reads (desktop, mobile UA, `?th=1&psc=1`). An `outOfStock` div is present, the availability slot is keyed to sibling ASIN B0FCYHNR54, and the listing title now reads "Amazon Basics – Multi-Use Spray … 420 ml" | ₹77 / MRP ₹999, LIVE | **Set to EXPIRED** (Prisma `update` on status only, slug unchanged). Not in the top-100 sitemap. Prod page still returns 200 and now shows the EXPIRED banner |

## Freshness
- `node apps/api/scripts/indexnow-ping.mjs <#2327 slug>` returned **HTTP 200 for 4 URLs** (the slug plus `/`, `/offers` and `/sitemap.xml`).
- Sitemap: #2327 was never in the top-100 deals child, so nothing changes there. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.12–0.73 s) |
| API total vs DB LIVE | 15,166 = 15,166 (local and prod API). Down 1 from 15,167 because #2327 is now EXPIRED |
| API newest id vs DB max | 15,720 = 15,720 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 451 total, 0 without a cover, 0 without SEO fields |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 1 so far. CONTENT-SEO fires 06:34 IST |
| Broadcast cursor vs DB max | `lastId` 15,720 = 15,720 (drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP hung, reticle CONNECTION_CLOSED. As a result:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual product-page look.
- Outside the top 100: 118 descriptions and 32 titles still quote a stale %.
- 10-31 IST is at 1/4 posts. CONTENT-SEO fires 06:34 IST.
- Rotate the DO API token.
