# TELEGRAM-DEAL-MONITOR tick — 2026-09-20c (IST)

**1 deal live.** Id **10735**, IndexNow **HTTP 200 for 4 urls**.

One sidebar sweep → 29 rows → 6 single-product candidates → 7 shortlinks resolved → 2 fresh after
dedup → **1 published, 1 rejected on price**.

## Sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`, mapping each row to
`{t: .title h3, l: .subtitle .last-message}`. 29 rows returned. The chat list was not reloaded and
no chat was opened.

Skips: our own broadcast channel, loot and multi-product posts, category and sale-hub posts, bot
rows, DMs, chatter, and the **Telegram service row**.

**The service row stays a permanent skip.** For the third time today it surfaced a live login code
in its last-message preview. It is treated as a non-source chat — the value was not read into any
pipeline, and **no such value appears in this report, the terminal reply, the commit, or anywhere
else.** Standing credential rule, exercised a third time.

The `want` filter matched **"SB Loots And Deals Help Bot"** again. That is a bot row, not a source
group. Standing gap, unfixed.

## Shortlink resolution

`curl -sL` with a **browser UA**, **2.6 s apart**. Seven resolutions, no 403/429.

| Shortlink | Resolves | Lands on |
|---|---|---|
| `amzn.to/…` | yes | Amazon `/dp/B0H9V8BZ6B` |
| `link.amazon/B0fOhpO5M` | yes | Amazon **`/s?k=Sage+Square+Helmet`** (HTTP 503) |
| `link.amazon/B02zo4wXJ` | yes | Amazon `/dp/B0CGRNGTM8` |
| `link.amazon/B05yvriRF` | yes | Amazon `/dp/B0G38DGNKM` |
| `amzn.to/…` | yes | Amazon `/dp/B07QX21WZQ` |
| `bitli.in/…` | yes | interstitial; product in the `dl=` param |
| `fkrt.co/…` | **yes, HTTP 200** | Flipkart `/p/itm…?pid=PWBGGD4THDQZYAY6` |

### Finding: `link.amazon` path segments are NOT ASINs — three instances in one sweep

`B0fOhpO5M`, `B02zo4wXJ`, `B05yvriRF`. Each is a **9-character mixed-case short code** that merely
*looks* ASIN-shaped because it starts with `B0`. The real destinations were `B0CGRNGTM8`,
`B0G38DGNKM`, and — for the first — not a product at all.

Any handler that treats the `link.amazon` path segment as an ASIN produces a garbage
`amazon.in/dp/<code>` URL. Three concrete instances in a single sweep is the strongest evidence yet
for the standing `ingest-common.mjs` fix: **resolve first, extract the ASIN from the resolved URL,
never from the shortlink path.**

### The post-resolution `/s?` assert fired again

`link.amazon/B0fOhpO5M` resolved to `amazon.in/s?k=Sage+Square+Helmet` — a **search results page**,
and a 503 at that. Rejected. Second day running that the reject only happened because resolution
came before the assert. A pre-resolution check sees a clean-looking product shortlink and passes it.

### `fkrt.co` resolves with a browser UA

The 09-20b tick recorded `fkrt.co` as "resolves, 403 to curl". With
`Mozilla/5.0 … Chrome/129.0 Safari/537.36` it returned **200** and the full product URL including
`pid=PWBGGD4THDQZYAY6`. **The UA is the entire difference.** The earlier note was a curl-default
artefact, not a property of the host. A browser UA belongs on all shortlink resolution.

### `bitli.in` `dl=` finding confirmed with a real payload

The effective URL is a `trackingv3.linkredirect.in/visitretailer/…` interstitial. The product lives
**only** in the URL-encoded `dl=` param:
`shopsy.in/asics-gel-nimbus-27-running-shoes-men/p/itmeaf404d753513?pid=SHOHGDNDGTQZHF2F`.
Reading `%{url_effective}` alone gets the interstitial and nothing else. Yesterday this was
inferred; today it has a payload behind it.

## Dedup

`data/tg-multi-seen.json` (flat list, **1,757** entries) plus a live DB read by `productId`.

| Candidate | Seen list | DB |
|---|---|---|
| `B0H9V8BZ6B` | no | none → **fresh** |
| `SHOHGDNDGTQZHF2F` | no | none → **fresh** |
| `B0CGRNGTM8` | yes | **10718, LIVE** |
| `B0G38DGNKM` | yes | 7110, LIVE |
| `B07QX21WZQ` | yes | 5825, LIVE |
| `PWBGGD4THDQZYAY6` | **yes** | **no row** — rot #19 |

**Dedup earned its place this tick.** Three of six resolved candidates were already LIVE, and
**10718 was published hours earlier the same day** — the channels recirculate their own posts
within a single day, not just across days.

### Rot #19 has a third instance, and it is the same pid as before

`PWBGGD4THDQZYAY6` sits in the seen list with **no DB row**. This exact pid was flagged the same way
earlier today. The seen list and the DB disagree, and nothing reconciles them. Feeds owner
decision #7 (persist a reject cache) — without one, the only record that a candidate was ever
considered is a bare id in a flat file with no verdict and no date attached.

## Reject

| Item | Reason |
|---|---|
| Asics Gel-Nimbus 27 (Shopsy, `SHOHGDNDGTQZHF2F`) | live **₹10,199** vs claimed `9689` — **drift ₹510** |

Shopsy served HTTP 200 at 368 KB. **No `@type:"Product"` ld+json block was present at all** — the
`<script type="application/ld+json">` blocks contained none. The `finalPrice`/`mrp` regex fallback
covered it: `finalPrice 10199`, `mrp 16999`.

### The 09-20b Asics ambiguity partly resolves

Yesterday's tick recorded a bare `9689` against a live Amazon read of ₹10,199 and deliberately
logged the reason as "claimed price ambiguous / unverifiable" rather than "drift ₹510", because
`9689` carried no `₹` and sits in the shape these channels use for post ids.

Today the **same product** arrived through a **different host and a different store** (Shopsy via
`bitli.in`, not Amazon via `amzn.to`) with the same bare `9689`, and the live Shopsy price read
**₹10,199** — independently corroborating yesterday's Amazon figure to the rupee.

What that does and does not settle: it confirms **₹10,199 is the real price on both stores**, so the
reject is right. It does **not** settle what `9689` is. A price claim would normally carry a `₹`; a
number that survives a store change unchanged looks more like the channel's own internal deal id.
Yesterday's cautious wording was the correct call on yesterday's evidence and is not being
retracted — today adds a second price reading, not a decoding of the number.

### Shopsy ld+json is unreliable — second confirmation

The 09-20b tick got a clean `Product.offers.price` from Shopsy. This tick got **no Product block
whatsoever** on the same domain. The `finalPrice` + `mrp` regex fallback is not a nicety; on this
store it is sometimes the only path. It belongs in `ingest-common.mjs` alongside `productLd()`, not
as a one-off in tick scripts.

## Published

| | |
|---|---|
| **10735** | `premium-satin-silk-scrunchies-pack-of-12-b0h9v8bz6b` |
| Title | Premium Satin Silk Scrunchies Pack of 12 at ₹99 (83% Off) – Amazon |
| Price / MRP | **₹99** / ₹599 · −83% |
| Verify | logged-in tab, same-origin `fetch` + `DOMParser` — live ₹99, **drift 0** |
| Stock | `#add-to-cart-button` present, `#outOfStock` absent, `#availability` = "In stock" |
| Coupon | none — the ₹99 is the buybox, not a coupon-inclusive figure |
| productId | `B0H9V8BZ6B` |
| Image | `m.media-amazon.com/images/I/711uGq5TgyL._SL1254_.jpg` |
| Affiliate | `https://www.amazon.in/dp/B0H9V8BZ6B?tag=ashoksachdev-21` |
| Result | `{"count":1}`, `created:true`, HTTP 201 |
| Status | **LIVE** (DB read-back, not the API response) |
| IndexNow | **HTTP 200 for 4 urls** (1 slug + `/`, `/offers`, `/sitemap.xml`) |
| LIVE total | 10,387 → **10,388** |

Title came from `#productTitle`, not from the channel post and not from `d.title`. The −83% rests on
a ₹599 MRP; the description says in plain words to judge the deal on the ₹99 rather than the
percentage, because the anchor is Amazon's own.

## CEO audit

| Check | Result |
|---|---|
| New row populated | price, MRP, discount, image, productId, affiliate — **no nulls** |
| Title glyph | ₹ present, ` at Rs ` absent |
| Credential rule | **exercised and held** — service row skipped, nothing recorded anywhere |
| Rate limit | 2.6 s between resolutions; **no 403/429** (the one 503 was Amazon's search page, not throttling) |
| Source text | description written fresh; no channel text reused |
| Scratch hygiene (#11) | **clear** — `_tg0920c.mjs`, `_rb0920c.mjs` and the Shopsy HTML all deleted in the same Bash call that created them; payload lives in the session scratchpad, outside the repo |
| Rot #4 (cursor) | **improved** — 10,719 → 10,729 unprompted; see the SITEMON report |

## Standing gaps re-evidenced

- **`link.amazon` handling** — three instances this sweep, path segment is not the ASIN.
- **Browser UA on all shortlink resolution** — made `fkrt.co` work where the default UA 403'd.
- **`bitli.in` / `bittli.in` `dl=` param** — payload confirmed.
- **Post-resolution `/s?` assert** — fired again, on a link that looked like a product link.
- **Shopsy `finalPrice`/`mrp` regex fallback** — second confirmation, this time with ld+json absent
  entirely.
- **Reject cache (#7)** — third instance.
- **`want` filter matching a help bot** — recurred.

## Not done

`data/tg-multi-seen.json` stays unstaged per the standing rule. The tg-broadcast cursor was **not**
drained — that needs the owner's explicit go-ahead.
