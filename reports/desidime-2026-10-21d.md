# DESIDIME — 2026-10-21d (18:20 IST)

**2 pushed LIVE (both Amazon, ids 13980–13981). IndexNow HTTP 200 for 5 URLs.**

Browser MCPs are still CONNECT_TIMEOUT, so Amazon prices were read with the mobile UA
on `/gp/aw/d/ASIN` (`azvm.cjs`). Non-Amazon candidates went through `productLd()` in stage 1.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 33 |
| Resolved to a product (after JUNK / GROCERY filters) | 17 |
| Already in DB | 3 |
| Fresh | 14 |
| Rejected in stage 1 (non-Amazon price drift) | 2 |
| Rejected: grocery (dried food) | 1 |
| Rejected: Amazon PDP drift / no buy box | 9 |
| **Pushed** | **2** |

## Pushed

| Deal | Price | MRP |
|---|---|---|
| `ptron-fusion-mount-v2-mini-bluetooth-speaker-12w-b0dh2l8jq6` | ₹899 | ₹3,199 (72% off) |
| `eveready-ultima-lr44-alkaline-coin-battery-pack-of-10-b0c85bv5vv` | ₹70 | ₹200 (65% off) |

The bulk call returned `count:2`, both `created:true`, and both return 200 on prod.

## Rejected

| Reason | Items |
|---|---|
| Stage 1, price drift | Myntra Longway Kestro kettle (₹288), Flipkart Exide IRTT2000 battery (₹8,961) |
| Grocery | B014V4BG5S Urban Platter dried shiitake 100g |
| No buy box | B0GVPGQYFD TCL 55" QLED |
| Drift (card → PDP) | B074CKD5M4 2970→3299, B0FTSPMS68 6959→7890, B0FSCSPF5X 2513→2849, B0FCLQ9XC9 49240→54990 (+₹1,000 cpn), B0DXFHQSTL 18046→19971, B0HDW4YCTD 10800→11999, B0GWJN3BC5 11699→12999, B0B5H846HT 139→149 |

The last four were also drift rejects in 21c. DesiDime keeps the bank-offer card price on these.

## CEO audit

- Prod: 12/12 endpoints returned 200 at SITEMON 21f (18:02).
- **Posts (IST):** 2 today. Coverless 0, seoless 0.
- **Deals:** 13,457 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0. maxDealId 13981.
- **Unpushed commits:** 0 before this report.
- **Rot:** Playwright, chrome-devtools and reticle MCPs are down. That leaves 8 of 13 TG groups unreachable, and Flipkart PDPs can't be verified. The fix is a session restart.
- **Rot:** the DO API token has still not been rotated (owner action).
