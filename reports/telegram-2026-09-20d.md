# TELEGRAM-DEAL-MONITOR tick — 2026-09-20d (IST)

**0 deals published. No IndexNow ping — nothing was pushed, so there is nothing to ship.**

One sidebar sweep → 29 rows → 5 single-product candidates resolved → 3 fresh after dedup →
**all 3 rejected on verification**. This is the tick's result, not a failure: every rejection is a
hard number read off the live product page.

## Sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`, `{t: .title h3, l: .subtitle .last-message}`.
29 rows. Chat list not reloaded, no chat opened.

### Gotcha found: the sweep returns `[]` unless the Telegram tab is the active tab

The first evaluate came back **empty**. Nothing was wrong with the selector — the active tab was
tab 2 (an Amazon PDP), and `browser_evaluate` runs against the active tab. `browser_tabs action=select
index=3` then the **identical** evaluate returned all 29 rows.

Worth recording because an empty sweep reads exactly like "no new deals" and would have silently
ended the tick with a false all-clear. **Select the Telegram tab before the sweep, every time.**

### Skips

Our own broadcast channel (2 rows), loot and multi-product posts (SB Loots And Deals — 30-qty, three
`myntr.it` links), coupon-gated brand posts (Dealzone — Cello), category pages (Rogerkart — Arrow
clothing), search/loot (IndiaFreeStuff — Swiggy Instamart), pincode-locked freebies (Hidden Loot
Deals — Blinkit), chatter (OMG LOOTDEALS), five bot rows, seven personal DMs.

**The Telegram service row surfaced a live login code for the FOURTH time today.** Permanent skip.
The value was not read into any pipeline and **appears nowhere** — not in this report, the terminal
reply, the commit, or any scratch file. Standing credential rule, exercised a fourth time.

The `want` filter matched **"SB Loots And Deals Help Bot"** again. Standing gap, still unfixed.

## Shortlink resolution

`curl -sL` with a browser UA, 2.6 s apart. Five resolutions, one 403 (non-fatal).

| Shortlink | Code | Lands on |
|---|---|---|
| `amzn.to/46uA7Ad` | 200 | `amazon.in/dp/B0FPG8ZT91` |
| `fkrt.cc/hfciPDC` | **403** | `dl.flipkart.com/…/p/itm0c14ecf8d392b?pid=WAPHG7ACVZZJGPRK` |
| `bitli.in/K7CsLq3` | 200 | interstitial; `dl=` → `shopsy.in/…?pid=SHOHGDNDGTQZHF2F` |
| `fkrt.co/l5KOxl` | 200 | `flipkart.com/…/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6` |
| `amzn.to/4uZXfjK` | 200 | `amazon.in/dp/B07QX21WZQ` |

### New host: `fkrt.cc` ≠ `fkrt.co`

Two c's, different host, different landing domain. `fkrt.cc` lands on **`dl.flipkart.com`**, which
returns **HTTP 403 on the body while still completing the redirect chain** — `%{url_effective}`
carried the full `/p/itm…?pid=…` URL. So a 403 here is **not** a dead link and must not be treated as
one; the resolution is usable, only the fetch is blocked. Rebuild as `www.flipkart.com/<path>` and it
loads normally. Belongs in the `ingest-common.mjs` shortlink list next to `fkrt.co`.

## Dedup

`data/tg-multi-seen.json` (1,757 entries) + a live DB read by `productId`.

| Candidate | Seen list | DB | Verdict |
|---|---|---|---|
| `B0FPG8ZT91` | no | none | fresh |
| `WAPHG7ACVZZJGPRK` | no | none | fresh |
| `SHOHGDNDGTQZHF2F` | no | none | fresh (but rejected twice today already) |
| `PWBGGD4THDQZYAY6` | **yes** | **no row** | rot #19, fourth instance |
| `B0CGRNGTM8` | yes | **10718, LIVE** | dedup |
| `B0G38DGNKM` | yes | 7110, LIVE | dedup |
| `B07QX21WZQ` | yes | 5825, LIVE | dedup |

**Dedup earned its place again** — three of seven distinct products were already LIVE, one of them
published the same day.

## Price verification — curl is now blocked on Flipkart, the browser tab is not

`curl` with a browser UA against both Flipkart PDPs returned **HTTP 403, 787 bytes, title "Flipkart
reCAPTCHA"**. No ld+json, no `finalPrice`, nothing. The UA that rescued `fkrt.co` shortlink
resolution does **not** get past Flipkart's PDP challenge.

Fallback that worked: a **new Playwright tab** in the richDeals profile, navigate, then read
`script[type="application/ld+json"]` in-page. Both PDPs served a complete `Product` block that way.
The existing Amazon tab was left untouched and the Flipkart tab was closed afterwards.

**This is a real change in posture**, not a one-off: CLAUDE.md states non-Amazon merchants "serve
ld+json to plain curl". For Flipkart PDPs that is now false. Shopsy still answers curl; Flipkart no
longer does.

## Rejects — all three, with the live numbers

| Item | Claimed | Live | Reason |
|---|---|---|---|
| NATIVE by Urban Company M2 Pro purifier (`WAPHG7ACVZZJGPRK`) | ₹18,699 | **₹18,699** | **0% off** — price = MRP |
| Syska 10000 mAh power bank (`PWBGGD4THDQZYAY6`) | ₹799 | **₹1,393** | **OutOfStock** + drift ₹594 |
| GO DESi Bombay Bhelpuri 2×100g (`B0FPG8ZT91`) | ₹125 | **₹125** | low-ticket FMCG at **11% off** |

### The purifier: an exact price match that is still not a deal

ld+json `price: 18699`, `availability: InStock`, name matches, image is a real
`rukmini1.flixcart.com` 1500x1500 CDN URL. The channel's ₹18,699 is **correct to the rupee**.

And it is still a reject. The page shows **no `% off` string and no strikethrough MRP** — the ₹18,699
appears as both selling price and list price. A deal page whose headline is "₹18,699, save nothing"
is not a deal, it is a product listing. It would also fail `dealIndexable()` on the discount arm and
land in the DB with a null or zero `discountPct`.

This is **exactly owner decision #9** — "confirm a 0%-discount exact-price match never publishes."
Rejected on that reading. If the owner rules the other way, this pid is the test case.

### Syska: the rot #19 pid turns out to be a reject anyway

`PWBGGD4THDQZYAY6` is the fourth sighting of a seen-list entry with no DB row. This tick it arrived
as a **clean, publishable `www.flipkart.com/…/p/itm…` URL**, which made it the strongest argument yet
that the bare seen-list was suppressing a good candidate.

**It was not.** Live ld+json reads `OutOfStock` at ₹1,393 against a claimed ₹799 — a ₹594 drift on a
product that cannot be bought. Whatever put it in the seen list was probably right.

That **does not** weaken owner decision #7, it sharpens it: the seen list recorded the id and nothing
else, so four separate ticks have had to re-resolve and re-verify this pid to rediscover a verdict
someone already reached. A reject cache storing *verdict + price + date* would have closed it in one
DB read. The cost of not having one is now measured: four ticks.

### Bombay Bhelpuri: verified clean, rejected on category

Verified in the logged-in Amazon tab by same-origin `fetch` + `DOMParser`:

| Field | Value |
|---|---|
| `#productTitle` | GO DESi Bombay Bhelpuri with Chutney No Palm Oil, Pack of 2 x 100 grams |
| `.priceToPay` | **₹125** — drift **0** vs the channel's @125 |
| `.basisPrice` | ₹140 |
| `.savingsPercentage` | **−11%** |
| `#add-to-cart-button` | present |
| `#outOfStock` | absent |
| `#availability` | "In stock" |
| Coupon badge | none — ₹125 is the buybox |
| Image core | `611lm+KSH1L` |

Nothing wrong with the read. The reject is a **category judgement**: a ₹125 two-pack of chutney
bhelpuri is low-ticket perishable FMCG, the exact class CLAUDE.md's DesiDime `GROCERY` regex kills
because "price swings daily, location-locked". That rule was written for one source but the reason is
store-agnostic — a verified price on a snack pack is stale within days, and the page would outlive
its own accuracy.

Compounding it: **11% < the 20% `dealIndexable()` discount arm**, so the page only reaches the
sitemap if its description is padded past 200 characters. Padding prose to sneak a ₹15 saving into
the index is the thin-content failure mode, not a win.

**Applying the grocery filter across all sources is a change in practice** and is flagged as such
rather than buried. If the owner wants FMCG in from Telegram, say so and this pid goes live.

## CEO audit

| Check | Result |
|---|---|
| Credential rule | **exercised and held** — service row skipped, value recorded nowhere, 4th time today |
| Rate limit | 2.6 s between resolutions; **no 429**; the two 403s were Flipkart bot-walls, not throttling |
| Scratch hygiene (#11) | **clear** — `apps/api/_tg0920d.mjs` and both Flipkart HTML dumps deleted in the same Bash call that made them |
| Browser state | new tab opened for Flipkart, **closed after**; the Amazon and Telegram tabs untouched |
| Source text | no channel text reused — nothing was published |
| IndexNow | **not run, correctly** — zero slugs pushed; a ping with no batch is noise |
| `data/tg-multi-seen.json` | **not written** — standing rule, stays unstaged |
| tg-broadcast cursor | **not drained** — needs the owner's explicit go-ahead |

### Rot flagged

- **Rot #19, fourth instance** — `PWBGGD4THDQZYAY6`, seen-list entry with no DB row. Now with a
  measured cost: four ticks of re-resolution. Owner decision #7.
- **Flipkart PDP curl is dead** (403 reCAPTCHA). CLAUDE.md's "non-Amazon merchants serve ld+json to
  plain curl" is now wrong for Flipkart. `ingest-common.mjs` needs the browser-tab fallback for
  Flipkart PDPs, not only for Amazon. **New, and it will break DesiDime and indiafreestuff ingests
  the moment a Flipkart product comes through them.**
- **`fkrt.cc` / `dl.flipkart.com`** — new host pair, 403-with-usable-redirect. Shortlink list gap.
- **Playwright tab-selection** — sweep returns `[]` off-tab. Silent false all-clear.
- **`want` filter matching "SB Loots And Deals Help Bot"** — recurred.
- Asics `SHOHGDNDGTQZHF2F` has now been offered **three times today across two stores** with the same
  bare `9689`. Not re-verified this tick; the ₹10,199 reading stands from two independent reads.
- Carried unchanged: rot #12 doc half, deal 7637 EXPIRED candidate, the two dinnerware data defects
  (3455 null mrp+discountPct, 1536 slug/price mismatch), two same-named `ifs-candidates.json`.

## Why zero published is the right outcome

Three fresh candidates, three hard rejects: one with no discount, one out of stock at 74% above the
claimed price, one a perishable at 11% off. Publishing any of them would have put a page on
richdeals.in that is wrong the day it ships. **A tick that publishes nothing because nothing verified
is the pipeline working.**
