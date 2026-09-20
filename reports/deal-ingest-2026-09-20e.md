# DEAL-INGEST — indiafreestuff — 2026-09-20 (tick e)

Source: indiafreestuff.in · run inline · ≥2.5 s between their requests · Chrome UA

## Result

**14 new deals pushed LIVE.** `/admin/deals/bulk` → HTTP 201, `count: 14`, all `created: true`.
IndexNow → **HTTP 200 for 17 urls** (14 slugs + the 3 paths the script always appends).

| # | slug | store | price | mrp | off |
|---|------|-------|------:|----:|----:|
| 1 | atevon-high-speed-hdmi-cable-5-metre-4k-ethernet | Amazon | 144 | 999 | 86% |
| 2 | bumtum-baby-inflatable-water-play-mat-tummy-time | Amazon | 170 | 999 | 83% |
| 3 | carrot-stainless-steel-kitchen-knife-set-3-pieces | Amazon | 349 | 1999 | 83% |
| 4 | giordano-analog-mens-watch-textured-dial-steel-strap | Amazon | 2647 | 9450 | 72% |
| 5 | just-herbs-luxe-dream-muse-mousse-liquid-lipstick-amber-honey | Amazon | 246 | 899 | 73% |
| 6 | lycan-beast-pvc-cricket-bat-size-3 | Amazon | 291 | 699 | 58% |
| 7 | be-neude-all-wet-de-tan-body-wash-250ml | Amazon | 199 | 349 | 43% |
| 8 | r-tek-digital-refrigerator-thermometer-wired-probe | Amazon | 158 | 499 | 68% |
| 9 | spykar-mens-cotton-hooded-puffer-jacket | Amazon | 1793 | 6999 | 74% |
| 10 | thinkcentre-m-series-tiny-desktop-i5-8gb-256gb-win11-pro | Amazon | 16949 | 34999 | 52% |
| 11 | wonderland-miniature-doll-couple-figurine-set-of-2 | Amazon | 179 | 2500 | 93% |
| 12 | lakme-9to5-hya-matte-liquid-concealer-cocoa-2ml | Flipkart | 343 | 699 | 51% |
| 13 | lakme-collection-eye-regime-kit | Flipkart | 399 | 999 | 60% |
| 14 | palmolive-iris-ylang-essential-oil-body-wash-750ml | Flipkart | 292 | 610 | 52% |

Affiliate: Amazon `?tag=ashoksachdev-21` on `/dp/ASIN`; Flipkart `affid=djhackraj`.
All titles and descriptions rewritten; every image from `m.media-amazon.com` or
`rukmini1.flixcart.com` — none from `images.indiafreestuff.in`.

## Funnel

```
40  urls discovered on /pages/getdeals
28  candidates after junk/category/loot filter
19  deal pages fetched (all HTTP 200)
19  ?rto= links extracted  -> 13 Amazon 200, 6 Flipkart 403 tracking landings
 3  rejected on conditional price (Min Buy 2 x2, Supercoin x1)
16  resolved productIds deduped vs live DB -> 2 DUP, 14 NEW
14  verified InStock, price read from the PDP
14  pushed status:live
```

## The extraction bug that blocked the last tick — fixed

The previous attempt logged "no Buy Now link found" on every page. Two bugs at once:

1. The anchor class is `btn btn-primery buy_now ripplelink` — a pattern that expects the
   quote to close right after `buy_now` can never match.
2. **The `<a>` tag spans multiple lines.** grep is line-based, so no grep pattern of any
   shape could have seen the whole tag.

Working extractor (Python, `re.S`), 1 unique rto on all 19 pages:

```python
re.findall(r'href="(https://www\.indiafreestuff\.in/\?rto=[A-Za-z0-9+/=]+)"[^>]{0,120}buy_now', h, re.S)
```

Card price/MRP needed the same treatment — capture the whole `<p>` block first, *then*
strip tags (`class="new-price">(.{0,200}?)</p>`); stripping `<[^>]*>` on a fragment that
begins mid-tag returns the class attribute, which is what the old sed did.

## New: Flipkart PDP by pid

Their Flipkart `?rto=` resolves to
`dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff?pid=…&affid=adminnxtify` at **HTTP 403** —
a tracking landing, no product page, nothing verifiable. The `pid` survives, and

```
https://www.flipkart.com/product/p/itme?pid=<PID>
```

serves the **real** product page (HTTP 200) with a correct `ld+json` Product. All 3 kept
Flipkart items verified through it.

Deviation to note: that route's canonical and `og:url` both come back as the generic
`/product/p/itme`, so no real `/p/itm<hash>` slug is exposed. The affiliate URL is therefore
`…/product/p/itme?pid=<PID>&affid=djhackraj`, not the `/p/itm…` path the hard rule names.

## Rejects

| # | product | reason |
|---|---------|--------|
| 10 | EMAMI 7 Oils in One 500 ml | `(Min Buy 2)` — Rs 209 valid only at qty 2 |
| 11 | VATIKA Health Shampoo 1280 ml | `(Min Buy 2)` — Rs 561 valid only at qty 2 |
| 14 | NIVEA Shea Smooth lotion | `[Supercoin ]` — price includes coin burn |
| — | Boldfit Winter Jacket (`B0H12GKGSC`) | DUP of live deal 7228 |
| — | Mozen Samsung 25W charger (`B0G92J36TQ`) | DUP of live deal 2653 |

The two DUPs matter: the cheap title-token prefilter called the Boldfit jacket CLEAN. Only the
resolved-`productId` dedup caught it. **The title prefilter is a cost-saver, never the dedup.**

## Price drift — 3 of 14 source prices were wrong

| product | source card | verified | verdict |
|---------|------------:|---------:|---------|
| Lakme Eye Regime Kit | 378 | 399 | 378/399 = 0.947 ≈ 0.95 → post-coupon, published 399 |
| Be Neude De-Tan wash | 189 | 199 | 189/199 = 0.950 → post-coupon, published 199 |
| Palmolive body wash | 256 | 292 | plain drift Rs 36, published 292 |
| Carrot knife set | 342 | 349 | drift Rs 7 (2% coupon prefix), published 349 |

Every published row carries the discrepancy in its description. The ratio test is arithmetic,
not DOM — coupon selectors read empty on fetched HTML, so element detection cannot do this.

Their card MRPs are also unreliable independent of price: Carrot knife card said 2999 / PDP 1999,
R-TEK card said 299 / PDP 499.

## CEO audit — rot

- **NEW #44** — indiafreestuff Flipkart `?rto=` resolves to a 403 tracking landing with no PDP.
  Only the `pid` is usable. Any ingest path that assumes the resolved URL is a product page
  drops every Flipkart deal on the floor.
- **#43 open** — CLAUDE.md still documents "homepage HTML fallback"; the homepage carries no
  deal grid at all. The live discovery surface is `/pages/getdeals`, anchor class `item-title`.
- **RSS still dead** — the feedburner URL returns HTTP 000. CLAUDE.md still says "RSS first".
- **Source price accuracy this tick: 10/14 correct** (2 post-coupon, 2 drift), plus 3 of 19
  titles carrying conditional-price prefixes that would have published unpayable numbers.
- Still unbaked into `apps/api/scripts/lib/ingest-common.mjs`: the `/pages/getdeals` discovery,
  the multi-line `buy_now` extractor, the `/product/p/itme?pid=` Flipkart resolver, the
  `(Min Buy 2)` / `[Supercoin ]` conditional-price rejects, and the arithmetic coupon guard.
  Five separate re-derivations of things already learned.
- Scratch hygiene clean — `apps/api/_ifs0920e_dd.cjs` created and removed in the same call.
