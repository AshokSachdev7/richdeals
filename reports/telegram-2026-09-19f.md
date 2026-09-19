# TELEGRAM-DEAL-MONITOR tick — 2026-09-19f (IST)

Sixth Telegram tick of the day. Pushed **1** deal and applied **2 CEO-mode reprices**.
The reprices are the finding: a two-row spot check against live Amazon came back
**2-for-2 wrong**, which flips open decision #6 from "nice to have" to evidenced.

A second correction, and this one is mine: **eleven prior tick reports declared
2026-09-19 "over" / "effectively closed" on the blog count. It is 06:04 IST.** The day
has ~18 hours left. That flag has been wrong all night.

## Sweep

Playwright MCP profile `richDeals` → `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` covering all 13 groups in `data/tg-groups.json`.
Seen cache at tick start: **1,748** ids.

The sidebar came back **byte-identical to the 09-19e tick on all 13 source rows** — zero
new candidates from the sidebar alone. The Dealzone deep read was therefore mandatory,
not optional, to have anything to work on at all.

### Source-roster staleness — new rot #20

Per-row last activity, read off `.info` with the `h3` title stripped (`.title .time`
returns empty, which is why this was never measured before):

| Active today | Stale |
|---|---|
| SB Loots 01:32 AM · CoolzTricks 00:32 AM · Dealzone 00:27 AM · Dealdost 00:01 AM | ONLINE SHOPPING DEALS Fri · Rogerkart Fri · Deal Dibba Thu · IndiaFreeStuff Tips Wed · Hidden Loot **Sep 9** · INDIAN CHEAP DEALS **Aug 19** · OMG LOOTDEALS **Aug 14** · NonStopDeals **Jun 27** · Loot Deals 24x7 **Nov 16, 2023** |

**4 of 13 post daily. 4 are dead a month or more, one for ~22 months.** Every tick pays
sidebar-read cost on nine rows that will never yield anything. That is cheap per tick and
free to fix — but the roster is presented as 13 live sources and it is 4.

## Dealzone deep read — 22 messages

Rejected on sight: Lakme BOGO "loot", car body cover "Starts at 250", Axe "Master Link",
"Upto 73% Off On Milton", a Puma men/women split post, HP backpacks "Starts at 646",
a 46-piece socket set on `bitli.in/mIP5n4V` (Meesho, rot #18), U.S. Polo `B0fYFLAAS`
(already-known `/s?`), and one IPO ad.

**13 `link.amazon` codes resolved by curl at 2.6 s spacing. 12 clean ASINs.**

### Rot #21 — `link.amazon` codes are exactly 9 characters

Every one of the 13 initially 404'd. Telegram's `.text-content` glues the message text,
the view count and the timestamp together with **no separator**, so a naive scrape takes
a 10th character — the leading digit of the view count — and the resolve dies:

```
…https://link.amazon/B0fYFLAAS66000:27 AM
                     └ code ──┘└views┘└time┘
```

`link.amazon` now hops through `https://amzlinks.in/<code>`; a bad code stops there with
`<title>404: File Not Found</title>`. **Truncating every code to 9 chars resolved 12 of
13.** This belongs in the shared extractor as a hard `slice(0, 9)`.

### Rot #13 re-confirmed, with a new shape

`B0fxe3ZuX` ("Apply Coupon On Havells") resolved to
`amazon.in/s?hidden-keywords=B0DX7BTKF9%7C…` — a `/s?` search page wearing a
`hidden-keywords` multi-ASIN list instead of a `k=` query. Same trap, new clothes.
**REJECT.** The resolved-URL `/s?` assert catches it; a naive "does it contain an ASIN"
check would not.

## Dedup — DB is the authority

Prisma by `productId`. **12 checked → 6 LIVE, 6 fresh.**

```
B0B4GYZ4FR #3262 LIVE Rs157     B0D6ZRKPV2 FRESH
B007E9M6EI #10462 LIVE Rs92     B094JCM5X3 FRESH
B0CL4BR6BS #10481 LIVE Rs299    B07RS24L9T FRESH
B08MLJGB8W #10479 LIVE Rs64     B0CH3GNKJD FRESH
B0FG34VR4L #10599 LIVE Rs4523   B0C94NXNVN FRESH
B07YWM9WMG #7829 LIVE Rs100     B0CCVGL5JK FRESH
```

## Verification — 8 ASINs, one batched evaluate

The 6 fresh candidates plus the 2 rows where the source price and the DB price disagreed.
Same-origin `fetch` + `DOMParser` in the logged-in Playwright Amazon tab, 900 ms spacing.
**8 for 8 returned cleanly — no fetch failure, no selector miss, no throttling.**

| ASIN | Product | Source ₹ | Live ₹ | MRP | Off | Stock | Verdict |
|---|---|---|---|---|---|---|---|
| B0CCVGL5JK | Solimo airtight storage jars, 800ml ×6 | 287 | **287** | 1,499 | **81%** | yes | **ACCEPT** |
| B0D6ZRKPV2 | Dr. Pets Treetos chicken stix, ×3 | 147 | 579 | 597 | 3% | yes | REJECT — drift ×3.9, and 3% is not a deal |
| B094JCM5X3 | Wonderchef Platinum Plus 3+1 set | 999 | — | — | — | **no** | REJECT — OOS |
| B07RS24L9T | Titan NS2628SM01 women's watch | 2,195 | **2,195** | none | **0%** | yes | REJECT — price exact, **zero discount** |
| B0CH3GNKJD | Wonderchef Ultima C-Line 60cm chimney | 5,399 | — | — | — | **no** | REJECT — OOS |
| B0C94NXNVN | Cello Puro Steel-X Benz Pro 600 | 259 | 529 | 572 | 8% | yes | REJECT — drift ×2 (post named the 520ml, page is the 600) |
| B0B4GYZ4FR | Smart & Handsome face wash 150g | 127 | **127** | 325 | 61% | yes | **DB WRONG** — see reprices |
| B08MLJGB8W | Sehaz Artworks 7-hook key holder | 71 | **167** | 899 | 81% | yes | **BOTH WRONG** — see reprices |

Zero coupon badges. Every in-stock row returned a real `m.media-amazon.com` image.

The Titan row is worth naming because it is a reject shape not seen before: the source
price was **exactly right**, the item was in stock, and it still must not publish — no
MRP, no savings badge, 0% off. A price with no discount is a product listing, not a deal.
The push script's own `discountPct < 5` floor would have caught it, but it should be a
stated rule, not an accident of a script.

## Pushed — 1 deal, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 1, created:true**. `?tag=ashoksachdev-21` on
`/dp/ASIN`, image from `m.media-amazon.com`, title and description written fresh — nothing
lifted from the Telegram post.

| ASIN | Price | MRP | Off | Slug |
|---|---|---|---|---|
| B0CCVGL5JK | ₹287 | ₹1,499 | 81% | `solimo-plastic-storage-jar-container-set-800ml-set-of-6-b0ccvgl5jk` |

`https://richdeals.in/<slug>` → **HTTP 200** after the push.

## CEO-mode reprices — 2 rows, both stale, in opposite directions

Both applied without asking (CEO mode), each with a matching `priceHistory` row:

| Deal | ASIN | DB was | Live is | Direction | Action |
|---|---|---|---|---|---|
| #3262 | B0B4GYZ4FR | ₹157, **mrp null** | ₹127 | overpriced | price → 127, mrp → 325, 61% off |
| #10479 | B08MLJGB8W | ₹64 | ₹167 | **underpriced ×2.6** | price → 167, discount → 81% |

#10479 also carried a broken title that a repricing script alone would have left rotting:

```
Sehaz Artworks Wooden Key Holder … (7 Hooks, 2-Bird at ₹64 – Amazon
```

A truncated source title with the old price welded into it, and a description repeating
"listed on Amazon at ₹64 — 93% below the ₹899 M.R.P." Both rewritten to the verified ₹167
/ 81%. **Lesson for the reprice path: the price lives in three places on these rows —
`price`, the title tail, and the description body. Updating only the column ships a page
that contradicts itself.**

#3262 needed no copy fix — its description is price-free, which is the shape that ages
well.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs \
  solimo-plastic-storage-jar-container-set-800ml-set-of-6-b0ccvgl5jk \
  smart-and-handsome-face-wash-150g-instant-brightening-b0b4gyz4fr \
  sehaz-artworks-wooden-key-holder-for-wall-stylish-key-stand-key-hanger-key-chain-b08mlj
DONE: IndexNow -> HTTP 200 for 5 urls
```

3 slugs + `/` + `/offers` from the auto-prepend. **HTTP 200**, no 422, Bing fallback not
needed. The two repriced pages were pinged deliberately, not just the new one — their
visible price changed, so the crawled copy is stale until re-fetched. `sitemap.xml` is ISR
1800s; `llms.txt` is `force-dynamic`. No new static route.

Seen cache **1,748 → 1,754** (all 12 resolved ids folded in, rejects included).

## CEO audit (verified against the DB, after the push)

| Check | Value |
|---|---|
| Deals LIVE | **10,278** (+1) |
| PENDING_REVIEW | 0 |
| EXPIRED | 258 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,624 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Clock at audit | **2026-09-19 06:04 IST** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick, one of them corrected:**

1. **Blog stands at 1 post for 2026-09-19 — and the day is 18 hours from over.**
   Reports 09-19d, 09-19e and deal-ingest-09-19c each said the day was "over" or
   "effectively closed" and would "land short". **That was wrong in all three.** Those
   ticks ran in the small hours of the 19th IST, not at its end. The cadence is fully
   recoverable today: two BLOG ticks between now and midnight put 09-19 on target. The
   correct flag is "2 posts still due today", not a post-mortem.
2. **tg-broadcast cursor 10,482 vs max deal id 10,624 = 142 behind.** External cron still
   dead. Draining fires ~142 channel messages in one burst, so it stays parked pending the
   owner's explicit go-ahead.

## Credential handling

The "Telegram" service row again surfaced a live login code in its last-message preview.
Skipped as a non-source chat. The value is not recorded here, in the commit, in the
terminal reply, or anywhere else, and was not acted on. **Fifth tick running.** It stays
on the permanent-skip list.

## Rot list — 22 items (3 new)

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — 28th tick hand-derived.
2. Source-vs-live price drift the dominant reject reason: 2 of 6 fresh this tick.
3. `fkrt.co` DOES resolve to `/p/itm…`. Only `fkrt.it` / `fkrt.cc` are dead.
4. tg-broadcast external cron not firing — drift **142**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected earlier, resolves cleanly.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO) need API changes.
11. ~605 untracked scratch files under `apps/api/` — any broad `ls` there is expensive.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the sitemap from its auto-prepend.
13. `/s?` trap behind `link.amazon`/`amzn.to` — **re-confirmed, new `hidden-keywords` shape**.
14. Flipkart 403/0-bytes is curl-only; the Playwright tab loads the PDP.
15. `data/tg-multi-seen.json` is a resolve-cost cache, **never** a dedup authority.
16. The Amazon ₹-coupon badge is extracted by no shared code.
17. indiafreestuff Feedburner RSS dead (HTTP 000).
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.
19. The indiafreestuff pipeline has no rejection memory.
20. **NEW.** 9 of 13 Telegram source groups are stale; 4 dead ≥1 month, one ~22 months.
    `data/tg-groups.json` claims 13 sources and has 4.
21. **NEW.** `link.amazon` codes are exactly 9 chars; Telegram's `.text-content` glues the
    view count straight onto them. Needs a hard `slice(0, 9)` in the extractor — without
    it, 13 of 13 resolves 404.
22. **NEW.** Old LIVE rows carry stale prices, **and stale price text in the title and
    description**. Two spot-checked, two wrong, in opposite directions.

## Open owner decisions (9)

1. Ratify publish-at-verified-live-price + ±₹1 tolerance + 30% floor, and state that
   coupon-inclusive source prices are reconciled, not rejected.
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.
6. **A periodic re-verify sweep over old LIVE rows — now evidenced, not speculative.**
   Yesterday's five-row audit was 100% clean; today's two-row check was 2-for-2 wrong,
   one of them 2.6× under the real price with the wrong number baked into the page title.
   The sweep needs to rewrite copy, not just the `price` column.
7. Persist a reject cache for indiafreestuff candidates (rot #19).
8. **NEW.** Prune or replace the dead groups in `data/tg-groups.json` (rot #20).
9. **NEW.** Confirm that a 0%-discount exact-price match never publishes (the Titan
   watch). Current answer is no, enforced only by a script-level `discountPct < 5` floor.
