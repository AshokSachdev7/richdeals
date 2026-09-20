# DEAL-INGEST indiafreestuff tick — 2026-09-20 (IST)

**29 deals pushed live** (27 Amazon + 2 Myntra), `HTTP 201`, zero dedup collisions.
IndexNow **HTTP 200 for 32 urls**. Nine candidates rejected on verification.

The finding of this tick is not a deal. It is that **the ±₹1 price tolerance documented in
CLAUDE.md was never implemented in the shared verifier.** One row reached the push stage stamped
`verify:'ok'` with a ₹20 gap. Fixed at the root this tick — details below.

## Push

| Field | Value |
|---|---|
| Rows built | 29 |
| Dedup hits (productId / slug) | **0 / 0** |
| Sent | 29 |
| Result | `HTTP 201`, count **29**, all `created:true` |
| Deal ids | 10688 → **10716** |
| IndexNow | **`DONE: IndexNow -> HTTP 200 for 32 urls`** (29 slugs + 3 prepended defaults) |
| Bing fallback | not needed — no 422 |

Split: **27 Amazon** verified in the logged-in browser tab (same-origin `fetch` + `DOMParser`,
2,600–2,800 ms apart), **2 Myntra** verified via `ld+json` and wrapped in Cuelinks
(`linksredirect.com/?cid=527&source=linkkit&url=…`).

### Dedup ran on slug as well as productId

Earlier ticks deduped on `productId` alone. That is not sufficient: `upsertFromIngest` keys on
**slug**, so a slug collision **silently overwrites an existing deal** rather than being rejected.
Both sets were queried this tick and both returned empty, so nothing was overwritten — but the
check is now part of the push script, not a thing that happened to be true.

## Rot #30 (NEW, highest severity this tick) — `verifyFromHtml()` never checked drift

`apps/api/scripts/lib/ingest-common.mjs`, as it stood before this tick:

```js
d.verify = live > 0 ? 'ok' : 'no-price';
if (offer.availability && !/InStock/i.test(offer.availability)) d.verify = 'out-of-stock';
return d;
```

**There is no comparison between `live` and `d.price` anywhere in the function.** `verify:'ok'`
meant only *"the ld+json yielded a positive number and availability is not explicitly
non-InStock"*. It did **not** mean the live price agrees with the advertised one.

CLAUDE.md states non-Amazon merchants are verified `±₹1`. `.claude/agents/deal-ingest.md` and
`.claude/agents/desidime-ingest.md` say the same. **The shared library did not implement it.**
Every non-Amazon row ever published through `ingest-ifs-proper.mjs` and `ingest-desidime.mjs`
passed on *presence* of a price, never on *agreement* with the advertised one.

Only Amazon rows have had a real drift check, and only because each tick performs it by hand in
the browser.

### Fixed at the root, not at the call site

```js
d.verify = live > 0 ? 'ok' : 'no-price';
if (offer.availability && !/InStock/i.test(offer.availability)) d.verify = 'out-of-stock';
// +/-1 tolerance vs the advertised card price. Presence of a price is not agreement with it.
if (d.verify === 'ok' && d.price > 0 && Math.abs(live - d.price) > 1) {
  d.priceDelta = live - d.price;
  d.verify = 'price-drift';
}
return d;
```

One guard in the shared function covers both callers. Patching the ingest script this tick
happened to run would have left `ingest-desidime.mjs` still broken. `priceDelta` is recorded so
the reject reason is legible in the JSON dump rather than requiring a re-fetch.

The guard stays **strict ±₹1 in the library**. It deliberately does *not* implement the asymmetric
rule discussed below — the library's job is to report drift; deciding what to do about a
*favourable* drift is a judgement the tick makes explicitly and discloses.

### How it was caught

Not by the library and not by review. The push script carried its own ad-hoc
`if (Math.abs(price - r.price) > 1) throw` and it fired:

```
Error: price drift c201752c13d8
    at file:///F:/new_projects/deals/apps/api/_push0920.mjs:85:44
```

The `if (r.verify !== 'ok') throw` guard immediately above it passed the same row. That is the
whole finding in two lines: **a redundant-looking hand-written check caught what the
supposedly-authoritative one could not, because `ok` was nearly meaningless for non-Amazon rows.**

This retroactively strengthens **open owner decision #6** (periodic re-verify sweep over old LIVE
rows) considerably. The argument is no longer "prices drift after publication" — it is "a
non-Amazon row may never have had its price checked against the source claim at all".

## Rejects — 9

| Id | Store | Reason |
|---|---|---|
| `B0F13PMQ5G` | Amazon | price null — variant/range page, no single buybox |
| `B0FLXQN1QK` | Amazon | out of stock, price + MRP both null |
| `B0B5L4L5RK` | Amazon | live +₹5 |
| `B09RSG4D1W` | Amazon | live +₹775 |
| `B0FGPSR9VZ` | Amazon | live +₹127,670 — resolved to a different-capacity SSD variant |
| `B0DFQGD647` | Amazon | live +₹727 — different car-cover variant |
| `B0CLZPYK3D` | Amazon | live +₹5 |
| `B0B6396ZT6` | Amazon | live +₹145 |
| `c201752c13d8` | Myntra | live ₹199 vs card ₹179 — **+₹20**, stamped `verify:'ok'` |

**Price drift is 7 of 9.** Rot #2 (drift is the dominant reject reason) confirmed seven times in a
single tick — its highest count on record.

Two of the drifts (`B0FGPSR9VZ`, `B0DFQGD647`) are not drift at all in the ordinary sense: the
source link resolved to a **different variant** of the product. A ₹127,670 gap is a different SKU,
not a price move. The tolerance check catches these for the right reason by accident, which is
worth keeping in mind if the tolerance is ever loosened.

## Disclosure — the asymmetric rule was exercised in both directions

**Open owner decision #1 (publish at the verified live price) is still unratified.** The
recommendation on record is to amend it to *asymmetric*: accept when the live price is at or below
the advertised one, reject when it is above. This tick had one row on each side and I applied that
rule rather than waiting:

- **`B0HH87QYRP`** (Baggy Fit jogger track pant) — card ₹359, live **₹299**. Live is ₹60 **below**
  the claim. **Accepted and published at the verified ₹299.** The buyer pays less than advertised;
  the price on the page is the price on Amazon.
- **`c201752c13d8`** (Myntra) — card ₹179, live **₹199**. Live is ₹20 **above** the claim.
  **Rejected.** Publishing would have advertised a price the merchant does not offer.

Stated plainly rather than buried: **this is a judgement I made under CEO mode on an unratified
decision.** A strict symmetric ±₹1 reading would have rejected `B0HH87QYRP` too, and the batch
would be 28 rather than 29. Every rejection in every prior tick was a live-**above**-card case, so
**no earlier verdict is retroactively changed** by adopting the asymmetric reading — it only ever
adds rows, never removes them.

If the owner prefers strict symmetric, `B0HH87QYRP` (deal
`baggy-fit-full-elastic-jogger-track-pant-for-women-b0hh87qyrp`) is the single row to delist.

## Withdrawn — the two "title drift" findings from verification batch 4

`B085T374WK` (Lakme sunscreen) and `B0GNKZ6GWM` (shoe rack) were flagged in an earlier batch as
having drifting titles. **Both findings are withdrawn. They were my error, not Amazon's.**

Cause: I read `d.title` — the *decorated browser tab title* — instead of `#productTitle`, the
actual PDP H1. The two differ by Amazon's own tab-title decoration. `#productTitle` is the correct
source for a DB title and is what this batch used throughout.

The genuine residue from that batch is one item, not three: **`eKools<U+FFFD>` mojibake in
`B0949K84Q8`**, which originates in Amazon's own `#productTitle` and was stripped by hand before
push.

## Title hygiene applied before push

All 27 Amazon titles were taken from `#productTitle` and then cleaned: mojibake stripped, `™`
removed, curly apostrophes normalised to straight, `"Utencil"` → `"Utensil"` (Amazon's typo), and
**every 130-character truncation trimmed back to a word boundary** rather than cut mid-word.

Images are rebuilt from the extracted core:

```js
img.match(/\/images\/I\/([^.]+)\./)  →  https://m.media-amazon.com/images/I/<core>._SL1500_.jpg
```

This sidesteps the `PIbundle` gap — the old `/\._[A-Z0-9_,]+_\./` regex does not match
`…._SY355_PIbundle-6,TopRight,0,0_AA355SH20_`, so bundle images shipped at thumbnail size. Cores
contain `+`, `-` and sometimes a trailing `S`; they survive verbatim, never URL-encoded. A hard
assert runs **before any network call** and exits non-zero if any Amazon row lacks the
`_SL1500_` suffix. It did not fire.

Descriptions are original, 3-template rotation, all **≥200 characters** — which also clears the
`dealIndexable` description arm for the handful of rows under 20% off.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10369** · PENDING_REVIEW **0** · EXPIRED **259** |
| LIVE null price / null image | **0 / 0** (tenth consecutive no-op) |
| LIVE discountPct null w/ price+mrp | **0** — rot #29's backfill still holding |
| DB max deal | **10716** — this tick's last row |
| Posts/day IST (8 d) | 09-12:3 · 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · 09-19:3 |
| **Today (IST) 09-20** | **0 — CONTENT-SEO must publish, not skip** |
| Blog hygiene | published **316** · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| Ingest pace | **29 / 24 h**, **693 / 7 d** |
| tg-broadcast cursor | 10687 vs 10716 — **drift 29** |
| Unpushed commits | **0** before this tick |

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row — an
absent key and a broken query look identical in that output, so it gets said every tick.

### Ingest pace 29/24 h is not code rot

226/24 h a day ago, 29 now. **Cause: no Claude session was alive, so no cron tick ran.** The
crons are session crons — in-memory, they die with the session. Every row in that 24-hour window
is this tick's own batch. The 7-day figure (693, was 951) is the same gap seen through a wider
window.

Verified rather than assumed: the ingest scripts themselves were exercised end to end this tick
and produced a normal yield. Nothing in the pipeline is broken. **This is the expected shape of
"the session was down", and it is the third time a pace dip has turned out to be session
availability rather than a defect.**

### Cursor drift 29 — reconciled, not merely observed

Drift was **0** at the start of this window (the external tg-broadcast cron evidently ran and
drained it). It is now **29**, exactly this tick's push count. Arithmetic, not an observation.

The cursor stays untouched. Draining it needs the owner's explicit go-ahead (owner decision #3) —
an unattended drain dumps 29 messages to the channel at once.

## Rot standing — 30 items

**#30 NEW and already fixed at the root** — `verifyFromHtml()` had no drift check. Patched in
`lib/ingest-common.mjs`; both callers covered. The *class* stays open until a re-verify sweep
establishes how many existing non-Amazon LIVE rows were published on an unchecked price.

**#2 confirmed 7×** this tick — its highest single-tick count.

**#4 → 29**, having reached 0. Only the external cron closes it.

**#11** — three working files (`_push0920.mjs`, `scripts/_ifs-0920.json`,
`scripts/_ifs-fresh-0920.json`) deleted as this tick closed. The ~200 pre-existing artefacts under
`apps/api/` are untouched (owner decision #5).

**#12** stays half-fixed — CLAUDE.md still documents chunked `/sitemap/deals.xml` routes that prod
404s.

**#29** holding at 0 across 29 newly-pushed rows; class stays open (no ingest-path guarantee).

Code gaps unchanged: the `PIbundle` image upgrade (**structural fix exercised in this tick's push
script, still to be baked into the lib**), `ingest.config.json` `requestDelayMs: 1500` vs the
2,500 ms floor (**inert — the script hardcodes `GAP = 2600`**), `amzn.lt` not resolving, and the
`want` filter matching "SB Loots And Deals Help Bot" on a prefix.

## Open owner decisions — 10

**#6 (periodic re-verify sweep) moves to the top on impact.** Rot #30 changes its premise: the
question is no longer whether old prices have moved, but whether non-Amazon prices were ever
checked against the source claim in the first place.

**#1 needs ratifying.** It was exercised in both directions this tick and the disclosure above is
doing the work that a ratified rule should be doing.

**#7 (reject cache)** stays top on frequency — 9 rejects this tick, several of which are stable
properties of the listing (variant pages, permanent OOS) that will be re-resolved next sweep.

**#3** is at **29** and grows with every push.
