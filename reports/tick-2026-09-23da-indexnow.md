# INDEXNOW — tick `2026-09-23da`

**Result: 0 URLs submitted. The 6h window holds zero deals and one post, and that post pinged
itself at insert with a confirmed HTTP 200. No IndexNow call, deliberately.**

Fourth consecutive zero on this brief (`ay`, `br`, `cj`, now `da`) — and the fourth distinct piece
of arithmetic behind it. The window moved again between ticks, and the post `cj` reasoned about has
itself aged out.

## The window

Read live, not carried forward:

```
NOW   2026-09-23T14:09:22.940Z
SINCE 2026-09-23T08:09:22.940Z
DEALSINWIN 0
  P 383 womens-flats-under-300-india-2026  2026-09-23T13:52:04.010Z  cover=yes seo=yes
POSTSINWIN 1
PRICEHIST  0
maxDeal 10949
```

**Zero deal rows**, same as `cj`. `maxDeal 10949` is unchanged and was created
`2026-09-22T23:22:45Z` by tick `be` — roughly fifteen hours old, far outside a six-hour boundary. The
deal table has taken no write of any kind since `be`.

**One post row: 383**, the women's-flats budget guide published by CONTENT-SEO tick `cw` at
`13:52:04Z`, seventeen minutes before this read.

**Post 382 has aged out.** This is the finding. At `cj` (08:07Z, window opening 02:07Z) post 382 was
the single in-window URL and the entire subject of that tick's reasoning. Published at
`07:53:25.121Z`, it misses this window's `08:09:22.940Z` opening by sixteen minutes. Carrying `cj`'s
row list forward would have submitted a URL the brief no longer covers, on a six-hour-old snapshot —
the same failure `ay` warned about, now demonstrated a second time on a different row.

`PRICEHIST 0` is the independent corroboration: not one stored row had its price refreshed in the
window, so there is no in-place update hiding behind a create count of zero.

One difference from `cj` worth recording: post 383 already reads `cover=yes` **at measurement time**.
At `cj` the cover write on 382 landed after the ping and the tick had to reason about whether that
justified a re-submission. Here the row is already final when the window is read, so there is no live
ambiguity — only the settled precedent, below.

## Freshness — the decision, and why

**No IndexNow call this tick.** The single in-window URL was already submitted, by the script that
created it:

```
DONE: 1 inserted. IndexNow -> HTTP 200
```

`insert-blog-mdmeta.mjs` pings IndexNow as part of the insert — that is precisely why CLAUDE.md
forbids hand-rolled blog inserts. Post 383's URL went to `api.indexnow.org` at publish time and came
back 200. Firing it again seventeen minutes later would re-submit an identical URL for content that
has not changed since it was accepted.

The governing precedent is on the record verbatim from `reports/tick-2026-09-22as-telegram.md`:

> **No IndexNow call this tick, deliberately.** Nothing was written. Re-submitting three unchanged
> URLs hours after they were last pinged is the spam pattern, and the penalty lands on the host, not
> the channel. The freshness rule binds "after ANY batch is pushed" — there was no batch.

And from `ay`:

> The brief's instruction to resubmit the last 6h is honoured by *reading* the window; the site's own
> anti-spam policy governs whether to *fire*, and it binds on whether anything was written.

**The test is what was written by this tick, not how much time has elapsed.** Nothing was written by
`da`. The one thing written inside the window shipped its own receipt.

The cover question `cj` settled at length does not need re-litigating: the sequence on 383 was
identical (insert pings → `gen-blog-covers.mjs` writes `post.cover`), and the answer is the same one,
quoted from `cj`:

> **The URL is identical.** IndexNow submits URLs, not rows. … the fix is to reorder the pipeline so
> the cover lands before the ping — not to double-fire on every post.

No HTTP statuses to report, therefore, and **no Bing fallback exercised**. `api.indexnow.org` remains
intermittent rather than dead: eleven successful resolves on ticks that actually pinged (`t`, `ac`,
`af`, `ai`, `ag`, `al`, `an`, `ap`, `be`, `au`'s blog insert, and `cw`'s), against one DNS failure at
`ab`.

| metric | value |
|---|---|
| deal URLs in window | **0** (the `be` batch aged out at `cj`, still out) |
| post URLs in window | 1 — post 383, already submitted at insert |
| post 382 | **aged out**, in-window at `cj`, outside by 16 min here |
| price refreshes in window | 0 |
| **URLs submitted this tick** | **0** |
| HTTP statuses | none — no call made |
| Bing fallback | not exercised |

## Sitemap

**9,914** `<loc>` entries — **flat** against the 9,914 read immediately after `cw`'s insert, and +1
over `cj`'s 9,913. The new slug is fully attributed:

```
grep -c 'womens-flats-under-300-india-2026'  →  1
```

Exactly one `<loc>` for post 383. Flat is the correct result here: **a sitemap that grows on a tick
with no corresponding write means a duplicate page was created**, and this tick wrote nothing. The
grep confirms `cw` added exactly one URL, not two under competing slugs.

Worth recording against the ISR assumption: sitemap is `revalidate = 1800`, but the +1 from `cw` was
visible on the very next request, seconds after the insert. A post-insert recount does not need to
wait out the thirty-minute window.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Re-measured this tick, not inherited — **two `cj` rot items proved stale within six hours**, which is
the argument for re-measuring.

Clean:

- live deals **10,602**, PENDING_REVIEW **0**
- null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**
- posts **324**, max deal id **10949**
- 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **`cj` rot item #1 is stale and is corrected here.** It reads "Today, 2026-09-23, stands at 1 post
   against a floor of 2." The live day map reads `"2026-09-23": 2` — tick `cw` published post 383
   since. **The floor is met.** The cap is 4, so there is room for a third.
2. **3 unpushed commits on master** — `6cf10b1`, `97832bd`, `5b5c124`, plus this tick's own when it
   lands. **`cj` rot item #2 reads "2 unpushed commits" and is stale**, exactly as `cj` itself said
   `ay`'s "1 unpushed" was. Three reports in a row have carried a stale count forward; the live
   `git rev-list --count origin/master..master` is the only number to trust. Only the SEO-AUDIT-FIX
   brief authorises `git push origin master`.
3. **The pre-flight-gate backlog.** Across the LIVE set: description under 900 chars **10,500**
   (99.1%); thumbnail-variant image (`_SX…_` / `_SY…_`) **1,305** (12.3%); empty `howTo` **3,491**
   (32.9%); thin description *and* thumbnail **1,262** (11.9%). The `geo-optimizer` bulk pass remains
   offered and unapproved.
4. **2026-09-21 stands at 1 post against a floor of 2, and 2026-09-10 and 2026-09-11 published 0
   each.** Session cron `9 */6 * * *` losing firings while the session is down; the durable Task
   Scheduler fix is unauthorised.
5. **41 live deals state a price in the title the row does not hold** — 19 with `₹`, 22 with `Rs.`,
   union 41.
6. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
7. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
8. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod (pages
   stay live per the EXPIRED-banner rule).
9. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path, not a
   refresh to a price nobody can pay.
10. **The blog pipeline pings before it covers — and it recurred on post 383**, exactly as `cj` item
    #10 predicted. `insert-blog-mdmeta.mjs` submits the URL, then `gen-blog-covers.mjs` writes
    `post.cover`, so every post is submitted in a pre-cover state. Harmless, and it is the reason two
    consecutive INDEXNOW ticks have had to reason about a re-ping at all. Reordering is a one-line
    change to the tick sequence, not attempted here.
11. **An empty `alt=""` renders above the post's own image on `/blog/<slug>`.** The post image itself
    is correct (`alt="Women&#x27;s Flats Under ₹300 …"`). The element carrying the empty alt has not
    been identified, so this is a flag, not a defect claim — a natural candidate for the SEO-AUDIT-FIX
    brief, which is the tick licensed to change page source.
12. **`api.indexnow.org` is intermittent, not dead.** Keep the Bing GET fallback wired; do not rewrite
    the script around either assumption.
13. **The DO API token pasted in chat during setup is still unrotated.**
14. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** — logging
    in touches owner credentials.
15. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying no
    deal URLs by design; `/llms-full.txt` is the deal-bearing one. Both 200, nothing broken, the rule
    text points at a file that can never show the batch.

Not flagged, deliberately: the tg-broadcast cursor reads `lastId 10949` against a DB max of 10949 —
equal, fully caught up. Cursor drift is the external broadcast cron working through its queue and has
been wrongly reported as rot before; here there is not even drift to misread.

`ay`'s zero was "the window slid and left only URLs already pinged". `cj`'s was "the deals are gone
entirely and the one post shipped its own receipt". This zero is one slide further: **the post `cj`
reasoned about has itself dropped out, and a newer post has taken its place carrying the identical
argument.** Same answer, fourth distinct arithmetic — which is exactly why the window is re-read
rather than inherited.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
