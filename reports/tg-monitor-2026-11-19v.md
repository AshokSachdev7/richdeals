# TELEGRAM-DEAL-MONITOR tick — 2026-11-19v

The 13 groups in `data/tg-groups.json` were read with one `browser_evaluate` over the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the Playwright richDeals profile. Shortlinks were resolved with curl. Candidates were deduped against `data/tg-multi-seen.json` and the live DB productId. Amazon prices were checked on the PDP in the logged-in Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button, image from the `landingAsinColor` hiRes). The Shopsy product was read with curl and a browser UA: Shopsy serves no ld+json, so the price came from the `PRODUCT_PAGE_SUMMARY_V2_PRICING` block (`finalPrice` plus `discountAmount`) and stock from the absence of a Sold Out widget. Run at about 21:01–21:12 IST (15:31–15:42 UTC).

**Result: 3 new deals pushed LIVE (HTTP 201, count 3, all `created:true`, #16966–#16968). One link was skipped as a bundle. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 7 of 7 endpoints and on all 3 new pages at the first probe.**

## Candidates

| Group | Link | Product | Channel price | Outcome |
|---|---|---|---|---|
| CoolzTricks | amzn.to/4ALeHMk → B0DXFQXD68 | Yogabar organic pumpkin seeds 1kg (500g x 2) | ₹659 | Pushed (#16966) |
| ONLINE SHOPPING DEALS | link.amazon/B0fI4zRXn → B0GSW4ZTRJ | U.S. Polo Assn. men's slim-fit polo, Beige | ₹1,181 | Pushed (#16967) |
| SB Loots | bittli.in/S7z7S0zD → Shopsy KITHEHKM4FZPCVEY | fizo SHOOTER plastic cricket kit for kids | none in post | Pushed (#16968) after the PDP read |
| Dealdost | bitIy.in/W24LAXi → la-fetch.com bundle collection | Two-hoodie bundle collection | — | Skipped: a multi-product collection page, not a single product |

The following were skipped: LATEST IPHONE RATES (a bitli.pe link from an untracked group), the already-seen posts from Dealzone (Puma), Rogerkart (Dr Batra's), INDIAN CHEAP DEALS (LG washing machine) and NonStopDeals (Caprese), Hidden Loot and IndiaFreeStuff Tips (Swiggy Dineout), and personal and bot chats.

## Pushed

| Id | Deal | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|
| 16966 | Yogabar organic pumpkin seeds 1kg, 500g x 2 (B0DXFQXD68) | ₹659 | ₹1,310 | 50% | Buy-one-get-one bundle listing, 1000 g option |
| 16967 | U.S. Polo Assn. men's solid slim-fit polo, Beige (B0GSW4ZTRJ) | ₹1,181 | ₹2,625 | 55% | Checked in size M. Only 1 left in stock. |
| 16968 | fizo SHOOTER hard-plastic cricket kit for kids 4–8 (Shopsy KITHEHKM4FZPCVEY) | ₹269 | ₹999 | 73% | M.R.P. = price + Shopsy's stated ₹730 saving. Cuelinks link. |

Both Amazon PDP prices matched the channel prices exactly. The Amazon links are `/dp/ASIN` with `tag=ashoksachdev-21`, and the Shopsy link goes through Cuelinks to the clean `/product/p/itme?pid=` URL. Images are from `m.media-amazon.com` and the Flipkart `rukminim3` CDN (checked 200). Titles and descriptions were written fresh. The validators passed: every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., discountPct is under 80, and each title carries its `(N% Off)`. All 3 rows came back `created:true`, so no slug restore was needed.

## Repriced

None. No dedup hit pointed at a LIVE row this tick.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 6 URLs: the 3 new slugs and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |
| `tg-multi-seen.json` | 5,642 → 5,650 (5 link codes, 2 ASINs and the Shopsy pid) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.40s) |
| New pages #16966–#16968 | 200 on all 3, first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 21:12 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,359 = 16,359 | OK (+3 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,968 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,965 vs 16,968 | Behind by this tick's 3 pushes only. It caught up on DESIDIME 19k's batch, so the external cron is working. |
| Local API on :4000 | Up (bulk push 201) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** 0 of 92 at DEAL-INGEST 19k after the brief 19j revival.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, and now **#16967** (USPA polo, 1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-19 21:14 |
| TG | 11-19 22:01 |
| DESIDIME | 11-19 22:43 |
| DEAL-INGEST | 11-19 22:53 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
