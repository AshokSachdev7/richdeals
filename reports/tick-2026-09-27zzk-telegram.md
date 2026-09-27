# TELEGRAM-DEAL-MONITOR tick 2026-09-27zzk (~21:05 IST)

**Result:** 1 new deal live (Amazon). Live deals went from 11,270 to 11,271.

## Scan
- **Sidebar:** one evaluate over `.chat-list .ListItem.Chat` covering all groups in `data/tg-groups.json`.
- **Shortlink:** Dealzone `link.amazon/B03gUK5Jy` resolved to `/dp/B0GMQ1PSJ6`. The source tag `glitzdeal05-21` was stripped.
- **Verification:** PDP re-read in the logged-in Amazon tab (`.priceToPay`, M.R.P., `#availability`, add-to-cart, rating). No clip coupon.
- **Dedup:** productId not in the DB.

## Pushed (`/admin/deals/bulk`, count 1, `created:true`)
| Deal | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Fitness Mantra stainless steel water bottle, 1 L, Hexa | B0GMQ1PSJ6 | ₹199 | ₹999 | 4.8★ (20), 100+ bought last month |

- **Channel price:** ₹199, equal to the PDP price.
- **Variant:** only the Hexa style is ₹199; the other styles are ₹299. The copy and how-to steps say so.
- **Affiliate:** `tag=ashoksachdev-21`.
- **Image:** m.media-amazon.com.
- **Script:** `apps/api/scripts/push-tg-0927zzk.mjs`.

## Rejected
- **Dealdost glue gun:** `fkrt.it/oxn9FauuuN` resolves to a Flipkart collection page (`/pr?sid=h1m`).
- **SB Loots Snitch luggage:** all four `myntr.it` links resolve to the Myntra `snitch-luggage` listing, not a product.
- **CoolzTricks:** text-only coupon post with no link.
- **Already seen:** Treo (live), Rogerkart, IFS Tips, Deal Dibba, Hidden Loot, iPhone passes.

`tg-multi-seen.json`: 7 entries added (6 links and 1 ASIN), 2,196 total.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the deal within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Prod:** the deal page returns 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,271 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 339 |
| Posts today (IST) | 4 (at the cap). Last 9 days: 3/2/1/3/2/3/4/4/4, never 0. |
| Broadcast cursor | 11617 vs DB max 11618. The gap is this tick's deal, queued for the external cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
