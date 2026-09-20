# TELEGRAM-DEAL-MONITOR tick — 2026-09-20f (IST)

**0 deals published. Every candidate died at dedup — all three resolved ASINs are already LIVE.**
No push, therefore no IndexNow ping: there was nothing to ship. The tick's value this hour is the
audit it produced on the way — our three live rows were re-verified against Amazon and match to the
rupee, while two of the three channel prices were wrong.

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` from the already-active Telegram tab
(tab 3) — 29 rows, all 13 source groups present.

| Group | Last message | Verdict |
|---|---|---|
| SB Loots And Deals | 5 brand links, "Upto 75% Off On Beauty Products" | multi — skip |
| Dealdost | The Man Company Blanc gift set ₹899, `fkrt.cc/hXpFvZr` | **already published as 10745 last tick** |
| Dealzone | MANGO clothing, 3 gender links | category/multi — skip |
| CoolzTricks | "Apply Coupon On Cello Products", 3 links | multi — skip |
| Rogerkart Deals | Arrow men's clothing, 2 links | category/multi — skip |
| ONLINE SHOPPING DEALS | Bamboo hair brush ₹199, `link.amazon/B02zo4wXJ` | single — resolved |
| Deal Dibba | `9689 https://bitli.in/K7CsLq3` | single — resolved, standing reject |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart `/search?query=` | search page — skip |
| Hidden Loot Deals | Blinkit buy-X-get-Y, no product link | offer, not a product — skip |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500, `link.amazon/B05yvriRF` | single — resolved |
| OMG LOOTDEALS | "Video dekho paisa kamao" | ad — skip |
| Loot Deals 24x7 | Syska power bank ₹799, `fkrt.co/l5KOxl` | single — resolved, standing reject |
| NonStopDeals | `151 https://amzn.to/4uZXfjK` | single — resolved |

5 shortlinks resolved, 2.6 s apart, browser UA. No 403/429 on any resolution.

## Resolution results

| Shortlink | Resolves to | Outcome |
|---|---|---|
| `link.amazon/B02zo4wXJ` | `B0CGRNGTM8` | **dup — deal 10718 LIVE** |
| `link.amazon/B05yvriRF` | `B0G38DGNKM` | **dup — deal 7110 LIVE** |
| `amzn.to/4uZXfjK` | `B07QX21WZQ` | **dup — deal 5825 LIVE** |
| `bitli.in/K7CsLq3` | Shopsy `SHOHGDNDGTQZHF2F` | standing reject, 4th offer |
| `fkrt.co/l5KOxl` | Flipkart `PWBGGD4THDQZYAY6` | standing reject, **rot #19 sixth instance** |

Note the shortlink code is never the ASIN: `link.amazon/B02zo4wXJ` carries `B0CGRNGTM8`, and
`B02zo4wXJ` is not even a valid ASIN shape. Anything that pattern-matched the code straight out of
the URL would have published a 404.

Both `link.amazon` links arrived with a foreign associate tag (`vivek123034-21`, `khushalsing07-21`)
plus `btn_type=ss` Button attribution. Stripped at resolution; nothing downstream ever saw them.

## The real finding: channel prices are wrong, our rows are right

Because all three were dups, the cheap move was to skip. Instead I re-read the three live PDPs in
the logged-in tab and compared against what we publish:

| ASIN | Our live row | Live Amazon | Channel claimed | Drift vs live |
|---|---|---|---|---|
| `B0CGRNGTM8` (bamboo brush) | 10718 @ ₹199 | ₹199 / MRP ₹1,000 / −80% | ₹199 | **0** |
| `B0G38DGNKM` (Lavie satchel) | 7110 @ ₹3,459 | ₹3,459 / MRP ₹6,299 / −45% | ₹3,500 | **0** (channel off by ₹41) |
| `B07QX21WZQ` (TrustBasket pots) | 5825 @ ₹549 | ₹549 / MRP ₹1,009 / −45% | **₹151** | **0** (channel off by ₹398) |

All three in stock (`#add-to-cart-button` present, `#outOfStock` absent). **Our published prices are
exact on every one.** The rot was in the source, not in us.

### Bare-number posts are a junk class

`151 https://amzn.to/…` (NonStopDeals) and `9689 https://bitli.in/…` (Deal Dibba) share a shape: a
naked integer, no currency, no product name. Both were checked this tick and both are wrong —
₹151 against a real ₹549, and 9689 against the ₹10,199 read twice on the Asics. That is 2/2 wrong,
after the Asics already failed independently in earlier ticks.

**Proposed rule:** treat a post whose entire text is `<digits> <shortlink>` as unverified — never
carry the number into the row, always read the price off the PDP. Cheaper still, deprioritise the
post entirely, since a channel that cannot be bothered to name the product is not a good source.
Not coded this tick; it is an ingest-filter change, not a monitoring-tick edit.

## Standing rejects, cost now measured on a third and fourth offer

- **`PWBGGD4THDQZYAY6`** (Syska power bank) — **rot #19, sixth instance.** In `tg-multi-seen.json`,
  no DB row, proven OutOfStock at ₹1,393 against a claimed ₹799. Six ticks have now resolved the
  same shortlink to the same dead end because the seen list stores an id and no verdict.
- **`SHOHGDNDGTQZHF2F`** (Asics via Shopsy) — fourth offer, and it is **not in the seen list at all**,
  because the standing rule says the file is not written. So this one re-resolves every single time.

These two are the entire argument for **owner decision #7** (persist a reject cache with a reason).
Six resolutions plus four resolutions is ten wasted shortlink fetches on two known-dead products.

## CEO audit

| Check | Result |
|---|---|
| Credential rule | **exercised and held, 6th time** — the Telegram service row surfaced a live login code in its preview. Skipped as a non-source chat. No value in this report, the terminal reply, the commit, or any file |
| Price accuracy of live rows | **3/3 exact** vs live Amazon — see table above |
| Stock on those rows | 3/3 in stock; no delist needed |
| Dedup | seen-list **and** live DB, both consulted; DB caught all three (seen list agreed) |
| Shortlink hygiene | foreign affiliate tags + Button `btn_*` params stripped at resolution |
| Rate limit | 5 resolutions, 2.6 s apart, browser UA; no 403/429, no backoff needed |
| IndexNow | **not run — nothing was pushed.** The freshness rule fires after a batch; there was no batch |
| `data/tg-multi-seen.json` | **not written** — standing rule, stays unstaged |
| tg-broadcast cursor | **not drained** — needs the owner's explicit go-ahead |
| Scratch hygiene (#11) | **clear (16th)** — `_tgd0920f.mjs` created and `rm -f`'d in the same Bash call |
| Artifacts | none — terminal + this file only |

### Rot flagged

- **NEW — bare-number channel posts are 2/2 wrong** when checked. Above. Cheapest new filter available.
- **Rot #19, sixth instance** — `PWBGGD4THDQZYAY6`. Escalating; it is now the most-repeated single
  waste in the tick loop.
- **`SHOHGDNDGTQZHF2F` re-resolves forever** because the seen file is never written — the reject
  cache and the seen file are the same missing feature.
- Carried, unchanged: 1,602 LIVE deals with no MRP (largest data gap, owner decision #6); Flipkart
  ld+json array root; Flipkart "Buy at ₹X" offer strip; Flipkart PDP curl → 403 reCAPTCHA while
  CLAUDE.md still claims plain-curl ld+json for non-Amazon; feedburner RSS dead while CLAUDE.md says
  RSS-first; `want` filter matching "SB Loots And Deals Help Bot"; deal 1536 slug ₹299 vs row ₹499;
  deal 7637 EXPIRED candidate; ~200 scratch leftovers under `apps/api/scripts/` (owner decision #5).

## Fixed inline this tick

**Nothing, and nothing was broken.** Zero new deals is the correct output when every candidate is
already live — publishing a fourth copy of the bamboo hair brush would be the failure, not the empty
result. Reporting the empty tick honestly rather than padding it.
