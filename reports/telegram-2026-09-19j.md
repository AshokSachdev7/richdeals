# TELEGRAM-DEAL-MONITOR tick — 2026-09-19 (j)

Yield: **1 deal pushed LIVE** (#10630), IndexNow **HTTP 200 for 4 URLs**. First non-zero
Telegram tick today after a run of dup-or-dead sweeps.

Funnel: 25 sidebar rows → 1 genuinely new candidate → fresh on both caches → verified in
stock at a real price → pushed.

## Sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` → **25 rows** covering the 13 groups in `data/tg-groups.json`.
No chat was opened, no reload needed.

**A trap worth writing down before it costs another tick:** the first sidebar evaluate
returned `[]`. Nothing was wrong with the selector — the active Playwright tab was tab 3, an
Amazon PDP left parked there by the previous tick, and `.chat-list .ListItem.Chat` matches
nothing on amazon.in. `browser_tabs {action:'select', index:0}` then returned all 25 rows
from the same expression. The Amazon tab is *always* where a tick leaves the browser, so
**selecting the Telegram tab must come before the sidebar sweep**, every time. An empty
array here reads exactly like "no groups have posted", which is the dangerous part.

Tab map this session: 0 = Telegram (ONLINE SHOPPING DEALS), 1 = Telegram (Dealzone),
2 = Telegram (ONLINE SHOPPING DEALS), 3 = Amazon PDP.

## The one new candidate

| Group | Post | Shortlink | Resolves to |
|---|---|---|---|
| SB Loots And Deals | Crompton Laser Ray Neo 20W LED Batten (Warm White), MRP 4600 | `amzn.lt/uQVjbPeW` | `/dp/B09NKBV5XQ?th=1&tag=bhavesh015-21` |

Source tag `bhavesh015-21` — the **third distinct source tag** seen on these channels, after
`collab-amafhh-21` (CoolzTricks) and `vivek123034-21` (the `link.amazon` channels). Noted,
stripped, not acted on.

This row was a notification-settings meta post last tick; it is a real single-product deal
this tick, so it was evaluated rather than skipped.

**Correcting my own count mid-tick:** the terminal line during the sweep said *two* rows had
changed and both were being resolved. That was wrong on one of them. The Dealdost shortlink
`bitli.in/YJLzp2n` is **byte-identical** to the one 09-19i already resolved and rejected —
only the preview text around it changed — and re-resolving it confirmed the same Meesho
landing. So this tick had **one** new candidate, not two. Recorded because a miscount in the
direction of "more candidates" is how a reject cache gets bypassed.

**Dedup — clean on both sides, with a control probe:**

```
DB   B09NKBV5XQ  ABSENT     ZZZZFAKE123 ABSENT (control behaved)
seen B09NKBV5XQ  false      ZZZZFAKE123 false  (1754-entry flat array, exact Set.has)
```

The DB query ran across **all statuses**, not LIVE only — the cross-status form is what
caught `B07S4S69T3` as EXPIRED in this morning's ingest tick.

## Verification — logged-in Amazon tab

Same-origin `fetch(url, {credentials:'include'})` + `DOMParser`. Buybox signals only:

```
title    Crompton Laser Ray Neo 20W LED Batten (Warm White) - Pack of 8
price    1,066        .priceToPay .a-price-whole
mrp      ₹4,600       .basisPrice .a-offscreen
savings  -77%         .savingsPercentage
cart     true         #add-to-cart-button present
#outOfStock absent · #availability "In stock"
image    https://m.media-amazon.com/images/I/81-e3jseNIL._SX679_.jpg
```

**No drift check was possible, and that is stated rather than papered over.** The SB Loots
preview carried only the MRP (`MRP - 4600`) and the buy link — the post's own price was below
the preview truncation. So there is no posted price to compare against; the deal was published
at the **verified** ₹1,066, which is the number the buybox serves right now. The MRP the source
did quote matches the PDP's `.basisPrice` exactly at ₹4,600, which is at least a consistency
signal on the listing.

The pack size is the whole deal: **Pack of 8** at ₹1,066 is ~₹133 per batten. On a single-unit
variant that price would be unremarkable, so the variant is called out explicitly in the copy
and in step 1 of the how-to — Amazon flips the default variant on this ASIN.

**Image** came back as a `._SX679_` thumbnail and was upgraded to `._SL1500_`, then **fetched
to prove the upgrade exists** rather than assumed:

```
200 163450 B  81-e3jseNIL._SL1500_.jpg
```

## Pushed

`POST /admin/deals/bulk` → **HTTP 201, count 1**, `created: true`, `status: LIVE`.

```
10630  ₹1066  -77%  crompton-laser-ray-neo-20w-led-batten-warm-white-pack-of-8-b09nkbv5xq
```

Title, description and how-to written for this row — not the Telegram post's text and not
Amazon's bullet copy. Description is **794 characters**, well past the 200-char arm of
`dealIndexable`, and 77% clears the 20% discount arm too, so the page enters the sitemap
rather than the `notValuable` pile.

Affiliate URL is the clean `https://www.amazon.in/dp/B09NKBV5XQ?tag=ashoksachdev-21` — the
source's `bhavesh015-21` tag and the `th=1` variant pin both dropped.

## Freshness — IndexNow

```
node apps/api/scripts/indexnow-ping.mjs crompton-laser-ray-neo-...-b09nkbv5xq
DONE: IndexNow -> HTTP 200 for 4 urls
```

**HTTP 200** first call, no 422, so the Bing GET fallback was not needed. 4 URLs = the deal
page plus the script's three defaults (`/`, `/offers`, `/sitemap.xml`).

Verified on prod rather than trusted — the submitted URL actually serves:

```
200 0.387786  /crompton-laser-ray-neo-20w-led-batten-warm-white-pack-of-8-b09nkbv5xq
```

No deploy: new deal pages read through the prod API off the managed DB, so they serve
immediately without a rebuild.

## Skipped, with reason

| Group / row | Reason |
|---|---|
| Deal Dibba | "Loot : boAt Calling Smartwatches from ₹999", 3 links — multi-product |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart **search** URL |
| Hidden Loot Deals & Offers | Blinkit basket freebie, no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" ad |
| RichDeals | our own channel |
| iPhone-rates channel (`𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦`) | not in `data/tg-groups.json` |
| 6 DMs + 3 bots | not deal sources |

### Unchanged rejects and dups carried from 09-19i

| Group | Link | Status |
|---|---|---|
| Dealzone | `link.amazon/B0fYFLAAS` | Amazon `/s?` search page (rot #13) |
| Dealdost | `bitli.in/YJLzp2n` | Meesho, 403s curl, unverifiable (rot #18) |
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | unresolvable (rot #5) |
| CoolzTricks Official | `amzn.to/4yQn4VY` → B0B94RNTXP | Bata heel, **out of stock**, rejected last tick |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` | Syska power bank — drift ₹594 + OOS |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` → B0G38DGNKM | dup, deal #7110 LIVE ₹3459 |
| NonStopDeals | `amzn.to/4uZXfjK` → B07QX21WZQ | dup, deal #5825 LIVE ₹549 |
| ONLINE SHOPPING DEALS | Aqueria sunscreen → B0HGBNK6VM | dup, deal #10526 LIVE ₹199 |

Only the Dealdost link was re-resolved, and only because its surrounding preview text had
changed enough to look like a new post. It was not. The other six previews are identical
strings to last tick's and were not spent on.

## Credential-handling note — tenth consecutive tick

The Telegram service chat row again surfaced a live login code in its last-message preview.
The value was **not echoed** into this report, the terminal reply, the commit, or any scratch
file, and was not acted on. That row stays on the permanent-skip list and is never treated as
a deal source.

## Prod endpoints — all 200

```
200 0.251522  /
200 0.131994  /offers
200 0.453232  /blog
200 0.328101  /sitemap.xml
200 0.094959  /feed.xml
200 0.163287  /api/deals
200 0.296231  /llms.txt
```

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10284** (was 10283) · PENDING_REVIEW 0 · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** — the new row kept it that way |
| DB max deal | **10630** LIVE ₹1066, the Crompton batten — matches this push exactly |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4, no zero day in the window |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10630 — **drift now 148**, up from 147 (rot #4) |
| Unpushed commits before this tick | 0 |

PENDING_REVIEW is 0 by absence from `groupBy`, not by a zero row.

**The cursor drift grew by exactly this deal.** #10630 is live on the site and will be in the
sitemap within the ISR window, and it will not reach the Telegram channel until tg-broadcast
runs again. Rot #4 keeps accruing one deal at a time rather than sitting still.

## Rot standing — 28 items

Reconfirmed with fresh evidence: **#5** (`rogerkart.com/r/` unresolvable), **#13** (`/s?`
trap, Dealzone), **#18** (Meesho unverifiable, Dealdost), **#19** (one re-resolve spent on a
link a reject cache had already answered), **#20** (stale groups — 24 of 25 previews unchanged
again), **#21** (`link.amazon` 9-char codes). **#4** drift 147 → 148. **#12** stays half-fixed.

**Nothing new rotted.** One operational lesson banked rather than opened as rot: the
tab-selection trap above. It is a procedure fix, not a code defect — the sweep expression
itself is correct.

## Open owner decisions — unchanged at 10

**#7 — persist a reject cache (rot #19)** stays top of the list. **#8** — prune the dead
Telegram groups — gained weight again: 12 of 13 groups produced nothing new, and the single
yield came from a group that was posting meta chatter an hour ago.
