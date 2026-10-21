# DESIDIME — 2026-10-22c (04:19 IST)

**0 pushed. 10 fresh candidates, all rejected. IndexNow ping skipped because there were no new slugs.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` links, checked non-Amazon prices against ld+json, swapped affiliate tags, and deduped against the DB. Amazon prices were read in a Playwright tab on the logged-in richDeals profile with an in-page `fetch('/dp/…')`: `#corePriceDisplay_desktop_feature_div .a-price-whole`, the `"priceAmount"` value, `#availability`, and the add-to-cart button. No captcha came back.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 29 |
| Junk / other-store / search links dropped | 14 |
| Resolved to a single product | 15 |
| Already in the DB | 5 |
| Fresh | 10 |
| Rejected | 10 |
| **Pushed** | **0** |

The listing barely moved since 10-22b. The only new card is the tofu below; the other 9 fresh items are the ones 10-22b rejected, re-read on the product page this tick.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B089DCBDQN Briyas Milky Mist tofu 200 g | ₹35 → none | Perishable (GROCERY rule). It also has no buy box. |
| B0C9HYYDLZ Godrej Interio Curv chair | ₹3,150 → none | No buy box, no add-to-cart |
| B0DXV1R1R4 Haier 8kg washer | ₹14,740 → ₹16,990 | Price drift |
| B0G5G7LCJQ Redmi Note 15 | ₹25,499 → ₹28,999 | Bank-card price |
| B095KSSDCG Antina skipping rope | ₹29 → none | Out of stock |
| B0CBPDLCSP HP OMEN monitor | ₹8,120 → ₹9,299 | Price drift |
| B0FJ2WXDRY Sony INZONE H9 II | ₹20,916 → ₹22,990 | Price drift |
| Whirlpool 192L fridge (Flipkart) | — | Stage 1: ld+json price drift |
| Google Pixel Watch 5 (Flipkart) | — | Stage 1: ld+json price drift |
| Crafin BookMyShow gift card | — | Gift card (junk), no ld+json |

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,536 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14065.
- **Broadcast cursor:** 14065, matching the highest deal ID.
- **Posts (IST 2026-10-22):** 1 so far, which is normal at 04:19. CONTENT-SEO runs next at 06:39. 0 posts lack a cover and 0 lack SEO fields.
- **Unpushed commits:** 0 before this report. Crons: 9/9 at SITEMON 10-22e (04:02).
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 6 ticks.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
