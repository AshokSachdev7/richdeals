# DESIDIME-INGEST — 2026-10-01 (≈08:50 IST)

**Pushed 1 / count 1 (created:true) · IndexNow HTTP 200 (4 urls = 1 + 3) · new deal page 200**

## Stage 1 (`ingest-desidime.mjs`)
27 cards discovered, 18 junk/other dropped (incl. Cred app-store link), 8 product-resolved, 1 already in DB, 7 candidates.

## Pushed (live, Amazon `?tag=ashoksachdev-21`)
| ASIN | Deal | PDP price | MRP | Off | Rating |
|---|---|---|---|---|---|
| B0FF4TMML2 | Vivela flat mop, 360° rotating microfiber head, telescopic handle | ₹312 | ₹1,799 | 83% | 3.7 (40) |

## Rejected
- JioExtender JE6000 B0HB5MSVBZ (₹3,319): rating 3.0.
- Nayasa 700 ml bottle B0GW2MP53S (₹126): only 2 ratings.
- Transcend JetDrive 500 240GB B00JKCHNQS: PDP ₹5,409 vs card ₹5,049 (account-specific rewards price), only 2 left.
- Sony BRAVIA 55" K-55S25M2 B0F7XBC3J6 (card ₹52,740): no buy box, no add-to-cart.
- JioBharat 4G phone (jio.com): no ld+json, no verifiable price (script skip).
- varsha tex floor mat pack of 5 (Flipkart): price drift (script skip).

## CEO audit
- Prod 7/7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`
- DB: LIVE 11,725 · EXPIRED 388 · PENDING_REVIEW 0 · null price 0 · null image 0 · max id 12,201
- Posts: 353 · coverless 0 · seo-less 0 · IST/day: 09-29 4, 09-30 4, 10-01 2
- Broadcast cursor 12200 vs DB max 12201: the gap is this push; external tg-broadcast picks it up (self-heals).
- Unpushed commits: 0 before this report
