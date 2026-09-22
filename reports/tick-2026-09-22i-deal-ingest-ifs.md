# DEAL-INGEST indiafreestuff + SITEMON / CEO audit — 2026-09-22 07:50 IST

**Result: 1 published (#10849), IndexNow HTTP 200 / 4 urls. Prod 7/7 200.** Discovery came back byte-identical to the 05:00 sweep — indiafreestuff published nothing in two hours — so the entire tick was a re-verification of the 6 residue candidates, and that re-verification is what earned the one publish.

## Discovery — zero new cards in two hours

`ingest-ifs-proper.mjs` (2600 ms `Atomics.wait` gap between their requests, well over the 2.5 s floor):

```
DONE: 43 discovered, 38 resolved to a product, wrote ./apps/api/scripts/_ifs-0922h.json
```

**`prev count 38`, `new vs prev run: 0`** — the output is byte-equivalent to the 05:00 `_ifs-0922.json`. Same 38 products, same order, same prices.

5 of 43 dropped as non-products, all correctly: Amazon Great Indian Festival event page, Flipkart BBD early-bird store, Amazon Skillmatics brand store, jiomart.com homepage, and an Amazon `/s?k=woodland` search URL. Category/sale-hub rejection is doing its job.

Dedup vs the live DB (`productId`, serial Prisma) left **38 candidates → 6 fresh** — the identical residue set the 05:00 tick already looked at and rejected.

## The judgement call: re-read the residue instead of re-asserting

Six candidates already rejected two hours ago, from a discovery file that had not changed by a single byte. The lazy read is "nothing changed, zero again". All 6 PDPs were re-read anyway, and **one had changed state** — which is the whole justification for the browser pass.

| ASIN | Product | IFS card said | PDP now | Verdict |
|---|---|---|---|---|
| `B0F4FL29LQ` | Tokyo Talkies Women Tops | ₹249 / ₹2,449 | no price block, **currently unavailable** | REJECT — dead |
| `B0GLYZ6TB3` | HEAVENGLOW 4K Android media player | ₹2,319 / ₹18,082 | ₹10,048 / ₹15,381, -35%, in stock | REJECT — quality, see below |
| `B0GJZY4PT9` | Kids Convocation Gown + Cap | ₹130 / ₹1,599 | ₹549 / ₹1,599, -66%, **"Only 1 left in stock"** | REJECT — dies within hours |
| `B0H2JQ28G8` | AMFIN 17" foil balloon bouquet, pack of 20 | ₹103 / ₹599 | **₹205 / ₹599, -66%, in stock** | **PUBLISH** |
| `B0H1M6C2GP` | Godrej aer Plug, 2× 25 ml refills | ₹179 / ₹199 | ₹179 / ₹199, **-10%** | REJECT — too thin |
| `B09P8K152F` | Wonderchef Forza 19 cm cast iron fry pan | ₹399 / ₹1,200 | no price block, **currently unavailable** | REJECT — dead |

`B0H2JQ28G8` was **out of stock at 05:00 and is back in stock now** at 66% off. That single state flip is the tick's entire output, and it is invisible to anything that trusts a two-hour-old verdict.

**Every one of the six IFS card prices was wrong** — ₹249 on a dead listing, ₹2,319 against a real ₹10,048, ₹130 against ₹549, ₹103 against ₹205, ₹399 on a dead listing. Six for six. The standing "IFS card prices lie" rule is not an exaggeration; their number was used nowhere.

## Methodology correction carried in from the 05:00 tick

The 05:00 run rejected `B0GLYZ6TB3` on **price drift** — the card said ₹2,319, the PDP said ₹10,048, "333% drift → reject". **That reasoning was wrong and is retracted.** We never publish the card price, so drift between their number and the PDP is not a defect in the product, only evidence that their card is stale. The rule is to publish at **PDP truth**, exactly as the 05:55 Telegram tick published two Flipkart microwaves at the real price after the channel quoted wrong numbers. Drift alone is never a rejection reason.

Applying the corrected rule, `B0GLYZ6TB3` was re-examined on its merits — and **still fails, on quality instead**:

- Unbranded no-name Android TV box, ₹10,048, against a claimed ₹15,381 MRP. A 2+16 GB Android box is a ₹2,000-class product; a ₹15,381 list price on one is a fabricated anchor, which makes the "-35%" meaningless.
- The title says **`AU Plug`** verbatim — an Australian-pinned power plug, sold on Amazon.in.
- Sold by a single unknown LLP (KOSLIYA ENTERPRISE LLP).

That is a junk listing at a real price, not a deal. Rejecting it on *those* grounds is defensible; rejecting it on drift was not. Recorded so the next tick does not re-derive the wrong reason.

## The per-unit-rate trap fired twice more

Both `B0H2JQ28G8` and `B0H1M6C2GP` show a second ₹ figure in the core price block that is **not the MRP**:

| ASIN | `.a-offscreen` | `.basisPrice` | `.pricePerUnit` | `.savingsPercentage` |
|---|---|---|---|---|
| `B0H2JQ28G8` | ₹205 | ₹599 | **(₹10.25 / count)** | -66% |
| `B0H1M6C2GP` | ₹179 | ₹199 | **(₹358 /100 ml)** | -10% |

`B0H1M6C2GP` is the dangerous one: ₹358 next to a ₹179 price reads exactly like a 50%-off MRP, and taking it would have published a fake 50% discount on a product that is really 10% off. `.pricePerUnit` and `.savingsPercentage` read explicitly are the only safe disambiguation — `.savingsPercentage` is authoritative and settles it in one field.

**New trap, cost one wasted `browser_evaluate`:** `innerText` on a `DOMParser`-built document returns inline `<style>`/`<script>` source. Detached documents have no layout, so `innerText` silently degrades to raw text content. `#corePriceDisplay_desktop_feature_div` read back `.ppu-align-bottom, .stp-ppu-adaptive-container { display: inline-flex; …` and `#availability` read back `P.when("A", "load").execute(…)`. Fix: clone the node, `querySelectorAll('style,script').forEach(n => n.remove())`, then read `textContent` — or skip innerText entirely and use explicit selectors, which is what the table above does.

All three in-stock PDPs were read in **one** same-origin `fetch(..., {credentials:'include'})` from the already-open `amazon.in` tab. No per-ASIN navigation — far cheaper and it is the only read Amazon does not bot-block.

## Push + freshness

`apps/api/scripts/push-ifs-0922h.mjs` — direct Prisma, `status:'LIVE'`, `priceHistory` seeded, Amazon store upsert. Three pre-flight assertions passed: title-₹-vs-price, `price < mrp`, image-host whitelist.

```
NEW 10849 amfin-17-inch-love-anniversary-foil-balloon-bouquet-pack-of-20
created=1 updated=0
```

Title, description and how-to are original copy — nothing from their card text. Image is the Amazon CDN hiRes (`m.media-amazon.com/images/I/618egWRn1LL._SL1254_.jpg`), never `images.indiafreestuff.in`. Affiliate `?tag=ashoksachdev-21` replaces their `dealhind-21`. `isSuper` true (₹205 ≤ 250).

```
node apps/api/scripts/indexnow-ping.mjs amfin-17-inch-love-anniversary-foil-balloon-bouquet-pack-of-20
DONE: IndexNow -> HTTP 200 for 4 urls
```

4 = 1 slug + 3 standing paths, as expected. `https://richdeals.in/amfin-…-pack-of-20` verified **HTTP 200 on prod** after the push. Sitemap is ISR 1800 s and `llms.txt` is `force-dynamic` — both pick it up unaided. Nothing is sitting unshipped in the DB.

## SITEMON — 7/7 200

| Endpoint | Status | Time | Size |
|---|---|---|---|
| `/` | 200 | 0.236 s | 308,496 b |
| `/offers` | 200 | 0.099 s | 60,233 b |
| `/blog` | 200 | 0.411 s | 149,515 b |
| `/sitemap.xml` | 200 | 0.347 s | 2,134,447 b |
| `/feed.xml` | 200 | 0.234 s | 44,665 b |
| `/api/deals` | 200 | 0.109 s | 43,368 b |
| `/llms.txt` | 200 | 0.348 s | 14,774 b |

Sitemap holds at 2,134,447 b — byte-identical to the 06:20 SEO audit's 9,808-`<loc>` read, so no shrinkage. `/` and `/api/deals` both grew slightly against the 06:50 read, consistent with #10849 landing.

## CEO audit — verified against the DB, post-push

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-15=3 09-16=3 09-17=3 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (past, unfixable) |
| coverless / seo-less posts | 0 / 0 of 322 | OK |
| LIVE deals | 10,502 (+1 this tick) | OK |
| LIVE null price / null image | 0 / 0 | OK — nothing to classify or delist |
| PENDING_REVIEW | 0 | OK — no backlog |
| tg-broadcast cursor | 10849 = DB max 10849 | OK — external cron already swept #10849 |
| prod endpoints | 7/7 200 | OK |
| unpushed commits | 0 before this report | OK |

Today is at 3 posts, inside the 2-3 target and under the cap of 4 — the blog rule is met, and the CONTENT-SEO tick earlier correctly skipped rather than padding to 4. No safe rot to fix inline; the audit found nothing actionable, which is itself the finding.

**Standing structural risk, twelfth consecutive tick:** `schtasks` has zero richdeals entries. Every job in `.claude/cron-schedules.md` is a session cron living in memory — when this session closes, ingest, blog publishing, broadcasts and all audits stop with no alert. Task Scheduler wiring was offered in an earlier session and never approved; nothing was changed.

**Amazon.in is still signed OUT in the `richDeals` profile** — fourth consecutive tick. Public price and stock render fine so this tick's reads are sound, but member and clip-coupon pricing silently read the public number. Not fixed: logging in touches the owner's credentials.

## Yield note

Two consecutive IFS ticks off the same 38-card discovery file produced 0 and then 1. The source is not refreshing hourly — a two-hourly cadence (`23 */2 * * *`, which is what the roster already says) is the right frequency, and the value in a repeat pass is entirely in **re-checking stock state on rejected candidates**, not in new cards. `B0H2JQ28G8` proves that is worth doing; a pure diff on the discovery file would have shipped nothing.
