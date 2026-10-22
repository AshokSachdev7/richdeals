# DESIDIME — 2026-10-22d (06:24 IST)

**0 pushed. 9 fresh candidates, all rejected. IndexNow ping skipped because there were no new slugs.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` links, checked non-Amazon prices against ld+json, swapped affiliate tags, and deduped against the DB. Amazon prices were re-read in the Playwright tab on the logged-in richDeals profile with an in-page `fetch('/dp/…')`: `.a-price-whole`, `"priceAmount"`, `#availability`, and the add-to-cart button. No captcha came back.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 30 |
| Junk / other-store / search links dropped | 16 |
| Resolved to a single product | 14 |
| Already in the DB | 5 |
| Fresh | 9 |
| Rejected | 9 |
| **Pushed** | **0** |

The listing is static since 10-22c. The tofu card dropped off and no new card appeared. The 9 fresh items are the same set 10-22c rejected; every product page was re-read this tick and none had moved.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0C9HYYDLZ Godrej Interio Curv chair | ₹3,150 → none | No buy box, no add-to-cart |
| B0DXV1R1R4 Haier 8kg washer | ₹14,740 → ₹16,990 | Price drift |
| B0G5G7LCJQ Redmi Note 15 | ₹25,499 → ₹28,999 | Bank-card price |
| B095KSSDCG Antina skipping rope | ₹29 → none | Out of stock, no add-to-cart |
| B0CBPDLCSP HP OMEN monitor | ₹8,120 → ₹9,299 | Price drift |
| B0FJ2WXDRY Sony INZONE H9 II | ₹20,916 → ₹22,990 | Price drift |
| Whirlpool 192L fridge (Flipkart) | — | Stage 1: ld+json price drift |
| Google Pixel Watch 5 (Flipkart) | — | Stage 1: ld+json price drift |
| Crafin BookMyShow gift card | — | Gift card (junk), no ld+json |

## CEO audit

- **Prod:** 12/12 endpoints returned 200 at SITEMON 10-22g (06:02). SEO-AUDIT-FIX deploy `f443a0db` is ACTIVE, with both title fixes verified live and IndexNow returning 200.
- **Deals:** 13,536 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14065 and the broadcast cursor is also 14065.
- **Posts (IST 2026-10-22):** 1 so far, with 0 coverless and 0 seoless. CONTENT-SEO runs at 06:39 and must bring the day to at least 2.
- **Unpushed commits:** 0 before this report. Crons: 9/9.
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 8 ticks. The chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. The DO API token has still not been rotated; the owner needs to do this.
