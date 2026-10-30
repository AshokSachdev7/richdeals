# DESIDIME-INGEST: 2026-10-30i (~16:30 IST)

**Result: 7 deals pushed LIVE (#15608–15614, all Amazon): the Milton casserole, 4 ASICS shoes, a Tekiart card holder and a momos mould. 2 dup LIVE rows were price-synced in place (#7897 BoroPlus ₹127 → ₹115, #2092 Safari trolley set ₹4,369 → ₹4,249). 6 candidates rejected (4 on price drift, 1 grocery, 1 loot). 3 Flipkart candidates dropped because there is no browser to verify them. IndexNow returned HTTP 200 for 12 URLs. CEO audit clean.**

Method:
- Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK/GROCERY filters and resolved Buy Now through `visit.desidime.com`.
- Playwright MCP is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, `apex-basisprice-value` for the MRP, add-to-cart and `#availability`.
- Flipkart cannot be verified without a browser (curl gets a 403 reCAPTCHA), so those candidates were dropped.
- Dedup was by `productId` against the live DB. New rows were written with `deal.create` plus a `PriceHistory` row. Dups were synced with `deal.update` plus a `PriceHistory` row, never the bulk upsert.

## Funnel
| Stage | Count |
|---|---|
| Cards | 37 |
| Junk | 1 |
| Resolved | 35 |
| Dup (productId already in DB) | 14 (2 price-synced, 5 PDP = DB, 7 card = DB) |
| Fresh | 21 |
| Stage-1 Flipkart drift SKIPs (HP Victus, Origin dehumidifier, Crompton geyser) | 3 |
| Already in `dd-rejected` (B07GL1976K, B0DD7T8H2Q) | 2 |
| Rejected | 6 |
| Flipkart dropped (no browser) | 3 |
| Pushed LIVE | **7** |

## Pushed
| Deal | ASIN | Price | MRP | Discount |
|---|---|---|---|---|
| #15608 MILTON Aspire 1500 insulated casserole 1180 ml (Blue) | B0CQTK81M1 | ₹199 | ₹485 | 59% |
| #15609 ASICS men sneaker, white (style A) | B0G1K48XYZ | ₹3,709 | ₹6,999 | 47% |
| #15610 ASICS men sneaker, white (style B) | B0G1K9PFZR | ₹4,239 | ₹7,999 | 47% |
| #15611 ASICS Japan S men sneakers (Black) | B0DV5K735H | ₹2,800 | ₹6,999 | 60% |
| #15612 ASICS Jolt 5 men running shoes | B0DS66WQVM | ₹2,640 | ₹5,999 | 56% |
| #15613 TEKIART car windshield card holder | B0DNG72S2F | ₹49 | ₹799 | 94% |
| #15614 Plastic momos and gujiya maker mould | B0HJWHJG1G | ₹59 | ₹299 | 80% |

Affiliate: `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. The titles and descriptions are original rewrites, and the images come from `m.media-amazon.com`.

## Dups
| Deal | DB → PDP | Action |
|---|---|---|
| #7897 BoroPlus Soft Light moisturising cream 300 ml (B0B8QC4TXG) | ₹127 / ₹500 → ₹115 / ₹379, 70% | price-synced, title rewritten |
| #2092 Safari Pentagon Pro 8-wheel trolley set of 3, Cyan (B097BDYZ26) | ₹4,369 / no MRP → ₹4,249 / ₹33,997, 88% | price-synced, MRP backfilled; the description flags the ₹33,997 MRP as looking high |
| #2787 Wahl (B00QNOZ7GO) | PDP ₹797 = DB | none |
| #15586 GLAMVEDA (B0DRXZYW1N) | PDP ₹142 / ₹297 = DB | none |
| #15567 Dollar Rainguard (B0D3X5PS5J) | PDP ₹281 / ₹849 = DB | none |
| #443 Haier 596 L (B0FB8LX2TJ) | PDP ₹67,990 = DB | none |
| #5668 Galaxy Buds4 Pro (B0GMJLFCR7) | PDP ₹17,399 = DB | none |
| 7 other LIVE rows | card = DB | none |

Each sync wrote a `PriceHistory` row. The slugs were unchanged.

## Rejected
| Key | Product | Card → PDP | Reason |
|---|---|---|---|
| B0H8SPLT1F | Mini USB LED | ₹57 → ₹60 | drift |
| B0HCTHQRVJ | OnePlus Pad Lite | ₹17,699 → ₹22,499 | drift |
| B0F9FTMN9M | ANKIT storage box | ₹39 → ₹179 | drift |
| B0DVLVCDH6 | Hook-and-loop tape | ₹82 → ₹85 | drift |
| B0F9L52BWQ | Haldiram's peda | — | grocery |
| WCWHF6BSCHZHFY2F | Flipkart "LOOOT" post | — | loot |

Dropped (no browser): Flipkart HDRH484GVGYMFHTP and HDREUGN34XZMBP6N (NOVA dryers), COBHPEYGMPH5GFHN (pastry brush).

`data/dd-rejected.json` went from 1,205 to 1,211 entries.

## Freshness
- `indexnow-ping.mjs` with 9 slugs (7 new + #7897 + #2092) returned **HTTP 200 for 12 URLs**: the 9 slugs plus `/`, `/offers` and `/sitemap.xml`.
- #15608, #15612, #15614 and #2092 return 200 on prod.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,061 = 15,061 (+7) |
| API newest id vs DB max | 15,614 = 15,614 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 449 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 3 (rule met; cap 4) |
| Broadcast cursor vs DB max | `lastId` 15,607 vs 15,614. The external broadcast cron is draining this batch. Normal lag, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS and DesiDime Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
