# TELEGRAM-DEAL-MONITOR — tick `2026-09-22af`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is
filtered out inside the page, before anything reaches this session.

**Result: 1 new page + 1 in-place refresh. IndexNow 5/5 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 24 |
| rows belonging to the 13 tracked groups | 12 (NonStopDeals absent from the sidebar) |
| shortlinks worth resolving | 3 |
| single-product candidates after the skip rules | 3 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 2 |
| survived PDP price/stock verification | 2 — 1 new page, 1 refresh |

## Published

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 10930 | Shopsy | MEHHAJGJBVMF7XKU | ₹156 | 599 | 74% | `meenakshi-amar-suhag-fast-mehandi-cone-pack-of-12-300-g-mehhajgjbvmf7xku` |

Meenakshi Amar Suhag Fast Mehandi Cone, 12-cone box, 300 g total. Shopsy serves **no
`ld+json`**, so the price came from the embedded listing JSON block carrying this listing's
own `fetchId` (`LSTMEHHAJGJBVMF7XKU32HKZK`): `"pricing":{"finalPrice":{"value":156},"fsp":178,
"mrp":599}`, `IN_STOCK`, `"listingState":"current"`.

**The channel's number was wrong.** It shouted ₹180; ₹180 is the ₹178 listing selling price
rounded, not the live figure. The PDP is ₹156 — a 13% gap that would have shipped a page
disagreeing with the merchant. PDP wins, every time.

Shopsy is **not** Flipkart, so the wrapper is Cuelinks (`cid=527`), never `affid=djhackraj` —
`affid` / `lid` / `marketplace` stripped from the source URL first. `storeId 13`, `productId` =
the uppercase Flipkart listing pid, slug = kebab(name) + pid, matching the four LIVE Shopsy rows
already in the DB. `isSuper` and `isHot` both true at ₹156.

Description written from the spec block only (12 pieces, 300 g, natural, 48-month shelf life,
vegan / cruelty-free / sulphate-paraben-free, India, COD, restricted returns), plus a 4-step
`howTo` whose step 2 is the row-specific caveat: **the channel's ₹180 is the selling price, the
live price is ₹156, and what ships is the 12-cone box, not one cone.**

## Refreshed in place

| id | store | productId | was | now | off | slug |
|---|---|---|---|---|---|---|
| 8902 | Amazon | B0DQ5FZX9X | ₹6,499 / empty `howTo` / 225-char desc | ₹6,490 / mrp 13,700 | 53% | `samsung-essential-series-s3-flat-monitor-…-ls22d300gawxxl-black` |

Dedup hit, so the indexed slug was preserved and the row rewritten rather than a second page
created. PDP read in the logged-in Amazon tab (curl is bot-blocked): **₹6,490.00**, **M.R.P.
₹13,700.00**, badge `-53%`, `In stock`.

A ₹9 drop is small, but the rest of the row was not: `howTo` was **empty**, the description was
**225 characters**, and the image was the low-res `_SX355_` thumbnail. All three rewritten —
~1,150-char original description, 4-step `howTo` (step 2 = HDMI + VGA only, no DisplayPort and
no USB-C, and the 24/27-inch S3 variants are separate listings), image swapped to the real CDN
`71JwKnROg8L._SL1500_.jpg`. `PriceHistory` row written, 6,499 → 6,490.

## Skipped, with reasons

- **Dealzone Livon (`B0CTHK1FS1`)** — published last tick as deal 2982.
- **ONLINE SHOPPING DEALS Yonex ET 901 (`B06WV77YDB`)** — SEEN, and the PDP still carries no
  M.R.P., so it would publish with a null mrp and null pct.
- **INDIAN CHEAP DEALS handbag (`B0G38DGNKM`)** — SEEN, already live as deal 7110.
- **Loot Deals 24x7 Syska power bank (`PWBGGD4THDQZYAY6`)** — SEEN; killed by dedup last tick too.
- **Dealdost game credits** ("Starts at 75") — multi/loot, no single product.
- **Rogerkart "Upto 85% Off On Zivame"** — category page.
- **IndiaFreeStuff Swiggy Instamart**, **Hidden Loot Zepto** — search/loot posts.
- **Deal Dibba** — `t.me` join links, no product.
- **OMG LOOTDEALS** ("Video dekho paisa kamao") — non-deal chatter.
- Untracked sidebar rows (our own RichDeals channel, an iPhone-rates channel, bots, DMs) — not
  in `data/tg-groups.json`.

Two keys appended to `data/tg-multi-seen.json` — now **1,810** entries.

## Freshness

`indexnow-ping.mjs` **worked this tick** — `DONE: IndexNow -> HTTP 200 for 5 urls` (2 slugs +
`/`, `/offers`, `/sitemap.xml`, the slugs+3 rule). No Bing fallback needed. `api.indexnow.org`
resolved from this network for the first time in several ticks; the DNS failure was intermittent,
not permanent, so the flag below is downgraded rather than dropped.

Live pages verified after the write, both 200 with matching Product JSON-LD:

- `/meenakshi-amar-suhag-fast-mehandi-cone-pack-of-12-300-g-mehhajgjbvmf7xku` → `"price":"156"`
- `/samsung-essential-series-s3-flat-monitor-…-ls22d300gawxxl-black` → `"price":"6490"`

Sitemap now **9,892** URLs. Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`,
`/feed.xml`, `/api/deals`, `/llms.txt`.

## CEO audit

Clean:

- live deals **10,583**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- broadcast cursor vs DB max (10930) — in range
- 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *`
   losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
2. **41 live deals state a price in the title the row does not hold** — unchanged for three
   ticks, so not growing. Off-by-one rounding on 9708 (Rs.132 vs 133), 5450 (8651 vs 8652),
   14 (165 vs 164), 7554 (708 vs 709); the worst are legacy hand-typed coupon titles (1716,
   1450, 2602). Retitle pass not authorised.
3. **nullMrp 1,622 / nullPct 1,599** — flat this tick, because the one refresh already had an
   MRP. Backfill still unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
   The other wrapped LIVE rows are correct — and this tick added a **14th Shopsy row** to that
   group, which is the right wrapper for Shopsy, not a defect.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the
   EXPIRED path, not refreshed to a price nobody can pay.
7. **`api.indexnow.org` resolution is intermittent on this network, not dead.** It answered this
   tick after failing the last four. Keep the Bing GET fallback wired; do not assume either way.
8. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens →
   delete + regenerate).
9. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
   logging in touches owner credentials.

Daytime yield behaved better than the overnight ticks: 3 real single-product candidates across
12 groups instead of 1, and one of them was a store we under-cover. deal-ingest remains the
heavier source.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
