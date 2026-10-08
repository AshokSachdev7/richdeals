# DesiDime tick 2026-10-08i (16:46 IST)

**11 fresh candidates → 2 pushed** (both Amazon). `/admin/deals/bulk` count 2, both `created:true`. Both live pages return 200. IndexNow **HTTP 200** for 5 URLs.

Stage 1 found 36 cards. 17 resolved to a product, 6 of those were already in the DB, and 11 were fresh.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [Ant Esports AEKS100 digital kitchen scale, 10kg](https://richdeals.in/ant-esports-aeks100-digital-kitchen-weighing-scale-10kg-b0cp2fppm5) (B0CP2FPPM5) | ₹159 | ₹1,199 | 87% | 4.1★ (1,160) |
| [Havells GS4008 8-in-1 grooming kit](https://richdeals.in/havells-gs4008-8-in-1-grooming-kit-with-nose-and-ear-attachment-b0gnrf626k) (B0GNRF626K) | ₹799 | ₹1,999 | 60% | 4.0★ (1,940) |

Both were checked on the Amazon product page in the logged-in tab: `#centerCol` price matched, `#availability` showed In stock, and add-to-cart was present. The image is the `#landingImage` hiRes. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

## Rejected (9)

| Candidate | Reason |
|---|---|
| Lifelong Bunny ride-on toy car | Currently unavailable |
| Alberto Torresi men's sneakers | 2.4★ from 2 ratings, only 1 left |
| Prestlee 3L pressure cooker | 5 ratings (0–7 ratings is a reject) |
| Samsung 27" M5 smart monitor | ₹14,499 live vs ₹12,550 posted |
| Samsung 24" curved monitor | ₹7,699 live vs ₹6,930 posted |
| Go Kashmiri walnuts 1kg (JioMart) | Food, and the page has no ld+json |
| TCL 2 ton AC, HP Omnibook 3, Oakter mini UPS (Flipkart) | Price drift, caught by stage 1 |

## CEO audit (16:46 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,280 |
| Broadcast cursor | 12797 vs DB max 12799. The 2 new rows are waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
