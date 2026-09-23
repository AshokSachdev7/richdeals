# INDEXNOW — tick `2026-09-23ay`

Closes ticks `2026-09-23ay` and `2026-09-23br` — two word-identical briefs against the same
window state. One read, one decision, one report.

**Result: 0 URLs submitted. The 6h window holds only the three URLs tick `be` pinged 2h42m ago.
No IndexNow call, deliberately.**

## The window

The brief defines freshness as "newest deal/post URLs (last 6h)". Read live, not carried forward
from an earlier snapshot:

```
SINCE 2026-09-22T20:04:48.811Z
  D 10947 studds-ninja-pastel-plain-flip-up-full-face-helmet-silver-grey-m-b01n4lb4r7  2026-09-22T23:22:45.502Z
  D 10948 cello-lifestyle-stainless-steel-electric-kettle-1-5l-sippa-bottle-1000-ml-combo-b0h33h7sv7  2026-09-22T23:22:45.595Z
  D 10949 havells-adonia-spin-25l-5-star-storage-water-heater-b0fblw8gc8  2026-09-22T23:22:45.647Z
POSTS 0
PRICEHIST 0
maxDeal 10949
```

Three deals in window. All three are tick `be`'s own writes, created `2026-09-22T23:22:45Z` and
submitted by `be` itself with `DONE: IndexNow -> HTTP 200 for 6 urls` roughly **2h42m** before this
read. Nothing else qualifies.

**The window slid, and that is the whole finding.** An earlier read of this same brief, taken at
`SINCE 2026-09-22T14:00:30Z`, held sixteen rows — deals 10931 through 10946. Every one of those has
since aged past six hours and is now outside the boundary the brief itself draws. Submitting them
would have meant pinging URLs the brief does not cover, on the strength of a stale snapshot.
Re-running the window rather than trusting the carried list is what caught it.

`PRICEHIST 0` is the independent corroboration: not one stored row had its price refreshed in the
window either, so there is no in-place update hiding behind the create count. `maxDeal 10949`
matches the newest row in window — the DB has taken no write of any kind since `be`.

`POSTS 0`. Today is 2026-09-23 and the blog floor is 2; see the CEO audit below. That zero is not
benign here, it is a live obligation, and it is the reason this tick has no post URLs to submit.

## Freshness — the decision, and why

**No IndexNow call this tick.** The three in-window URLs are unchanged since they were last
submitted, 2h42m ago, with a confirmed 200. Firing again would re-submit three identical URLs for
no new content. The precedent is on the record verbatim from `reports/tick-2026-09-22as-telegram.md`:

> **No IndexNow call this tick, deliberately.** Nothing was written. Re-submitting three unchanged
> URLs hours after they were last pinged is the spam pattern, and the penalty lands on the host, not
> the channel. The freshness rule binds "after ANY batch is pushed" — there was no batch.

The brief's instruction to resubmit the last 6h is honoured by *reading* the window; the site's own
anti-spam policy governs whether to *fire*, and it binds on whether anything was written. Nothing
was. The alternative — running the ping so the report could carry a 200 — would be a receipt for
work that did not happen.

No HTTP statuses to report, therefore, and no Bing fallback exercised. `api.indexnow.org` remains
intermittent rather than dead: 200 on nine ticks that pinged (`t`, `ac`, `af`, `ai`, `ag`, `al`,
`an`, `ap`, `be`), one DNS failure at `ab`. Nothing this tick changes that record either way.

| metric | value |
|---|---|
| deal URLs in window | 3 (all previously submitted by `be`) |
| post URLs in window | 0 |
| price refreshes in window | 0 |
| **URLs submitted this tick** | **0** |
| HTTP statuses | none — no call made |

Sitemap **9,912** `<loc>` entries — unchanged from `be`, which is the correct outcome. A sitemap
that grew on a zero-write tick would mean a duplicate page had been created. 9,909 had been flat
across `ao`, `ap`, `ar`, `as`, `at`, `aw`, `ba`, `bd` and `bf`; `be` moved it to 9,912 with each of
the three ASIN suffixes greping to exactly one `<loc>`; it has held there since.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean:

- live deals **10,602**, PENDING_REVIEW **0**
- null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**
- max deal id **10949**
- 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Today, 2026-09-23, still stands at 0 posts published against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3 — no `2026-09-23` key exists yet. This is the
   loudest item on the board and it is the direct cause of `POSTS 0` above. `blogger.md` is explicit:
   a day with 0 posts is a failed day. The CONTENT-SEO tick has not completed today.
2. **1 unpushed commit on master** — `6cf10b1`, the `be` report. Only the SEO-AUDIT-FIX brief
   authorises `git push origin master`; this tick does not, so the commit stays local.
3. **The pre-flight-gate backlog, still the largest number in this file.** Across the LIVE set:
   description under 900 chars **10,500** (99.1%); thumbnail-variant image (`_SX…_` / `_SY…_`)
   **1,305** (12.3%); empty `howTo` **3,491** (32.9%); thin description *and* thumbnail **1,262**
   (11.9%). Every row written since the gate exists clears it; almost nothing written before it
   does. The `geo-optimizer` bulk pass remains offered and unapproved.
4. **2026-09-21 stands at 1 post against a floor of 2, and 2026-09-10 and 2026-09-11 published 0
   each.** Cause in every case is the session cron `9 */6 * * *` losing firings while the session is
   down; the durable Task Scheduler fix is unauthorised.
5. **41 live deals state a price in the title the row does not hold** — 19 written with `₹`, 22 with
   `Rs.`, union 41. Count each notation independently and union the row ids; an else-if bucket
   undercounts. Retitle pass not authorised.
6. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
7. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
8. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
9. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path, not
   a refresh to a price nobody can pay.
10. **`api.indexnow.org` is intermittent, not dead.** Keep the Bing GET fallback wired; do not
    rewrite the script around either assumption.
11. **The DO API token pasted in chat during setup is still unrotated.**
12. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
    logging in touches owner credentials.
13. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying no
    deal URLs by design; `/llms-full.txt` is the deal-bearing one. Both 200, nothing broken, the
    rule text points at a file that can never show the batch.

Not flagged, deliberately: the tg-broadcast cursor trailing the DB max is the external broadcast
cron working through its queue — it self-heals and has been wrongly reported as rot before.

The useful output of an INDEXNOW tick is not always a ping. Re-reading the window instead of
trusting a carried list turned a planned 19-URL submission into a correct zero, and the three URLs
that did qualify were already in Bing's index queue with a 200 against them.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
