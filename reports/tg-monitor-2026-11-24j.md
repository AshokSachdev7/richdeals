# TELEGRAM-DEAL-MONITOR tick — 2026-11-24j

This tick ran at about 09:40–10:10 IST on 11-24. It used Telegram Web (`web.telegram.org/a/`) in the logged-in Playwright profile (richDeals). One `browser_evaluate` read the `.chat-list .ListItem.Chat` sidebar and returned only the rows whose chat id is in `data/tg-groups.json`. The ONLINE SHOPPING DEALS preview was truncated, so that one group was opened with a single trusted sidebar click. The chat list was not reloaded. Shortlinks were resolved with curl using a browser user agent. Product pages were read through a same-origin fetch in the logged-in Amazon tab.

**Result: 5 new deals were pushed LIVE (#17138–#17142). Each call returned HTTP 201 with count 1, and each slug was confirmed. IndexNow returned HTTP 200 for 8 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Sidebar (newest posts since 11-24i)

| Group | Newest post | Decision |
|---|---|---|
| Dealzone | Saffola cold pressed coconut oil 1L (`link.amazon/B0haO14vv`, which resolves to B0G1SKX4CM) | Fresh. Verified and pushed as #17138 |
| CoolzTricks Official | The same Saffola coconut oil (`amzn.to/48J2cEX`, which resolves to B0G1SKX4CM) | Same product as Dealzone. Pushed once |
| SB Loots And Deals | Saffola Honey Active 1kg (`amazn.lt/oIVYj80D`, which resolves to B08B44K4YS) | Fresh. Verified and pushed as #17139 |
| ONLINE SHOPPING DEALS | Three single-product posts (`link.amazon/B0bI49ire`, `link.amazon/B063c2vni`, `link.amazon/B00iR8OBb`) | All fresh. Verified and pushed as #17140–#17142 |
| Rogerkart Deals | Zebronics wireless car charger | Unchanged. Duplicate of LIVE #17059 |
| Dealdost | IndusInd Tiger credit card offer | Unchanged. Not a product |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart tip | Unchanged. Not a product |
| Hidden Loot Deals & Offers | Swiggy Dineout voucher tip | Unchanged. Not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Unchanged. Sale hub |
| NonStopDeals | Caprese handbags (`fkrt.it`) | Unchanged. Category post |

As in earlier ticks, Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not among the loaded rows.

## Candidates

The price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box. Every image is from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`. Every affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.

| ID | ASIN | Product | Price | M.R.P. | Note |
|---|---|---|---|---|---|
| #17138 | B0G1SKX4CM | Saffola cold pressed coconut oil 1L, unrefined | ₹550 | ₹849 (35% off) | The page also shows a 37% clip coupon, which brings the effective price to about ₹346. The description says so, and the stored price is the pre-coupon ₹550 |
| #17139 | B08B44K4YS | Saffola Honey Active 1kg, forest honey | ₹224 | ₹499 (55% off) | Sold through Amazon Fresh. The first M.R.P. read returned ₹22.40, which is the per-100g rate. The M.R.P. was re-read from the core price text |
| #17140 | B0FPWHC4HQ | Hykes heavy-duty exercise handles (cable machine attachment) | ₹99 | ₹999 (90% off) | `#availability` was empty, but `#add-to-cart-button` is present, so the buy box is live |
| #17141 | B0CTHGS1P2 | RYLLZ Essentials tea tree essential oil 30ml | ₹149 | ₹657 (77% off) | The page shows a 5% coupon |
| #17142 | B0H2R6551Q | Amazon Basics Graceful Abstract Couple Figurine, gold/beige, 19cm | ₹270 | ₹1,499 (82% off) | The page shows ₹269.86. The `price` column is an integer, so the price was rounded to ₹270, which is within the ₹1 tolerance. The description says the price was rounded |

The ONLINE SHOPPING DEALS posts carried the source tag `vivek123034-21` and `price-bh` tracking parameters. Both were stripped.

## Push

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. Each call returned HTTP 201 with count 1. Each row was re-read by `productId`: all five are LIVE at the verified price, and each slug matches the one that was sent. None came back as `created:false`, so no slug had to be restored.

Slugs:

- `saffola-cold-pressed-coconut-oil-1l-unrefined-b0g1skx4cm`
- `saffola-honey-active-1kg-forest-honey-b08b44k4ys`
- `hykes-heavy-duty-exercise-handles-cable-machine-attachment-b0fpwhc4hq`
- `ryllz-essentials-tea-tree-essential-oil-30ml-b0cthgs1p2`
- `amazon-basics-graceful-abstract-couple-figurine-gold-beige-19cm-b0h2r6551q`

`tg-multi-seen.json` went from 5,805 to 5,816 entries. The 11 new entries are the 6 shortlinks and the 5 ASINs.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 8 URLs: the 5 deal slugs plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.40s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.77s. `/blog` (0.77s) and `/llms.txt` (0.40s) were the slowest | OK |
| DB LIVE vs API total | 16,534 = 16,534 (16,992 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,142 vs 17,137 | OK. The gap is this tick's 5 deals, which the external broadcast cron picks up on its next run |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24i` already existed, so this report uses suffix `j` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** #11191 had sat ₹250 below the live price from 10-19 until tg-monitor 11-24i caught it. LIVE Amazon prices drift silently, and only a repost or a resweep catches it. This tick's 5 deals were all fresh, so none needed a reprice.
- **IFS yield:** 27 of 31 candidates failed verification in deal-ingest 11-24e.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), the Caprese sling bag, the HoneyTouch Jasper folding bed (BDDGXBYNGQAHGNCY), and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick filtered the sidebar by group id, so it read neither row. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
