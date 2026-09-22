# DEAL-INGEST indiafreestuff tick 2026-09-22w

**Run:** 2026-09-22 ~15:35 IST, inline (not a subagent) per `.claude/agents/deal-ingest.md` + `CLAUDE.md`.
**Result:** 23 candidates resolved → 17 published (16 new + 1 price update), 6 rejected. IndexNow **HTTP 200 for 20 urls**. Live deal count 10,555 → 10,571. First multi-store batch on this path: Amazon + Myntra + Flipkart in one push.

## Discovery

RSS (feedburner) is still dead — it has been for several ticks and is not worth re-testing. Homepage alone is thin (~10 slugs), so discovery ran the two list pages already wired into `ingest-ifs-proper.mjs:13`:

- `https://indiafreestuff.in/deals` → 25 slugs
- `https://indiafreestuff.in/deals/superdeals` → 36 slugs

De-duplicated and filtered of non-product prefixes (`category|stores|forum|telegrams|coupons|freebies|contests|blog|…`), that left **23 product cards**. Every request to their domain was spaced ≥2.5 s (`_ifsres0922w.sh`); no 403 and no 429, so no back-off was needed.

Each card's Buy Now anchor is `href="https://www.indiafreestuff.in/?rto=<base64>"` behind `class="btn btn-primery buy_now ripplelink"`. All 23 were resolved with `curl -sL -o /dev/null -w '%{url_effective}'` into `_ifsres0922w.txt`. Four Flipkart rows stop at `dl.flipkart.com` (the hop past it is JavaScript), so those were opened in the browser with the source's tracking params (`affid=adminpais`, `affExtParam1/2`, `pwsvid`) stripped first — that both reaches the product and avoids attributing a click to indiafreestuff.

**Their card prices lied again, as usual.** Two clear cases this tick: the Cara Mia soap card said ₹106 (real ₹97) and the boAt card said ₹2,499 (real ₹4,199). Every price below was read off the merchant's own page, never off their listing.

## Published — 17 rows

Price truth per store: Amazon from the full `#centerCol` innerText in the logged-in tab; Flipkart and Myntra from `ld+json` `offers.price` with `availability = InStock`. All 17 verified within ₹1 and in stock at read time.

| # | Store | Product | ₹ | MRP | % | Row |
|---|---|---|---|---|---|---|
| 1 | Amazon | Ajanta 4067 silent-sweep wall clock, 12.2 in | 720 | 1,290 | 44 | NEW 10903 |
| 2 | Amazon | AW! car cup-holder expander, adjustable base | 565 | 1,499 | 62 | NEW 10904 |
| 3 | Amazon | Crompton Trio downlighter panel, pack of 2 | 1,292 | 2,800 | 54 | NEW 10905 |
| 4 | Amazon | Floral door curtain, 8 ft, grey | 204 | 1,999 | 90 | NEW 10906 |
| 5 | Amazon | Galaxy embossed-tree window curtains, 6 ft, pack of 2 | 425 | 1,999 | 79 | NEW 10907 |
| 6 | Amazon | JustLatest solar scalp massager | 39 | 199 | 80 | NEW 10908 |
| 7 | Amazon | Panasonic 20 m LED rope light, IP65 | 1,688 | 4,500 | 62 | NEW 10909 |
| 8 | Amazon | Philips 18 W reflector COB spot light | 841 | 1,630 | 48 | NEW 10910 |
| 9 | Amazon | PURE HOME + LIVING monkey showpiece | 728 | 1,299 | 44 | NEW 10911 |
| 10 | Amazon | Uttam Mukhwas freshness combo ×3 | 321 | 387 | 17 | NEW 10912 |
| 11 | Amazon | Cockatoo hand-grip strengthener, 10–40 kg | 99 | 530 | 81 | NEW 10913 |
| 12 | Amazon | Wipro Nowa 6 A bell push, pack of 10 | 355 | 2,150 | 83 | **UPD 10333** (was ₹395 / 82 %) |
| 13 | Myntra | Priority unisex 360° hard cabin trolley, 48.38 L | 999 | 2,899 | 66 | NEW 10914 |
| 14 | Myntra | Aqueria 3-in-1 brightening body wash, 875 ml | 299 | 1,499 | 80 | NEW 10915 |
| 15 | Flipkart | Cara Mia paraben-free glycerin soap, 4 × 125 g | 97 | 265 | 63 | NEW 10916 |
| 16 | Flipkart | Perfect Homes 244 TC double fitted bedsheet + 2 covers | 292 | 1,999 | 85 | NEW 10917 |
| 17 | Flipkart | Pigeon Radiance rechargeable LED torch, 1800 mAh | 550 | 2,999 | 82 | NEW 10918 |

Row 10 is the only one below the 20 % indexability floor, so its description was written past 200 characters to satisfy `dealIndexable()` in `apps/web/src/lib/site.ts:131` on the description arm instead.

Row 12 already existed as #10333 with an indexed slug that predates the current slug rule (`…-b0bnnk`, truncated productId). The update path in the push script forces `slug: existing.slug`, so the live URL was preserved rather than rewritten — a rename would have orphaned an indexed page for a ₹40 price move.

## Affiliate swap

Per the matrix in `ingest.config.json` / `CLAUDE.md`:

- **Amazon** — `https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. Their `dealhind-21` tag stripped.
- **Flipkart** — `https://www.flipkart.com/<name-slug>/p/itme?pid=<PID>&affid=djhackraj`. Their `affid=adminpais`, `affExtParam1`, `affExtParam2` and `pwsvid` stripped.
- **Myntra** — Cuelinks: `https://linksredirect.com/?cid=527&source=linkkit&url=<encoded clean /buy url>`.

A pre-flight assert rejects the whole batch if `dealhind-21`, `adminpais`, `affExtParam`, `pwsvid` or `indiafreestuff` survives into any `affiliateUrl`.

### Flipkart URL shape — settled

`CLAUDE.md` says the Flipkart path "must be `/p/itm…`", and the real `/p/itm<hash>` segment is **not recoverable** for these three pids. Four routes were tried and all four are dead ends:

| Route | Outcome |
|---|---|
| `https://www.flipkart.com/p/itm?pid=<PID>` | **HTTP 404**, 1,780 bytes, homepage title |
| `https://www.flipkart.com/search?q=<PID>` | HTTP 200, **zero** hrefs containing the pid |
| `search?q=<full product name>` | Target pid never appears in results |
| Regex the product page for its own `/p/itm<hash>?pid=<same pid>` | **Zero hits** — the 7–11 `itm` links present are recommended products with other pids |

`link[rel=canonical]` is a trap here: it echoes whatever cosmetic path was fetched, never the real itm URL.

What settled it is that **the path segment is cosmetic — Flipkart resolves by `pid` alone**. Both `…/<any-slug>/p/itme?pid=<PID>` and `…/p/itm?pid=<PID>` returned HTTP 200 carrying the *correct* product's `ld+json` for all three pids (₹97 / ₹292 / ₹550, all InStock). And the shape is already shipping in production: `_fkshape0922w.cjs` reports **22 of 200 live Flipkart rows** on the hash-less `/product/p/itme?pid=…&affid=djhackraj` form (#10783, #10782, #10781), sitting alongside real-hash rows. So the published shape is the hash-less one with our own name slug, which is at least more descriptive than the `/product/` placeholder already in prod.

## Rejected — 6

| Product | Store | Why |
|---|---|---|
| Classmate Pulse notebook `B0H6F67WKV` | Amazon | No M.R.P. line and no savings badge → no provable discount |
| Herbal handmade soaps `B0D5WD73X8` | Amazon | Unbuyable signature: empty `#centerCol` price window, no cart button, no buy button, no delivery block |
| OREVA wall clock `B09B3ZP8KL` | Amazon | Same unbuyable signature |
| STRIDERS BTS gift box `B0FZKFCFYB` | Amazon | In stock at −76 %, but the title and the bullets describe different products — rejected on listing quality, not price |
| boAt Stone Arc Pro Plus `ACCHDYD8S39BSRDC` | Flipkart | Card said ₹2,499, real price ₹4,199 — ₹1,700 drift |
| Riya cotton kurti | Snapdeal | `?rto=` resolves to an admitad-wrapped **brand listing**, not a single product |

## Content

Every title, description and how-to line is original. Descriptions run ~1,000–1,400 characters, written off the merchant's own spec block — `#detailBullets_feature_div` / `#feature-bullets` on Amazon, the spec table on Flipkart and Myntra — never off indiafreestuff's copy. Images are marketplace CDN only: `m.media-amazon.com`, `rukmini1.flixcart.com`, `assets.myntassets.com`. A pre-flight assert throws on any image URL containing `indiafreestuff`.

`assets.myntassets.com` had to be **added to the push script's `HOSTS` allowlist** — it was missing, because no Myntra row had ever gone through this path before. Worth knowing before the next non-Amazon store shows up.

Each row carries a `confirm` line in `howTo` naming the specific contradiction found on its own listing, so a buyer checks it before paying:

- door curtain — a bullet says "set of 2" while the title says one panel
- scalp massager — ₹39 item carries ₹59 delivery
- Philips spot — a bullet says 12 W, the title and specs say 18 W
- PURE HOME showpiece — bullets say "gorilla", the title says monkey
- Crompton panel — specs are per-pack, not per-unit
- Cockatoo grip — the box holds 2 grips
- bedsheet — the image filename says "brown barfi", the title says Geometric
- Myntra trolley — cabin weight limits vary by airline
- Aqueria body wash — patch-test note for the actives
- Pigeon torch — top-up charging behaviour

## Freshness — the three mandatory checks

1. **IndexNow** — `node apps/api/scripts/indexnow-ping.mjs <17 slugs>` → **HTTP 200 for 20 urls**. 17 deal slugs plus the three paths the script always prepends (`/`, `/offers`, `/sitemap.xml`) = 20. No 422, so the Bing GET fallback was not needed.
2. **sitemap.xml** — ISR `revalidate = 1800` in `apps/web/src/app/sitemap.ts`; the batch lands on the next regeneration, worst case 30 min. No new static route was added, so `staticRoutes` needed no edit.
3. **llms.txt** — `force-dynamic`, rebuilt per request off `getDeals()`; carries the batch already. No new hub page, so no edit to `llms.txt/route.ts`.

Three new pages spot-checked live on prod: soap `200`, Myntra trolley `200`, Ajanta clock `200`.

## CEO audit

Run against the DB, not against assumption.

| Check | Reading | Verdict |
|---|---|---|
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt` → 7/7 HTTP 200 | OK |
| Live deals | 10,571 (was 10,555, +16) | OK |
| PENDING_REVIEW | 0 | OK |
| Deals with null price | 0 | OK |
| Deals with null image | 0 | OK |
| Coverless posts | 0 | OK |
| SEO-less posts | 0 | OK |
| tg-broadcast cursor | `lastId: 10902` vs DB max **10918** | Benign — the external cron advances it; drift self-heals, never re-flag |
| Unpushed commits | 0 before this tick's commit | OK |
| Posts per day (IST) | 09-19 = 3, 09-20 = 2, **09-21 = 1**, 09-22 = 3 | **FLAG** |
| Null MRP / null pct | 1,623 / 1,600 rows | **FLAG, unapproved** |

**Flag 1 — 2026-09-21 published 1 post against a floor of 2.** Cause is structural, not content: the CONTENT-SEO blog job is a *session* cron (`9 */6 * * *`), so every firing inside a dead session is simply lost. 09-22 is back to 3, so the rule is being met again, but the same gap will recur on any day the session is down. The durable fix is a Task Scheduler entry rather than a session cron — **not authorised, so not done.**

**Flag 2 — 1,623 rows with null `mrp` and 1,600 with null `discountPct`.** These are legacy rows; a bulk backfill has been offered and never approved, so they stay flagged. No new row in this batch adds to the count — all 17 carry both fields.

Nothing else was rotting, so nothing was fixed inline this tick.

## Files

- `apps/api/scripts/push-ifs-0922w.mjs` — the push, with the full investigation in its header comment
- `apps/api/_fkshape0922w.cjs` — the Flipkart URL-shape check against prod
- `apps/api/_dd0922w.cjs` — dedup probe (21 fresh, 1 hit)
- `apps/api/_ifsres0922w.txt` — the 23 resolved candidates
- `apps/api/_ceo0922v.cjs` — the CEO audit query
