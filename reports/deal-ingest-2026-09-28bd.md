# IFS ingest tick 2026-09-28bd (18:39 IST)

## Discovery
- Fetched 4 listing pages (`/`, `/deals`, `/deals?page=2`, `/deals?page=3`) with a 2.6s gap between requests. All returned 200.
- Found 103 slugs, of which 39 were not seen before.
- Dropped 3 before resolving: 2 sale hubs (Protecta "upto 89% off", Snitch "upto 73% off") and 1 perishable (kaju katli).
- Resolved 36 base64 `?rto=` Buy Now links: 27 Amazon ASINs and 9 Flipkart pids. None of the 36 IDs were already in the DB.

## Verification (every price read on the product page)
**Amazon:** checked 27 ASINs in the logged-in tab by reading `#centerCol`, `#availability` and the add-to-cart button. 21 passed and 6 were rejected:
- BENE KLEED jeans and GUESS Jet watch: no buy box and no price.
- BF Simply: an unclear ₹58 item with a 3.0★ rating.
- Mamaearth sunscreen: only 10% off.
- Maped pencils: only 5% off, and 1 left.
- Vaku Luxos orange: a duplicate colour variant of the black one, which was kept.

**Flipkart:** checked 9 pids in the flipkart.com tab, reading price from ld+json and M.R.P. from the ppd block. 7 passed and 2 were rejected:
- Woodland trekking shoes: OutOfStock.
- Zebronics 1610 soundbar: no `/p/itm` path could be found for the pid.

The `/p/itm` paths for the Mietubl screen guard and the drone could not be anchored to the pid in the page data. Each one was confirmed by fetching `path?pid=` directly: both returned 200 with the correct price.

## Push
- `/admin/deals/bulk` returned **count 28, created 28**, all `status:live`: 21 Amazon (`tag=ashoksachdev-21`) and 7 Flipkart (`affid=djhackraj`).
- Images come from `m.media-amazon.com` or `rukmini1.flixcart.com` only. Image IDs containing `+` are encoded as `%2B`; both such URLs returned 200.
- The copy is original: a what-it-is line plus a practical tip per deal, drawn only from the product page facts.
- Largest discounts: figure-8 resistance band ₹99 (88% off), Mietubl S26 Ultra screen guard ₹199 (85%), Tokyo Talkies tee ₹210 (85%), ProArch rain cover ₹179 (82%), Vaku Luxos smartwatch ₹999 (80%).
- Largest tickets: LONGWAY BLDC fan ₹2,899, Nike MC Trainer 3 ₹3,986, Nike Ebernon ₹2,397.

## Freshness
| Surface | Status |
|---|---|
| IndexNow | **HTTP 200, 31 URLs** (28 slugs + 3) |
| Sitemap | ISR 30 min, picks up the batch automatically |
| llms.txt | force-dynamic, current on every request |
| New deal pages (spot check of 2) | 200 on prod |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,423 (+28) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap. |
| Broadcast cursor | 11742 vs DB max 11770. The gap of 28 is exactly this batch; the external cron will catch up. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
