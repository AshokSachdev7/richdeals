# TELEGRAM deal-monitor tick — 2026-09-19N (IST)

**14 sidebar rows → 2 genuinely new candidates → 1 pushed, 1 rejected.** Push `HTTP 201`,
IndexNow **HTTP 200 for 4 urls**. Nine of the fourteen rows were verbatim repeats of tick
`telegram-2026-09-19M`, which is the loudest signal yet for open owner decision #7.

One new failure mode: **`amzn.lt` does not resolve at all**. The deal behind the dead shortlink
was recovered anyway, through an Amazon same-origin search, and that recovery path is worth
keeping.

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`, 13 groups from `data/tg-groups.json`,
`{title, last}` per row. ~1k tokens, no chat opened, no reload.

**The Telegram service row did not appear in this sweep.** The `want` filter excluded it
structurally, so the permanent-skip rule held by construction rather than by a judgement call.
**No login code was surfaced, recorded or acted on** — not in this report, not in the terminal,
not in the commit.

A different filter defect did show up: **"SB Loots And Deals Help Bot" matched the `want` list**
because the fragment "SB Loots And Deals" is a prefix of the bot's name. A bot chat is not a
source chat. It cost nothing this tick (its last message was not a deal), but the filter is
matching on prefix where it should match on the full group title. Folded into owner decision #8.

## Funnel

| Stage | Count |
|---|---|
| Sidebar rows read | 14 |
| Verbatim repeats of tick `…19M` | 9 |
| Skipped by rule (loot / multi / search / ad / bot) | 5 |
| **Genuinely new candidates** | **2** |
| Rejected on verification | 1 |
| **Pushed live** | **1** |

### The nine repeats

Dealzone Samsung monitor → deal 10652 (pushed last tick). CoolzTricks Symbol jeans → deal 6772
(repaired last tick). ONLINE SHOPPING DEALS NIVEA → already rejected at −2%. Rogerkart laptop bag
→ rot #5, `curlFinal` still cannot follow `rogerkart.com/r/…`. Loot Deals 24x7 Flipkart Syska →
already rejected at ₹1393 OutOfStock. INDIAN CHEAP DEALS Lavie handbag → deal 7110. NonStopDeals
"151" → deal 5825.

**Every one of these was resolved, verified or rejected within the last hour, and this tick had no
memory of it.** Two of them consumed a shortlink resolution before the DB told us we already knew.
That is the entire case for owner decision #7 in one paragraph.

### The five rule-skips

Dealdost Myntra loot (multi-product + coupon-inclusive + multi-quantity); IndiaFreeStuff Swiggy
Instamart `?query=` search page; Hidden Loot Blinkit buy-X-get-Y with no product URL at all;
OMG LOOTDEALS "video dekho paisa kamao" ad; SB Loots Help Bot (see above).

## Candidate 1 — LONGWAY Wave P1 ceiling fan → **PUSHED**

Posted by SB Loots And Deals behind `https://amzn.lt/AxdZFM74`.

### The shortlink is dead at the domain level

```
curl -sL -o /dev/null -w '%{http_code}'  →  000
nslookup amzn.lt                          →  Name: amzn.lt  (no Address line)
retry                                     →  000
```

`code:000` with an unchanged `url_effective` and a `Name:` line carrying **no `Address:`** means
the host does not resolve. This is not a bot block, not a 404, not a tool failure — **the
`amzn.lt` domain has no A record.** Two attempts, same result.

That matters beyond this one link: the backlog carries an item to teach the ingest lib an 8-char
`amzn.lt` code parser. **That item is moot while the domain does not resolve.** Every `amzn.lt`
link must now be recovered by product search or dropped.

### Recovery by Amazon same-origin search

In the logged-in Amazon tab, one `browser_evaluate`, two fetches 2,800 ms apart:

1. `fetch('/s?k=LONGWAY+Wave+P1+1200+mm+ceiling+fan', {credentials:'include'})` → `DOMParser` →
   first 6 `div[data-asin]` tuples.
2. Brand regex match → `B0CQYW38LH` → `fetch('/dp/B0CQYW38LH')` → buybox, MRP, stock, image.

Identity confirmed independently of the title string: **the search card's MRP of 3281 matches the
PDP's MRP of 3281 exactly.** The `/s?` URL is discovery only — it is never published, never
stored, and the deal links to `/dp/ASIN`.

### Verified live

| Field | Value |
|---|---|
| ASIN | `B0CQYW38LH` |
| Buybox / MRP | **₹1,599 / ₹3,281 — −51%** |
| Stock | `#add-to-cart-button` present → in stock |
| Image | `m.media-amazon.com/images/I/31EgNmojZ9L._SL1500_.jpg` (real CDN, `_SL1500_` upgrade) |
| Seen cache | `grep -c B0CQYW38LH data/tg-multi-seen.json` → **0** |
| DB dedup | `findMany({where:{productId:{in:[…]}}})` → **`[]`** |

### Pushed

| Field | Value |
|---|---|
| Deal id | **10687** |
| Slug | `longway-wave-p1-1200-mm-48-inch-ultra-high-speed-3-blade-anti-dust-decorative-ce-b0cqyw38lh` |
| Description | **463 chars**, original — clears the ≥200-char arm *and* the −51% arm |
| Affiliate | `amazon.in/dp/B0CQYW38LH?th=1&psc=1&tag=ashoksachdev-21` |
| Push | `HTTP 201` · `created:true` · count 1 |
| IndexNow | **HTTP 200, 4 urls** (1 slug + 3 prepended defaults) |
| Prod | `/api/deals?limit=1` → id **10687**, title carries `₹1599 (51% Off)` |

The title renders `₹` correctly. The `Rs.`-instead-of-`₹` defect from an earlier tick came from
letting the heredoc-backslash caution leak into a Write-tool file; the push script here was a
heredoc, so it used `String.fromCharCode(8377)` / `(8213)` for the glyphs instead of raw
characters or `\u` escapes. **Heredoc rules apply to heredocs only.**

## Candidate 2 — Hydesh cleaning combo → **REJECTED on price drift**

Deal Dibba posted "Hydesh Cleaning Combo at 170" behind `bitli.in/hRJ716e`.

```
bitli.in/hRJ716e → trackingv3.linkredirect.in/… → shopsy.in/p/itm6da5f65978f19?pid=ETQGGF6Z2KHVU957
HTTP 200, 271,953 bytes
ld+json  Product.offers.price        200
         Product.offers.availability InStock
         sku                         ETQGGF6Z2KHVU957
```

Channel claimed **₹170**, the merchant serves **₹200**. A **₹30** gap against a ±₹1 tolerance.
Rejected. Rot #2 (price drift is the dominant reject reason) re-confirmed on its own evidence.

Worth recording for the affiliate matrix: **shopsy.in is not flipkart.com.** Had it passed, it
would have taken the **Cuelinks** arm (`linksredirect.com/?cid=527&source=linkkit&url=…`), not the
Flipkart `affid=djhackraj` arm. The `/p/itm…` path shape is shared between the two hosts and is
not by itself a Flipkart signal.

This row is also the sharpest test yet of open owner decision #1. Under a plain
"publish at the verified live price" rule this deal **would have published at ₹200** — a real,
in-stock, verifiable price that simply is not the price the channel advertised. That is why the
recommendation is an *asymmetric* amendment: publish when the live price is at or below the
claimed one, reject when it is above.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10340** · PENDING_REVIEW **0** · EXPIRED **259** |
| LIVE null price / null image | **0 / 0** (ninth consecutive no-op) |
| LIVE discountPct null w/ price+mrp | **0** — the 09-19f backfill is holding |
| DB max deal | **10687** — the row this tick pushed; prod agrees on id and slug |
| Posts/day IST (8 d) | 09-12:3 · 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · **09-19:3** |
| Blog hygiene | published **316** · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs 10687 — **drift 205** (rot #4) |
| Unpushed commits | **0** before this tick |

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row — an
absent key and a broken query look identical in that output, so it gets said every tick.

**Drift moved 170 → 205**, not the +1 this tick's single push predicts. The other +34 is the
`6fa79bd` indiafreestuff batch from the last DEAL-INGEST tick. Predicted and reconciled, not
merely observed.

## Rot standing — 29 items

**#29's class produced zero new instances** — the new `discountPct` arm returned 0 against 89 an
hour ago. First evidence the backfill holds, though nothing in the ingest path yet *guarantees* it.

**#2 re-confirmed** (shopsy, ₹30). **#5 live again** (Rogerkart). **#15 held** — seen cache and DB
agreed on the new ASIN for once, which is the case where the rule costs nothing.

**#4 → 205.** Only the external tg-broadcast cron closes it. The cursor stays untouched: an
unattended drain would dump 205 channel messages at once.

**#11 clear** — every scratch file this tick (`_dd0919n.mjs`, `_push0919n.mjs`, `_shopsy0919n.html`,
`_a0919n.mjs`, `_a0919n2.mjs`, `_u0919n.txt`) was deleted in the same Bash call that used it. The
~200 pre-existing artefacts under `apps/api/` are untouched (owner decision #5).

**#21 stays materially weakened** — unexercised this tick, no `link.amazon` codes appeared.

**#22 quiet** — no stale-price repair needed this hour.

### Three code gaps, not yet rot

1. **`amzn.lt` does not resolve** — the planned 8-char code parser is moot; recovery-by-search is
   the working path.
2. The `._SL1500_` upgrade regex `/\._[A-Z0-9_,]+_\./` **does not match `PIbundle` tokens**
   (`…._SY355_PIbundle-6,TopRight,0,0_AA355SH20_`), so bundle images ship at thumbnail size.
3. `ingest.config.json` carries `requestDelayMs: 1500` against the standing **2,500 ms** floor.
   The floor is honoured by hand in every tick; the config disagrees with the rule.

## Open owner decisions — 10

**#7 (persist a reject cache) is now unambiguously top.** This sweep re-encountered **nine**
already-resolved rows, three of them already-rejected, with no memory of any of it.

**#8 gains a second leg**: prune dead groups *and* tighten the `want` filter so bot chats
("SB Loots And Deals Help Bot") stop matching a group prefix.

**#1 should be amended to asymmetric**, per the shopsy row above.

**#3** is at **205** and grows with every push.
