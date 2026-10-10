# DesiDime tick 2026-10-11a (00:47 IST)

Stage 1: 31 discovered, 15 product-resolved, 3 already in DB, 12 fresh.

## Pushed: 1 (count 1, created)

| Store | ID | Item | Price | M.R.P. | Rating |
|---|---|---|---|---|---|
| Myntra (InRDeals) | 34779834 | Head & Shoulders Smooth and Silky shampoo 1.2L | ₹477 | ₹1,592 (70% off) | 4.6★ (520) |

- Verified from the ld+json: price 477, availability InStock, Myntra `"mrp":1592`.
- Prod page returns 200.
- IndexNow returned HTTP 200 for 4 URLs.

## Rejected (11)

All 7 Amazon candidates were checked on the PDP in the logged-in tab. All 7 show drift: the card price was the bank-card/coupon price.

| ASIN | Item | Card | PDP |
|---|---|---|---|
| B0H3Q5DPP9 | OnePlus Nord Buds 4 | ₹2,434 | ₹2,899 |
| B0FQHXM2DX | Frontech 15.6" portable monitor | ₹5,674 | ₹6,304 |
| B07XM5SHHH | Himalaya baby wash 400ml | ₹250 | ₹316 |
| B00VK5MCMI | Pigeon 3L pressure cooker | ₹552 | ₹649 |
| B0GG4W7N66 | Pebble Qore 2 band | ₹2,250 | ₹2,999 (also 3.7★) |
| B0FPFS63HL | TONZO AKEY6 projector | ₹19,949 | ₹26,699 (also 0 ratings) |
| B0H2BR2F24 | Xiaomi 65" FX QD-Mini LED | ₹46,012 | ₹53,999 |

Other:
- boAt Airdopes Prime Supreme (Flipkart): drift.
- Pigeon thermoflask (Instamart): drift.
- Yu coconut water (Zepto): no ld+json, and it is food.
- Bay leaf (Digihaat): no ld+json, and it is food.

## CEO audit
- 1 post today (IST), 0 coverless, 0 seo-less.
- 0 null-price, 0 null-image, 0 PENDING_REVIEW.
- 12,395 live deals; max id 12912 vs broadcast cursor 12911. The 1-deal lag is this push waiting for the external broadcast cron, which catches up on its own.
- All 7 prod endpoints return 200.
- 0 unpushed commits before this report.
