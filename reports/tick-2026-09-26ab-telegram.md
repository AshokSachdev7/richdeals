# TELEGRAM-DEAL-MONITOR tick 2026-09-26ab (11:05 IST)

**1 deal pushed LIVE: Shopsy JASIL plush baby sofa seat, id 11412. `/admin/deals/bulk` returned count 1. IndexNow returned HTTP 200 for 4 URLs (1 slug + 3 hub paths).**

## Sweep
- One `browser_evaluate` read the sidebar for all 13 groups in `data/tg-groups.json`. It found 2 new links.
- **Already seen:** iPhone B0HJ9W3ZND, Dealzone B01c0jaiX, Dealdost hnUyh8F, Garnier B0dZWkCIM, Rogerkart, Hidden Loot, INDIAN CHEAP DEALS and Loot Deals.
- **Not deals:** RichDeals (our own channel), IFS Tips (a CRED post) and Deal Dibba (spam).

## New links
| Group | Link | Resolved to | Verdict |
|---|---|---|---|
| CoolzTricks | `fkrt.cc/hLx9SVM` | Flipkart `/pr?sid=` listing of ALFA by VIP suitcases ("starts @2184") | Rejected: category page, not a single product |
| SB Loots | `bittli.in/zrQibE6k` | Shopsy `itme5b6000b3cc17?pid=XWNHAMRGCB4KDMAJ` | **Pushed** |

## Verification: JASIL baby sofa seat
Shopsy has no ld+json, so the figures come from the page state:
- **Price:** `finalPrice` ₹385, the same as the channel.
- **M.R.P.:** ₹799, so the discount is 52%.
- **Stock:** `availabilityStatus` is `IN_STOCK`.
- **Image:** `rukmini1.flixcart.com/image/1500/1500`.
- **Duplicate check:** this product id was not already in the DB.
- **Copy:** written only from the page title and spec rows (35 cm, fibre filling, made in India).

## Affiliate check
- Shopsy is not Flipkart, so the link goes through **Cuelinks**.
- `/out/11412` returns 302 to `linksredirect.com/?cid=527&source=linkkit&url=https%3A%2F%2Fwww.shopsy.in%2F…XWNHAMRGCB4KDMAJ`.
- The script is `apps/api/scripts/push-tg-0926ab.mjs`.
- Both new links were appended to `data/tg-multi-seen.json`, which now holds 2,069 entries.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs.
- **Sitemap:** 10,383 `<loc>`. It is ISR with a 1800 s window, so the new deal appears within 30 minutes.
- **llms.txt:** `force-dynamic`, 200.

## CEO audit
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200. The slowest is `/blog` at 0.54 s.
- **Deals:** 11,065 live, 0 pending review, 0 with a null price, 0 with a null image. Highest id 11412.
- **Posts:** 333, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day, 09-17 → 09-26:** 1/3/3/2/1/3/2/3/4/2. No day is 0, and today already meets the 2-post rule. The 1 for 09-17 comes from the audit's rolling 10-day window cutting that day off.
- **Broadcast cursor:** 11409 against a DB max of 11412. The external tg-broadcast cron is still working through the IFS batch and will pick this deal up. Not rot.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
