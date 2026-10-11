# DesiDime tick 2026-10-11e (08:45 IST)

Stage 1 found 30 deals. 16 resolved to a product page and 2 were already in the DB, which left 14 candidates. 7 of them are new since tick 10-11d.

## Pushed: 1

| Deal | Price | M.R.P. | Rating | Result |
|---|---|---|---|---|
| Spacewood Winner Study Table with book shelf and 3 cabinets, Walnut Rigato (B015INJ9T6) | ₹7,199 (card = product page) | ₹15,253 (53% off) | 3.9★ (2,513) | created, count 1, prod page 200 |

- Stock: in stock and add-to-cart present, with no low-stock warning. Sold by RetailEZ.
- Image: hiRes `61nJ+da6btL`, matched to the listed colour (landingAsinColor = Walnut Rigato).
- Affiliate: `?tag=ashoksachdev-21`.
- IndexNow (slug mode, 4 URLs): **HTTP 200**.

## Rejected (13)

The DesiDime card price was the bank-card or coupon price, not the product-page price.

New this tick:

| Item | Card | Product page | Other |
|---|---|---|---|
| Xiaomi 43" FX Pro QLED (B0F3JKY28G) | ₹19,337 | ₹26,999 | |
| Xiaomi 65" FX QD-Mini LED (B0H2BR2F24) | ₹46,012 | ₹53,999 | |
| Crompton Ozone Royale 55L cooler (B0BSQ4JLB7) | ₹6,129 | no price | no add-to-cart |
| ONIDA 6kg washing machine (Flipkart) | ₹7,641 | ₹11,990 | |
| Philips BT1245 trimmer (Flipkart) | ₹574 | ₹599 | |

Carried over, with product-page prices unchanged:
- Sony INZONE Buds
- Zebronics DDR4
- Sony MHC-V73D
- Sony HT-S100F: no price on the product page
- LG 55" NU87
- APC UPS
- HP Victus
- TONZO projector

## CEO audit
- Posts: 2 today (IST), 0 missing a cover, 0 missing SEO fields. Next CONTENT-SEO run is at 12:09.
- Deals: 0 null price, 0 null image, 0 PENDING_REVIEW.
- Live deals: 12,398. DB max id 12915; broadcast cursor 12914. The gap is this push, and the external tg-broadcast cron picks it up.
- Prod endpoints: all 7 return 200. Slowest is `/blog` at 1.20s.
- Unpushed commits: 0 before this report.
