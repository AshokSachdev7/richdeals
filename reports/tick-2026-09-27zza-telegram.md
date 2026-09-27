# TELEGRAM-DEAL-MONITOR tick 2026-09-27zza (~18:05 IST)

**Result:** 1 new deal live (Amazon). Live deals went from 11,269 to 11,270.

## Scan
- **Sidebar:** one evaluate over `.chat-list .ListItem.Chat` covering all groups in `data/tg-groups.json`. I then opened Dealzone to read its last few posts.
- **Unseen candidates:** 5 links.
- **Shortlinks:** resolved in a spare tab. The source tag `glitzdeal05-21` was stripped.

## Pushed (`/admin/deals/bulk`, count 1, `created:true`)
| Deal | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| USI UNIVERSAL 733BR Bouncer padded gym gloves, red | B09RWWF3FZ | ₹149 | ₹380 | 3.8★ (13) |

- **Verification:** channel ₹149 is equal to PDP `.priceToPay` ₹149. The PDP shows in stock, with add-to-cart present and no clip coupon.
- **Dedup:** the productId is not in the DB.
- **Size:** the price was read on the M size. The how-to step tells buyers the price can differ by size.
- **Affiliate:** `tag=ashoksachdev-21`.
- **Image:** m.media-amazon.com.
- **Script:** `apps/api/scripts/push-tg-0927zza.mjs`.

## Rejected
- **Dealzone, KINGSWAY XUV700 door guard (B0D7VJFXFF):** the channel says ₹70, the PDP says ₹352. Price drift.
- **SB Loots, Bellavita perfume @ ₹259:** `myntr.it` resolves to a Myntra category listing, not a single product.
- **CoolzTricks, The Bear House shirts at 70% off:** `myntr.it` resolves to a Myntra category listing.
- **Dealdost, Blinkit Earth Rhythm sunspray:** quick-commerce, location-locked.
- **Already seen or not a deal:** RichDeals (our own channel), ONLINE SHOPPING DEALS (the 27zy Treo mugs), INDIAN CHEAP DEALS, Loot Deals 24x7, Rogerkart (category page), IFS Tips (search), Hidden Loot (supercoins), Deal Dibba (join link), OMG.

`tg-multi-seen.json`: 7 entries added, 2,179 total.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the deal within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Prod:** the deal page returns 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,270 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11616 vs DB max 11617. The gap is exactly this tick's 1 deal, queued for the external cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
