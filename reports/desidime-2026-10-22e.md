# DESIDIME — 2026-10-22e (08:20 IST)

**2 pushed (Sorath set top box stand ₹50, Ocean Mart 5L watering can ₹132). IndexNow HTTP 200. Both prod deal pages return 200.**

Stage 1 (`ingest-desidime.mjs`) read `/new` and the homepage cards, resolved each `visit.desidime.com` link, and checked ld+json prices for non-Amazon stores. Amazon prices were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 30 |
| Resolved to a single product | 14 |
| Already in the DB | 5 |
| Fresh | 9 |
| Rejected | 7 |
| **Pushed** | **2** |

## Pushed

| Deal (id) | Price | Check |
|---|---|---|
| `sorath-set-top-box-stand-with-double-remote-holder-wall-mount-b0bqc48y1h` (14067) | ₹50 | PDP ₹50, same as the card. In stock, with add-to-cart. The PDP MRP of ₹399 fails the MRP guard (price/MRP 0.125 ≤ 0.2), so MRP and discount are null and the copy states the price only. |
| `ocean-mart-5l-watering-can-with-built-in-sprayer-b0cvqdp12x` (14068) | ₹132 | PDP ₹132.27 against a ₹132 card (within ±₹1; price is an Int column, so it is stored as 132). In stock, with add-to-cart. MRP ₹599, 78% off. |

- Images come from `m.media-amazon.com` (`31K9Bee90JL`, `2129ory7L1L`).
- Affiliate links: `/dp/ASIN?tag=ashoksachdev-21`. Their tag `desidime01-21` was stripped.
- Bulk response: `count:2`, both `created:true`. No slug restore was needed.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0HBBGSJ2G Lenovo Idea Tab | ₹16,999 → ₹20,999 | Price drift |
| B0DXV1R1R4 Haier washing machine | ₹14,740 → ₹16,990 | Price drift |
| B0CBPDLCSP HP OMEN monitor | ₹8,120 → ₹9,299 | Price drift |
| B0FJ2WXDRY Sony INZONE H9 II | ₹20,916 → ₹22,990 | Price drift |
| B0GVPGQYFD TCL 55" QLED | — | No buy box, no add-to-cart |
| B0C9HYYDLZ Godrej Curv chair | — | No buy box |
| Google Pixel Watch 5 (Flipkart) | — | Stage 1: ld+json price drift |

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (2 deal slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so both deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 2. The minimum is met; the next CONTENT-SEO run is at 12:39. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,539 LIVE (up from 13,537). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14068.
- **Broadcast cursor:** 14066 against a highest ID of 14068. The gap is this tick's 2 deals; the external broadcast cron picks them up. Not rot.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** Deal Dibba has been out of the TG sidebar for 9+ ticks; it is covered through the public preview.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
