# DEAL-INGEST indiafreestuff tick — 2026-11-25e

This tick ran at about 08:53–09:08 IST on 11-25 (it finished at 03:38 UTC).

**Result:** 2 new deals are LIVE: 1 from Amazon and 1 from Flipkart. The bulk push returned HTTP 201 with count 2, and both rows were created (`created:true`), so no slug needed restoring. One duplicate LIVE row (#10860) was price-synced in place from ₹999 to ₹599. IndexNow returned HTTP 200 for 6 URLs. The CEO audit is green.

## Stage 1

`apps/api/scripts/ingest-ifs-proper.mjs` swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids.

| Step | Count |
|---|---|
| Cards discovered | 83 |
| Dropped at stage 1 | 14 |
| Resolved to a single product | 69 |
| Already in the DB | 46 |
| On the 24-hour reject list | 22 |
| Fresh candidates | 11 (with the recovered Flipkart drops below) |

## Drops

| Card | Why |
|---|---|
| 10 Flipkart cards: 6 beds (Honeytouch Luvo, Beaatho, Blumuno, Loom & Needles, Perfect Homes Berlin, Honeytouch Avon), Haier ES15V geyser, Colorbot Knoxx fan, Noise Buds Mini X, Acer Aspire One | `/indiafreestuff/p/` links with a null pid. 9 were recovered this tick by resolving the `itm` link and reading the price in a Playwright tab. The Acer card was not recovered |
| Flipkart Black Friday sale on mobiles | Sale hub, not a product |
| AJIO innerwear "min 40% off" | Category page |
| Amazon "Try it First" ₹1 samples | Programme page, not a product |
| Network / Netplay blazers and Nehru jackets | Multi-product post |

## Pushed

| Deal | Store | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|
| #17382 MAONO PD300X podcast dynamic microphone, XLR + USB (Black) | Amazon B0FJF1Q9Z5 | ₹7,299 | ₹19,998 | 64% | Logged-in PDP tab: price ₹7,299, in stock with add-to-cart |
| #17383 Noise Buds Mini X (2026) | Flipkart ACCHZNGAZKVBP4QQ | ₹999 | ₹2,999 | 67% | Playwright tab, ld+json: ₹999, InStock |

Affiliate links:
- **Amazon:** `/dp/B0FJF1Q9Z5?tag=ashoksachdev-21`.
- **Flipkart:** `/p/itm0c238bb1bf297?pid=ACCHZNGAZKVBP4QQ&affid=djhackraj`.
- No Myntra card or Cuelinks-store card made it through this tick.

Images come from the marketplace CDNs (`m.media-amazon.com` 71e3UYfMEML, `rukmini1.flixcart.com`). Titles and descriptions were rewritten, and the push script checked every ₹ figure and "N% off" against the row before posting.

## Rejects

| Candidate | Reason |
|---|---|
| 8 Flipkart pids: 6 beds (BDDHEPPRRDCYR4ZA, BDDHS3ZPQ5JSKG8W, BDDGZK2P6ZKTP5WU, BDDG9YYWXFSHKWYH, BDDG6RG8ZWHQWHUH, BDDG42TEYMHB7MQE), Haier geyser WGYH22WQZXA7HGMB, Colorbot fan FANHYUGZHQGPEEY5 | PDP price above the card in every case: the cards showed bank-offer prices. The whole brand blocks were rejected |
| Pesto dip B0CN4LV35T | Amazon Now (Kolkata) grocery, location-locked |

All 9 were added to `data/dd-rejected.json` (2,299 keys).

## Duplicates

| Row | Product | Card | DB | Action |
|---|---|---|---|---|
| #10860 PASCIA RGB neon rope light | B0HDPZ94HM | ₹599 | ₹999 | **Price-synced** to ₹599, M.R.P. ₹2,899, 79% off. Title, description and how-to updated to match, and the stale 45% clip-coupon step was removed. Prod Offer now serves `price 599` |
| #17379 | B0FQ5BF4VY | ₹1,800 | ₹1,799 | None (within ₹1) |
| #17355 | B0DQV4Z4TM | ₹1,751 | ₹1,750 | None (within ₹1) |
| #17360 | B0G3HFY8GG | ₹122 | ₹121 | None (within ₹1) |

The other DB hits matched their card prices.

## Push

`POST localhost:4000/admin/deals/bulk` returned **HTTP 201, count 2**, with `created:true` for both rows. Both deal pages and the price-synced #10860 return 200 on prod.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200**, 6 URLs: the 2 new slugs and #10860, plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.14s, `/offers` 0.08s, `/blog` 0.63s, `/sitemap.xml` 0.06s, `/feed.xml` 0.08s, `/api/deals` 0.10s, `/llms.txt` 0.37s | OK |
| DB LIVE vs API total | 16,776 = 16,776 (up 2 from the push) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,383 vs 17,381 | OK. The 2 new rows wait for the external tg-broadcast cron, and the cursor catches up on its own |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-25a` to `d` exist, so this report uses `e` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

No day exceeds the cap of 4.

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** #10860 repriced this tick; otherwise 0 since INDEXNOW 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards still null their pid at stage 1. This tick recovered 9 of 10 in a browser tab and pushed 1; the fix belongs in stage 1.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25h).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
