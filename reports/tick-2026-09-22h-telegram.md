# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 06:50 IST

**Result: 0 published. No IndexNow ping — correctly skipped, because nothing was created.** 5 single-product candidates found, all 5 resolved, **all 5 already live in our DB**. No rejection was on quality — this was a pure dedup zero.

## Sidebar moved this tick

One `browser_evaluate` over `.chat-list .ListItem.Chat` in profile `richDeals`, after `browser_tabs select` back to the Telegram tab — the active tab was still Flipkart from the previous tick, and the evaluate silently returns `[]` otherwise. That tab-select is the whole reason this sweep produced rows.

**29 rows, and unlike the 03:47 / 04:47 / 05:55 sweeps the last-message text had changed on several groups.** No escalation to message-history scraping was needed for discovery this time.

Triage of the 13 sanctioned groups:

| Group | Last message | Action |
|---|---|---|
| CoolzTricks Official | HP Travel Hub USB-C @1186 (`amzn.to/4yKMDHD`) | candidate |
| NonStopDeals | "151" (`amzn.to/4uZXfjK`) | candidate |
| ONLINE SHOPPING DEALS | Clensta anti-dandruff shampoo + conditioner 250ml ₹399 (`link.amazon/B0h3ko7q0`) | candidate |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 (`link.amazon/B05yvriRF`) | candidate |
| Rogerkart Deals | Police cabin trolley 65L ₹1,599, "reg ₹4,099" (`rogerkart.com/r/pVz63JC`) | candidate |
| Dealzone | multi-link branded-shoes category | skip |
| Dealdost | "Branded Mobile & Tablet Protection Starts at 199" | skip — category |
| IndiaFreeStuff Tips & Tricks | Swiggy Instamart search link | skip |
| Hidden Loot Deals & Offers | Zepto search link | skip |
| Deal Dibba | t.me join links | skip |
| OMG LOOTDEALS | "Video dekho paisa kamao" | skip |
| SB Loots And Deals | notification-settings promo | skip |
| Loot Deals 24x7 | Syska `fkrt.co/l5KOxl` | skip — rejected last tick, OutOfStock at ₹1,388 not ₹799 |

## Shortlink resolution — curl got 3 of 5, the browser got 5 of 5

`amzn.to` resolves to curl with a browser UA. **`link.amazon` does not — both codes returned HTTP 404 to curl** and only resolved once loaded in a real tab. `rogerkart.com/r/…` returns 200 to curl but never moves: the body is a Next.js JS-redirect shell (`<title>rogerkart — finding your best deal</title>`), so `url_effective` comes back unchanged and the destination is invisible without executing the page. In the browser it needed a ~5s wait, then `location.href` carried the real PDP.

| Shortlink | curl | browser | Resolved to |
|---|---|---|---|
| `amzn.to/4yKMDHD` | 200 | — | `B0D95QS6DQ` HP Travel Hub, their tag `collab-amafhh-21` |
| `amzn.to/4uZXfjK` | 200 | — | `B07QX21WZQ` TrustBasket pots, `dealsalert13-21` |
| `link.amazon/B0h3ko7q0` | **404** | 200 | `B0GSKLW894` Clensta shampoo + conditioner, `vivek123034-21` |
| `link.amazon/B05yvriRF` | **404** | 200 | `B0G38DGNKM` Lavie Luxe Quaro26 satchel, `khushalsing07-21` |
| `rogerkart.com/r/pVz63JC` | 200, no move | 200 after ~5s JS hop | `B0GS9N5KRP` Police Origine 65L trolley, `rogerkart-21` |

Both `link.amazon` codes are ASIN-shaped and **neither is the ASIN** — `B0h3ko7q0` → `B0GSKLW894`, `B05yvriRF` → `B0G38DGNKM`. Third independent confirmation of that rule. Resolve first, always.

## Dedup — 5 candidates, 5 dups, 0 fresh

Seen cache read as JSON, not grepped. `grep -c` counts matching **lines** and `data/tg-multi-seen.json` is one single line of JSON, so it returns `1` for every id whether present or not — a silent false positive either way. Checked with `JSON.parse(...).includes(id)` instead.

All 5 present in the cache (1,776 entries) **and** all 5 live in the DB:

| ASIN | DB row | Product |
|---|---|---|
| `B0D95QS6DQ` | #10836 LIVE ₹1,186 | HP Travel Hub USB-C G3 multiport adapter |
| `B07QX21WZQ` | #5825 LIVE ₹549 | TrustBasket UV-treated 6" round pots, set of 12 |
| `B0GSKLW894` | #10837 LIVE ₹399 / ₹799 | Clensta anti-dandruff shampoo + conditioner 250ml |
| `B0G38DGNKM` | #7110 LIVE ₹3,459 / ₹6,299 | Lavie Luxe Quaro26 satchel — ingested 2026-08-22 |
| `B0GS9N5KRP` | #10838 LIVE ₹1,599 / ₹9,999 | Police Origine 65L cabin trolley, TSA lock |

Three of the five are our own 2026-09-21 batch coming back round on a different channel. Nothing was appended to `data/tg-multi-seen.json` — every id was already in it, count stays 1,776.

## Rot check on the dups — 5/5 stored prices still correct

A dup is not automatically healthy, so four PDPs were re-read rather than assumed (the fifth, `B0D95QS6DQ`, was quoted at our own stored ₹1,186 by the channel itself). All in stock, all stored prices match live to the rupee — including the row ingested a month ago.

| ASIN | Our stored | PDP now | Verdict |
|---|---|---|---|
| `B07QX21WZQ` | ₹549 | ₹549, In stock | correct |
| `B0GSKLW894` | ₹399 / ₹799 | ₹399 / ₹799, In stock | correct |
| `B0G38DGNKM` | ₹3,459 / ₹6,299 | ₹3,459 / ₹6,299, In stock | correct — 31 days old, zero drift |
| `B0GS9N5KRP` | ₹1,599 / ₹9,999 | ₹1,599 / ₹9,999, In stock | correct |
| `B0D95QS6DQ` | ₹1,186 | channel quotes the same ₹1,186 | correct |

`currentAsin` echoed the requested ASIN on all three fetched PDPs — no sibling-ASIN redirect anywhere in this set.

**Two channel numbers were wrong and ours were right**, which is the inverse of the usual finding:

- **NonStopDeals posted "151" on `B07QX21WZQ`.** That ASIN is a ₹549 set of 12 plant pots. ₹151 is not a price on that listing at all.
- **Rogerkart posted "reg ₹4,099" on the Police trolley.** Amazon's list price is ₹9,999, which is what we already store. Their MRP is the wrong one, not ours — so there is no inflated-discount defect on #10838.

**The per-unit-rate trap fired twice more and was ignored both times:** the pot set reads `₹45.75` per count and the Clensta reads `₹159.60` per 100 ml in the core price block. Neither is the price. Never take the second ₹ in the block as MRP.

Also re-confirmed: `.a-price .a-offscreen` reads **empty** on the Lavie bag PDP (apparel/bags), so the `₹`-regex scoped to `#corePriceDisplay_desktop_feature_div` is the reliable read. Slicing the first N chars of `#centerCol` innerText misses the price entirely — the head of that block is inline `<style>`/`<script>` text.

## Freshness

No deals created → `indexnow-ping.mjs` **not run**. Nothing to ping. Sitemap (ISR 1800s) and `llms.txt` (force-dynamic) are unchanged because the DB is unchanged. Nothing is sitting unshipped in the DB.

## Flags

**INDIAN CHEAP DEALS (`-1001552238721`) is NOT dead — retracting last tick's recommendation.** `reports/tick-2026-09-22g-telegram.md` line 64 called it dead ("newest message Aug 21, a month of silence") and recommended dropping it from `data/tg-groups.json`. This sweep shows it posting a handbag deal in the sidebar, and that post resolved to a real ASIN. The earlier read came from a message-history scrape that landed on stale rendered content — it was not evidence of an idle group. **Do not drop it.** Recorded here so the older report's recommendation is not acted on later.

**Unlisted group, fifth consecutive flag:** `𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) is still posting single-product links and is still not in `data/tg-groups.json`. Right shape, Cuelinks-eligible. Owner decision — that file was deliberately re-verified 2026-09-13 and is not being edited silently.

**New toolchain gap: `link.amazon` 404s to curl.** Two of five candidates would have been silently discarded as dead links if resolution had stopped at curl. Any shortlink resolver from here on must fall back to a browser tab on a 404 from `link.amazon`, and must treat a 200 with an unchanged effective URL (the rogerkart shell) as *unresolved*, not as a destination.

**rogerkart.com is an affiliate cloaker, not a merchant.** `/r/<code>` is a JS-redirect shell that lands on Amazon with `tag=rogerkart-21`. Treat its links as Amazon candidates, never as a new store.

**Amazon.in is still signed OUT in the `richDeals` profile** — third consecutive tick. Public price and stock render fine, so this tick's reads are sound, but member and clip-coupon pricing will silently read the public number. Not fixed: logging in touches the owner's credentials.

## Yield note

Five candidates, five already ours. The 05:00 IFS tick was 0 of 6, this one is 0 of 5 — the overnight window is producing near-zero *new* inventory while still costing a full browser pass per tick, because the sources are recycling our own catalogue back at us. Worth noting that the 05:55 tick's 4 publishes came from **scraping one group's message history**, not from the sidebar. That is the higher-yield path, and it currently only runs when the sidebar looks static.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-15=3 09-16=3 09-17=3 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (past, unfixable) |
| coverless / seo-less posts | 0 / 0 of 322 | OK |
| LIVE deals | 10,501 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10848 = DB max 10848 | OK — fully caught up |
| prod endpoints | 7/7 200 — `/` 0.29s, `/offers` 0.12s, `/blog` 0.48s, `/sitemap.xml` 0.09s, `/feed.xml` 0.10s, `/api/deals` 0.09s, `/llms.txt` 0.40s | OK |
| unpushed commits | 0 before this report | OK |

**Standing structural risk, eleventh consecutive tick:** `schtasks` has zero richdeals entries. Every job in `.claude/cron-schedules.md` is a session cron living in memory — when this session closes, ingest, blog publishing, broadcasts and all audits stop, with no alert. Task Scheduler wiring was offered in an earlier session and never approved; nothing was changed.
