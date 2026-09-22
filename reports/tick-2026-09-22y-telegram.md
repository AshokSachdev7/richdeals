# TELEGRAM-DEAL-MONITOR tick 2026-09-22y

Site: richdeals.in · run inline in the session (Playwright MCP profile `richDeals`,
tab 0 = `web.telegram.org/a/`, tab 2 = logged-in `amazon.in`).

**Result: 0 deals published.** 25 sidebar rows read in one `browser_evaluate`,
5 product shortlinks resolved, 1 search page rejected, 3 dropped by dedup,
1 already LIVE in the DB and re-verified as accurate. No new row, so no
`/admin/deals/bulk` push and no IndexNow ping (nothing was shipped — a ping
with an empty slug list is noise, not freshness).

## Sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` → `{title, last}` for
every row (~1k tokens, no snapshot). 13 source groups from `data/tg-groups.json`
were all represented; the rest of the sidebar is own channels, bots and DMs.

Skipped without resolving (rules: no loot / multi-product / category / search):

| Group | Post | Why skipped |
|---|---|---|
| CoolzTricks Official | "Myntra Loot (875ml) @299 + Coupon … Buy Max Qty" | loot + multi-qty, not a single PDP |
| Dealdost | Coursera Plus annual @₹7499 | subscription, not a retail product |
| Rogerkart Deals | "Upto 85% Off On Zivame Women's Bra" | category landing |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart "Search: Let's Try" | in-app search instruction |
| Hidden Loot Deals | Zepto "Search: Jensons" | in-app search, city-locked |
| Deal Dibba | "₹14 : t.me/+… Click On Join Channel" | channel-join bait |
| OMG LOOTDEALS | "Video dekho paisa kamao" | not a deal |

## Shortlinks resolved

| Source | Shortlink | Resolves to | Verdict |
|---|---|---|---|
| SB Loots And Deals | `amazn.lt/jQdcALj6` | `amazon.in/dp/B0F1T8N2VR` | already LIVE (deal 10767) → re-verified, no change |
| Dealzone | `link.amazon/B08VtYjWK` | `amazon.in/s?k=HP&…s=price-asc-rank` | REJECT — search results page ("HP Laptop Backpack **Starts at** 646" is a sorted list, not a product) |
| ONLINE SHOPPING DEALS | `link.amazon/B0hLf0C6s` | `amazon.in/dp/B06WV77YDB` | dedup — in `tg-multi-seen.json` |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` | `amazon.in/dp/B0G38DGNKM` | dedup — seen, and LIVE as deal 7110 |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` | `flipkart.com/…/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6` | dedup — seen |

The `link.amazon/<code>` codes are ASIN-shaped but are NOT the ASIN
(`B0hLf0C6s` → `B06WV77YDB`, `B05yvriRF` → `B0G38DGNKM`). Every one has to be
resolved before it is compared against anything.

## Price re-verification (deal 10767, Milton Prudent 500 Thermosteel 510 ml)

SB Loots posted it again with "MRP - 920". Read in the logged-in Amazon tab
(same-origin `fetch` + `DOMParser`, `#buybox` innerText because `#apex_desktop`
and `#corePriceDisplay_desktop_feature_div` return only their inline CSS):

```
₹449.00₹449.00 Fulfilled FREE delivery 27 - 29 September Limited Period Festive Offer
```

DB row: `price 449, mrp 920, discountPct 51,
image m.media-amazon.com/images/I/518fSiq5EbL._SL1500_.jpg, status LIVE`.
PDP `data-old-hires` is that exact image. Price, MRP, image and stock all match
— nothing to update, no `PriceHistory` row written. Added `B0F1T8N2VR` to
`data/tg-multi-seen.json` (1806 ids) so the next tick stops re-resolving it.

## CEO audit

| Check | Value | State |
|---|---|---|
| prod endpoints | `/` 200 .39s, `/offers` 200 .14s, `/blog` 200 .40s, `/sitemap.xml` 200 .32s, `/feed.xml` 200 .23s, `/api/deals` 200 .13s, `/llms.txt` 200 .39s | 7/7 OK |
| sitemap `<loc>` | 9,881 | OK (+17 vs tick x) |
| LIVE deals | 10,571 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| coverless / seo-less posts | 0 / 0 | OK |
| posts per day IST | 09-22 = 3, 09-21 = 1, 09-20 = 2, 09-19 = 3, 09-18 = 3 | 09-21 under floor (see flags) |
| tg-broadcast cursor | `lastId 10918` vs DB max 10918 | in sync |
| unpushed commits | 0 | OK |

### Flags (surfaced, not executed)

1. **66 rows still on the deactivated Cuelinks wrapper** — ajio 41, shopsy 13,
   jiomart 3, flipkart 2, plus pedigree / testbook / cred / bigbasket /
   playstation / tatacliq / bookysta singletons. The 2 Flipkart ones should
   carry plain `affid=djhackraj`, no wrapper at all. One script run swaps them;
   only Myntra was authorised on 09-22.
2. **Myntra deals 36, 38, 115 are category landings**, not PDPs (`/footwear…`,
   `/hand-towels`, bare slugs) — they predate the Myntra PDP guard. Delist to
   EXPIRED on your nod.
3. **2026-09-21 published 1 post against a floor of 2** — the session blog cron
   (`9 */6 * * *`) missed firings. The durable Task Scheduler fix is still
   unauthorised.
4. **nullMrp 1,623 / nullPct 1,600** backfill still unapproved.
5. **Standing: the DO API token pasted in chat during setup still needs
   rotating** (DO → API → Tokens → delete + regenerate).

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
