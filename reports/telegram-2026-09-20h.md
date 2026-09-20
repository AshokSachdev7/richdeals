# TELEGRAM-DEAL-MONITOR — 2026-09-20h (IST)

**29 sidebar rows in one `browser_evaluate`. All 13 source groups present. 2 deals published, IndexNow HTTP 200 for 5 urls. The coupon-inclusive-price guard fired on a real post and saved a fabricated price.**

## Funnel

| Stage | Count |
|---|---|
| Sidebar rows swept | 29 |
| Source groups seen (of 13) | 13 |
| Rows carrying a product-shaped post | 13 |
| Skipped at triage (loot/multi/category/search/ad/standing-reject/known-dup) | 10 |
| Shortlinks resolved this tick | 3 |
| Survived resolution | 2 |
| Dup vs `tg-multi-seen.json` + live DB | 0 |
| Verified on the PDP | 2 |
| **Published `status:live`** | **2** |

One `browser_evaluate` over `.chat-list .ListItem.Chat` after `browser_tabs select` on the chat-list tab. No snapshot, no reload.

## Per-group triage

| Group | Last message | Verdict |
|---|---|---|
| CoolzTricks | Nivea Body Lotion 314, `fkrt.cc/hsul8uQ` | resolved → `dl.flipkart.com/flipkart/p/item?pid=…` — **tracking landing, no itm id, reject** |
| SB Loots And Deals | JAGGERY Steel Grocery Container 500 (Pack of 6), MRP 2399, `fkrt.it/3q!5i0NNNN` | resolved → real `/p/itm…` — **verified, PUBLISHED** |
| Dealzone | Cello Dosa Tawa "at 594 \| Apply 30% Coupon", `link.amazon/B0agyVyun` | resolved → `/dp/B07WVXY2DW` — **verified, PUBLISHED at the buybox price, not the quoted one** |
| Dealdost | "Myntra Loot : (Pack of 3) at 179" `myntr.it/IfYRq6x` | loot, no product name — skip |
| ONLINE SHOPPING DEALS | Milton Prudent 510 ml ₹449 | **already published this hour as deal 10767** (telegram 0920g) — dup, skip without fetch |
| Rogerkart Deals | "Loot : Men's Premium Watches Upto 90% Off" | loot/category — skip |
| Deal Dibba | `9689 https://bitli.in/K7CsLq3` | byte-identical repeat, known Shopsy standing reject — **6th offer**, skip without fetch |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart `search?query=NOICE` | search page — skip |
| Hidden Loot Deals | Blinkit buy-any-get-free, no product link | offer not product — skip |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500, `link.amazon/B05yvriRF` | byte-identical repeat → `B0G38DGNKM`, dup of deal 7110 LIVE — skip without fetch |
| OMG LOOTDEALS | "Video dekho paisa kamao" | ad — skip |
| Loot Deals 24x7 | Syska 10000 mAh ₹799, `fkrt.co/l5KOxl` | **rot #19, EIGHTH instance** — proven OOS at ₹1,393 — skip without fetch |
| NonStopDeals | `151 https://amzn.to/4uZXfjK` | byte-identical repeat → `B07QX21WZQ`, dup of deal 5825 LIVE — skip without fetch |

**Four links skipped without spending a fetch** because the shortlink string is byte-identical to one resolved in an earlier tick. Against a ≥2.5 s rate limit that is 4 saved requests, in-tick, by hand. Owner decision #7 (persist a reject cache) gets stronger every sweep.

## Resolutions (3, browser UA, 2.7 s apart)

| Shortlink | HTTP | Resolved to | Verdict |
|---|---|---|---|
| `link.amazon/B0agyVyun` | 200 | `amazon.in/dp/**B07WVXY2DW**?…tag=glitzdeal05-21…` | take, swap tag |
| `fkrt.cc/hsul8uQ` | 403 | `dl.flipkart.com/flipkart/p/item?pid=MSCHCKQHGRGEHY9Q&affid=growthte&affExtParam1=ENKR…` | **reject** |
| `fkrt.it/3q!5i0NNNN` | 403 | `flipkart.com/flipkart/p/**itm5ed8a0559a7f3**?pid=CNTG3AWTZHVHJKUA&…affid=inf_…` | take |

**Shortlink code is not the ASIN — 9th confirmation.** `B0agyVyun` is ASIN-shaped and carries `B07WVXY2DW`. Pattern-matching the code out of the path publishes the wrong product at the right price.

### New: the Flipkart shortlink class splits in two

Both `fkrt.*` links returned 403 on the final curl hop — that is Flipkart's reCAPTCHA on the PDP, **not a block on us**; the redirect chain still resolved and `url_effective` was enough to classify both. The two resolved targets are not the same kind of thing:

- `dl.flipkart.com/flipkart/p/**item**?pid=…` — a tracking landing. No itm id anywhere in the path, so there is no product URL to publish and nothing to read ld+json from. **Reject.**
- `flipkart.com/flipkart/p/**itm5ed8a0559a7f3**?pid=…` — a real itm id sitting behind a generic `/flipkart/` slug. Looks malformed, renders a full PDP in a browser tab. **Publishable.**

Previously both would have been filed under "fkrt shortlinks 403". The rule is now `/p/item` ≠ `/p/itm<hash>`: assert on the **`itm` prefix plus a hash**, not on the slug shape.

## Dedup

`grep -c` on `data/tg-multi-seen.json` for all three ids: **0**. Live DB `findMany` on `productId` (not `findUnique` — `productId` is not unique and it would throw): `B07WVXY2DW` **[]**, `CNTG3AWTZHVHJKUA` **[]**, `MSCHCKQHGRGEHY9Q` **[]**.

Second pass on the Cello by title: **7 LIVE "Dosa Tawa" rows** (3673, 6305, 7844, 9073, 9074, 9939, 9981) — every one a different ASIN, none `B07WVXY2DW`, none a 35 cm square. Clean new product, not a variant collapse.

`data/tg-multi-seen.json` **not written** — standing rule, stays unstaged.

## Verification 1 — Amazon (logged-in tab, same-origin fetch + DOMParser)

| Field | Value |
|---|---|
| ASIN | `B07WVXY2DW` |
| `#productTitle` | CELLO Aluminium Non-Stick Induction Base Square Dosa Patri Tawa 35 CM, Black \| ISI Certified, PFOA Free … |
| `.priceToPay .a-price-whole` | **849** |
| `.basisPrice .a-offscreen` | ₹2,150 |
| `.savingsPercentage` | −61% |
| `#add-to-cart-button` | present |
| `#outOfStock` | absent |
| `data-old-hires` | `…/I/51O2-ZbW64L._SL1283_.jpg` |
| `#landingImage` src | `…/31bwFSe0qBL._SX300_SY300_QL70_ML2_.jpg` (thumbnail) |
| coupon selectors | `[]` — none rendered |

### The coupon guard, exercised live — this is the cleanest case yet

Dealzone posted the tawa as **"at 594 | Apply 30% Coupon"**. The buybox is **₹849**.

```
849 × 0.70 = 594.3
```

The channel's number is arithmetically the **post-coupon** price, not the price. Publishing 594 would have put a figure on the site that no visitor pays without clipping a coupon that may be gone tomorrow — a fabricated price that every downstream check passes, because 594 is internally consistent with itself. **Published ₹849.** The description says so explicitly rather than hiding it.

Note the coupon selector scan returned empty on the PDP fetch — the badge renders client-side. So the guard cannot be "did we detect a coupon element"; it has to be the arithmetic: **if channel_price ÷ buybox lands on a round discount fraction, the channel quoted post-coupon.** That is the version worth baking into `ingest-common.mjs`.

`data-old-hires` came back `_SL1283_`, not `_SL1500_`. Extracted core `51O2-ZbW64L` with `/\/images\/I\/([^.]+)\./` and rebuilt `…/51O2-ZbW64L._SL1500_.jpg`. Shipping `#landingImage` `src` instead would have put a 300 px thumbnail on the page.

## Verification 2 — Flipkart (browser tab, ld+json, array-unwrap)

| Field | Value |
|---|---|
| pid | `CNTG3AWTZHVHJKUA` |
| name | JAGGERY Stainless Steel Grocery Container - 500 |
| brand | JAGGERY |
| `offers.price` | **765** INR |
| availability | `schema.org/InStock` |
| MRP (ld+json description "for Rs.2399.0") | ₹2,399 — matches the channel's claimed MRP independently |
| `image[0]` | `rukmini1.flixcart.com/image/1500/1500/xif0q/container/…-imahd6f8bpahuwaw.jpeg?q=70` |
| sold-out text scan | false |

Root of the ld+json block is an **array** — unwrapped with `Array.isArray(j) && (j = j[0])` before reading. Plain curl on this PDP returns 403 reCAPTCHA; the read only works from a Playwright tab.

765 against 2,399 = **68% off**, clearing `dealIndexable`'s ≥20% arm outright.

**Not grocery.** `GROCERY` filter (owner decision #11) does not apply — these are steel storage canisters, shelf-stable hardware, not perishables. Flagging the distinction because the product name contains the word "Grocery" and a naive regex would have killed it.

## Published

| Slug | Store | id | Price | MRP | Off |
|---|---|---|---|---|---|
| `cello-aluminium-nonstick-square-dosa-tawa-35cm` | Amazon | `B07WVXY2DW` | ₹849 | ₹2,150 | 61% |
| `jaggery-stainless-steel-grocery-container-set-of-6-1l` | Flipkart | `CNTG3AWTZHVHJKUA` | ₹765 | ₹2,399 | 68% |

`HTTP 201`, `{"count":2,"results":[{…"created":true,"ok":true},{…"created":true,"ok":true}]}`.

Affiliate swap: Amazon `?tag=ashoksachdev-21`, source tag `glitzdeal05-21` stripped. Flipkart `…/p/itm5ed8a0559a7f3?pid=CNTG3AWTZHVHJKUA&affid=djhackraj` — `pid` kept, their `affid=inf_c247cf05-…`, `lid` and `marketplace` dropped. `status:"live"` lowercase, or `mapStatus()` silently defaults to `PENDING_REVIEW`.

Both clear `dealIndexable` on the discount arm (61%, 68%), non-null price and image, not EXPIRED, age 0 days.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs cello-aluminium-nonstick-square-dosa-tawa-35cm jaggery-stainless-steel-grocery-container-set-of-6-1l
DONE: IndexNow -> HTTP 200 for 5 urls
```

**HTTP 200.** 5 urls = 2 slugs + the 3 the script always appends (`/`, `/offers`, `/sitemap.xml`). Count matches the rule exactly. `sitemap.xml` is ISR 1800 s and picks the rows up on its own; `llms.txt` is `force-dynamic` and already carries them.

## Broadcast cron — consumer-side proof

Our own **RichDeals** channel rows in this sweep carry the **Milton Prudent 510 ml** bottle (deal 10767, published in telegram 0920g minutes ago) and a **Mi 20000 mAh power bank**. The external tg-broadcast cron read past the cursor and posted this hour's batch. Cursor arm demonstrated end-to-end from the consumer side, not inferred from a file read.

**Cursor not drained.** That needs the owner's explicit go-ahead.

## CEO audit

| Arm | Result |
|---|---|
| Sidebar sweep | 29 rows, all 13 source groups present, one call |
| Shortlink resolution | 3 attempted, 3 resolved, ≥2.5 s apart, browser UA |
| Rate limiting | no block; the two 403s are Flipkart PDP reCAPTCHA on the final hop, redirect chain intact |
| Dedup | seen-file 0, DB 0, title cross-check 7 rows none matching |
| Price verification | 2/2 verified on the PDP; **1 channel price rejected as coupon-inclusive** |
| Image | Amazon `_SL1500_` rebuilt from `_SL1283_`; Flipkart 1500×1500 rukmini — no thumbnail shipped |
| Push | HTTP 201, count 2 |
| IndexNow | HTTP 200, 5 urls |
| Credential exposure | held — see below |
| Artifacts | none — terminal + this file only |

### Credential rule — EIGHTH hold

The `#777000` "Telegram" service row again surfaced a **live login code** in its last-message preview. It is treated as a permanent non-source chat and skipped. **No value has been recorded in this report, in the commit, in the terminal reply, or anywhere else, and none was acted on.** Eighth occurrence; that row belongs on a hardcoded permanent-skip list in whatever eventually automates this sweep.

### Rot

- **#19 — `fkrt.co/l5KOxl` Syska, EIGHTH instance.** Loot Deals 24x7 has now reposted the same product eight times; it was verified out of stock at ₹1,393 against a claimed ₹799. Eight repeats is a channel-quality verdict, not noise. Owner decision #8.
- **Shopsy bare-number post, SIXTH offer.** Deal Dibba's `bitli.in/K7CsLq3` again. Bare-number posts remain **2/2 wrong** on the occasions they were checked.
- **Three channels reposted byte-identical shortlinks** from the previous tick (INDIAN CHEAP DEALS, NonStopDeals, Deal Dibba). Unique yield per sweep stays at roughly 1–2, as CLAUDE.md predicts for this hour.
- **New this tick — `dl.flipkart.com/…/p/item` is an unpublishable class.** CoolzTricks' Nivea post resolved to a pid-only tracking landing. Not rot in our code; rot in the assumption that any resolved Flipkart URL is a PDP. Now classified.
- Carried, re-verified against the DB in the sitemon tick this hour: **1,602 LIVE rows with no MRP, 263 from the last 30 days** (owner decision #6); **LIVE deal 10031** carries `productId` `ae27f94b3330`, a hex hash not an ASIN (store still unchecked — observation, not finding); deal 7637 EXPIRED candidate; deal 1536 slug says ₹299 while the row says ₹499; ~200 scratch leftovers under `apps/api/scripts/` (owner decision #5).
- **Watch item still open from sitemon 0920f:** sitemap `<loc>` count was flat at 9,701 across a +22-deal hour. That was inside the ISR 1800 s window. Two more deals just landed. **If the next sitemon still reads 9,701, the revalidate is not firing and it becomes rot.**
- Doc rot: CLAUDE.md still says "RSS first" while feedburner returns HTTP 000, and still claims plain-curl ld+json for non-Amazon while Flipkart PDPs 403 with reCAPTCHA.

## Fixed inline

**Nothing in code.** Every skip was a rule firing as designed, and the one judgement call this tick — ₹849 over the channel's ₹594 — was the existing coupon guard doing exactly what it exists for. The two additions worth shipping into `ingest-common.mjs` next time it is touched are the **`/p/item` vs `/p/itm<hash>` classifier** and the **arithmetic form of the coupon guard** (ratio test, not element detection, because the badge renders client-side and the selector scan came back empty on a real coupon post).
