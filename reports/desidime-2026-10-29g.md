# DESIDIME-INGEST: 2026-10-29g (~12:40 IST)

**Result: 2 new deals pushed LIVE (#15413, #15414) and 2 dup LIVE rows price-synced to the PDP. IndexNow returned 200 for 7 URLs. CEO audit clean.**

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Dropped at stage 1 (JUNK/GROCERY filters, other-store non-products) | 5 |
| Buy Now (`visit.desidime.com`) resolved | 27 |
| Dup (productId already in DB) | 11 |
| Fresh | 16 |
| Fresh Flipkart rejected for drift (already in `dd-rejected.json`) | 3 |
| Fresh Amazon already in `dd-rejected.json` (B011C1B2XY, B0CZTGRS2S) | 2 |
| Fresh Amazon verified on the PDP | 11 |
| Pushed | **2** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15413 HP M290 wireless mouse (AB3C7AA) | B0DXNY14GL | ₹409 | ₹1,149 | 64% |
| #15414 Adhesive heavy-duty wall hooks, pack of 10 | B0FQTKMLTB | ₹39 | ₹299 | 87% |

- Both were read on the PDP in the logged-in Amazon tab: `#corePriceDisplay .a-price-whole` equalled the card price, and add-to-cart was present.
- The wall-hook `.a-text-price` showed ₹3.90, which is a per-hook rate. The MRP of ₹299 was confirmed from the `M.R.P.` in `#centerCol`.
- Affiliate tag is `?tag=ashoksachdev-21`; the DesiDime tag was stripped. Images come from `m.media-amazon.com`. Titles and descriptions were rewritten.
- Prod returns 200 for both.

## Rejected (9 Amazon; added to `data/dd-rejected.json`, now 863 keys)
| ASIN | Product | Reason |
|---|---|---|
| B0BTZ7Z6ZZ | boAt Rockerz 255 Max | no buybox |
| B08JQLB5CG | boAt Airdopes 121 Pro Plus | no buybox |
| B0FHHXR2GR | Dell SE2725HG | no buybox |
| B0FFTHH86W | Godrej Emperor sofa | drift: card ₹9,371, PDP ₹11,290 |
| B0B6C4Z14M | Timex | drift: card ₹4,226, PDP ₹4,695 |
| B0G13V6TSR | Amazon Basics safe | drift: card ₹4,029, PDP ₹4,740 |
| B0BS1MB671 | Jabra | drift: card ₹11,349, PDP ₹12,610 |
| B0F99YXMB9 | Samsung 32" monitor | drift: card ₹10,892, PDP ₹13,999 |
| B0F5HNQ3N1 | LG 27U631A | drift: card ₹10,799, PDP ₹13,499 |

The drifted card prices assume HDFC credit-card or other bank offers, so they are not the checkout price.

## Dup re-verify (DB vs PDP)
| Deal | DB | PDP | Action |
|---|---|---|---|
| #1481 HP wired on-ear headphones (B009LJ2BXA) | ₹495, MRP null | ₹679, MRP ₹999 | synced, 32% |
| #5155 Godrej Interio Windle 1-seater (B0D8JH2N69) | ₹7,190 | ₹6,990, MRP ₹25,902 | synced, 72% → 73% |
| #1920 Samsung 55" Mini LED (B0GXV5313B) | ₹47,490 | ₹47,490 | match |

- The sync script was dry-run first, then run with `go`. It updated price, MRP, discountPct and the ₹/% in the title and description, and added a PriceHistory row.
- **Gap:** the stage-1 dup list was truncated, so only 3 of the 11 dups were captured. The other 8 were not re-verified in this tick.

## Freshness
1. `indexnow-ping.mjs` with 4 slugs (2 new and 2 synced) returned **HTTP 200 for 7 URLs**.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,873 = 14,873 (14,871 + 2 new); API newest id 15,414 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 444 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 2 (CONTENT-SEO fires 12:38) |
| Broadcast cursor vs DB max | 15,412 vs 15,414. The gap is the 2 new deals, which the external broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open from schema-2026-10-29: 84% of LIVE deal Offers have a price check older than 14 days. Today's dup syncs (#1481 was ₹184 stale here) show the drift is real.
