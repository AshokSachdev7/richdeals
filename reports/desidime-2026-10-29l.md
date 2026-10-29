# DESIDIME-INGEST: 2026-10-29l (~22:35 IST)

**Result: 2 new deals pushed LIVE (#15501 pocket thermal printer, #15502 Vishudh women's dress). 4 dups had PDP = DB, so nothing changed. 5 fresh items rejected (3 HDFC bank-offer card prices, 2 price drifts). IndexNow returned 200 for 5 URLs. CEO audit clean.**

Method: stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal page fetch. It applied the JUNK/GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Playwright is still hung, so Amazon PDPs were read with desktop curl (`/dp/ASIN?th=1&psc=1`): `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability` and the MRP. Dedup was by `productId` against the live DB.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 36 |
| Dropped (junk / grocery / non-product Flipkart `/p/p/item`, other-store) | 7 |
| Resolved to a product | 27 |
| Dup (productId already in DB) | 18 |
| Fresh | 9 |
| Rejected by stage 1 (JioMart with no ld+json, Flipkart multi "starting @") | 2 |
| PDP-verified (Amazon) | 7 |
| Pushed | **2** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15501 Mini Pocket Thermal Printer, Bluetooth inkless label and photo printer, Pink | B0CV9KCQJG | ₹939 | ₹6,999 | 87% |
| #15502 Vishudh Women Casual Everyday Dress | B0FGV6Y6CN | ₹214 | ₹1,549 | 86% |

- **Price check:** both PDP prices matched the card. Add-to-cart was live on both ("Only 1 left" and "Only 5 left").
- **Content:** images are `m.media-amazon.com` (B0CV9KCQJG had no hiRes, so the landing image was used, max 425 px). Titles and descriptions were rewritten. Links use `?tag=ashoksachdev-21`.
- **Slugs:** `/mini-pocket-thermal-printer-bluetooth-inkless-label-and-photo-printer-pink-b0cv9kcqjg` and `/vishudh-women-casual-everyday-dress-b0fgv6y6cn`. Prod returns 200 for both.

## Dups unchanged (PDP = DB)
| Deal | ASIN | DB = PDP | Card |
|---|---|---|---|
| #5336 boAt Aavante Orion Plus | B0FDFRGWLQ | ₹5,299 | ₹4,142 (bank offer) |
| #12942 boAt Aavante Bar Prime B160 | B0HC7C2ZS9 | ₹4,999 | ₹4,500 (bank offer) |
| #5442 Midea 8 kg washing machine | B0GTMJ2GRY | ₹14,490 | ₹13,041 (bank offer) |
| #13559 Pigeon Blitz 975 ml bottle | B0DW8SWWHQ | ₹184 | ₹184 |

The rows keep the PDP listing price. They were not added to `dd-rejected.json`, because they are LIVE and the dup-sync path has to stay open.

## Rejected (`data/dd-rejected.json` 995 → 999)
| ID | Product | Card → PDP | MRP |
|---|---|---|---|
| B09LVFVRYB | TP-Link Deco X50 | ₹6,300 [HDFC CC] → ₹6,999 | ₹13,999 |
| B0F74HJ2J2 | V-Guard Esfera Plus 400 mm BLDC pedestal fan | ₹3,150 [HDFC CC] → ₹3,500 | ₹8,500 |
| B0CB8NWHYH | Impex Smart Fry DS45 4.5 L air fryer | ₹3,060 → ₹3,399 | ₹6,990 |
| B0H8P895HL | ASUS Vivobook 15 (2026) Core 5 120U | ₹55,240 → ₹62,990 | ₹1,59,990 |
| B0GYR9QHXV | ECOVACS Deebot T30e Omni | ₹36,449 [HDFC CC] → ₹44,999 | ₹99,999 |

- B0H8P895HL was already in the file; its timestamp was refreshed, so it does not add to the count.
- Stage 1 added the other 2 new entries: `8f6cd4aa0366` (JioMart, no ld+json) and `SNDHAKRAQEDZYDHG` (Flipkart, multi-variant "starting @").
- This commit also carries the 4 TG 10-29v rejects (989 → 993) that were left out of that tick's commit.

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with the 2 new slugs. It returned **HTTP 200 for 5 URLs**: the 2 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200; both new slugs return 200 |
| API total vs DB LIVE | 14,959 = 14,959; API newest id 15,502 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 446 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap) |
| Broadcast cursor vs DB max | `lastId` 15,500 vs 15,502. The 2-row gap is this batch, which the external tg-broadcast cron will drain |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung this session. Amazon PDPs are read with curl, and Flipkart PDPs cannot be verified.
- reticle MCP failed to connect. It is not used by any tick.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
