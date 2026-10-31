# DESIDIME-INGEST: 2026-10-31l (~22:36 IST)

**Result: 3 new Amazon deals LIVE (#15890–15892), checked on the product page. 3 duplicate LIVE rows were price-synced in place (#10105, #12834, #14871). #5224 was set to EXPIRED because Amazon shows it as unavailable. IndexNow returned HTTP 200. CEO audit clean.**

## Method
- Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each `visit.desidime.com` link to the merchant URL.
- Amazon prices were checked by fetching the product page with curl (`pdp1030r.mjs`), with the mobile UA (`/gp/aw/d/`) as a fallback. The Playwright MCP is still hung and reticle returns CONNECTION_CLOSED.
- Each product was deduplicated against the live DB with Prisma (`store_product`, then slug). Duplicate LIVE rows had their product page read again. Slugs were kept.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Dropped (junk or other-store cards) | 6 |
| Product URL resolved | 28 |
| Already in DB | 5 |
| Rejected in the last 24 h | 12 |
| Fresh | 11 |
| Rejected without a product-page check | 4 |
| Rejected after the product-page check | 4 |
| Pushed | **3** |

## Pushed
| id | Store / ASIN | Price / MRP (discount) | Slug |
|---|---|---|---|
| 15890 | Amazon B0CX4YC475 | ₹1,524 / ₹5,275 (71%) | `/corsair-hs35-v2-wired-gaming-headset-50mm-drivers-b0cx4yc475` |
| 15891 | Amazon B09NDWYBKQ | ₹235 / ₹999 (76%), 1 left | `/tabelito-nylon-laptop-sleeve-for-15-6-inch-laptops-b09ndwybkq` |
| 15892 | Amazon B0H3BNC2YB | ₹999 / ₹4,999 (80%) | `/noise-colorfit-pulse-air-smartwatch-with-bt-calling-1-85-inch-display-b0h3bnc2yb` |

- All three product pages showed "In stock" (Tabelito: "Only 1 left") and an add-to-cart button.
- Push result: `NEW 3 EXISTS 0 SYNCED 3`.
- Titles and descriptions are rewritten. They repeat only facts from the product page.
- Images come from `m.media-amazon.com/images/I/` only.
- On prod, the Corsair page returned HTTP 200 in 0.27 s.

## Price syncs (slug kept, priceHistory row added, title and description price lines updated)
| id | Product | Old → new | MRP | Discount |
|---|---|---|---|---|
| 10105 | Portronics Toad 101 mouse (B0BRKSQ7Z2) | ₹79 → ₹100 | null (the page's "2,12,900" MRP read is bogus) | null |
| 12834 | Panasonic 20W batten, pack of 10 (B0DRCD16GN) | ₹899 → ₹949 | ₹4,700 | 81% → 80% |
| 14871 | Prestige Triply Aurum Fry Pan 20 cm (B0GX6X87M5) | ₹1,000 → ₹900 | ₹2,855 → ₹2,300 | 65% → 61% |

- " – Amazon" was dropped from the #10105 and #14871 titles.
- The #12834 description now says "under 95 rupees per tube light" (it said "under 90").
- No sync for #15793 ASUS Vivobook 15 (B0HKMBDZ5Y): DB ₹49,990 = product page. The card's ₹40,240 is a bank-offer price.

## Expired
- **#5224 Green Soul Cloud recliner (B0GPDQY78K).** It was LIVE at ₹12,990 / ₹47,990. The product page shows "Currently unavailable. We don't know when", with no price and no add-to-cart, on both the desktop and the mobile UA.
  - Status set to EXPIRED. The page stays live with the EXPIRED banner (200 on prod in 0.24 s) and the Offer becomes Discontinued.

## Rejected
| Item | Card | Product page | Reason |
|---|---|---|---|
| Prestige Astra Neo B0FNNBTQNF | ₹2,551 | ₹3,149 | Price drift |
| SanDisk Optimus GX PRO 2TB B0H6MGYLQT | ₹64,825 | ₹69,499 | Price drift |
| SanDisk Crayola 256GB B0FVYYTBLK | ₹1,675 | ₹3,249 | Price drift |
| Redmi 15C 5G Prime B0G2B2QVLL | ₹16,499 | ₹17,999 | Card was the HDFC EMI bank-offer price |
| AL-FALAH shoe wipes B0DNMZ3VMF | ₹88 | not checked | Low-ticket FMCG |
| Kyari money plant (Swiggy) 68326d3c246f | n/a | not checked | Location-locked, no ld+json |
| Amazon Pay gift voucher B0HLZ5K957 | n/a | not checked | Gift-card junk |
| Dell festive sitewide 1d1f4520816f | n/a | not checked | Sale hub, not a single product |

All 8 were written to `data/dd-rejected.json` (1,387 → 1,392 keys; 3 already existed and had their timestamps refreshed).

## Affiliate
`https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`

## Freshness
- `indexnow-ping.mjs` (slug mode, 10 URLs: 7 slugs plus 3 hubs) returned **HTTP 200**.
- The sitemap is ISR (1800 s). Deals are top-100 only by design.
- `llms.txt` is dynamic. No new static route was added.

## CEO audit (~22:36 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.27 s, `/offers` 0.14 s, `/blog` 0.90 s, `/sitemap.xml` 0.14 s, `/feed.xml` 0.15 s, `/llms.txt` 0.51 s, `/api/deals` 0.14 s, `/robots.txt` 0.18 s |
| API total vs DB LIVE | prod 15,337 = local 15,337 = DB 15,337 (15,335 + 3 new − 1 expired) |
| DB max id | 15,892 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 454 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4 (cap) |
| Broadcast cursor vs DB max | `lastId` 15,889 vs 15,892. The 3 new rows wait for the external tg-broadcast cron. Not rot |
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
