# TELEGRAM-DEAL-MONITOR tick — 2026-09-20b (IST)

**1 deal live.** Id **10719**, IndexNow **HTTP 200 for 4 urls**. First non-Amazon Telegram deal of
the day, routed through Cuelinks.

One sidebar sweep → 4 single-product candidates → 4 shortlinks resolved → 1 published, 3 rejected.

## Sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`, mapping each row to
`{t: .title h3, l: .subtitle .last-message}`. The chat list was not reloaded and no chat was opened.

| Outcome | Rows |
|---|---|
| Single-product candidates | **4** |
| Skipped | rest |

Skips: our own broadcast channel, loot and multi-product posts, category and sale-hub posts, bot
rows, DMs, chatter, and the **Telegram service row**.

**The service row stays a permanent skip.** It again surfaced a live login code in its
last-message preview. It is treated as a non-source chat — the value was not read into any
pipeline, and **no such value appears in this report, the terminal reply, the commit, or anywhere
else**. Standing credential rule, exercised a second time today.

## Shortlink resolution

`curl -sL -o /dev/null -w '%{http_code} %{url_effective}'`, **2.6 s apart**. Two new hosts this
tick, both previously listed as unhandled gaps in `ingest-common.mjs`.

| Shortlink | Resolves | Lands on |
|---|---|---|
| `bittli.in/…` | **yes** | Shopsy `/p/itm…?pid=VLUHMF9HTF8ZHG85` |
| `bitli.in/…` | **yes** | Amazon `/s?k=helmet…` (search page) |
| `amzn.to/…` | yes | Amazon `/dp/…` (Asics) |
| `fkrt.co/…` | resolves, 403 to curl | Flipkart `/p/itm…` |

### Finding: `bittli.in` / `bitli.in` carry the destination in a `dl=` query param

Both hosts resolve, but the useful URL is **not always the redirect target** — the landing page
carries the real destination in a `dl=` parameter, URL-encoded. Reading only
`%{url_effective}` gets an interstitial on some of these; reading `dl=` gets the product.

Two near-identical hostnames (`bittli.in` with the double-t, `bitli.in` with one) that behave the
same way is a typo trap waiting to happen in a hand-written handler. Whatever goes into
`ingest-common.mjs` should match both, and should prefer `dl=` when present and fall back to the
effective URL when it is not.

### The `/s?` assert fired on a resolved URL, not on the posted link

The helmet post's `bitli.in` link looked like a product link. It resolved to
`amazon.in/s?k=helmet…` — a **search results page**. Rejected.

This is the argument for asserting `/s?` / `/b/` **after** resolution rather than only on the
posted URL. A shortlink hides its destination by design; the pre-resolution check sees nothing to
reject.

## Rejects

| Item | Reason |
|---|---|
| Helmet (`bitli.in`) | resolved to `/s?k=` search page — not a product |
| Asics shoe (`amzn.to`) | **price drift** — live ₹10,199 |
| Flipkart item (`fkrt.co`) | already seen / dedup |

### The Asics ambiguity, stated rather than papered over

The channel post carried a bare `9689` near the product. Live buybox read **₹10,199**. Treating
`9689` as the advertised price gives a drift of ₹510 and a clean reject.

But `9689` may not be a price at all — it sits in the shape these channels use for **post ids**,
and no `₹` preceded it. So the honest position: **the reject is correct either way** (an
unverifiable claimed price is not publishable), but the *reason* recorded should be "claimed price
ambiguous / unverifiable", not "price drift ₹510". Writing it down as a confident drift figure
would be inventing a fact the post did not assert.

## Published — first Shopsy deal through Cuelinks

| | |
|---|---|
| **10719** | `savs-bike-chain-lube-150ml-pack-of-3-vluhmf9htf8zhg85` |
| Title | SAVS Bike Chain Lube 150ml (Pack of 3) at ₹252 (72% Off) – Shopsy |
| Price / MRP | **₹252** / ₹899 · −72% |
| Verify | `productLd()` — ld+json `Product.offers.price` = 252, **InStock**, drift **0** |
| productId | `VLUHMF9HTF8ZHG85` |
| Image | `rukminim3.flixcart.com/image/…/original-imahmf9hfvhvfk4s.jpeg` |
| Affiliate | `linksredirect.com/?cid=527&source=linkkit&url=<encoded shopsy /p/itm… url>` |
| Result | `{"count":1}`, `created:true` |
| Status | **LIVE** (DB read-back) |
| IndexNow | **HTTP 200 for 4 urls** (1 slug + `/`, `/offers`, `/sitemap.xml`) |

### Cuelinks routing proved by code, not assumption

`ingest-common.mjs` line 15 is the Cuelinks builder, and **there is no Shopsy branch anywhere in
the affiliate matrix**. Shopsy is neither Amazon nor Flipkart-proper (`/p/itm…` on
`flipkart.com`), so it falls through to the `else` arm exactly as the ALL STORES rule specifies.
Checked with `grep -a` — the file trips ripgrep's binary heuristic and `grep -n` returns
"Binary file … matches".

The image is a `rukminim3.flixcart.com` **product** CDN URL, not a `/promos/` banner. The Shopsy
image sweep has returned banners before; this one was checked.

## CEO audit

| Check | Result |
|---|---|
| New row populated | price, MRP, discount, image, productId, affiliate — no nulls |
| Title glyph | ₹ present, ` at Rs ` absent |
| Credential rule | **exercised and held** — service row skipped, nothing recorded anywhere |
| Rate limit | 2.6 s between shortlink resolutions; no 403/429 except the known `fkrt.co` bot-block |
| Source text | description written fresh; no channel text reused |
| Scratch hygiene (#11) | payload lives in the session scratchpad, outside the repo |
| Rot #4 (cursor drift) | grew by 1 more |

### Standing gaps re-evidenced

- **`bittli.in` / `bitli.in` handling** — both resolve, both need the `dl=` param read, both need
  matching in one pattern. Unhandled in `ingest-common.mjs`.
- **Post-resolution `/s?` assert** — the helmet reject only happened because resolution came first.
- **`amzn.lt` still dead**, reconfirmed. Feeds owner decision #8.
- **Reject cache (#7)** — the Asics ambiguity is precisely the kind of verdict that will be
  re-derived blind on every future tick, and possibly re-derived differently.

## Not done

`data/tg-multi-seen.json` (now **1,757**) stays unstaged per the standing rule. The tg-broadcast
cursor was **not** drained — that needs the owner's explicit go-ahead.
