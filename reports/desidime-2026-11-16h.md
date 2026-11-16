# DESIDIME-INGEST tick — 2026-11-16h

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified on the PDP in the logged-in Playwright tab, and non-Amazon candidates through `productLd()` (±₹1, InStock). Run at about 22:15–22:45 IST.

**Result: 2 deals pushed LIVE (#16716, #16717), `count:2`, both `created:true`. One dup re-check fixed a stale price on LIVE #10992. IndexNow HTTP 200 for 6 URLs, and all three pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Dropped by JUNK/GROCERY filters | 21 |
| Resolved to a merchant URL | 14 |
| Dup of a LIVE row (productId) | 3 |
| Rejected in the last 24h | 5 |
| Fresh candidates | 6 |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16716 | Amazon | Alan Jones Men's Striped Cotton Polo T-Shirt, Regular Fit (B0GWV1G9H9) | ₹398 | ₹1,699 | 77% |
| 16717 | Flipkart | Realspeed RS-M128 128GB USB 3.0 Metal Pen Drive (ACCHS8BVDWPMF9GD) | ₹426 | null | — |

Notes:
- **Polo:** in stock with the add-to-cart button present (Rust, size L). Copy states that the price varies by colour and size.
- **Pen drive:** ld+json ₹426, InStock. The listed M.R.P. of ₹2,999 implies 86% off, so it was nulled per the ≥80% rule. Copy notes USB-A (OTG adapter needed for phones), that USB 3.0 speed needs a USB 3.0 port, and that buyers should verify the capacity on first use since it is a lesser-known brand.
- **Pre-flight check:** caught a leftover "₹2,999" sentence in the pen drive copy after the M.R.P. was nulled; the sentence was removed before the push.
- **Images:** `m.media-amazon.com` hiRes and `rukminim2.flixcart.com` (200).
- **Affiliate links:** Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=ACCHS8BVDWPMF9GD&affid=djhackraj`.
- **Push target:** local API (`localhost:4000`).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 10992 | SHARP EM-S34N-W 300W Stand Mixer (B0B7GCYJN1) | ₹2,599 / ₹13,200 (80%) | ₹2,479, in stock | `prisma.deal.update`: price 2479; M.R.P. and discountPct nulled (₹2,479 vs ₹13,200 = 81%, over the ≥80% rule). Title and description rewritten to ₹2,479 with no M.R.P. or percentage. Slug kept. |
| 15663 | FRONTECH (B0C5RX48VG) | ₹2,475 | No buy box ("See All Buying Options", no add-to-cart on desktop or mobile) | None; card ₹2,648 unverifiable. Added to the watch list. |
| 16666 | GM Balin (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | ₹5,499 / ₹12,490, in stock | None. The card's ₹4,948 is a bank-offer price. |

## Rejected / skipped

- **B0015GTHNE, Lay's STAX ₹99:** low-ticket FMCG.
- **Ajio belt ₹200:** no ld+json, price unverifiable.
- **Woohoo/Unipin voucher sale:** not a product.
- **Instamart Boroplus:** grocery, and the "MRP error" price had already drifted.
- **Rejected by stage 1 in the last 24h:** Klook, Crompton B0F3J89F8L, Lloyd AC ACNHMRG29GVDTDXD, VIP vest B09YV753WH, Dettol on Flipkart CBKHEPQZ8ARJZHGG.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 2 new slugs plus the updated #10992 slug (plus 3 hub URLs) returned **HTTP 200 for 6 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.60s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.82s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.72s) |
| /alan-jones-mens-striped-cotton-polo-t-shirt-regular-fit-b0gwv1g9h9 | 200 (0.35s) |
| /realspeed-rs-m128-128gb-usb-3-0-metal-pen-drive-acchs8bvdwpmf9gd | 200 (0.28s) |
| /sharp-em-s34n-w-300w-stand-mixer-with-3-4l-steel-bowl-b0b7gcyjn1 | 200 (0.17s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,137 = 16,137 | OK (16,135 + 2) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,717 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,715 vs 16,717 | OK. The 2 new deals are queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home.
- **#9689:** the Haier washer has no buy box; on watch.
- **#15663 (new):** FRONTECH B0C5RX48VG has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678, #16682, #16666, #10311
- **#16224 slug:** kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at 00:43 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
