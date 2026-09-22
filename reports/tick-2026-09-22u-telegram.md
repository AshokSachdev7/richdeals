# TELEGRAM-DEAL-MONITOR tick 2026-09-22u

**Run:** 2026-09-22 13:44–14:01 IST · richdeals.in · Playwright MCP profile `richDeals`
**Result:** **2 deals published LIVE** (#10900, #10901) · **IndexNow HTTP 200 / 5 urls** · 2 unique ASINs from 25 sidebar rows, both verified on the PDP, both fresh.

Two data defects were caught before the push — a price regex that returned the M.R.P. on a decimal price, and an "out of stock" false positive from Amazon's own i18n string table. Either one would have shipped a wrong page. Both are written up below because both will recur.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, `{title, last}` each. The 13 roster groups in `data/tg-groups.json` all present.

| # | Group | Newest message | Verdict |
|---|---|---|---|
| 1 | SB Loots And Deals | Bajaj LED tubelight pack, `@909 ... Apply 30% Off Coupon` | **candidate** |
| 2 | CoolzTricks Official - Deals & Offers | same Bajaj tubelight, `980 Apply Coupon` | **duplicate of #1** |
| 3 | Dealzone | perfume `at 279` | **candidate** |
| 4 | Dealdost | multi-product loot roundup | skip |
| 5 | NonStopDeals | category link | skip |
| 6 | Loot Deals 24x7 | loot post | skip |
| 7 | Rogerkart Deals | multi-product | skip |
| 8 | OMG LOOTDEALS | loot post | skip |
| 9 | IndiaFreeStuff Tips & Tricks | tips/no product | skip |
| 10 | ONLINE SHOPPING DEALS | category link | skip |
| 11 | INDIAN CHEAP DEALS | older chatter, no fresh product | skip |
| 12 | Deal Dibba | multi-product | skip |
| 13 | Hidden Loot Deals & Offers | loot post | skip |

Skip counts: 10 groups skipped on the standing filters (loot / multi-product / category / `/s?` search), 3 single-product candidates, of which 2 unique after shortlink resolution.

**Credential handling.** The sidebar sweep returns every row in the chat list, which includes the `Telegram` service chat (id `777000`). Its last message this run was a live login code. That is a credential: it was not echoed, not acted on, and appears nowhere in this report, the push script, the dedup file or the commit. Noting the class of content only, so the next tick knows to expect it in the sweep and drop it the same way.

### RichDeals broadcast — free confirmation

Our own channel's sidebar row carried **#10883 — HEAD Igniton Pro 3R Badminton Kitbag, ₹631 / ₹1,100 / 43%**, posted minutes after the DEAL-INGEST tick pushed it. That is the sixth consecutive tick where the sweep has incidentally proven the `tg-broadcast` external cron is current, at zero extra cost. The cursor file (`apps/api/scripts/.tg-broadcast-cursor.json`) is not worth reading for this — the channel itself is the better signal.

---

## Shortlink resolution — 3 of 3 resolved

| Shortlink | HTTP | Resolves to | Their tag |
|---|---|---|---|
| `amazn.lt/…` (SB Loots) | 200 | `/dp/B0DY83B8FD` | stripped |
| `amzn.to/…` (CoolzTricks) | 200 | `/dp/B0DY83B8FD` | stripped |
| `amzn.to/…` (Dealzone) | 200 | `/dp/B07S1V7FP9` | stripped |

Third consecutive clean `amazn.lt` resolution — the earlier flag on that host stays retracted.

**Two channels, one ASIN.** SB Loots and CoolzTricks posted the same tubelight at two different prices, which is exactly why the shortlink code can never be read as an ASIN and why resolution runs before dedup. Resolved to one ASIN, published once.

---

## Dedup — 3 → 2 fresh

| productId | `tg-multi-seen.json` | Live DB | Verdict |
|---|---|---|---|
| `B0DY83B8FD` | not present | no row (`store_product` 1/B0DY83B8FD) | **fresh** |
| `B07S1V7FP9` | not present | no row | **fresh** |
| `B0DY83B8FD` (2nd sighting) | — | — | dropped in-batch |

Seen file 1,802 → 1,804 entries. Local only — the file is gitignored and was not staged.

---

## PDP verification

Both read in the logged-in Amazon tab: same-origin `fetch(url, {credentials:'include'})` + `DOMParser`, regex over the **full** `#centerCol` innerText (221,852 and 203,489 chars). Amazon PDPs carry no `ld+json` at all, so the browser read is the only price truth available.

| ASIN | Channel claim | PDP price | MRP | Amazon badge | Our computed pct | Availability |
|---|---|---|---|---|---|---|
| `B0DY83B8FD` | ₹909 / ₹980 | **₹1,297.71** | ₹6,990 | −81% | 81 | In stock |
| `B07S1V7FP9` | ₹279 | **₹279.00** | ₹699 | −60% | 60 | In stock, ATC + Buy Now present |

Our `round(1 − price/mrp)` matches Amazon's own `.savingsPercentage` badge on both rows. That agreement is the check that matters — it proves the captured MRP is the number Amazon is actually striking through, not some unrelated ₹ on the page.

### Defect 1 — the price regex returns the M.R.P. on a decimal price

The standing extractor is:

```js
/₹([\d,]+)(?:\s*with|\s*₹|\s*M\.R\.P|$)/
```

On `B0DY83B8FD` it returned **6,990** — the M.R.P., not the price. The price window reads:

```
₹1,297.71 with 81 percent savings -81% ₹1,297.71 ₹129.77 per count(₹129.77₹129.77 / count) M.R.P.: ₹6,990.00M.R.P.: ₹6,990₹6,990
```

`[\d,]+` matches `1,297` and then hits `.` — a decimal point is in neither the character class nor any of the three alternatives, so the match fails there and the engine walks forward until it finds `₹6,990₹` inside the M.R.P. pair, where `\s*₹` does fire. Published unchecked, that row would have been `price == mrp == 6990`, a 0% discount page claiming to be a deal.

Whole-number prices escape by luck: `B07S1V7FP9`'s window is `₹279 ₹2.79`, and the `\s*₹` alternative matches on the first try. So the bug is silent on most ASINs and only bites on the ones carrying paise — which is precisely the deeply-discounted end of the catalogue.

**Detection rule, cheap and reliable: if `price == mrp`, or the computed discount is 0%, the capture is wrong, not the deal.** Both rows here were finally taken by reading the price window, not the capture group. The script header carries this note so the next person to copy it does not re-inherit the trap.

### Defect 2 — `out of stock` false-positives on the i18n string table

A `/currently unavailable|out of stock/i` test over `#centerCol` returned **YES** for `B07S1V7FP9`, while `#add-to-cart-button` and `#buy-now-button` were both present and `#deliveryBlockMessage` read `FREE delivery 29 September - 2 October`. Re-run with match offsets and 120 chars of context, all three hits sit inside the twister JavaScript string dictionary:

- `"a11ySizeUnavailabilityText":", currently unavailable in the selected colour"`
- `"currentlyUnavailableMessage":"Currently unavailable."`
- `"currentlyUnavailablePopOverStringValue" : "Currently unavailable."`

Those are string *definitions* shipped to every PDP, not rendered state. A substring test over `#centerCol` cannot tell a dictionary entry from a live message.

**Rule: never reject on stock from a bare substring test. Print the match offset plus context first, then decide from `#add-to-cart-button` / `#buy-now-button` presence and `#deliveryBlockMessage`.**

Related and already known: `#availability` can be a present node with empty innerText (`<span class="...primary-availability-message"> </span>`). That is *not* the apparel/unresolved-variant `P.when("A","load").ex` signature and does not mandate a drop — which is the case here.

### `B0DY83B8FD` — price decision

₹1,297.71 published as **₹1,298**, rounded up. Truncating to 1,297 would understate the price by a rupee and promise slightly better than reality; rounding up keeps the page honest and stays inside the ±₹1 verification tolerance.

SB Loots' ₹909 reconciles exactly: **1,297.71 × 0.70 = 908.40 ≈ 909**. Their "30% Off Coupon" claim is arithmetically consistent with the PDP, which proves their number is post-clip-coupon rather than a different offer. CoolzTricks' ₹980 reconciles to nothing at 30% and is stale or a different coupon. Neither is publishable — a coupon the buyer has to clip is not the list price, and the coupon node on the PDP is live, so the buyer can still get there.

### `B07S1V7FP9` — spec-table contradiction

The title says 100 ml; Amazon's own specification block says **Item Volume 370 Millilitres**. That is an inconsistency on their page, not ours, so the deal's `confirm` step names the 100 ml bottle explicitly rather than repeating either number as fact. `Special Feature: Organic` also appears in their spec table and was deliberately not carried into our copy — it is a seller-supplied tag on a synthetic fragrance and not a claim worth inheriting.

Dealzone's ₹279 matched the PDP to the rupee — the rare channel post that needed no correction at all.

---

## Published — #10900, #10901

| Field | #10900 | #10901 |
|---|---|---|
| slug | `bajaj-20w-cool-day-light-led-tubelight-pack-of-10-b0dy83b8fd` | `secret-temptation-dream-eau-de-parfum-for-women-100-ml-b07s1v7fp9` |
| price / mrp / pct | ₹1,298 / ₹6,990 / **81%** | ₹279 / ₹699 / **60%** |
| store | Amazon (id 1) | Amazon (id 1) |
| affiliate | `/dp/B0DY83B8FD?th=1&psc=1&tag=ashoksachdev-21` | `/dp/B07S1V7FP9?th=1&psc=1&tag=ashoksachdev-21` |
| image | `m.media-amazon.com/…/71ZZRXu9pHL._SX679_.jpg` | `m.media-amazon.com/…/51ACC7O6SgL._SX679_.jpg` |
| isHot / isSuper | false / false | **true** / false |
| status | LIVE | LIVE |
| live URL | HTTP **200** | HTTP **200** |

Descriptions were written from the PDP's own bullet and specification content — operating-voltage range, surge rating, efficacy, base and form factor on the tubelight; EDP-versus-EDT concentration, scent family and the manufacturer's pulse-point application note on the perfume. No channel text was reused. Both descriptions lead with the reason the price is or is not worth it rather than restating the discount, which is the only thing the page can say that the marketplace listing does not.

`howTo` step 2 carries the per-deal `confirm` line: Pack of 10 on the tubelight (its own bullet text still reads "1 Pcs", left over from the single-unit listing, while the title and spec block both say 10), and the 100 ml bottle plus the week-out delivery window on the perfume.

Pre-flight passed all 6 checks on both rows: title ₹ against numeric price, price < mrp, image host allowlisted, indexability (`pct ≥ 20` — both clear it outright), slug ends in the productId, no in-batch duplicate.

Images are hiRes picks off `#landingImage`'s `data-a-dynamic-image`, keys sorted by width descending.

---

## Freshness (owner directive 2026-07-27)

| Check | Value | Verdict |
|---|---|---|
| IndexNow ping | `HTTP 200 for 5 urls` (2 slugs + `/`, `/offers`, `/sitemap.xml`) | **pass** |
| `sitemap.xml` | 9,862 `<loc>` at 14:00 IST, unchanged from the 13:40 read | pending ISR |
| `llms-full.txt` | `force-dynamic`, rebuilt per request off `getDeals()` | automatic |

The url count of 5 is the receipt — IndexNow returns a bare 200 with no per-url acknowledgement, so `slugs + 3` is the only integrity check available, and 2 + 3 = 5 confirms nothing was dropped from the payload. No 422, so the Bing GET fallback was not needed.

The sitemap not yet carrying the two rows is expected and not rot: it is ISR `revalidate = 1800` and this read was three minutes after the push. Both deal pages already return 200 directly, so the urls submitted to IndexNow are live pages, which is what actually matters for the ping. Previous ticks have observed propagation in minutes rather than the 1800s ceiling.

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| LIVE deals | 10,554 (was 10,552 pre-push) | **+2, matches** |
| PENDING_REVIEW backlog | 0 | clean |
| LIVE null price | 0 | clean |
| LIVE null image | 0 | clean |
| LIVE null mrp / null pct | 1,623 / 1,600 | carried flag |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| max deal id | 10,901 | matches the push |
| posts/day IST 09-22 | 3 | rule met |
| posts/day IST 09-21 | **1** | **NEW FLAG** |
| posts/day IST 09-20 / 09-19 | 2 / 3 | within rule |
| unpushed commits | 0 before this tick's commit | clean |

**NEW FLAG — 2026-09-21 shipped 1 blog post, not 2-3.** Confirmed with explicit IST date-range counts, not a `take:20` heuristic: 09-19 = 3, 09-20 = 2, **09-21 = 1**, 09-22 = 3. The single post that day was `mixer-grinder-500w-vs-750w-vs-1000w-india-2026` at 00:51 IST, and the next post is not until 02:07 IST on 09-22 — a 25-hour gap with nothing published. The BLOG cron is a session cron (`9 */6 * * *`), so it dies with the session; a session that ended early on the 20th would produce exactly this shape. The hard rule is "never 0, never >4" with a 2-3 target, so 1 is a shortfall, not a violation of the floor — but it is the same silent-drift failure mode that broke the blog rule for three days in July, which is the reason the audit rule exists. Yesterday cannot be backfilled honestly; flagging so today's cadence is not read as proof the schedule is healthy.

`nullMrp 1623` / `nullPct 1600` are unchanged and remain the owner's call — a bulk backfill was offered and never authorised, so nothing was touched.

---

## Carried flags (unchanged, owner's call)

1. **Amazon.in sign-in state in the `richDeals` profile is degraded.** Flagged only, never fixed — logging in would touch owner credentials. The PDP read path does not depend on it: all four `fetch` calls this tick succeeded from the open `amazon.in` tab.
2. **DO API token still needs rotating** (it was pasted in chat during setup; provisioning is long done and daily work does not use it).
3. **`nullMrp` 1,623 / `nullPct` 1,600 on LIVE rows** — backfill offered, not authorised.
4. **CLAUDE.md freshness rule #3 names `llms.txt`**, which carries no deal urls by design; `llms-full.txt` is the deal-bearing surface. Rule text, so flagged rather than edited.
5. **The 980-row description-expansion pass** (`geo-optimizer`) and the Task Scheduler structural fix remain offered and unauthorised.
