# TELEGRAM-DEAL-MONITOR tick — 2026-11-16c

Run at about 11:55–12:05 IST. One `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile) read the newest post in all 13 source groups. Shortlinks were resolved with curl, deduped against `data/tg-multi-seen.json` and the live DB by productId, and every Amazon price was read in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` plus add-to-cart).

**Result: 1 pushed LIVE (bulk count 1, created). 2 reposts were already LIVE and their prices are unchanged on the PDP. IndexNow returned HTTP 200 for 4 urls. Prod is 7/7 at 200 and DB LIVE = API total = 16,087.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | GM Balin 15L 4-star storage water heater (B0FM8D7C1Z) | ₹5,499 | ₹12,490 | 56% |

- Source: SB Loots (`amazn.lt/uwRRDn8G`). Their tag `bhavesh015-21` was stripped; the link uses `?tag=ashoksachdev-21` on `/dp/ASIN`.
- The listing has a 10 L and a 15 L variant. `landingAsinColor` is "Balin 15 L", and the image was taken from that variant's `colorImages` entry on `m.media-amazon.com`.
- The copy is original. The builder pre-flight passed: every ₹ in the copy equals the price, the title's ₹ equals the price, price < MRP, the image matches the CDN pattern.
- New productId, so no slug restore was needed. The deal page returns 200 on prod.

## Dup re-checks

| Row | Deal | Source | DB | PDP | Action |
|---|---|---|---|---|---|
| #12798 | Ant Esports AEKS100 kitchen scale (B0CP2FPPM5) | Dealzone, "189", `link.amazon/B0gi9s3U8` | ₹189 / ₹1,199 | ₹189 / ₹1,199, in stock | None |
| #5035 | LG 8kg top-load washer T80VBMB4Z (B0DPHTSTYJ) | INDIAN CHEAP DEALS, `link.amazon/B08FsUNwo` | ₹20,990 / ₹28,990 | ₹20,990 / ₹28,990, in stock | None |

## Rejected / skipped

- CoolzTricks `myntr.in/NB92qW` resolved to a Myntra Kook N Keech track-pants category listing (`?f=Gender…&sort=price_asc`), not a single product. Rejected.
- Dealdost: a Scapia card referral scheme. Junk.
- Hidden Loot, IndiaFreeStuff Tips: Swiggy Dineout vouchers. Not a product.
- LATEST IPHONE RATES: a Samsung dealer-price notice. Not a deal.
- ONLINE SHOPPING DEALS (SIMPARTE) and NonStopDeals (Caprese category) were already handled in tick b.
- Rogerkart: the newest post is a photo with no link.
- RichDeals is our own channel.

tg-multi-seen: 5,172 entries (+1).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 1 new slug and returned **HTTP 200** for 4 urls (1 slug plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the deal.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,087 = 16,087 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,666 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,665 vs 16,666 | OK. The external broadcast cron picks up this tick's row on its next run. |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. CONTENT-SEO (`7345e5c6`) fires at 12:39 IST and adds the second 11-16 post. The 12:50 IST SITEMON confirms it.

## Still open

- IFS yield: if the 12:53 IST IFS tick finds 0 new ids again, check whether the Buy Now format changed.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
