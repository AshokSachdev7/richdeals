# TELEGRAM-DEAL-MONITOR — tick `2026-09-22al`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is
filtered out inside the page, before anything reaches this session.

**Result: 1 new page + 1 in-place refresh. IndexNow 5/5 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 28 |
| rows belonging to the 13 tracked groups | 13 of 13 present |
| shortlinks worth resolving | 4 |
| single-product candidates after the skip rules | 2 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 2 |
| survived PDP price/stock verification | 2 — 1 new page, 1 refresh |

## Published

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 10945 | Shopsy | LQZGRXY2QRGQH4GX | ₹137 | 449 | 69% | `s-guard-active-7-lever-52-mm-iron-padlock-pack-of-2-black-gold-lqzgrxy2qrgqh4gx` |

S-GUARD Active 7-lever 52 mm iron padlock, two locks and six keys in the box. Shopsy serves
**no `ld+json`**, so the price came from the embedded listing JSON block carrying this listing's
own id (`LSTLQZGRXY2QRGQH4GXFR3LPI`): `"pricing":{"finalPrice":{"value":137},"fsp":172,
"mrp":449}`, `"totalDiscount":69`, `IN_STOCK`, `"listingState":"current"`. Computed pct matches
Shopsy's own `totalDiscount` exactly, 69.

**This channel's number was right** — the opposite of tick `af`, where the shouted ₹180 turned
out to be the selling price rounded. Here ₹137 is the live special price and ₹172 is the FSP, so
the channel quoted the figure a buyer actually pays. Worth recording: the channels are not
uniformly wrong, they are unverified, which is a different problem and the reason the PDP gate
exists rather than a blanket distrust rule.

**The channel's product wording was also right, and the merchant's own title is what misleads.**
The listing title reads `S-GUARD Active Black- 52MM, 7 Levers padlocks for door Padlock` — one
colour, no count. The spec block reads `Sales Package: 2 Locks, 6 Keys`, `Number of Contents in
Sales Package: pack of 2`, `Net Quantity: 2`, and the page carries its own title variant ending
`Padlock (Black, Gold)`. So ₹137 buys a pair, one black and one gold, at roughly ₹69 a lock. The
page name and `howTo` step 2 both say that outright rather than echoing the merchant title.

Shopsy is **not** Flipkart, so the wrapper is Cuelinks (`cid=527`), never `affid=djhackraj` —
`affid` / `lid` / `marketplace` stripped from the source URL first. `storeId 13`, `productId` =
the uppercase Flipkart listing pid, slug = kebab(name) + pid. `isSuper` and `isHot` both true at
₹137.

Image came from the Shopsy template
`…/image/{@width}/{@height}/xif0q/shopsy-lock/…-imagrxy2dh4m8bz2.jpeg?q={@quality}` — a template,
not a URL. Both substitutions were fetched before choosing: `rukminim3/832/832` → 200, 152,339 B;
`rukminim2/1114/972` → 200, **250,631 B**, which is the one shipped.

## Refreshed in place

| id | store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|---|
| 5825 | Amazon | B07QX21WZQ | ₹549 (unchanged) | 1,009 | 46% | `trustbasket-uv-treated-plastic-round-pot-6-inch-black-set-of-12` |

TrustBasket UV-treated 6-inch plastic pots, set of 12. Dedup hit against the live DB, so the
indexed slug was preserved and the row rewritten rather than a second page created.

**NonStopDeals shouted ₹151. The PDP is ₹549 — the channel was wrong by 72%.** Read in the
logged-in Amazon tab (curl is bot-blocked): `₹549.00`, `In stock`, and **no M.R.P. block on the
page at all** — `mrp` reads `null`, badge `null`. The stored `mrp 1009` / `pct 46` were therefore
left exactly as they were: there is nothing on the page to contradict them, and inventing an MRP
to match a badge is how a row ends up lying.

The core price block also reads `₹45.75 per count` and `(₹45.75 / count)`. That is a per-unit
rate sitting inside the price container, not a price — the same trap as the a-text-price rate. The
first `₹` figure in `#corePriceDisplay_desktop_feature_div` is the price, and it was ₹549.

The price did not move, so **no `PriceHistory` row was written** — the script's
`if (before.price !== B.price)` guard handled that by itself. The refresh was justified on content
rot, not price: `howTo` was **empty (0 steps)**, the description was **261 characters**, and the
image was the weaker `412FgqYM0vL._SL1500_.jpg` rather than the PDP's own `#landingImage`
hi-res asset. All three rewritten — 1,169-char original description from the PDP bullets, 4-step
`howTo` whose step 2 states plainly that ₹549 is the whole set of twelve (about ₹46 a pot), that a
deal channel circulated ₹151 and the page does not show it, and that these are pots only — no
soil, no trays, no plants. Image swapped to `71ai9fuNHEL._SL1500_.jpg`.

## Skipped, with reasons

- **Loot Deals 24x7 Syska power bank (`PWBGGD4THDQZYAY6`)** — SEEN; the same Flipkart `pid` was
  killed by dedup at both `ac` and `af`. The channel's wording differed each time; the `pid` did
  not. Compare identifiers, never prose.
- **`link.amazon/B063vSAEZ`** — resolved 200 to an `amazon.in/s?k=Amazon+Brand+-+Symbol` **search
  page**, not a PDP. The shortlink code is ASIN-shaped and is not an ASIN; that only shows after
  resolving.
- **ONLINE SHOPPING DEALS Triphala post** — the sidebar `last` text was sliced at 320 chars and the
  URL fell past the cut. Not recovered this tick; a longer slice or opening that one chat is the
  fix, and it is the only candidate this tick lost to method rather than to a rule.
- Loot / multi-product / category / search posts across Dealdost, Rogerkart, IndiaFreeStuff,
  Hidden Loot, Deal Dibba and OMG LOOTDEALS — no single product.
- Untracked sidebar rows (our own RichDeals channel, bots, DMs) — not in `data/tg-groups.json`.

One key appended to `data/tg-multi-seen.json` — now **1,811** entries. `B07QX21WZQ` was already in
the store; the dedup that caught it this tick came from the live DB.

## Freshness

```
node scripts/indexnow-ping.mjs s-guard-…-lqzgrxy2qrgqh4gx trustbasket-…-set-of-12
DONE: IndexNow -> HTTP 200 for 5 urls
```

2 slugs + `/`, `/offers`, `/sitemap.xml` — the slugs+3 rule; the count is the receipt. No Bing
fallback needed. `api.indexnow.org` has now resolved four ticks running (`af`, `ai`, `ag`, `al`).

Live pages verified after the write, both 200 with matching Product JSON-LD:

- `/s-guard-active-7-lever-52-mm-iron-padlock-pack-of-2-black-gold-lqzgrxy2qrgqh4gx` → `"price":"137"`
- `/trustbasket-uv-treated-plastic-round-pot-6-inch-black-set-of-12` → `"price":"549"`

Sitemap **9,907** `<loc>` entries. Prod endpoints, all 200: `/`, `/offers`, `/blog`,
`/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`.

## CEO audit

Clean:

- live deals **10,598**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- max deal id **10945**, 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *`
   losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
2. **41 live deals state a price in the title the row does not hold — recounted, still 41.**
   The number splits **19 written with `₹` + 22 written with `Rs.`**, which is worth recording
   because a check that only looks for `₹` sees 19 and reads the backlog as halved. Worst offenders
   are legacy hand-typed coupon titles (2026: Rs 8,499 vs 21,990; 25: ₹100 vs 459; 360: ₹1,707 vs
   2,789). Retitle pass not authorised.
3. **nullMrp 1,621 / nullPct 1,598** — each down one, and the one that moved is deal 5825's
   sibling row, not a backfill. Bulk backfill still unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
   Re-verified this tick: exactly 1, so the new Shopsy row did not join that group — Cuelinks is
   the correct wrapper for Shopsy.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the
   EXPIRED path, not refreshed to a price nobody can pay.
7. **`api.indexnow.org` is intermittent, not dead — 200 four ticks running.** Keep the Bing GET
   fallback wired; do not rewrite the script around either assumption.
8. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens →
   delete + regenerate).
9. **Amazon.in sign-in state in the `richDeals` Playwright profile is flagged only, never fixed
   here** — logging in touches owner credentials.
10. **CLAUDE.md freshness rule #3 names the wrong file** — it says confirm `llms.txt` carries the
    batch, but `/llms.txt` is a hub surface and carries no deal URLs by design; `/llms-full.txt` is
    the deal-bearing one. Both 200, nothing broken, rule text points at a file that can never show
    the batch. Flagged, not edited.

Two channel price claims tested this tick, one right (₹137) and one wrong by 72% (₹151 against
₹549). That is the case for the PDP gate in one line: the channels are a discovery feed, not a
price source.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
