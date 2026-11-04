# DESIDIME-INGEST 2026-11-04f (~10:38 IST)

**Result: 3 deals pushed LIVE, 1 price sync.** The bulk push returned 201 with count 3, all created:true. #12366 (SKVM bath mat) was synced ₹169 → ₹149. IndexNow returned HTTP 200 for 7 URLs, Bing returned 200 for 7, and all 4 prod pages return 200.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 37 |
| Resolved via visit.desidime.com | 26 |
| Dup (productId already in DB) | 11 |
| Rejected (JUNK/GROCERY/seen in last 24h) | 6 |
| Fresh candidates | 9 |
| Rejected after PDP read (card-vs-PDP drift) | 6 |
| Pushed | **3** |

## Pushed

| Deal | Store | Price | MRP | Verify |
|---|---|---|---|---|
| `/homesake-retro-metal-table-lamp-with-fabric-shade-off-white-b0dqp38pjd` | Amazon | ₹379 | ₹1,600 (-76%) | PDP `.a-price-whole` 379, `#availability` In stock, add-to-cart present, no coupon |
| `/ayus-non-scratch-wire-dish-washing-cloths-b0fjx68kbd` | Amazon | ₹99 | null | PDP 99, In stock, add-to-cart present, no coupon. The PDP lists ₹499 MRP, which implies 80% off, so the ≥80% rule nulled it |
| `/lifelong-automatic-motion-sensor-dustbin-13l-stainless-steel-b0dx6yx7j1` | Amazon | ₹1,671 | null | PDP 1,671, In stock, add-to-cart present, no coupon. The PDP lists ₹8,999 MRP (81% off), so the ≥80% rule nulled it |

- Affiliate: `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- Images: `m.media-amazon.com`.
- Title ₹ = price: asserted before the POST.

## Rejected for drift (PDP ≠ card)

| ASIN / pid | Product | Card | Live |
|---|---|---|---|
| B0GWQC4JGJ | HP 14 laptop | ₹78,940 | ₹85,990 |
| B0H39C1BR4 | Acer Chromebook | ₹16,740 | ₹18,490 |
| B0H1WY1D37 | iQOO Z11 Lite | ₹16,148 | ₹19,497 |
| B0GYX5TFJ5 | Havells Gatik Pro | ₹2,933 | ₹3,449 |
| B0F483SDSY | Green Soul Imperium Pro | ₹15,291 | ₹17,990 |
| ACNHJ9ZG5YRNZRJH | Hisense AC (Flipkart) | ₹29,900 | drifted |

Most of these card prices are likely bank-offer prices.

## Dups: price check

| Product id | Row | DB price | Live | Action |
|---|---|---|---|---|
| B0CQLKSXZL (SKVM bath mat) | #12366 | ₹169 | PDP ₹149, MRP ₹999, In stock + add-to-cart | **synced to ₹149 (85% off)**: title, description and howTo rewritten, priceHistory row added |
| B0FNWNZZ1B (Samsung Tab S10 Lite) | #5197 | ₹30,999 | PDP ₹30,999. The card's ₹28,949 is a bank-offer price | none |
| B00K0AL3PQ (Sony MDR-ZX310AP) | #8856 | ₹799 | PDP ₹799, add-to-cart present | none |
| B0CBQ3Y8HJ (Personal Touch facewash) | #16083 | ₹149 | matches card | none |
| B0D4QRW4H8 (Ant Esports mouse) | #16095 | ₹499 | PDP ₹499 last tick. The card's ₹485 is a coupon gap | none |
| MIXHSJ3HG3FXFZPK | #16122 | ₹800 | matches card | none |
| LTBGU8QBXR5QDJRV | #11896 | ₹899 | card ₹664. Flipkart needs a browser read | **not verified, no change** |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` in slug mode, HTTP 200 for 7 URLs (the 4 slugs plus `/`, `/offers`, `/sitemap.xml`).
- **Bing:** HTTP 200 for 7 URLs.
- **Prod deal pages:** 4/4 return 200.
- **Sitemap:** the deals child is top-100 only by design. The new pages are live and `noindex,follow`.
- **llms.txt:** force-dynamic, so it picks the deals up per request.

## CEO audit (10:38 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,591 / 15,591 | equal (+3) |
| DB max id | 16,155 | ok (+3) |
| PENDING_REVIEW / LIVE null price / LIVE null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:2 | 11-04 meets the rule. 11-01 and 11-02 are past misses |
| Broadcast cursor | lastId 16,152 vs max 16,155 (file re-read) | 3 behind = this tick's deals; the external cron sends them |
| Crons | 9/9: CronList matches the roster | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The 12:32 IST CONTENT-SEO run can add a 3rd post for 11-04.** It is optional and must stay ≤4.
- **#11896 Flipkart card ₹664 vs DB ₹899.** It needs a Playwright PDP read.
- **16 unresolved bare Flipkart links:**
  - With a known itm id: #12919, #12958, #1396, #12771, #15066.
  - Without: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913's description still mentions the HDFC EMI offer.**
- **#6409 is only 7% off.**
- **Reticle MCP is CONNECTION_CLOSED.** Not needed.
- **The DO token needs rotating.** Owner's job.
