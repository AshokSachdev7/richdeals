# DESIDIME-INGEST: 2026-10-30l (~22:30 IST)

**Result: 2 new deals pushed LIVE (#15672–15673), with every price read off the PDP. 2 dup LIVE rows flipped to EXPIRED because the PDP shows them unavailable (#11087 Lifelong heater, #1083 Midea washer). 4 fresh candidates rejected for drift, and 2 fresh Flipkart candidates dropped (no browser). IndexNow HTTP 200 for 7 URLs. CEO audit clean: API = DB LIVE 15,119, max 15,673.**

## Method
- Stage 1 was `ingest-desidime.mjs`, run on `/new` plus the homepage. It reads cards only, with no per-deal fetch. It applies the JUNK and GROCERY filters and resolves outbound links through `visit.desidime.com`. It dedups by productId against the live DB and `dd-rejected.json`.
- This tick, stage-1 output was saved (`dd-stage1-1030l.log`, `dd-cand-1030l.json`), so the dups could be PDP-re-read and synced. That closes the carried-forward "tee the stage-1 output" item.
- The Playwright MCP is still hung, so Amazon PDPs were read with desktop curl: `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. No captcha was hit.
- The image was keyed by the landing variant in `colorImages`. For the juicer, the first key was another variant ("White & Blue 3Jars"); the "Black & Gray 4Jars" landing variant maps to `71vfrhmJ1SL`.
- New rows were created with Prisma `deal.create` plus `priceHistory`. Expiries used `deal.update`. The bulk upsert was not used, so no slugs were rewritten.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Dropped by stage 1 as junk or other-store (incl. 3 Flipkart luggage/Minutes) | 10 |
| Resolved to a merchant product | 22 |
| Known (stage 1 counts 12; 5 printed as DB dups, all 5 PDP-re-read) | 12 |
| Fresh | 10 (6 Amazon, 4 Flipkart) |
| PDP match → pushed | 2 |
| PDP drift | 4 |
| Flipkart dropped (no browser) | 2 |
| Flipkart skipped by stage 1 (out of stock, drift) | 2 |

## Pushed (status LIVE)
| Deal | ID | Price | MRP | Off |
|---|---|---|---|---|
| MotorOctane car and bike shampoo 250ml | #15672 | ₹279 | ₹399 | 30% |
| Longway Super Dlx 750W juicer mixer grinder, 4 jars | #15673 | ₹1,399 | ₹3,899 | 64% |

Affiliate: Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Text was rewritten and images are `m.media-amazon.com` only.

## Dups
| Deal | DB | PDP | Action |
|---|---|---|---|
| #11087 Lifelong Dyno 800W heater (B0BGPN4GGH) | LIVE ₹549 | "Currently unavailable", no add-to-cart | **EXPIRED** (page stays live with banner) |
| #1083 Midea 7.5 kg top load (B0GTML5HR7) | LIVE ₹11,790 | "Currently unavailable", no add-to-cart | **EXPIRED** |
| #5644 Acer Aspire One (B0GYRK1RZC) | ₹41,990 | ₹41,990 | no change. Card ₹33,990 is post-bank-offer; the PDP MRP of 99,478 looks inflated, so the DB MRP of 71,999 was kept |
| #15509 steel lota (B0HM2SV3W2) | ₹146 / 399 | ₹146 | no change |
| #15670 BOXJOY 12-shelf wardrobe (B0H34L8RJK) | ₹2,499 | ₹2,499 | no change. Card ₹2,099 is post-coupon (already in desc) |

## Rejected
| Key | Product | Card → PDP | Reason |
|---|---|---|---|
| B0FM38MRWL | boAt Rockerz 371 | 873 → 948 | drift |
| B0FF9Q48SQ | CÜRAA Grill Neo sandwich griller | 749 → 999 | drift |
| B0HFWWS3WQ | BEHOMA brass akhand diya | 979 → 999 | drift |
| B0F9Z1ZFD6 | Insta360 X5 Essentials bundle | 50,190 → 60,990 | drift |

All 4 keys were appended to `data/dd-rejected.json` (`Date.now()`), which now holds 1,298 keys.

## Flipkart drops (no browser path while Playwright is hung)
ERGGWU8WKKPGURWU oxidised jhumki 4-pair ₹200, WATGXZAXGN2ZWWF3 Carlington women watch ₹999. Stage 1 also skipped WATHF4CJNEAJCEHR (Tommy Hilfiger watch, out of stock) and CNTHRJY7XKFZY3ZS (steel container, drift). They come back if reposted once the browser works.

## Freshness
- `indexnow-ping.mjs` ran on 2 new + 2 expired slugs. Slug mode adds `/`, `/offers` and `/sitemap.xml`, for **HTTP 200 on 7 URLs**.
- Prod spot-check: #15672, #15673 and #11087 (expired banner) all return 200.
- `sitemap.xml` is ISR 1800 s, and the deals child holds only the top 100. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.12–0.60 s) |
| API total vs DB LIVE | 15,119 = 15,119 (+2 new, −2 expired) |
| API newest id vs DB max | 15,673 = 15,673 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 450 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4 (cap reached) |
| Broadcast cursor vs DB max | `lastId` 15,671 vs 15,673 (file re-read): drain lag from this push. The external cron picks it up, so this is not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS, DesiDime and TG Flipkart candidates are dropped (2 this tick).
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Stage-1 log prints only 5 of the 12 "known" rows; the other 7 are counted silently (likely `dd-rejected` hits). Make it print the reason per key.
- Rotate the DO API token.

Resolved this tick: "DesiDime: tee the stage-1 output so dups can be price-synced."
