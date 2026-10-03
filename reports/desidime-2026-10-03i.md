# DESIDIME-INGEST — 2026-10-03i

**Stage 1 found 33 cards. 18 resolved to a product, 4 were already in the DB and 14 were new. 3 passed verification and went LIVE (`count:3`, all created). IndexNow returned HTTP 200 for 6 URLs.**

## Pushed (LIVE, ids 12,465–12,467)

Each one was read on the product page in the logged-in Amazon tab. In every case the price matched the DesiDime card, the stock read "In stock" and the add-to-cart button was present. Images come from the m.media-amazon CDN. The affiliate link carries `?tag=ashoksachdev-21`, and their `desidime01-21` tag was stripped. Each prod page returns HTTP 200.

| Deal | ASIN | Price / M.R.P. | Rating |
|---|---|---|---|
| Frontech 4-port USB 2.0 hub | B0FN86CSWB | ₹209 / ₹800 (74% off) | 3.7★ from 15 |
| Foxin CPU air cooler, 4 heat pipes | B0G58X1Y5J | ₹870 / ₹2,600 (67% off) | 3.9★ from 31 |
| Lakme 9 to 5 Primer + Matte compact | B0744QMCZY | ₹240 / ₹599 (60% off) | 4.0★ from 2,061 |

Payload builder: `apps/api/scripts/push-dd-1003i.mjs`.

## Rejected

| Candidate | Reason |
|---|---|
| AKAI Zest speaker | Price drift (₹998 on the page vs ₹949 on the card); rating 3.4★ |
| AOC C27G4Z monitor | Price drift (₹16,999 vs ₹16,150); the card price needs a bank card |
| Ant Esports Thunder10 | Price drift (₹1,329 vs ₹1,225) |
| Carrera wireless charger | Price drift (₹2,490 vs ₹619); rating 3.1★ |
| GOVO GoSurround 900 | Price drift (₹4,999 vs ₹4,185), same as tick 10-03e |
| IFB 1.5 Ton AC | No buy-box price; the deal is card-only |
| Hero Destini | Vehicle booking, with no availability shown |
| LUKER bulb, Anchara temple | Price in paise (338.75 and 601.81); Anchara also has no ratings |
| playR PBKS sipper | Unavailable; 1 rating |
| Samsung G3 monitor (Flipkart) | Stage 1 flagged price drift |

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,988 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,456 / 12,467. The 11 behind are IFS 10-03i (8) and this batch (3); the external cron sends them on its next run. |
| Unpushed commits | 0 before this report |

No rot found.
