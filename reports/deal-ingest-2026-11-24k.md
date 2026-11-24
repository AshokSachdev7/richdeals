# DEAL-INGEST (indiafreestuff) tick — 2026-11-24k

This tick ran at about 20:50–21:10 IST on 11-24, inline. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals`, resolved each base64 `?rto=` Buy Now id to the real store URL, and checked every product for duplicates by productId against the live DB. Every fresh Amazon candidate was then read on the product page in the logged-in Playwright Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image keyed by `landingAsinColor`. IFS card prices were never trusted on their own.

**Result:**

- **15 new deals were pushed LIVE (#17314–#17328)**, all Amazon. Every call returned HTTP 201 with count 1 and `created:true`, and every slug was confirmed on read-back.
- **7 candidates were rejected** at the product-page check: 6 on price drift and 1 with no buy box.
- **4 duplicate LIVE rows were repriced in place** (#16556, #5381, #15349, #628). The other duplicates were within ±₹1 or are already EXPIRED.
- **IndexNow returned HTTP 200** for 22 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards read (`/deals` + `/deals/superdeals`) | 106 |
| Items after stage 1 | 97 |
| Dropped at stage 1 | 9 |
| Already in the DB | 55 |
| Fresh | 42 |
| Rejected in the last 24h (skipped) | 20 |
| Verified on the product page | 22 |

The 9 stage-1 drops:

- 7 Flipkart `/indiafreestuff/p/` cards with no resolvable pid: Acer Aspire One, Domvique border, Parachute rosemary water, Bzilo monks, boAt Stone EdgeBass, Pureit Wave Prime and Lloyd 2T AC.
- 1 Flipkart Black Friday sale hub.
- 1 Amazon "try it first" samples node.

## Fresh candidates (rejected)

| ASIN | Product | Live read | Reason |
|---|---|---|---|
| B0HBQHXC7F | Zebronics mouse pad | No buy box | Rejected |
| B07KK8C2YD | MAA silver Ganesha | ₹14,725 vs card ₹14,430 | Drift (the card price is post-coupon) |
| B0HDNMYXMN | OPPO A6c | ₹16,999 vs ₹15,249 | Drift |
| B0GYD83B13 | iFFALCON 65" | ₹49,999 vs ₹44,499 | Drift. Repeat: also rejected in tg-monitor 11-24t |
| B0GHNZTD24 | Philips candle bulb | ₹432 vs ₹277 | Drift |
| B0BTYVV6TD | Samsung S23 Ultra | ₹83,999 vs ₹81,900 | Drift |
| B0GVK5Q87C | TCL 43" QLED | ₹34,990 vs ₹30,865 | Drift |

All 7 were added to `data/dd-rejected.json` with `Date.now()`. The file now has 2,258 keys.

## Duplicates (price sync)

Each repriced row got new price, M.R.P., discount, title and description, plus a `priceHistory` row. The slugs were not changed.

| Row | Product | Old | New |
|---|---|---|---|
| #16556 | Lakme compact | ₹440 / ₹965 / 54% | ₹590 / ₹879 / 33% |
| #5381 | Presto phenyl 5L | ₹159 / ₹600 / 74% | ₹229 / ₹800 / 71% (howTo updated too) |
| #15349 | Cetaphil 59ml | ₹150 / 62% | ₹248 / ₹399 / 38% |
| #628 | Halonix 20W | ₹170 / 69% | ₹199 / ₹550 / 64% |

Left unchanged:

- #17241 Premier tissue: ₹259, matches.
- #16772 MANQ blazer: no buy box. Added to the no-buy-box watch list.
- #2053 TCL 32": already EXPIRED, still no buy box.
- The other 47 duplicates are LIVE and within ±₹1.

## Push

`/admin/deals/bulk` was called on localhost, one deal per call, which writes to prod through the tunnel. Each call returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the price and the slug that was sent. Titles and descriptions are original rewrites. Every affiliate link is Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Images come from `m.media-amazon.com`.

| Row | Slug | Price | M.R.P. |
|---|---|---|---|
| #17314 | `men-s-lightweight-slippers-flip-flops-b0hjz4wkz8` | ₹399 | null (≥80% rule) |
| #17315 | `lit-replacement-fan-remote-for-atomberg-renesa-elite-halo-smart-and-enzel-b0h3t2p46n` | ₹219 | ₹799 |
| #17316 | `leatherkraft-men-s-lk-501-casual-loafers-b0f354gnfp` | ₹357 | null (86% off) |
| #17317 | `tizum-tablet-stand-with-360-degree-rotation-b0hs7k4j7l` | ₹299 | ₹1,299 |
| #17318 | `lee-cooper-chronograph-men-s-watch-lc07254-350-b0bn77k1x1` | ₹3,419 | ₹16,950 (79.8%, kept) |
| #17319 | `air-tight-kitchen-storage-containers-set-b09xk7r67j` | ₹565 | ₹1,999 |
| #17320 | `cortina-380-gsm-microfiber-bath-towel-70x140-cm-b0ghfcgyhm` | ₹169 | null (88% off) |
| #17321 | `agaro-elite-corded-lint-remover-b0gxpd559w` | ₹399 | ₹699 |
| #17322 | `goldmedal-thor-30w-b22-led-bulb-b0cgm3ltgf` | ₹236 | ₹600 |
| #17323 | `slovic-doorway-pull-up-bar-100-kg-capacity-b0b6nsdr2h` | ₹499 | ₹1,499 |
| #17324 | `lifelong-triply-stainless-steel-deep-kadai-2-8l-24-cm-b0bx9xr8wj` | ₹899 | ₹2,400 |
| #17325 | `wali-single-monitor-arm-for-13-to-32-inch-screens-b0779jsrh5` | ₹2,764 | ₹6,662 |
| #17326 | `syska-srl-9w-b22-led-bulb-pack-of-4-b071sfy5pp` | ₹215 | ₹596 |
| #17327 | `foodie-puppies-biodegradable-dog-poop-bags-135-bags-b0brvbxq97` | ₹299 | ₹897 |
| #17328 | `ant-esports-mk1001-v2-one-hand-gaming-keyboard-b0cbvdm4d7` | ₹449 | ₹799 |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 22 URLs: the 15 new slugs, the 4 repriced slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| New and repriced pages | All 19 return 200 on prod (0.13–0.37s) |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.36s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.15s, `/offers` 0.10s, `/blog` 0.54s, `/sitemap.xml` 0.07s, `/feed.xml` 0.11s, `/api/deals` 0.09s, `/llms.txt` 0.36s, all 200 | OK |
| DB LIVE vs API total | 16,721 = 16,721 (16,706 at desidime 11-24k, = +15) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,328 vs 17,313 | OK. The external broadcast cron will pick up the 15 new rows |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a` to `-24j` already existed, so this report uses `k` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-12 | 3 |
| 11-13 to 11-15 | 2 each |
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **IFS yield:** 15 pushed of 22 verified this tick; 20 fresh items were skipped as recent rejects and 9 dropped at stage 1.
- **IFS card drift:** 6 of 22 verified candidates had a stale or coupon/bank-net price on the card.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 26 rows repriced today (22 earlier plus 4 this tick).
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY), ASUS VA259HGA (B0F9KBZ8W3) and now iFFALCON 65" (B0GYD83B13).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215 and #17288.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and now #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards (7 more this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-24t).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
