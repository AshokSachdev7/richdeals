# DESIDIME-INGEST: 2026-10-30a (~00:35 IST)

**Result: 3 new deals pushed LIVE (#15515 Casio LTP-VT03BL women watch, #15516 Casio MTP-VT03D men watch, #15517 Magic Paints Ajooba 10 L distemper). 1 dup LIVE row price-synced to the PDP (#5286 Eveready Ultima MagSafe power bank ₹999 → ₹899). 4 fresh items rejected (2 at stage 1, 2 Amazon drift). 5 dups had PDP = DB. IndexNow returned 200 for 7 URLs. CEO audit clean.**

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Non-Amazon candidates were checked by `productLd()` (ld+json price ±₹1, InStock). Playwright was still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability` and the MRP. Dedup was by `productId` against the live DB.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Junk / not a product (3 Flipkart `/DesiDime/p/DesiDime` tracking pids, 2 Amazon rewards pages, 1 Slice Play Store app, 1 other) | 7 |
| Resolved to a single product | 22 |
| Dup (productId already in DB) | 15 |
| Fresh | 7 |
| Rejected at stage 1 | 2 |
| Amazon PDP-verified | 5 |
| Pushed | **3** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15515 Casio LTP-VT03BL-7BDF analog women watch, white dial (A2427) | B0DWV3NLXY | ₹1,847 | ₹3,695 | 50% |
| #15516 Casio MTP-VT03D-7BDF analog men watch, white dial (A2407) | B0DWTXC4YV | ₹1,847 | ₹3,695 | 50% |
| #15517 Magic Paints Ajooba acrylic distemper, 10 L, Daffodil | B0D97X2WLY | ₹708 | ₹3,000 | 76% |

- **Price check:** all 3 PDP prices matched the card, add-to-cart live, in stock.
- **Content:** images are `m.media-amazon.com`. Titles and descriptions rewritten. Links use `?tag=ashoksachdev-21`.
- **Prod:** all 3 slugs return 200.

## Dup sync (PDP moved, updated in place, slug untouched)
| Deal | ASIN | DB | PDP | MRP | Off |
|---|---|---|---|---|---|
| #5286 Eveready Ultima MagSafe power bank PB32 | B0H3V1PHQR | ₹999 | ₹899 | ₹5,999 | 83% → 85% |

Title ₹ amount also rewritten to ₹899.

## Dups unchanged (PDP = DB)
| Deal | ASIN | DB = PDP | Note |
|---|---|---|---|
| #8999 Axe | B09268KD7J | ₹75 | |
| #15083 Samsung 24" monitor | B0C8MTWMK2 | ₹1,651 | |
| #5336 boAt Aavante Orion Plus | B0FDFRGWLQ | ₹5,299 | card said ₹4,142 (bank offer) |
| #12942 boAt Aavante Bar Prime B160 | B0HC7C2ZS9 | ₹4,999 | card said ₹4,500 (bank offer) |
| #5442 Midea 8 kg washing machine | B0GTMJ2GRY | ₹14,490 | card said ₹13,041 (bank offer) |

The other 9 dups were not re-read this tick.

## Rejected (`data/dd-rejected.json` 1025 → 1029)
| ID | Product | Reason |
|---|---|---|
| 05387df49eb4 | JioMart appam patra | no ld+json on the PDP (stage 1) |
| RFRHKMPPAZCGMYJP | Haier 240 L fridge (Flipkart) | price drift (stage 1) |
| B0B5V5VHB6 | LG UltraGear | ₹2,321 → ₹2,579, only 1 left |
| B0FV3S8RNN | JBL Tune 780NC | ₹5,336 → ₹6,499 |

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 4 slugs (3 new, 1 synced). It returned **HTTP 200 for 7 URLs**: the 4 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200; all 3 new slugs return 200 |
| API total vs DB LIVE | 14,974 = 14,974 (+3 from 14,971) |
| API newest id vs DB max | 15,517 = 15,517 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 446 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30 began at 00:00 IST, so 0 so far is not rot; CONTENT-SEO fires at :09 every 6 h |
| Broadcast cursor vs DB max | `lastId` 15,514 vs 15,517. The 3-row gap is this batch; the external tg-broadcast cron drains it |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

Still open (carried forward, not new):
- Playwright MCP is hung this session. Amazon is verified by desktop curl, TG reads only the 5 public groups through the t.me/s preview, and Flipkart PDPs cannot be verified.
- reticle MCP failed to connect. It is not used by any tick.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync; ticks keep syncing dups as they reappear (1 more this tick).
