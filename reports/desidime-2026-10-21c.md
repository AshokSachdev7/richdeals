# DESIDIME — 2026-10-21c (16:22 IST)

**5 pushed LIVE (all Amazon, ids 13964–13968). IndexNow HTTP 200 for 8 URLs.**

Browser MCPs are still CONNECT_TIMEOUT, so Amazon prices were read with the mobile UA
on `/gp/aw/d/ASIN` (`azvm.cjs`). Non-Amazon candidates went through `productLd()` in stage 1.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 37 |
| Dropped by JUNK / other-store filters | 8 |
| Resolved to a product | 27 |
| Already in DB | 5 |
| Fresh | 22 |
| Rejected in stage 1 (non-Amazon) | 3 |
| Rejected: Amazon PDP drift / no buy box | 14 |
| **Pushed** | **5** |

## Pushed

| Deal | Price | MRP | Note |
|---|---|---|---|
| `apollo-actizip-f2-2-75-18-front-bike-tyre-b01j0wh1r8` | ₹1,700 | ₹1,900 | |
| `murphy-1-feet-4w-led-under-cabinet-light-b09hhfhh8y` | ₹188 | ₹895 | |
| `amazon-basics-3-axis-smartphone-gimbal-ai-tracking-b0f38p4d7s` | ₹2,999 | ₹10,999 | |
| `bluewud-shubh-mandir-floor-standing-pooja-unit-b0fpr7jxcg` | ₹5,099 | ₹9,999 | |
| `ugaoo-1l-pressure-spray-pump-brass-nozzle-b0bsl6fcvc` | ₹99 | null | MRP guard (99/860 ≤ 0.2) |

All 5 returned `created:true`.

## Rejected

| Reason | Items |
|---|---|
| Stage 1, no ld+json | Netmeds (sale page, not a product), Croma Thumri party speaker |
| Stage 1, price drift | Flipkart Exide tubular battery |
| No buy box | B0GJDVGS6P Lloyd 1.5T AC |
| Drift (card → PDP) | B0G48V56FV 45587→48087, B0DHS41MPF 7191→7990, B0GLZTGRR9 4410→4899 (+₹300 cpn), B0HDW4YCTD 10800→11999 (+₹300 cpn), B0HGRM4S1B 21855→22999, B0GVNKM5GB 226990→234990, B0GYZ99X8V 40490→44990, B0GZPQCFWX 9100→9999, B0GWJN3BC5 11699→12999, B0HHPBQKPB 3150→3499, B092R6DLGS 114→159, B0B5H846HT 139→149, B0F79R1D5K 4884→6429 |

Most of the drift is roughly 10% under the PDP price. DesiDime cards list the
bank-card (ICICI/Axis/HDFC) price, and that price is never published as ours.

## CEO audit

- **Posts (IST):** 2 today. Coverless 0, seoless 0.
- **Deals:** 13,444 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0. maxDealId 13968.
- **Unpushed commits:** 0 before this report.
- **Rot:** Playwright, chrome-devtools and reticle MCPs are down. That leaves 8 of 13 TG groups unreachable and IFS Flipkart pids unresolvable. The fix is a session restart.
- **Rot:** the DO API token has still not been rotated (owner action).
