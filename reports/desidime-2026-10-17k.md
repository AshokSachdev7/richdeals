# DESIDIME tick 2026-10-17k (14:34 IST)

**4 deals pushed LIVE (count 4, all created:true). IndexNow HTTP 200 (7 URLs). Spot-checked deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 37 |
| Resolved to a merchant product | 23 |
| Already in the DB (productId match) | 4 |
| Fresh candidates | 19 (13 Amazon, 5 Flipkart, 1 Blinkit) |
| Checked on the product page | 18 (Amazon in the logged-in tab, Flipkart in a Playwright tab via ld+json) |
| Passed verification | 4 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B08QZDWFMC | Cortina stretch office chair cover, beige | ₹149 | ₹789 | Logged-in tab: core price block shows ₹149, M.R.P. ₹789, in stock, add-to-cart present |
| Flipkart | DIAFGYCUEHNGHFTD | Classmate A4 longbook, 240 pages | ₹349 | ₹600 | ld+json ₹349, InStock |
| Flipkart | BAAHNEVZS2Z7GCRF | Lifelong adjustable pull-up bar | ₹379 | ₹1,499 | ld+json ₹379, InStock |
| Flipkart | SMPHAWVZFGEDDQZS | Head & Shoulders Cool Menthol shampoo | ₹465 | ₹1,911 | ld+json ₹465, InStock |

- **Affiliate links:**
  - Amazon uses `?tag=ashoksachdev-21`; DesiDime's `desidime01-21` tag was stripped.
  - Flipkart uses `<itm path>?pid=PID&affid=djhackraj`; `affid=salescueli` and `affExtParam1/2` were stripped.
- **Images:**
  - Amazon: the m.media-amazon.com hiRes for the landing variant (Beige).
  - Flipkart: the ld+json image from rukmini1.flixcart.com.
- **Dedup:** a DB productId check of all 4 passes just before the push returned 0 rows.

## Rejected (card price vs product page)

| ID | Item | Card | Product page |
|---|---|---|---|
| B0FGY6XWNQ | Hero Pleasure+ XTEC | ₹62,045 | ₹80,431 (lower price needs a coupon plus an SBI card) |
| B09T91DDNX | SOLARA bottle | ₹1,194 | ₹1,319 |
| B0GMQVQBH2 | LG 22" monitor | ₹4,700 | ₹5,999 |
| B0H5KSMTHC | Lifelong ride-on jeep | ₹5,238 | ₹5,999 |
| B0H9XHXXD9 | Alienware 15 | ₹1,16,990 | ₹1,41,990 |
| B0GCFSQ4X7 | Midea AC | ₹25,490 | ₹31,490 |
| B0H5C8LRZQ | ASUS Vivobook Go 14 | ₹39,740 | ₹45,990 |
| B0DHVWY583 | Kalyan gold coin | ₹29,660 | ₹32,695 |
| B0H3PV7418 | Lenovo IdeaPad Slim 3 | ₹73,990 | ₹92,990 |
| B0DHS41MPF | BISSELL SpotClean | ₹7,191 | ₹7,990 |
| B0GLPHXR6N | JBL Live 780NC | ₹10,499 | ₹12,999 |
| B08B3L75WX | Acer 23.8" monitor | ₹4,630 | No price, no add-to-cart button |
| ACNHZ7TGCDXGRZTT | LG 1.42 T 5-star AC (Flipkart) | ₹40,990 | ₹45,990 |
| SMWHDA8ANCKKGEY9 | Samsung Galaxy Watch8 40 mm (Flipkart) | ₹18,999 | ₹19,499 |

The Blinkit Pepsi deal (₹9) was also rejected: it is a location-locked grocery item.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST 10-17) | 3. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,889 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13412 / 13408. The 4-row gap is this batch; the external cron is draining it |
| Prod endpoints (6) + 2 new deal pages | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
