# TELEGRAM-DEAL-MONITOR tick — 2026-11-19a

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. The one Amazon candidate was read with a same-origin fetch of the PDP in the logged-in Amazon tab: `.a-price-whole` in the core price block, `#availability`, the add-to-cart button, the `data-old-hires` image and the M.R.P. from `.basisPrice`. Run at about 23:50–00:10 IST, 11-18 to 11-19.

**Result: 0 new deals; 1 row revived. The only fresh link resolved to an ASIN already in the DB as EXPIRED row #16391. The PDP shows it back in stock at the channel price, so the row was revived and corrected in place with `prisma.deal.update`. The slug did not change, and no bulk push was needed. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on all 8 endpoints, and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| Dealzone | link.amazon/B06R8MUPM → B0CCDJXJF2 | Bluetooth 5.1 neckband, music only | Revived #16391 |
| Rogerkart | fkrt.co/zuFJoP | Urban Barber serum | Skipped: already LIVE as #16874 (the key was missing from the seen list and has been added) |
| INDIAN CHEAP DEALS | link.amazon/B08FsUNwo | LG washing machine | Skipped: already in the seen list (#5035) |
| ONLINE SHOPPING DEALS | — | Arshan kadhai | Skipped: already LIVE as #16882 |
| Dealdost | bitl.in/hTBRN6D | — | Skipped: already in the seen list |
| SB Loots, CoolzTricks, NonStopDeals | — | Amazon brand clothing, Caprese | Skipped: category posts |
| Hidden Loot, IFS Tips | — | Swiggy | Skipped: not a product |

OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 were not in the top 25 sidebar rows. Seen list: 3 keys appended, now 5,418 entries.

## Revived

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16391 | Amazon | B0CCDJXJF2 | Bluetooth Neckband Earphones V5.1, No Mic (Music Only) | ₹197 | null |

- **Verification:** the PDP read ₹197, equal to the channel. It was in stock with add-to-cart, sold by MIC Enterprises, rated 3.3★ from 10 ratings.
- **Status:** EXPIRED → LIVE, `expiresAt` null. A priceHistory row was written, so the Offer gets a fresh priceValidUntil.
- **80% rule:** the M.R.P. of ₹2,499 would mean 92% off, so MRP and discountPct are now null. The old title carried "(92% Off)"; the new title drops it, and the script checked that its ₹ equals `price` before the write.
- **Copy:** the description was rewritten from verified facts: music only with no microphone, Bluetooth 5.1, a 30-minute full charge, the seller, the rating and the stock state.
- **Affiliate:** `https://www.amazon.in/dp/B0CCDJXJF2?th=1&psc=1&tag=ashoksachdev-21`.
- **Image:** `m.media-amazon.com` hi-res (`51gm3y7OtaL`).

## Rejected

None.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the revived slug, **HTTP 200 for 4 URLs** (1 slug plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.72s) |
| /bluetooth-neckband-earphones-v5-1-b0ccdjxjf2 | 200 (0.17s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 00:07 IST on 11-19.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,276 = 16,276 (+1, the revival) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,883 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,883 = 16,883 | OK. Revived rows keep their old id, so the cursor does not re-broadcast them. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK. None recreated. |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3. No day is 0 and none is over the cap of 4. 11-19 is only 7 minutes old; CONTENT-SEO runs at 00:39 IST.

## Still open

- **Local API on :4000 is down:** the background shell was reaped for low memory. Prod (the DO app) is unaffected. The next ingest tick that needs the local admin endpoint must restart it.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure or a discount in the title that breaks the 80% rule (#16391 was fixed this tick).
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapsed on 11-18.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): CONTENT-SEO 00:39, DESIDIME 00:43, SITEMON 00:50, DEAL-INGEST 00:53, TG 01:03, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
