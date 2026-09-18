# TELEGRAM-DEAL-MONITOR tick — 2026-09-19c (IST)

Third Telegram tick of the day. Morning tick pushed 0, the afternoon tick
(`reports/telegram-2026-09-19b.md`) pushed 6, this one pushed **4** and fixed 1 stale row.

Biggest candidate haul of any Telegram tick so far — **37 shortlinks resolved in one pass** —
and also the harshest reject rate. 37 → 10 fresh → 4 published.

## Sweep

Playwright MCP profile `richDeals` → `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` covering all 13 groups in `data/tg-groups.json`.
Seen-cache at tick start: **1,737** ids.

**Sidebar sweep: 25 rows, zero candidates.** Every source group's newest post was
byte-identical to the afternoon tick's and had already been triaged there. The "Telegram"
service row again carried a live login code in its preview; skipped as a non-source chat,
the value is recorded here and nowhere else — which is to say, nowhere.

A zero-candidate sidebar is not a zero-yield tick. Two groups were opened for deeper history.

## Deeper history — SB Loots And Deals (16 unique messages)

Nothing new. The same 14 shortlinks processed in the afternoon tick, plus a
"Missed Some Loots" promo and one sponsored ad. **Zero candidates.**

## Deeper history — ONLINE SHOPPING DEALS (40 unique messages)

This is where the whole tick came from. Group `-1001940328982`. Post format is strictly
one product per post:

```
<product title>  Deal Price : ₹<n>  https://link.amazon/<code>  amzlinks.in  <title echo>  <views>  <time>
```

**37 single-product `link.amazon` candidates.** Also present and skipped:

| Skipped | Why |
|---|---|
| 1 Flipkart `fkrt.co/yzLbII` (Levista coffee ₹91) | rot #3 host — `fkrt.*` shorteners never land on `/p/itm…` |
| Aqueria sunscreen post | no URL inside the 300-char capture window |
| Dealdost GIF ad | not a deal |

The scrape used a widened variant of the history reader — 40 messages, whitespace-normalised,
300-char cap, `.message-content` only — because the 20-message / 200-char shape used on
earlier ticks was truncating the URL off the end of these posts.

## Shortlink resolve — 37 of 37, zero search pages

```
curl -s -A "<chrome UA>" -o /dev/null -w '%{url_effective}' -L --max-time 20 "https://link.amazon/<code>"
```

**Zero `/s?` search pages.** First completely clean sweep of the `link.amazon` host. Rot #13
is not retired by this — one clean run does not undo two ticks of hits — but it is the first
counter-evidence on record.

Three URL shapes came back, all valid products:

| Shape | Example | Count |
|---|---|---|
| `amazon.in/dp/<ASIN>` | plain canonical | most |
| `amazon.in/gp/product/<ASIN>` | `B08CC7NPJ5`, `B0D2RQXXQR`, `B0CL9LCPZV` | 3 |
| **`amazon.in/source=offertag.in/dp/<ASIN>`** | `B0BJ73P5FF`, `B0DSLHSK53`, `B093GVZ91Z`, `B0B4DJYXG6`, `B0DDYY4WDR`, `B0G5PN6HHY` | 6 |
| SEO-slug form | `B0D1MMF994` | 1 |

The third shape is **new and not previously recorded**: the shortener injects a junk path
segment (`source=offertag.in`) before the canonical `/dp/` tail. A naive
`/^\/dp\/([A-Z0-9]{10})/` extractor misses all six. The ASIN regex has to be
`(/dp/|/gp/product/)[A-Z0-9]{10}` anchored anywhere in the path, which is what was used here.
That widens the extractor spec filed under rot #1.

## Dedup — seen cache + live DB

```
seenCount 1737   fresh 10
```

**Rot #15 re-confirmed in BOTH directions — the strongest evidence yet:**

| Direction | ASINs | Reality |
|---|---|---|
| Cache said **new**, DB says **LIVE** | `B0GGJCZYC2` (id 10160), `B0BTVYDJ7F` (id 10189) | cache under-reports |
| Cache said **SEEN**, DB says **NOT IN DB** | `B0GQZ1MGR9`, `B0DMWFLP9R`, `B093GVZ91Z`, `B083LZY4T7` | cache over-reports — these were resolved on a past tick and rejected, never published |

So the cache is wrong in both directions on the same tick. **All 10 NOT-IN-DB ASINs went to
verification regardless of their cache flag**, because only the DB is authority. Four of those
ten were cache-"SEEN" — skipping on the cache alone would have dropped two of the four deals
this tick ultimately published.

### Four DB-vs-source price divergences pulled in for re-verify

| ASIN | DB | Source post | Added to verify batch |
|---|---|---|---|
| `B0FB3D4XYC` | ₹839 | ₹428.66 | yes |
| `B0D1MMF994` | ₹1,707 | ₹1,219 | yes |
| `B07YWM9WMG` | ₹100 | ₹80 | yes |
| `B0BJ73P5FF` | ₹345 | ₹341 | yes |

Two more were inside tolerance and ignored: `B0DDKNRHL9` (₹325 vs ₹325.58) and
`B0GGJCZYC2` (₹3,586 vs ₹3,585.80).

## Verify — 14 ASINs in one batched call

One `browser_evaluate` in the logged-in Amazon tab (same-origin `fetch` + `DOMParser`; curl
is bot-blocked). Read `#productTitle`, `.priceToPay .a-price-whole`, `.basisPrice .a-offscreen`,
`#add-to-cart-button`, the `Apply ₹N coupon` badge regex and `data-old-hires`.

### The 10 fresh

| ASIN | Product | Source ₹ | Live ₹ | MRP | Stock | Verdict |
|---|---|---|---|---|---|---|
| B0GQZ1MGR9 | Caffiora hazelnut coffee sachets 5×20ml | 84 | **84** | 249 | yes | **ACCEPT** |
| B08CC7NPJ5 | Sanas face razor for women, 6 pcs | 54 | **54** | 259 | yes | **ACCEPT** |
| B0DMWFLP9R | Colgate MaxFresh Rainbow gel 100g | 95 | **95** | 169 | yes | **ACCEPT** |
| B0B4DJYXG6 | Sirona cup Small + sterilizer + wash | 289 | **289** | 2,547 | yes | **ACCEPT** |
| B0FQCDB118 | Hardik Pandya MI collectible figurine | 99 | — | — | **no** | REJECT — out of stock |
| B093GVZ91Z | Stuffcool Magnus messenger bag | 371 | — | — | **no** | REJECT — out of stock |
| B099K7G54F | Sirona cup Medium + sterilizer, pack of 2 | 289 | 1,849 | 2,348 | yes | REJECT — drift ₹1,560 |
| B083LZY4T7 | Coconut Ciba steel lid set, 9 pcs | 237 | 699 | 1,042 | yes | REJECT — drift ₹462 |
| B0BD7JW1TF | MARS Glowzilla 6-colour highlighter | 187 | 280 | 329 | yes | REJECT — drift ₹93 |
| B0CL9LCPZV | Kica women high-waist flared pants | 243.55 | 1,019 | 1,699 | yes | REJECT — drift ₹775 |

**4 accept / 4 drift / 2 out of stock.** No coupon badges on any of the 14 — the drifts are
not coupon-inclusive pricing, they are stale posts. Worst case `B099K7G54F`: the post quotes
₹289 for a ₹1,849 product.

The two Sirona listings are worth naming together: the post quotes ₹289 for **both** the
Medium 2-piece (`B099K7G54F`) and the Small 3-piece (`B0B4DJYXG6`). Only the second is
actually ₹289. Same brand, same price claim, one true — which is exactly why every ASIN gets
verified individually and none inherit a sibling's verdict.

### The 4 drift suspects

| ASIN | DB | Live PDP | Result |
|---|---|---|---|
| `B0FB3D4XYC` | ₹839 | **₹839** (MRP 2,399, in stock) | DB correct — the ₹428.66 post is bait |
| `B07YWM9WMG` | ₹100 | **₹100** (MRP 200, in stock) | DB correct — the ₹80 post is bait |
| `B0D1MMF994` | ₹1,707 | **₹2,789** (MRP 13,195, in stock) | **DB stale by ₹1,082 — fixed** |
| `B0BJ73P5FF` | ₹345 | — | **out of stock** — left LIVE, see below |

Three of four source prices were below the real price, which is the standing shape: these
posts quote whatever the price was when the post was written and never get edited.

## Fixed inline (CEO mode)

Deal **id 360** `sulfar-foldable-5-step-ladder-…-B0D1MM`: price `1707 → 2789`,
discountPct `87 → 79`, mrp 13,195 unchanged. That page had been quoting a price ₹1,082 below
the real one — the largest single stale-price gap corrected on any tick so far, and it sat on
a deal id in the low hundreds, meaning it had been wrong for a long time.

**`B0BJ73P5FF` (id 7637, Boldfit gym ball) reads out of stock and was left LIVE at ₹345.** A
single OOS read is not proof of a dead product — Amazon stock flickers — and the standing rule
is that expired deals keep their page with a banner, never a 404. Flagged, not flipped. If it
reads OOS on the next tick too, it should go EXPIRED.

## Pushed — 4 deals, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 4**, all `created:true`. Amazon affiliate
`?tag=ashoksachdev-21` on `/dp/ASIN`, images from `m.media-amazon.com`, titles and
descriptions written fresh — nothing lifted from the Telegram posts.

| ASIN | Price | MRP | Off | Slug |
|---|---|---|---|---|
| B0GQZ1MGR9 | ₹84 | ₹249 | 66% | `caffiora-hazelnut-instant-coffee-sachets-5x20ml-b0gqz1mgr9` |
| B08CC7NPJ5 | ₹54 | ₹259 | 79% | `sanas-face-razor-for-women-pack-of-6-b08cc7npj5` |
| B0DMWFLP9R | ₹95 | ₹169 | 44% | `colgate-maxfresh-rainbow-gel-toothpaste-100g-b0dmwflp9r` |
| B0B4DJYXG6 | ₹289 | ₹2,547 | 89% | `sirona-menstrual-cup-small-with-sterilizer-and-wash-b0b4djyxg6` |

All 4 pages verified **HTTP 200** on `https://richdeals.in/<slug>` after the push.

### Seen cache

All **37 resolved ASINs** written back, including the rejects and the already-live ones, so
none of them costs a resolve on a future tick. **1,737 → 1,745** — only +8 unique, because 29
of the 37 were already in the cache. That ratio is itself the point: this group recycles the
same products across days, and the cache is doing its one real job (saving resolves) even
while it is useless as a publish gate.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <4 new slugs> <1 fixed slug>
DONE: IndexNow -> HTTP 200 for 7 urls
```

5 slugs + `/` + `/offers` from the script's auto-prepend. **HTTP 200**, no 422, Bing GET
fallback not needed. The repriced ladder page was included deliberately — a corrected price is
a content change and needs resubmission as much as a new page does. `sitemap.xml` is ISR 1800s
and picks the batch up on its own; `llms.txt` is `force-dynamic` and already carries it. No new
static route.

## CEO audit (verified against the DB after the push)

| Check | Value |
|---|---|
| Deals LIVE | **10,266** (10,262 → +4) |
| PENDING_REVIEW | 0 |
| EXPIRED | 257 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,611 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Prod endpoints | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` → all **200** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog still at 1 post for 2026-09-19** against the 2-3 target. **Sixth Telegram/audit tick
   in a row flagging it**, and the day is nearly closed. Not a violation (never 0), but 09-19
   will be the first sub-2 day in the last five unless the next BLOG tick publishes 2. This is
   the longest-running open item on the board.
2. **tg-broadcast cursor 10,482 vs max deal id 10,611 = 129 behind**, widened by 4 from this
   push. External cron still dead. Draining now fires ~129 channel messages in one burst, so it
   stays parked until the owner says go.

## Rot list — 18 items, 1 re-confirmed hard, 1 widened, 1 with first counter-evidence

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 24th tick
   hand-derived. **Spec widened again today**: the ASIN regex must tolerate `/dp/`,
   `/gp/product/`, `/source=offertag.in/dp/` and SEO-slug URL shapes.
2. Source-vs-live price drift is the dominant reject reason — **4 of 10 fresh today**, plus
   3 of 4 bait prices among the drift suspects.
3. Flipkart outbound links structurally dead — `fkrt.co/yzLbII` skipped on sight today rather
   than spending a resolve on a host with a 100% failure record.
4. tg-broadcast external cron not firing — drift now **129**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected, resolves fine.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO)
    need API changes.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the sitemap
    from its auto-prepend (one-line fix available, still not applied).
13. **First counter-evidence.** `/s?` search pages hide behind `link.amazon` and plain
    `amzn.to` — but 37 of 37 `link.amazon` resolves were clean products today. The
    post-resolve assert stays mandatory; one clean sweep is not a retirement.
14. Flipkart PDPs serve no ld+json to a real browser either, and a stale tab lies.
15. **Re-confirmed in both directions, same tick.** Cache said "new" for 2 LIVE deals and
    "SEEN" for 4 deals that are not in the DB at all. Two of today's four published deals were
    cache-"SEEN". The cache is a resolve-cost optimisation and nothing more.
16. The Amazon ₹-coupon badge is extracted by no shared code (no badges hit this tick).
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected. **Fourth tick running as the
   operative unwritten rule** — every one of today's 4 publishes used it.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
