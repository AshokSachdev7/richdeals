# TELEGRAM-DEAL-MONITOR tick — 2026-11-16m

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). It resolved the shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and verified each price on the Amazon PDP in the logged-in tab. Run at about 21:55–22:25 IST.

**Result: 2 deals pushed LIVE (#16714, #16715), `count:2`, both `created:true`. One repost re-verify fixed a stale price on LIVE #6949. IndexNow HTTP 200 for 6 URLs, and all three pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Product | Id | Outcome |
|---|---|---|
| ADORA big elephant soft toy, 60 cm, grey | B0HK838WXD | Pushed (#16714) |
| HP 15 fd0577TU, Core i5-1334U, 16GB/512GB | B0F4R6H3NB | Pushed (#16715) |
| Himalaya aloe vera face wash 200 ml | B0F6TZBQK4 | Repost of LIVE #6949; price moved, updated |
| LG 8 kg top load | B0DPHTSTYJ | Dup of LIVE #5035; PDP matches DB |
| Symbol bomber jacket | B0CBKNF45G | Already seen; LIVE #16712 |
| CoolzTricks ₹119 item | B0G5PH7QLV | Already seen; rejected earlier, no DB row |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16714 | Amazon | ADORA Big Size Elephant Soft Toy for Kids, 60 cm, Grey (B0HK838WXD) | ₹600 | ₹999 | 40% |
| 16715 | Amazon | HP 15 Laptop, Intel Core i5-1334U, 16GB RAM, 512GB SSD (fd0577TU) (B0F4R6H3NB) | ₹77,850 | ₹85,990 | 9% |

Notes:
- **PDP checks:** both in stock with the add-to-cart button present. Price read from `.a-price-whole` in `#corePriceDisplay`.
- **HP copy:** states that the USB-C port is data only (no charging, no display out), per the spec sheet.
- **Images:** `m.media-amazon.com` hiRes (`#landingImage` `data-old-hires`).
- **Affiliate links:** `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price or M.R.P.
- **Push target:** local API (`localhost:4000`).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 6949 | Himalaya Hydrating Aloe Vera Face Wash 200 ml (B0F6TZBQK4) | ₹218 / ₹449 (51%) | ₹179 / ₹449 (60%), in stock | `prisma.deal.update`: price 179, discountPct 60. Title and description rewritten from ₹218 / 51% to ₹179 / 60% so the schema and visible copy match. Slug kept. |
| 5035 | LG 8 kg top load (B0DPHTSTYJ) | ₹20,990 / ₹28,990 | Matches | None |

## Rejected / skipped

- **Vega scalp brush:** low-ticket.
- **Dealdost:** coupon loot.
- **Cult Clothing on Myntra:** category page.
- **Symbol multi-link post.**
- **NonStopDeals Caprese handbags:** category.
- **Swiggy Dineout posts:** not a product.
- **Rogerkart:** photo only.

B0HK838WXD, B0F4R6H3NB and B0F6TZBQK4 were added to `data/tg-multi-seen.json` (now 5,214 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 2 new slugs plus the updated #6949 slug (plus 3 hub URLs) returned **HTTP 200 for 6 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.18s) |
| /feed.xml | 200 (0.27s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.62s) |
| /adora-big-elephant-soft-toy-60cm-grey-b0hk838wxd | 200 (0.22s) |
| /hp-15-core-i5-1334u-16gb-512gb-laptop-fd0577tu-b0f4r6h3nb | 200 (0.22s) |
| /himalaya-hydrating-aloe-vera-face-wash-200ml | 200 (0.36s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,135 = 16,135 | OK (16,133 + 2) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,715 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,713 vs 16,715 | OK. The 2 new deals are queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - #16666 (B0FM8D7C1Z, GM Balin, "Only 1 left")
  - #10311 (B0GS675WDR, CELLO cooler)
- **#16224 slug:** still says "steel-insulated-tiffin-box" for a plastic lunch box. Kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at 23:03 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
