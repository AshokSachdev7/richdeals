# DEAL-INGEST indiafreestuff tick — 2026-09-19b (IST)

Second indiafreestuff tick of the day. The morning tick
(`reports/deal-ingest-2026-09-19.md`, commit `e3f8e97`) pushed 27; this one pushed **11**
and, more usefully, **repaired 10 already-live rows** whose DB prices had drifted away from
the live PDP.

## Discovery

Homepage HTML, 2,600 ms between requests (rule is ≥2,500). **No 403, no 429, no back-off.**
Feedburner RSS still dead (HTTP 000) — rot #17, homepage fallback is now the only path.

| Stage | Count |
|---|---|
| Cards discovered | 53 |
| `?rto=` resolved to a real store URL | 50 |
| Resolve-drops | 3 |

Two of the three drops are visible and both are the same failure:

| Source slug | Resolves to | Verdict |
|---|---|---|
| `jiomart-quick-offer--free-rs100-shopping` | bare JioMart homepage | dead — no product |
| `zebronics-zeb-pspk-3sound-feast-60with-b` | `dl.flipkart.com/dl/indiaXdesire-deals/…` | dead — tracking landing, not `/p/itm…` |

**Rot #3, fourth consecutive tick.** indiafreestuff's Flipkart and JioMart outbound links do
not survive resolution. Nothing to fix on our side — the source's links are structurally
broken.

## Dedup — against the live DB, not a file cache

```
candidates 50   fresh 24   alreadyLive 26
```

Dedup key is the resolved `productId`, queried through Prisma
(`OR: [{ productId }, { affiliateUrl: { contains: id } }]`) — `Deal` has no `url` column.

Two of the 26 already-live hits, `B07W1J1Y8F` (id 10591) and `B0D49PXZ6M` (id 10592), were
published by **this morning's own tick**. The source re-lists its own cards within hours; the
DB check is what stops the double-publish.

## Verify — 24 fresh ASINs

Three batched `browser_evaluate` calls (12 + 12 + 10 — the last ten are the re-verified
already-live rows below) in the logged-in Amazon tab: same-origin `fetch` + `DOMParser`,
reading `#productTitle`, `.priceToPay .a-price-whole`, `.basisPrice .a-offscreen`,
`#add-to-cart-button`, the ₹-coupon badge and `data-old-hires`. curl stays bot-blocked.

**No coupon badges anywhere this tick.**

### Accepted — 11

| ASIN | ₹ | MRP | Off | Product |
|---|---|---|---|---|
| B0H2W9X666 | 229 | 660 | 65% | 2-ply facial tissue, 6 × 100 sheets |
| B0FGJWYTY3 | 705 | 1,486 | 53% | Legrand DX3 DP C1A DC MCB |
| B0F45CJW2R | 429 | 1,649 | 74% | Highlander men casual shirt |
| B0FLWR9Q3W | 679 | 3,799 | 82% | Libas printed cotton night suit, women |
| B0BT7V1CBJ | 1,130 | 4,599 | 75% | Pepe Jeans men jeans |
| B0HCTLZB7P | 206 | 499 | 59% | PulGos universal travel adapter, 6A socket |
| B0F1V2GGTY | 305 | 796 | 62% | Microfiber cleaning cloth 600 GSM, 30×40 cm |
| B0G58KH8XR | 407 | 1,999 | 80% | 65W SUPERVOOC charger + Type-C cable |
| B0DXX8P18C | 1,106 | 2,180 | 49% | Nippon Paint Matex Gold interior emulsion 4L |
| B0HHPV98CG | 1,799 | 8,999 | 80% | HRX Parabola cabin-size hard shell suitcase |
| B07NQLL85Z | 206 | 598 | 66% | Athom Living cotton waffle bath towel ×2 |

Two cards were off by ₹1 against the live PDP (Pepe Jeans card 1,131 → live 1,130; SUPERVOOC
card 408 → live 407). Inside the ±₹1 tolerance, published at the **verified live** price.

### Rejected — price drift, 9

| ASIN | Card ₹ | Live ₹ |
|---|---|---|
| B09C66H35H | 71 | 210 |
| B0BT7R9SG9 | 596 | 1,399 |
| B0GGSVY9WQ | 1,452 | 3,599 |
| B0HF82ZLCQ | 379 | 399 |
| B0DPKTSBHX | 620 | 2,276 |
| B0DVLVLKCJ | 674 | 749 |
| B0GDTJZKND | 346 | 365 |
| **B07FPXXY5R** | 91 | 95 |
| **B09NQ5ZV2K** | 183 | 449 |

The last two were drift rejects in this morning's tick as well. They were **re-verified, not
assumed** — the source has simply not corrected its cards in eight hours.

### Rejected — out of stock, 4

`B0FKH82DB4` · `B0G44SYXZL` · `B0DDXJ146Q` · **`B0GVNT5XVN`** (second consecutive tick OOS —
if it reads OOS again it should be treated as permanently gone, not retried).

**9 of 24 rejected on drift. Rot #2 re-confirmed and still the dominant reject reason.**

## Pushed — 11 deals, `status:live`

`POST /admin/deals/bulk` → **HTTP 201, count 11**, all `created:true`. Amazon affiliate
`?tag=ashoksachdev-21` on `/dp/ASIN`, images from `m.media-amazon.com`, titles /
descriptions / how-to steps written fresh — nothing lifted from indiafreestuff, no
`images.indiafreestuff.in` URL anywhere in the payload.

| Slug |
|---|
| `2-ply-facial-tissue-boxes-600-sheets-pack-of-6-b0h2w9x666` |
| `legrand-dx3-dp-c1a-dc-mcb-b0fgjwyty3` |
| `highlander-men-casual-shirt-b0f45cjw2r` |
| `libas-printed-cotton-night-suit-women-b0flwr9q3w` |
| `pepe-jeans-men-jeans-b0bt7v1cbj` |
| `pulgos-universal-travel-adapter-6a-socket-b0hctlzb7p` |
| `microfiber-cleaning-cloth-600-gsm-30x40-cm-b0f1v2ggty` |
| `65w-supervooc-charger-with-type-c-cable-b0g58kh8xr` |
| `nippon-paint-matex-gold-interior-emulsion-4l-b0dxx8p18c` |
| `hrx-parabola-cabin-size-hard-shell-suitcase-b0hhpv98cg` |
| `athom-living-cotton-waffle-bath-towel-pack-of-2-b07nqll85z` |

Spot-checked `https://richdeals.in/pepe-jeans-men-jeans-b0bt7v1cbj` → **200**.

## CEO-mode inline fixes — 9 reprices + 1 expire

This is the part of the tick worth reading. The 26 already-live dedup hits were not simply
skipped: ten of them had a DB price that disagreed with the live PDP, so they were
re-verified in the same batched browser call and **corrected in place**.

```
REPRICE 10084 signoraware-fusion-…-setof4--red             price 764->1520   mrp 1799->1799 pct 58->16
REPRICE 10160 amazon-solimo-cushioned-iron-chair-rustic-finish price 3586->2904 mrp 8100->8100 pct 56->64
REPRICE 8343  essence-i-love-flawless-skin-foundation-…-30-ml  price 312->270   mrp 625->625   pct 50->57
REPRICE 3662  lifelong-llm567-…-b09x21139q                  price 15326->8330 mrp null->null  pct null->null
REPRICE 10288 solimo-iron-chair-with-cushioned-seat-set-of-2-red price 4868->4381 mrp 8100->8100 pct null->46
REPRICE 1530  73-off-dove-body-wash-1l-256-B0BHTQ           price 521->426    mrp 949->849   pct 45->50
REPRICE 9399  treo-by-milton-borosilicate-glass-tiffin-set-of-2-400ml price 549->490 mrp 995->995 pct 45->51
REPRICE 10112 attro-treat-time-…-football-champ-blue        price 289->260    mrp 749->749   pct 61->65
REPRICE 5251  cetaphil-optimal-hydration-water-gel-48g      price 749->574    mrp 1799->1799 pct 58->68
EXPIRE  10056 tu-casa-hg-35-220watts-pendant-light-black-diamond-rs-765-amazon  LIVE->EXPIRED
```

Four things in there matter beyond the numbers:

1. **10084 was customer-hostile.** The DB under-quoted the Signoraware set by **₹756** — a
   reader clicking through from a ₹764 listing lands on a ₹1,520 page. Its discount badge
   collapsed **58% → 16%** once corrected, which is the honest figure.
2. **1530's MRP was also wrong** — DB said ₹949, the PDP says ₹849. Both columns fixed, not
   just price.
3. **10288 carried `discountPct: null`** despite having both a price and an MRP. Now 46%.
4. **3662's live MRP reads ₹149,999** on a chair massager selling at ₹8,330. Implausible
   (a strike-through the seller inflated), so it was **rejected and not written** — the DB
   `mrp` stays null and `discountPct` stays null rather than publishing a fake 94% badge.

10056 went EXPIRED rather than deleted: the page stays live with the EXPIRED banner, drops
out of the sitemap and goes noindex. Never a 404.

### New rot observation — no owner for stale LIVE rows

Drift on already-live deals runs in **both directions**, including the direction that hurts
the reader. Nothing in the system re-verifies old LIVE rows on a schedule — these ten were
caught only because they happened to be re-listed by indiafreestuff today and collided with
dedup. There are 10,276 LIVE deals and no periodic re-verify sweep over them.

A second smell surfaced by the same output: several of those slugs no longer describe the
product on the ASIN (`73-off-dove-body-wash-1l-256-B0BHTQ` is a truncated ASIN plus a
discount claim baked into the URL; `tu-casa-…-rs-765-amazon` bakes a price into the slug that
is now wrong). Slugs are permanent; prices are not. **Price-in-slug is a data-integrity bug
waiting to be re-flagged.**

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <21 slugs>
DONE: IndexNow -> HTTP 200 for 23 urls
```

21 slugs = 11 newly pushed + 10 changed (9 repriced + 1 expired), plus `/` and `/offers` from
the script's auto-prepend. **HTTP 200 from `api.indexnow.org`. No 422, Bing GET fallback not
needed.** Bare-slug mode with `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'` — MSYS rewrites any
argument starting with `/` into a Windows path.

Submitting the **changed** slugs, not only the new ones, is the point: a corrected price that
search engines never re-crawl is still showing the reader ₹764.

`sitemap.xml` is ISR `revalidate = 1800` and picks the batch up by itself; `llms.txt` is
`force-dynamic`. No new static route, so nothing to append to `staticRoutes`.

## CEO audit (verified against the DB after the push and the fixes)

| Check | Value |
|---|---|
| Deals LIVE | **10,276** (10,266 → +11 pushed − 1 expired) |
| PENDING_REVIEW | 0 |
| EXPIRED | **258** (257 → +1) |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| Max deal id | 10,622 |
| Posts | 314 — coverless 0, seo-less 0 |
| Posts-per-day IST | 09-15:3 09-16:3 09-17:3 09-18:3 **09-19:1** |
| Prod endpoints | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` → all **200** |
| Unpushed commits before this tick | 0 |

**Two things rotting outside this tick:**

1. **Blog still at 1 post for 2026-09-19** against the 2-3 target. **Seventh tick in a row
   flagging it.** Not a violation (never 0), but the IST day is nearly closed and it will
   finish short unless a BLOG tick fires with 2 posts.
2. **tg-broadcast cursor 10,482 vs max deal id 10,622 = 140 behind**, widened by 11 from this
   push. External cron still dead. Draining now fires ~140 channel messages in one burst, so
   it stays parked until the owner says go.

## Rot list — 18 items, 2 re-confirmed

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — hand-derived again.
2. **Re-confirmed.** Source-vs-live price drift is the dominant reject reason: **9 of 24**.
3. **Re-confirmed, fourth tick.** indiafreestuff Flipkart/JioMart outbound links structurally
   dead — JioMart resolves to a bare homepage, Flipkart to `dl.flipkart.com` tracking.
4. tg-broadcast external cron not firing — drift now **140**.
5. `curlFinal` cannot follow `rogerkart.com/r/…`.
6. ~~`amazn.lt` NXDOMAIN~~ — corrected, resolves fine.
7. `.claude/agents/deal-ingest.md` stale on 4 points plus RSS.
8. `where to get free samples`: 11,072 impressions / pos 6.8 / 0 clicks; 46 of 314 slugs.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` needs `productId` on the DTO)
    need API changes.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps that prod 404s; `indexnow-ping.mjs` omits the sitemap
    from its auto-prepend (one-line fix still available, still not applied).
13. `/s?` search pages hide behind `link.amazon` **and** plain `amzn.to` — reject must run post-resolve.
14. Flipkart PDPs serve no ld+json to a real browser either, and a stale tab lies.
15. Seen-cache is never authority; only the DB check is.
16. The Amazon ₹-coupon badge is extracted by no shared code (no badges hit this tick).
17. indiafreestuff Feedburner RSS dead (HTTP 000) — homepage is the only discovery path.
18. Meesho unverifiable — 403 to curl *and* to the logged-in browser.

Filed under #1 rather than as a 19th item: everything the verifier does is still inline in
the tick. The list of what belongs in `ingest-common.mjs` now reads — same-origin fetch +
DOMParser extractor, ₹-coupon badge regex, `.priceToPay .a-price-whole` trailing-dot strip,
`.basisPrice` MRP **plus the implausible-MRP guard** (B09X21139Q's ₹149,999 is the live
example, caught by hand this tick), `.savingsPercentage`, `#add-to-cart-button` in-stock,
`data-a-dynamic-image` image fallback, and an ASIN extractor tolerant of `/dp/`,
`/gp/product/`, `/source=offertag.in/dp/` and SEO-slug shapes.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% floor in CLAUDE.md, and state that
   coupon-inclusive source prices are reconciled, not rejected. **Sharpened today: the two
   ±₹1 cards were published at the live price under a rule that exists only in these reports.**
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 314 slugs).
5. Scratch-file cleanup under `apps/api/`.

**Proposed sixth, on the strength of this tick:** a periodic re-verify sweep over old LIVE
rows. Ten stale rows surfaced by accident today, one of them under-quoting by ₹756. There is
no reason to believe the other 10,266 are clean.
