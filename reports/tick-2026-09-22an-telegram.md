# TELEGRAM-DEAL-MONITOR — tick `2026-09-22an`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is
filtered out inside the page, before anything reaches this session.

**Result: 1 new page + 2 in-place refreshes. IndexNow 6/6 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 24 |
| rows belonging to the 13 tracked groups | 12 of 13 present (NonStopDeals absent) |
| shortlinks worth resolving | 5 |
| single-product candidates after the skip rules | 4 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 1 new + 2 dedup hits worth refreshing |
| survived PDP / ld+json price and stock verification | 4 of 4 — 1 new page, 2 refreshes, 1 no-op |

## Published

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 10946 | Amazon | B0DJQV7JDB | ₹848 | 3,499 | 76% | `story-home-king-size-bedsheet-with-2-pillow-covers-210-tc-floral-off-white-b0djqv7jdb` |

Story@Home king-size bedsheet, 270 × 250 cm flat sheet plus two 46 × 69 cm pillow covers,
210 TC, 917 g, model CU4005, Elite Decor Pvt Ltd Vadodara. Read in the logged-in Amazon tab
(curl is bot-blocked): `₹848.00`, `M.R.P. ₹3,499.00`, `-76%`, `In stock`,
`91Ox5MTUOzL._SL1500_.jpg`, 5 bullets, 28 spec rows, 4.1 from 3,645, #1 in Flat Bed Sheets.

**The channel shouted ₹806 and the PDP says ₹848 — and both are true.** The PDP's own coupon
selector returns `Coupon: Apply 5% coupon Terms | Shop items`, and 848 × 0.95 = 805.6. This is
the third price category the channels produce: not right, not wrong, but **post-coupon**. The
stored price is the listed ₹848; the 5% clip lives in `howTo` step 2, which says plainly where
₹806 comes from and that a clip coupon is a tick box the seller can withdraw at any time.
Putting it in `price` would put a number in Product JSON-LD that the page does not charge.

**The listing also contradicts itself on fabric.** The bullets say `Material : Cloud Cotton`
while the manufacturer's own spec table says `Fabric Type: Microfiber` and
`Enclosure Material: Microfiber`. The description says that outright and tells the reader to
treat it as microfiber — the same call as the `al` padlock, where the merchant title was the
thing that misled. Care is cold machine wash, no bleach, no high heat; it is a flat sheet, not
fitted, with no elastic skirt.

## Refreshed in place

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 8952 | Flipkart | PSLHPCVGVGSGBYHN | ₹2,699 (unchanged) | 4,499 | 40% | `nutrabay-pure-100-pea-isolate-plant-based-protein-4kg` |
| 7110 | Amazon | B0G38DGNKM | ₹3,459 (unchanged) | 6,299 | 45% | `lavie-luxe-quaro26-horizontal-small-satchel-handbag-women` |

Both were dedup hits against the live DB, so the indexed slugs were preserved and the rows
rewritten rather than second pages created. Neither price moved, so **no `PriceHistory` row was
written on either** — the script's `if (before.price !== d.price)` guard handled that itself.
The justification on both was content rot, not price.

**8952 Nutrabay Pure 100% Pea Isolate, 4 kg.** ld+json in a Playwright tab: `price 2699`,
`InStock`, `sold:false`, and the ld `description` states the MRP in prose ("for Rs.4499.0
online") — a free cross-check that the stored `mrp 4499` is right. Description 253 → 1,921
chars, `howTo` **0 → 4 steps**. The rewrite carries the bulk maths (~₹675/kg on the 4 kg tub
against ~₹1,050/kg on the small pack, a 36% lower rate) and the honest ratings split: 3.9
overall from 5,730, Nutrition 3.9, Genuineness 3.9, Effect on Body 3.8, Quality 3.8,
Mixability 3.6, **Flavour 2.7**. Also that it is dairy-free, that no shaker is included, and
that Flipkart's "not deliverable in your location" is a pincode serviceability message, not a
stock-out.

**7110 Lavie Luxe Quaro26 satchel.** PDP `₹3,459.00`, `M.R.P. ₹6,299.00`, `-45%`, `In stock`,
`61FrCUOjwEL._SL1500_.jpg`. `#feature-bullets` returned **empty** — that is the known
bag/apparel shape, not a broken selector; the spec table
(`#productDetails_techSpec_section_1 tr`) carried the facts instead. Description 326 → 1,735
chars: 27 × 18.5 × 11 cm / ~5.5 L, one main compartment split into two sections with four
pockets, 500 g, **spot-clean only** (no machine wash, no dry clean), off-white shows denim
transfer, model Lx Quaro26 (HSGJ2851106M2), Bagzone Lifestyles Pvt Ltd Andheri Mumbai, 4.6 from
38, #12 in Women's Satchels.

**Correction to carry: neither image was swapped.** The run reported `img=same` on both — the
stored rows already held the rukmini1 1500×1500 asset and the `_SL1500_` Amazon asset. The
Nutrabay affiliate URL also read `aff=same`: the EarnKaro freight (`affid=rohanpouri`,
`affExtParam1=ENKR20260801A2106739812`, `affExtParam2=95`, `lid=…`, `marketplace=FLIPKART`) was
on the **source channel URL**, never on the stored row. Only Lavie's affiliate URL was actually
rebuilt (`aff=rebuilt`). The push script's own header comment claims the Nutrabay image was
swapped; that prose is wrong and the run output is the record.

The pre-flight gate was split this tick because of exactly that: `affid=` is foreign freight on
an Amazon URL but is **ours** on a Flipkart one. `[A, C]` must end in `?tag=ashoksachdev-21`
and carry no `affiliate_id|affid=|lid=|marketplace=|affExtParam`; `B` must be a `/p/itm` PDP
carrying `pid=PSLHPCVGVGSGBYHN` and ending `&affid=djhackraj`, with
`affExtParam|lid=|marketplace=|rohanpouri` rejected.

## Skipped, with reasons

- **Amazon `B0CG16N3P4` (Parachute Advansed Cocoa Repair 600 ml, deal 7314)** — verified on the
  PDP at ₹192 / M.R.P. ₹575 / -67% / In stock, against a stored row that already holds a
  1,022-char description and a 4-step `howTo`. **Healthy, so nothing was written and it is NOT
  in the IndexNow ping.** Resubmitting an unchanged URL is what IndexNow treats as spam, and
  the penalty lands on the host.
- **Loot Deals 24x7 Syska 10,000 mAh (`PWBGGD4THDQZYAY6`)** — SEEN; the same Flipkart `pid` has
  now been killed by dedup at `ac`, `af`, `al` and `an`. The wording changes every time, the
  `pid` never does.
- **SB Loots Havells geyser** — two products behind two `amazn.lt` links. Multi-product post.
- **Dealdost Boltt EVO** — "Sale Live On 24th Sep", "Starting at". Future/category post.
- **Dealzone `link.amazon/B063vSAEZ`** — known from `al` to resolve to an `amazon.in/s?k=`
  search page. Shortlink codes are ASIN-shaped and are not ASINs.
- **IndiaFreeStuff Swiggy Instamart, Hidden Loot Zepto** — search-term loots, no product.
- **Deal Dibba** (t.me join links), **OMG LOOTDEALS** ("Video dekho paisa kamao") — no product.
- Untracked sidebar rows (our own RichDeals channel, bots, DMs, LATEST IPHONE RATES) — not in
  `data/tg-groups.json`.

One key appended to `data/tg-multi-seen.json` — now **1,812** entries. `PSLHPCVGVGSGBYHN` and
`B0G38DGNKM` were already there; the dedup that caught them this tick came from the live DB.

## Freshness

```
node scripts/indexnow-ping.mjs story-home-…-b0djqv7jdb nutrabay-…-4kg lavie-…-women
DONE: IndexNow -> HTTP 200 for 6 urls
```

3 slugs + `/`, `/offers`, `/sitemap.xml` — the slugs+3 rule; the count is the receipt. No Bing
fallback needed. `api.indexnow.org` has now resolved **five ticks running** (`af`, `ai`, `ag`,
`al`, `an`).

Live pages verified after the write, all three 200 with matching Product JSON-LD:

- `/story-home-king-size-bedsheet-…-b0djqv7jdb` → `"price":"848"`
- `/nutrabay-pure-100-pea-isolate-plant-based-protein-4kg` → `"price":"2699"`
- `/lavie-luxe-quaro26-horizontal-small-satchel-handbag-women` → `"price":"3459"`

Sitemap **9,908** `<loc>` entries — unchanged from `am`, which is expected, not a miss: the
sitemap is ISR `revalidate = 1800`, so a page written minutes ago has up to 30 minutes before it
appears. The two refreshes were already in it. Prod endpoints, all 200: `/`, `/offers`, `/blog`,
`/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`.

## CEO audit

Clean:

- live deals **10,599**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- max deal id **10946**, tg-broadcast cursor **10946 = DB max** (it self-healed within the tick,
  as it always does), 0 unpushed commits, 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *`
   losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
2. **Title-₹-vs-price backlog recounted honestly: 43 live rows, not 41.** Counting each pattern
   independently gives **19 with `₹` and 24 with `Rs.`**, union **43 rows** — some rows carry
   both forms. The 41 reported at `al` came from an `else if` that skips the `Rs.` test whenever
   a `₹` match exists, so it undercounts rows carrying both. The backlog did not grow by two;
   the earlier count was two short. Retitle pass still not authorised.
3. **nullMrp 1,621 / nullPct 1,598** — unchanged from `al`. Bulk backfill still unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
   Re-verified this tick: still exactly 1, so deal 8952's refresh did not join that group.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the
   EXPIRED path, not refreshed to a price nobody can pay.
7. **`api.indexnow.org` is intermittent, not dead — 200 five ticks running.** Keep the Bing GET
   fallback wired; do not rewrite the script around either assumption.
8. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens →
   delete + regenerate).
9. **Amazon.in sign-in state in the `richDeals` Playwright profile is flagged only, never fixed
   here** — logging in touches owner credentials.
10. **CLAUDE.md freshness rule #3 names the wrong file** — it says confirm `llms.txt` carries the
    batch, but `/llms.txt` is a hub surface and carries no deal URLs by design; `/llms-full.txt`
    is the deal-bearing one. Both 200, nothing broken, rule text points at a file that can never
    show the batch. Flagged, not edited.
11. **The legacy thin-description backlog is real and this tick barely dented it.** Two rows went
    253 → 1,921 and 326 → 1,735 because they happened to resurface in a Telegram post. Nothing
    systematically finds the rest; the `geo-optimizer` bulk pass that would is unauthorised.

Four channel prices tested this tick. One was post-coupon (₹806 against a listed ₹848 with a
real 5% clip), and three were not claims at all — they were listings we already carried, where
the rot was our own thin copy rather than the channel's number. The gate earns its keep in both
directions: it catches what the channels get wrong, and it catches what we shipped badly.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
