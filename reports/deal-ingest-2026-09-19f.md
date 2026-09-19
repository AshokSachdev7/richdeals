# DEAL-INGEST indiafreestuff tick — 2026-09-19f (IST)

Yield: **20 deals pushed LIVE** (#10632-#10651), IndexNow **HTTP 200 for 23 URLs**. Biggest
single indiafreestuff batch on record this week, and the first tick where accepts outnumbered
rejects.

Funnel: 48 discovered → 44 resolved to a product → 36 fresh after dedup → 29 after pruning →
**20 survived price verification**.

## Discovery

```
https://indiafreestuff.in/deals
https://indiafreestuff.in/deals/superdeals
node apps/api/scripts/ingest-ifs-proper.mjs ./_ifs-0919f.json
DONE: 48 discovered, 44 resolved to a product
```

`GAP = 2600 ms`, above the 2.5 s floor. No 403 or 429 — the back-off path never armed.
Feedburner RSS is still dead (rot #17), so discovery ran off the two listing pages as usual.

**One resolve-time drop:** `jiomart-quick-offer--free-rs100-shopping` landed on the JioMart
homepage rather than a product. Rot #3 again, one fresh sample. All 44 survivors resolved to
Amazon `/dp/` URLs, so the non-Amazon `productLd()` path did no work this tick.

## Dedup — all statuses, not just LIVE

Prisma against the live DB on `productId`, with a `ZZZZFAKE123` control in the same `in` query.
Control came back **ABSENT(ok)**, so the lookup was not silently matching everything.

**44 candidates → 8 duplicates, 36 fresh.**

**Three duplicates carry serious price drift against our stored row — fresh rot #22 evidence:**

| ASIN | Our row | Stored ₹ | Source now ₹ |
|---|---|---|---|
| B0FNM7XWFD | #2569 LIVE | 2999 | 2550 |
| B0GQZDLCWT | #6930 LIVE | 229 | 198 |
| B0CSVZPWK9 | #6387 LIVE | 4324 | 3483 |

**#2569 is the same stale row the Telegram tick flagged an hour ago** — two independent
pipelines landed on it in the same hour without sharing state. That is the strongest evidence
yet that rot #22 is systematic rather than incidental: **five distinct stale LIVE rows** are now
on record (#10582, #10084, #2569, #6930, #6387).

## Pruning before verification — 36 → 29

Seven candidates were dropped before spending a verification on them:

| Dropped | Reason |
|---|---|
| B0F8BHJ3Y3 | 0% discount at source (299/299) — open owner decision #9, settled in practice |
| B0C9M3GBX4 | **already verified out of stock by the Telegram tick this same hour** (rot #19) |
| B0DW9CBPKF, B0DW99KFD8, B0DSWN79MJ | Nervfit Vibe colour variants — kept B0DW9B76RV only |
| B0F1T6FB7J, B0D87MVD97 | Sulfar car cover variants — kept B0F1T2TN28 only |

The variant trims apply the dup-slug thin-content rule: near-identical colour or fitment
variants of one product must not each get their own page.

## Verification — 29 ASINs, one batched call

Logged-in Playwright tab, same-origin `fetch(url, {credentials:'include'})` + `DOMParser`,
900 ms apart. Buybox signals only: `.priceToPay .a-price-whole`, `#add-to-cart-button`,
`#outOfStock`, `.basisPrice .a-offscreen`, `.savingsPercentage`. No `.a-price .a-offscreen`
sibling was ever taken as the price. All 29 returned; no exceptions.

### Accepted — 20

| ASIN | Product | Posted ₹ | Verified ₹ | MRP | Off |
|---|---|---|---|---|---|
| B0GFWGC26W | Maybelline Fit Me Spot Rescue Concealer 80 | 350 | 350 | 699 | -50% |
| B0CJRBF88Y | KINGSWAY window curtain, Skoda Octavia | 135 | 135 | 1599 | -92% |
| B0DT7CQMC7 | Nervfit Phoenix smartwatch 1.85" | 1899 | 1899 | 10999 | -83% |
| B0DW9B76RV | Nervfit Vibe smartwatch 1.85" | 1565 | 1565 | 7999 | -80% |
| B0CBSHMCWF | Nervfit Pulse smartwatch 1.83" | 998 | 998 | 7999 | -88% |
| B0GBPBG3NV | No Brainer multi-surface cleaner value pack | 176 | **175** | 698 | -75% |
| B0F2TC84SX | Highlander men's straight fit jeans | 624 | 624 | 2599 | -76% |
| B0F1T2TN28 | Sulfar waterproof car body cover (BMW 3) | 287 | **286** | 3995 | -93% |
| B0BXJ5684F | Viva Unicorn swimming goggles | 248 | **247** | 1249 | -80% |
| B09WVZ86Z5 | Amazon Brand House & Shields men jeans | 593 | 593 | 1999 | -70% |
| B0D3N3VMBC | Philips 12W black reflector LED COB spot light | 2215 | **2214** | 6540 | -66% |
| B0BGT9TWL6 | Hikvision K5 2K dual-channel dash cam | 4785 | 4785 | 16400 | -71% |
| B0C7KQXXCW | Kozdiko bike body cover (Bajaj) | 164 | **163** | 1999 | -92% |
| B0H9PRYHYR | Bean bag chair cover 1XL Brown/Dark-Grey | 742 | 742 | 4999 | -85% |
| B08QW6ZZJ1 | Steam-distilled rose water toner mist | 226 | 226 | **995** | -77% |
| B0C53PLH4N | Larah by Borosil 27pc opalware dinner set | 1332 | 1332 | 3300 | -60% |
| B0819HZPXL | Zebronics Transformer-M mouse | 314 | 314 | 549 | -43% |
| B0DRP49NNC | Philips multi-wattage LED bulb (9W/0.5W) | 680 | 680 | 2232 | -70% |
| B082VL6W2M | Callmate EXT 307 power strip 3+3 USB | 261 | 261 | 1999 | -87% |
| B0H86R93NV | Vanelis perfume 50ml EDP | 199 | 199 | 899 | -78% |

Five verified **₹1 lower** than posted (B0GBPBG3NV, B0F1T2TN28, B0BXJ5684F, B0D3N3VMBC,
B0C7KQXXCW) — inside the ±₹1 tolerance, so each published at the **verified** number. Worth
recording: the unratified asymmetric-drift rule (owner decision #1) was never needed this tick,
because every drift that survived was downward and within tolerance.

On B08QW6ZZJ1 the source claimed MRP ₹1,000 and the PDP says ₹995. The PDP value was used — it
feeds the discount we print.

### Rejected — 9

| ASIN | Product | Posted ₹ | Verified ₹ | Reason |
|---|---|---|---|---|
| B0CZT6JSFG | Amazon Basics iPhone 14 Pro case | 40 | — | out of stock (`#outOfStock`, no cart) |
| B0H9PWVL3Z | Bean bag chair cover 0XL | 674 | — | out of stock (`#outOfStock`, no cart) |
| B0B18T8QX1 | ITAF balloon air pump | 109 | 115 | upward drift ₹6 |
| B08GG5LF8Z | Negi Big Drum musical toy | 81 | 92 | upward drift ₹11 |
| B07M7WL8W2 | DIY Crafts luggage strap | 223 | 248 | upward drift ₹25 |
| B00TFG4E6G | Hindware Sleek Smart PVC cistern | 999 | 1099 | upward drift ₹100 |
| B0DMP1R3BK | Cosco Pickleball Pro 26 | 99 | 296 | upward drift ₹197, no MRP/savings signal |
| B0CXDS9PGP | Crompton Platina Star Stylus panel | 1447 | 1913 | upward drift ₹466 |
| B0CP2FLKRY | Potty training aid spray 250 ml | 169 | 587 | upward drift ₹418 **and** only -2% |

**7 of 9 rejects were upward drift** — rot #2 stays the dominant reject reason, though at 9/29
the reject rate is far below the 13/18 of tick 09-19e. The 0XL bean bag cover is dead while the
1XL of the same product line is live and accepted, which is a good reminder that a dead ASIN
says nothing about its siblings.

## Pushed

`POST /admin/deals/bulk` → **HTTP 201, count 20**, all `created: true`, all `status: LIVE`.

```
10632  ₹350   -50%  maybelline-new-york-fit-me-spot-rescue-concealer-shade-80-b0gfwgc26w
10633  ₹135   -92%  kingsway-car-window-sun-shade-curtains-skoda-octavia-2021-onwards-b0cjrbf88y
10634  ₹1899  -83%  nervfit-phoenix-smartwatch-1-85-inch-bluetooth-calling-b0dt7cqmc7
10635  ₹1565  -80%  nervfit-vibe-smartwatch-1-85-inch-truecolor-display-b0dw9b76rv
10636  ₹998   -88%  nervfit-pulse-smartwatch-1-83-inch-bluetooth-calling-b0cbshmcwf
10637  ₹175   -75%  no-brainer-plant-based-multi-surface-cleaner-value-pack-b0gbpbg3nv
10638  ₹624   -76%  highlander-men-straight-fit-stretchable-jeans-b0f2tc84sx
10639  ₹286   -93%  sulfar-waterproof-car-body-cover-bmw-3-series-b0f1t2tn28
10640  ₹247   -80%  viva-unicorn-professional-anti-fog-uv-swimming-goggles-b0bxj5684f
10641  ₹593   -70%  amazon-brand-house-shields-men-jeans-b09wvz86z5
10642  ₹2214  -66%  philips-12w-black-reflector-led-cob-round-spot-light-b0d3n3vmbc
10643  ₹4785  -71%  hikvision-k5-2k-dual-channel-car-dash-camera-b0bgt9twl6
10644  ₹163   -92%  kozdiko-waterproof-bike-body-cover-with-mirror-pockets-b0c7kqxxcw
10645  ₹742   -85%  bean-bag-chair-cover-1xl-brown-dark-grey-without-beans-b0h9pryhyr
10646  ₹226   -77%  steam-distilled-rose-water-face-toner-mist-value-pack-b08qw6zzj1
10647  ₹1332  -60%  larah-by-borosil-27-piece-opalware-dinner-set-b0c53plh4n
10648  ₹314   -43%  zebronics-transformer-m-gaming-mouse-gold-plated-usb-b0819hzpxl
10649  ₹680   -70%  philips-multi-wattage-9w-0-5w-2-in-1-led-bulb-b0drp49nnc
10650  ₹261   -87%  callmate-ext-307-power-strip-3-socket-3-usb-b082vl6w2m
10651  ₹199   -78%  vanelis-vanilla-musk-eau-de-parfum-50ml-b0h86r93nv
```

Every title, description and how-to was written for this batch — not the source's copy and not
Amazon's bullet text. The push script asserted `description.length >= 200` on all 20 before
sending, so the 200-char arm of `dealIndexable` is guaranteed rather than eyeballed. Nineteen of
twenty clear the 20% discount arm outright; the Zebronics mouse at -43% clears it too.

Three rows carry a **caveat written into the copy rather than buried**, because the listing is
easy to misread:
- the bean bag cover is **a cover only, no beans** — step 2 of its how-to says so;
- the Nervfit watches list at ₹7,999-₹10,999 MRP, which is the category's inflated strikethrough
  — the description says to judge them against street prices, not the MRP;
- the Philips bulb needs the **base type (B22 vs E27)** checked before ordering.

Affiliate URLs are the clean `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21` form — the
source's `dealhind-21` tag stripped, and the `th=1&psc=1` variant noise dropped.

### Image proof — 20/20 fetched, all 200

Images come from `m.media-amazon.com` via `data-a-dynamic-image`, never from
`images.indiafreestuff.in`. Each thumbnail was upgraded to `._SL1500_` **and then fetched to
prove the upgrade exists**:

```
51Egqrzxp5L 200  48897   61LCAqOKMIL 200  87084   71NAWktT8LL 200  83015
61CkjAEi41L 200 103917   61wZ84VJbvL 200 111191   81ERPRH9fPL 200 211274
814LTrluUJL 200 129580   71+KozWmqeL 200 166401   516rnf4g0ML 200  60645
71tlbZzzc4L 200 100077   61080qciZbL 200 105617   71JvhsLwzkL 200 140268
61RHdMwPWvL 200  81801   51FaDbN4BHL 200  50156   81ePp9rfOjL 200 196667
61sTD+l7TWL 200 106967   61XiIPsdbkL 200  63831   71VpyAg6ZZL 200 141203
61nDzMj2ydL 200  78624   61YenhH1h9L 200 119108
```

**New fact for the extractor backlog:** two of these carried `PIbundle` modifiers in their
original form (`81ERPRH9fPL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg` and
`81ePp9rfOjL._SX679_PIbundle-5,…`), and both still resolve at a plain `._SL1500_`. The size
upgrade survives the bundle modifier — previously untested, now proven on two samples.

## Freshness — IndexNow

```
node apps/api/scripts/indexnow-ping.mjs <20 slugs>
DONE: IndexNow -> HTTP 200 for 23 urls
```

**HTTP 200** first call, no 422, so the Bing GET fallback was not needed. 23 URLs = the 20 deal
pages plus the script's three defaults (`/`, `/offers`, `/sitemap.xml`).

Verified on prod rather than trusted — two of the submitted URLs actually serve:

```
200 0.287782  /hikvision-k5-2k-dual-channel-car-dash-camera-b0bgt9twl6
200 0.298267  /larah-by-borosil-27-piece-opalware-dinner-set-b0c53plh4n
```

No deploy: new deal pages read through the prod API off the managed DB, so they serve
immediately without a rebuild.

**The sitemap does not carry the batch yet, and that is stated rather than glossed.** Prod
`/sitemap.xml` shows **9584** `<loc>` entries and `grep` for three of the new slugs returns
**0**. The sitemap is ISR at `revalidate = 1800`, so the batch lands within 30 minutes on its
own. `llms.txt` is `force-dynamic` and already carries them.

## Prod endpoints — all 200

```
200 1.863990  /          (re-measured, see below)
200 0.123313  /offers
200 0.439814  /blog
200 0.519607  /sitemap.xml
200 0.096856  /feed.xml
200 0.146709  /api/deals
200 0.418840  /llms.txt
```

The 1.864 s `/` sample was re-measured three times and came back 0.314 / 0.172 / 0.182 s — all
inside or below the normal band. Closed as a one-off, not opened as rot. Full disposition in
`sitemon-2026-09-19d.md`.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10305** (was 10285) · PENDING_REVIEW **0** · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** — the 20 new rows kept it that way |
| DB max deal | **10651** LIVE ₹199, the Vanelis perfume — matches prod exactly |
| Posts/day IST (7d) | 09-13:4 · 09-14:4 · 09-15:3 · 09-16:3 · 09-17:3 · 09-18:3 · 09-19:2 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4, no zero day in the window |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| Ingest pace | created 24 h **222** · 7 d **949** (~136/day) |
| tg-broadcast cursor | 10482 vs DB max 10651 — **drift 169**, up from 149 (rot #4) |
| Unpushed commits before this tick | 0 |

PENDING_REVIEW is 0 **by absence** from `deal.groupBy({by:['status']})`, not by a zero row — an
absent key and a broken query look identical in that output.

**The cursor drift grew by exactly this batch: 149 → 169.** All 20 deals are live on the site
and will be in the sitemap within the ISR window; none of them will reach the Telegram channel
until the external tg-broadcast cron runs again. That cron is owner decision #3 and the number
attached to it is now the largest it has been.

## Rot standing — 28 items

Reconfirmed with fresh evidence: **#2** (7 of 9 rejects on drift), **#3** (one tracking-landing
resolve), **#4** (drift 149 → 169, this batch is why), **#11** (three scratch files created
under `apps/api/`, all deleted at tick end), **#17** (Feedburner RSS dead), **#19** (one
verification saved by remembering the Telegram tick's reject, and 9 more that a reject cache
would have saved), **#22** (three more stale LIVE rows, one of them independently confirmed by
a second pipeline within the hour).

**Nothing new rotted.** One fact banked rather than opened as rot: the `._SL1500_` upgrade
survives `PIbundle` modifiers, which removes a suspected failure mode from the extractor
backlog rather than adding one.

## Open owner decisions — unchanged at 10

**#7 — persist a reject cache (rot #19)** stays top. This tick is its sharpest argument yet:
B0C9M3GBX4 was skipped only because the same session happened to remember the Telegram tick
rejecting it an hour earlier. A different session would have spent the verification.

**#6 — periodic re-verify sweep over old LIVE rows** moved up hard. Five stale rows are now on
record, and #2569 was caught twice in one hour by two pipelines that do not talk to each other.

**#1** (ratify publish-at-verified-price) stays open but was not exercised — all five drifts
this tick were downward and inside ±₹1.
