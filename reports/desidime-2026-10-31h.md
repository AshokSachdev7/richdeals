# DESIDIME-INGEST: 2026-10-31h (~14:10 IST)

**Result: 4 new LIVE deals (#15794–#15797, all Amazon). 5 older LIVE rows were price-synced to their product pages. 4 candidates were rejected. IndexNow returned HTTP 200 for 12 URLs. CEO audit clean.**

## Method
- Stage 1: `apps/api/scripts/ingest-desidime.mjs` read the `/new` page and the homepage. It uses the listing cards only, with no per-deal fetch. It applies the JUNK and GROCERY filters and resolves each `visit.desidime.com` link to the merchant URL.
- Amazon product pages were verified with desktop curl: `#corePriceDisplay .a-price-whole`, plus `#availability` and add-to-cart. The Playwright MCP is still hung, and reticle returns CONNECTION_CLOSED.
- Non-Amazon pages were checked with `productLd()`: ld+json price within ±₹1, and InStock.
- Dedup was by resolved `productId` against the live DB.
- Push script: `scratchpad/push-dd1031h.mjs`. Its output was `NEW 4 EXISTS 0 SYNC 5`.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Dropped (junk, grocery, or other store) | 13 |
| Resolved to a product page | 20 |
| Already in the DB | 7 (5 synced, 2 match) |
| Rejected in the last 24 h (`dd-rejected.json`) | 5 |
| Fresh candidates | 8 |
| Rejected | 4 |
| Pushed LIVE | 4 |

## Pushed
| id | ASIN | Price / MRP (%) | Slug |
|---|---|---|---|
| 15794 | B0CY5HQ8V1 | ₹1,499 / ₹6,999 (79%) | `pebble-vienna-1-27-inch-bluetooth-calling-smartwatch-for-women-gold-b0cy5hq8v1` |
| 15795 | B0C376RWQP | ₹199 / ₹1,399 (86%) | `zebronics-ns1000-foldable-laptop-stand-with-6-height-levels-b0c376rwqp` |
| 15796 | B084G2PK2T | ₹1,479 / ₹4,999 (70%) | `ant-esports-superflow-120mm-argb-pc-case-fan-kit-pack-of-3-black-b084g2pk2t` |
| 15797 | B0CRDMJGF6 | ₹2,406 / ₹7,999 (70%) | `ant-esports-js55-flight-simulator-joystick-with-throttle-for-pc-b0crdmjgf6` |

The #15795 image is keyed to the "Zeb-NS1000 Laptop Stand" colour entry. The first hiRes key belonged to the NS-1900 variant.

## Duplicates rechecked
| ASIN | Row | Product page | DB | Action |
|---|---|---|---|---|
| B0CX8MH9XN | #14702 HP GK400Y keyboard | ₹1,399 / ₹3,999 | ₹1,299 | Synced to 1,399 (65%) |
| B0GVT5NF8W | #1546 Zebronics Type-C cable | ₹69 / ₹399 | ₹109 | Synced to 69 (83%). The title and description said "@79"; they now say ₹69 |
| B086PKMZ21 | #12838 Razer BlackShark V2 X | ₹3,395 / ₹7,999 | ₹3,599 | Synced to 3,395 (58%) |
| B0D2DQ7NPF | #12142 Sturlite Konvert multiplug | ₹85 / ₹599 | ₹122 | Synced to 85 (86%). "Saves ₹477" now reads ₹514 |
| B0DSHZLRQB | #9186 Ant Esports Prism mouse pad | ₹69 / ₹499 | ₹89 | Synced to 69 (86%) |
| (Boldfit) | #11785 Boldfit massage gun | ₹599 / ₹1,499 | ₹599 | Matches. No change |
| (Bajaj) | #14231 Bajaj Prohot | ₹2,699 | ₹2,699 | Matches. The card's ₹2,430 is wrong. No change |

For each synced row, the slug was kept and a `priceHistory` row was added. The new text was guarded to contain the new price and %.

## Rejected
| Item | Reason |
|---|---|
| B0D8QHPS6T Godrej Interio EWA wardrobe | Card ₹15,531, product page ₹18,990 (drift) |
| B084685MT1 Sony HT-S20R | Card ₹12,590, product page ₹13,989 (drift) |
| B0CPM6MBRN MSI G244F E2 monitor | No buybox: "See All Buying Options" and no add-to-cart on desktop. The mobile UA also had no priceAmount |
| Rforrabbit diaper sample | No ld+json, and it is a sample, not a product |

The 3 ASINs were added to `data/dd-rejected.json` with `Date.now()`. It now holds 1,350 entries.

## Affiliate
- All 4 new deals use Amazon `/dp/ASIN?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- No Myntra, Flipkart, or Cuelinks-store deals were pushed this tick.

## Freshness
- `indexnow-ping.mjs` sent 9 slugs (4 new and 5 synced), which the script expands to 12 URLs. It got **HTTP 200**.
- Prod spot-checks all returned 200 in 0.16–0.30 s: #15794, #15795, #15796, #15797 and #12142.
- The sitemap is ISR (1800 s) and `llms.txt` is dynamic. No new static route was added.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.14–0.62 s) |
| API total vs DB LIVE | prod 15,243 = local 15,243 = DB 15,243 |
| API newest id vs DB max | 15,797 = 15,797 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 453 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 3 |
| Broadcast cursor vs DB max | Re-read the file: `lastId` 15,793 vs 15,797, ts 13:59 IST. The 4 rows from this batch arrived after that run, so the next external-cron run picks them up. Not rot |
| Unpushed commits | 0 (after `git fetch`, before this report) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
