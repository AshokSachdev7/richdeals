# DESIDIME 2026-10-15e (22:32 IST)

**2 new deals pushed (bulk `count:2`, both created). IndexNow HTTP 200 for 5 URLs.**

## Stage 1

`ingest-desidime.mjs` read the listing cards on `/new` and the homepage.

| Step | Count |
|---|---|
| Cards discovered | 33 |
| Dropped as junk, grocery or another store's page | 16 |
| Resolved to a single product | 16 |
| Already in the live DB | 2 |
| Fresh candidates | 14 |
| Dropped by the script (price drift or out of stock) | 5 |

How prices were checked:
- **Amazon:** in-tab PDP fetch in the logged-in Playwright tab (`priceAmount`, `#availability`, add-to-cart).
- **Flipkart:** ld+json, re-read in-tab.

## Pushed (2)

| ID | Deal | Price | MRP | Verification | Prod |
|---|---|---|---|---|---|
| CNRFPNR7MFKQ43KV | Cetaphil Gentle Skin Cleanser 118ml (Flipkart, `affid=djhackraj`) | ₹275 | ₹459 (40%) | ld+json ₹275, InStock, rated 4.3 from 16,326 reviews | 200 in 0.23s |
| B0GTHHDKWF | Arto transparent storage rack with drainage (Amazon, `tag=ashoksachdev-21`) | ₹359 | ₹999 (64%) | `priceAmount` ₹359, in stock + add-to-cart | 200 in 0.44s |

- **Titles and descriptions:** original rewrites.
- **Images:** marketplace CDN.

## Rejected

| Item | Reason |
|---|---|
| Lenovo Legion 24-10 monitor (B0FX9MY8QT) | Price drift: card ₹6,888, PDP ₹8,999 |
| Extendable roller base (B0HK3XL66F) | Price drift: card ₹349, PDP ₹699 |
| Xiaomi 43" Smartchoice X TV (B0F6ZLFNVT) | Price drift: card ₹21,749, PDP ₹24,999 (the card price likely needs a bank offer) |
| Livpure CurvX mattress (B0B51Y8G55), Xiaomi 17 (B0GMQWZ6ZM), ASUS Vivobook 15 (B0H8P895HL) | No buy-box price on the PDP, so the price can't be verified. The mattress also has no add-to-cart button. |
| Vedantu BITSAT test series ₹1 (B0GYQ2KQBQ) | Digital course at ₹1. Not a product deal. |
| BOSCH tumble dryer, acerpure 85" TV, Havells steam iron, Myntra OnePlus Nord Buds 4 | Price drift, caught by the script |
| Royal Enfield Quest helmet | Out of stock |
| acerpure 100" TV, plus 16 junk, grocery or other-store cards | Category page, or dropped by the JUNK/GROCERY filters |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-15) | 3 (cap 4). The rule is met. |
| Posts with no cover / no SEO / deals with null price / null image / pending | 0 / 0 / 0 / 0 / 0 |
| LIVE deals / DB max id | 12,579 / 13096 |
| Broadcast cursor | 13094 vs max 13096. The gap is this batch; the external cron will pick it up. |
| Prod endpoints (6) | all 200 in 0.10–0.61s |
| Session crons | 9 of 9 running. This matches the roster. |
| Unpushed commits | 0 before this report |
