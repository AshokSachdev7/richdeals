# TELEGRAM-DEAL-MONITOR tick — 2026-11-18s

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Shortlinks were resolved (Rogerkart through a Playwright navigate). Amazon candidates were verified with a same-origin fetch of the PDP in the logged-in Amazon tab, reading `.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `#landingImage` `data-old-hires` and the `#centerCol` MRP. The Shopsy candidate was read from its product page, which carries no ld+json, so the price came from `"finalPrice"` and stock from the absence of the Sold Out widget. Run at about 17:50–18:09 IST.

**Result: 3 deals pushed LIVE (#16829–16831): 2 Amazon and 1 Shopsy. 1 candidate was rejected for price drift. The bulk endpoint returned HTTP 201 with count 3 (all `created:true`, so no slug restore was needed), and the readback shows all 3 LIVE. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks | amzn.to/4ko2dp0 | MollisHomes microfiber comforter (B0HF7DDSR4) | **Pushed as #16829.** |
| ONLINE SHOPPING DEALS | link.amazon/B0gUAn4mK | LEGO Speed Champions 77245 (B0DHSDWPP2) | **Pushed as #16830.** |
| SB Loots | bittli.in/48jlaNFv | Ramya angle cock, pack of 2 (Shopsy FCEHCGGJHQWJADWH) | **Pushed as #16831.** |
| Rogerkart | rogerkart.com/r/jpJaUzq | Beardo Whisky Smoke perfume, 20 ml (B0FKT4N4MS) | **Rejected:** price drift, see below. |
| Dealzone | link.amazon/B0bnMKk61 | FILA | Skipped: category post. |
| Dealdost, INDIAN CHEAP DEALS, NonStopDeals | — | — | Already seen or category posts. |
| Hidden Loot, IFS Tips | — | — | Skipped: not a product. |
| RichDeals | — | Our own channel | Skipped. |

The five new shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,382 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16829 | Amazon | B0HF7DDSR4 | MollisHomes Microfiber Comforter Single Bed 180 GSM, 150x225 cm, Beige & Grey | ₹392 | — (nulled) |
| 16830 | Amazon | B0DHSDWPP2 | LEGO Speed Champions Aston Martin Aramco F1 AMR24 77245 | ₹319 | ₹359 (11% off) |
| 16831 | Shopsy | FCEHCGGJHQWJADWH | Ramya Angle Cock with 24-inch Connection Pipe, Pack of 2 | ₹376 | — (nulled) |

- **Verification:** all three were in stock. Both Amazon rows had an add-to-cart button. The comforter is sold by ETrade Online and the LEGO set by Opptra.
- **Comforter MRP:** the listed ₹2,999 would imply 87% off, over the 80% rule, so it was nulled and the page shows the price with no discount claim.
- **Ramya MRP:** the page state carried sibling-card values (₹1,499 and ₹999) rather than one clear MRP for this listing, so it was nulled.
- **Ramya:** the listing is a pack of 2, so "Pack of 2" is in the product name to keep the price honest.
- **Affiliate matrix:**
  - Amazon: `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
  - Shopsy: Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=…`). Shopsy is not Flipkart, so the `affid` matrix does not apply.
- **Images:** from the marketplace CDNs (`m.media-amazon.com` `817rlcwBdoL` and `81v4N8bm+2L`, Flipkart's `rukmini` CDN for Shopsy).
- **Copy:** titles and descriptions were written fresh; no channel text was copied.

## Rejected

| productId | Product | Reason |
|---|---|---|
| B0FKT4N4MS | Beardo Whisky Smoke perfume, 20 ml | Price drift: PDP ₹219 vs channel ₹99. The PDP showed MRP ₹399, in stock, sold by Marico Ltd, with no clip coupon that would explain the gap. The resolved URL carried Rogerkart's tag `rogerkart-21`. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs, **HTTP 200 for 6 URLs** (the 3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.46s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.88s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.20s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.71s) |
| /lego-speed-champions-aston-martin-aramco-f1-amr24-77245-b0dhsdwpp2 | 200 (0.24s) |
| /mollishomes-microfiber-comforter-single-bed-180-gsm-150x225-cm-beige-grey-b0hf7ddsr4 | 200 (0.18s) |
| /ramya-angle-cock-with-24-inch-connection-pipe-pack-of-2-fcehcggjhqwjadwh | 200 (0.26s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 18:08 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,252 = 16,252 (+3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,831 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,828 vs 16,831 | OK. #16829 to #16831 are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 resolved at 18h and 7 of 91 at 18i, so the slot stays on IFS. It gets repointed if a tick resolves 0 again.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): CONTENT-SEO 18:39, DESIDIME 18:43, SITEMON 18:50, DEAL-INGEST 18:53, TG 19:03, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
