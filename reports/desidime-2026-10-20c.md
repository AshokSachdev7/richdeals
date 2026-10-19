# DESIDIME — 2026-10-20c (04:33 IST)

**2 pushed (count 2, both created:true, slugs 200) · IndexNow HTTP 200 (5 URLs)**

> **Domain still on registrar verification hold.**
> - richdeals.in NS = `ns1/ns2.verification-hold.suspended-domain.com` (RDAP last changed 2026-10-19T22:00Z).
> - The app is healthy on the DO ingress, but the public site, IndexNow and crawlers can't reach it until the owner verifies the registrant at OVI HOSTING.

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 29 |
| Product-resolved (after JUNK/GROCERY filters) | 13 |
| Already in DB | 6 |
| Fresh | 7 |
| Rejected: price drift | 3 |
| Rejected: no ld+json (grocery) | 2 |
| **Pushed** | **2** |

## Pushed

| Store | PID | Deal | Price / MRP | Check |
|---|---|---|---|---|
| Amazon | B0BLQTXSDX | SOLARA 1L sipper bottle (leakproof, BPA-free Tritan) | 299 / 1499 (80% off) | #centerCol, in stock, add-to-cart present, image 200 |
| Flipkart | DPCHGAMGWS5THVUX | Assembled Core i5 (3rd Gen) desktop with 19" LG display, 8GB/512GB, Win11 | 20490 / 30980 (34% off) | ld+json 20490 InStock, image 200 |

The Flipkart listing is titled "LG Core i5", but it is an assembled build that ships with an LG monitor. It was retitled so the page does not imply an LG-made PC.

## Rejected

| Item | ID | Reason |
|---|---|---|
| Sony 1000X The Collexion | B0GY4PPX7F | Card ₹46,489 vs PDP ₹54,989. Fourth tick in a row; the card bakes in a bank offer |
| LifeKrafts | B07YWZMJFP | Card ₹741 vs PDP ₹799 |
| HIKVISION T300 2TB SSD | Flipkart ACCHDYKFZMSECSHS | Card ₹16,749 vs ld+json ₹18,499 |
| YOGABAR | Jiomart | No ld+json; grocery |
| Groundnut | Digihaat | No ld+json; grocery |

## CEO audit

- **Posts (IST):** 1 today, 4 yesterday. Coverless 0, seoless 0. CONTENT-SEO `9 */6` (06:09) fills the rest.
- **Deals:** 13,392 LIVE / 13,797 total. Null-price 0, null-image 0, PENDING_REVIEW 0. Newest is #13915, 0 minutes old.
- **Broadcast:** cursor 13913, DB max 13915. The gap is this push; the external cron picks it up.
- **Prod (DO ingress):** all 7 endpoints return 200 (0.09–0.73s). `https://richdeals.in/` returns 000 because of the registrar hold.
- **Housekeeping:** 0 unpushed commits before this report.
