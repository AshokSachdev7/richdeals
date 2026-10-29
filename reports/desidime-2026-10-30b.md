# DESIDIME-INGEST: 2026-10-30b (~07:10 IST)

**Result: 1 new deal pushed LIVE (#15534 Anjali Fiesta Pro stainless steel cookware set, 3 pieces). 3 dup LIVE rows price-synced to the PDP (#7362 SJCAM SJ10 Pro ₹15,699 → ₹9,294 with its null MRP filled, #14950 Corslet sketch kit ₹189 → ₹170, #14966 GOBOULT Mustang Sprint ₹1,499 → ₹1,299). 8 fresh items rejected (7 Amazon card-vs-PDP drift, 1 unverifiable Flipkart SuperCoin loot). 3 bank-offer dups had PDP = DB. IndexNow returned 200 for 7 URLs. CEO audit clean.**

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Playwright was still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability` and the MRP. Dedup was by `productId` against the live DB, and dup rows whose card price differed from the DB were re-read too.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Junk / not a product | 9 |
| Resolved to a single product | 24 |
| Dup (productId already in DB) | 14 |
| Fresh | 10 |
| Fresh but already in `dd-rejected` (Razer Barracuda X B0DGH2D1NJ) | 1 |
| Rejected unverifiable (Flipkart SuperCoin "LOOOT" post) | 1 |
| Amazon PDP-verified | 8 |
| Pushed | **1** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15534 Anjali Fiesta Pro stainless steel cookware set, 3 pieces (FP3PCS) | B0C5XRCFT9 | ₹1,104 | ₹2,895 | 62% |

- **Price check:** PDP price matched the card, add-to-cart live, in stock.
- **Content:** image is `m.media-amazon.com`. Title and description rewritten. Link uses `?tag=ashoksachdev-21`.
- **Prod:** slug returns 200.

## Dup sync (PDP moved, updated in place, slug untouched)
| Deal | ASIN | DB | PDP | MRP | Off |
|---|---|---|---|---|---|
| #7362 SJCAM SJ10 Pro 4K action camera | B08B38DGFM | ₹15,699 | ₹9,294 | null → ₹35,000 | 73% |
| #14950 Corslet 12-piece sketch pencil kit, pack of 2 | B0DL5HXPW7 | ₹189 | ₹170 | ₹1,000 | 81% → 83% |
| #14966 GOBOULT Mustang Sprint ANC earbuds | B0GM167464 | ₹1,499 | ₹1,299 | ₹5,999 | 75% → 78% |

Cards said ₹8,115 / ₹171 / ₹1,197; the PDP is the price of record. SJCAM shows "Only 2 left" and its title has no ₹ amount. The Corslet and GOBOULT title ₹ amounts were rewritten to match. All 3 synced slugs return 200.

## Dups unchanged (PDP = DB)
| Deal | ASIN | DB = PDP | Note |
|---|---|---|---|
| #5336 boAt Aavante Orion Plus | B0FDFRGWLQ | ₹5,299 | bank-offer card, re-read at 10-30a |
| #12942 boAt Aavante Bar Prime B160 | B0HC7C2ZS9 | ₹4,999 | bank-offer card, re-read at 10-30a |
| #5442 Midea 8 kg washing machine | B0GTMJ2GRY | ₹14,490 | bank-offer card, re-read at 10-30a |

On the other dups, the card price equalled the DB price or the row was not re-read this tick.

## Rejected (`data/dd-rejected.json` 1046 → 1054)
| ID | Product | Reason |
|---|---|---|
| B08L3Q4W4H | Tusa vacuum cleaner | ₹2,396 → ₹2,744 |
| B0C6F9PH7K | APRODZ bed | ₹16,609 → ₹18,359 |
| B0DCFLJF49 | DREAME Mova J20 | ₹6,985 → ₹7,999 |
| B0FDBDQ846 | ZEBRONICS Studio R3 | ₹6,300 → ₹6,999 |
| B0C86CMCPQ | Indus Valley idli maker | ₹1,739 → ₹1,850 |
| B0HFT46MD6 | EOX Thrill scooter | ₹78,698 → ₹89,998 |
| B0CG19FGQ5 | DJI Osmo Pocket 3 | ₹42,140 → ₹45,990 |
| BELHF58DBHVGPKYG | HRX belt (Flipkart) | SuperCoin loot post, Flipkart PDP unverifiable without Playwright |

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 4 slugs (1 new, 3 synced). It returned **HTTP 200 for 7 URLs**: the 4 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200; all 4 pushed or synced slugs return 200 |
| API total vs DB LIVE | 14,991 = 14,991 (+1 from 14,990) |
| API newest id vs DB max | 15,534 = 15,534 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 447 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 1 so far; CONTENT-SEO fires at :09 every 6 h |
| Broadcast cursor vs DB max | `lastId` 15,533 (file re-read) vs 15,534. The 1-row gap is this batch; the external tg-broadcast cron drains it |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

Still open (carried forward, not new):
- Playwright MCP is hung this session. Amazon is verified by desktop curl, TG reads only the 5 public groups through the t.me/s preview, and Flipkart PDPs cannot be verified.
- reticle MCP failed to connect. It is not used by any tick.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync; ticks keep syncing dups as they reappear (3 more this tick).
