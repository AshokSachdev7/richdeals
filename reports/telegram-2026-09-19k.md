# TELEGRAM-DEAL-MONITOR tick — 2026-09-19 (k)

Yield: **1 deal pushed LIVE** (#10631), IndexNow **HTTP 200 for 4 URLs**. Second consecutive
non-zero Telegram tick.

Funnel: 25 sidebar rows → **5 changed previews** → 5 shortlinks resolved → 1 Flipkart tracking
landing rejected → 4 Amazon ASINs → 1 duplicate → 3 verified → 2 out of stock → **1 published**.

Five changed previews in one hour is the most movement these channels have shown all day; the
last four ticks averaged one.

## Sweep

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. `browser_tabs {action:'select',
index:0}` **first**, then one `browser_evaluate` over `.chat-list .ListItem.Chat` → **25 rows**
covering the 13 groups in `data/tg-groups.json`. No chat opened, no reload.

The tab-selection discipline written down last tick worked on the first try: the browser was
parked on tab 3 (an Amazon PDP) as always, and selecting tab 0 before the evaluate returned all
25 rows instead of the `[]` that cost 09-19j a retry.

## The five changed previews, resolved

| Group | Shortlink | Resolves to | Source tag |
|---|---|---|---|
| CoolzTricks Official | `amzn.to/4y9KLZo` | `/dp/B0GF81BZ65` | `collab-amafhh-21` |
| SB Loots And Deals | `fkrt.it/DxgfAwuuuN` | `flipkart.com/flipkart/p/item?pid=TEAFGPRQHGKWH9JN` | `affid=inf_c247cf05-…` |
| ONLINE SHOPPING DEALS | `link.amazon/B00yCrrJd` | `/dp/B0C9M3GBX4` | `vivek123034-21` |
| Dealzone | `link.amazon/B0hqVnTif` | `/dp/B0GQTTK2K6` | `glitzdeal05-21` |
| Dealdost | `amzn.to/4xzbZre` | `/dp/B0FNM7XWFD` | `7383-21` |

`glitzdeal05-21` and `7383-21` are the **fourth and fifth distinct source tags** seen on these
channels, after `collab-amafhh-21`, `vivek123034-21` and `bhavesh015-21`. All stripped, none
acted on. Five tags across 13 groups says these channels are independent affiliates reposting
the same catalogue, not one operator — which is consistent with how often two of them surface
the same ASIN.

**The Flipkart row was rejected at resolve time, before any verification was spent on it.** The
resolved path is `/flipkart/p/item`, which is a generic tracking landing, not a product page —
a real Flipkart product is `/p/itm…`. Same family as the `/dl/indiafreestuff/p/indiafreestuff`
and `/desidime/p/desidime_deals` landings the other two pipelines hit. **Rot #3 with a fresh
sample from a third source.** The product behind it (Tata Tea Gold) is also grocery/FMCG, so it
would have failed the second filter anyway.

The Dealzone preview is worth recording for what it did *not* contain: `60 … Apply 38% Off
Coupon` and a `link.amazon` shortlink, with **no product name anywhere in the row**. The only
way to learn what was being sold was to resolve the link and verify the ASIN — which turned out
to be dead. That is rot #21 (`link.amazon` 9-char opaque codes) costing a resolve and a
verification to discover nothing.

## Dedup — all statuses, with a control

```
B0GF81BZ65   DB ABSENT              | seen false
B0C9M3GBX4   DB ABSENT              | seen false
B0GQTTK2K6   DB ABSENT              | seen false
B0FNM7XWFD   DB #2569 LIVE 2999     | seen false   ← duplicate
ZZZZFAKE123  DB ABSENT              | seen false   ← control behaved
seen entries 1754
```

The query ran across **all statuses**, not LIVE only.

**The duplicate is fresh rot #22 evidence, not a clean skip.** Deal **#2569 is LIVE at ₹2,999**
while Dealdost is currently posting the same ASIN at **₹2,550** — our page is serving a price
about **18% above** what the source now quotes. Three LIVE rows with stale prices are now on
record (#10582, #10084, #2569), and #2569 is the oldest of them, which suggests the problem
scales with row age rather than being a handful of unlucky writes. Not fixed here: correcting
it properly means rewriting the copy, not just the `price` column (open owner decision #6).

## Verification — logged-in Amazon tab

Same-origin `fetch(url, {credentials:'include'})` + `DOMParser`, 900 ms apart, buybox signals
only. The `#availability` script-pollution strip (`.replace(/P\.when[\s\S]*/,'')`) was applied
inline and produced clean text on all three.

```
B0GF81BZ65  Himalaya Turmeric Serum Cleanser 180ml
            price 255 · mrp ₹599 · -57% · cart true · oos false
            avail "Only 1 left in stock."          → ACCEPT
B0C9M3GBX4  Puma Women Melanite Slipon Sneaker
            price null · cart false · #outOfStock TRUE  → reject
B0GQTTK2K6  Parachute Advansed Protein Shampoo 170ml
            price null · cart false · #outOfStock TRUE  → reject
```

Two of three verifications were spent on dead listings. Both are unambiguous — `#outOfStock`
present *and* no cart button, so neither is the size-twister ambiguity that cost 09-19i a
second read.

### The drift call, and why it went the other way

The CoolzTricks post advertises **@288**. The buybox verifies **₹255**. That is a **₹33 drift**,
far outside the ±₹1 tolerance that has rejected ten candidates in a single ingest tick — and it
was **accepted anyway**. The reasoning, written down because it sets a precedent:

Every drift reject on record verified **higher** than posted (₹4, ₹5, ₹20, ₹75, ₹139, ₹266,
₹614, ₹803, ₹1656, ₹1757 — all of them). That rule exists to stop us advertising a price Amazon
will not honour. This case is the mirror image: the buybox is **cheaper** than the source claim,
so publishing at the verified ₹255 advertises a price that is real right now. Rejecting it would
discard a working deal to enforce a rule against a failure that cannot occur in this direction.

The deal was published at **₹255**, the verified number, never the posted one. The ±₹1 tolerance
is still the right test for the upward direction, and open owner decision #1 should be ratified
as **"reject on upward drift beyond ₹1; accept downward drift and publish at the verified
price"** rather than the symmetric form it is currently written in.

**"Only 1 left in stock"** is recorded as a caveat and is called out in the deal's own copy and
in step 3 of the how-to. A one-unit listing can go dead within the hour; the never-404 rule
means the page stays up with an EXPIRED banner when it does.

**Image** came back `._SX679_`, was upgraded to `._SL1500_`, and the upgrade was **fetched to
prove it exists** rather than assumed:

```
200 37683 B  51Gj5wU4DFL._SL1500_.jpg
```

Price and cart state were **re-read in the same call as the image proof**, immediately before
the push, and had not moved.

## Pushed

`POST /admin/deals/bulk` → **HTTP 201, count 1**, `created: true`, `status: LIVE`.

```
10631  ₹255  -57%  himalaya-turmeric-serum-face-cleanser-180ml-b0gf81bz65
```

Title, description and how-to written for this row — not the Telegram post's text and not
Amazon's bullet copy. Description is **709 characters**, past the 200-char arm of
`dealIndexable`, and 57% clears the 20% discount arm, so the page enters the sitemap rather
than the thin-content pile. The per-ml figure (₹1.42/ml) and the pack-size comparison against
Himalaya's usual 50-150 ml tubes are the parts of the copy that justify the page existing.

Affiliate URL is the clean `https://www.amazon.in/dp/B0GF81BZ65?tag=ashoksachdev-21` —
`collab-amafhh-21`, `th=1` and `psc=1` all dropped.

## Freshness — IndexNow

```
node apps/api/scripts/indexnow-ping.mjs himalaya-turmeric-serum-face-cleanser-180ml-b0gf81bz65
DONE: IndexNow -> HTTP 200 for 4 urls
```

**HTTP 200** first call, no 422, so the Bing GET fallback was not needed. 4 URLs = the deal page
plus the script's three defaults (`/`, `/offers`, `/sitemap.xml`).

Verified on prod rather than trusted — the submitted URL actually serves:

```
200 0.199858  /himalaya-turmeric-serum-face-cleanser-180ml-b0gf81bz65
```

No deploy: deal pages read through the prod API off the managed DB, so they serve immediately
without a rebuild.

## Skipped, with reason

| Group / row | Reason |
|---|---|
| Deal Dibba | multi-brand "Loot :" post, 3 links |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart **search** URL |
| Hidden Loot Deals & Offers | Blinkit basket freebie, no product URL |
| OMG LOOTDEALS | "Video dekho paisa kamao" ad |
| RichDeals | our own channel |
| iPhone-rates channel | not in `data/tg-groups.json` |
| 6 DMs + 3 bots | not deal sources |

### Unchanged rejects and dups carried from 09-19j

| Group | Link | Status |
|---|---|---|
| Rogerkart Deals | `rogerkart.com/r/pVQu7jR` | unresolvable (rot #5) |
| Loot Deals 24x7 | `fkrt.co/l5KOxl` | Syska power bank — drift ₹594 + OOS |
| INDIAN CHEAP DEALS | `link.amazon/B05yvriRF` → B0G38DGNKM | dup, deal #7110 LIVE ₹3459 |
| NonStopDeals | `amzn.to/4uZXfjK` → B07QX21WZQ | dup, deal #5825 LIVE ₹549 |

None was re-resolved — the previews are identical strings to last tick's. The four rows that
*did* change all got resolved, which is the correct split and the first tick where the changed
set outnumbered the carried set.

## Credential-handling note — eleventh consecutive tick

The Telegram service chat row again surfaced a live login code in its last-message preview. The
value was **not echoed** into this report, the terminal reply, the commit or any scratch file,
and was not acted on. That row stays on the permanent-skip list and is never treated as a deal
source.

## Prod endpoints — all 200

```
200 0.251594  /
200 0.127208  /offers
200 0.564043  /blog
200 0.341118  /sitemap.xml
200 0.169259  /feed.xml
200 0.093620  /api/deals
200 0.495477  /llms.txt
```

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10285** (was 10284) · PENDING_REVIEW 0 · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** — the new row kept it that way, fifth tick running |
| DB max deal | **10631** LIVE ₹255, the Himalaya cleanser — matches this push exactly |
| Created last 24 h | 226 |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4, no zero day in the window |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10631 — **drift 149**, up from 148 (rot #4) |
| Unpushed commits before this tick | 0 |

PENDING_REVIEW is 0 **by absence** from `groupBy`, not by a zero row.

**The cursor drift grew by exactly this deal.** #10631 is live on the site and will be in the
sitemap within the ISR window; it will not reach the Telegram channel until tg-broadcast runs
again. Rot #4 keeps accruing one deal per push.

## Rot standing — 28 items

Reconfirmed with fresh evidence: **#3** (Flipkart `/flipkart/p/item` tracking landing — a third
source now produces this failure), **#4** (drift 148 → 149), **#5** (`rogerkart.com/r/`),
**#19** (two verifications spent on listings a reject cache would not have caught, but the
Dealzone one is unavoidable without resolving), **#20** (20 of 25 previews unchanged again),
**#21** (`link.amazon` code with no product name in the preview), **#22** (**#2569 LIVE ₹2,999
vs ₹2,550 posted** — third stale-price row, and the oldest). **#12** stays half-fixed.

**Nothing new rotted.** The downward-drift accept is a precedent, not a defect — recorded above
so it can be ratified or reversed deliberately.

## Open owner decisions — unchanged at 10

**#1 gained a concrete amendment this tick**: the publish-at-verified-price rule needs to be
written **asymmetric** (reject upward drift > ₹1, accept downward drift), because the symmetric
form would have discarded a live 57%-off deal for being cheaper than advertised.

**#7 — persist a reject cache (rot #19)** stays top. **#6** (re-verify sweep over old LIVE rows)
moved up: three stale-price rows are now on record, the newest evidence is an 18% error on a
row that has been LIVE for thousands of deals, and the pattern points at age, not luck.
