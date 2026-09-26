# TELEGRAM-DEAL-MONITOR tick 2026-09-26ar (18:03 IST)

**0 deals pushed. Every new post was a search page, a collection page, or an already-seen ASIN that failed verification, so nothing needed an IndexNow ping.**

## Sweep
- Scanned the 13 groups from `data/tg-groups.json` with one `browser_evaluate` over the sidebar.
- NonStopDeals was again not among the rendered rows (the list is virtualised).
- Shortlinks were resolved with curl:
  - `amzn.to/3VS8O0k` → Amazon `/s?k=` search over 3 ASINs
  - `fkrt.it/k2aWqJuuuN` → Flipkart "Furniture deals" collection
  - `link.amazon/B0e2wyJYY` and `link.amazon/B00wURzyW` → Symbol `/s?rh=` search pages
  - The channel posted `amzn.lt/yWatT9l3`, which fails DNS resolution. Its correct spelling, `amazn.lt/yWatT9l3`, resolves to B0HJ9W3ZND.

## Rejected
| Group | Item | Reason |
|---|---|---|
| CoolzTricks | Philips LED batten "Starts @899" | Search page over 3 ASINs, which makes it multi-product |
| Dealdost | Cabinet drawer "at 499" | Flipkart collection page, not a single product |
| Dealzone | Symbol women's sweatshirts "Starts at 279" | Two `/s?` search pages |
| SB Loots | B0HJ9W3ZND iPhone 18 Pro "@164900" | Already in the seen list. The PDP also fails: it is the 1 TB variant at ₹2,39,900 with no discount, rated 1.0★, "Only 2 left" |
| ONLINE SHOPPING DEALS, INDIAN CHEAP DEALS, Loot Deals 24x7 | Symbol jeans, handbag, Syska | Already live or already seen |
| Rogerkart, IFS Tips, Deal Dibba, Hidden Loot, OMG | Cashew, Instamart search, promos | Grocery or junk |

`data/tg-multi-seen.json` has 2,084 entries (unchanged).

## Freshness
- **IndexNow:** not run, because there were no new slugs.
- **Sitemap:** 10,450 `<loc>`.
- **llms.txt:** 200.

## CEO audit
- **Prod:** all 7 endpoints return 200.
  - `/` took 1.73 s on the first hit. Three re-checks came back at 0.23 s, so this was an ISR regeneration blip, not rot.
- **Deals:** 11,130 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11477.
- **Posts:** 334, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/3. No day is 0.
- **Broadcast cursor:** `lastId` is 11477, equal to the DB max. The queue is drained.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. The channels posted only search and collection links this hour.
