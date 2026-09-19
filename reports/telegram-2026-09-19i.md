# TELEGRAM-DEAL-MONITOR tick — 2026-09-19 (i)

Yield: **0 new deals**. Exactly one candidate in the whole sweep was new to both the seen
cache and the DB — a Bata heel from CoolzTricks — and it is **currently unavailable** on
Amazon. No `/admin/deals/bulk` push, so **no IndexNow ping was due**; nothing is sitting in
the DB unshipped.

## Sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` → 25 rows covering the 13 groups in `data/tg-groups.json`. No
chat was opened and no reload was needed — every deal group's preview carried its full post
or its shortlink.

**24 of 25 previews are byte-identical to the 09-19h sweep an hour ago.** The single
changed row is CoolzTricks, and its change is interesting: last tick it was a 4-link
multi-product post (skipped as multi), this tick it is one product with one link, so it was
evaluated properly instead of skipped.

## The one new candidate

| Group | Post | Shortlink | Resolves to |
|---|---|---|---|
| CoolzTricks Official | Bata Women LILLE TR Heels @386 | `amzn.to/4yQn4VY` | `/dp/B0B94RNTXP?psc=1&th=1&tag=collab-amafhh-21` |

Source tag `collab-amafhh-21` — a new one, not the `vivek123034-21` the `link.amazon`
channels carry. Noted, not acted on; the tag is stripped either way.

**Dedup — clean on both sides, with a control probe:**

```
DB   B0B94RNTXP  ABSENT     ZZZZFAKE123 ABSENT (control behaved)
seen B0B94RNTXP  false      ZZZZFAKE123 false   (1754-entry flat array, exact Set.has)
```

Genuinely fresh, so it went to price verification rather than being trusted to either cache.

**Verification — logged-in Amazon tab, same-origin `fetch(..., {credentials:'include'})` +
`DOMParser`:**

```
title   Bata Women LILLE TR Heels, Red, (7715598)
price   null      mrp null      #add-to-cart-button absent
#availability → "Currently unavailable. We don't know when or if this item
                 will be back in stock."
image   https://m.media-amazon.com/images/I/51fZjgSk4mL._SY395_.jpg  (real CDN)
```

**Reject — out of stock.** The first read returned `price: null` with no cart button, which
is ambiguous between a size-twister parent page and a dead listing, so a second read was
spent on `#availability` / `#outOfStock` before writing the verdict down. It is dead, not
a twister: the 6 twister nodes are size chips on an unbuyable parent, and the five `.a-price`
values on the page (₹699 / ₹645 / ₹1,399 / ₹349 / ₹677.34) belong to sibling and
recommendation cards, not the buybox. **None of them was taken as the price.** Publishing a
recommendation-strip price as the deal price is exactly the failure this check exists for.

## Skipped, with reason

| Group / row | Reason |
|---|---|
| SB Loots And Deals | notification-settings meta post |
| Deal Dibba | multi-brand "Loot :" post, 3 links |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart **search** URL |
| Hidden Loot Deals & Offers | Blinkit basket offer, no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" ad |
| RichDeals | our own channel |
| iPhone-rates channel | not in `tg-groups.json` |
| all DMs and bots | not deal sources |

### Unchanged rejects and dups carried from 09-19h

| Group | Link | Status |
|---|---|---|
| Dealzone | `link.amazon/B0fYFLAAS` | Amazon `/s?` search page (rot #13) |
| Dealdost | `bitli.in/YJLzp2n` | Meesho, 403s curl, unverifiable (rot #18) |
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | unresolvable (rot #5) |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` | Syska power bank — drift ₹594 + out of stock |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` → B0G38DGNKM | dup, deal #7110 LIVE ₹3459 |
| NonStopDeals | `amzn.to/4uZXfjK` → B07QX21WZQ | dup, deal #5825 LIVE ₹549 |
| ONLINE SHOPPING DEALS | Aqueria sunscreen → B0HGBNK6VM | dup, deal #10526 LIVE ₹199 |

None was re-resolved — the previews are identical strings to last tick's, already resolved
and recorded there. Re-resolving them would be the rot #19 waste pattern in a second
pipeline.

## Credential-handling note — ninth consecutive tick

The Telegram service chat row again surfaced a live login code in its last-message preview.
The value was **not echoed** into this report, the terminal reply, the commit or any scratch
file, and was not acted on. That row stays on the permanent-skip list and is never treated
as a deal source.

## Prod endpoints — all 200

```
200 0.263496  /
200 0.119408  /offers
200 0.495918  /blog
200 0.275769  /sitemap.xml
200 0.091172  /feed.xml
200 0.156205  /api/deals
200 0.392686  /llms.txt
```

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE 10278 · PENDING_REVIEW **0** · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** — nothing to classify, nothing to delist |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4 |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10624 — **drift 142**, unchanged (rot #4) |
| Unpushed commits before this tick | 0 |

Deal counts are identical to the four previous ticks today, which is consistent with a day
in which every source has re-served an already-ingested or already-rejected set.

## Rot standing — 29 items

Reconfirmed: **#5** (`rogerkart.com/r/` unresolvable), **#13** (`/s?` trap), **#18** (Meesho
unverifiable), **#20** (stale groups — 24 of 25 previews unchanged in an hour, the hardest
evidence yet), **#21** (`link.amazon` codes 9 chars). **#12** stays half-fixed.

Nothing new rotted, nothing added. The out-of-stock Bata heel is a normal reject, not rot.

## Open owner decisions — unchanged at 10

**#8** — prune the dead Telegram groups in `data/tg-groups.json` — keeps gaining weight.
This tick spent its whole sweep re-reading 24 previews it had already read an hour earlier
to find one candidate, and that candidate was dead on arrival. **#7** (persist a reject
cache, rot #19) remains top of the list.
