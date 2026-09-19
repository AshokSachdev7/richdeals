# DEAL-INGEST indiafreestuff tick — 2026-09-19g (IST)

**53 discovered → 51 resolved → 13 DB dups → 38 fresh → 4 rejects → 34 pushed LIVE.**
Push `HTTP 201 count 34`, every row `NEW`, zero errors, zero updates. IndexNow **HTTP 200 for
37 urls**. Largest single batch this source has produced.

Two findings worth more than the batch itself: **indiafreestuff card prices are wrong on 19 of
23 rows this sweep**, one by ₹10,113; and the long-open "missing bulk DTO" question is **resolved**
— there is no admin service and no DTO file, the interface lives in the deals module.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (RSS + homepage) | 53 |
| Resolved to a real single-product store URL | 51 |
| Removed by live-DB dedup | 13 |
| Fresh candidates verified | 38 |
| Rejected on verification | 4 |
| **Pushed live** | **34** |

### Discovery + resolution

`?rto=` Buy Now redirects resolved with a browser UA, **2.6 s between requests** (the script's
hardcoded `GAP = 2600`, above the ≥2.5 s floor). No 403, no 429, so the two-strike abort never
armed.

**2 of 53 dropped at resolution, both correctly:**

```
dl.flipkart.com/dl/early-bird-deals-store   Flipkart Big Billion Days sale hub — not a product
jiomart.com/                                 resolved to the JioMart homepage, no product path
```

Both are the sale-hub / category class the hard rules already exclude. Neither was an error.

### ALL STORES — the rule held, the sweep did not

**51 of 51 resolved candidates were Amazon.** Zero Flipkart, zero Cuelinks-routed merchants. The
ALL-STORES rule was applied, not skipped: the resolver takes whatever the redirect produces and
the affiliate matrix has a branch for every store. indiafreestuff simply posted an Amazon-only
window. Consequence for this tick: the non-Amazon verification path (`verifyFromHtml()` →
`productLd()` → `Product.offers.price` ±₹1 + InStock) **was not exercised at all**, so nothing here
re-confirms it works. Worth saying plainly rather than letting "all stores, 34 shipped" imply
coverage the tick never had.

### Dedup against the live DB — 13 hits, all LIVE

Not the seen-cache. Prisma `findMany({where:{productId:{in:[…]}}})` against the live DB, per rot
#15.

```
B07VZBGPNY 2862 ₹379    B0F21ZVYKG 8387 ₹260    B0C4X6LS49 10375 ₹199
B0FGQWG7J2 9874 ₹85     B0DTHMHPG9 9458 ₹242    B0CSVZPWK9 6387 ₹4324
B082VG8CCX 6634 ₹201    B0GQZDLCWT 6930 ₹229    B083KBJ93F 1688 ₹200
B0FD37QDCP 7166 ₹349    B08T1K49W4 9044 ₹145    B08L46ZKKZ 9436 ₹2499
B0C3W1BN16 6960 ₹4253
```

**The push returned zero `UPD` lines.** That is the dedup stage's own independent proof: if a
single collision had slipped through, `upsertFromIngest` would have reported an update instead of
a create. 34 pushed, 34 created.

## Verification — Amazon, logged-in tab

Same-origin `fetch(…,{credentials:'include'})` + `DOMParser` inside the logged-in Amazon tab, 8
ASINs per `browser_evaluate`, 2.8 s apart. curl stays bot-blocked; this pattern is now proven over
**53 parses** across seven ticks.

Compact tuple output `[asin, price, mrp, pct, oos?1:0, title, img]` instead of objects — roughly
half the result tokens, and it folds `!cart` into `oos`.

### Source-card price drift — 19 of 23 comparable rows wrong

This is the tick's headline finding.

| Card says | Amazon buybox | Delta |
|---|---|---|
| 454 | 453 | −1 |
| 806 | 805 | −1 |
| 144 | 149 | +5 |
| 136 | 135 | −1 |
| 186 | 196 | +10 |
| 949 | 999 | +50 |
| 899 | 999 | +100 |
| 161 | 160 | −1 |
| 4607 | 4799 | +192 |
| 5463 | 5462 | −1 |
| 282 | 288 | +6 |
| 184 | 179 | −5 |
| 4031 | 4199 | +168 |
| 249 | 519 | **+270** |
| 3607 | **5299** | **+1,692** |
| 1019 | 1160 | +141 |
| 1094 | 4499 | **+3,405** (rejected, OOS) |
| 6877 | **16990** | **+10,113** (rejected, no discount) |
| 81 | 640 | **+559** (rejected, OOS) |

Zero-drift rows, all four: `B0H2W68R2V`, `B0BWV2HHJX`, `B0B68522RY`, `B08T67VDXW`.

**indiafreestuff card prices cannot be trusted at all** — not as a figure, not as an order of
magnitude. A ₹6,877 card fronting a ₹16,990 product is not staleness, it is a different price
regime. Every published number on our side came from the live buy box, never the card. Rot #2
re-confirmed with the strongest sample it has ever had.

### Four rejections

| ASIN | Item | Reason |
|---|---|---|
| `B0B4FDVQ9D` | Home Centre Helios Reynan end table ₹4,499 | **out of stock** |
| `B07YSMFMRW` | Vocado ski balaclava ₹640 live vs ₹81 on card | **out of stock** (and +₹559 drift) |
| `B0F9VSM878` | Home Centre cast-iron mini kadhai ₹999 | MRP null after the implausible-MRP guard, no `.savingsPercentage` → **cannot clear ≥20%** |
| `B0C1C6RTF2` | DROGO gaming chair ₹16,990 | MRP null, no discount, **plus the tick's largest drift** |

Two out-of-stock, two no-discount. **Owner decision #9 is now at three live instances** — the
−2% NIVEA row from `telegram-2026-09-19M`, plus `B0F9VSM878` and `B0C1C6RTF2` here. Three separate
sources have now produced a correctly-priced item that would publish an unindexable page. The
decision has enough evidence to close.

## Pushed — 34 rows

```
READY 34   descLen min 422
AFFMISS none
HTTP 201   count 34   (34 × NEW, 0 × UPD, 0 × ERR)
```

**Pre-flight gates, both passed before the POST:**

- Every slug matches `^[a-z0-9-]+$` and carries the **full 10-char ASIN**, never a prefix (the
  agent-file slug rule; the 2026-09-17 sweep shipped 21 slugs with a 6-char stub).
- Minimum description length **422 chars** — over 2× the `dealIndexable` ≥200-char arm, on top of
  every row already clearing the ≥20%-discount arm independently. No row depends on a single arm.
- `AFFMISS none` — all 34 `affiliateUrl`s joined from the resolved candidate set. The
  `?tag=ashoksachdev-21` fallback never fired.

Re-read from the DB after the push, not assumed:

```
N 34   ourTag 34   theirTag 0
descLen 422–549
sample  amazon.in/dp/B0H2W68R2V?th=1&psc=1&tag=ashoksachdev-21
```

**34/34 carry our tag, 0 carry theirs.** Their `dealhind-21` never survived resolution.

Descriptions are generated from a 3×3×3 rotation of openers, middles and tails over the row's
**real fields only** — price, MRP, rupee saving, percentage. No invented specs, no borrowed copy.
Each tail states the price was read off the live Amazon buy box and excludes coupon and bank
offers, which is both true and the GEO playbook's answer-first-then-caveat shape.

### Self-caught: `Rs.` instead of `₹` in all 34 titles

The push script wrote titles as `… at Rs.247 (50% Off) - Amazon`. Site-wide convention is
`… at ₹247 (50% Off) – Amazon` — rupee glyph, en-dash.

Cause is mine and worth recording so it does not repeat: the standing "heredocs mangle
backslashes, keep bodies backslash-free" caution leaked into a **Write-tool** file, where it does
not apply. The rule is heredoc-specific; I applied it one layer too wide.

Fixed inline under the DB slot wrapper with `₹` / `–` escapes:

```
ROWS 34   RETITLED 34
```

Verified on a sample row, all five columns together rather than the title alone:

```
title       LAKME Blush & Glow Jelly Face Wash 150 g at ₹247 (50% Off) – Amazon
price 247   mrp 490   discountPct 50   status LIVE
image       m.media-amazon.com/images/I/51jCzumBBTL._SL1500_.jpg
```

Caught before the report, not by an audit three ticks later — but it did ship to the DB for a few
minutes, so it is logged as a real defect, not a near-miss.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <34 slugs>
DONE: IndexNow -> HTTP 200 for 37 urls
```

**37 = 34 slugs + 3 prepended defaults** (`/`, `/offers`, `/sitemap.xml`) — exactly the predicted
count. Clean 200, no 422, no Bing GET fallback needed.

Prod serves a new page with **no deploy**:

```
https://richdeals.in/lakme-blush-and-glow-jelly-face-wash-150-g-b0gsz2phqf → 200 in 0.269 s
```

**Sitemap `<loc>` 9606** (was 9604) — the 34 have not landed yet, and that is correct: the push
sits inside the ISR `revalidate = 1800` window. Not a fault, nothing to regenerate by hand.
`llms.txt` is `force-dynamic` and already carries them.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10339** · PENDING_REVIEW **0** · EXPIRED **259** |
| LIVE null price / null image | **0 / 0** — ninth consecutive no-op |
| LIVE discountPct null w/ price+mrp | **0** — rot #29's new arm holds |
| DB max deal | **10686** `curaa-indiepro-2100w-induction-stove-with-rotary-knob-b0h87wb3bx` ₹4,799 LIVE |
| Posts/day IST (7 d) | 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · **09-19:3** |
| Blog hygiene | published **316** · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| Ingest pace | **231 / 24 h · 951 / 7 d** |
| tg-broadcast cursor | 10482 vs 10686 — **drift 204** (rot #4) |
| Sitemap `<loc>` | 9606 |
| Prod endpoints | **7/7 200**, all in band |
| Unpushed commits | **0** before this tick |

```
200 0.370  /            200 0.145  /offers      200 0.438  /blog
200 0.377  /sitemap.xml 200 0.159  /feed.xml    200 0.188  /api/deals
200 0.402  /llms.txt
```

**No slow sample — the re-measure rule did not fire.** First tick in four where all seven endpoints
were in band on the first read.

Both counter checks are exact rather than approximately right: LIVE **10305 + 34 = 10339**, max
deal **10652 + 34 = 10686**. An off-by-one either way would have meant a silent partial push.

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row. Said
every tick because an absent key and a broken query look identical in that output.

**Ingest pace recovered.** 231/24 h and 951/7 d against 220/917 at 09-19f. The one-off 131/day
reading that tick flagged has reversed — **it was a window artefact, not a decline, and should not
be carried forward as one.**

**Drift 170 → 204, +34 exactly.** Predicted by this push before it was read, then confirmed.

## Rot — standing 29, movement this tick

**#2 (source price drift) re-confirmed at its strongest yet** — 19 of 23 comparable rows wrong,
worst case ₹10,113.

**#4 → 204.** Only the external tg-broadcast cron closes it (owner decision #3). The cursor stays
untouched: an unattended drain now dumps 204 channel messages at once.

**#11 partly self-inflicted this tick.** Both Prisma scratch scripts were `rm -f`'d in the same
Bash call that ran them, per the hygiene rule. But four non-Prisma scratch files
(`_ifs-0919g.json`, `_ifs-fresh-0919g.json`, `_push-ifs-0919g.mjs`, `_slugs-0919g.txt`) lived under
`apps/api/` for the length of the tick before being deleted at close-out. **~200 older
`ifs-*`/`push-ifs-*` artefacts remain in `apps/api/scripts/`** — owner decision #5, unchanged.

**#29's current instance stays closed** (0 rows). The class stays open: the 34 new rows all
carried `discountPct`, so the ingest path did not re-open it *this time*, which is not the same as
a guarantee. **The `discountPct IS NULL AND price IS NOT NULL AND mrp IS NOT NULL` arm should
become a permanent member of the standing audit set** — it was run by hand again here.

**#22 holds at seven instances.** No new stale-price row surfaced.

**#21 stays materially weakened** from `telegram-2026-09-19M` (3/3 `link.amazon` codes resolved
through `curl -L`). No `link.amazon` codes in this sweep, so nothing new either way. Still needs a
downgrade or a close rather than a fourteenth unchanged carry.

**#12** stays half-fixed: CLAUDE.md still documents chunked `/sitemap/deals.xml` routes that prod
404s.

### New this tick — two code gaps, neither yet rot

**1. `._SL1500_` image upgrade silently no-ops on bundle images.**

The upgrade regex is `/\._[A-Z0-9_,]+_\./`. It does not match:

```
._SY355_PIbundle-6,TopRight,0,0_AA355SH20_.
```

Lowercase letters and a hyphen inside the token. Two rows shipped at **355 px** instead of 1500 px:
`B0H2W68R2V` and `B08PW3KXGZ`. Both carry real `m.media-amazon.com` URLs, so neither violates the
image rule and neither is broken — they are simply small, which weakens the OG card and the
Product schema image. Fix belongs in `ingest-common.mjs`: a `PIbundle`-aware size upgrade.

**2. `ingest.config.json` sets `requestDelayMs: 1500`, below the ≥2.5 s hard rule.**

Nothing was rate-violated this tick — the script's hardcoded `GAP = 2600` governs and the config
value is not read on this path. But a config file that states 1500 next to a hard rule that says
2500 is a trap for whoever wires the config up next. It is a **pre-existing modified file and was
not staged**, so the fix is a decision, not something to slip into this tick's commit.

### Resolved — the "missing bulk DTO" finding

Carried open across several ticks. Closed by reading the source:

- `apps/api/src/admin/admin.controller.ts:27` — `@Post('bulk') createBulk(@Body() body: { deals: IngestDealDto[] })`, loops `upsertFromIngest`, unions revalidate paths into a `Set` seeded with `'/'`, returns `{count, results}`.
- **There is no `admin.service.ts`** — the controller injects `DealsService` and `RevalidateService` directly. The grep that kept "finding nothing" was looking for a file that has never existed.
- **There is no separate bulk DTO file** — `IngestDealDto` lives at `apps/api/src/deals/deal-ingest.dto.ts` alongside `mapStatus()`.
- Auth is `ApiKeyGuard`: header `x-admin-key` vs `process.env.ADMIN_KEY`.

One consequence matters for AUTO-APPROVE: **`mapStatus()` returns `PENDING_REVIEW` when `status`
is absent.** `status:'live'` must be sent explicitly on every row or the batch silently lands in a
review queue the owner has abolished. This tick sent it on all 34.

## Open owner decisions — 10

**#9** (confirm a 0%-discount exact-price match never publishes) is now the most decidable item on
the list — **three live instances across three sources**, two of them from this tick.

**#5** (scratch-file cleanup under `apps/api/`) gained four more files this tick, all cleaned at
close-out, against ~200 that remain.

**#7** (persist a reject cache) stays top on frequency — two of this tick's four rejects are
items earlier ticks have already rejected, with no memory of it.

**#3** is at **204** and grows with every push.

**#6** (periodic re-verify sweep) gains the drift table above: if the *source* is wrong on 19 of
23 rows, our own rows verified weeks ago are unlikely to be better.
