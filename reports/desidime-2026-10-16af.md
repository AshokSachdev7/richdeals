# DESIDIME tick 2026-10-16af (20:34 IST)

**3 deals pushed LIVE (count 3, all created:true). IndexNow HTTP 200 (6 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Cards found on `/new` and the homepage | 37 |
| Buy Now resolved to a merchant product | 19 |
| Already in the DB (productId match) | 7 |
| New | 12 |
| Passed verification | 3 |

## Pushed

| Store | ID | Deal | Price | MRP |
|---|---|---|---|---|
| Amazon | B0HMHYXSWZ | Desidiya 55 m LED rice string fairy lights | ₹399 | ₹1,999 |
| Amazon | B08T3M52KQ | Woodland men's leather sneaker (4 left) | ₹1,999 | ₹3,895 |
| Flipkart | PERGQUT8J8XZ9AWV | OSCAR Forever Aqua EDP 100 ml (non-returnable) | ₹99 | ₹1,149 |

The Amazon prices come from the `#centerCol` text, with an add-to-cart button present, in the logged-in tab. The Flipkart price comes from ld+json `offers.price` with InStock availability, read in a browser tab. Affiliate links use `?tag=ashoksachdev-21` for Amazon and `/p/itm…?pid=…&affid=djhackraj` for Flipkart.

## Rejected

| ID | Item | Reason |
|---|---|---|
| B0GY4SSKPB | Crompton Win Plus 1 hp pump | Listing price ₹3,162, product page ₹3,699 |
| B0DY2VVZWZ | WHOOP 5.0 | Listing price ₹15,190, product page ₹17,990 |
| B0DHVWY583 | Kalyan 2 g gold coin | Listing price ₹29,660, product page ₹32,737 |
| B0GLHBNX2L | Zebronics monitor | Currently unavailable, no add-to-cart button |
| B07RX7V4SJ | Patanjali murabba | Grocery |
| TVSHBPGHSNN2MTWJ | Xiaomi 32" TV (Flipkart) | Price drift on the product page |
| — | Acer Iconia tab (Flipkart) | Price drift on the product page |
| — | IFB AC (Flipkart) | Price drift on the product page |
| — | Tapo RV30 (Myntra) | Price drift on the product page |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,755 / 13275 |
| Broadcast cursor | 13272. The 3-row gap is this batch; the external cron picks it up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
