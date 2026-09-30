# DESIDIME-INGEST — 2026-10-01b (02:44 IST)

**Pushed 0 · no bulk POST · IndexNow skipped (nothing new to ping)**

## Funnel
31 cards discovered → 19 junk/app/other dropped → 6 product-resolved → 2 already in DB → 4 fresh → **0 pushed**

## Rejected (4)
| ID | Deal | Card price | PDP | Reason |
|---|---|---|---|---|
| B0F7XBC3J6 | Sony BRAVIA 2M2 55" 4K TV K-55S25M2 | ₹52,740 | ₹63,990 shown, "Currently unavailable" | No add-to-cart; the card price was off by ₹11,250 as well |
| B085P17XND | WD 5TB My Passport HDD | ₹15,899 (title) | no price, no add-to-cart | Out of stock |
| 0811022e1472 | JioBharat 4G phone ₹299 | — | no ld+json | Offer page, not a product page |
| MATGAESAHYSFFHH5 | varsha tex cotton floor mat, pack of 5 (Flipkart) | ₹99 | drift | Price drift > ₹1 |

## CEO audit
- Prod 7/7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`
- DB: LIVE 11,720 · EXPIRED 388 · max id 12,196 · null price 0 · null image 0 · PENDING_REVIEW 0
- Posts: 352 · coverless 0 · seo-less 0 · IST/day 09-28 4, 09-29 4, 09-30 4, 10-01 1 (the IST day is under 3 h old, and the BLOG cron has the rest of it)
- Broadcast cursor 12196 = DB max (it caught up on the Wonderchef row from the 10-01b IFS tick)
- Unpushed commits: 0 before this report
