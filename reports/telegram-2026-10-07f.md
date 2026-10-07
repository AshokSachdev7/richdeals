# Telegram tick 2026-10-07f (17:05 IST)

I read the sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate`. I also read the ONLINE SHOPPING DEALS history (opened with a trusted click on its row and scrolled to the newest posts).

Skipped without a PDP read:
- **Loot or category posts:** SB Loots, CoolzTricks (Bata, 80% off), Dealdost (AJIO Vero Moda/ONLY), NonStopDeals (Caprese, all pages).
- **Location-locked:** IFS Tips and Hidden Loot (Swiggy Instamart).
- **Expired:** Dealzone (marked "Over Now").
- **Already seen:** Hisense AC, handbag, Syska power bank.
- **FMCG or personal care:** tissue, L'Oréal cleanser, Livon serum, pav bhaji masala.

That left 10 resolved product links: 3 were already LIVE and 7 were new.

## Pushed: 5 (`/admin/deals/bulk` count 5: 4 created, 1 refreshed; status live; prod 200)

| Deal | Store | Price | MRP | Rating |
|---|---|---|---|---|
| Mivi Nex 70 70W 2.2ch soundbar (B0G3PXYRHL) | Amazon | ₹2,199 | ₹7,999 | 4.1 (13) |
| HP Campus Core 16 backpack, Green (B0FDKLVCMS) | Amazon | ₹550 | ₹2,199 | 4.1 (9) |
| Amazon Basics health faucet, 1.5m SS304 hose (B0F6NQCSGG) | Amazon | ₹328 | ₹1,999 | 4.2 (45) |
| Bacca Bucci Streethulk high-tops, blue (SHOGTR2HWNKQ9BGT) | Flipkart | ₹899 | ₹3,499 | 4.1 (177) |
| HP 450 programmable wireless keyboard (B0BR3XRNHV, via Rogerkart) | Amazon | ₹641 | ₹3,498 | 3.8 (106) |

Verification:
- **Amazon:** price read with a same-origin PDP fetch (`#centerCol`) in the logged-in tab. In stock, with add-to-cart present.
- **Flipkart:** ld+json `offers.price` 899, InStock, read in the Playwright tab.

The HP 450 matched existing LIVE row 5204 (`created:false`). Its old slug `hp-450-programmable-wireless-keyboard` was kept, so no URL broke. My DB dedup missed this row because the Rogerkart ASIN only resolved after the dedup query ran.

## Live rows re-verified

| Deal | Was | Now | Action |
|---|---|---|---|
| Pets Empire raised dog bowl stand (B012N5ZZRM) | ₹401 | ₹399 (80% off) | Re-priced. Also removed an unverified "2x2800ml" from the title and description; the PDP says 1,600 ml per bowl, and the size of the ₹399 variant is unconfirmed. |
| Borosil Vision 6-mug set (B00E96GRDK) | ₹349 | ₹349 | No change |
| Longway mixer + iron combo (B09VSV83NK) | ₹1,399 | ₹1,399, only 1 left | Left LIVE |

## Rejected (2)

| Candidate | Reason |
|---|---|
| PunnkFunnk K20 gaming headset (B0HBC4P4T8) | 5 ratings |
| Goodyear ball pein hammer (B01BSRKWRO) | No buy box |

The seen list is now 2,831 entries.

## Freshness

- IndexNow: **HTTP 200**, 9 URLs (6 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (17:05 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1.** Below the 2–3 rule. The 18:09 BLOG cron makes it 2, and the next SITEMON tick re-checks. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,171 |
| Broadcast cursor | 12650 vs DB max 12654. These are the 4 new rows; the external broadcast cron picks them up. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
