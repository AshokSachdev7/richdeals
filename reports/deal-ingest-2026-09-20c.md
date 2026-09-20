# DEAL-INGEST indiafreestuff tick — 2026-09-20c (IST)

**9 deals published LIVE**, ids **10736–10744**. IndexNow **HTTP 200 for 12 urls**.
DB read-back verified 9/9 — every row LIVE, prices/mrp/discountPct byte-matching the payload.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (listing HTML) | 54 |
| Candidates after junk/category filter | 51 |
| Fresh after DB dedup | 31 |
| Passed live price verification | 10 |
| Published | **9** |

20 of 51 were already LIVE — **nine of them ids 10720–10728, pushed by today's own earlier
batches**. Dedup is carrying real weight, not decoration.

The tenth verified pass was dropped deliberately (Geonix white variant, below).

## Published

| Id | ASIN | Price | MRP | Off | Desc | Product |
|---|---|---|---|---|---|---|
| 10736 | B0GYG31PP3 | ₹4,858 | ₹9,999 | 51% | 502 | Geonix Hydra gaming cabinet, 6 ARGB fans (Black) |
| 10737 | B0GXBGF4ZN | ₹905 | ₹2,999 | 70% | 438 | Intex Strong Neo 10000mAh 22.5W power bank |
| 10738 | B0752W6XBB | ₹426 | ₹2,400 | 82% | 432 | Kobo WTG-13 leather gym gloves (L) |
| 10739 | B0GW2KHFD2 | ₹163 | ₹309 | 47% | 385 | Nayasa Quench Batman 600ml insulated bottle |
| 10740 | B0CW22VM3B | ₹772 | ₹2,000 | 61% | 396 | Crompton Star Lord JBNXT 5W downlighter, pack of 8 |
| 10741 | B0H7SSWS99 | ₹698 | ₹3,499 | 80% | 388 | Amazon Symbol men's cotton-blend kurta |
| 10742 | B09FDWSH5N | ₹125 | ₹399 | 69% | 445 | Boltz reflective no-pull dog harness |
| 10743 | B0F8QY413G | ₹1,749 | ₹4,400 | 60% | 466 | Orient Razor Plus 100W IP65 flood light |
| 10744 | B0F4KJTPHQ | ₹4,576 | ₹10,990 | 58% | 494 | Benelave by Hindware quartz sink 24x18 |

Every row clears **both** arms of `dealIndexable()` — discount ≥20% (47–82%) *and* description
≥200 chars (385–502) — so none of them depends on a single arm holding.

Push: `{"count":9}`, HTTP **201**, every `results[]` entry `created:true, ok:true`, zero failures.
The bulk handler has a per-row try/catch, so `count` alone is not proof — the rows were read
individually.

IndexNow: `DONE: IndexNow -> HTTP 200 for 12 urls`. Twelve, not nine: the script appends hub and
derived paths to the slug list.

## The headline finding: indiafreestuff card prices are unreliable

**21 of 31 fresh candidates failed verification — a 68% reject rate.** Not rounding drift. Several
are wrong by thousands:

| Item | Card says | Live PDP | Gap |
|---|---|---|---|
| BANZER kitchen faucet | ₹1,734 | ₹4,499 | ₹2,765 |
| Sakura goldfish food | ₹506 | ₹2,580 | ₹2,074 |

Publishing off the card price would have put pages on richdeals.in that are wrong the hour they ship.
**Every ASIN must be read off the PDP. The card price is a discovery hint, nothing more.**

### It is systematic, not random: the whole CELLO cluster is stale

Eight CELLO items came through this sweep. **All eight drifted, and all eight drifted upward:**

| Item | Card | Live |
|---|---|---|
| Kidzbee | ₹265 | ₹379 |
| Glassy LB | ₹356 | ₹509 |
| Stacklock | ₹384 | ₹549 |
| Duet | ₹769 | ₹1,099 |
| Steelox 5pc | ₹475 | ₹679 |
| Steelox 4pc | ₹408 | ₹584 |
| Feast Princess | ₹391 | ₹559 |
| H2O 6pc | ₹641 | ₹917 |

Eight for eight in one direction is a closed promo the source never refreshed, not noise. The one
non-CELLO item in that same batch (Hindware sink) verified clean and is published as 10744. A
brand-cluster rejection is cheap to spot once you look at direction rather than magnitude.

## Other rejections worth recording

### Coupon-inclusive price guard fired — Polycab `B0H9Y8SVKW`

Live `.priceToPay` **₹3,799** with an `Apply ₹400 coupon` badge. Card claims ₹3,399 — exactly
3799 − 400. The claimed figure is a post-coupon price dressed as a buybox price. Rejected. This is
the guard working; without it the page would advertise a price no one sees at checkout.

### ASIN-variant collapse — `B07C5529C2` / `B07C58GMVW`

Listed as "Pack of 5" and "Pack of 10". **Both resolve to one PDP** titled "Lockout Multi Device
HASP AK-HN-72A, (Pack of 2)", identical ₹324/₹514, identical image core `41zN0youcUL`. Two source
rows, one product, and neither title matches what the PDP actually sells. Both rejected.

### Geonix white — verified clean, dropped on near-duplicate grounds

`B0GYG31PP3` (Black) and `B0GYG93F9B` (case, White) are **colour variants**, not a duplicate row.
The earlier read that called their titles identical came from titles truncated at 70 chars —
**that claim is withdrawn.** The drop stands on different evidence: byte-identical feature bullets
and identical price. Two pages with the same body text and the same number is thin duplicate
content (`dup-slug-thin-content.md`). Black shipped, White did not.

### Thin-bullet products handled, not skipped

`B0H7SSWS99` (Symbol kurta) returned **zero** feature bullets; `B0CW22VM3B` (Crompton) exactly one.
Descriptions were written from `#productTitle` plus the verified figures and landed at 388 and 396
chars. Both also clear the discount arm at −80% and −61%, so neither is carried by prose alone.

## Defects found in the verification path

- **`#availability` can return inline script text.** `B0C1NTYVNV` gave
  `P.when("A", "load").ex` instead of a stock string. `#add-to-cart-button` / `#outOfStock` are the
  authoritative stock signals; `#availability` is advisory only.
- **`#landingImage` src is a thumbnail.** Extract the core with `/\/images\/I\/([^.]+)\./` and
  rebuild `_SL1500_`. Verified end-to-end: all nine stored images are `m.media-amazon.com` URLs, and
  the `+` inside core `51p7JBp+svL` survived JSON → `--data-binary` curl → Prisma intact
  (confirmed by read-back, and the rebuilt URL returns HTTP 200 / 62 KB).
- **feedburner RSS is dead** — `rss 000 0`. CLAUDE.md still says "their RSS (feedburner) first".
  Listing HTML is the only working discovery path. Apex also 301s to `www.`.

## CEO audit

| Arm | Result |
|---|---|
| Affiliate swap | asserted in the builder — `tag=ashoksachdev-21` required on every row or it throws. 9/9 passed |
| Description floor | asserted ≥200 chars in the builder, not eyeballed |
| Source text | all nine descriptions written fresh; no indiafreestuff copy, no `images.indiafreestuff.in` |
| Rate limit | `GAP = 2600` ms against the source; 700 ms between Amazon PDP fetches; **no 403, no 429** |
| Amazon fetches | 41 ASIN reads across four batches, **all HTTP 200** |
| Push status | `status:"live"` lowercase — read back LIVE, none fell to PENDING_REVIEW |
| IndexNow | **HTTP 200**, run immediately after the push |
| Scratch hygiene (#11) | clear — `apps/api/_ck0920c.mjs` created and `rm -f`'d in the same Bash call |
| PENDING_REVIEW backlog | **0** |

### Rot flagged

- **indiafreestuff card prices unreliable (new, and the biggest one).** 21/31 wrong on a single
  sweep, whole brand clusters stale. Not a bug in our code — a property of the source. It means the
  verification step is load-bearing and can never be shortcut for throughput.
- **`#availability` inline-script defect** — new, above.
- **ASIN-variant collapse** — new. Two source ids, one PDP, both titles wrong.
- **feedburner RSS dead while CLAUDE.md says RSS-first** — doc rot.
- Carried: `ingest.config.json` `requestDelayMs: 1500` is inert (script hardcodes 2600);
  two same-named `ifs-candidates.json`; `eKools<U+FFFD>` mojibake on `B0949K84Q8`; ~200 scratch
  leftovers in `apps/api/scripts/` (owner decision #5).
- Carried deal-side: **3455** LIVE at ₹519 with null mrp **and** null discountPct — it evades the
  standing audit arm precisely because that arm needs both price and mrp present; **1536** slug says
  ₹299, row says ₹499. Deal 7637 still an EXPIRED candidate.
- The reject cache (owner decision #7) would have paid for itself again this tick: the CELLO block
  will come back next sweep and be re-verified from scratch.
