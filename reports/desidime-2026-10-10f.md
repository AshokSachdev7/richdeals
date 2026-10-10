# DesiDime tick 2026-10-10f (10:47 IST)

**Result:** 1 deal pushed (count 1, created true). IndexNow returned **HTTP 200** for 4 URLs. The new deal page returns 200 on prod.

## Stage 1

36 cards found. 21 resolved to a single product, 4 were already in the DB, and 17 were fresh candidates.

## Pushed

| Deal | ASIN | Price / M.R.P. | Rating | Slug |
|---|---|---|---|---|
| Duracell Ultra alkaline AA batteries, pack of 6 | B012AU6PWY | ₹120 / ₹330, 64% off | 4.5 stars, 42,061 ratings | `duracell-ultra-alkaline-aa-batteries-pack-of-6-b012au6pwy` (id 12898) |

## Rejected (16)

| Item | Reason |
|---|---|
| Arto 7-in-1 cleaner kit | Price matches (₹249), but the listing has no ratings |
| Aristocrat Comet trolley set of 3 | Price drift: card ₹3,016 vs PDP ₹3,798 |
| EVM 512GB SATA SSD | Price drift: title ₹4,540 vs PDP ₹5,599 |
| Springwel OrthoAlign mattress | Only 3 ratings |
| Barbie Sisters Pop Star playset | No add-to-cart (unavailable) |
| Consistent 256GB NVMe | No add-to-cart, rated 3.5 |
| Xiaomi 43" FX Pro | Price drift: card ₹19,337 vs PDP ₹26,999 (repeat) |
| Voltas 1.5 T AC | Price drift: card ₹28,240 vs PDP ₹30,990 |
| boAt Aavante Prime 5.1 | Price drift: card ₹7,550 vs PDP ₹9,499 |
| Hero Xtreme 160R | Booking listing, not a product price |
| Origami tissues | Repeat, low-ticket FMCG |
| Pantene shampoo (JioMart) | No ld+json, FMCG / health |
| Flipkart: Logi/Lenovo mouse, Galaxy Book4 Edge, BenQ GW2490P, Motorola Edge 70 Fusion | Price drift in ld+json |

## CEO audit (10:47 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 1. CONTENT-SEO runs at 12:09 and 18:09 IST. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,381 |
| Broadcast cursor | 12897 vs DB max 12898. The external tg-broadcast cron catches up after a push; this is not rot. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
| Session crons | telegram-deal-monitor, deal-ingest IFS and AI-OVERVIEW are still missing. The owner can say "restore all crons" to bring them back. |
