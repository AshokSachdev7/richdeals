# DESIDIME-INGEST — 2026-10-03f

**Stage 1 found 33 cards. 13 resolved to a product, 3 were already in the DB and 10 were new. 2 passed verification and went LIVE (`count:2`, both created). IndexNow returned HTTP 200 for 5 URLs.**

## Pushed (LIVE, ids 12,429–12,430)

| Deal | Price / M.R.P. | Verification (logged-in Amazon tab) |
|---|---|---|
| XTRIM wrist support, pack of 2 (B0CMCSQNTD) | ₹98 / ₹699 (86% off) | In stock, add-to-cart present, 4.2★ from 2,130 reviews, seller RetailEZ |
| TECHNOVIBES foldable study / bed table (B0GP83XVS5) | ₹948 / ₹1,499 (37% off) | In stock, add-to-cart present, 3.7★ from 5,688 reviews, seller Cocoblu Retail. The product page M.R.P. is ₹1,499, not DesiDime's ₹1,599. |

- **Affiliate links:** `?tag=ashoksachdev-21`. Their `desidime01-21` tag was stripped.
- **Images:** taken from the m.media-amazon CDN.
- **Payload builder:** `scripts/push-dd-1003f.mjs`.
- **Live check:** both new deal pages return 200 on prod.

## Rejected

| Candidate | Reason |
|---|---|
| BATCHONE iPhone 16 case (B0HG4MZ8H7) | ₹109 on the product page vs ₹100 on the card (drift ₹9); only 6 ratings |
| Home Centre Addison bookshelf (B0G2C5DRH6) | ₹5,999 vs ₹3,712; no ratings |
| Max plus-size joggers (B0DV4G2369) | Only 2 left; 3.6★ from 24 ratings |
| HRX Helium luggage set (B0HHPCK5LD) | ₹3,599 vs ₹3,140; 3.5★ from 2 ratings |
| Shopsy mulmul saree | finalPrice 156/195 vs ₹129 |
| Shopsy AMYTEL power bank | 294 vs ₹251; rated 3.4 |
| Shopsy Marvel B11 neckband | 125/148 vs ₹109; rated 3.2 |
| Jiomart Mak chargers | Category page |

## Freshness

- **IndexNow:** 2 slugs plus 3 hub URLs (5 URLs), HTTP 200.
- **Sitemap:** ISR (30 min) will pick up the new deals.
- **llms.txt:** dynamic, so it already lists them.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,951 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 360; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 2 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,428 / 12,430. The IFS batch has been sent; the 2 new deals go out on the next external cron run. |
| Unpushed commits | 0 before this report |

No rot found.
