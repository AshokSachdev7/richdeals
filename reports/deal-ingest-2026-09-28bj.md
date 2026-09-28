# IFS ingest tick 2026-09-28bj (20:34 IST)

## Discovery
- Fetched 4 listing pages (`/`, `/deals`, `/deals?page=2`, `/deals?page=3`) with a 2.6s gap between requests.
- Found 102 slugs, of which 20 were not seen before.
- Dropped 2 before resolving: the applee charger sale hub and the zibbit detox foot patch.
- Resolved 18 base64 `?rto=` Buy Now links: 14 Amazon ASINs and 4 Flipkart pids. None of the 18 IDs were already in the DB.

## Verification (every price read on the product page)
**Amazon:** checked 14 ASINs in the logged-in tab. 11 passed and 3 were rejected:
- Fila Gariyo and GAMDIAS Athena cabinet: currently unavailable, with no add-to-cart button.
- Aromix soap holder: ₹55 with a minimum order of 2 and no reviews, too low-ticket to list.

Price drift from the IFS card:
- French Connection Seraphina: the card said ₹1,353, but the product page showed ₹1,799. Listed at ₹1,799.
- Washing machine cleaner: card ₹126, page ₹129.
- Die-cast car: card ₹141, page ₹140.

**Flipkart:** checked 4 pids by reading ld+json. All 4 were rejected:
- Motorola edge 70 pro: card ₹39,499, page ₹39,999. Drifted by ₹500.
- Longway geyser: the card said 15L at ₹3,598, but the pid resolves to the 10L model at ₹4,398. The product does not match the card.
- Google 45W GaN charger: only 11% off.
- Google GA10043 charging pad: only 20% off, has 2 ratings, and no `/p/itm` path could be anchored to the pid.

## Push
- `/admin/deals/bulk` returned **count 11, created 11**, all `status:live`. All 11 are Amazon (`tag=ashoksachdev-21`).
- Images come from `m.media-amazon.com` only. The Reebok image ID contains `+`, which is encoded as `%2B` and returns 200.
- The copy is original: a what-it-is line plus a practical tip per deal, drawn only from the product page facts. Minimum-order and low-stock notes are carried into the tips.
- Largest discounts: Zurity co-ord ₹390 (90% off), Tokyo Talkies skirt ₹197 (89%), MPROW LED string ₹99 (83%).
- Largest tickets: 70mai M310 Plus dash cam ₹3,999 (4.3★ from 1,365 ratings), WINTAGE tuxedo blazer ₹2,489.

## Freshness
| Surface | Status |
|---|---|
| IndexNow | **HTTP 200, 14 URLs** (11 slugs + 3) |
| Sitemap | ISR 30 min, picks up the batch automatically |
| llms.txt | force-dynamic, current on every request |
| New deal pages (spot check of 2) | 200 on prod |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,437 (+11) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap. |
| Broadcast cursor | 11773 vs DB max 11784. The gap of 11 is exactly this batch; the external cron will catch up. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
