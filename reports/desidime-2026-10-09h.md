# DesiDime tick 2026-10-09h (14:49 IST)

**6 deals pushed** (count 6, all created:true). IndexNow HTTP 200 (9 URLs). Sample deal page on prod returns 200.

Stage 1 found 27 cards. 20 resolved to a single product, 3 were already in the DB, and 17 were fresh. 11 of the 17 were rejected after verification.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| Inefable 4-in-1 earbud cleaning pen (B0B2MQDJ8T) | ₹59 | ₹799 (93% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.0★ / 932 ratings | Amazon `ashoksachdev-21` |
| TIDY SLEEP baby bed with mosquito net (B0F5PVDKXX) | ₹1,299 | ₹2,599 (50% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.3★ / 143 ratings | Amazon |
| GoMechanic Neutron 4500 car vacuum (B08PC1QKL4) | ₹643 | ₹1,799 (64% off) | Amazon PDP: price matches, In stock + add-to-cart, 3.8★ / 3,193 ratings | Amazon |
| Aristocrat Airpro cabin trolley (B0BRMZP2CG) | ₹1,069 | ₹7,500 (86% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.1★ / 10,493 ratings | Amazon |
| LI-NING Smash XP 70 IV racket (RAQG8PDFPBYYDZXG) | ₹399 | ₹1,090 (63% off) | Flipkart ld+json in the browser tab: ₹399, InStock, 4.0★ / 36,539 ratings | Flipkart `djhackraj` |
| OUTLAWS men fleece sweatshirt, black (Myntra 37977690) | ₹341 | ₹2,999 (89% off) | Myntra page: discountedPrice 341, sizes S to XXL available, 4.5★ / 30 ratings | InRDeals |

Stage 1 had flagged drift on the LI-NING racket because curl gets a 403 from Flipkart. The browser read showed the price was correct.

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| JBL Tune Beam 2 (Amazon) | ₹3,929 | ₹4,499 | Price drift |
| Symactive pickleball paddle (Amazon) | ₹1,059 | ₹1,059 | Only 3 ratings |
| j5create 7-in-1 USB-C hub (Amazon) | ₹1,307 | ₹1,419 | Price drift |
| ASUS Zenbook S14 (Amazon) | ₹1,53,590 | ₹1,69,990 | Price drift; no ratings |
| Bergner Tripro 3-piece set (Amazon) | ₹999 | ₹1,799 | Bank-card-only price |
| Lumio Arc 7 projector (Amazon) | ₹28,190 | ₹32,490 | Price drift; no ratings |
| LG 24U631A QHD monitor (Amazon) | ₹9,458 | ₹10,999 | Price drift |
| Green shade net (Amazon) | ₹114 | ₹114 | Rated 3.4★ |
| Samsung Odyssey OLED G9 (Flipkart) | ₹72,751 | ₹79,999 | Price drift |
| Samsung ViewFinity S6 27" (Flipkart) | ₹11,883 | ₹14,999 | Price drift |
| Marshall Monitor III (Reliance Digital) | ₹17,699 | ₹19,999 | Price drift; 0 ratings |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12369,max:12886}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12880. DB max is 12886; the gap is this tick's 6 rows, which the external broadcast cron will pick up on its next run. |
| Unpushed commits | 0 before this commit |

Clean.
