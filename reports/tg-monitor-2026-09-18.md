# TELEGRAM-DEAL-MONITOR — 2026-09-18 (07:5x IST tick)

## Result

**2 deals pushed LIVE. IndexNow HTTP 200 (4 urls).**

| ASIN | product | price | MRP | disc | slug |
|---|---|---|---|---|---|
| B0F6T6BJ17 | Maybelline Superstay Teddy Tint lip & cheek | ₹329 | ₹749 | 56% | `maybelline-new-york-superstay-teddy-tint-lip-and-cheek-color-b0f6t6` |
| B0H94NFR7V | BSB HOME single-bed mink blanket 56x80in | ₹499 | ₹1999 | 75% | `bsb-home-single-bed-mink-blanket-velvet-soft-plush-fleece-56-x-80-inches-b0h94n` |

`/admin/deals/bulk` → HTTP 201, `{"count":2}`, both `created:true`, `status:live`.
`indexnow-ping.mjs` → **HTTP 200 for 4 urls** (2 slugs + `/` + `/offers`).
`data/tg-multi-seen.json` 1693 → **1699** (2 pushed + 4 rejects, so rejects never re-resolve).

## Scan

One `browser_evaluate` over `.chat-list` → 25 rows across the 13 groups in
`data/tg-groups.json`. Sidebar yield was thin (1 candidate), so I deep-scraped
**CoolzTricks Official** via trusted click + one `.message-content` read
(29 messages), then resolved 15 shortlinks with curl `-L -w %{url_effective}`.

Total candidates resolved this tick: **21**.

## Rejections (19)

| reason | count | items |
|---|---|---|
| already in seen ledger / live DB | 12 | B0DXPQ8PSX(#6687), B0GTL8F1D6(#10359), B08HDT835B(#10377), B0DDKNRHL9(#10358), B078WWHZ72(#10405), B0H5KCP22F(#8727), B0BV24B5JY(#7463), B07TLYPTQJ(#10385), B0DBLL1TQ8, B09C2JSMFB(#684), B07QX21WZQ, B0G38DGNKM, PWBGGD4THDQZYAY6, B0CJF7FFLW |
| out of stock | 2 | B0H58NFJV8 (paper soap ₹40), B0G53519DP (Amazon Basics back brace ₹286) |
| price drift >₹1 | 2 | B07HC6HNW1 JK Paper A4 — posted ₹600, **live ₹2,487**; Shopsy XCOH7YYBAWMYXBEK dry-fruit cutter — posted ₹115, ld+json **₹144** |
| structural (not a product page) | 2 | `4h0hkTr` → `/s?rh=…` search page; `fkrt.cc/hukbnwX` → `dl.flipkart.com/flipkart/p/b` tracking landing, no `/p/itm…` |
| multi/loot/category/non-product posts | — | Dealdost (3-product), Dealzone "Master Link", Deal Dibba "boAt smartwatches from ₹999", IFS Tips (Instamart `/search?query=`), Hidden Loot (Blinkit freebie), OMG LOOTDEALS (video) |

**B0G53519DP note:** this same ASIN was a price-drift reject in the 09-13 IFS
tick (live ₹643 vs claimed ₹287). It is now flatly out of stock. Third-party
channels keep reposting it — it is in the seen ledger now, so it stops here.

## Verification method

Amazon: logged-in tab 1, same-origin `fetch` per ASIN, read `#buybox` first.
On B0H94NFR7V the buybox node returned inlined CSS (not price text) — fell
back to `.a-price .a-offscreen` + `.basisPrice` + `.savingsPercentage`
(₹499 / ₹1,999 / -75%, consistent). In-stock proven by `#add-to-cart-button`
present AND no "currently unavailable".
Non-Amazon: ld+json `Product.offers.price` — the script body is a JSON **array**,
so `JSON.parse(m[1])[0].offers`.
Images: real `m.media-amazon.com` ids off `#landingImage`, republished at
`._SL1000_.jpg`. No source-site images, no verbatim source copy.

## CEO audit

| check | result |
|---|---|
| posts today IST | **2** (370, 371) — floor met, 12:09 cron owes the third |
| published total | 312, coverless **0**, seoless **0** |
| deals PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| broadcast cursor vs max LIVE | 10429 vs **10431** — 2 behind (these two pushes); its own cron catches up |
| prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` | **200 x 6** |
| unpushed commits | 0 |

### ROT (carried, still open)

1. **CLAUDE.md "Telegram deal sourcing" says 7 groups. `data/tg-groups.json`
   has 13.** Stale for several ticks now.
2. **CLAUDE.md missing a hard-won constraint discovered today:**
   `browser_navigate` to `web.telegram.org/a/#<chatid>` ALSO fails, not only
   `location.hash` — the hash is stripped, 0 messages load. Only a trusted
   click on the sidebar row switches chats.
3. **`.claude/agents/deal-ingest.md` stale on two points:** still says
   `"status": "pending-review"` (AUTO-APPROVE overrides it) and still names
   the EarnKaro flow for Flipkart/other stores (matrix is now
   Flipkart `affid=djhackraj` / everything else Cuelinks).
4. **Amazon extraction fixes not baked into
   `apps/api/scripts/lib/ingest-common.mjs`:** buybox-first read, MRP via
   `pay/(1-savingsPercentage)`, `#add-to-cart-button` as the in-stock signal,
   and now the CSS-polluted-buybox fallback seen on B0H94NFR7V.
5. **`where to get free samples`: 11,072 impressions, pos 6.8, 0 clicks.**
   46 of 312 slugs sit in that cluster. Merge/prune is still the highest-value
   unshipped SEO action; more posts make it worse.
6. Organic: 90d 50 clicks / 336 impr, last 28d 6 clicks / 153 impr.
7. 307 LIVE deals carrying pointless `updatedAt` re-stamps — undiagnosed.
8. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` from ASIN needs
   `productId` on the shared DTO) both need an API change.
9. ~605 untracked scratch files under `apps/api/` (git porcelain ~1589 lines).

### Owner decisions still open

1. Ratify publish-at-live-price + the 30% minimum discount floor in CLAUDE.md.
2. Permanent DB pool cap in `apps/api/.env`.
3. DesiDime Task Scheduler job `7,37 * * * *` (external cron, needs explicit ask).
4. Free-samples cluster consolidation (46 of 312 slugs).
5. Scratch-file cleanup under `apps/api/`.
