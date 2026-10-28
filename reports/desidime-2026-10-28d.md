# DESIDIME-INGEST · 2026-10-28d (10-28, midday IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 37 |
| Junk / grocery / other-store drops | 7 |
| Non-product drops (Google Play app link, `/s?` Highlander jeans search) | 2 |
| Resolved to a product (`visit.desidime.com` → merchant) | 28 |
| Already in the DB or rejected within 24h | 10 (7 LIVE dups logged, re-verified below) |
| Fresh | 18 (11 Amazon, 7 Flipkart) |
| Stage-1 skip (Flipkart `price-drift` ×7) | 7 |
| PDP-verified (Amazon in the logged-in Playwright tab) | 11 |
| Rejected after the PDP read | 8 |
| **Pushed LIVE** | **3** (ids 15258-15260) |
| Price-synced LIVE rows | 4 (#14814, #2985, #8941, #1920) |
| Expired LIVE rows | 1 (#2735, buy box gone) |

## Pushed

| ID | Store | Product | ₹ | MRP |
|---|---|---|---|---|
| 15258 | Amazon | DJI Osmo Pocket 3 4K vlogging camera (B0CG19QXWD) | 33,990 | 59,990 (43%) |
| 15259 | Amazon | Desidiya 14-LED crystal ball string lights, warm white (B0CGNM6P1N) | 139 | null (card MRP 999 implied 86% off, nulled per rule) |
| 15260 | Amazon | TIMEX women's analog watch, purple dial (B09W2DCD4Q) | 1,430 | 4,695 (70%) |

All 3 returned `created:true` (`count:3`). The title ₹ was diffed against `price` before POST. Images are `m.media-amazon.com` `data-old-hires` from the PDP.

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1`, using `#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability`, add-to-cart and a `#centerCol` "with N percent savings" cross-check. There was no captcha, so the mobile-UA fallback was not needed.

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| B0CG19QXWD | DJI Osmo Pocket 3 | 33990 | 33990 | **pushed** |
| B0CGNM6P1N | Desidiya crystal ball lights | 139 | 139 | **pushed** |
| B09W2DCD4Q | TIMEX women's watch | 1430 | 1430 | **pushed** |
| B0G2RCXTN6 | Zebronics 21.5" FHD monitor | 3060 | 3399 | rejected: drift (0.90 ratio, likely a coupon or bank price) |
| B0D3HZ911R | Portronics Power Plus router UPS | 749 | 799 | rejected: drift |
| B0CZTGRS2S | WHP 24kt 1 g gold Lakshmi pendant | 14394 | 15825 | rejected: drift (gold reprices daily) |
| B074KKM2MP | Philips 1000W hair dryer | 590 | 649 | rejected: drift |
| B08MZQB86J | Karachi Bakery besan ladoo 200 g | 67 | 99 | rejected: grocery (perishable), plus drift |
| B0GQSHYJ2D | Redmi Pad 2 4G 4/128 | 17499 (HDFC CC) | 18999 | rejected: card-only price |
| B08TV2P1N8 | boAt Rockerz 255 Pro+ | 853 | HTTP 404 | rejected: listing gone |
| B0BRL23TXV | boAt Wave Style Call | 1099 | currently unavailable, no add-to-cart | rejected |
| MONHFBUZ6RJGH9TB | ZEBRONICS Pixigo 16" monitor (Flipkart) | 4750 | 5499 | rejected: drift (stage 1) |
| VCYGHV3HEZ8QPTSY | Qubo Dashcam Pro (Flipkart) | 4999 | 3790 | rejected: drift (stage 1) |
| MOBHQZZG83SVB7SV | realme P4s Lite (Flipkart) | 15199 | 13999 (64 GB variant) | rejected: drift/variant (stage 1) |
| MOBHQ6XZJAUN46UF | POCO X8 5G (Flipkart) | 24227 | 25499 | rejected: drift (stage 1) |
| MOBHPCYNPNCJG2UV | POCO M8 Power 5G (Flipkart) | 20249 | 21499 | rejected: drift (stage 1) |
| ACNHJ8S6N8YW8WBC | Samsung Bespoke 1.5 T 4★ AC (Flipkart) | 33990 | 38990 | rejected: drift (stage 1) |
| ACNHHEJQZBFWH2G3 | Hisense 1.5 T 3★ AC (Flipkart) | 24215 | 25990 | rejected: drift (stage 1) |

- **Rejects:** all 15 were stamped in `data/dd-rejected.json` with `Date.now()`. The file now holds 680 entries.

## Duplicate re-verify (LIVE rows on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0GN8CDJP3 | #14814 Larah by Borosil 680 ml bottle | 252 | **231** | **price-synced**: price, discountPct 55, title ₹ and description ₹/% |
| B0GQV895L5 | #2985 Parachute protein shampoo 1.2 L | 519 | **472** | **price-synced**: price, discountPct 64, title and description. The stale "clip 32% coupon → ₹374" couponNote was nulled because it can't be verified on fetched HTML |
| B0GMPXF2SY | #8941 Bosch 335 L triple-door fridge | 45890 | **41990** (card 29990) | **price-synced**: price, discountPct 40, description ₹/% |
| B0GXV5313B | #1920 Samsung 55" Mini LED TV | 49990 | **47490** sticker (coupon badge; card 37790) | **price-synced**: price and discountPct 21. There is no ₹ in the text |
| B0GW345QCM | #2735 IFB 206 L 5★ fridge | 17040 | currently unavailable, only "See All Buying Options", no add-to-cart | **expired** via `/admin/deals/2735/expire`. The page stays live with an EXPIRED banner |
| B0FDQJYWSB | #15253 Samsung Galaxy Watch8 44mm | 18999 | 18999 | ok |
| B0DM1MTZ1X | #5206 GOBOULT X120 soundbar | 2013 | 2013 | ok |

All slugs were unchanged: the syncs used `prisma.deal.update`, not the bulk upsert.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 8 slugs (3 pushed, 4 synced and 1 expired) → **HTTP 200 for 11 URLs**.
- **Prod check:** the pages for #15258 and #15260 return 200, and prod `/api/deals` lists #15260 first.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,724 (+3 pushed, −1 expired), equal to the prod `/api/deals` total of 14,724 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15260 |
| Broadcast cursor | `lastId` 15260, equal to the max (the batch is already broadcast) |
| Posts: total / coverless / missing SEO fields | 440 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 2 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 already has 2 posts, which meets the daily rule.
