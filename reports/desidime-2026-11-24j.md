# DESIDIME-INGEST tick — 2026-11-24j

This tick ran at about 18:15–18:50 IST on 11-24. It was run inline. Stage 1 was `apps/api/scripts/ingest-desidime.mjs`: it read the listing cards only (no per-deal fetch), applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified on the product page in the logged-in Amazon tab of the Playwright MCP (richDeals profile): `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. Flipkart was read from ld+json in the Flipkart tab, and Myntra through `productLd()` (±₹1, InStock). Telegram (tab 0) was not touched.

**Result:**

- **6 new deals were pushed LIVE (#17275 to #17280)**: 3 Myntra, 1 Flipkart and 2 Amazon. Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **3 duplicate LIVE rows were checked and left unchanged.** All matched their live price within ±₹1.
- **9 candidates were rejected**: 5 Amazon on price drift and 4 in stage 1.
- **IndexNow returned HTTP 200** for 9 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Junk filtered | 7 |
| Resolved to a product | 25 |
| Already in the DB (dedup by productId) | 3 |
| Rejected in the last 24h (`data/dd-rejected.json`) | 7 |
| Fresh | 15 |

Two dead outbound links (Bhim Hype Hour, Asaya) went to `data/dd-dead.json`. Stage 1 itself rejected 4 of the fresh 15: Digihaat masoor dal and Zoomin (no ld+json), Samsung fridge RFRHJ4JJ6MJC2NDZ and Acer COMHRGGZFT4S4JDT (price drift).

## Fresh candidates

| ID | Product | Card | Live read | Decision |
|---|---|---|---|---|
| 14306506 | Roadster men's beige bomber jacket (Myntra) | ₹724 | ₹724, M.R.P. ₹2,499, InStock | **Pushed as #17275** |
| 36421440 | StyleCast oversized denim jacket (Myntra) | ₹1,598 | ₹1,598, M.R.P. ₹4,099, InStock | **Pushed as #17276** |
| 45715062 | YK girls' printed leather hooded jacket (Myntra) | ₹1,657 | ₹1,657, M.R.P. ₹5,525, InStock | **Pushed as #17277** |
| PWBHS5SYZSYQHEZN | Realme Techlife Realfit 10000mAh 22.5W power bank (Flipkart) | ₹1,599 | ₹1,599, M.R.P. ₹2,499, InStock | **Pushed as #17278** |
| B0H94ZDJ67 | Hindware Immedio Blue 3L instant geyser | ₹2,399 | ₹2,399, M.R.P. ₹5,490, in stock | **Pushed as #17279** |
| B0DPHZ1483 | FOXIN Endeavour gaming keyboard and mouse combo | ₹975 | ₹975, M.R.P. ₹3,499, in stock | **Pushed as #17280** |
| B0G4F6ZCSV | Amazfit Active Max | ₹12,527 | ₹13,499 | Rejected: drift |
| B0HJ2B3B1R | Eureka Forbes AP 175 air purifier | ₹3,600 | ₹3,999 | Rejected: drift |
| B0G8DKNTZF | Gabit smart ring | ₹12,160 | ₹13,112 | Rejected: drift |
| B0F4X3ZX4Z | Hand pruner | ₹82 | ₹199 | Rejected: drift |
| B0GVYJ9G96 | Zebronics Juke Bar 9330 | ₹8,800 | ₹10,999 | Rejected: drift |

The 5 Amazon rejects were written to `data/dd-rejected.json` with `Date.now()` timestamps. The file now has 2,233 keys. 5 of the 7 Amazon cards were priced below the live product page, most likely a bank-offer or coupon price on DesiDime's side.

## Duplicates (price sync)

| Row | Product | DB | Live | Action |
|---|---|---|---|---|
| #17164 | EcoLink fan | ₹1,827 | ₹1,826 | Within ±₹1, no change |
| #12381 | Glen mixer grinder | ₹3,681 | ₹3,681 | No change |
| #17205 | GAP tee | ₹386 | ₹386 | No change |

## Push

`/admin/deals/bulk` was called once per item on localhost, which writes to prod through the tunnel. All 6 returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent. Titles and descriptions are original rewrites.

| Row | Slug | Price / M.R.P. | Affiliate |
|---|---|---|---|
| #17275 | `roadster-men-beige-solid-bomber-jacket-14306506` | ₹724 / ₹2,499 (71% off) | InRDeals (Myntra) |
| #17276 | `stylecast-oversized-denim-jacket-36421440` | ₹1,598 / ₹4,099 (61% off) | InRDeals (Myntra) |
| #17277 | `yk-girls-printed-leather-hooded-jacket-45715062` | ₹1,657 / ₹5,525 (70% off) | InRDeals (Myntra) |
| #17278 | `realme-techlife-realfit-10000mah-22-5w-compact-power-bank-pwbhs5syzsyqhezn` | ₹1,599 / ₹2,499 (36% off) | Flipkart `affid=djhackraj` |
| #17279 | `hindware-immedio-blue-3l-instant-water-heater-b0h94zdj67` | ₹2,399 / ₹5,490 (56% off) | Amazon `tag=ashoksachdev-21` |
| #17280 | `foxin-endeavour-gaming-keyboard-and-mouse-combo-with-rgb-lighting-b0dphz1483` | ₹975 / ₹3,499 (72% off) | Amazon `tag=ashoksachdev-21` |

Images come from the merchant CDNs, not from DesiDime. Spot checks on prod returned 200 in 0.13–0.16s for #17275, #17278 and #17280.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 9 URLs: the 6 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.44s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.51s. Slowest: `/blog` (0.51s) | OK |
| DB LIVE vs API total | 16,673 = 16,673 (16,667 at sitemon 11-24r, = +6) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,280 vs 17,274 | OK. The external broadcast cron will pick up this batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24i` already existed, so this report uses `j` | OK |
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
- **DesiDime Amazon card prices:** 5 of 7 drifted this tick (card below live). Every Amazon card still needs the product-page read.
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 25 of 57 in deal-ingest 11-24i.
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
