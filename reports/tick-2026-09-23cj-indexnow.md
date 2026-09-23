# INDEXNOW — tick `2026-09-23cj`

**Result: 0 URLs submitted. The 6h window holds zero deals and one post, and that post pinged
itself at insert with a confirmed HTTP 200. No IndexNow call, deliberately.**

This is the third consecutive zero on this brief, but it is **not** the same zero as `ay`/`br`. The
reason changed, and the reason is the finding.

## The window

Read live, not carried forward:

```
NOW   2026-09-23T08:07:20.760Z
SINCE 2026-09-23T02:07:20.760Z
  P 382 exhaust-fan-size-guide-150mm-vs-200mm-india-2026  2026-09-23T07:53:25.121Z  cover=yes seo=yes
POSTSINWIN 1
PRICEHIST  0
maxDeal 10949
```

**Zero deal rows.** At `ay`, four hours ago, the window held three — deals 10947, 10948 and 10949,
created `2026-09-22T23:22:45Z` by tick `be`. Every one of them has now aged past six hours and
dropped out entirely. `ay` predicted exactly this and wrote the rule down:

> Re-running the window rather than trusting the carried list is what caught it.

Carrying `ay`'s three rows forward into this tick would have submitted URLs the brief no longer
covers, on the strength of a four-hour-old snapshot. The window is a moving boundary; it has to be
re-read every time, and this tick is what it looks like when it moves all the way past the last
batch.

**One post row: 382**, the exhaust-fan sizing guide published by CONTENT-SEO tick `au` at
`07:53:25Z`, fourteen minutes before this read. That is the only in-window URL on the site.

`PRICEHIST 0` is the independent corroboration. Not one stored row had its price refreshed in the
window, so there is no in-place update hiding behind a create count of zero. `maxDeal 10949` matches
the newest row from `be` — the deal table has taken no write of any kind since.

## Freshness — the decision, and why

**No IndexNow call this tick.** The single in-window URL was already submitted, by the script that
created it:

```
DONE: 1 inserted. IndexNow -> HTTP 200
```

`insert-blog-mdmeta.mjs` pings IndexNow as part of the insert — that is precisely why CLAUDE.md
forbids hand-rolled blog inserts. Post 382's URL went to `api.indexnow.org` at publish time and came
back 200. Firing it again fourteen minutes later would re-submit an identical URL for content that
has not changed since it was accepted.

The governing precedent is on the record verbatim from `reports/tick-2026-09-22as-telegram.md`:

> **No IndexNow call this tick, deliberately.** Nothing was written. Re-submitting three unchanged
> URLs hours after they were last pinged is the spam pattern, and the penalty lands on the host, not
> the channel. The freshness rule binds "after ANY batch is pushed" — there was no batch.

And from `ay`:

> The brief's instruction to resubmit the last 6h is honoured by *reading* the window; the site's own
> anti-spam policy governs whether to *fire*, and it binds on whether anything was written.

Nothing was written **by this tick**. The one thing written inside the window shipped its own ping.

### Does the cover write on post 382 justify a re-ping? No.

This needs answering explicitly, because it is the one thing that genuinely distinguishes this
window from a trivially empty one. The sequence was:

1. `insert-blog-mdmeta.mjs` creates post 382 → **pings IndexNow → HTTP 200**.
2. `gen-blog-covers.mjs` then generates the 1200×630 cover, uploads it to DO Spaces, and **writes
   `post.cover` on the same row**.

So the row genuinely changed *after* it was submitted. Three reasons that does not earn a second
ping:

- **The URL is identical.** IndexNow submits URLs, not rows. `/blog/exhaust-fan-size-guide-150mm-vs-200mm-india-2026`
  is the same string before and after the cover lands, and it already carries a 200 against it from
  fourteen minutes ago.
- **The cover is an asset referenced by the page, not a new URL.** The PNG lives at
  `richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png`, on a different host we do not own a
  sitemap for and do not submit. What changed on our URL is an `og:image` meta tag and one `<img>`
  src — a resource reference, not the document's substance.
- **Same URL, same day, already accepted.** Re-firing on a sub-hour cadence for a metadata field is
  the exact behaviour the spam rule exists to stop. The crawler will pick the cover up on its first
  visit against the ping already lodged.

The honest framing: the ping fired 14 minutes *before* the page reached its final state, which is a
mild ordering wart in the pipeline (insert pings, then covers run). It is not worth a re-submission,
and if it ever were, the fix is to reorder the pipeline so the cover lands before the ping — not to
double-fire on every post.

No HTTP statuses to report, therefore, and **no Bing fallback exercised**. `api.indexnow.org` remains
intermittent rather than dead: ten successful resolves on ticks that actually pinged (`t`, `ac`,
`af`, `ai`, `ag`, `al`, `an`, `ap`, `be`, and `au`'s blog insert this morning), against one DNS
failure at `ab`.

| metric | value |
|---|---|
| deal URLs in window | **0** (the `be` batch aged out) |
| post URLs in window | 1 — post 382, already submitted at insert |
| price refreshes in window | 0 |
| **URLs submitted this tick** | **0** |
| HTTP statuses | none — no call made |
| Bing fallback | not exercised |

## Sitemap

**9,913** `<loc>` entries, up exactly **+1** from the 9,912 that held across `ay`, `br`, `bt`, `bw`,
`by`, `cb` and `ce`. The delta is fully attributed:

```
grep -c 'exhaust-fan-size-guide-150mm-vs-200mm-india-2026'  →  1
```

Exactly one `<loc>`. One post published, one URL added, no duplicate page created under a second
slug. The check earns its place here: a sitemap that grows on a tick with no corresponding write
means a duplicate page was created, and the only way to know the difference is to grep the new slug
and count.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`. The post's own page also returns 200 with its cover URL rendered twice.

## CEO audit

Clean:

- live deals **10,602**, PENDING_REVIEW **0**
- null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**
- posts **323**, max deal id **10949**
- 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Today, 2026-09-23, stands at 1 post against a floor of 2.** Materially better than at `ay`,
   where it was 0 and was called the loudest item on the board — tick `au` published the exhaust-fan
   guide since. Still short of the floor by one. The cap is 4.
2. **2 unpushed commits on master** — `6cf10b1` and `97832bd`, plus this tick's own when it lands.
   **`ay` rot item #2 reads "1 unpushed commit" and is stale**; the live
   `git rev-list --count origin/master..master` is 2. Only the SEO-AUDIT-FIX brief authorises
   `git push origin master`.
3. **The pre-flight-gate backlog.** Across the LIVE set: description under 900 chars **10,500**
   (99.1%); thumbnail-variant image (`_SX…_` / `_SY…_`) **1,305** (12.3%); empty `howTo` **3,491**
   (32.9%); thin description *and* thumbnail **1,262** (11.9%). The `geo-optimizer` bulk pass
   remains offered and unapproved.
4. **2026-09-21 stands at 1 post against a floor of 2, and 2026-09-10 and 2026-09-11 published 0
   each** — the last two re-confirmed this tick as a gap in the day-by-day map, which jumps straight
   from 09-12 to 09-09. Session cron `9 */6 * * *` losing firings while the session is down; the
   durable Task Scheduler fix is unauthorised.
5. **41 live deals state a price in the title the row does not hold** — 19 with `₹`, 22 with `Rs.`,
   union 41. Count each notation independently and union the ids; an else-if bucket undercounts.
6. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
7. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
8. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod (pages
   stay live per the EXPIRED-banner rule).
9. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path, not
   a refresh to a price nobody can pay.
10. **The blog pipeline pings before it covers.** `insert-blog-mdmeta.mjs` submits the URL, then
    `gen-blog-covers.mjs` writes `post.cover` — so every post is submitted in a pre-cover state.
    Harmless (the crawler reads the page, not the ping payload) but it is the reason this tick had to
    reason about a re-ping at all. Reordering is a one-line change to the tick sequence, not
    attempted here.
11. **`api.indexnow.org` is intermittent, not dead.** Keep the Bing GET fallback wired; do not
    rewrite the script around either assumption.
12. **The DO API token pasted in chat during setup is still unrotated.**
13. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
    logging in touches owner credentials.
14. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying no
    deal URLs by design; `/llms-full.txt` is the deal-bearing one. Both 200, nothing broken, the
    rule text points at a file that can never show the batch.

Not flagged, deliberately: the tg-broadcast cursor reads `lastId 10949` against a DB max of 10949 —
equal, fully caught up. Cursor drift is the external broadcast cron working through its queue and
has been wrongly reported as rot before; here there is not even drift to misread.

`ay`'s zero was "the window slid and left only URLs already pinged". This zero is one step further
along the same slide: the deals are gone entirely, and the only thing in the window shipped its own
receipt. Same answer, different arithmetic — which is why the window gets re-read rather than
inherited.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
