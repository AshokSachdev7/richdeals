# TELEGRAM-DEAL-MONITOR tick — 2026-09-19e (IST)

Fifth Telegram tick of the day. **Zero deals pushed.** Not a failed tick — a saturated
one. Every candidate on the board resolved to something already LIVE, already rejected,
or verifiably wrong. The tick's two outputs are the Syska question finally being closed
with hard evidence, and a fourth confirmation of rot #15 — this time failing in the
*opposite* direction from every prior sighting.

## Sweep

Playwright MCP profile `richDeals` → `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` covering all 13 groups in `data/tg-groups.json`.
Seen-cache at tick start: **1,747** ids.

The "Telegram" service row again carried a live login code in its last-message preview.
Skipped as a non-source chat. The value is not recorded here, in the commit, in the
terminal reply, or anywhere else, and was not acted on. Third tick running that this row
has surfaced a code; it stays on the permanent-skip list.

## Sidebar triage — 13 rows, 1 candidate

| Group | Last post | Verdict |
|---|---|---|
| CoolzTricks Official | Fort Collins winterwear, 4 gendered `amzn.to` links | REJECT — multi/category |
| Dealzone | `link.amazon/B0fYFLAAS` | REJECT — resolves to `/s?` search (rot #13) |
| Dealdost | `bitli.in/YJLzp2n` wall hooks | REJECT — Meesho unverifiable (rot #18) |
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | REJECT — unfollowable (rot #5) |
| Deal Dibba | boAt smartwatches "from ₹999" + Noise + Fire-Boltt | REJECT — multi/loot |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart search URL | REJECT — search page |
| Hidden Loot Deals & Offers | Blinkit free cold coffee, no PDP | REJECT — not a product |
| OMG LOOTDEALS | "Video dekho paisa kamao" | REJECT — ad |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` → B0G38DGNKM Lavie | already LIVE, handled in 2026-09-19d |
| NonStopDeals | `amzn.to/4uZXfjK` → B07QX21WZQ TrustBasket | already LIVE, DB price verified correct |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` Syska ₹799 | the carried unverified item — resolved below |
| SB Loots And Deals | notification-settings housekeeping post | no deal |
| ONLINE SHOPPING DEALS | Aqueria sunscreen | **only new-looking candidate** |

## ONLINE SHOPPING DEALS — opened, read, all repeats

Trusted click, ref `f2e9358` (`browser_click({target:"f2e9358", element:"…", ref:"f2e9358"})`).
Last 20 messages read. Three `link.amazon` codes resolved by curl at 2.5s spacing:

| Shortlink | ASIN | Source ₹ | Cache said | DB truth |
|---|---|---|---|---|
| `link.amazon/B05vfPYY1` | **B0HGBNK6VM** Aqueria sunscreen | 199 | **new** | **LIVE #10526 @ ₹199** |
| `link.amazon/B0g5HNRhi` | B0B4DJJV5X | — | seen | LIVE #10460 @ ₹289 |
| `link.amazon/B04QNP675` | B09YVRGRFZ | — | seen | LIVE #10461 @ ₹289 |

### Rot #15 — fourth confirmation, and now proven wrong in both directions

Previous three sightings were all the same shape: the cache said **new** for something
already LIVE, wasting a resolve. This tick is that same shape again for `B0HGBNK6VM`.
Combined with the 2026-09-19d finding (cache said new for `B0FZBGXHY9`, also LIVE), the
pattern is settled: **`data/tg-multi-seen.json` is a resolve-cost optimisation, nothing
more. It is not a dedup authority in either direction.** Every candidate must hit the DB
before any push decision. The current flow already does this, which is why no bad row has
shipped — but the cache must never be promoted to a gate.

## Syska power bank — carried item, now CLOSED as REJECT

`fkrt.co/l5KOxl` → `flipkart.com/syska-10000-mah-power-bank-fast-charging/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6`,
source post quoted ₹799. Not in the DB. Last tick it could not be verified — curl returned
HTTP 403, 0 bytes.

**Verified this tick through the Playwright browser tab.** The PDP rendered fully:

```json
"offers": { "@type": "Offer", "price": 1393, "priceCurrency": "INR",
  "availability": "https://schema.org/OutOfStock",
  "itemCondition": "https://schema.org/NewCondition" }
```

Visible page text: `Out of stock` twice under the colour swatch. Visible ₹ values on the
page — 896, 715, 998, 1,393, 1,323 — **contain no ₹799 anywhere**; the 896/715 pair belongs
to two sponsored `AD` cards for other brands. ld+json description reads "for Rs.1799.0".

**REJECT on two independent grounds:** out of stock, and the source price matches nothing
live. Item is closed, not carried forward.

### Rot #14 — narrowed, the same way rot #3 was

Flipkart returning 403/0 bytes is a **curl-only** failure. The identical PDP loads
completely in the logged-in Playwright tab, ld+json intact with `name`, `description`,
`offers` and a real `image[]` array. So the rule is not "Flipkart is unverifiable" — it is
"Flipkart verification must route through the browser tab." That is a workable path, and
it is now proven end-to-end rather than assumed.

A second correction while I was in there: my image filter regex used `rukminim` and caught
only `static-assets-web.flixcart.com` SVG chrome. The real product CDN host is
**`rukmini1.flixcart.com`** (e.g. `…/image/1500/1500/xif0q/power-bank/…imah28k6qd2mjhwm.jpeg?q=70`),
and the reliable source for it is the ld+json `image[]` array, not a DOM `<img>` scrape.
That was my selector being wrong, not site rot. Worth baking into the shared extractor.

## Outcome — zero pushes, so no ping was due

No deal cleared verification, so `/admin/deals/bulk` was not called and **no IndexNow ping
was run**. Stating that explicitly because the freshness rule says a batch that skipped the
ping is not shipped: there was no batch. Nothing is sitting unpinged in the DB.

Seen cache **1,747 → 1,748** — every id resolved this tick folded in, rejects included, so
none of them costs a resolve next tick. (`B0HGBNK6VM` was the only genuine addition; the
other five were already present, which is itself the rot #15 evidence.)

## CEO audit (verified against the DB)

| Check | Value |
|---|---|
| Deals LIVE | **10,277** |
| PENDING_REVIEW | 0 |
| EXPIRED | 258 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,623 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog at 1 post for 2026-09-19** against the 2-3 target. **Tenth consecutive tick
   flagging it.** The day is now effectively closed, so 09-19 will land short. Never 0, so
   the hard rule is not broken, but the cadence rule is. If the BLOG cron is meant to fire
   `9 */6 * * *` it has missed today's later slots.
2. **tg-broadcast cursor 10,482 vs max deal id 10,623 = 141 behind.** External cron still
   dead. Draining fires ~141 channel messages in one burst, so it stays parked pending the
   owner's explicit go-ahead.

## Rot list — 18 items, 1 narrowed, 1 re-confirmed

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 26th tick hand-derived.
2. Source-vs-live price drift the dominant reject reason; the `price-bh=` query param is a decoy shape of it.
3. `fkrt.co` DOES resolve to a canonical `/p/itm…` PDP. Only `fkrt.it` and `fkrt.cc` land on tracking/collection URLs.
4. tg-broadcast external cron not firing — drift **141**.
5. `curlFinal` cannot follow `rogerkart.com/r/…` — re-confirmed.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected earlier, resolves cleanly.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes. W8 re-evidenced by today's SCHEMA-AUDIT: `sku` null on all 5 audited deal pages.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the sitemap from its auto-prepend (one-line fix, still not applied).
13. `/s?` search pages hide behind `link.amazon` and plain `amzn.to` — re-confirmed once today.
14. **NARROWED.** Flipkart 403/0-bytes is curl-only. The Playwright tab loads the PDP fully with usable ld+json. Route every Flipkart verify through the browser; do not treat the store as dead.
15. **Re-confirmed, fourth time — and now wrong in both directions.** The seen cache is a
    resolve-cost cache, never a dedup authority. DB only.
16. The Amazon ₹-coupon badge is extracted by no shared code.
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.

## Open owner decisions (6)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
6. A periodic re-verify sweep over old LIVE rows. Yesterday's five-row audit came back
   100% clean, which argues the sweep can be infrequent rather than unnecessary.
