# TELEGRAM-DEAL-MONITOR tick — 2026-09-19b (IST)

Second Telegram tick of the day. The morning tick (`reports/telegram-2026-09-19.md`)
pushed 0 deals; this one pushed **6**.

## Sweep

Playwright MCP profile `richDeals` → `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` covering all 13 groups in `data/tg-groups.json`.
Seen-cache at tick start: **1,728** ids.

**Sidebar sweep yielded zero candidates** — every newest post was loot / multi-product /
category / freebie / app-promo. The "Telegram" service row again carried a live login code
in its preview; skipped as a non-source chat, value not recorded here or anywhere else.

Sidebar previews being empty is the normal overnight-into-morning shape. Rather than call the
tick done at 0, two groups were opened for deeper history.

## Deeper history — Dealdost (22 messages)

3 shortlinks resolved, 0 usable.

| Shortlink | Resolves to | Verdict |
|---|---|---|
| `amzn.to/3UXcuh8` | `amazon.in/s?k=perfume+for+man&rh=p_4:BELLA+VITA+LUXURY,…` | **REJECT — search page** |
| `fkrt.cc/hHszr3I` | `dl.flipkart.com/mobile-accessories/~cs-eewlpbjsku/pr?…` | REJECT — collection page |
| `amzn.to/4yQLTRz` | `amazon.in/dp/B01CCGW732` | SEEN + LIVE id 10351 ₹429 (Cetaphil) |

The first row **widens rot #13**. Until today the `/s?` trap was only seen on `link.amazon`
shortlinks. A plain `amzn.to` does it too, so the post-resolve `/s?` assert is not optional
for any Amazon shortlink host.

## Deeper history — SB Loots And Deals (18 messages)

This is where the yield was. Post format is one product per post:
`"<product name> … MRP - <n> BUY - <shortlink>"`. 14 shortlinks resolved.

| Host | Count | Result |
|---|---|---|
| `amazn.lt` | 9 | all clean `amazon.in/dp/<ASIN>?tag=bhavesh015-21` (their tag, stripped) |
| `fkrt.it` | 5 | **all rejected** |

The 5 Flipkart rejects all land on `https://www.flipkart.com/flipkart/p/item?pid=…&affid=inf_…`
— not the required `/p/itm…` canonical PDP, same tracking-landing shape as DesiDime's
`/desidime/p/desidime_deals`. Affected: TRIGGR Horizon 16, TRIGGR Trinity Neo, Flair Dart
pencils ×50, boAt 10000 mAh power bank, Kenstar AeroGlide chimney. **Rot #3 widens** — the
dead-Flipkart-link problem is not indiafreestuff-specific, the Telegram `fkrt.*` shorteners
do the same thing.

### Opening a different chat

`location.hash` and `browser_navigate` both still fail (0 messages). Only a trusted click
works, and the exact invocation matters:

```
browser_find({ text: "SB Loots And Deals" })            // NOT { query: … }
browser_click({ target: "f2e3519", element: "…", ref: "f2e3519" })
```

`target` must be the **ref id string**. A human description there fails with
"does not match any elements". Recorded because two prior ticks lost time to it.

## Dedup — seen cache + live DB

9 ASINs. Cache said all 9 new. The DB disagreed on two:

| ASIN | Cache | DB |
|---|---|---|
| `B07S96B1LJ` | new | **LIVE** id 8989 ₹1,343 `amazonbasics-drill-and-driver-multi-bit-set-100-piece` |
| `B0BHTRRTPC` | new | **LIVE** id 2151 ₹382 `vaseline-total-moisture-body-wash-…` |
| other 7 | new | NOT IN DB |

**Rot #15 re-confirmed.** The seen-cache is a cost optimisation, never an authority — only
the Prisma check catches these. 7 fresh went to verification.

## Verify — 7 ASINs

One batched `browser_evaluate` in the logged-in Amazon tab (same-origin `fetch` + `DOMParser`;
curl is bot-blocked). Read `#productTitle`, `.priceToPay .a-price-whole`, `.basisPrice`,
`#add-to-cart-button`, the coupon badge, and `data-old-hires`.

| ASIN | Product | Live ₹ | MRP | In stock | Verdict |
|---|---|---|---|---|---|
| B0D11MFLN3 | FRONTECH TWS 5W speaker, RGB | 579 | 1,050 | yes | ACCEPT |
| B0CP2K2XN8 | SaleOn 8.3×5 tech pouch | 298 | 899 | yes | ACCEPT |
| B0H41FFYYF | Crystal 11-pc non stick cookware | 1,344 | 4,499 | yes | ACCEPT |
| B07NY2WXPH | THEMISTO 27-in-1 screwdriver set | 278 | 652 | yes | ACCEPT |
| B07WCMQSXB | Tygot gorilla tripod 33 cm | 229 | 1,999 | yes | ACCEPT |
| B0DSPYPCHB | Sleeping panda silicone night light | 399 | 1,999 | yes | ACCEPT |
| B0DMWT59KQ | pTron Funk Wave V1 soundbar | — | — | **no** | **REJECT — out of stock** |

No coupon badges on any of the 7.

**Every MRP matched the MRP quoted in the source post exactly** (1,050 / 899 / 4,499 / 652 /
1,999 / 1,999), which is what confirms the shortlink mapped to the product the post named.

### Why there is no price-drift column this tick

SB Loots posts quote `MRP - <n>` and **no sale price**. There is no source figure to diff
against, so the ±₹1 drift rule has nothing to bite on. The rule that actually applied was
publish-at-verified-live-price + in-stock. That is exactly **open owner decision #1** — it has
now been the operative rule for three ticks running and is still not written into CLAUDE.md.

## Pushed — 6 deals, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 6**, all `created:true`. Amazon affiliate
`?tag=ashoksachdev-21` on `/dp/ASIN`, images from `m.media-amazon.com`, titles and
descriptions written fresh — nothing lifted from the Telegram posts.

| ASIN | Price | MRP | Off | Slug |
|---|---|---|---|---|
| B0D11MFLN3 | ₹579 | ₹1,050 | 45% | `frontech-true-wireless-5w-multimedia-speaker-with-rgb-lights-b0d11mfln3` |
| B0CP2K2XN8 | ₹298 | ₹899 | 67% | `saleon-tech-pouch-gadget-organizer-8-3-x-5-inch-b0cp2k2xn8` |
| B0H41FFYYF | ₹1,344 | ₹4,499 | 70% | `crystal-11-pcs-non-stick-cookware-set-b0h41ffyyf` |
| B07NY2WXPH | ₹278 | ₹652 | 57% | `themisto-27-in-1-precision-screwdriver-set-b07ny2wxph` |
| B07WCMQSXB | ₹229 | ₹1,999 | 89% | `tygot-gorilla-tripod-33-cm-flexible-mini-stand-b07wcmqsxb` |
| B0DSPYPCHB | ₹399 | ₹1,999 | 80% | `sleeping-panda-silicone-night-light-for-nursery-b0dspypchb` |

All 6 pages verified **HTTP 200** on `https://richdeals.in/<slug>` after the push.

Seen cache **1,728 → 1,737** (all 9 resolved ASINs added, including the OOS reject and the
two already-live ones, so none of them costs a resolve next tick).

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <6 slugs>
DONE: IndexNow -> HTTP 200 for 8 urls
```

6 deal slugs + `/` + `/offers` from the script's auto-prepend. **HTTP 200**, no 422, Bing GET
fallback not needed. `sitemap.xml` is ISR 1800s and picks the batch up on its own; `llms.txt`
is `force-dynamic` and already carries it. No new static route.

## CEO audit (verified against the DB after the push)

| Check | Value |
|---|---|
| Deals LIVE | **10,262** (10,256 → +6) |
| PENDING_REVIEW | 0 |
| EXPIRED | 257 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,607 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Prod endpoints | `/` 308→200 (canonical redirect, expected), `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` all **200** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog still at 1 post for 2026-09-19** against the 2-3 target. **Fifth tick in a row
   flagging it.** Not a violation (never 0), but the day closes short unless the next BLOG
   tick publishes 2. This is now the longest-running open item on the board.
2. **tg-broadcast cursor 10,482 vs max deal id 10,607 = 125 behind**, widened by 6 from this
   push. External cron still dead. Draining now fires ~125 channel messages in one burst, so
   it stays parked until the owner says go.

## Rot list — 18 items, 3 re-confirmed and 2 widened today

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 23rd tick hand-derived.
2. Source-vs-live price drift is the dominant reject reason across every source (not exercised
   this tick — SB Loots posts carry no sale price to diff).
3. **Widened.** Flipkart outbound links structurally dead — no longer just indiafreestuff:
   Telegram `fkrt.it` and `fkrt.cc` shorteners also resolve to tracking/collection URLs, never
   to `/p/itm…`. 5 of 5 rejected today.
4. tg-broadcast external cron not firing — drift now **125**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected, and re-confirmed working: 9 of 9 resolved cleanly.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the sitemap
    from its auto-prepend (one-line fix available, still not applied).
13. **Widened.** `/s?` search pages hide behind `link.amazon` **and** plain `amzn.to`. The
    post-resolve reject must run on every Amazon shortlink host, not just `link.amazon`.
14. Flipkart PDPs serve no ld+json to a real browser either, and a stale tab lies.
15. **Re-confirmed.** Seen-cache said "new" for two ASINs that are both LIVE. Only the DB is authority.
16. The Amazon ₹-coupon badge is extracted by no shared code (no badges hit this tick).
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected. **Sharpened today: SB Loots
   posts carry MRP only, so there is no source price to diff and this rule is the only one
   that can apply.**
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
