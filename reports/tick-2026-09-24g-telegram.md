# TELEGRAM-DEAL-MONITOR tick — 2026-09-24g (14:35 UTC / 20:05 IST)

**Published: 2 deals LIVE** through `/admin/deals/bulk`. The response was `count:2` with both rows `created:true`, and each read back as LIVE (ids 11026–11027).
IndexNow: **HTTP 200 for 5 URLs** (2 slugs + 3 hub paths).

## Funnel
- **Sidebar read of all 13 groups:** 3 fresh single-product posts: ONLINE SHOPPING DEALS (CADLEC fan), SB Loots (Halonix, `amzn.lt`) and Rogerkart (ONCH frocks).
- **ONLINE SHOPPING DEALS, fully loaded:** after scrolling to the bottom, the chat showed 3 posts newer than the last tick: Solimo dinner set, ONCH frocks and the CADLEC fan.
- **Skipped:**
  - CoolzTricks ₹82 grocery pack: low-ticket FMCG.
  - Dealdost "Upto 35% off selfie sticks": a multi-product range.
  - Our own channel, and photo-only posts.
- **Resolved and deduped:**
  - CADLEC fan `B0DSLC124L` is already LIVE (id 4291).
  - Rogerkart's `B0DCB6YZHN` redirects to the same ONCH listing (`B0DCBBMSNS`), so it is one deal.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Solimo ceramic 16-piece dinner set, Serves 4 | Amazon | B0B7S4T6WD | 1709 | 5099 | 66% |
| ONCH girls cotton frock, pack of 6 | Amazon | B0DCBBMSNS | 200 | 1999 | 90% |

- **Solimo:** `#centerCol` shows ₹1,709.87 and In stock, which matches the post (₹0.87 drift, within ±₹1). Amazon marks it the lowest price in 30 days.
- **ONCH:** `#centerCol` shows ₹200 and matches the post. Only 1 was left in stock, in size 2-3Y. The optional 5% clip coupon is named in howTo step 4.

## Rejected
| Product | Reason |
|---|---|
| CADLEC Breeza 1200mm fan B0DSLC124L | Duplicate: already LIVE (id 4291) |
| Halonix 10W LED bulb, pack of 10 (`amzn.lt/c99PoJTH`) | Dead shortlink: the domain doesn't resolve (curl returns empty, the browser gives ERR_NAME_NOT_RESOLVED) |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images come from `m.media-amazon.com` `_SL1500_`.
- Descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
- Affiliate: `/dp/ASIN?tag=ashoksachdev-21`.
- `tg-multi-seen.json` now holds 1871 entries. Script: `apps/api/scripts/push-tg-0924g.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10680, EXPIRED 259, max id 11027, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11025 against a max of 11027, a gap of 2: this batch. The external cron drains it, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.
  - A plain `git fetch` failed with `Permission denied (publickey)`, although `ssh -T git@github.com` authenticates.
  - It works with `GIT_SSH_COMMAND=ssh`. The likely cause is that git picks up a different ssh binary. I'm watching it.
