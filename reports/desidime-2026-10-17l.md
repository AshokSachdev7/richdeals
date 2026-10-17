# DESIDIME tick 2026-10-17l (16:34 IST)

**0 deals pushed. All 23 fresh candidates failed price verification: the live price was higher than the DesiDime card on every one. Nothing to ping on IndexNow.**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 35 |
| Resolved through `visit.desidime.com` | 27 |
| Already in the DB (productId match) | 4 |
| Fresh | 23 (16 Amazon, 6 Flipkart, 1 Myntra) |
| Checked on the live product page | 23 |
| Passed | 0 |

## Rejected: Amazon (checked in the logged-in tab)

| ASIN | Item | Card | Product page |
|---|---|---|---|
| B07GR24VN1 | Vedaka prunes | ₹740 | ₹879 |
| B0D9BXT7SQ | Alan Jones tee | ₹289 | ₹304 (2% coupon) |
| B0FBRS76BR | Redmi Pad 2 | ₹13,899 | ₹17,499 |
| B0H9KQSHKK | Acer Iconia | ₹17,749 | ₹19,999 (₹1,000 coupon) |
| B0CSN49Y26 | SGF11 saree | ₹1,003 | ₹1,167 |
| B009CVTPZE | FRONTECH SMPS | ₹519 | No price, no add-to-cart |
| B07Q3FYVLH | Wavex kit | ₹687 | ₹740 |
| B07VJSZYGV | HUGO watch | ₹6,566 | ₹7,295 |
| B0H9S4NG94 | Muthoot pendant | ₹29,165 | ₹32,222 |
| B0DHVWY583 | Kalyan coin | ₹29,660 | ₹32,695 |
| B0HKZW61GK | Aquaguard | ₹5,624 | ₹6,499 (₹250 coupon) |
| B0HD6RG2HR | KENT Grand | ₹9,754 | ₹11,949 |
| B0H2FD3L97 | Lenovo Idea Tab | ₹27,999 | ₹32,999 |
| B0DCK453V1 | AO Smith Z9 | ₹16,488 | ₹21,988 (₹2,000 coupon) |
| B0GLFVTCC7 | Xiaomi 75" TV | ₹58,999 | ₹69,999 |
| B0D6YVDP7M | RENEE palette | ₹149 | ₹425 |
| B0H69FXJC8 | Lenovo LOQ monitor | ₹6,200 | ₹7,999 |

## Rejected: Flipkart (ld+json, all InStock but the price drifted)

| PID | Item | Card | ld+json price |
|---|---|---|---|
| LSKHDQ3A287VDFYG | Lakmé lipstick trio | ₹254 | ₹264 |
| COMHK76HZVGGQDZT | ASUS TUF A14 | ₹1,87,740 | ₹2,19,990 |
| OTYGYYZFYZSH3Z5V | Miss & Chief kick scooter | ₹584 | ₹682 |
| ACCHCJW33SSHZY9H | boAt Rockerz 411 | ₹890 | ₹1,091 |
| WAPHQMAGTMTQMYYC | NATIVE M3 water purifier | ₹16,949 | ₹18,899 |

## Rejected: Myntra

| Style | Item | Card | Product page |
|---|---|---|---|
| 5736f51d5789 | JAGUAR Era EDT 100 ml | ₹1,180 (MRP ₹5,900) | ₹8,900 (MRP ₹8,900, no discount) |

The card prices look like bank-card, coupon or expired lightning prices. No deal was pushed at a price the product page doesn't show.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 3. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,908 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13431 / 13431. No gap |
| Newest deal | 90 min old |
| Prod endpoints (6) | all 200 (0.09–0.78 s) |
| Session crons | 9 of 9, matches the roster (CronList) |
| Unpushed commits | 0 before this report |

No rot found.
