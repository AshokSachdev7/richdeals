# TELEGRAM-DEAL-MONITOR tick — 2026-09-25ad (10:04 IST)

**3 pushed LIVE** (2 Amazon + 1 Flipkart). `/admin/deals/bulk` returned HTTP 201, count 3, all `created:true`. **IndexNow: HTTP 200 for 6 URLs.**

## Funnel
- **Sidebar:** one `browser_evaluate` over all 13 groups. 4 groups had new posts; 5 new links resolved. None were in the seen file or the DB.

| Group | Link | Resolved to | Result |
|---|---|---|---|
| SB Loots | amazn.lt/8CmQDQLm | B0F8NT3CQY Crompton Ameo mixer | **Pushed** |
| CoolzTricks | amzn.to/4jkH1PV | B0GZMYP6Y6 boAt Airdopes Joy v2 | **Pushed** |
| 𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 | afyp.in/r/b8286965fe98 | Flipkart pid WAPGW5YZQHM7EY3S, Aqua Fresh purifier | **Pushed** |
| Dealdost | amzn.to/4d5RvyS (500g) + amzn.to/4dVMpW6 (1kg) | B0HDFZWQY1 AYUORGANIX anjeer | Skipped. Grocery, and the listing contradicts itself (title says 500g, bullet says 415g pack). The 1 kg link was not resolved separately. |

- **Other 9 groups:** unchanged since 0925ab, or not deals.

## Pushed
| Product ID | Product | Price | MRP | Off | Store |
|---|---|---|---|---|---|
| B0F8NT3CQY | Crompton Ameo 500W mixer grinder, 3 steel jars | ₹1,899 | ₹3,400 | 44% | Amazon |
| B0GZMYP6Y6 | boAt Airdopes Joy v2 TWS earbuds | ₹799 | ₹3,490 | 77% | Amazon |
| WAPGW5YZQHM7EY3S | Aqua Fresh Smoke Audi 18L RO+UV+UF purifier | ₹3,608 | ₹16,500 | 78% | Flipkart |

## Verification
- **Amazon:** logged-in tab, reading these from the product page:
  - `#corePrice` for the price
  - `#centerCol` for the M.R.P.
  - `#availability`: both In stock
  - no coupon
  - `_SL` hiRes images
- **Flipkart:** the product page has no ld+json (as noted in memory).
  - Price was read from the page text in a Playwright tab.
  - The selected Black/Smoke variant has Buy Now. The "Out of stock" labels belong to other colour swatches.
  - Image is from `rukminim2.flixcart.com`.
  - The listed price excludes a ₹26 Protect Promise fee and optional bank cashback; the how-to step says so.
  - The ₹16,500 M.R.P. is the seller's listed M.R.P. and is probably inflated. The price is still a real Big Billion Days price (listing has 1.4 lakh ratings).
- **Affiliate:**
  - Amazon: `?tag=ashoksachdev-21`
  - Flipkart: `/p/itmc3da457d7de29?pid=WAPGW5YZQHM7EY3S&affid=djhackraj`, with the source's `affid=roobaicom` stripped
- **Script:** `apps/api/scripts/push-tg-0925ad.mjs`. The gate passed. Its how-to step now accepts a per-deal `last` step (used for the Flipkart bank-offer note).
- **Seen file:** 1966 → 1975 entries.

## Freshness
- **IndexNow:** HTTP 200 for 6 URLs (3 slugs + 3 auto-added paths).
- **Sitemap:** ISR, refreshes within 30 min.
- **`llms.txt`:** dynamic. No new routes.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| Live deals | 10828 (+3) |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 329, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, 2 so far. No day at 0. |
| Broadcast cursor | 11172 (file re-read) against a DB max of 11175. The gap is this batch; the external cron is catching up. |
| Prod endpoints | all 7 return 200 (slowest: `/blog` and `/sitemap.xml`, both 0.54 s) |
| Unpushed commits | 0 before this commit |

Verdict: green.
