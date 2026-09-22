# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 08:08 IST

**Result: 3 published (#10850, #10851, #10852), IndexNow HTTP 200 / 6 urls, all 3 slugs 200 on prod.** 8 candidates → 2 DB dups, 1 loot-skip, 2 quality rejects, 3 publishes. Includes **the site's first-ever Tata Cliq deal**, which required reverse-engineering their product API because the CLAUDE.md "non-Amazon merchants serve ld+json to curl" rule does not hold for them.

## Sidebar — one evaluate, then escalated to message history

One `browser_evaluate` over `.chat-list .ListItem.Chat` in profile `richDeals`, after `browser_tabs select` back to the Telegram tab. That tab-select is mandatory in **both** directions: the sidebar evaluate silently returns `[]` from another tab, and the Amazon same-origin fetch later needs the `amazon.in` tab current.

**25 rows**, and the last-message text was largely unchanged against the 06:50 sweep — only one new sidebar candidate (CoolzTricks, Lakme Powerplay Priming Foundation @279). A static sidebar is the documented trigger to scrape one group's message history, which is where 7 of the 8 candidates actually came from.

Escalation: trusted click on `a[href="#-1001174144067"]` (CoolzTricks) → `.message-content, .text-content` → **25 entries, ~13 unique** (both selectors match the same node, so every message appears twice), spanning 09:45 PM → 12:21 AM.

**`NonStopDeals` was absent from this sweep's rows.** The chat list is virtualized, so it was almost certainly scrolled out of the rendered window — recorded as a read artefact, not a liveness claim about the group.

Correct skips from that history: Vector X Sports Clothing (category), Mochi Footwears (category), Woodland Footwears (6-link multi), Kotty Co Ords (multi), an Apple Watch Series 12 availability post (no price at all), Zivame Bra (category), and the "More:" category link riding along under the Levi's post.

## Shortlink resolution — 8 for 8

Seven `amzn.to` codes, all HTTP 200 to curl, all tagged `collab-amafhh-21` at the far end:

| Shortlink | ASIN |
|---|---|
| `amzn.to/47cYSB4` | `B07YVHGYLB` |
| `amzn.to/4hkakje` | `B0GC7F9165` |
| `amzn.to/4cZZZHQ` | `B0DG2KY2S2` |
| `amzn.to/3Vs3nVP` | `B0GG9GVVFS` |
| `amzn.to/46x9mer` | `B071GWV52P` |
| `amzn.to/4y6UL5j` | `B0HF1FLRCR` |
| `amzn.to/4xxF9Xz` | `B0FNRLVDNL` |

The eighth was not Amazon. `bitli.in/V19js4W` → `trackingv3.linkredirect.in/visitretailer/2739?…&dl=<urlencoded>` — **`bitli.in` is Cuelinks' own tracker under a vanity host**, and the real destination sits URL-encoded in the `dl=` query param. Decode it; do not chase further redirects. Destination: Tata Cliq `apple-20w-usb-c-power-adapter-white-for-iphone-ipad-airpods/p-mp000000008093500`.

## Dedup — the seen cache contributed nothing, the DB caught both

`seen entries 1776`, and **zero of the 8 ids were in it**. Both dups were caught by the DB probe instead:

| id | Seen | DB |
|---|---|---|
| `B07YVHGYLB` | no | **#9130 LIVE ₹279 / ₹699** — channel quoted ₹279, exact match |
| `B071GWV52P` | no | **#51 LIVE ₹183 / mrp null** — channel quoted ₹183, exact match |
| other 6 | no | NONE |

A 1,776-entry cache that misses two ids already live in the DB is a cache that is not being appended to reliably by every tick. The DB probe is the real dedup gate; the JSON file is a cheap pre-filter at best. All 8 ids were appended this tick — **1,776 → 1,784** — including the rejects, so the next tick does not re-verify them.

`B0FNRLVDNL` was skipped per the brief ("Loot 186 / other sizes 800+" is a loot post) but checked anyway, since a checked-and-skipped id is worth caching.

## Price verification — 5 candidates, 3 publish, 2 reject

Amazon read in one same-origin bulk `fetch(..., {credentials:'include'})` from the open `amazon.in` tab — no per-ASIN navigation, and the only read Amazon does not bot-block.

| id | Product | PDP truth | Channel said | Verdict |
|---|---|---|---|---|
| `B0GC7F9165` | Levi's Women Regular Fit Cotton T-Shirt | **₹400 / ₹999, -60%, in stock** | ₹400 | **PUBLISH** |
| `B0GG9GVVFS` | Lakme 9to5 Hya Matte Liquid Lipstick, Werk Rose | **₹318.72 / ₹799, -60%, in stock** | ₹318 | **PUBLISH** |
| `mp000000008093500` | Apple 20W USB-C Power Adapter (Tata Cliq, seller ClickBuy) | **₹1,245 / ₹2,190, -43%, 9,982 in stock** | ₹1,073 | **PUBLISH at PDP truth** |
| `B0DG2KY2S2` | TVS Racing Titan Full Face Helmet | ₹2,394 / ₹2,999, **-20%**, in stock | ₹1,579 | **REJECT** |
| `B0HF1FLRCR` | PASCIA LED Magnetic USB Rechargeable Light Bar | ₹498 / ₹999, -50%, in stock | ₹273 "Apply Coupon" | **REJECT** |

**`B0DG2KY2S2`** — the advertised ₹1,579 does not exist on that listing; the PDP is 52% higher. Publishing at PDP truth would mean shipping a **-20%** helmet, which is below the thinness floor the Godrej aer **-10%** rejection set two ticks ago. Rejected for thinness, not for drift.

**`B0HF1FLRCR`** — rejected on quality, the same ground as the `B0GLYZ6TB3` HEAVENGLOW precedent. A no-name brand carrying a ₹999 MRP anchor on what is a ₹300–500-class LED bar makes the "-50%" meaningless, and the ₹273 post-coupon claim is unverifiable because clip-coupon selectors read empty on fetched HTML (standing finding: channel prices are frequently post-clip-coupon).

`currentAsin` echoed the requested ASIN on three of four fetched PDPs. **It read `null` on `B0HF1FLRCR`** — that listing has no twister block because it is single-variant, so a null is the absence of a variant widget, not evidence of a sibling-ASIN redirect. Noted so it is not misread as one next time.

**`.a-offscreen` read EMPTY on all four ASINs this tick.** Fourth consecutive tick where that selector failed. The reliable read is cloned-node `textContent` of `#corePriceDisplay_desktop_feature_div` with `style,script` stripped, `.basisPrice` for MRP and `.savingsPercentage` as authoritative for the percentage. `.a-offscreen` should be treated as unavailable, not as a fallback.

## Tata Cliq: the ld+json rule does not hold, but there is a JSON API

The CLAUDE.md ALL-STORES rule says non-Amazon merchants serve `Product.offers.price` in `ld+json` to plain curl. **Tata Cliq does not.** curl gets a 13,988-byte client-rendered SPA shell (`<meta name="fragment" content="!">`, `mpl-web-dk`) whose two `ld+json` blocks are `WebSite` + `Organization` only — no Product node anywhere. Verifying price from the HTML is impossible.

The answer is their own mobile product API, which is public and curl-readable:

```
https://www.tatacliq.com/marketplacewebservices/v2/mpl/products/productDetails/MP000000008093500?isPwa=true&isMDE=true
→ HTTP 200, ~30 kB, "type":"mplNewProductDetailMobileWsData"
```

**The PID must be UPPER-CASE** even though the URL slug carries it lower-case (`p-mp000000008093500`). Field map, with the traps that cost real calls to find:

| Need | Field | Trap |
|---|---|---|
| price | `winningSellerPrice.value` | **`price` is `undefined`** — the obvious field is empty |
| MRP | `mrpPrice.value` | — |
| discount | `discount` | already an integer percent |
| stock | `winningSellerAvailableStock` + `allOOStock` | **`stockStatus` / `isStockAvailable` / `outOfStock` are all undefined** |
| seller | `winningSellerName` | 6 other sellers on this listing, all higher |
| slug | `seo.alternateURL` | — |
| image | `galleryImagesList[0].galleryImages`, `superZoom` = 1348Wx2000H | **protocol-relative `//img.tatacliq.com/…`** — prefix `https:` or the row fails the image whitelist |

Thinner legacy endpoint if the above ever moves: `/marketplacewebservices/v2/mpl/products/<PID>?isPwa=true`. **`prodapi.tatacliq.com` does not resolve** (HTTP 000).

**New curl trap worth carrying forward:** an endpoint returning `HTTP 000` leaves the previous iteration's `-o` output file untouched, so a `head -c` in the same loop prints a **stale** body next to the 000 status. That nearly got read as `prodapi`'s response. Never read a body printed beside a 000.

## Images — hiRes by regex, not by sorting keys

| id | Image |
|---|---|
| `B0GC7F9165` | `m.media-amazon.com/images/I/51aYX46KrhL._SL1200_.jpg` |
| `B0GG9GVVFS` | `m.media-amazon.com/images/I/41uKCJ8MlpL._SL1000_.jpg` |
| Tata Cliq | `img.tatacliq.com/images/i7/1348Wx2000H/MP000000008093500_1348Wx2000H_202101160056371.jpeg` |

Sorting `data-a-dynamic-image` keys by string length yields `_SX342_`/`_SX679_`; sorting by actual pixel width tops out at **679×679**. The genuinely large asset only appears in a regex over raw HTML — `/"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g` → `_SL1200_` / `_SL1000_`. 25 and 26 hiRes matches respectively on these two PDPs.

## Push

`apps/api/scripts/push-tg-0922k.mjs` — direct Prisma, `status:'LIVE'` (the column defaults to `PENDING_REVIEW`, so it must be explicit), `priceHistory` seeded on create, **per-row store upsert** instead of one hoisted Amazon store.

```
NEW 10850 levis-women-regular-fit-cotton-t-shirt
NEW 10851 lakme-9to5-hya-matte-liquid-lipstick-werk-rose
NEW 10852 apple-20w-usb-c-power-adapter-white
created=3 updated=0
```

Two schema facts decided the shape of this push, both read from `apps/api/prisma/schema.prisma` (**not** the repo root — there is no `prisma/schema.prisma` there):

1. **`mrp` / `price` / `discountPct` are `Int`.** The Lakme PDP price is ₹318.72, so it stores as **319** — and the title therefore had to read **₹319**, or the title-₹-vs-price pre-flight assertion throws. Rounding the price without rounding the title is exactly the mismatch that assertion exists to catch.
2. **There is no `url` field on `Deal`** — only `affiliateUrl`. The dedup probe had to use `where: { affiliateUrl: { contains: id } }`; `url` raises `PrismaClientValidationError: Unknown argument 'url'`.

The image-host whitelist regex was **extended with `img\.tatacliq\.com`**. It previously allowed only `m.media-amazon.com` and `rukmini*.flixcart.com`, so the Tata Cliq row would have thrown on its own pre-flight — correct behaviour from that assertion, and the reason it exists.

Store row: `tatacliq` **already existed at id 34, name `TataCliq`** (one word). Upserted with `update: {}` rather than created, so no duplicate "Tata Cliq" row. It had **zero deals before this tick** — this is the first-ever Tata Cliq row on the site, which is why the whitelist gap had never surfaced.

Affiliate links: Amazon `?tag=ashoksachdev-21` replaces the channel's `collab-amafhh-21`; Tata Cliq wrapped in Cuelinks `linksredirect.com/?cid=527&source=linkkit&url=<encoded>` per the affiliate matrix. Titles, descriptions and how-to steps are original copy — no channel text anywhere.

## Freshness

```
node apps/api/scripts/indexnow-ping.mjs <3 slugs>
DONE: IndexNow -> HTTP 200 for 6 urls
```

6 = 3 slugs + the 3 standing paths the script always prepends (`/`, `/offers`, `/sitemap.xml`), so the sitemap submission is already inside this POST. No 422, no Bing fallback needed.

All three verified live on prod after the push:

| URL | Status | Time | Size |
|---|---|---|---|
| `/levis-women-regular-fit-cotton-t-shirt` | 200 | 0.265 s | 173,763 b |
| `/lakme-9to5-hya-matte-liquid-lipstick-werk-rose` | 200 | 0.169 s | 173,684 b |
| `/apple-20w-usb-c-power-adapter-white` | 200 | 0.199 s | 72,872 b |

The Tata Cliq page is **less than half the byte size** of the two Amazon pages. That is the store having exactly one deal, so the related/more-from-store blocks render empty — a consequence of being the first row in a store, not a broken template. It will normalise as Tata Cliq inventory grows.

Sitemap is ISR 1800 s and `llms-full.txt` is `force-dynamic`; both pick the batch up unaided. Nothing is sitting unshipped in the DB.

## SITEMON — 7/7 200

| Endpoint | Status | Time | Size |
|---|---|---|---|
| `/` | 200 | 0.187 s | 308,492 b |
| `/offers` | 200 | 0.132 s | 60,233 b |
| `/blog` | 200 | 0.464 s | 149,515 b |
| `/sitemap.xml` | 200 | 0.327 s | 2,134,655 b |
| `/feed.xml` | 200 | 0.106 s | 44,744 b |
| `/api/deals` | 200 | 0.128 s | 45,135 b |
| `/llms.txt` | 200 | 0.459 s | 14,776 b |

`/api/deals` and `/feed.xml` both grew against the 07:50 read, consistent with the batch landing. Sitemap byte-identical to the 07:27 read — it is ISR 1800 s, so the three new `<loc>`s are due within the half hour.

## CEO audit — verified against the DB, post-push

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-15=3 09-16=3 09-17=3 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (past, unfixable) |
| coverless / seo-less posts | 0 / 0 of 322 | OK |
| LIVE deals | 10,505 (+3 this tick) | OK |
| LIVE null price / null image | 0 / 0 | OK — nothing to classify or delist |
| PENDING_REVIEW | 0 | OK — no backlog |
| tg-broadcast cursor | 10849, DB max 10852 | expected — this tick's own batch, external cron sweeps it |
| IndexNow | 200, 6 urls | OK |
| pushed slugs on prod | 3/3 200 | OK |
| prod endpoints | 7/7 200 | OK |
| unpushed commits | 0 before this report | OK |
| tatacliq deals | 1 (was 0) | new store live |

The cursor sitting 3 behind DB max is this tick's own three rows and is **not** rot — the external `tg-broadcast` cron advances it on its next pass, as it has every time. Today is at 3 posts, inside the 2–3 target and under the cap of 4.

**Standing structural risk, fourteenth consecutive tick:** `schtasks` has zero richdeals entries — re-confirmed this tick, count 0. Every job in `.claude/cron-schedules.md` is a session cron living in memory. Session closes → ingest, blog publishing, broadcasts, audits and pings all stop, with no alert. Task Scheduler wiring was offered in an earlier session and never approved; nothing was changed.

**Amazon.in still signed OUT in the `richDeals` Playwright profile** — sixth consecutive tick. Public price and stock render fine so this tick's three Amazon reads are sound, but member and clip-coupon pricing silently reads the public number — which is precisely the blind spot behind the `B0HF1FLRCR` "₹273 Apply Coupon" claim being unverifiable. Not fixed: logging in touches the owner's credentials.

**Unlisted group, sixth consecutive flag:** `𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) is still posting single-product links and is still not in `data/tg-groups.json`. Right shape, Cuelinks-eligible. Owner decision — that file was deliberately re-verified 2026-09-13 and is not being edited silently.

## Yield note

Three publishes from a sweep whose sidebar barely moved. Every one of them came from **scraping one group's message history**, not from the sidebar last-message rows — the same pattern as the 05:55 tick's four publishes. The sidebar read is cheap (~1k tokens) but its yield is near zero overnight; the history scrape is where the inventory is. Worth considering whether the history scrape should run unconditionally on one rotating group per tick rather than only when the sidebar looks static.

The wider point: the highest-value work this tick was not finding deals, it was **opening a new merchant**. Tata Cliq now has a documented, curl-readable price path, which makes every future `bitli.in` link from any channel verifiable in one request instead of unverifiable. One deal today, an unblocked source from here on.
