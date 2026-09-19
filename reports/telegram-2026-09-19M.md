# TELEGRAM deal-monitor tick — 2026-09-19M (IST)

**8 candidates → 1 pushed, 5 deduped, 2 rejected.** IndexNow **HTTP 200 for 4 urls**. One stale
LIVE row repaired inline. One long-standing rot item (#21) collapsed under its first real test.

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`, 13 groups from `data/tg-groups.json`,
`{title, last}` per row. ~1k tokens, no chat opened, no reload.

**The Telegram service row surfaced a live login code again — thirteenth consecutive tick.** No
value has been recorded in this report, in the terminal, in the commit, or anywhere else, and
none was acted on. That row stays on the permanent-skip list and is not a source chat.

## Funnel

| Stage | Count |
|---|---|
| Single-product candidates extracted | 8 |
| Survived shortlink resolution | 8 |
| Removed by DB dedup | 5 |
| Rejected on verification | 2 |
| **Pushed live** | **1** |

### Shortlink resolution — 8/8 clean

`curl -sL` with a browser UA, `sleep 2.6` between each (≥2.5 s rate limit honoured, no 403/429
except the known Flipkart one below).

**Rot #21 did not hold.** The standing claim is that 9-char `link.amazon` codes are truncated and
unusable. All three in this sweep — `B00ihfrNv`, `B0fzyVxCa`, `B05yvriRF` — resolved cleanly
through `curl -L` to real `/dp/ASIN` URLs. Three for three on the first tick that actually tested
them. **#21 should be downgraded to "resolves via curl -L, no special handling needed" or closed
outright**, not carried forward unchanged for another thirteen ticks.

`fkrt.co/l5KOxl` returned **HTTP 403** — rot #14 behaving exactly as documented. Not treated as a
failure: `curl -L` still exposed `url_effective` as `/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6`,
which is all the resolution step needed. Verification moved to the browser tab.

### Dedup

Seen cache (`data/tg-multi-seen.json`, flat array, 1754 ASINs) hit on 3. The DB — the actual
authority per rot #15 — hit on **5**:

```
B07QCNRRPP  6772  LIVE  449   amazon-symbol-womens-jeans
B07QX21WZQ  5825  LIVE  549   trustbasket-uv-treated-plastic-round-pot-6-inch-black-set-of-12
B07YY7YPLT   954  LIVE  397   park-avenue-good-morning-grooming-collection-y7yplt
B0FNM7XWFD  2569  LIVE  3540  havells-prisma-750-w-3-jar-mixer-grinder-3-m7xwfd
B0G38DGNKM  7110  LIVE  3459  lavie-luxe-quaro26-horizontal-small-satchel-handbag-women
```

**The two lists disagreed on 2 of 5.** Rot #15 re-confirmed live, not carried on faith: the seen
cache is a speed-up, never the dedup authority.

One shortlink was actively misdescribed by its own post. NonStopDeals posted a bare
`151 https://amzn.to/4uZXfjK`, which resolved to `B07QX21WZQ` — a TrustBasket plant-pot set,
nothing to do with "151". Already live and deduped out, but recorded as a concrete reason the
post preview text can never be trusted to describe the link it carries.

## Verification

**Amazon — one `browser_evaluate`, 3 ASINs, same-origin `fetch` + `DOMParser`, 2.8 s apart** in
the logged-in tab. curl is bot-blocked; this pattern is not.

| ASIN | Live buybox | MRP | Disc | Verdict |
|---|---|---|---|---|
| `B0DQ57M8HC` Samsung monitor | ₹10,499 | ₹21,000 | **−50%** | in stock → **push** |
| `B07D9LMCC7` NIVEA shaving foam | ₹220 | ₹225 | **−2%** | **reject** |
| `B07QCNRRPP` Symbol jeans | ₹399 | ₹2,299 | −83% | already live at ₹449 → **repair** |

**The NIVEA rejection is a new axis and worth stating plainly.** Its price matched the channel
exactly — zero drift, the usual reject reason did not apply. It failed on *quality*: at −2% it
cannot clear `dealIndexable`'s ≥20% arm, so publishing it would have created a page that never
reaches the sitemap. **A correct price can still be a junk deal.** This is also the closest thing
yet to a live test case for open owner decision #9.

**Flipkart — browser-tab `ld+json`** (the curl-403 workaround):

```
Product.offers.price        1393
Product.offers.availability OutOfStock
```

Channel claimed ₹799. A ₹594 gap, 74% off the claimed figure, **and** the item is out of stock.
Two independent arms killed it. Rot #2 (price drift as the dominant reject reason) re-confirmed.

### The coupon-inclusive-price guard, proved by arithmetic

Dealdost posted the Havells mixer grinder "at 2550\*" with "Apply ₹490 Coupon + ₹500 Off With
SBI/ICICI/HDFC/Axis CC". Our row 2569 carries **₹3,540**.

```
3540 − 490 − 500 = 2550
```

Exact, to the rupee. The channel's own numbers confirm our buybox is right and its headline is
not a buybox price at all. This is the strongest evidence the guard has ever had, and it argues
for baking it into `ingest-common.mjs` rather than re-deriving it per tick.

## Pushed

| Field | Value |
|---|---|
| Deal id | **10652** |
| Slug | `samsung-essential-s4-27-inch-fhd-100hz-ips-monitor-b0dq57m8hc` |
| Price / MRP | **₹10,499 / ₹21,000 — −50%** |
| Image | `m.media-amazon.com/images/I/7144nfL8ALL._SL1500_.jpg` (real CDN, `_SL1500_` upgrade) |
| Description | 579 chars, original — clears the ≥200-char arm as well as the −50% arm |
| Affiliate | `amazon.in/dp/B0DQ57M8HC?tag=ashoksachdev-21` |
| Push | `HTTP 201 +1` |
| IndexNow | **HTTP 200, 4 urls** (1 slug + 3 prepended defaults) |
| Live on prod | `https://richdeals.in/samsung-essential-s4-…-b0dq57m8hc` → **200 in 0.299 s** |

The channel claimed a "Regular 14,399". Discarded in favour of Amazon's own MRP of 21,000 —
the marketplace's number, not the channel's, is what the page quotes.

## Fixed inline (CEO mode)

**Deal 6772 — `amazon-symbol-womens-jeans`, rot #22, seventh confirmed instance.**

```
before   ₹449 / ₹2299   80%   "… at ₹449 (80% Off) – Amazon"
after    ₹399 / ₹2299   83%   "… at ₹399 (83% Off) – Amazon"
```

Price, `discountPct`, title **and** description all rewritten — the first pass moved the numbers
and left `80% Off` in the title string, which would have shipped a row that contradicts itself.
Caught and corrected in the same tick. Worth noting because a price-only repair looks complete in
a DB read and is still wrong on the served page.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10305** · PENDING_REVIEW **0** · EXPIRED **259** |
| LIVE null price / null image | **0 / 0** |
| DB max deal | **10652** — the row this tick pushed |
| Posts/day IST (7 d) | 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · **09-19:3** |
| Blog hygiene | published **316** · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs 10652 — **drift 170** (rot #4), +1 from this push |
| Unpushed commits | 0 before this tick |

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row.

## Rot standing — 29 items

**#29 is new, and it was predicted.** The 09-19a blog tick logged one row (`deal 10214`) with
price and MRP present but `discountPct` null, and wrote: *"if a second turns up, this becomes rot
#29."* A second turned up — **88 more of them**. The audit query returned **89 LIVE rows** in that
state. All 89 were backfilled inline this tick (details in `sitemon-2026-09-19f`), so #29 opens
and its current instance closes in the same hour, but the class stays open: nothing in the ingest
path guarantees the column is written.

**#21 collapsed** — see the resolution section. Three of three `link.amazon` codes resolved.

**#22 → seventh instance** (deal 6772), repaired.

**#2, #14, #15 re-confirmed live** by this tick's own evidence rather than carried forward.

**#4 moved to 170.** Every push widens it; only the external tg-broadcast cron closes it.

**#5 live again** — a Rogerkart laptop-bag post was skipped because `curlFinal` still cannot
follow `rogerkart.com/r/…`.

**#11 cleared for this tick** — both scratch scripts (`_tg0919m.mjs`, `_push-tg-0919m.mjs`)
deleted, the Prisma ones in the same Bash call that ran them.

## Open owner decisions — 10

**#7** (persist a reject cache) stays top on frequency: this tick re-rejected two items that
earlier ticks have already rejected, with no memory of having done so.

**#9** (confirm a 0%-discount exact-price match never publishes) gained its clearest case — the
NIVEA row at −2% with a perfectly matching price.

**#6** (periodic re-verify sweep) gained deal 6772, and the 89-row `discountPct` finding argues
the sweep should check completeness, not only price.

**#3** is at **170** and grows with every push.
