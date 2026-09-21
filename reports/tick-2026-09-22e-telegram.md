# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 04:47 IST

**Result: 6 published (#10839-10844), IndexNow HTTP 200 / 9 urls.** Two candidates rejected on verification, five were already live.

## Sidebar returned nothing — escalated to message history

The first read was the standard one `browser_evaluate` over `.chat-list .ListItem.Chat` in profile `richDeals`. It came back **byte-for-byte identical to the 03:47 sweep** — same 25 rows, same last-message text on every one of the 13 sanctioned groups. Zero new candidates, and the second 0-published tick in a row.

Rather than close at 0, took the CLAUDE.md deeper-history path: trusted click into **ONLINE SHOPPING DEALS🇮🇳** (`-1001940328982`) via `browser_click({target:'a[href="#-1001940328982"]'})`, then scraped `.message-content`/`.text-content` for the last 14 messages. **13 single-product Amazon posts**, all behind `link.amazon/<code>` shortlinks — none of which the sidebar's one-line preview would ever have shown.

Worth keeping: the sidebar preview is a *latest-message* view, not a *new-message* view. A group that posted 13 deals in a burst and then one non-deal line looks identical to a dead group. History scraping is not a fallback, it is the only complete read.

## Shortlink resolution

All 13 resolved via a bash `curl -sIL` loop with a browser UA and a 1s gap. Their tag is `vivek123034-21`; several URLs carry a junk `/source=offertag.in/` path segment before `/dp/`.

Standing trap re-confirmed: **the code is never the ASIN.** `link.amazon/B0h3ko7q0` → `B0GSKLW894`. Both are ASIN-shaped; only one exists.

## Dedup (13 → 8 fresh)

`_dd-0922e.mjs`, serial Prisma queries against live DB + `data/tg-multi-seen.json`.

5 dups: #10786 Bellavita, #10787 Wild Stone, #10767 Milton, #10808 Nivea, #10837 Clensta.

## PDP verification — 8 fresh, 6 pass

Read in the Playwright tab. One bulk same-origin `fetch()` loop over all 8 ASINs (1.2s gap, `DOMParser`), then a live-page re-read of every ambiguous one. Channel price trusted on none of them.

| ASIN | Product | Channel said | PDP truth | Verdict |
|---|---|---|---|---|
| B0FK3R485M | Aarika Women Knitted Cardigan | ₹269 | **₹399 / ₹1,249, 68%, In stock** | publish at ₹399 |
| B0BG88FS1G | Puma Women Gina Sneakers | ₹1,247 | ₹1,247 / ₹4,299, 71%, In stock | publish |
| B0B1J91BCD | Wonderchef Venice Casserole, set of 2 | ₹549 | ₹549 / ₹1,960, 72%, In stock | publish |
| B0DM28ZYKN | Conscious Chemist Sunscreen SPF50 20g | ₹126 | ₹126.05 / ₹249, 49%, In stock | publish at ₹126 |
| B0C2J1BT96 | AuraDecor Heat Diffuser Gift Set | ₹175 | **₹215 / ₹399, 46%, In stock** | publish at ₹215 |
| B07RNY24QH | Kohler Brive Slow Close Toilet Seat | ₹846 | ₹846 / ₹2,310, 63%, In stock | publish |
| B0GHSC6281 | DR.RASHEL Day & Night Combo | ₹179 | ₹179 **= MRP ₹179** | **REJECT** — 0% off |
| B09PZYGSXB | Inefable Earphone Case, 2-pack | ₹59 | ₹59, no real MRP, "Only 2 left" | **REJECT** — no discount, thin stock |

Two channel prices were wrong (Aarika ₹269→₹399, AuraDecor ₹175→₹215). Both still carry a real discount, so they published at the PDP number, not the channel number.

## Two new Amazon-scrape traps, both cost a wrong price

**1. `.a-text-price .a-offscreen` can be a UNIT price, not the MRP.** On fetched HTML, B0DM28ZYKN read `mrp ₹630.25` — that is `₹630.25 /100 g`, the per-100g rate on a 20g tube. Real MRP is ₹249. B09PZYGSXB read `mrp ₹29.50`, the per-unit price of a 2-pack; there is no MRP on that listing at all. Publishing either would have shipped a fabricated discount into Product/Offer schema.

**2. Apparel and footwear PDPs return `price: null`** from `#corePriceDisplay_desktop_feature_div .a-price .a-offscreen`. Both Aarika and Puma came back priceless from the bulk fetch and looked like dead listings; both were in stock and correctly priced.

One selector fixes both: **`document.querySelector('#centerCol').innerText`**, which renders `"₹399.00 with 68 percent savings ... M.R.P.: ₹1,249.00"` on every Amazon layout variant tested. It is the only price read that should be trusted from here on; the structured selectors are a fast first pass that must be confirmed.

## Push + freshness

`apps/api/scripts/push-tg-0922e.mjs` (direct Prisma, `status:'LIVE'`, title-₹-vs-price assertion on every row, `priceHistory` seeded). **created=6 updated=0** → #10839-10844. All images are real `m.media-amazon.com/images/I/` hiRes ids pulled off each PDP.

```
node apps/api/scripts/indexnow-ping.mjs <6 slugs>
DONE: IndexNow -> HTTP 200 for 9 urls
```

9 = 6 slugs + 3 standing paths, as expected. Sitemap is ISR 1800s (≤30 min), llms.txt is force-dynamic — both pick the batch up with no action. All 8 ASINs (6 published + 2 rejected) appended to `data/tg-multi-seen.json`, now 1,768 entries.

## Flags

**Amazon.in is signed OUT in the `richDeals` Playwright profile** — the header reads "Hello, sign in". CLAUDE.md states this profile is logged in to both Telegram Web and Amazon.in; half of that is no longer true. Prices and stock still render for signed-out users, so this tick's verification is sound, but anything needing a logged-in read (cart price, member-only coupons, Prime pricing) will silently read the public number instead. Not fixed here — logging in touches the owner's credentials.

**Unlisted group, third consecutive flag:** `𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) keeps posting single-product Tata Cliq links — right shape, Cuelinks-eligible, not in `data/tg-groups.json`. That list was deliberately re-verified 2026-09-13, so it is not being widened silently. Owner decision.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-17=2 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (known, past, unfixable) |
| coverless / seo-less posts | 0 / 0 | OK |
| LIVE deals | 10,497 (+6 this tick) | OK |
| LIVE null price / null image | 0 / 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10838 vs DB max 10844 | expected — this tick's 6, next broadcast run clears it |
| unpushed commits | 0 before this report | OK |

**Standing structural risk (unchanged, fourth tick running):** every one of these jobs exists only inside this Claude session. `schtasks` has zero richdeals entries and session crons are in-memory, so the moment this session closes, deal ingest, blog publishing and the audits all stop with no alert. Task Scheduler wiring was offered in an earlier session and never approved — nothing was changed.
