# TELEGRAM-DEAL-MONITOR tick — 2026-11-19t

The 13 groups in `data/tg-groups.json` were read with one `browser_evaluate` over the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the Playwright richDeals profile. Shortlinks were resolved with curl, and the other channels' Amazon tags (`vivek123034-21`, `collab-amafhh-21`) were stripped to a clean `/dp/ASIN`. Candidates were deduped against `data/tg-multi-seen.json` and the live DB productId. Each price was checked on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button, image from the `landingAsinColor` hiRes). Run at about 19:08–19:15 IST (13:38–13:45 UTC), straight after INDEXNOW 19d.

**Result: 2 new deals pushed LIVE (HTTP 201, count 2, both `created:true`, #16951–#16952). Nothing was rejected. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 7 of 7 endpoints and on both new pages at the first probe.**

## Candidates

| Group | Link | Product | Channel price | Outcome |
|---|---|---|---|---|
| CoolzTricks | amzn.to/3WTniOf → B0H8S1K7XM | Bigmuscles Nutrition Clean Yeast Protein Isolate, 1 kg, unflavoured | ₹1,599 | Pushed (#16951) |
| ONLINE SHOPPING DEALS | link.amazon/B06tZRwbf → B0F3TQ9655 | Acer Swift 2-in-1 convertible 15.6" backpack, 11.5 L, tan | ₹798 | Pushed (#16952) |
| Rogerkart | J0jKwh | Dr Batra's hair colour (Myntra) | — | Already seen |
| Dealdost | hTBRN6D | La-Fetch perfume bundle | — | Already seen |
| — | B06hVPLfp → B0GYS218W3 | Nivia String 2.0 backpack | ₹89 | Already seen |
| — | B00X6qBzR → B01M0GS016 | Van Heusen brief | ₹99 | Already seen |

The following were skipped as category, sale or non-deal posts: SB Loots (AXE on Myntra, up to 75%), Dealzone (Puma jackets), INDIAN CHEAP DEALS (LG washing machine sale), NonStopDeals (Caprese, up to 90%), LATEST IPHONE RATES (a bitli.pe link), Hidden Loot and IndiaFreeStuff Tips (Swiggy Dineout), plus personal and bot chats.

## Pushed

| Id | Deal | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|
| 16951 | Bigmuscles Nutrition Clean Yeast Protein Isolate 1 kg, unflavoured (B0H8S1K7XM) | ₹1,599 | ₹2,449 | 35% | In stock |
| 16952 | Acer Swift 2-in-1 convertible 15.6" laptop backpack, 11.5 L, tan (B0F3TQ9655) | ₹798 | none | none | The listed ₹4,999 implied 84% off, so the M.R.P. was nulled as inflated |

Both PDP prices matched the channel price exactly. Both links are `/dp/ASIN` with `tag=ashoksachdev-21`, and both images are from `m.media-amazon.com` (variants Unflavoured and TAN). Titles and descriptions were written fresh. The validators passed: every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., discountPct is under 80, and the row with no M.R.P. has a null discountPct and no "% Off" in the title. Both rows came back `created:true`, so no slug restore was needed.

## Repriced

None. No dedup hit pointed at a LIVE row this tick.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 5 URLs: 2 new slugs and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 5,631 → 5,635 (the 2 link codes plus the 2 ASINs) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.98s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.55s) |
| New pages #16951–#16952 | 200 on both (0.18s, 0.16s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 19:15 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,343 | OK (+2 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,952 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,950 vs 16,952 | Behind by this tick's 2 pushes only. It has already caught up on DEAL-INGEST 19j, so the external cron is working. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** partial revival, 7 of 92 at DEAL-INGEST 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, and now **#16952** (Acer backpack, M.R.P. nulled at push).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946.
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-19 19:14 (queued) |
| TG | 11-19 20:01 |
| DESIDIME | 11-19 20:43 |
| DEAL-INGEST | 11-19 20:53 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
