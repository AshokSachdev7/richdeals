# DEAL-INGEST tick — indiafreestuff — 2026-09-18 (TICK X)

## Result

| stage | n |
|---|---|
| cards discovered (2 listing pages, 2.6s gap) | 46 |
| resolved `?rto=` → real store URL | 40 |
| fresh vs live DB (by `productId`) | 29 |
| price-verified on live Amazon PDP | 29 |
| **pushed `status:live`** | **20** |

IndexNow: `DONE: IndexNow -> HTTP 200 for 22 urls` (20 deal slugs + `/` + `/offers`).
Bulk push: HTTP 201, count 20, all CREATED.

## Rejected (9 of 29 fresh)

| ASIN | reason |
|---|---|
| B0FN9TCR2B, B0FW56Q2GY, B0DJRCZ1ZP, B0FW59CQ5Y | out of stock (no `#add-to-cart-button`) |
| B0G8K11PVV | source ₹24,290 → live ₹53,999 (2.2x drift), no MRP |
| B0FWQG4MBN | source ₹319 → live ₹599 (1.9x drift), no MRP |
| B0DCP56BH5 | -10%, below the 30% floor |
| B07M9TWJMR | -23%, below the 30% floor |
| B07THB7YPC | basisPrice ₹10,445 against ₹533 = fake 95% MRP; nulling the MRP leaves no verifiable discount |

## Dropped at resolve (6 of 46)

4 Flipkart `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff` tracking landings, 2 Flipkart
deeplinks with no `/p/itm` path, 1 JioMart card that resolved to the homepage. All correctly
rejected by `affiliate()`.

## Pushed (20)

All Amazon, `?tag=ashoksachdev-21`, published at the **verified live PDP price**, images from
`m.media-amazon.com`, every title and description rewritten.

| ASIN | ₹ live | MRP | off |
|---|---|---|---|
| B0HHDRWB6D | 499 | 1899 | 74% |
| B09WRPLVLF | 129 | 799 | 84% |
| B0DTJBRV99 | 139 | 399 | 65% |
| B0DSKQGT86 | 223 | 798 | 72% |
| B0GV8CSR6S | 149 | 499 | 70% |
| B0D1VMXSPW | 170 | 420 | 60% |
| B0HGBNK6VM | 199 | 899 | 78% |
| B0B3HZ1J77 | 159 | 999 | 84% |
| B0C6F3Z5Y1 | 396 | 2999 | 87% |
| B09HL5546N | 328 | 1499 | 78% |
| B0GR9C8821 | 1998 | 4999 | 60% |
| B0FBWG1Z6Q | 15999 | 22999 | 30% |
| B0DP2FLBZ2 | 113 | 280 | 60% |
| B0G5PY1L2Y | 935 | 4999 | 81% |
| B0FZJHWV1P | 113 | 200 | 44% |
| B00791FM42 | 58 | 140 | 59% |
| B0BGSD5N46 | 599 | 1999 | 70% |
| B0FZBGXHY9 | 799 | 2000 | 60% |
| B0743BLWWD | 445 | 1400 | 68% |
| B0CCVW6PJ7 | 329 | 600 | 45% |

## CEO audit

| check | value |
|---|---|
| deals | LIVE 10,194 / EXPIRED 257 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| PENDING_REVIEW backlog | 0 |
| max deal id | 10,539 |
| posts published | 313 |
| posts/day IST | 09-18 = 3, 09-17 = 3, 09-16 = 3, 09-15 = 3, 09-14 = 4, 09-13 = 4 |
| coverless / seo-less (last 40 posts) | 0 / 0 |
| prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | 200 all six |
| unpushed commits | 0 |
| tg-broadcast cursor | 10,482 vs max 10,539 — **57 behind, worse than 37 last tick** |

## Rot

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — hand-re-derived for
   the **16th tick running**. Also owed: the same-origin fetch verifier, the implausible-MRP
   guard, the `data-a-dynamic-image` fallback, the trailing-dot price strip, a shopsy
   `finalPrice` fallback, a Flipkart browser-tab fallback, the shortlink body-grep fallback,
   and a resolved-URL `/s?` assert.
2. **Source price drift is now the dominant reject reason** — 4 of 29 fresh cards drifted
   (24290→53999, 319→599, 374→499, 13499→15999). indiafreestuff card prices are a hint, never
   publishable. Drift plus OOS plus the floor ate 9 of 29.
3. indiafreestuff Flipkart links structurally dead — 4 of 46 cards again landed on
   `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff`. Effectively an Amazon-only source.
4. `tg-broadcast` external cron is not firing — cursor drifted from 37 behind to 57 behind in
   one tick. 57 live deals have never reached the channel.
5. `curlFinal` cannot follow client-side redirects (`rogerkart.com/r/…`).
6. Telegram yield collapsed three ticks running (0/25, 1/25, 1/25); `amzn.lt` NXDOMAIN, SB Loots
   permanently dead.
7. `.claude/agents/deal-ingest.md` stale on 4 points (review gate, sources, affiliate matrix,
   output path).
8. `where to get free samples`: 11,072 impressions / pos 6.8 / **0 clicks**, 46 of 313 slugs.
   Highest-value unshipped SEO action.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` from ASIN needs `productId` on the
    shared DTO) both need an API change.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps (`/sitemap-deals-1.xml`, `/sitemap-posts-1.xml`) that
    prod 404s.
13. `link.amazon` shortlinks can expand to `/s?hidden-keywords=` multi-ASIN search pages — the
    `/s?` reject must run on the resolved URL.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% discount floor in CLAUDE.md (the written
   ±₹1 rule would have killed 20 of 20 today).
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime Task Scheduler `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 313 slugs).
5. Scratch-file cleanup under `apps/api/`.

---

# DEAL-INGEST — indiafreestuff — tick 2 (2026-09-18, evening)

## Pipeline

| Stage | Count |
|---|---|
| Listing cards read (`/deals` + `/deals/superdeals`, GAP 2600ms) | 46 |
| Resolved `?rto=` → real product URL | 44 |
| Dropped as non-product at resolve | 2 |
| Already in DB (dedup on `productId`) | 8 |
| Fresh | 36 |
| Excluded as junk before verification | 1 |
| Price-verified (34 Amazon in logged-in tab + 1 Myntra ld+json) | 35 |
| Rejected at verification | 5 |
| **Pushed `status:live`** | **30** |

IndexNow: `DONE: IndexNow -> HTTP 200 for 32 urls` (30 deal slugs + `/` + `/offers`).

## Discovery route — RSS is dead

`curl -A <browser UA> https://feeds.feedburner.com/indiafreestuff` → **HTTP 000, size 0, exit 100**.
Fell through to the listing-page route in `ingest-ifs-proper.mjs`, which is the only path that
works. CLAUDE.md and `.claude/agents/deal-ingest.md` both still name RSS as primary — new rot
item #17.

## Dropped at resolve (2)

| Source slug | Resolved to | Why |
|---|---|---|
| `flipkart-bbd-the-big-billion-daysale-ear` | `dl.flipkart.com/dl/early-bird-deals-store` | sale hub, not a product |
| `jiomart-quick-offer--free-rs100-shopping` | `https://www.jiomart.com/` | bare homepage |

## Dedup hits (8, all already LIVE)

B00TO7JUFG, B0G1V3G8D9, B0H94NFR7V, B0FDL28K43, B0CFFNH13X, B09ZPQ91LF, B00QEYUWPO, B0FCSD2BKM.

## Rejected (5 + 1 junk)

| ASIN | Reason |
|---|---|
| B086188X2F | "(Min Buy 4)" PVC mat set — min-quantity condition, not a clean single-product buy (excluded pre-verify) |
| B0FDB6MK5R | BABYGO rompers — live ₹1,998 vs source ₹199, MRP null; ~10x gap, source almost certainly priced a different variant |
| B073WYXYMF | Titan Raga Viva — ₹5,695 / ₹6,645 = **-14%**, below the 30% floor |
| B0FGJRHGVS | Madhabi fibre patch cord — price null, `inStock:false` |
| B0FPR5TLPJ | Vega VO-05 helmet — ₹1,102 / ₹1,295 = **-15%**, below the 30% floor |
| B0CH3GNKJD | Wonderchef Ultima chimney — price null, `inStock:false` |

No Amazon coupon badge fired on any of the 34 verified PDPs (`coupon: null` throughout).

## Pushed live (30)

| Store | ID | Price | MRP | Off | Slug |
|---|---|---|---|---|---|
| Amazon | B0H4Z7Z4FX | 489 | 2499 | 80% | `action-slider-104-flip-flops-for-men-b0h4z7` |
| Amazon | B0CM6R8DRL | 205 | 1999 | 90% | `7threads-women-fashion-vest-b0cm6r` |
| Amazon | B0FGPQ68XD | 999 | 2499 | 60% | `amazon-basics-bluetooth-5-4-over-ear-headphones-b0fgpq` |
| Amazon | B0G2RN72DS | 56 | 499 | 89% | `popo-toys-santa-claus-plush-soft-toy-b0g2rn` |
| Amazon | B0HCDGH41H | 389 | 1399 | 72% | `kids-table-tennis-trainer-set-with-rebound-shaft-b0hcdg` |
| Amazon | B0HJNN9FPL | 649 | 1599 | 59% | `actual-7d-double-bedsheet-with-2-pillow-covers-b0hjnn` |
| Amazon | B0FK5DH1D3 | 2699 | 5999 | 55% | `lifelong-bouncette-5-in-1-hot-air-brush-1200w-b0fk5d` |
| Amazon | B00U5AZRIK | 455 | 3999 | 89% | `flomaster-towelmate-seat-cover-for-maruti-swift-b00u5a` |
| Amazon | B0FKH7HR7C | 845 | 2935 | 71% | `qube-by-fort-collins-women-jacket-b0fkh7` |
| Amazon | B0FFH6BN9M | 149 | 599 | 75% | `oneplus-nord-ce5-mood-magnetic-case-b0ffh6` |
| Amazon | B0GMKCTMSK | 804 | 1999 | 60% | `bata-bent-slip-on-sneakers-for-men-b0gmkc` |
| Amazon | B0GXGHCWR9 | 99 | 350 | 72% | `cotton-kitchen-napkins-pack-of-5-16x16-inch-b0gxgh` |
| Amazon | B0H7XJXNGM | 299 | 699 | 57% | `pla-marble-3d-printer-filament-1-75mm-200g-b0h7xj` |
| Amazon | B0F493T88C | 624 | 2599 | 76% | `highlander-dad-fit-cotton-jeans-for-men-b0f493` |
| Amazon | B08DGCTHFB | 749 | 3399 | 78% | `symbol-quilted-bomber-jacket-for-men-b08dgc` |
| Amazon | B0HK1BD4R4 | 85 | 399 | 79% | `round-pvc-table-placemat-15-inch-b0hk1b` |
| Amazon | B0FJS63G5Q | 429 | 999 | 57% | `solimo-glass-baking-dish-1700ml-b0fjs6` |
| Amazon | B0DZ6NHJRX | 1754 | 2520 | 30% | `anchor-by-panasonic-penta-6-module-cover-plate-b0dz6n` |
| Amazon | B0CHRYZLJZ | 591 | 2999 | 80% | `wildhorn-crossbody-sling-bag-b0chry` |
| Amazon | B0GW939G9M | 379 | 999 | 62% | `liberty-a-ha-home-slippers-for-men-b0gw93` |
| Amazon | B0D8TR9FC6 | 1950 | 6499 | 70% | `puma-retaliate-3-running-shoes-b0d8tr` |
| Amazon | B0GZC669HC | 169 | 510 | 67% | `khadi-aloe-vera-neem-tulsi-soap-pack-of-6-b0gzc6` |
| Amazon | B0BPN3H7NR | 484 | 1199 | 60% | `stainless-steel-airtight-container-set-of-5-b0bpn3` |
| Amazon | B0DRY18MQN | 281 | 1299 | 78% | `spenz-28l-gym-duffel-bag-with-shoe-compartment-b0dry1` |
| Amazon | B083V4MZNZ | 285 | 1001 | 71% | `negi-educational-world-globe-b083v4` |
| Amazon | B0CJ96HKZP | 189 | 650 | 71% | `crompton-laser-ray-neo-24w-led-batten-b0cj96` |
| Amazon | B09HPTHSP4 | 2232 | 19999 | 89% | `steel-frame-cushioned-visitor-office-chair-b09hpt` |
| Amazon | B0D17ZZRQ8 | 149 | 499 | 70% | `tied-ribbons-krishna-with-kamdhenu-cow-metal-idol-b0d17z` |
| Amazon | B0F4928541 | 1650 | 5499 | 70% | `puma-blaze-lite-running-shoes-for-men-b0f492` |
| Myntra | b0edf35808d3 | 299 | 1499 | 80% | `aqueria-3-in-1-brightening-body-wash-875ml-b0edf3` |

All 29 Amazon links carry `?tag=ashoksachdev-21`; the Myntra link goes through Cuelinks
(`cid=527`). All images are marketplace CDN (`m.media-amazon.com`, `assets.myntassets.com`) —
none from `images.indiafreestuff.in`. Every title, description and `howTo` is original copy.

Source-price drift seen but not treated as a reject where the live price still cleared the
floor: B0G2RN72DS (source 63 → live 56), B0HCDGH41H (244 → 389), B0FJS63G5Q (416 → 429),
B0DZ6NHJRX (686 → 1754), B0GW939G9M (276 → 379), B0GZC669HC (185 → 169), B0DRY18MQN (188 → 281).
Published at the verified live price in every case.

## CEO audit (verified against the DB this tick)

- Prod 7/7 endpoints 200 (checked in the SITEMON tick an hour earlier).
- LIVE 10,196 → 10,226 after this push. PENDING_REVIEW 0. Null price 0, null image 0.
- Posts 313; posts/day IST for the last 7 days = 3, 3, 3, 3, 4, 4, 3 — never 0, never over 4.
- Coverless posts 0, seo-less posts 0.
- **tg-broadcast cursor now ~89 behind DB max** (was 59 before this batch of 30). The external
  cron is not firing. Draining it fires ~89 messages at the channel in one burst, so it is NOT
  being drained without the owner's go-ahead.

## Rot list — 17 items (#17 new)

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — hand-re-derived for
   the **19th tick running**. Owes: same-origin verifier, implausible-MRP guard,
   `data-a-dynamic-image` fallback, trailing-dot price strip, shopsy `finalPrice` fallback,
   Flipkart browser-tab fallback, shortlink body-grep fallback, resolved-URL `/s?` assert.
2. Source-vs-live price drift is the dominant reject reason across every source.
3. indiafreestuff Flipkart links structurally dead (this tick: `dl.flipkart.com/dl/early-bird-deals-store`).
4. **tg-broadcast external cron not firing — cursor drift 37 → 57 → 58 → 59 → ~89.**
5. `curlFinal` cannot follow client-side redirects (`rogerkart.com/r/…`).
6. ~~`amazn.lt` NXDOMAIN~~ — corrected, transient DNS only.
7. `.claude/agents/deal-ingest.md` stale on 4 points, plus the RSS point below.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 313 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 and W8 both need an API change.
11. ~607 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s.
13. `link.amazon` shortlinks can expand to `/s?hidden-keywords=` — the reject must run on the
    resolved URL.
14. Flipkart PDPs serve no ld+json to a real browser either, not merely to curl.
15. tg seen-cache and DB disagree in both directions; only the DB check catches it.
16. The Amazon ₹-coupon badge is not extracted by any shared code — hand-derived again.
17. **NEW — the indiafreestuff Feedburner RSS feed is dead (HTTP 000).** CLAUDE.md
    ("their RSS (feedburner) first, homepage HTML fallback") and `.claude/agents/deal-ingest.md`
    both still describe RSS as the primary discovery path. Only the listing-page route works.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% discount floor in CLAUDE.md, and extend it to
   say coupon-inclusive source prices are reconciled, not rejected.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 313 slugs).
5. Scratch-file cleanup under `apps/api/`.
