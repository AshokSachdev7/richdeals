# TELEGRAM-DEAL-MONITOR — tick `2026-09-22ap`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is
filtered out inside the page, before anything reaches this session.

**Result: 0 new pages + 1 in-place refresh. IndexNow 4/4 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 28 |
| rows belonging to the 13 tracked groups | 13 of 13 present |
| shortlinks worth resolving | 3 |
| single-product candidates after the skip rules | 3 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 0 new, 1 refresh-worthy |
| survived PDP price/stock verification | 1 — 0 new pages, 1 refresh |

## Published

None. No candidate this tick was a product the site did not already have a page for.

## Refreshed in place

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 4991 | Amazon | B0CRNPD5P8 | ₹13,399 (was ₹12,999) | 30,000 | 55% (was 57%) | `msi-pro-mp275q-27-inch-2k-wqhd-monitor` |

MSI PRO MP275Q, 27-inch 2K WQHD IPS, 100 Hz, built-in speakers. Sourced from SB Loots And Deals
via `https://amazn.lt/pSXsl3FO`, which resolved to `amazon.in/dp/B0CRNPD5P8` carrying a **foreign
affiliate tag, `tag=bhavesh015-21`** — stripped before anything else happened. The stored row
already held the correct `?tag=ashoksachdev-21` URL, so the script asserted on it rather than
rebuilding it.

The ASIN was **not** in `tg-multi-seen.json` but **was** in the live DB, as deal 4991 created
2026-08-07. That combination is the one that matters: a seen-file miss is not proof of freshness,
and the DB check is what stopped a duplicate page from being created under a second slug. The
legacy slug has no `-b0crnpd5p8` suffix because the row predates the current slug rule; it is
indexed, so it was preserved exactly.

**PDP read in the logged-in Amazon tab: ₹13,399.00, M.R.P. ₹30,000.00, In stock, coupon block
empty.** The stored price was ₹12,999. **The price moved UP ₹400** — this is the first refresh
this session where the site was quoting a number *lower* than reality, which is the worse
direction: a stale-high price loses a click, a stale-low price loses the buyer at checkout. A
`PriceHistory` row was written (the table held exactly one entry, `12999` at creation, and nothing
in the six weeks since). `discountPct` recomputed 57 → 55 from the live figures rather than left
to contradict the new price.

Three more defects on the same row, all fixed in the same write:

- **Description was 374 characters** — well under the 900-char pre-flight floor that every row
  written this month has had to clear. Replaced with a 1,724-char original write-up built from the
  PDP's five feature bullets and 30-row spec table (109 PPI against 82 at 1080p, 100 Hz vs the
  60 Hz norm at this price, 1 ms, FreeSync, 100% sRGB 10-bit, 300 nits, 1300:1, TÜV Rheinland
  Less Blue Light + Anti-Flicker, anti-glare, 100 mm VESA, HDMI 2.0b + DP 1.2a, 4.1 kg, 3-year
  warranty).
- **The image was `812eXt89ddL._SX679_.jpg`.** Same asset id as the PDP's `data-old-hires`, but the
  **`_SX679_` thumbnail variant** — the exact pattern the `THUMB = /_(SX\d+|SY\d+|SX\d+_SY\d+)_/`
  pre-flight gate rejects. Swapped to `812eXt89ddL._SL1500_.jpg`. Worth recording as a class of
  defect: a stored image can carry the *right* asset and still be the *wrong* file, so a host check
  alone passes it. Only the variant check catches it.
- `howTo` step 2 rewritten to state outright that the price rose from ₹12,999 and that the channel
  post circulated only the ₹30,000 M.R.P. with no selling price attached.

## Skipped, with reasons

- **Flipkart Syska 10000 mAh power bank (`PWBGGD4THDQZYAY6`), Loot Deals 24x7, shouted "Rs.799".**
  Already in `tg-multi-seen.json` from ticks `ac` / `af` / `al` / `an`, where it was recorded each
  time as a plain dedup kill. **This tick establishes the real reason, and it is stronger than
  dedup.** `fkrt.co/l5KOxl` resolved 200 (no reCAPTCHA this time — both behaviours are normal) to
  the PDP, carrying foreign freight `affid=adminpais&affExtParam1=EPTG2336913&affExtParam2=l5KOxl`.
  The page serves **no `Product` ld+json node at all** — every field read undefined. That absence
  is itself the signal: `body.innerText` reads `Out of stock` twice, `Notify Me`, no Add-to-Cart.
  The listing also reads `₹1,388 +₹29 Protect Promise Fee` against a `1,799` M.R.P., then
  `Buy at ₹1,318` after stacking ₹70 Flipkart Axis + ₹100 Mobikwik UPI + ₹70 Flipkart SBI.
  So the channel's ₹799 is wrong by ~74% against the list price, **and** the item is unbuyable.
  Two independent kills. The seen-file entry was right; the recorded reason was thin.
- **Amazon TrustBasket pots (`B07QX21WZQ`), NonStopDeals**, repeating its ₹151 claim against a ₹549
  PDP. Deal 5825, refreshed at `al` (desc 1,169, howTo 4, healthy). Not touched and **not
  re-pinged** — re-submitting an unchanged URL to IndexNow days apart is the spam pattern, and the
  penalty lands on the host, not the channel.
- Loot / multi-product / category / search posts across Dealdost, Rogerkart, IndiaFreeStuff,
  Hidden Loot, Deal Dibba, OMG LOOTDEALS and Dealzone — no single product.
- Untracked sidebar rows (our own RichDeals channel, bots, DMs) — not in `data/tg-groups.json`.

One key appended to `data/tg-multi-seen.json` — now **1,813** entries. Both kills were already in
the store; the one added is `B0CRNPD5P8`, which was **not** in the file and was caught by the live
DB instead. That gap is the point: the seen file only holds what a tick put there, so a product
ingested before it existed, or by another source, is invisible to it. The DB check is the real
dedup and the file is only a cheap first pass.

**A fourth channel-price category appeared this tick.** The three already on record were *right*,
*wrong*, and *post-coupon*. Syska adds *post-bank-offer*: `₹1,318` is a real number a buyer can
reach, but only by holding one of three specific cards, and it is not the list price. Ship the PDP
price; the offer belongs in `howTo`, never in `price`.

## Freshness

```
node scripts/indexnow-ping.mjs msi-pro-mp275q-27-inch-2k-wqhd-monitor
DONE: IndexNow -> HTTP 200 for 4 urls
```

1 slug + `/`, `/offers`, `/sitemap.xml` — the slugs+3 rule; the count is the receipt. No Bing
fallback needed. **`api.indexnow.org` has now resolved six ticks running** (`af`, `ai`, `ag`, `al`,
`an`, `ap`).

Live page verified after the write, 200 with matching Product JSON-LD:

- `/msi-pro-mp275q-27-inch-2k-wqhd-monitor` → `"price":"13399"`, image `812eXt89ddL._SL1500_.jpg`

Sitemap **9,909** `<loc>` entries — **unchanged from `ao`, which is the correct outcome.** A
refresh writes no new URL, so a sitemap that moved would have meant a duplicate page was created.
Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean:

- live deals **10,599**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- max deal id **10946**, tg-broadcast cursor `lastId 10946` — **equal, not drift**
- 7/7 prod endpoints 200, unpushed commits **0** before this tick's own commit

Rot, all flagged, none executed:

1. **NEW, and the biggest number in this file: the pre-flight gate was never applied
   retroactively.** Deal 4991 was not an unlucky row. Counted across all 10,599 LIVE deals this
   tick:

   | defect | rows | share |
   |---|---|---|
   | description under 900 chars | **10,500** | 99.1% |
   | thumbnail-variant image (`_SX…_` / `_SY…_`) | **1,305** | 12.3% |
   | empty `howTo` | **3,491** | 32.9% |
   | thin description *and* thumbnail image | **1,262** | 11.9% |

   Every row written since the gate exists clears it; almost nothing written before it does. This
   is the honest scale of the legacy backlog, and it is the strongest argument yet for the
   `geo-optimizer` bulk description pass that has been offered and not approved. Flagged only.
2. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *`
   losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
3. **41 live deals state a price in the title the row does not hold** — recounted this tick,
   split **19 written with `₹` + 22 written with `Rs.`**, union 41. Tick `an` recorded 43
   (19 + 24); two `Rs.` rows have since stopped mismatching. Recording the method as well as the
   number, because it has now been miscounted twice by other means: count each notation pattern
   independently and take the union of row ids — an else-if bucket undercounts, and a `₹`-only
   check sees 19 and reads the backlog as halved. Retitle pass not authorised.
4. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
5. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
6. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
7. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — on the EXPIRED
   path, not refreshed to a price nobody can pay.
8. **`api.indexnow.org` is intermittent, not dead — 200 six ticks running.** Keep the Bing GET
   fallback wired; do not rewrite the script around either assumption.
9. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens →
   delete + regenerate).
10. **Amazon.in sign-in state in the `richDeals` Playwright profile is flagged only, never fixed
    here** — logging in touches owner credentials.
11. **CLAUDE.md freshness rule #3 names the wrong file** — it says confirm `llms.txt` carries the
    batch, but `/llms.txt` is a hub surface and carries no deal URLs by design; `/llms-full.txt` is
    the deal-bearing one. Both 200, nothing broken, rule text points at a file that can never show
    the batch.

A tick that published nothing still moved a page off a six-week-stale price, off a thumbnail image
and off a 374-character description. The discovery feed found one product and the site already had
it — the value this tick produced came from checking what was already shipped, not from shipping
more.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
