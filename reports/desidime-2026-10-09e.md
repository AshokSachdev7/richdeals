# DesiDime tick 2026-10-09e (08:46 IST)

**4 pushed LIVE** (`count:4`, all `created:true`). IndexNow HTTP 200 for 7 urls (4 slugs + `/`, `/offers`, `/sitemap.xml`).

Stage 1: 32 discovered, 18 resolved, 3 already in DB, 15 fresh. Amazon checked on the PDP in the logged-in tab (core price block, `#availability` + add-to-cart, rating).

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| Boldfit 1L steel bottle B0FCFC9ZTV | ₹199 | ₹799 | 75% | 3.9 (1,923) |
| CELLBELL C104 mesh visitor chair B0B6CJ55YH | ₹2,999 | ₹9,999 | 70% | 4.0 (686) |
| GADDA CO waterproof mattress protector, single B0B5WVV7N8 | ₹379 | ₹1,199 | 68% | 4.2 (14,417) |
| LEGO Classic 10696 B00NHQFA1I | ₹1,598 | ₹3,199 | 50% | 4.6 (56,825) |

GADDA CO shows an optional clip coupon on top of the ₹379 base price; the how-to says so instead of the usual "no coupon" line.

## Rejected (11)

- **Price drift:** IFB 7kg washer (PDP ₹30,490 vs card ₹24,990), Dell Alienware 15 (₹1,44,240 vs ₹1,03,240, also only 1 rating). Five Flipkart cards were flagged as drift by stage 1: ASUS, OYOBABY, Hindware chimney, Lenovo IdeaPad, Nike Jordan (also bank-offer gated).
- **No price, no add-to-cart:** CELLBELL C104 revolving B08XBGZ4R6, Faber 90cm chimney (also only 5 ratings).
- **Food/FMCG:** Horlicks, DAFFODIL tissue.

## CEO audit (08:46 IST)

| Check | Result |
|---|---|
| Audit counts | `{posts:2,cov:0,seo:0,np:0,ni:0,pend:0,live:12344,max:12861}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 200 200 200 200 200 200 |
| Broadcast cursor | `{"lastId":12857}` (below max 12861 = this batch, not rot) |
| Unpushed commits | 0 before this commit |

Clean.
