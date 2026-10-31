# DESIDIME-INGEST: 2026-10-31j (~18:35 IST)

**Result: 1 new LIVE deal (#15851 EcoLink 30W B22 LED bulb 2-pack, ₹299 / ₹1,098, 73% off). #2903 Colgate toothbrush price-synced from ₹168 to ₹129. 8 of the 9 Amazon candidates were rejected (5 drift, 1 booking listing with no price, 2 FMCG), and stage 1 skipped 2 Flipkart candidates. IndexNow returned HTTP 200 for 5 URLs. CEO audit clean.**

## Method
- Stage 1: `node apps/api/scripts/ingest-desidime.mjs` read `/new` and the homepage cards only. No per-deal page was fetched. The run applied the JUNK and GROCERY filters and resolved each `visit.desidime.com` link to the merchant URL. It exited with rc=0.
- The Playwright MCP is still hung, and reticle returns CONNECTION_CLOSED. Amazon product pages were therefore read with desktop curl: `#corePriceDisplay .a-price-whole`, M.R.P., `#availability` and add-to-cart. Flipkart candidates cannot be verified without a browser, so they are dropped.
- Dedup was against the live DB by `store_product`, then by slug. A duplicate LIVE row was re-read on its product page and price-synced.
- Push script: `scratchpad/push-dd1031j.mjs`. Its output was `NEW 1 EXISTS 0` plus `SYNCED 2903`.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 37 |
| Junk or other-store dropped | 10 |
| Product URL resolved | 23 |
| URL drops (Myntra gold-coin listing, Flipkart `/item/p/product`, Flipkart login page, Amazon `/s?` search) | 4 |
| Already in DB | 1 (#2903 Colgate) |
| Rejected in the last 24 h | 11 |
| Fresh candidates | 11 (2 Flipkart skipped by stage 1, 9 Amazon) |
| Rejected after product page or FMCG rule | 8 |
| Pushed LIVE | 1 new + 1 price sync |

## Pushed
| id | ASIN | Price / MRP (%) | Slug |
|---|---|---|---|
| 15851 | B0DSPQZT13 | ₹299 / ₹1,098 (73%) | `ecolink-30w-b22-led-bulb-crystal-white-pack-of-2-b0dspqzt13` |

- In stock with add-to-cart when checked. The price is the product-page price.
- The text was rewritten from the product-page facts. The image comes from `m.media-amazon.com`.

## Duplicates rechecked
| id | Item | DB | Product page | Action |
|---|---|---|---|---|
| 2903 | Colgate Gentle Sensitive toothbrush B0CFLFYC93 | LIVE at ₹168 / ₹310 (46%) | ₹129 / ₹310, in stock with add-to-cart | Synced to ₹129 (58% off). Title and description were refreshed and a priceHistory row was added. The slug was kept |

## Rejected
| Item | Card | Product page | Reason |
|---|---|---|---|
| B0D83VPSDC Bajaj Pulsar 125 Neon | ₹67,449 | No price, no add-to-cart | Booking listing |
| B0BYKSXHYK PNG 24kt 2 gm gold ring | ₹28,522 | ₹30,522 | Drift |
| B0BLHJ14CC Wipro MCB 20A | ₹364 | ₹375 / ₹800 | Drift (₹11) |
| B0HGXVSQ9R Lenovo IdeaPad Slim 3 | ₹52,240 | ₹68,990 | Drift (bank-offer price) |
| B0G8JR8VNZ Samsung 183L fridge | ₹13,686 | ₹16,790 | Drift |
| B0HBBTV4J4 Lenovo Idea Tab | ₹15,499 | ₹19,999 | Drift |
| B0CZP4ZQ47 AGEasy diaper pants | ₹179 | Not read | FMCG |
| B09XBMHKRD Yardley talc 400g | ₹198 | Not read | FMCG |
| Flipkart Pykd chips | – | – | Skipped by stage 1: out of stock, and grocery |
| Flipkart Acer Iconia Tab iM11 `TABHR9HUFDGQJZCG` | ₹17,999 | ₹23,999 | Skipped by stage 1: drift |

- B0HGXVSQ9R, B0G8JR8VNZ and B0HBBTV4J4 had been rejected earlier by ASIN. Stage 1 keys its 24 h reject window by DesiDime id, so these came back under new ids. Both the DesiDime ids and the ASINs are now in `data/dd-rejected.json`. It grew from 1,354 to 1,366 keys, with every value written as `Date.now()`.

## Affiliate
- Amazon: `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21` on #15851 and #2903.
- No Myntra (InRDeals) or other-store (Cuelinks) rows were pushed this tick.

## Freshness
- `indexnow-ping.mjs` sent 2 slugs, which the script expands to 5 URLs. It got **HTTP 200**.
- Prod spot-checks: #15851 200 (0.31 s), #2903 200 (0.24 s).
- The sitemap is ISR (1800 s) and `llms.txt` is dynamic. No new static route was added.

## CEO audit (~18:36 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.17 s, `/offers` 0.15 s, `/blog` 0.73 s, `/sitemap.xml` 0.10 s, `/feed.xml` 0.12 s, `/llms.txt` 0.73 s, `/api/deals` 0.20 s |
| API total vs DB LIVE | prod 15,298 = local 15,298 = DB 15,298 |
| API newest id vs DB max | 15,851 = 15,851 (this batch visible on prod) |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 453 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 3. CONTENT-SEO fired at 18:32 IST and had not added a post at audit time, so it may still be running. Not rot: 3 posts already meet the rule |
| Broadcast cursor vs DB max | Re-read the file: `lastId` 15,850 vs 15,851. Only #15851, pushed minutes ago, is behind. The external cron will drain it. Not rot |
| Unpushed commits | 0 (`## master...origin/master` after `git fetch`, before this report) |
| Session crons | 9/9 match `.claude/cron-schedules.md`: TG 68d0e910, IFS 3c86aa9d, DesiDime 41e80cd0, CONTENT-SEO 210ebce0, INDEXNOW 654b9829, SCHEMA-AUDIT 1b90118e, SITEMON 62275eba, AI-OVERVIEW ee2ba5e6, SEO-AUDIT-FIX 86e1a97a. Nothing recreated |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
