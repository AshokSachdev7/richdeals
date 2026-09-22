# TELEGRAM-DEAL-MONITOR — tick 2026-09-22z

**Result: 1 deal refreshed live (deal 1883), IndexNow HTTP 200 for 4 urls.**
Sidebar swept in one `browser_evaluate` over `.chat-list .ListItem.Chat` (25 rows,
all 13 groups in `data/tg-groups.json`). Only 2 rows changed vs tick y; every other
row was byte-identical and already resolved/deduped there.

## Sweep

| Group | Newest post | Action |
|---|---|---|
| SB Loots And Deals | Santoor Beauty Talc with Sandalwood Extracts, Sandal/Rose/Musk/Geranium Mint, MRP - 340, `amazn.lt/e3oYpEET` | **resolved → pushed** |
| CoolzTricks Official | "Electric Desk. **Loot** : ₹12226 : `amzn.to/4rqqyf1` **Apply ₹10K Coupon**" | skipped — explicit "Loot" + price depends on clipping a ₹10K coupon (post-coupon trap) |
| 23 other rows | unchanged since tick 2026-09-22y | no re-resolve |

Skipped without resolving, same as tick y: CoolzTricks Myntra loot (multi-qty),
Dealdost Coursera (subscription, not a product), Rogerkart Zivame "Upto 85% Off"
(category), IndiaFreeStuff Swiggy + Hidden Loot Zepto (in-app search), Deal Dibba
(channel-join bait), OMG LOOTDEALS (not a deal).

## Shortlink resolution

| Shortlink | HTTP | Resolves to |
|---|---|---|
| `amazn.lt/e3oYpEET` | 200 | `amazon.in/dp/B082JN1FZC?tag=bhavesh015-21` (source tag stripped, ours applied) |

## Dedup

`B082JN1FZC` was **fresh** in `data/tg-multi-seen.json` (1806 ids) but **already LIVE**
in the DB as **deal 1883**, slug `santoor-talc-pack-of-400-gm-rs-150-B082JN` at ₹166.
So: not a create, an in-place refresh. Seen list now 1807.

## Price verification — logged-in Amazon tab

Same-origin `fetch` + `DOMParser` (curl is bot-blocked on Amazon).

```
#corePriceDisplay_desktop_feature_div
  ₹154.00 with 55 percent savings -55% ₹154 ₹38.50 per g(₹38.50₹38.50 /100 g)
  M.R.P.: ₹340.00M.R.P.: ₹340₹340

#buybox
  ₹154.00₹154.00 ₹38.50 per g … FREE delivery Thursday, 24 September
  Limited Period Festive Offer Ships from: Amazon Sold by: RK World Infocom Pvt Ltd
```

- Live ₹154 vs DB ₹166 → **real drop**, `PriceHistory` row written (prior history was a
  single 2026-07-27 entry at 166).
- MRP ₹340 matches the channel's claimed "MRP - 340" exactly.
- `round(1 - 154/340) = 55`, agrees with the PDP's own `-55%` badge.
- In stock, Ships from Amazon.
- **Trap avoided:** the price window carries `₹38.50 per g` — a per-100g unit rate, not
  the price. A naive "first ₹ after the price" read publishes ₹38.50.
- Real image: `#landingImage[data-old-hires]` →
  `m.media-amazon.com/images/I/51jJc2w7MaL._SL1500_.jpg`.

## Legacy rot found on deal 1883 and fixed in the same update

This row predates the current push pre-flight, and it was carrying four defects:

| Field | Was | Now |
|---|---|---|
| title | `Santoor Talc, Pack of 400 GM Rs.150 – Amazon` — hand-typed ₹150 never matched the stored 166 | `Santoor Beauty Talc with Sandalwood Extracts, 400 g at ₹154 (55% Off) – Amazon` |
| image | `51jJc2w7MaL._SY355_.jpg` (thumbnail) | `51jJc2w7MaL._SL1500_.jpg` (real CDN asset) |
| isSuper / isHot | `false` / `false` at ₹166, though rules are ≤250 / ≤500 | `true` / `true` |
| description | 126 chars — below the indexable floor | 1,130 chars, written off `#feature-bullets` + `#detailBullets_feature_div` specs, never channel text |
| howTo | 4 generic lines | 4 lines naming the 400 g variant trap and the per-100g rate |
| price / mrp / pct | 166 / 340 / 51 | 154 / 340 / 55 |

The title-₹-vs-price mismatch is exactly what the pre-flight check exists to catch —
it just never ran on rows created before that check existed. Worth a sweep for other
legacy rows with a hand-typed rupee figure in the title; not run this tick.

**Slug deliberately NOT renamed.** `santoor-talc-pack-of-400-gm-rs-150-B082JN` carries a
truncated productId (`B082JN`, not `B082JN1FZC`), but it is the indexed URL and returns
200 in production. Renaming it 404s a live page for a cosmetic win.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs santoor-talc-pack-of-400-gm-rs-150-B082JN
DONE: IndexNow -> HTTP 200 for 4 urls
```

4 = 1 slug + the 3 paths the script always prepends (`/`, `/offers`, `/sitemap.xml`).
`https://richdeals.in/santoor-talc-pack-of-400-gm-rs-150-B082JN` → **200**.
`sitemap.xml` is ISR `revalidate = 1800`; `llms.txt` is `force-dynamic`. No new static
route, so no `staticRoutes` edit needed.

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| prod endpoints `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt` | 7/7 **200**, 0.15–0.53s | OK |
| sitemap `<loc>` count | 9,881 (flat vs tick y — the refresh was an update, not a new URL) | OK |
| live deals | 10,571 | OK |
| PENDING_REVIEW backlog | 0 | OK |
| deals null price / null image | 0 / 0 | OK |
| coverless / seo-less posts | 0 / 0 | OK |
| posts-per-day IST | 09-22 = 3, 09-21 = **1**, 09-20 = 2, 09-19 = 3, 09-18 = 3 | 09-21 below the floor of 2 — see flag 3 |
| tg-broadcast cursor vs DB max | 10918 = 10918 | in sync |
| unpushed commits | 0 before this report's commit | OK |

## Flags — surfaced, not executed (all need the owner's nod)

1. **66 rows still wrapped in the deactivated Cuelinks link** — ajio 41, shopsy 13,
   jiomart 3, flipkart 2, plus singletons (pedigree, testbook, cred, bigbasket,
   playstation, tatacliq, bookysta). Those earn nothing. The 2 Flipkart ones should
   carry a plain `affid=djhackraj`, no wrapper at all.
2. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED.
3. **2026-09-21 published 1 post against a floor of 2.** The blog cron is a session cron
   (`9 */6 * * *`) and missed firings when the session was down. The durable fix is a
   Task Scheduler entry; not authorised.
4. **nullMrp 1,623 / nullPct 1,600** still need a backfill pass.
5. **Standing:** the DO API token pasted in chat during setup still needs rotating
   (DO → API → Tokens → delete + regenerate). Provisioning is long done.

New this tick, added to the list above: **legacy rows with a hand-typed rupee figure in
the title** (deal 1883 read "Rs.150" while storing 166). A grep across live titles for a
₹/Rs figure that disagrees with `price` would size the problem; not run.

---

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
