# DesiDime ingest — 2026-10-26b (~02:05 IST)

## Stage 1

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped by the JUNK/GROCERY filters, other-store rules or hub URLs (incl. Myntra `/bestpl` category) | 13 |
| Resolved to a product | 20 |
| Already in the DB | 17 |
| Fresh candidates | 3 |

## Pushed LIVE: 0

## Rejected

| Reason | Items |
|--------|-------|
| PDP price drift from the card (the card shows a bank-offer price) | Samsung 330 L Bespoke AI fridge B0G8JT756D: card ₹30,990, PDP ₹39,990 · ASUS Vivobook 15 i3-100U B0H8P1NCMN: card ₹46,490, PDP ₹52,990 |
| No ld+json, not a store product | Epic Games Store "MAFIA HOTEL" free game |

- Both Amazon PDPs were read in the logged-in Playwright tab with no captcha. Both were in stock with add-to-cart present.
- Both ASINs were added to `data/dd-rejected.json` (24 h skip), so the next ticks do not re-read them.

## Freshness

No deals were pushed this tick, so there was nothing to ping.

## CEO audit (01:59 IST, no writes since)

| Check | Result |
|---|---|
| LIVE deals | 14,329 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| DB max id / broadcast cursor | 14860 / 14860 (drained) |
| Posts today (IST) | 1 (post 528). Next CONTENT-SEO run is at 06:39 |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | 7/7 200 |
| Unpushed commits | 0 before this commit |

Nothing rotting. Yield has been low two ticks running: 17 of 20 resolved cards were already in the DB, which is normal for overnight.
