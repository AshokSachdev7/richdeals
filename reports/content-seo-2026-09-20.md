# CONTENT-SEO blog tick — 2026-09-20 (IST)

**Today was 0 posts. Now 1.** Post **376**,
`bluetooth-speaker-specs-explained-india-2026`, cover uploaded and serving **HTTP 200**,
IndexNow **HTTP 200** at publish.

Two findings this tick are bigger than the post: the free-samples "collapse" turned out to be a
**dated cliff, not a decay**, and the site is **recovering right now** on fresh content. A third
finding — 79 LIVE deal titles carrying `at Rs ` instead of `at ₹` — was repaired inline.

## Precondition

```
posts today (IST, publishedAt) = 0   → must publish
perDay 09-13:4 09-14:4 09-15:3 09-16:3 09-17:3 09-18:3 09-19:3 09-20:0
```

Checked before writing, not after. The inserter's own guard (4/day counted on `createdAt`) would
have permitted up to four; the tick target is 2-3 and this is the first of the day.

## Keyword research

Five GSC pulls: 28-day by query, 28-day by page, 120-day by page, **120-day by date**, **14-day by
date**. The two `date` pulls are what changed the picture — `gsc-pull.mjs` passes its third
argument straight through as a dimension, so `date` works and nobody had used it.

### The free-samples page fell off a cliff on 2026-07-31

```
clicks  impr   pos   ctr%   date
     3    113   12.2    2.7   2026-07-24
     3    544   11.5    0.6   2026-07-25
    27   2908    8.2    0.9   2026-07-26
    21   4025    8.1    0.5   2026-07-27
    19   3291    7.8    0.6   2026-07-28
     7   2164    8.3    0.3   2026-07-29
    15   2985    8.1    0.5   2026-07-30
     0      6   23.5    0.0   2026-07-31   ← cliff
     0     13   56.5    0.0   2026-08-01
…6-22 impressions/day through 2026-09-08…
```

**~15,373 impressions arrived in five days (07-26 → 07-30) and stopped overnight.** Not a decay
curve — a step function. The site never had sustained traffic from that page; it had one discovery
burst that Google withdrew.

**This corrects the memory `gsc-winner-page.md`**, which records "1 free-samples blog = 87/98
clicks at pos 6.9" as the current state. That is a July measurement of a window that closed seven
weeks ago. It should be rewritten as history, not strategy.

### And there is a live recovery the 28-day aggregate hid

```
GSC sc-domain:richdeals.in  2026-09-05→2026-09-18  by date
clicks  impr   pos   ctr%   date
     0      3   57.7    0.0   2026-09-10
     0      5    6.0    0.0   2026-09-11
     0      8    2.5    0.0   2026-09-12
     1      4    2.8   25.0   2026-09-13
     0     24    2.2    0.0   2026-09-14
     2     29    6.4    6.9   2026-09-15
     1     42   13.4    2.4   2026-09-16
     0     48    5.8    0.0   2026-09-17
```

**09-14 → 09-17 is 24 / 29 / 42 / 48 impressions at positions 2.2 / 6.4 / 13.4 / 5.8** — the best
four-day run since July, and at far better positions than the July burst ever held (7.8-8.3).
Impressions have roughly doubled in four days.

This is **not** the free-samples page recovering. It tracks the deal + blog publishing cadence.
Reporting only the cliff would have been a half-truth; both halves are the finding.

## The topic pick deviates from the tick text — deliberately

The tick says *"free-samples cluster focus"*. **This post is not in that cluster, and that is a
judgement call, stated plainly rather than made silently.**

Reasons, in order:

1. The cluster already holds **~20 slugs**, and `dup-slug-thin-content.md` records it as saturated
   with near-dups. A 21st is padding.
2. Its head page fell off a cliff on 07-31 and has not recovered in seven weeks. Adding spokes to
   a hub Google stopped serving is spending the day's one post on the weakest surface on the site.
3. The tick's own overriding constraint is **"no near-dup slugs"**. Those two clauses conflict for
   this cluster; the anti-dup one wins.

The cluster still needs work — but **consolidation, not more posts** (open owner decision #4, and
the July data makes it urgent rather than cosmetic).

### The first pick was killed by evidence

The planned topic was a dinner-set piece-count guide. Querying the slug landscape first:

```
best-opalware-dinner-sets-under-1000-india-2026
which-dinner-set-material-is-best-india-2026
larah-borosil-dinner-set-sizes-compared-india-2026   ← the exact angle chosen
```

Three posts already there and the piece-count angle already taken. Abandoned before a word was
written. **Checking before writing is what stopped this tick shipping the near-dup it forbids.**

### The replacement is evidence-backed too

```
audio cluster (existing):
  best-soundbars-under-5000-india-2026            (best-X-under-Y)
  best-bluetooth-speakers-under-1500-india-2026   (best-X-under-Y)
```

Two listicles, **no informational explainer**. Meanwhile `zebronics speaker bluetooth` sits at
**position 1.0** in GSC, and there are **10 LIVE speaker deals** available as internal-link
targets. A spec explainer is the missing intent in a cluster that already ranks.

## The post

| Field | Value |
|---|---|
| id / slug | **376** · `bluetooth-speaker-specs-explained-india-2026` |
| Body | **8,777 chars ≈ 1,450 words** (band 900-1600) |
| seoTitle | `Bluetooth Speaker Specs Explained: Watts, IPX, Codecs` — **53 chars** (≤60) |
| seoDesc | **155 chars** (band 150-160) |
| Internal links | **3** — two live deal pages + `/offers` |
| Cover | `…/og/bluetooth-speaker-specs-explained-india-2026.png` — **HTTP 200, 95,590 b** |
| Alt text | `alt={post.title}`, rendered by `blog/[slug]/page.tsx` |
| Tags | bluetooth speaker · buying guide · audio · electronics |
| IndexNow | **HTTP 200** at publish (no 422, Bing fallback not needed) |
| Published (IST) | 2026-09-20 |

Internal links go to `/jbl-go-4-ultra-portable-bluetooth-speaker-black`,
`/hp-s305-wireless-bluetooth-speaker-pj32` and `/offers`. **No price is quoted in the body for
either deal** — prices drift and a stale number in evergreen prose becomes a wrong fact later. The
anchors carry the product name only.

GEO structure: answer-first section ("The short answer") before any detail, one comparison table,
scannable heading-per-question layout, and a 5-question FAQ block. No fabricated benchmarks — the
post explains what specs *mean* (RMS vs PMPO, IPX4 vs IPX7, SBC/AAC/LDAC) rather than claiming
measurements nobody ran.

The `meta.json` deliberately carries **no `cover` key**. `insert-blog-mdmeta.mjs` writes `cover` on
update only when the meta file has one, and `gen-blog-covers.mjs` writes the cover to the DB, not
to the meta file — so shipping a `cover` key would let a future re-run null it.

## Fixed inline (CEO mode) — 79 LIVE deal titles

Spotted while querying the dinner-set cluster: live titles reading **`at Rs 403`** instead of
**`at ₹403`**.

This defect is on record as a **one-off** from a heredoc-glyph leak. It is not.

```
LIVE titles with " at Rs ": 79
  352    2026-07-19  Everyuth Naturals Aloe Vera & Cucumber Gel 150g (Pack of 3) at Rs 187
  2188   2026-07-22  Apple iPhone 16e 128GB at Rs 56490 - Amazon
  10062  2026-09-14  Treo by Milton Opalware 6-Piece Dinner Set at Rs 403 (56% Off) - Amazon
  range ids 352 -> 10622
```

**Ids 352 to 10622, spanning July 19 to September 14, including an entire 09-14 batch.** Two
months of intermittent recurrence.

Repaired with a targeted `title.replace(/ at Rs /g, ' at ₹')`:

```
rows to fix (all statuses): 79
updated: 79
remaining " at Rs ": 0
LIVE proper glyph: 6360 -> 6439   (+79, exact)
```

DB-only change — prod reads the managed DB, so no deploy was needed and the fix is already live.

**Not fixed, deliberately:** the same query showed LIVE store separators split **195 hyphen
(` - `) vs 5,854 en dash (` – `)**. Nothing in CLAUDE.md, the agent files or the page templates
says the en dash is required. Normalising 195 rows to match a majority is **inventing a standard,
not enforcing one** — so it was measured, logged, and left alone. Owner call.

**At least one slug has the defect baked in permanently:**
`mivi-play-bluetooth-speaker-with-12-hours-playtime-…-rs-649-amazon`. Slugs were not touched —
changing a slug breaks a live URL and costs whatever indexing it has.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | **0 → 1** after this tick; target 2-3, cap 4 |
| Blog hygiene | noCover 0 · noSeoTitle 0 · noSeoDesc 0 (post 376 included) |
| LIVE titles `at Rs ` | **79 → 0** — repaired this tick |
| LIVE proper `₹` glyph | 6360 → **6439** (+79 exact, reconciles) |
| Scratch hygiene (#11) | **clear** — `_c0920.mjs`, `_c0920b.mjs`, `_c0920c.mjs`, `_fix0920.mjs`, `_v0920.mjs` each deleted in the Bash call that ran it |

### New rot class

**The `at Rs ` title defect was invisible to every existing audit arm.** Those 79 rows had a
price, an image, a discount, a cover-equivalent — every column the standing audit checks was
populated and correct. The rot was *inside* a populated field.

That is the same shape as rot #29's 89-row `discountPct` finding, and it is the second time in two
days. **Open owner decision #6 (periodic re-verify sweep over old LIVE rows) is now the
highest-value open item** — the standing audit set structurally cannot find this class, because it
only asks whether fields are *present*.

## Memory corrections warranted

- `gsc-winner-page.md` — records the July burst as current state. It ended **2026-07-31**. Rewrite
  as history.
- `traffic-ceiling.md` — add the 09-14 → 09-17 recovery (24/29/42/48 impressions, positions
  2.2-13.4), which the 28-day aggregate averages away.
- New note worth writing: the `at Rs ` class, recorded as a one-off, recurred across two months and
  79 rows.
