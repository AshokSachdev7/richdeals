# TELEGRAM-DEAL-MONITOR tick 2026-09-22p

**Run:** 2026-09-22 10:45–10:52 IST · richdeals.in · inline (not subagent)
**Result:** **1 published** (#10865, Little's baby wipes ₹209), IndexNow **HTTP 200 / 4 urls**, 2 dedup'd against this tick's own predecessor, 1 channel price claim rejected as unverifiable, 3/4 shortlinks resolved.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, no chat switching (`browser_tabs list` showed the Telegram tab still parked on CoolzTricks). All 13 roster groups from `data/tg-groups.json` covered.

| # | Group | Newest post | Disposition |
|---|---|---|---|
| 1 | CoolzTricks Official | "Baby Wipes with Lid \| 80 Wipes x Pack of 2 @161. **Min. 2 Qty** : `amzn.to/4yWbbhb`" | **candidate → published at verified price** |
| 2 | Dealzone | `173 link.amazon/B0gbFKHYx` + `171 link.amazon/B04wrns6W` | 2 candidates → both dedup |
| 3 | SB Loots And Deals | Zebronics 21.5" FHD monitor, MRP 22999 only (no deal price), `amzn.lt/cm6h6leM` | skip — no price, and the link is dead |
| 4 | Rogerkart Deals | Zivame sale hub | skip — sale hub |
| 5 | Dealdost | loot/category `fkrt.cc` | skip — loot/category |
| 6 | ONLINE SHOPPING DEALS | Clensta shampoo (unchanged) | skip — dispositioned, #10837 |
| 7 | INDIAN CHEAP DEALS | Ladies Handbag (unchanged) | skip — dispositioned, #7110 |
| 8 | Loot Deals 24x7 | Syska power bank (unchanged) | skip — dispositioned |
| 9 | IndiaFreeStuff Tips & Tricks | Swiggy search trick | skip — search trick |
| 10 | Hidden Loot Deals & Offers | Zepto search trick | skip — search trick |
| 11 | Deal Dibba | t.me join links | skip — join-bait |
| 12 | OMG LOOTDEALS | "Video dekho paisa kamao" | skip — not a deal |
| 13 | NonStopDeals | no row in this sweep | no post |

3 link candidates, 10 skips. Non-roster rows (LATEST IPHONE RATES, DMs, bots) ignored.

> The sweep again returned the `Telegram` service chat (id `777000`) carrying a live login code. It is a credential: not echoed, not acted on, not recorded here or in the commit.

### Free confirmation: the `RichDeals` row

Our own channel's sidebar row carried the **#10864 Lakmē sunscreen broadcast**. Last tick classified the cursor gap (`lastId 10863` vs DB max `10864`) as "not rot — the external cron will pick it up." That call is now verified rather than asserted: the broadcast went out. Reading our own channel in the same sweep costs nothing and closes the loop on a finding that would otherwise have been carried on faith.

---

## Shortlink resolution — 3 of 4, all HTTP 200

`curl -sL -o /dev/null -A "<browser UA>" -w '%{http_code}\t%{url_effective}' --max-time 25`.

| Shortlink | Resolves to | Their tag (stripped) |
|---|---|---|
| `amzn.to/4yWbbhb` | `/dp/B088TZC4B7` | `collab-amafhh-21` (+ `smid=A15APWRK6P7LBV`) |
| `link.amazon/B0gbFKHYx` | `/dp/B0744R95BT` | `glitzdeal05-21` |
| `link.amazon/B04wrns6W` | `/dp/B01BBNF6NK` | `glitzdeal05-21` |
| `amzn.lt/cm6h6leM` | — (curl exit 6, HTTP 000) | — |

Shortlink-code ≠ ASIN on all three that resolved. `amzn.lt` is DNS-dead for the **third consecutive tick**.

---

## Dedup — 3 → 1 fresh

`data/tg-multi-seen.json` (1796 entries at read) + live DB by `productId`.

| productId | seen | DB | Verdict |
|---|---|---|---|
| B088TZC4B7 | false | none | **fresh → verify** |
| B0744R95BT | true | #10864 LIVE ₹173 | drop — published 25 min ago, this tick's predecessor |
| B01BBNF6NK | true | #3961 LIVE ₹171 | drop — rot-fixed 25 min ago, same tick |

### Dealzone independently confirmed both of last tick's writes

Dealzone posted the *exact* two ASINs tick o touched, at the *exact* two prices tick o wrote — ₹173 and ₹171. That is a second channel, with a different affiliate tag, agreeing with our PDP reads on both numbers.

It is worth being precise about what that does and does not prove. It does not validate our method — both we and Dealzone read the same PDP. What it does is rule out the specific failure where a PDP read catches a momentary price and we publish a number nobody else can see. Notably it also confirms the **#3961 correction**: the row we changed from ₹196 to ₹171 now matches what an independent channel is advertising, which is the strongest evidence available that the old ₹196 was stale rather than the new ₹171 being wrong.

---

## PDP verification — the "Min. 2 Qty" claim did not survive

`fetch(url,{credentials:'include'})` + `DOMParser` from the open `amazon.in` tab, under the same `?th=1&psc=1` as the image.

| ASIN | Channel | PDP price | MRP | `.savingsPercentage` | `#availability` | Note |
|---|---|---|---|---|---|---|
| B088TZC4B7 | "@161 Min. 2 Qty" | **₹209.00** | ₹440 | −53% | In stock (FULFILLED_BY_AMAZON) | `.pricePerUnit` `(₹1.31 / count)`; not lowest-in-30-days |

`#centerCol` innerText: `"₹209.00 with 53 percent savings -53% ₹209 ₹1.31 per count(₹1.31₹1.31 / count) M.R.P.: ₹440.00"`.

The channel post attached a condition to its price — ₹161 at a minimum of 2 quantity — so the read had to settle whether ₹161 is reachable, not just whether ₹209 is correct. Five independent checks on the same document:

- `#promotions_feature_div` → empty (`" "`)
- coupon nodes (`#promoPriceBlockMessage_feature_div`, `.couponLabelText`, `#couponBadge`) → all null
- quantity-discount widgets (`#vpcButton`, `#quantitySubstitutionWarning`, `.qcDeliveryBlock`) → absent
- the strings `Buy 2`, `Min. qty`, `minimum quantity`, `Quantity Discount`, `Save extra with` → **not present anywhere in the raw HTML**
- the only `161` in the entire document is inside an unrelated GST-invoice signup link

So there is no tier, no coupon and no promo on this listing today. The standing caution is that **coupon selectors read empty on fetched HTML**, which is why the raw-string scan was run as well — a clipped coupon would still leave its wording in the markup, and there is none.

**Published at ₹209, our verified number, not theirs.** The rule is never to publish an unverified price; the correct application here is to publish the price that *did* verify rather than to drop a real 53%-off in-stock deal because the source oversold it. Publishing ₹161 would have shipped a page whose Offer schema names a price no buyer can pay.

Image measured under the same URL as the price: `61jeS1UR41L._SL1500_.jpg` (31 hiRes entries).

---

## Published — #10865

| Field | Value |
|---|---|
| slug | `littles-soft-cleansing-baby-wipes-with-lid-160-wipes-pack-of-2` |
| price / mrp / pct | ₹209 / ₹440 / 53% (`round(1 − 209/440)`, matches PDP −53%) |
| isSuper / isHot | true / true (209 ≤ 250) |
| image | `m.media-amazon.com/…/61jeS1UR41L._SL1500_.jpg` |
| affiliate | `/dp/B088TZC4B7?th=1&psc=1&tag=ashoksachdev-21` |

Description written from the product's own spec sheet (thickness, sealed lid vs sticker flap, aloe/vitamin E/jojoba, 80×2 configuration, ₹1.31 per wipe from `.pricePerUnit`) — no channel text, no source text. `priceHistory` row written. Pre-flight (title-₹ vs numeric price, price < mrp, pct recompute, CDN image host) passed.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 4 urls** — new slug + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`; #10865 is a new URL and enters on the next revalidate (`discountPct 53 ≥ 20`, price + image present, age 0 → passes `dealIndexable()`) |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page |

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 remains a 1-post day, below the 2-3 target |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,518 (was 10,517) | +1 = this tick's publish, accounted |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | 1,625 | carried — unchanged for a third tick, needs a dedicated backfill pass |
| null discountPct | 1,602 | carried — same |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10864` vs DB max `10865` | **not rot** — the gap is exactly #10865, created 3 min ago; same shape as last tick, and last tick's identical call is now confirmed correct (see the RichDeals row above) |
| unpushed commits | 0 (before this tick's commit) | clean |

`nullMrp 1,625` / `nullPct 1,602` are byte-identical to ticks n and o. Three ticks of a flat number is itself the finding: nothing in the Telegram or IFS path is creating these rows, so the 1,625 are a static historical backlog, not an ongoing leak. That makes it a one-time backfill rather than a bleeding wound — but it also means it will never shrink on its own, and every tick that only flags it leaves ~15% of the live set competing without the one number the category ranks on. Still not authorized; still not a Telegram tick's job.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the one to check for deal-batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** The card price is post-clip-coupon, not wrong. Their rule text — flagged, not edited.
3. **CLAUDE.md names `amzn.lt` as a live shortener.** DNS-dead for a third consecutive tick (curl exit 6). Cost this tick the SB Loots monitor link — though that post had no deal price either, so nothing publishable was lost.
4. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
5. **Amazon.in sign-in state in the `richDeals` Playwright profile** reads `loggedIn:false` again. Flag only; fixing it means touching owner credentials, and the PDP read path does not depend on it.
