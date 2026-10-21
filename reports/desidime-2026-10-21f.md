# DESIDIME — 2026-10-21f (22:22 IST)

**3 deals pushed LIVE (2 Amazon, 1 Flipkart) out of 19 fresh candidates; 16 rejected. IndexNow returned HTTP 200 for 6 URLs.**

The browser tools still time out on connect, so Amazon prices were read from the mobile Amazon product page (`/gp/aw/d/ASIN`, via `azvm.cjs`). Prices for other stores were checked in stage 1 with `productLd()`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Resolved to a product (after the JUNK and GROCERY filters) | 20 |
| Already in the DB | 1 |
| Fresh | 19 |
| Rejected in stage 1 (Flipkart price drift or out of stock) | 4 |
| Rejected for quality (FMCG, quick-commerce, junk) | 3 |
| Rejected at the Amazon product page (price drift or no buy box) | 9 |
| **Pushed** | **3** |

## Pushed

| Deal | Store | Price | MRP |
|---|---|---|---|
| `10m-stainless-steel-clothesline-rope-with-carabiner-hooks-b0hn35t6r1` | Amazon | ₹188 | ₹499 (62%) |
| `himalaya-happy-baby-gift-pack-7-piece-b008yd53kc` | Amazon | ₹358 | ₹630 (43%) |
| `vivanta-design-alloy-multicolor-jewellery-set-jwsh4d7zg9hgpmxb` | Flipkart | ₹158 | MRP set to null by the MRP guard (₹999 listed) |

- The bulk push returned `count:3`, with all 3 rows `created:true`.
- Before the push, all 3 product IDs were checked against the DB and none were found.
- The script checked every ₹ amount and % in the titles and descriptions against the price, MRP and discount.
- The Himalaya description was kept generic: it does not list the kit's contents, because those were not verified.
- Spot checks of 2 of the new deal pages returned 200 on prod.

## Rejected

| Reason | Items |
|---|---|
| Stage 1: Flipkart price drift | BSB fleece blanket 488→375, Kamiliant luggage set 2826→3499, Pixel Watch 5 33145→41900 |
| Stage 1: out of stock | Nerf SuperSoaker (Flipkart) |
| Low-ticket FMCG | B0FDX1Z8CB Presto dishwash gel 5 L (₹419 verified) |
| Quick-commerce, location-locked | Instamart Kalyan 1 g silver coin ₹261 (Instamart is location-locked, and silver prices change daily) |
| Junk | B0C6Y5QMN5 "Sample @1" (the product page shows ₹39 toothpaste) |
| No buy box | B0FD3K78Q8 Casio LF-30W, B0GVPGQYFD TCL 55" |
| Price drift (DesiDime card → Amazon page) | B0CX4PY3WR Haier 596 L 56736→66990, B0HHRB6DQG Lenovo Idea Tab 42999→47999, B0FJ2WXDRY Sony INZONE 20916→22990, B0FTSPMS68 7890, B0FCLQ9XC9 54990, B0DXFHQSTL 19971, B0G44MZWQV TCL 75" 59740→70990 ("ICICI CC EMI" in the title) |

Several items were rejected again for the same reason as in the previous ticks:

- **Price drift:** B0FTSPMS68, B0FCLQ9XC9, B0DXFHQSTL and B0FJ2WXDRY. DesiDime shows them at a price that needs a bank offer.
- **No buy box:** B0GVPGQYFD.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST):** 3 published today. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,492 LIVE (3 added). 0 deals have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14016.
- **Broadcast cursor:** 14013, which is 3 behind the highest deal ID. That gap is this batch; the external broadcast cron sends it on its next run.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** The Playwright, chrome-devtools and reticle browser tools still time out on connect (CONNECT_TIMEOUT). Because of that, TG reaches only 5 of 13 groups and Flipkart prices can't be checked in a browser. A session restart should fix it.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
