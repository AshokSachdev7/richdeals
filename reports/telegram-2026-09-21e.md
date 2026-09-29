# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (e)

## Sweep

Tab 3 (`web.telegram.org/a/`) was confirmed current by a `browser_tabs list` before the read, so the
documented wrong-current-tab failure (`browser_evaluate` runs on the *current* tab; fired from the
Amazon tab it returns **0 rows** and reads as a dead sidebar) was ruled out by measurement rather
than by assumption. No `browser_tabs select` was needed.

One `browser_evaluate` over `.chat-list .ListItem.Chat`, reading each row's `a[href]` (the chat id)
plus its `innerText` → **29 rows**, all **13** groups from `data/tg-groups.json` present.

**Published: 0.** One row moved since tick `-d`; it resolved to a deal we already carry.

| source group | last message | time | disposition |
|---|---|---:|---|
| **Dealzone** | **Bosch 302L 3-Star MaxFlex triple door fridge @ 28720, `link.amazon/B004UUJF7`** | **04:31 AM** | **NEW row — dup, LIVE 10790** |
| SB Loots And Deals | "Missed Some Loots" notification instructions | 01:33 AM | reject — not a deal |
| Rogerkart Deals | Bosch 302L triple door fridge @ 28720 | 00:10 AM | dup — LIVE **10790** |
| Deal Dibba | "65 : `bitli.in/Ks4GgGy`" | 00:07 AM | reject — ₹65 Shopsy shilajit |
| CoolzTricks Official | "Apply 30% Off Coupon" + `amzn.to/4At7cdy` | 00:05 AM | dup — LIVE **10789** |
| Dealdost | Myntra "Loot : (Pack of 3) at 179" | 10:20 PM | reject — multi-pack loot |
| ONLINE SHOPPING DEALS | Milton Prudent 500 Thermosteel 510 ml | Sun | dup — LIVE **10767** |
| IndiaFreeStuff Tips | Swiggy Instamart `/search?query=NOICE` | Wed | reject — search URL |
| Hidden Loot Deals | Blinkit Baker's Loaf + free Cold Coffee | Sep 9 | reject — store promo |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | Aug 19 | dup — LIVE **7110** |
| OMG LOOTDEALS | "Video dekho paisa kamao" | Aug 14 | reject — ad |
| NonStopDeals | bare number "151" + `amzn.to/4uZXfjK` | Jun 27 | dup — LIVE **5825** |
| Loot Deals 24x7 | Syska 10000 mAh @ ₹799, `fkrt.co/l5KOxl` | Nov 2023 | reject — OOS + ₹1,393 |

## The one new candidate — deduped against the DB, not against a file

Dealzone's 04:31 AM post is the **same Bosch 302L MaxFlex triple-door refrigerator** Rogerkart Deals
posted at 00:10 AM, down to the same `28720` figure and the same "Flat 1750 off with any CC" rider.
It was checked against the live DB this tick rather than carried from the report that first
dispositioned the Rogerkart copy:

```
id 10790 | bosch-302l-3-star-maxflex-convert-frost-free-triple-door-refrigerator-b0h9ff
status LIVE | price 28990 | productId B0H9FFQ1ZC | createdAt 2026-09-20T19:39:45.777Z
```

Still LIVE, so still a dup. Nothing to resolve, verify, push or ping.

**The shortlink was not trusted as an identifier.** `link.amazon/B004UUJF7` carries an ASIN-shaped
code that is **not** the ASIN — seventh confirmation of that pattern. Our row's real `productId` is
`B0H9FFQ1ZC`. Had the code been read as an ASIN, this dup would have looked like a new product.

**The channel price is not the buybox price.** The post says `28720`; our row holds **₹28,990**, and
the post itself explains the gap — "Flat 1750 off with any CC" is a card-issuer discount, not the
listed price. Per `channel-price-is-post-coupon.md` that strip is never taken as a buybox read, so
this is not a price-drift finding and the row was not re-priced off it.

**Crossposting is #47 evidence, not new inventory.** Two of thirteen groups posted the identical
deal roughly four hours apart, and the earlier of the two was already ours before either posted. The
list is derivative in the literal sense: the same upstream deal arriving twice.

## Client liveness — proved on new evidence, not on the old proof

Tick `-d` proved liveness from the RichDeals row carrying our own AFAST broadcast at 03:19 AM. That
row still reads the same message, so it is now **stale evidence and was not reused**.

**Fresh proof: Dealzone's row advanced to 04:31 AM, an inbound message that did not exist during the
`-d` sweep.** A socket that delivered a new third-party message between the two ticks is live. The
quiet elsewhere is therefore real source quiet, not a dead client — the fourth consecutive tick on
which the staleness hypothesis has been tested and rejected.

## Freshness

**No push, so no IndexNow ping.** The ping covers a batch and there is no batch. `/admin/deals/bulk`
was not called, nothing entered the DB, the broadcast cursor was not touched by us, and
`data/tg-multi-seen.json` was not written (rot #45 — the Prisma check above is the real dedup).

## Credential handling

The Telegram service row (id `777000`) again surfaced a live login code in its sidebar preview.
Skipped as a non-source chat: not read for content, not acted on, not recorded anywhere — this
report included. **Fourteenth occurrence.** It is not in `data/tg-groups.json` and stays on the
permanent-skip list.

## CEO audit — every number re-measured this tick

| metric | value |
|---|---:|
| LIVE deals | **10,457** (= API `total`) |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** (absent from `groupBy` = zero) |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | **1,626** |
| DB max deal id | **10,804** |
| posts | 319 (0 coverless, 0 seo-less) |
| broadcast cursor `lastId` | **10,804 = DB max, caught up** |
| sitemap locs | **9,761** (unchanged — nothing pushed) |
| unpushed commits (before this report) | **0** |

**Posts per day, IST:** 09-15 `3` · 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` ·
09-21 **`1`**. Never 0, never over 4. Node `Date.now()` is `2026-09-20T23:31:54.418Z` = **05:01 IST
on 09-21**, so the current IST day is five hours old at 1 post — inside the rule, and the remaining
CONTENT-SEO ticks carry it to 3. 09-20 closing at **2** stays the only real soft miss.

**The flat-₹ coupon gap is UNTESTED this tick.** Nothing published, so
`/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` was not exercised at all. It still cannot see
`[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. Calling it
"re-confirmed" on a tick that ran it zero times would be fabricated.

**Carried rot, unchanged:** **#48** `rogerkart.com/r/<code>` client-side Next.js redirect —
`url_effective` never moves; still that row's last message. **#47** Telegram sources derivative
*and* dormant — four straight ticks at zero, eight of thirteen rows older than a week, Loot Deals
24x7 silent since Nov 2023, and now the same deal arriving twice in one night. **#46** CoolzTricks
nameless coupon claims. **#45** `data/tg-multi-seen.json` drifts both ways. **#44** IFS Flipkart
`?rto=` → 403, not re-triggered. **#43** CLAUDE.md's "homepage HTML fallback" against a homepage
with no deal grid, and "RSS first" against a feedburner feed returning HTTP 000. Two implausible
MRPs from the last DEAL-INGEST batch (₹5,999 on a ₹1,495 stylus, ₹999 on a ₹199 peeler) shipped as
served; the implausible-MRP guard is still unwritten. LIVE deal 10031 carries `productId`
`ae27f94b3330`, a hex hash. ~200 scratch files in `apps/api/scripts/` — owner decision #5.

Scratch hygiene clean — `apps/api/_tg0921g.cjs` created and removed in the same Bash call
(**47th clear**).
