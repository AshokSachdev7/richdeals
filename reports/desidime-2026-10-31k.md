# DESIDIME-INGEST: 2026-10-31k (~20:35 IST)

**Result: 1 new Amazon deal LIVE (#15878), verified on the product page. One duplicate rechecked; its price is within ₹1, so no sync. IndexNow returned HTTP 200. CEO audit clean.**

## Method
- Stage 1 (`ingest-desidime.mjs`) read the listing cards only. No per-deal pages were fetched. It applied the JUNK and GROCERY filters and resolved each `visit.desidime.com` link with curl. Exit code 0.
- Amazon prices were checked by fetching the product page with curl (`pdp1030r.mjs`). The Playwright MCP is still hung and reticle returns CONNECTION_CLOSED, so Flipkart candidates could not be verified.
- Each ASIN was deduplicated against the live DB with Prisma (`store_product`, then slug).

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 38 |
| Junk or other-store dropped | 6 |
| Product URL resolved | 28 |
| URL drops: 3 Play Store app promos (Bajaj, Apollo, Bhim), LIVON Flipkart `/product/p/item` | 4 |
| Already in DB (Nike B0DZTPJSF7) | 1 |
| Rejected in the last 24 h | 15 |
| Fresh candidates (9 Amazon, 3 Flipkart) | 12 |
| Amazon product pages checked | 9 |
| Pushed | **1** |

## Pushed
| id | Store / ASIN | Price / MRP (discount) | Slug |
|---|---|---|---|
| 15878 | Amazon B0HPY39985 | ₹799 / ₹9,999 (92%) | `/desidiya-22w-led-ceiling-light-3-in-1-colour-changing-double-square-panel-b0hpy39985` |

- Product page: ₹799 against a ₹9,999 MRP, in stock, add-to-cart present. Matches the card.
- Image: `m.media-amazon.com/images/I/51dkV9qcrYL._SL1254_.jpg`.
- The description repeats only facts from the product page (22 W, double square acrylic surface-mount panel, 3-in-1 warm/natural/cool white).
- Push result: `NEW 1 EXISTS 0`. Prod deal page returns HTTP 200 in 0.20 s.

## Duplicates rechecked
- **#2001 Nike Spicy Love deodorant (B0DZTPJSF7).** DB LIVE at ₹285 / ₹1,197. Product page ₹284 / ₹1,197, in stock. Within ₹1, so no sync. The card's ₹199 is not the listed price.

## Rejected
| Item | Card | Product page | Reason |
|---|---|---|---|
| B0GVNXV7G7 steel scrubber cloth, 25-pack | ₹97 | ₹97 / ₹499 | Low-ticket FMCG |
| B0HJ5YHPM2 laptop briefcase | ₹419 | ₹699 / ₹999 | Price drift |
| B0HKD9X9FC LINSO air duster | ₹2,499 | ₹3,499 / ₹3,799 | Price drift |
| B0CVH2K929 70mai A510 dash cam | ₹10,620 | ₹11,799 / ₹21,999 | Price drift |
| 9354401112 pattern book (Spanish edition) | ₹99 | ₹603 / ₹694, no availability text | Price drift |
| B0BYZHDRN6 Canon EOS R50 | ₹52,989 | ₹64,989 / ₹75,995 | Drift (card shows bank-offer price) |
| B08RZ7K77S MANQ blazer | ₹999 | ₹2,246 / ₹5,999 | Price drift |
| B0GMQG7QM5 Xiaomi 17 Ultra | ₹1,19,999 | ₹1,39,999 / ₹1,69,999 | Price drift |
| Flipkart mice: Ant GM46, Acer Flow, Lenovo 130 | ₹138 / ₹277 / ₹360 | Not checked | Stage-1 drift flag; Flipkart needs a browser |

All 11 were added to `data/dd-rejected.json` (1,369 → 1,386 keys) so the next sweeps skip them.

## Affiliate
`https://www.amazon.in/dp/B0HPY39985?th=1&psc=1&tag=ashoksachdev-21`

## Freshness
- `indexnow-ping.mjs` (slug mode, 4 URLs) returned **HTTP 200**.
- The sitemap is ISR (1800 s). Deals are top-100 only by design.
- `llms.txt` is dynamic. No new static route was added.

## CEO audit (~20:35 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.20 s, `/offers` 0.18 s, `/blog` 0.72 s, `/sitemap.xml` 0.16 s, `/feed.xml` 0.14 s, `/llms.txt` 0.45 s, `/api/deals` 0.20 s, `/robots.txt` 200 |
| API total vs DB LIVE | prod 15,324 = local 15,324 = DB 15,324 |
| DB max id | 15,878 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 454 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4 (cap) |
| Broadcast cursor vs DB max | `lastId` 15,878 = max. Fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

## Still open (carried forward)
- The Playwright MCP is hung and reticle is down. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified: #2279, #4172, #3663, #2483, #6409, #4430, #4171, plus #3881.
- JioMart #37 is a delist candidate.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Prose drift on deals outside the top 100: 118 descriptions and 32 titles.
- Rotate the DO API token.
