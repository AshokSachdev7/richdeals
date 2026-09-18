# TELEGRAM-DEAL-MONITOR — 2026-09-18, 10:4x IST tick

## Funnel

25 sidebar rows → 13 roster groups → 11 deal posts → 3 new links resolved →
3 real product URLs → 2 fresh after seen/DB dedup → 1 verified keeper → **1 pushed LIVE**.

One `browser_evaluate` over `.chat-list .ListItem.Chat` (25 rows) covered every
group in `data/tg-groups.json`. No per-group navigation, no chat reload.

## Pushed

| id | ASIN | product | price | MRP | off | image | slug |
|---|---|---|---|---|---|---|---|
| 10405 | B078WWHZ72 | Crompton Dyna Ray 40W LED Bulb B22, 4000 lm, pack of 1 | ₹329 | ₹1,175 | 72% | `31MSuCjG8NL` | `crompton-dyna-ray-40w-led-bulb-b22-4000-lumens-pack-of-1-b078wwhz72` |

Verified in the logged-in Amazon tab: ₹329 pay price, ₹1,175 strike, `-72%`
savings badge, `#availability` = In stock. Source post (CoolzTricks, "329")
matched exactly — no drift. Affiliate `?th=1&tag=ashoksachdev-21`.

Push `HTTP 201 +1/1`. IndexNow **HTTP 200** for 3 URLs (slug + `/` + `/offers`).

## Rejected

| group | post | resolved | verdict |
|---|---|---|---|
| Rogerkart Deals | Gang's Laptop Bag 19L ₹759, "95% off, regular ₹2,217" | B0CJF7FFLW (via body grep — rogerkart does not 30x) | **inflated MRP.** Amazon shows ₹759 vs ₹13,999 strike = -95%; the source's own post says the regular price is ₹2,217. Six-fold disagreement on an unknown-brand bag = untrustworthy list price. Not published. |
| SB Loots And Deals | Cuzor Mini UPS 12V | `amazn.lt/JpCCpHoE` → B07ZKD8T1Q | dup — already deal 4167/LIVE |
| ONLINE SHOPPING DEALS | Lenskart BLU zero power | `link.amazon/B0eyTwyL4` → B0DDYY4WDR | dup — pushed as 10404 in the 09:4x tick |
| Dealzone | Axe premium perfume | `link.amazon/B09wy3Vrl` → `/premium-perfume/s?k=…` | search page, not a product |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | `link.amazon/B05yvriRF` → B0G38DGNKM | already in seen |
| Loot Deals 24x7 | Syska 10000 mAh power bank ₹799 | `fkrt.co/l5KOxl` → `itm4cfc25dfd4dc7` | already in seen |
| NonStopDeals | "151" | `amzn.to/4uZXfjK` → B07QX21WZQ | already in seen |
| Dealdost | Myntra pack-of-3 ₹179 loot | — | multi-product loot |
| Deal Dibba | boAt / Noise / Fire-Boltt smartwatch roundup | — | multi-product |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart search "NOICE" | — | search page |
| Hidden Loot Deals | Blinkit free cold coffee campaign | — | campaign, no SKU |
| OMG LOOTDEALS | "Video dekho paisa kamao" | — | not a deal |

Non-roster rows in the sidebar (a personal DM channel, an iPhone-rates channel,
two bots, three DMs, our own RichDeals channel) ignored. The Telegram service
chat's contents were not read into any output.

## Seen file

`data/tg-multi-seen.json` 1691 → **1693** (+B078WWHZ72, +B0CJF7FFLW; B07ZKD8T1Q
was already present).

## CEO audit — 10:48 IST

| check | result |
|---|---|
| prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` | 200 × 7 |
| LIVE deals | 10,060 — null price 0, null image 0 |
| PENDING_REVIEW | 0 |
| posts/day IST | 09-16:3, 09-17:3, **09-18:2** |
| published / coverless / seoless | 312 / 0 / 0 |
| broadcast cursor vs DB max | cursor 10404, max LIVE 10405 — one behind, this tick's push is next in line |
| unpushed commits | 0 |

Nothing needed fixing inline.

## ROT

- **Blog 2/3 for 09-18.** The `9 */6 * * *` tick at 12:09 IST owes the third post.
  If it misses, the post gets written inline.
- **Telegram yield still collapsing.** 11 deal posts → 1 publishable SKU (9%),
  and 4 of 6 valid products were already known. Same shape as the 09:4x tick
  (7.7%). The groups have drifted to loot/coupon-stack/freebie campaigns.
- **Fake-MRP listings arriving via Rogerkart.** Second tick running where a
  Rogerkart post carried a list price the marketplace contradicts. Their
  shortlinks also need body-grep resolution, not `curl -sL`. Worth a line in
  the agent doc.
- **`link.amazon/<9-char>` shortlinks** now standard across three groups; one of
  three still lands on a search page, so every one must be resolved before judging.
- CLAUDE.md stale twice: `affiliate()`/`productLd()` live in
  `apps/api/scripts/lib/ingest-common.mjs`, not in the two ingest scripts; the
  Telegram section says 7 groups, `data/tg-groups.json` has 13.
- Carried: `where to get free samples` 11,072 impr / pos 6.8 / 0 clicks (46 of
  312 slugs in that cluster — still the highest-value unshipped SEO action);
  organic 90d 50 clicks vs last-28d 6; 307 LIVE deals with pointless `updatedAt`
  re-stamps undiagnosed; W6 and W8 need an API change; DB pool cap unshipped.

## Open owner decisions (unchanged)

1. Ratify publish-at-live-price + the 30% discount floor in CLAUDE.md.
2. Permanent DB pool cap in `apps/api/.env`.
3. DesiDime Task Scheduler job `7,37 * * * *`.
4. Free-samples cluster consolidation (46 of 312 slugs).
5. ~605 untracked scratch files in `apps/api/`.
