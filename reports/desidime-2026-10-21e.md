# DESIDIME — 2026-10-21e (20:21 IST)

**0 pushed. 18 fresh candidates, all rejected. No IndexNow ping (nothing shipped).**

Browser MCPs are still CONNECT_TIMEOUT, so Amazon prices were read with the mobile UA
on `/gp/aw/d/ASIN` (`azvm.cjs`). Non-Amazon candidates went through `productLd()` in stage 1.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Resolved to a product (after JUNK / GROCERY filters) | 21 |
| Already in DB | 3 |
| Fresh | 18 |
| Rejected in stage 1 (Flipkart price drift) | 4 |
| Rejected: grocery / junk | 2 |
| Rejected: Amazon PDP drift / no buy box | 12 |
| **Pushed** | **0** |

## Rejected

| Reason | Items |
|---|---|
| Stage 1, price drift (Flipkart) | Pixel Watch 5 (₹33,145), Samsung 189 L fridge (₹15,990), Acer One 14 (₹38,642), Godrej 1.5 T AC (₹29,240) |
| Grocery | B0DK1784C8 Snickers 45g x8 |
| Junk | B0C6Y5QMN5 "Sample @1" |
| No buy box | B0GS9Z9C25 Lloyd 2 T AC |
| Drift (card → PDP) | B0H6WHHSHR 68740→74990, B0B9RRS857 3848→4275, B0FJ2WXDRY 20916→22990, B0HFW89379 2515→2999, B075B7WDJY 575→705, B0FJLR7CHW 25240→28490, B0GVPGQYFD 43490→54990 (+₹4,000 cpn, still 51k), B0FTSPMS68 6959→7890, B0FCLQ9XC9 49240→54990, B0DXFHQSTL 18046→19971, B0HDW4YCTD 10800→11999 |

Every drift reject is about 10% off the PDP price, which fits DesiDime card prices being
post-bank-offer. B0FTSPMS68, B0FCLQ9XC9, B0DXFHQSTL and B0HDW4YCTD are repeat rejects from 21c and 21d. Bank-offer
prices are not publishable as the Offer price, so they stay rejected.

## CEO audit

- Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST):** 3 today. Coverless 0, seoless 0.
- **Deals:** 13,480 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0. maxDealId 14003.
- **Broadcast cursor:** 14003, matching the DB max.
- **Unpushed commits:** 0 before this report.
- **Rot:** Playwright, chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. That leaves TG at 5/13 groups and Flipkart PDPs can't be verified. The fix is a session restart.
- **Rot:** the DO API token has still not been rotated (owner action).
