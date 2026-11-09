# SCHEMA-AUDIT tick 2026-11-10 (IST ~04:47)

**Result: 30 URLs, all HTTP 200. 29 PASS, 1 FAIL. PRIORITY: #12508 FRONTECH HDMI has a stale Offer. Its last priceHistory row is 36 days old, so the Offer carries no priceValidUntil.**

## What was checked

- **Product + Offer**:
  - The Offer price matches the visible price and the DB price.
  - `priceCurrency` is INR.
  - `priceValidUntil` is present and in the future. It is the last priceHistory row + 14d.
  - `availability` is InStock for LIVE rows and Discontinued for EXPIRED rows.
- **BreadcrumbList** is present on every deal, hub and post page.
- **FAQPage**: the Q&A count matches the visible FAQ `<section>`.
- **Article** is present on posts, with BreadcrumbList and FAQ.
- Sample:
  - 5 hubs.
  - 8 GSC top deal pages.
  - The 7 newest deals.
  - 6 rows price-synced or re-confirmed this cycle.
  - The 4 newest posts.

## Results

| Group | URLs | PASS | FAIL | Notes |
|---|---|---|---|---|
| Hubs | 5 | 5 | 0 | `/` has Organization, WebSite and ItemList. `/offers` and `/blog` have CollectionPage and BreadcrumbList. `/stores/amazon` has a 9-question FAQ. `/category/shopping-category/appliances` has a 4-question FAQ. |
| GSC top deals | 8 | 8 | 0 | All 8 have 5 blocks: Organization, WebSite, Product, BreadcrumbList and FAQPage. Discontinued: #4142 (EXPIRED, ₹759) and #2440 (EXPIRED, ₹1,999). LIVE: #2321 ₹220 (12d), #3593 ₹479 (9d, until 11-14), #3492 ₹299 (11d), #4188 ₹1,709 (11d), #3498 ₹4,299 (11d), #3506 ₹249 (11d). |
| Newest deals | 7 | 7 | 0 | #16227 to #16233. All have lastPH 0d and are valid until 11-23. |
| Synced / re-confirmed rows | 6 | 5 | 1 | PASS: #7022 ₹108, #9063 ₹2,999, #9916 ₹79,990, #15258 ₹35,990, #16226 ₹79. FAIL: #12508. |
| Newest posts | 4 | 4 | 0 | Each has Article, BreadcrumbList and a 5-question FAQ. |
| **Total** | **30** | **29** | **1** | |

The 4 newest posts:
- `quartz-vs-automatic-vs-solar-watch-which-to-buy-india`
- `air-fryer-food-not-crispy-causes-fixes`
- `cat6-vs-cat5e-vs-cat7-lan-cable-which-to-buy-india`
- `washing-machine-shaking-fix-stand-anti-vibration-pads`

## PRIORITY: stale Offer price

| id | Deal | DB price | Offer price | lastPH | Age | priceValidUntil |
|---|---|---|---|---|---|---|
| 12508 | FRONTECH HDMI 1.5m (B0CRL6SXTQ), `/frontech-hdmi-cable-1-5-metre-copper-clad-steel-for-tv-monitor-and-co` | ₹69 | ₹69 | 2026-10-04 | 36d | **missing** |

- The price itself is correct. The DB, the Offer and the visible copy all show ₹69, and DesiDime 10a and 10b both re-confirmed ₹69 on the PDP.
- The problem is the date. Both re-confirmations found the price unchanged, so no priceHistory row was written, and `priceValidUntil` (last PH + 14d) lapsed on 10-18. Google sees an Offer with no validity date, which is a merchant-listing demotion risk.
- **Root cause, across sources:** a same-price confirmation never writes a PH row. Any LIVE deal that is re-verified but not re-priced goes stale the same way.
- **Fix to apply (not done, this tick is report only):** write a priceHistory row on every verified confirmation, including same-price ones, in the desidime, TG and IFS dup-sync paths. #12508 will refresh on its next re-confirmation once that is in place.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,667 = 15,667 |
| Max deal id vs broadcast cursor | 16,233 = 16,233 |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 present, none recreated |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- The IFS dup-row price-sync does not write priceHistory.
- **NEW:** same-price dup confirmations write no PH row, so the Offer goes stale (#12508).
- TG 11-04l backlog still unchecked: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- TG items still pending: MILTON tiffin, TIED RIBBONS toran.
- Price drift:
  - #11896: Flipkart ₹664 vs DB ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
- The DO API token still needs rotating (owner action).

Closed this tick:
- The SCHEMA 11-08 report item. That run passed 31/31 and is superseded by this report.
- The Sounce mouse pad item. #16226 is LIVE and passed schema.
