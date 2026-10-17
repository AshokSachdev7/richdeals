# DESIDIME tick 2026-10-17i (10:33 IST)

**0 deals pushed. All 19 fresh candidates failed price verification, so there was nothing to send to IndexNow.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 36 |
| Resolved to a merchant product | 24 |
| Already in the DB (productId match) | 5 |
| Fresh candidates | 19 (18 Amazon, 1 Flipkart) |
| Checked on the product page | 19 (Amazon in the logged-in tab, Flipkart via ld+json in a Playwright tab) |
| Passed verification | 0 |

## Rejected (card price vs product page)

| Store | ID | Item | Card | Product page |
|---|---|---|---|---|
| Flipkart | COMHR4HGMG3WV4QH | Lenovo LOQ i7 14650HX | ₹122,490 | ₹159,990 |
| Amazon | B0GP6SDT4H | Hitachi 1.5 T inverter AC | ₹34,749 | ₹40,999 |
| Amazon | B0FPCH4TRH | Mivi AI Buds | ₹1,424 | ₹1,499 |
| Amazon | B0H6WVBVQ1 | Lenovo Yoga Slim 7 Aura | ₹116,490 | ₹129,990 |
| Amazon | B0FPRPLVDH | Venus Zylo 3 L geyser | ₹2,162 | ₹2,792 |
| Amazon | B0H4GRR69Q | Tronica Tango Elite 2.1 | ₹1,877 | ₹2,035 |
| Amazon | B08DG2HRJN | Intel i9-10980XE | ₹67,809 | ₹74,809 |
| Amazon | B086MMS6FV | Intel i7-10700KF | ₹23,549 | ₹25,549 |
| Amazon | B0719C132V | Edifier R1280DB | ₹11,540 | ₹12,790 |
| Amazon | B0GHXYQ318 | Cetaphil lotion 59 ml | ₹140 | ₹150 (the coupon amount could not be read, so the card price is not proven) |
| Amazon | B0155JXKPC | R for Rabbit stroller | ₹7,738 | ₹8,597 |
| Amazon | B0FFD2YSBY | Acer EK240Y monitor | ₹5,132 | ₹6,225 |
| Amazon | B0DHVWY583 | Kalyan gold coin | ₹29,660 | No price, no add-to-cart button |
| Amazon | B0H9T73HJ7 | Bosch 302 L fridge | ₹25,990 | ₹37,990 |
| Amazon | B0B8ZMLRH4 | Haier 602 L side-by-side | ₹52,580 | ₹63,680 |
| Amazon | B0GXTVZZWB | Samsung 65" Mini LED | ₹58,290 | No price, no add-to-cart button |
| Amazon | B0D6YVDP7M | RENEE eyeshadow palette | ₹149 | ₹425 |
| Amazon | B0H69FXJC8 | Lenovo LOQ 24" monitor | ₹6,200 | ₹7,999 |
| Amazon | B0HJ5YYV7Q | Laptop sleeve, pack of 2 | ₹215 | ₹449 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST 10-17) | 2. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,839 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13361 / 13361. The broadcast is caught up |
| Prod endpoints (7) | all 200 (0.09–0.60 s) |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
