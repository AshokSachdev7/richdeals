# TELEGRAM-DEAL-MONITOR tick — 2026-11-17a

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). Every newest post in the sidebar was a category, coupon or grocery post, so it then read the history of the open SB Loots chat. SB Loots had four bare "BUY" posts from 11:28 to 11:43 PM, all newer than tick 11-16n. The tick resolved the shortlinks, deduped them against `data/tg-multi-seen.json` and the live DB, and verified each price on the PDP: Amazon in the logged-in tab, Shopsy through its `finalPrice` field. Run at about 00:03–00:08 IST.

**Result: 1 deal pushed LIVE (#16719), `count:1`, `created:true`. One reposted deal had a stale price on LIVE #4692, which was fixed. IndexNow returned HTTP 200 for 5 URLs, and both pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Product | Id | Outcome |
|---|---|---|
| boAt Nirvana Ion TWS earbuds, Charcoal Black | B0BW8TXJJ2 | Pushed (#16719) |
| Logitech K250 Bluetooth keyboard with numpad | B0FJQWRBVH | Dup of LIVE #4692; price fixed from ₹854 to ₹898 |
| Vivela extendable microfiber ceiling-fan duster | B0F9PGDQ5N | Rejected: low-ticket (₹187) |
| Heoluix 2000 W immersion rod (Shopsy) | YAFHHGPPHBXAYJNY | Rejected: unbranded electrical product at ₹288 |
| Unibic cookies; Wonderchef glasses; Vadhavan stationery set | B0D3V9R3ZF, B0B1N1PRQP, ARTH6K3J7YADW5HM | Already seen (tick n) |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16719 | Amazon | boAt Nirvana Ion TWS Earbuds, 120 Hrs Playback, Charcoal Black (B0BW8TXJJ2) | ₹1,799 | ₹7,990 | 77% |

Notes:
- **PDP check:** in stock with the add-to-cart button present. The price was read from `.a-price-whole` in `#corePriceDisplay`, and the M.R.P. from `#centerCol`.
- **Image:** the first `hiRes` could have been a different colour, so the image was keyed by `landingAsinColor` ("Charcoal Black 120 Hrs"): `m.media-amazon.com/images/I/81-TGXuOMAL._SL1500_.jpg` (200).
- **Copy:** states that IPX4 covers sweat and splashes but the buds are not waterproof, and that they have no active noise cancellation.
- **Affiliate link:** `https://www.amazon.in/dp/B0BW8TXJJ2?tag=ashoksachdev-21`.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price or the M.R.P.
- **Push target:** local API (`localhost:4000`).

## Dup re-check

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 4692 | Logitech K250 (B0FJQWRBVH) | ₹854 / ₹1,395 (39%) | ₹898 / ₹1,395, in stock, clip coupon shown | `prisma.deal.update`: price 898, discountPct 36. Description rewritten to ₹898, and it now tells buyers to check the clip coupon. Slug kept. Prod page shows `"price":"898"`. |

The channel post said "₹250 off" for this item. That is the coupon value, and the coupon amount cannot be read from the fetched PDP HTML, so the stored price is the pre-coupon PDP price.

## Rejected / skipped

- **Caprese bags on Myntra (SB Loots, CoolzTricks, NonStopDeals):** category post.
- **HRX clothing on Myntra, John Players on Ajio, Beardo perfume, MANQ blazers, U.S. Polo footwear:** multi-link or category posts.
- **LATEST IPHONE RATES:** OPPO coupon loot, not a product.
- **Dealdost:** coupon loot.
- **Rogerkart Anjeer:** grocery.
- **Hidden Loot and IndiaFreeStuff Tips (Swiggy Dineout):** not a product.
- **ONLINE SHOPPING DEALS Vega scalp brush:** low-ticket, already rejected in tick m.
- **INDIAN CHEAP DEALS LG washer B0DPHTSTYJ:** already seen; LIVE #5035.

B0F9PGDQ5N, B0BW8TXJJ2 and YAFHHGPPHBXAYJNY were added to `data/tg-multi-seen.json`, which now has 5,220 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the new slug, the updated #4692 slug and 3 hub URLs returned **HTTP 200 for 5 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.18s) |
| /blog | 200 (0.82s) |
| /sitemap.xml | 200 (0.24s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.78s) |
| /boat-nirvana-ion-tws-earbuds-120-hrs-charcoal-black-b0bw8txjj2 | 200 (0.29s) |
| /logitech-k250-bluetooth-keyboard-numpad | 200 (0.31s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,139 = 16,139 | OK (16,138 + 1) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,719 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,718 vs 16,719 | OK. #16719 is queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The 11-16 target was met and the day stayed below the cap of 4. 11-17 is at 0 at 00:06 IST; the CONTENT-SEO tick at 00:39 IST covers it.

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

The next TELEGRAM-DEAL-MONITOR run is at 01:03 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
