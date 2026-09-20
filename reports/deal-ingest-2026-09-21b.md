# DEAL-INGEST indiafreestuff tick — richdeals.in — 2026-09-21 (b)

## Funnel

| stage | count |
|---|---:|
| feedburner RSS | **HTTP 000, 0 bytes** — dead |
| cards on `/pages/getdeals` | 40 |
| already dispositioned by the previous tick | 14 |
| untouched cards triaged this tick | 26 |
| new single-product candidates | **7** |
| deal pages fetched ≥2.5 s apart | 7 (all HTTP 200) |
| `?rto=` links extracted | 7 |
| resolved to a real store URL | 7 (100% Amazon) |
| already in our DB | **0** |
| price/stock verified on the PDP | 7 |
| rejected — OutOfStock | **1** |
| **published `status:live`** | **6** |

## Discovery

`feeds.feedburner.com/indiafreestuff` returned **HTTP 000 / 0 bytes** again, so discovery ran off
`https://indiafreestuff.in/pages/getdeals`. That path **301s to `www.`** — without `-L` it returns
167 bytes and the source looks dead. With `-L`: 247,762 bytes, 40 cards matched on
`<a\b([^>]*item-title[^>]*)>(.*?)</a>` with `re.S`.

**The listing has not rotated.** It is byte-for-byte the same 40 cards the previous DEAL-INGEST tick
pulled ~2 h ago. That is not a fetch error — it is the source publishing slower than our
`23 */2 * * *` cadence assumes. The yield this tick came entirely from cards the previous tick never
reached, not from new inventory.

## Triage — 26 untouched cards → 7 candidates

**19 rejected on the single-product rule or quality:** cards 1/6/26 sale hubs; 11 Prime membership;
16 a JioMart offer page; 21 a `[Loot]` coupon *search* URL; 31 Google Play recharge; 36 a WhatsApp
channel link; 4 + 9 supplements; 14/15 Lakme cosmetics; 19 Dabur hair oil; 23/24/25/27/34 five
separate TE-A-ME tea SKUs; 39 a T2F 5-pack of leggings.

**Nine of those 19 are FMCG/consumables the `GROCERY` filter would have killed automatically — it
still runs on DesiDime only.** Owner decision #11 exhibit, third tick running.

## Resolution

All 7 `?rto=` values are base64 deal ids behind a `buy_now` anchor that **spans lines** — parsed
with `re.S|re.I` on the anchor tag first, then `href` inside it. 7/7 resolved, **21/21 cumulative**.
Every one carried the source's own `tag=dealhind-21`, stripped on rewrite.

All seven fetches initially returned `PAGE <i> 000 0b`. That is the documented Windows-Python CRLF
trap, not a block: the candidate list was written by a Python heredoc, so every URL carried a
trailing `\r`. `tr -d '\r'` into a second file and all seven returned 200.

## Verification — one browser call, seven ASINs

One `browser_evaluate` in the logged-in Amazon tab did a same-origin `fetch` + `DOMParser` loop over
all seven ASINs with a 1.2 s internal sleep, reading `#productTitle`, `.priceToPay .a-price-whole`,
`.basisPrice .a-text-price .a-offscreen`, both stock signals, `#landingImage[data-old-hires]` and
`#feature-bullets`. No second round-trip was needed for either the payload or the rewrite.

| ASIN | product | buybox | MRP | off | stock | coupon |
|---|---|---:|---:|---:|---|---|
| B09KGV7WSV | KINGONE stylus for iPad | ₹1,495 | ₹5,999 | 75% | InStock | 10% |
| B0CP914DZD | DIGIROOT iPad pencil | ₹1,489 | ₹2,849 | 48% | InStock | 10% |
| B0FPFNZ9X8 | 2-in-1 julienne peeler | ₹199 | ₹999 | 80% | InStock | — |
| B0CF1R13C4 | Solimo 750 ml glass jars ×4 | ₹359 | ₹1,999 | 82% | InStock | — |
| B0HB5LQY8L | waterproof silicone sealant | ₹449 | ₹999 | 55% | InStock | 40% |
| B0H83XQ3CV | car armrest cushion | — | — | — | **`#outOfStock`** | **reject** |
| B0GV3H1G8K | AFAST glass tea cups ×6 | ₹812 | ₹2,436 | 67% | InStock | 2% |

`B0H83XQ3CV` returned `atc:false`, `oos:true`, `price:null`, `mrp:null` — unambiguous, rejected.
**Third accessory/soft-goods OOS reject in two ticks.**

**Dedup was against the DB, not a seen file** — all 7 ASINs returned `none`. **0% dup rate**, against
75% on the Telegram side. IFS is still the non-derivative source.

## Push

```
POST /admin/deals/bulk  → HTTP 201  {"count":6, all six results ok:true, created:true}
```

`count` **and** every `results[].ok` were read, not just the status code — `admin.controller.ts`
wraps each item in its own `try/catch` and pushes failures into `results`, so a 201 with a healthy
count can still hide an `ok:false`. None here. Deal ids **10799-10804**.

Contract pinned from source this tick rather than recalled: the DTO is
`apps/api/src/deals/deal-ingest.dto.ts` (**not** under `src/admin/dto/`), and `mapStatus()` defaults
to **`PENDING_REVIEW`** on a missing or mis-cased status — lowercase `"live"` is mandatory, and all
six went in lowercase.

Rewrite: every title and description written from `#productTitle` plus the captured feature bullets.
No IFS card title, no IFS copy, no `images.indiafreestuff.in` — all six images are
`m.media-amazon.com` `data-old-hires` URLs. Affiliate is
`https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21` with `tag=dealhind-21`, `/ref=sr_*`, `m=`,
`marketplaceID`, `qid`, `s=merchant-items` and `sr=` all stripped.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <6 slugs>
DONE: IndexNow -> HTTP 200 for 9 urls
```

**HTTP 200.** 9 urls = 6 slugs + the three the script always prepends (`/`, `/offers`,
`/sitemap.xml`), so the sitemap resubmit is covered by the same call. No 422, so the unshipped Bing
GET fallback was not needed — four ticks at 200 now.

## CEO audit

**The flat-₹ coupon gap is UNTESTED this tick, not fixed and not freshly confirmed.** This batch
produced four `%` coupons (10%, 10%, 40%, 2%) and **zero** flat-₹ coupons, so the `%` arm was
exercised and the `₹` arm never ran. `/(\d+)% ?(?:off )?[Cc]oupon/` in `ingest-common.mjs` still
cannot see `[Apply ₹1500 Coupon]` and still needs a `₹\s?[\d,]+\s*(?:off\s*)?[Cc]oupon` arm. Saying
"confirmed again" here would be fabricated.

**NEW — the source is slower than the cron.** 40 identical cards across two ticks ~2 h apart. The
`23 */2 * * *` schedule assumes turnover that indiafreestuff is not producing overnight; the only
reason this tick yielded anything is that the previous one left 26 cards untriaged. Not rot in our
code — a cadence mismatch worth knowing before the next empty tick gets read as a break.

**NEW — two implausible MRPs in one batch.** ₹5,999 struck through on a ₹1,495 stylus (75%) and ₹999
on a ₹199 peeler (80%). Both were read off `.basisPrice`, so they are what Amazon serves, and both
are published as served. The implausible-MRP guard on the to-do list would have flagged these two;
it is still not written.

**Carried rot, unchanged:** **#48** Rogerkart `/r/<code>` client-side JS redirect. **#47** five
derivative Telegram groups, 75% dup. **#46** CoolzTricks nameless coupon claims. **#45**
`data/tg-multi-seen.json` drifts both ways. **#44** IFS Flipkart `?rto=` → 403 — **not re-triggered,
all 7 resolved to Amazon**. **#43** CLAUDE.md's "homepage HTML fallback" against a homepage with no
deal grid, and its "RSS first" against a feed returning 000. LIVE deal 10031 carries `productId`
`ae27f94b3330`, a hex hash. ~200 scratch files in `apps/api/scripts/` — owner decision #5.

**Audit set — every number re-measured this tick, none carried:**

| metric | value |
|---|---:|
| LIVE deals | **10,457** (+6) |
| EXPIRED | 259 |
| PENDING_REVIEW | **0** |
| LIVE with null price | **0** |
| LIVE with null image | **0** |
| LIVE with no MRP | 1,626 (unchanged — all six carry an MRP) |
| DB max deal id | **10,804** |
| posts | 319 (0 coverless, 0 seo-less) |
| broadcast cursor `lastId` | 10798 vs 10804 — **6 behind, mid-catch-up, self-heals** |
| unpushed commits (before this report) | 0 |

**Posts per day, IST:** 09-16 `3` · 09-17 `3` · 09-18 `3` · 09-19 `3` · 09-20 `2` · 09-21 **`1`**.
Never 0, never over 4. 09-21 is 8 h old at 1 post — inside the rule, but the remaining CONTENT-SEO
ticks have to carry it to 3.

Scratch hygiene clean — `apps/api/_ifs0921b.cjs` (dedup) and `apps/api/_di0921b.cjs` (this audit)
each created and removed in the same Bash call (42nd and 43rd clears). The payload JSON lives in the
session scratchpad, outside the repo.
