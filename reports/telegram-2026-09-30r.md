# Telegram tick 2026-09-30r

Sidebar scrape of 13 groups (`data/tg-groups.json`); latest message per group checked.

## Pushed (1, LIVE)

| Store | Product | Price | MRP | Off | Rating | Slug |
|---|---|---|---|---|---|---|
| Amazon | Amkette 8-in-1 Plus USB Hub (A+C) | ₹499 | ₹1,199 | 58% | 4.2 (503) | amkette-8-in-1-plus-usb-hub-type-c-card-reader-b0h3f8qjmx |

Verified on the Amazon PDP (logged-in tab, `#centerCol` price, in stock, add-to-cart present). Bulk push: HTTP 201, `created:true`, DB status LIVE.

## Skipped

- CoolzTricks: GO DESi Kaju Katli. Food.
- Dealzone: Dr Rashel scrub. `bitli.in` resolves to a Shopsy brand listing (`/pr?sid=`), not a single product.
- ONLINE SHOPPING DEALS: Presto Colobleach (B0F7XZPHRF). Dup, already LIVE at ₹319.
- INDIAN CHEAP DEALS: Lavie Luxe Quaro26 handbag (B0G38DGNKM). Dup; PDP re-read ₹3,459 = DB price, no change.
- Loot Deals 24x7: Syska 10000mAh power bank (PWBGGD4THDQZYAY6). Already seen and rejected earlier.
- Dealdost: multi-product combos. IFS Tips: ConfirmTkt cash. Hidden Loot: Supercoins. OMG: app promo. Rogerkart: photo-only.

## Freshness

- IndexNow: HTTP 200 for 4 URLs (1 slug + 3).
- The sitemap (ISR 1800s) and llms.txt (dynamic) pick up the deal automatically.

## CEO audit

- Posts today (IST): 3. Coverless 0, seoless 0.
- LIVE deals: 11,745. Null price 0, null image 0. PENDING_REVIEW 0.
- Broadcast cursor: lastId 12053 vs max 12118. The file was touched 1 min ago, so the external cron is draining it. Not rot.
- Prod endpoints: 7/7 return 200.
- Unpushed commits: 0.

Rot found: none.
