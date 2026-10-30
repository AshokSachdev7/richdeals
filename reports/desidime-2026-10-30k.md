# DESIDIME-INGEST: 2026-10-30k (~20:30 IST)

**Result: 0 deals pushed. All 9 fresh Amazon candidates failed the PDP check: 8 had drifted above the DesiDime card price and 1 was unavailable. The 3 non-Amazon candidates were junk or grocery. With nothing pushed, no IndexNow ping was needed. CEO audit clean: API = DB LIVE 15,103, max 15,656, cursor 15,656 (drained).**

## Method
- Stage 1 was `ingest-desidime.mjs`, run on `/new` plus the homepage. It reads cards only, with no per-deal fetch. It applies the JUNK and GROCERY filters and resolves outbound links through `visit.desidime.com`. It dedups by productId against the live DB and against `dd-rejected.json` (24-hour window).
- The Playwright MCP is still hung, so Amazon PDPs were read with desktop curl: `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. No captcha was hit.
- Non-Amazon candidates go through `productLd()` (±₹1, InStock) when they are real single products.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Resolved to a merchant product | 21 |
| Dup of a DB row | 9 |
| Fresh | 12 (9 Amazon, 3 other) |
| PDP match → pushed | 0 |
| PDP drift | 8 |
| Unavailable | 1 |
| Junk / grocery | 3 |

## Dups
Stage 1 matched 9 resolved products to existing DB rows. Their productIds were printed to the stage-1 console, but that output was not saved to a file this tick, so the 9 dups were **not** PDP-re-read or price-synced. They come back on the next DesiDime sweep if they are reposted.

## Rejected
| Key | Product | Card → PDP | Reason |
|---|---|---|---|
| B0F3JKY28G | Xiaomi 43" FX Pro QLED TV | 21,299 → 27,499 | drift |
| B0GR9VR199 | Bosch 243L fridge | 21,740 → 29,990 | drift |
| B0CC5666P7 | Beardo I Blade trimmer | 721 → 775 | drift |
| B08Z43RZPZ | Zlade Ballistic Turbo 3.0 | 1,571 → 1,699 | drift |
| B0GY486J25 | Sony 65" BRAVIA 3 II | 1,01,990 → 1,09,990 | drift |
| B0BJ2VF22Q | Colors Queen lip liner L-28 | 44 → 47 | drift |
| B0GXKHL84V | TP MAX mini massage gun | 668 → 689 | drift |
| B09BJGPGNV | TENAMIC safe box | 1,762 → 1,850 | drift |
| B0GJDVGS6P | Lloyd 1.5T AC | n/a | unavailable: no price and no add-to-cart (also rejected in ifs 10-30j) |
| 67de593895b5 | Instamart Noice figs | n/a | grocery |
| 6d417db0ec23 | District game/ticket promo | n/a | junk, not a product |
| 1d1f4520816f | Dellstore sitewide offer | n/a | junk, not a product |

The card prices are mostly post-bank-offer figures; the price that gets pushed is always the one on the PDP. All 12 keys were appended to `data/dd-rejected.json` (`Date.now()`), which now holds 1,266 keys.

## Freshness
- Nothing was pushed, so no IndexNow ping was sent.
- `sitemap.xml` (ISR 1800 s) and `llms.txt` (force-dynamic) are unchanged by this tick.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.13–0.83 s) |
| API total vs DB LIVE | 15,103 = 15,103 |
| API newest id vs DB max | 15,656 = 15,656 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 450 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4 (cap reached) |
| Broadcast cursor vs DB max | `lastId` 15,656 = 15,656 (file re-read): drained |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS and DesiDime Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- DesiDime stage-1 dup lines are console-only. Next tick: tee the stage-1 output to the scratchpad so the dups can be price-synced.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
