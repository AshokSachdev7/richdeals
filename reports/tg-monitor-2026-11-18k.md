# TELEGRAM-DEAL-MONITOR tick — 2026-11-18k

The tick read the Telegram Web sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all 13 groups in `data/tg-groups.json`. It resolved the two new shortlinks, deduplicated against `data/tg-multi-seen.json` and the live DB (productId, slug and affiliateUrl), and verified both products on the Amazon PDP in the logged-in tab. Run at about 10:03–10:06 IST.

**Result: 1 new deal pushed LIVE (#16784, RR Signature Raptor BLDC fan at ₹2,699) and 1 rejected (BoroPlus cream, MOQ-gated ₹49 FMCG). IndexNow returned HTTP 200. Every CEO-audit check is green and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| Dealzone | 10:02 AM, "RR Signature Raptor 1200mm BLDC Ceiling Fan at 2699", `link.amazon/B0a61lmcV` → `/dp/B0FC2PZ39Z` (source tag `glitzdeal05-21` stripped) | **Pushed LIVE as #16784** |
| SB Loots | 09:36 AM, "BUY - `amazn.lt/L4kMOvsQ`" → `/dp/B0CMCW69WH` (source tag `bhavesh015-21`) | BoroPlus Soft Light cream 50 ml at ₹49. Rejected: the PDP carries `MOQPreLoadPopOver` (minimum-quantity gate), and it is low-ticket FMCG |
| CoolzTricks | 12:53 AM, Athom towels | Already seen; LIVE as #16773 |
| Rogerkart | 11:18 PM, Lavie handbags master link | Category post |
| ONLINE SHOPPING DEALS | 10:05 PM, Outsup juice | Seen in an earlier tick |
| Dealdost | Tue, EUCOS tripods | Seen; rejected in 11-18c for a code-only price |
| Hidden Loot, IFS Tips & Tricks | Wed, Swiggy | Not product deals |
| INDIAN CHEAP DEALS | Oct 29 | Old |
| NonStopDeals | Oct 5 | Old |

The RichDeals channel row is our own and was skipped. The remaining rows are personal chats and bots.

## Verification (same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab)

| Field | B0FC2PZ39Z (fan) | B0CMCW69WH (cream) |
|---|---|---|
| Title | RR Signature Raptor 1200mm BLDC Designer Ceiling Fan, 32W, 350 RPM [Ale Brown] | BoroPlus Soft Light Moisturising Cream 50 ml |
| Price (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | ₹2,699 (matches the channel claim) | ₹49 |
| M.R.P. | ₹11,990 | ₹130 |
| `#availability` | In stock | In stock |
| Add to cart | present | present |
| MOQ popover | absent | **present → reject** |
| Image (hiRes, landingAsinColor "Raptor BLDC(Ale Brown)") | `m.media-amazon.com/images/I/61FUWhQnMsL._SL1500_.jpg` | — |

## Push

`POST localhost:4000/admin/deals/bulk` → **HTTP 201, count 1, `created:true`**. No slug restore was needed.

| Id | Slug | Price | MRP | Discount |
|---|---|---|---|---|
| #16784 | `rr-signature-raptor-1200mm-bldc-ceiling-fan-ale-brown-b0fc2pz39z` | ₹2,699 | ₹11,990 | 77% |

The title reads "RR Signature Raptor 1200mm BLDC Ceiling Fan, Ale Brown at ₹2,699 (77% Off) – Amazon", so the title ₹ equals the numeric price. Affiliate URL: `https://www.amazon.in/dp/B0FC2PZ39Z?th=1&psc=1&tag=ashoksachdev-21`. The prod page answered 200 straight after the push.

`data/tg-multi-seen.json` grew from 5,341 to 5,345 entries (`link.amazon/B0a61lmcV`, `amazn.lt/L4kMOvsQ`, `B0FC2PZ39Z`, `B0CMCW69WH`).

## Freshness

- **IndexNow:** `indexnow-ping.mjs rr-signature-raptor-1200mm-bldc-ceiling-fan-ale-brown-b0fc2pz39z` → **HTTP 200** for 4 URLs.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design, so a new deal is not expected there.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.19s) |
| /feed.xml | 200 (0.22s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.65s) |
| /rr-signature-raptor-…-b0fc2pz39z | 200 (0.25s) |

All probes used `curl -m 30`.

## CEO audit

Run at 10:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,204 = 16,204 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,784 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,783 vs 16,784 | OK. The 1-row gap is #16784, pushed seconds before the audit; the external tg-broadcast cron picks it up on its next run |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 10:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Old rows with contradictory copy:** rows created before the title-vs-price check may carry a title ₹ or howTo ₹ that differs from `price` (#13311 was one). A sweep that diffs them would find the rest.
- **IFS redirector:** dead at g through q (11 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 11:03 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
