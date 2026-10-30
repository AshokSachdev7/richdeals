# DESIDIME-INGEST: 2026-10-30e (~08:28 IST)

**Result: 2 new deals pushed LIVE (#15539, #15540) and 2 dup LIVE rows price-synced (#1650, #11302). 10 fresh candidates were rejected: 9 card prices were bank-offer prices below the PDP, and 1 listing had no add-to-cart. IndexNow returned HTTP 200 for 7 URLs. CEO audit clean.**

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Playwright is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability` and the M.R.P. Dedup was by `productId` against the live DB. New rows were written through Prisma with a `PriceHistory` row each. Dups were synced with `prisma.update`, never the bulk upsert, because the upsert rewrites slugs.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Junk / other store / not a product | 8 |
| Resolved to a single product | 25 |
| Dup (productId already in DB) | 13 |
| Fresh | 12 |
| Rejected, bank-offer card below the PDP | 9 |
| Rejected, no add-to-cart | 1 |
| Pushed LIVE | **2** |

## Pushed
| Deal | ASIN | Price | MRP | Discount |
|---|---|---|---|---|
| #15539 ACTIVA Inferno 6 L instant geyser (5 star) | B0FRMBZK72 | ₹2,399 | ₹4,990 | 52% |
| #15540 Lifelong foldable clothes drying rack | B0D7PXK8TY | ₹1,041 | ₹7,999 | 87% |

Affiliate: `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`. The titles and descriptions are original rewrites, and the images come from `m.media-amazon.com`.

## Dups
| Deal | ASIN | DB → PDP | Discount | Action |
|---|---|---|---|---|
| #1650 Havells mixer + toaster + blender combo | B0GNLS… | ₹13,295 → ₹10,037 (card ₹7,227 = bank offer) | 47% → 60% | synced. Slug unchanged; "@7927" removed from the description |
| #11302 Solimo 1 L insulated bottle | B0DCG5GBYV | ₹479 → ₹486 | 72% → 71% | synced |
| #48 (EXPIRED) | | PDP ₹40, MRP ₹179 | | left EXPIRED (low-ticket add-on) |
| #5336, #12942, #5442 | | PDP = DB | | unchanged |

Each sync updated price, mrp, discountPct and the ₹ figures in the title and description, and wrote a `PriceHistory` row.

## Rejected
| ASIN | Product | Card | PDP |
|---|---|---|---|
| B0CV3K4KD4 | Haier | ₹6,030 | ₹8,590 |
| B0H4RYXR64 | Bajaj Prohot | ₹3,240 | ₹3,599 |
| B0H44VW2WP | Aquaguard | ₹14,499 | ₹17,999 |
| B0DJS9ZK73 | Havells air fryer | ₹9,450 | ₹10,499 |
| B0BZHLSWFM | Racold | ₹11,588 | ₹13,099 |
| B0F3P4G8SY | Insta360 X5 | ₹43,490 | ₹51,990 |
| B0GRGB5XSK | Samsung 8 kg | ₹17,240 | ₹20,990 |
| B0872G7DT4 | Havells juicer | ₹2,871 | ₹3,190 |
| B0DS681G4K | Samsung 9 kg | ₹28,740 | ₹40,490 |
| B0H6N8CP7S | Personalized pen ₹45 | | no add-to-cart |

`data/dd-rejected.json` went from 1110 to 1116 entries. 4 of the 10 ASINs were already in the log, and their timestamps were refreshed.

## Freshness
- `indexnow-ping.mjs` with the 4 slugs returned **HTTP 200 for 7 URLs**: the 4 slugs plus `/`, `/offers` and `/sitemap.xml`.
- All 4 deal pages return 200 on prod.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic. Neither needs anything.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,988 = 14,988 (+2) |
| API newest id vs DB max | 15,540 = 15,540 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 448 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 2 so far (rule met) |
| Broadcast cursor vs DB max | `lastId` 15,540 = 15,540 (the external broadcast cron already picked up the new deals) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session. Amazon is verified by desktop curl, TG reads only 5 of 13 groups, and 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171). reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
