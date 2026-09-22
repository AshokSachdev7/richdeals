# DEAL-INGEST — indiafreestuff tick `2026-09-22ab`

Source: `indiafreestuff.in/deals` + `/deals/superdeals` (homepage is the wrong surface — it serves banners, not cards). Rate limit 2.6s between their requests, no 403/429.

**Result: 11 new deals LIVE + 1 refreshed in place. IndexNow 15/15 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| cards discovered | 36 |
| resolved to a real product URL (`?rto=` → store) | 27 |
| fresh after dedup vs live DB | 25 |
| survived PDP price/stock verification | 11 + 1 refresh |
| rejected at the PDP | 14 |

## Published

Prices are the PDP figure, not the card figure. Amazon read in the logged-in tab (curl is bot-blocked); Myntra read from ld+json via curl.

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 10919 | Amazon | B0C4LHRS6S | ₹1,028 | 1375 | 25% | `philips-full-glow-15w-round-led-surface-downlighter-3-in-1-tunable-white-b0c4lhrs6s` |
| 10920 | Amazon | B0H1BVMZC4 | ₹376 | 2442 | 85% | `enakshi-kids-ski-winter-gloves-windproof-waterproof-fleece-lined-blue-small-b0h1bvmzc4` |
| 10921 | Amazon | B0DFHKPWL5 | ₹5,879 | 14999 | 61% | `geonix-24-inch-ips-full-hd-monitor-75hz-hdmi-and-vga-white-b0dfhkpwl5` |
| 10922 | Amazon | B0H63FTDWV | ₹899 | 1599 | 44% | `acer-nano-pad-slim-wireless-backlit-keyboard-bluetooth-5-0-420mah-b0h63ftdwv` |
| 10923 | Amazon | B0CZT73BS1 | ₹183 | 2799 | 93% | `amazon-basics-tough-armor-back-cover-for-iphone-13-tpu-and-polycarbonate-navy-bl-b0czt73bs1` |
| 10924 | Amazon | B0DGXVC63D | ₹83 | 249 | 67% | `shryoan-butter-luxe-satin-matte-liquid-lipstick-shade-12-6ml-b0dgxvc63d` |
| 10925 | Amazon | B0FNDDRC88 | ₹1,861 | 9599 | 81% | `safari-genius-theo-8-wheel-66cm-medium-check-in-polycarbonate-trolley-bag-pearl-b0fnddrc88` |
| 10926 | Amazon | B0C7QZ54WX | ₹5,999 | 23999 | 75% | `mokobara-the-transit-cabin-hard-sided-8-wheel-luggage-we-meet-again-sunray-b0c7qz54wx` |
| 10927 | Myntra | adb945ffe366 | ₹1,249 | 8199 | 85% | `teakwood-leathers-360-degree-rotation-hard-sided-cabin-trolley-bag-32l-adb945ffe366` |
| 10928 | Myntra | b1468affbb23 | ₹999 | 2899 | 66% | `priority-unisex-textured-360-degree-rotation-hard-cabin-trolley-bag-48l-b1468affbb23` |
| 10929 | Myntra | a7e839a01bb4 | ₹2,249 | 10999 | 80% | `safari-accent-vanilla-hard-sided-8-wheel-medium-trolley-bag-suitcase-66cm-a7e839a01bb4` |

Refreshed in place (dedup hit, not a duplicate page):

| id | productId | was | now | off |
|---|---|---|---|---|
| 1746 | B0H18M1KZ5 | ₹999 | ₹698 / mrp 1999 | 65% |

Deal 1746 kept its indexed slug and its stored product name; only price / mrp / pct / image / title were rewritten. `PriceHistory` row written because the price moved.

Every published row carries an original ~900–1100 char description written from captured PDP and spec facts only (never their copy, never `images.indiafreestuff.in`), plus a 4-step `howTo` whose step 2 is a row-specific caveat: wattage variant, glove sizing, HDMI/VGA-only inputs, Bluetooth-only pairing, iPhone-13-only fit, shade 12, "66cm is check-in not cabin", cabin weight allowance, cabin gauge depth, over-gauge "cabin" bag, combination-not-TSA lock.

Affiliate: Amazon `?tag=ashoksachdev-21` on `/dp/ASIN`; Myntra → InRDeals `inr678975705` (Cuelinks is deactivated for Myntra).

## Rejected at the PDP — 14

Price drift > ₹1 (card price vs live PDP), 10:

`B0DX26LW54` 107→121 · `B0H525K4ZV` 54→109 · `B0GW8LQCR9` 667→953.90 · `B0G6F1BL8V` 384→549 · `B0GV8J9B8C` 489→699 · `B0D2RPR9XC` 132→189 · `B001H4KFQM` 169→242 · `B06XG1HNFN` 954→1363.19 · `B0H8P895HL` 74990→75990 · `B01EG2ABEM` 302→302.46 (inside ₹1, but "Only 1 left in stock." + one-line bullets = not indexable)

Out of stock, 2: `B0F99T9KN6`, `B0FGDJTVJV`.
Thin listing + near-zero stock, 2: `B0F4G29SSL`, `B0F9B2DX5J`.

Their card prices were wrong on 10 of 25 rows again — the ±₹1 PDP gate is the only reason those did not ship.

## Two chokepoint bugs fixed — `scripts/lib/ingest-common.mjs`

Both affect every future sweep of every source, not just this tick.

1. **indiafreestuff's own affiliate id was riding inside our link.** The URL cleaner stripped `affid`, `tag`, `ascsubtag` and friends but not `affiliate_id`, so a Myntra deal went out as `inr.deals/track?...url=<myntra url with affiliate_id=zhXQPl71a7>`. Their id, our wrapper. Added `affiliate_id` to the strip alternation, and added a 7th pre-flight check to the push script that throws if `affiliate_id` appears anywhere in a built `affiliateUrl`.

2. **`productLd()` dropped priced, in-stock products as `no-ld-json`.** Myntra pastes marketing copy containing an unescaped `"` into the Product block, so `JSON.parse` fails on the whole block — and the existing control-character rescue cannot help, because a quote is not a control character. Added a last-resort positional scrape of the only four fields we ever consume (`name`, `image`, `price`, `availability`); a block with no price still reads as unusable. One of the three published Myntra rows was being silently lost to this.

Self-check: `node apps/api/scripts/lib/ingest-common.selfcheck.mjs` — 5 asserts covering the unescaped-quote block, the raw-newline block, a broken block with no price (must stay `null`), a broken non-Product block, and the clean `@graph` path.

## Freshness

`indexnow-ping.mjs` **failed on this network** — `getaddrinfo EAI_AGAIN api.indexnow.org`. `nslookup` confirms the local resolver (192.168.0.1) answers "can't find api.indexnow.org: Server failed" while `www.bing.com` resolves fine. Not a 422, not rate limiting: DNS.

Fallback used — one GET per URL to `https://www.bing.com/indexnow?url=<encoded>&key=33f3a9d63ca15676bbd90586ea80e65f`:

**15 URLs → HTTP 200, all 15** (12 deal slugs + `/`, `/offers`, `/sitemap.xml` — the slugs+3 rule).

Spot-checked live: `/philips-full-glow-...-b0c4lhrs6s` 200, `/safari-accent-vanilla-...-a7e839a01bb4` 200. Sitemap now 9,881 URLs.

## CEO audit

Clean:

- live deals **10,582**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- broadcast cursor vs DB max (10929) — in range
- unpushed commits before this tick: 0

Rot, all flagged, none executed:

1. **Blog floor missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST: 09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *` losing firings when the session is not up; the durable Task Scheduler fix is still unauthorised.
2. **41 live deals state a price in the title the row does not hold** (was 29 at the last read with the corrected `₹|Rs.` regex — it is growing). Worst offenders are legacy hand-typed titles: deal 1716 "Apply Rs.8,000 off Coupon" vs price 89999, deal 1450 "₹40/day" vs price 33240, deal 2602 "[Apply ₹300 Coupon] … at ₹99" vs price 99/mrp 1999. Schema and visible copy disagree on those pages. Retitle pass not authorised.
3. **Cuelinks wrapper audit — the earlier "66 dead rows" figure was overstated, corrected here.** 66 rows carry `linksredirect.com` across all statuses, but only **20 are LIVE**: shopsy 13, jiomart 3, flipkart 1, tatacliq 1, testbook 1, store.playstation.com 1. The other 46 are already EXPIRED (ajio 41 + 5 singletons). None of them is Myntra, so none is on the deactivated account — Cuelinks is still valid for these stores. One real defect remains: **the 1 LIVE Flipkart row should not be wrapped at all** — plain `?pid=…&affid=djhackraj`.
4. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod (pages stay live per the EXPIRED-banner rule).
5. **nullMrp 1,623 / nullPct 1,600** (re-counted live this tick) — backfill still unapproved.
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon.** Card offered ₹890 against the stored ₹1,290; the PDP shows the out-of-stock signature (empty core price block, null MRP, JS-filled `#availability`, empty buy array), so it was NOT refreshed to a price nobody can pay. Page stays live with the EXPIRED path.
7. ~~Any Myntra row pushed before this tick's fix may carry `affiliate_id=zhXQPl71a7` inside `affiliateUrl`.~~ **Swept and clear:** `affiliateUrl contains 'affiliate_id'` → **0 rows**, all statuses. The leak was caught on the first tick that could have shipped it. No cleanup needed.
8. **`api.indexnow.org` does not resolve from this network.** Every future tick should expect the node script to throw and go straight to the Bing GET fallback.
9. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens → delete + regenerate).

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
