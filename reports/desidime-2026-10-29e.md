# DESIDIME-INGEST: 2026-10-29e (~08:30 IST)

**Result: 0 pushed. The 1 fresh candidate was rejected for price drift and the 2 named dups match the DB to the rupee, so no ping was needed. CEO audit clean.**

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 32 |
| JUNK/GROCERY/other dropped | 18 |
| Product-resolved (visit.desidime.com) | 14 |
| Already in DB (productId) | 13 |
| Fresh | 1 |
| Passed PDP verify | 0 |
| Pushed LIVE | **0** |

## Rejected
| ASIN | Product | Card | PDP (logged-in Amazon tab) | Reason |
|---|---|---|---|---|
| B0GMD5NPX6 | Godrej 1.5T 3-Star inverter split AC | ₹27,740 | ₹32,990 (MRP ₹45,300), In stock, add-to-cart | Price drift ₹5,250. The card price is most likely after a bank offer. Added to `data/dd-rejected.json` |

## Dup re-verify (DB vs PDP)
| Deal | ASIN | DB | PDP | Action |
|---|---|---|---|---|
| #15383 DIGIMORE D-470 lavalier mic | B0FMJSPWS9 | ₹299 | ₹299, In stock | none |
| #15388 Baidyanath Chyawanprash 1kg | B08X6RGQWL | ₹273 | ₹273, In stock | none |

## Freshness
Nothing was pushed or synced, so there was no IndexNow ping. The sitemap is ISR with a 1800 s revalidate and llms.txt is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,854 = 14,854 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 444 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 2 |
| Broadcast cursor vs DB max | 15,392 = 15,392 |
| Crons (CronList vs roster) | 9/9 |
| Unpushed commits | 0 before this report |
