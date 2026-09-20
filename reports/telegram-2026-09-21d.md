# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (d)

## Sweep

Tab 3 (`web.telegram.org/a/`) was already current — the preceding DEAL-INGEST window ended with a
`browser_tabs select index:3`, so the documented wrong-current-tab failure (`browser_evaluate` runs
on the current tab; from the Amazon tab it returns **0 rows** and reads as a dead sidebar) was
pre-empted without a select call this tick.

One `browser_evaluate` over `.chat-list .ListItem.Chat`, reading each row's `a[href]` (the chat id)
plus its `innerText` → **29 rows**, all **13** groups in `data/tg-groups.json` present.

**Published: 0. Zero new candidates.** Every source group's last message is one already
dispositioned in `reports/telegram-2026-09-21b.md`, so nothing was resolved, deduped, verified,
pushed or pinged.

| source group | last message | time | already dispositioned as |
|---|---|---:|---|
| SB Loots And Deals | "Missed Some Loots" notification instructions | 01:33 AM | reject — not a deal |
| Dealzone | New Balance men + women `link.amazon` pair | 01:09 AM | reject — `/s?` brand search |
| Rogerkart Deals | Bosch 302L triple door fridge @ 28720 | 00:10 AM | dup — LIVE **10790** |
| Deal Dibba | "65 : `bitli.in/Ks4GgGy`" | 00:07 AM | reject — ₹65 Shopsy shilajit |
| CoolzTricks Official | "Apply 30% Off Coupon" + `amzn.to/4At7cdy` | 00:05 AM | dup — LIVE **10789** |
| Dealdost | Myntra "Loot : (Pack of 3) at 179" | 10:20 PM | reject — multi-pack loot |
| ONLINE SHOPPING DEALS | Milton Prudent 500 Thermosteel 510 ml, ₹449 | Sun | dup — LIVE **10767** |
| IndiaFreeStuff Tips | Swiggy Instamart `/search?query=NOICE` | Wed | reject — search URL |
| Hidden Loot Deals | Blinkit Baker's Loaf + free Cold Coffee | Sep 9 | reject — store promo |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | Aug 19 | dup — LIVE **7110** |
| OMG LOOTDEALS | "Video dekho paisa kamao" | Aug 14 | reject — ad |
| NonStopDeals | bare number "151" + `amzn.to/4uZXfjK` | Jun 27 | dup — LIVE **5825** |
| Loot Deals 24x7 | Syska 10000 mAh @ ₹799, `fkrt.co/l5KOxl` | Nov 2023 | reject — OOS + ₹1,393 |

The five dup `productId`s were re-checked against the live DB this tick rather than carried from the
report that first found them — `B07QX21WZQ` → 5825/LIVE, `B0F1T8N2VR` → 10767/LIVE, `B0G38DGNKM` →
7110/LIVE, `B07Q2KXP74` → 10789/LIVE, `B0H9FFQ1ZC` → 10790/LIVE. All still LIVE, so all still dups.

## Client liveness — settled in the same call, on new evidence

The sidebar being unchanged on the source side has two explanations and only one is benign, so it is
tested every tick instead of assumed. The previous tick's proof (our RichDeals row at 01:39 AM
carrying the Acer broadcast) is now stale and was **not** reused.

**Fresh proof: the RichDeals row reads `AFAST Clear Glass Tea and Coffee Cups, Set of 6 (100ml),
Deal Price: ₹812 ₹2,436, 67% OFF` at 03:19 AM.** That is deal **10804**, the last row of the
DEAL-INGEST batch pushed minutes earlier this window, broadcast by the tg-broadcast cron and
rendered by this webK client. A socket that delivered our own newest deal is not stale.

So the quiet is real: **no source group has posted since 01:33 AM**, and that newest post is
notification instructions, not a deal. At ~03:20 IST that is exactly CLAUDE.md's documented
overnight yield of ~1 unique/15 min, which rounds to zero on a single tick.

## Freshness

**No push, so no IndexNow ping.** The ping covers a batch and there is no batch — the rule working,
not a skipped step. Nothing entered the DB, `/admin/deals/bulk` was not called, the broadcast cursor
was not touched by us, and `data/tg-multi-seen.json` was not written.

## Credential handling

The Telegram service row (id `777000`) again surfaced a live login code in its sidebar preview.
Skipped as a non-source chat: not read, not acted on, not recorded anywhere — here included.
**Thirteenth occurrence.** It is not in `data/tg-groups.json` and stays on the permanent-skip list.

## CEO audit

**The DEAL-INGEST batch is confirmed in the sitemap — and this time the attribution was grepped, not
assumed.** Locs **9,755 → 9,761 (+6)**, bytes 2,124,208 → 2,125,404. Three of the six slugs were
grepped individually (`kingone-…-b09kgv`, `afast-…-b0gv3h`, `waterproof-…-b0hb5l`) and each returns
exactly **one** `<loc>`. The ISR `revalidate = 1800` window has rolled over, so the +6 is that batch
rather than a cache artifact. This is the correction from `telegram-2026-09-21c.md` being applied
instead of restated.

**The broadcast cursor self-healed, as predicted.** Last tick it read `lastId` 10798 against DB max
10804 and was called "mid-catch-up, not drift". It now reads **10804 = DB max**. The external cron
closed the gap on its own; the gap was never rot.

**The flat-₹ coupon gap is UNTESTED again, not fixed and not freshly confirmed.** Nothing published
this tick, so `/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` was not exercised at all. It
still cannot see `[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm.
Reporting it as "re-confirmed" would be fabricated.

**#47 hardening, worth the owner's attention before decision #8.** Across the last three Telegram
ticks the thirteen groups have produced **zero** publishable deals. Eight of the thirteen rows are
older than a week (INDIAN CHEAP DEALS Aug 19, OMG LOOTDEALS Aug 14, NonStopDeals Jun 27, Loot Deals
24x7 **Nov 2023**, Hidden Loot Sep 9, IndiaFreeStuff Tips Wed, ONLINE SHOPPING DEALS Sun). Every
resolvable candidate the active five produced was already ours. The list is not just derivative, it
is largely **dormant** — Loot Deals 24x7 has not posted in 22 months and is still being swept every
tick.

**Carried rot, unchanged:** **#48** `rogerkart.com/r/<code>` client-side Next.js redirect —
`url_effective` never moves; its post is still that row's last message. **#46** CoolzTricks nameless
coupon claims, still that row's last message. **#45** `data/tg-multi-seen.json` drifts from the DB in
both directions; the Prisma check is the real dedup. **#44** IFS Flipkart `?rto=` → 403, not
re-triggered. **#43** CLAUDE.md's "homepage HTML fallback" against a homepage with no deal grid, and
"RSS first" against a feedburner feed returning HTTP 000. Two implausible MRPs shipped by the
previous batch (₹5,999 on a ₹1,495 stylus, ₹999 on a ₹199 peeler) — read off `.basisPrice`, served
as-is, and the implausible-MRP guard is still unwritten. LIVE deal 10031 carries `productId`
`ae27f94b3330`, a hex hash. ~200 scratch files in `apps/api/scripts/` — owner decision #5.

**Audit set — re-measured this tick, nothing carried:**

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
| broadcast cursor `lastId` | **10804 = DB max, caught up** |
| sitemap locs | **9,761** (+6) |
| unpushed commits (before this report) | 0 |

**Posts per day, IST:** 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` · 09-21 **`1`**.
Never 0, never over 4. The IST day 09-21 is now ~3.5 h old at 1 post — still ahead of pace, not
behind; 09-20 closing at 2 remains the only real soft miss.

Scratch hygiene clean — `apps/api/_tg0921f.cjs` created and removed in the same Bash call (**44th
clear**). The sitemap fetch went to a temp file outside the repo and was removed in the same call.
