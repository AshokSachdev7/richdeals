# DESIDIME — 2026-10-22b (02:20 IST)

**1 pushed LIVE (Amazon). 10 fresh rejected. IndexNow HTTP 200 for 4 URLs.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` links, checked non-Amazon prices against ld+json, swapped affiliate tags, and deduped against the DB. Amazon prices were read in a Playwright tab on the logged-in richDeals profile: `#corePriceDisplay_desktop_feature_div`, `#availability` and the add-to-cart button. Listings that read empty were reloaded with a real navigation.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk / other-store / search links dropped | 14 |
| Resolved to a single product | 15 |
| Already in the DB | 4 |
| Fresh | 11 |
| Rejected | 10 |
| **Pushed** | **1** |

## Pushed

| Deal | Price | MRP |
|---|---|---|
| `clicksy-self-adhesive-wall-hooks-flower-10-pcs-b0gh23f195` | ₹49 | — *(guard: listed ₹299, ratio 0.164)* |

- The card said ₹48 and the product page said ₹49. That is within the ±₹1 rule, so the deal went up at the product-page price. IFS 10-22a rejected the same ASIN because the gap then was 47→49.
- The bulk push returned HTTP 201 with `count:1` and `created:true`. Prod returns 200 for the page.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0C9HYYDLZ Godrej Interio Curv chair | ₹3,150 → none | No buy box, no add-to-cart |
| B0DXV1R1R4 Haier 8kg washer | ₹14,740 → ₹16,990 | Price drift |
| B0G5G7LCJQ Redmi Note 15 | ₹25,499 → ₹28,999 | Bank-card price (also rejected in IFS 10-22a) |
| B095KSSDCG Antina skipping rope | ₹29 → — | Out of stock |
| B0CBPDLCSP HP OMEN monitor | ₹8,120 → ₹9,299 | Price drift |
| B0FJ2WXDRY Sony INZONE H9 II | ₹20,916 → ₹22,990 | Price drift |
| B0HHRB6DQG Lenovo Idea Tab Pro Gen 2 | ₹42,999 → none | No price, no add-to-cart |
| Whirlpool 192L fridge (Flipkart) | — | Stage 1: ld+json price drift |
| Google Pixel Watch 5 (Flipkart) | — | Stage 1: ld+json price drift |
| Crafin BookMyShow gift card | — | Gift card (junk), no ld+json |

## CEO audit

- **Prod:** at SITEMON 10-22c (02:02 IST), 12/12 endpoints returned 200. The new deal page also returns 200.
- **Deals:** 13,527 LIVE (13,526 + 1). 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14055.
- **Broadcast cursor:** 14054, one behind. That gap is this deal; the external cron sends it on its next run.
- **Posts (IST 2026-10-22):** 1 so far, which is normal at 02:20. CONTENT-SEO runs next at 06:39. 0 posts lack a cover and 0 lack SEO fields.
- **Unpushed commits:** 0 before this report. Crons: 9/9.
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 4 ticks.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
