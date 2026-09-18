# DEAL-INGEST indiafreestuff tick — 2026-09-19 (IST)

## Discover

RSS is dead (rot #17, HTTP 000), so discovery ran off the listing pages via
`apps/api/scripts/ingest-ifs-proper.mjs`:

- `https://indiafreestuff.in/deals`
- `https://indiafreestuff.in/deals/superdeals`

Request gap **2,600 ms** (rule is ≥2,500). No 403 and no 429 — no back-off needed.

```
discovered 51 cards
DONE: 51 discovered, 48 resolved to a product
```

### The 3 that did not resolve to a product

| Card | `?rto=` lands on | Why dropped |
|---|---|---|
| `flipkart-bbd-the-big-billion-daysale-ear` | `dl.flipkart.com/dl/early-bird-deals-store` | sale hub, not a product |
| `zebronics-zeb-pspk-3…` | `dl.flipkart.com/dl/indiaXdesire-deals/…` | deal-store landing |
| `jiomart-quick-offer--free-rs100-shopping` | `www.jiomart.com/` | bare homepage |

All three are **rot #3** again: indiafreestuff's Flipkart/JioMart outbound links are
structurally dead — they point at campaign hubs, never at `/p/itm…`. Third tick running.

## Dedup vs the live DB

Prisma `findFirst({ OR: [{ productId }, { affiliateUrl: { contains: productId } }] })` —
no admin dedup endpoint exists, the DB is the only authority.

```
candidates 48  fresh 43
```

5 already live: `B07S96B1LJ`, `B0C7MFDNQ6`, `B0FDGVNSLH`, `B07TL2DWL5`, + 1.

## Verify — 43 fresh ASINs, ±₹1 and InStock

Read in the logged-in Amazon tab (Playwright tab 2, already on an `amazon.in` URL, so the
`fetch` is same-origin — curl is bot-blocked). Three batched `browser_evaluate` calls of
15 + 15 + 13, each returning `{price, mrp, inStock, couponBadge, image}` per ASIN.

| Verdict | Count |
|---|---|
| **Accepted** — live price within ₹1 of the card price, `#add-to-cart-button` present | **27** |
| Rejected — price drift beyond ₹1 | 11 |
| Rejected — out of stock | 5 |

**Drift rejects:** `B09C66H35H`, `B0BT7R9SG9`, `B0GGSVY9WQ`, `B0HF82ZLCQ`, `B0DPKTSBHX`,
`B0DVLVLKCJ`, `B0GDTJZKND`, `B0CXJ9MKPB`, `B07FPXXY5R`, `B09NQ5ZV2K`, `B09DD5YK4J`.
Worst case `B09DD5YK4J`: card ₹1,052, live **₹2,041**.

**Out of stock:** `B0FKH82DB4`, `B0G44SYXZL`, `B0FK2Y96FC`, `B0GVNT5XVN`, `B0CHRKCRK6`.

Drift stays the dominant reject reason across every source — **rot #2**, 11 of 43 this tick.

### Coupon reconciliation — rot #16, second confirmed instance

`B07K7CFTDJ` (Double Cleanser face wash): card says ₹449, PDP says **₹699** with a visible
`Apply ₹250 coupon` badge. 699 − 250 = 449 exactly — the source quotes the coupon-inclusive
price. Published at the **live ₹699** with `couponNote: "Apply ₹250 coupon"`, not rejected as
drift. Same shape as yesterday's `B0D7VF87F4` (₹590 badge). No shared code extracts that badge
yet; hand-read for the 22nd tick.

## Pushed — 27 deals, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 27**. Every row: Amazon affiliate
`?tag=ashoksachdev-21` on `/dp/ASIN`, image from `m.media-amazon.com` (never
`images.indiafreestuff.in`), title and description written fresh — nothing copied verbatim.

| ASIN | Price | MRP | Off | Product |
|---|---|---|---|---|
| B09BRF5XJM | ₹146 | ₹1,845 | 92% | DIY Crafts nylon cable-tie combo kit |
| B0CM38JVX4 | ₹2,550 | ₹13,999 | 82% | boAt Lunar Embrace AMOLED smartwatch |
| B0F43WZLYW | ₹3,972 | ₹8,700 | 54% | Crompton DuroElite 1000W mixer grinder |
| B0F1SZ5FTB | ₹365 | ₹3,995 | 91% | Sulfar car body cover, Nissan Kicks |
| B07K5V2451 | ₹306 | ₹4,290 | 93% | DIY Crafts garden misting nozzle kit |
| B0BR2BD2XN | ₹338 | ₹720 | 53% | Khadi handmade soap, pack of 9 |
| B01N9XW65V | ₹129 | ₹499 | 74% | PrettyKrafts felt desk organizer |
| B07K7CFTDJ | ₹699 | — | — | Double Cleanser face wash **(₹250 coupon)** |
| B0D9DDZ1BR | ₹320 | ₹620 | 48% | Niku automatic bubble gun |
| B0GYRRB7SX | ₹499 | ₹2,499 | 80% | Liberty LEAP7X sneakers |
| B0FQV22Q2G | ₹293 | ₹999 | 71% | LuvLap baby sweatshirt + pyjama set |
| B0H94Z47TS | ₹349 | ₹999 | 65% | Brand Conquer 1:28 die-cast SUV |
| B0F3JQNQL3 | ₹350 | ₹2,099 | 83% | Sulfar hand towel set of 4 |
| B0BYDS4Q3F | ₹999 | ₹2,099 | 52% | Philips Profile Shine 5m LED strip |
| B0FPRGNRFN | ₹194 | ₹1,949 | 90% | Tokyo Talkies women dress |
| B08JMQBY3Z | ₹749 | ₹2,099 | 64% | Symbol men's cotton chino shorts |
| B07W1J1Y8F | ₹1,043 | ₹2,145 | 51% | Larah by Borosil 19-pc opalware set |
| B0D49PXZ6M | ₹7,711 | ₹17,900 | 57% | Bajaj Armour Contempo 15L geyser |
| B07VWRK1RK | ₹498 | ₹1,134 | 56% | Cello Steel-X Benz 900ml, set of 2 |
| B0F5BD25VF | ₹217 | ₹668 | 68% | Pearlpet Blossom 1700ml jars, set of 4 |
| B0FLY7NWMG | ₹587 | ₹995 | 41% | Agaro MT5005 beard trimmer |
| B0BQBVVR1R | ₹1,620 | ₹5,999 | 73% | Puma Wired Run Pure sneakers |
| B018UCFQ26 | ₹259 | ₹499 | 48% | Probiker full-finger riding gloves |
| B09TL172CT | ₹849 | ₹4,495 | 81% | AireeZ P25 fitness watch |
| B0FG34VR4L | ₹4,523 | ₹8,995 | 50% | Cello Discovery Pro juicer mixer grinder |
| B01D37228E | ₹1,536 | ₹4,135 | 63% | Larah Diana 25-pc opalware set |
| B07TLFYKSR | ₹157 | ₹275 | 43% | Signora Ware 500ml steel container |

All 27 stores resolved to Amazon this tick — not a policy choice. The only non-Amazon
outbound links indiafreestuff served were the three dead Flipkart/JioMart hubs above.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <27 slugs>
DONE: IndexNow -> HTTP 200 for 29 urls
```

27 deal slugs + `/` + `/offers`. **HTTP 200**, no 422, Bing GET fallback not needed.
`sitemap.xml` is ISR 1800s and picks the batch up automatically; `llms.txt` is
`force-dynamic`, already carrying it. No new static route, so nothing to add by hand.

## CEO audit (verified against the DB after the push)

| Check | Value |
|---|---|
| Deals LIVE | **10,256** (10,229 → +27) |
| PENDING_REVIEW | 0 |
| EXPIRED | 257 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,601 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Prod endpoints | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` → all **200** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog is at 1 post today** against a 2-3 target. Not a violation yet (never 0), but the
   next BLOG tick must publish 2 or the day closes short. Flagged for the third tick running.
2. **tg-broadcast cursor 10,482 vs max deal id 10,601 = 119 behind**, up from 92 this morning —
   this tick's 27 deals widened it. The external cron is dead and draining now fires ~119
   channel messages in one burst, so it stays parked until the owner says go.

## Rot list — 18 items, 3 re-confirmed today

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 22nd tick hand-derived.
2. **Re-confirmed.** Source-vs-live price drift is the dominant reject reason — 11 of 43 today.
3. **Re-confirmed.** indiafreestuff Flipkart/JioMart links structurally dead — all 3 resolve drops.
4. tg-broadcast external cron not firing — drift now **119**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected, resolves fine.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s.
13. `link.amazon` shortlinks can expand to `/s?hidden-keywords=` — reject must run post-resolve.
14. Flipkart PDPs serve no ld+json to a real browser either, and a stale tab lies.
15. Seen-cache and DB can disagree; only the DB check is authority.
16. **Re-confirmed.** The Amazon ₹-coupon badge is extracted by no shared code — `B07K7CFTDJ`
    is the second confirmed instance in two days.
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser; kills the `bitli.in` channel.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
