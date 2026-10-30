# DESIDIME-INGEST: 2026-10-30h (~20:05 IST)

**Result: 1 new deal pushed LIVE (#15586 GLAMVEDA Smoky Intense black kajal, ₹142 against a ₹297 MRP, 52% off). 2 dup LIVE rows were price-synced: #12872 Sounce hub went from ₹179 to ₹159, and #1357 Wipro extension pack went from ₹565 to ₹521, with its MRP (₹1,598) backfilled and its old truncated title rewritten. #15542 Enter laptop battery was set to EXPIRED because the PDP reads "Currently unavailable"; its page stays live. 6 fresh candidates were rejected for drift. IndexNow returned HTTP 200 for 7 URLs. CEO audit clean.**

Method:
- Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) reads the `/new` and homepage cards only, applies the JUNK/GROCERY filters and resolves `visit.desidime.com`.
- Playwright MCP is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, the M.R.P. text, add-to-cart and `#availability`.
- Dedup was by `productId` against the live DB.
- The new row was written with `deal.create` plus a `PriceHistory` row. Dups were synced with `prisma.update` plus a `PriceHistory` row, never the bulk upsert (it rewrites slugs).

## Funnel
| Stage | Count |
|---|---|
| Cards | 35 |
| Junk / other-store dropped | 1 |
| Shopsy jackets dropped | 3 |
| Amazon dups | 8 |
| Flipkart price drift (already in `dd-rejected`: LG 27" 4K, suitcase, Whirlpool chimney, MacBook Air M5) | 4 |
| Klook (no ld+json) | 1 |
| Fresh Amazon | 9 (2 already rejected, 6 new rejects, **1 pushed**) |

## Pushed
| Deal | ASIN | Price | MRP | Discount | PDP |
|---|---|---|---|---|---|
| #15586 GLAMVEDA Smoky Intense black kajal pencil, 0.35 g | B0DRXZYW1N | ₹142 | ₹297 | 52% | add-to-cart present |

- Slug: `/glamveda-smoky-intense-black-kajal-pencil-0-35-g-b0drxzyw1n` (200 on prod).
- Affiliate: `amazon.in/dp/B0DRXZYW1N?th=1&psc=1&tag=ashoksachdev-21`.
- The description is an original rewrite. The image comes from `m.media-amazon.com`.

## Dups
| Deal | DB | PDP | Action |
|---|---|---|---|
| #12872 Sounce 4-in-1 USB-C hub (B0D2X9PR6P) | ₹179 / MRP ₹999, 82% | ₹159 / MRP ₹999, add-to-cart | **synced to ₹159 (84%)**; ₹/% in title and description updated |
| #1357 Wipro 4+1 extension board, pack of 2 (B0BBZSHLP7) | ₹565, MRP null | ₹521 / MRP ₹1,598, add-to-cart | **synced to ₹521 (67%)**, MRP backfilled; the old truncated "...Multip at ₹565" title and the description were rewritten clean |
| #15542 Enter 4000 mAh battery for Dell Inspiron 1525 (B0BQRJHB8N) | ₹408 / MRP ₹2,995 | no price, no add-to-cart, `#availability` "Currently unavailable" | **set to EXPIRED**. The page stays live with the banner (200 on prod) |
| #15535 kids curtain (B09KQ6R8C5) | ₹269 / ₹1,999 | ₹269 / ₹1,999 | none |
| 4 others (Safari B097BDYZ26, Haier B0FB8LX2TJ, Galaxy Buds4 Pro B0GMJLFCR7, Dollar raincoat B0D3X5PS5J) | | verified = DB in IFS 10-30g | none |

Slugs were unchanged on every synced row.

## Rejected
| ASIN | Product | Card | PDP |
|---|---|---|---|
| B0C35V1CLK | Epson V39 II scanner | ₹4,260 | ₹5,650 |
| B0G2B1S4YL | Redmi 15C | ₹14,499 | ₹15,999 |
| B0H2FD3L97 | Lenovo Idea Tab | ₹25,998 | ₹31,998 |
| B0HKJN24R2 | IdeaPad Slim 3 | ₹66,240 | ₹77,990 |
| B0CV5RVKJL | HP LaserJet 4104dw | ₹29,525 | ₹34,900 |
| B0DJGTRT51 | INALSA blender | ₹2,565 | ₹2,849 |
| Klook 6f90d6024061 | Klook listing | | no ld+json price |

Marshall Willen II (B0DD7T8H2Q) and Razer Barracuda X (B0DGH2D1NJ) were already rejected. `data/dd-rejected.json` went from 1,172 to 1,178 entries.

## Freshness
- `indexnow-ping.mjs` with 4 slugs (#15586, #12872, #1357, #15542) returned **HTTP 200 for 7 URLs**: the 4 slugs plus `/`, `/offers` and `/sitemap.xml`.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,033 = 15,033 (+1 new, −1 expired) |
| API newest id vs DB max | 15,586 = 15,586 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 449 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 3 (rule met; cap 4) |
| Broadcast cursor vs DB max | `lastId` 15,585 vs 15,586. One row of drain lag, which is normal |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS Flipkart cards are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
