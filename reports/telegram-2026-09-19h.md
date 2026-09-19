# TELEGRAM-DEAL-MONITOR tick — 2026-09-19 (h)

Yield: **0 new deals**. Every single-product candidate across the 13 groups was already
LIVE in the DB, an Amazon search page, unverifiable, or an unresolvable shortlink. No
`/admin/deals/bulk` push, therefore **no IndexNow ping was due** — nothing was shipped, so
nothing is sitting unpinged.

## Sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` → 25 rows, covering the 13 groups in `data/tg-groups.json`.
No chat reload was needed: the only row with a genuinely new preview
(`ONLINE SHOPPING DEALS`, Aqueria sunscreen) was already the open chat in tab 0, so its
last 7 single-product messages were scraped in place from
`.message-list-item .text-content`.

## Candidates resolved — 7 `link.amazon` codes

`curl` with a browser UA, 1 s apart. All 9-char codes (rot #21 holds, third consecutive
tick), all resolving to `/dp/ASIN` carrying the source tag `vivek123034-21`. Two came back
in the odd `https://www.amazon.in/source=offertag.in/dp/<ASIN>?…` path form — the tolerant
ASIN extractor handled both.

| Code | ASIN | Product | Posted ₹ |
|---|---|---|---|
| `B0hhm2R1h` | B0G5PN6HHY | VW washing machine | 5199 |
| `B04NQ7AQJ` | B0DDZ3KLWD | Lenskart BLU | 499 |
| `B00daUC2t` | B0GZ4VXTVB | Hangover perfume | 299 |
| `B0a2n4R0a` | B0CL4BR6BS | Wonderchef salad spinner | 299 |
| `B0763RJaj` | B0B9G9J7WD | Myx palazzo | 199 |
| `B09rjoMmQ` | B07YWM9WMG | Biotique lotion | 80 |
| `B05vfPYY1` | B0HGBNK6VM | Aqueria sunscreen | 199 |

## Dedup — DB is the authority, with a control probe

Prisma against the live DB on `productId`, plus the two carried candidates from the other
groups. A `ZZZZFAKE123` control was included in the same `in` query so a silently-matching
lookup could not pass unnoticed.

| ASIN | DB row |
|---|---|
| B0G5PN6HHY | #102 LIVE ₹5199 |
| B0DDZ3KLWD | #10458 LIVE ₹499 |
| B0GZ4VXTVB | #10480 LIVE ₹299 |
| B0CL4BR6BS | #10481 LIVE ₹299 |
| B0B9G9J7WD | #10499 LIVE ₹199 |
| B07YWM9WMG | #7829 LIVE ₹100 |
| B0HGBNK6VM | #10526 LIVE ₹199 |
| B0G38DGNKM (Dealzone) | #7110 LIVE ₹3459 |
| B07QX21WZQ (NonStopDeals) | #5825 LIVE ₹549 |
| **ZZZZFAKE123** | **ABSENT** — control behaved |

Nine for nine already live. Seen-cache cross-check ran separately with exact
`new Set(arr).has(id)` over the 1754-entry `data/tg-multi-seen.json` flat array: all 7 codes
`true`, control `false`. The cache agreed with the DB this tick, but the DB decided —
rot #15 stands (the cache is not a dedup authority).

Because nothing survived dedup, no Amazon price verification and no CDN image fetch were
needed. Zero browser round-trips were spent on PDPs.

## Skipped, with reason

| Group / row | Reason |
|---|---|
| CoolzTricks Official | 4 `amzn.to` links in one post = multi-product |
| Deal Dibba | multi-brand "Loot :" post |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart **search** URL |
| Hidden Loot Deals & Offers | Blinkit offer, no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" ad |
| SB Loots And Deals | notification-settings meta post |
| both RichDeals rows | our own channel |
| iPhone-rates channel | not in `tg-groups.json` |
| all DMs and bots | not deal sources |

### Unchanged rejects carried from 09-19g

Dealzone `link.amazon/B0fYFLAAS` → Amazon `/s?` search (rot #13) · Dealdost
`bitli.in/YJLzp2n` → Meesho, 403s curl, unverifiable (rot #18) · Rogerkart
`rogerkart.com/r/pVQu7jR` unresolvable (rot #5) · Loot Deals 24x7 `fkrt.co/l5KOxl` Syska
power bank, drift ₹594 + out of stock.

## Fresh evidence for rot #13

The CoolzTricks multi-product skip was confirmed rather than assumed — one of its
`amzn.to` links was resolved:

```
amzn.to/4y6W84e →
https://www.amazon.in/s?k=FORT+COLLINS&rh=p_123:484322%257C484399,p_6:A1WYWER0W24N8S,…
```

An Amazon `/s?` **search page**, not a product. That both validates the multi-product skip
and reconfirms rot #13 with a second independent sample today. The `/s?` assert in the
resolver is doing real work; it has caught a search URL in every Telegram tick this week.

## Credential-handling note — eighth consecutive tick

The Telegram service chat row again surfaced a live login code in its last-message preview.
Per the standing rule the value was **not echoed** into this report, the terminal reply, the
commit, or any scratch file, and was not acted on. That row remains on the permanent-skip
list and is never treated as a deal source.

## Prod endpoints — all 200

```
200 0.211442  /
200 0.120976  /offers
200 1.201892  /blog
200 0.306135  /sitemap.xml
200 0.133704  /feed.xml
200 0.140019  /api/deals
200 0.536110  /llms.txt
```

`/blog` at 1.20 s is 2-3x its usual 0.30-0.57 s. Single sample, everything else normal —
noted, not flagged as rot until it repeats.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE 10278 · PENDING_REVIEW **0** · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4 |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10624 — **drift 142**, unchanged (rot #4) |
| Unpushed commits before this tick | 0 |

Deal counts are byte-identical to the three previous ticks today. That is consistent, not
suspicious: no source has published anything since, because every source is serving the
same already-ingested or already-rejected set.

## Rot standing — 29 items

Reconfirmed this tick: **#4** (tg-broadcast cursor drift 142, unchanged), **#5**
(`rogerkart.com/r/` unresolvable), **#13** (`/s?` search trap, fresh sample), **#15** (seen
cache is not the dedup authority), **#18** (Meesho unverifiable), **#20** (9 of 13 Telegram
groups stale — only one produced a new preview this tick), **#21** (`link.amazon` codes are
9 chars). **#12** stays half-fixed from the INDEXNOW tick: the ping now carries the sitemap,
the CLAUDE.md chunked-sitemap claim is still wrong.

Nothing new rotted and nothing new was added to the list.

## Open owner decisions — unchanged at 10

Top of the list remains **#7**, persist a reject cache (rot #19). **#8** — prune the dead
Telegram groups in `data/tg-groups.json` — gains weight every tick: 12 of 13 groups produced
nothing new again, and the sweep spends its calls re-reading previews it read an hour ago.
