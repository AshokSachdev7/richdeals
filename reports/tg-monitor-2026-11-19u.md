# TELEGRAM-DEAL-MONITOR tick — 2026-11-19u

The 13 groups in `data/tg-groups.json` were read with one `browser_evaluate` over the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the Playwright richDeals profile. Shortlinks were resolved with curl, and the source channel's Amazon tag (`vivek123034-21`) was stripped to a clean `/dp/ASIN`. Candidates were deduped against `data/tg-multi-seen.json` and the live DB productId. The price was checked on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button, image from the `landingAsinColor` hiRes). Run at about 20:01–20:04 IST (14:31–14:34 UTC).

**Result: 1 new deal pushed LIVE (HTTP 201, count 1, `created:true`, #16953). Nothing was rejected. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 7 of 7 endpoints and on the new page at the first probe.**

## Candidates

| Group | Link | Product | Channel price | Outcome |
|---|---|---|---|---|
| ONLINE SHOPPING DEALS | link.amazon/B0aScC9YB → B0DGGNHYY8 | Urbane Home foldable non-woven storage boxes, pack of 6, white | ₹410 | Pushed (#16953) |
| Rogerkart | J0jKwh | Dr Batra's hair colour (Myntra) | — | Already seen |
| Dealdost | hTBRN6D | La-Fetch perfume bundle | — | Already seen |

The following were skipped as category, sale or non-deal posts: SB Loots (branded footwear up to 80%, three amazn.lt links), CoolzTricks (Axe on Myntra, up to 80%), Dealzone (Puma jackets), INDIAN CHEAP DEALS (LG washing machine sale), NonStopDeals (Caprese, up to 90%), LATEST IPHONE RATES (a bitli.pe link), Hidden Loot and IndiaFreeStuff Tips (Swiggy Dineout), plus personal and bot chats. Their link codes were added to the seen array so the next tick does not re-check them.

## Pushed

| Id | Deal | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|
| 16953 | Urbane Home pack of 6 foldable non-woven storage boxes, white (B0DGGNHYY8) | ₹410 | none | none | The listed ₹6,999 implied 94% off, so the M.R.P. was nulled as inflated. Only 1 left in stock. |

The PDP price matched the channel price exactly. The link is `/dp/ASIN` with `tag=ashoksachdev-21`, and the image is from `m.media-amazon.com` (single White variant). The title and description were written fresh. The validators passed after one correction: the first draft said "under ₹70 a box", which the description check rejected because ₹70 is neither the price nor the M.R.P., so the phrase was removed. Every ₹ in the title and howTo now equals the price, and with no M.R.P. the discountPct is null and the title has no "% Off". The row came back `created:true`, so no slug restore was needed.

## Repriced

None. No dedup hit pointed at a LIVE row this tick.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 4 URLs: the new slug and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 5,635 → 5,642 (the link code, the ASIN and the skipped posts' codes) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.17s) |
| /offers | 200 (0.08s) |
| /blog | 200 (0.55s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.37s) |
| New page #16953 | 200 (0.19s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 20:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,344 = 16,344 | OK (+1 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,953 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,952 vs 16,953 | Behind by this tick's push only. The external cron caught up on TG 19t, so it is working. |
| Local API on :4000 | Up (bulk push 201) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** partial revival, 7 of 92 at DEAL-INGEST 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, and now **#16953** (Urbane storage boxes, M.R.P. nulled at push).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, and now **#16953** (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-19 20:14 |
| DESIDIME | 11-19 20:43 |
| DEAL-INGEST | 11-19 20:53 |
| TG | 11-19 21:01 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
