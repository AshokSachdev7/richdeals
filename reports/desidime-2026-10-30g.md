# DESIDIME-INGEST: 2026-10-30g (~12:38 IST)

**Result: 6 new deals pushed LIVE (#15560–15565: 3 Amazon, 3 Flipkart) and 4 dup LIVE rows price-synced (#5208, #11139, #12254, #753). 9 fresh candidates were rejected: 5 Amazon card prices sat below the PDP, and 4 IDs were already in `dd-rejected` (3 Flipkart drift, 1 Razer). IndexNow returned HTTP 200 for 13 URLs. CEO audit clean.**

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Flipkart candidates were verified in stage 1 via `productLd()` (±₹1, InStock). Playwright is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, the M.R.P., add-to-cart and `#availability`. Dedup was by `productId` against the live DB. New rows were written through Prisma with a `PriceHistory` row each. Dups were synced with `prisma.update`, never the bulk upsert, because the upsert rewrites slugs.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 37 |
| Junk / other store / not a product | 7 |
| Resolved to a single product | 30 |
| Dup (productId already in DB) | 15 (4 synced, 3 PDP = DB, 8 not shown in the card view) |
| Fresh | 15 |
| Already in `dd-rejected` (3 Flipkart drift, 1 Razer) | 4 |
| Rejected, Amazon card below the PDP | 5 |
| Pushed LIVE | **6** |

## Pushed
| Deal | ID | Price | MRP | Discount |
|---|---|---|---|---|
| #15560 Blaupunkt BTW20 PRO TWS earbuds | B0CTMFCZGV | ₹1,049 | ₹3,299 | 68% |
| #15561 40-piece birthday decoration kit | B0FJG7NXNS | ₹99 | ₹499 | 80% |
| #15562 Philips TAA4216 on-ear sports headphones (IP55) | B08ZNRHJFX | ₹2,999 | ₹8,999 | 67% |
| #15563 CMF by Nothing Watch 3 Pro (Flipkart) | SMWHMR98GFCG4FYM | ₹6,499 | ₹10,999 | 41% |
| #15564 Daikin 2025 1 Ton 5 Star inverter split AC ATKM35UV16WA (Flipkart) | ACNHKUU8AH6YFCQ5 | ₹31,990 | ₹51,150 | 37% |
| #15565 Samsung 55" Neo QLED Mini-LED QA55QN70F (Flipkart) | TVSHBWJE8VUSPZCG | ₹59,990 | ₹1,04,000 | 42% |

Affiliate:
- Amazon: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.
- Flipkart: `/p/itm…?pid=…&affid=djhackraj`.

The titles and descriptions are original rewrites, and the images come from the marketplace CDN.

## Dups
| Deal | DB → PDP | Discount | Action |
|---|---|---|---|
| #5208 Helett H30C Lite label printer | ₹5,865 → ₹5,579 (MRP ₹14,999) | 61% → 63% | synced |
| #11139 boAt Nirvana Zenith Pro | ₹2,799 → ₹2,699 (MRP ₹14,990) | 81% → 82% | synced |
| #12254 Logitech MK270r combo | ₹1,195 / ₹2,495 → ₹1,495 / ₹2,295 | 52% → 35% | synced (the price went UP) |
| #753 Wipro Garnet 10 W downlight | ₹144 → ₹140 (MRP ₹390) | 63% → 64% | synced |
| #443 Haier 596 L, #5668 Galaxy Buds4 Pro, #5023 Visio World 43" | PDP = DB | | none |

Each sync updated price, mrp, discountPct and the ₹ figures and "% off" in the title and description, and wrote a `PriceHistory` row. Slugs were unchanged.

## Rejected
| ASIN | Product | Card | PDP |
|---|---|---|---|
| B0HBR1NLVS | Desidiya rope light | ₹183 | ₹189 |
| B0BCW4YMR8 | NIIMBOT B1 | ₹2,210 | ₹2,394 |
| B0FKZPDH66 | Helett H30CPro | ₹6,618 | ₹7,353 |
| B07BYXQXBZ | BenQ SW240 | ₹23,739 | ₹26,489 |
| B0DKNZSP3Q | MSI MPG 341CQPX | ₹85,999 | ₹89,999 |
| BLBFGEQBGRGYYZQN, ACCHE36MV6PHBRRN, MONHP2VGG4KUCGHQ (Flipkart), B0DGH2D1NJ (Razer) | | | already in `dd-rejected` |

`data/dd-rejected.json` went from 1152 to 1157 entries.

## Freshness
- `indexnow-ping.mjs` with the 10 slugs (6 new + 4 synced) returned **HTTP 200 for 13 URLs**: the 10 slugs plus `/`, `/offers` and `/sitemap.xml`.
- The sampled new and synced deal pages (#15560, #15564, #15565, #12254) return 200 on prod.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic. Neither needs anything.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,013 = 15,013 (+6) |
| API newest id vs DB max | 15,565 = 15,565 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 448 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 2 so far (rule met) |
| Broadcast cursor vs DB max | `lastId` 15,559 vs 15,565. The 6 new deals are minutes old, and the external broadcast cron picks them up on its next run. This is normal lag, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS Flipkart cards are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171).
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
