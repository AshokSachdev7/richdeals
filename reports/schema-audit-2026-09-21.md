# SCHEMA-AUDIT tick — richdeals.in — 2026-09-21

Report only. Nothing was fixed, nothing was pushed, nothing was pinged.

## Method

Thirteen URLs fetched over `urllib.request` with a browser UA, 60 s timeout, 1.0 s between
requests. Every `<script type="application/ld+json">` payload was regex-extracted, `json.loads`'d,
and walked recursively so that `@graph` nodes, **array roots** and nested `offers` /
`itemListElement` members are all counted, not just the top-level object.

**Caveat, stated because it matters:** `urllib.request.urlopen` raises on 4xx/5xx, so a non-200
would have surfaced as `FETCHFAIL <ExceptionName>` rather than a status row, and any "missing block"
on such a URL would be *unverified*, not *missing*. **No FETCHFAIL occurred.** All 13 URLs returned
HTTP 200 and all 52 JSON-LD blocks parsed. Every negative below is therefore a measured negative.

## Results — 13 URLs, all HTTP 200, zero parse errors

| URL | kind | bytes | ld+json blocks | added-value types | verdict |
|---|---|---:|---:|---|---|
| `/` | homepage | 310,322 | 3 | ItemList → 30 × ListItem/Product/Offer/Organization | 30/30 Offers priced |
| `/offers` | hub | 60,492 | 3 | BreadcrumbList(2) | clean |
| `/coupons` | hub | 374,185 | 5 | BreadcrumbList(2), ItemList(41), FAQPage(4) | clean |
| `/freebies` | hub | 374,905 | 5 | BreadcrumbList(2), ItemList(41), FAQPage(4) | clean |
| `/blog` | hub | 149,172 | 3 | **array root**: BreadcrumbList(2) + CollectionPage + ItemList(31) | clean |
| `/afast-clear-glass-tea-cup-set-of-6-100ml-b0gv3h` | deal | 163,448 | 5 | Product+Offer ₹812, BreadcrumbList(3), FAQPage(5) | clean |
| `/waterproof-silicone-sealant-adhesive-leak-repair-b0hb5l` | deal | 160,434 | 5 | Product+Offer ₹449, BreadcrumbList(3), FAQPage(4) | clean |
| `/amazon-solimo-glass-storage-jar-750ml-set-of-4-b0cf1r` | deal | 162,893 | 5 | Product+Offer ₹359, BreadcrumbList(3), FAQPage(5) | clean |
| `/2-in-1-stainless-steel-julienne-vegetable-peeler-b0fpfn` | deal | 159,621 | 5 | Product+Offer ₹199, BreadcrumbList(3), FAQPage(4) | clean |
| `/digiroot-ipad-pencil-fast-charge-palm-rejection-b0cp91` | deal | 160,180 | 5 | Product+Offer ₹1,489, BreadcrumbList(3), FAQPage(4) | clean |
| `/blog/mixer-grinder-500w-vs-750w-vs-1000w-india-2026` | post | 79,771 | 5 | Article+ImageObject, BreadcrumbList(3), FAQPage(5) | clean |
| `/blog/best-dinner-sets-under-5000-india-2026` | post | 81,064 | 5 | Article+ImageObject, BreadcrumbList(3), FAQPage(5) | clean |
| `/blog/bluetooth-speaker-specs-explained-india-2026` | post | 80,390 | 5 | Article+ImageObject, BreadcrumbList(3), FAQPage(5) | clean |

**The emitted shape is richer than CLAUDE.md documents.** Every page carries a sitewide
**Organization** block and a **WebSite + SearchAction + EntryPoint** block as blocks 0 and 1, before
any page-specific markup. CLAUDE.md describes "three JSON-LD blocks" on a deal page; the live
template ships **five**. Blog posts also carry a **FAQPage** that CLAUDE.md never mentions. Neither
is a defect — the doc is behind the code.

## The three error classes in the brief

| class | count | evidence |
|---|---:|---|
| **errors** (malformed / unparseable / broken node) | **0** | 52/52 blocks `json.loads` clean; every BreadcrumbList has contiguous positions and complete name/item; every FAQPage read `malformed = 0` |
| **missing blocks** | **0** | every URL carries everything CLAUDE.md promises for its page type |
| **invalid Offer without price** | **0** | all 30 homepage Offers and all 5 deal-page Offers carry a numeric `price` |

The Offer zero is a *meaningful* zero, not a vacuous one. CLAUDE.md exempts a priceless deal by
omitting the Offer entirely, so an absent Offer could have hidden behind that rule. The five newest
deals were checked against the pushed payload first — ₹812 / ₹449 / ₹359 / ₹199 / ₹1,489, all real
numerics — so the exemption could not have applied to any of them, and every Offer is in fact
present.

### Product / Offer detail

Every deal-page Offer read `@type=Offer`, `priceCurrency=INR`,
`availability=https://schema.org/InStock`, `priceValidUntil=2026-10-04` (+14 d, as specified),
`url` present, `seller=Amazon`, and a price matching the pushed row exactly. Homepage sellers span
Amazon, Flipkart and Shopsy — the ALL-STORES rule is visible in the schema, not only in the DB.

Homepage `Product` nodes read `description: false`; deal-page `Product` nodes read
`description: true`. That is correct — the homepage nodes are ItemList summary entries, and a
summary node is not required to carry a description.

### FAQPage — schema matches visible copy

Google treats schema-only FAQ as a manual-action risk, so the match was verified rather than
assumed. On `/afast-clear-glass-tea-cup-set-of-6-100ml-b0gv3h` the visible heading set is
`About this deal` · `Frequently asked questions` · `Discussion` · `More deals from Amazon`, and
**5/5** FAQPage questions were found verbatim in the rendered HTML:

- What is the price of AFAST Clear Glass Tea and Coffee Cups, Set of 6 (100ml)?
- Is AFAST … a genuine product with a good expiry date?
- Is this 67% discount on AFAST … genuine?
- Is this AFAST … deal still available?
- How do I get this Amazon deal safely?

**No schema-only FAQ. No manual-action exposure.** Note the live template emits **5** Q&As here
where CLAUDE.md documents 4; the extra one is the genuineness/expiry question, and the 4-vs-5 spread
across the five deal pages tracks a conditional Q&A, not a defect.

### Article detail

All three posts carry `headline`, `datePublished`, `dateModified`, `publisher`, `image`,
`mainEntityOfPage`, and `author = {"@type":"Organization","name":"RichDeals Editorial"}`. Dates are
real and distinct per post (`2026-09-20T19:21:17Z`, `…13:41:05Z`, `…11:32:54Z`), not a template
constant.

## Finding — 4 of 30 homepage `Product.name` values leak a price tail

The only real defect this tick, and block-level validation alone would have passed it. Matching
`\bat (Rs|₹)\s*[\d,]` against the 30 homepage `Product.name` strings:

```
Wild Stone Code Chrome No-Gas Perfume Spray Pack of 2 (150 ml each) at Rs 220 (69% Off)
Bellavita Perfume Bathing Soap Bar for Men 3 x 100 g at Rs 149 (40% Off)
KOTTY Women's Solid Grey Pull-On Track Pant at Rs 329 (84% Off)
Lakme 9 to 5 CC Cream Almond SPF 30 (30 g) at Rs 175 (56% Off)
```

**4/30 = 13.3% of homepage Product nodes.** `dealProductName()` in `apps/web/src/lib/site.ts`
strips the `" at ₹X – Store"` tail, which is ₹-and-en-dash shaped. These four titles use the ASCII
variant `at Rs NNN (NN% Off)` with no ₹ glyph, no en-dash and no store suffix, so the stripper never
matches and the raw marketing tail rides into `Product.name`.

Why it matters: `Product.name` is what a rich result and an AI answer engine quote. A name ending
`at Rs 220 (69% Off)` bakes a stale price into the product identity, and the price is already
carried correctly and separately in `Offer.price` — so the tail is both redundant and a freshness
liability.

**Fix, not applied this tick (brief says report only):** widen the `dealProductName()` strip to also
match `\s+at\s+(?:Rs\.?|₹)\s*[\d,]+(?:\s*\(\d+%\s*Off\))?\s*$`, case-insensitive. This is the
already-tracked "`at Rs ` class" rot, now **measured in emitted schema** rather than inferred from
titles.

## Observation, not an error — `/offers` carries no FAQPage and no ItemList

`/offers` emits Organization + WebSite + BreadcrumbList(2) and nothing more. `/coupons` and
`/freebies` each add an ItemList(41) and a FAQPage(4), shipped by commit `c9a0ddf`. Nothing ever
promised those blocks on `/offers`, so calling this "missing" would be measuring against a spec
nobody wrote — it is logged as an **opportunity**: `/offers` is the largest deal hub and the only
one of the three with no ItemList and no FAQ schema.

## CEO audit — every number re-measured from the DB this tick

| metric | value |
|---|---:|
| LIVE deals | **10,457** |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** (absent from `groupBy` = zero) |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | **1,626** |
| DB max deal id | **10,804** (`afast-clear-glass-tea-cup-set-of-6-100ml-b0gv3h`) |
| posts | 319 |
| coverless posts | **0** |
| posts with no seoTitle / no seoDesc | **0** / **0** |
| broadcast cursor `lastId` | **10,804 = DB max, caught up** |
| unpushed commits (before this report) | **0** |

**Posts per day, IST:** 09-15 `3` · 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` ·
09-21 **`1`**. Never 0, never over 4. Node `Date.now()` is `2026-09-20T23:21:47.380Z` = **04:51 IST
on 09-21**, so the IST day is under five hours old at 1 post — ahead of pace. 09-20 closing at 2
stays the only soft miss.

**Clock is not skewed** — node `23:21:47.380Z` vs PG `now()` `23:21:47.424Z`, **44 ms** apart.
Measured before any timestamp finding could be blamed on an offset.

**`/api/posts` list rows read `cover: null` while the DB reads `COVERLESS 0`.** That is an API
projection gap, not coverless blog rot, and it is deliberately **not** flagged as rot — verified
against the DB before flagging, per the standing rule.

## Rot — nothing new beyond the finding above

- **The flat-₹ coupon gap is UNTESTED this tick.** SCHEMA-AUDIT publishes nothing, so
  `/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` was not exercised at all. It still cannot
  see `[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. Not fixed,
  not re-confirmed — calling it either would be fabricated.
- **1,626 LIVE rows carry no MRP** — owner decision #6.
- Two implausible MRPs shipped in the last batch (₹5,999 on a ₹1,495 stylus, ₹999 on a ₹199 peeler),
  read off `.basisPrice` and published as served. The implausible-MRP guard is still unwritten.
- **#48** `rogerkart.com/r/<code>` client-side Next.js redirect. **#47** Telegram sources derivative
  *and* dormant. **#46** CoolzTricks nameless coupon claims. **#45** `data/tg-multi-seen.json`
  drifts both ways. **#44** IFS Flipkart `?rto=` → 403, not re-triggered. **#43** CLAUDE.md's
  "homepage HTML fallback" against a homepage with no deal grid, and "RSS first" against a
  feedburner feed returning HTTP 000.
- **NEW doc rot:** CLAUDE.md's deal-page schema section says "three JSON-LD blocks" and "4 Q&As".
  Measured: five blocks, and 4-or-5 Q&As. Blog posts carry an undocumented FAQPage. Documentation
  drift, not code rot.
- `/newsuperdeals` still returns 28 bytes. LIVE deal 10031 still carries `productId` `ae27f94b3330`.
  ~200 scratch files in `apps/api/scripts/` — owner decision #5.

Scratch hygiene clean — `apps/api/_sa0921.cjs` created and removed in the same Bash call (**46th
clear**). The validator lives in the session scratchpad, outside the repo.

## Freshness

**No push, so no IndexNow ping.** Nothing entered the DB, `/admin/deals/bulk` was not called, the
broadcast cursor was not touched, `data/tg-multi-seen.json` was not written. Report-only tick — the
rule working, not a skipped step.
