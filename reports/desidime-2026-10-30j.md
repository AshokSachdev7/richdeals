# DESIDIME-INGEST: 2026-10-30j (~18:35 IST)

**Result: 2 deals pushed LIVE (#15634 GIGAWATTS solar wall light ₹199, #15635 Bla Bli Blu First Crush EDP 90 ml ₹259 via InRDeals). 3 dup LIVE rows were price-synced in place (#1102 Samsung HW-T42E soundbar ₹5,299 → ₹8,990, #4237 Beurer MN9X ₹1,290 → ₹890, #5644 Acer Aspire One ₹41,999 → ₹41,990); #1102 and #4237 had a null MRP, now backfilled, and #5644's stale coupon line was rewritten. 1 more dup matched its PDP (#13474). 3 Amazon candidates rejected (2 drift, 1 unavailable), 3 non-Amazon dropped (no ld+json or grocery), 6 Flipkart candidates dropped (no browser). IndexNow returned HTTP 200 for 8 URLs. CEO audit clean.**

Method:
- Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com` to the real merchant URL.
- Playwright MCP is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, the M.R.P. text, add-to-cart and `#availability`. Myntra was read from the page JSON (`discountedPrice`, `mrp`, `available:true`); its ld+json carried no product image, so the image came from the `assets.myntassets.com` URL in the page.
- DesiDime card prices were not trusted. All four Amazon dups showed a card price below the PDP (Acer ₹33,990, Samsung ₹7,591, Beurer ₹757, DesiDiya ₹9); the DB was synced to the PDP, not the card.
- New rows were written with `deal.create` plus a `PriceHistory` row. Dups were synced with `deal.update` plus a `PriceHistory` row, never the bulk upsert. Slugs unchanged.

## Funnel
| Stage | Count |
|---|---|
| Cards read | 36 |
| Junk / other dropped | 7 |
| Product-resolved | 26 |
| Already in DB (productId) | 12 |
| Fresh candidates | 14 |
| Pushed LIVE | **2** |

## Pushed
| Deal | ID | Price | MRP | Discount |
|---|---|---|---|---|
| #15634 GIGAWATTS solar wall light, warm yellow (pack of 1) | B0CNWBGR81 | ₹199 | ₹650 | 69% |
| #15635 Bla Bli Blu Women First Crush Eau de Parfum, 90 ml (Myntra) | 45586040 | ₹259 | ₹1,299 | 80% |

Affiliate: Amazon `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`; Myntra via InRDeals (`inr.deals/track?id=inr678975705&...&url=<encoded myntra url>`). Titles and descriptions are original rewrites. Images come from `m.media-amazon.com` and `assets.myntassets.com`.

## Dups
| Deal | DB → PDP | Action |
|---|---|---|
| #1102 Samsung 150W soundbar HW-T42E (B093SQBFM7) | ₹5,299 / no MRP → ₹8,990 / ₹16,990, 47% | price-synced, MRP backfilled |
| #4237 Beurer MN9X (B0CP2KW151) | ₹1,290 / no MRP → ₹890 / ₹4,850, 82% | price-synced, MRP backfilled |
| #5644 Acer Aspire One (B0GYRK1RZC) | ₹41,999 → ₹41,990 / ₹71,999 | price-synced; stale "extra ₹5,000 coupon drops it to ₹31,990" line replaced with a neutral bank/coupon note |
| #13474 DesiDiya LED (B0BBFCG66M) | ₹76 / ₹999 = PDP | none |

## Rejected
| Key | Product | Card → PDP | Reason |
|---|---|---|---|
| B0C2TQVZLR | Presto neem disinfectant | ₹255 → ₹269 | drift |
| B0GLFVTCC7 | Xiaomi 75" X Pro TV | ₹57,749 → ₹69,499 | drift |
| B0GJDVGS6P | Lloyd 1.5T AC | — | unavailable (no price, no add-to-cart) |
| Dmart | Pilgrim aloe gel | ₹137 | no ld+json price |
| Hamaramall | bay leaf, fenugreek | ₹22 / ₹8 | grocery, no ld+json |

Flipkart, dropped (curl gets a 403 reCAPTCHA and Playwright is hung): Acer COMHRHGF7HBJUSQW ₹37,190, Atomberg FANHQCGQG3DGTDHT ₹2,537, Acer 100W GaN ACCHQNAT8BNFHKJG ₹1,998, Xiaomi 65" ₹49,999, Samsung 45W ACCHEYGMZPCVEPFH ₹989, Galaxy S25 FE MOBHQCH6HZZH3BTH ₹40,499.

## Freshness
- `indexnow-ping.mjs` with 5 slugs (2 new + #1102, #4237, #5644) returned **HTTP 200 for 8 URLs**: the 5 slugs plus `/`, `/offers` and `/sitemap.xml`.
- #15634 and #15635 return 200 on prod.
- `sitemap.xml` is ISR (1800 s) and its deals child holds the top 100 by design. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,082 = 15,082 (+2) |
| API newest id vs DB max | 15,635 = 15,635 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 449 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 3 (rule met; cap 4) |
| Broadcast cursor vs DB max | `lastId` 15,633 vs 15,635. The external broadcast cron is draining this batch. Normal lag, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` (TG, IFS, DESIDIME, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX). None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS and DesiDime Flipkart candidates are dropped (6 this tick).
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
