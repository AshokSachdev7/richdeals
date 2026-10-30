# DESIDIME-INGEST: 2026-10-30f (~10:36 IST)

**Result: 1 new deal pushed LIVE (#15545 Brother DCP-T830DW). 14 fresh candidates were rejected: 12 Amazon card prices were bank-offer / HDFC CC prices below the PDP, and 2 Flipkart cards drifted from the PDP in stage 1. 3 visible dup LIVE rows matched the PDP, so nothing was synced. IndexNow returned HTTP 200 for 4 URLs. CEO audit clean.**

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Playwright is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability`, the M.R.P. and the seller. Dedup was by `productId` against the live DB. The new row was written through Prisma with a `PriceHistory` row.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Junk / other store / not a product (incl. a Pepe Jeans sitewide offer) | 9 |
| Resolved to a single product | 24 |
| Dup (productId already in DB) | 9 |
| Fresh | 15 |
| Rejected, Flipkart PDP drift (stage 1) | 2 |
| Rejected, bank-offer card below the PDP | 12 |
| Pushed LIVE | **1** |

## Pushed
| Deal | ASIN | Price | MRP | Discount |
|---|---|---|---|---|
| #15545 Brother DCP-T830DW Wi-Fi ink tank colour printer (auto duplex, ADF) | B0DWN2JNR5 | ₹20,799 | ₹25,990 | 20% |

The card read ₹29,049, which is above the MRP, so the card was wrong and the PDP price was used. PDP: In stock, add-to-cart + buy-now present, sold by Clicktech Retail. Affiliate: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. The title and description are original rewrites, and the image comes from `m.media-amazon.com`.

## Dups
| Deal | ASIN | DB vs PDP | Action |
|---|---|---|---|
| #15112 | B01MV5G8K6 | ₹81 = ₹81 | none |
| #5336 | B0FDFRGWLQ | ₹5,299 = ₹5,299 | none |
| #12942 | B0HC7C2ZS9 | ₹4,999 = ₹4,999 | none |
| 6 other dup pids | | not shown in the card view this sweep | none |

## Rejected
| ID | Product | Card | PDP |
|---|---|---|---|
| B0CV5DGQBT | Bosch dryer | ₹43,490 | ₹49,990 |
| B0GCM184FY | Godox flash | ₹12,749 | ₹13,999 |
| B0C43R8SRB | Alesis drums | ₹33,044 | ₹37,344 |
| B0D3Q9LJP6 | BenQ monitor | ₹9,990 | ₹11,099 |
| B0GQVL28XJ | iPad Air | ₹70,150 | ₹77,900 |
| B0GCFSQ4X7 | Midea | ₹24,741 | ₹31,491 |
| B0CKVD62NX | Rode NT1 | ₹16,650 | ₹17,900 |
| B0CDPPNKFF | Edifier | ₹13,740 | ₹14,990 |
| B09NYGVT2Z | OBAGE | ₹11,749 | ₹12,999 |
| B0FDL5WKP5 | Samsung M7 (HDFC CC price) | ₹26,249 | ₹28,499 |
| B0GVJYFTQX | HP laptop | ₹78,190 | ₹84,790 |
| B0FPMH7SDY | SleepyHug (HDFC CC price) | ₹3,959 | ₹4,398 |
| MONHGWESQPHPNMHZ | Samsung monitor (Flipkart) | | PDP drift, stage 1 |
| COMHS3S6BFUVVYWP | Lenovo (Flipkart) | | PDP drift, stage 1 |

`data/dd-rejected.json` went from 1126 to 1137 entries. 3 of the 14 IDs were already in the log, and their timestamps were refreshed.

## Freshness
- `indexnow-ping.mjs` with the 1 slug returned **HTTP 200 for 4 URLs**: the slug plus `/`, `/offers` and `/sitemap.xml`.
- The deal page returns 200 on prod.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic. Neither needs anything.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,993 = 14,993 (+1) |
| API newest id vs DB max | 15,545 = 15,545 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 448 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 2 so far (rule met) |
| Broadcast cursor vs DB max | `lastId` 15,544 vs 15,545. The new deal is minutes old, and the external broadcast cron picks it up on its next run. This is normal lag, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171).
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
