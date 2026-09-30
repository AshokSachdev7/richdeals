# GSC traffic drop — 2026-09-30

**Verdict: Google pulled richdeals.in from the Merchant Listings (Shopping) surface at 22:30 IST on 09-28. The cause is not a bug of ours: no manual action, 0 invalid items, pages 200 + index. It is the same 5-day "test then pull" pattern as 07-26→07-30.**

## Numbers (web, dataState all)
| Window | Clicks | Impr | Avg pos |
|---|---|---|---|
| 09-10 → 09-23 (baseline) | ~0-2/day | 5-48/day | 2-60 |
| 09-24 → 09-28 (spike) | 40 / 85 / **140** / 73 | 913 / 1568 / **2137** / 1020 | ~2.0 |
| 09-29 | 2 | 40 | 7.3 |

- searchAppearance: 09-24→28 **MERCHANT_LISTINGS 298 clicks / 2916 impr** vs 09-29→30 **0 / 6**. The whole spike was merchant listings.
- Hourly (PDT): 09-28 09:00 = 10/84 → **10:00 = 0/24** → ≤1/11 every hour since. One-hour cliff across the whole site = eligibility switched off, not per-page recrawl decay.
- Earners: vivo X300 FE (198 clk / 1196 impr, pos 1.6), vivo Y05 (907 impr, "vivo y05 price" 353 impr at pos 1.0), Powermax treadmill, Wild Stone, Galaxy S25 Ultra. 99% mobile, India.

## Ruled out
- **Our deploys**: the cliff is at 17:00 UTC 09-28. The `sku` commit 67ee5eb deploy was created 18:15 UTC, after the cliff. The previous deploy (00:39 UTC, meta padding) had been live for 16 h at full traffic.
- **Manual action**: GSC → Manual actions = "No issues detected".
- **Schema**: GSC Merchant listings report = Valid 296, Invalid 0 (last update 29/09). Warnings only: no return policy, no shipping, no GTIN/brand (unknown for an aggregator, never fabricate).
- **Pages**: the top 4 URLs return 200 with `index, follow` and a self canonical; the deals are LIVE with prices; robots `*` Allow.
- **Data lag**: hourly data shows the drop is real, not a partial day.

## Why
Google tests new sources on high-intent surfaces for a few days, then reassesses. richdeals.in is an affiliate, not the merchant (Offer seller = Amazon), with low domain authority. Merchant listings favour the actual seller (Amazon's own listing wins the same SKU). Same shape as the 07-26→07-30 free-samples honeymoon: 5 days on, then an instant cliff. Organic web rank without that surface is still the known ceiling (pos 26-68, see traffic-ceiling memory).

## Action
- Nothing to revert (the sku change is innocent and is a real id).
- Keep Offer prices fresh on the product-query pages (stale price = demotion); the price-verify ticks continue.
- The real lever is unchanged: domain authority (backlinks, brand mentions) + the `/best/*` intent pages shipped 09-30 for vivo/phone-under-X queries, which rank on the organic web surface and do not depend on merchant eligibility.
- Re-check GSC 10-03 (2-day lag) for any return of MERCHANT_LISTINGS.
