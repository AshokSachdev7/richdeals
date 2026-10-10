# DesiDime tick 2026-10-10k (22:41 IST)

Stage 1: 35 discovered, 21 product-resolved, 8 already in DB, 13 fresh.

## Pushed: 2 (bulk count 2, both created:true, status live)

| ID | Item | Price / M.R.P. | Rating | Verified |
|---|---|---|---|---|
| B09VL787WJ | GADDA CO waterproof mattress protector, king | ₹499 / ₹999 (50%) | 4.2★ (14,452) | Amazon PDP: In stock + add-to-cart |
| IRPHQQX63REKXSRF | VRPRIME rat repellent spray (Flipkart) | ₹129 / ₹999 (87%) | 5.0★ (10) | ld+json ₹129 InStock; M.R.P. from page `mrp` |

IndexNow: HTTP 200, 5 URLs (2 deals + 3 hubs). Prod deal page returns 200.
An unverified "machine-washable" claim was removed from the mattress copy after the push (prisma update).

## Rejected (11)

| ID | Item | Reason |
|---|---|---|
| B0GZL1D89N | HD dual-camera drone | ₹2,250 card vs ₹2,499 PDP |
| B0H2BR2F24 | Xiaomi 65" FX QD-Mini LED | ₹46,012 vs ₹53,999 (bank price) |
| B0HLQGBQ9H | HRX Icon 3-pc suitcase set | ₹3,405 vs ₹3,499; 0 ratings |
| B0HMDK3W7G | Desidiya curtain lights | ₹329 vs ₹339 drift |
| B0GHQVNMKQ | Panasonic 1.5T AC | ₹31,240 vs ₹36,990 (bank price) |
| B0GRV2DWP3 | Daikin 1.5T AC | no add-to-cart (2nd tick) |
| B0F3JKY28G | Xiaomi 43" FX Pro | repeat drift |
| STLGYD4HZ5MNTKKM | Designer D1 shuttlecocks (Flipkart) | ₹248 vs ₹253 |
| WAPHFPRNPNHFFPDN | Aqua Punch Pro RO (Flipkart) | ₹3,699 vs ₹3,989 |
| TMRHYFWEHUMW6RZV | BSC Power Play NXT (Flipkart) | ₹489 vs ₹499 (repeat) |
| 21096f10d70f | Pigeon BLDC fan (Instamart) | no ld+json, unverifiable |

## CEO audit
- 3 posts today (IST), 0 coverless, 0 seo-less.
- 0 null-price, 0 null-image, 0 PENDING_REVIEW.
- 12,394 live deals, max id 12911. Broadcast cursor is 12909; the 2-row gap is this batch, and the external broadcast cron picks it up.
- All 7 prod endpoints return 200.
- 0 unpushed commits before this report.
