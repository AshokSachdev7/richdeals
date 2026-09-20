# DEAL-INGEST tick (indiafreestuff) — richdeals.in — 2026-09-21

Run inline, not as a subagent.

## Funnel

| stage | count |
|---|---:|
| cards discovered on `/pages/getdeals` | 40 |
| durable-goods candidates fetched (≥2.5s apart) | 14 |
| `?rto=` links extracted | 14 |
| resolved to a real store URL | 14 (100% Amazon) |
| already LIVE in our DB (dup) | 4 |
| price/stock verified on the PDP | 10 |
| rejected — OutOfStock | 2 |
| **published `status:live`** | **8** |

## Discovery — the source's own redirect nearly killed the sweep

`https://indiafreestuff.in/pages/getdeals` answers **HTTP 301 → `https://www.indiafreestuff.in/…`**.
Without `-L` you get 167 bytes, zero `item-title` anchors, and the source looks dead. With `-L`:
HTTP 200, 247,762 bytes, **40 cards**. This belongs in `ingest-common.mjs` — a silent 301 reads
exactly like a dead source.

The feedburner RSS that CLAUDE.md names as the primary discovery path is still **HTTP 000**. Every
card this tick came from the HTML listing.

**`?rto=` extraction, now proven on 14/14.** The Buy Now anchor spans multiple lines, so the
extractor needs `re.S`: find `<a … buy_now …>` first, then pull `href` out of that tag, with a
bare `href="…rto=…"` search as fallback. All 14 pages yielded a link; all 14 resolved HTTP 200 with
a Chrome 129 UA and `sleep 2.7` between requests. No 403, no 429.

## Dedup — 4 of 14 were already ours

| ASIN | existing deal |
|---|---|
| B072JG94NY | 6303 (Ajmal Aristocrat perfume) |
| B0CNGX3YFN | 4219 (Beurer MN5X clipper) |
| B0FP8XT52S | 5027 (PowerMax WalkPad-2) |
| B0GZKSPVDW | 8239 (Aristocrat Comet luggage) |

**29% dup rate.** Lower than Telegram's 50% this morning, but the same direction. DB max before the
push: 10790.

## Verification — logged-in Amazon tab, one `browser_evaluate`

Same-origin `fetch` + `DOMParser` over all 10 survivors: `#productTitle`,
`.priceToPay .a-price-whole`, `.basisPrice .a-text-price .a-offscreen`,
`#add-to-cart-button` / `#outOfStock`, `#landingImage[data-old-hires]`.

| ASIN | buybox | MRP | stock | outcome |
|---|---:|---:|---|---|
| B0H7LKBJX4 Safari Voro set of 3 | ₹5,899 | ₹30,000 | ATC | published |
| B0DYPGSDX1 Proven Pixer 12L RO | ₹4,590 | ₹29,999 | ATC | published |
| B0G7X7KFNY F Gear Valencia 75cm | ₹6,298 | ₹22,495 | ATC | published |
| B0HG6MM2VK 750W air blower | ₹2,399 | ₹3,999 | ATC | published |
| B0H7KYHVLY Safari Voro 65cm | ₹2,499 | ₹10,000 | ATC | published |
| B0H6FY3SBX Genus MaxiLion Air 1500 | ₹34,999 | ₹55,949 | ATC | published |
| B0CKLGCXCS Dyson Big+Quiet | ₹68,900 | **null** | ATC | published |
| B0H6M46J86 Acer 15 Ryzen 3-7320U | ₹42,990 | ₹57,500 | ATC | published |
| B0BRJ7JF1V Clovia night gown | — | — | **`#outOfStock`** | **reject** |
| B09ZHN9XW1 Symbol men's chino shorts | — | — | **`#outOfStock`** | **reject** |

Every published row carries the verified buybox, never a card price. Images are
`m.media-amazon.com` `data-old-hires` URLs; none from `images.indiafreestuff.in`. All titles and
descriptions written from scratch off the PDP — no source text reused.

**Affiliate swap:** every resolved URL arrived carrying the source's `tag=dealhind-21`. Rebuilt
clean as `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21` — no `pf_rd_*`, no `smid`, no `sbo`.
Zero non-Amazon survivors this tick, so neither the Flipkart nor the Cuelinks path was exercised.

## Push + freshness

```
POST /admin/deals/bulk  →  HTTP 201, count: 8, all created: true
node apps/api/scripts/indexnow-ping.mjs <8 slugs>
DONE: IndexNow -> HTTP 200 for 11 urls
```

**HTTP 200.** 11 urls = 8 slugs + the 3 paths the script always appends. No 422, so the Bing GET
fallback was not needed.

## CEO audit

**NEW — the coupon detector is percent-only and silently misses flat-rupee coupons.** Two PDPs in
this batch show `[Apply ₹1500 Coupon]` (B0H6FY3SBX) and `[Apply ₹2000 Coupon]` (B0CKLGCXCS). The
regex in use, `/(\d+)% ?(?:off )?[Cc]oupon/`, returned `null` for both. It cannot match a flat-₹
coupon at all. Two real savings were therefore not recorded in `couponNote`. The fix is a second
arm, `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon`, and it needs to land in `ingest-common.mjs` before the
next tick — this is a silent under-report, not a crash, so nothing else will surface it.

**The coupon ratio test fired again — third confirmation.** The IFS card for B0DYPGSDX1 said
"Rs. 4360". The buybox is **₹4,590** with a **5% clip coupon**, and `4590 × 0.95 = 4360.5`. The
card price is the post-coupon price to the rupee, exactly as the Cello ₹871-vs-₹1,244 case this
morning. Published at ₹4,590 with the coupon in `couponNote`, never baked into `price`.

**Card prices wrong again, second mechanism.** The Acer card said "Rs. 40941" against a ₹42,990
buybox. `42990 × 0.952 = 40,926` — that is a coupon-plus-Axis-card no-cost-EMI figure, not a price
anyone pays at checkout. Two different card-price lies in one batch of 14.

**NEW — IFS card titles drift from the PDP.** Card index 33 advertises a "600W air blower, 15000
RPM". The PDP for the ASIN that card links to says **750W, 18000 RPM**. Different specs on the same
product. Titles must come from `#productTitle`, never from the source card — this batch is the
proof, and it is the same failure class as the card prices.

**Three implausible MRPs in one batch.** Safari Voro set ₹30,000 vs ₹5,899 (80% off), Safari 65cm
₹10,000 vs ₹2,499 (75%), Proven Pixer ₹29,999 vs ₹4,590 (85%). These are Amazon's own `.basisPrice`
values and are published as stated, but an 85% "discount" on an unbranded water purifier is a
list-price fiction, not a deal. The implausible-MRP guard is still an unshipped to-do; until it
exists we are repeating a marketplace's inflated MRP on our own pages. Worth an owner call
alongside decision #6.

**Dyson has no MRP at all** — `.basisPrice` is absent, so the row ships with `mrp: null` and
`discountPct: null`. It clears `dealIndexable` only on the description-length arm (≥200 chars). It
also joins the **1,602 LIVE deals with no MRP** pile (owner decision #6), now 1,603.

**Both OutOfStock rejects are apparel** — Clovia night gown, Amazon Symbol chino shorts. Apparel
parent ASINs go out of stock at the variant level constantly. Worth considering whether apparel
without a size-qualified child ASIN is worth ingesting at all.

**Carried rot, unchanged this tick:**

- **#48** Rogerkart `rogerkart.com/r/<code>` is a client-side Next.js redirect; `url_effective`
  never changes. Not re-triggered here (no Rogerkart links on IFS).
- **#47** ONLINE SHOPPING DEALS is a derivative Telegram source, 50% dup rate.
- **#46** CoolzTricks Official posts coupon claims with no product name.
- **#45** `data/tg-multi-seen.json` drifts from the DB in both directions.
- **#44** indiafreestuff Flipkart `?rto=` resolves to a 403 tracking landing. **Not re-triggered —
  all 14 links this tick resolved to Amazon.**
- **#43** CLAUDE.md documents a "homepage HTML fallback"; the homepage carries no deal grid.
  Discovery is `/pages/getdeals`, and it needs `-L`.
- Source RSS feedburner HTTP 000 while CLAUDE.md says "RSS first".
- LIVE deal 10031 carries `productId` `ae27f94b3330`, a hex hash.
- ~200 scratch files left in `apps/api/scripts/` — owner decision #5.

Scratch hygiene clean — `apps/api/_ifs0921.cjs` created and removed in the same Bash call (32nd).
`data/tg-multi-seen.json` untouched; the broadcast cursor untouched.
