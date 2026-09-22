# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 05:55 IST

**Result: 4 published (#10845-10848), IndexNow HTTP 200 / 7 urls.** 9 candidates scraped, 4 pass verification, 5 rejected — every single rejection on the PDP, not on the shape of the post.

## Sidebar returned nothing for the third tick running

One `browser_evaluate` over `.chat-list .ListItem.Chat` in profile `richDeals`: **byte-identical to the 04:47 and 03:47 sweeps.** Same 25 rows, same last-message text on all 13 sanctioned groups.

Escalated to message-history scraping, per the trap logged last tick — the sidebar preview is a *latest-message* view, not a *new-message* view, so a group that posted a burst of deals and then one non-deal line looks dead. Trusted click into **Loot Deals 24x7** (`-1002009042084`) via `browser_click({target:'a[href="#-1002009042084"]'})`, then `.message-content` scrape.

**14 messages read → 8 single-product candidates the sidebar never showed**, plus 6 correctly skipped (3 category/collection posts, 2 multi-product loot dumps, 1 channel promo). A ninth candidate (Flipkart Syska) came off the same sweep as a pid-only link.

Second group checked: **INDIAN CHEAP DEALS** (`-1001552238721`) is **dead** — newest message is "edited on Aug 21", everything behind it is March/April. Flagged below.

## Dedup — 9 candidates, 9 fresh

`_dd-0922g.mjs` then `_dd-0922g2.mjs`, serial Prisma (managed PG has ~22 slots; `Promise.all` throws `P2037`). Matched on `productId` with an `affiliateUrl contains` fallback, because the Flipkart posts carry `itm…` ids while our DB stores the `pid`. Zero dups — this group has never been harvested before.

## PDP verification — 9 read, 4 pass

Channel price trusted on none. Amazon read off `#centerCol` innerText in the logged tab; Flipkart via ld+json through a same-origin bulk `fetch()`; Ajio via its own JSON API.

| Product | Channel said | PDP truth | Verdict |
|---|---|---|---|
| Amazon `B09V2KNSTH` JIALTO Broom & Mop Holder, 3-pack | (no price) | **₹275 / ₹999, 72%, In stock** | publish |
| Flipkart `MRCEGZ8Y8X6FNTQU` Panasonic 27 L Convection Microwave | ₹11,240 | **₹13,900** / ₹17,500, InStock | publish at ₹13,900 (21%) |
| Flipkart `HBLFZYRZHXE5QTMA` MAHARAJA WHITELINE 175 W Hand Blender | ₹899 | **₹1,079** / ₹1,449, InStock | publish at ₹1,079 (26%) |
| Flipkart `MRCDWK8TTHVHW3WY` IFB 23 L Convection Microwave | (no price) | ₹11,690 / ₹16,790, InStock | publish (30%) |
| Flipkart `itm3d0853f5a623c` Fire-Boltt Fire Pods Ninja G201 TWS | ₹1,199 | ₹1,049, **OutOfStock** | REJECT |
| Flipkart `PWBGGD4THDQZYAY6` Syska 10000 mAh Power Bank | ₹799 | **₹1,388 / ₹1,799, OutOfStock** | REJECT |
| Myntra `15721006` KASSUALLY Women Knitted Sweater | ₹599 | ₹1,999, **OutOfStock** | REJECT |
| Ajio `464865527_navy` BULLMER Pack of 2 Hoodies | ₹848 | **₹3,998 = MRP, outOfStock** | REJECT |
| OPPO `P1100143` OPPO A38 (via `extp.in/Q5OInR`) | ₹12,999 | **HTTP 404** soft-404 shell | REJECT — dead link |

**Three of four Flipkart prices the channel quoted were wrong, and four of nine candidates were out of stock.** Loot Deals 24x7 posts real products but its numbers are stale on arrival — the yield is fine, the prices are decoration.

Note the two microwaves are the honest discounts here (21% and 30%); neither is a loot price, both are real MRP-backed cuts on ₹15k-class appliances.

## Four new traps, all cost a candidate

**1. A pid-only Flipkart link is recoverable: `https://www.flipkart.com/<anything>/p/itme?pid=<PID>` resolves the real PDP.** This replaces the previous dead end. `search?q=<pid>` is useless — the query string is echoed into every result href, so `a[href*="<pid>"]` matched 120 unrelated products (first hit was an Asus Vivobook). A name-based search then filtered by pid returned 0. The `/p/itme?pid=` form served full ld+json on the first try and immediately proved the Syska was out of stock at ₹1,388, not in stock at ₹799.

**2. `"pid"`/`"mrp"` regexes only match FETCHED HTML, never the hydrated live DOM.** The Fire-Boltt row was parsed off a live page and both came back `undefined`. Those keys live in the server-rendered JSON blob that React discards on hydration.

**3. Ajio 403s a real logged-in browser tab, not just curl** — `browser_navigate` to the PDP returned **HTTP 403 "Access Denied"**. The homepage loads 200, and from there a same-origin `fetch('https://www.ajio.com/api/p/<id>')` returns the full product JSON (`price.value`, `wasPriceData.value`, `stock.stockLevelStatus`). That API is the Ajio read from here on; the PDP HTML is unreachable and ships no ld+json anyway.

**4. My link regex misses `extp.in` and `myntr.in`.** Those URLs appear only in the message *text*, never in the `<a>` element array, so the standard href harvest silently drops them. Separately, `extp.in` resolved to a 164 KB OPPO Store shell that returns **HTTP 404** — a dead affiliate deep link that renders like a real page. Status code must be checked, not just body length.

## Push + freshness

`apps/api/scripts/push-tg-0922g.mjs` — direct Prisma, `status:'LIVE'`, `priceHistory` seeded, two stores (`amazon` + `flipkart`). Pre-flight assertions on every row: title-₹-vs-price, `price < mrp`, and a new image-host whitelist (`m.media-amazon.com` or `rukmini*.flixcart.com` only). **created=4 updated=0** → #10845-10848.

Flipkart `productId` stored as the **pid**, matching the existing 10783/10782/10781 rows; `affiliateUrl` keeps the real `/p/itm…` path plus `affid=djhackraj`.

```
node apps/api/scripts/indexnow-ping.mjs <4 slugs>
DONE: IndexNow -> HTTP 200 for 7 urls
```

7 = 4 slugs + 3 standing paths, as expected. Sitemap is ISR 1800s, llms.txt is force-dynamic — both pick the batch up unaided. All 9 product ids appended to `data/tg-multi-seen.json`, now **1,776** entries.

## Flags

**INDIAN CHEAP DEALS (`-1001552238721`) is dead — NEW.** Newest message dates to Aug 21, a month of silence, prior messages are March/April. It is one of the 13 sanctioned groups in `data/tg-groups.json` and it is costing a scrape every tick for a guaranteed zero. Recommend dropping it from the list. Owner decision — that file was deliberately re-verified 2026-09-13 and is not being edited silently.

**Unlisted group, fourth consecutive flag:** `𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) still posting single-product Tata Cliq links — right shape, Cuelinks-eligible, still not in `data/tg-groups.json`. Owner decision.

**Amazon.in is still signed OUT in the `richDeals` profile** (second tick). CLAUDE.md states the profile is logged in to both Telegram Web and Amazon.in; half of that is untrue. Public price and stock still render, so this tick's Amazon read is sound, but member pricing, cart price and clip-coupons will silently read the public number. Not fixed — logging in touches the owner's credentials.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-17=3 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (past, unfixable) |
| coverless / seo-less posts | 0 / 0 | OK |
| LIVE deals | 10,501 (+4 this tick) | OK |
| LIVE null price / null image | 0 / 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10844 vs DB max 10848 | expected — this tick's 4, next broadcast run clears it |
| unpushed commits | 0 before this report | OK |

**Standing structural risk (unchanged, eighth tick running):** every one of these jobs exists only inside this Claude session. `schtasks` has zero richdeals entries and session crons are in-memory, so the moment this session closes, deal ingest, blog publishing and the audits all stop, with no alert. Task Scheduler wiring was offered in an earlier session and never approved — nothing was changed.
