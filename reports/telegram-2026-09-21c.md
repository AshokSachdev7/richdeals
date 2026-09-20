# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (c)

## Sweep

`browser_tabs list` first — tab 3 (`web.telegram.org/a/`) was already current, so the known
wrong-current-tab 0-row failure was pre-empted without a select call. Then one `browser_evaluate`
over `.chat-list .ListItem.Chat` → **29 rows**, all **13** groups in `data/tg-groups.json` present.

**The sweep is byte-identical to the previous tick's.** Every group's last message is one already
dispositioned in `reports/telegram-2026-09-21b.md`. **Published: 0. Zero new candidates**, so
nothing to resolve, dedup, verify, push or ping.

## Is the client stale? — settled on evidence, not assumed

A byte-identical sidebar has two explanations and only one of them is benign, so it was tested
rather than assumed. The previous tick's claim ("the client is **not** stale") rested on three
groups carrying posts absent from the prior sweep — that evidence does **not** exist this tick, so
repeating the claim would have been exactly the carried-metric rot this session has already had to
correct twice.

First probe was **inconclusive**: `#MiddleColumn .ChatInfo .status`, `.connection-state-wrapper` and
`.title .LastMessageMeta .time` all returned empty strings. Those selectors do not exist in this
webK build. `navigator.onLine` true and `document.hidden` false prove the tab is alive, not that the
socket is delivering.

Second probe found the real selector. The row timestamp is a **bare `.time`** inside the row, and
row `innerText` carries it directly:

| row | last message | time |
|---|---|---:|
| RichDeals (our own broadcast channel) | Acer 15 Smartchoice, Ryzen 3-7320U | **01:39 AM** |
| SB Loots And Deals | "Missed Some Loots" notification instructions | 01:33 AM |
| Dealzone | New Balance `/s?` pair | 01:09 AM |
| Rogerkart Deals | Bosch 302L fridge | 00:10 AM |
| Deal Dibba | `bitli.in/Ks4GgGy` | 00:07 AM |
| CoolzTricks Official | "Apply 30% Off Coupon" | 00:05 AM |
| Dealdost | Myntra pack-of-3 loot | 10:20 PM |

**The client is live.** The decisive row is our own **RichDeals channel at 01:39 AM IST** — that is
the tg-broadcast cron pushing the Acer row from the 01:29 IST DEAL-INGEST batch, and the webK client
received and rendered it. A socket that delivered a message 20 minutes ago is not stale.

So the identical sidebar means what it looks like: **no source group has posted since 01:33 AM**,
and the newest of those (SB Loots, 01:33) is notification instructions, not a deal. At ~02:00 IST
that matches CLAUDE.md's documented overnight yield of ~1 unique/15 min, which rounds to zero on a
single tick. Genuinely quiet, not disconnected.

Worth keeping: **the sidebar row timestamp is `.time`, and reading the row's `innerText` returns
`title | time | preview` in one string** — cheaper and more robust than guessing a child selector,
and it turns "is the client stale" from a guess into a one-call check.

## Freshness

**No push, so no IndexNow ping.** That is the rule working, not a skipped step — the ping covers a
batch and there is no batch. Nothing entered the DB, `/admin/deals/bulk` was not called, the
broadcast cursor was not touched, and `data/tg-multi-seen.json` was not written.

## Credential handling

The Telegram service row (id `777000`) again surfaced a live login code in its sidebar preview.
Skipped as a non-source chat: not read, not acted on, not recorded anywhere — here included.
**Twelfth occurrence.** That row stays on the permanent-skip list.

## CEO audit

**Correction to the previous SITEMON report — the sitemap `+8` attribution was premature.** That
report credited its own +8 loc delta (9,739 → 9,747) to the DEAL-INGEST batch pushed an hour
earlier. It could not have been: the sitemap is ISR `revalidate = 1800`, so that read came off a
cache generated **before** the push. This window's read is **9,755**, bytes 2,122,586 → 2,124,208
(+1,622 ≈ 200/loc × 8), and all eight IFS slugs now grep to exactly one `<loc>` each. *This* +8 is
that batch. The data was never wrong; the attribution was. **Never credit a sitemap delta to a batch
pushed minutes earlier without grepping the slugs.**

**The "second short IST blog day running" soft flag is WITHDRAWN.** It appears in three reports
(indexnow, sitemon, telegram-b). UTC 20:28 is **01:58 IST**, so the IST day 09-21 was two hours old
with 1 post already published — ahead of pace, not behind it. The flag was UTC-shaped thinking about
an IST day that had barely started. 09-20 closing at 2 stands as the only real soft miss.

**Two anomalies raised in the SITEMON window were resolved against the DB, not reported as rot:**

- *"`createdAt` is being rewritten on existing rows"* — **disproved.** `CREATED_1H = 10` did not
  contradict an unchanged `DBMAX 10798`. "Created in the last hour" is not "created since the last
  tick"; the previous tick ran less than an hour after the 19:59 UTC push, so the same ten rows were
  already inside its window. Both readings are consistent.
- *Clock skew* — **ruled out directly.** node `Date.now()` = `2026-09-20T20:28:24.703Z`, PG `now()` =
  `2026-09-20T20:28:24.982Z`. They agree. Compare the two before ever blaming an offset artifact.

Also confirmed again: the single non-new row touched in the hour was **6399** (`c 08-15`,
`u 20:26`) — `updatedAt` churn is the click counter, benign, documented, never re-flagged.

**Carried rot, unchanged:**

- **The flat-₹ coupon gap is still the top open item.** `/(\d+)% ?(?:off )?[Cc]oupon/` cannot see
  `[Apply ₹1500 Coupon]`. Needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm in `ingest-common.mjs`.
  Nothing published this tick, so it is untested, not fixed.
- **#48** `rogerkart.com/r/<code>` is a client-side Next.js redirect; `url_effective` never changes.
  Its post is still the Rogerkart row's last message.
- **#47** Derivative Telegram sources — five of thirteen groups contributed nothing but reruns last
  tick, 75% dup rate on resolvable candidates. Owner decision #8 should read *derivative*, not
  merely *dead*.
- **#46** CoolzTricks nameless coupon claims — still that row's last message.
- **#45** `data/tg-multi-seen.json` drifts from the DB in both directions. The Prisma check is the
  real dedup.
- **#44** IFS Flipkart `?rto=` → 403. **#43** CLAUDE.md's "homepage HTML fallback" against a
  homepage with no deal grid.
- Source RSS feedburner HTTP 000 while CLAUDE.md says "RSS first".
- LIVE deal 10031 carries `productId` `ae27f94b3330`, a hex hash.
- ~200 scratch files in `apps/api/scripts/` — owner decision #5.

**Audit set (read this window, not carried):**

| metric | value |
|---|---:|
| LIVE deals | 10,451 |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | **1,626** |
| posts | 319 (0 coverless, 0 seo-less) |
| broadcast cursor `lastId` | 10798 = DB max, caught up |
| sitemap locs | 9,755 |
| unpushed commits | 0 |

Scratch hygiene clean — no script was created this tick; the Prisma pull `apps/api/_sm0921c.cjs`
was created and removed in the same Bash call during the preceding SITEMON window (40th clear).
