# DESIDIME tick 2026-10-16z (18:33 IST)

**3 deals pushed LIVE (count 3, all created:true). IndexNow HTTP 200 (6 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Cards found on `/new` and the homepage | 35 |
| Buy Now resolved to a merchant URL | 21 |
| Already in DB (matched on productId) | 4 |
| New | 17 |
| Passed verification | 3 |

## Pushed

| Store | ID | Deal | Price | MRP |
|---|---|---|---|---|
| Amazon | B0FFZJK6FL | Aliens cloth mouse pad | ₹62 | ₹999 |
| Amazon | B0D9XNKD87 | CareFoam orthopedic coccyx seat cushion | ₹699 | ₹1,999 |
| Flipkart | IRNG49JQYYKWC8GU | Havells Glace Plus 1000W dry iron | ₹645 | ₹1,195 |

How each deal was handled:
- **Amazon:** price checked on the product page in the logged-in tab. Affiliate tag `?tag=ashoksachdev-21`.
- **Flipkart:** price read from ld+json in the Flipkart tab: InStock, ₹645, matching the listing card. Affiliate `affid=djhackraj`; the `salescueli` parameters were stripped.

## Rejected

| Item | Reason |
|---|---|
| Muthoot gold pendant B0D2JGNLQM | Listing card ₹29,165, product page ₹32,265 |
| Zebronics monitor B0GLHBNX2L | No buy box |
| Kalyan coin, Lenovo, Samsung G9, Crompton geyser | Same rejects as tick t (price drift or no buy box) |
| Nova Plus Amaze iron (Flipkart) | Out of stock |
| Haier 358 L fridge (Flipkart) | Listing card ₹30,990, product page ₹37,490 |
| Acer Aspire Lite i3 (Flipkart) | Listing card ₹58,242, product page ₹61,499 |
| Acer Iconia Tab iM11 (Flipkart) | Listing card ₹18,749, product page ₹22,999 |
| IFB 1.5 ton AC (Flipkart) | Listing card ₹29,990, product page ₹33,990 |
| Instamart DesiDiya lights | Quick-commerce |
| Free Kindle eBooks | Free and multi-product |
| Patanjali Bel Murabba | Grocery |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,727 / 13247 |
| Broadcast cursor | 13244. The gap is this batch; the external broadcast cron picks it up on its next run |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9, matches roster |
| Unpushed commits | 0 before this report |

No rot found.
