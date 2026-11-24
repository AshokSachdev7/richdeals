# TELEGRAM-DEAL-MONITOR tick — 2026-11-24n

This tick ran at about 13:35–13:50 IST on 11-24, using the Playwright MCP with the logged-in richDeals profile.

- One `browser_evaluate` over `.chat-list .ListItem.Chat`, filtered to the tracked group titles, read the newest post in every tracked group.
- Dealzone's last 10 posts were read in the chat that was already open.
- Every candidate price was read on the Amazon product page, through a same-origin fetch in the logged-in Amazon tab.

**Result:**

- **1 new deal was pushed LIVE (#17204).** The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed.
- **1 duplicate LIVE row was repriced:** #3366 (Cello bottle), from ₹206 to ₹223.
- **1 duplicate was already correct:** #12449 (Inalsa air fryer) is still ₹3,648 on Amazon. No change.
- **IndexNow returned HTTP 200** for 5 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 groups in `data/tg-groups.json` were loaded in the sidebar. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| Dealzone | Inalsa 5.5L air fryer, ₹3,648 (B0FQNDD9BJ) | Duplicate of #12449. Live price matches, no change |
| SB Loots | Cello H2O steel bottle 1000 ml, ₹223 (B07F5SL8HR) | Duplicate of #3366. Repriced from ₹206 to ₹223 |
| Rogerkart | CareFoam orthopedic seat cushion, ₹809 (`rogerkart.com/r/c67aBei`) | Pushed as #17204 |
| Others (Saffola coupon, credit card ad, Swiggy, LG washing machine sale, Caprese category, Amazon Basics figurine) | — | Skipped: coupon, ad, category or sale posts, or already #17142 |

The Rogerkart shortlink does not redirect over HTTP. The target was found in the page body: `amazon.in/dp/B0GH7VTQ57?tag=rogerkart-21`. The `rogerkart-21` tag was stripped.

## Price checks

How the prices were read:

- **Price** came from `#corePriceDisplay_desktop_feature_div .a-price-whole`. Style and script elements were removed before reading the text.
- **M.R.P.** came from `#centerCol`.
- **Stock** came from `#availability` plus the add-to-cart button.

The rule rejects any drift above ₹1 and any page without a buy box. Every affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.

| Product | Post price | Live price | Decision |
|---|---|---|---|
| INALSA TastyFry D5.5 air fryer, 5.5L (B0FQNDD9BJ) | ₹3,648 | ₹3,648, M.R.P. ₹11,995, in stock | No change: #12449 already ₹3,648 |
| CELLO H2O steel bottle, 1000 ml, Silver (B07F5SL8HR) | ₹223 | ₹223, M.R.P. ₹535, in stock | Repriced #3366 |
| CareFoam orthopedic coccyx seat cushion, Grey (B0GH7VTQ57) | ₹809 | ₹809, M.R.P. ₹3,999 (80% off), in stock | Pushed as #17204 |

The CareFoam post gave a "regular" price of ₹1,488. Amazon lists an M.R.P. of ₹3,999. The row uses Amazon's M.R.P. It joins the inflated-M.R.P. watch list.

## Reprice

**#3366 (Cello)**

- Set the price to 223, M.R.P. 535, discount 58%.
- Rewrote the description's figures. The old text said "₹206", "₹286 below" and "53%", and the old arithmetic was already wrong. It now says ₹223, ₹312 below ₹535, a 58% cut.
- Added a `priceHistory` row at ₹223.
- Re-read the row: LIVE, slug unchanged, no old figure left.

## Push

`/admin/deals/bulk` was called once on localhost, which writes to prod through the tunnel. It returned:

```
201 {"count":1,"results":[{"slug":"carefoam-orthopedic-coccyx-memory-foam-seat-cushion-grey-b0gh7vtq57","created":true,"ok":true}]}
```

Checks on the new row:

- **Status:** #17204 is LIVE at ₹809.
- **Slug:** matches the one sent.
- **Image:** `m.media-amazon.com/images/I/61w+DKUu0cL._SL1024_.jpg`. The product has one colour (Grey), so the first hiRes image is the right one.
- **Prod page:** returns 200 (0.34s).
- **Copy:** original. It states that the cushion eases pressure and is not a treatment.

Added this tick's 3 ASINs to `data/tg-multi-seen.json`, which now holds 5,825 entries.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 5 URLs: the CareFoam and Cello slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.10s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.44s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.09–0.51s. Slowest: `/blog` (0.51s) | OK |
| DB LIVE vs API total | 16,596 = 16,596 (17,054 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,204 vs 17,203 | OK. The cursor caught up from 17,182 |
| Coverless posts | 0 | OK |
| Unpushed commits | 0/0 before this report, after fetch | OK |
| CronList vs roster | All 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24m` already existed, so this report uses `n` | OK |
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

- **Stale reposts:** LIVE Amazon prices drift silently. #3366 was 8% under the live price; 14 rows have been repriced today.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`, plus #17167 and now #17204.
- **Legacy slugs and titles:** #1530's slug still carries old figures; #299 and #3366 still carry cut-off marketplace titles and need a geo-optimizer rewrite.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **No buy box:** #7259, #12963 and #14154.
- **Sidebar coverage:** 3 of the 13 groups were not loaded this tick (Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba).
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
