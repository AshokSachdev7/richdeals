# DEAL-INGEST indiafreestuff tick — 2026-11-24j

This tick ran at about 18:53–19:10 IST on 11-24. It was run inline. Stage 1 was `apps/api/scripts/ingest-ifs-proper.mjs` over both `/deals` and `/deals/superdeals`. Each base64 `?rto=` Buy Now id was resolved to the real store URL. Amazon candidates were verified on the product page in the logged-in Amazon tab of the Playwright MCP (richDeals profile): price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. Telegram (tab 0) was not touched.

**Result:**

- **27 new deals were pushed LIVE (#17281 to #17307)**, all Amazon. Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **40 duplicates were checked, and none needed a reprice.**
- **23 fresh candidates were rejected**: 12 before the product-page read and 11 on it.
- **IndexNow returned HTTP 200** for 30 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards (`/deals` + `/deals/superdeals`) | 97 |
| Resolved to a product | 90 |
| Dropped in stage 1 | 7: 5 Flipkart `/indiafreestuff/p/` cards, the Flipkart Black Friday store page, the Amazon samples page (`/b?node=`) |
| Already in the DB (dedup by productId) | 40 |
| Fresh | 50 |

The redirector is still working (see deal-ingest 11-24i). The cap on yield is now price drift on the product page, not resolution.

## Rejected candidates

Before the product-page read (12):

- 9 had already been rejected in the last 24h (`data/dd-rejected.json`).
- 2 were "Min Buy 2" offers: B0G44C59R2 and B00LO6WCFA.
- 1 was an assorted Hot Wheels pack priced at M.R.P.: B0HJD59MHG.

On the product-page read (11):

| ASIN | Product | Card | Live | Reason |
|---|---|---|---|---|
| B0HPYF14R8 | — | ₹260 | ₹269 | Drift |
| B0CZXGTSZY | Goldmedal MCB | — | — | No buy box |
| B0H25XC647 | Samsung TV | ₹91,240 | ₹92,490 | Drift |
| B0FV2XDGRH | — | ₹284 | ₹299 | Drift |
| B0H8HVWHGC | — | ₹94 | ₹99 | Drift |
| B0BW5P7PND | MSI monitor | — | — | No buy box |
| B098MQXDN2 | — | ₹118 | ₹124 | Drift |
| B0H5VWNMJL | — | ₹151 | ₹155 | Drift |
| B0HKKDBVFQ | — | ₹199 | ₹299 | Drift |
| B0F6CKMBJT | — | ₹8,489 | ₹10,489 | Drift |
| B0F4WZWKSL | Hisense TV | — | — | No buy box |

All 14 new rejects (the 11 above, the 2 "Min Buy 2" and the Hot Wheels pack) were written to `data/dd-rejected.json` with `Date.now()` timestamps. The file now has 2,247 keys.

## Duplicates (price sync)

| Row | DB | Live | Action |
|---|---|---|---|
| #17272 | ₹9,499 | ₹9,499 (card said ₹8,999) | No change. The card was wrong, not the row |
| #17241 | ₹259 | ₹259 | No change |
| #8522 | ₹569 | ₹569 | No change |
| #13253 | ₹487 | ₹487 | No change |
| #17280 | ₹975 | ₹975 | No change |
| #2053 (TCL TV, B0DZHMX6D3) | — | No buy box | Stays EXPIRED |

The other 34 duplicates were within ±₹1 of the live price.

## Push

`/admin/deals/bulk` was called once per item on localhost, which writes to prod through the tunnel. All 27 returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent. Titles and descriptions are original rewrites. Every affiliate link is `https://www.amazon.in/dp/{ASIN}?th=1&psc=1&tag=ashoksachdev-21`, and every image is from `m.media-amazon.com`.

| Row | Slug | Price |
|---|---|---|
| #17281 | `max-balloon-arch-strip-kit-5m-b0h2dv9hq3` | ₹113 |
| #17282 | `popwings-women-s-hooded-sweatshirt-with-pocket-b0cm99lgc1` | ₹199 |
| #17283 | `noble-monk-men-s-formal-trousers-b0hkspzzp2` | ₹299 |
| #17284 | `noble-monk-men-s-polo-t-shirt-b0d93p1hyd` | ₹200 |
| #17285 | `mofna-stainless-steel-open-dustbin-b07bwjsxtf` | ₹575 |
| #17286 | `marshmallow-printed-polar-fleece-double-blanket-90x85-b0hcvvpprj` | ₹349 |
| #17287 | `e-cosmos-large-silicone-dish-drying-mat-b0gm7n17xy` | ₹289 |
| #17288 | `smowkly-unisex-winter-cap-b0hqnrhhb5` | ₹398 |
| #17289 | `vagary-round-car-horn-set-of-2-b09718cx4z` | ₹259 |
| #17290 | `zealsound-rgb-gaming-usb-microphone-b0dw8ntcb3` | ₹2,799 |
| #17291 | `atomberg-renesa-prime-crest-900mm-bldc-ceiling-fan-with-regulator-b0hhf6qwwv` | ₹3,599 |
| #17292 | `led-motion-sensor-wall-light-for-indoor-and-outdoor-b09b58j839` | ₹265 |
| #17293 | `aadhik-silicone-air-fryer-liners-pack-of-2-b0cyhdmz5k` | ₹289 |
| #17294 | `la-french-eleganto-women-s-perfume-100ml-edp-b0fcbrlmcr` | ₹400 |
| #17295 | `daniel-hechter-paris-corvisart-men-s-chronograph-watch-b0gkvlqrf3` | ₹1,699 |
| #17296 | `havells-coral-1m-fan-regulator-b00xji01oa` | ₹321 |
| #17297 | `ant-esports-pbt-keycaps-7-keys-with-puller-b0fv8nqsqh` | ₹299 |
| #17298 | `sherpa-micromink-single-bed-blanket-400-gsm-charcoal-grey-b0hkdhc7f7` | ₹899 |
| #17299 | `lino-perros-women-s-croco-textured-handbag-b0cqg5g8x7` | ₹1,178 |
| #17300 | `beardo-blue-curse-men-s-perfume-50ml-b0hbjwsff5` | ₹375 |
| #17301 | `roughhouse-no-screw-doorway-pull-up-bar-b0dl64svr3` | ₹449 |
| #17302 | `kidology-mini-football-tabletop-game-age-6-b0dpx48kz6` | ₹497 |
| #17303 | `garnier-vitamin-c-face-serum-b08ftqxwc7` | ₹309 |
| #17304 | `united-colors-of-benetton-3-in-1-leakproof-water-bottle-set-b0g4n8zpzx` | ₹399 |
| #17305 | `stainless-steel-laser-design-halwa-and-sweet-plate-b0h6pn927w` | ₹149 |
| #17306 | `de-jure-fitness-pvc-kettlebell-3kg-b09sg5f9yc` | ₹229 |
| #17307 | `msi-pro-h610m-s-micro-atx-motherboard-b0g2xmk7b7` | ₹5,229 |

Spot checks on prod returned 200 for #17281 (0.12s) and #17307 (0.15s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 30 URLs: the 27 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.39s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.52s. Slowest: `/blog` (0.52s) | OK |
| DB LIVE | 16,700 (16,673 at desidime 11-24j, = +27) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,307 vs 17,280 | OK. The external broadcast cron will pick up this batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24i` already existed, so this report uses `j` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **Stale reposts:** 22 rows repriced today.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 27 of 50 fresh items pushed this tick (25 of 57 in 11-24i).
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, and now #17288 (SMOWKLY cap, M.R.P. ₹4,999 against ₹398, 92% off). The M.R.P. is what Amazon shows, but it looks inflated.
- **No buy box:** #7259, #12963, #14154, #13938 and #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards (5 more this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick used only the Amazon tab and did not touch Telegram. It did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
