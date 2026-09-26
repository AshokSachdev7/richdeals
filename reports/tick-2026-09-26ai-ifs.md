# DEAL-INGEST indiafreestuff tick 2026-09-26ai (14:45 IST)

**9 Amazon deals pushed LIVE, ids 11467–11475. `/admin/deals/bulk` returned count 9 (all `created:true`). IndexNow: HTTP 200 for 12 URLs (9 slugs + 3 hub paths).**

## Sweep
- The IFS homepage had 0 deal cards, so discovery used `/deals` and `/deals/superdeals`. That gave 22 new slugs; 2 were sale hubs, leaving 20 candidates.
- All 20 base64 `?rto=` Buy Now ids resolved to Amazon `/dp/ASIN` URLs. Their tag (`dealhind-21`) was stripped and ours applied.
- Every ASIN was re-read on the PDP in the logged-in tab: core price block, add-to-cart presence, `#landingImage` hi-res, bullets and product overview.
- Copy was written from the PDP title and bullets only. Images are `m.media-amazon.com` only.
- Script: `apps/api/scripts/push-ifs-0926ai.mjs`, with the same gates as 26ae.

## Accepted (9)
| Product | Price | M.R.P. |
|---|---|---|
| COLORBEE 3-compartment bento tiffin, 350 ml | ₹199 | ₹999 |
| Symactive men's track pants | ₹749 | ₹1,999 |
| American Tourister Valex 28L backpack | ₹849 | ₹2,500 |
| Baseus UltraJoy 5-in-1 USB-C hub | ₹459 | ₹2,899 |
| Geonix eForce i13 USB-C to Lightning cable | ₹119 | ₹899 |
| Highlander men's jeans | ₹583 | ₹2,699 |
| Intex 6 ft Underwater Fun pool | ₹970 (IFS listed ₹984) | ₹1,999 |
| Philips 2.8W candle bulb, pack of 4 | ₹287 | ₹640 |
| Treo by Milton Roarr 4-pc serving set | ₹343 | ₹685 |

## Rejected (11)
| Reason | Items |
|---|---|
| Already LIVE (dedup) | B07C2TQKH5 Borosil mixer (id 10495, ₹2,595 — IFS ₹3,038 is worse), B097G96VT8 Safari set (id 11414) |
| No buy box / unavailable | B0G3PXL1V8 Cellecor air fryer, B0GYJVXTT9 Geonix cabinet, B0GQ9P9NVW Haier AC |
| IFS price only after bank offer + coupon | B0GL7M6KT4 LG minibar (₹10,890 on PDP, ₹8,851 listed) |
| Clip coupon | B0GSW7M9RD Wrogn tee (₹699, ₹664 only after the 5% coupon) |
| Only 1 left | B0BKGCDJLQ boAt Atom 81, B0BWTT6N6P Lancer clogs |
| 2★ rating, no availability | B0GSZWF3C1 Philips batten |
| Ambiguous listing | B0F99XQX6N Pebble PB102 (no product type on the PDP) |

## Verification
- `/out/11467` returns 302 to `amazon.in/dp/B0H74N32QB?tag=ashoksachdev-21`.
- `/out/11475` returns 302 to `amazon.in/dp/B0G74584QX?tag=ashoksachdev-21`.
- The prod `/api/deals` list is headed by id 11475.

## Freshness
- **IndexNow:** HTTP 200, 12 URLs. The slug list was built from `payload.json`.
- **Sitemap:** 10,439 `<loc>` (was 10,430). ISR 1800 s.
- **llms.txt:** 200.

## CEO audit
See `reports/sitemon-2026-09-26aj.md`. Everything green.

Verdict: green.
