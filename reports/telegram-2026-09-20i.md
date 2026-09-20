# TELEGRAM-DEAL-MONITOR — richdeals.in — 2026-09-20 (tick i)

Source: 13 groups in `data/tg-groups.json` · Playwright MCP profile `richDeals` ·
one sidebar `browser_evaluate` · shortlinks resolved ≥2.5 s apart with a Chrome UA

## Result

**5 new deals pushed LIVE.** `/admin/deals/bulk` → HTTP 201, `count: 5`, all `created: true`.
IndexNow → **HTTP 200 for 8 urls** (5 slugs + the 3 paths the script always appends).

| # | slug | store | price | mrp | off |
|---|------|-------|------:|----:|----:|
| 1 | lakme-9to5-cc-cream-almond-spf30-30g | Amazon | 175 | 399 | 56% |
| 2 | kotty-womens-solid-grey-pull-on-track-pant | Amazon | 329 | 1999 | 84% |
| 3 | bellavita-perfume-bathing-soap-bar-men-3x100g | Amazon | 149 | 249 | 40% |
| 4 | wild-stone-code-chrome-no-gas-perfume-spray-pack-of-2-150ml | Amazon | 220 | 700 | 69% |
| 5 | trock-single-shaft-badminton-kit-2-rackets-5-shuttlecocks-cover | Shopsy | 283 | 2199 | 87% |

Affiliate: Amazon `?tag=ashoksachdev-21` on `/dp/ASIN`; **Shopsy → Cuelinks**
(`linksredirect.com/?cid=527&source=linkkit&url=…`), not `affid=djhackraj` — Shopsy is a
separate domain from Flipkart. All titles and descriptions rewritten; images from
`m.media-amazon.com` and `rukminim3.flixcart.com`.

## Funnel

```
29  sidebar rows read in ONE browser_evaluate
13  source groups matched
 6  rejected from the preview alone (loot / multi / category / search / no-URL / non-deal)
11  shortlinks resolved  -> 8 Amazon ASINs, 2 Shopsy pids, 1 Flipkart pid
11  productIds deduped vs live DB -> 3 DUP, 8 NEW
 8  verified on the live PDP -> 5 keep, 3 reject
 5  pushed status:live
```

## Rejected at the preview

| group | post | reason |
|-------|------|--------|
| SB Loots And Deals | Timex/Casio multi-link | multi-product |
| Dealdost | Myntra "Loot" Pack-of-3 | loot / multi |
| Rogerkart Deals | "Men's Premium Watches Upto 90% Off" | category |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart link | search URL |
| Hidden Loot Deals & Offers | Blinkit BOGO | no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" | not a deal |

## Rejected at verification — 3 of 8

| product | channel said | PDP said | verdict |
|---------|-------------:|---------:|---------|
| TE-A-ME Peppermint Loose Tin 50 g (`B0DBQB5F9Y`) | "50%off Coupon" | 344 vs MRP 345 = **0% off** | reject |
| Asics GEL-NIMBUS 27 (`SHOHGDNDGTQZHF2F`, Shopsy) | 9689 | 10199, **Sold Out** | reject |
| Syska 10000 mAh Power Bank (`PWBGGD4THDQZYAY6`, Flipkart) | 799 | 1393, **OutOfStock** | reject |

The TE-A-ME row is the first concrete instance of **open owner decision #9**: a 0%-discount
exact-price match. CoolzTricks posted a bare "50%off Coupon" line with no product name; the
coupon selectors read empty on fetched HTML, so the claim is unverifiable, and at 344 against
an MRP of 345 the row would also fail `dealIndexable`'s "discount ≥20% OR description ≥200
chars" test on the discount arm. Not published.

## Bare-number channel posts — now 3 of 4 wrong

Three channels posted a naked number with no currency and no context:

| group | posted | verified | outcome |
|-------|-------:|---------:|---------|
| Dealzone | 283 | 283 | **exact** — published |
| Deal Dibba | 9689 | 10199 (0.950 ratio, post-coupon) | rejected anyway, sold out |
| — (Flipkart Syska, "Rs.799") | 799 | 1393 | rejected, out of stock |

First time a bare-number post has ever been right. The guard still earns its keep: two of the
three would have published an unpayable price, and both of those products are not even buyable.

## Dedup — 3 DUP

| productId | existing deal |
|-----------|---------------|
| `B07QX21WZQ` | 5825 LIVE Rs 549 |
| `B0G38DGNKM` | 7110 LIVE Rs 3,459 |
| `B0F1T8N2VR` | 10767 LIVE Rs 449 — pushed an hour ago by deal-ingest tick e |

## Channel accuracy — ONLINE SHOPPING DEALS is clean

All four prices that channel posted matched the Amazon buybox **exactly**. That is a sharp
contrast with indiafreestuff, which ran 4-of-14 wrong on the same day. Worth weighting when
the `want` filter is eventually tightened (owner decision #8).

## Shortlink codes — eight more confirmations

Every resolved code differed from the ASIN it pointed at: `amzn.to/4y1HPhf`→`B0DBQB5F9Y`,
`amzn.to/4uZXfjK`→`B07QX21WZQ`, `link.amazon/B05yvriRF`→`B0G38DGNKM`,
`link.amazon/B06bKviM8`→`B0744RRZPL`, `link.amazon/B0dXdLrEI`→`B0F94BP51N`,
`link.amazon/B0aH9WPBo`→`B0DVGS1F9Y`, `link.amazon/B0gdvY6AL`→`B08ZC73Z2B`,
`link.amazon/B0g0GsPsd`→`B0F1T8N2VR`. Running total roughly 16. Pattern-matching the code out
of the path publishes the wrong product at a price that verifies fine.

`bitli.in` carries the real target in a `dl=` query param of a
`trackingv3.linkredirect.in/visitretailer/…` URL — URL-decode it. Both bitli links this tick
landed on **Shopsy**, not Flipkart.

## CEO audit — rot

- **NEW #45** — `PWBGGD4THDQZYAY6` sits in `data/tg-multi-seen.json` but has **no DB row**.
  The seen cache and the live DB have drifted apart, so the cache alone is not a dedup. Only
  the resolved-`productId` DB check is authoritative. (Second source of this exact lesson this
  day; deal-ingest tick e hit it from the title-prefilter side.)
- **NEW #46** — CoolzTricks Official posts coupon claims with no product name and no real
  buybox discount. Unpublishable as-is. Candidate for the owner-decision-#8 prune.
- **Shopsy PDPs carry no `ld+json` Product at all.** Price has to come from the
  `"finalPrice":{…"value":N}` + `"mrp":N` regexes, and stock from the absence of the
  `AVAILABILITY` announcement widget (`"title":"Sold Out"`). The ALL-STORES rule in CLAUDE.md
  assumes ld+json for every non-Amazon merchant — that assumption is false for Shopsy.
- **#44 carried** — indiafreestuff Flipkart `?rto=` resolves to a 403 tracking landing.
- **#43 carried** — CLAUDE.md documents a "homepage HTML fallback" for a homepage with no deal grid.
- **RSS feedburner still HTTP 000** while CLAUDE.md says "RSS first".
- **#19 at nine instances** — the Telegram service row (`777000`) surfaced a live login code in
  its sidebar preview again. Skipped, never echoed, never recorded. Permanent-skip list.
- **1,602 LIVE deals (15%) carry no MRP** — owner decision #6, still open.
- Scratch hygiene clean — `apps/api/_tg0920i_dd.cjs` created and removed in the same call (25th).
- Regressed once this tick: parsed the Shopsy HTML from a Git Bash `/tmp` path, which Windows
  Python cannot see (`FileNotFoundError: /tmp/sh.html`). Already-known trap, re-derived. Fixed
  by writing to the session scratchpad.
