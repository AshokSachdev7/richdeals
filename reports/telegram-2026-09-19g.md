# TELEGRAM-DEAL-MONITOR + SITEMON tick — 2026-09-19 (g)

Yield: **0 new deals**. Every single-product candidate in the sweep was either already
LIVE, a search page, price-drifted/out of stock, or unverifiable. No push, therefore no
IndexNow ping (nothing was shipped).

## Telegram sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` → 27 rows covering the 13 groups in `data/tg-groups.json`.

### Candidates resolved (6 from sidebar previews)

| Source group | Shortlink | Resolves to | Verdict |
|---|---|---|---|
| Dealzone | `link.amazon/B0fYFLAAS` | `amazon.in/s?k=U.S.+Polo+Assn.` | **Reject** — search page (rot #13) |
| Dealdost | `bitli.in/YJLzp2n` | `meesho.com/s/p/hlnv0j` | **Reject** — Meesho 403s curl, price unverifiable (rot #18) |
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | *(unresolved — returns itself)* | **Reject** — rot #5 reconfirmed |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` | `/dp/B0G38DGNKM` | **Dup** — deal #7110 LIVE ₹3459 |
| NonStopDeals | `amzn.to/4uZXfjK` | `/dp/B07QX21WZQ` | **Dup** — deal #5825 LIVE ₹549 |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` | Flipkart `PWBGGD4THDQZYAY6` | **Reject** — see below |

**Flipkart Syska 10000 mAh Power Bank** was the one candidate genuinely absent from the
DB, so it was price-verified rather than trusted to the seen cache (rot #15: the cache is
not a dedup authority). Read in the logged-in browser tab, ld+json `Product.offers`:

```
price 1393 INR   availability OutOfStock
```

Telegram posted it at ₹799. Drift ₹594 **and** out of stock — reject on both counts. That
is why it sits in the seen cache but never reached the DB.

### Chat opened for full text

`ONLINE SHOPPING DEALS` — its sidebar preview was truncated with no URL. Opened it and
read the last 10 messages: 9 single-product Amazon posts, all `link.amazon` 9-char codes
(rot #21 holds). Resolved and deduped all 9:

| ASIN | DB |
|---|---|
| B0B4DJJV5X | #10460 LIVE ₹289 |
| B09YVRGRFZ | #10461 LIVE ₹289 |
| B0G5PN6HHY | #102 LIVE ₹5199 |
| B0DDZ3KLWD | #10458 LIVE ₹499 |
| B0GZ4VXTVB | #10480 LIVE ₹299 |
| B0CL4BR6BS | #10481 LIVE ₹299 |
| B0B9G9J7WD | #10499 LIVE ₹199 |
| B07YWM9WMG | #7829 LIVE ₹100 |
| B0HGBNK6VM | #10526 LIVE ₹199 |

Nine for nine already live. That group's newest message is dated "Fri", i.e. the chat is
stale — consistent with rot #20 (9 of 13 groups are stale).

### Skipped, with reason

CoolzTricks (4 links = multi-product) · Deal Dibba (multi-brand "Loot :") · IndiaFreeStuff
Tips & Tricks (Swiggy Instamart *search* URL) · Hidden Loot Deals (Blinkit offer, no
product URL) · OMG LOOTDEALS ("video dekho paisa kamao" ad) · SB Loots And Deals
(notification-settings meta post) · both RichDeals rows (our own channel) · the
iPhone-rates channel (not in `tg-groups.json`) · all DMs and bots.

**The Telegram service chat row again surfaced a live login code in its preview — the
seventh consecutive tick.** Per the standing credential rule the value was not echoed
anywhere, not acted on, and the row stays on the permanent-skip list.

## Dedup integrity note

The first dedup pass checked the seen cache with `JSON.stringify(keys).includes(id)`, which
reported all four candidates seen — including a 6-char Meesho id that could match as a
substring of any longer entry. Re-ran with exact `Set.has()` plus a `ZZZZFAKE123` control
probe: the four were genuine hits, but the sloppy check would have hidden a real one. Same
class of bug as the slug-prefix false positive. Exact membership only, always with a
control probe.

## SITEMON

All 7 prod endpoints 200:

```
200 0.215381  /
200 0.097126  /offers
200 0.566946  /blog
200 0.500169  /sitemap.xml
200 0.111410  /feed.xml
200 0.104980  /api/deals
200 0.324402  /llms.txt
```

## CEO audit (verified against DB)

| Check | Result |
|---|---|
| Deals | LIVE 10278 · PENDING_REVIEW **0** · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4 |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10624 — **drift 142**, unchanged (rot #4) |
| Unpushed commits | none before this tick |

Nothing new rotted. No junk to delist — the null-price/null-image classes are both empty.

## Fixed inline

`CLAUDE.md` "Telegram deal sourcing" documented the chat-open recipe as
`browser_click({target: ref, ...})`. That is wrong and cost three failed calls this tick:
`target` is a **CSS selector**. Passing the ref gives "does not match any elements";
passing the link text gives a CSS parse error on the emoji in the group title. The working
form is `browser_click({target: 'a[href="#<chatid>"]', element, ref})`, with the chatid
read off the `/url:` line in the `browser_find` output. Also corrected: `browser_find`
takes `text:`/`regex:`, not a prose `query:`. Doc updated.

## Rot standing

29 items. Reconfirmed this tick: #2 (price drift is the dominant reject reason), #5
(`rogerkart.com/r/` unresolvable), #13 (`/s?` search trap), #15 (seen cache is not a dedup
authority — it held an id the DB rightly lacks), #18 (Meesho unverifiable, 403 to curl),
#20 (stale groups), #21 (`link.amazon` codes are 9 chars). #29 is this tick's CLAUDE.md
click-recipe error, now fixed rather than carried.
