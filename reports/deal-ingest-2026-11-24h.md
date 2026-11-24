# DEAL-INGEST (indiafreestuff) tick — 2026-11-24h

This tick ran at about 14:50–15:15 IST on 11-24. Stage 1 was `apps/api/scripts/ingest-ifs-proper.mjs`, sweeping both `/deals` and `/deals/superdeals`. Each base64 `?rto=` Buy Now id was resolved to the real store URL. Every candidate price was read on the product page: Amazon in the logged-in Playwright Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart), with the mobile-UA fallback where needed. The affiliate matrix came from `ingest.config.json`, all copy was rewritten, and images came from the marketplace CDN only.

**Result:**

- **29 new deals were pushed LIVE (#17206–#17234).** Every call returned HTTP 201 with count 1 and `created:true`, and every slug was confirmed.
- **4 duplicate LIVE rows were repriced in place** (#17168, #17193, #1590, #16353). All kept their slugs. The stale copy on #1590 and #17193 was rewritten in the same tick.
- **36 duplicates were checked and left unchanged** (35 match the live price; #13938 is out of stock).
- **15 candidates plus one whole brand block were rejected** (drift, unavailable, vehicle, duplicate).
- **IndexNow returned HTTP 200** for 36 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Fresh rows (not in the DB by productId) | 46 |
| Duplicate rows (already in the DB) | 40 |
| Fresh rows pushed after PDP verification | 29 |
| Fresh rows rejected | 17 (15 single items plus the 2-item Expresso block) |

## Pushed (29)

All are Amazon `/dp/ASIN?tag=ashoksachdev-21` links with `m.media-amazon.com` images. The price is the live PDP price.

| ID | ASIN | Product | Price |
|---|---|---|---|
| #17206 | B01ENGH91E | Sattva football bean bag cover, XXXL | ₹574 |
| #17207 | B0HFKCMK1K | Buds 3 Type-C wired earphones | ₹474 |
| #17208 | B0C8V5M5KM | Kobo women's high-waist workout shorts | ₹384 |
| #17209 | B07P912R19 | Solimo non-stick casserole, set of 2 | ₹935 |
| #17210 | B0HJN9CHRD | Lavender liquid handwash, 5L can | ₹289 |
| #17211 | B0GV7S8RKJ | Dongcheng 12V cordless drill | ₹2,898 |
| #17212 | B0GF2CX43H | Move Meant Travelfy 55cm cabin trolley | ₹1,449 |
| #17213 | B0DX1SZX2S | Cable World 2-in-1 kitchen playset | ₹699 |
| #17214 | B073P98QV8 | Timex men's analog watch | ₹2,550 |
| #17215 | B0CJ4R59NJ | 24-inch round LED bathroom mirror | ₹2,006 |
| #17216 | B0GC6Z3YQF | Geonix Trot R7 mini UPS for routers | ₹899 |
| #17217 | B08M3FJ4BS | Cutting Edge 500ml containers, set of 12 | ₹511 |
| #17218 | B08N6NPXLL | Cutting Edge 1200ml containers, set of 8 | ₹725 |
| #17219 | B0HF4N36FB | Zebronics 65W Type-C cable | ₹199 |
| #17220 | B0H8SRGLR7 | Poppigo period panty, 2 packs | ₹459 |
| #17221 | B0BZ4NX7N1 | Halonix 36W LED batten, pack of 4 | ₹1,065 |
| #17222 | B07BR2YK6R | PremiumAV USB printer cable | ₹119 |
| #17223 | B0BGHGY5F3 | Bella Classic Comfort pads, 20 | ₹113 |
| #17224 | B0GRNKGGGR | Action Pilo men's slippers | ₹394 |
| #17225 | B0D2RK58LB | Cahoot men's distressed jeans | ₹342 |
| #17226 | B0F4KM18T4 | Atorse 7-button wired mouse | ₹555 |
| #17227 | B0F26MJSXL | Zebronics Pods K3 earbuds | ₹699 |
| #17228 | B074KKM2MP | Philips HP8100 hair dryer | ₹628 |
| #17229 | B0FBRQQXDZ | Slovic 1L steel sipper bottle | ₹199 |
| #17230 | B08P5ML6GK | Wildhorn leather wallet | ₹485 |
| #17231 | B09NLX78N2 | Crompton 5W LED batten, pack of 4 | ₹441 |
| #17232 | B00IG7DWWM | Dabur Ratnaprash chyawanprash 450g | ₹292 |
| #17233 | B0DSW7W946 | RR Signature Brightair BLDC fan | ₹2,399 |
| #17234 | B0C6QV6PSD | RR Signature Jaipur Gangaur BLDC fan | ₹2,999 |

#17215's Amazon M.R.P. is ₹15,000, which looks inflated. It joins the watch list.

## Rejected

| Reason | Items |
|---|---|
| Drift above ₹1 | SleepZ, Home Centre ottoman, CSI shelf, mascara, Souleva ACV, adhesive shelf, DOCAT kettle, cork lights, knee brace, HP OmniBook 5 |
| Drifting brand block, rejected whole | Expresso (B0F3BH5HWJ, B0HL4K6Q2K) |
| Unavailable / no buy box | Kalaanj kurta, Cockatoo walking pad, BLACK+DECKER chainsaw |
| Vehicle (not a shippable product) | Bajaj Pulsar |
| Duplicate | Mouse B0FWBYSX92 |

## Duplicates (price-sync)

| Row | Before | After | Copy |
|---|---|---|---|
| #17168 Nirlon cookware | ₹746, M.R.P. ₹3,190, 77% | ₹1,889, M.R.P. ₹4,088, 54% | Title and description updated |
| #17193 Hot Wheels '55 Chevy | ₹179, no M.R.P. | ₹480, M.R.P. ₹1,499, 68% | Description rewritten (dropped the stale "no M.R.P." line) |
| #1590 Vaseline body lotion | ₹283, M.R.P. ₹620, 54% | ₹289, M.R.P. ₹565, 49% | Legacy "64% Off ... @226" title and description rewritten. The legacy slug was kept to avoid a 404 |
| #16353 Wipro LED batten | ₹645, no M.R.P. | ₹727, M.R.P. ₹2,250, 68% | Price updated in the text |
| #13938 Halonix 10W (B07GLQPYKW) | — | Out of stock | No change. Joins the no-buy-box list |

Each reprice used `prisma.deal.update` plus a `priceHistory` row. The 35 unchanged duplicates were #17169–#17197 (various), #17202, #17145–#17149, #3366 and #440.

## Push

`/admin/deals/bulk` was called once per item on localhost, which writes to prod through the tunnel. All 29 returned `201 {"count":1,...,"created":true,"ok":true}`. The read-back confirmed status LIVE and the slug sent for every row. The new max id is 17,234.

Two new pages were probed on prod: the Sattva bean bag cover and the RR Signature Jaipur Gangaur fan both return 200 (0.15–0.16s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 36 URLs: 29 new and 4 repriced slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.37s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.56s. Slowest: `/blog` (0.56s) | OK |
| DB LIVE vs API total | 16,626 = 16,626 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,234 vs 17,210 | OK. The external broadcast cron is working through the batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24g` already existed, so this report uses `h` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **DesiDime `/new` returned 0 cards** in desidime 11-24h. Check on the next DesiDime tick.
- **Stale reposts:** LIVE Amazon prices drift silently. 18 rows have been repriced today (4 this tick).
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH).
- **Legacy slugs and titles:** #1530's slug and #1590's slug still carry old figures (kept to avoid a 404); #299 and #3366 need a geo-optimizer title rewrite.
- **IFS yield:** 29 of 46 fresh rows survived verification this tick; the card prices still lie on about a third.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`, plus #17167, #17204 and now #17215.
- **No buy box:** #7259, #12963, #14154 and now #13938.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 3 of the 13 TG groups were not loaded in the last TG tick.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
