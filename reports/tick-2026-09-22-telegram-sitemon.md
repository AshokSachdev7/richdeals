# TELEGRAM-DEAL-MONITOR + SITEMON tick — 2026-09-22 02:05 IST

## Telegram sweep

One `browser_evaluate` over the sidebar (13 source groups in `data/tg-groups.json`,
plus noise rows skipped). Newest message per group triaged:

| Group | Newest post | Verdict |
|---|---|---|
| CoolzTricks | HP Travel Hub USB-C @1186 (`amzn.to/4yKMDHD`) | resolved → B0D95QS6DQ, **pushed** |
| Rogerkart Deals | Police Cabin Trolley 65L @1599 (`rogerkart.com/r/...`) | own shortener, no HTTP redirect — real URL scraped from the page HTML → B0GS9N5KRP, **pushed** |
| ONLINE SHOPPING DEALS | Clensta Anti-Dandruff Shampoo+Conditioner ₹399 (`link.amazon/...`) | resolved → B0GSKLW894, **pushed** |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500 (`link.amazon/...`) | → B0G38DGNKM, already LIVE as deal #7110 (₹3,459) — dup |
| Loot Deals 24x7 | Syska 10000mAh Power Bank ₹799 (Flipkart) | pid PWBGGD4THDQZYAY6 already in `tg-multi-seen.json` — handled before |
| Dealzone | "Upto 88% Off On Branded Shoes" + 5 brand links | multi-product category, skip |
| Dealdost | "Loot: Mobile & Tablet Protection Starts at 199" | loot/category, skip |
| IndiaFreeStuff Tips | Swiggy Instamart search trick | not a product, skip |
| Hidden Loot Deals | Zepto search trick, Delhi-only | not a product, skip |
| OMG LOOTDEALS | "Video dekho paisa kamao" | app promo, skip |
| Deal Dibba | t.me join links | not a store, skip |
| SB Loots And Deals | channel notification how-to | not a deal, skip |
| NonStopDeals | no newer message this sweep | none |

Shortlink note: `link.amazon/B0h3ko7q0` → **B0GSKLW894**, `link.amazon/B05yvriRF` →
**B0G38DGNKM**. The code in the shortlink is ASIN-shaped and wrong both times —
resolving first is what caught the handbag as an existing deal.

Prices/stock read on the PDP in the logged-in tab, not from the channel card:

| ASIN | Product | PDP price | MRP | Off | Stock |
|---|---|---|---|---|---|
| B0D95QS6DQ | HP Travel Hub USB-C G3 | ₹1,186 | ₹11,999 | 90% | in stock, buy box |
| B0GSKLW894 | Clensta Anti-Dandruff Shampoo + Conditioner 250ml | ₹399 | ₹799 | 50% | in stock, buy box |
| B0GS9N5KRP | Police Origine 65L Cabin Trolley, TSA lock | ₹1,599 | ₹9,999 | 84% | in stock, buy box |

- Pushed LIVE via `scripts/push-tg-0922.mjs` — `created=3 updated=0` (#10836-10838).
- Freshness: `indexnow-ping.mjs` → **HTTP 200 for 6 urls** (3 slugs + 3 fixed paths).
- `data/tg-multi-seen.json` 1757 → 1760.
- Broadcast run: 3 posted, cursor → 10838 (= DB max).

## SITEMON

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.32s |
| `/offers` | 200 | 0.11s |
| `/blog` | 200 | 0.38s |
| `/sitemap.xml` | 200 | 0.28s |
| `/feed.xml` | 200 | 0.09s |
| `/api/deals` | 200 | 0.12s |
| `/llms.txt` | 200 | 0.55s |

7/7 up, all sub-second.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 10491 (10488 + 3 this tick) |
| LIVE null price / null image | 0 / 0 — nothing to classify or delist |
| PENDING_REVIEW backlog | 0 |
| broadcast cursor vs DB max | 10838 vs 10838 — level |
| unpushed commits | 0 |
| coverless / seo-less posts | 0 / 0 |
| posts/day IST | 09-17=2 09-18=3 09-19=3 **09-20=2 09-21=1** 09-22=0 (02:05 IST) |

**ROT: blog, already in hand.** 09-21 shipped 1 post against the 2-3/day rule.
BLOG tick for 09-22 is running now with a 3-post target (spawned in the previous
tick this session) — not re-flagged as new rot, tracked to completion there.

**ROT: scheduling, unchanged.** Both of these ticks ran because this session is
open. `schtasks` still has zero richdeals/desidime/broadcast entries, so nothing
fires once it closes. Owner call pending.

## BLOG tick 2026-09-22 (closed out after this tick)

3 posts published, all DB-verified (#379-#381), all with a cover, both SEO
fields inside limits, and every internal link resolving 200 on prod:

| # | Slug | seoTitle | Words | Internal links |
|---|---|---|---|---|
| 379 | `do-you-need-a-watch-winder-automatic-watch-india-2026` | 52 ch | 1143 | `/oryx-watch-winder-4-automatic-watches-led`, `/offers` |
| 380 | `cheap-ipad-stylus-alternative-apple-pencil-price-india-2026` | 54 ch | 998 | `/digiroot-ipad-pencil-fast-charge-palm-rejection-b0cp91`, `/kingone-upgraded-stylus-pen-for-ipad-2018-onwards-b09kgv`, `/offers` |
| 381 | `phone-cooling-fan-gaming-worth-it-india-2026` | 54 ch | 1018 | `/un1que-rgb-phone-cooling-fan-semiconductor-cooler`, `/offers` |

seoDesc 156/154/152 chars. IndexNow pinged through `insert-blog-mdmeta.mjs`
(HTTP 200). Covers, post pages and all four linked deal pages checked live:
11/11 → 200, no dead internal links.

Topic selection deliberately avoided the saturated clusters (best-X-under-Y,
free-samples, store-coupon, X-vs-Y). Six candidates were SERP-checked first;
RO/UV/UF, lithium-vs-lead-acid, cabin-baggage-size, geyser-sizing and
hard-vs-soft-luggage were dropped because dedicated 2026 competitor guides
already own those queries.

posts/day IST after this tick: 09-17=3 09-18=3 09-19=3 **09-20=2 09-21=1** 09-22=3.

**09-21 stays broken and is not fixable.** One post against a 2-3 minimum.
Backfilling it would need a 4th post dated to a past day, which either breaks
the ≤4/day cap or backdates a publish — neither is worth it. Recorded, not
papered over. Cause is the same structural gap as the deal outage: session
crons died with the previous session and there is no OS-level scheduler entry,
so the BLOG tick simply never fired on 09-21.
