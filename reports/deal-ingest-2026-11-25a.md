# DEAL-INGEST (indiafreestuff) tick — 2026-11-25a

This tick ran at about 00:55–01:25 IST on 11-25 (19:25–19:55 UTC on 11-24). It was run inline per `.claude/agents/deal-ingest.md`.

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids. Every Amazon price was then re-read on the product page in the logged-in Playwright tab, because IFS card prices are often wrong.

**Result:**

- **24 deals were pushed LIVE** (#17351–#17374). Each returned HTTP 201 with `count: 1` and `created: true`, and each slug matched.
- **2 duplicate LIVE rows were price-synced in place:** #4112 and #16917.
- **5 candidates were rejected:** 3 for price drift, plus the Spykar block (2 rows).
- **4 candidates were skipped.**
- **IndexNow returned HTTP 200** for 29 URLs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 85 |
| Resolved to a store URL | 78 |
| Dropped in stage 1 | 7 |
| Fresh after DB dedup | 46 (33 actionable, 13 on the recent-reject list) |
| Duplicates of existing rows | 32 |
| Verified and pushed | 24 |

The 7 stage-1 drops:

- 2 Flipkart `/indiafreestuff/p/` cards (Noise Buds Mini X 2026, Acer Aspire One 2026 Ryzen 5). Stage 1 nulls their pid; this is still open.
- The Flipkart Black Friday hub.
- 3 Ajio hubs.
- The Amazon `/b?node` ₹1 hub.

## Rejected and skipped

| ASIN | Product | Card | Product page | Decision |
|---|---|---|---|---|
| B0BQM23PDT | TIMEX Fria watch | ₹2,997 | ₹3,597 | **Rejected:** drift |
| B0C7R4BRCG | KBS BMW key cover | ₹340 | ₹425 | **Rejected:** drift |
| B0HK65QYFZ | Foot patch | ₹97 | ₹99 | **Rejected:** drift |
| B0CDH152MM | Spykar jeans | — | No price, no add-to-cart | **Rejected** |
| B0CH836DBR | Spykar top | ₹603 | No image | **Rejected** with its Spykar block-mate |
| B0FL7CZ5PD | SYDLHDMI set-top box | — | — | **Skipped:** EU plug |
| B07BMWTY61 | Yuvika Ber Pathar | — | Not fetched | **Skipped** |
| B0BT7VF3HM | Pink Root "Skin Whitening" kit | — | — | **Skipped:** skin-whitening claim |
| B0DFYXMKND | Sanfe glutathione tablets | — | — | **Skipped:** supplement with whitening claims |

The 5 rejects and 3 of the skips (all except Yuvika) were added to `data/dd-rejected.json` with `Date.now()`. It now has 2,284 keys.

## Duplicates (price sync)

| Row | Product | Product page now | Action |
|---|---|---|---|
| #4112 | Pond's Bright Beauty cream with UV filter, 50g | ₹201, M.R.P. ₹375 (46% off) | Price, M.R.P. and discount updated. The howTo step now says ₹201. The title has no price, so it is unchanged. A `priceHistory` row was added |
| #16917 | CG Iraya 5.9L instant water geyser | ₹2,999, M.R.P. ₹7,990 (62% off) | Price, M.R.P. and discount updated. Title, description and howTo were rewritten to ₹2,999. A `priceHistory` row was added |

The other 30 duplicates had card price = DB price, so they were left alone.

## Push

Each row was pushed to `POST /admin/deals/bulk` on the local API (`localhost:4000`), which writes to the prod DB through the tunnel. Before each push, Prisma checked for an existing row by productId or affiliate URL. Status is `live`.

- **Affiliate links:** `https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.
- **Images:** `m.media-amazon.com` only.
- **Copy:** titles and descriptions were written fresh, with no source text.

| ID | ASIN | Product | Price | M.R.P. |
|---|---|---|---|---|
| #17351 | B0F671CKSW | Insta360 Flow 2 foldable AI phone gimbal | ₹5,999 | ₹14,990 |
| #17352 | B0F277CTK6 | Velvet travel neck pillow | ₹349 | — |
| #17353 | B0GZVM4SKQ | Kala Kruti non-stick fry pan, 24 cm | ₹503 | ₹960 |
| #17354 | B0CXDZ6KGR | Philips electric shaver, 3D SkinProtect | ₹2,299 | ₹3,899 |
| #17355 | B0DQV4Z4TM | Philips compact 2 ft 20W LED tubelight | ₹1,750 | ₹4,900 |
| #17356 | B0FKN56VF1 | Tower non-stick dosa tawa, 26 cm | ₹599 | ₹2,099 |
| #17357 | B0D4732QVW | Corslet acrylic colour set, 12 x 12 ml | ₹223 | ₹1,000 |
| #17358 | B0FWR6X9XV | Foodie Puppies cat food bowl | ₹211 | ₹599 |
| #17359 | B07DTJ84DV | Lapgrade battery for Toshiba Satellite M200 | ₹961 | ₹2,600 |
| #17360 | B0G3HFY8GG | LUKER 10W LED batten, 2 ft | ₹121 | ₹290 |
| #17361 | B0D47JLQDD | Auto Pearl metal mini dual-port car charger | ₹592 | ₹1,499 |
| #17362 | B0D46SZD5X | Auto Pearl 2-port car charger + 3-in-1 cable | ₹379 | ₹999 |
| #17363 | B0BDRP299S | Puma unisex Raptor sneakers | ₹1,246 | ₹4,299 |
| #17364 | B0FWRF8DHK | Boldfit Courthaul badminton kit bag | ₹599 | ₹1,699 |
| #17365 | B0H4BDZMCD | AFA athletic body wash, 200 ml | ₹199 | ₹699 |
| #17366 | B0H58N4PDC | CERLINK aluminium action camera mount | ₹358 | — |
| #17367 | B0H6M9XM8J | Lexton Shri Ram Lalla plug-in LED night light | ₹215 | ₹999 |
| #17368 | B0DZXRDYF3 | Boldfit ankle weights, 2 kg x 2 | ₹899 | ₹1,999 |
| #17369 | B0FTVDL4P1 | CERA Ultra Shine toilet cleaner | ₹179 | ₹399 |
| #17370 | B0HMRXL539 | Sonic electric toothbrush, 6 modes, IPX7 | ₹249 | ₹1,299 |
| #17371 | B0HH9DNK6Z | ATOM A118 digital kitchen scale, 10 kg | ₹399 | ₹799 |
| #17372 | B0GY136RJ5 | Jaipur Weaves reversible quilted sofa cover | ₹399 | — |
| #17373 | B0FTSDTTH9 | TNW Moon Kiss liquid blush, Senorita 01 | ₹248 | ₹699 |
| #17374 | B0H6C71JY4 | Gym wrist band with thumb loop | ₹159 | ₹699 |

Sample pages on prod: #17351 returned 200 in 0.15s, #17374 returned 200 in 0.14s, and the repriced #16917 returned 200 in 0.15s.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 29 URLs: the 24 new slugs, the 2 repriced slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.36s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.19s, `/offers` 0.09s, `/blog` 0.53s, `/sitemap.xml` 0.06s, `/feed.xml` 0.09s, `/api/deals` 0.09s, `/llms.txt` 0.36s, all 200 | OK |
| DB LIVE vs API total | 16,767 = 16,767 (up 24 from 16,743) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,374 vs 17,350 | OK. The cursor moved up from 17,345, so the external broadcast is running; the 24 new rows wait for its next run |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | No `deal-ingest-2026-11-25*` existed, so this report uses `a` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 34 rows repriced in the last 24 hours, plus 2 more this tick (#4112, #16917).
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. #17334 has a null M.R.P., and so do 3 rows from this tick (#17352, #17366, #17372), whose product pages show no M.R.P.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards (2 more this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25a).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
