# DESIDIME-INGEST — 2026-10-01c (04:45 IST)

**Pushed 1 / count 1 (created:true) · IndexNow HTTP 200 (4 urls = 1 + 3) · page 200**

## Funnel
25 cards discovered → 16 junk/other dropped → 9 product-resolved → 2 already in DB → 7 fresh → **1 pushed**

## Pushed (live, Amazon `?tag=ashoksachdev-21`)
| ASIN | Deal | PDP price | MRP | Off | Rating | Note |
|---|---|---|---|---|---|---|
| B09ZLSMXK5 | LaCie Mobile Drive Secure 4TB portable HDD (STLR4000400) | ₹22,649 | ₹51,999 | 56% | 4.5 (516) | card price matched the PDP exactly, In stock, add-to-cart present |

## Rejected (6)
- Nayasa 700 ml trekking bottle B0GW2MP53S: 2 ratings
- Transcend JetDrive 500 240 GB B00JKCHNQS: only 2 left, and the card price was "rewards, account specific"
- Sony BRAVIA 2M2 55" B0F7XBC3J6: currently unavailable, no buybox
- WD 5TB My Passport B085P17XND: no featured offer or add-to-cart ("price higher than typical")
- JioBharat 4G phone: no ld+json, not a product page
- varsha tex floor mat (Flipkart): price drift

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- DB: LIVE 11,721 · EXPIRED 388 · PENDING_REVIEW 0 · null price 0 · null image 0 · max id 12,197
- Posts: 352 · coverless 0 · seo-less 0 · IST/day 09-28 4, 09-29 4, 09-30 4, 10-01 1 so far (04:45; BLOG cron has the day)
- Broadcast cursor 12196 vs max 12197. The one row is this LaCie push; the next external tg-broadcast run picks it up (self-heals, not rot).
- Unpushed commits: 0 before this report
