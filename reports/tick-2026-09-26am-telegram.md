# TELEGRAM-DEAL-MONITOR tick 2026-09-26am (16:03 IST)

**0 deals pushed. The only new single-product posts needed a clip coupon plus a bank card to reach the advertised price, so nothing needed an IndexNow ping.**

## Sweep
- Scanned all 13 groups from `data/tg-groups.json` with one `browser_evaluate` over the sidebar.
- NonStopDeals was again missing from the rendered rows (the list is virtualised).
- Shortlinks were resolved with curl:
  - `amzn.to/3TQ566Y` → B0GZL5FK2M
  - `amzn.to/4iQa5ie` → B0FC6QHR4T
  - Both `myntr.it` links go to the Myntra `/roadster-jeans?sort=price_asc` listing.

## Rejected
| Group | Item | Reason |
|---|---|---|
| CoolzTricks | B0GZL5FK2M Aristocrat Comet set of 3 trolleys, "@3549" | The PDP price is ₹4,705. ₹3,549 only exists after the 15% clip coupon plus an SBI card offer |
| CoolzTricks | B0FC6QHR4T Aristocrat Comet cabin trolley, "@1099" | The PDP price is ₹1,293. ₹1,099 only exists after the 15% coupon plus a bank offer |
| SB Loots | Roadster jeans "from @361" (Myntra) | Category listing page, not a single product |
| Dealzone | Flipkart BBD refrigerator early-bird sale | Sale hub, bank-card offer |
| ONLINE SHOPPING DEALS, INDIAN CHEAP DEALS, Loot Deals 24x7, Rogerkart, Dealdost, Deal Dibba, IFS Tips, Hidden Loot, OMG | Same posts as tick 26ak | Duplicate, grocery, sale hub or junk (see the 26ak report) |

`data/tg-multi-seen.json` now has 2,082 entries, with the two Aristocrat ASINs added.

## Freshness
- **IndexNow:** not run, because there were no new slugs.
- **Sitemap:** 10,448 `<loc>`.
- **llms.txt:** 200.

## CEO audit
- **Prod:** all 7 endpoints return 200.
  - `/offers` took 1.15 s on the first hit. Three re-checks came back at 0.09–0.10 s, so this was an ISR regeneration blip, not rot.
- **Deals:** 11,128 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11475.
- **Posts:** 334, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/3. No day is 0.
- **Broadcast cursor:** `lastId` is 11475, equal to the DB max. The queue is fully drained.
- **Git:** 0 unpushed commits before this commit.

Verdict: green.
