# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 09:05 IST

**Result: 9 candidates → 4 published LIVE (`#10853`–`#10856`), 2 DB dups, 1 `/s?` search-page skip, 2 quality rejects. `DONE: IndexNow -> HTTP 200 for 8 urls`. 5/5 slugs verified 200 on prod. One inline CEO rot fix (`#2186`). One carried audit claim RETRACTED — see the schtasks correction.**

## Discovery — one sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` (`.title h3` + `.subtitle .last-message`), Playwright MCP profile `richDeals`, `web.telegram.org/a/`. All 13 sanctioned groups from `data/tg-groups.json` read in that single call — no per-chat opens, no `take_snapshot` (~20x the tokens).

9 product candidates fell out. Shortlinks (`amzn.to`, `fkrt.cc`) resolved in two passes before any dedup, because the link code is never the ASIN and the `/s?` shape is only visible after resolution.

| candidate | channel text | outcome |
|---|---|---|
| `B0HJDXX7F6` | ₹399 | **PUBLISHED** `#10853` |
| `B0B6PTQFDQ` | ₹179 | **PUBLISHED** `#10854` |
| `B0GK1HT8JT` | "Lowest : 4685" | **PUBLISHED** `#10855` (PDP truth 5784) |
| `MSCGSHFNGKHRXKCP` | ₹178 | **PUBLISHED** `#10856` (PDP truth 208) |
| `B07D364DQD` | — | DB dup |
| `PWBGGD4THDQZYAY6` | — | DB dup (already `seen=true`) |
| resolved `/s?hidden-keywords=…` | — | search page → SKIP |
| `B07KSPKVGL` | — | quality reject |
| `B0HKJ75RZJ` | — | quality reject |

Dedup: two probes against `data/tg-multi-seen.json` (1,784 entries at tick start) **and** the live DB, serially through Prisma — `findFirst({productId})` with an `affiliateUrl:{contains:id}` fallback. Managed PG has ~22 slots; `Promise.all` here returns `P2037`.

**Unsanctioned group, seventh consecutive tick:** `𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦` (`-1004400885213`) sits in the sidebar but is not in `data/tg-groups.json`. Not scraped. That file is owner-owned; group add/drop is an owner decision, not something a tick edits silently.

## Verification — every price is PDP truth

Amazon: **one** same-origin bulk `fetch(url, {credentials:'include'})` from the open `amazon.in` tab (tab 2). 4 ASINs, 4× HTTP 200. Then `DOMParser`, clone the node, `querySelectorAll('style,script').forEach(n=>n.remove())`, read `textContent` — `innerText` on a detached DOMParser doc returns inline CSS and JS, not copy.

| productId | store | PDP price / MRP | Off | Stock | Source of price |
|---|---|---|---|---|---|
| `B0HJDXX7F6` | Amazon | 399 / 1499 | 73% | In stock | `.basisPrice` + `.savingsPercentage` |
| `B0B6PTQFDQ` | Amazon | 179 / 599 | 70% | In stock | same |
| `B0GK1HT8JT` | Amazon | 5784 / 7590 | 24% | In stock | same |
| `MSCGSHFNGKHRXKCP` | Flipkart | 208 / 650 | 68% | InStock | ld+json + ancestor walk |

`B0GK1HT8JT` drifted hard against the channel's "Lowest : 4685". **Published anyway at 5784.** Drift is never a rejection reason — the PDP is the truth and the channel is a lossy copy of it. (That correction is standing; it was wrongly raised as a reject class in an earlier tick and retracted.)

### Methodology finding — the Flipkart sponsored-AD MRP trap

The obvious body-text read is wrong, and it is wrong quietly, which is worse.

```
/₹[\d,]+\s*\n?\s*₹([\d,]+)/ over document.body.innerText  →  324
real MRP                                                   →  650
```

Flipkart PDPs embed sponsored **"AD"** product rows inside the page body, each carrying its own price, its own MRP and its own %-off. A body-text regex, a `line-through` element scan and a `%off` class scan are **all three** polluted by those rows — they return a neighbouring advertised product's numbers with no error and no signal that anything is off. 324 would have shipped a 68%-off product as 36% off.

Correct read, and the one to reuse:

1. Take the price from ld+json (`Product.offers.price` → `208`).
2. Walk the DOM for the **leaf** node whose `textContent.trim()` equals `₹208`.
3. Walk ~5 ancestors up from that leaf.

That block's `innerText` reads `"68% | 650 | ₹208"` — price, MRP and discount together, anchored to the node that actually holds the product's own price. A shallower `closest('div').parentElement` stops inside the price span and reads nothing.

### Quirk — `.a-offscreen` read empty

`#corePriceDisplay_desktop_feature_div .a-price .a-offscreen` returned **`""` for all 4 ASINs** in this pass, while `.basisPrice` and `.savingsPercentage` on the same fetched document read correctly. Nothing was blocked (prices were already established from the earlier pass and agreed), but **do not trust `.a-offscreen` as a sole price read** — it joins `a-text-price` (per-unit rate) and apparel `#centerCol` nulls on the list of Amazon price selectors that fail silently.

Images: real CDN assets only. Amazon via `/"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g` over raw HTML → `_SL1500_` / `_SL1080_`. Flipkart via ld+json `image` → `rukmini1.flixcart.com/image/1500/1500/…?q=70`. Pre-flight in the push script rejects any host outside `m.media-amazon.com | rukmini*.flixcart.com | img.tatacliq.com`.

## Push — `apps/api/scripts/push-tg-0922l.mjs`

```
NEW 10853 graphene-8-ring-stacking-toy-babies-6-months
NEW 10854 tiefit-mens-accupressure-non-slip-slipper
NEW 10855 microtek-super-power-new-900-inverter-800va-home-ups
NEW 10856 parachute-advansed-cocoa-repair-body-lotion-coconut-milk

created=4 updated=0
```

| id | slug | price / mrp | off | flags |
|---|---|---|---|---|
| 10853 | `graphene-8-ring-stacking-toy-babies-6-months` | 399 / 1499 | 73% | `isHot` |
| 10854 | `tiefit-mens-accupressure-non-slip-slipper` | 179 / 599 | 70% | `isSuper` `isHot` |
| 10855 | `microtek-super-power-new-900-inverter-800va-home-ups` | 5784 / 7590 | 24% | — |
| 10856 | `parachute-advansed-cocoa-repair-body-lotion-coconut-milk` | 208 / 650 | 68% | `isSuper` `isHot` |

All four `status:'LIVE'` explicitly — the schema defaults `DealStatus` to `PENDING_REVIEW`, so an omitted status would have parked the batch behind a review gate that the AUTO-APPROVE directive removed. `priceHistory` seeded on each create.

Affiliate tags: Amazon `?tag=ashoksachdev-21` on `/dp/ASIN`; Flipkart `?pid=MSCGSHFNGKHRXKCP&affid=djhackraj` on a `/p/itm…` path. Source-channel tags stripped (`rogerkart-21`, `bhavesh015-21`, `affid=rohanpouri` + `affExtParam1=ENKR…` and the rest).

Pre-flight assertions that gate the write, all passed: title ₹ diffed against the numeric `price` (a hand-typed ₹ that disagrees ships a page whose visible copy contradicts its own Product schema), `price < mrp`, image host whitelisted.

Descriptions written from the fetched `#productTitle`, `#feature-bullets` and `#bylineInfo` rather than paraphrased — `B0GK1HT8JT`'s bullets supplied the 675W-vs-800VA ceiling and the CCCV charging stage, `B0HJDXX7F6`'s the 8-rings-plus-8-cups detail. Nothing copied verbatim from any channel.

## Freshness — the batch is shipped, not sitting in the DB

```
node apps/api/scripts/indexnow-ping.mjs \
  graphene-8-ring-stacking-toy-babies-6-months \
  tiefit-mens-accupressure-non-slip-slipper \
  microtek-super-power-new-900-inverter-800va-home-ups \
  parachute-advansed-cocoa-repair-body-lotion-coconut-milk \
  ucb-phantom-34l-laptop-backpack-b0fnx1
DONE: IndexNow -> HTTP 200 for 8 urls
```

8 = 5 slugs + the 3 standing paths the script always prepends and dedups (`/`, `/offers`, `/sitemap.xml`). Known behaviour, matches every prior tick — the sitemap is submitted inside the same POST, a separate call would be a duplicate. No 422, so the Bing GET fallback was not needed.

`#2186` was included deliberately: its title, price, MRP and image all changed, so the indexed copy was stale in four fields.

Prod verification of all 5:

| slug | status | size |
|---|---|---|
| `/graphene-8-ring-stacking-toy-babies-6-months` | 200 | 174,540 b (0.23 s) |
| `/tiefit-mens-accupressure-non-slip-slipper` | 200 | 173,765 b |
| `/microtek-super-power-new-900-inverter-800va-home-ups` | 200 | 174,882 b |
| `/parachute-advansed-cocoa-repair-body-lotion-coconut-milk` | 200 | 167,783 b |
| `/ucb-phantom-34l-laptop-backpack-b0fnx1` | 200 | 168,364 b |

Deal freshness checked against `/llms-full.txt`, not `/llms.txt` — `apps/web/src/app/llms.txt/route.ts` never imports `getDeals`, so a deal batch checked there reports a false miss every time. (CLAUDE.md freshness rule #3 names the wrong file for deals; flagged in tick j, not edited — that is the owner's operating doc.)

Seen-cache appended: `seen before 1784 added 8 now 1792`. 9 ids offered, 8 written — `PWBGGD4THDQZYAY6` was already `seen=true`. `data/tg-multi-seen.json` is gitignored; the append is local-only and is **not** committed.

## CEO audit

```
LIVE 10509 | PENDING 0 | nullPrice 0 | nullImage 0 | maxId 10856
posts 322 | coverless 0 | seoless 0
perDayIST {"2026-09-15":3,"2026-09-16":3,"2026-09-17":3,"2026-09-18":3,
           "2026-09-19":3,"2026-09-20":2,"2026-09-21":1,"2026-09-22":3}
cursor {"lastId":10852,"ts":1790044448951}
tatacliq deals 1
```

| Check | Value | Status |
|---|---|---|
| LIVE deals | 10,509 | OK |
| PENDING_REVIEW backlog | 0 | OK |
| null price / null image | 0 / 0 | OK |
| posts/day IST 09-22 | 3 (target 2-3, cap 4) | OK |
| coverless / seo-less posts | 0 / 0 | OK |
| tg-broadcast cursor | 10852 vs max 10856 | drift, self-heals |
| prod slugs pinged | 5/5 200 | OK |
| `mrp:null` rot | `#2186`, **fixed inline** | fixed |
| OS cron wiring | **carried claim retracted** | see below |

### Rot fixed inline — `#2186`

```
BEFORE  price 699 | mrp null | discountPct null | status LIVE
        "UCB Phantom 34L Laptop Backpack at ₹699 – Amazon"
        image .../31c916zhawL.jpg
AFTER   price 1249 | mrp 2499 | discountPct 50 | status LIVE
        "United Colors of Benetton Phantom 34L Laptop Backpack at ₹1249 (50% Off) – Amazon"
        image .../51HLtuA80fL._SL1200_.jpg
```

Two defects, not one. The known one was the stale ₹699 with `mrp:null` / `discountPct:null` against a live PDP reading 1249/2499 In stock — a page advertising a price the store stopped honouring, with no discount to show because the MRP was missing. The second only surfaced while fixing the first: **the old image `31c916zhawL.jpg` carries no `_SL` suffix** — it is a tiny thumbnail, not a CDN-size asset, so the OG card and the product shot were both rendering upscaled mush. Both fixed, `priceHistory` row seeded, page re-pinged, verified 200.

**Blind spot worth naming:** the audit probe's `nullPrice 0 / nullImage 0` is clean and was clean while `#2186` was broken. The probe checks `price` and `image` for null; it does **not** check `mrp` or `discountPct`. A row with a real price and a null MRP hides inside the healthy LIVE bucket. If a future tick wants this class caught automatically, the probe needs an `mrp:null, status:LIVE` count — flagged, not added, because the audit script is reused across ticks and widening it mid-tick changes what every prior number meant.

### CORRECTION — the "zero schtasks richdeals entries" claim is wrong

Carried forward for roughly sixteen consecutive ticks and **retracted here**:

```
TaskName:       \richdeals-tg-broadcast
Next Run Time:  22-09-2026 09:09:00
Status:         Ready
Last Run Time:  22-09-2026 09:04:01
Last Result:    0
```

That is a real Windows Task Scheduler entry, firing on a ~5-minute cadence, whose last run completed cleanly (`Last Result 0`) one minute before this audit. **tg-broadcast is not session-dependent and never was.** The claim that Task Scheduler holds zero richdeals jobs must not be restated.

The accurate statement of the risk, narrowed:

- **OS-level, survives session exit:** `richdeals-tg-broadcast`. Also `desidime` per CLAUDE.md, which runs as an external cron.
- **Session crons only, die with the session:** the remaining roster in `.claude/cron-schedules.md` — telegram-deal-monitor, deal-ingest, CONTENT-SEO blog, INDEXNOW, SCHEMA-AUDIT, SITEMON + CEO audit, AI-OVERVIEW, SEO-AUDIT-FIX. Session closes → ingest, blog publishing, audits and IndexNow pings all stop silently.

So the broadcast path is safe and the *sourcing and publishing* path is not. The structural fix was offered in an earlier session and never approved; **nothing was changed here**, and the wrong counter is now dead rather than being carried into a seventeenth tick. This is the exact failure mode the CEO-audit rule exists to catch — an unverified finding repeated until it reads as fact.

### Carried, unchanged

- **tg-broadcast cursor 10852 vs DB max 10856** — drift only. The external 5-min task advances it; re-reading the file next tick shows it caught up. Never rot, never re-flag.
- **posts/day IST 2026-09-21 = 1** — past and unfixable. 09-22 is at 3, inside target.
- **Amazon.in signed-out state in the `richDeals` Playwright profile** — **not re-probed this tick.** The `credentials:'include'` fetches returned public prices and stock normally, which is all this tick needed, so the state is reported as unchanged-by-inference rather than as a fresh check. Still not fixed: logging in touches the owner's credentials.
- **DO API token** pasted in chat during setup, still unrotated. Provisioning is done; the token is not needed for daily work. Owner action.

### Security note

The sidebar sweep returned a `Telegram` service-chat row containing a **live login code**. It is a credential. It was not echoed, not acted on, and appears nowhere in this report, the commit, or any scratch file — and must stay that way in any future tick that reads the same sidebar.

---

*Tick clock computed from the prod verification, not assumed. 4 publishes, 1 repair, 5 URLs pinged at HTTP 200, 1 false audit finding retired.*
