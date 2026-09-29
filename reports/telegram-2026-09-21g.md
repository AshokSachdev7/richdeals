# TELEGRAM-DEAL-MONITOR tick — richdeals.in — 2026-09-21 (g)

**Published: 1.** First non-zero Telegram tick since `-a`.

## Sweep — and a correction to the two previous reports

`browser_tabs list` ran before the read. It returned **tab 3 as `RichDeals` (`#-1003701105393`)**, not the
bare `Telegram` at `/a/` that `-f` L10 records, and **tab 4 (the Amazon PDP) held `(current)`**. A
`browser_tabs select` to 3 **was** required for the sidebar sweep, and a second `select` back to 4 was
required for the PDP verification later in the tick.

That directly contradicts a line carried in **both** `-e` L8 and `-f` L8 — *"No `browser_tabs select` was
needed."* Those statements were true of those ticks and were never true as a standing fact. The tab
assumption has now failed in **both** directions in a single session: once with the Amazon tab current when
the sidebar was wanted, once with the Telegram tab current when the PDP was wanted. The rule going forward
is unconditional: **`browser_tabs list` before every `browser_evaluate`, and expect a `select` either way.**
Tab titles are also not stable identifiers — tab 3's title changed between ticks.

Tab inventory as measured: 0 `ONLINE SHOPPING DEALS🇮🇳` `#-1001940328982` · 1 `Dealzone`
`#-1003222915238` · 2 a Flipkart by-pid resolver left from an earlier window · 3 `RichDeals`
`#-1003701105393` · 4 an Amazon PDP.

One `browser_evaluate` over `.chat-list .ListItem.Chat` → **29 rows**, all **13** groups from
`data/tg-groups.json` present.

## The candidate — one product, two channels, one ASIN

SB Loots And Deals and CoolzTricks Official both posted the same NIVEA body lotion 45 minutes apart, under
different shortlink hosts and different foreign affiliate tags. Neither shortlink code was read as an
identifier; both were resolved with redirects **off**, 2 s apart, browser UA:

```
== https://amazn.lt/nbt2vBVu
HTTP/1.1 301 Moved Permanently
Location: https://amazon.in/dp/B099NNW9LL?th=1&psc=1&tag=bhavesh015-21
== https://amzn.to/4hjm4Cu
HTTP/1.1 301 Moved Permanently
Location: https://www.amazon.in/dp/B099NNW9LL?psc=1&th=1&tag=collab-amafhh-21
```

Zero 403/429 on either. **Same ASIN `B099NNW9LL` from both.** This is the **ninth** confirmation that a
shortlink code is not an ASIN — `nbt2vBVu` and `4hjm4Cu` are neither. `-f` L44-46 recorded the eighth
(`link.amazon/B004UUJF7` against the real `B0H9FFQ1ZC`), `-e` L45-47 the seventh.

**Two new foreign Amazon tags for the strip list:** `bhavesh015-21` (SB Loots, via `amazn.lt`) and
`collab-amafhh-21` (CoolzTricks, via `amzn.to`). Existing known tags: `dealhind-21` (IFS),
`desidime01-21` (DesiDime).

**Host normalization matters here.** `amazn.lt` emits a bare `https://amazon.in/...`; `amzn.to` emits
`https://www.amazon.in/...`. Normalized to `www.amazon.in` before anything downstream compared them.

Telegram shortlinks answered **301**; IFS `?rto=` answers **302**. Both are read off the `Location` header
with `-L` deliberately absent.

## Dedup — two dimensions, because one is not enough

`Deal.productId` is not unique and **can be null**, so an ASIN-only pass can silently miss a product we
already carry. Both passes ran against the live DB, not against `data/tg-multi-seen.json`:

```
HITS 0                                   (productId = 'B099NNW9LL')
NIVEA_LIVE 20                            (title contains 'Nivea' AND status LIVE, take:20)
```

None of the 20 LIVE Nivea rows is a Shea Smooth 600ml. Clear on both passes.

**The name pass paid for itself immediately — it exposed three `productId` shape anomalies in LIVE:**

| deal | `productId` | shape |
|---:|---|---|
| 2549 | `null` | no id at all (`nivea-aloe-hydrating-body-lotion-spf15-400ml`, price 200) |
| 2904 | `MSCHDXPDR7BKCF3Y` | 16-char Flipkart-style id (`nivea-body-milk-lotion-625ml-hyaluron-almond-oil`, price 63) |
| 10031 | `ae27f94b3330` | hex hash (carried, also at `-f` L144) |

**A null `productId` on a LIVE row defeats ASIN dedup forever** — that row can never match any future
ASIN probe, so the same product can be re-ingested indefinitely. A null-`productId` guard at push time is a
CEO-audit finding, not a Telegram-tick fix; it belongs to SEO-AUDIT-FIX.

## Price verification — and a carried accusation that measurement retired

The channel figures were CoolzTricks `59% Off … 600ml @314` and SB Loots `MRP - 759`. Per
`channel-price-is-post-coupon.md` neither is a buybox read, so the PDP was fetched same-origin in the
logged-in Amazon tab (tab 4, reached via an explicit `browser_tabs select`):

```json
{
  "http": 200,
  "title": "NIVEA Shea Smooth Body Lotion | Hyaluronic Acid & Shea Butter & Deep Nourish Serum Moisturizer | Lightweight Non-Greasy Body Cream | Body Moisturiser for 72H Hydration for Dry Skin | - 600ml",
  "price": "314",
  "mrp": "759",
  "atc": true,
  "oos": false,
  "img": "https://m.media-amazon.com/images/I/41GifLbPkvL._SL1000_.jpg"
}
```

**Both channel figures were correct.** An objection had been carried into this tick that CoolzTricks' claim
was arithmetically inconsistent — "759 × 0.41 ≈ ₹311.19, not ₹314, therefore rot #46". That computation was
inverted. The discount is **(759 − 314) / 759 = 58.63%**, which rounds to the **59%** the channel printed.
The PDP returned exactly `314` / `759`. **Rot #46 does not apply to this row and must not be re-flagged
against it.** Had the arithmetic been trusted over the PDP, a correct deal would have been rejected — which
is the whole reason the rule is "verify on the PDP", not "verify by ratio".

The rule itself is undamaged. A channel price agreeing with the PDP is a corroboration, not a licence to
trust the strip next time.

**Stock is unambiguous:** `atc:true` + `oos:false`. (The ambiguous shape is `atc:false` + `oos:false`,
which is a reject.)

**No clip-coupon claim on this PDP.** The coupon grep returned only `couponsInBuybox_feature_div` JS
scaffolding, no rendered coupon text — re-confirming that the Amazon clip-coupon widget is unreadable from
fetched HTML. There is therefore no coupon claim to word as claimed-but-unverified.

**Image is a real marketplace CDN URL** (`m.media-amazon.com`), taken from `data-old-hires`, not from any
channel or aggregator host.

**`dealIndexable` checked before the push, on two independent arms:** discount 58.6% ≥ 20%, and a 537-char
description ≥ 200. Price non-null, image non-null, status not EXPIRED, age 0 ≤ 120 days.

**Title carries no ₹ glyph**, so the `title-rupee-vs-price.md` title-vs-price diff is vacuously satisfied.

## Push

Affiliate URL rebuilt clean — both foreign tags stripped, plus `th=1` and `psc=1`:
`https://www.amazon.in/dp/B099NNW9LL?tag=ashoksachdev-21`. Slug follows the convention
`<hyphenated-name>-<first 6 of ASIN, lowercased>`.

```
{"count":1,"results":[{"slug":"nivea-shea-smooth-body-lotion-600ml-b099nn","created":true,"ok":true}]}
```

`count` **and** `results[]` both read — a 201 can hide an `ok:false` row. `created:true`, `ok:true`, no
`error` key.

## Freshness — the ping, run late and reported as run late

```
DONE: IndexNow -> HTTP 200 for 4 urls
```

**HTTP 200.** URL count **4 = 1 slug + 3 auto-appended** (`/`, `/offers`, `/sitemap.xml`), which is the
documented slug-mode behaviour and matches exactly — no slug dropped, none duplicated.

Reported honestly: **the ping did not run in the same window as the push.** Between the push and this ping
the deal was live in the DB and unannounced — the exact state CLAUDE.md names: *"A batch that skipped the
ping is not shipped, it is just sitting in the DB."* It is shipped now. No 422, so the Bing GET fallback
did not fire; per `indexnow-2026-09-21b.md` L75-76 that fallback does not exist in the script and would
have had to be issued by hand.

`data/tg-multi-seen.json` was **not** written (rot #45 — it drifts from the DB in both directions; the
Prisma passes above are the real dedup). The broadcast cursor was not touched by us.

## Credential handling

The Telegram service row (id `777000`) again surfaced a live login code in its sidebar preview. Skipped as a
non-source chat: not read for content, not acted on, not recorded anywhere — this report included.
**Sixteenth occurrence.** It is not in `data/tg-groups.json` and stays on the permanent-skip list.

## Client liveness — proved on fresh evidence, closing `-f`'s open question

`-f` L80 ended: *"Honest verdict: the staleness hypothesis was neither confirmed nor rejected this tick."*
**That is now closed, by measurement rather than by argument.** Three rows carry timestamps that did not
exist at the `-f` sweep:

| row | at `-f` | this tick |
|---|---|---|
| SB Loots And Deals | 01:33 AM | **08:19 AM** |
| CoolzTricks Official | 00:05 AM | **07:34 AM** |
| RichDeals | — | **06:54 AM** |

Inbound third-party messages that did not exist at the previous sweep are the only thing that proves
delivery, and there are two of them plus our own broadcast. The socket is live; the quiet on the other
eleven rows is real source quiet.

**This proof is good for exactly one tick.** `-f` L58-60 is the precedent: every prior liveness proof went
stale the moment its row stopped moving. Do not reuse this one next tick.

The RichDeals row at 06:54 AM carries deal **10807**, and the broadcast cursor `lastId` read **10807** —
our own pipeline confirmed end to end. It is not a source row and was not dispositioned as one.

## CEO audit

| metric | value | note |
|---|---:|---|
| LIVE deals | 10,460 | read 02:48 UTC / 08:18 IST, **before** this push — now 10,461 |
| EXPIRED | 259 | |
| PENDING_REVIEW | 0 | absent from `groupBy` = zero |
| LIVE null price | 0 | |
| LIVE null image | 0 | |
| LIVE no MRP | 1,626 | owner decision #6 |
| DB max deal id | 10,807 | pre-push; the Nivea row is now max |
| posts | 319 (0 coverless, 0 seo-less) | |
| PPD IST | 09-15 `3` · 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` · 09-21 **`1`** | |
| broadcast cursor `lastId` | 10,807 = DB max at read | now trails by one — normal external-cron lag |
| unpushed commits | 0 | |
| node-vs-PG skew | **360 ms** | |

**The cursor trailing DB max after this push is not rot.** `tg-broadcast-cursor-selfheals.md`: the external
cron closes that gap on its next run. Flagging it would be flagging the cron working.

**Skew wanders, it does not trend.** 44 / 45 / 46 / 45 → 37 (`-f` L115-118) → **604** (`indexnow-2026-09-21b.md`
L124-126, a 16x jump) → **360** ms here. Re-take every tick; never carry the number.

**CONTENT-SEO is owed.** 09-21 stands at **1** post against a target of 2-3 (cap 4). Not a violation — the
rule is "never 0" — but the day does not reach 3 on its own. `indexnow-2026-09-21b.md` L33-35 independently
recorded zero posts in a rolling 6 h window.

**The flat-₹ coupon arm is still UNTESTED.** This tick published a deal with no coupon, so
`/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` was not exercised at all. It still cannot see
`[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. Calling it re-confirmed on
a tick that ran it zero times would be fabricated. Third consecutive report saying so (`-e` L102-105,
`-f` L125-128).

### New findings, all DB-measured, all routed to SEO-AUDIT-FIX

**Slug-embedded stale prices — a class, not an incident.** Legacy slugs bake a price into a permanent URL,
and the row has since moved:

| deal | slug says | row price |
|---:|---|---:|
| 1545 | `63-off-nivea-watermelon-lip-balm-**89**-B00K2T` | 141 |
| 1630 | `58-off-nivea-shower-gel-250ml-pack-of-3-**330**-B07PC4` | 578 |
| 3 | `nivea-lip-care-…-rs-**108**-amazon` | 132 |
| 2211 | `nivea-soft-light-moisturizer-300-ml-…-rs-**219**-amazon` | 323 |
| 2364 | `nivea-bath-care-lemon-and-oil-shower-gel-250ml-**rs-150**` | 150 (agrees today) |

Same family as "deal 1536 slug says ₹299, row says ₹499" and memory `title-rupee-vs-price.md`. **Fix is
redirects, never renames** — the hard rule is that expired deal pages stay live and never 404, and a rename
breaks every inbound link and every already-submitted IndexNow URL.

**Mixed-case slug suffixes in production.** `-B09Y5B`, `-B085LZ`, `-B00K2T`, `-B07PC4`, `-B00XRJ` against
the documented lowercase convention (this tick's own push used `-b099nn`). Canonical and URL-casing hazard.

## #47 — the streak breaks, the diagnosis does not

`-f` L130 recorded **"#47 is now at FIVE consecutive zero-yield Telegram ticks"**. That number is sourced
from the report file, not from memory. **This tick publishes one, so the streak ends at five.**

The underlying finding stands and is not withdrawn. The list is still derivative and still half-dormant:
the one product published arrived in **two** channels 45 minutes apart with two different foreign tags —
the same upstream deal twice, not two deals. Eight of thirteen rows remain older than a week. Loot Deals
24x7 has not posted since **Nov 16, 2023** — 22 months — and is swept every single tick. One publish out of
thirteen groups does not make the list healthy; it makes **owner decision #8** (prune the dead and
derivative groups, tighten the `want` filter, which also matches "SB Loots And Deals Help Bot") more worth
acting on, not less.

**Carried rot, unchanged:** **#48** `rogerkart.com/r/<code>` client-side Next.js redirect — `url_effective`
never moves. **#46** CoolzTricks nameless coupon claims — **stands on its earlier instances only, retired
against this row**. **#45** `data/tg-multi-seen.json` drifts both ways. **#44** IFS Flipkart `?rto=` → 403,
not re-triggered. **#43** CLAUDE.md's "RSS (feedburner) first" against a feed returning HTTP 000.
**Doc rot:** CLAUDE.md says IndexNow is pinged to "api.indexnow.org + Bing" — the shipped script contacts
only api.indexnow.org; and CLAUDE.md still documents EarnKaro for Flipkart, superseded by Cuelinks. Two
implausible MRPs shipped by an earlier batch (₹5,999 on a ₹1,495 stylus, ₹999 on a ₹199 peeler); the
implausible-MRP guard is still unwritten. `ingest.config.json` `requestDelayMs: 1500` is inert **and below
the 2.5 s floor**. ~200 scratch files in `apps/api/scripts/` — owner decision #5.

## Process slip, self-reported

The push payload heredoc was written to `/tmp/_nivea.json` instead of the session scratchpad. It was created
and `rm -f`'d inside the same Bash call so nothing leaked and nothing was left behind, but the standing rule
is **scratchpad, not `/tmp`** — a `/tmp` wipe is a previously recorded failure. Next payload uses `$S`.

Scratch hygiene otherwise clean — `apps/api/_tg0921i.cjs` created and removed in the same Bash call
(**52nd clear**).
