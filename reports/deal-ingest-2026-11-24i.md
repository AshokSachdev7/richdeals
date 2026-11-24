# DEAL-INGEST indiafreestuff tick — 2026-11-24i

This tick ran at about 16:55–17:10 IST on 11-24. It was run inline. Stage 1 was `apps/api/scripts/ingest-ifs-proper.mjs`, sweeping both `/deals` and `/deals/superdeals` and resolving the base64 `?rto=` Buy Now ids to real store URLs. Every Amazon candidate was then verified on its product page with a same-origin fetch in the logged-in Amazon tab of the Playwright MCP (richDeals profile): `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. IFS card prices were never trusted. Telegram (tab 0) was not touched.

**Result:**

- **The IFS redirector resolved 94 of 103 ids.** That is far better than 7 of 99 on 11-18.
- **25 new deals were pushed LIVE (#17246 to #17270).** Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **1 duplicate LIVE row was repriced in place (#15877).** It kept its slug.
- **32 candidates were rejected.** The reasons were price drift, a drifting appliance and laptop block (rejected whole), no add-to-cart, and pre-fetch filters.
- **IndexNow returned HTTP 200** for 29 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| `?rto=` ids resolved (`/deals` + `/deals/superdeals`) | 94 of 103 |
| Already in the DB (dedup by productId) | 37 |
| Fresh Amazon candidates checked on the product page | 57 |
| Pushed | 25 |
| Rejected | 32 |

## Rejections

| Reason | ASINs (card → live) |
|---|---|
| Price drift | B0H7MGMP1Q (₹94 → ₹99), B0DSSYJWWS (₹111 → ₹349) |
| Appliance and laptop block, rejected whole (every item drifted) | B08JYPDFXV (₹46,490 → ₹49,990), B0C7HHQQ6F (₹35,990 → ₹36,990), B0GWQ68TKF (₹34,490 → ₹39,990), B0H3KBFT59 (₹13,999 → ₹14,999), B0GHR4P5KV (₹32,490 → ₹35,990), B0GQTZ14ML (₹65,365 → ₹69,990), B0HK3BFFKM (₹62,740 → ₹67,990) |
| No add-to-cart | B0FCSHF88J, B0GY1LVGMM, B07QDDDMHX, B08PZ81NKP, B0GHQVNMKQ, B0B12PL89Q, B0C23L29Q4 |
| Rejected before fetch | B0HLLFGNDT (vehicle), B0GVF97BGG ("Mrp Error" card), B09T3F5FBZ (minimum buy 2), B0FWBYSX92 (same product as ATORSE #17226) |
| Repeat drift (already rejected, still drifting) | B0DXBVYBFV (₹287 → ₹449), B09B6ZBJ4R (₹569 → ₹599), B0948Q646C (₹129 → ₹133), B0F3BH5HWJ (₹181 → ₹190), B0HL4K6Q2K (₹341 → ₹359), B0HKZTF8CW (₹284 → ₹299), B0HHS5PYJJ (₹94,740 → ₹99,990), B0FYNQ567Q (₹283 → ₹289), B0H99FTPDR (₹10,150 → ₹12,999), B08LBLHVK7 (₹25,190 → ₹27,190), B0F9KBZ8W3 (₹9,000 → ₹9,999), B0H99ZZCFB (₹3,960 → ₹4,399) |

All 32 were written to `data/dd-rejected.json` with `Date.now()` timestamps. 27 were new keys and 5 were refreshed. The file now has 2,225 keys.

## Duplicates (price sync)

| Row | Product | DB | Live | Action |
|---|---|---|---|---|
| #15877 | Orient Electric Instaflo Neo 5.9L instant water heater (B0G3GRQMC4) | ₹2,999, M.R.P. ₹6,490, 54% off | ₹4,199, M.R.P. ₹7,490 | **Repriced** to ₹4,199 / ₹7,490 / 44% off. Title and description rewritten to the new figures |
| #17241, #17168, #9011 | — | — | Matches | No change |
| 33 other duplicates | — | — | Matches | No change |

The reprice used `prisma.deal.update` plus a `priceHistory` row, because a bulk push matches on productId and would rewrite the slug.

## Push

`/admin/deals/bulk` was called once per new item on localhost, which writes to prod through the tunnel. All 25 returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent. Every row uses `https://www.amazon.in/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21` and an `m.media-amazon.com` image. Titles and descriptions are original rewrites.

| Row | ASIN | Product | Price / M.R.P. |
|---|---|---|---|
| #17246 | B0H1V7TJYR | Rainbow kids raincoat with hood | ₹309 / ₹1,499 |
| #17247 | B0H66THSP6 | Kundi iron plant stand | ₹359 / ₹1,499 |
| #17248 | B0FN879SMN | Treo by Milton Clarisma 1L glass bottle | ₹248 / ₹495 |
| #17249 | B0D8Z1VP1D | JGD P1 wireless earphones | ₹229 / ₹999 |
| #17250 | B0G6DWH1XF | Amazon Basics EVA foam floor mat, 16 tiles | ₹2,139 / ₹5,200 |
| #17251 | B0HHMS4RYV | QNIM men's bomber jacket | ₹613 / ₹4,999 |
| #17252 | B0DCRZD67G | Tianle DisplayPort to HDMI cable | ₹299 / ₹1,999 |
| #17253 | B0BRVTBGLS | Dime Store foldable wall-mounted TV unit | ₹1,012 / ₹3,499 |
| #17254 | B0FSR4XQT4 | Harcos neoprene ankle and wrist weights | ₹169 / ₹349 |
| #17255 | B0D14H27S9 | KRISHYAM metal cloth drying stand | ₹999 / ₹2,499 |
| #17256 | B0FH1M2CTY | OhO Bluetooth audio sunglasses | ₹2,299 / ₹7,688 |
| #17257 | B0H3Q2CMLC | PowerVolt 101 10000mAh power bank | ₹699 / ₹2,999 |
| #17258 | B0D63LQ3FS | Etiquette Art floating cube wall shelves | ₹581 / ₹1,999 |
| #17259 | B0GKXXLJLP | Kratos 20W USB-C charger | ₹599 / ₹2,399 |
| #17260 | B0DH8DTWJQ | Elfora 360° rotating mobile stand | ₹249 / ₹999 |
| #17261 | B0GPR6JLVT | Gleva cream matte lipstick | ₹113 / ₹349 |
| #17262 | B0C241Q6ZG | Wipro Garnet 8W round LED downlight | ₹848 / ₹2,100 |
| #17263 | B0FDGGWST2 | JK Vision 2MP AHD dome CCTV camera | ₹1,157 / ₹3,000 |
| #17264 | B0GMWJ9CBK | Lymphatic contour face massage brush | ₹104 / ₹499 |
| #17265 | B0962LY4RW | Fashion Colour liquid concealer | ₹97 / ₹350 |
| #17266 | B0CRSW6YXZ | FOLX FAB108 Apple Watch case | ₹88 / ₹1,999 |
| #17267 | B0F2N56Q8Y | CabONE Lite 0.75 sq mm house wire, 90m | ₹321 / ₹1,040 |
| #17268 | B0FZKJ6GZ5 | GLUN baby bibs, pack of 12 | ₹79 / ₹699 |
| #17269 | B0F5Q1JNCK | Amazon Basics 3L pet water fountain | ₹769 / ₹4,999 |
| #17270 | B0FJRL843J | Amazon Basics two-seater sofa cover | ₹206 / ₹1,999 |

Spot checks on prod all returned 200 in 0.14–0.21s: #17246, #17263, #17270 and the repriced #15877.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 29 URLs: the 26 slugs (25 new + #15877), plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.36s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.05–0.85s. Slowest: `/blog` (0.85s) | OK |
| DB LIVE vs API total | 16,663 = 16,663 (16,638 at desidime 11-24i, = +25) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,270 vs 17,245 | OK. The external broadcast cron will pick up this batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24h` already existed, so this report uses `i` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** 21 rows repriced today, including #15877 in this tick.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3, again this tick).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 25 of 57 fresh candidates survived verification this tick. The card prices on the appliance and laptop block were stale across the board.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215.
- **No buy box:** #7259, #12963, #14154, #13938 and #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick used only the Amazon and Flipkart tabs and did not touch Telegram. It did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
