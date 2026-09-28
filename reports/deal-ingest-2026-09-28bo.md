# IFS ingest tick 2026-09-28bo (22:38 IST)

## Discovery
- Fetched 4 listing pages (`/`, `/deals`, `/deals?page=2`, `/deals?page=3`) with a 2.6s gap between requests. All returned 200.
- Found 101 slugs, of which 33 were not seen before.
- Dropped 8 before resolving:
  - 1 sale hub (purvaja/milost)
  - 3 min-buy-2 multi-quantity posts
  - 1 FMCG item (Drools fish food)
  - 3 already live from Telegram ticks (Solimo, Boldfit, Mamaearth)
- Resolved 25 base64 `?rto=` Buy Now links: 23 Amazon ASINs, 1 Flipkart pid and 1 Myntra id.

## Verification (every price read on the product page)
**Amazon:** checked 23 ASINs in the logged-in tab. 9 passed and 14 were rejected.

Price on the product page did not match the IFS card (7):

| Item | Page price | Card price |
|---|---|---|
| Nail gun | ₹409 | ₹327 |
| 2 tents | ₹369 | ₹357 |
| Tent | ₹479 | ₹469 |
| Priyana | ₹499 | ₹299 |
| Puma | ₹1,999 | ₹1,085 |
| Sotrue | ₹408 | ₹285 |
| Sotrue | ₹635 | ₹508 |

Rejected for other reasons (7):
- Cricut: ₹15,999 with no discount; the card said ₹13,749.
- Scalp brush: only a thumbnail image, no rating.
- Philips night lamp: only 17% off.
- Saree covers: empty page with no buy box.
- Sigma multimeter: 3.3★ and only 1 left.
- Trendynest: 38% off and only 1 left.

**Flipkart:** 1 of 1 passed. The Kenstar Voltra dry iron reads ₹449 against an M.R.P. of ₹1,990 in ld+json and is InStock.

**Myntra:** 0 of 1 passed. The Spotzero spin mop reads ₹899 in ld+json against ₹751 on the card, so it was rejected.

## Push
- `/admin/deals/bulk` returned **count 10, created 10**, all `status:live`: 9 Amazon (`tag=ashoksachdev-21`) and 1 Flipkart (`affid=djhackraj`).
- Before pushing, checked all 10 product IDs against the DB: 0 were already present, so no slug was overwritten.
- Images come from `m.media-amazon.com` or `rukmini1.flixcart.com` only. All 10 returned 200.
- The copy is original: a what-it-is line plus a practical tip per deal, drawn only from the product page facts.
- Largest discounts:
  - Btag weight scale ₹389 (82% off)
  - kids play tent ₹399 (80%)
  - solar car perfume ₹449 (78%)
  - evil-eye keychain ₹133 (78%)
  - Kenstar iron ₹449 (77%)
- Largest ticket: Zebronics Transformer M Pro wireless mouse at ₹999.

## Freshness
| Surface | Status |
|---|---|
| IndexNow | **HTTP 200, 13 URLs** (10 slugs + 3) |
| Sitemap | ISR 30 min, picks up the batch automatically |
| llms.txt | force-dynamic, current on every request |
| New deal pages (spot check of 2) | 200 on prod |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,451 |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap. |
| Broadcast cursor | 11788 vs DB max 11798. The gap of 10 is exactly this batch; the external cron will catch up. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
