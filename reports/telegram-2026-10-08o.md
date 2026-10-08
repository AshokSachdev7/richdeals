# Telegram tick 2026-10-08o (14:59 IST)

**2 pushed** (both Amazon). `/admin/deals/bulk` count 2, both `created:true`. Both live pages return 200. IndexNow **HTTP 200** for 5 URLs.

I read the newest post in each group in one sidebar read, then opened the ONLINE SHOPPING DEALS chat to see its last 2 deal posts in full.

## Pushed

| Deal | Group | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|---|
| [Kiki 3-seater velvet sofa, blue](https://richdeals.in/velvet-3-seater-kiki-sofa-with-channel-tufted-backrest-blue-b0g4mdx2qy) (B0G4MDX2QY) | ONLINE SHOPPING DEALS | ₹16,499 | ₹29,999 | 45% | 4.6★ (10) |
| [Bajaj iLED 8.5W rechargeable inverter bulb](https://richdeals.in/bajaj-iled-8-5w-rechargeable-emergency-inverter-led-bulb-b22d-cool-day-light-b0c9jhqpgy) (B0C9JHQPGY) | ONLINE SHOPPING DEALS | ₹169 | ₹685 | 75% | 3.9★ (9,075) |

Both were checked on the Amazon product page in the logged-in tab: `#centerCol` price matched the channel price, `#availability` showed In stock, and add-to-cart was present. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

The Kiki sofa was rejected in DesiDime tick 08h because DesiDime posted ₹8,499 while the live price was ₹16,499. This channel posted ₹16,499, which matches the live price. It has 10 ratings, which clears the 0–7 reject rule.

## Rejected

| Group | Post | Reason |
|---|---|---|
| Rogerkart | "Loot 2799", resolved to KILLER 3-piece luggage set (Flipkart `STCG3WC3K6BZQ8YS`) | ld+json price is ₹3,499. The ₹2,799 figure needs 35 Supercoins, so it is not the listed price. |
| Dealzone | Santoor soap 125g, ₹118 | Low-ticket personal-care item (FMCG) |
| CoolzTricks | Orient flood lights, 3 links | Multi-product |
| Dealdost | Nippo batteries, many links | Multi-product |
| SB Loots | Bikes/scooters masterlink | Category page |
| Hidden Loot | "Loot Lo @ 30-40" masterlink | Category page |
| NonStopDeals | Caprese "surf all pages" | Category page |
| IFS Tips | Instamart bedsheet | Location-specific |
| iPhone rates | Payment chatter | Not a deal |
| INDIAN CHEAP DEALS, Loot Deals 24x7 | Lavie handbag, Syska power bank | Same posts as the earlier tick, already handled |

`data/tg-multi-seen.json` now holds 2,909 entries (4 added).

## CEO audit (14:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,274 |
| Broadcast cursor | 12793 = DB max 12793 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
