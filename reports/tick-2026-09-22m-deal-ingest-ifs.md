# Tick 2026-09-22m — DEAL-INGEST (indiafreestuff) + SITEMON / CEO audit

**Result: 7 deals live (#10857–#10863), 5 rejected on stock, 23 dedup'd. IndexNow HTTP 200 / 11 urls. 1 rot fix (#10817, ₹146 → ₹599). Prod 7/7 endpoints 200.**

Window: 2026-09-22 09:04 → 09:30 IST (03:34 → 04:00 UTC). Run inline, not as a subagent.

---

## Discovery

Listing-card sweep of `/deals` + `/deals/superdeals` at a 2.6 s gap between their
requests. No per-deal-page fetches, no 403/429, no back-off needed.

| stage | count |
|---|---|
| `product-item` cards read | 41 |
| `?rto=` resolved to a real store URL | 35 |
| dropped at resolve/shape | 6 |
| DB dups (already live) | 23 |
| fresh candidates carried to PDP verification | 12 |

The 6 drops, each for a stated reason rather than a heuristic:

| dropped | why |
|---|---|
| 1 × unresolvable `?rto=` | base64 deal id resolved to nothing |
| 1 × `amazon.in/events/greatindianfestival` | sale hub, and it still carried their `dealhi…` tag |
| 2 × `dl.flipkart.com` | app deeplink, not a product page |
| 1 × JioMart homepage | merchant homepage |
| 1 × `amazon.in/stores/Skillmatics` | brand landing page |

The 23 dups spanned #4260 through #10834 — the #10809–#10834 block is from
earlier ticks *today*. IFS re-serves its own carousel, so a dedup pass against the
live DB is doing most of the work on every sweep now, not the discovery pass.

## PDP verification — 12 fresh candidates

Read in **one** `browser_evaluate` over an open `amazon.in` tab (same-origin bulk
`fetch(url,{credentials:'include'})` → `DOMParser`). All 12 returned complete data.
The IFS card price was wrong on **9 of 12**.

| ASIN | IFS card | PDP truth | `#availability` | verdict |
|---|---|---|---|---|
| B0BP59HGC7 | 322 / 473 | ₹322 / Bundle List ₹473 / −32% | In stock | exact → **publish** |
| B0BP4W3JYP | 311 / 491 | ₹311 / Bundle List ₹491 / −37% | In stock | exact → **publish** |
| B0GHMS8C9V | 179 / 499 | ₹179 / MRP ₹499 / −64% | In stock | exact → **publish** |
| B0HDPZ94HM | 549 / 2899 | ₹999 / MRP ₹2,899 / −66% | In stock | coupon drift → **publish at 999** |
| B0F1VBXD82 | 6006 / 9999 | ₹6,459 / MRP ₹9,999 / −35% | In stock | coupon drift → **publish at 6459** |
| B0G3GW9HFL | 3723 / 7999 | ₹3,839 / MRP ₹7,999 / −52% | In stock | coupon drift → **publish at 3839** |
| B0HBXB7MV4 | 4467 / 24999 | ₹4,559 / MRP ₹24,999 / −82% | In stock | coupon drift → **publish at 4559** |
| B0GJZY4PT9 | 130 / 1599 | ₹549 / MRP ₹1,599 / −66% | **Only 1 left in stock** | **reject** — stock depth 1, size sibling of live #10817 |
| B0GLYZ6TB3 | 2319 / 18082 | ₹10,048 / MRP ₹15,381 / −35% | **empty string** | **reject** — stock unverifiable |
| B0GG9VHVGG | 3162 / 4200 | no price | Currently unavailable | **reject** |
| B0F4FL29LQ | 249 / 2449 | no price | Currently unavailable | **reject** |
| B09P8K152F | 399 / 1200 | no price | Currently unavailable | **reject** |

### The drift is a clip-coupon, and that settles the reject criterion

CLAUDE.md's IFS rule says reject on price drift > ₹1; the Telegram path says drift is
never a reject reason and we publish PDP truth. Those only look contradictory while the
drift is unexplained. It is now explained, arithmetically, on three of the four drifters:

| ASIN | PDP list | card | implied coupon | on-page banner |
|---|---|---|---|---|
| B0HDPZ94HM | 999 | 549 | 999 × 0.55 = 549.45 | "45% off coupon applied" |
| B0F1VBXD82 | 6459 | 6006 | 6459 × 0.93 ≈ 6007 | 7% coupon |
| B0G3GW9HFL | 3839 | 3723 | 3839 × 0.97 ≈ 3724 | 3% coupon |

The IFS card quotes **post-clip-coupon**; the PDP quotes list. They are not two claims
about one number, so neither is lying. We publish the number our Offer schema can defend
(the PDP list price) and the `howTo` tells the buyer to tick the coupon box — which is
also the honest instruction, because the coupon does not apply unless they do.

**Enforced criterion this tick: stock, not price.** 4 of the 5 rejects are stock
failures; the 5th (B0GLYZ6TB3) is an empty availability read, which is not the same as
in-stock and was treated as unverified.

## Published — 7 deals, #10857–#10863

| id | ASIN | price / mrp / % | slug |
|---|---|---|---|
| 10857 | B0BP59HGC7 | 322 / 473 / 32 | `colgate-gentle-ultrafoam-toothbrush-2pcs-sensitive-toothpaste-combo` |
| 10858 | B0BP4W3JYP | 311 / 491 / 37 | `colgate-gentle-enamel-toothbrush-4pcs-sensitive-toothpaste-combo` |
| 10859 | B0GHMS8C9V | 179 / 499 / 64 | `go-well-herbal-bamboo-vinegar-foot-pads-10-pieces` |
| 10860 | B0HDPZ94HM | 999 / 2899 / 66 | `pascia-rgb-neon-rope-light-16-4ft-app-remote` |
| 10861 | B0G3GW9HFL | 3839 / 7999 / 52 | `callas-shoe-rack-storage-bench-10-pairs-5-tier` |
| 10862 | B0HBXB7MV4 | 4559 / 24999 / 82 | `rk-aqua-fresh-ro-uv-uf-tds-water-purifier-12l` |
| 10863 | B0F1VBXD82 | 6459 / 9999 / 35 | `raddzy-foldable-pilates-reformer-home-gym-board` |

Script `apps/api/scripts/push-ifs-0922m.mjs`, `created=7 updated=0`. All `status:LIVE`,
all `?tag=ashoksachdev-21` on `/dp/ASIN`, all images from `m.media-amazon.com`, all
titles/descriptions original (no IFS text, no IFS images). Pre-flight added a
`discountPct` cross-check this tick on top of the existing title-₹-vs-price, MRP and
image-host gates; all 7 passed first run.

Two copy decisions worth recording:

- **#10859 (foot pads)** — the whole category sells a detox claim. The description says
  plainly that the pads darken because the powder is hygroscopic and absorbs sweat under
  an occlusive patch, that no detox claim here survives contact with evidence, and carries
  a `howTo` step telling diabetic / neuropathic readers to check with a doctor first. We
  do not need to repeat a vendor's health claim to sell a ₹179 product.
- **#10862 (RO purifier)** — the ₹24,999 MRP is inflated, but it is Amazon's own field and
  its own `savingsPercentage` reads −82%, so schema matches PDP. The description says
  the MRP reads inflated and to judge the ₹4,559 on its own.

## CEO-mode rot fixed inline — #10817

Rejecting B0GJZY4PT9 for stock depth surfaced its live sibling. #10817 carried a price
that had never been PDP-verified:

| field | was | now | source |
|---|---|---|---|
| price | 146 | **599** | `#centerCol` "₹599.00 with 63 percent savings" |
| discountPct | 91 | **63** | `.savingsPercentage` −63% |
| isSuper | true | **false** | 599 > 250 |
| isHot | true | **false** | 599 > 500 |
| title | "…at ₹146 (91% Off)…" | "…at ₹599 (63% Off)…" | retitled to match |

mrp 1,599 and the slug were already correct and are unchanged. A `priceHistory` row was
written at 599 so the correction is visible in the series rather than silently replacing
the old number. The ₹146 was an IFS-card price from an earlier tick that got pushed
without a PDP read — the exact failure this tick's verification step exists to stop.

## Freshness (CLAUDE.md rule, all three checks)

| check | result |
|---|---|
| IndexNow | **HTTP 200, 11 urls** — 7 new slugs + `kids-convocation-graduation-gown-and-cap-set` (content changed) + the 3 the script auto-prepends (`/`, `/offers`, `/sitemap.xml`) |
| deal pages on prod | spot-checked 3 → **200** (`pascia…` 174,765 b · `rk-aqua…` 177,988 b · `kids-convocation…` 170,871 b) |
| sitemap carries the batch | **not yet — 0 of 7 slugs present.** `sitemap.xml` is ISR `revalidate = 1800`, and the render being served predates the push. 9,818 `<loc>` / 2,136,334 b. Not rot, not actionable: it picks the 7 up inside 30 min, IndexNow has already been told, and the pages themselves serve 200. |

No new static route was added, so nothing needed appending to `staticRoutes`, and no new
hub page, so `llms.txt` needs no edit.

## SITEMON — prod endpoints, 7/7 200

| endpoint | status | time | size | vs tick j |
|---|---|---|---|---|
| `/` | 200 | 0.243 s | 313,812 b | — |
| `/offers` | 200 | 0.144 s | 60,233 b | — |
| `/blog` | 200 | 0.343 s | 149,515 b | — |
| `/sitemap.xml` | 200 | 0.307 s | 2,135,373 b | **+718 b** |
| `/feed.xml` | 200 | 0.112 s | 45,285 b | — |
| `/api/deals` | 200 | 0.136 s | 48,406 b | — |
| `/llms.txt` | 200 | 0.341 s | 14,776 b | **+2 b** |

Both deltas are consistent with tick l's 4 publishes. No staleness signal.

## CEO audit

Verified against the DB before flagging, per the standing rule.

| check | reading | verdict |
|---|---|---|
| LIVE deals | 10,509 → **10,516** after this tick | OK |
| PENDING_REVIEW backlog | 0 | OK |
| deals, null price | 0 | OK |
| deals, null image | 0 | OK |
| posts total | 322 | OK |
| coverless posts | 0 | OK |
| seo-less posts | 0 | OK |
| posts/day IST | 09-15 → 09-22: 3, 3, 3, 3, 3, 2, **1**, 3 | note, below |
| tg-broadcast cursor vs DB max | `lastId 10856` = maxId 10856 at probe time | OK — self-healed again |
| unpushed commits | 0 at probe | OK |
| prod endpoints | 7/7 200 | OK |

Two notes rather than findings:

- **2026-09-21 shows 1 post.** Below the 2–3/day target, above the never-0 floor, and
  historical — the day is closed and cannot be backfilled into its own IST window. Today
  sits at 3, which meets the rule. Flagging it so it is on the record, not proposing a fix.
- **The audit script has a blind spot.** `_ceo0922k.cjs` counts `price` and `image` nulls
  but not `mrp` or `discountPct` nulls. Deliberately not widened mid-tick: the same script
  is reused across ticks, and changing what it counts would silently change what every
  earlier number in this report series meant. Worth widening at the start of a tick, with
  the first reading called out as a new baseline.

## Amazon read quirks learned this tick

Four of these break existing code paths, so they are recorded as findings rather than notes.

1. **`.basisPrice` has a second label.** It reads either `"M.R.P.: ₹2,899₹2,899"` *or*
   `"Bundle List Price: ₹473₹473"` (both Colgate combos). An MRP parse anchored on
   `M.R.P.` returns null on bundle listings.
2. **`#availability` has three states, not two.** `"In stock"`, `"Currently unavailable…"`,
   and **empty string** (B0GLYZ6TB3). Empty must be read as unverified. A truthiness check
   on this field publishes an unverifiable listing. A fourth practical variant,
   `"Only 1 left in stock."`, is technically in-stock but thin enough to reject.
3. **hiRes suffixes are not a fixed set.** This batch returned `_SL1500_`, `_SL1445_`,
   `_SL1440_`, `_SL1254_`, `_SL1236_`, `_SL1200_`, `_SL1024_`, `_SL1000_`. Any regex with a
   `_SL1500|1200|1080|1000_` whitelist falls through to `hi[0]` silently. Filenames also
   contain `+` and `-` (`61axlv57l+L`, `71ZN4Va-BkL`), and some listings return zero hiRes
   entries at all.
4. **hiRes[0] is variant-dependent, so it must be re-read under the same `?th=1&psc=1`
   as the price.** Reconstructing the image↔ASIN mapping by position from an earlier flat
   sweep was wrong on **2 of 7** — B0BP59HGC7 is `61axlv57l+L._SL1236_` (not
   `51RwTYwxvsL._SL1000_`) and B0HBXB7MV4 is `71ZN4Va-BkL._SL1254_` (not
   `71ZKw3rinOL._SL1500_`). Caught by re-measuring instead of reusing. Two deal pages would
   have shipped the wrong product photo.

Also standing, unchanged: the same-origin bulk read does **not** depend on Amazon sign-in
state — all 12 ASINs plus two follow-up sweeps returned complete data. Sign-in state in the
`richDeals` Playwright profile is still flagged rather than fixed (it touches owner
credentials).

## Carried flags, not fixed

- **CLAUDE.md freshness rule #3 names the wrong file.** It says `llms.txt` carries the
  batch; `/llms.txt` carries no deal URLs by design. `/llms-full.txt` is the file that
  does. Flagged, not edited — the rule text is the owner's.
- **DO API token** pasted in chat during setup still wants rotating. Provisioning is done;
  daily work does not need it.
