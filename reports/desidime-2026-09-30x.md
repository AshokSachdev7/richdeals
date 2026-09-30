# DESIDIME-INGEST — 2026-09-30x (22:43 IST)

**Pushed 2 / count 2 (both created:true) · IndexNow HTTP 200 (5 urls = 2 + 3)**

## Funnel
31 cards discovered → 13 junk/app/other dropped → 15 product-resolved → 6 already in DB → 9 fresh → **2 pushed**

## Pushed (live, Amazon `?tag=ashoksachdev-21`)
| ID | Deal | PDP price | MRP | Off | Rating | Note |
|---|---|---|---|---|---|---|
| B0FDL2PRQQ | Toshiba 65" 4K QLED TV 65M450RP | ₹62,990 | ₹80,999 | 22% | 4.1 (97) | ₹10,000 clip coupon mentioned; card's ₹48,240 was bank-card-only, not used |
| B0CJM366ST | HP KM200 wireless keyboard + mouse | ₹815 | ₹1,999 | 59% | 3.7 (818) | PDP ₹28 below card price |

## Rejected (7)
- Bata loafer B0F8BF8CCS — rating 3.4, 6 ratings
- French Connection watch B09M6CQWV4 — rating 3.4, no add-to-cart
- Inefable earphone pouch B09PZYGSXB — no add-to-cart
- Casio MTP-VD01D B0DPX6XX4J — no add-to-cart
- Warmfinity heating pad B0CM1HG8DR — health (pain relief)
- JioBharat phone — no ld+json, offer not a product page
- varsha tex floor mat (Flipkart) — price drift

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`)
- DB: LIVE 11,711 · EXPIRED 387 · max id 12,186 · null price 0 · null image 0 · PENDING_REVIEW 0
- Posts: coverless 0 · seo-less 0 · IST/day 09-28:4, 09-29:4, 09-30:4
- Broadcast cursor 12176 vs max 12186 — the 10 rows are this evening's fresh pushes; the external tg-broadcast cron catches up on its next run (self-heals, not rot)
- Unpushed commits: 0 before this report
