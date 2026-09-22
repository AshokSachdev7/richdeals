# DEAL-INGEST indiafreestuff — tick `2026-09-22ag`

Discovery off `indiafreestuff.in/deals` + `/deals/superdeals`. The homepage is the wrong surface —
it serves banners, not cards. Feedburner RSS is dead. Every Buy Now is a base64 deal id behind
`btn-primery buy_now` (`?rto=`), resolved with `curl -L`. Rate limit 2.6s between their requests,
no 403 and no 429 all sweep.

**Result: 14 new pages + 6 in-place refreshes = 20 slugs. IndexNow 23/23 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| cards discovered | 47 |
| resolved to a real product URL | 38 |
| fresh after dedup against the live DB | 29 |
| PDP-fetched in the logged-in Amazon tab | 28 |
| survived the ±₹1 / InStock gate | 14 new + 6 refreshes |
| rejected at the PDP | 15 |

The 9 that did not resolve to a product: five Flipkart `dl.flipkart.com/dl/indiafreestuff/…`
tracking landings, a realme 16 Pro brand landing, an `amazon.in/events/greatindianfestival/`
event page, `dl.flipkart.com/dl/early-bird-deals-store`, and a bare `jiomart.com/`. All 38 that
did resolve were Amazon this sweep.

One fresh ASIN was dropped before the PDP fetch: `B0F3XKQKZH`, whose card carried `mrp == price
== 1960` under a title literally containing "[Mrp Error]". 28 were fetched.

## Published

Prices are the PDP figure, not the card figure.

| id | productId | price | mrp | off | slug |
|---|---|---|---|---|---|
| 10931 | B0H1WKZR2F | ₹2,376 | 6,500 | 63% | `torche-foldable-study-table-snow-white-b0h1wkzr2f` |
| 10932 | B0BF4M42NY | ₹2,499 | 8,330 | 70% | `plantex-triple-security-door-lock-7110-brass-antique-b0bf4m42ny` |
| 10933 | B0GVSKRSCB | ₹7,549 | 24,990 | 70% | `domo-slate-sl39-10-1-inch-4g-calling-tablet-4gb-32gb-b0gvskrscb` |
| 10934 | B0HDPCC49R | ₹9,499 | 38,999 | 76% | `urban-decor-3-seater-wooden-sofa-set-with-ottoman-b0hdpcc49r` |
| 10935 | B07CYS8V2N | ₹199 | 599 | 67% | `prettykrafts-batman-foldable-toy-storage-box-b07cys8v2n` |
| 10936 | B0H6G48DD4 | ₹2,199 | 4,799 | 54% | `boat-apex-pb400-20000-mah-power-bank-b0h6g48dd4` |
| 10937 | B0965RR6WQ | ₹188 | 349 | 46% | `mamaearth-skin-illuminate-face-serum-15-g-b0965rr6wq` |
| 10938 | B0FHQB7HXR | ₹1,599 | 3,199 | 50% | `cadlec-cookease-2000w-induction-cooktop-b0fhqb7hxr` |
| 10939 | B08MVZN9XN | ₹4,474 | 10,590 | 58% | `ibell-25-l-oven-toaster-griller-with-rotisserie-b08mvzn9xn` |
| 10940 | B0F8W83DYC | ₹193 | 464 | 58% | `dabur-babool-toothpaste-700-g-pack-b0f8w83dyc` |
| 10941 | B0BNMSYJ2W | ₹199 | 308 | 35% | `odonil-room-air-freshener-spray-combo-citrus-fresh-ocean-breeze-440-ml-b0bnmsyj2w` |
| 10942 | B0FCXRSJ8K | ₹479 | 1,347 | 64% | `cellforce-ultrashield-coolant-b0fcxrsj8k` |
| 10943 | B0BN45YSL5 | ₹130 | 230 | 43% | `dabur-red-bae-fresh-gel-toothpaste-300-g-b0bn45ysl5` |
| 10944 | B07SK7PTM1 | ₹299 | 1,199 | 75% | `amazon-brand-symbol-men-s-cotton-rich-polo-t-shirt-b07sk7ptm1` |

Every description is four original paragraphs written from the PDP's own bullets and spec table,
never the source card's copy, with the price line as the closing paragraph and a per-unit figure
where the pack makes one meaningful (Mamaearth ₹/g, Babool and Red Bae ₹/100 g). Every `howTo` is
four steps whose step 2 is the row-specific caveat. Three of those caveats exist because the
listing itself is confusing:

- **Odonil 10941** — the bullets describe a rose scent, the title and the pack shot say Citrus
  Fresh + Ocean Breeze. Written from the title variant, and step 2 says which two cans ship.
- **CellForce 10942** — the listing's own title says "1 Litre" and "(Pack of 3)" in the same
  breath. Step 2 names the conflict rather than picking a side.
- **Red Bae 10943** — the source card claimed "(Min Buy 3)". The PDP is ₹130 flat, single unit,
  no quantity gate. Step 2 rebuts the card explicitly.

Images are the hi-res marketplace CDN asset (`_SL1500_` / `_SL1200_` / `_SL1100_` / `_SL1080_` /
`_SL1440_`), never `images.indiafreestuff.in`. A `THUMB` regex in the push script now rejects the
`_SX###_` / `_SY###_` thumbnail forms mechanically, so a low-res image cannot reach the DB by
inattention again.

`Affiliate:` all 14 are `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21`, enforced by an
exact-match pre-flight regex. Source tags stripped on resolve.

## Refreshed in place (dedup hit, not a duplicate page)

| id | productId | was | now | off |
|---|---|---|---|---|
| 1423 | B07FW8H9C1 | ₹87 / mrp `null` / pct `null` | ₹123 / 270 | 54% |
| 1476 | B0F28YCYZX | ₹179 / 720 | ₹209 / 720 | 71% |
| 7314 | B0CG16N3P4 | ₹235 / 575 | ₹192 / 575 | 67% |
| 5910 | B0F4R4BG5G | ₹172 / 492 | ₹239 / 540 | 56% |
| 6257 | B0FKH9GTX6 | ₹393 / 800 | ₹448 / 800 | 44% |
| 6422 | B0F4RHPBYK | ₹199 / 240 | ₹364 / 560 | 35% |

Nine of the 38 resolved ASINs were already in the DB. Six of those nine were both stale **and**
thin, so they were rewritten in place rather than skipped: stored descriptions ran
**238 / 233 / 115 / 197 / 241 / 263** characters against a ~900–1,100 standard, `howTo` was
**empty** on 1476 and 7314, and 1476 / 7314 / 5910 / 6257 all carried low-res thumbnails. 1423 had
no MRP and no discount at all; 5910 and 6422 carried MRPs that disagreed with the PDP. Five prices
went up, one down (7314, ₹235 → ₹192). A `PriceHistory` row was written for each of the six.

**Slugs were not touched.** All six are indexed, including 5910's 174-character legacy
`…-rs-189-amazon` tail and 1423's truncated `…-b07fw8`. Renaming an indexed slug for cosmetics
throws away the ranking; that is a standing rule, not a judgement call per row.

## Rejected at the PDP — 15

**Price drift beyond ₹1, 10.** Card figure → live PDP figure:

`B0GNMQ6XY5` 419 → 599 · `B0GFX84JWR` 258 → 369 · `B0CCXWTLX4` 156 → 160.87 ·
`B0C55BBKBV` 146 → 153.50 · `B0H335KGV4` 937 → 1,339 · `B0GR9J6CSM` 209 → 299 ·
`B0DNYVQPC3` 115 → 164.64 · `B0CY2RCNTM` 272 → 389 · `B0D7QS9CG6` 100 → 144 ·
`B0CGD1MM8C` 199 → 285.

**Null MRP, 1** — `B0GVGMXKTY`. Publishing it would mean a page with no discount to state, feeding
the nullMrp backlog flagged below.

**Thin listing + near-zero stock, 3** — `B0HF5DZPPT`, `B09YRXJPMK`, `B0CTD5S5ZL`.

**Card marked its own MRP an error, 1** — `B0F3XKQKZH`, dropped before fetch.

The headline of this tick is the rejection rate on price alone: **the source card was wrong on 10
of the 28 ASINs actually fetched**, 36%. Their prices are not a signal, they are a starting point.
The ±₹1 PDP gate is the only thing standing between that card data and a page that disagrees with
Amazon at the moment a reader clicks.

## Freshness

```
node scripts/indexnow-ping.mjs <20 slugs>
DONE: IndexNow -> HTTP 200 for 23 urls
```

20 + 3 — the script prepends `/`, `/offers` and `/sitemap.xml` and dedups through a `Set`, so the
count is the receipt. `api.indexnow.org` resolved on the first POST; **no Bing fallback needed,
third consecutive working tick** (`af`, `ai`, `ag`).

Live pages verified after the write, all 200 with matching Product JSON-LD:

- `/torche-foldable-study-table-snow-white-b0h1wkzr2f` → `"price":"2376"`
- `/boat-apex-pb400-20000-mah-power-bank-b0h6g48dd4` → `"price":"2199"`
- `/dabur-red-bae-fresh-gel-toothpaste-300-g-b0bn45ysl5` → `"price":"130"`
- `/parachute-advansed-cocoa-body-lotion-600ml` → `"price":"192"` (refresh, slug preserved)

Sitemap reads **9,893** — unchanged, which is correct and not rot: it is ISR `revalidate = 1800`,
so a batch pushed minutes ago is at worst 30 minutes from appearing. IndexNow has already been
told; the sitemap is the slower of the two surfaces by design.

Prod endpoints, 7/7 **200**: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean: live deals **10,597** (+14, fully attributed to this tick), PENDING_REVIEW **0**, null price
**0**, null image **0**, coverless posts **0**, seo-less posts **0**, max deal id **10944**,
unpushed commits **0** before this one.

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Today is at cap-compliant 3. Cause is the
   session cron `9 */6 * * *` losing firings when the session is down; the durable Task Scheduler
   fix is unauthorised.
2. **41 live deals state a price in the title the row does not hold** — flat for five ticks.
   Off-by-one rounding on 9708, 5450, 14, 7554; the worst are legacy hand-typed coupon titles
   (1716, 1450, 2602). Retitle pass not authorised.
3. **nullMrp 1,621 / nullPct 1,598** — each down exactly 1 this tick, and that 1 is refresh 1423.
   All 14 new rows shipped with a real MRP, so the backlog is not growing. Backfill still
   unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the
   EXPIRED path, not refreshed to a price nobody can pay.
7. **The legacy thin-description backlog is wide, not anecdotal.** This tick alone hit six live
   rows with 115–263-character descriptions and two with an empty `howTo`, found by dedup rather
   than by looking. Counting 2982, 8902 and 5825 from the Telegram ticks, that is **nine confirmed
   samples from pure random contact** — every one of them a page already indexed and already thin.
   A bulk pass over the affected rows is the single largest content-quality lever on the site and
   remains unauthorised.
8. **`api.indexnow.org` is intermittent on this network, not dead — 200 three ticks running.** Keep
   the Bing GET fallback wired; do not rewrite the script around either assumption.
9. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens → delete
   + regenerate).
10. **Amazon.in sign-in state in the `richDeals` Playwright profile is flagged only, never fixed
    here** — logging in touches owner credentials.
11. **CLAUDE.md freshness rule #3 names the wrong file.** It says to confirm `llms.txt` carries the
    batch, but `/llms.txt` is a hub surface carrying no deal URLs by design — `/llms-full.txt` is
    the deal-bearing one. Both 200, both `force-dynamic`, nothing broken; the rule points the check
    at a file that can never show the batch. Flagged, not edited.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
