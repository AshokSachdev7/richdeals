# TELEGRAM-DEAL-MONITOR tick — 2026-09-19 (L)

Yield: **0 deals pushed.** One genuinely new candidate, verified in stock at exactly the posted
price, and **rejected on value** — ₹220 against a ₹225 MRP is **-2%**, not a deal.

But the tick is not empty. Two of the three ASINs it verified turned out to be **LIVE rows on
our own site quoting prices that no longer exist**, both of them quoting *too low*. Both were
corrected inline, IndexNow **HTTP 200 for 5 URLs**. The interesting find is *why* one of them
was wrong — see "The ₹2550 that was never a price".

Funnel: 25 sidebar rows → 4 new candidates → 2 rejected on URL shape → 1 fresh, 2 dups →
3 verified → 0 published, 2 stale rows repaired.

## Sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` → **25 rows** covering the 13 groups in `data/tg-groups.json`.
No chat opened, no reload.

`browser_tabs {action:'select', index:0}` ran **before** the sweep, per the trap logged at
09-19j — the browser was parked on tab 3 (Amazon PDP) exactly as predicted. The discipline held
and the first evaluate returned all 25 rows instead of `[]`.

Tab map this session: 0 = ONLINE SHOPPING DEALS, 1 = Dealzone, 2 = ONLINE SHOPPING DEALS,
3 = Amazon PDP (the verification tab).

## Candidates and shortlink resolution

Four rows had changed enough to be worth a resolve. curl, browser UA, 1 s apart:

| Group | Post | Shortlink | Resolves to | Verdict |
|---|---|---|---|---|
| ONLINE SHOPPING DEALS | NIVEA MEN Deep Impact Smooth Shaving Foam 200ml, "Deal Price : ₹220" | `link.amazon/B0fzyVxCa` | 200 → `/dp/B07D9LMCC7` (tag `vivek123034-21`) | **new, verified, rejected on value** |
| CoolzTricks Official | "Milk Peda Sweets, 150 gm @137" | `amzn.to/4yP7Mkf` | 200 → `/dp/B0F3NHYBKV` (tag `collab-amafhh-21`) | dup #1609 — **stale, repaired** |
| Dealdost | Havells 750W Mixer Grinder 3 Jars "at 2550*" | `amzn.to/4xzbZre` | 200 → `/dp/B0FNM7XWFD` (tag `7383-21`) | dup #2569 — **stale, repaired** |
| SB Loots And Deals | Tata Tea Gold, MRP 560 | `fkrt.it/DxgfAwuuuN` | 200 → `flipkart.com/flipkart/p/item?pid=TEAFGPRQHGKWH9JN&…&affid=inf_…` | rejected on URL shape |
| Dealzone | "Apply Coupon On Gardening Accessories… Surf All Pages" | `link.amazon/B09d9inHl` | 503 → `amazon.in/s?k=Ocean+Mart&…` (tag `glitzdeal05-21`) | rejected, `/s?` (rot #13) |

**Tata Tea rejected on the path, not the price.** `/flipkart/p/item?pid=…` is the generic
tracking-landing form, not `/p/itm…` — the same class as the `/desidime/p/desidime_deals`
reject CLAUDE.md already names. Flipkart 403s curl (rot #14) so there was no ld+json path to
fall back to either; the reject stands on shape alone and cost one request.

**Dealzone is the second distinct `/s?` sample this week** (09-19j's was `B0fYFLAAS`). The
503 on the final hop is irrelevant — the resolved URL was readable and is a storefront search,
so the reject is on the URL shape, not the status code.

`7383-21` is a **fourth distinct source tag** on these channels, after `collab-amafhh-21`,
`vivek123034-21` and `bhavesh015-21`. Noted, stripped, not acted on.

## Dedup — control probe behaved

```
DB (all statuses)   B07D9LMCC7  ABSENT
                    B0F3NHYBKV  DUP #1609 LIVE ₹90/null   2026-07-22
                    B0FNM7XWFD  DUP #2569 LIVE ₹2999/6290 2026-07-23
                    ZZZZFAKE123 ABSENT  ← control
seen cache          all four false  (1754-entry flat array, exact Set.has)
```

The DB query ran across **all statuses**, not LIVE only. The seen cache agreed with the DB on
the one fresh ASIN and **disagreed on both dups** — it had never heard of either. That is rot
#15 demonstrated again rather than asserted: `tg-multi-seen.json` is not a dedup authority, and
a tick that trusted it would have re-published two products we already sell.

## Verification — logged-in Amazon tab

One batched `browser_evaluate`, same-origin `fetch(url,{credentials:'include'})` + `DOMParser`,
~900 ms apart. All three HTTP 200, all three in stock.

| ASIN | Title | Live ₹ | MRP | Save | Cart | `#outOfStock` |
|---|---|---|---|---|---|---|
| B07D9LMCC7 | NIVEA MEN Deep Impact Smooth Shaving Foam, 200ml | **220** | ₹225 | **-2%** | true | absent |
| B0FNM7XWFD | Havells Prisma 750 W 3 Jar Mixer Grinder (Black) | **3,540** | ₹6,290 | -44% | true | absent |
| B0F3NHYBKV | GO DESi Milk Peda — 150 g \| 66% Khoa | **137** | ₹150 | -9% | true | absent |

## Decision on the one fresh candidate — rejected

B07D9LMCC7 is the cleanest signal a Telegram post has produced all day: the post said ₹220, the
buybox says ₹220, **zero drift**, in stock, real CDN image available. It still does not ship.

₹220 off a ₹225 MRP is **-2% — ₹5**. It clears `dealIndexable` only on the ≥200-character
description arm, never on the ≥20% discount arm, which means the page would enter the sitemap
purely on the strength of copy we wrote about a ₹5 saving. The ingest tick ~an hour ago rejected
**B0CP2FLKRY** on that same "-2%" reasoning, and the value bar cannot mean one thing at 14:00
and another at 15:00.

**This is owner decision #9's live test case, and it is now answered by precedent rather than
still open in the abstract:** a verified exact-price match at a trivial discount does *not*
publish. Price accuracy is a floor, not the bar.

## Nothing pushed — so what the freshness rule applies to

No `/admin/deals/bulk` call. No new slugs. **The per-batch IndexNow ping for new deals was not
run, because there was no batch** — stated rather than omitted, since a missing ping line and a
skipped ping read identically.

The ping that *did* run covers the two pages this tick changed, which is the same rule applied
to edits instead of inserts:

```
node apps/api/scripts/indexnow-ping.mjs havells-prisma-...-m7xwfd milk-peda-sweets-150-gm-137-B0F3NH
DONE: IndexNow -> HTTP 200 for 5 urls
```

HTTP 200 first call, no 422, Bing GET fallback not needed. 5 URLs = 2 changed pages + the
script's three defaults (`/`, `/offers`, `/sitemap.xml`). Both pages verified serving on prod:

```
200 0.403819  /havells-prisma-750-w-3-jar-mixer-grinder-3-m7xwfd
200 0.192223  /milk-peda-sweets-150-gm-137-B0F3NH
```

No deploy — DB-only change, and deal pages read the managed DB through the prod API.

## Fixed inline — two LIVE rows were lying about price

### The ₹2550 that was never a price (deal #2569)

This ASIN has now been hit by **three pipelines in about two hours**, and each one read a
different number:

| Source | Number | What it actually is |
|---|---|---|
| Our DB row #2569 | ₹2,999 | stale, from 2026-07-23 |
| The ingest tick, from indiafreestuff | ₹2,550 | — |
| This Telegram post (Dealdost) | "at 2550\*" | — |
| **Amazon buybox, verified now** | **₹3,540** | the price a buyer pays |

The asterisk is explained in the Dealdost post itself: *"Apply ₹490 Coupon + ₹500 Off With
SBI/ICICI/HDFC/Axis CC"*. 3540 − 490 − 500 = **2550**. So ₹2,550 is a post-coupon,
post-bank-offer number, not a buybox price — and the PDP currently shows **no coupon badge at
all**, so even that path is not live right now.

**This corrects the ingest tick's own record.** `deal-ingest-2026-09-19f.md` logged #2569 as
"source now ₹2550" in its stale-price table, treating it as the true current price. It was not.
The real drift on #2569 is **₹2,999 → ₹3,540, upward** — our page was under-quoting by ₹541,
which is the worse direction to be wrong in: a shopper clicks through expecting less and finds
more. Corrected:

```
#2569  price 2999 → 3540 · mrp 6290 · discountPct 44 · stays LIVE
```

-44% is a genuine deal at the real price, so the row keeps its place.

**The general lesson, worth more than the row:** deal-channel prices are routinely
net-of-coupon and net-of-bank-offer, and the buybox is the only number we can honour. Any
verifier that compares a posted price against the buybox and rejects on drift will reject
*legitimate* coupon deals for the wrong reason, and — worse — a verifier that trusted the
post would publish a price no buyer can get. Both failure modes are the same root cause.

### The sixth stale row, and it is junk (deal #1609)

`milk-peda-sweets-150-gm-137-B0F3NH` — ₹90 stored, ₹137 live, `mrp` null since July. Under-
quoting by ₹47 on a perishable food item.

The slug alone is a catalogue of defects: **uppercase characters**, a **truncated ASIN**
(`B0F3NH`, six chars of ten), and **the price baked into the slug** — a slug that goes stale by
construction, which is exactly what happened. At the corrected numbers it is a **-9%** deal on
sweets, below our own value bar and the same class of item the DesiDime `GROCERY` filter exists
to keep out.

Corrected and delisted:

```
#1609  price 90 → 137 · mrp null → 150 · discountPct 9 · status LIVE → EXPIRED
```

EXPIRED is the documented junk path, not a deletion: the page **stays live with its banner**,
drops out of the sitemap and goes noindex, and the change is reversible. It is now honest about
its price whichever way the owner rules on it.

This is the **sixth** confirmed stale LIVE row on record (#10582, #10084, #2569, #6930, #6387,
#1609) and the first to show the re-verify sweep must also fix **junk slugs and null MRP**, not
just the `price` column.

## Skipped, with reason

| Group / row | Reason |
|---|---|
| Deal Dibba | "Loot : boAt Calling Smartwatches from ₹999", 3 links — multi-product |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart **search** URL |
| Hidden Loot Deals & Offers | Blinkit Baker's Loaf freebie, no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" — ad |
| RichDeals | our own channel |
| iPhone-rates channel (`𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦`) | not in `data/tg-groups.json` |
| 6 DMs + 3 bots | not deal sources |

### Unchanged rejects and dups carried forward

| Group | Link | Status |
|---|---|---|
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | unresolvable (rot #5) |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` | dup, deal #7110 |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` Syska | drift + out of stock |
| NonStopDeals | `amzn.to/4uZXfjK` → B07QX21WZQ | dup, deal #5825 |

Previews byte-identical to last tick's; not re-resolved, nothing spent on them.

## Credential-handling note — twelfth consecutive tick

The Telegram service chat row again surfaced a live login code in its last-message preview. The
value was **not echoed** into this report, the terminal reply, the commit, or any scratch file,
and was not acted on. That row is on the permanent-skip list and is never treated as a deal
source. Twelve ticks, zero recordings.

## Prod endpoints — 7/7 200

```
200 0.291454  /
200 0.108353  /offers
200 0.557128  /blog
200 0.345504  /sitemap.xml
200 0.122513  /feed.xml
200 0.138231  /api/deals
200 0.365961  /llms.txt
```

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10304** (was 10305) · PENDING_REVIEW **0** · EXPIRED **259** (was 258) |
| LIVE null price / null image | **0 / 0** |
| DB max deal | **10651** LIVE ₹199 — matches prod `/api/deals?limit=1` exactly |
| Posts/day IST (7d) | 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · 09-19:2 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4, no zero day |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| Ingest pace | 222 / 24 h · 949 / 7 d ≈ **136/day** — flat on 09-19d |
| tg-broadcast cursor | 10482 vs 10651 — **drift 169**, unchanged (rot #4) |
| Unpushed commits before this tick | 0 |

**The −1 / +1 is this tick's own delist, and nothing else moved.** LIVE 10305 → 10304 and
EXPIRED 258 → 259 account for each other exactly: #1609 crossed from one bucket to the other.
No third number changed, so no other pipeline inserted or expired anything in the window.
Called out because a −1 on LIVE with no matching +1 would be a deletion, which is a different
and much worse event.

The cursor drift **did not grow** this hour for the first time in days — because this tick
pushed nothing. Rot #4 only accrues on pushes; a zero-yield tick freezes it rather than
improving it.

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row.

Null price / null image is 0/0 for the **sixth** consecutive tick.

## Rot standing — 28 items

Reconfirmed with fresh evidence this tick: **#3** (tracking landings — the Flipkart
`/flipkart/p/item` form), **#5** (`rogerkart.com/r/` unresolvable), **#13** (`/s?` trap, second
distinct sample this week), **#14** (Flipkart 403s curl, so shape was the only available test),
**#15** (seen cache missed both dups the DB caught), **#19** (no reject memory — Dealzone and
Rogerkart resolved again for the Nth time), **#20** (stale groups), **#21** (`link.amazon`
9-char codes), **#22** (now **six** stale LIVE rows).

**#22 grew in kind, not just in count.** Every prior instance was a stale `price`. #1609 adds
null `mrp` and a structurally broken slug, and #2569 adds a *cause* we had not identified:
coupon-inclusive source prices being recorded as buybox prices. The re-verify sweep can no
longer be scoped to one column.

**#4** frozen at 169. **#12** stays half-fixed.

**Nothing new rotted.** One item was corrected rather than opened: the ingest tick's ₹2550
reading on #2569 was a misread of a coupon price, now fixed in the DB and in the record.

## Open owner decisions — 10, with one effectively answered

**#9 — confirm a 0%-discount exact-price match never publishes** — got its live test case and
was **decided by precedent**: B07D9LMCC7 verified perfectly and was rejected at -2%. Ready to
be closed on the owner's word.

**#6 — periodic re-verify sweep over old LIVE rows** is now the one with the most evidence
behind it: six stale rows, two of them found by a Telegram tick that was not even looking for
them, and #1609 proves the sweep must repair slugs and MRP, not just prices. Two of the six
were under-quoting, which is the direction that costs trust at the click-through.

**#7 — persist a reject cache (rot #19)** stays top of the list on frequency.

**#8 — prune dead Telegram groups** — 4 of 13 groups produced a resolvable link this tick,
which is the best ratio in days, so the case for pruning weakened slightly rather than grew.
