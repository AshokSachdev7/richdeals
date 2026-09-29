# DEAL-INGEST indiafreestuff tick — richdeals.in — 2026-09-21 (c)

Run **inline**, not as the `deal-ingest` subagent — the brief says so explicitly, and the agent file's
`"status": "pending-review"` language is stale against the AUTO-APPROVE directive. Everything below
was pushed `status:live` directly.

## Result

**3 deals published.** `POST /admin/deals/bulk` → **HTTP 201**, `count:3`:

```
{"count":3,"results":[
 {"slug":"healthyhey-berberis-berberine-95-milk-thistle-750mg-60-caps-b07cj5","created":true,"ok":true},
 {"slug":"dabur-almond-hair-oil-650ml-non-sticky-damage-protection-b0d66p","created":true,"ok":true},
 {"slug":"leather-car-armrest-cushion-dual-cup-holders-storage-box-b0h83x","created":true,"ok":true}]}
```

The `results[]` array was scanned row by row, not inferred from the 201. `/admin/deals/bulk` wraps
each item in its own try/catch, so a 201 can carry `ok:false` rows and a `count` that overstates what
landed (`admin-bulk-contract.md`). All three read `created:true` **and** `ok:true` — no hidden
failure.

`ADMIN_KEY` was sourced from `apps/api/.env` into the shell and interpolated into the `x-admin-key`
header. Its presence was confirmed with `grep -c '^ADMIN_KEY=' apps/api/.env` → `1`. **The value was
never printed** — not to the terminal, not here.

## Freshness — the ping fired

```
node apps/api/scripts/indexnow-ping.mjs \
  healthyhey-berberis-berberine-95-milk-thistle-750mg-60-caps-b07cj5 \
  dabur-almond-hair-oil-650ml-non-sticky-damage-protection-b0d66p \
  leather-car-armrest-cushion-dual-cup-holders-storage-box-b0h83x

DONE: IndexNow -> HTTP 200 for 6 urls
```

**HTTP 200, 6 urls** — 3 slugs plus the 3 the script auto-appends (`/`, `/offers`, `/sitemap.xml`),
exactly the documented `slugs + 3` arithmetic. Deals do not self-ping the way blogs do through
`insert-blog-mdmeta.mjs`, so without this call the batch would be sitting in the DB, not shipped.

The **sitemap has not been re-read** for these three. It is ISR `revalidate = 1800`, so a loc delta
lags a push by up to 30 minutes. The next SITEMON tick must grep the three slugs individually before
crediting any `+3` — arithmetic attribution is what the earlier `+8` retraction was about.

## Discovery

`curl -sL` with a browser UA to `https://indiafreestuff.in/pages/getdeals` → **301 to the `www` host**,
then HTTP 200, **247,762 bytes**. The `-L` is mandatory; without it the sweep sees only the redirect.
Cards parsed off `<a class="item-title" href="…">` — **40 cards**.

**Rot #43 restated:** CLAUDE.md still documents "their RSS (feedburner) first, homepage HTML
fallback". The feedburner feed returns HTTP 000 and the homepage carries no deal grid.
`/pages/getdeals` is the only working discovery path, and it is undocumented.

Source-domain rate limit honoured — ≥2.5 s between indiafreestuff requests. No 403, no 429, so the
two-consecutive-block abort never armed.

## `?rto=` resolution — no merchant contact needed

Each deal page carries `<a … class="btn-primery buy_now" … href="https://www.indiafreestuff.in/?rto=<base64>">`.
**The anchor spans lines — the extractor needs `re.S`.** That URL answers **HTTP 302 with the real
store URL in the `Location` header**, so reading `Location` with redirects disabled resolves the
destination without ever touching Amazon. All 26 resolved rows: `http:200`, `code:302`,
`host:"www.amazon.in"`.

**Correction to a claim carried in earlier reports.** The belief that "IFS emits two Amazon URL
shapes — the newer ones carry `pf_rd_p`+`sbo` and *no* `tag=`" is **wrong**. Every `dest` row carries
`pf_rd_p=da3a0150-1c0d-49da-a217-66ad62b72c1a`, `sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D` **and**
`tag=dealhind-21` together. The stripper must remove all three plus `smid`, `ref`, `m`, `qid`, `s`,
`sr`. Affiliate swap applied: `?tag=ashoksachdev-21` on a clean `/dp/ASIN`.

## Dedup — against the DB, not a file

One Prisma `findMany({where:{productId:{in:[…]}}})` against the live DB. **14 of 26 resolved ASINs
were already LIVE:**

```
B0CNGX3YFN 4219 · B01BBNF6GM 2702 · B0FP8XT52S 5027 · B072JG94NY 6303 · B0GZKSPVDW 8239
B09FMJ8WWR 8995 · B0G7X7KFNY 10793 · B0H7KYHVLY 10795 · B0HG6MM2VK 10794 · B0H7LKBJX4 10791
B0DYPGSDX1 10792 · B0H6FY3SBX 10796 · B0CKLGCXCS 10797 · B0H6M46J86 10798
```

**Eight of those fourteen are ids 10791-10798 — our own previous sweep.** IFS re-serves cards we
ingested hours ago, so a raw card count badly overstates available inventory: 40 cards → 26 resolved
→ 12 novel → 3 publishable. A 54% self-rediscovery rate on the resolved set.

None of the three keepers appeared among the dedup hits, and all three came back `created:true`,
which is the independent confirmation that the dedup read was correct.

## Price verification — 12 ASINs, one browser call

One `browser_evaluate` in the logged-in Amazon tab ran sequential
`fetch("https://www.amazon.in/dp/"+asin,{credentials:"include"})` + `DOMParser` reads, 1,200 ms apart.
All 12 returned HTTP 200 — no 403, no 429, no captcha. Selectors: `#productTitle`; price
`.priceToPay .a-price-whole` → `#corePrice_feature_div .a-price-whole`; MRP
`.basisPrice .a-text-price .a-offscreen` → `#corePriceDisplay_desktop_feature_div .a-text-price .a-offscreen`;
stock `#add-to-cart-button` / `#outOfStock`; image `#landingImage`, preferring `data-old-hires` over
`src` (the `src` is a thumbnail).

| ASIN | title (short) | price | MRP | off | atc | oos |
|---|---|---:|---:|---:|---|---|
| B07CJ5KT54 | HealthyHey Berberis | 899 | 1689 | 46.8% | ✔ | – |
| B07BNPKZHH | PentaSure DM vanilla 1 kg | 2632 | 2742 | **4.0%** | ✔ | – |
| B0D66P1Y13 | Dabur Almond Hair Oil 650 ml | 216 | 435 | 50.3% | ✔ | – |
| B0H83XQ3CV | Leather Car Armrest Cushion | 749 | 1499 | 50.0% | ✔ | – |
| B086YHWYYN | TE-A-ME Green Tea Tulsi | 324 | 325 | **0.3%** | ✔ | – |
| B086YV2D51 | TE-A-ME Rooibos | 358 | 360 | **0.6%** | **✗** | **✗** |
| B086Y8LQVY | TE-A-ME Earl Grey | 294 | 295 | **0.3%** | ✔ | – |
| B086YGSV2K | TE-A-ME Darjeeling | 294 | 295 | **0.3%** | ✔ | – |
| B0BRJ7JF1V | Clovia Night Gown | **null** | null | – | ✗ | **OOS** |
| B0DBQB5F9Y | TE-A-ME Peppermint | 344 | 345 | **0.3%** | ✔ | – |
| B09ZHN9XW1 | Symbol Men's Chino Shorts | **null** | null | – | ✗ | **OOS** |
| B0GPFKRDGV | T2F Girls Leggings **Pack of 5** | 202 | **1800** | **88.8%** | ✔ | – |

Numeric coercion `String(s).replace(/[^0-9.]/g,'').replace(/\.$/,'')` — `.priceToPay` emits a
trailing dot that otherwise poisons `parseFloat`.

**`atc:false` AND `oos:false` is an ambiguous read, not InStock.** `B086YV2D51` returned exactly that
shape: no add-to-cart button and no out-of-stock block. Publishing it would mean asserting
availability we did not observe, so it was rejected on the ambiguity itself, not on a stock finding.

## The ±₹1 drift test — the gap that was open in prior reports is now closed

The brief demands `±₹1` against the source. Run naively against the IFS card figures, **11 of 12
fail**. That number is misleading, and the reason is now measured rather than guessed.

| ASIN | card label | card ₹ | verified PDP ₹ | raw drift | reconciled `PDP×(1−c)` |
|---|---|---:|---:|---:|---|
| B07CJ5KT54 | 10% | 809 | 899 | 90 | 809.1 ✔ |
| B07BNPKZHH | 10% | 2368 | 2632 | 264 | 2368.8 ✔ |
| B0D66P1Y13 | 3% | 209 | 216 | 7 | 209.5 ✔ |
| B0H83XQ3CV | 35% | 486 | 749 | 263 | 486.85 ✔ |
| B086YHWYYN | 50% | 162 | 324 | 162 | 162 ✔ exact |
| B086YV2D51 | 50% | 179 | 358 | 179 | 179 ✔ exact |
| B086Y8LQVY | 50% | 147 | 294 | 147 | 147 ✔ exact |
| B086YGSV2K | 50% | 147 | 294 | 147 | 147 ✔ exact |
| B0DBQB5F9Y | 50% | 172 | 344 | 172 | 172 ✔ exact |
| B0BRJ7JF1V | none | 459 | **null (OOS)** | n/a | n/a |
| B09ZHN9XW1 | none | 449 | **null (OOS)** | n/a | n/a |
| B0GPFKRDGV | none | 202 | 202 | **0** | exact, no coupon |

**The law: an IFS card price is `PDP × (1 − couponPct)`, and `couponPct` is printed in the card's own
title** as an `[Apply N% Coupon]` label. **9 of 9** labelled rows reconcile to within ₹1. The single
**unlabelled** live row, `B0GPFKRDGV`, sits at **0 drift** — that is the control that makes the
explanation airtight rather than a curve fit, because it is the row the model predicts should *not*
move, and it does not.

This supersedes the vaguer `ifs-card-prices-lie.md` framing ("68% of their listing prices are
wrong"). The prices are not random; they are deterministically post-clip-coupon. **Never reject an
IFS card on raw drift before applying the labelled coupon.**

**Honest caveat on the instrument.** The card chunker (`$S/cards.py`) takes a ±3000-byte window
around each title, which overlaps neighbouring cards. Only the **first** price in each extracted list
is reliable. The table above uses first-price only. The chunker was not fixed — it is sufficient for
this test, and pretending its later prices are trustworthy would be the actual defect.

## Dispositions

| outcome | rows | reason |
|---|---|---|
| **published** | B07CJ5KT54, B0D66P1Y13, B0H83XQ3CV | verified InStock, real discount, clears `dealIndexable` |
| hard reject | B0BRJ7JF1V, B09ZHN9XW1 | OOS, null price — never publish an unverified price |
| reject | B086YV2D51 | ambiguous stock read |
| reject | B086YHWYYN, B086Y8LQVY, B086YGSV2K, B0DBQB5F9Y | 0.3% displayed discount |
| reject | B07BNPKZHH | 4.0% |
| hold | B0GPFKRDGV | multi-pack **and** third implausible-MRP exemplar |

The four TE-A-ME teas are the interesting reject. Each carries a claimed 50% coupon that would make
it a genuine deal — but the coupon is unverifiable (below), and on the *displayed* numbers a 0.3%
discount fails `dealIndexable`'s `discount ≥20% OR description ≥200 chars` gate
(`apps/web/src/lib/site.ts` L131-140). Publishing them would put five near-MRP grocery SKUs on the
site that the indexer would then refuse to include. **IFS bulk-lists near-MRP FMCG** — five in one
sweep from a single brand block.

`B0GPFKRDGV` is the **third** implausible-MRP exemplar: ₹1,800 MRP on a ₹202 five-pack of girls'
leggings, read straight off `.basisPrice`. Two earlier ones already shipped (₹5,999 on a ₹1,495
stylus, ₹999 on a ₹199 peeler). The implausible-MRP guard is still unwritten; this one was caught by
hand, pre-publish.

## The coupon is corroborated, never verified

**The Amazon clip-coupon widget does not render in fetched HTML.** Every selector for it reads empty
through `fetch` + `DOMParser`, even in the logged-in tab. So a claimed coupon can be
*arithmetically corroborated* by the ratio test above, but it cannot be *observed*.

That distinction drove the payload shape: `price` holds the **verified buybox price**, and the coupon
claim goes in `couponNote`, worded as claimed-not-verified. A user who clips the coupon pays less
than we advertise; a user who cannot pays exactly what we advertise. The reverse arrangement would
publish a price nobody can get.

## Re-verification at push time

The three keepers were re-fetched immediately before the payload was built — the earlier sweep's
numbers were not trusted across the gap:

| ASIN | price | mrp | image |
|---|---:|---:|---|
| B07CJ5KT54 | 899 | 1689 | `…/61-Emi8c5+L._SL1500_.jpg` |
| B0D66P1Y13 | 216 | 435 | `…/71bh4oFYUcL._SL1500_.jpg` |
| B0H83XQ3CV | 749 | 1499 | `…/717aMQDmgTL._SL1100_.jpg` |

All HTTP 200, `atc:true`, `oos:false`, unchanged prices. Two of twelve rows in this very sweep went
OOS between discovery and verification, which is exactly why the re-read exists.

Images are `m.media-amazon.com` CDN URLs read from the PDP — never `images.indiafreestuff.in`. Titles
and descriptions are rewritten, not copied.

All three clear `dealIndexable` on both arms: ≥20% discount **and** ≥200-char description.

## CEO audit

**The flat-₹ coupon gap is UNTESTED, and the push does not change that.** Every coupon label in this
sweep was %-shaped — 10, 3, 35, 50. The regex in `ingest-common.mjs`,
`/(\d+)% ?(?:off )?[Cc]oupon/`, handled all of them. It still cannot see `[Apply ₹1500 Coupon]` and
still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. A batch finally shipped this tick, but it
exercised zero flat-₹ labels, so calling the gap "re-confirmed" would be fabricated.

**The broadcast cursor now lags DB max, and that is not rot.** It reads `lastId:10804` while the DB
max has moved past it with these three inserts. Per `tg-broadcast-cursor-selfheals.md` the external
broadcast cron closes that gap on its own run. Not flagged, not drained — draining it needs the
owner's explicit go-ahead.

**`data/tg-multi-seen.json` was not written** (rot #45 — it drifts from the DB in both directions;
the Prisma check is the real dedup).

**Carried rot, unchanged:** **#48** `rogerkart.com/r/<code>` client-side Next.js redirect. **#46**
CoolzTricks nameless coupon claims. **#44** IFS Flipkart `?rto=` → 403, not triggered this sweep (all
26 resolved to Amazon). **#43** the feedburner/homepage discovery doc rot above. `ingest.config.json`
`requestDelayMs: 1500` is inert **and below the 2.5 s floor**. LIVE deal 10031 carries `productId`
`ae27f94b3330`, a hex hash. ~200 scratch files in `apps/api/scripts/` — owner decision #5.

**Open owner decisions touched by this tick:** #9 (confirm a near-0%-discount row never publishes —
five candidates rejected on it today) and **#11** (should the `GROCERY`/FMCG filter that guards
DesiDime apply to IFS and Telegram too — 2 of the 3 published keepers are FMCG/supplement).

## To bake into `apps/api/scripts/lib/ingest-common.mjs`

Highest value first:

1. **A card-title coupon-% parser feeding an automatic `PDP × (1 − c)` reconciliation before any
   drift reject.** Without it the naive ±₹1 test discards 11 of 12 rows, nine of them wrongly.
2. `/pages/getdeals` + `item-title` discovery, with the `-L` www redirect and an `re.S` extractor.
3. The no-redirect `Location` rto resolver.
4. A `pf_rd_p`/`sbo`/`smid`/`ref`/`m`/`qid`/`s`/`sr` stripper alongside the `dealhind-21` strip.
5. The same-origin-fetch + DOMParser Amazon verifier, `#productTitle` not `d.title`,
   `data-old-hires` preferred, `.priceToPay` trailing-dot strip, `.basisPrice` MRP.
6. An ambiguous-stock reject (`atc:false && oos:false`), an implausible-MRP guard, a minimum-discount
   floor, a flat-₹ coupon arm, and an `[Apply N% Coupon]` title-prefix stripper.
