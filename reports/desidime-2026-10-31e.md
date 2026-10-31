# DESIDIME-INGEST: 2026-10-31e (~08:30 IST)

**Result: 2 new deals pushed LIVE (#15721 and #15722). Two duplicate LIVE rows were price-synced in place and kept their slugs (#7198 and #1131). 2 Amazon candidates were rejected. IndexNow returned HTTP 200 for 7 URLs. All 4 pages return 200 on prod. CEO audit clean.**

## Method
- Stage 1: `ingest-desidime.mjs` read the listing cards on `/new` and the homepage. No per-deal pages were fetched. The JUNK and GROCERY filters ran, and Buy Now links were resolved through `visit.desidime.com`.
- Deduped by productId against the live DB.
- Checked Amazon product pages with desktop curl (`scratchpad/pdp1031d.cjs`). Price comes from `#corePriceDisplay .a-price-whole`, stock from `#availability` plus the add-to-cart button. The Playwright MCP is still hung.
- Pushed with Prisma `deal.create` plus a `priceHistory` row (`scratchpad/push-dd1031e.mjs`).

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Dropped as junk or other-store | 13 |
| Product-resolved | 15 |
| Already in the DB | 3 (all checked on the product page; 2 synced) |
| Rejected in the last 24h | 6 |
| Fresh candidates | 6 (4 Amazon, 2 Hamaramall) |
| Pushed LIVE | **2** |

## Pushed (status LIVE)
| id | ASIN | Price / MRP | Slug |
|---|---|---|---|
| #15721 | B006QHBC76 | ₹149 / ₹239 (38%) | `garnier-color-naturals-keratin-hair-colour-shade-1-natural-black-b006qhbc76` |
| #15722 | B097JH4V5G | ₹549 / ₹3,396 (84%) | `safari-omega-30l-5-compartment-laptop-backpack-with-raincover-teal-b097jh4v5g` |

- Both product pages were in stock with an add-to-cart button, and the price matched the card.
- Images are the `data-old-hires` URLs from `m.media-amazon.com`.

## Duplicates rechecked
| ASIN | Row | Card | Product page | DB before | Action |
|---|---|---|---|---|---|
| B07TJWVHNP | #7198 Larah Borosil 27-pc | — | ₹1,265 / ₹3,695, "Only 2 left" | ₹1,750 / ₹4,140, 58% | **Synced** to ₹1,265 / ₹3,695, 66%. Description ₹ figures swapped. priceHistory row added |
| B0BT6ZYM1Q | #1131 Amazon Basics mouse | — | ₹99 / ₹919 | ₹99, MRP null, description said "₹108" | **Synced**: MRP backfilled, 89%. Description changed to ₹99 |
| B0H4RSRSB5 | #14231 Bajaj Prohot | — | ₹2,699 / ₹5,720 | same | No change |

## Rejected
| Candidate | Reason |
|---|---|
| B0D86RH9K2 Brother printer | The card says ₹12,029 but the product page says ₹13,279 (+₹1,250 drift) |
| B0BR8C5QSW Dyazo car charger | No price and no add-to-cart button (unavailable) |
| Hamaramall ×2 | The page has no ld+json, so the price cannot be verified (already listed in `dd-rejected.json`) |

## Affiliate
Every Amazon row uses `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. The DesiDime tag `desidime01-21` was stripped. This sweep had no Myntra or Cuelinks rows.

## Freshness
- `indexnow-ping.mjs` was run on the 4 slugs. With the sitemap and hubs added, that makes 7 URLs, and it returned **HTTP 200**.
- All 4 deal pages return 200 on prod.
- The sitemap is ISR (1800 s) and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.10–0.72 s) |
| API total vs DB LIVE | prod 15,168 = local 15,168 = DB 15,168 |
| API newest id vs DB max | 15,722 = 15,722 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 452 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 2 |
| Broadcast cursor vs DB max | `lastId` 15,720 vs 15,722. #15721 and #15722 were created this tick; the external broadcast cron will pick them up. This is not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 3 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
