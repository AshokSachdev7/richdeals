# DESIDIME tick 2026-10-11j (22:10 IST)

**3 of 18 fresh candidates pushed.**

- Stage 1 found 36 cards: 23 resolved to a product page and 5 were already in the DB, leaving 18 fresh.
- The bulk endpoint returned `count: 3`, all `created: true`.
- All 3 deal pages return 200 on prod.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Vega Edge ISI full face helmet (B07FCKZ4KM) | Amazon | ₹678 | ₹998 | 32% | 4.2 (11,292) | `tag=ashoksachdev-21` |
| realme TechLife 100 L 1-star single door fridge (RFRHZJ2ZTD4SG3HG) | Flipkart | ₹9,290 | ₹17,990 | 48% | 4.3 (1,785) | `affid=djhackraj` |
| Tibra Collection men's straight kurta, maroon (KTAGBRWHPNK48JXK) | Flipkart | ₹259 | ₹1,599 | 84% | 4.0 (41,017) | `affid=djhackraj` |

**How each was checked**
- **Vega helmet:** checked on the Amazon product page (`#centerCol`). The price matches exactly, it shows In stock, and the add-to-cart button is present.
- **realme fridge and Tibra kurta:** read from the ld+json in a logged-in Flipkart tab. The price matches exactly, both are InStock, and neither shows an "only N left" warning.

## Rejected (15)

| Deal | Reason |
|---|---|
| Hammer Airflow Plus earbuds (Instamart) | Instamart is location-locked and shows no rating, so the rating can't be checked |
| Black+Decker wet & dry vacuum | Price drift: ₹2,970 listed vs ₹3,299 live |
| Sony Bravia 75", Digismart BLDC fan, Fastway cycle, Parachute lotion, Dr. Morepen glucometer strips (Flipkart) | Price drift, caught by stage 1's ld+json check. The glucometer strips are also a health product. |
| DealZone phone stand (Digihaat) | No ld+json, so the price can't be verified |
| Prestige Iris Plus mixer, 2-pack | Price is only valid with an SBI credit card |
| Hitachi 1T AC | No add-to-cart (unavailable) |
| Aquaguard Delight RO | Price drift: ₹10,799 listed vs ₹11,999 live (bank price) |
| Digimore voice amplifier | Price drift: ₹679 listed vs ₹2,659 live; rated 3.5 |
| Bergner 3 L pressure cooker | Price drift: ₹679 listed vs ₹899 live; rated 3.5 |
| Dove shampoo 1 L | Price drift: ₹455 listed vs ₹479 live (the post said "+cb on cc") |
| Cello Puro bottle | Price drift: ₹232 listed vs ₹258 live |

## IndexNow

HTTP 200 for 6 URLs: the 3 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 4, at the daily cap |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,413 (12,410 before this push) |
| Broadcast cursor | 12927; DB max is now 12930 after this push. The external broadcast cron picks up the new rows on its next run. |
| Prod endpoints (7) | all 200 in 0.10–0.72s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
