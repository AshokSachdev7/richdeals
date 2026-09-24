# SCHEMA-AUDIT tick — richdeals.in — 2026-09-23

Covers two letters, one execution: `2026-09-23bg` and `2026-09-23dv` are word-identical briefs.

Report only. Nothing was fixed, nothing was pushed, nothing was pinged.

## Method

Thirteen URLs fetched over Node 22 `fetch` with a desktop Chrome user-agent, ~1.1 s apart. Every
`<script type="application/ld+json">` payload was regex-extracted, `JSON.parse`d, and walked
recursively through arrays, `@graph`, `offers`, `itemListElement`, `mainEntity`, `acceptedAnswer`,
`item` and `image`, then validated per `@type`.

**Caveat, stated because it matters, and it differs from the 2026-09-21 run.** That audit used
Python `urllib.request`, which *raises* on 4xx/5xx, so a non-200 would have surfaced as
`FETCHFAIL <ExceptionName>` and any "missing block" on such a URL would have been *unverified*
rather than *missing*. Node `fetch` does not throw on a bad status — it returns one. Here
`FETCHFAIL` would mean a network or DNS throw only, and a non-200 would have appeared as an
ordinary status row. **All thirteen returned HTTP 200 and no FETCHFAIL occurred**, so every negative
below is a measured negative under either method.

One counting rule, because it bites: **the raw-HTML `application/ld+json` string count is not the
block count.** Post 382 matches that string eight times but parses to four real blocks — the surplus
lives in the RSC flight payload, not in executable `<script>` tags. Every `blocks` figure in this
report is a parsed-block count.

## Results — 13 URLs, all HTTP 200, zero parse errors

| URL | kind | bytes | blocks | nodes | added-value types | verdict |
|---|---|---|---|---|---|---|
| `/` | homepage | 350,763 | 3 | 93 | ItemList(1) → ListItem(30) / Product(30) / Offer(30) | clean — 30/30 priced |
| `/offers` | hub | 60,127 | 3 | 5 | BreadcrumbList(1) + ListItem(2) | **no ItemList, no Product — see findings** |
| `/coupons` | hub | 380,621 | 5 | 55 | BreadcrumbList(1) + ListItem(42) + ItemList(1) + FAQPage(1) + Question(4) + Answer(4) | clean |
| `/freebies` | hub | 381,341 | 5 | 55 | identical shape to `/coupons` | clean |
| `/blog` | hub | 149,416 | 3 | 37 | BreadcrumbList(1) + ListItem(32) + CollectionPage(1) + ItemList(1) | clean |
| `/havells-adonia-spin-25l-…-b0fblw8gc8` (10949) | deal | 171,648 | 5 | 19 | Product + Offer, BreadcrumbList(3), FAQPage(5) | clean |
| `/cello-lifestyle-…-combo-b0h33h7sv7` (10948) | deal | 171,769 | 5 | 19 | Product + Offer, BreadcrumbList(3), FAQPage(5) | clean |
| `/studds-ninja-…-m-b01n4lb4r7` (10947) | deal | 169,476 | 5 | 17 | Product + Offer, BreadcrumbList(3), FAQPage(4) | clean |
| `/story-home-king-size-bedsheet-…-b0djqv7jdb` (10946) | deal | 175,444 | 5 | 19 | Product + Offer, BreadcrumbList(3), FAQPage(5) | clean |
| `/s-guard-active-7-lever-…-lqzgrxy2qrgqh4gx` (10945) | deal | 166,444 | 5 | 17 | Product + Offer, BreadcrumbList(3), FAQPage(4) | clean |
| `/blog/womens-flats-under-300-india-2026` (383) | post | 70,072 | 5 | 8 | Article, BreadcrumbList(3), **HowTo(1)** — no FAQPage | clean |
| `/blog/exhaust-fan-size-guide-150mm-vs-200mm-india-2026` (382) | post | 66,366 | **4** | 7 | Article, BreadcrumbList(3) — **neither FAQPage nor HowTo** | **thinnest page on the site — see findings** |
| `/blog/phone-cooling-fan-gaming-worth-it-india-2026` (381) | post | 73,153 | 5 | 18 | Article, BreadcrumbList(3), FAQPage(1) + Question(5) + Answer(5) | clean |

**The emitted shape is richer than CLAUDE.md documents.** The doc describes "three JSON-LD blocks"
on a deal page; the live template ships **five** — the three documented (Product+Offer,
BreadcrumbList, FAQPage) plus the two sitewide blocks (Organization, WebSite) that every page
carries. That is not a defect. The doc is behind the code, and it is flagged below as documentation
rot rather than schema rot.

## The three error classes in the brief

| class | count | notes |
|---|---|---|
| errors (parse failures, malformed payloads) | **0** | 52 blocks parsed across 13 URLs, no exception thrown |
| missing blocks | **0** | every page type carries the blocks its template promises |
| invalid Offer without price | **0** | see below — this is a meaningful zero |

**The Offer zero is a meaningful zero, not a vacuous one.** CLAUDE.md exempts a priceless deal by
omitting the Offer node entirely, which is correct — an Offer without a price is invalid schema, so
emitting nothing beats emitting garbage. That exemption could in principle hide an absent Offer
behind a legitimate rule. It cannot have done so here: all five newest deals were read out of the DB
first and every one carries a non-null `price` **and** a non-null `mrp` (11598/21790, 799/2295,
1053/1895, 848/3499, 137/449). The exemption could not have applied to any of them, so five Offers
were required and five Offers were found.

The hunt the brief actually asks for is an Offer node **present but priceless**. Zero of those exist
on the audited set.

### Product / Offer detail

All five deal Offers, verbatim from the wire:

```
offer0 {"price":"11598","cur":"INR","avail":"https://schema.org/InStock","valid":"2026-10-07","seller":"Amazon","url":"yes"}
offer0 {"price":"799",  "cur":"INR","avail":"https://schema.org/InStock","valid":"2026-10-07","seller":"Amazon","url":"yes"}
offer0 {"price":"1053", "cur":"INR","avail":"https://schema.org/InStock","valid":"2026-10-07","seller":"Amazon","url":"yes"}
offer0 {"price":"848",  "cur":"INR","avail":"https://schema.org/InStock","valid":"2026-10-07","seller":"Amazon","url":"yes"}
offer0 {"price":"137",  "cur":"INR","avail":"https://schema.org/InStock","valid":"2026-10-07","seller":"Shopsy","url":"yes"}
```

Every figure matches its DB row exactly. `priceValidUntil` is `2026-10-07` on all five — +14 days
from the 09-23 stem, as the template specifies. `seller` is real and varies: four Amazon and one
**Shopsy**, which is the ALL-STORES directive visible on the wire rather than merely asserted in a
config file.

**Observation, not a defect: `price` is emitted as a string** (`"11598"`, not `11598`). schema.org
accepts a string for `price` and Google's Product documentation shows string values, so this is
valid. Recorded here because it is the kind of thing a future reader would otherwise re-discover and
mis-flag.

The homepage carries the same Product/Offer shape at volume: an ItemList of 30 deals, 30 Product
nodes, 30 Offer nodes, **30 of 30 priced**, zero bad.

## og:type and canonicals

`og:type` reads `website` on `/`, `/offers`, `/coupons`, `/freebies`, `/blog` and all five deal
pages, and `article` on all three blog posts. Canonicals are present, correct and self-referential
everywhere (the homepage's is the bare `https://richdeals.in`).

**Correction to a carried belief, stated narrowly.** CLAUDE.md's note that "og:type stays `website`"
sits in the deal-page section and is true there: Next's OG type union has no `product`, and the
JSON-LD Product node carries that signal instead. It is **not** a sitewide fact. Blog posts ship
`article`, which is the correct value for them. Anyone re-reading that note should not generalise it
past deal pages.

## Findings

Five things, none of which is a schema error, three of which are worth acting on.

### 1. `/offers` ships no ItemList and no server-rendered deal anchors

This is the real finding, and the 2026-09-21 audit understated it — that report logged `/offers` as
"3 blocks, BreadcrumbList(2), clean", which is accurate about what is there and silent about what is
not. Measured this tick:

```
offers bytes           60127
offers dealLinkCount   0
offers hasItemList     false
coupons dealLinkCount  80
```

The site's **primary deals hub** returns 60 KB against `/coupons`' 380 KB, contains zero anchors
matching a deal-slug shape, and carries no `ItemList` and no `Product` node at all. `/coupons` and
`/freebies` each ship `ItemList` + 41 `ListItem` + a `FAQPage`; `/blog` ships `CollectionPage` +
`ItemList` + 32 `ListItem`. `/offers` is the only listing page on the site with no product schema
and no server-side links into the catalogue.

Framed honestly: the page returns 200 and is presumably client-rendering its grid, so it is not
broken for a human. But a crawler that does not execute JS sees a hub page with no outbound links
into the deal set and no structured data describing what it lists. `/offers` is also the internal
link target that blog posts are required to carry, which makes it a link-equity funnel that
currently terminates. **Natural SEO-AUDIT-FIX candidate** — that is the tick licensed to change page
source.

### 2. Post 382 carries only four blocks — Article + BreadcrumbList and nothing else

The thinnest structured-data page on the site, and the strongest "missing block" candidate the audit
found. It is not a *missing* block in the brief's sense — the template makes no promise it broke —
but it is a page that ships less than its siblings for no visible reason.

The reason is not visible because the obvious mechanism is refuted (below).

### 3. The blog FAQPage/HowTo generator is not driven by question-shaped H2s — hypothesis refuted

The 2026-09-21 audit recorded blog posts as carrying a FAQPage and treated that as an
undocumented-but-present feature. That generalisation is false: the block is **conditional**, and
the obvious hypothesis for the condition does not survive measurement.

| post | `<h2>` | question-shaped `<h2>` | `<ol>` | blocks | added-value |
|---|---|---|---|---|---|
| 382 exhaust-fan | 12 | **8** | 1 | **4** | none |
| 383 womens-flats | 13 | 7 | 2 | 5 | HowTo(1) |
| 381 cooling-fan | 12 | **1** | 1 | 5 | FAQPage(1) + Question(5) + Answer(5) |

**The post with the most question-shaped H2s gets no FAQPage; the post with the fewest gets one.**
HowTo is not a simple ordered-list count either — 383 has two `<ol>` and gets HowTo, 381 has one and
does not, 382 has one and gets neither.

So the generator keys off something else — a meta field, a tag, a body marker, a heuristic in the
post template. This report does not claim to know which. It is recorded as a measured anomaly with
the obvious explanation explicitly eliminated, because the failure mode here is a future reader
asserting "it reads the H2s" and building on a wrong model. The mechanism is worth ten minutes of
source reading on a tick licensed to read page source.

### 4. The empty `alt=""` is template-wide, not specific to post 383

Carried as INDEXNOW rot item #11: "an empty `alt=""` renders above post 383's own image". Measured
this tick on two posts:

```
p383 emptyAlt 2    p382 emptyAlt 2
```

Two instances per page on both. It is a blog-template defect, not a one-post quirk, and the flag
generalises accordingly. Still a flag rather than a defect claim — the element carrying it has not
been identified — and still a SEO-AUDIT-FIX candidate.

### 5. `/blog`'s third JSON-LD root is an array, not an object

```
blog roots OBJECT,OBJECT,ARRAY
```

Valid JSON-LD; a top-level array of nodes is legal and the recursive walk handles it. Recorded only
because a naive validator that assumes an object root would report a false failure on this one page.

## Expected shapes, deliberately not flagged

- **Deal-page `og:type` is `website`.** By design — Next's OG union has no `product` and the JSON-LD
  Product node carries the signal. Not a defect.
- **Offer omitted when a deal has no price.** By design, and correct — an Offer without a price is
  invalid schema. The audit hunts for the opposite case and found none.
- **The visible FAQ `<section>` mirrors the FAQPage block.** By design — Google requires visible
  copy matching FAQ markup, and schema-only FAQ is a manual-action risk.
- **Five blocks on a deal page where CLAUDE.md documents three.** The doc is behind the code.
- **A blog post carrying schema CLAUDE.md never mentions.** Same class.

## CEO audit

Re-measured this tick, not inherited.

Clean:

- live deals **10,602**, PENDING_REVIEW **0**
- null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**
- posts **324**, max deal id **10949**
- 7/7 prod endpoints 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
  `/llms.txt`
- sitemap **9,914** `<loc>` entries — **flat for the eleventh consecutive read**, against the 9,914
  first seen immediately after `cw`'s insert. Flat is the correct result on a tick that wrote
  nothing; a sitemap that grows without a corresponding write means a duplicate page was created.

Rot, all flagged, none executed:

1. **`/offers` ships no ItemList and no server-rendered deal anchors.** New this tick. See finding 1.
2. **Post 382 ships four JSON-LD blocks against five elsewhere**, and the mechanism that decides is
   unknown with the obvious hypothesis refuted. New this tick. See findings 2 and 3.
3. **The empty `alt=""` is template-wide** — two per page on both posts checked. Generalised from
   the post-383-specific flag carried since `da`.
4. **CLAUDE.md's JSON-LD documentation is behind the code** — "three blocks" on a deal page against
   five on the wire, and blog-post schema it does not mention at all.
5. **The IST day has rolled and today is empty.** Clock reads
   `UTC 2026-09-23T23:39:19.365Z / IST 2026-09-24T05:09`. The day map runs `2026-09-16` →
   `2026-09-23` with no `2026-09-24` key: **0 posts on the new day**. Not a floor breach at 05:09
   IST, but it is the number the CONTENT-SEO brief gates on, and it says publish. `2026-09-23`
   closed at 2, meeting its floor.
6. **5 unpushed commits on master** — `6cf10b1`, `97832bd`, `5b5c124`, `2dbf7eb`, `931d7d3`, plus
   this tick's own when it lands. Only the SEO-AUDIT-FIX brief authorises `git push origin master`.
7. **The pre-flight-gate backlog.** Across the LIVE set: description under 900 chars **10,500**
   (99.1%); thumbnail-variant image (`_SX…_` / `_SY…_`) **1,305** (12.3%); empty `howTo` **3,491**
   (32.9%); thin description *and* thumbnail **1,262** (11.9%). The `geo-optimizer` bulk pass remains
   offered and unapproved.
8. **2026-09-21 stands at 1 post against a floor of 2.** Session cron `9 */6 * * *` losing firings
   while the session is down; the durable Task Scheduler fix is unauthorised. 2026-09-10 and
   2026-09-11 published 0 each — cited as historical, not re-measured: the CEO day map is a rolling
   ~8-day window and no longer reaches those dates.
9. **41 live deals state a price in the title the row does not hold** — 19 with `₹`, 22 with `Rs.`,
   union 41.
10. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
11. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
12. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod (pages
    stay live per the EXPIRED-banner rule).
13. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path, not
    a refresh to a price nobody can pay.
14. **The blog pipeline pings before it covers.** `insert-blog-mdmeta.mjs` submits the URL, then
    `gen-blog-covers.mjs` writes `post.cover`. Reordering is a one-line change to the tick sequence,
    not attempted here.
15. **Four live deals disagree with their source channel's stated price** — deal 9751 ₹831 vs ₹604,
    deal 3484 ₹640 vs ₹675, deal 7110 ₹3,459 vs ₹3,500, deal 3945 ₹3,799 vs ₹4,099. Two are
    *reverse* gaps (we are cheaper), the benign direction.
16. **Content-cluster saturation.** ~45 free-samples/freebies slugs and 4 dinner-set slugs. Four
    posts competing for `dinner set` at GSC position 10.4 is cannibalization, not coverage.
17. **`api.indexnow.org` is intermittent, not dead.** Keep the Bing GET fallback wired.
18. **The DO API token pasted in chat during setup is still unrotated.**
19. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
    logging in touches owner credentials.
20. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying no
    deal URLs by design; `/llms-full.txt` is the deal-bearing one.

Not flagged, deliberately: the tg-broadcast cursor reads `lastId 10949` against a DB max of 10949 —
equal, fully caught up. Cursor drift is the external broadcast cron working through its queue and
has been wrongly reported as rot before; here there is not even drift to misread.

---

Thirteen URLs, thirteen 200s, fifty-two parsed blocks, zero errors, zero missing blocks, zero
priceless Offers. On the brief's own terms this is a clean audit, and the Offer zero is a real one
rather than an artefact of the priceless-deal exemption.

What the audit is actually worth is the four things it corrected. `/offers` was recorded as clean two
days ago and ships no product schema at all. Blog posts were recorded as carrying a FAQPage and carry
one conditionally, on a rule that is not what it looks like. `og:type` was believed sitewide and is
not. An empty `alt` was believed post-specific and is template-wide. **Every one of those was a
carried belief that re-measurement broke** — which is the argument for running the audit rather than
citing the last one.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
