# DEAL-INGEST indiafreestuff tick 2026-09-22q

**Run:** 2026-09-22 11:05–11:32 IST · richdeals.in · inline (not subagent)
**Result:** **10 published** (#10866–#10875), **4 CEO rot fixes** (#6924, #8668, #10631, #3536), IndexNow **HTTP 200 / 13 urls**, 1 rejected on stock depth, 16 total requests to their domain.

---

## Discovery — the RSS source in CLAUDE.md is dead, the real feed is undocumented

| Source | As documented | Reality |
|---|---|---|
| `feeds.feedburner.com/indiafreestuff` | "their RSS (feedburner) first" — CLAUDE.md + `ingest.config.json` source #1 | **HTTP 000** — dead |
| `indiafreestuff.in/rss` | — | 302 → homepage HTML, **0 `<item>`** |
| homepage HTML | "homepage HTML fallback" (CLAUDE.md + `.claude/agents/deal-ingest.md`) | 282,407 b and **no deal grid** — the cards are not in the document |
| **`/pages/getdeals`** | not documented anywhere | **HTTP 200 / 246,019 b — this is the feed** |

`GET https://www.indiafreestuff.in/pages/getdeals` with a browser UA + `X-Requested-With: XMLHttpRequest` + `Referer: https://www.indiafreestuff.in/` returns the listing fragment: **40 cards / 39 unique slugs**. Siblings visible in their inline JS, unused this tick: `/newsuperdeals`, `/featuredproducts`, `/filterbx`, `/filters`, `/homenewsarticles`, `/pages/getadsajax`.

Card shape: `div.col-xs-3.product-outer` → `.product-item`, title in `a.item-title`, `.price-wrap` → `.off-discount>p` / `.old-price>p` / `.new-price>p`, posted time in `.like-date-chat .inside-more`.

**The `?rto=` Buy Now links ship inside the listing fragment** — 40 occurrences, one per card. No per-deal-page fetch was needed, which is what kept the whole tick to 16 requests against their domain (1 feed + 15 resolutions, ≥2.5 s apart, zero 403/429).

---

## Selection — 40 → 15

Rejected at card level: multi-product/loot framing, category and sale-hub links, "starts at" posts, app-only offers, and cards with no deal price. 15 carried forward, **every one resolving to Amazon** this sweep — no Flipkart or Cuelinks store appeared in the top 40.

5 of the 40 cards carried a **condition inside the title** — `[Apply 3% Coupon]`, `(Min Buy 2)` and similar. Those are not prices; they are claims that have to be settled on the PDP, and two of them landed in the candidate set (below).

---

## `?rto=` resolution — 15 of 15

`curl -sL -o /dev/null -w '%{http_code}\t%{url_effective}'`, ≥2.5 s apart. All 15 resolved to `amazon.in/dp/<ASIN>` and **all 15 carried `dealhind-21`**, their tag, which was stripped and replaced with `ashoksachdev-21`. Their tag is consistent enough now to be a reliable tell that a link is theirs rather than a re-post of someone else's.

---

## Dedup — 15 → 11 fresh + 4 DB dups

`apps/api/_dd-0922q.cjs`, Prisma serial (managed PG has ~22 slots; `Promise.all` earns `P2037`).

| productId | DB | Verdict |
|---|---|---|
| B081KGV7V6, B0D1FQSZGK, B0CGVF5P13, B0GJSQCJYN, B0F4W9RPZ2, B0GXVBTFJP, B0D9NXDW79, B0C81W99ZL, B0DN1PK2L2, B0G4812L84, B0DXL1B7DB | none | **11 fresh → verify** |
| B0BP7Y3ZS2 | #6924 LIVE ₹177 | dup → **audit** |
| B0GWMLDVJF | #8668 LIVE ₹377 | dup → **audit** |
| B0GF81BZ65 | #10631 LIVE ₹255/₹599 | dup → **audit** |
| B00JQ4FUW4 | #3536 LIVE ₹77/₹195 | dup → **audit** |

---

## PDP verification — 15/15 read, zero nulls

One `browser_evaluate` on the open `amazon.in` tab, looping all 15 ASINs at `?th=1&psc=1`, 250 ms apart: same-origin `fetch(url,{credentials:'include'})` + `DOMParser`, price from `#centerCol` innerText, image from `#landingImage`'s `data-a-dynamic-image` (keys sorted by width desc), name from `#productTitle`. All 15 HTTP 200, no errors, no null images.

| # | ASIN | PDP price | PDP MRP | PDP % | `#availability` | IFS card | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | B081KGV7V6 | ₹699.00 | 2,299 | −70% | In stock | 699/2299 70% | exact → publish |
| 2 | B0BP7Y3ZS2 | ₹149.00 | 1,999 | −93% | In stock | 149/1999 93% | exact; **DB stale at ₹177** → fix |
| 3 | B0D1FQSZGK | ₹81.00 | 195 | −58% | In stock | 81/195 58% | exact → publish |
| 4 | B0GWMLDVJF | ₹325.61 | 699 | −53% | In stock | 326/699 53% | exact; **DB stale at ₹377** → fix |
| 5 | B0CGVF5P13 | ₹104.00 | 499 | −79% | In stock | 104/499 79% `(Min Buy 2)` | ₹104 is the **single-unit** price → publish, drop their condition |
| 6 | B0GJSQCJYN | ₹299.00 | 3,000 | −90% | In stock | 299/3000 90% | exact → publish |
| 7 | B0F4W9RPZ2 | ₹292.00 | 649 | −55% | In stock | 292/649 55% | exact → publish |
| 8 | B0GF81BZ65 | **₹160.00** | **200** | **−20%** | In stock | 280/599 53% | **card AND DB both wrong** → fix to the truth |
| 9 | B0GXVBTFJP | ₹184.15 | 599 | −69% | In stock | 184/599 69% | exact → publish |
| 10 | B0D9NXDW79 | ₹1,479.00 | **1,999** | **−26%** | In stock | 1479/**10000** 85% | price exact, **their MRP off by 5x** → publish 1479/1999 |
| 11 | B00JQ4FUW4 | ₹64.62 | **225** | −71% | In stock | 64/**195** 67% | price ≈ exact, MRP 225; **DB stale on both** → fix |
| 12 | B0C81W99ZL | ₹449.00 | 3,199 | −86% | In stock | 449/3199 86% | exact → publish |
| 13 | B0DN1PK2L2 | ₹237.69 | 999 | −76% | **"Only 1 left in stock."** | 237/999 76% | **REJECT — stock depth** |
| 14 | B0G4812L84 | ₹323.19 | 1,199 | −73% | In stock | 323/1199 73% | exact → publish |
| 15 | B0DXL1B7DB | ₹337.71 | 5,999 | −94% | In stock | 337/5999 94% | exact → publish |

Paise rounded half up (184.15→184, 323.19→323, 337.71→338, 64.62→65, 325.61→326), as in ticks n/o/p.

### The drift moved out of the price column and into the MRP column

The standing rule of thumb for this source is that **their prices lie** — the working memory says ~68% of card prices are wrong. That is not what this sweep found, and saying so is more useful than repeating the rule: **14 of 15 card prices were within ₹1 of the PDP.** One card (B0GF81BZ65) had a wrong price.

What was wrong was their **MRPs**:

- **B0D9NXDW79** claimed an MRP of **₹10,000** against a real **₹1,999**. Their card advertised 85% off a chandelier that is 26% off. The price itself was exact to the rupee, so a price-only check passes it and ships a false savings claim.
- **B00JQ4FUW4** claimed ₹195 against a real ₹225.

Tick o's lesson is the reason this matters more than the inverse: *a wrong price disappoints on click, a wrong MRP is a false savings claim in the Offer schema.* A visitor can see a wrong price the moment the Amazon tab opens. A wrong MRP is invisible to them and visible to Google. **Verify both columns; the price agreeing is not evidence the MRP does.**

### The two conditional titles, settled

- `(Min Buy 2)` on **B0CGVF5P13** — the PDP sells single units at ₹104 with no quantity tier, so the condition is their framing, not the listing's. Published at ₹104 without it.
- `[Apply 3% Coupon]` on **B0GF81BZ65** — moot. The row is wrong by far more than 3%.

### Three inflated-MRP suspects checked, two cleared

B0BP7Y3ZS2 (93%), B0DXL1B7DB (94%) and B0GJSQCJYN (90%) all looked like the usual invented list price. **Amazon's own PDP confirms all three MRPs.** The inflation there is the marketplace's, not theirs. The card that actually lied was the one nobody flagged — an 85% claim that is really 26%. Suspicion by discount size is not a filter.

### One publishable deal lost to the stock-depth rule

**B0DN1PK2L2** read `"Only 1 left in stock."` at an exact ₹237 match. Dropped, as B012AU6PWY and B0GJZY4PT9 were before it. One unit left means the first visitor buys it and everybody after lands on an out-of-stock listing with our price still in its Product schema. An exact price match does not override it.

---

## Published — #10866–#10875

| id | slug | price / mrp / pct | isSuper / isHot |
|---|---|---|---|
| 10866 | `lavie-womens-archer-textured-dome-sling-bag-b081kgv7v6` | ₹699 / 2,299 / 70% | false / false |
| 10867 | `sparkmate-by-crystal-floor-and-tile-brush-with-easy-cloth-pack-of-2-b0d1fqszgk` | ₹81 / 195 / 58% | true / true |
| 10868 | `kuber-industries-soft-cotton-hand-kitchen-towel-with-hanging-loop-b0cgvf5p13` | ₹104 / 499 / 79% | true / true |
| 10869 | `mak7-4-in-1-pet-grooming-deshedding-brush-for-dogs-and-cats-b0gjsqcjyn` | ₹299 / 3,000 / 90% | false / true |
| 10870 | `vaseline-cloud-soft-light-moisturiser-300-ml-b0f4w9rpz2` | ₹292 / 649 / 55% | false / true |
| 10871 | `halonix-25w-led-bulb-white-6500k-with-4kv-surge-protection-b0gxvbtfjp` | ₹184 / 599 / 69% | true / true |
| 10872 | `blissbells-modern-3-ring-gold-chandelier-b0d9nxdw79` | ₹1,479 / 1,999 / 26% | false / false |
| 10873 | `d-link-33w-dual-port-fast-charger-usb-c-and-usb-a-with-pd-3-0-b0c81w99zl` | ₹449 / 3,199 / 86% | false / true |
| 10874 | `amazon-brand-symbol-women-rayon-flared-shorts-with-self-fabric-belt-b0g4812l84` | ₹323 / 1,199 / 73% | false / true |
| 10875 | `dime-store-engineered-wood-floating-wall-shelves-b0dxl1b7db` | ₹338 / 5,999 / 94% | false / true |

All 10: affiliate `https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, image an `m.media-amazon.com` hiRes URL from the PDP's own `data-a-dynamic-image` (**never** `images.indiafreestuff.in`), description ~1,000 chars written from the product's own spec sheet (ceramide/barrier chemistry for the serum, 4 kV surge protection for the bulb, hang-height guidance for the chandelier, rayon care for the shorts), howTo from our 4-line template. Slugs carry the **full 10-char ASIN** per the agent doc, and a `priceHistory` row was written for each.

---

## CEO rot fixes — all 4 dups were stale

| id | slug | before | after |
|---|---|---|---|
| 6924 | `amazon-basics-undated-2026-planner-a5` | ₹177 / 1,999 | **₹149** / 1,999 / 93% |
| 8668 | `dove-pro-ceramide-repair-body-serum` | ₹377 / 699 | **₹326** / 699 / 53% |
| 10631 | `himalaya-turmeric-serum-face-cleanser-180ml-b0gf81bz65` | ₹255 / **599** / 53% | **₹160 / 200 / 20%** |
| 3536 | `wet-n-wild-color-icon-lip-liner-plumberry-b00jq4fuw4` | ₹77 / **195** / 71% | **₹65 / 225** / 71% |

**#10631 is the worst row found in four ticks.** Price, MRP and percentage all wrong at once, and wrong in the direction that flatters us: we were advertising **53% off a product that is 20% off**, off a ₹599 MRP that is really ₹200 — a 3x-inflated list price, the same shape as tick o's #3961. The corrected row lands at **exactly 20%**, which is the floor `dealIndexable()` requires when a description is under 200 chars. One point lower and telling the truth would have dropped the page out of the sitemap. Worth stating plainly: the honest number and the indexable number are not always the same number, and the honest one wins.

`discountPct` was **recomputed from price/mrp for every row**, not carried and not hand-typed — the push script derives `discountPct`, `title`, `howTo` and `affiliateUrl` in a normalisation loop, so the drift the old pre-flight check guarded against is now impossible by construction. `priceHistory` rows were written on all 4 updates (ticks n and o had to insert those by hand; the template only wrote history on create).

**The 4 dups' existing slugs were preserved.** The template's update path writes `slug: d.slug` into `data`, so feeding a dup a freshly-generated slug silently renames a live, indexed URL. Two of these four (`amazon-basics-undated-2026-planner-a5`, `dove-pro-ceramide-repair-body-serum`) predate the ASIN-suffix slug rule and would have been renamed. The push script now asserts every slug ends in its productId, with an explicit exemption for those two.

**Fourth consecutive tick where the rot came out of a dedup hit rather than a price audit.** #6063 (n), #3961 (o), and now four at once. Dedup hits are the cheapest rot detector we have — a source re-posting something we already carry is a free liveness check on our own row.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 13 urls** — 10 new slugs + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`; all 10 pass `dealIndexable()` (price + image present, age 0, every `discountPct ≥ 26`). Live probe at 11:32 IST: 2,138,126 b, up from 2,137,918 b before the push |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page. `/llms-full.txt` is the deal-bearing file (see carried flag 1) |

Prod confirms the batch landed: `/` 321,032 → **329,072 b**, `/api/deals` 55,661 → **59,046 b** across the push.

The 4 fixed slugs were **not** pinged — they are existing indexed URLs whose content changed, and the ping list is the new-slug list per the brief. Their next crawl picks up the corrected price; the sitemap `lastmod` moved.

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| prod endpoints | `/` 200 · `/offers` 200 · `/blog` 200 · `/sitemap.xml` 200 · `/feed.xml` 200 · `/api/deals` 200 · `/llms.txt` 200 | **7/7 clean**, all under 0.63 s |
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 stays a 1-post day |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,528 (was 10,518) | **+10 = this tick's creates**, exactly accounted; the 4 fixes were already LIVE |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | 1,625 | carried — **fourth identical tick** |
| null discountPct | 1,602 | carried — same |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10870` vs DB max 10875 | **not rot** — and this read finally shows the mechanism working live rather than inferred (below) |
| unpushed commits | 0 (before this tick's commit) | clean |

### The broadcast cursor, caught mid-heal

Three ticks running, the cursor sat one behind the DB max and was classified "not rot — the external cron will pick it up." This tick it reads **10870 against a max of 10875**: the external broadcast cron ran *during* this tick and swept #10866–#10870, five of the rows created minutes earlier. The remaining five go out on its next pass. That is the self-healing claim observed in motion, not asserted — and it also confirms the external cron is alive, which is a separate thing worth knowing.

### `nullMrp 1,625` — four ticks flat, and this tick is the argument for fixing it

The number has not moved across ticks n, o, p and q. Nothing in the Telegram or IFS path creates these rows, so it is a static historical backlog, not a leak — a one-time backfill, not a bleeding wound. But it also will never shrink on its own.

This tick sharpens why it matters. A **null** MRP is a missing savings signal. A **wrong** MRP is an active false claim — and today's sweep found three of those (#10631 at ₹599 vs ₹200, #3536 at ₹195 vs ₹225, and their own card claiming ₹10,000 vs ₹1,999). The only reason we found ours is that a source happened to re-post products we already carry. **1,625 rows carry no MRP at all; nobody knows how many of the ~8,900 that do carry a wrong one.** Still not authorized, still not an ingest tick's job — but a price/MRP re-verification pass over the live set would find rot at a rate this tick suggests is not small.

---

## Source flags (new this tick)

1. **The documented RSS source is dead and still named source #1.** `feeds.feedburner.com/indiafreestuff` returns HTTP 000 and `indiafreestuff.in/rss` 302s to the homepage with zero items, yet both CLAUDE.md ("their RSS (feedburner) first") and `ingest.config.json` still list it as the primary source. Flagged, not edited — their config.
2. **The documented fallback does not contain deals.** CLAUDE.md and `.claude/agents/deal-ingest.md` both name "homepage HTML fallback"; the homepage has no deal grid. The real feed is **`/pages/getdeals`**, undocumented in either place. Anyone following the docs literally gets zero deals and no error.
3. **5 of 40 cards carry a condition inside the title** (`[Apply 3% Coupon]`, `(Min Buy 2)`). Their titles are not prices. Both that reached the candidate set failed to survive the PDP.
4. **`dealhind-21` on 15/15 resolved URLs** — their tag is now a reliable fingerprint for "this link is theirs."
5. **The "68% of their prices are wrong" rule is inverted this sweep** — 14/15 prices exact, the drift in the MRP column instead. See above; the operational change is to verify both columns, not to trust either.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the one to check for deal-batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** The card price is post-clip-coupon, not wrong — and this tick, 14/15 card prices were exact. Their rule text — flagged, not edited.
3. **CLAUDE.md names `amzn.lt` as a live shortener.** DNS-dead (curl exit 6) for a fourth consecutive tick. Not hit this tick — no `amzn.lt` links in the IFS path.
4. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile** reads `loggedIn:false`. Flag only; fixing it means touching owner credentials, and the PDP read path does not depend on it — 15/15 reads succeeded logged out.
