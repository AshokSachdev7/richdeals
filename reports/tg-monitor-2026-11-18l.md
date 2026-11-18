# TELEGRAM-DEAL-MONITOR tick — 2026-11-18l

The tick read the Telegram Web sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all 13 groups in `data/tg-groups.json`. It resolved the five new shortlinks, deduplicated against `data/tg-multi-seen.json` and the live DB, and verified the two single-product candidates on the Amazon PDP in the logged-in tab. Run at about 10:55–11:07 IST.

**Result: 1 new deal pushed LIVE (#16792, Bio-th blue-light glasses at ₹219). One candidate was rejected as a duplicate listing of #16784, and three shortlinks resolved to category searches. IndexNow returned HTTP 200. Every CEO-audit check is green and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | 10:33 AM, Bio-th glasses at ₹219, `link.amazon/B0aniYt2d` → amzlinks.in → `/gp/product/B0GC4J22D3` (source tag `vivek123034-21` stripped) | **Pushed LIVE as #16792** |
| SB Loots | 10:09 AM, `amazn.lt/jnJlH0lz` → `/dp/B0FC2NLJTF` (source tag `bhavesh015-21`) | Rejected: the same RR Signature Raptor fan as #16784 (Ale Brown, ₹2,699, same image `61FUWhQnMsL`), listed under a second ASIN. Pushing it would create a duplicate page |
| Dealzone | 10:32 AM, Allen Solly, `link.amazon/B0bJiK1G1` | `/s?k=allen+solly`, a category post |
| CoolzTricks | 10:45 AM, PUMA winterwear, `amzn.to/4zw9uXn` and `amzn.to/4knvLmv` | Both resolve to `/s?k=puma+clothing`, a category post |

The rest of the sidebar was already seen or old. The RichDeals channel row is our own, and "LATEST IPHONE RATES" is a Kotak EMI info post, not a deal.

## Verification (same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab)

| Field | B0GC4J22D3 (glasses) | B0FC2NLJTF (fan) |
|---|---|---|
| Title | Bio-th Blue Light Blocking Glasses Small Size, Durable Frame Blue Light Glasses for Daily Digital Work, B-EF-R1 | RR Signature Raptor 1200mm BLDC Ceiling Fan [Ale Brown] |
| Price (`.a-price-whole` in `#corePriceDisplay_desktop_feature_div`) | ₹219 (matches the channel claim) | ₹2,699 |
| M.R.P. | ₹2,999 | ₹6,499 |
| `#availability` | In stock | Only 1 left in stock |
| Add to cart | present | present |
| MOQ popover | absent | absent |
| Image | `m.media-amazon.com/images/I/41xruyyF2qL._SL1000_.jpg` (landingAsinColor "initial") | same image as #16784 → **duplicate, reject** |

## Push

`POST localhost:4000/admin/deals/bulk` → **HTTP 201, count 1, `created:true`**. No slug restore was needed.

| Id | Slug | Price | MRP | Discount |
|---|---|---|---|---|
| #16792 | `bio-th-blue-light-blocking-glasses-small-size-b0gc4j22d3` | ₹219 | ₹2,999 | 93% |

The title reads "Bio-th Blue Light Blocking Glasses, Small Size (B-EF-R1) at ₹219 (93% Off) – Amazon", so the title ₹ equals the numeric price. Affiliate URL: `https://www.amazon.in/dp/B0GC4J22D3?th=1&psc=1&tag=ashoksachdev-21`. The prod page answered 200 straight after the push.

`data/tg-multi-seen.json` grew from 5,345 to 5,352 entries (the five shortlinks plus `B0GC4J22D3` and `B0FC2NLJTF`).

## Freshness

- **IndexNow:** `indexnow-ping.mjs bio-th-blue-light-blocking-glasses-small-size-b0gc4j22d3` → **HTTP 200** for 4 URLs.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design, so a new deal is not expected there.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.66s) |

All probes used `curl -m 30`.

## CEO audit

Run at 11:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,212 = 16,212 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,792 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,791 vs 16,792 | OK. The 1-row gap is #16792, pushed minutes before the audit; the external tg-broadcast cron picks it up on its next run |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 11:07 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **New: RR Raptor fan MRP.** The same fan is listed under B0FC2NLJTF with an MRP of ₹6,499, while #16784 (B0FC2PZ39Z) carries ₹11,990. #16784's 77% discount may rest on an inflated MRP; worth a re-check on its PDP.
- **Old rows with contradictory copy:** rows created before the title-vs-price check may carry a title ₹ or howTo ₹ that differs from `price`. A sweep that diffs them would find the rest.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 12:03 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
