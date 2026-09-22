# TELEGRAM-DEAL-MONITOR tick 2026-09-22n

**Run:** 2026-09-22 09:51 IST · richdeals.in · inline (not subagent)
**Result:** 0 published, 1 rot fix (#6063 ₹1,469 → ₹1,489), IndexNow HTTP 200 / 4 urls, 4 dedup'd, 1 rejected on stock depth, 1 shortlink unresolvable.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, ~1k tokens, no chat switching. All 13 roster groups from `data/tg-groups.json`.

| # | Group | Newest post | Disposition |
|---|---|---|---|
| 1 | SB Loots And Deals | Aarika Women's Fawn Woolen Sweater, MRP 1249, `amzn.lt/yhN2k7fA` | **unresolvable — `amzn.lt` DNS dead** |
| 2 | Dealzone | Duracell Ultra Alkaline AA ×6 @ 141, `link.amazon/B03ZAPOWj` | candidate → rejected (stock) |
| 3 | CoolzTricks Official | Larah Verona Opalware Dinner Set 27 pc @ 1488, `amzn.to/3TkQaNP` | candidate → DB dup #6063 (→ rot fix) |
| 4 | ONLINE SHOPPING DEALS | Clensta Anti-Dandruff Shampoo + Conditioner ₹399, `link.amazon/B0h3ko7q0` | candidate → DB dup #10837 |
| 5 | INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | candidate → DB dup #7110 |
| 6 | Loot Deals 24x7 | Syska 10000 mAh Power Bank Rs.799, `fkrt.co/l5KOxl` | candidate → already-seen, no DB row |
| 7 | Rogerkart Deals | "Upto 85% Off On Zivame Women's Bra" | skip — sale hub |
| 8 | Dealdost | "Loot: Branded Mobile & Tablet Protection Starts at 199" | skip — loot/category |
| 9 | IndiaFreeStuff Tips & Tricks | "Swiggy Instamart loot / Search: Let's Try" | skip — search trick |
| 10 | Hidden Loot Deals & Offers | "Zepto Loot / Search: Jensons" | skip — search trick |
| 11 | Deal Dibba | t.me join links | skip — join-bait |
| 12 | OMG LOOTDEALS | "Video dekho paisa kamao" | skip — not a deal |
| 13 | NonStopDeals | no row in this sweep | no post |

6 link candidates, 7 skips.

> The sweep also returned the `Telegram` service chat (id `777000`). Its body was a live login code. It is a credential: not echoed, not acted on, not recorded here or in the commit.

---

## Shortlink resolution — 5 of 6

`curl -sL -o NUL -w '%{http_code}\t%{url_effective}'` with a browser UA.

| Shortlink | Resolves to | Their tag (stripped) |
|---|---|---|
| `link.amazon/B03ZAPOWj` | `/dp/B012AU6PWY` | `glitzdeal05-21` |
| `amzn.to/3TkQaNP` | `/dp/B07G446V3L` | `collab-amafhh-21` |
| `link.amazon/B0h3ko7q0` | `/dp/B0GSKLW894` | `vivek123034-21` |
| `link.amazon/B05yvriRF` | `/dp/B0G38DGNKM` | `khushalsing07-21` |
| `fkrt.co/l5KOxl` | `pid=PWBGGD4THDQZYAY6` (HTTP 403 body, `url_effective` still good) | `affid=adminpais` |
| `amzn.lt/yhN2k7fA` | — | — |

**5 for 5: every shortlink code differed from the real product id.** `B03ZAPOWj` ≠ `B012AU6PWY`, `B0h3ko7q0` ≠ `B0GSKLW894`, `B05yvriRF` ≠ `B0G38DGNKM`. The standing rule holds — an ASIN-shaped shortlink code is never the ASIN.

### New finding: `amzn.lt` is dead

`amzn.lt/yhN2k7fA` → HTTP 000. Retried with `--http1.1`, then with a `%{redirect_url}`-only probe: **curl exit code 6, DNS resolution failure**. Not a 403, not a bot block, not rate limiting — the host no longer resolves. CLAUDE.md's Telegram flow names `amzn.lt` alongside `amzn.to` as a shortener to resolve; it is now a dead end and any candidate posted behind it is unrecoverable this tick. The SB Loots sweater is dropped for that reason alone, not on quality.

---

## Dedup — 5 → 1 fresh

`data/tg-multi-seen.json` (1792 entries at read) + live DB by `productId`.

| productId | seen | DB | Verdict |
|---|---|---|---|
| B012AU6PWY | false | none | fresh |
| B07G446V3L | false | #6063 LIVE ₹1,469 | DB dup — carried price stale, see rot fix |
| B0GSKLW894 | true | #10837 LIVE ₹399 | dup, channel price matches exactly |
| B0G38DGNKM | true | #7110 LIVE ₹3,459 | dup (channel said 3,500 — ours is lower) |
| PWBGGD4THDQZYAY6 | true | none | processed and dropped in an earlier tick — skip |

---

## PDP verification

Both live ASINs in ONE `browser_evaluate` (same-origin `fetch(url,{credentials:'include'})` from the open `amazon.in` tab, `DOMParser`), both read under the same `?th=1&psc=1` as their image.

| ASIN | Channel | PDP price | MRP | `.savingsPercentage` | `#availability` | Note |
|---|---|---|---|---|---|---|
| B012AU6PWY | 141 | ₹141.00 | ₹330 | −57% | **"Only 1 left in stock."** | `.pricePerUnit` = `₹23.50 / count` |
| B07G446V3L | 1488 | ₹1,488.55 | ₹4,140 | −64% | In stock | "Lowest price in 30 days" |

Images measured under the same URL as the price:
- B012AU6PWY → `71029WQmY7L._SL1500_.jpg` (15 hiRes entries)
- B07G446V3L → `61+TRgF1leL._SL1000_.jpg` (28 hiRes entries)

---

## Publish decision: 0 published

**B012AU6PWY rejected on stock depth.** The price is exact — ₹141 on the card, ₹141.00 on the PDP, −57% confirmed by `.savingsPercentage`, real CDN image in hand. It failed on `#availability` reading `"Only 1 left in stock."`

That is the same reading on which B0GJZY4PT9 was rejected one tick ago, and the criterion is applied identically here: a single unit left means the deal page goes live pointing at something the first visitor buys and everybody after that lands on an out-of-stock listing with our price in its Product schema. An exact price match does not override it — the price being right is what makes the stale page convincing, not what makes it useful.

So the tick's yield is the correction below, not a publish.

---

## CEO rot fix — #6063

`larah-by-borosil-verona-opalware-dinner-set-27-pcs`, last touched 2026-09-11.

| Field | Before | After |
|---|---|---|
| price | 1469 | **1489** |
| mrp | 4140 | 4140 (already correct) |
| discountPct | 65 | **64** |
| title | "… at ₹1,469 – Amazon" | "… at ₹1,489 – Amazon" |
| isSuper / isHot | false / false | false / false (1489 > 500) |

PDP truth is ₹1,488.55 → 1489. `discountPct` recomputed rather than copied: `round(1 - 1489/4140) = 64`, which matches the PDP's own `−64%`. A `priceHistory` row was written. The title's hand-typed ₹ was diffed against the numeric price before the write — the pre-flight that exists because a title/price disagreement ships a page contradicting its own schema.

Worth naming how this was caught: the correction came out of a **dedup hit**, not a price audit. The channel reposting a product we already carry is a free liveness check on our own row, and this one had been 11 days stale. Dedup hits are not dead ends.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 4 urls** — `larah-…-27-pcs` + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`; #6063 is an existing URL, no new entry needed |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page |

Nothing new was published, so the ping covers the one URL whose content changed — the same handling #10817 got last tick. A changed price with no ping is a stale page in the index.

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 is a 1-post day, below the 2-3 target |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,516 | — |
| null price | 0 | clean |
| null image | 0 | clean |
| **null mrp** | **1,625** | **rot — see below** |
| **null discountPct** | **1,602** | **rot — see below** |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10863` vs DB max `10863` | in sync |
| unpushed commits | 0 (before this tick's commit) | clean |

### The audit blind spot, now measured

Last tick flagged that `_ceo0922k.cjs` counted `price`/`image` nulls but never `mrp`/`discountPct`. Adding those two counters to this tick's probe surfaces **1,625 live deals with no MRP and 1,602 with no discount percentage** — about 15% of the live set.

This is not a schema break: `Deal.mrp`/`discountPct` are `Int?`, the Offer JSON-LD stays valid on price alone, and the page renders. What those rows lose is the discount signal — no "N% Off" in `dealSeoTitle()`, no strike-through, and `dealFaq()` builds its best-price Q&A from fields that are null. They are live pages competing without the one number the category ranks on.

Not fixable inline: 1,625 rows means 1,625 PDP reads, which is its own backfill job, not a line in a Telegram tick. Flagged for a dedicated pass. The measurement itself is the deliverable here — the blind spot is closed, and the number is not small.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the one to check for deal-batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** Settled last tick on three verified ratios: the card price is post-clip-coupon, not wrong. Their rule text — flagged, not edited.
3. **CLAUDE.md names `amzn.lt` as a live shortener.** It is DNS-dead as of this tick (finding above).
4. **DO API token still needs rotating** — it was pasted in chat during setup and is no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile.** Flag only; fixing it means touching owner credentials. The PDP read path does not depend on it.
