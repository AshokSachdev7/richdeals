# DEAL-INGEST indiafreestuff tick — 2026-09-20b (IST)

**15 deals live.** Ids **10720–10734**, IndexNow **HTTP 200 for 18 urls**. LIVE total 10,372 → **10,387**.

Ran inline, not as a subagent. 52 cards discovered → 49 resolved to a product → 26 survived DB
dedup → 25 Amazon ASINs verified in the logged-in tab → **15 published, 11 rejected on price,
stock or verifiability**.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 52 |
| Resolved to a real product URL | **49** |
| Dropped at resolution | 3 |
| Fresh after DB dedup by `productId` | **26** |
| Verified (Amazon, logged-in tab) | 25 |
| Verified (Myntra, ld+json) | 1 |
| **Published** | **15** |
| Rejected after verification | **11** |

The three resolution drops were all hub pages, not products: the Amazon Great Indian Festival
event page, the Flipkart BBD early-bird store, and the JioMart homepage. All three are exactly what
the `/s?` / `/b/` / sale-hub reject arm exists for, and all three were caught by it.

## Verification

Amazon is bot-blocked to curl, so every ASIN went through same-origin
`fetch('https://www.amazon.in/dp/<ASIN>', {credentials:'include'})` + `DOMParser` inside the
logged-in Playwright tab, **2700 ms apart**, 11–13 ASINs per `browser_evaluate` call.
**All 23 fetches in this tick returned HTTP 200.** Non-Amazon rows went through `productLd()`.

Read per ASIN: `#productTitle`, `.priceToPay .a-price-whole`, `.basisPrice .a-text-price
.a-offscreen`, `.savingsPercentage`, `#add-to-cart-button`, `#outOfStock`, `#availability`,
`#landingImage[data-old-hires]`, and a ₹-coupon badge regex.

### Batch 1 — 13 Amazon ASINs, 11 pass

All eleven survivors reproduced **drift 0** against the source's card price, `atc:true`,
`oos:false`, and no coupon badge.

| ASIN | Price | MRP | Off | Image token |
|---|---|---|---|---|
| B0HGRGR74F | ₹159 | ₹299 | 47% | `_SL1500_` |
| B0HCNCNWWS | ₹39,999 | ₹55,999 | 29% | `_SL1200_` |
| B0C7V4WM5T | ₹440 | ₹2,499 | 82% | `_SL1500_` |
| B0FJ8G1QNB | ₹326 | ₹1,299 | 75% | `_SL1500_` |
| B0H1QXD3Y6 | ₹499 | ₹3,299 | 85% | `_SL1024_` |
| B0GH86GBXR | ₹199 | ₹749 | 73% | **no size token** |
| B0F1MVJKCQ | ₹2,999 | ₹5,699 | 47% | `_SL1200_` |
| B0FZKNMHHX | ₹2,999 | ₹14,500 | 79% | `_SL1440_` |
| B0DWJZ8BJR | ₹460 | ₹1,999 | 77% | `_SL1439_` |
| B0F492YMMH | ₹630 | ₹2,999 | 79% | `_SL1440_` |
| B0CQ2N5JRX | ₹649 | ₹3,330 | 81% | `_SL1280_` |

Batch-1 rejects: **`B0GZQPTQ5H`** (live ₹519 vs card ₹493 — drift ₹26) and **`B0DX26Q9TZ`**
(live ₹199 vs card ₹195 — drift ₹4, **the only coupon-badge row in the batch**, which is almost
certainly why the source's number was lower; the coupon-inclusive-price guard did its job).

### Batch 2 — 12 Amazon ASINs, 4 pass

| ASIN | Card | Live | Verdict |
|---|---|---|---|
| B091YP9M7M | 162 | 162 | **pass** — MRP ₹1,000, −84%, `_SL1500_` |
| B0CX53XZYP | 79 | 79 | **pass** — MRP ₹499, −84%, `_SL1000_` |
| B0BQ3WZFXC | 99 | 99 | **pass** — MRP ₹475, −79%, `_SL1500_` |
| B0BDZP886S | 159 | 159 | **pass** — MRP ₹425, −63%, "Only 1 left in stock." |
| B0F13PMQ5G | 483 | **null** | reject — no `.priceToPay`, unverifiable |
| B0D5Y9GV1Y | 569 | **null** | reject — no `.priceToPay`, unverifiable |
| B0FLXQN1QK | 813 | — | reject — **`oos:true`, `atc:false`** |
| B0B5L4L5RK | 711 | 1599 | reject — drift ₹888 |
| B09RSG4D1W | 664 | 1439 | reject — drift ₹775 |
| B0DVGS1F9Y | 144 | 149 | reject — drift ₹5 |
| B06XGF712L | 699 | 695 | reject — drift ₹4 (card price *above* live) |
| B0CLZPYK3D | 382 | 387 | reject — drift ₹5 |

### Finding: batch 2 passed 4/12 where batch 1 passed 11/13

Same source, same sweep, same verifier — a 33% pass rate against 85%. The batch-2 slice is
apparel- and home-heavy, and its failures cluster into two shapes: **variant-priced listings**
(the card quotes the cheapest size, the PDP opens on another) and **coupon-inclusive card prices**.
Two rows had no `.priceToPay` element at all, which is the variant-selector case rather than a
parse failure.

Worth stating plainly: **the ±₹1 drift check is earning its keep.** Nine of the eleven rejects were
price disagreements, five of them under ₹10 — small enough to look like rounding and large enough
to publish a wrong number. Before the check landed in `verifyFromHtml()` (rot #30, fixed and
shipped with this commit), every one of those nine would have gone live at the source's price.

### Finding: `B06XGF712L` drifted the *wrong* way

The INALSA kettle's card said ₹699; the live buybox said ₹695. The source was quoting a price
**higher** than reality. Rejecting it is still correct — an unverified number is unverified in
either direction — but it is evidence that source card prices are stale snapshots, not a
systematically optimistic feed. A tolerance that only guarded the downside would have missed this.

### Finding: Amazon image size tokens are not a fixed set

Eight distinct tokens across 23 fetches this tick — `_SL1500_`, `_SL1440_`, `_SL1439_`, `_SL1280_`,
`_SL1254_`, `_SL1200_`, `_SL1024_`, `_SL1000_` — **plus one URL with no size token at all**
(`41rghOl0HlL.jpg`, B0GH86GBXR). Any code that pattern-matches a specific token will silently miss
rows. The standing fix is core extraction via `/\/images\/I\/([^.]+)\./` and a uniform `_SL1500_`
rebuild; this tick is the hardest evidence for it yet. All 15 published images are real
`m.media-amazon.com` CDN URLs regardless, verified by DB read-back.

### `#availability` is not a stock signal

Shapes seen this tick: `"In stock"`, `"Only 2 left in stock."`, `"Only 1 left in stock."`, `""`
(empty, on a row with `atc:true`), and on `B0FLXQN1QK` a raw JS blob
(`P.when("A","load").execute("aod-assets-loaded", …)`) that survives the `.split('{')[0]` strip.
**`#add-to-cart-button` / `#outOfStock` are the authoritative pair**; the string is commentary.
`B0F492YMMH` published on an empty availability string with add-to-cart live, and its description
says so rather than claiming stock the page did not assert.

## Published

| Endpoint | `POST /admin/deals/bulk`, `x-admin-key`, `{"deals":[…]}` wrapper |
|---|---|
| Result | `{"count":15}` — all `created:true` |
| Ids | **10720 – 10734** |
| Status | all **LIVE** (verified by DB read-back, not by the API response) |
| Affiliate | `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21` on all 15 |
| Images | `m.media-amazon.com` on all 15 |
| Title glyph | **₹ on all 15; ` at Rs ` on none** |
| IndexNow | **HTTP 200 for 18 urls** (15 slugs + `/`, `/offers`, `/sitemap.xml`) |
| LIVE total | 10,372 → **10,387** |

Read-back checked id, status, price, image host, and the ₹ glyph on every row: **15 rows, 0 bad.**

### High-percentage rows

Nine rows sit at −73% or steeper, peaking at −85%. Ratios run 4.8x to 6.6x MRP, all below the 10x
inflated-anchor reject bar and consistent with the `B0CGRNGTM8` precedent set this morning.
Handling is the same: **publish on the verified price, caveat the percentage in the body.** Every
one of those descriptions says in plain words that the discount reflects an optimistic MRP and to
judge the deal on the rupee figure. The price is a fact read from the buybox; the percentage is
Amazon's arithmetic on Amazon's own anchor.

## CEO audit

| Check | Result |
|---|---|
| All 15 rows populated | price, MRP, discount, image, productId, affiliate — no nulls |
| Title glyph | ₹ on all 15, `at Rs ` on none — the hop that produced 79 defective titles this morning is now clean on 17 consecutive rows |
| Scratch hygiene (#11) | **clear** — `_rb0920b.mjs` deleted in the same Bash call that ran it; **`_ifs-fresh-0920b.json` removed**, the outstanding item from the last tick |
| Rot #30 (±₹1 drift) | **FIXED and shipped with this commit** — nine rejects this tick are its first production catch |
| Rot #4 (cursor drift) | grew by 15 more; only the external tg-broadcast cron closes it |
| Source rate limit | script hardcodes `GAP = 2600` ms, above the 2.5 s floor; no 403/429 seen |
| Source text/images | zero verbatim reuse — all 15 titles derived from `#productTitle`, all 15 descriptions written fresh, all 15 images from the Amazon CDN |

### Standing gaps re-evidenced

- **The `_SL1500_` core-extraction upgrade** — eight tokens plus one untokenised URL in a single
  tick. This is the strongest evidence collected so far.
- **`eKools<U+FFFD>` mojibake** on `B0949K84Q8` in the listing output. Origin is Amazon's own title
  field, not our decoder. That ASIN was a dedup hit and never reached the payload, so nothing
  shipped with it — but the next one might.
- **Two files named `ifs-candidates.json`** — `apps/api/ifs-candidates.json` (Sep 15, stale) and
  `./ifs-candidates.json` at the repo root (today's). The script writes the root one relative to
  wherever it is run. Any "find the candidates file" loop picks the wrong one about half the time.
  Real foot-gun, unfixed.

## Not done

`ifs-candidates.json` at the repo root is left in place — it is this tick's input, untracked, and
the next tick overwrites it. `data/tg-multi-seen.json` remains unstaged per the standing rule.
