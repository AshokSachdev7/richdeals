# DesiDime tick 2026-10-10i (18:47 IST)

Stage 1: 33 discovered, 22 product-resolved, 5 already in DB, 17 fresh.

## Pushed: 0

Nothing pushed, so there was no IndexNow ping (nothing to ping).

## Rejected (17)

Amazon, checked on the PDP in the logged-in tab:

| ASIN | Item | Card | PDP | Reason |
|---|---|---|---|---|
| B0HCP5YK91 | ASUS TUF F16 | ₹87,840 | ₹99,990 | drift; 1.0★ (1) |
| B0HLZN66D3 | Footloose VIP cabin trolley | ₹899 | ₹899 | 0 ratings |
| B0F3HZP9XR | TCL 75" QD-Mini LED | ₹82,440 | ₹99,990 | drift (bank-offer price) |
| B07P3M2HC8 | Samsung 1.5T AC | ₹27,640 | ₹30,390 | drift; only 2 left; 3.0★ (2) |
| B0HK3BFFKM | HP Omnibook 3 | ₹39,240 | ₹49,990 | drift; 0 ratings |
| B0BZPJQ2X2 | Da URBAN Merlion chair | ₹3,600 | — | no buy box / add-to-cart |
| B09V7WS4PP | JBL Flip 6 | ₹6,929 | ₹7,699 | drift |
| B0D2JCF5SP | Muthoot 24K gold pendant | ₹75,660 | ₹82,160 | drift; only 4 left |
| B0F3JKY28G | Xiaomi 43" FX Pro | ₹19,337 | — | repeat drift (rejected in 10-10h) |

Flipkart: stage 1 flagged these as drift. I re-checked the ld+json in the logged-in browser tab (curl is reCAPTCHA-blocked) and all 5 do have real drift:

| PID | Item | Card | PDP |
|---|---|---|---|
| TVSHM44HM6VHUUFQ | TCL T6D 65" | ₹41,999 | ₹52,999 |
| RFRHJ4JJZVZKXUZZ | Samsung 215L fridge | ₹17,140 | ₹20,890 |
| ACNHHEJQGMEK52HH | Hisense 2T AC | ₹34,190 | ₹36,490 |
| MONHBZZ8UY47RGMN | LG 27" QHD monitor | ₹10,889 | ₹13,899 |
| WAPHNNPHPEW6H47Z | Aquaguard Enrich Glory | ₹7,019 | ₹9,499 |

Other:
- Myntra OnePlus Nord Buds 4: drift.
- Swiggy cardigan: no ld+json.
- Instamart Parle Nutricrunch: food.

Pattern: this sweep is dominated by bank-card/EMI prices posted as the listing price, which the card-only rule rejects.

## CEO audit

- 3 posts today (IST), 0 coverless, 0 seo-less.
- 0 null-price, 0 null-image, 0 PENDING_REVIEW.
- 12,386 live deals, max id 12903 = broadcast cursor 12903.
- All 7 prod endpoints return 200.
- 0 unpushed commits before this report.
