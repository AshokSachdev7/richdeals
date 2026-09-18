# TELEGRAM-DEAL-MONITOR tick — 2026-09-19d (IST)

Fourth Telegram tick of the day. Pushed **1** deal. The tick's real value was
elsewhere: a five-row price audit against live Amazon that came back **clean**, and two
corrections to the rot list.

## Sweep

Playwright MCP profile `richDeals` → `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` covering all 13 groups in `data/tg-groups.json`.
Seen-cache at tick start: **1,745** ids.

The "Telegram" service row again carried a live login code in its last-message preview.
Skipped as a non-source chat; the value is not recorded here, in the commit, in the
terminal reply, or anywhere else, and was not acted on.

6 shortlinks came off the sidebar:

| Shortlink | Resolves to | Verdict |
|---|---|---|
| `link.amazon/B0fYFLAAS` | `amazon.in/s?k=U.S.+Polo+Assn.…` | REJECT — search page (rot #13) |
| `bitli.in/YJLzp2n` | `trackingv3.linkredirect.in/…meesho.com/s/p/hlnv0j` | REJECT — Meesho unverifiable (rot #18) |
| `rogerkart.com/r/pVQu7jR` | itself, no redirect followed | REJECT — rot #5 re-confirmed |
| `link.amazon/B05yvriRF` | `amazon.in/dp/B0G38DGNKM` | candidate |
| `fkrt.co/l5KOxl` | `flipkart.com/syska-10000-mah-power-bank-fast-charging/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6` | **real `/p/itm…` PDP** |
| `amzn.to/4uZXfjK` | `amazon.in/dp/B07QX21WZQ` | candidate |

### Rot #3 narrowed — a correction to yesterday's entry

The 2026-09-19b tick widened rot #3 to "Telegram `fkrt.*` shorteners never yield a
canonical PDP". That is too broad. **`fkrt.co` does yield `/p/itm…`.** It is `fkrt.it`
and `fkrt.cc` that land on tracking and collection URLs. The rot item is now scoped to
those two hosts only.

## Deeper history — ONLINE SHOPPING DEALS (13 posts)

Already open in tab 0. 12 `link.amazon` codes resolved: 11 clean ASINs plus one
`gp/product/B0CL9LCPZV?price-bh=243.55`. **Zero `/s?` rejects in this set.**

## Dedup — seen cache + live DB

15 ids checked against the cache and Prisma. **All 15 already in the cache, 13 already
LIVE.** Only `B0CL9LCPZV` and the Syska pid `PWBGGD4THDQZYAY6` were absent from the DB.
That chat is fully ingested; nothing new to take from it.

## Price audit — 5 live rows verified

One batched `browser_evaluate` in the logged-in Amazon tab (same-origin `fetch` +
`DOMParser`).

| ASIN | Product | Source ₹ | Live ₹ | DB ₹ | Verdict |
|---|---|---|---|---|---|
| B0CL9LCPZV | Kica high-waist flared pants | 243.55 | **1,019** | — | **REJECT — 4x drift** |
| B07QX21WZQ | TrustBasket 6" pot, set of 12 | 151 | 549 | 549 | DB correct, source wrong |
| B07YWM9WMG | Biotique coconut body lotion | 80 | 100 | 100 | DB correct, source wrong |
| B0G38DGNKM | Lavie Luxe Quaro26 satchel | 3,500 | 3,459 | 3,459 | DB correct, source wrong |
| B0G5PN6HHY | VW Visio 8.5 kg washer | 5,199 | 5,199 | 5,199 | DB correct |

**Zero reprices needed — every DB price matched live Amazon.** All five in stock, no
coupon badges.

The Kica row is worth naming: the `?price-bh=243.55` query param in the shortlink target
looks like a price and is 4x off the real one. It is a decoy, not a source price, and
the only thing that caught it was verifying against the live PDP.

## Deeper history — SB Loots And Deals (20 messages)

Trusted click, ref `f2e3519`. Mostly the 2026-09-19b batch. 4 unprocessed `amazn.lt`
codes resolved.

| ASIN | Cache | DB |
|---|---|---|
| B0FZBGXHY9 Bombay Shaving groomer | **new** | **LIVE #10537 ₹799** |
| B0GKPG5MMS Sounce mouse pad | new | NOT IN DB — fresh |
| B0D7VF87F4 Havells mixer | seen | LIVE #10541 ₹2,534 |
| B0DMWT59KQ pTron Funk Wave V1 | seen | NOT IN DB |

**Rot #15 re-confirmed a third time** — the cache called `B0FZBGXHY9` new while it is
LIVE. Only the DB is authority.

Verification of the three unresolved:

| ASIN | ₹ | MRP | Stock | Coupon | Verdict |
|---|---|---|---|---|---|
| B0GKPG5MMS | **129** | **499** | yes | none | **ACCEPT — 74% off** |
| B0DMWT59KQ | — | — | **no** | — | REJECT — OOS, second consecutive tick |
| B0D7VF87F4 | 2,534 | 3,995 | yes | `Apply ₹590 coupon` | already LIVE and already correct |

Source-quoted MRP 499 matched the live MRP exactly, confirming the shortlink mapped to
the product the post named.

**CEO-mode write attempted, found unnecessary.** I read row 10541 intending to annotate
the ₹590 coupon. It already carries
`couponNote: "Tick the ₹590 coupon on the product page – effective price ₹1,944."`
with price 2,534 / mrp 3,995 / 37% off. No write made.

## Deeper history — Dealdost (18 messages)

Trusted click, ref `f2e3534`. **Zero new candidates.** All multi-product, category,
"Loot" or "from Rs." posts, plus three shortlinks already resolved and rejected in the
2026-09-19b tick and two `bitli.in` → Meesho.

## Pushed — 1 deal, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 1, created:true**. Amazon affiliate
`?tag=ashoksachdev-21` on `/dp/ASIN`, image from `m.media-amazon.com`, title and
description written fresh — nothing lifted from the Telegram post.

| ASIN | Price | MRP | Off | Slug |
|---|---|---|---|---|
| B0GKPG5MMS | ₹129 | ₹499 | 74% | `sounce-ergonomic-mouse-pad-non-slip-waterproof-b0gkpg5mms` |

`https://richdeals.in/<slug>` → **HTTP 200** after the push.

Seen cache **1,745 → 1,747** (all 19 ids resolved this tick folded in, rejects included,
so none costs a resolve next tick).

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs sounce-ergonomic-mouse-pad-non-slip-waterproof-b0gkpg5mms
DONE: IndexNow -> HTTP 200 for 3 urls
```

1 deal slug + `/` + `/offers` from the script's auto-prepend. **HTTP 200**, no 422, Bing
GET fallback not needed. `sitemap.xml` is ISR 1800s and picks the batch up on its own;
`llms.txt` is `force-dynamic` and already carries it. No new static route.

## Unfinished — Syska power bank

`fkrt.co/l5KOxl` gave a clean `/p/itm…` PDP with `pid=PWBGGD4THDQZYAY6`, source ₹799,
not in the DB. It could not be verified: the curl fetch returned **HTTP 403, 0 bytes**.
Unverified means unpushed. It needs a browser tab on flipkart.com next tick.

## CEO audit (verified against the DB after the push)

| Check | Value |
|---|---|
| Deals LIVE | **10,277** |
| PENDING_REVIEW | 0 |
| EXPIRED | 258 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,623 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog still at 1 post for 2026-09-19** against the 2-3 target. **Ninth tick in a row
   flagging it**, and the day is nearly closed. Never 0, so not a violation, but the day
   closes short unless a BLOG tick fires with 2.
2. **tg-broadcast cursor 10,482 vs max deal id 10,623 = 141 behind.** External cron still
   dead. Draining fires ~141 channel messages in one burst, so it stays parked until the
   owner says go.

## Rot list — 18 items, 1 narrowed, 1 widened, 1 re-confirmed

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 25th tick hand-derived.
2. Source-vs-live price drift the dominant reject reason; the Kica `price-bh=243.55` decoy is a new shape of it.
3. **NARROWED.** `fkrt.co` DOES resolve to a canonical `/p/itm…` PDP. Only `fkrt.it` and
   `fkrt.cc` land on tracking/collection URLs. Yesterday's "all `fkrt.*` are dead" was wrong.
4. tg-broadcast external cron not firing — drift now **141**.
5. `curlFinal` cannot follow `rogerkart.com/r/…` — re-confirmed.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected; 4 of 4 resolved cleanly again.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the
    sitemap from its auto-prepend (one-line fix available, still not applied).
13. `/s?` search pages hide behind `link.amazon` and plain `amzn.to` — re-confirmed once today.
14. **WIDENED.** Flipkart PDPs now return **HTTP 403, 0 bytes** to curl outright. Until
    today the problem was merely missing ld+json; now there is no response body at all.
    Every Flipkart verify must go through a browser tab.
15. **Re-confirmed, third time.** Seen-cache said "new" for an ASIN that is LIVE.
16. The Amazon ₹-coupon badge is extracted by no shared code (badge seen again on B0D7VF87F4).
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser; re-confirmed via two `bitli.in` links.

## Open owner decisions (6)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
6. A periodic re-verify sweep over old LIVE rows. **Today's five-row audit came back
   100% clean**, which is the first hard evidence on this question — it argues the sweep
   can be infrequent rather than that it is unnecessary.
