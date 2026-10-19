# DESIDIME — 2026-10-20b (02:31 IST)

**1 pushed (count 1, created:true, slug 200) · IndexNow HTTP 200 (4 URLs)**

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 29 |
| Product-resolved (after JUNK/GROCERY filters) | 14 |
| Already in DB | 8 |
| Fresh | 6 |
| Rejected: price drift | 2 |
| Rejected: no ld+json / out of stock | 3 |
| **Pushed** | **1** |

## Pushed

| Store | PID | Deal | Price / MRP | Check |
|---|---|---|---|---|
| Amazon | B0BXXWMFHG | The Indian Garage Co men's slim-fit mid-rise cotton shorts | 275 / 1599 (83% off) | #centerCol, "Only 4 left", add-to-cart present, image 200 |

## Rejected

| Item | ID | Reason |
|---|---|---|
| Sony 1000X The Collexion headphones | B0GY4PPX7F | Card ₹46,489 vs PDP ₹54,989. Third tick in a row: the card bakes in a bank offer |
| HIKVISION T300 2TB SSD | Flipkart ACCHDYKFZMSECSHS | Card ₹16,749 vs ld+json ₹18,499 |
| YOGABAR energy bar | Jiomart | No ld+json; grocery |
| Raw groundnut 250g | Digihaat | No ld+json; grocery |
| AWSUM choco brownie | Instamart | Out of stock |

## CEO audit

- **Posts (IST):** 1 today. Coverless 0, seoless 0. CONTENT-SEO `9 */6` fills the rest.
- **Deals:** 13,389 LIVE. Null-price 0, null-image 0, PENDING_REVIEW 0.
- **Broadcast:** cursor 13911, DB max 13912. The gap is this push; the external cron picks it up.
- **Prod endpoints:** all 7 return 200 (0.10–0.71s).
- **Housekeeping:** 0 unpushed commits before this report. CronList showed 9 of 9 roster jobs at 02:07 (sitemon 10-20c).
