# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (b)

## Sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` → **29 rows**, all **13** groups in
`data/tg-groups.json` present. Tab 3 (`web.telegram.org/a/`) selected first, so no repeat of the
wrong-current-tab 0-row failure.

The client is **not** stale — Dealzone, IndiaFreeStuff Tips and Hidden Loot all carry posts that
were not in the previous tick's sweep. The yield is genuinely low, not a dead session.

## Candidates → outcome

| source group | post | resolved | outcome |
|---|---|---|---|
| Dealzone | "Upto 77% Off On New Balance Shoes", Men + Women links | both → `amazon.in/s?k=shoes&rh=p_6…` | **reject** — `/s?` brand search, 2 links, not a product |
| CoolzTricks Official | "Apply 30% Off Coupon" + `amzn.to/4At7cdy` | `dp/B07Q2KXP74` | dup — LIVE deal **10789** (₹1,244) |
| Rogerkart Deals | Bosch 302L triple door fridge @ 28720 | `dp/B0H9FFQ1ZC` (HTML grep) | dup — LIVE deal **10790** (₹28,990) |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | `dp/B0G38DGNKM` | dup — LIVE deal **7110** (₹3,459) |
| NonStopDeals | body is the bare number "151" + `amzn.to/4uZXfjK` | `dp/B07QX21WZQ` | dup — LIVE deal **5825** (₹549) |
| ONLINE SHOPPING DEALS | Milton Prudent 500 Thermosteel 510 ml, ₹449 | `dp/B0F1T8N2VR` | dup — LIVE deal **10767** |
| Deal Dibba | "65 : `bitli.in/Ks4GgGy`" | Shopsy `pid=SJBH6WHEVM4QRYKV` | **reject** — ₹65 shilajit stamina supplement, quality |
| Loot Deals 24x7 | Syska 10000 mAh @ ₹799, `fkrt.co/l5KOxl` | Flipkart `pid=PWBGGD4THDQZYAY6` | **reject** — OutOfStock + ₹1,393 (carried) |
| Dealdost | Myntra "Loot : (Pack of 3) at 179" | — | reject — multi-pack loot |
| IndiaFreeStuff Tips | Swiggy Instamart `/search?query=NOICE` | — | reject — search URL, no product |
| Hidden Loot Deals | Blinkit "buy Baker's Loaf, get Cold Coffee free" | — | reject — store promo, no product URL |
| SB Loots And Deals | notification-settings instructions | — | reject — not a deal |
| OMG LOOTDEALS | "Video dekho paisa kamao" | — | reject — ad |

**Published: 0.** Every resolvable candidate is already LIVE in our DB; everything else fails the
single-product rule on its own terms.

## Dedup — verified against the live DB, not the seen file

```
B07QX21WZQ  5825/LIVE/549          B0F1T8N2VR  10767/LIVE/449
B0G38DGNKM  7110/LIVE/3459         B08ZC73Z2B  10787/LIVE/220
B07Q2KXP74  10789/LIVE/1244        SJBH6WHEVM4QRYKV  none
B0H9FFQ1ZC  10790/LIVE/28990       PWBGGD4THDQZYAY6  none
DB max deal id 10798
```

**6 of the 8 resolvable candidates were already ours — a 75% dup rate**, up from 50% on the
previous tick. Four of the six we published ourselves in the last 24 hours (10767, 10787, 10789,
10790); the channels are echoing inventory back at us.

## Freshness

**No push, so no IndexNow ping.** That is the rule working, not a skipped step — the ping exists to
cover a batch, and there is no batch. Nothing entered the DB, the broadcast cursor was not touched,
and `data/tg-multi-seen.json` was not written.

## CEO audit

**NEW — the "1,603 LIVE deals with no MRP" figure carried in the last three reports is wrong. The
real number is 1,626.** Verified directly: `mrp: null` on LIVE = **1,626**, `mrp: 0` = **0**, and
only **one** null-MRP row (10797, the Dyson) was touched in the last three hours — so no mass
mutation happened between the reports. The number was carried forward instead of re-measured. A
metric that gets copied between ticks without a fresh read is exactly the rot the CEO-audit rule
exists to catch, and this one was in our own reports. Every audit number below was re-measured this
tick.

**#48 re-confirmed, same mechanism.** `rogerkart.com/r/n9G2RZ9` returns HTTP 200 with
`url_effective` **unchanged** — a client-side Next.js redirect with no HTTP hop. Any resolver that
trusts `url_effective` silently drops every Rogerkart deal.

**Shortlink code ≠ ASIN, sixth confirmation.** `link.amazon/B05yvriRF` and `link.amazon/B00QC5bl7`
are both ASIN-shaped. Neither is an ASIN: the first resolves to `dp/B0G38DGNKM`, the second to an
`/s?` search page. The two New Balance links returned **HTTP 503** while still exposing the final
`/s?` URL — the 503 is Amazon throttling the search page, and the reject is decided by the URL
shape, not the status.

**#47 re-confirmed and widened.** ONLINE SHOPPING DEALS is still echoing our own inventory, and now
INDIAN CHEAP DEALS, NonStopDeals, CoolzTricks and Rogerkart did the same in one sweep. Owner
decision #8 should be read as *derivative*, not merely *dead*: five of the thirteen groups
contributed nothing but reruns this tick.

**#46 re-confirmed.** CoolzTricks again posted a nameless "Apply 30% Off Coupon" plus a shortlink.

**Bare-number posts, tally now 1 right / 5 wrong.** NonStopDeals posted "151" again against a
₹549 TrustBasket row. The number matches neither price, MRP nor discount.

**Quality reject, decision #11 exhibit again.** The same ₹65 Shopsy shilajit "extra power stamina"
capsule came back through `bitli.in`. The `GROCERY`/FMCG filter still runs on DesiDime only. Second
tick in a row this exact product has had to be rejected by hand.

**Credential handling.** The Telegram service row (id `777000`) again surfaced a live login code in
its sidebar preview. Skipped as a non-source chat, not read, not acted on, not recorded anywhere —
here included. **Eleventh occurrence**; that row stays on the permanent-skip list.

**Audit set, re-measured this tick:**

| metric | value |
|---|---:|
| LIVE deals | 10,451 |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | **1,626** |
| posts | 319 (0 coverless, 0 seo-less) |
| broadcast cursor `lastId` | 10798 = DB max, fully caught up |
| unpushed commits | 0 |

**Posts per day, IST:**

| 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 |
|------:|------:|------:|------:|------:|------:|------:|------:|------:|
| 4 | 4 | 3 | 3 | 3 | 3 | 3 | 2 | **1** |

Never 0, never over 4. **09-21 is still at 1** — two short days back to back if the remaining
CONTENT-SEO ticks do not carry it to 3.

**Carried rot, unchanged:**

- The **flat-₹ coupon gap** is still the top open item — `/(\d+)% ?(?:off )?[Cc]oupon/` cannot see
  `[Apply ₹1500 Coupon]`. Needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm in `ingest-common.mjs`.
  Not exercised this tick (nothing published), so it is untested, not fixed.
- **#45** `data/tg-multi-seen.json` drifts both ways — `PWBGGD4THDQZYAY6` and
  `SJBH6WHEVM4QRYKV` are in the seen file with no DB row. The Prisma check is the real dedup.
- **#44** IFS Flipkart `?rto=` → 403. **#43** CLAUDE.md's "homepage HTML fallback" for a homepage
  with no deal grid. Neither re-triggered here.
- Source RSS feedburner HTTP 000 while CLAUDE.md says "RSS first".
- LIVE deal 10031 carries `productId` `ae27f94b3330`, a hex hash.
- ~200 scratch files in `apps/api/scripts/` — owner decision #5.

Scratch hygiene clean — `apps/api/_tg0921c.cjs`, `_tg0921d.cjs` and `_tg0921e.cjs` each created and
removed in the same Bash call (36th, 37th and 38th).
