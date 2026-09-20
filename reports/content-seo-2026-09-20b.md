# CONTENT-SEO tick — 2026-09-20b (IST)

**1 post published.** Id **377**, `best-dinner-sets-under-5000-india-2026`, 1,302 words, cover set,
IndexNow **HTTP 200** (no 422, no Bing fallback needed).

Gate: 09-20 stood at **1 post** (376) → publish 1. Now **2**. Two slots remain under the 4/day cap.

## Published

| | |
|---|---|
| **377** | `best-dinner-sets-under-5000-india-2026` |
| Title | Best Dinner Sets Under ₹5,000 in India (2026) |
| Words | **1,302** (band 900-1600) |
| seoTitle | 52 chars (≤60) |
| seoDesc | 158 chars (150-160) |
| excerpt | 147 chars |
| slug | 38 chars (≤70) |
| Tags | dinner-sets, kitchen, buying-guide, home (4 upserted) |
| Internal links | **15** — 11 live deal pages, `/offers`, 3 blog cross-links |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/best-dinner-sets-under-5000-india-2026.png` |
| Alt | `alt={post.title}` — the title names the subject (dinner sets), so the alt is honest |
| IndexNow | **HTTP 200** |
| Coverless posts after | **0 of 318** |

Every length above was **measured, not estimated** — the first draft's seoDesc came in at 149 and was
extended to 158 before insert. Shipping on an estimate is how a post lands out of spec.

## Keyword decision — why ₹5,000 and not another free-samples post

The tick asks for "free-samples cluster focus". **Measuring the cluster is what that instruction
bought this tick, and the measurement says do not add post #41.**

GSC by query at full depth (28 days, 2026-08-22 → 2026-09-18): the cluster **is** indexed and **is**
collecting impressions — `freebies` 11 impressions at **position 86.0**, `how to get free` 2 at 52,
`freebies india` 1 at 95, `list of freebies` 1 at 97. Roughly 40 slugs already cover it. One page
ranks usefully (`/blog/how-to-get-free-samples-freebies-india`, 1 click / 18 impr / pos 11.9); the
rest sit at **52-97**. Another slug adds a 41st page at position 90. The lever is consolidation
(owner decision #4), not expansion.

### Retraction

An earlier tick concluded "the free-samples cluster is absent from the GSC rows entirely." **That was
false** — an artifact of `rowLimit: 50` truncating alphabetically at `football under 300`, one row
before `free…` begins. The claim is withdrawn and must not be repeated.

### What the data pointed at instead

The dinner-set cluster is the only page-1-border demand the site has:

| Query | Clicks | Impr | Pos |
|---|---|---|---|
| `dinner set` | 0 | **19** | **10.4** |
| `dinner set under 5000` | 0 | 1 | 12.0 |
| `dinner set 27 pieces` | 0 | 1 | 8.0 |
| `dinner set crockery` | 0 | 1 | 10.0 |
| `borosil dinner set 63 pieces price` | 0 | 1 | 10.0 |

`dinner set` alone is 26% of the query-dimension impressions and the only head term inside position
11. Against that, 20+ live dinnerware deals in the DB.

### Near-dup screen — three axes tested, two already owned

Read the **bodies**, not just the slugs, of every existing dinner-set post:

| Post | Slug | Words | Axis owned |
|---|---|---|---|
| 144 | `best-opalware-dinner-sets-under-1000-india-2026` | 1,134 | price tier **₹1,000**, opalware only |
| 202 | `larah-borosil-dinner-set-sizes-compared-india-2026` | 1,118 | **piece count** |
| 374 | `which-dinner-set-material-is-best-india-2026` | 1,381 | **material** (+ a piece-count section) |

The carried plan was a piece-count/price-tier post. Piece count turned out to be owned **twice**, so
the thesis was dropped and the price-tier axis taken instead. Piece count survives only as a table
column and a supporting section. All **64 `under-N` slugs** were screened: the four `under-5000`
slugs are smartwatches, soundbars, dash cams and air fryers. **No dinnerware `under-5000` slug
exists.**

### SERP — both leaders cap the price and print no prices

`servewell.co.in/blogs/news/best-dinnerware-sets-online-under-5000`: ~1,100 words, **one H2**, five
melamine sets, **zero specific pricing for any product listed**.
`fns.co.in/blogs/news/top-5-steel-dinner-sets-under-5000`: ~2,500-2,800 words, four H2s, piece-count
guidance buried in FAQ #2, **no individual product prices in the content**.

**The gap is the whole post:** both headline a price cap and never print a rupee figure. Ours prints
eleven live prices plus a price-per-piece column neither computes, and leads with the counter-thesis
that the category tops out around ₹2,128 — you do not need ₹5,000. Neither blogger.md reject
condition fires.

## Pre-publish link verification

All 11 deal link targets were **re-read from the DB immediately before writing**, not taken from
carried notes: all LIVE, all prices unchanged.

One near-miss: the carried inventory held deal 8401's slug **truncated with a trailing ellipsis**.
Published as carried, it would have been a dead internal link — the exact failure mode memory
`dead-internal-links.md` records. The row was re-read and the full slug (including its double hyphen
before `6-spoons`) recovered. **A truncated slug must never be carried forward as a link target.**

## Fixed inline this tick

**`apps/api/scripts/gsc-pull.mjs` — `rowLimit: 50` → `ROWS`, argv[4], default 1000.**

The old cap silently returned 50 of 111 query rows, and because zero-click rows sort **alphabetically**
the cut landed mid-alphabet. Every conclusion about queries after "fo" was an artifact. It already
produced one false finding (above). Verified after the change: the pull now runs to `zebronics
speaker`. Same class of deliberate source fix as the `ingest-common.mjs` ±₹1 repair in `f5b4ce0`.

## CEO audit

| Arm | Result |
|---|---|
| Posts-per-day IST | 09-20 = **2** (376, 377), 09-19 = 3, 09-18 = 3, 09-17 = 3, 09-16 = 3 |
| Cap 4/day | never exceeded |
| Coverless posts | **0 of 318** |
| Posts missing seoTitle / seoDesc | **0 / 0** |
| Cover + alt on 377 | verified by DB read-back, not by the script's own output |
| IndexNow | HTTP 200 — the 422/Bing fallback was not needed this tick |
| Scratch hygiene (#11) | clear — `_m.mjs` and `_cv0920.mjs` deleted in the same Bash call that created them |
| Deploy | **not done, correctly** — blogger.md hard rule, and a DB-only change serves immediately |

### Rot flagged

- **Rot #4 (tg-broadcast cursor) should be CLOSED.** Two independent readings show it self-healing
  (10,719 → 10,729 unprompted). It now measures only the gap between a publish and the next
  broadcast run — the system working as designed.
- **C: volume at 100%** — 225G of 226G used, **710M free**. It already broke one Bash call with
  `sed: couldn't flush stdout: No space left on device` (Git Bash buffers pipe stdout through C:).
  Temp dirs are exonerated (`Temp/claude` 306M, all of `Temp` 632M) — this is real disk pressure, not
  cleanable cruft. It threatens `gen-blog-covers.mjs`, which writes sharp temp files; the cover
  generated fine this tick, but that is luck, not headroom. **Not recurred in five windows. Nothing
  deleted — the disk is the owner's.**
- **`gsc-pull.mjs` truncation** — fixed above, recorded because it invalidated a prior finding.
- **Rot #19 third instance** — `PWBGGD4THDQZYAY6` in `data/tg-multi-seen.json` with no DB row.
  Owner decision #7.
- **Two dinnerware data defects**, found while building the link inventory:
  - deal **3455** (`hazel-stainless-steel-dinner-plate-set-b0bxcrkrzr`) LIVE at ₹519 with **null mrp
    AND null discountPct** — passes the standing audit arm only because that arm requires both price
    and mrp present.
  - deal **1536** (`grab-la-opala-diva-full-plate-set-6-pcs-at-299-B00PIU`) — slug claims ₹299, the
    row says **₹499**. The slug is baked in; the price is the truth.
  Neither was fixed inline: 3455 needs a live MRP read, 1536 needs a slug decision, and both are
  deal-side work outside a CONTENT-SEO tick.
- Rot #12 doc half still open (CLAUDE.md documents chunked `/sitemap/deals.xml` routes that 404).
- Deal 7637 still an EXPIRED candidate.

### Traffic, honestly

**7 clicks / 182 impressions in 28 days** (by page — the correct dimension for a site total). By
query at full depth: 2 clicks / 154 impressions across 111 rows. Memory `gsc-winner-page.md`'s
"87/98 clicks at pos 6.9" describes a **July burst that has ended**; the same page now reads 1 click
/ 18 impressions at position 11.9. That memory needs correcting.
