# DESIDIME — 2026-10-20d (06:32 IST)

**0 pushed. Every fresh candidate failed verification, so no IndexNow ping was needed.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 30 |
| Product-resolved (after JUNK/GROCERY filters) | 12 |
| Already in DB | 7 |
| Fresh | 5 |
| Rejected: price drift | 3 |
| Rejected: no ld+json | 2 |
| **Pushed** | **0** |

## Rejected

| Item | ID | Reason |
|---|---|---|
| Sony 1000X The Collexion headphones | B0GY4PPX7F | Card ₹46,489 vs PDP ₹54,989. Fourth tick in a row: the card bakes in a bank offer |
| LifeKrafts magnetic mosquito net | B07YWZMJFP | Card ₹741 vs PDP ₹799 (MRP ₹1,499). In stock with add-to-cart, but drift is more than ±₹1 |
| HIKVISION T300 2TB SSD | Flipkart ACCHDYKFZMSECSHS | ld+json drift (third tick) |
| YOGABAR energy bar | Jiomart | No ld+json; grocery |
| Raw groundnut 250g | Digihaat | No ld+json; grocery |

## CEO audit

- **Posts (IST):** 1 today, 4 yesterday. Coverless 0, seoless 0. The CONTENT-SEO 06:09 slot has not landed a post yet; it is queued behind the ticks.
- **Deals:** 13,392 LIVE / 13,797 total. Null-price 0, null-image 0, PENDING_REVIEW 0. Newest is #13915, 119 minutes old.
- **Broadcast:** cursor 13915 = DB max, caught up.
- **Prod (DO ingress):** all 7 endpoints return 200 (0.10–0.65s).
- **Domain:** still on the registrar verification hold (NS `verification-hold.suspended-domain.com`, changed 2026-10-19T22:00Z). Fixing it is an owner action.
- **Housekeeping:** 0 unpushed commits before this report.
