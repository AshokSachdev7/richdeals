# TELEGRAM-DEAL-MONITOR tick 2026-09-27zy (~17:06 IST)

**Result:** 2 new deals live (both Amazon). Live deals went from 11,267 to 11,269.

## Scan
- **Sidebar:** one evaluate over `.chat-list .ListItem.Chat` covering all groups in `data/tg-groups.json`. I then opened ONLINE SHOPPING DEALS to read its last few posts.
- **Shortlinks:** the two unseen `link.amazon` links resolved to `/dp/ASIN`. The source tag `vivek123034-21` was stripped.
- **Verification:** both PDPs re-read in the logged-in Amazon tab (`.priceToPay`, M.R.P., `#availability`, add-to-cart, rating). No clip coupon on either.
- **Dedup:** neither productId is in the DB.

## Pushed (`/admin/deals/bulk`, count 2, both `created:true`)
| Deal | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Treo by Milton Lennox beer mugs, set of 2, 400 ml | B0FHWP7KKY | ₹160 | ₹320 | 4.7★ (40) |
| Jam & Honey panda pop-up play tent | B0CGZZV1CY | ₹397 | ₹1,800 | 4.1★ (167), Amazon's Choice |

- **Channel price:** equal to the PDP price for both deals.
- **Pre-flight:** caught "₹80 a mug" in the copy (the per-unit price). I reworded it to "about ₹80" before pushing.
- **Affiliate:** `tag=ashoksachdev-21`.
- **Images:** m.media-amazon.com.
- **Script:** `apps/api/scripts/push-tg-0927zy.mjs`.

## Rejected
- **SB Loots, MAHARAJA chair set @ ₹2,619:** the `amzn.lt/PyTsZkK0` link does not resolve (ERR_NAME_NOT_RESOLVED in curl and Chrome). Dead shortlink, no ASIN.
- **CoolzTricks, Symbol sweatshirts @ ₹199:** `amzn.to/4yekVTR` resolves to a `/s?` search page.
- **ONLINE SHOPPING DEALS, Tata Coffee Gold 50 g:** the product is already live (TG 27zn). Skipped so the bulk upsert could not rewrite its slug.
- **Already seen:** Dealzone Panchmeva, Dealdost Skullcandy, INDIAN CHEAP DEALS handbag, Loot Deals 24x7 Syska power bank.
- **Not a single product:** Rogerkart (category page), IFS Tips (Swiggy search), Hidden Loot (supercoins), Deal Dibba (join link).

`tg-multi-seen.json`: 7 entries added (5 links and 2 ASINs), 2,172 total.

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Prod:** both deal pages return 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,269 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11614 vs DB max 11616. I re-read the file: it was 11611 at 27zx, so the external cron has caught up through the 27zw batch. The gap is exactly this tick's 2 deals, queued; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
