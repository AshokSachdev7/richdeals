# TELEGRAM-DEAL-MONITOR — 2026-09-20g (IST)

**29 sidebar rows read in one `browser_evaluate`. All 13 source groups present. 1 deal published, IndexNow HTTP 200.**

## Funnel

| Stage | Count |
|---|---|
| Sidebar rows swept | 29 |
| Source groups seen (of 13) | 13 |
| Rows carrying a product-shaped post | 13 |
| Skipped at triage (loot/multi/category/search/ad/standing-reject/known-dup) | 11 |
| Shortlinks resolved this tick | 2 |
| Survived resolution | 1 |
| Dup vs `tg-multi-seen.json` + live DB | 0 |
| Verified on the PDP | 1 |
| **Published `status:live`** | **1** |

One `browser_evaluate` over `.chat-list .ListItem.Chat` after `browser_tabs select` on the chat-list
tab. No snapshot, no reload.

## Per-group triage

| Group | Last message | Verdict |
|---|---|---|
| SB Loots And Deals | GIF/BBD sale dates, 2 × `amazn.lt` | sale-hub + multi — skip (`amzn.lt` does not resolve anyway) |
| ONLINE SHOPPING DEALS | Milton Prudent 500 Thermosteel 510 ml, ₹449, link truncated in preview | single — **same product as Dealzone**, resolved once |
| Rogerkart Deals | "Loot : Men's Premium Watches Upto 90% Off" `myntr.in` | loot/category — skip |
| Dealzone | Milton Thermosteel 510 ml at 449, `link.amazon/B0bGbq6EM` | single — **resolved, verified, PUBLISHED** |
| CoolzTricks | "GRAB FAST : Sarees at 199" `amzn.to/3TevoQ4` | **resolved → `/s?hidden-keywords=`, 6 ASINs — search page, skip** |
| Dealdost | Premium Medjool Dates Jumbo 250 g × 3 at 899, `amzn.to/3V6Kcke` | single but **GROCERY** — held, owner decision #11 |
| Deal Dibba | `9689 https://bitli.in/K7CsLq3` | bare-number post, known Shopsy `SHOHGDNDGTQZHF2F` — **standing reject, 5th offer** |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart `search?query=NOICE` | search page — skip |
| Hidden Loot Deals | Blinkit buy-any-get-free, no product link | offer not product — skip |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | **byte-identical to last tick** → `B0G38DGNKM`, dup of deal 7110 LIVE — skip unresolved |
| OMG LOOTDEALS | "Video dekho paisa kamao" | ad — skip |
| Loot Deals 24x7 | Syska 10000 mAh ₹799, `fkrt.co/l5KOxl` | **rot #19, SEVENTH instance** — `PWBGGD4THDQZYAY6`, proven OOS at ₹1,393 — skip unresolved |
| NonStopDeals | `151 https://amzn.to/4uZXfjK` | **byte-identical to last tick** → `B07QX21WZQ`, dup of deal 5825 LIVE; ₹151 vs real ₹549 — skip unresolved |

Four links were skipped **without spending a fetch** because the shortlink string is byte-identical to
one already resolved in an earlier tick. That is the reject-cache argument (owner decision #7) paying
for itself in-tick: 4 saved requests against a ≥2.5 s rate limit.

## Resolutions (2, browser UA, 2.6 s apart)

| Shortlink | HTTP | Resolved to | Verdict |
|---|---|---|---|
| `link.amazon/B0bGbq6EM` | 200 | `amazon.in/dp/**B0F1T8N2VR**?…tag=glitzdeal05-21…` | product — take, swap tag |
| `amzn.to/3TevoQ4` | 503 | `amazon.in/s?hidden-keywords=B0FPCLMZFC\|B0FPCK545C\|B0FPCHYK13\|B0CX1ZXD5Q\|B0FP9435TN\|B0FP915NBX&tag=collab-amafhh-21` | **search page, 6 ASINs — reject** |

**Shortlink code is not the ASIN — 8th confirmation.** `B0bGbq6EM` looks exactly like an ASIN and
carries `B0F1T8N2VR`. Pattern-matching the code out of the path would have published the wrong product
under the right price. Always resolve.

The Sarees link is the case the post-resolution `/s?` assert exists for: the channel text ("Sarees at
199") reads like a single product, and only the resolved URL reveals a 6-ASIN keyword search. Their tag
`collab-amafhh-21`, source tag stripped either way.

## Dedup

`B0F1T8N2VR`: **0** hits in `data/tg-multi-seen.json`, **0** rows in the live DB (`findMany` on
`productId` — it is not unique, so `findUnique` would throw). Twelve LIVE Milton rows exist; none is
this ASIN, and none is a 510 ml Prudent bottle. Clean new product.

`data/tg-multi-seen.json` was **not written** — standing rule, stays unstaged.

## Verification (logged-in Amazon tab, same-origin fetch + DOMParser)

| Field | Value |
|---|---|
| ASIN | `B0F1T8N2VR` |
| `#productTitle` | Milton Prudent 500 Thermosteel Bottle, 510 ml … Red |
| `.priceToPay .a-price-whole` | **449** |
| `.basisPrice .a-offscreen` | ₹920 |
| `.savingsPercentage` | −51% |
| `#add-to-cart-button` | present |
| `#outOfStock` | absent |
| `data-old-hires` | `…/I/518fSiq5EbL._SL1500_.jpg` |

**Channel price ₹449 = PDP price ₹449, exact.** Both channels quoted the same number and both were
right — which is not the norm for this source set, so it is worth recording as a data point rather
than an assumption.

`data-old-hires` was already `_SL1500_`, so no rebuild was needed. `#landingImage` `src` was the usual
`21KnqgGtwmL._SY300_SX300_QL70_ML2_` thumbnail — publishing that would have shipped a 300 px image.
Stock read from `#add-to-cart-button`/`#outOfStock`, never `#availability`.

## Published

| Slug | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| `milton-prudent-500-thermosteel-bottle-510ml-red` | `B0F1T8N2VR` | ₹449 | ₹920 | 51% |

`HTTP 201`, `{"count":1,"results":[{"created":true,"ok":true}]}`. Tag `ashoksachdev-21`,
source tag `glitzdeal05-21` stripped, `status:"live"` lowercase.

`dealIndexable`: 51% clears the ≥20% arm outright, price and image non-null, not EXPIRED, age 0 days.
Indexable on both arms.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs milton-prudent-500-thermosteel-bottle-510ml-red
DONE: IndexNow -> HTTP 200 for 4 urls
```

**HTTP 200.** 4 urls = 1 slug + the 3 the script always appends (`/`, `/offers`, `/sitemap.xml`).
Count matches the rule exactly. Sitemap is ISR 1800 s and picks the row up on its own; `llms.txt` is
`force-dynamic` and already carries it.

## Broadcast cron — live proof it consumed this hour's batch

Our own **RichDeals** channel's newest message in the sweep is the **Titan Work Mode 3-Hands watch at
₹3,719 / ₹9,995 / 63% OFF** — one of the 21 deals published by DEAL-INGEST 0920d earlier this hour.
The external tg-broadcast cron read past the cursor and posted it. That is the cursor arm demonstrated
end-to-end from the consumer side, not inferred from a file read. **Cursor still not drained** — that
needs the owner's explicit go-ahead.

## CEO audit

| Arm | Result |
|---|---|
| Sidebar sweep | 29 rows, all 13 source groups present, one call |
| Shortlink resolution | 2 attempted, 2 resolved, ≥2.5 s apart, browser UA |
| Rate limiting | no 403/429; the single 503 was Amazon's search page, not a block |
| Dedup | seen-file 0, DB 0 |
| Price verification | 1/1 exact match |
| Image | real `m.media-amazon.com` `_SL1500_`, no thumbnail shipped |
| Push | HTTP 201, count 1 |
| IndexNow | HTTP 200, 4 urls |
| Credential exposure | held — see below |
| Artifacts | none — terminal + this file only |

### Credential rule — SEVENTH hold

The `#777000` "Telegram" service row again surfaced a **live login code** in its last-message preview.
It is skipped as a permanent non-source chat. **No value has been recorded in this report, in any
commit, in the terminal reply, or anywhere else, and none was acted on.** Seventh occurrence; the
row belongs on a permanent-skip list in whatever eventually automates this sweep.

### Rot

- **#19 — `fkrt.co/l5KOxl` Syska, SEVENTH instance.** Loot Deals 24x7 has now reposted a product that
  was verified out of stock at ₹1,393 against a claimed ₹799. Seven repeats of a known-bad post is a
  channel-quality signal, not a one-off; it feeds owner decision #8 (prune dead groups).
- **Shopsy bare-number post, FIFTH offer.** Deal Dibba's `bitli.in/K7CsLq3` again. Bare-number posts
  are now **2/2 wrong** on the occasions they were checked.
- **Two channels reposted byte-identical shortlinks from last tick** (INDIAN CHEAP DEALS, NonStopDeals).
  Overnight yield stays at roughly 1 unique per sweep, as CLAUDE.md predicts.
- **New, from this tick's own dedup query:** LIVE deal **10031** carries `productId`
  `ae27f94b3330` — a hex hash, not an ASIN. Its store was not checked, so this is an observation, not
  yet a finding: if that row is Amazon, ASIN-keyed dedup can never see it. One query to settle it.
- Carried, unchanged and re-verified against the DB in the sitemon tick earlier this hour: 1,602 LIVE
  rows with no MRP (owner decision #6); deal 7637 EXPIRED candidate; deal 1536 slug/row price
  disagreement; ~200 scratch leftovers (owner decision #5); CLAUDE.md doc rot ("RSS first" while
  feedburner returns HTTP 000; plain-curl ld+json while Flipkart 403s).

### Owner decision #11 is live again this tick

Dealdost's **Medjool Dates Jumbo 250 g × 3 at ₹899** is a clean single-product post that would have
passed every other gate. It was **held** only because the `GROCERY` filter kills perishables. Measured
cost of that filter so far: 9 of 69 indiafreestuff slugs last tick (13%), **plus 1 of 2 genuinely-new
Telegram candidates this tick**. That is the highest hold rate the filter has shown on this source.
The filter's stated reason — prices swing daily and are location-locked — holds for produce; shelf-stable
packaged dates are the borderline case. Flagging, not overriding.

## Fixed inline

**Nothing.** No rot inside this tick's own arms. Every skip was a rule firing as designed.
