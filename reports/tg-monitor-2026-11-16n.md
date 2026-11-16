# TELEGRAM-DEAL-MONITOR tick — 2026-11-16n

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). It resolved the shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and verified each price on the PDP: Amazon in the logged-in tab, Shopsy through its `finalPrice` field. Run at about 22:55–23:07 IST.

**Result: 1 deal pushed LIVE (#16718), `count:1`, `created:true`. IndexNow returned HTTP 200 for 4 URLs, and the page returns 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Product | Id | Outcome |
|---|---|---|
| Wonderchef Modena juice glass, 240 ml, set of 6 | B0B1N1PRQP | Pushed (#16718) |
| Unibic Cashew Badam cookies, 450 g, pack of 2 | B0D3V9R3ZF | Rejected: grocery / low-ticket FMCG (₹175) |
| Vadhavan 7-in-1 kids stationery gift set (Shopsy) | ARTH6K3J7YADW5HM | Rejected: low-ticket (₹183) |
| SB Loots `amazn.lt` links | B00CBRJ34E, B0CBKNF45G, B0F4R6H3NB, B0HK838WXD | Already seen |
| LG washing machine sale (INDIAN CHEAP DEALS) | B0DPHTSTYJ | Already seen; LIVE #5035, checked in tick m |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16718 | Amazon | Wonderchef Modena Juice Glass Set of 6, 240 ml, Clear (B0B1N1PRQP) | ₹299 | null | — |

Notes:
- **PDP check:** in stock with the add-to-cart button present. The price was read from `.a-price-whole` in `#corePriceDisplay`.
- **M.R.P.:** `.a-text-price` returned ₹49.83, but that is the per-glass rate (299 ÷ 6), not the M.R.P. `#centerCol` shows an M.R.P. of ₹1,829. That makes the discount 84%, so the M.R.P. was nulled under the ≥80% rule.
- **Copy:** says the set is listed for cold drinks, and gives the per-glass cost as "under fifty rupees" with no ₹ figure, so it passes the pre-flight check.
- **Image:** `m.media-amazon.com/images/I/61M03Cth7iL._SL1080_.jpg` (200).
- **Affiliate link:** `https://www.amazon.in/dp/B0B1N1PRQP?tag=ashoksachdev-21`.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price.
- **Push target:** local API (`localhost:4000`).

## Rejected / skipped

- **CoolzTricks U.S. Polo footwear:** category post.
- **Dealzone Beardo perfume:** multi-link post.
- **Dealdost:** coupon loot.
- **NonStopDeals Caprese handbags:** category post.
- **Rogerkart Anjeer:** grocery.
- **Hidden Loot Swiggy Dineout:** not a product.
- **SB Loots multi-link or category posts:** Cult Clothing on Myntra, Symbol clothing, John Players on Ajio, Beardo.

B0D3V9R3ZF, B0B1N1PRQP and ARTH6K3J7YADW5HM were added to `data/tg-multi-seen.json`, which now has 5,217 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the new slug (plus 3 hub URLs) returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.22s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.24s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.68s) |
| /wonderchef-modena-juice-glass-240ml-set-of-6-b0b1n1prqp | 200 (0.34s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,138 = 16,138 | OK (16,137 + 1) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,718 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,717 vs 16,718 | OK. #16718 is queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (7 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at 00:03 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
