# DESIDIME-INGEST — 2026-10-01a (00:46 IST)

**Pushed 1 / count 1 (created:true) · IndexNow HTTP 200 (4 urls = 1 + 3)**

## Funnel
33 cards discovered → 19 junk/app/promo dropped (Instamart app, Meesho code, Nike promo, Hubble app, …) → 10 product-resolved → 5 already in DB → 5 fresh → **1 pushed**

## Pushed (live, Flipkart `affid=djhackraj`)
| ID | Deal | PDP price | MRP | Off | Rating | Note |
|---|---|---|---|---|---|---|
| FLTFTJZ93NRYHKCE | Lacto Calamine makeup remover wipes (75) | ₹113 | ₹450 | 75% | 4.4 (25,474) | ld+json price exact, InStock; image rukmini1.flixcart.com |

## Rejected (4)
- WD 5TB My Passport B085P17XND: no price, no add-to-cart, and #availability is empty on the PDP
- AXE deodorant 645 ml ×3 (Flipkart): price drift
- JioBharat phone: no ld+json; the offer is not a product page
- varsha tex floor mat (Flipkart): price drift (the same mat was rejected in 09-30x)

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- DB: LIVE 11,719 · EXPIRED 388 · max id 12,195 · LIVE null price 0 · LIVE null image 0 · PENDING_REVIEW 0
- Posts: 352 total · coverless 0 · seo-less 0. IST/day: 09-28 4, 09-29 4, 09-30 4, 10-01 1 (the day is 46 min old; the BLOG cron `9 */6` covers the rest)
- Broadcast cursor 12194 vs max 12195: the one-row gap is this push; the external tg-broadcast run picks it up (self-heals)
- Unpushed commits: 0 before this report
