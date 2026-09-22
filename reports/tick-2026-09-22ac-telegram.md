# TELEGRAM-DEAL-MONITOR — tick `2026-09-22ac`

Playwright MCP, profile `richDeals`, `web.telegram.org/a/`. One `browser_evaluate` over
`.chat-list .ListItem.Chat` — no chat reloads, no snapshots. 13 tracked groups from
`data/tg-groups.json`.

**Result: 0 new pages + 1 in-place refresh. IndexNow 4/4 → HTTP 200.**

## Funnel

| stage | count |
|---|---|
| sidebar rows read | 25 |
| rows belonging to the 13 tracked groups | 13 |
| shortlinks worth resolving | 6 |
| single-product candidates after the skip rules | 4 |
| fresh after dedup (`tg-multi-seen.json` + live DB) | 1 |
| survived PDP price/stock verification | 1 — as a refresh, not a new page |

## Refreshed in place

Dedup hit: the one surviving candidate was already live as deal 2982, so the indexed slug
was preserved and the row rewritten rather than a second page created.

| id | store | productId | was | now | off | slug |
|---|---|---|---|---|---|---|
| 2982 | Amazon | B0CTHK1FS1 | ₹189 / mrp `null` / pct `null` | ₹170 / mrp 495 | 66% | `livon-professional-smoothening-hair-serum-189-B0CTHK` |

PDP read in the logged-in Amazon tab (curl is bot-blocked): **₹170.00**, **M.R.P. ₹495.00**,
`In stock`. The page also carries a `₹170.00 per ml` unit rate — that is a per-unit figure, not
the price; the leading ₹ figure in the core price block is the one taken. Image swapped from the
low-res `61P64IwGbSL.jpg` to the real CDN `61P64IwGbSL._SL1500_.jpg`.

Also rewritten because the stored copy still claimed ₹189 and `howTo` was empty: title,
~1,050-char original description, and a 4-step `howTo` whose step 2 is the row-specific caveat
(Livon sells this serum in several pack sizes — ₹170 is the 100ml bottle only, the 50ml and
sachet listings are separate pages). `PriceHistory` row written, 189 → 170.

The slug keeps its legacy `-189-B0CTHK` tail. It is indexed; renaming it for cosmetics would
throw away the ranking. Left alone by rule.

## Skipped, with reasons

- **Wipro ceiling lights** (posted in both SB Loots and CoolzTricks) — both shortlinks resolve to
  `amazon.in/s?…` search pages. Search-page rule.
- **Dealdost Coursera Plus** — subscription, not a store product.
- **Rogerkart "Upto 85% Off Zivame"** — category page.
- **IndiaFreeStuff Swiggy Instamart**, **Hidden Loot Zepto** — search/loot posts.
- **Deal Dibba** — `t.me` join links, no product.
- **OMG LOOTDEALS** — non-deal chatter.
- **Yonex ET 901 (`B06WV77YDB`)** — verified live at ₹85, In stock, but the PDP carries **no
  M.R.P.**, so it would publish with a null mrp and null pct, feeding the rot already flagged
  below. Already SEEN in the dedup store anyway.

Shortlink codes are ASIN-shaped and wrong again, re-proven on all three resolved links:
`link.amazon/B0ejcpBlC` → `dp/B0CTHK1FS1`, `link.amazon/B0hLf0C6s` → `dp/B06WV77YDB`,
`link.amazon/B05yvriRF` → `dp/B0G38DGNKM`. Never treat the code as the ASIN.

Dedup killed 3 of 4: `B06WV77YDB`, `B0G38DGNKM` (also live as deal 7110), `PWBGGD4THDQZYAY6`.
`B0CTHK1FS1` appended to `data/tg-multi-seen.json` — now 1,808 entries.

## Freshness

`indexnow-ping.mjs` throws on this network (`getaddrinfo EAI_AGAIN api.indexnow.org`) — DNS, not
a 422. Bing GET fallback used, one request per URL:

**4 URLs → HTTP 200, all 4** — the refreshed slug + `/`, `/offers`, `/sitemap.xml`.

Live page verified after the write: `/livon-professional-smoothening-hair-serum-189-B0CTHK`
returns 200 and its Product JSON-LD now carries `"price":"170"`.

Prod endpoints, all 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`,
`/llms.txt`.

## CEO audit

Clean:

- live deals **10,582**, PENDING_REVIEW **0**, null price **0**, null image **0**
- coverless posts **0**, seo-less posts **0**
- broadcast cursor vs DB max (10929) — in range
- 7/7 prod endpoints 200

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST:
   09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *`
   losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
2. **41 live deals state a price in the title the row does not hold** — flat against the last
   read, so it is not growing, but it is not shrinking either. Several are off-by-one rounding
   (deal 9708 title Rs.132 vs price 133, deal 5450 8651 vs 8652, deal 14 165 vs 164, deal 7554
   708 vs 709); the worst are legacy hand-typed coupon titles (1716, 1450, 2602). Retitle pass
   not authorised.
3. **nullMrp 1,622 / nullPct 1,599** — each down exactly 1 from the last tick, and that 1 is this
   tick's refresh. At this rate the backlog clears in about 1,600 ticks. Backfill still
   unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`, not a
   `linksredirect.com` wrapper. The other 19 LIVE wrapped rows (shopsy 13, jiomart 3, tatacliq 1,
   testbook 1, playstation 1) are correct — none is Myntra, so none is on the deactivated account.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod
   (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the
   EXPIRED path, not refreshed to a price nobody can pay.
7. **`api.indexnow.org` does not resolve from this network.** Every tick should expect the node
   script to throw and go straight to the Bing GET fallback.
8. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens →
   delete + regenerate).

Overnight yield behaved as documented — ~1 unique product across 13 groups, and that one was
already ours. deal-ingest remains the heavier source.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
