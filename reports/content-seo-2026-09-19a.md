# CONTENT-SEO blog tick — 2026-09-19a (IST)

**1 published (`kitchen-chimney-vs-exhaust-fan-india-2026`), IndexNow HTTP 200, cover OK.**

Today's IST count goes 2 → **3**, which lands on the top of the 2-3 target and under the cap of
4. The SITEMON ticks at 09-19d and 09-19e both flagged "2 today, bottom of the band, the BLOG
tick owns closing it" — closed.

## Gate

Re-read from the DB rather than trusted from the last tick's number:

```
TODAY_IST 2   TOTAL 315
```

2 < 3, so the skip arm did not fire and one post was owed. Post-publish the same query reads
**3 / 316**.

## Keyword research

**GSC, 28 d (2026-08-21 → 2026-09-17), query dimension:** 2 clicks, 75 impressions across the
top 50 rows — identical to the last pull, so rot #9 is re-confirmed live rather than carried
forward on faith. Nothing in that dimension was both untapped and winnable: `freebies` has 11
impressions but sits at **position 86**, and the flipkart-offer family is pos 44-68.

**GSC, page dimension:** 7 clicks / 167 impressions.

```
/                                                    2 clicks   49 impr   pos 21.3
/blog/how-to-get-free-samples-freebies-india         1 click    18 impr   pos 11.9
/blog/best-exhaust-fans-kitchen-bathroom-india-2026  0 clicks   20 impr   pos  7.3
```

That third row is the finding. It is the **highest-impression blog page on the site**, the
closest thing we have to page 1, and it earns nothing. The `gsc-winner-page` memory says
concentrate a cluster instead of scattering; free-samples cannot absorb another post (rot #8),
but kitchen-ventilation has exactly one page at pos 7.3 and no support around it.

**Near-dup scan over all 316 slugs** (19 substrings) before committing to a topic:

```
fake     4   how-to-spot-fake-discounts-fake-mrp | ...-online-shopping-india-2026 |
             ...-amazon-flipkart-india-2026 | how-to-spot-fake-online-deals-india
bank     7      card     6      price    5      track    2      return   2
emi      1      gst      1      exchange 1      warranty 1      cibil    1
```

The money-saving meta cluster is saturated — four near-dup slugs on fake discounts alone. That
ruled out no-cost EMI, price history, fake discounts and GST invoice, and it is fresh live
evidence for owner decision #4 and the `dup-slug-thin-content` memory.

Kitchen cluster: `best-kitchen-chimney-under-15000-india-2026` and
`best-exhaust-fans-kitchen-bathroom-india-2026` both exist, but **nothing compares the two**.
Different primary keyword, and it is a hub connector between two existing posts rather than a
third parallel listicle.

**SERP read** (`kitchen chimney vs exhaust fan which is better India`): page one is Faber, Glen
(twice, one a web story), Kaff, InstaCuppa, BeyondAppliances, Bajaj Finserv. **Every ranking
page is published by a business that sells chimneys**, so the "chimney wins" conclusion is
structurally biased. Shared substance across all of them: position, m³/hr, price gap, fry-heavy
cooking.

**The gap is the angle.** None of them prices the decision honestly — installed cost, ducting,
upkeep, duct vs ductless for renters, the point where the extra ~₹8,000 stops paying for
itself, and the "run both" answer a chimney vendor has no reason to give. We hold live rows in
both categories, so the money side is grounded in real listings instead of brochure copy.

Slug checked unclaimed before writing: `/blog/kitchen-chimney-vs-exhaust-fan-india-2026` → 404.

## Published

| Field | Value |
|---|---|
| Post id | **375** |
| Slug | `kitchen-chimney-vs-exhaust-fan-india-2026` (41 chars) |
| Title | Kitchen Chimney vs Exhaust Fan: Which One Should You Buy in India? |
| seoTitle | 53 chars (cap 60) |
| seoDesc | 156 chars (band 150-160) |
| Excerpt | 147 chars |
| Body | **1,512 words** (band 900-1600), 8,728 chars |
| Tags | kitchen, appliances, buying-guide, chimney, exhaust-fan |
| IndexNow | **HTTP 200** — clean, no 422, no Bing fallback needed |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/kitchen-chimney-vs-exhaust-fan-india-2026.png` — **200** |

**Cover + alt verified on the served page, not assumed from the DB:**

```
alt="Kitchen Chimney vs Exhaust Fan: Which One Should You Buy in India?"
```

The template supplies `alt={post.title}`, so the title had to describe the cover subject — it
does. The one `alt=""` in the HTML is `/logo-mark.svg`, a decorative logo mark where an empty
alt is correct, not a miss.

**All 8 internal links render as real hrefs on prod**, each verified 200 before writing:

```
/faber-60cm-t-shape-kitchen-chimney
/crompton-quietpro-plus-bldc-60cm-chimney
/atomberg-studio-150mm-bldc-exhaust-fan-low-noise-gloss-black-b0d35tdxm7
/havells-ventil-air-dx-200mm-exhaust-fan-white-b0bl19
/singer-venti-q-150mm-energy-efficient-exhaust-fan-for-kitchen-bathroom-b0g5nm
/offers
/blog/best-exhaust-fans-kitchen-bathroom-india-2026
/blog/best-kitchen-chimney-under-15000-india-2026
```

Six above the required minimum of one, and two of them point at the cluster page this post
exists to support.

New URL live on prod: `https://richdeals.in/blog/kitchen-chimney-vs-exhaust-fan-india-2026`
→ **200 in 0.55 s**. No deploy — the insert is DB-only and the web app reads the managed DB
through the prod API.

## Two deliberate accuracy choices

**Prices are bands, not figures.** Exhaust fans ~₹650-₹1,700, chimneys ~₹7,500-₹17,000 — both
truthful to the 23 live rows the research pulled, both survive price drift. Baking exact rupee
figures into evergreen copy is how rot #22 rows are manufactured (the `milk-peda-sweets-150-gm-137`
page is the cautionary case). The live deal links carry the current number.

**No invented specs.** Chimney suction of 1,200-1,600 m³/hr is supported by our own listing
titles (`1350 m3/hr`, `1400 m3/hr`, `1500 m/hr`, `1600 m/hr`) and corroborated by the SERP. Our
exhaust-fan rows carry only sizes and one wattage, so that side of the copy stays on 150/200 mm
and stops there. No m³/hr figure was invented for exhaust fans.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10304** · PENDING_REVIEW **0** · EXPIRED **259** |
| LIVE null price / null image | **0 / 0** |
| DB max deal | **10651** LIVE ₹199 `vanelis-vanilla-musk-…` |
| Posts/day IST (7 d) | 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · **09-19:3** |
| Blog hygiene | published **316** · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs 10651 — **drift 169**, unchanged (rot #4) |
| Unpushed commits | 0 before this tick |

Deal counts are byte-identical to 09-19e — no ingest ran in the window, so counters holding
still is the right answer, not a stale query. PENDING_REVIEW is 0 **by absence** from
`deal.groupBy({by:['status']})`, not by a zero row.

Blog hygiene held through the insert: 316 published, still zero coverless and zero seo-less.
The null-price/null-image arm is a no-op for the eighth consecutive tick.

**New observation — not yet rot, logged so it is not rediscovered:**

```
deal 10214  bajaj-maxio-150mm-23w-exhaust-fan   price 1061  mrp 1580  discountPct null  LIVE
```

Both price and MRP are present, so the percentage is derivable (-33%), yet `discountPct` is
null. That row therefore fails the ≥20%-discount arm of `dealIndexable` and has to clear the
≥200-char description arm instead to reach the sitemap. It is outside the current audit set,
which only covers null price and null image — a row can be incomplete with both of those
populated. One row is not a pattern; **if a second turns up, this becomes rot #29 and the audit
set needs a `discountPct IS NULL AND price IS NOT NULL AND mrp IS NOT NULL` arm.**

## Rot standing — 28 items

Nothing moved and nothing new rotted. #4 stays frozen at drift **169** (no deals pushed this
tick). #8 (free-samples cluster saturation) picked up the strongest evidence yet — this tick's
316-slug scan shows four near-dup fake-discount slugs. #9 re-confirmed live by the GSC query
pull returning the identical 2 clicks / 75 impressions. #12 stays half-fixed. #22 holds at six.

## Open owner decisions — 10

**#4** (cluster consolidation) climbed on this tick's slug scan: four near-dup slugs on one
keyword is a merge candidate, not a content gap.

**#7** (persist a reject cache) stays top on frequency.

**#3** is unchanged at 169 and only closes when the external tg-broadcast cron runs. The cursor
stays untouched — an unattended drain would dump the whole backlog at once.
