# DESIDIME tick 2026-10-17e (04:33 IST)

**3 deals pushed LIVE (count 3, all created:true). IndexNow HTTP 200 (6 URLs). All 3 deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards found on `/new` and the homepage | 32 |
| Dropped as junk or a non-product link | 13 |
| Resolved to a merchant product | 19 |
| Already in the DB (productId match) | 5 |
| Fresh candidates | 14 |
| Skipped in stage 1 (Motorola Edge 70 Fusion price drift; Bombay Shaving store-wide sale with no ld+json) | 2 |
| Checked on the product page | 12 |
| Passed verification | 3 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0GQSRL7QY | Cleaning brush with a refillable liquid dispenser | ₹59 | ₹499 | Logged-in browser tab: price block, add-to-cart present, In stock |
| Flipkart | CDMECPMWJFJACVHG | MOODS Velvet condoms, 15 pieces (3 packs of 5) | ₹370 | ₹500 | ld+json in the browser tab, InStock. Pack size confirmed from the ld+json name |
| Snapdeal | 903f136f3ce3 | Hetsa women's cotton Anarkali kurti, maroon | ₹184 | ₹1,499 | ld+json via curl, InStock. MRP read from the page's `pdpCutPrice` block |

Affiliate links: Amazon uses `?tag=ashoksachdev-21`, Flipkart uses `?pid=…&affid=djhackraj`, and Snapdeal goes through Cuelinks. Images come from the m.media-amazon.com, rukmini1.flixcart.com and g.sdlcdn.com CDNs. The Amazon image is the `landingAsinColor` hiRes. The DB productId re-check before the push returned 0 rows.

## Rejected

These are the same 9 rejects as 10-17c; the cards have not moved.

| ID | Item | Card | Product page |
|---|---|---|---|
| B07THTWXX2 | Home Centre Helios Emily sofa | ₹9,729 | ₹11,699 |
| B01LZSWXWI | Roff Cera Clean 1 L | ₹144 | ₹152 |
| B0H2FD3L97 | Lenovo Idea Tab with keyboard | ₹27,999 | ₹32,999 |
| B0FQFJM9MK | Apple Watch Series 11 42 mm | ₹32,249 | ₹34,499 |
| B0DHVWY583 | Kalyan 2 g gold coin | ₹29,660 | ₹32,737 |
| B0H9T73HJ7 | Bosch 302 L fridge | ₹25,990 | ₹37,990 |
| B0B8ZMLRH4 | Haier 602 L side-by-side | ₹52,580 | ₹63,680, ₹3,000 coupon |
| B0GXTVZZWB | Samsung 65" Mini LED TV | ₹58,290 | No price shown, no add-to-cart button |
| CDMG46FZAEVZJ4FF | Deluxe Nirodh | ₹73 | Pack size still unclear ("Set of 5" vs "100 PCS"), so skipped |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-15 / 10-16 / 10-17) | 3 / 4 / 1. Today is not over yet, and the CONTENT-SEO tick is scheduled |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,816 / 13337 |
| Broadcast cursor | 13334. The 3-row gap is this batch; the external cron picks it up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
