# TELEGRAM-DEAL-MONITOR tick — 2026-11-19w

The 13 groups in `data/tg-groups.json` were read with one `browser_evaluate` over the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the Playwright richDeals profile. Shortlinks were resolved with curl. `link.amazon` needed a full GET with a Chrome UA, because a HEAD request echoed the shortlink back unchanged. Candidates were deduped against `data/tg-multi-seen.json` and the live DB productId. Prices were checked on the PDP in the logged-in Amazon tab: price from `#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button. Run at about 22:01–22:10 IST (16:31–16:40 UTC).

**Result: 0 new deals pushed. 2 candidates were rejected, and 1 dedup hit on a LIVE row was repriced (#5910, ₹189 → ₹183). IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 7 of 7 endpoints and on the repriced page.**

## Candidates

| Group | Link | Product | Channel price | Outcome |
|---|---|---|---|---|
| SB Loots | amazn.lt/Qf1VYYKM → B0GNMSVRPT | 36-piece stainless steel dinner set | ₹600 plus a 40% coupon | Rejected: the PDP has no price and no add-to-cart (no buy box) |
| CoolzTricks | amzn.to/4iM71TO → B0HDCJG5ZH | Fastrack 9 to Fine quartz analog watch, Green Black | ₹1,115 plus a 10% coupon | Rejected: the PDP reads ₹3,194 against an M.R.P. of ₹3,195, nowhere near the channel price |
| Dealzone | link.amazon/B0bo0WjLc → B0F4R4BG5G | Dabur Red Gel toothpaste 600g (150g x 4) | ₹173 (Subscribe & Save) | Dedup hit on LIVE #5910 → repriced to ₹183 |

The other tracked groups' newest posts were already in the seen array: Dealdost (La-Fetch hoodies), ONLINE SHOPPING DEALS (USPA polo), Rogerkart, INDIAN CHEAP DEALS and NonStopDeals. LATEST IPHONE RATES is not a tracked deal group. Hidden Loot and IndiaFreeStuff Tips showed Swiggy Dineout posts, and the RichDeals channel is our own.

## Pushed

None.

## Repriced

| Id | Deal | Was | Now | Note |
|---|---|---|---|---|
| 5910 | Dabur Red Gel toothpaste 600g (150g x 4), B0F4R4BG5G | ₹189, M.R.P. ₹492, 62% off | ₹183, M.R.P. ₹540, 66% off | In stock. The channel's ₹173 is the Subscribe & Save price, so the one-time PDP price was used. |

The title now reads `Dabur Red Gel Toothpaste 600g (150g x 4) at ₹183 (66% Off) – Amazon`. The description's price paragraph was rewritten to the new price and M.R.P., and the stale per-100 g rate and rating sentence were dropped. The validators passed: every ₹ in the title equals the price, every ₹ in the description equals the price or the M.R.P., and the discount is under 80%. The row stays LIVE, and the slug was not touched.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 4 URLs: the #5910 slug and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 5,650 → 5,655 (link codes and resolved ASINs; one was already present) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.62s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.87s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.35s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.43s) |
| Repriced page #5910 | 200 (0.28s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 22:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,359 = 16,359 | OK (no change from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,968 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,968 = 16,968 | OK |
| Local API on :4000 | Up (reprice update succeeded) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** 0 of 92 at DEAL-INGEST 19k.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967.
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-19 22:14 |
| DESIDIME | 11-19 22:43 |
| DEAL-INGEST | 11-19 22:53 |
| TG | 11-19 23:01 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
