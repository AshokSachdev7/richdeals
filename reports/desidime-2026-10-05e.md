# DesiDime tick 2026-10-05e

Stage 1: 33 discovered → 15 resolved → 2 already in DB → **13 fresh**.

## Pushed: 4 (`/admin/deals/bulk` count 4, all created:true, status live)

| Deal | Store | Price / M.R.P. | Off | Check |
|---|---|---|---|---|
| Philips HR2612/00 mini blender, 2 PC jars (B0H4BTVWTB) | Amazon | 2,429 / 3,295 | 26% | PDP #centerCol, 4.0 from 104, In stock + add-to-cart |
| Vihat Fashion kurta, churidar and dupatta set | Shopsy (Cuelinks) | 439 / 1,999 | 78% | page state Total, 3.8 from 1,694 |
| Lyamay Kasavu pure cotton saree | Shopsy (Cuelinks) | 251 / 1,999 | 87% | page state Total, 4.0 from 783 |
| Nirvika copper-bottom handi/urli 5-piece set | Shopsy (Cuelinks) | 676 / 1,299 | 48% | page state Total, 4.1 from 1,220 |

## Rejected: 9

| Deal | Reason |
|---|---|
| Bajaj MX 45 iron | rated 3.4 stars |
| POPWINGS trouser | only 1 rating |
| ASUS TUF A15 | product page 1,04,990 vs card 93,740; only 3 ratings |
| Graco car seat | product page 8,121 vs card 7,716 |
| Mia jacket ×2 | 3.3 stars from 3 ratings; 3.0 stars from 8 ratings |
| Yashoda toran | two different Totals (206 and 174), so the price is ambiguous |
| Rosemary hair spray | health product |
| Cadbury on JioMart | food |

## Freshness

- IndexNow: **HTTP 200** for 7 URLs (the 4 slugs plus 3 hub URLs).
- Sitemap: picks up the new slugs within its 30-minute ISR window.
- llms.txt: rebuilt on every request, so it already carries the batch.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Posts without a cover | 0 |
| Live deals with no price | 0 |
| Live deals with no image | 0 |
| Deals stuck in PENDING_REVIEW | 0 |
| Prod endpoints `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 |

All clean.
