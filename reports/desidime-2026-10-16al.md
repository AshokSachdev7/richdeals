# DESIDIME tick 2026-10-16al (22:32 IST)

**2 deals pushed LIVE (count 2, both created:true). IndexNow HTTP 200 (5 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Cards found on `/new` and the homepage | 33 |
| Buy Now resolved to a merchant product | 16 |
| Already in the DB (productId match) | 4 |
| New | 12 |
| Passed verification | 2 |

## Pushed

| Store | ID | Deal | Price | MRP |
|---|---|---|---|---|
| Amazon | B0GDPQYXYG | Wooden Ganesh key holder with 7 hooks | ₹79 | ₹599 |
| Amazon | B0GSJMYF8K | Reusable silicone air fryer liners, pack of 6 | ₹99 | ₹699 |

The prices come from the `#centerCol` text in the logged-in tab, and both pages showed an add-to-cart button. Affiliate links use `?tag=ashoksachdev-21`. Both deal pages returned 200 on prod.

## Rejected

| ID | Item | Reason |
|---|---|---|
| CHYHYFYDJUHYXXZG | Glen chimney (Flipkart) | Listing price ₹5,736; ld+json in the browser ₹7,949 |
| COMHGWQESQN4BAHV | HP Victus (Flipkart) | Listing price ₹83,740; ld+json ₹1,01,990 |
| ACCHYG6CXZSZ5S7Z | Samsung 25 W charger (Flipkart) | Listing price ₹449; ld+json ₹699 |
| B0DHVWY583, B0DY2VVZWZ, B0GLHBNX2L, TVSHBPGHSNN2MTWJ, TABHR9HUFDGQJZCG | Kalyan coin, WHOOP, Zebronics, Xiaomi TV, Acer tab | Already rejected in tick af (price drift or unavailable) |
| — | Bombay Shaving Co, Wakefit | Store sale hubs, no ld+json |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,767 / 13287 |
| Broadcast cursor | 13285. The 2-row gap is this batch; the external cron picks it up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
