# DESIDIME 2026-10-15d (16:33 IST)

**3 new deals pushed (bulk `count:3`, all created). IndexNow HTTP 200 for 6 URLs.**

## Stage 1

`ingest-desidime.mjs` read the listing cards on `/new` and the homepage.

| Step | Count |
|---|---|
| Cards discovered | 32 |
| Dropped as junk, grocery or category pages | 13 |
| Resolved to a single product | 13 |
| Already in the live DB | 1 |
| Fresh candidates | 12 |
| Dropped by the script for price drift | 4 |

How prices were checked:
- **Amazon:** in-tab PDP fetch in the logged-in Playwright tab (`priceAmount`, `#availability`, add-to-cart).
- **Flipkart:** ld+json read in-tab.

## Pushed (3)

| ID | Deal | Price | MRP | Verification | Prod |
|---|---|---|---|---|---|
| ICTGHH6HQYJUZPA7 | Prestige 1600W push-button induction cooktop (Flipkart, `affid=djhackraj`) | ₹1,669 | ₹3,195 (48%) | ld+json ₹1,669, InStock, rated 4.2 | 200 in 0.31s |
| B09X5C9VLK | Lifelong LLMG23 500W mixer grinder, 3 jars (Amazon, `tag=ashoksachdev-21`) | ₹998 | ₹3,500 (71%) | `priceAmount` ₹998, in stock + add-to-cart | — |
| B0GRQXQ7NV | ARTO silicone dish drying mat, 58x43cm (Amazon, `tag=ashoksachdev-21`) | ₹609 | ₹1,299 (53%) | `priceAmount` ₹609, "only 1 left" + add-to-cart | — |

- **Titles and descriptions:** original rewrites.
- **Images:** marketplace CDN (m.media-amazon.com and rukmini1.flixcart.com).

## Rejected

| Item | Reason |
|---|---|
| Samsung Tab S10 Lite (B0FNWRZSC5), ASUS Vivobook 15 (B0H8P895HL), Hitachi 1T 5-star AC (B0GP6S6S5F) | No buy-box price on the PDP, so the price can't be verified |
| WHP 2g 24k gold pendant (B099DTKV1V) | Price drift: card ₹29,469, PDP ₹32,469 |
| WALKENT laptop bag (B0CGXLX59N) | Price matches, but the product is rated 1.7/5 |
| Havells exhaust fan, LG 10kg washer, Myntra OnePlus Nord Buds 4, Lenovo IdeaPad Slim 3 | Price drift, caught by the script's productLd check |
| Amul ice cream, New Balance 40% off, Beyond Appliances, power banks from ₹599, Jio starter pack, AXE (needs supercoins) and others | Junk, grocery or category page |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 (cap 4). The rule is met. |
| Posts with no cover / no SEO / deals with null price / null image / pending | 0 / 0 / 0 / 0 / 0 |
| LIVE deals / DB max id | 12,567 / 13084 |
| Broadcast cursor | 13081 vs max 13084. The gap is this batch; the external cron will pick it up. |
| Prod endpoints (6) | all 200 in 0.12–0.67s |
| Session crons | 9 of 9 running. This matches the roster. |
| Unpushed commits | 0 before this report |
