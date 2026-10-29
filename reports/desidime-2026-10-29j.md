# DESIDIME-INGEST: 2026-10-29j (~18:29 IST)

**Result: 3 new deals pushed LIVE (#15468-15470, all Flipkart air fryers). 2 dup LIVE rows were price-synced to the PDP (#5442 ₹14,990 → ₹14,490, #13559 ₹201 → ₹184 with a title fix). 6 Amazon candidates were rejected for card-to-PDP drift. IndexNow returned 200 for 8 URLs. CEO audit clean.**

Playwright was still hung, so the Amazon PDPs were read with desktop curl (Chrome UA, `/dp/ASIN?th=1&psc=1`). The checks were `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability`, the MRP and the `#landingImage` hi-res image. Flipkart candidates were verified in stage 1 by `verifyFromHtml` (ld+json price within ±₹1 and InStock).

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage, cards only, no per-deal fetch) | 37 |
| Dropped (JUNK/GROCERY or a non-product link, incl. HIMALAYA Flipkart `/e/p/p`) | 8 |
| Product-resolved via `visit.desidime.com` | 28 |
| Dup (productId already in DB) | 9 (stage-1 log printed only 3, see gap note) |
| Fresh | 19 |
| Already in `dd-rejected.json` or failed stage-1 verify | 10 |
| Flipkart verified ok in stage 1 | 3 |
| Amazon PDP-verified this tick | 6 |
| Pushed | **3** |

## Pushed
| Deal | Flipkart PID | Price | MRP | Off |
|---|---|---|---|---|
| #15468 iBELL AEROFRY422M 4.2 L air fryer, 1500 W | AFRHEH5YCBPEAWDU | ₹2,799 | ₹6,490 | 57% |
| #15469 ULTRON digital air fryer 4.2 L, 1400 W | AFRHQHYCAKKP5AYH | ₹2,943 | ₹6,499 | 55% |
| #15470 Inalsa Tasty Fry DW 5.5 L digital air fryer, 1600 W | AFRHFHFPWJNZDWMK | ₹4,739 | ₹12,795 | 63% |

- **Price check:** the stage-1 ld+json price matched the card within ±₹1, and the offer was InStock.
- **Content:** images are `rukmini1.flixcart.com`. Titles and descriptions were rewritten.
- **Affiliate link:** `https://www.flipkart.com<path>/p/itm…?pid=PID&affid=djhackraj`.
- **Prod check:** #15468 and #15470 return 200.

## Dup sync (PDP moved, updated in place, slug untouched, PriceHistory row added)
| Deal | ASIN | DB | PDP | MRP | Off |
|---|---|---|---|---|---|
| #5442 Midea 8 kg washing machine | B0GTMJ2GRY | ₹14,990 | **₹14,490** | ₹26,990 | 44% → 46% |
| #13559 Pigeon Blitz 975 ml bottle | B0DW8SWWHQ | ₹201 | **₹184** | ₹495 | 59% → 63% |

- **#13559 title:** it carried a hand-typed ₹ figure, which was fixed to "at ₹184 (63% Off)" so the title matches the Offer price.
- **#5442:** the title has no ₹, so no title change was needed. The card price of ₹13,041 is a bank-offer price; the Offer uses the PDP price.

**Unchanged:** #3504 boAt Aavante 1550 (Flipkart ACCGZKANSZKPNB5M) stays at ₹4,499; the card says ₹4,364. Flipkart dups get no fresh read while Playwright is hung, so it was left.

**Gap:** the stage-1 log prints only 3 of the 9 dup productIds. The other 6 were not re-verified this tick.

## Rejected (added to `data/dd-rejected.json`, 936 → 942)
| ASIN | Product | Card → PDP |
|---|---|---|
| B0BSRZQWVC | AUSHA VR headset | ₹862 → ₹929 |
| B0FQBT4VNZ | Irusu Play VR Ultra | ₹2,342 → ₹2,879 |
| B0GXYXDZF1 | Samsung 65" Neo QLED | ₹88,465 → ₹94,990 |
| B0GW8PT5TC | LG 276 L fridge | ₹24,740 → ₹30,990 |
| B0F79KFWFL | Polycab Superia 15 L geyser | ₹5,178 → ₹6,003 |
| B0FYFRB2FF | Home Centre Zuby chair | ₹4,701 → ₹6,999 |

**Stage-1 rejects (dd-rejected 928 → 936):** Flipkart MOBHN973UHXUTABD, MOBHQZVXPMTFEJZ9, MOBHQDFAP3AAZUFG, TVSHMX6JSWHPFHHZ, MOBHZ8ZMFWDHVNGD, APFHQFBHVAYMBGZG and TABHZGH3RXZXUZTJ (price drift), ACCGTBZCRCQVPZUS (out of stock).

**Already in `dd-rejected`:** Amazon B0CZTGRS2S (WHP gold), and Dellstore 1d1f4520816f (no ld+json; sitewide offer, not a single product).

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 5 slugs (3 new and 2 synced). It returned **HTTP 200 for 8 URLs**: the 5 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,929 = 14,929; API newest id 15,470 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 445 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 3 |
| Broadcast cursor vs DB max | 15,467 vs 15,470. The gap is this batch, which the external tg-broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung this session, so Flipkart dup rows cannot be re-read.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync. This tick synced 2 more.
