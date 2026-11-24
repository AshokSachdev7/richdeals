# TELEGRAM-DEAL-MONITOR tick — 2026-11-24m

This tick ran at about 13:15–13:25 IST on 11-24, using the Playwright MCP with the logged-in richDeals profile.

- One `browser_evaluate` over `.chat-list .ListItem.Chat` read the newest post in every tracked group.
- Dealzone was then opened with a trusted sidebar click, and its last 10 posts were read.
- Every candidate price was read on the Amazon product page, through a same-origin fetch in the logged-in Amazon tab.

**Result:**

- **1 new deal was pushed LIVE (#17203).** The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed.
- **3 duplicate LIVE rows were repriced** to the live Amazon price: #11249, #1530 and #11191.
- **IndexNow returned HTTP 200** for 7 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 groups in `data/tg-groups.json` were loaded in the sidebar. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| SB Loots | Saffola coupon | Skipped: coupon/category post |
| Dealzone | Solimo storage containers (B0D22XG31W) | Duplicate; repriced #11249 (see below) |
| CoolzTricks | Cello juicer (B0FS23TZ4N) | Skipped: already seen, no buy box |
| Rogerkart | Mivi | Skipped: unchanged since last tick, already #17166 |
| ONLINE SHOPPING DEALS | Amazon Basics figurine | Skipped: unchanged, already #17142 |
| Dealdost, IFS Tips, Hidden Loot, INDIAN CHEAP DEALS, NonStopDeals | No new single-product post | Skipped |

## Dealzone, last 10 posts

How the prices were read:

- **Price** came from `#corePriceDisplay_desktop_feature_div .a-price-whole`. Style and script elements were removed before reading the text.
- **M.R.P.** came from `#centerCol`.

The rule rejects any drift above ₹1 and any page without a buy box. Dealzone's `glitzdeal05-21` tag was stripped. Every affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.

| Product | Post price | Live price | Decision |
|---|---|---|---|
| Colors Queen matte lip liner, L-04 Indian Red (B0BJ2T58F3) | ₹59 | ₹59, M.R.P. ₹199 (70% off), in stock | Pushed as #17203 |
| Amazon Brand Solimo storage containers, 3L set (B0D22XG31W) | n/a | ₹315 (76% off) | Repriced #11249 from ₹366 |
| Dove Lavender & Chamomile body wash 1L (B0BHTQPTRK) | ₹379 | ₹550, M.R.P. ₹849 (35% off) | Repriced #1530 from ₹256. No new row: post price did not match live price |
| RR Signature Zello 25L geyser (B0D8LH326T) | ₹5,849 | ₹5,749 (57% off) | Repriced #11191 from ₹5,849 |
| Saffola (B0G1SKX4CM) | ₹203 plus a coupon | ₹550 | No change: #17138 is already ₹550 |
| CASIO, Pepe Jeans, Sonata, Amazon Brand clothing | n/a | n/a | Skipped: category or multi-product posts |
| Market Bhai | n/a | n/a | Skipped: ad |

Dove and Saffola both read ₹550 against an M.R.P. of ₹849. Both pages were fetched again. Their canonical URLs and per-unit text differ, so the match is a real coincidence.

## Reprices

**#1530 (Dove)**

- The row carried legacy copy at ₹256.
- One `prisma.deal.update` set:
  - price 550;
  - M.R.P. 849;
  - discount 35%;
  - a new original title and description;
  - a normalised affiliate URL.
- Added a `priceHistory` row at ₹550.
- Kept the slug `73-off-dove-body-wash-1l-256-B0BHTQ`, even though it still carries the old figures. Changing it would 404 the indexed URL.

**#11191 (RR geyser)**

- Set the price to 5,749.
- Replaced `₹5,849` with `₹5,749` in the title and description.
- Added a `priceHistory` row at ₹5,749.

**#11249 (Solimo)**

- Set the price from ₹366 to ₹315 (76% off).

**Check after the update:** each row was re-read. No old figure is left in any title or description, and every slug is unchanged.

## Push

`/admin/deals/bulk` was called once on localhost, which writes to prod through the tunnel. It returned:

```
201 {"count":1,"results":[{"slug":"colors-queen-matte-lip-liner-pencil-l-04-indian-red-b0bj2t58f3","created":true,"ok":true}]}
```

Checks on the new row:

- **Status:** #17203 is LIVE at ₹59.
- **Slug:** matches the one sent.
- **Image:** `m.media-amazon.com/images/I/61l6HiG7OyL._SL1500_.jpg`.
- **Prod page:** returns 200 (0.18s).

Added this tick's 5 ASINs to `data/tg-multi-seen.json`, which now holds 5,822 entries.

Slugs:

- `colors-queen-matte-lip-liner-pencil-l-04-indian-red-b0bj2t58f3` (new)
- `73-off-dove-body-wash-1l-256-B0BHTQ` (repriced)
- `rr-signature-zello-25l-star-rated-storage-water-heater-glass-line-tank-8-bar-for-b0d8lh326t` (repriced)
- `amazon-brand-solimo-modular-plastic-storage-containers-with-lid-3-l-each-set-of-b0d22xg31w` (repriced)

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 7 URLs: the 4 slugs above, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.41s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.05–0.58s. Slowest: `/blog` (0.58s), `/llms.txt` (0.41s) | OK |
| DB LIVE vs API total | 16,595 = 16,595 (17,053 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,203 vs 17,177 | OK. The gap of 26 is deal-ingest 11-24g plus this tick. The external broadcast cron picks them up on its next run |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24l` already existed, so this report uses `m` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** LIVE Amazon prices drift silently. This tick repriced 3 more rows (#11249, #1530, #11191), after #12555 in desidime 11-24g.
- **Legacy slugs with stale figures:** #1530's slug still says "73-off" and "256". It stays to avoid a 404. The visible copy and schema are correct.
- **Legacy truncated titles:** #299 still carries a cut-off marketplace title. It needs a geo-optimizer rewrite.
- **IFS yield** is still low (see deal-ingest 11-24g).
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, which is above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`, plus the Fire-Boltt row (#17167) at ₹16,999.
- **No buy box:** #7259, #12963 and #14154.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the earlier list plus the `/indiafreestuff/p/` cards.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH).
- **Sidebar coverage:** 3 of the 13 groups were not loaded this tick (Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba).
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
