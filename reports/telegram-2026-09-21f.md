# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (f)

## Sweep

`browser_tabs list` ran **before** the read and returned tab **3** `https://web.telegram.org/a/` as
`(current)`, so the documented wrong-current-tab failure — `browser_evaluate` executes against the
current tab, and fired from the Amazon tab it returns **0 rows** and reads as a dead sidebar — was
ruled out by measurement, not by assumption. No `browser_tabs select` was needed. The five open
tabs: 0 ONLINE SHOPPING DEALS, 1 Dealzone, 2 a Flipkart by-pid resolver page left from an earlier
window, 3 Telegram (current), 4 an Amazon PDP.

One `browser_evaluate` over `.chat-list .ListItem.Chat`, reading each row's `a[href]` (the chat id)
plus its `innerText` → **29 rows**, all **13** groups from `data/tg-groups.json` present.

**Published: 0. Zero new candidates.** Every source row is byte-identical to tick `-e` — not
"similar", identical: same message text, same timestamp, same order.

| source group | last message | time | disposition |
|---|---|---:|---|
| Dealzone | Bosch 302L 3-Star MaxFlex triple door @ 28720, `link.amazon/B004UUJF7`, "Flat 1750 off with any CC" | 04:31 AM | dup — LIVE **10790** (unchanged since `-e`) |
| SB Loots And Deals | "Missed Some Loots" notification instructions | 01:33 AM | reject — not a deal |
| Rogerkart Deals | same Bosch @ 28720, `rogerkart.com/r/n9G2RZ9` | 00:10 AM | dup — LIVE **10790**; #48 JS redirect |
| Deal Dibba | "65 : `bitli.in/Ks4GgGy`" | 00:07 AM | reject — ₹65 Shopsy shilajit |
| CoolzTricks Official | "Apply 30% Off Coupon" + `amzn.to/4At7cdy` | 00:05 AM | dup — LIVE **10789** |
| Dealdost | Myntra "Loot : (Pack of 3) at 179", `myntr.it/IfYRq6x` | 10:20 PM | reject — multi-pack loot |
| ONLINE SHOPPING DEALS | Milton Prudent 500 Thermosteel 510 ml | Sun | dup — LIVE **10767** |
| IndiaFreeStuff Tips | Swiggy Instamart `/search?query=NOICE` | Wed | reject — search URL |
| Hidden Loot Deals | Blinkit Baker's Loaf + free Cold Coffee | Sep 9 | reject — store promo |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | Aug 19 | dup — LIVE **7110** |
| OMG LOOTDEALS | "Video dekho paisa kamao" | Aug 14 | reject — ad |
| NonStopDeals | bare number "151" + `amzn.to/4uZXfjK` | Jun 27 | dup — LIVE **5825** |
| Loot Deals 24x7 | Syska 10000 mAh @ ₹799, `fkrt.co/l5KOxl` | Nov 16, 2023 | reject — OOS + ₹1,393 |

## The Bosch row — still a dup, and still not what its shortlink says

The one row that was new in `-e` has not moved. Re-checked against the live DB this tick rather than
carried:

```
id 10790 | bosch-302l-3-star-maxflex-convert-frost-free-triple-door-refrigerator-b0h9ff
status LIVE | price 28990 | productId B0H9FFQ1ZC
```

**The shortlink is not an identifier.** `link.amazon/B004UUJF7` carries an ASIN-shaped code that is
**not** the ASIN — the **eighth** confirmation of that pattern. Our row's real `productId` is
`B0H9FFQ1ZC`. Read the code as an ASIN and this dup would have looked like a new product.

**The channel figure is not the buybox price.** The post says `28720`, our row holds **₹28,990**, and
the post itself names the gap: "Flat 1750 off with any CC" is a card-issuer discount. Per
`channel-price-is-post-coupon.md` that strip is never taken as a buybox read, so this is not a
price-drift finding and the row was not re-priced off it.

## Client liveness — NOT proved on fresh evidence this tick

This has to be reported as a reversal rather than papered over.

The last four ticks each proved the webK socket live on evidence generated *since the previous
sweep*: `-c` on our own broadcast, `-d` on the RichDeals AFAST row at 03:19 AM, `-e` on Dealzone
advancing to 04:31 AM. **Every one of those proofs is now stale.** The RichDeals row still reads
03:19 AM; the Dealzone row still reads 04:31 AM. A row that stops moving stops being a proof.

A direct socket probe was run instead of reaching for a substitute row:

```
connection-status element : NONE (no "Connecting…"/"Updating…" banner rendered)
navigator.onLine          : true
telegram resource entries : 138
chat rows                 : 29
unread badges             : none
```

**That probe rules nothing out.** The connection-status selectors it used were never validated
against webK's real DOM, so a null match cannot distinguish "no disconnection banner rendered"
(healthy) from "wrong selector" (no information at all). `navigator.onLine` proves only that the OS
has a network interface, and the resource count is cumulative since page load, not recent traffic.
The block is recorded for completeness, not as evidence. It is **not** proof of delivery. Only
an inbound message that did not exist at the previous sweep proves delivery, and there is no such
message this tick.

**Honest verdict: the staleness hypothesis was neither confirmed nor rejected this tick.** The four
prior consecutive rejections stand on their own dates and do not carry forward. The non-source rows
present in this read (an iPhone-rates row, `Dhunu sonowal`, `Auto Request Accepter Bot`) were never
enumerated in `-e`'s thirteen-row table, so their presence here is not evidence of movement and is
not offered as one. Next tick re-tests.

## Freshness

**No push, so no IndexNow ping.** The ping covers a batch and there is no batch — the rule working,
not a skipped step. `/admin/deals/bulk` was not called, nothing entered the DB, the broadcast cursor
was not touched by us, and `data/tg-multi-seen.json` was not written (rot #45 — it drifts from the DB
in both directions; the Prisma check above is the real dedup).

## Credential handling

The Telegram service row (id `777000`) again surfaced a live login code in its sidebar preview.
Skipped as a non-source chat: not read for content, not acted on, not recorded anywhere — this report
included. **Fifteenth occurrence.** It is not in `data/tg-groups.json` and stays on the
permanent-skip list.

## CEO audit — every number re-measured this tick

| metric | value |
|---|---:|
| LIVE deals | **10,457** |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** (absent from `groupBy` = zero) |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | **1,626** |
| DB max deal id | **10,804** (`afast-clear-glass-tea-cup-set-of-6-100ml-b0gv3h`) |
| posts | 319 (0 coverless, 0 seo-less) |
| broadcast cursor `lastId` | **10,804 = DB max, caught up** |
| unpushed commits (before this report) | **0** |

**Clock is not skewed.** node `Date.now()` `2026-09-21T00:21:27.610Z` vs PG `now()`
`2026-09-21T00:21:27.647Z` — **37 ms** apart. Measured before any timestamp finding could be blamed
on an offset. Prior ticks read 44/45/46/45 ms, which is exactly why the number is re-taken rather
than carried.

**Posts per day, IST:** 09-15 `3` · 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` ·
09-21 **`1`**. Never 0, never over 4. `NOW` is **05:51 IST on 09-21**, so the current IST day is
~5.9 h old at 1 post — ahead of pace, not behind. 09-20 closing at **2** stays the only real soft
miss.

**The flat-₹ coupon gap is UNTESTED this tick.** Nothing published, so
`/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` was not exercised at all. It still cannot see
`[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. Calling it
"re-confirmed" on a tick that ran it zero times would be fabricated.

**#47 is now at FIVE consecutive zero-yield Telegram ticks.** Eight of thirteen rows are older than a
week (INDIAN CHEAP DEALS Aug 19, OMG LOOTDEALS Aug 14, NonStopDeals Jun 27, Loot Deals 24x7 **Nov 16
2023**, Hidden Loot Sep 9, IndiaFreeStuff Tips Wed, ONLINE SHOPPING DEALS Sun, Dealdost last night).
Loot Deals 24x7 has not posted in 22 months and is still swept every tick. Five ticks of zero is no
longer "overnight quiet" — it is the shape of the list. This feeds **owner decision #8** (prune the
dead and derivative groups, tighten the `want` filter, which currently also matches "SB Loots And
Deals Help Bot").

**Carried rot, unchanged:** **#48** `rogerkart.com/r/<code>` client-side Next.js redirect —
`url_effective` never moves. **#46** CoolzTricks nameless coupon claims. **#45**
`data/tg-multi-seen.json` drifts both ways. **#44** IFS Flipkart `?rto=` → 403, not re-triggered.
**#43** CLAUDE.md's "RSS (feedburner) first, homepage HTML fallback" against a feedburner feed
returning HTTP 000 and a homepage with no deal grid. Two implausible MRPs shipped by an earlier batch
(₹5,999 on a ₹1,495 stylus, ₹999 on a ₹199 peeler) served as read off `.basisPrice`; the
implausible-MRP guard is still unwritten. LIVE deal 10031 carries `productId` `ae27f94b3330`, a hex
hash. `ingest.config.json` `requestDelayMs: 1500` is inert **and below the 2.5 s floor**. ~200 scratch
files in `apps/api/scripts/` — owner decision #5.

Scratch hygiene clean — `apps/api/_tg0921h.cjs` created and removed in the same Bash call (**49th
clear**).
