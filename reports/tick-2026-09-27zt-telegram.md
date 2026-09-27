# TELEGRAM-DEAL-MONITOR tick 2026-09-27zt

**Result:** 2 new deals live (1 Amazon, 1 Flipkart). Live deals went from 11,252 to 11,254.

## Sweep
- **Read:** the sidebar of all 13 groups in `data/tg-groups.json`, with one `browser_evaluate` over `.chat-list .ListItem.Chat`.
- **Dedup:** checked against `tg-multi-seen.json` and the live DB. 0 productIds were already in the DB.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 2, all `created:true`)
| Deal | Source | Store | Price | M.R.P. | Verified |
|---|---|---|---|---|---|
| HRX Transit cabin trolley with laptop pocket (B0HHNSQVZQ) | Dealzone `link.amazon/B0c9dIy14` | Amazon | ₹1,999 | ₹10,999 | `#centerCol` on the PDP; in stock; add-to-cart present; new listing with no rating |
| Lotus WhiteGlow Vitamin-C gel creme SPF 20, 50 g (FRNGW2M7JRQHU57D) | Dealdost `fkrt.co/o6bD5X` | Flipkart | ₹233 | ₹495 | ld+json InStock; 4.3★ from 1,597 ratings; 50 g variant selected |

- **Affiliate:** Amazon uses `tag=ashoksachdev-21`, Flipkart uses `affid=djhackraj`.
- **Copy:** original. **Images:** marketplace CDN only.
- **Script:** `apps/api/scripts/push-tg-0927zt.mjs`.

## Rejected / skipped
- **Price only with an SBI card:** SB Loots Hero XTREME 125R (₹89,200 booking); CoolzTricks SHARP ACs (3 links). Rejected.
- **Link truncated:** Online Shopping Deals Treo beer mug at ₹160. The sidebar cut the link off at `link.amaz...`. Skipped and left off the seen list, so the next tick retries it.
- **Not new:** already seen (handbag, Syska) or not a deal (Skybags category, Swiggy, Supercoins, iPhone pass, spam, our own channel).

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes. **llms.txt:** force-dynamic, already current.
- **Spot check:** both deal pages return 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,254 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11599 vs DB max 11601. This batch is queued for the external broadcast cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
