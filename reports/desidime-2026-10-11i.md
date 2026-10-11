# DESIDIME tick 2026-10-11i (22:16 IST)

4 of 20 fresh candidates were pushed. Stage 1 found 34 cards; 21 resolved to a product page, 1 was already in the DB, leaving 20 fresh. The bulk endpoint returned `count: 4`, all `created: true`.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Babique penguin plush soft toy, 17 cm (B0D3FHJPT3) | Amazon | ₹75 | ₹999 | 92% | 4.2 (1,779) | `tag=ashoksachdev-21` |
| Babique ball rattle soft toy, 10 cm (B08PVYDSX1) | Amazon | ₹89 | ₹699 | 87% | 4.1 (33,788) | `tag=ashoksachdev-21` |
| Crompton Galaxy USB copper fairy lights, 100 LED, 10 m, warm white (B0BD43W4YP) | Amazon | ₹89 | ₹700 | 87% | 4.2 (10,736) | `tag=ashoksachdev-21` |
| Crompton Dyna Ray 9W B22 LED bulb, pack of 2 (B0B6FFHLH9) | Amazon | ₹81 | ₹310 | 74% | 4.0 (5,362) | `tag=ashoksachdev-21` |

All four were checked on the Amazon product page (`#centerCol`): each shows In stock, the add-to-cart button is present, there is no coupon and no "only N left" warning. The bulb's card price was ₹82; the product page shows ₹81, which is within the ±₹1 tolerance, so the live ₹81 was used. Images are the hiRes for the landing colour.

## Rejected (16)

| Deal | Reason |
|---|---|
| TCL 1T AC, Lenovo IdeaPad 3 i3, Midea 28 L oven (Flipkart); Lifelong induction cooktop, Lifelong pedestal fan, Digismart ceiling fan (Myntra) | Price drift, flagged by stage 1's ld+json check |
| HP Omnibook 5 OLED | Price drift: ₹63,740 listed vs ₹78,990 live; only 1 rating |
| HP Victus Ryzen 7 | Price drift: ₹71,740 listed vs ₹87,990 live |
| WHP 2 g 24kt gold coin | Price drift: ₹29,560 listed vs ₹32,560 live |
| Ant Esports Crystal Z2 cabinet | Rated 3.5 |
| IFB 30 L convection microwave | No add-to-cart; ₹15,980 live vs ₹12,990 listed |
| Lenovo ThinkBook 14 | Price drift: ₹60,740 listed vs ₹74,990 live; only 2 ratings |
| Hitachi 1T AC | No add-to-cart (unavailable) |
| Wakefit orthopedic mattress | Price drift: ₹9,237 listed vs ₹11,127 live |
| Acer Aspire One 14 | Price drift: ₹30,990 listed vs ₹38,990 live; rated 3.5 |
| Voltas 1.5T 5-star AC | No add-to-cart, no price |

As in earlier ticks, DesiDime's laptop, AC and appliance prices are bank-card or exchange prices and cannot be verified as list prices.

## IndexNow

HTTP 200 for 7 URLs: the 4 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,410 (12,406 before this push) |
| Broadcast cursor | 12923. DB max is 12927 because of this push; the external broadcast cron picks the new rows up on its next run. |
| Prod endpoints (7) | all 200 in 0.09–1.19s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
