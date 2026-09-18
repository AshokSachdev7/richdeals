# DEAL-INGEST indiafreestuff — 2026-09-18, 10:5x–11:04 IST

## Funnel

| stage | count |
|---|---|
| cards discovered (`/deals` + `/deals/superdeals`, GAP 2600ms) | 46 |
| resolved `?rto=` → real product URL | 40 |
| fresh after DB dedup on `productId` | 29 |
| verified + published LIVE | **24** |

Dropped at resolve (6): 5 Flipkart `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff`
tracking landings (killer-large-check-in-suitcase, safari-small-cabin-suitcase,
ultron-manual-airfryer, metronaut-medium-check-in-suitcase, everyuth-naturals-sun-care)
+ 1 JioMart homepage link. These can never resolve to a product — ~11% of every sweep.

## Rejected on price drift (>₹1 vs source card, live price re-read in the logged-in tab)

| ASIN | live | card | note |
|---|---|---|---|
| B0G53519DP | 643 | 287 | Amazon Basics back brace — deal gone |
| B0GYD6YC2N | 69999 | 66999 | iFFALCON 75" TV |
| B0GVDZTL2Y | 2299 | 1799 | Home Centre ottoman (also only 23% off — under the floor) |
| B0F21XXPDR | 6308 | 6058 | SanDisk 512GB phone drive |
| B0H62LTK7S | 135990 | 125115 | Lenovo Yoga Slim 7 |

## Published (24) — 23 Amazon + 1 Myntra, all ≥43% off, all InStock

₹99 Stealodeal card holder -80% · ₹99 Petcrux slicker brush -75% · ₹70 BOROPLUS baby soap ×2 (Myntra) -50% ·
₹240 Siso hair colour ×20 -60% · ₹249 Portronics Toad 33 mouse -50% · ₹279 Galaxy Home Decor curtains -81% ·
₹283 password-lock pencil case -77% · ₹318 Crompton Star Lord downlighter -68% · ₹410 NIVIA Power-Bar -80% ·
₹525 Indian Garage CO shirt -70% · ₹599 amazon basics hamper -70% · ₹599 Homesake wall sconce -79% ·
₹649 pTron Bassbuds Indie -68% · ₹753 Wipro Nowa 6A socket ×10 -79% · ₹849 PunnkFunnk smartwatch -83% ·
₹879 Joker & Witch watch -81% · ₹930 Lifelong 2-slice toaster -58% · ₹1105 Tukzer 6-in-1 Type-C hub -80% ·
₹1155 Levi's 513 jeans -65% · ₹1994 McCoy Rapido induction stove -43% · ₹2199 HRX Kyoto cabin suitcase -78% ·
₹3450 Butterfly 900W juicer -47% · ₹4990 SINGER Cloudx fan -68% · ₹6499 Kamiliant ATHER trolley set of 3 -81%

Affiliate: Amazon `tag=ashoksachdev-21` on `/dp/ASIN`; Myntra via Cuelinks
`linksredirect.com/?cid=527&source=linkkit&url=…`. Images from `m.media-amazon.com`
/ `assets.myntassets.com` — never `images.indiafreestuff.in`. Title/description/howTo
rewritten, nothing copied from the source card.

Push: `/admin/deals/bulk` HTTP 201 ×2, 24/24.
IndexNow: **HTTP 200 for 26 URLs** (24 deal slugs + `/` + `/offers`).
Spot check: `/joker-witch-beetle-steel-analogue-watch-for-men-b0c5mt` → 200 in 0.29s.

## Extraction bugs hit this tick (worth fixing in `lib/ingest-common.mjs`)

1. **`.a-price .a-offscreen` fallback returns the MRP on apparel/variant PDPs.**
   B0C5MTRYKY, B0BRQ6B451 and B0GC7J561H all came back `pay == strike`. The real
   price is in `#buybox` textContent (`₹879.00₹879.00 FREE delivery …`). Reading
   `#buybox` first would have avoided a second verification pass on 3 of 28 rows.
2. **The strike selector returns a per-unit or malformed figure on multipacks.**
   ₹60 for a ₹240 20-pack, ₹75 for a ₹753 10-pack, ₹499000 for a ₹4990 fan.
   `pay / (1 - savingsPercentage)` reproduced the correct MRP in all three cases,
   and matched the source card exactly (600 / 3550 / 15490).
3. **`#availability` sometimes picks up an inline script blob.** Cosmetic;
   `#add-to-cart-button` presence is the reliable in-stock signal and was used.

## CEO audit

| check | result |
|---|---|
| posts today IST | **2** (370, 371) — below the 3 target, the 12:09 tick owes the third |
| published total | 312, coverless 0, seoless 0 |
| deals PENDING_REVIEW | 0 |
| LIVE deals | 10,084 (+24 this tick), null price 0 / null image 0 |
| broadcast cursor vs DB max | cursor 10410, max LIVE 10429 — 19 behind, its own cron picks them up |
| prod `/` / deal page | 200 / 200 |
| unpushed commits | 0 |

### ROT (carried, still open)

- `where to get free samples`: 11,072 impressions, pos 6.8, **0 clicks**. 46 of 312
  slugs sit in that cluster. Merge/prune is still the highest-value unshipped SEO action.
- Organic 90d 50 clicks vs last-28d 6.
- 307 LIVE deals carry pointless `updatedAt` re-stamps — undiagnosed.
- W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the
  shared DTO) both need an API change.
- `.claude/agents/deal-ingest.md` is stale: still says `status: pending-review` (AUTO-APPROVE
  overrides) and still names EarnKaro for Flipkart/other stores (live rule is Flipkart
  `affid=djhackraj`, everything else Cuelinks).
- CLAUDE.md stale: `affiliate()`/`productLd()` live in `apps/api/scripts/lib/ingest-common.mjs`;
  "7 groups" → `data/tg-groups.json` has 13.

### Owner decisions still open

1. Ratify publish-at-live-price + the 30% discount floor in CLAUDE.md.
2. Permanent DB pool cap in `apps/api/.env`.
3. DesiDime Task Scheduler job `7,37 * * * *`.
4. Free-samples cluster consolidation (46 of 312 slugs).
5. ~605 untracked scratch files in `apps/api/`.

## 17:2x IST tick (DEAL-INGEST indiafreestuff)

Run inline via `node apps/api/scripts/ingest-ifs-proper.mjs` (listing pages only, 2600 ms gap, no 403/429).

### Funnel

| stage | n |
|---|---|
| cards discovered (`/deals` + `/deals/superdeals`) | 35 |
| resolved `?rto=` → real product URL | 23 |
| fresh after DB dedup (`productId` OR `affiliateUrl contains`) | 17 |
| verified live on Amazon (logged-in tab, same-origin fetch + DOMParser) | 17 |
| rejected on price drift >₹1 | 1 |
| **pushed `status:live`** | **16** |

### Drops at resolution (12)

- 3× Flipkart → `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff?p…` tracking landing, not a PDP (AAMS Eco Loop2, AAMS Eco 03, Zeb Buds 30).
- 1× JioMart homepage (no product path).
- 7× `?rto=` returned unchanged — client-side redirect, `curl -w %{url_effective}` cannot follow (golwyn containers, boldfit aerobic stepper, turquoise tin, sehaz wall hangings, roadster coupon code, crompton ameo blender, kuber utensils, wonderchef platinum plus).
- 1× Myntra `0fe576bf8c7f` "Myntra Early Access on EORS" — sale hub, excluded by the single-product rule (it did pass `verifyFromHtml`).

### Dedup DUPs (5)

`B08MLJGB8W` #10479/LIVE · `B0F5P1SVJB` #10464/LIVE · `B0FH1WPYMX` #5140/LIVE · `B0H4V6T3FX` #6370/LIVE · `B0F59Y19J1` #6201/LIVE

### Pushed (16) — all Amazon, all `?tag=ashoksachdev-21`, all in stock, all ≥56% off

| ASIN | ₹ | MRP | off | product |
|---|---|---|---|---|
| B0FH1XC6YY | 113 | 399 | -72% | Kitchen Expert silicone idli moulds, 8 pc |
| B0GYHZ8YBT | 108 | 399 | -73% | Tasty 2-compartment lunch box + 2-in-1 spoon |
| B0FF5BBC91 | 317 | 1699 | -81% | Kica criss-cross cotton flare pants, pink |
| B0GY18FDXN | 2109 | 4999 | -58% | SNITCH Blink medium hard suitcase, blue |
| B0F2T9LSCD | 624 | 2599 | -76% | Highlander men's straight-fit stretch jeans |
| B0DTK39GCH | 2099 | 8450 | -75% | French Connection Comet FCC04SM watch |
| B0DRSCL5V7 | 316 | 1599 | -80% | Plush brown teddy bear, 40 cm |
| B0FSQMH5LM | 417 | 1099 | -62% | Cricut Flocked Iron-On, black 12×19 in |
| B0BTZWFC33 | 563 | 1599 | -65% | Cricut colour-changing vinyl, light blue |
| B0H6HS9DHQ | 999 | 2699 | -63% | Boldfit kids 3-wheel LED kick scooter |
| B0C2Z333ZL | 77 | 175 | -56% | polo water colour pens, 12 × pack of 5 |
| B0BNNQGK9J | 517 | 2850 | -82% | Wipro Nowa 6/16A power socket, pack of 5 |
| B07C2TQKH5 | 2595 | 6490 | -60% | Borosil Silverline 750 W mixer grinder |
| B0GXZYBJQC | 2739 | 8499 | -68% | SNITCH Layer 2-pc hard suitcase set, blue |
| B0GY1582FK | 1749 | 6499 | -73% | SNITCH Loop large hard suitcase, black |
| B0DB5QFF9Z | 492 | 2699 | -82% | amazon basics Pro Series wireless mouse |

`/admin/deals/bulk` → **HTTP 201 × 2** (15 + 1). Two ₹1 drifts accepted inside the ±₹1 tolerance (B0GYHZ8YBT 109→108, B0C2Z333ZL 78→77); every row published at its **verified** price, not the card price.

### Rejected on drift

- **B0D5HQLLGR** Sehaz Artworks fridge magnets — card said **₹138**, live PDP reads **₹289**. ₹151 drift, far outside ±₹1. Dropped rather than published at a price the source never advertised. (Still in stock, -64% off ₹799 — it will return on a later sweep if the card catches up.)

### Freshness

- `node apps/api/scripts/indexnow-ping.mjs <16 slugs>` → **HTTP 200 for 18 urls** (16 deals + `/` + `/offers`).
- Prod spot-check: 2 of the new slugs 200, prod `/api/deals` head id **10498** = DB max LIVE id. Push reached prod.

### CEO audit

| check | result |
|---|---|
| prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` | 200 × 7 |
| deals | LIVE **10153** (+16), EXPIRED 257, PENDING_REVIEW **0** |
| LIVE null price / null image | 0 / 0 |
| posts | 313 published, coverless 0, seoless 0 |
| posts/day IST last 5 | 09-14:4 09-15:3 09-16:3 09-17:3 09-18:3 |
| tg-broadcast cursor vs DB max | 10482 vs 10498 — 16 behind, exactly this batch; next broadcast run clears it |
| unpushed commits | 0 |

### ROT FLAGGED

- **`apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 9 ticks running.** Hand-re-derived every time. Owes: same-origin fetch + DOMParser verifier, `.priceToPay .a-price-whole` trailing-dot strip, `.basisPrice .a-offscreen` MRP + implausible-MRP guard, `.savingsPercentage`, `#add-to-cart-button` in-stock, `data-a-dynamic-image` image fallback, shopsy `finalPrice` fallback, Flipkart browser-tab fallback, shortlink **body-grep** fallback. Highest-value unshipped code fix on the repo.
- **`curlFinal` cannot follow client-side redirects — 7 of 35 links (20%) lost this sweep.** Same failure class the body-grep fallback already solved for rogerkart last tick. Applying that fallback to `curlFinal` would have recovered ~7 candidates today alone.
- **indiafreestuff Flipkart links are structurally dead.** All 3 Flipkart cards resolved to `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff` tracking landings. That is why this source yields zero Flipkart deals, confirmed again.
- **`amzn.lt` is NXDOMAIN.** SB Loots And Deals unusable as a Telegram source.
- `.claude/agents/deal-ingest.md` stale on 4 points (placeholder Amazon tag, EarnKaro flow, `data/deals/index.json` dedup, `status: pending-review`).
- `where to get free samples`: 11,072 impressions / pos 6.8 / **0 clicks**; 46 of 313 slugs in that cluster. Needs merge/prune, not posts.
- Organic still collapsed: last-28d GSC = 2 clicks / 67 impressions.
- W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` from ASIN needs `productId` on the shared DTO) both need an API change.
- ~605 untracked scratch files under `apps/api/`.

### Owner decisions still open

1. Ratify publish-at-live-price + the 30% minimum discount floor in CLAUDE.md.
2. Permanent DB pool cap in `apps/api/.env`.
3. DesiDime Task Scheduler job `7,37 * * * *` (external cron, needs explicit go-ahead).
4. Free-samples cluster consolidation (46 of 313 slugs).
5. Scratch-file cleanup under `apps/api/`.
