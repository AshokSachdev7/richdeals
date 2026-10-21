# DESIDIME — 2026-10-22a (00:20 IST)

**2 deals pushed LIVE (Amazon) out of 10 fresh candidates; 8 rejected. IndexNow returned HTTP 200 for 5 URLs.**

Playwright is back, so Amazon prices were read in a Playwright tab using the logged-in richDeals profile (`#corePriceDisplay_desktop_feature_div`, `#availability` and the add-to-cart button). The Flipkart price was checked in stage 1 with `productLd()`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 31 |
| Resolved to a product (after the JUNK and GROCERY filters) | 11 |
| Already in the DB | 1 |
| Fresh | 10 |
| Rejected in stage 1 (Flipkart price drift) | 1 |
| Rejected at the Amazon product page (price drift or no buy box) | 7 |
| **Pushed** | **2** |

## Pushed

| Deal | Store | Price | MRP |
|---|---|---|---|
| `cello-glassy-square-glass-lunch-box-set-of-2-320ml-b0dxpphyfp` | Amazon | ₹374 | ₹1,099 (66%) |
| `lepl-a-203-cordless-hair-clipper-2000mah-b0h6m5jbk8` | Amazon | ₹699 | ₹2,149 (67%) |

- The bulk push returned `count:2`, with both rows `created:true`.
- Before the push, both product IDs were checked against the DB and neither was found.
- The script checked every ₹ amount and % in the titles and descriptions against the price, MRP and discount.
- Spot checks of both new deal pages returned 200 on prod.

## Rejected

| Reason | Items |
|---|---|
| Stage 1: Flipkart price drift | Pixel Watch 5 33145→41900 |
| Unavailable / no buy box | B0HN6R1KPC Simply Soft mattress (card said ₹5), B0GX59361G Ant Esports View 515 Plus projector, B0GVPGQYFD TCL 55" QLED |
| Price drift (DesiDime card → Amazon page) | B0CBPDLCSP HP OMEN 23.8" monitor 8120→9299, B0GWLZZB2K Jio AX3000 mesh router 2700→2999, B0G43DF5QZ MAONO A04-Gen2 mic 3404→4059, B0FJ2WXDRY Sony INZONE H9 II 20916→22990 |

Several items were rejected again for the same reason as in the previous ticks:

- **Price drift:** B0FJ2WXDRY (DesiDime shows it at a price that needs a bank offer) and the Pixel Watch 5.
- **No buy box:** B0GVPGQYFD.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 0 so far at 00:20. This is not rot, because the IST day has only just started; CONTENT-SEO runs at `9 */6`. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,513 LIVE (2 added). 0 deals have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14040.
- **Broadcast cursor:** 14038, which is 2 behind the highest deal ID. That gap is this batch; the external broadcast cron sends it on its next run.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** The chrome-devtools and reticle MCPs still time out on connect (CONNECT_TIMEOUT). Playwright covers the work, so nothing is blocked.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
