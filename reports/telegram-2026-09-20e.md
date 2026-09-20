# TELEGRAM-DEAL-MONITOR tick — 2026-09-20e (IST)

**1 deal published LIVE**, id **10745**. IndexNow **HTTP 200 for 4 urls**.
First non-Amazon row in several ticks — the Flipkart affiliate path (`affid=djhackraj`) ran end to end.

## Published

| Id | pid | Price | MRP | Off | Desc | Product |
|---|---|---|---|---|---|---|
| 10745 | `CBKGRT9GVF2XN6CE` | ₹899 | ₹2,696 | 67% | 525 | THE MAN COMPANY Blanc gift set — perfume, body lotion, body wash, roll-on deo |

Push `{"count":1}` HTTP **201**, `results[0]` `created:true, ok:true` — read row by row, not off `count`.
DB read-back: `status LIVE`, price 899, mrp 2696, `discountPct` 67, store **Flipkart**, image a real
`rukmini1.flixcart.com` 1500x1500 URL, affiliateUrl carrying `pid` + `affid=djhackraj` and **no**
`growthte` / `affExtParam*` residue. Clears `dealIndexable()` on **both** arms (67% ≥ 20%, 525 ≥ 200).

Channel claimed ₹899. Live ld+json reads 899. **Drift 0.**

## The defect this tick found: Flipkart's ld+json root is an ARRAY

The first read returned **`ld: []`** and looked exactly like "this page has no structured data".
It was my parse bug, not a missing block:

```js
let j = JSON.parse(raw);
if (Array.isArray(j)) j = j[0];   // <-- Flipkart wraps the Product in an array
```

Filtering `j['@type'] === 'Product'` against the unwrapped root matches nothing, because the root is
`[{...}]` and has no `@type` at all. **An empty parse is indistinguishable from an absent block**, so
the failure mode is a silent false reject of a good deal — the same shape as last tick's off-tab `[]`
sidebar sweep.

Caught by not trusting one read: a second, differently-shaped probe returned `ldCount: 1` with the raw
text beginning `[{"name":"THE MAN COMPANY…`, which proved the array root. Third evaluate with the
unwrap returned the complete Product block.

**This belongs in `ingest-common.mjs` next to the Flipkart browser-tab verifier.** Without the unwrap,
every Flipkart product coming through DesiDime or indiafreestuff silently rejects.

## The coupon guard fired on Flipkart's own page, not just the channel text

The PDP shows **₹899** as the buybox with **"Buy at ₹799"** in the offer strip directly beneath it.
₹799 is offer-inclusive — a bank/coupon figure, not what the page charges. Published **₹899**.

Standing rule was written for channel posts ("never treat a channel's 'at ₹X' as a buybox price").
It extends to the merchant's own offer strip. Same class as the Polycab `B0H9Y8SVKW` ₹3,799 − ₹400
coupon case last tick. Publishing ₹799 would have put a number on richdeals.in that nobody sees at
checkout.

## Verification chain — four stacked gotchas, all of them load-bearing

1. `fkrt.cc/<code>` → **HTTP 403** on `dl.flipkart.com` **with a fully usable `%{url_effective}`**.
   A 403 here is not a dead link; only the body fetch is blocked.
2. Rebuild as `www.flipkart.com/<path>?pid=<pid>`.
3. `browser_navigate` in a Playwright tab. Plain curl gets **403 / 787 b / `<title>Flipkart reCAPTCHA</title>`**.
4. Read `script[type="application/ld+json"]`, **unwrap the array**, then `offers.price` / `offers.availability` / `image[0]`.

Verified fields: `@type` Product, `sku` **`CBKGRT9GVF2XN6CE`** (matches the resolved pid exactly),
`offers.price` 899 INR, `availability` **`https://schema.org/InStock`**, `aggregateRating` 4.5 / 261,
seller `TheManCompany`, description carrying **"for Rs.2696.0"** — a second corroboration of the MRP
independent of the visible strikethrough.

**Image note:** in-DOM `<img>` are `rukminim2.flixcart.com/image/800/1070/…?q=90`; ld+json `image[]`
are `rukmini1.flixcart.com/image/1500/1500/…?q=70`. Took the ld+json 1500x1500.

## Standing rejects recorded rather than re-resolved

- **`SHOHGDNDGTQZHF2F`** (Asics via Shopsy) — offered **three times today across two stores** with the
  same bare `9689`, read at **₹10,199 twice independently**. Not re-resolved a fourth time. Owner
  decision #7's cost, now measured on a second pid.
- **`PWBGGD4THDQZYAY6`** — rot #19, **fifth instance**: in the seen list, no DB row. Proven a genuine
  reject last tick (OutOfStock ₹1,393 vs claimed ₹799). The seen list was right; it just stored an id
  and no verdict, so five ticks have re-derived the same answer.

## CEO audit

| Check | Result |
|---|---|
| Credential rule | **exercised and held** — Telegram service row skipped; no value in this report, the terminal reply, the commit, or any scratch file |
| Affiliate assert | builder throws unless `affid=djhackraj` present **and** `growthte`/`affExtParam` absent. Passed |
| Product-path assert | `/p/itm…` required — passed; tracking landings would throw |
| Description floor | asserted ≥200 in the builder, landed at 525 |
| Source text | written fresh; no channel copy, no Flipkart marketing prose |
| CDN image assert | builder requires `rukmini*.flixcart.com` — passed |
| Rate limit | no new shortlink resolutions this tick; no 403/429 |
| Push status | `status:"live"` lowercase — read back **LIVE**, did not fall to PENDING_REVIEW |
| IndexNow | **HTTP 200**, run immediately after the push |
| Scratch hygiene (#11) | **clear** — no script left under `apps/api/`; builder lives in the session scratchpad |
| Browser state | Flipkart tab closed last tick; tabs 0–3 untouched |
| `data/tg-multi-seen.json` | **not written** — standing rule, stays unstaged |
| tg-broadcast cursor | **not drained** — needs the owner's explicit go-ahead |

### Rot flagged

- **NEW — Flipkart ld+json array root** causes a silent empty parse. Above. Highest-value item here:
  it produces false rejects that look like clean misses.
- **NEW — the Flipkart "Buy at ₹X" offer strip** is coupon-inclusive. Guard must live in the verifier,
  not only in the channel-text reader.
- **Rot #19, fifth instance** — `PWBGGD4THDQZYAY6`.
- Carried: `fkrt.cc`/`dl.flipkart.com` shortlink gap; Flipkart PDP curl 403 while CLAUDE.md still says
  non-Amazon merchants serve ld+json to plain curl; Playwright off-tab `[]` sweep; `want` filter
  matching "SB Loots And Deals Help Bot"; deal 7637 EXPIRED candidate; deal 1536 slug/price mismatch.

### Slug length

The generated slug truncates the title at 80 chars before the pid is appended, so it ends
`…-body-wash-and-roll-on-cbkgrt9gvf2xn6ce` — "deo" is cut. Unique and readable, so it ships as is.
Recording it because a truncated slug must never be **hand-typed** as a link target elsewhere; always
read it back from the DB.
