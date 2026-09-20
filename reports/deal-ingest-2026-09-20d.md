# DEAL-INGEST indiafreestuff tick — 2026-09-20d (IST)

**21 deals published LIVE. IndexNow HTTP 200 for 24 urls (21 slugs + the 3 the script always appends).**

Funnel: 69 discovered → 31 candidates after JUNK(29) + GROCERY(9) → 31/31 `?rto=` resolved →
30 Amazon + 1 Flipkart reject → 7 already in the DB → 23 verified on the live PDP → 2 out of stock →
**21 pushed**.

## Discovery

feedburner RSS returns **HTTP 000** — dead, and CLAUDE.md still says "RSS first" (doc rot, carried).
The homepage has no deal grid and `/newsuperdeals` returns **28 bytes**. The only real listing source
is `https://www.indiafreestuff.in/deals` + `/deals/superdeals` (the apex 301s to `www.`). Scraping
deal-page slugs off those two pages gave **69 unique**.

## The finding that made this tick work: their Buy Now is a base64 deal id

A deal page carries **three different shapes** of `?rto=`, and only one of them is the product:

1. **Plaintext banners** — `amazon.in/h/rewards`, `gp/b?node=`, `gp/prime/pipeline/landing`, their own
   credit-card page. Present on **every** page, identical every time.
2. **Percent-encoded Myntra sidebar widgets** — a recurring promo block, not the deal.
3. **The real Buy Now** — `?rto=<base64>` that decodes to a **numeric deal id**, anchored by
   `class="btn btn-primery buy_now"` (their misspelling of "primary").

**The product URL appears nowhere in the deal-page HTML.** The base64 has to be resolved server-side:

```sh
curl -sL -A "<browser UA>" -o /dev/null -w '%{url_effective}' "<their buy-now url>"
```

This retires the old shorthand — CLAUDE.md's *"Resolves `?rto=` Buy Now redirects → real store URL"*
and `ingest-ifs-proper.mjs` both assume the target sits inline in the query string. Anything built on
that assumption silently harvests **only the site-wide banners** and publishes zero real products.

A prior decoder (`dec0920d.py`) did exactly that and produced 122 worthless rows. It is obsolete.

Their live tags, confirmed on the resolved URLs: Amazon **`dealhind-21`**, Flipkart
**`affid=adminnxtify`** with `affExtParam1=EPTG…&affExtParam2=_p__p_&pwsvid=PW…`. All stripped.

**31 pages refetched, 62 requests total, 2.6 s apart, browser UA.** The two-consecutive-403/429 abort
guard was armed and never fired. **31/31 resolved, 0 missing Buy Now, 0 blocks.**

## Two extraction bugs found and fixed, both silent

### `grep -oE` does not interpret `\t`

The ASIN extractor was `grep -oE '…[^\t]*\t…'` against a TSV. GNU grep in ERE mode expands `\t`
neither as an escape nor inside a bracket expression, so the pattern matched **nothing** and the step
returned **0 rows** while exiting 0. It read as "the resolve loop produced garbage". It had not.

Working replacement, 30/30 rows on the first run:

```sh
awk -F'\t' '$4 ~ /amazon\.in\/dp\// { u=$4; sub(/.*amazon\.in\/dp\//,"",u); sub(/[^A-Z0-9].*/,"",u); print u"\t"$2 }'
```

### Windows Python writes CRLF, which turns every curl into HTTP 000

The slug list was written by Python in text mode, so every line ended `\r\n`. A shell
`while read -r s` loop then carried the `\r` into the URL and **all 31 fetches returned HTTP 000**.

That is a **malformed-URL failure, not a block.** Misreading it would have shipped a false
"indiafreestuff is rate-limiting us" finding and stopped the tick. Fix: `tr -d '\r'`.
(Related: Windows Python cannot resolve a Git Bash `/tmp` path at all — `FileNotFoundError`.)

## Filtering

**29 JUNK** — credit cards, buy-1-get-1 / buy-2-get-50% / "upto N% off" multis, sale hubs (Big Billion
Days, Prime GIF), gift card / recharge / membership / referral, free samples, site notices and nav.

**9 GROCERY/FMCG held** (owner decision #11, never fetched): bajaj-almond-drops-body-lotion,
bikano-royal-rasgulla, cara-mia-glycerin-soap, chewers-puppy-biscuits, dermicool-soap,
naturali-anti-hairfall-shampoo, naturali-body-scrub, sakura-goldfish-food,
toffee-coffee-roasters-filter-coffee. **9 of 69 = 13%** — that is the measured cost of decision #11
on this source.

**1 Flipkart reject.** `glen-crystal-lpg-gas-stove-4-burner` resolved to
`dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff?pid=GSTH8CJ45ZYUHBMX&affid=adminnxtify&…`.
Path is `/dl/indiafreestuff/p/indiafreestuff`, **not `/p/itm…`** — a tracking landing page, not a
product. Standing reject, asserted correctly.

## Dedup before verification

Ran against the live DB by `productId` **and** by `affiliateUrl contains ASIN` (`productId` is not
unique, so `findFirst`/`findMany`, never `findUnique`). **30 → 7 dup, 23 new.**

| ASIN | Existing deal | Status |
|---|---|---|
| `B0FHJR9D4F` | 9583 | LIVE |
| `B0FD9RJ932` | 4957 | LIVE |
| `B0H3P35WCC` | 9908 | LIVE |
| `B078WWHZ72` | 10405 | LIVE |
| `B0GYG31PP3` | 10736 | LIVE |
| `B0H1QTGLW6` | 5889 | LIVE |
| `B0B4P6L5GG` | 5987 | LIVE |

Deduping first saved 7 browser verification fetches. Order matters: verify-then-dedup would have paid
for all 30.

## Verification — 23 ASINs, one call, all HTTP 200

One `browser_evaluate` from the **current** logged-in Amazon tab (an off-tab call returns `[]`),
looping `await fetch('https://www.amazon.in/dp/'+a,{credentials:'include'})` → `DOMParser` →
`#productTitle`, `.priceToPay .a-price-whole`, `.basisPrice .a-offscreen`, `.savingsPercentage`,
`#add-to-cart-button`, `#outOfStock`, `#landingImage`. 700 ms apart. Curl is bot-blocked; this is not.

**23/23 HTTP 200. 21 in stock. 2 out of stock, rejected:**

- `B0C1NTYVNV` — GM RCCB 25A Double Pole (30 mA): price null, mrp null, `#outOfStock` present.
- `B0F946NR4B` — KOTTY Women's Solid Track Pant: same.

Stock was read from `#add-to-cart-button` / `#outOfStock`, **not** `#availability` — that node has
previously returned raw inline script text (`P.when("A", "load").ex`) and cannot be trusted.

`#landingImage` `src` is a **thumbnail**. Every image was rebuilt: extract the core with
`/\/images\/I\/([^.]+)\./` and emit `https://m.media-amazon.com/images/I/<core>._SL1500_.jpg`.

## Published — 21 deals

All Amazon, all `?tag=ashoksachdev-21` on a clean `/dp/ASIN` (their `dealhind-21` plus `ref=`,
`smid=`, `aod=`, `keywords=`, `qid=` dropped). Title and description rewritten from the PDP facts,
never from their card. Image from the Amazon CDN, never `images.indiafreestuff.in`. Our own slugs.

| ASIN | Slug | ₹ | MRP | Off |
|---|---|---|---|---|
| B0HGRG6YYY | `2-in-1-oil-sprayer-dispenser-bottle-500ml-air-fryer-mister` | 249 | 499 | 50% |
| B0H8HQ33S8 | `adimora-stainless-steel-15-in-1-kitchen-press-sev-sancha-15-discs` | 399 | 999 | 60% |
| B07CWRHMQG | `ce-high-speed-ultra-hdmi-cable-6-feet-4k-60hz-2-pack` | 431 | 1698 | 75% |
| B0H5R5HBR9 | `cello-all-day-meal-glass-lunch-box-set-sky-blue-office` | 1149 | 2699 | 57% |
| B0H6JHR1Y2 | `cello-fit-fresh-clip-o-round-glass-lunch-container-720ml` | 399 | 515 | 23% |
| B0GFMJ8HS2 | `cello-gemini-lunch-box-gift-set-3-containers-with-bag-black` | 549 | 699 | 21% |
| B0H7X9R5L9 | `cello-inorbit-dazzle-opalware-dinner-set-12-pieces` | 805 | 1339 | 40% |
| B0H7XCFS6P | `cello-inorbit-dazzle-opalware-dinner-set-22-pieces` | 1399 | 2319 | 40% |
| B0H6QNRBK6 | `cello-lush-foliage-dazzle-opalware-dinner-set-33-pieces` | 1900 | 3345 | 43% |
| B0H6QNLB28 | `cello-wild-poppy-dazzle-opalware-dinner-set-40-pieces` | 1811 | 3379 | 46% |
| B0CX8ZVRFY | `cipla-plast-rich-look-bathroom-mirror-cabinet-pink` | 999 | 5999 | 83% |
| B0GYG93F9B | `geonix-hydra-gaming-pc-cabinet-6-argb-fans-tempered-glass-white` | 4858 | 9999 | 51% |
| B0GW94144H | `jbl-commercial-cshm10-handheld-dynamic-microphone-xlr` | 1279 | 2650 | 52% |
| B0BWFMYRZB | `banzer-pull-out-kitchen-faucet-360-degree-black` | 4499 | 7999 | 44% |
| B0B9YHVVH1 | `lenovo-legion-m300s-rgb-wired-gaming-mouse-8000-dpi` | 1815 | 4490 | 60% |
| B07C5529C2 | `lockout-multi-device-hasp-ak-hn-72a-pack-of-2` | 324 | 514 | 37% |
| B0FNDH5V8Q | `philips-joy-vision-05w-led-night-lamp-2-pin-pack-of-12` | 760 | 1380 | 45% |
| B0H9Y8SVKW | `polycab-wizzy-prime-1200mm-bldc-ceiling-fan-with-remote` | 3799 | 7366 | 48% |
| B09879S648 | `titan-slimline-blue-dial-analog-steel-watch-women-ns95142qm01` | 3849 | 8915 | 57% |
| B0H4W8RGSH | `titan-work-mode-3-hands-silver-dial-steel-watch-women-nu95324sm01` | 3719 | 9995 | 63% |
| B097H4XTKC | `triumph-pvc-football-with-gowin-crush-football-shoe-size-10` | 1092 | 1329 | **18%** |

`POST /admin/deals/bulk` → **HTTP 201, `count: 21`, every row `created: true, ok: true`.**
Payload was the `{"deals":[…]}` wrapper (a bare array 201s with `count:0`), `status:"live"` lowercase
(anything else falls through `mapStatus()` to PENDING_REVIEW), sent with `--data-binary @file`.

### The 18% row needed a long description or it would never have indexed

`dealIndexable()` requires **discount ≥20% OR description ≥200 chars**. `B097H4XTKC` is **-18%** —
it fails the discount arm outright. Every description in this batch was written to clear 200 chars
(shortest is **341**), so the football combo indexes on the description arm. Publishing it with a
one-line blurb would have put a live page in the DB that the sitemap silently drops.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <21 slugs>
DONE: IndexNow -> HTTP 200 for 24 urls
```

**24 = 21 + 3.** The script always prepends `/`, `/offers` and `/sitemap.xml` unless `--paths` is
passed, so the sitemap is already pinged and needs no separate call. No 422, so no Bing hand-roll.

## CEO audit

| Check | Result |
|---|---|
| Rate limit | 62 source requests at 2.6 s; abort guard armed, never fired; 0 403/429 |
| Their images | **none used** — all 21 from `m.media-amazon.com`, rebuilt to `_SL1500_` |
| Their text | **none used** — titles and descriptions written from PDP fields |
| Their affiliate tags | `dealhind-21` / `adminnxtify` stripped at resolution; never reached the DB |
| Price verification | 21/21 read live off the PDP, ±₹0 by construction (we publish what we read) |
| Stock | 21/21 `#add-to-cart-button` present, `#outOfStock` absent; 2 OOS caught and dropped |
| Dedup | by `productId` **and** `affiliateUrl` substring; 7 caught |
| Status | all `live` — AUTO-APPROVE; the agent file's `pending-review` language is stale |
| IndexNow | **HTTP 200, 24 urls** |
| Scratch hygiene (#11) | **clear (18th)** — `_dd0920d.mjs` created and `rm -f`'d in the same Bash call |
| Artifacts | none — terminal + this file only |
| Secrets | `ADMIN_KEY` sourced from `.env`, never printed; no `.env` staged |

### Honest limitation — the block-drift rule could not be exercised

`ifs-card-prices-lie.md` says to reject a whole drifting brand block. **The resolve loop never
captured their card prices**, so there was nothing to compare the 7 fresh Cello rows against. We are
not trusting their price — we never read it. Every published price came off the PDP. **Do not read
this tick as evidence the block-drift rule passed; it was not run.**

### New rot — their card *text* is wrong too, not only their prices

Two slug ↔ PDP mismatches in 21 verified rows:

- `B07C5529C2` — their slug says **pack-of-5**; the PDP title says **"(Pack of 2)"**.
- `B0GFMJ8HS2` — their slug says "3 containers + 1 600ml insulated bottle"; the PDP says
  "Gift Set of 3 Pieces with Bag — 300ml x 2 Steel Round Containers, 500ml x 1 Oval Container".
  **No bottle at all.**

Nothing shipped wrong, because we publish the PDP title. But this **extends
`ifs-card-prices-lie.md` from prices to pack sizes and contents** — their card is not a usable
source for any field, not just price.

### Rot flagged

- **NEW — `?rto=` is a base64 deal id, not a URL.** Every tool that assumes an inline URL
  (`ingest-ifs-proper.mjs`, the CLAUDE.md shorthand) yields banner links only. Top of the
  bake-into-`ingest-common.mjs` list.
- **NEW — `grep -oE` is blind to `\t`.** Cost one call and nearly a false "source is blocking" verdict.
- **NEW — Windows-Python CRLF turns a shell-loop curl into a silent HTTP 000 storm** that mimics a block.
- **NEW — indiafreestuff card text is wrong** (2 pack-size mismatches in 21).
- Carried: feedburner RSS HTTP 000 while CLAUDE.md says RSS-first; `/newsuperdeals` returns 28 bytes;
  apex 301s to `www.`; 1,602 LIVE deals with no MRP (owner decision #6); Flipkart PDP curl → 403
  reCAPTCHA; Flipkart ld+json array root; Flipkart "Buy at ₹X" is coupon-inclusive; `ingest.config.json`
  `requestDelayMs: 1500` is inert; ~200 scratch leftovers under `apps/api/scripts/` (decision #5);
  deal 1536 slug ₹299 vs row ₹499; deal 7637 EXPIRED candidate.

## Fixed inline this tick

Two extraction bugs, both in this tick's own pipeline (the `\t` blindness and the CRLF storm), both
fixed and both recorded above so the next tick does not re-lose the hour. Nothing outside the tick
needed a safe fix — the audit arms all came back clean.
