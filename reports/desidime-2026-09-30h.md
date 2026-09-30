# DesiDime ingest — 2026-09-30h

## Pushed
8 deals LIVE (ids 12008–12015). `/admin/deals/bulk` returned count 8, all `created:true`. 7 Amazon (`tag=ashoksachdev-21`), 1 Myntra (InRDeals).

| id | Deal | Price / MRP | Off | Rating |
|---|---|---|---|---|
| 12008 | boAt Airdopes Plus 224 TWS | ₹999 / ₹3,499 | 71% | 3.8★ (7,882) |
| 12009 | boAt Rockerz 255 Pro+ neckband | ₹999 / ₹3,990 | 75% | 4.0★ (2,06,777) |
| 12010 | Zebronics Transformer M Plus mouse | ₹499 / ₹1,299 | 62% | 4.1★ (527) |
| 12011 | Zebronics HAV01 HDMI→VGA adapter | ₹169 / ₹699 | 76% | 3.8★ (7,086) |
| 12012 | Aliensware drawer cutlery organizer | ₹575.77 / ₹1,999 | 71% | 4.4★ (233) |
| 12013 | OnePlus Pad 2 12GB/256GB | ₹31,999 / ₹47,999 | 33% | 4.4★ (852) |
| 12014 | SAF Lord Shiva 3D wall panels (5) | ₹198 / ₹1,399 | 86% | 4.3★ (576) |
| 12015 | Deodap 3-piece garden tool set (Myntra) | ₹29 / ₹249 | 88% | 4.67★ (9) |

- OnePlus Pad 2 went out at the ₹31,999 shelf price, not DesiDime's ₹29,699 bank-card price; the copy says so.
- The Myntra row uses the numeric style id `39885112` as productId, per the DB convention. Stage 1 had emitted a hash id and a `/buy?shared=true` URL.

## Discovery
Stage 1 (`ingest-desidime.mjs`):
- 35 cards discovered.
- 14 dropped as junk or non-product. These included a Flipkart mystery-box page and a CRED Play Store link.
- 19 resolved to products.
- 4 were already in the DB.
- 15 were fresh. BERGNER cookware (Flipkart) was skipped by stage 1 for price drift.

## Rejected (7)
- Mini Steps flash cards B0DWK96LPV: only 1 rating.
- ACwO Twister 313 B0FVY1HPHP: 3.2★ (8 ratings).
- TVS Racing helmet B0DG2QQZVG: price drift, PDP ₹2,394 vs card ₹1,602.
- ARTO 31-in-1 tool kit B0CTQW8C71: only 5 ratings.
- Zebronics 21.5" monitor B0GFD11ZQJ: no add-to-cart and no price.
- Herbal detox foot patches B0GYQDF95C: health claim.
- BERGNER cookware (Flipkart): price drift (stage 1).

## Freshness
- IndexNow: HTTP 200, 11 URLs (8 slugs + 3).
- sitemap.xml is on ISR 1800s and llms.txt is force-dynamic; both pick the batch up from the API.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,643 · PENDING_REVIEW 0 · null price 0 · null image 0 · DB max id 12015.
- **Posts:** coverless 0 · seo-less 0 · 3 posts today (IST 09-30).
- **Broadcast cursor:** lastId 11992. That is behind the DB max because of today's new batches; the external tg-broadcast cron advances it, so this is not rot.
- **Prod:** all 7 endpoints return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`).
- **Unpushed commits before this report:** 0.

## Result
0 rot.
