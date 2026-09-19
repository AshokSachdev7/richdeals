# DEAL-INGEST indiafreestuff tick — 2026-09-19d (IST)

Fourth indiafreestuff tick of the day. **Zero deals pushed** — 12 price-drift rejects and
1 out of stock. No push, therefore no IndexNow ping. The drift was not taken at face value:
the resolved URLs carried `smid=`/`aod=1` seller pins, so a pinned-offer hypothesis was
tested and **disproved** before the rejections were written down.

## Discovery

`node apps/api/scripts/ingest-ifs-proper.mjs ./_ifs-0919d.json`, listing pages only
(`/deals`, `/deals/superdeals`), 2600 ms between their requests. No 403, no 429, no
back-off needed.

| Stage | Count |
|---|---|
| Cards discovered | 53 |
| Resolved to a real store URL | 50 |
| Dropped at resolution | 3 |

All 50 survivors are Amazon.

### The 3 drops — rot #3, fifth consecutive tick

| Source slug | Resolves to |
|---|---|
| `flipkart-bbd-the-big-billion-daysale-ear` | `dl.flipkart.com/dl/early-bird-deals-store` |
| `jiomart-quick-offer--free-rs100-shopping` | bare JioMart homepage |
| `zebronics-zeb-pspk-3sound-feast-60with-b` | `dl.flipkart.com/dl/indiaXdesire-deals/…` |

indiafreestuff's Flipkart and JioMart outbound links land on tracking/sale hubs, not
products. Correctly rejected — a hub page has no verifiable price.

## Dedup vs live DB

Prisma, key `productId`, against the live DB (not a file cache).

**50 candidates → 37 already in DB → 13 fresh.**

## Verification — 13 fresh, 13 rejected

One batched `browser_evaluate` in the logged-in Amazon tab (curl is bot-blocked),
same-origin `fetch(..., {credentials:'include'})` + `DOMParser`, 700 ms apart. Read
`.priceToPay .a-price-whole`, `.basisPrice .a-offscreen`, `#add-to-cart-button`,
`#landingImage[data-a-dynamic-image]`.

| ASIN | Product | Card ₹ | Live ₹ | MRP | In stock | Verdict |
|---|---|---|---|---|---|---|
| B0FKH82DB4 | Qube jacket | 585 | 1199 | 2899 | yes | drift ₹614 |
| B09C66H35H | Viva swim cap | 71 | 210 | — | yes | drift ₹139 |
| B0BT7R9SG9 | Pepe Jeans boys | 596 | 1399 | 2999 | yes | drift ₹803 |
| B0GGSVY9WQ | U.S. Polo sneakers | 1452 | 3209 | 4799 | yes | drift ₹1757 |
| B0HF82ZLCQ | octopus plush | 379 | 399 | 1299 | yes | drift ₹20 |
| B0DPKTSBHX | High Star blazer | 620 | 2276 | 7999 | yes | drift ₹1656 |
| B0DVLVLKCJ | Lavie slingbag | 674 | 749 | 2499 | yes | drift ₹75 |
| B0GDTJZKND | baby wipes | 346 | 365 | 2392 | yes | drift ₹19 |
| B0G44SYXZL | Naruto luggage tag | 121 | 221 | 399 | yes | drift ₹100 |
| B0DDXJ146Q | 17th birthday décor | 91 | — | — | **no** | out of stock |
| B07FPXXY5R | Pigeon gas lighter | 91 | 95 | 195 | yes | drift ₹4 |
| B09NQ5ZV2K | cricket helmet cover | 183 | 449 | 999 | yes | drift ₹266 |
| B0GVNT5XVN | F Gear backpack | 552 | 1590 | 3180 | yes | drift ₹1038 |

No ₹-coupon badge on any of the 13 — the gap is not an uncaptured coupon. Every image
resolved to `m.media-amazon.com`. Tolerance is ±₹1 (publish at the verified live price
inside it), so even the ₹4 lighter fails.

## The smid / aod investigation — hypothesis raised and disproved

13 for 13 failing is a suspicious result, so the verifier was checked before the source
was blamed. The resolved `final` URLs explained why it looked suspicious:

```
B0FKH82DB4  …/dp/B0FKH82DB4?smid=A1WYWER0W24N8S&tag=dealhind-21
B09C66H35H  …/dp/B09C66H35H?aod=1&tag=dealhind-21
B0GGSVY9WQ  …/dp/B0GGSVY9WQ?smid=A1WYWER0W24N8S&tag=dealhind-21
```

**Hypothesis:** the source quotes a seller-pinned or alternate (AOD) offer that a plain
buybox read never sees, so the "drift" is a verifier blind spot, not a bad card.

Two tests, both in the logged-in tab:

1. **Re-fetch with the pin intact** — `/dp/ASIN?smid=…&th=1&psc=1` for the three
   `smid` ASINs. Returned **exactly the same price** as the plain buybox fetch:
   1199 / 1399 / 3209. A `smid` pin does not change the read price.
2. **AOD ajax endpoint** — `/gp/product/ajax/ref=aod_page_1?asin=<ASIN>&pc=dp&experienceId=aodAjaxMain`
   with `x-requested-with: XMLHttpRequest`, for all 6 `aod=1` ASINs. The response carried
   **zero** `#aod-offer` / `#aod-pinned-offer` price nodes — `offers: []`, `min: null`.
   Not a usable alternate-price source as called; no price was inferred from it.

Hypothesis disproved. The buybox read is right and the drift is real. Recording the dead
end so the next tick does not spend a browser round-trip re-testing it.

## Cross-tick finding — strengthens rot #19

Nine of these 13 (B09C66H35H, B0BT7R9SG9, B0GGSVY9WQ, B0HF82ZLCQ, B0DPKTSBHX, B0DVLVLKCJ,
B0GDTJZKND, B07FPXXY5R, B09NQ5ZV2K) were drift-rejected in tick **09-19b**, hours earlier,
at near-identical numbers. Three more (B0FKH82DB4, B0G44SYXZL, B0GVNT5XVN) were OOS
rejects there. State changes since:

| ASIN | 09-19b | now |
|---|---|---|
| B0FKH82DB4 | OOS | in stock, drift ₹614 |
| B0GVNT5XVN | OOS (2nd consecutive tick) | in stock, drift ₹1038 |
| B0G44SYXZL | OOS | in stock, drift ₹100 |
| B0DDXJ146Q | — | OOS |

So the "13 fresh" are not fresh at all in any useful sense: they are the residue that
indiafreestuff keeps re-listing and never corrects. The pipeline dedups against published
deals only — it has **no memory of rejections** — so every tick re-resolves, re-fetches and
re-verifies the same dead set. That is roughly 13 Amazon PDP fetches plus 13 redirect
resolutions of pure waste per tick, and it is why four consecutive ticks yielded zero.
They were re-verified, not assumed — a stale reject must never be trusted — but a reject
cache with a TTL would let the re-check happen once a day instead of once an hour.

Owner decision #7 (persist a reject cache) is the fix. It is the highest-value item on the
open list now, because it is the difference between a tick that costs 26 network calls to
learn nothing and one that costs 2.

## Outcome — no push, so no ping was due

Zero deals cleared verification → no `/admin/deals/bulk` call → **no IndexNow ping was
run**. Stated explicitly because the freshness rule says a skipped ping means an unshipped
batch; here there is no batch. Nothing is sitting unpinged in the DB.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE 10278 · PENDING_REVIEW **0** · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4 |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10624 — **drift 142**, unchanged (rot #4) |
| Unpushed commits before this tick | 0 |

Nothing new rotted. Deal counts are identical to the 09-19g Telegram tick's reading, which
is consistent: no source has published anything since.

## Rot standing — 29 items

Reconfirmed this tick: **#1** (no Amazon extractor in `ingest-common.mjs` — the verifier
is still hand-written per tick in a `browser_evaluate`), **#2** (price drift is the
dominant reject reason, now 12/13), **#3** (Flipkart/JioMart outbound links resolve to
tracking landings — 3 drops), **#11** (3 more scratch files created under `apps/api/`,
deleted before staging), **#17** (Feedburner RSS dead, homepage fallback used),
**#19** (no rejection memory — this tick is the clearest evidence yet).

Nothing corrected and nothing new added. #29 was fixed in the previous tick and is not
carried.

## Open owner decisions (10)

1. Ratify publish-at-verified-live-price + ±₹1 tolerance + 30% discount floor.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (rot #8).
5. Scratch-file cleanup under `apps/api/` (rot #11, ~605 files).
6. Periodic re-verify sweep over old LIVE rows — must rewrite copy, not only `price`.
7. **Persist a reject cache for indiafreestuff candidates (rot #19).** Promoted to top of
   the list by this tick's finding.
8. Prune dead Telegram groups in `data/tg-groups.json` (rot #20).
9. Confirm a 0%-discount exact-price match never publishes.
10. Caching posture — ISR on deal/blog/home HTML, cap `/offers` far below a year.
