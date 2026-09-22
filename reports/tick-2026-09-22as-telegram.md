# TELEGRAM-DEAL-MONITOR — tick `2026-09-22as`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`. The service-chat row (`777000`) carries a live login code and is filtered
out inside the page, before anything reaches this session.

**Result: 0 published, 0 refreshed, 3 PDPs verified at zero drift. No write, no IndexNow ping.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 28 |
| rows belonging to the 13 tracked groups | 13 of 13 present |
| shortlinks worth resolving | 5 |
| single-product candidates after the skip rules | 3 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 0 |
| survived PDP price/stock verification | 3 of 3 — all already ours, all already correct |

## Published

None. Every product the 13 channels surfaced this tick already has a page on richdeals.in, and
every one of those pages was verified this tick to be quoting the live Amazon price exactly.

## Refreshed in place

None — and that is the finding, not a gap. All three PDPs were read in the logged-in tab and all
three matched the stored row to the rupee:

| deal | productId | PDP price / M.R.P. | stored price / mrp | drift |
|---|---|---|---|---|
| 10946 | B0DJQV7JDB | ₹848 / ₹3,499 | 848 / 3499 | **0** |
| 7314 | B0CG16N3P4 | ₹192 / ₹575 | 192 / 575 | **0** |
| 7110 | B0G38DGNKM | ₹3,459 / ₹6,299 | 3459 / 6299 | **0** |

All three In stock. All three images checked against the `THUMB` gate and clean
(`91Ox5MTUOzL._SL1500_`, `71OJbvvZynL._SL1500_`, `61FrCUOjwEL._SL1500_`). Descriptions 2,390 /
1,022 / 1,735 characters, `howTo` 4 steps each, affiliate URLs all carrying `?tag=ashoksachdev-21`
with no foreign freight. Nothing on these three rows needed touching, so nothing was written and
nothing was re-submitted to IndexNow.

**Tick `ap` was the mirror image of this one** — it found a six-week-stale price, a thumbnail image
and a 374-character description on the one row it checked. Same method, opposite result. That is
what makes the zero-drift outcome worth recording rather than reporting as "nothing happened": the
verification pass is the product, and this tick it returned a clean bill on three rows.

## The Rogerkart resolve — a standing limitation retired

`rogerkart.com/r/<code>` has been recorded in earlier ticks as unresolvable without a browser. That
is now wrong and should not be carried forward. Rogerkart serves a Next.js SPA shell
(`<title>rogerkart — finding your best deal</title>`, `robots noindex,nofollow`, script `type`
attributes mangled by Cloudflare) and issues **no HTTP redirect** — but the destination is sitting
in the server-rendered flight payload:

```
curl -s -A "<Chrome UA>" 'https://rogerkart.com/r/yF4Xh5s' \
  | grep -oE '(amzn\.to|amazn\.lt|link\.amazon|www\.amazon\.in)[^"\ <]*' | sort -u
→ www.amazon.in/dp/B0DJQV7JDB?tag=rogerkart-21
```

One curl, no browser, no redirect chain. Rogerkart's own affiliate tag is `rogerkart-21` — added to
the list of foreign tags seen on resolved links (`bhavesh015-21`, `collab-amafhh-21`,
`vivek123034-21`, `khushalsing07-21`, `dealsalert13-21`, and IFS's `dealhind-21`). It was stripped
and the URL rebuilt from the ASIN, as always.

The irony is that the link resolved to a product the site had published seven hours earlier, as
deal 10946. The technique is still worth keeping; the yield this time was zero.

## A fourth channel-price reading, confirmed by arithmetic

Rogerkart shouted **"@ 806, Apply 5% Off Coupon"**. The PDP reads **₹848**. 848 × 0.95 = **805.6**.
The channel's number is the post-clip-coupon figure, exact to the rupee once rounded — not a stale
price, not a wrong one. The existing rule holds and is now confirmed by a clean calculation rather
than by inference: **ship the PDP price, put the coupon in `howTo`.** Deal 10946 already does
exactly that, which is why it needed no edit.

For contrast on the same tick, SB Loots' Lavie handbag post said "₹3,500/-" against a ₹3,459 PDP.
That is not post-coupon and not a price move — it is a channel rounding a number it did not check.
Two different-looking discrepancies, two different causes, and only one of them would ever justify
touching a stored row.

## Skipped, with reasons

- **RARE RABBIT, ×2, killed on the same evidence.** SB Loots And Deals posted `amazn.lt/Sz8ylN44`
  and CoolzTricks Official posted `amzn.to/3VsPKWl`. Both resolved to the **same Amazon search
  URL** — `/s?k=rare+rabbit&i=shoes&rh=n:1983396031,p_123:1095176,p_n_pct-off-with-tax:2665401031`
  — differing only in affiliate tag (`bhavesh015-21` vs `collab-amafhh-21`). `/s?` is a hard skip
  under the single-product rule. Worth noting as a pattern: **two unrelated channels reselling one
  search URL under separate tags**, which means the "deal" is a brand-level percent-off filter
  being monetised, not a product anyone verified. Both resolves returned HTTP **503** while still
  exposing `url_effective` — a 503 on the resolve is not a failure, the final URL is the evidence.
- **Amazon TrustBasket pots (`B07QX21WZQ`), NonStopDeals**, repeating its ₹151 claim against a ₹549
  PDP — wrong by ~72%. Deal 5825, refreshed at `al`, healthy. Not touched, **not re-pinged.**
- **Flipkart Syska 10000 mAh (`PWBGGD4THDQZYAY6`), Loot Deals 24x7**, shouting "Rs.799" again.
  Established at `ap`: Out of stock, and the listing reads ₹1,388 against a ₹1,799 M.R.P. Two
  independent kills, neither of which has changed.
- **Dealzone "Upto 88% Off Women Clothing"** (two links) — category page, no single product.
- **Dealdost Boltt EVO** — "Sale Live On 24th Sep 12AM", "Starting at 8999". A future sale with a
  price *range*, not a live price. Nothing verifiable exists yet.
- Search-result and bait posts: IndiaFreeStuff Tips (Swiggy search), Hidden Loot (Zepto search),
  Deal Dibba (join-channel bait), OMG LOOTDEALS ("Video dekho paisa kamao").
- Untracked sidebar rows — including our own two RichDeals broadcast channels — not in
  `data/tg-groups.json`.

`data/tg-multi-seen.json` stands at **1,813** entries, unchanged. All five processed product ids
(`B0DJQV7JDB`, `B0CG16N3P4`, `B0G38DGNKM`, `B07QX21WZQ`, `PWBGGD4THDQZYAY6`) were already in the
file — the first tick this session where the seen store caught everything on its own and the DB
check confirmed rather than corrected it.

## Freshness

**No IndexNow call this tick, deliberately.** Nothing was written. Re-submitting three unchanged
URLs hours after they were last pinged is the spam pattern, and the penalty lands on the host, not
the channel. The freshness rule binds "after ANY batch is pushed" — there was no batch.

Sitemap **9,909** `<loc>` entries — **unchanged from `ao` / `ap` / `ar`**, which is the correct
outcome. A sitemap that grew on a zero-write tick would have meant a duplicate page was created.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean:

- live deals **10,599**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- max deal id **10946**, tg-broadcast cursor `lastId 10946` — **equal, not drift**
- 7/7 prod endpoints 200, unpushed commits **0** before this tick's own commit
- the three rows verified against live Amazon this tick: **zero price drift, zero image rot, zero
  thin descriptions**

Rot, all flagged, none executed:

1. **The pre-flight-gate backlog, unchanged and still the largest number in this file.** Across
   10,599 LIVE deals: description under 900 chars **10,500** (99.1%); thumbnail-variant image
   **1,305** (12.3%); empty `howTo` **3,491** (32.9%); thin description *and* thumbnail **1,262**
   (11.9%). Every row written since the gate exists clears it; almost nothing written before it
   does. The `geo-optimizer` bulk pass remains offered and unapproved.
2. **The IST day rolled over during this tick — it is now 2026-09-23 00:05 IST, with 0 posts
   published.** That is a fresh day, not a miss, and is recorded here only so the next BLOG tick
   knows the floor is live from now. Posts/day IST: 09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3,
   09-18 3.
3. **2026-09-21 still stands at 1 post against a floor of 2** — the one real blog miss on the
   board. Cause is the session cron `9 */6 * * *` losing firings while the session is down; the
   durable Task Scheduler fix is unauthorised.
4. **41 live deals state a price in the title the row does not hold** (19 written with `₹`, 22 with
   `Rs.`, union 41). Retitle pass not authorised.
5. **nullMrp 1,621 / nullPct 1,598** — bulk backfill still unapproved.
6. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
7. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod.
8. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — EXPIRED path.
9. **`api.indexnow.org` is intermittent, not dead** — 200 on six consecutive ticks that pinged.
   Keep the Bing GET fallback wired.
10. **The DO API token pasted in chat during setup is still unrotated.**
11. **Amazon.in sign-in state in the `richDeals` profile is flagged only, never fixed here** —
    logging in touches owner credentials.
12. **CLAUDE.md freshness rule #3 names the wrong file** — `/llms.txt` is a hub surface carrying no
    deal URLs by design; `/llms-full.txt` is the deal-bearing one.

The channels produced five resolvable links this tick and the site already owned every product
behind them. The work that had value was the verification: three live pages checked against Amazon
and all three found correct, plus a resolve technique that cost one curl and retires a limitation
this session had been treating as permanent.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
