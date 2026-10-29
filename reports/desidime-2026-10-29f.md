# DESIDIME-INGEST: 2026-10-29f (~10:30 IST)

**Result: 3 new deals pushed LIVE (#15397-15399), 2 dup LIVE rows price-synced, and 1 dup LIVE row with no buybox delisted to EXPIRED. IndexNow returned 200 for 9 URLs. CEO audit clean.**

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Dropped at stage 1 (JUNK/GROCERY filters, other-store non-products) | 12 |
| Buy Now (`visit.desidime.com`) resolved | 23 |
| Dup (productId already in DB) | 11 |
| Fresh | 12 |
| Fresh non-Amazon already in `dd-rejected.json` (skipped) | 5 |
| Fresh Amazon verified on the PDP | 7 |
| Pushed | **3** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15397 Polysmart FR PVC house wire 1.0 sq mm 90 m | B0H4H6DNL2 | ₹799 | ₹4,899 | 84% |
| #15398 Amazon Basics wireless presenter, 15 m | B0DB1RQF53 | ₹465 | ₹1,499 | 69% |
| #15399 BonKaso top-loading hot/cold water dispenser 20 L | B0G59B4R9H | ₹6,316 | ₹13,499 | 53% |

- Each was read on the PDP in the logged-in Amazon tab: `#corePriceDisplay .a-price-whole`, add-to-cart present.
- The Polysmart `.a-text-price` showed ₹8.88, which is a per-metre rate. The MRP of ₹4,899 was confirmed from the `M.R.P.` in `#centerCol`.
- Affiliate tag is `?tag=ashoksachdev-21`; the DesiDime tag `desidime01-21` was stripped. Images come from `m.media-amazon.com`.
- Titles and descriptions were rewritten.
- Prod returns 200 for all 3.

## Rejected (4 Amazon; added to `data/dd-rejected.json`)
| ASIN | Product | Reason |
|---|---|---|
| B0C4TQLW3J | Omron | drift: card ₹7,830, PDP ₹8,699 |
| B0F8BJ1WNP | Bata | drift: card ₹543, PDP ₹1,039 |
| B0966V1GPG | SteelSeries | drift: card ₹3,089, PDP ₹3,432 |
| B0D45YS7WK | JBL SB590 | no buybox |

## Dup re-verify (DB vs PDP)
| Deal | DB | PDP | Action |
|---|---|---|---|
| #15394 Havells MCB | ₹150 | ₹150 | match |
| #15371 Billebon pillow | ₹392 | ₹392 | match |
| #15391 Zebronics | ₹1,499 | ₹1,499 | match |
| #8825 Lifelong Triply 3-pc cookware | ₹999 | ₹1,099 | synced, 83% → 82% |
| #9046 3-compartment lunch box | ₹189 | ₹120 | synced, 53% → 70% |
| #10273 Ant optical mouse 03 (B0D8WS7K3C) | ₹218 | no buybox | delisted to EXPIRED |

- The sync script was dry-run first, then run with `go`. It updated price, discountPct and the ₹/% in the title and description, and added a PriceHistory row. The temp script was deleted.
- The delisted page stays live with the EXPIRED banner, drops from the sitemap and is noindexed. Nothing was deleted.

## Freshness
1. `indexnow-ping.mjs` with 6 slugs (3 new, 2 synced, 1 delisted) returned **HTTP 200 for 9 URLs**.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,858 = 14,858 (14,856 + 3 new − 1 delisted) |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 444 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 2 |
| Broadcast cursor vs DB max | 15,399 = 15,399 (the external broadcast cron already caught up) |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open from schema-2026-10-29: 84% of LIVE deal Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
