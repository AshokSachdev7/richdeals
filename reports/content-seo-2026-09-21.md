# CONTENT-SEO blog tick — richdeals.in — 2026-09-21

## Gate

Today's post count in IST **2026-09-21 = 0** at tick start. Cap is 4/day, target 2-3, skip at ≥3.
0 < 3 → publish.

**Report file naming.** UTC was still 2026-09-20 when this tick ran, but IST had already rolled
to 2026-09-21. The gate counts posts in IST, and the post this tick publishes is counted against
IST 09-21, so the report takes the IST day: `content-seo-2026-09-21.md`. The previous tick on the
old IST day closed as `content-seo-2026-09-20b.md`.

## Published — post 378

| field | value |
|-------|-------|
| slug | `mixer-grinder-500w-vs-750w-vs-1000w-india-2026` (46 chars) |
| title | Mixer Grinder 500W vs 750W vs 1000W: Which Wattage Does an Indian Kitchen Actually Need? |
| words | 1,365 (target 900-1600) |
| seoTitle | `Mixer Grinder 500W vs 750W vs 1000W: India Guide` — 48 chars (≤60) |
| seoDesc | 151 chars (150-160) |
| excerpt | 148 chars |
| tags | mixer grinder, kitchen appliances, buying guide, home appliances |
| cover | `og/mixer-grinder-500w-vs-750w-vs-1000w-india-2026.png` on DO Spaces |
| alt | `alt={post.title}` from the blog template — describes the cover subject |
| IndexNow | **HTTP 200** via `insert-blog-mdmeta.mjs` (not bypassed) |

`insert-blog-mdmeta.mjs` → `upserted: … (id 378, 8294 chars, 4 tags)` → `IndexNow -> HTTP 200`.
No 422, so the hand-rolled Bing GET fallback was not needed. `gen-blog-covers.mjs` → 1 cover
generated and uploaded. Post-run verification: **coverless 0, seo-less 0, 319 posts total**.

Not deployed. Publishing writes to the prod DB and the live site picks it up — a deploy is not
part of a blog tick.

## Keyword research

Two GSC pulls (28 days, 2026-08-22 → 2026-09-18), both dimensions, because they disagree:

| dimension | rows | clicks | impressions |
|-----------|-----:|-------:|------------:|
| query | 123 | 2 | 170 |
| page | 122 | 7 | 426 |

The page dimension reports 3.5x the clicks and 2.5x the impressions of the query dimension for
the identical window. Pull both before concluding anything about traffic.

**Why the mixer-wattage keyword won:**

1. **We already rank position 1.0 for `mixer grinder under 1500`.** Google trusts this domain on
   the mixer topic. An adjacent informational page in the same cluster has real odds, unlike a
   cold start.
2. **Not a `best-X-under-Y` slug**, so it dodges the saturation warning in
   `.claude/dup-slug-thin-content.md`. Checked against the 40 newest slugs and against every
   existing mixer/grinder/blender/juicer post — three exist
   (`best-mixer-grinders-india-buying-guide`, `best-mixer-grinder-under-3000-india-2026`,
   `best-hand-blender-india-2026`), all price-tier roundups or a different product. This is
   comparison/informational intent, no near-dup.
3. **Slug confirmed free** — `https://richdeals.in/blog/mixer-grinder-500w-vs-750w-vs-1000w-india-2026`
   returned 404 before publishing.
4. **Backed by real inventory** — 30 LIVE rows matched, of which ~25 are genuine kitchen mixers
   spanning 500W / 600W / 750W / 800W / 900W / 1000W. Comparison table and internal links are
   built from real DB rows, not invented models.

**SERP read** (`mixer grinder 500W vs 750W vs 1000W which wattage India`): nine results, all
manufacturer blogs (Wonderchef, Preethi ×2, Wipro, Glen, Orpat) or thin affiliate/review pages.
Every brand blog is biased toward its own range and **none pairs the wattage guide with live
Indian prices**. That gap is the differentiator — plus the copper-vs-aluminium motor winding
point, which is the spec that actually predicts longevity and which the ranking pages bury.

### Deliberate departure from the "free-samples cluster focus" steer

The tick prompt asks for free-samples cluster focus. Not taken this tick, for reasons the data
supports:

- The head page `/blog/how-to-get-free-samples-freebies-india` is still the **site's #2 page by
  impressions** (1 click, 18 impr, pos 11.9, 5.6% CTR). It does not need another satellite.
- Its satellites are dead: `festival-sale-calendar-india-2026` pos 90.5,
  `student-discounts-online-shopping-india` pos 79.5,
  `how-amazon-lightning-deals-work-india` pos 76.8, `myntra-end-of-reason-sale-guide` pos 71.0,
  `best-home-decor-deals-budget-india` pos 70.5. The query `freebies` sits at pos 86.0.
- `dup-slug-thin-content.md` already calls this cluster saturated. Adding a 12th satellite at
  pos 80+ adds thin content, not clicks. **Consolidation is the fix** (open owner decision #4).
- The store-coupon cluster is equally off-limits — it was just consolidated in `1158088` /
  `050e70a`.

So the tick went to the strongest *untapped* topical authority we hold instead.

## Internal links — 10, all curl-verified HTTP 200 before publishing

Three 500W rows, four 750W rows, two 1000W rows, plus `/offers`, plus the two existing mixer
posts. Real DB slugs, real verified prices in the comparison table's price-band row
(₹1,393-₹2,534 / ₹1,998-₹3,199 / ₹3,972-₹4,523), with an explicit caveat that prices move.

**Filter false positive caught before use:** the DB query `title contains 'Mixer' OR 'Grinder'`
returned five non-kitchen rows — a HyperX audio mixer (10283), a DJ mixer table (10007), a
StudioMaster compact mixer (8852), a Hitmin disc grinder (9293) and an InditRust angle grinder
(8547). None linked from a kitchen-appliance post. A title substring is not a category filter.

## GEO playbook compliance

Answer-first opening (the 750W recommendation lands in the first sentence); primary keyword in
the H1, the first 100 words, one H2 and the slug; labelled skimmable H2s; a comparison table; a
thirty-second decision block; 5 Q&A FAQ. **No fabricated stats, reviews, awards or superlatives**
— every price is a verified DB row, and the engineering claims are mechanism-level, not invented
test numbers.

## CEO audit

**Blog cadence.** Posts per day, bucketed IST:

| 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 |
|------:|------:|------:|------:|------:|------:|------:|------:|------:|
| 4 | 4 | 3 | 3 | 3 | 3 | 3 | 2 | **1** |

Never 0, never over 4. **09-20 closed at 2** — the first completed day this week below the 2-3
target's midpoint. Inside the hard rule, flagged as a soft miss. 09-21 is at 1 with the day young;
the next two BLOG ticks should carry it to 3.

**REVISED rot item — the free-samples read from the previous tick was wrong and is corrected
here.** The previous window flagged "the free-samples cluster has vanished from GSC" as hard rot.
The page-dimension pull disproves that: the head page is still the #2 page at pos 11.9 with 18
impressions. What actually happened is a **click collapse from 87 to 1 with the ranking largely
intact**. Do not re-claim the "vanished" framing. Two memories still carry the stale numbers and
need correcting, not deleting:

- `gsc-winner-page.md` says "87/98 clicks at pos 6.9" — now 1 click, 18 impr, pos 11.9.
- `gsc-keyword-strategy.md` says "free-samples cluster = 90% of clicks" — no longer true at 7
  total clicks site-wide.

**New GSC facts worth carrying:** `best-exhaust-fans-kitchen-bathroom-india-2026` is now the top
blog impression line (20 impr, pos 7.3); `dinner set` is the top query line (19 impr, pos 10.4);
`/category/shopping-category/beauty-grooming` pulls 5 impressions at pos 59.0.

**Carried rot, unchanged this tick:**

- **1,602 LIVE deals (15%) carry no MRP** — owner decision #6.
- **#46** — CoolzTricks Official posts coupon claims with no product name and no real buybox
  discount. Owner-decision-#8 prune candidate.
- **#45** — `data/tg-multi-seen.json` holds productIds with no DB row; the seen cache is not a
  dedup on its own.
- **Shopsy PDPs carry no `ld+json` Product** — CLAUDE.md's ALL-STORES rule assumes every
  non-Amazon merchant serves it. False for Shopsy.
- **#44** — indiafreestuff Flipkart `?rto=` resolves to a 403 tracking landing; only the `pid`
  is usable.
- **#43** — CLAUDE.md documents a "homepage HTML fallback" for a homepage with no deal grid;
  discovery is `/pages/getdeals`.
- **RSS feedburner returns HTTP 000** while CLAUDE.md says "RSS first". Our own `/feed.xml` is
  fine at 200 — the dead feed is the source's.
- LIVE deal 10031 carries `productId` `ae27f94b3330`, a hex hash. Observation, store unchecked.
- ~200 scratch files left in `apps/api/scripts/` — owner decision #5.

**New observation this tick:** a `title contains` filter is not a category filter — see the five
audio/power-tool false positives above. Any future category-driven content pull needs the
category relation, not a title substring.

Scratch hygiene clean — `apps/api/_blog0921c.cjs` created and removed in the same call (29th).

**Freshness:** no deals pushed this tick, so no `indexnow-ping.mjs` call is due. The blog ping
went out inside `insert-blog-mdmeta.mjs` at HTTP 200. No push → no ping is correct, not a miss.
