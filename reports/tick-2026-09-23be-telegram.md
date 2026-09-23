# TELEGRAM-DEAL-MONITOR — tick `2026-09-23be`

Closes ticks `2026-09-23av`, `2026-09-23az`, `2026-09-23bb`, `2026-09-23be` and `2026-09-23bh` —
five identical briefs issued against the same sidebar state. One sweep, one verification pass, one
write, one report.

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is filtered
out inside the page, before anything reaches this session.

**Result: 3 published, 0 refreshed. IndexNow 6/6 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 24 |
| rows belonging to the 13 tracked groups | 12 of 13 present |
| shortlinks worth resolving | 3 |
| single-product candidates after the skip rules | 3 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 3 |
| survived PDP price/stock verification | 3 of 3 |

`NonStopDeals` did not appear in the sidebar read. That is a sidebar-ordering artefact, not a dead
channel — the client paginates the chat list and the row had fallen below the rendered window.
Nothing was reloaded to chase it; the next tick will see it.

## Published

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 10947 | Amazon | B01N4LB4R7 | ₹1,053 | 1,895 | 44% | `studds-ninja-pastel-plain-flip-up-full-face-helmet-silver-grey-m-b01n4lb4r7` |
| 10948 | Amazon | B0H33H7SV7 | ₹799 | 2,295 | 65% | `cello-lifestyle-stainless-steel-electric-kettle-1-5l-sippa-bottle-1000-ml-combo-b0h33h7sv7` |
| 10949 | Amazon | B0FBLW8GC8 | ₹11,598 | 21,790 | 47% | `havells-adonia-spin-25l-5-star-storage-water-heater-b0fblw8gc8` |

Descriptions 1,890 / 1,505 / 1,773 characters, `howTo` 4 steps each, images all
`m.media-amazon.com` `_SL1200_` / `_SL1500_` originals, all three In stock, all three past the
pre-flight gate (title-₹ vs `price`, discount, image host, `THUMB` variant, 900-char floor,
4-step `howTo`, and the eighth check added this tick — `affiliateUrl` must match
`^https://www\.amazon\.in/dp/[A-Z0-9]{10}\?tag=ashoksachdev-21$` exactly).

All three PDPs were read in one `browser_evaluate` in the logged-in Amazon tab — three serial
same-origin fetches, three `DOMParser` reads, zero errors. Price from the first `₹` in
`#centerCol` innerText, M.R.P. from the raw-HTML `M\.R\.P\.` window, image from `#landingImage`
`data-old-hires`, stock from `#availability`, plus bullets and the spec table for the copy. All
three of these PDPs carry feature bullets, which is worth noting against the indiafreestuff set
where 8 of 21 did not.

### Three foreign affiliate tags stripped

Every one of the three links arrived wearing someone else's tag, and each came through a different
shortener:

| channel link | resolved to | foreign tag stripped |
|---|---|---|
| `amzn.to/4hCNkNz` | `B01N4LB4R7` | `collab-amafhh-21` |
| `link.amazon/B0guc5kgM` | `B0H33H7SV7` | `glitzdeal05-21` |
| `rogerkart.com/r/UXbBJ69` | `B0FBLW8GC8` | `rogerkart-21` |

The Rogerkart link was resolved with the one-curl flight-payload read retired into practice at
`as` — no browser, no redirect chain, the destination sits in the server-rendered payload. Two
ticks running it has paid for itself. In every case the URL was rebuilt from the ASIN rather than
cleaned in place, which is the only way to be sure no `smid` / `linkCode` / `ascsubtag` /
`ref_` freight survives.

### The Havells claim does not reconcile, and was published anyway — at the PDP price

Rogerkart posted the Havells Adonia Spin 25L at **₹7,934**. The PDP reads **₹11,598**. That is a
₹3,664 gap, 31.6% below the live price, and it fails *both* of the two tests that normally explain
a channel number: 11,598 × 0.95 = **11,018**, so no 5% clip coupon reaches it, and no stack of
bank offers on this listing closes a gap of that size either. It is not post-coupon, it is not
post-bank-offer, and it is not a rounding slip — it is the fifth category, a claim that fails
every test.

The product is real, in stock and genuinely 47% off M.R.P., so the deal was published — at
₹11,598, the only figure the product page supports. `howTo` step 2 names the ₹7,934 claim
explicitly and says it could not be reproduced on the listing. Publishing the claim as the price
would have put a number on the page that no buyer can pay.

## Refreshed in place

None. All three candidates were new products, not stored rows.

## Skipped, with reasons

- Loot / multi-product / category posts across Dealdost, Dealzone, OMG LOOTDEALS, Deal Dibba and
  Hidden Loot Deals — no single product behind them.
- Search-result and bait posts (join-channel, watch-video-earn) — nothing verifiable.
- Untracked sidebar rows, including our own RichDeals broadcast channels — not in
  `data/tg-groups.json`.

`data/tg-multi-seen.json` now holds **1,816** entries, up 3. All three product ids were
**seen-file misses AND live-DB misses** — genuinely new on both checks, which is the cleanest
possible dedup result and the opposite of the `ap` case where the file missed and the DB caught a
duplicate. The seen file is still only a cheap first pass; the DB check is the real dedup.

The create loop is deliberately serial. Managed Postgres gives us ~22 connection slots and a
`Promise.all` over Prisma writes trips `P2037`. Three rows do not need parallelism.

## Freshness

```
node scripts/indexnow-ping.mjs studds-... cello-... havells-...
DONE: IndexNow -> HTTP 200 for 6 urls
```

3 slugs + `/`, `/offers`, `/sitemap.xml` — the slugs+3 rule; the count is the receipt. No Bing
fallback needed. `api.indexnow.org` has now resolved on nine ticks that pinged (`t`, `ac`, `af`,
`ai`, `ag`, `al`, `an`, `ap`, `be`), against one DNS failure at `ab`.

Live pages verified after the write, all 200 with Product JSON-LD matching the DB to the rupee:

- `/studds-ninja-pastel-plain-flip-up-full-face-helmet-silver-grey-m-b01n4lb4r7` → `"price":"1053"`
- `/cello-lifestyle-stainless-steel-electric-kettle-1-5l-sippa-bottle-1000-ml-combo-b0h33h7sv7` → `"price":"799"`
- `/havells-adonia-spin-25l-5-star-storage-water-heater-b0fblw8gc8` → `"price":"11598"`

Sitemap moved **9,909 → 9,912** — exactly +3, and the delta is fully attributed. Each ASIN suffix
greps to exactly **one** `<loc>`: `b01n4lb4r7` 1, `b0h33h7sv7` 1, `b0fblw8gc8` 1. Three writes,
three URLs, no duplicate page created under a second slug. 9,909 had been flat across `ao`, `ap`,
`ar`, `as`, `at`, `aw`, `ba`, `bd` and `bf` — every one of those a zero-write tick — so the first
movement in nine ticks landing exactly on the three new slugs is the check working as designed.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean:

- live deals **10,602** (was 10,599 — +3, this tick's own writes), PENDING_REVIEW **0**
- null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**
- max deal id **10949**
- 7/7 prod endpoints 200, unpushed commits **0** before this tick's own commit
- three new rows clear the full pre-flight gate, so the legacy defect counts below are unchanged
  against the larger denominator rather than needing a re-measure

Rot, all flagged, none executed:

1. **The pre-flight-gate backlog, still the largest number in this file.** Measured across the
   10,599 LIVE deals before this tick: description under 900 chars **10,500** (99.1%);
   thumbnail-variant image (`_SX…_` / `_SY…_`) **1,305** (12.3%); empty `howTo` **3,491** (32.9%);
   thin description *and* thumbnail **1,262** (11.9%). Every row written since the gate exists
   clears it; almost nothing written before it does. The `geo-optimizer` bulk pass remains offered
   and unapproved.
2. **Today, 2026-09-23, stands at 0 posts published with the floor at 2.** Posts/day IST: 09-22
   **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. The day is live and the CONTENT-SEO tick has not
   run yet, so this is a live obligation rather than a miss — but it is on the board.
3. **2026-09-21 stands at 1 post against a floor of 2, and 2026-09-10 and 2026-09-11 published 0
   each** — the latter two visible as a gap in the slug date sequence (09-12 jumps straight to
   09-09). Cause in every case is the session cron `9 */6 * * *` losing firings while the session
   is down; the durable Task Scheduler fix is unauthorised.
4. **41 live deals state a price in the title the row does not hold** — 19 written with `₹`,
   22 with `Rs.`, union 41. Count each notation pattern independently and take the union of row
   ids; an else-if bucket undercounts and a `₹`-only check sees 19 and reads the backlog as
   halved. Retitle pass not authorised.
5. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
6. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
7. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
8. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path,
   not a refresh to a price nobody can pay.
9. **`api.indexnow.org` is intermittent, not dead.** Keep the Bing GET fallback wired; do not
   rewrite the script around either assumption.
10. **The DO API token pasted in chat during setup is still unrotated.**
11. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
    logging in touches owner credentials.
12. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying
    no deal URLs by design; `/llms-full.txt` is the deal-bearing one. Both 200, nothing broken,
    the rule text points at a file that can never show the batch.

Not flagged, deliberately: the tg-broadcast cursor reads `lastId 10946` against a DB max of
10949. That is the external broadcast cron trailing three rows it has not yet sent — it self-heals
on its next firing and has been wrongly reported as rot before.

Five identical briefs, one sweep, three products the site did not have. The channels were unusually
productive this tick and every one of the three links arrived under a foreign tag — the resolve
step is not overhead, it is where the revenue is.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
