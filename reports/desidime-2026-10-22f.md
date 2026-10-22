# DESIDIME — 2026-10-22f (10:17 IST)

**2 pushed (Magic Eraser sponge pack of 4 ₹39, TRIGGR Trinity Neo neckband ₹699). IndexNow HTTP 200. Both prod deal pages return 200.**

Stage 1 (`ingest-desidime.mjs`) read `/new` and the homepage cards, resolved each `visit.desidime.com` link, and checked ld+json prices for non-Amazon stores. Amazon prices were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Resolved to a single product | 12 |
| Already in the DB | 2 |
| Fresh | 10 |
| Rejected | 8 |
| **Pushed** | **2** |

## Pushed

| Deal (id) | Price | Check |
|---|---|---|
| `magic-eraser-sponge-for-wall-pack-of-4-b0hl4pqsmy` (14082) | ₹39 | PDP `.a-price-whole` and `priceAmount` both 39, in stock, add-to-cart present. The selected variant is "4", matching the card's Qty 4. The PDP MRP of ₹399 fails the MRP guard (price/MRP ≤ 0.2), so MRP and discount are null and the copy states the price only. |
| `triggr-trinity-neo-bluetooth-neckband-80h-playtime-enc-acchz37nkcrgfp4f` (14083) | ₹699 | Flipkart ld+json `livePrice` 699, verified `ok` in stage 1. The MRP of ₹3,999 fails the MRP guard, so it is nulled. |

- Images: `m.media-amazon.com/images/I/51Fs0PQc18L.jpg` and the Flipkart `rukmini1.flixcart.com` product image.
- Affiliate links: Amazon `/dp/B0HL4PQSMY?tag=ashoksachdev-21` (their `desidime01-21` stripped). Flipkart `/p/itmecf5d46e4247a?pid=ACCHZ37NKCRGFP4F&affid=djhackraj` (their `affid=salescueli` and `affExtParam1/2` stripped).
- Dedup: neither productId was in the DB. Bulk response `count:2`, both `created:true`. No slug restore was needed.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0FC1SFX45 realme Buds Wireless 5 Lite | ₹989 → ₹1,349 | Price drift |
| B0D8QJ52PS Godrej Vurv chair | ₹20,566 → ₹23,490 | Price drift; the ASIN now shows a Godrej EWA wardrobe |
| B09NPVBV51 AGARO Gravity treadmill | ₹18,249 → ₹19,999 | Price drift |
| B08226RZ49 baby noise-cancelling earmuffs | ₹441 → ₹449 | Price drift (more than ₹1) |
| B0GP6YCT2Z Hitachi 1 ton 3 star AC | ₹26,500 → ₹31,500 | Price drift |
| B0CBPDLCSP HP OMEN monitor | ₹8,120 → ₹9,299 | Price drift (second tick running) |
| B0FJ2WXDRY Sony INZONE H9 II | ₹20,916 → ₹22,990 | Price drift (second tick running) |
| B0D1XHLBCD leikefitness ab chair | ₹2,880 → — | No buy box, no add-to-cart |

Stage 1 also dropped MSI Modern 14 and TINECO vacuum (Flipkart ld+json drift) and an Amazon Pay rewards page (not a product).

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (2 deal slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so both deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 2. The minimum is met; the next CONTENT-SEO run is at 12:39. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,554 LIVE (up from 13,552). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14083.
- **Broadcast cursor:** 14081 against a highest ID of 14083. The gap is this tick's 2 deals; the external broadcast cron picks them up. Not rot.
- **Unpushed commits:** 0 before this report.
- **In progress:** A traffic audit-and-fix the owner asked for is running separately. It writes `reports/traffic-audit-2026-10-22*.md`.
- **Unresolved:** Deal Dibba has been out of the TG sidebar for 10+ ticks; it is covered through the public preview.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
