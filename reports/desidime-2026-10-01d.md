# DESIDIME-INGEST — 2026-10-01d (06:44 IST)

**0 pushed of 5 fresh candidates · bulk POST skipped · IndexNow ping skipped (nothing to ping)**

## Funnel
23 cards discovered. 16 were dropped as junk or not a product. 7 resolved to a product, 2 of which were already in the DB, which left 5 fresh candidates.

## Rejected (all 5)
| Store | ID | Card price | PDP check | Why rejected |
|---|---|---|---|---|
| Amazon | B0GW2MP53S Nayasa 700 ml bottle | ₹126 | ₹126, MRP ₹319, in stock | Only 2 ratings, under the 0-7 floor |
| Amazon | B00JKCHNQS Transcend JetDrive 500 240 GB | ₹5,049 | ₹5,409 | Price drift of ₹360; "Only 2 left"; the card price depended on account-specific rewards |
| Amazon | B0F7XBC3J6 Sony BRAVIA 55" K-55S25M2 | ₹52,740 | no buy box, no add-to-cart | Not purchasable, price unverifiable |
| Flipkart | MATGAESAHYSFFHH5 varsha tex floor mat ×5 | ₹99 | ld+json ₹147, InStock, 3.5★ | Price drift of ₹48, and a rating of ≤3.5 |
| Jio | JioBharat 4G phone | ₹299 (from title) | `jio.com/jcms/jiobharat/` landing page, no ld+json | Not a single product page; card-only price |

## CEO audit
- Prod 7/7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`
- DB: LIVE 11,721 · EXPIRED 388 · PENDING_REVIEW 0 · null price 0 · null image 0 · max id 12,197
- Posts: 353 · coverless 0 · seo-less 0 · posts per IST day: 09-30 4, 10-01 2 (under the cap of 4)
- Broadcast cursor 12197 = DB max
- Unpushed commits: 0 before this report
