# TELEGRAM-DEAL-MONITOR tick 2026-09-22r

**Run:** 2026-09-22 11:52–12:02 IST · richdeals.in · inline (not subagent)
**Result:** **2 published** (#10876 notebook ₹171, #10877 knee support ₹187) + **1 rot fix** (#575, four defects cleared), IndexNow **HTTP 200 / 6 urls**, 1 candidate dropped for a stated reason, 4/4 shortlinks resolved, **one carried flag retracted as false**.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, no chat switching. All 13 roster groups from `data/tg-groups.json` covered.

| # | Group | Newest post | Disposition |
|---|---|---|---|
| 1 | CoolzTricks Official | "amazon basics Classic Notebook, Plain - 240 pages at 171" `amzn.to/4yNQKTg` | **candidate → published** |
| 2 | Dealzone | "Nivia Adjustable Knee Support at 187" `link.amazon/B03nZHj0K` | **candidate → published** |
| 3 | ONLINE SHOPPING DEALS | "Yonex ET 901 Synthetic Badminton Grip / Deal Price : ₹85" `link.amazon/B0hLf0C6s` | candidate → **dropped, no MRP on the PDP** |
| 4 | SB Loots And Deals | "Zebronics Type-C Wired Earphones… MRP - 599" `amazn.lt/skEeAtCR` | skip — no deal price in post; **but it exposed #575** |
| 5 | Rogerkart Deals | "Upto 85% Off On Zivame Women's Bra" | skip — sale hub |
| 6 | Dealdost | "Loot : Branded Mobile & Tablet Protection Starts at 199" | skip — loot / starts-at |
| 7 | IndiaFreeStuff Tips & Tricks | Swiggy Instamart search trick | skip — search trick |
| 8 | Hidden Loot Deals & Offers | Zepto search trick | skip — search trick |
| 9 | Deal Dibba | "₹14" + `t.me` join links | skip — join-bait |
| 10 | OMG LOOTDEALS | "Video dekho paisa kamao" | skip — not a deal |
| 11 | INDIAN CHEAP DEALS | Ladies Handbag ₹3,500 | skip — unchanged, dispositioned #7110 |
| 12 | Loot Deals 24x7 | Flipkart Syska power bank ₹799 | skip — unchanged, dispositioned |
| 13 | NonStopDeals | no row in this sweep | no post |

4 link candidates, 9 skips. ONLINE SHOPPING DEALS finally moved — the previous three ticks all read the same Clensta shampoo post. Non-roster rows (LATEST IPHONE RATES, DMs, bots) ignored.

> The sweep again returned the `Telegram` service chat (id `777000`) carrying a live login code. It is a credential: not echoed, not acted on, not recorded here or in the commit.

### Free confirmation: the `RichDeals` row

Our own channel's sidebar row carried the **#10875 broadcast** (Dime Store floating wall shelves, ₹338 / ₹5,999 / 94% off). Last tick's cursor read was `lastId 10870` against a DB max of 10875 and was called "caught mid-heal, not rot". The broadcast went out, so that call is verified rather than asserted — **third consecutive tick our own sidebar row pays for a liveness check on the external broadcast cron at zero cost.**

---

## Shortlink resolution — 4 of 4, all HTTP 200

`curl -sL -o /dev/null -A "<browser UA>" -w '%{http_code}\t%{url_effective}' --max-time 25`.

| Shortlink | Resolves to | Their tag (stripped) |
|---|---|---|
| `amzn.to/4yNQKTg` | `/dp/B0C69GWQGW` | `collab-amafhh-21` |
| `link.amazon/B03nZHj0K` | `/dp/B00IAPKZ0W` | `glitzdeal05-21` |
| `link.amazon/B0hLf0C6s` | `/dp/B06WV77YDB` | `vivek123034-21` |
| `amazn.lt/skEeAtCR` | `/dp/B0GG4FDSV4` | `bhavesh015-21` |

Four channels, four different affiliate tags, all stripped. Shortlink-code ≠ ASIN 4/4 — twice with codes that are themselves ASIN-shaped (`B03nZHj0K` → B00IAPKZ0W, `B0hLf0C6s` → B06WV77YDB), which is exactly the trap that makes "just regex the code out" wrong.

### Flag #3 falsified: `amzn.lt` and `amazn.lt` are two different shorteners

For three ticks this report carried "CLAUDE.md names `amzn.lt` as a live shortener — DNS-dead." Two probes this tick settle it:

- `https://amzn.lt/cm6h6leM` → **HTTP 000, curl exit 6** (genuinely DNS-dead)
- `https://amazn.lt/skEeAtCR` → **HTTP 200** → `/dp/B0GG4FDSV4`

CLAUDE.md's actual wording is "resolve `amzn.to`/`amazn.lt` shortlinks" — it names **`amazn.lt`, the host that works**. The flag was wrong on both halves: CLAUDE.md never named the dead host, and the host it did name resolves fine. The dead `amzn.lt` was what appeared in earlier SB Loots posts. **Flag #3 is retracted; CLAUDE.md is correct as written.** The prior claim that this "cost us the SB Loots link" was also mis-attributed — that post was a skip on the no-deal-price rule ("MRP - 599" and nothing else), never on a dead link.

The lesson worth keeping: a one-letter hostname difference read as a typo for three ticks. A carried flag that never gets re-probed becomes folklore.

---

## Dedup — 4 → 3 actionable

`data/tg-multi-seen.json` (1797 entries at read) + live DB by `productId`.

| productId | seen | DB | Verdict |
|---|---|---|---|
| B0C69GWQGW | false | none | **fresh → verify** |
| B00IAPKZ0W | false | none | **fresh → verify** |
| B06WV77YDB | false | none | fresh → verify (later dropped) |
| B0GG4FDSV4 | false | **#575 LIVE ₹199 / mrp null / pct null / desc 158 chars, last touched 2026-07-31** | **dup → rot** |

Note that B0GG4FDSV4 read `seen=false` while living in the DB since July. It entered from a different source (IFS/DesiDime), so **the seen file is not a proxy for the DB** — both checks are load-bearing and dropping either would have produced a wrong answer here.

---

## PDP verification

One `browser_evaluate`, 4 ASINs, same-origin `fetch(url,{credentials:'include'})` + `DOMParser` from the open `amazon.in` tab. **All 4 HTTP 200, all 4 `#availability` leading "In stock".**

| ASIN | Channel | PDP price | MRP | PDP savings % | Verdict |
|---|---|---|---|---|---|
| B0C69GWQGW | "at 171" | **₹171.00** | ₹499 | −66% | publish — channel matches exactly |
| B00IAPKZ0W | "at 187" | **₹187.00** | ₹1,999 | −91% | publish — channel matches exactly, with a caveat below |
| B06WV77YDB | "₹85" | **₹85.00** | **none** | **none** | **drop** |
| B0GG4FDSV4 | "MRP - 599" | **₹229.00** | ₹599 | −62% | rot fix — stored price was ₹199 |

`#centerCol` innerText is the price read, sliced `[i−60, i+220]` around the first `₹`. `.a-offscreen` is not truth and a 300-char head slice misses the price entirely — both previously-earned lessons, both still holding.

### B06WV77YDB dropped: no list price means no savings claim

Its `#centerCol` reads `₹85.00 ₹85` and nothing more — no `M.R.P.`, no "with N percent savings", no strikethrough. That is not a read failure; the listing genuinely has no list price.

Publishing it would mean writing a row with `mrp: null` and `discountPct: null` — which is **precisely the rot this report flags 1,624 times every tick**. Adding the 1,625th while complaining about the first 1,624 is incoherent. It would also fail on its own merits: `dealIndexable()` would let it in only on the ≥200-char-description clause, so it would be a deal page with no savings to state, competing on the one number the category ranks on with that number blank. A ₹85 badminton grip with no list price is not a deal, it is a price.

Dropped explicitly, with the reason recorded in the push script's header comment so the next tick does not re-litigate it.

### B00IAPKZ0W: the 91% is Amazon's own, and still worth naming

`#centerCol` says "with 91 percent savings -91%" and `round(1 − 187/1999) = 91` is self-consistent, so we publish the PDP's numbers — that is the rule and it was followed. But a ₹1,999 MRP on a ₹187 knee sleeve is exactly the shape tick o named: *a wrong price disappoints on click, a wrong MRP is a false savings claim in the Offer schema.* The difference is that here the MRP is Amazon's own published list price, not a channel's claim, so the schema reports the marketplace's figure rather than one we invented. Flagged, not altered.

---

## CEO rot fix — #575

Surfaced by a dedup hit, not by a price audit. **Four defects in one row:**

| Field | Before | After | Why it mattered |
|---|---|---|---|
| price | ₹199 | **₹229** | stale **low** — we advertised cheaper than any buyer could pay; a click that lands on a higher price is the worst failure mode we have |
| mrp | `null` | **599** | no MRP = no Offer savings, and the SB Loots post's "MRP - 599" matched exactly |
| discountPct | `null` | **62** | with pct null *and* desc < 200, `dealIndexable()` rejected the row |
| description | 158 chars | **~1,080 chars** | row no longer depends on a single gate to stay indexable |
| slug | `zebronics-…-1-B0GG4F` | **unchanged** | truncated, uppercase, non-conforming — and indexed since 2026-07-31. Renaming it to chase the slug convention would throw away the URL's history for cosmetics. The pre-flight slug check carries an explicit exemption instead. |

`priceHistory` row written because the price changed (199 → 229). **#575 was not in the sitemap at all** before this tick — null pct plus a short description failed both arms of `dealIndexable()`. It is now indexable for the first time in its life.

This is the first row from the 1,625-strong `nullMrp` backlog ever surfaced by a channel repost, and it sharpens the backlog argument considerably: those rows are not merely missing a number, **they are invisible to search.** It is also the **fourth consecutive tick** where the rot fix came out of a dedup hit rather than an audit sweep (o: #3961, q: 4 UPDs, r: #575). Dedup hits are not dead ends — they remain the cheapest rot detector we have.

**The audit numbers confirm the fix landed:** `nullMrp` moved 1,625 → **1,624** and `nullPct` 1,602 → **1,601**. Exactly one row each, exactly the row we touched.

---

## Published

| Field | #10876 | #10877 |
|---|---|---|
| slug | `amazon-basics-classic-notebook-plain-240-pages-green-b0c69gwqgw` | `nivia-adjustable-knee-support-compression-sleeve-velcro-strap-b00iapkz0w` |
| price / mrp / pct | ₹171 / ₹499 / 66% | ₹187 / ₹1,999 / 91% |
| isSuper / isHot | true / true | true / true |
| image | `71klV93n-gL._SY879_.jpg` | `61zKi69wboL._SX679_.jpg` |
| affiliate | `/dp/B0C69GWQGW?th=1&psc=1&tag=ashoksachdev-21` | `/dp/B00IAPKZ0W?th=1&psc=1&tag=ashoksachdev-21` |

`discountPct` and `title` are **derived in a loop**, not hand-typed — the pattern carried over from tick q, and the reason the title-₹-vs-price pre-flight has nothing left to catch. Descriptions written from each PDP's own `#feature-bullets` spec sheet (acid-free archival paper / elastic closure / expandable pocket; patella-anatomic panelling / velcro adjustability / seam placement; 10mm neodymium driver / in-line mic / Type-C), never from channel or source text. `howTo` from our own 4-line template, with the variant-confirmation line written per product. All three rows passed pre-flight: title-₹ vs numeric price, price < mrp, pct recompute, CDN image host, indexability, in-batch dup.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 6 urls** — 3 slugs + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`. #10876 (66%) and #10877 (91%) pass `dealIndexable()` on discount alone; **#575 enters the sitemap for the first time** now that pct is 62 |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page |

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 is still a 1-post day, below the 2–3 target |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,530 (was 10,528) | +2 = this tick's two creates, accounted |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | **1,624** (was 1,625) | −1, exactly #575 |
| null discountPct | **1,601** (was 1,602) | −1, exactly #575 |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10875` vs DB max **10877** | **not rot** — the gap is exactly this tick's two creates, made ~1 min before the read |
| unpushed commits | 0 before this tick's commit | clean |

The backlog moved for the first time in four ticks — and it moved by one, because one row happened to get reposted by a Telegram channel. At that rate the 1,624 clear in about four years. The number being flat for three ticks established that nothing is *creating* these rows; this tick establishes that nothing is meaningfully *clearing* them either. A one-time backfill remains the only thing that closes it, and it remains unauthorized and outside a Telegram tick's remit.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the deal-bearing file to check for batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** The card price is post-clip-coupon, not wrong. Their rule text — flagged, not edited.
3. ~~**CLAUDE.md names `amzn.lt` as a live shortener.**~~ **RETRACTED this tick.** `amazn.lt` (what CLAUDE.md actually names) returns HTTP 200; `amzn.lt` (never named in CLAUDE.md) is the dead one. Two different shorteners, one letter apart. See the shortlink section.
4. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile** reads `loggedIn:false`. Flag only; fixing it means touching owner credentials, and the PDP read path (4/4 HTTP 200 again this tick) does not depend on it.
