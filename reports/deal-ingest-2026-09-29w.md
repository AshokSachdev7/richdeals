# DEAL-INGEST indiafreestuff tick: 2026-09-29w (16:37 IST)

## Discovery
- Fetched 4 IFS listing pages at ≥2.6 s intervals (all HTTP 200): 96 slugs, **40 new**.
- Dropped 5 before resolving: Fytika ×2 (supplement health claims), HRX track pants ×2 and premium luggage (upto-X%-off hubs).
- Resolved 35 base64 `?rto=` links: 32 Amazon, 1 Flipkart, 2 Myntra. DB dedup by productId: 0 present.

## Verification (every price read on the store page)
- Amazon: logged-in tab, same-origin PDP fetch (`.priceToPay`, savings %, `#availability`, add-to-cart, rating, clip coupon).
- Flipkart: ld+json in a Playwright tab.
- Myntra: `pdpData` via curl.

| Rejected | Reason |
|---|---|
| FCUK B0FTVB1GM5, Gio B07J5NX8NP, kids sandals B0FNRTH15S | only 1 left |
| French Connection FC03LU B0FTV9GVQT | only 2 left |
| 360 organizer B0GZ83D3LV, Creative Arts mirror B0FRN2B6GB, Noble Monk B0D94724J7 | rating 3.0–3.4 |
| Art markers, Babbler gloves, Haneul fan, Fit & Firm dog food | 1–3 ratings |
| Athom towel, DR.RASHEL ×2, Moonlit highlighter, track pants ×2 | no ratings |
| Bata B0G5PNP1FW | drift, card 772 vs PDP 879; 7 ratings |
| Khadi body wash B0FJ6FBTKN | drift, 136 vs 144; no ratings |
| Sage bird toy B07QGK7BN9 | drift, 62 vs 249 |
| Tick & flea combo B0GW2QDXR1 | no price, no cart |
| Himalaya diapers | baby product |
| realme 16x 5G | coupon + Axis card-only price |
| Dove combo (Myntra) | link is a `/c/` collection page, not a product |

**Accepted: 11** (9 Amazon, 1 Flipkart, 1 Myntra), all in stock:
- ASICS running ₹4,949 · ASICS sports ₹3,659 · Lifelong forged ceramic fry pan ₹1,199
- Promate MagGrip holder ₹359 · Lakmé 9to5 kohl ₹329 · Nippon PU foam ₹299
- Lakmé Superglow gloss ₹192 · Santoor hand wash 650 ml ×2 ₹169 · Mamaearth beetroot face wash ₹143
- Bluemix 650 W mixer + iron (FK) ₹1,605 · Bombay Shaving Co Power Play Nxt trimmer (Myntra) ₹599

The Mamaearth card showed ₹138, which is the 3% clip-coupon price; the stored price is the ₹143 on the product page. The Bombay Shaving Co card showed ₹520 (a coupon price); Myntra's product page shows ₹599, which is what is stored.
Copy was written originally from product-page facts only. Images come from m.media-amazon.com, rukmini1.flixcart.com and assets.myntassets.com.
Bluemix has no `/p/itm…` path (canonical is `/p/p/itm`), so it uses the generic `/p/p/itm?pid=…&affid=djhackraj` URL.

## Push
- `/admin/deals/bulk` returned **count 11**, all `created:true`, status live.
- Affiliate: Amazon `?tag=ashoksachdev-21`; Flipkart `?pid=…&affid=djhackraj`; Myntra → InRDeals `inr678975705`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 14 urls (11 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/bombay-shaving-company-power-play-nxt-combat-trimmer-41565155` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,563 = API total (max id 11911) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11900 vs max 11911: this batch is waiting for the external tg-broadcast cron (self-heals) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **11 live, IndexNow 200, 0 rot.**
