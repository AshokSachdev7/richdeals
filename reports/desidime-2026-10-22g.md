# DESIDIME — 2026-10-22g (19:15 IST)

**4 pushed (IDs 14132–14135): CELLO glass fridge bottles, set of 3, ₹351; anti-vibration pads ₹245; Lifelong toiletry bag ₹169; kitchen scissors ₹85. IndexNow HTTP 200. The prod deal page returns 200.**

Stage 1 (`ingest-desidime.mjs`) read `/new` and the homepage cards, resolved each `visit.desidime.com` link, and checked ld+json prices for non-Amazon stores. Amazon prices were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`; MRP was read from the `#centerCol` text.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Resolved to a single product | 22 |
| Already in the DB | 3 |
| Fresh | 19 |
| Rejected | 15 |
| **Pushed** | **4** |

## Pushed

| Deal (id) | Price | Check |
|---|---|---|
| `cello-h2o-glass-fridge-water-bottle-set-of-3-b09th2f6l8` | ₹351 / ₹747 (53%) | `.a-price-whole` and `priceAmount` were both 351, in stock, add-to-cart present. The selected variant is "Set of 3_Black". `.a-text-price` read ₹117, which is the per-count rate; the real MRP of ₹747 came from `#centerCol`. |
| `anti-vibration-pads-for-washing-machine-b0fk1yqfnw` | ₹245 / ₹499 (51%) | PDP 245, in stock, add-to-cart present |
| `lifelong-vegan-leather-toiletry-bag-b0f21w1b2t` | ₹169 | PDP 169, in stock, add-to-cart present. The PDP MRP of ₹1,499 fails the MRP guard (ratio 0.11), so MRP and discount are null. |
| `heavy-duty-kitchen-scissors-with-bottle-opener-b0hlw6q55q` | ₹85 | PDP 85, in stock, add-to-cart present. The PDP MRP of ₹599 fails the MRP guard (ratio 0.14), so it is nulled. |

- **Images:** `m.media-amazon.com/images/I/…` (hiRes, size suffix stripped).
- **Affiliate:** `/dp/<ASIN>?tag=ashoksachdev-21`, with their `desidime01-21` stripped.
- **Copy:** original titles and descriptions. The validator checked that every ₹ amount equals the price or MRP and every % equals `discountPct`.
- **Dedup:** none of the 4 productIds were in the DB. The bulk response was `count:4`, all `created:true`.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0HHJFXZFW Ninja Air Fryer PRO 4.7 L | ₹7,200 → ₹7,999 | Price drift |
| B0H3NYBFVR Haier 12 kg washer | ₹30,540 → ₹41,790 | Price drift |
| B0FWQT87JQ Shark Detect Clean & Empty | ₹26,499 → ₹28,999 | Price drift |
| B0HD81XQ11 Ninja Crispi | ₹12,750 → ₹14,999 | Price drift |
| B0FWQV36NL Shark PowerPro Pet IZ380INT | ₹18,999 → ₹20,999 | Price drift |
| B07BLCWPNR BOSCH Aquatak 125 | ₹8,108 → ₹9,484 | Price drift |
| B0BJKQ7C83 Lavie clutch | ₹466 → ₹549 | Price drift |
| B0B3G7ZTPW InstaCuppa chopper | ₹2,123 → ₹2,299 | Price drift |
| B0BXDTRH36 Glen Senza chimney | ₹8,730 → ₹9,699 | Price drift |
| B0HCB1Z9BR iQOO 15R | ₹48,999 → ₹59,999 | Price drift; the card is for 8 GB, while the PDP default is 12 GB and shows no `#availability` |
| B0C6LZLBWF Livguard LGS1000i | ₹4,500 → ₹5,000 | Price drift |
| B0F9LJ7VP5 MarwarBites pumpkin seeds 1 kg | ₹679 | Grocery |
| 32d905a06c84 Wonderchef Vista Neo (Myntra) | ₹1,103 | ld+json drift (stage 1) |
| MIXGT4ZTBU5GGPQG Prestige Classic juicer (Flipkart) | ₹1,524 | ld+json drift (stage 1) |
| ceebe60d7919 HP M190 mouse (JioMart) | ₹333 | No ld+json (stage 1) |

11 of the 15 Amazon cards drifted. Most were big-ticket items carrying bank-card or coupon-stacked "effective" prices, which the PDP does not show.

Stage 1 also dropped Alcatel V3 Classic 5G and LG 185 L fridge (Flipkart), plus a Myntra gold-coin code (BLINKD, not a product).

## Freshness

- **IndexNow:** HTTP 200 for 7 URLs (4 deal slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so the new deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new CELLO page returns 200.
- **Posts (IST 2026-10-22):** 2. The minimum is met. A CONTENT-SEO post is queued in this session. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,607 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14135.
- **Broadcast cursor:** 14117 against a highest ID of 14135. It advanced from 14107 during this tick, so the external cron is draining the queue. Not rot.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
