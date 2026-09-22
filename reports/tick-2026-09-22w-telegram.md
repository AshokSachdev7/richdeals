# TELEGRAM-DEAL-MONITOR tick 2026-09-22w

**Run:** 2026-09-22 14:40–14:55 IST · richdeals.in · Playwright MCP profile `richDeals`
**Result:** **1 deal published LIVE** — #10902, Amul Comfy 6-pack cotton vest at ₹328 (45% off ₹594). **IndexNow HTTP 200 / 4 urls.** One existing row re-verified clean against a wrong channel price; four candidates rejected on dedup, one on a category-page resolution.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` returned **25 rows** — every roster group in `data/tg-groups.json` present, plus DMs, bots and service chats that are not roster groups (rows 10–16, 18–20, 24).

| # | Row | Newest message | Verdict |
|---|---|---|---|
| 1 | CoolzTricks Official | Amul vest pack of 6 "@328" + `amzn.to` | **candidate** |
| 2 | Rogerkart | Zivame "Upto 85% Off" | skip — category |
| 3 | Dealdost | "Loot : Branded Mobile & Tablet Protection Starts at 199" | skip — loot/multi |
| 4 | IndiaFreeStuff Tips | Swiggy Instamart search post | skip — search |
| 5 | Hidden Loot | Zepto search post | skip — search |
| 6 | OMG LOOTDEALS | "Video dekho paisa kamao" | skip — not a deal |
| 7 | Deal Dibba | `t.me` join-gate | skip — no product |
| 8 | INDIAN CHEAP DEALS | Lavie handbag "₹3,500" + `link.amazon` | candidate (see below) |
| 9 | SB Loots | `link.amazon` + `fkrt.co` | candidates |
| 17 | (iPhone rates channel) | daily rate card | skip — no product |
| 21 | Loot Deals 4U | `myntr.it` shortlink | candidate |
| 22 | RichDeals (ours) | #10901 Secret Temptation ₹279 | see below |

Skip counts: **7 posts rejected on the standing filters** (2 category, 2 search, 1 loot/multi, 2 no-product), 10 non-roster rows ignored, 6 shortlink candidates carried forward.

### Credential handling

Row 15 is the `Telegram` service chat (id `777000`). It appears in every sidebar sweep, and in this sweep its last-message preview carried a **live Telegram login code**. That is a credential. It was not echoed into any log, was not acted on, and its digits do not appear in this report, in the commit message, or in the terminal reply. Recording only that it was present and withheld. This is now the standing handling for that row — it will keep appearing, and it must keep being dropped at the read.

### RichDeals broadcast — free confirmation

Our own channel's sidebar row carried **#10901** (`Secret Temptation Dream … ₹279 ₹699 60% OFF Save ₹420`), the row tick `2026-09-22u` published at 13:57 IST. The external `tg-broadcast` cron is current. That is the **seventh consecutive tick** where the sidebar sweep confirmed the broadcast cron at zero extra cost — the sweep is already paid for, so this check is free and should stay in the flow.

---

## Shortlink resolution — 6 of 6 resolved

`curl -sL -o /dev/null -w 'code=%{http_code} eff=%{url_effective}'`, Chrome UA, 1s between requests.

| Shortlink | HTTP | Resolves to | Verdict |
|---|---|---|---|
| `myntr.it/v5nxkur` | 200 | `myntra.com/priority-trolley?…sort=price_asc` via `trackingv3.linkredirect.in` | **reject — category page** |
| `amzn.to/3V7F4wj` | 200 | `/dp/B0DZP3V36B` (their tag `collab-amafhh-21`) | candidate |
| `link.amazon/B02ytILHW` | 200 | `/dp/B07S1V7FP9` (`glitzdeal05-21`) | = #10901, published last tick |
| `link.amazon/B0hLf0C6s` | 200 | `/dp/B06WV77YDB` (`vivek123034-21`) | candidate |
| `link.amazon/B05yvriRF` | 200 | `/dp/B0G38DGNKM` (`khushalsing07-21`) | = #7110, live |
| `fkrt.co/l5KOxl` | **403** | `flipkart.com/syska-10000-mah-power-bank-fast-charging/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6` | candidate — 403 is not dead |

Two rules earned their keep here:

- **Shortlink code is never the ASIN.** Three `link.amazon` codes resolved to three ASINs, and **not one matched its own code** (`B02ytILHW`→`B07S1V7FP9`, `B0hLf0C6s`→`B06WV77YDB`, `B05yvriRF`→`B0G38DGNKM`). The codes are ASIN-shaped by design. Skipping resolution on any of them would have produced a fabricated product id.
- **`fkrt.co` 403 carries a correct `url_effective`.** The status is a bot check on the shortener, not a dead link — the redirect target was fully populated and the `pid` extracted cleanly.

The Myntra rejection needed judgement: the decoded `trackingv3` target carries decoy params (`host_internal=single_product&product_name=product`) that claim it is a product page. The **path** says otherwise — `/priority-trolley?sort=price_asc` is a sorted category listing. Judge the path, never the params.

---

## Dedup — 4 checked, 1 fresh

`data/tg-multi-seen.json` held **1,804** ids at the start of the tick (flat JSON array; holds Flipkart pids as well as Amazon ASINs).

| Product id | In seen file | In live DB | Verdict |
|---|---|---|---|
| `B0DZP3V36B` | no | no | **fresh → publish** |
| `B06WV77YDB` | yes | none | skip |
| `PWBGGD4THDQZYAY6` | yes | none | skip |
| `B0G38DGNKM` | yes | **#7110 LIVE ₹3,459** | skip (re-verified, see below) |

**A seen-file hit with no DB row is still a skip.** Two of the four ids sit in the seen file with no corresponding deal. That is the file working as designed — it records every id a prior tick *processed*, including the ones rejected on price, stock or quality. Re-checking them would mean re-walking a decision already made and paying the PDP fetch again to reach the same reject.

Seen file after the push: **1,805**. Local only — the file is gitignored and is never staged.

---

## PDP verification

Two same-origin fetches from the logged-in `amazon.in` tab, both **HTTP 200**, regex over the **full** `#centerCol` innerText (never head-sliced, never capped for transport).

| ASIN | Channel claim | PDP price | MRP | Badge | Computed pct | Stock |
|---|---|---|---|---|---|---|
| `B0DZP3V36B` | ₹328 | **₹328.00** | ₹594 | −45% | 45 | in stock · ATC + Buy Now true · `FREE delivery Saturday, 26 September` |
| `B0G38DGNKM` (#7110) | ₹3,500 | **₹3,459.00** | ₹6,299 | −45% | 45 | in stock · ATC + Buy Now true · fastest delivery tomorrow |

Badge agreed with the computed discount on both, which is the only independent check available on an Amazon PDP — Amazon serves no `ld+json`, so `productLd()` is a non-Amazon path only.

### Defect 1 — `₹54.67 per count` is a per-unit rate, not a price

`B0DZP3V36B`'s price window reads:

```
₹328.00 with 45 percent savings -45% ₹328 ₹54.67 per count(₹54.67₹54.67 / count)
M.R.P.: ₹594.00M.R.P.: ₹594₹594 P.when('A', 'ready')…
```

A naive "take the first ₹ after the price" read returns **₹54.67** — the price of one vest out of six. Published at that figure, the page would have advertised a 91% discount on a product nobody can buy for ₹55, and the pre-flight's `price < mrp` check would have passed it happily because ₹55 < ₹594.

This trap was previously logged on `.a-offscreen`; this is the first time it has been seen **inline in `#centerCol`** on a multi-pack. The defence is structural, not a regex tweak: take the window's **leading** ₹ figure, then require the badge and `round(1 − price/mrp)` to agree. Here 45 == 45, which a ₹54.67 read could not have produced.

### Defect 2 — `#feature-bullets` comes back empty on apparel

`doc.querySelectorAll('#feature-bullets li')` returned **0 nodes** on this ASIN despite the live page showing bullets — they are rendered client-side and are absent from the fetched HTML. `#detailBullets_feature_div` was fully populated (15 spec lines: net quantity 6.0 count, 400 g, single jersey via title, J.G. Hosiery Tirupur, country of origin India, rank #8 in Men's Undershirt Tank Tops).

Related but distinct from the known apparel failure: the price-window tail here carries `P.when('A', 'ready')` boilerplate, which on some apparel ASINs signals an unresolved variant and a null price. **Not that case** — the price resolved cleanly at ₹328 with a matching badge. `P.when(…)` in the tail is not by itself a reason to drop an ASIN; a *null* price is.

### `B0DZP3V36B` — published

`#centerCol` length 204,777. Title on the PDP: *Amul Comfy Men's Vest | 100% Cotton Single Jersey Fabric | U Neck Sleeveless Innerwear | Ultra Soft Hand Feel | Seamless Body | Superior Comfort Color May Vary (Pack of 6)*. Image `https://m.media-amazon.com/images/I/819phY3S1sL._SX679_.jpg` (real `m.media-amazon.com` CDN). Item model number `AC-PLVESTWHTRN-WHT-S-6PC` — i.e. the default variant loads as size **S**, which the how-to step calls out along with the listing's own "Color May Vary" caveat rather than hiding it.

CoolzTricks' "@328" matched the PDP exactly. Worth recording because it is the exception: channel numbers are usually post-coupon or simply wrong.

### #7110 — re-verified, zero drift, no update

INDIAN CHEAP DEALS posted the Lavie handbag at **₹3,500**. The PDP reads **₹3,459.00** and our stored row #7110 already reads **₹3,459**. The channel number is the wrong one; ours is right. Nothing was updated, and no `PriceHistory` row was written.

This check cost nothing — the PDP read was already open in the same `browser_evaluate`, so a live row got re-verified for free. That is the cheapest rot check on this site and it should stay bundled into every Telegram tick's PDP call.

---

## Published — #10902

| Field | Value |
|---|---|
| id | **10902** |
| slug | `amul-comfy-men-cotton-sleeveless-vest-pack-of-6-b0dzp3v36b` |
| title | Amul Comfy Men Cotton Sleeveless Vest, Pack of 6 at ₹328 (45% Off) – Amazon |
| price / mrp / pct | ₹328 / ₹594 / **45%** |
| store | Amazon (id 1) |
| affiliateUrl | `https://www.amazon.in/dp/B0DZP3V36B?th=1&psc=1&tag=ashoksachdev-21` |
| image | `m.media-amazon.com/images/I/819phY3S1sL._SX679_.jpg` |
| flags | `isHot` **true** (≤500), `isSuper` false (>250) |
| status | **LIVE** |
| createdAt | 2026-09-22 14:52:04 IST |

**Copy notes.** Description written from the PDP's own specification block and nothing else — no channel text, no source text. It leads with the per-vest arithmetic (₹328 / 6 ≈ ₹55) because that is the actual decision, then explains why *single jersey* is the spec that matters on a vest (thin open knit keeps passing air; interlock or rib in the same cotton sits warmer) and why a seamless body outlasts a stitched one (the side seam is the usual first failure on cheap vests, not the fabric). Facts used: 100% cotton single jersey, U-neck sleeveless, seamless body, net quantity 6 count, 400 g packed, J.G. Hosiery Tirupur, origin India, rank #8 in Men's Undershirt Tank Tops. No fabricated claims.

`dealIndexable()` clears on discount alone (45 ≥ 20); description length also clears the 200-char floor independently, so the row is in the sitemap on two counts.

**Pre-flight: 6/6 passed.** `pre-flight OK, 1 rows` — title ₹ vs numeric price, price < mrp, image host allowlist, indexability, slug ends in productId, no in-batch dup.

---

## Freshness (owner directive 2026-07-27)

1. **IndexNow** — `node apps/api/scripts/indexnow-ping.mjs amul-comfy-men-cotton-sleeveless-vest-pack-of-6-b0dzp3v36b` → `DONE: IndexNow -> HTTP 200 for 4 urls`. 1 slug + the 3 paths the script always prepends (`/`, `/offers`, `/sitemap.xml`) = 4, which is the receipt that nothing was dropped from the payload. No 422, so the Bing GET fallback was not needed.
2. **sitemap.xml** — ISR `revalidate = 1800`. #10902 is indexable on discount, so it enters on the next revalidation. Three independent observations this session put actual propagation in the single-digit minutes, well inside the documented 30-minute worst case.
3. **llms.txt** — `force-dynamic`, rebuilt per request off `getDeals()`. No new hub page was added, so nothing to link by hand.

Batch pinged → batch shipped.

---

## CEO audit

Same DB read, 14:52 IST, serial Prisma.

| Check | Value | Verdict |
|---|---|---|
| LIVE deals | 10,555 | ✅ 10,554 + 1, matches this push exactly |
| PENDING_REVIEW | 0 | ✅ no backlog |
| EXPIRED | 259 | ✅ unchanged |
| null price (LIVE) | 0 | ✅ |
| null image (LIVE) | 0 | ✅ |
| null mrp (LIVE) | 1,623 | ⚠️ carried |
| null discountPct (LIVE) | 1,600 | ⚠️ carried |
| coverless posts | 0 | ✅ |
| seo-less posts | 0 | ✅ |
| max deal id | 10,902 | ✅ = this push |
| posts/day IST | 09-19: 3 · 09-20: 2 · **09-21: 1** · 09-22: 3 | ❌ **breach on 09-21** |

**Blog cadence breach, 2026-09-21 = 1 post.** The hard rule is 2–3 per day, never 0 and never more than 4. One post is a breach of the floor, not a near miss. Cause is structural and already understood: CONTENT-SEO runs as a **session cron** (`9 */6 * * *`), so it only fires while a Claude session is alive. The gap between the 09-21 02:07 post and the next one is **just over 25 hours** — no session was up across four consecutive scheduled firings. Today is back to 3, so the rule is met again, but nothing has changed that would stop the same gap recurring the next time the session is down overnight. The fix is a durable scheduler for the blog tick, which is the Task Scheduler structural change the owner has not authorised — flagging, not doing.

`nullMrp 1,623` / `nullPct 1,600` unchanged from tick v. These are legacy rows with no captured MRP; they are not broken pages (price and image are both present, and `dealIndexable()` can still pass them on description length), they just cannot show a discount. The backfill remains **unauthorised** — offered, not approved.

---

## Carried flags (unchanged, owner's call)

1. **Amazon.in sign-in state in the `richDeals` profile is degraded** — the profile no longer presents as fully signed in on some page reads. Not to be fixed by logging in: that touches owner credentials. It does not block this path — **2/2 same-origin PDP fetches returned 200** this tick, as in the last several. Flag only.
2. **DO API token still needs rotation** — it was pasted in chat during setup (CLAUDE.md records this). Provisioning is done and the token is not needed for daily work. Rotation is an owner action.
3. **nullMrp 1,623 / nullPct 1,600 backfill** — not authorised.
4. **CLAUDE.md freshness rule #3 names the wrong file** — it says confirm `llms.txt` carries the batch; `/llms.txt` is a hub-and-summary surface and carries no deal urls by design. `/llms-full.txt` is the deal-bearing one. Both 200, both `force-dynamic`, nothing broken — the rule text just points a future tick at a file where it will never find the batch. Owner's rule text, so flagged, not edited.
5. **The 980-row `geo-optimizer` description-expansion pass and the Task Scheduler structural fix** — both offered, neither approved. Item 5 of this list is the direct remedy for the blog breach above.
