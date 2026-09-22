# TELEGRAM-DEAL-MONITOR tick 2026-09-22o

**Run:** 2026-09-22 10:21–10:27 IST · richdeals.in · inline (not subagent)
**Result:** **1 published** (#10864, Lakmē sunscreen ₹173), 1 rot fix (#3961, stale on price + MRP + pct + title), IndexNow **HTTP 200 / 5 urls**, 1 exact-match dedup drop, 3/3 shortlinks resolved.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, ~1k tokens, no chat switching (`browser_tabs list` showed the Telegram tab still parked on CoolzTricks, so no trusted click was needed). All 13 roster groups from `data/tg-groups.json` covered.

| # | Group | Newest post | Disposition |
|---|---|---|---|
| 1 | CoolzTricks Official | Lakmē sunscreen `173 : amzn.to/47aJ7um` **+** CC cream `171 : amzn.to/4xDU3M8` | **2 candidates** |
| 2 | Dealzone | Smart & Handsome face wash, `link.amazon/B0d5hIlHP` | candidate → DB dup #3262 |
| 3 | SB Loots And Deals | "Branded Earbuds & Neckbands Starts @830" | skip — multi-brand starts-at, and all 4 links are dead `amzn.lt` |
| 4 | Rogerkart Deals | Zivame sale hub | skip — sale hub |
| 5 | Dealdost | loot/category `fkrt.cc` | skip — loot/category |
| 6 | ONLINE SHOPPING DEALS | Clensta shampoo (same post as tick n) | skip — dispositioned last tick (#10837) |
| 7 | INDIAN CHEAP DEALS | Ladies Handbag (same post as tick n) | skip — dispositioned last tick (#7110) |
| 8 | Loot Deals 24x7 | Syska power bank (same post as tick n) | skip — dispositioned last tick |
| 9 | IndiaFreeStuff Tips & Tricks | Swiggy search trick | skip — search trick |
| 10 | Hidden Loot Deals & Offers | Zepto search trick | skip — search trick |
| 11 | Deal Dibba | t.me join links | skip — join-bait |
| 12 | OMG LOOTDEALS | "Video dekho paisa kamao" | skip — not a deal |
| 13 | NonStopDeals | no row in this sweep | no post |

3 link candidates, 10 skips. Two non-roster rows (LATEST IPHONE RATES, and RichDeals — our own channel) ignored.

> The sweep again returned the `Telegram` service chat (id `777000`) carrying a live login code. It is a credential: not echoed, not acted on, not recorded here or in the commit.

### One message, two products — not a multi-product skip

CoolzTricks posted `173 : amzn.to/47aJ7um` and `171 : amzn.to/4xDU3M8` in the same message. The multi-product skip rule exists for bundles and "starts at" category posts, where no single price maps to a single PDP. That is not this: each link is its own `/dp/ASIN` with its own price and its own MRP. Both were carried forward as separate candidates. The rule is about whether a link resolves to one buyable product, not about how many links share a message.

---

## Shortlink resolution — 3 of 3, all HTTP 200

`curl -sL -o /dev/null -A "<browser UA>" -w '%{http_code}\t%{url_effective}'`.

| Shortlink | Resolves to | Their tag (stripped) |
|---|---|---|
| `amzn.to/47aJ7um` | `/dp/B0744R95BT` | `collab-amafhh-21` |
| `amzn.to/4xDU3M8` | `/dp/B01BBNF6NK` | `collab-amafhh-21` |
| `link.amazon/B0d5hIlHP` | `/dp/B0B4GYZ4FR` | `glitzdeal05-21` |

`B0d5hIlHP` ≠ `B0B4GYZ4FR` — the shortlink-code-is-not-the-ASIN rule holds again.

---

## Dedup — 3 → 1 publish, 1 audit, 1 drop

`data/tg-multi-seen.json` (1794 entries at read) + live DB by `productId`.

| productId | seen | DB | Verdict |
|---|---|---|---|
| B0744R95BT | false | none | **fresh → publish** |
| B01BBNF6NK | false | #3961 LIVE ₹196 | channel says 171 — **rot suspect, audit** |
| B0B4GYZ4FR | true | #3262 LIVE ₹127 | drop — channel also ₹127, exact match |

---

## PDP verification

Both ASINs read via same-origin `fetch(url,{credentials:'include'})` + `DOMParser` from the open `amazon.in` tab, both under the same `?th=1&psc=1` as their image.

| ASIN | Channel | PDP price | MRP | `.savingsPercentage` | `#availability` | Note |
|---|---|---|---|---|---|---|
| B0744R95BT | 173 | **₹173.00** | ₹395 | −56% | In stock | "Lowest price in 30 days"; no coupon; `.pricePerUnit` `(₹346 /100 g)` |
| B01BBNF6NK | 171 | **₹171.00** | ₹399 | −57% | In stock | `.pricePerUnit` `(₹570 /100 g)` |

Images measured under the same URL as the price:
- B0744R95BT → `51e1sHG5-UL._SL1000_.jpg` (19 hiRes entries)
- B01BBNF6NK → `515hnjs208L._SL1000_.jpg` (17 hiRes entries) — already the image on #3961, no change needed

Both channel prices exact. `#availability` "In stock" on both, so neither trips the stock-depth reject that killed the last two ticks' candidates.

### `.a-offscreen` lied again — worse than usual

`#corePriceDisplay_desktop_feature_div .a-price .a-offscreen` returned:

- B0744R95BT → `[" ", "₹346", "₹395"]`
- B01BBNF6NK → `[" ", "₹570", "₹399"]`

A blank, **the per-unit rate**, and the MRP. The selling price is in neither list. Reading `offscreen[1]` would have published a ₹346 sunscreen at a ₹395 MRP — a plausible-looking 12% deal that is off by 2x. The real figures came only from `#centerCol` innerText: `"₹173.00 with 56 percent savings -56% ₹173 ₹346.00 per g(₹346₹346 /100 g) M.R.P.: ₹395.00"`.

Also re-learned: a 300-char slice of the head of `#centerCol` misses the price entirely — the top of that node is inline CSS/JS. The working read is `cc.innerText.replace(/\s+/g,' ')`, then `indexOf('₹')`, then slice `[i-60, i+160]`.

---

## Published — #10864

| Field | Value |
|---|---|
| slug | `lakme-water-light-gel-sunscreen-spf-50-niacinamide-50g` |
| price / mrp / pct | ₹173 / ₹395 / 56% (`round(1 − 173/395)`, matches PDP −56%) |
| isSuper / isHot | true / true |
| image | `m.media-amazon.com/…/51e1sHG5-UL._SL1000_.jpg` |
| affiliate | `/dp/B0744R95BT?th=1&psc=1&tag=ashoksachdev-21` |

Description written from the product's own spec sheet (SPF 50 = UVB, PA++++ = UVA, gel-water base, niacinamide, dosing) — no channel text, no source text. `priceHistory` row written. Pre-flight (title-₹ vs numeric price, price < mrp, pct recompute, CDN image host) passed.

---

## CEO rot fix — #3961

`lakme-9to5-cc-cream-bronze-spf30-30g-b01bbnf6nk`, last touched 2026-09-14.

| Field | Before | After |
|---|---|---|
| price | 196 | **171** |
| mrp | **653** | **399** |
| discountPct | 70 | **57** |
| title | "… at Rs.196 – Amazon" | "… at ₹171 – Amazon" |
| isSuper / isHot | true / true | true / true (171 ≤ 250) |

Three fields stale at once, not one. This is worse than last tick's #6063, where the MRP was already right: here the MRP was **₹653 against a real ₹399**, which means the 70% discount we were advertising was manufactured out of a wrong list price. A wrong MRP is the more damaging of the two errors — a wrong price disappoints on click, a wrong MRP is a false savings claim in the Offer schema.

`discountPct` recomputed (`round(1 − 171/399) = 57`, matches the PDP's own −57%) rather than carried. A `priceHistory` row was written. The title's `Rs.196` token was replaced and then re-diffed against the numeric price before the write.

Note `description` is 157 chars — under `dealIndexable()`'s 200-char "valuable" threshold — so this row's sitemap eligibility rests entirely on `discountPct >= 20`. At 57 it clears, so the fix keeps the page indexable. Had the real discount come out under 20, fixing the price would have dropped the page from the sitemap; worth knowing before the next such fix.

**Second consecutive tick where the correction came out of a dedup hit, not a price audit.** The channel reposting a product we already carry is a free liveness check on our own row, and this one had been 8 days stale. Dedup hits are not dead ends — they are the cheapest rot detector we have, and two-for-two now.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 5 urls** — new slug + fixed slug + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`; #10864 is a new URL and enters on the next revalidate (`discountPct 56 ≥ 20`, price + image present, age 0 → passes `dealIndexable()`) |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page |

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 is a 1-post day, below the 2-3 target |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,517 (was 10,516) | +1 = this tick's publish, accounted |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | 1,625 | carried — needs a dedicated backfill pass, not a Telegram tick |
| null discountPct | 1,602 | carried — same |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10863` vs DB max `10864` | **not rot** — the gap is exactly #10864, created 2 min ago; the external broadcast cron picks it up on its next run and the cursor self-heals |
| unpushed commits | 0 (before this tick's commit) | clean |

`nullMrp 1,625` / `nullPct 1,602` are unchanged from tick n and stay flagged, not fixed: 1,625 rows means 1,625 PDP reads. The #3961 fix above is the argument for prioritising it — a null MRP is a missing signal, but a **wrong** MRP is an active false claim, and the only way we find those today is by accident, when a channel happens to repost something we carry.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the one to check for deal-batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** The card price is post-clip-coupon, not wrong. Their rule text — flagged, not edited.
3. **CLAUDE.md names `amzn.lt` as a live shortener.** DNS-dead since tick n (curl exit 6). Cost this tick 4 more dead SB Loots links.
4. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile** reads `loggedIn:false` again. Flag only; fixing it means touching owner credentials, and the PDP read path does not depend on it.
