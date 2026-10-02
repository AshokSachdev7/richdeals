# DESIDIME-INGEST — 2026-10-03 (IST)

**29 cards discovered → 11 resolved to a single product → 3 already in the DB → 8 fresh candidates → 0 pushed. No bulk call and no IndexNow ping, because there was nothing to send.**

## Candidates (8), all rejected

Amazon items were read on the product page in the logged-in Playwright tab (`#centerCol` price, `#availability`, add-to-cart button, rating). Non-Amazon items were checked against the store's ld+json.

| ID | Item | Store | Card price | Store page | Reject reason |
|---|---|---|---|---|---|
| B0HKTGD28N | Flower tealight candles, set of 16 | Amazon | ₹199 | ₹199, MRP ₹799, in stock | 0 ratings |
| B0B91B1LFY | BSB HOME 200 TC double bedsheet + 2 pillow covers | Amazon | ₹199 | ₹199, MRP ₹1,299, in stock | Rating 3.3 (≤ 3.5) |
| B0D9Y23BPM | Homeybiz eco laundry balls, 10 pcs | Amazon | ₹99 | ₹99, MRP ₹589, in stock | 2 ratings (0–7 band) |
| B0DWX5WVY8 | Spacewood Blaze bed with box storage | Amazon | ₹13,653 | "Currently unavailable", no add-to-cart | Out of stock; rating 2.0 (1 rating) |
| COMHR3K5ZFTJ4WX8 | HP Omnibook 3 | Flipkart | ₹77,990 | Different price | Price drift |
| — | HF Slog bat | Shopsy | ₹220 | Different price | Price drift |
| — | Jiomart Mak chargers | Store1 | — | No ld+json | Category page |
| B0899KPV4S | Free Kindle eBooks "& more" | Amazon | ₹0 | — | Multi-product loot |

Stage 1 also dropped these before resolving links: CRED/Uber gift card, Amazon TV sale category page, Hubble app, CRED coin rush app.

## CEO audit

| Check | Result |
|---|---|
| Endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 |
| LIVE deals | 11,934 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 359; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 1 so far; 10-02: 3; 09-29 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,413 / 12,410. A 3-row gap; the external broadcast cron drains it. |
| Unpushed commits | 0 before this report |

No rot found. DesiDime yield is junk-heavy again tonight: 0 of 8 fresh candidates passed quality checks.
