# DEAL-INGEST indiafreestuff tick 2026-09-22t

**Run:** 2026-09-22 13:10–13:41 IST · richdeals.in · inline (not subagent)
**Result:** **22 rows written — 21 NEW (#10879–#10899) + 1 ROT FIX (#7713)**, IndexNow **HTTP 200 / 25 urls**, 8 verified drops, live sitemap already carries all 21 new pages (9,841 → 9,862 `<loc>`).

---

## Discovery

`apps/api/scripts/ingest-ifs-proper.mjs`, two listing pages (`/deals`, `/deals/superdeals`), `GAP = 2600 ms` between their requests (owner floor is 2,500 ms), blocking `Atomics.wait` sleep so the gap cannot be skipped by an async race. No 403 and no 429.

The feedburner RSS named in `.claude/agents/deal-ingest.md` is still dead (`code=000 size=0`). The listing-page path is the live discovery route; the agent doc's RSS-first instruction is stale and is flagged below rather than edited.

| Stage | Count |
|---|---|
| cards discovered | 44 |
| resolved to a single product | 39 |
| non-product drops at resolve time | 5 |
| verify failures excluded upstream | 2 |
| fresh Amazon ASINs after dedup vs live DB | 29 |
| verified drops | 8 |
| **written** | **22** (21 new + 1 rot fix) |

The 5 resolve-time drops were a hemlock jacket card with an empty destination, a Streax hair-colour card resolving to a `dl.flipkart.com/dl/indiafreestuff` tracking landing rather than a `/p/itm` product, the Amazon Great Indian Festival event hub, the Flipkart BBD early-bird store, and a JioMart homepage link. All five are category/sale-hub/landing shapes that CLAUDE.md rejects by rule, not judgement calls.

The 2 verify failures were a Myntra row (`60f1499cbd96`, price-drift) and an `indiafreestuff`-hosted row (`2a5a9ad242a2`) that has no `ld+json` at all — it is a PVR INOX Blockbuster Tuesday movie-ticket offer, which is not a product and has no Product schema to read. Both were excluded before the dedup stage.

---

## Their card prices lie — again, and by a lot

Every price, MRP, percentage and image filename in this batch was read off the Amazon PDP in the logged-in tab. Not one came from an indiafreestuff card. This tick produced the widest card-vs-PDP spread yet recorded on this source.

| ASIN | Their card | Verified PDP | Delta |
|---|---|---|---|
| B0DFQFT8VQ | ₹352 | **₹946** | +₹594 |
| B0FPF9N2PJ | ₹7,999 | **₹10,999** | +₹3,000 |
| B0BZSTHKW7 | ₹239 | **₹399** | +₹160 |
| B0F6BNVW2F | ₹5,300 | **₹6,047** | +₹747 |
| B0H79YBXPN | ₹296 | **₹389** | +₹93 |
| B0GVJ72BJN | ₹219 | **₹298** | +₹79 |
| B0BSWJ7GD9 | ₹1,873 | **₹2,195** | +₹322 |
| B0DPQXGYMP | ₹410 | **₹419** | +₹9 |
| B0H29RXCD5 | ₹168 | **₹176** | +₹8 |
| B0G4D9XCTK | ₹1,610 | ₹1,609 | −₹1 |

Ten of the 22 published rows disagreed with the source card, nine of them upward. Had the cards been trusted, nine deal pages would have shipped with a Product schema advertising a price Amazon does not charge — the single worst failure mode this site has, because it is invisible on our own pages and only the buyer discovers it.

Note what this does to CLAUDE.md's "reject on drift >₹1" rule: applied literally to indiafreestuff it would have rejected 9 of 10 perfectly good deals. Their card price is largely post-clip-coupon, so the drift is expected, not a defect signal. The rule is right for DesiDime and Telegram and wrong for this source. Flagged, not edited — it is the owner's rule text.

---

## PDP verification — the read path

`fetch(url, {credentials:'include'})` + `DOMParser`, same-origin from the open `amazon.in` tab, every ASIN under the same `?th=1&psc=1` the affiliate URL and the image use, so price, MRP, availability and image all describe one variant.

Price truth is the **full** `#centerCol` innerText regexed, never a head slice and never `.a-offscreen`:

```
price /₹([\d,]+)(?:\s*with|\s*₹|\s*M\.R\.P|$)/   fallback /₹([\d,]+)/
mrp   /M\.R\.P\.?:?\s*₹([\d,]+)/
```

`#availability` is matched on leading substrings only — it carries appended JSON noise and an equality test against `"In stock"` fails on a perfectly good listing.

### Three read-path facts worth recording

**`#feature-bullets` can legitimately be empty on a real listing.** Four of the 22 published ASINs (`B0931LDLPT`, `B0G4D9XCTK`, `B0F79XLMTK`, `B0BBFJ54J1`) returned an empty bullet list *and* an empty specification table while being in stock, correctly priced and well discounted. Their descriptions are written from `#productTitle` alone and say so in prose on the page — the alternative is inventing specifications, which is worse than admitting the source is thin.

**The spec table can render as page script.** On `B0GKH31VTF`, `B0D8HCKD5D` and `B0BZSTHKW7`, `#productOverview_feature_div` row text came back as `(function(f) {var _np=(window.P._namespace("DetailPageProductOverviewTemplatesJava"))…`. That is Amazon's own template bootstrap leaking into the text node, not product data. Those three rows fall back to the feature bullets, and the pages say the spec table was unreadable rather than paraphrasing JavaScript.

**`#availability` reading `P.when("A", "load").ex` is the unresolved-variant signature.** Three ASINs (`B07XKXFGX2`, `B0GR6RSJ4M`, `B0F4865BRP` — a Casio watch and two apparel listings) returned `price: null, mrp: null` with that string in the availability slot. That is an apparel/variant PDP that has not resolved to a buyable child. It is not a transient read failure, so it gets dropped, not retried.

---

## The 22 rows written

All Amazon, `storeId 1`, `status LIVE`, affiliate `https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, image on `m.media-amazon.com`, `priceHistory` row written for every one.

| # | ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|---|
| 10879 | B0H79YBXPN | ATTRO Prime Linear deluxe bottle, set of 2 | ₹389 | ₹698 | 44% |
| 10880 | B0H29RXCD5 | PEARLPET Aqualine steel bottle 700 ml | ₹176 | ₹355 | 50% |
| 10881 | B0CRVLVWPJ | PunnkFunnk Q18 kids calling smart watch | ₹1,349 | ₹4,999 | 73% |
| 10882 | B084MJBGRX | Prettykrafts saree cover, set of 9 | ₹373 | ₹699 | 47% |
| 10883 | B08WC67B4V | HEAD Igniton Pro 3R badminton kitbag | ₹631 | ₹1,100 | 43% |
| 10884 | B00OCBT7KW | Intex Deluxe single-high twin airbed | ₹1,280 | ₹1,999 | 36% |
| 10885 | B0CTMRPJTW | TEXUM TVC-5D 800 W handheld vacuum | ₹1,499 | ₹6,999 | 79% |
| 10886 | B0DPQXGYMP | ANKRI wireless bottle lamp | ₹419 | ₹1,999 | 79% |
| 10887 | B0GKH31VTF | Kadence K111-V2 dynamic microphone | ₹260 | ₹799 | 67% |
| 10888 | B0F6BNVW2F | Havells CERA BLDC 1200 mm underlight fan | ₹6,047 | ₹8,900 | 32% |
| 10889 | B0931LDLPT | BATA Velancia women's slipper | ₹162 | ₹649 | 75% |
| 10890 | B0DFQFT8VQ | Sulfar custom-fit car body cover | ₹946 | ₹2,950 | 68% |
| 10891 | B0FC2M42JY | 45 W USB-C to USB-C cable, 1 m | ₹287 | ₹1,299 | 78% |
| 10892 | B0D8HCKD5D | JGD 4-in-1 USB-C hub | ₹199 | ₹699 | 72% |
| 10893 | B0BZSTHKW7 | Ayurvedic pain-relief hydrogel 75 g × 2 | ₹399 | ₹530 | 25% |
| 10894 | B0G4D9XCTK | F Gear Tavero 15 L laptop backpack | ₹1,609 | ₹5,998 | 73% |
| 10895 | B0GVJ72BJN | USB-C to 3.5 mm adapter with DAC | ₹298 | ₹2,999 | 90% |
| 10896 | B0BSWJ7GD9 | Havells Ambrose 1200 mm ceiling fan | ₹2,195 | ₹3,675 | 40% |
| 10897 | B0FPF9N2PJ | Samsung Galaxy Buds3 FE with ANC | ₹10,999 | ₹14,999 | 27% |
| 10898 | B0F79XLMTK | STRIDERS Cocomelon kids backpack | ₹380 | ₹1,199 | 68% |
| 10899 | B0BBFJ54J1 | Joker & Witch Halo analogue watch | ₹987 | ₹6,499 | 85% |
| **7713** | **B0GSW5HKNK** | **KAMILIANT Selva cabin trolley (rot fix)** | **₹1,599** | **₹8,500** | **81%** |

Descriptions are 2–4 sentence originals, ~1,000–1,100 characters, written from the PDP's own bullets or spec table. No indiafreestuff text, no indiafreestuff images.

Three content decisions worth naming because they are the kind a careless pass gets wrong:

- **B0H79YBXPN** — the listing's own data says "1.5 Milliliters" for a 1.5 litre bottle. That is the listing being wrong, and repeating it would put an absurd figure in our schema. The page says 1.5 litres.
- **B0CTMRPJTW** — the spec table claims a HEPA filter while the feature bullets say washable cloth. The bullets describe what ships, so the page follows the bullets and states the contradiction rather than picking the flattering number.
- **B00OCBT7KW** — the page opens by saying this airbed listing does not include a pump, because that is the complaint every buyer of a pumpless airbed writes afterwards. **B0CRVLVWPJ** likewise opens with the Jio/BSNL SIM incompatibility on the kids' watch.

### The rot fix — #7713

| Field | Stored (since 2026-08-28) | PDP, this tick |
|---|---|---|
| price | ₹1,699 | **₹1,599** |
| mrp | **null** | **₹8,500** |
| discountPct | **null** | **81%** |
| image | `51q64YYqewL._SL1000_.jpg` | `51q64YYqewL._SX679_.jpg` |
| title | `… at ₹1699 – Amazon` | rebuilt at ₹1,599 |

The row had been live for 25 days advertising a price ₹100 above the real one, with no MRP and no discount percentage — so no savings claim, and a failing `dealIndexable()` discount test that left the page leaning entirely on its description length to stay in the sitemap. The indiafreestuff card independently agreed on ₹1,599, which is the rare case where their number and the PDP match.

**Its slug is reused verbatim.** `kamiliant-selva-cabin-trolley-bag` predates the full-productId slug rule and has been indexed since 2026-08-28. Renaming a live indexed URL to satisfy a naming convention trades real search history for tidiness. The script carries a named exemption for exactly this row:

```js
const LEGACY_SLUGS = new Set(['kamiliant-selva-cabin-trolley-bag']);
```

That replaced tick r's inline `/^zebronics-type-c-wired-earphones/` regex — a per-row regex in a pre-flight check is a landmine for the next tick, a named set is not.

---

## Pre-flight — 6 checks, all 22 rows

`apps/api/scripts/push-ifs-0922t.mjs` refuses to write anything unless every row passes:

1. the hand-written `₹` in the title parses to exactly the numeric `price` (a mismatch ships visible copy contradicting the page's own Product schema);
2. `price < mrp`;
3. image host matches `m.media-amazon.com` / `rukmini*.flixcart.com` / `img.tatacliq.com`;
4. indexable — `discountPct >= 20` **or** `description.length >= 200`;
5. slug ends in the full lowercased productId, unless it is in `LEGACY_SLUGS`;
6. no duplicate slug or productId inside the batch.

Printed `pre-flight OK, 22 rows` and then wrote. Worth noting the script **failed to even parse** on the first run — an unescaped apostrophe in `the listing's own spec table` inside a single-quoted description string. The failure mode is the good one: a syntax error before the Prisma client is constructed writes nothing and leaves no half-batch to reconcile.

Upserts run serially. Managed Postgres has ~22 connection slots and a `Promise.all` over this batch returns `P2037`.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 25 urls** — 22 slugs + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | **9,841 → 9,862 `<loc>` = +21, all 21 new rows already live** |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page, HTTP 200 |

The sitemap line is the one that settles a question this report series has been hedging on. `apps/web/src/app/sitemap.ts` is ISR `revalidate = 1800`, so the documented worst case is 30 minutes. The batch was written at ~13:2x IST and the live sitemap was read at 13:40 IST carrying exactly +21 `<loc>` — the 21 new rows, with the rot-fix row already present and so not adding one. Every new row passes `dealIndexable()` on discount alone (lowest is 25%). Observed latency is minutes, not the 1800 s ceiling, and this is now the second independent observation of that.

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | **10,552** (was 10,531) | +21 = this tick's new rows, fully accounted |
| `/api/deals` total | **10,552** | matches the DB exactly |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | **1,623** (was 1,624) | −1 = the #7713 rot fix |
| null discountPct | **1,600** (was 1,601) | −1 = same row |
| PENDING_REVIEW backlog | 0 | clean — auto-approve honoured, nothing parked |
| tg-broadcast cursor | `lastId 10878` vs DB max **10899** | 21-row gap, created by this tick seconds ago — the external cron's normal window |
| unpushed commits | 0 before this tick's commit | clean |
| prod endpoints | 7/7 **200** (`/` 0.28 s, `/offers` 1.13 s, `/blog` 0.61 s, `/sitemap.xml` 0.32 s, `/feed.xml` 0.14 s, `/api/deals` 0.18 s, `/llms.txt` 0.38 s) | all up |

Two lines deserve reading together. `nullMrp` and `nullPct` each fell by exactly 1, and `deals LIVE` rose by exactly 21 — which is the proof that the 21 new rows all shipped with both fields populated. The ingest path is not feeding the backlog; the backlog is historical. It has now dropped by one row per tick for three consecutive ticks (1,625 → 1,624 → 1,623), each time because a tick happened to re-verify one old row by hand. At that rate the backlog outlives the site. It remains a one-time bulk backfill, still unauthorized, and still not an ingest tick's job to run.

The cursor gap is **21 rows and about three minutes old**. Previous ticks spent paragraphs defending a one-row gap as self-healing; six independent confirmations later that is settled, and a gap this size seconds after a 21-row batch is the external broadcast cron's ordinary window, not rot. Not flagged.

`/offers` at 1.13 s is the slowest prod response in recent ticks (it read 0.14 s three hours ago). Still a 200, still well inside any reasonable budget, and one sample is not a trend — recorded, not flagged.

---

## Carried flags (unchanged, owner's call)

1. **`.claude/agents/deal-ingest.md` still names the feedburner RSS first.** `https://feeds.feedburner.com/indiafreestuff` returns `code=000 size=0` and has for every tick this month. The listing-page path is the working one. Their doc — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is wrong for indiafreestuff.** Their card price is post-clip-coupon; a literal reading would have rejected 9 of the 10 drifting rows above, all of which are good deals at their real PDP price. Their rule text — flagged, not edited.
3. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the deal-bearing surface to check after a batch. Their rule text — flagged, not edited.
4. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile** reads logged-out. Flag only; fixing it means touching owner credentials, and the PDP read path does not depend on it — all 29 reads this tick succeeded.
