# DesiDime tick 2026-10-06a (14:44 IST)

Stage 1: 34 discovered → 18 resolved → 1 already in DB → **17 fresh**.

## Pushed: 3 (`/admin/deals/bulk` count 3, all created:true, status live)

| Deal | Store | Price / M.R.P. | Off | Check |
|---|---|---|---|---|
| Crocs Offroad Sport clog (B0819QZPDW) | Amazon | 2,497 / 4,995 | 50% | PDP #centerCol, 4.2 from 4,220, In stock + add-to-cart |
| malwa printed straight kurta | Shopsy (Cuelinks) | 195 / 999 | 80% | finalPrice = card, 3.8 from 408 |
| HIGHFIELD Guci Flora EDP 50 ml | Shopsy (Cuelinks) | 142 / 1,399 | 90% | finalPrice = card, 4.0 from 806; copy says plainly it is not a Gucci product |

## Rejected: 14

| Deal | Reason |
|---|---|
| Zebronics EA 122 21.5" monitor | no add-to-cart, no buybox price |
| Lavie Sport Banker wallet | PDP 399 vs card 379 |
| Cruise 1.5 Ton 5 Star AC | PDP 35,490 vs card 32,240 (card is post-bank-offer) |
| ASUS TUF A15 | PDP 1,04,990 vs card 93,740; 3 ratings (2nd tick in a row) |
| Bajaj MX 45 iron | 3.4 stars |
| NIVIA mini football | 8% off, not a deal |
| EQTIMA slides | no price data on the page |
| Doobidoo baby diapers, Kindfit adult pants | hygiene |
| Nafed moong ×2, Khetika batter | food |
| Butterfly food processor, MK215 keyboard (Instamart) | quick-commerce, location-locked price |

## Freshness

- IndexNow: **HTTP 200** for 6 URLs (3 slugs + 3 hubs).
- Sitemap: ISR 30 min picks up the slugs.
- llms.txt: dynamic, already carries the batch.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | **0 at 14:44 IST: ROT.** The blog tick queued next ships post 1; the cron needs 2–3 today. |
| Coverless posts | 0 |
| LIVE null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 |
