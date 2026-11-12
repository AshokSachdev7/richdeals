# DESIDIME-INGEST tick — 2026-11-13a

Stage 1 ran `apps/api/scripts/ingest-desidime.mjs` over `/new` + homepage cards only (no per-deal fetch), applied the JUNK/GROCERY filters, and resolved each Buy Now via `visit.desidime.com`. Every Amazon candidate was then checked on the PDP in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, M.R.P. from `#centerCol`). Each one was deduped by productId against the live DB. Run at about 05:00 IST.

**Result: 2 pushed** (`/admin/deals/bulk` returned `count:2`, both `created:true`). 1 dup LIVE row was found dead and set to EXPIRED. 6 were rejected.

## Pushed

| ASIN | Product | Price | MRP | Off | Note |
|---|---|---|---|---|---|
| B07XCP3GRX | STRIFF adjustable foldable laptop stand | ₹200 | 1,799 | 89% | in stock, ATC |
| B0CW9QTTPG | ZEBRONICS H61-NVMe micro-ATX motherboard (LGA 1155) | ₹2,329 | 5,199 | 55% | only 1 left, ATC |

Slugs:
- `striff-adjustable-foldable-laptop-stand-b07xcp3grx`
- `zebronics-h61-nvme-micro-atx-motherboard-lga-1155-b0cw9qttpg`

## Dup LIVE row: PDP re-verify

| ID | Item | DB ₹ | PDP | Action |
|---|---|---|---|---|
| 16043 | Shiv Textiles women's trackpant, pack of 3 (B0GVP736W1) | 198 | no add-to-cart; "See All Buying Options" only, other sellers ₹465–599 | **EXPIRED** (page stays live with banner) |

## Rejected / skipped

| Item | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|
| Magic Eraser B0HPLV3CG6 | 28 | 29 | minimum buy is 5; low-ticket junk |
| Pure Source aroma set B011RJF5S4 | 136 | 438 | drift |
| 2-compartment lunch box B0FK6P2C1C | 218 | 499 | drift |
| 3-compartment lunch box B0FDH4CB68 | 252 | 479 | drift |
| Lawson sofa B0GCGCN34F | 18,199 | 19,199 | drift |
| Whirlpool chimney B0DFHZC7FS | 7,641 | 9,990 | drift |

Stage-1 rejects in the last 24h were the Klook sale plus Flipkart ACNHQHFE9YYMHZYP, GSTGG7GJQSJQFVYQ, DNSGZ8FHXFPSFYZU and ACNHNBHQD4UEH9TD.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the 2 pushed slugs returned **HTTP 200** (5 URLs: 2 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | 7/7 200 | OK |
| DB LIVE vs API total | 15,892 = 15,892 (+2 pushed, −1 expired) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,466 vs 16,468 (this tick's 2 rows, picked up by the external broadcast cron) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-13 still has 0 at 05:00 IST. The CONTENT-SEO post is next in this session.

## Still open

- The same-price confirm paths in the desidime and TG scripts still write no priceHistory row.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #14635 (Mivi, Flipkart): PDP unchecked.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
