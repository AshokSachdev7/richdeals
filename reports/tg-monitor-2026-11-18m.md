# TELEGRAM-DEAL-MONITOR tick — 2026-11-18m

The tick read the Telegram Web sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all 13 groups in `data/tg-groups.json`. It resolved the two new shortlinks, deduplicated against `data/tg-multi-seen.json` and the live DB, and verified the candidate on the Amazon PDP in the logged-in tab. Run at about 12:03–12:15 IST.

**Result: 0 deals pushed. The only new single-product post, Symactive boxing gloves "at ₹358", which two groups posted, sells for ₹1,179 on the PDP. All six variants cost ₹1,149–₹1,699 and the page shows no coupon, so the ₹358 price is gone or was a glitch. It was rejected for price drift. Nothing was pushed, so there was nothing to ping. Every CEO-audit check is green and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| Dealzone | 11:34 AM, Symactive PU Boxing Gloves 10 OZ at 358, `link.amazon/B07ECL4tj` → `/dp/B0F93VVSWQ` (source tag `glitzdeal05-21`) | Rejected: PDP price ₹1,179, not ₹358 |
| CoolzTricks | 11:33 AM, "358", `amzn.to/4CoS7L4` → `/dp/B0F93VVSWQ` (source tag `collab-amafhh-21`) | Same product as Dealzone, rejected |

Skipped from the sidebar:

- **SB Loots:** a kurta combo spread over several bittli.in links (multi-product).
- **Rogerkart:** a Lavie handbags category post.
- **Dealdost:** EUCOS tripods, multi-product.
- **Swiggy Dineout:** posts, not product deals.
- **ONLINE SHOPPING DEALS:** already pushed as #16792.
- **Not deals:** our own RichDeals channel row and the iPhone EMI info post.
- **Old posts:** from Oct 29 and Oct 5.

## Verification (same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab)

| Field | B0F93VVSWQ |
|---|---|
| Title | Amazon Brand – Symactive PU Boxing Gloves 10 OZ, Blue |
| Price (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | **₹1,179** (channel claimed ₹358, a ratio of 0.30) |
| M.R.P. | ₹1,999 |
| `#availability` | In stock |
| Add to cart | present |
| Coupon block | empty; no "358" anywhere in the 2 MB HTML |
| Image | `m.media-amazon.com/images/I/614-qQt7zoL._SL1500_.jpg` (landingAsinColor "PU Blue 10 Oz") |

Sibling variants, checked in case the channel linked the wrong one:

| ASIN | Variant | Price |
|---|---|---|
| B0F93TLTGQ | PU Blue 12 Oz | ₹1,169 |
| B0F93TRXRM | PU Red 10 Oz | ₹1,289 |
| B0F93VJQ9F | PU Red 12 Oz | ₹1,149 |
| B0F93PZ1ZY | Leather Black 16 Oz | ₹1,529 |
| B0F93WPYYS | Leather Black 12 Oz | ₹1,699 |

None comes near ₹358, and a 70% gap is far too large to be a clip coupon. **Reject.**

## Push

None. `data/tg-multi-seen.json` grew from 5,352 to 5,355 entries (both shortlinks plus `B0F93VVSWQ`), so the reposts will not be checked again.

## Freshness

- **IndexNow:** skipped, because no deals were pushed.
- **`sitemap.xml`:** ISR 1800s, so nothing to do.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.36s) |
| /offers | 200 (0.47s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.18s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.25s) |
| /llms.txt | 200 (0.66s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 12:15 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,212 = 16,212 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,792 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,792 vs 16,792 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499. The 77% discount may rest on an inflated MRP.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 13:03 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
