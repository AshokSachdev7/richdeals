# TELEGRAM-DEAL-MONITOR tick — 2026-11-24o

This tick ran at about 15:15–15:45 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the ASIN was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and slug). Every price was then read on the Amazon product page in the logged-in Amazon tab: `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`.

**Result:**

- **2 new deals were pushed LIVE (#17235, #17236).** Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed.
- **1 expired row was relisted in place (#1485).** It kept its slug.
- **1 duplicate LIVE row is out of stock (#11249)** and joins the no-buy-box list.
- **IndexNow returned HTTP 200** for 6 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar. Multi-product, loot, category and `/s?` search posts were skipped, along with the Dealzone Dove/Axe combo.

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B00M6P65ZQ | Gala stainless steel scrubber, 1 piece | ₹17 | ₹17, M.R.P. ₹40, in stock | **Pushed as #17235** (58% off) |
| B0GZXBHFB2 | Joy 1700ml insulated casserole with lid | ₹476 | ₹476, M.R.P. ₹1,299, in stock | **Pushed as #17236** (63% off) |
| B079Y6JZC8 | Zebronics Zeb-Comfort wired USB mouse | ₹95 | ₹95, M.R.P. ₹299, in stock | **#1485 relisted** (was EXPIRED at ₹99) |
| B0D22XG31W | Solimo 3L storage containers, set | — | "Currently unavailable", no add-to-cart | No change to LIVE #11249. Joins the no-buy-box list |
| STFG973YYDDMDEMP | Flipkart item | — | — | Skipped: already in the seen file |

## Push

`/admin/deals/bulk` was called once per new item on localhost, which writes to prod through the tunnel. Both returned `201 {"count":1,...,"created":true}`. The read-back confirmed status LIVE, the right price and the slug that was sent.

| Row | Slug |
|---|---|
| #17235 | `gala-stainless-steel-scrubber-for-kitchen-utensils-1-piece-b00m6p65zq` |
| #17236 | `joy-casserole-1700ml-1-7l-insulated-hot-pot-with-lid-b0gzxbhfb2` |

Both use `https://www.amazon.in/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21` and an `m.media-amazon.com` `_SL1500_` image.

**Relist of #1485:** a bulk push matches on productId and would have rewritten the legacy slug, which would turn the old URL into a 404. So the row was updated directly with `prisma.deal.update`. It is now LIVE at ₹95, M.R.P. ₹299, 68% off. The title and description were rewritten, the image was replaced with the hiRes image, the affiliate URL was normalised to our tag, and a `priceHistory` row was added. The slug `zebronics-zeb-comfort-wired-usb-mouse-3-button-1000-dpi-optical-sensor-plug-play-b079y6` is unchanged.

All three ASINs were added to `data/tg-multi-seen.json`, which now has 5,828 entries.

All three pages return 200 on prod (0.15–0.38s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs: the 3 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.40s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.08–0.57s. Slowest: `/blog` (0.57s) | OK |
| DB LIVE vs API total | 16,626 before the push, 16,629 after (= +3) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,236 vs 17,210 | OK. The external broadcast cron is working through the batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24n` already existed, so this report uses `o` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **DesiDime `/new` returned 0 cards** in desidime 11-24h.
- **Stale reposts:** 18 rows repriced today, plus the #1485 relist in this tick.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 29 of 46 in deal-ingest 11-24h.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215.
- **No buy box:** #7259, #12963, #14154, #13938 and now #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded this tick.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
