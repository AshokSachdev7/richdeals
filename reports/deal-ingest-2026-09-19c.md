# DEAL-INGEST indiafreestuff tick — 2026-09-19c (IST)

Third indiafreestuff tick of the day. **Zero deals pushed.** Every one of the 13 fresh
candidates failed verification — and the finding that matters is *which* 13 they were:
**the exact same 13 that the 2026-09-19b tick rejected eight hours ago.** Not a similar
set, not an overlapping set. The same thirteen ASINs, character for character.

That turns a boring zero-yield tick into a concrete, fixable rot item: the pipeline has
no memory of its own rejections, so it pays the full discovery + resolve + verify cost on
a known-dead candidate set every single sweep, forever.

## Discovery

| Step | Result |
|---|---|
| RSS `feeds.feedburner.com/indiafreestuff` | **HTTP 000** — rot #17, dead again |
| Homepage fallback | HTTP 200, 282,272 b |
| `ingest-ifs-proper.mjs` over `/deals` + `/deals/superdeals` | **53 discovered → 50 resolved** |
| Request spacing | `GAP = 2600` ms, no 403/429 seen |

Three cards dropped at resolve time, all correctly:

| Card slug | `?rto=` resolved to | Reason |
|---|---|---|
| `flipkart-bbd-the-big-billion-daysale-ear` | `dl.flipkart.com/dl/early-bird-deals-store` | sale hub |
| `jiomart-quick-offer--free-rs100-shopping` | `jiomart.com/` | homepage |
| `zebronics-zeb-pspk-3sound-feast-60with-b` | `dl.flipkart.com/dl/indiaXdesire-deals/...` | collection |

**All 50 survivors resolved to Amazon.** Not one non-Amazon merchant in the whole sweep,
which is the second tick running that ALL STORES has had nothing to act on — the source's
current board is Amazon-only, not our filter being narrow.

## Dedup vs live DB

Prisma, by `productId`. **50 candidates → 37 already in DB → 13 fresh.**

## Verification — 13 fresh, 13 rejected

One batched `browser_evaluate` in the logged-in Playwright Amazon tab (same-origin `fetch`
+ `DOMParser`; curl stays bot-blocked). Selectors: `.priceToPay .a-price-whole`,
`.basisPrice`, `.savingsPercentage`, `#add-to-cart-button`, `data-a-dynamic-image`,
₹-coupon regex. 900 ms spacing.

| ASIN | Card ₹ | Live ₹ | MRP | Stock | Verdict |
|---|---|---|---|---|---|
| B0FKH82DB4 | 585 | — | — | **no** | REJECT — OOS (3rd tick) |
| B0DDXJ146Q | 91 | — | — | **no** | REJECT — OOS (3rd tick) |
| B09C66H35H | 71 | **210** | none | yes | REJECT — drift ×3 |
| B0BT7R9SG9 | 596 | **1,399** | 2,999 | yes | REJECT — drift ×2.3 |
| B0GGSVY9WQ | 1,452 | **3,599** | 4,799 | yes | REJECT — drift ×2.5 |
| B0HF82ZLCQ | 379 | **399** | 1,299 | yes | REJECT — drift ₹20 |
| B0DPKTSBHX | 620 | **2,276** | 7,999 | yes | REJECT — drift ×3.7 |
| B0DVLVLKCJ | 674 | **749** | 2,499 | yes | REJECT — drift ₹75 |
| B0GDTJZKND | 346 | **365** | 2,392 | yes | REJECT — drift ₹19 |
| B0G44SYXZL | 121 | **221** | 399 | yes | REJECT — drift ₹100 |
| B07FPXXY5R | 91 | **95** | 195 | yes | REJECT — drift ₹4 |
| B09NQ5ZV2K | 183 | **449** | 999 | yes | REJECT — drift ×2.5 |
| B0GVNT5XVN | 552 | **1,590** | 3,180 | yes | REJECT — drift ×2.9 |

Zero coupon badges. Every in-stock row returned a real `m.media-amazon.com` image and a
plausible MRP, so the reject reason is price drift alone, never a broken extraction.

### The 13 are the 2026-09-19b reject list, unchanged

That tick rejected 9 on drift (`B09C66H35H` `B0BT7R9SG9` `B0GGSVY9WQ` `B0HF82ZLCQ`
`B0DPKTSBHX` `B0DVLVLKCJ` `B0GDTJZKND` `B07FPXXY5R` `B09NQ5ZV2K`) and 4 on OOS
(`B0FKH82DB4` `B0G44SYXZL` `B0DDXJ146Q` `B0GVNT5XVN`). **13 for 13 overlap.**

The card prices have not moved in eight hours. The live prices have not moved either. This
is not a race between a stale card and a moving price — the source's cards for these
products are simply wrong and are not being corrected.

Two rows did change state, and one of them corrects advice I gave last tick:

- **`B0G44SYXZL`** (Naruto luggage tag) was OOS, is now **in stock at ₹221** against a card
  saying ₹121. Reject reason changed from stock to drift.
- **`B0GVNT5XVN`** (F Gear Akira 26L backpack) was OOS **two consecutive ticks**, and the
  0919b report said it "should be treated as permanently gone, not retried." **It is back
  in stock at ₹1,590.** That advice was wrong and is withdrawn: on Amazon, two consecutive
  OOS reads mean nothing about permanence. Only drift keeps it out now.

### New rot — the pipeline has no rejection memory

Every sweep re-discovers, re-resolves and re-verifies the same dead set. This tick that
cost 50 `?rto=` resolutions at 2.6 s spacing plus 13 Amazon PDP fetches, to reach a
conclusion identical to the one reached eight hours earlier.

The fix is small and not applied here (it is a code change, and this tick stages a report
only): persist a reject cache keyed on `productId` + card price + reason, and skip
re-verification while the card price is unchanged. A card whose price *moves* must still
be re-verified — the cache keys on the price precisely so a corrected card re-enters the
funnel. This is a cost optimisation, never a dedup gate; the DB stays the only authority
(rot #15 is exactly what happens when a cache gets promoted past its station).

## Outcome — zero pushes, so no ping was due

No candidate cleared verification, so `/admin/deals/bulk` was not called and **no IndexNow
ping was run**. Stating it explicitly because the freshness rule says a batch that skipped
the ping is not shipped: there was no batch. Nothing is sitting unpinged in the DB.

## Prod endpoints — SITEMON sweep (all 200)

| URL | Code | Size | Time |
|---|---|---|---|
| `/` | 200 | 300,818 b | 0.327 s |
| `/offers` | 200 | 60,233 b | 0.113 s |
| `/blog` | 200 | 149,235 b | 0.561 s |
| `/sitemap.xml` | 200 | 2,086,629 b | 0.279 s |
| `/feed.xml` | 200 | 35,025 b | 0.090 s |
| `/api/deals` | 200 | 33,335 b | 0.101 s |
| `/llms.txt` | 200 | 14,972 b | 0.289 s |

## CEO audit (verified against the DB)

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

1. **Blog closed 2026-09-19 at 1 post** against the 2-3 target. **Eleventh consecutive tick
   flagging it**, and the day is now over — 09-19 lands short. Never 0, so the hard rule
   holds, but the cadence rule broke and the `9 */6 * * *` BLOG cron plainly missed its
   later slots. This has now been reported often enough that the flag itself is the rot:
   either the cron gets recreated or the target gets restated.
2. **tg-broadcast cursor 10,482 vs max deal id 10,623 = 141 behind.** External cron still
   dead. Draining fires ~141 channel messages in one burst, so it stays parked pending the
   owner's explicit go-ahead.

## Rot list — 19 items (1 new, 1 re-confirmed, 1 corrected)

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 27th tick hand-derived.
2. **Re-confirmed, hardest evidence yet.** Source-vs-live price drift is the dominant reject
   reason: **11 of 13 this tick, and the identical card prices from eight hours ago.**
3. `fkrt.co` DOES resolve to a canonical `/p/itm…` PDP. Only `fkrt.it` / `fkrt.cc` are dead.
4. tg-broadcast external cron not firing — drift **141**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected earlier, resolves cleanly.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes.
11. ~605 untracked scratch files under `apps/api/` — any broad `ls` there is expensive.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the
    sitemap from its auto-prepend (one-line fix, still unapplied — it is a code change and
    this tick stages a report only).
13. `/s?` search pages hide behind `link.amazon` and plain `amzn.to`.
14. Flipkart 403/0-bytes is **curl-only**; the Playwright tab loads the PDP with usable
    ld+json. Real image host is `rukmini1.flixcart.com`, sourced from ld+json `image[]`.
15. `data/tg-multi-seen.json` is a resolve-cost cache, **never** a dedup authority. DB only.
16. The Amazon ₹-coupon badge is extracted by no shared code.
17. indiafreestuff Feedburner RSS dead (HTTP 000) — **re-confirmed this tick**.
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.
19. **NEW.** The indiafreestuff pipeline has no rejection memory: it re-discovers,
    re-resolves and re-verifies an identical dead candidate set every sweep. 50 resolves +
    13 PDP fetches spent this tick to reproduce a result already on record.

**Withdrawn:** the 0919b claim that two consecutive OOS reads mean a product is
permanently gone. `B0GVNT5XVN` came back in stock on the third read.

## Open owner decisions (7)

1. Ratify publish-at-verified-live-price + the ±₹1 tolerance and 30% floor in CLAUDE.md,
   and state that coupon-inclusive source prices are reconciled, not rejected. **This tick
   sharpens the question:** 11 of 13 cards were rejected purely because the source's number
   disagreed with Amazon's, while 9 of those 11 were in stock with a genuine live discount
   (B0DPKTSBHX 72%, B0DVLVLKCJ 70%, B0HF82ZLCQ 69%, B09NQ5ZV2K 55%, B0BT7R9SG9 53%,
   B07FPXXY5R 51%, B0GVNT5XVN 50%, B0G44SYXZL 45%). Under a publish-at-live rule those
   nine ship today. Under the current strict rule they never ship at all, because the
   source will not fix its cards. **Nothing was published on the loose reading — the strict
   rule was applied.** The decision is worth real inventory.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
6. A periodic re-verify sweep over old LIVE rows.
7. **NEW.** Persist a reject cache for indiafreestuff candidates (rot #19), keyed on
   `productId` + card price so a corrected card re-enters the funnel.
