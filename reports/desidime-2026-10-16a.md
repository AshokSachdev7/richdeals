# DESIDIME 2026-10-16a (00:33 IST)

**1 new deal pushed (bulk `count:1`, created). IndexNow HTTP 200 for 4 URLs.**

## Stage 1

`ingest-desidime.mjs` read the listing cards on `/new` and the homepage.

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Resolved to a single product | 13 |
| Already in the live DB | 0 |
| Dropped by the script | 6 non-Amazon rows: JioMart ×2 (no ld+json), Flipkart Bosch dryer + HP laptop (price drift), Myntra boAt 551 (price drift), Instamart Cello (out of stock) |
| Amazon candidates | 7, checked in the logged-in Playwright tab (in-tab PDP fetch) |

## Pushed (1)

| ID | Deal | Price | MRP | Verification | Prod |
|---|---|---|---|---|---|
| 13108 | Milton Prudent 350 Thermosteel bottle, 360 ml (B0F1T79B57) | ₹399 | ₹830 (52%) | `priceAmount` ₹399 = card price; PDP shows MRP ₹830; In stock + add-to-cart; no coupon | 200 in 0.26s |

- **Affiliate:** Amazon `tag=ashoksachdev-21`.
- **Image:** the `Aqua Green 360 ml` hiRes, keyed by `landingAsinColor`.
- **Copy:** an original rewrite, following the GEO playbook.

## Rejected (6 Amazon)

| Item | Card | PDP now | Reason |
|---|---|---|---|
| MMTC PAMP Lakshmi 2g gold pendant | ₹29,479 | ₹32,480 | Price drift |
| Kalyan Ayodhya 2g gold coin | ₹29,660 | ₹32,590 | Price drift |
| Muthoot Ganesha 2g gold pendant | ₹29,180 | ₹32,280 | Price drift |
| Philips 75" 8100 QLED TV | ₹65,249 | ₹69,999 | Price drift |
| Samsung 65" Mini LED TV | ₹58,290 | no price, no add-to-cart | Can't verify the price |
| Hero bikes/scooters | ₹79,982 | n/a | The price needs an SBI card offer |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-16) | 0 at 00:33. The IST day is 33 minutes old, so this is not rot. The CONTENT-SEO cron came due at 00:09 while the session was busy and should run next. The next SITEMON tick checks that it landed. |
| Posts with no cover / no SEO / deals with null price / null image / pending | 0 / 0 / 0 / 0 / 0 |
| LIVE deals / DB max id | 12,591 / 13108 |
| Broadcast cursor | 13107 vs max 13108. The gap is this push; the external broadcast cron picks it up. |
| Prod endpoints (6) | all 200 in 0.11–0.59s |
| Session crons | 9 of 9 running. This matches the roster. |
| Unpushed commits | 0 before this report |
