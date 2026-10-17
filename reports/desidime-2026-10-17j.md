# DESIDIME tick 2026-10-17j (12:34 IST)

**2 deals pushed LIVE (count 2, both created:true). IndexNow HTTP 200 (5 URLs). Both deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 36 |
| Resolved to a merchant product | 22 |
| Already in the DB (productId match) | 5 |
| Fresh candidates | 17 (13 Amazon, 1 Myntra, 1 Bigbasket, 1 JioMart, 1 Instamart) |
| Checked on the product page | 14 (13 Amazon in the logged-in tab, Myntra via curl) |
| Passed verification | 2 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0GDPB9HRG | Wooden wall key holder, 8 hooks, 2 phone boxes and a pen stand | ₹74 | ₹789 | Logged-in tab: `#centerCol` ₹74, M.R.P. ₹789, in stock, add-to-cart present |
| Myntra | 17350718 (stored as productId a61db5c81230) | Puma men's cream and orange colour-block sneakers | ₹1,124 | ₹4,499 | Curl of the product page: `discountedPrice` 1124, `mrp` 4499, `available` true |

- **Amazon link:** `?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- **Myntra link:** InRDeals (`inr678975705`), per the Myntra rule. DesiDime's Cuelinks UTM tags were dropped.
- **Images:** Amazon hiRes on m.media-amazon.com (landing variant). Myntra image on assets.myntassets.com.
- **Dedup:** a DB productId check just before the push returned 0 rows.

## Rejected

| Store | ID | Item | Card | Product page |
|---|---|---|---|---|
| Amazon | B09Y6657NV | Samsung 75" QLED | ₹1,18,742 | No price, no add-to-cart button |
| Amazon | B09BQM3FPH | Toshiba 7.5 kg front-load washer | ₹18,990 | No price, no add-to-cart button |
| Amazon | B08THV7ZKD | Faber 3-in-1 chimney | ₹6,831 | No price, no add-to-cart button |
| Amazon | B0DSFHP4H2 | Clazkit steel bottle | ₹129 | ₹170 |
| Amazon | B08N6FY5GG | Preethi Alya 3-burner stove | ₹3,548 | ₹4,173 (a coupon badge is shown, but the gap is unproven) |
| Amazon | B0DHS41MPF | Bissell SpotClean ProHeat | ₹7,191 | ₹7,990 |
| Amazon | B0DHVWY583 | Kalyan 24K gold coin | ₹29,660 | ₹32,695 |
| Amazon | B0GLPHXR6N | JBL Live 780NC | ₹10,499 | ₹12,999 |
| Amazon | B08B3L75WX | Acer SA242Y E monitor | ₹4,630 | ₹5,699 |
| Amazon | B0FFD2YSBY | Acer EK240Y P6 monitor | ₹5,132 | ₹6,225 |
| Amazon | B0D6YVDP7M | RENEE eyeshadow palette | ₹149 | ₹425 |
| Amazon | B0H69FXJC8 | Lenovo LOQ 24-10 monitor | ₹6,200 | ₹7,999 |
| Bigbasket | 40321620 | Lifelong dry iron | ₹279 | Curl returns 403, so the price could not be verified |
| JioMart | — | Dabur toothpaste 400 g | ₹125 | Low-ticket FMCG; the GROCERY rule applies |
| Instamart | — | Sigriwala gas stove | ₹999 | Instamart is location-locked quick commerce |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST 10-17) | 2. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,865 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13387 / 13385. The 2-row gap is this batch; the external cron will drain it |
| Prod endpoints (7) | all 200 (0.11–0.48 s) |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
